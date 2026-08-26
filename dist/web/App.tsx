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
import { MenuSheet } from './components/MenuSheet';

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
      onGrab: () => audio.unlock(),
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

    solveRef.current.newScramble();
    void libraryRef.current.todaysScramble().then(({ date }) => setToday(date));

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointerdown', unlock);
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
  const savedRef = useRef<string | null>(null);
  useEffect(() => {
    if (session.phase.kind !== 'finished') return;
    const key = `${session.scramble}|${session.log.length}|${session.phase.result.rawMs}`;
    if (savedRef.current === key) return;
    savedRef.current = key;
    const stored = toStoredSolve(session, new Date(), dailyDate ?? undefined);
    if (stored) void library.record(stored).catch(() => {});
  }, [session, dailyDate, library]);

  const startFresh = useCallback(
    (options: { mode?: TimerMode; goal?: { kind: 'solved' } | { kind: 'pattern'; pattern: PatternId } }) => {
      savedRef.current = null;
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
        <button
          className="chip"
          onClick={() => {
            const next: TimerMode = mode === 'casual' ? 'competition' : 'casual';
            setMode(next);
            startFresh({ mode: next });
          }}
        >
          {mode === 'casual' ? 'CASUAL' : 'COMPETITION'}
        </button>
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
        {finished && (
          <button className="again" onClick={() => startFresh({})}>
            NEXT SCRAMBLE
          </button>
        )}
        {!installed && (
          <div className="install-note">ADD TO HOME SCREEN — IN A SAFARI TAB, THE EDGE SWIPE FIGHTS THE CUBE</div>
        )}
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

      {menuOpen && (
        <MenuSheet
          solves={library.solves}
          today={today}
          paletteId={paletteId}
          soundOn={soundOn}
          onPalette={setPaletteId}
          onSound={setSoundOn}
          onClose={() => setMenuOpen(false)}
          onStartDaily={() => {
            setMenuOpen(false);
            void library.todaysScramble().then(({ date, scramble }) => {
              savedRef.current = null;
              setDailyDate(date);
              solveRef.current.startWith({ scramble, goal: { kind: 'solved' }, mode });
            });
          }}
          onStartPattern={(pattern) => {
            // A pattern challenge starts from a SOLVED cube: the puzzle is turning
            // solved into the pattern, not turning a random scramble into it.
            savedRef.current = null;
            setDailyDate(null);
            setMenuOpen(false);
            solveRef.current.startWith({ scramble: '', goal: { kind: 'pattern', pattern }, mode });
          }}
        />
      )}
    </div>
  );
}
