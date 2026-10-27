interface DashboardHeaderProps {
  usingLiveApi: boolean;
  lastUpdated: string;
}

/**
 * Top banner for the dashboard: title, short description, and a small
 * indicator of whether data is coming from the live API or the mock
 * dataset (useful while the backend integration is pending).
 */
export function DashboardHeader({ usingLiveApi, lastUpdated }: DashboardHeaderProps) {
  return (
    <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
          CCEAP Access Guardian
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Azure Key Vault secrets monitoring &mdash; tracks refresh dates and flags upcoming
          expirations by risk.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
            usingLiveApi
              ? "bg-green-100 text-green-800"
              : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${usingLiveApi ? "bg-green-600" : "bg-zinc-400"}`}
            aria-hidden="true"
          />
          {usingLiveApi ? "Live API" : "Mock Data"}
        </span>
        <span className="text-xs text-zinc-400 dark:text-zinc-500">Updated {lastUpdated}</span>
      </div>
    </header>
  );
}
