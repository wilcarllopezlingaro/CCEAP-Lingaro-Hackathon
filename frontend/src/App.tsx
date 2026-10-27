import { useState } from 'react';
import './App.css';
import RefreshMonitor from './components/RefreshMonitor';
import KeyVaultSnapshot, { keyVaultSummary } from './components/KeyVaultSnapshot';

type Workload = { name: string; domain: string; score: number; status: string; source: string; checks: number[]; updated: string };
const initial: Workload[] = [
  { name: 'Profitability', domain: 'Finance · SAP ingestion', score: 62, status: 'Blocked', source: 'Source data is 28 hours old', checks: [10, 20, 12, 10, 0, 10], updated: '4 min ago' },
  { name: 'Delphi Sales', domain: 'Commercial · Delta Lake', score: 96, status: 'Ready', source: 'All critical checks passed', checks: [25, 20, 16, 15, 10, 10], updated: '2 min ago' },
  { name: 'Supply Chain', domain: 'Operations · Azure SQL', score: 81, status: 'Review', source: 'Volume variance exceeds 20%', checks: [25, 20, 6, 15, 5, 10], updated: '6 min ago' },
  { name: 'Customer 360', domain: 'Commercial · Fabric', score: 100, status: 'Ready', source: 'All critical checks passed', checks: [25, 20, 20, 15, 10, 10], updated: '1 min ago' },
];
const rules = ['Source freshness', 'Schema validation', 'Volume validation', 'Duplicate check', 'Business date', 'Upstream dependencies'];
const weights = [25, 20, 20, 15, 10, 10];
function RiskBadge({ score }: { score: number }) {
  const level = score < 75 ? 'Critical' : score < 90 ? 'Warning' : 'Healthy';
  return <span className={`risk-badge risk-${level.toLowerCase()}`}>● {level}</span>;
}
const seedEvents = [
  { time: '10:42', title: 'Profitability refresh prevented', detail: 'Freshness policy failed. Refresh held before stale data reached users.', type: 'blocked' },
  { time: '10:38', title: 'Delphi Sales recovered', detail: 'Upstream source arrived. Demo validation returned to healthy.', type: 'ready' },
  { time: 'CSV', title: 'Key Vault sample imported', detail: '46 secrets have no expiry; 13 vaults could not be inspected. Identifiers anonymized; live health unverified.', type: 'review' },
];
function App() {
  const [workloads, setWorkloads] = useState(initial);
  const [view, setView] = useState('Overview');
  const [filter, setFilter] = useState('All workloads');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [events, setEvents] = useState(seedEvents);
  const [notice, setNotice] = useState('');
  const [demoRun, setDemoRun] = useState(0);
  const selectedWorkload = workloads.find(w => w.name === selected);
  const visible = workloads.filter(w => (filter === 'All workloads' || w.status === filter) && `${w.name} ${w.domain}`.toLowerCase().includes(search.toLowerCase()));
  const blocked = workloads.filter(w => w.status === 'Blocked').length;
  const average = Math.round(workloads.reduce((total, w) => total + w.score, 0) / workloads.length);
  function revalidate(name: string) {
    setWorkloads(current => current.map(w => w.name === name ? { ...w, score: 100, status: 'Ready', source: 'Demo recovery: all checks passed', checks: [...weights], updated: 'Just now' } : w));
    setEvents(current => [{ time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), title: `${name} demo recovery complete`, detail: 'Simulated source recovery and revalidation. No external refresh was triggered.', type: 'ready' }, ...current]);
    setNotice(`${name}: simulated revalidation passed. No external systems were changed.`);
  }
  return (
    <div className="sentinel-shell">
      <aside className="sidebar">
        <a className="brand" href="#overview" onClick={() => setView('Overview')}><span className="brand-mark">S</span><span>SENTINEL<small>CCEAP CONTROL PLANE</small></span></a>
        <div className="nav-caption">WORKSPACE</div>
        <nav aria-label="Main navigation">{[['Overview', '◈'], ['Workloads', '▦'], ['Access guardian', '◇'], ['Activity', '→']].map(([label, icon]) => <button key={label} className={view === label ? 'nav-item active' : 'nav-item'} onClick={() => { setView(label); setNotice(''); }}><span>{icon}</span>{label}{label === 'Access guardian' && <i>{keyVaultSummary.missingExpiry + keyVaultSummary.inaccessible}</i>}</button>)}</nav>
        <div className="sidebar-bottom"><div className="protection"><span className="live-dot" /> Prevention is active<small>Demo workspace · 4 workloads</small></div><div className="profile"><span className="avatar">CC</span><div>CCEAP Operations<small>Development workspace</small></div></div></div>
      </aside>
      <main>
        <header className="topbar"><span>Workspace <b>/</b> <strong>{view}</strong></span><span className="demo-badge">◉ DEMO DATA</span></header>
        <div className="page-content">
          <div className="page-heading"><div><div className="eyebrow">TRUST BEFORE REFRESH</div><h1>{view === 'Overview' ? 'Your data, one step ahead.' : view}</h1><p>Prevent issues before they become incidents.</p></div><button className="secondary" onClick={() => { setWorkloads(initial); setEvents(seedEvents); setDemoRun(current => current + 1); setNotice('Demo reset to the original sample scenario.'); }}>↻ Reset demo</button></div>
          <div className="demo-note">Demo workspace · Sample readiness, access, and incident data. Actions simulate recovery; no Power BI refreshes or notifications are sent.</div>
          {notice && <div className="notice" role="status">✓ {notice}<button aria-label="Dismiss notification" onClick={() => setNotice('')}>×</button></div>}
          {(view === 'Overview' || view === 'Workloads') && <>
            <section className="metrics" aria-label="Readiness summary">
              <article className="metric"><span>Average readiness <i>◈</i></span><div>{average}<small>/ 100</small></div><p><span className="positive">●</span> Across 4 monitored workloads</p></article>
              <article className="metric"><span>Refreshes blocked <i>⊘</i></span><div>{blocked.toString().padStart(2, '0')}<small className="risk-badge risk-critical">● Critical</small></div><p>Unsafe refreshes held by policy</p></article>
              <article className="metric"><span>Incidents prevented <i>♧</i></span><div>24<small className="positive">↑ 18%</small></div><p>Illustrative total · last 7 days</p></article>
              <article className="metric"><span>Access risks <i>◇</i></span><div>{keyVaultSummary.missingExpiry + keyVaultSummary.inaccessible}<small className="risk-badge risk-warning">● Review findings</small></div><p>{keyVaultSummary.missingExpiry} missing expiry · {keyVaultSummary.inaccessible} access unknown</p></article>
            </section>
            {view === 'Overview' && <section className="insights"><article className="panel trend-panel"><div className="panel-heading"><div><h2>Readiness over time</h2><p>Healthy data means confident decisions.</p></div><span className="legend"><span /> Fleet readiness · demo</span></div><div className="chart"><div className="chart-labels"><span>100</span><span>75</span><span>50</span></div><svg viewBox="0 0 700 160" preserveAspectRatio="none" role="img" aria-label="Illustrative fleet readiness trend rises from 74 to 85 over seven days"><defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#16a58b" stopOpacity=".22"/><stop offset="100%" stopColor="#16a58b" stopOpacity="0"/></linearGradient></defs><path d="M0 25H700 M0 80H700 M0 135H700" stroke="#edf0f3" fill="none"/><path d="M0 92 C45 92 65 45 115 55 S195 95 235 70 S300 22 350 34 S425 68 470 45 S545 63 585 39 S665 25 700 24 L700 160 L0 160Z" fill="url(#area)"/><path d="M0 92 C45 92 65 45 115 55 S195 95 235 70 S300 22 350 34 S425 68 470 45 S545 63 585 39 S665 25 700 24" fill="none" stroke="#159b83" strokeWidth="3"/></svg><div className="chart-days">{['Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue'].map(day => <span key={day}>{day}</span>)}</div></div></article><article className="attention-card"><span className="attention-icon">⊘</span><div className="eyebrow">PREVENTION IN ACTION</div><h2>{blocked ? 'Stale data stopped here.' : 'Clear to move forward.'}</h2><p>{blocked ? 'Profitability was blocked before stale source data could reach your report.' : 'All blocked workloads have recovered in this demo.'}</p><button onClick={() => setSelected('Profitability')}>Inspect workload <span>→</span></button></article></section>}
            <section className="panel workloads-panel"><div className="panel-heading"><div><h2>Workload health <span className="count">4</span></h2><p>Your pre-refresh checks, at a glance.</p></div><div className="table-controls"><input aria-label="Search workloads" placeholder="Search workloads…" value={search} onChange={e => setSearch(e.target.value)}/><select aria-label="Filter by status" value={filter} onChange={e => setFilter(e.target.value)}>{['All workloads', 'Ready', 'Review', 'Blocked'].map(option => <option key={option}>{option}</option>)}</select></div></div><div className="table-scroll"><table><thead><tr><th>WORKLOAD</th><th>READINESS</th><th>STATUS</th><th>CRITICALITY</th><th>LATEST SIGNAL</th><th>CHECKED</th><th><span className="sr-only">Details</span></th></tr></thead><tbody>{visible.map(w => <tr key={w.name}><td><button className="workload-name" onClick={() => setSelected(w.name)}>{w.name}</button><small>{w.domain}</small></td><td><div className="score-line"><strong>{w.score}<small>%</small></strong><span className="score-track"><span className={w.status.toLowerCase()} style={{ width: `${w.score}%` }}/></span></div></td><td><span className={`pill ${w.status.toLowerCase()}`}>● {w.status}</span></td><td><RiskBadge score={w.score} /></td><td>{w.source}</td><td className="muted">{w.updated}</td><td><button className="detail-button" aria-label={`Inspect ${w.name}`} onClick={() => setSelected(w.name)}>→</button></td></tr>)}</tbody></table>{!visible.length && <p className="empty-state">No workloads match your search and filter.</p>}</div><div className="table-footer"><span className="risk-legend" aria-label="Criticality legend"><span className="risk-critical">● Critical: below 75</span><span className="risk-warning">● Warning: 75–89</span><span className="risk-healthy">● Healthy: 90–100</span></span><span>4 workloads monitored</span></div></section>
          </>}
          <div hidden={view !== 'Overview' && view !== 'Workloads'}><RefreshMonitor key={demoRun} /></div>
          {(view === 'Overview' || view === 'Access guardian') && <KeyVaultSnapshot />}
          {(view === 'Overview' || view === 'Activity') && <section className="panel activity-panel"><div className="panel-heading"><div><h2>Recent activity</h2><p>A clear trail of what Sentinel caught.</p></div><span className="subtle-label">SAMPLE TIMELINE</span></div>{events.map((event, index) => <article className="event" key={`${event.title}-${index}`}><span className={`event-dot ${event.type}`} /><time>{event.time}</time><div><h3>{event.title}</h3><p>{event.detail}</p></div><span className={`pill ${event.type}`}>{event.type === 'ready' ? 'Recovered' : event.type === 'blocked' ? 'Prevented' : 'Attention'}</span></article>)}</section>}
          <footer>CCEAP Sentinel <span>Prevent. Protect. Proceed.</span><small>Development dashboard · Demo mode</small></footer>
        </div>
      </main>
      {selectedWorkload && <div className="modal-backdrop" onClick={() => setSelected(null)}><section className="detail-modal" role="dialog" aria-modal="true" aria-labelledby="detail-title" onClick={e => e.stopPropagation()} onKeyDown={e => { if (e.key === 'Escape') setSelected(null); }}><button className="close-modal" autoFocus aria-label="Close workload details" onClick={() => setSelected(null)}>×</button><div className="eyebrow">WORKLOAD DIAGNOSTICS · DEMO</div><h2 id="detail-title">{selectedWorkload.name}</h2><p>{selectedWorkload.domain}</p><div className="detail-score">{selectedWorkload.score}<small>/ 100</small><span className={`pill ${selectedWorkload.status.toLowerCase()}`}>{selectedWorkload.status}</span></div><div className="detail-criticality">Risk level <RiskBadge score={selectedWorkload.score} /></div><p>{selectedWorkload.source}</p><div className="rule-list">{rules.map((rule, index) => <div key={rule}><span>{rule}</span><strong>{selectedWorkload.checks[index]} / {weights[index]}</strong></div>)}</div><p className="detail-help">Simulate a recovered source and re-run all six checks. This changes demo data only; no external refresh is triggered.</p><button className="primary" onClick={() => revalidate(selectedWorkload.name)}>Simulate recovery & revalidate</button></section></div>}
    </div>
  );
}
export default App;
