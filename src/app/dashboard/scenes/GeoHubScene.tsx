"use client";

import React, { useState } from "react";
import MapContainer from "../geohub/components/map-container";
import { Metric } from "../ui/Metric";
import { KPI } from "../ui/KPI";
import { useTranslation } from "../contexts/TranslationContext";
import { 
  Layers, 
  MapPin, 
  Activity, 
  TrendingUp,
  Filter,
  Download,
  RefreshCw,
  Settings
} from "lucide-react";
import type { GeographicData, MapLayer } from "../types/geohub";

export function GeoHubScene() {
  const { t } = useTranslation();
  const [selectedLayer, setSelectedLayer] = useState("support");
  const [isRealTime, setIsRealTime] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState<GeographicData | null>(null);

  // Mock data for demonstration
  const geographicMetrics = {
    totalRegions: 247,
    dataPoints: "1.2M",
    coverage: "87.3%",
    accuracy: "94.7%",
    latency: "12ms"
  };

  const mapLayers: MapLayer[] = [
    { id: "support", name: t("geohub.layer.support"), type: "heatmap", visible: true, data: [], opacity: 0.8 },
    { id: "population", name: t("geohub.layer.population"), type: "heatmap", visible: false, data: [], opacity: 0.6 },
    { id: "risk", name: t("geohub.layer.risk"), type: "regions", visible: false, data: [], opacity: 0.9 },
    { id: "campaign", name: t("geohub.layer.campaign"), type: "markers", visible: true, data: [], opacity: 1.0 }
  ];

  const quickStats = [
    { label: t("geohub.stat.strongholds"), value: "42", status: "good" as const },
    { label: t("geohub.stat.contested"), value: "18", status: "mid" as const },
    { label: t("geohub.stat.highRisk"), value: "7", status: "low" as const },
    { label: t("geohub.stat.activeCampaigns"), value: "23", status: "good" as const }
  ];

  return (
    <div className="grid grid-cols-12 gap-3 h-full">
      {/* Left Sidebar - Controls & Metrics */}
      <div className="col-span-3 space-y-3">
        {/* GeoHub Metrics */}
        <div className="bg-[#080808] border border-zinc-800/40 rounded-lg p-3">
          <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
            <Activity size={10} />
            {t("geohub.intelligence.title")}
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-mono text-amber-500">
                  {geographicMetrics.totalRegions}
                </div>
                <div className="text-[8px] uppercase tracking-widest text-zinc-600">
                  {t("geohub.metric.regions")}
                </div>
              </div>
              <div className="w-2 h-2 bg-blue-500 rounded-full shadow animate-pulse"></div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-mono text-zinc-200">
                  {geographicMetrics.dataPoints}
                </div>
                <div className="text-[8px] uppercase tracking-widest text-zinc-600">
                  {t("geohub.metric.dataPoints")}
                </div>
              </div>
              <div className="w-2 h-2 bg-amber-500 rounded-full shadow"></div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-mono text-zinc-200">
                  {geographicMetrics.coverage}
                </div>
                <div className="text-[8px] uppercase tracking-widest text-zinc-600">
                  {t("geohub.metric.coverage")}
                </div>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full shadow"></div>
            </div>
          </div>
        </div>

        {/* Map Layers Control */}
        <div className="bg-[#080808] border border-zinc-800/40 rounded-lg p-3">
          <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
            <Layers size={10} />
            {t("geohub.layers.title")}
          </div>
          <div className="space-y-2">
            {mapLayers.map((layer) => (
              <button
                key={layer.id}
                type="button"
                onClick={() => setSelectedLayer(layer.id)}
                className={`w-full p-2 rounded border text-left transition-all text-[8px] font-mono ${
                  selectedLayer === layer.id
                    ? "bg-amber-500/10 border-amber-500/40 text-amber-500"
                    : "bg-black/40 border-zinc-800/30 text-zinc-400 hover:border-zinc-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="uppercase">{layer.name}</span>
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    layer.visible ? "bg-green-500" : "bg-zinc-700"
                  }`} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-2">
          {quickStats.map((stat) => (
            <KPI 
              key={stat.label}
              label={stat.label}
              value={stat.value}
              status={stat.status}
            />
          ))}
        </div>
      </div>

      {/* Main Map Area */}
      <div className="col-span-9">
        <div className="h-full bg-[#080808] border border-zinc-800/60 rounded-xl overflow-hidden relative">
          {/* Map Header */}
          <div className="absolute top-0 left-0 right-0 z-10 bg-black/80 backdrop-blur border-b border-zinc-800/40 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-[9px] font-mono text-amber-500 font-black uppercase tracking-widest">
                  Live Geographic Analysis
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    isRealTime ? "bg-green-500 animate-pulse" : "bg-zinc-600"
                  }`} />
                  <span className="text-[8px] font-mono text-zinc-400">
                    {isRealTime ? t("geohub.status.live") : t("geohub.status.static")}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="p-1.5 border border-zinc-700/50 text-zinc-500 hover:text-zinc-300 transition-colors"
                  onClick={() => setIsRealTime(!isRealTime)}
                >
                  <RefreshCw size={12} className={isRealTime ? "animate-spin" : ""} />
                </button>
                <button
                  type="button"
                  className="p-1.5 border border-zinc-700/50 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  <Filter size={12} />
                </button>
                <button
                  type="button"
                  className="p-1.5 border border-zinc-700/50 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  <Download size={12} />
                </button>
                <button
                  type="button"
                  className="p-1.5 border border-zinc-700/50 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  <Settings size={12} />
                </button>
              </div>
            </div>
          </div>

          {/* Map Container */}
          <div className="h-full pt-14">
            <MapContainer />
          </div>

          {/* Map Legend */}
          <div className="absolute bottom-3 left-3 z-10 bg-black/80 backdrop-blur border border-zinc-800/40 rounded p-2">
            <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest mb-2">
              {t("geohub.legend.title")}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-sm"></div>
                <span className="text-[7px] font-mono text-zinc-400">{t("geohub.legend.strong")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-sm"></div>
                <span className="text-[7px] font-mono text-zinc-400">{t("geohub.legend.contested")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-sm"></div>
                <span className="text-[7px] font-mono text-zinc-400">{t("geohub.legend.highRisk")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-sm"></div>
                <span className="text-[7px] font-mono text-zinc-400">{t("geohub.legend.active")}</span>
              </div>
            </div>
          </div>

          {/* Selected Region Info */}
          {selectedRegion && (
            <div className="absolute top-16 right-3 z-10 bg-black/80 backdrop-blur border border-zinc-800/40 rounded p-3 w-48">
              <div className="flex items-center gap-2 text-amber-500 mb-2">
                <MapPin size={12} />
                <span className="text-[8px] font-black uppercase">{selectedRegion.region}</span>
              </div>
              <div className="space-y-1 text-[8px] font-mono">
                <div className="flex justify-between">
                  <span className="text-zinc-500">{t("geohub.region.population")}</span>
                  <span className="text-zinc-300">{selectedRegion.population.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">{t("geohub.region.support")}</span>
                  <span className={selectedRegion.supportLevel > 60 ? "text-green-500" : "text-amber-500"}>
                    {selectedRegion.supportLevel}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">{t("geohub.region.risk")}</span>
                  <span className={`${
                    selectedRegion.riskLevel === 'low' ? 'text-green-500' :
                    selectedRegion.riskLevel === 'medium' ? 'text-amber-500' : 'text-red-500'
                  }`}>
                    {selectedRegion.riskLevel === 'low' ? t("geohub.risk.low") :
                     selectedRegion.riskLevel === 'medium' ? t("geohub.risk.medium") : t("geohub.risk.high")}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}