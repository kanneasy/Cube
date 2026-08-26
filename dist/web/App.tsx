import { useCallback, useEffect, useRef, useState } from 'react';
import { CubeRenderer } from './cube/renderer';
import { CubeGestures } from './cube/gestures';
import { CubeAudio } from './cube/audio';
import { PALETTES, type PaletteId } from './cube/palette';
import { useSolve } from './useSolve';
import { useLibrary } from './useLibrary';
import { formatTime } from '../solve/results';
import { formatMove, inverseAlg, parseAlg } from '../cube/notation';
import { elapsedMs, inspectionElapsedMs, canUndo } from '../solve/session';
import { toStoredSolve } from '../store/library';
import type { PatternId, TimerMode } from '../store/records';
import type { StageSplits } from '../solve/stages';
import { HoldZone } from './components/HoldZone';
import { Inspection } from './components/Inspection';
import { Sheets } from './components/Sheets';
import { BROWSER_TAB_NOTICE, FIRST_RUN } from './components/copy';
import { UpdatePrompt } from './components/UpdatePrompt';

/** Remembered so the notice is genuinely one-time rather than shown every launch. */
const INSTALL_NOTICE_KEY = 'quarter-turn:install-notice-dismissed';
const FIRST_RUN_KEY = 'quarter-turn:first-run-seen';

const readFlag = (key: string): boolean => {
  try {
    return window.localStorage.getItem(key) === '1';
  } catch {
    // Storage blocked. Showing a one-time notice again is the harmless direction.
    return false;
  }
};

const writeFlag = (key: string): void => {
  try {
    window.localStorage.setItem(key, '1');
  } catch {
    // Nothing to remember it with; it will simply appear again.
  }
};

function splitTime(text: string): [string, string] {
  const i = text.lastIndexOf('.');
  return i < 0 ? [text, ''] : [text.slice(0, i), text.slice(i)];
}

function Splits({ splits }: { splits: StageSplits | null }) {
  const cfop = splits?.shape === 'cfop' ? splits : null;
  const value = (ms: number | null) => (ms === null ? '—' : formatTime(ms));
  const cols: [string, string | null, number | null][] = [
    ['CROSS', null, cfop ? cfop.cross.atMs : null],
    ['F2L', 'CFOP', cfop ? cfop.f2l.atMs : null],
    ['OLL', 'CFOP', cfop ? cfop.oll.atMs : null],
    ['SOLVED', null, cfop ? cfop.solved.atMs : null],
  ];
  return (
    <div className="splits">
      {cols.map(([label, scope, ms]) => (
        <div key={label}>
          {/* The scope limit is stated affirmatively rather than buried: these two
              stages are CFOP's model of a solve and mean nothing to a Roux solver. */}
          <div className="split__label">
            {label}
            {scope && <span className="split__scope">{scope}</span>}
          </div>
          <div className="split__value">{value(ms)}</div>
        </div>
      ))}
    </div>
  );
}

export function App() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<CubeRenderer | null>(null);
  const audioRef = useRef<CubeAudio>(new CubeAudio());

  const [mode, setMode] = useState<TimerMode>('casual');
  const [paletteId, setPaletteId] = useState<PaletteId>('cardinal');
  const [soundOn, setSoundOn] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [now, setNow] = useState(() => performance.now());
  const [dailyDate, setDailyDate] = useState<string | null>(null);
  const [today, setToday] = useState('');
  const [installed, setInstalled] = useState(true);
  const [noticeDismissed, setNoticeDismissed] = useState(false);
  const zoomSaveTimer = useRef<number | undefined>(undefined);
  const [firstRunSeen, setFirstRunSeen] = useState(true);

  const library = useLibrary();
  const solve = useSolve(rendererRef, audioRef.current, mode);
  const solveRef = useRef(solve);
  solveRef.current = solve;
  const libraryRef = useRef(library);
  libraryRef.current = library;

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const renderer = new CubeRenderer(stage, PALETTES.cardinal);
    rendererRef.current = renderer;
    const audio = audioRef.current;

    const gestures = new CubeGestures(renderer, {
      onGrab: () => {
        audio.unlock();
        setFirstRunSeen(true);
        writeFlag(FIRST_RUN_KEY);
      },
      onRelease: () => {},
      onDetent: () => audio.tick(),
      onSnapStart: (settleMs) => {
        // Fired while the layer is still moving: 70ms in it is about three-quarters
        // home, which is perceptually the moment it seats.
        window.setTimeout(() => audio.clack(), Math.min(70, settleMs * 0.6));
      },
      onCommit: (move) => solveRef.current.dispatch({ type: 'turn', move, at: performance.now() }),
    });

    const onResize = () => renderer.resize();
    window.addEventListener('resize', onResize);
    const unlock = () => audio.unlock();
    window.addEventListener('pointerdown', unlock, { once: true });

    // Installed to the home screen there is no browser chrome to swipe, and Safari's
    // edge-back gesture stops fighting every drag. In a plain tab it does, so say so
    // once rather than let the app read as broken.
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setInstalled(standalone);
    // localStorage rather than IndexedDB: these are per-device UI preferences, not
    // solve data, and they must not fail with the database in a private window --
    // where the install notice is arguably most relevant.
    setNoticeDismissed(readFlag(INSTALL_NOTICE_KEY));
    setFirstRunSeen(readFlag(FIRST_RUN_KEY));

    solveRef.current.newScramble();
    void libraryRef.current.todaysScramble().then(({ date }) => setToday(date));

    // Restore the zoom the user last chose. Orientation deliberately does NOT persist:
    // it is transient working state, and the first frame of a launch is the brand.
    void libraryRef.current
      .readSetting<number>('zoom')
      .then((f) => {
        if (typeof f === 'number') {
          renderer.setZoom(f);
          lastSeenZoom = renderer.getZoom();
        }
      })
      .catch(() => {
        // No stored preference, or storage unavailable. The default framing is correct.
      });

    // Save only a zoom the user actually CHOSE. Writing on every pointerup persisted
    // the default itself, which quietly froze it: a later change to the resting framing
    // could never reach anyone who had ever touched the cube.
    let lastSeenZoom = renderer.getZoom();
    const onZoomSettled = () => {
      const now = renderer.getZoom();
      if (Math.abs(now - lastSeenZoom) < 0.001) return;
      lastSeenZoom = now;
      window.clearTimeout(zoomSaveTimer.current);
      zoomSaveTimer.current = window.setTimeout(() => {
        void libraryRef.current.writeSetting('zoom', now).catch(() => {});
      }, 600);
    };
    stage.addEventListener('pointerup', onZoomSettled);
    stage.addEventListener('pointercancel', onZoomSettled);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointerdown', unlock);
      stage.removeEventListener('pointerup', onZoomSettled);
      stage.removeEventListener('pointercancel', onZoomSettled);
      window.clearTimeout(zoomSaveTimer.current);
      gestures.dispose();
      renderer.dispose();
      rendererRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    rendererRef.current?.setPalette(PALETTES[paletteId]);
  }, [paletteId]);


  useEffect(() => {
    audioRef.current.setEnabled(soundOn);
  }, [soundOn]);

  const { session } = solve;
  const phase = session.phase.kind;
  const running = phase === 'solving';
  const inspecting = phase === 'inspecting' || phase === 'holding';
  const finished = phase === 'finished';

  // A covered scramble must actually be unreadable. Inspection is timed from the
  // reveal, so seeing the cube beforehand is the one thing this mode cannot allow.
  useEffect(() => {
    rendererRef.current?.setConcealed(phase === 'covered');
  }, [phase]);

  // Drive the clock only while something is actually counting, so an idle app is not
  // re-rendering sixty times a second on a phone.
  useEffect(() => {
    if (!running && !inspecting) return;
    let handle = 0;
    const tick = () => {
      setNow(performance.now());
      handle = requestAnimationFrame(tick);
    };
    handle = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(handle);
  }, [running, inspecting]);

  // The judge's calls, once each.
  const calledRef = useRef({ first: false, second: false });
  const inspectionMs = inspectionElapsedMs(session, now);
  useEffect(() => {
    if (!inspecting) {
      calledRef.current = { first: false, second: false };
      return;
    }
    if (inspectionMs >= 8_000 && !calledRef.current.first) {
      calledRef.current.first = true;
      audioRef.current.call(1);
    }
    if (inspectionMs >= 12_000 && !calledRef.current.second) {
      calledRef.current.second = true;
      audioRef.current.call(2);
    }
  }, [inspecting, inspectionMs]);

  // Persist on finish, exactly once per solve.
  //
  // Keyed on the session's serial, which only changes when a new session is actually
  // installed. Keying on the solve's contents and clearing the marker when a new
  // scramble was REQUESTED wrote every solve to history twice: generating a scramble
  // is async, so the old finished session is still current for the renders in between,
  // and the effect saved it again with a cleared marker.
  const savedSerialRef = useRef<number | null>(null);
  useEffect(() => {
    if (session.phase.kind !== 'finished') return;
    if (savedSerialRef.current === solve.serial) return;
    savedSerialRef.current = solve.serial;
    const stored = toStoredSolve(session, new Date(), dailyDate ?? undefined);
    if (stored) void library.record(stored).catch(() => {});
  }, [session, solve.serial, dailyDate, library]);

  const startFresh = useCallback(
    (options: { mode?: TimerMode; goal?: { kind: 'solved' } | { kind: 'pattern'; pattern: PatternId } }) => {
      setDailyDate(null);
      setMenuOpen(false);
      solveRef.current.newScramble(options);
    },
    [],
  );

  // A dev-only handle so a solve can be driven end to end without a thumb. The kit's
  // canvas pitfalls call for exactly this: verifying interaction through the real code
  // path rather than through synthetic events the gesture layer may not receive.
  // Stripped from production by the import.meta.env.DEV guard.
  useEffect(() => {
    if (!import.meta.env.DEV) return;
    (window as unknown as Record<string, unknown>).__quarterTurn = {
      play: (alg: string) =>
        parseAlg(alg).forEach((move, i) =>
          solveRef.current.dispatch({ type: 'turn', move, at: performance.now() + i }),
        ),
      solve: () => {
        const s = solveRef.current.session;
        const solution = inverseAlg(parseAlg(s.scramble));
        solution.forEach((move, i) =>
          solveRef.current.dispatch({ type: 'turn', move, at: performance.now() + i * 10 }),
        );
      },
      session: () => solveRef.current.session,
      solves: () => libraryRef.current.solves,
      // Renderer diagnostics: the orbit and zoom are otherwise only observable by
      // watching, and the render loop does not run in a backgrounded tab.
      zoom: () => rendererRef.current?.getZoom(),
      setZoom: (z: number) => rendererRef.current?.setZoom(z),
      orbitBy: (right: number, down: number) => rendererRef.current?.orbitBy(right, down),
      pick: (x: number, y: number) => rendererRef.current?.pickSticker(x, y) ?? null,
      orientation: () => {
        const q = rendererRef.current?.orientationQuaternion();
        return q ? [q.x, q.y, q.z, q.w] : null;
      },
    };
  });

  const ms = elapsedMs(session, now);
  const [whole, fraction] = splitTime(formatTime(ms));
  const penalty = finished ? session.phase.result.penalty : 'none';
  const qualifier =
    penalty === 'dnf' ? 'DNF' : penalty === 'plus2' ? '+2' : session.hinted ? 'PRACTICE · NO RECORD' : '';

  return (
    <div className="solve">
      <div />

      <div className="rail gutter">
        {/* Affirmative state, not a control. Tapping it used to switch mode AND throw
            away the scramble, which is a lot to do by accident on the one thing sitting
            under your thumb at the top of the screen. Mode lives in Settings now, where
            changing it is deliberate. */}
        <span className="chip" role="status" aria-label={`Timer mode: ${mode}`}>
          {mode === 'casual' ? 'CASUAL' : 'COMPETITION'}
        </span>
        <button className="rail__menu" onClick={() => setMenuOpen(true)}>
          MENU
        </button>
      </div>

      <div />

      <div className="readout gutter">
        {inspecting ? (
          <Inspection elapsedMs={inspectionMs} />
        ) : (
          <div className="timer" data-live={running || finished} data-settled={finished}>
            {whole}
            <span className="timer__fraction">{fraction}</span>
          </div>
        )}
        <div />
        <div className="qualifier" data-alarm={penalty !== 'none'}>
          {qualifier}
        </div>
        <div />
        <Splits splits={finished ? session.phase.splits : null} />
      </div>

      <div className="stage" ref={stageRef}>
        {phase === 'covered' && (
          <button className="reveal" onClick={() => solve.dispatch({ type: 'reveal', at: performance.now() })}>
            REVEAL SCRAMBLE
          </button>
        )}
        {/* Both of these are bottom-anchored in the stage, so they live in one column
            rather than as two absolutely-positioned siblings that paint over each
            other -- the banner was covering the Next Scramble button completely, for
            exactly the not-yet-installed audience it exists to help. */}
        <div className="stage__foot">
          {/* One at a time. Stacked, the two first-launch cards swallowed the stage and
              covered the cube they are both talking about. The install notice goes
              first because in a browser tab it explains why the drag it is teaching
              will fight Safari. */}
          {!firstRunSeen && (installed || noticeDismissed) && (
            <div className="first-run">
              {FIRST_RUN.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </div>
          )}
          {finished && (
            <button className="again" onClick={() => startFresh({})}>
              NEXT SCRAMBLE
            </button>
          )}
          {!installed && !noticeDismissed && !inspecting && (
            <div className="install-note">
              <div className="install-note__text">
                <strong>{BROWSER_TAB_NOTICE.title}</strong>
                <span>{BROWSER_TAB_NOTICE.body}</span>
                <span className="install-note__action">{BROWSER_TAB_NOTICE.action}</span>
              </div>
              <button
                className="control install-note__dismiss"
                onClick={() => {
                  setNoticeDismissed(true);
                  writeFlag(INSTALL_NOTICE_KEY);
                }}
              >
                {BROWSER_TAB_NOTICE.dismiss}
              </button>
            </div>
          )}
        </div>
      </div>

      <div
        className="notation gutter"
        data-refused={solve.refusal !== null}
        data-mode={solve.refusal !== null ? 'refusal' : session.log.length === 0 ? 'scramble' : 'log'}
      >
        {solve.refusal !== null ? (
          solve.refusal
        ) : session.log.length === 0 ? (
          <>
            <span className="notation__label">SCRAMBLE</span>
            {solve.scrambling ? '…' : phase === 'covered' ? 'COVERED' : session.scramble}
          </>
        ) : (
          session.log.map((entry, i) => (
            <span className="notation__move" key={`${i}-${formatMove(entry.move)}`}>
              {formatMove(entry.move)}
            </span>
          ))
        )}
      </div>

      <div />

      <div className="controls gutter">
        <button
          className="control"
          disabled={!canUndo(session)}
          onClick={() => solve.dispatch({ type: 'undo', at: performance.now() })}
        >
          <span className="control__glyph">‹</span> UNDO
        </button>

        <div className="movecount">
          <span className="movecount__value">{session.moveCount}</span>
          <span className="movecount__label">MOVES</span>
        </div>

        <div className="controls__spacer" />

        <div className="control-stack">
          <button className="control" disabled={finished || solve.hintPending} onClick={() => solve.requestHint()}>
            HINT <span className="control__glyph">?</span>
          </button>
          {/* What the button costs, said before it is tapped rather than after. */}
          <span className="control__scope">PRACTICE</span>
        </div>
      </div>

      <div />

      {inspecting && (
        <HoldZone
          onBothDown={() => solve.dispatch({ type: 'holdDown', at: performance.now() })}
          onRelease={() => solve.dispatch({ type: 'holdUp', at: performance.now() })}
        />
      )}

      {solve.session.shownHint && (
        <div className="hint-token">
          <span className="hint-token__move">{formatMove(solve.session.shownHint)}</span>
          {/* It is a correct move, and not necessarily one your method would play. */}
          <span className="hint-token__scope">SOLVER&rsquo;S ROUTE</span>
        </div>
      )}

      <UpdatePrompt />

      {menuOpen && (
        <Sheets
          solves={library.solves}
          storageUnavailable={library.unavailable}
          today={today}
          mode={mode}
          paletteId={paletteId}
          soundOn={soundOn}
          onPalette={setPaletteId}
          onSound={setSoundOn}
          onMode={(next) => {
            setMode(next);
            startFresh({ mode: next });
          }}
          onClose={() => setMenuOpen(false)}
          onStartDaily={() => {
            setMenuOpen(false);
            void library.todaysScramble().then(({ date, scramble }) => {
              setDailyDate(date);
              solveRef.current.startWith({ scramble, goal: { kind: 'solved' }, mode });
            });
          }}
          onStartPattern={(pattern) => {
            // A pattern challenge starts from a SOLVED cube: the puzzle is turning
            // solved into the pattern, not turning a random scramble into it.
            setDailyDate(null);
            setMenuOpen(false);
            solveRef.current.startWith({ scramble: '', goal: { kind: 'pattern', pattern }, mode });
          }}
        />
      )}
    </div>
  );
}
