import { Metric } from "../ui/Metric";
import { KPI } from "../ui/KPI";

export function PulseScene() {
  return (
    <div className="grid grid-cols-12 gap-3 h-full">
      <div
        className="col-span-12 lg:col-span-8 relative rounded-xl border border-zinc-800/50
        bg-gradient-to-br from-[#0b0b0b] to-[#050505]
        flex items-center justify-center"
      >
        <div className="text-center">
          <div className="text-[10px] tracking-[0.4em] text-zinc-500 font-mono uppercase">
            Campaign Status
          </div>
          <div className="mt-4 text-8xl font-mono font-black text-white tracking-tight relative">
            ESTABLE
            <span className="absolute inset-0 blur-2xl bg-amber-500/10" />
          </div>

          <div className="mt-6 flex gap-10 justify-center text-[11px] font-mono">
            <Metric label="Base Electoral" value="26.9M" />
            <Metric label="Prob. Escaño" value="68.4%" accent />
          </div>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-4 grid grid-rows-4 gap-2">
        <KPI label="Visibilidad Digital" value="15K" status="mid" />
        <KPI label="Engagement" value="20-120" status="low" />
        <KPI label="Riesgo Reputacional" value="Bajo" status="good" />
        <KPI label="Recordación" value="42%" status="mid" />
      </div>
    </div>
  );
}

