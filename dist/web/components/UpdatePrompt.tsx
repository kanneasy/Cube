import { useRegisterSW } from 'virtual:pwa-register/react';

/**
 * The reload-to-update prompt.
 *
 * The service worker registers with `registerType: 'prompt'` rather than 'autoUpdate',
 * and this is the half that makes that setting mean anything. Auto-activating a new
 * worker swaps the JS chunks under a running app, so any in-flight module reference
 * points at a replaced file -- which in this app means mid-solve, with a clock running
 * and a move log that only exists in memory.
 *
 * So the new build waits, the user is told, and it activates when they choose.
 */
export function UpdatePrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  if (!needRefresh) return null;

  return (
    <div className="update-prompt" role="status">
      <span>A new version is ready.</span>
      <div className="update-prompt__actions">
        <button className="control" onClick={() => void updateServiceWorker(true)}>
          RELOAD
        </button>
        <button className="control" onClick={() => setNeedRefresh(false)}>
          LATER
        </button>
      </div>
    </div>
  );
}
