"use client";

import React from "react";
import { Clock } from "lucide-react";
import MapContainer from "./components/map-container";

export default function GeohubPage() {
  const time = new Date().toLocaleTimeString("es-PE", {
    timeZone: "America/Lima",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex h-screen bg-[#020202] text-zinc-400 font-sans overflow-hidden">
      <main className="flex-1 flex flex-col bg-[radial-gradient(circle_at_50%_50%,#0a0a0a,#020202)]">
        <header className="h-10 px-4 flex items-center justify-between border-b border-zinc-800/30 bg-black/60 backdrop-blur">
          <div>
            <div className="text-[10px] font-mono text-amber-500 font-bold uppercase">
              Monitoreo Geográfico
            </div>
            <div className="text-[8px] font-mono text-zinc-600 tracking-widest uppercase">
              Análisis en Tiempo Real
            </div>
          </div>

          <div className="flex items-center gap-6 text-[10px] font-mono">
            <div className="text-zinc-600 flex items-center gap-1">
              <Clock size={12} /> {time} UTC-5
            </div>
            <div className="px-2 py-0.5 border border-amber-500/30 text-amber-500">
              ACTIVO
            </div>
          </div>
        </header>

        <div className="flex-1 p-3 overflow-hidden">
          <div className="grid grid-cols-12 gap-3 h-full">
            <div className="col-span-3 space-y-3">
              <div className="bg-[#080808] border border-zinc-800/40 rounded p-3">
                <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-3">
                  Métricas Generales
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-mono text-amber-500">
                        247
                      </div>
                      <div className="text-[8px] uppercase tracking-widest text-zinc-600">
                        Regiones
                      </div>
                    </div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full shadow"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-mono text-zinc-200">
                        1.2M
                      </div>
                      <div className="text-[8px] uppercase tracking-widest text-zinc-600">
                        Datos
                      </div>
                    </div>
                    <div className="w-2 h-2 bg-amber-500 rounded-full shadow"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-mono text-zinc-200">
                        87.3%
                      </div>
                      <div className="text-[8px] uppercase tracking-widest text-zinc-600">
                        Cobertura
                      </div>
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full shadow"></div>
                  </div>
                </div>
              </div>

              <div className="bg-[#080808] border border-zinc-800/40 rounded p-3">
                <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-3">
                  Leyenda
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-sm"></div>
                    <span className="text-[8px] font-mono text-zinc-400">
                      Zonas Urbanas
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-sm"></div>
                    <span className="text-[8px] font-mono text-zinc-400">
                      Centros Comerciales
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-sm"></div>
                    <span className="text-[8px] font-mono text-zinc-400">
                      Áreas Verdes
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-sm"></div>
                    <span className="text-[8px] font-mono text-zinc-400">
                      Zonas Críticas
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-9">
              <MapContainer />
            </div>
          </div>
        </div>

        <footer className="h-8 px-4 flex items-center justify-between border-t border-zinc-800/30 bg-black/60 backdrop-blur">
          <div className="flex items-center gap-6 text-[9px] font-mono">
            <div className="text-center">
              <div className="text-zinc-500 uppercase tracking-widest">
                Precisión
              </div>
              <div className="text-amber-500">94.7%</div>
            </div>
            <div className="text-center">
              <div className="text-zinc-500 uppercase tracking-widest">
                Latencia
              </div>
              <div className="text-zinc-300">12ms</div>
            </div>
            <div className="text-center">
              <div className="text-zinc-500 uppercase tracking-widest">Uso</div>
              <div className="text-zinc-300">67%</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="px-2 py-0.5 border border-zinc-700/50 text-zinc-500 text-[9px] font-mono hover:text-zinc-300 transition-colors"
            >
              EXPORTAR
            </button>
            <button
              type="button"
              className="px-2 py-0.5 border border-amber-500/30 text-amber-500 text-[9px] font-mono hover:bg-amber-500/10 transition-colors"
            >
              REPORTE
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}
