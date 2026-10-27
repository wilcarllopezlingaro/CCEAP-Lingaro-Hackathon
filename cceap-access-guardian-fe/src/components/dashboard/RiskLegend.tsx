import { RISK_CONFIG, RISK_LEVELS_ORDER } from "@/lib/risk";

/**
 * Explains the color coding / day-range rules used across the
 * dashboard so users understand how risk levels are determined.
 */
export function RiskLegend() {
  return (
    <section
      aria-label="Risk classification legend"
      className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
    >
      <h2 className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-200">
        Risk Classification
      </h2>
      <ul className="flex flex-wrap gap-3">
        {RISK_LEVELS_ORDER.map((level) => {
          const config = RISK_CONFIG[level];
          return (
            <li
              key={level}
              className={`flex min-w-[150px] flex-1 items-center gap-3 rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800/60 ${config.accentClassName}`}
            >
              <span
                className={`h-3 w-3 shrink-0 rounded-full ${config.dotClassName}`}
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  {config.label}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{config.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
