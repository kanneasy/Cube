import { useEffect, useRef, useState } from 'react';
import { CubeRenderer } from './cube/renderer';
import { PALETTES } from './cube/palette';
import { generateScramble } from '../solve/oracle';
import { applyMoves, solvedCube } from '../cube/state';
import { parseAlg } from '../cube/notation';

export function App() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<CubeRenderer | null>(null);
  const [scramble, setScramble] = useState<string>('');

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const renderer = new CubeRenderer(stage, PALETTES.cardinal);
    rendererRef.current = renderer;

    const onResize = () => renderer.resize();
    window.addEventListener('resize', onResize);

    let cancelled = false;
    void generateScramble().then((alg) => {
      if (cancelled) return;
      setScramble(alg);
      renderer.setState(applyMoves(solvedCube(), parseAlg(alg)));
    });

    return () => {
      cancelled = true;
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      rendererRef.current = null;
    };
  }, []);

  return (
    <>
      <div className="stage" ref={stageRef} />
      <div className="chrome chrome--top">
        <div className="timer">0.00</div>
        <div className="scramble">{scramble}</div>
      </div>
    </>
  );
}
