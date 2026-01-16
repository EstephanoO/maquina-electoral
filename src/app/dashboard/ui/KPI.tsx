import React from "react";
import type { KPIProps } from "../types";

export function KPI({ label, value, status }: KPIProps) {
  const color =
    status === "low"
      ? "bg-red-500"
      : status === "mid"
        ? "bg-amber-500"
        : "bg-blue-500";

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-[#080808] border border-zinc-800/40 rounded">
      <div>
        <div className="text-lg font-mono text-zinc-200">{value}</div>
        <div className="text-[9px] uppercase tracking-widest text-zinc-600">
          {label}
        </div>
      </div>
      <div className={`w-2 h-2 rounded-full ${color} shadow`} />
    </div>
  );
}