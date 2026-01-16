import React from "react";
import type { MetricProps } from "../types";

export function Metric({ label, value, accent }: MetricProps) {
  return (
    <div className="text-center">
      <div className="text-zinc-500 uppercase tracking-widest text-[9px]">
        {label}
      </div>
      <div className={`text-xl ${accent ? "text-amber-500" : "text-zinc-300"}`}>
        {value}
      </div>
    </div>
  );
}