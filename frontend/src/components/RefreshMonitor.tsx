import { useEffect, useReducer } from 'react';

type Status = 'idle' | 'failed' | 'succeeded' | 'exhausted';
type State = { status: Status; retries: number; automatic: boolean; scenario: string; history: string[] };
type Action = { type: 'start' | 'retry' | 'toggle' } | { type: 'scenario'; value: string };
const initial: State = { status: 'idle', retries: 0, automatic: true, scenario: 'persistent', history: [] };
const MAX_RETRIES = 3;
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'start':
      if (state.status === 'failed') return state;
      return { ...state, status: 'failed', retries: 0, history: ['Initial refresh failed: simulated gateway timeout.'] };
    case 'toggle': return { ...state, automatic: !state.automatic };
    case 'scenario': return state.status === 'failed' ? state : { ...state, scenario: action.value };
    case 'retry': {
      if (!state.automatic || state.status !== 'failed' || state.retries >= MAX_RETRIES) return state;
      const retries = state.retries + 1;
      const succeeded = state.scenario === 'recovery' && retries === 2;
      return { ...state, retries, status: succeeded ? 'succeeded' : retries === MAX_RETRIES ? 'exhausted' : 'failed', history: [...state.history, `Retry ${retries}/${MAX_RETRIES}: ${succeeded ? 'refresh succeeded; automatic retries stopped.' : 'simulated gateway timeout.'}`] };
    }
  }
}
export default function RefreshMonitor() {
  const [state, dispatch] = useReducer(reducer, initial);
  useEffect(() => {
    if (state.status !== 'failed' || !state.automatic || state.retries >= MAX_RETRIES) return;
    const timer = window.setTimeout(() => dispatch({ type: 'retry' }), 2000);
    return () => window.clearTimeout(timer);
  }, [state.status, state.automatic, state.retries]);
  const label = state.status === 'exhausted' ? 'Failed · retry limit reached' : state.status === 'failed' ? 'Refresh failed' : state.status === 'succeeded' ? 'Refresh succeeded' : 'Not started';
  const risk = state.status === 'succeeded' ? 'healthy' : state.status === 'exhausted' ? 'critical' : state.status === 'failed' ? 'warning' : 'unknown';
  return <section className="panel refresh-panel" aria-labelledby="refresh-title">
    <div className="panel-heading"><div><div className="eyebrow">REFRESH OPERATIONS · DEMO</div><h2 id="refresh-title">Refresh failures & automatic retries</h2><p>At most 3 retries after the initial failure. One simulated attempt every 2 seconds.</p></div><label className="retry-toggle"><input type="checkbox" checked={state.automatic} onChange={() => dispatch({ type: 'toggle' })} /> Auto retry</label></div>
    <div className="refresh-summary"><div><span>Workload</span><strong>Delphi Sales</strong></div><div><span>Refresh status</span><strong className={`risk-badge risk-${risk}`}>{label}</strong></div><div><span>Retries used</span><strong aria-label="Retries used">{state.retries} / {MAX_RETRIES}</strong></div><div><span>Total attempts</span><strong>{state.status === 'idle' ? 0 : state.retries + 1}<small> (initial + retries)</small></strong></div></div>
    <div className="refresh-controls"><label>Demo outcome <select aria-label="Demo refresh outcome" value={state.scenario} disabled={state.status === 'failed'} onChange={event => dispatch({ type: 'scenario', value: event.target.value })}><option value="persistent">Persistent failure · stop at 3 retries</option><option value="recovery">Recover on retry 2</option></select></label><button className="secondary" disabled={state.status === 'failed'} onClick={() => dispatch({ type: 'start' })}>{state.status === 'idle' ? 'Simulate refresh failure' : 'Start new demo run'}</button></div>
    <p className="retry-message" aria-live="polite">{state.status === 'exhausted' ? 'Maximum 3 retries reached. Automatic retry stopped. Manual investigation required.' : state.status === 'failed' ? state.automatic ? `Next automatic retry: ${state.retries + 1}/3 in 2 seconds.` : 'Automatic retry paused. Enable Auto retry to resume with the remaining budget.' : state.status === 'succeeded' ? 'Refresh recovered. No more retries will run.' : 'Start a demo run to see refresh failures and retry counts.'}</p>
    {state.history.length > 0 && <ol className="retry-history" aria-label="Refresh attempt history">{state.history.map((entry, index) => <li key={index}>{entry}</li>)}</ol>}
    <p className="refresh-note">Blocked or review-required workloads are not retried. This scenario uses a ready workload and simulated transient failures. No Power BI calls are made; retry state resets on page reload or Reset demo.</p>
  </section>;
}
