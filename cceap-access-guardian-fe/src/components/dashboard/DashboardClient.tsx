"use client";

import { useMemo, useState } from "react";

import { RISK_LEVELS_ORDER } from "@/lib/risk";
import type { RiskLevel, SecretWithRisk } from "@/lib/types";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { SecretsTable } from "@/components/dashboard/SecretsTable";

interface DashboardClientProps {
  secrets: SecretWithRisk[];
}

/**
 * Client-side island responsible for interactive filtering of the
 * secrets table (search + risk level toggles). Receives already
 * risk-enriched data fetched on the server.
 */
export function DashboardClient({ secrets }: DashboardClientProps) {
  const [search, setSearch] = useState("");
  const [activeRiskLevels, setActiveRiskLevels] = useState<Set<RiskLevel>>(
    () => new Set(RISK_LEVELS_ORDER)
  );

  const toggleRiskLevel = (level: RiskLevel) => {
    setActiveRiskLevels((current) => {
      const next = new Set(current);
      if (next.has(level)) {
        next.delete(level);
      } else {
        next.add(level);
      }
      return next;
    });
  };

  const resetFilters = () => {
    setSearch("");
    setActiveRiskLevels(new Set(RISK_LEVELS_ORDER));
  };

  const filteredSecrets = useMemo(() => {
    const query = search.trim().toLowerCase();

    return secrets.filter((secret) => {
      if (!activeRiskLevels.has(secret.riskLevel)) return false;

      if (!query) return true;

      return (
        secret.name.toLowerCase().includes(query) ||
        secret.vaultName.toLowerCase().includes(query) ||
        secret.owner.toLowerCase().includes(query) ||
        secret.subscription.toLowerCase().includes(query)
      );
    });
  }, [secrets, search, activeRiskLevels]);

  return (
    <div className="flex flex-col gap-4">
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        activeRiskLevels={activeRiskLevels}
        onToggleRiskLevel={toggleRiskLevel}
        onReset={resetFilters}
      />
      <p className="text-xs text-zinc-400 dark:text-zinc-500">
        Showing {filteredSecrets.length} of {secrets.length} secrets
      </p>
      <SecretsTable secrets={filteredSecrets} />
    </div>
  );
}
