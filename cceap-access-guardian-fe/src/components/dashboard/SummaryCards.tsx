import { RISK_CONFIG, RISK_LEVELS_ORDER } from "@/lib/risk";
import type { RiskSummary } from "@/lib/types";

interface SummaryCardsProps {
  summary: RiskSummary;
}

/**
 * Top-of-dashboard KPI cards showing the total number of secrets per
 * risk bucket, color-coded to match the legend and table badges.
 */
export function SummaryCards({ summary }: SummaryCardsProps) {
  return (
    <section
      aria-label="Secrets risk summary"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
    >
      <TotalCard total={summary.total} />
      {RISK_LEVELS_ORDER.map((level) => {
        const config = RISK_CONFIG[level];
        const count = summary[level];
        const percentage = summary.total > 0 ? Math.round((count / summary.total) * 100) : 0;

        return (
          <div
            key={level}
            className={`rounded-xl bg-white p-4 shadow-sm dark:bg-zinc-900 ${config.accentClassName}`}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {config.label}
              </p>
              <span className={`h-2.5 w-2.5 rounded-full ${config.dotClassName}`} aria-hidden="true" />
            </div>
            <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">{count}</p>
            <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
              {percentage}% of secrets &middot; {config.description}
            </p>
          </div>
        );
      })}
    </section>
  );
}

function TotalCard({ total }: { total: number }) {
  return (
    <div className="rounded-xl border-l-4 border-zinc-400 bg-white p-4 shadow-sm dark:border-zinc-600 dark:bg-zinc-900">
      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Total Secrets</p>
      <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">{total}</p>
      <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">Monitored across all vaults</p>
    </div>
  );
}
