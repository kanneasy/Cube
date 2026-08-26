import { useMemo } from 'react';
import {
  averageOf12,
  averageOf5,
  finalMs,
  formatAverage,
  formatScoreSheet,
  formatTime,
  rollingWindow,
} from '../../solve/results';
import {
  asResult,
  dailyAttempts,
  fastestBoard,
  fewestMovesBoard,
  patternBest,
  type StoredSolve,
} from '../../store/records';
import { PATTERNS } from '../../cube/patterns';
import { PALETTES, type PaletteId } from '../cube/palette';
import { Mark } from './Mark';

interface Props {
  solves: StoredSolve[];
  storageUnavailable: boolean;
  today: string;
  paletteId: PaletteId;
  soundOn: boolean;
  onPalette: (id: PaletteId) => void;
  onSound: (on: boolean) => void;
  onClose: () => void;
  onStartDaily: () => void;
  onStartPattern: (id: (typeof PATTERNS)[number]['id']) => void;
}

function Board({ title, rows, empty }: { title: string; rows: string[]; empty: string }) {
  return (
    <section className="board">
      <h3 className="board__title">{title}</h3>
      {rows.length === 0 ? (
        <p className="board__empty">{empty}</p>
      ) : (
        <ol className="board__list">
          {rows.map((row, i) => (
            <li key={i} className="board__row" data-best={i === 0}>
              <span className="board__rank">{i + 1}</span>
              <span className="board__value">{row}</span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

export function MenuSheet(props: Props) {
  const { solves, today } = props;

  const fastest = useMemo(() => fastestBoard(solves), [solves]);
  const fewest = useMemo(() => fewestMovesBoard(solves), [solves]);
  const history = useMemo(() => [...solves].sort((a, b) => b.createdAt.localeCompare(a.createdAt)), [solves]);
  const daily = useMemo(() => dailyAttempts(solves, today), [solves, today]);

  // Averages read the competition-mode stream, which is the only place they mean
  // anything: casual solves have no inspection and no penalties.
  const competition = useMemo(
    () => solves.filter((s) => s.mode === 'competition' && s.goal.kind === 'solved' && !s.hinted).map(asResult),
    [solves],
  );
  const ao5 = rollingWindow(competition, 5);
  const ao12 = rollingWindow(competition, 12);

  return (
    <div className="sheet" role="dialog" aria-label="Menu">
      <div className="sheet__head">
        <h2 className="sheet__title">
          <Mark size={18} />
          RECORDS
        </h2>
        <button className="control" onClick={props.onClose}>
          CLOSE
        </button>
      </div>

      <div className="sheet__body">
        {props.storageUnavailable && (
          <p className="board__warning">
            This device is not letting the app store anything, so nothing here will be kept. A private window
            usually causes it. The cube still works.
          </p>
        )}

        <Board
          title="BEST SINGLE"
          empty="No solves yet. Finish one and it lands here."
          rows={fastest.map((s) => formatTime(finalMs(asResult(s))))}
        />

        <Board
          title="FEWEST MOVES"
          empty="No solves yet."
          rows={fewest.map((s) => `${s.moveCount} moves · ${formatTime(finalMs(asResult(s)))}`)}
        />

        <section className="board">
          <h3 className="board__title">BEST AVERAGE</h3>
          <div className="stat-row">
            <div className="stat">
              <span className="stat__label">AO5</span>
              <span className="stat__value">{ao5 ? formatAverage(averageOf5(ao5)) : '—'}</span>
            </div>
            <div className="stat">
              {/* A real number, and not an official WCA format. The scope tag says so
                  where the number is, rather than in a footnote nobody opens. */}
              <span className="stat__label">
                AO12 <span className="split__scope">NOT WCA</span>
              </span>
              <span className="stat__value">{ao12 ? formatAverage(averageOf12(ao12)) : '—'}</span>
            </div>
          </div>
          <p className="board__note">Rolling, from Competition solves only.</p>
        </section>

        <section className="board">
          <h3 className="board__title">TODAY</h3>
          <button className="control control--wide" onClick={props.onStartDaily}>
            DAILY SCRAMBLE
          </button>
          {daily.length === 0 ? (
            <p className="board__empty">Today&rsquo;s scramble is waiting.</p>
          ) : (
            <ol className="board__list">
              {daily.map((s) => (
                <li key={s.id} className="board__row">
                  <span className="board__value">{formatScoreSheet(asResult(s))}</span>
                  <span className="board__meta">{s.moveCount} moves</span>
                </li>
              ))}
            </ol>
          )}
        </section>

        <section className="board">
          <h3 className="board__title">PATTERNS</h3>
          <ul className="board__list">
            {PATTERNS.map((pattern) => {
              const best = patternBest(solves, pattern.id);
              return (
                <li key={pattern.id} className="board__row">
                  <button className="board__link" onClick={() => props.onStartPattern(pattern.id)}>
                    {pattern.name.toUpperCase()}
                  </button>
                  <span className="board__meta">{best ? `${best.moveCount} moves` : 'Not yet'}</span>
                </li>
              );
            })}
          </ul>
          <p className="board__note">Patterns keep a move record, not a time.</p>
        </section>

        <section className="board">
          <h3 className="board__title">HISTORY</h3>
          {history.length === 0 ? (
            <p className="board__empty">Nothing solved yet.</p>
          ) : (
            <ol className="board__list">
              {history.slice(0, 40).map((s) => (
                <li key={s.id} className="board__row">
                  <span className="board__value">{formatScoreSheet(asResult(s))}</span>
                  <span className="board__meta">
                    {s.moveCount} moves
                    {/* Practice solves stay in the history, marked. A history that
                        hides them is lying about what happened. */}
                    {s.hinted ? ' · PRACTICE' : ''}
                    {s.goal.kind === 'pattern' ? ` · ${s.goal.pattern.toUpperCase()}` : ''}
                  </span>
                </li>
              ))}
            </ol>
          )}
        </section>

        <section className="board">
          <h3 className="board__title">COLOURS</h3>
          <div className="choices">
            {Object.values(PALETTES).map((palette) => (
              <button
                key={palette.id}
                className="choice"
                data-selected={props.paletteId === palette.id}
                onClick={() => props.onPalette(palette.id)}
              >
                <span className="choice__swatches">
                  {Object.values(palette.faces).map((hex) => (
                    <span key={hex} className="choice__swatch" style={{ background: hex }} />
                  ))}
                </span>
                {palette.name.toUpperCase()}
              </button>
            ))}
          </div>
          <p className="board__note">
            Universal is derived for red-green colour vision deficiency. Face positions do not move.
          </p>
        </section>

        <section className="board">
          <h3 className="board__title">SOUND</h3>
          <button className="control control--wide" onClick={() => props.onSound(!props.soundOn)}>
            {props.soundOn ? 'SOUND ON' : 'SOUND OFF'}
          </button>
          <p className="board__note">iOS gives a web app no haptics, so sound is the only feel a turn has.</p>
        </section>
      </div>
    </div>
  );
}
