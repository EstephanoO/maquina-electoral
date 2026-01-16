import React from "react";
import type { Competitor } from "../types";

const competitors: Competitor[] = [
  { name: "F. Rospigliosi", power: "82%" },
  { name: "P. P. Kuczynski", power: "55%" },
];

export function CompetitorsScene() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
      {competitors.map((r) => (
        <div
          key={r.name}
          className="bg-[#080808] border border-zinc-800/40 rounded p-4"
        >
          <div className="text-[9px] uppercase tracking-widest text-red-500/70 font-mono">
            Active Threat
          </div>
          <div className="text-xl font-mono text-white mt-1">{r.name}</div>
          <div className="mt-3 text-zinc-500 text-[10px] font-mono">
            Proyección: <span className="text-amber-500">{r.power}</span>
          </div>
        </div>
      ))}
    </div>
  );
}