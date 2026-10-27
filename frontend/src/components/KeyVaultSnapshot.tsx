import { useState } from 'react';
import records from '../data/keyVaultSnapshot.json';

type SnapshotRecord = (typeof records)[number];
export const keyVaultSummary = {
  total: records.length,
  vaults: new Set(records.map(record => record.vault)).size,
  missingExpiry: records.filter(record => record.status === 'NO_EXPIRY_SET').length,
  inaccessible: records.filter(record => record.status === 'NO_ACCESS').length,
  healthy: records.filter(record => record.status === 'OK').length,
};
function assessment(record: SnapshotRecord) {
  if (record.status === 'NO_ACCESS') return { level: 'Unknown', reason: 'Access denied', recommendation: 'Ask the vault owner to verify network access and the minimum secret-list metadata permissions, then rerun the check. Secret health is unknown.' };
  if (record.status === 'NO_EXPIRY_SET') return { level: 'Warning', reason: 'No expiry set', recommendation: 'Confirm the credential lifecycle and owner. Set an expiry and rotation policy where appropriate; missing expiry alone does not prove compromise.' };
  if (record.daysLeft !== null && record.daysLeft <= 7) return { level: 'Critical', reason: record.daysLeft <= 0 ? 'Expired or expires today' : 'Expires within 7 days', recommendation: 'Have the owner renew or rotate the credential and validate dependent access before expiry.' };
  if (record.daysLeft !== null && record.daysLeft <= 30) return { level: 'Warning', reason: 'Expires within 30 days', recommendation: 'Schedule renewal with the credential owner and verify dependencies.' };
  return { level: 'Healthy', reason: 'OK in uploaded snapshot', recommendation: 'Continue monitoring. This uploaded snapshot does not establish current Azure health.' };
}
export default function KeyVaultSnapshot() {
  const [filter, setFilter] = useState('All records');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<SnapshotRecord | null>(null);
  const filtered = records.filter(record => (filter === 'All records' || assessment(record).level === filter) && `${record.vault} ${record.secret ?? ''} ${record.resourceGroup}`.toLowerCase().includes(query.toLowerCase()));
  return <section className="panel keyvault-panel" aria-labelledby="keyvault-title">
    <div className="panel-heading"><div><div className="eyebrow">AZURE KEY VAULT · IMPORTED SAMPLE</div><h2 id="keyvault-title">Secret lifecycle & access</h2><p>{keyVaultSummary.total} records across {keyVaultSummary.vaults} vaults · Anonymized production sample</p></div><span className="demo-badge">STATIC SNAPSHOT</span></div>
    <p className="snapshot-note">Vault, secret, and resource group names are anonymized. Dates and days left are preserved from the CSV; the scan date is unavailable, and days left are not a live countdown. Access-denied rows represent vaults, not individual secrets.</p>
    <div className="snapshot-summary"><div><strong>{keyVaultSummary.missingExpiry}</strong><span className="risk-badge risk-warning">● Warning</span><small>Secrets without expiry</small></div><div><strong>{keyVaultSummary.inaccessible}</strong><span className="risk-badge risk-unknown">● Unknown</span><small>Vaults with access denied</small></div><div><strong>{keyVaultSummary.healthy}</strong><span className="risk-badge risk-healthy">● Healthy</span><small>OK in uploaded snapshot</small></div></div>
    <div className="snapshot-toolbar"><div className="risk-legend" aria-label="Secret criticality policy"><span className="risk-critical">● Critical: ≤7 days</span><span className="risk-warning">● Warning: 8–30 days or no expiry</span><span className="risk-healthy">● Healthy: &gt;30 days</span><span className="risk-unknown">● Unknown: no access</span></div><div className="table-controls"><input aria-label="Search Key Vault records" placeholder="Search sample identifiers…" value={query} onChange={event => setQuery(event.target.value)} /><select aria-label="Filter Key Vault risk" value={filter} onChange={event => setFilter(event.target.value)}>{['All records', 'Critical', 'Warning', 'Healthy', 'Unknown'].map(level => <option key={level}>{level}</option>)}</select></div></div>
    <div className="snapshot-table table-scroll"><table aria-label="Azure Key Vault sample records"><thead><tr><th>VAULT / SECRET</th><th>RESOURCE GROUP</th><th>FINDING</th><th>CRITICALITY</th><th>EXPIRY (UTC)</th><th>DAYS LEFT IN CSV</th><th>ENABLED</th><th>ACTION</th></tr></thead><tbody>{filtered.map(record => { const risk = assessment(record); return <tr key={record.id}><td><strong>{record.vault}</strong><small>{record.secret ?? 'Vault-level access check'}</small></td><td>{record.resourceGroup}</td><td>{risk.reason}</td><td><span className={`risk-badge risk-${risk.level.toLowerCase()}`}>● {risk.level}</span></td><td>{record.expiresOn ?? 'Not available'}</td><td>{record.daysLeft ?? 'Unknown'}</td><td>{record.enabled === null ? 'Unknown' : record.enabled ? 'Yes' : 'No'}</td><td><button className="workload-name" onClick={() => setSelected(record)} aria-label={`Review ${record.secret ?? record.vault}`}>Review →</button></td></tr>; })}</tbody></table>{!filtered.length && <p className="empty-state">No Key Vault records match this filter.</p>}</div>
    <div className="snapshot-footer">Showing {filtered.length} of {records.length} records. No live Azure connection or credential changes.</div>
    {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><section className="detail-modal" role="dialog" aria-modal="true" aria-labelledby="kv-detail-title" onClick={event => event.stopPropagation()} onKeyDown={event => { if (event.key === 'Escape') setSelected(null); }}><button className="close-modal" aria-label="Close Key Vault recommendation" autoFocus onClick={() => setSelected(null)}>×</button><div className="eyebrow">IMPORTED SNAPSHOT · RECOMMENDATION</div><h2 id="kv-detail-title">{selected.secret ?? selected.vault}</h2><p>{selected.vault} · {selected.resourceGroup}</p><div className="detail-criticality"><span className={`risk-badge risk-${assessment(selected).level.toLowerCase()}`}>● {assessment(selected).level}</span>{assessment(selected).reason}</div><p>{assessment(selected).recommendation}</p><p className="detail-help">This is guidance for the sample finding. No Azure operation has been performed.</p></section></div>}
  </section>;
}
