import { RISK_CONFIG } from "@/lib/risk";
import type { RiskLevel } from "@/lib/types";

interface RiskBadgeProps {
  level: RiskLevel;
  className?: string;
}

/**
 * Small pill-style badge used to color-code a secret's risk level
 * wherever it appears (tables, cards, etc.).
 */
export function RiskBadge({ level, className = "" }: RiskBadgeProps) {
  const config = RISK_CONFIG[level];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${config.badgeClassName} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dotClassName}`} aria-hidden="true" />
      {config.label}
    </span>
  );
}
