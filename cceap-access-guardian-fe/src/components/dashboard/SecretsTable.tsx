import { RISK_CONFIG, formatDaysRemaining } from "@/lib/risk";
import type { SecretWithRisk } from "@/lib/types";
import { RiskBadge } from "@/components/dashboard/RiskBadge";

interface SecretsTableProps {
  secrets: SecretWithRisk[];
}

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Detailed, color-coded table of monitored Azure secrets. Row left
 * borders and the risk badge reuse the shared RISK_CONFIG so the
 * color coding always matches the legend and summary cards.
 */
export function SecretsTable({ secrets }: SecretsTableProps) {
  if (secrets.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-10 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
        No secrets match the current filters.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[920px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:border-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-400">
              <th className="px-4 py-3">Secret</th>
              <th className="px-4 py-3">Vault / Subscription</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Environment</th>
              <th className="px-4 py-3">Last Refreshed</th>
              <th className="px-4 py-3">Expires</th>
              <th className="px-4 py-3">Remaining Validity</th>
              <th className="px-4 py-3">Risk</th>
            </tr>
          </thead>
          <tbody>
            {secrets.map((secret) => {
              const config = RISK_CONFIG[secret.riskLevel];
              return (
                <tr
                  key={secret.id}
                  className={`border-b border-zinc-100 last:border-0 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/40 ${config.accentClassName}`}
                >
                  <td className="px-4 py-3">
                    <p className="font-medium text-zinc-900 dark:text-zinc-50">{secret.name}</p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500">{secret.owner}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-zinc-700 dark:text-zinc-300">{secret.vaultName}</p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500">
                      {secret.subscription}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">{secret.kind}</td>
                  <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                    {secret.environment}
                  </td>
                  <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                    {formatDate(secret.lastRefreshedAt)}
                  </td>
                  <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                    {formatDate(secret.expiresAt)}
                  </td>
                  <td
                    className={`px-4 py-3 font-medium ${
                      secret.isExpired ? "text-red-600" : "text-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    {formatDaysRemaining(secret.daysRemaining)}
                  </td>
                  <td className="px-4 py-3">
                    <RiskBadge level={secret.riskLevel} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
