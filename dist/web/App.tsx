import { useEffect, useRef, useState } from 'react';
import { CubeRenderer } from './cube/renderer';
import { CubeGestures } from './cube/gestures';
import { CubeAudio } from './cube/audio';
import { PALETTES, type PaletteId } from './cube/palette';
import { useSolve } from './useSolve';
import { formatTime } from '../solve/results';
import { formatMove } from '../cube/notation';
import { elapsedMs, canUndo } from '../solve/session';
import type { TimerMode } from '../store/records';
import type { StageSplits } from '../solve/stages';

/** Split "12.34" so the hundredths can be set smaller, per the type spec. */
function splitTime(text: string): [string, string] {
  const i = text.lastIndexOf('.');
  return i < 0 ? [text, ''] : [text.slice(0, i), text.slice(i)];
}

function Splits({ splits }: { splits: StageSplits | null }) {
  const cfop = splits?.shape === 'cfop' ? splits : null;
  const value = (ms: number | null) => (ms === null ? '—' : formatTime(ms));
  return (
    <div className="splits">
      <div>
        <div className="split__label">CROSS</div>
        <div className="split__value">{value(cfop ? cfop.cross.atMs : null)}</div>
      </div>
      <div>
        {/* The scope limit stated affirmatively rather than buried: these two stages
            are CFOP's model of a solve and mean nothing for a Roux solver. */}
        <div className="split__label">
          F2L <span className="split__scope">CFOP</span>
        </div>
        <div className="split__value">{value(cfop ? cfop.f2l.atMs : null)}</div>
      </div>
      <div>
        <div className="split__label">
          OLL <span className="split__scope">CFOP</span>
        </div>
        <div className="split__value">{value(cfop ? cfop.oll.atMs : null)}</div>
      </div>
      <div>
        <div className="split__label">SOLVED</div>
        <div className="split__value">{value(cfop ? cfop.solved.atMs : null)}</div>
      </div>
    </div>
  );
}

export function App() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<CubeRenderer | null>(null);
  const audioRef = useRef<CubeAudio>(new CubeAudio());
  const [mode, setMode] = useState<TimerMode>('casual');
  const [paletteId] = useState<PaletteId>('cardinal');
  const [now, setNow] = useState(() => performance.now());

  const solve = useSolve(rendererRef, audioRef.current, mode);
  const solveRef = useRef(solve);
  solveRef.current = solve;

  // Mount the stage once. The renderer and the gesture layer outlive every re-render.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const renderer = new CubeRenderer(stage, PALETTES[paletteId]);
    rendererRef.current = renderer;
    const audio = audioRef.current;

    const gestures = new CubeGestures(renderer, {
      onGrab: () => audio.unlock(),
      onRelease: () => {},
      onDetent: () => audio.tick(),
      onSnapStart: (settleMs) => {
        // Fired while the layer is still moving: 70ms in it is about three-quarters
        // home and moving fast, which is perceptually the moment it seats. At release
        // it feels disconnected; at arrival it feels laggy.
        window.setTimeout(() => audio.clack(), Math.min(70, settleMs * 0.6));
      },
      onCommit: (move) => solveRef.current.dispatch({ type: 'turn', move, at: performance.now() }),
    });

    const onResize = () => renderer.resize();
    window.addEventListener('resize', onResize);
    const unlock = () => audio.unlock();
    window.addEventListener('pointerdown', unlock, { once: true });

    solveRef.current.newScramble();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointerdown', unlock);
      gestures.dispose();
      renderer.dispose();
      rendererRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Drive the clock. Only while it is actually running, so an idle app is not
  // re-rendering sixty times a second on a phone.
  const running = solve.session.phase.kind === 'solving';
  useEffect(() => {
    if (!running) return;
    let handle = 0;
    const tick = () => {
      setNow(performance.now());
      handle = requestAnimationFrame(tick);
    };
    handle = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(handle);
  }, [running]);

  const { session } = solve;
  const finished = session.phase.kind === 'finished';
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
            solve.newScramble({ mode: next });
          }}
        >
          {mode === 'casual' ? 'CASUAL' : 'COMPETITION'}
        </button>
        <button className="rail__menu">MENU</button>
      </div>

      <div />

      <div className="readout gutter">
        <div className="timer" data-live={running || finished} data-settled={finished}>
          {whole}
          <span className="timer__fraction">{fraction}</span>
        </div>
        <div />
        <div className="qualifier" data-alarm={penalty !== 'none'}>
          {qualifier}
        </div>
        <div />
        <Splits splits={finished ? session.phase.splits : null} />
      </div>

      <div className="stage" ref={stageRef} />

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
            {solve.scrambling ? '…' : session.scramble}
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

        {/* The scope tag says what the button costs BEFORE it is tapped, which is the
            whole point: a hint is a trade the user chose, not a penalty applied to them. */}
        <div className="control-stack">
          <button className="control" disabled={finished || solve.hintPending} onClick={() => solve.requestHint()}>
            HINT <span className="control__glyph">?</span>
          </button>
          <span className="control__scope">PRACTICE</span>
        </div>
      </div>

      <div />
    </div>
  );
}
