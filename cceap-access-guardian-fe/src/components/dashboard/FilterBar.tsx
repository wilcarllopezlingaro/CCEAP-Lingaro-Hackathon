"use client";

import { RISK_CONFIG, RISK_LEVELS_ORDER } from "@/lib/risk";
import type { RiskLevel } from "@/lib/types";

interface FilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  activeRiskLevels: Set<RiskLevel>;
  onToggleRiskLevel: (level: RiskLevel) => void;
  onReset: () => void;
}

/**
 * Client-side controls for narrowing the secrets table: free-text
 * search plus toggle-able risk level chips (color-coded to match the
 * rest of the dashboard).
 */
export function FilterBar({
  search,
  onSearchChange,
  activeRiskLevels,
  onToggleRiskLevel,
  onReset,
}: FilterBarProps) {
  const hasActiveFilters = search.length > 0 || activeRiskLevels.size < RISK_LEVELS_ORDER.length;

  return (
    <section
      aria-label="Secret filters"
      className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:flex-row sm:items-center sm:justify-between"
    >
      <input
        type="search"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search by secret name, vault, or owner..."
        aria-label="Search secrets"
        className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 sm:max-w-xs"
      />

      <div className="flex flex-wrap items-center gap-2">
        {RISK_LEVELS_ORDER.map((level) => {
          const config = RISK_CONFIG[level];
          const isActive = activeRiskLevels.has(level);
          return (
            <button
              key={level}
              type="button"
              onClick={() => onToggleRiskLevel(level)}
              aria-pressed={isActive}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                isActive
                  ? config.badgeClassName
                  : "border border-zinc-200 bg-zinc-50 text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-500"
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${config.dotClassName}`} aria-hidden="true" />
              {config.label}
            </button>
          );
        })}

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="text-xs font-medium text-zinc-500 underline-offset-2 hover:underline dark:text-zinc-400"
          >
            Reset
          </button>
        )}
      </div>
    </section>
  );
}
