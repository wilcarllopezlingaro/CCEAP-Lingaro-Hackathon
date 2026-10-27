import { getDashboardData, isUsingLiveApi } from "@/lib/api";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { RiskLegend } from "@/components/dashboard/RiskLegend";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { DashboardClient } from "@/components/dashboard/DashboardClient";

// Risk is computed relative to "now", so always render dynamically
// rather than freezing day counts at build time.
export const dynamic = "force-dynamic";

export default async function Home() {
  const { secrets, summary } = await getDashboardData();

  const lastUpdated = new Date().toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="min-h-full flex-1 bg-zinc-50 dark:bg-zinc-950">
      <main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <DashboardHeader usingLiveApi={isUsingLiveApi()} lastUpdated={lastUpdated} />
        <SummaryCards summary={summary} />
        <RiskLegend />
        <DashboardClient secrets={secrets} />
      </main>
    </div>
  );
}

