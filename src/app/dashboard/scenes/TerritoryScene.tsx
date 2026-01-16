import React from "react";
import { Map as MapIcon } from "lucide-react";

export function TerritoryScene() {
  return (
    <div className="h-full bg-[#080808] border border-zinc-800/40 rounded flex items-center justify-center relative">
      <MapIcon size={48} className="text-zinc-800" />
      <div className="absolute bottom-3 text-[9px] tracking-[0.4em] font-mono uppercase text-zinc-600">
        Geo Strategy Engine
      </div>
    </div>
  );
}