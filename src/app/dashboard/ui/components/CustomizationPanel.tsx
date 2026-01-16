"use client";

import React from "react";
import {
  LayoutGrid,
  Maximize2,
  Settings,
  Eye,
  EyeOff,
  GripVertical,
  Plus,
  X
} from "lucide-react";
import type { Scene, WidgetConfig, SceneConfig } from "../../types";

interface CustomizationPanelProps {
  isOpen: boolean;
  currentScene: Scene;
  onClose: () => void;
  onSaveLayout: (widgets: WidgetConfig[]) => void;
  widgets: WidgetConfig[];
  onWidgetUpdate: (widgets: WidgetConfig[]) => void;
}

const sceneConfigs: Record<Scene, SceneConfig> = {
  narrative: {
    id: "narrative",
    title: "Narrative Control",
    description: "Social media narrative analysis",
    defaultLayout: "split",
    customizableViews: true,
    widgets: []
  },
  competitors: {
    id: "competitors",
    title: "Competitor Intelligence",
    description: "Opposition monitoring and analysis",
    defaultLayout: "grid",
    customizableViews: true,
    widgets: []
  },
  geohub: {
    id: "geohub",
    title: "GeoHub",
    description: "Advanced geographic intelligence",
    defaultLayout: "focus",
    customizableViews: true,
    widgets: [
      { id: "map-main", type: "map", title: "Main Map", size: "large", position: { x: 0, y: 0, w: 9, h: 6 }, customizable: false },
      { id: "geo-metrics", type: "kpi", title: "Geographic Metrics", size: "medium", position: { x: 9, y: 0, w: 3, h: 6 }, customizable: true },
      { id: "layers-control", type: "table", title: "Map Layers", size: "small", position: { x: 9, y: 6, w: 3, h: 3 }, customizable: true }
    ]
  },
  social: {
    id: "social",
    title: "Social Analytics",
    description: "Social media performance and trends",
    defaultLayout: "grid",
    customizableViews: true,
    widgets: [
      { id: "trending-topics", type: "chart", title: "Trending Topics", size: "medium", position: { x: 0, y: 0, w: 6, h: 2 }, customizable: true },
      { id: "recent-posts", type: "feed", title: "Recent Posts", size: "medium", position: { x: 6, y: 0, w: 6, h: 3 }, customizable: true },
      { id: "platform-metrics", type: "chart", title: "Platform Metrics", size: "small", position: { x: 0, y: 2, w: 6, h: 2 }, customizable: true }
    ]
  }
};

export function CustomizationPanel({ 
  isOpen, 
  currentScene, 
  onClose, 
  onSaveLayout, 
  widgets, 
  onWidgetUpdate 
}: CustomizationPanelProps) {
  const sceneConfig = sceneConfigs[currentScene];

  const toggleWidgetVisibility = (widgetId: string) => {
    const updatedWidgets = widgets.map(widget =>
      widget.id === widgetId 
        ? { ...widget, visible: !widget.visible }
        : widget
    );
    onWidgetUpdate(updatedWidgets);
  };

  const addNewWidget = () => {
    const newWidget: WidgetConfig = {
      id: `widget-${Date.now()}`,
      type: "kpi",
      title: "New Widget",
      size: "medium",
      position: { x: 0, y: 0, w: 4, h: 2 },
      customizable: true
    };
    onWidgetUpdate([...widgets, newWidget]);
  };

  const removeWidget = (widgetId: string) => {
    const updatedWidgets = widgets.filter(widget => widget.id !== widgetId);
    onWidgetUpdate(updatedWidgets);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur z-50 flex items-center justify-center">
      <div className="bg-[#080808] border border-zinc-800/60 rounded-xl w-full max-w-4xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-800/40">
          <div>
            <div className="text-[10px] font-mono text-amber-500 font-black uppercase tracking-widest">
              Customize {sceneConfig.title}
            </div>
            <div className="text-[8px] text-zinc-500 mt-1">
              {sceneConfig.description}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onSaveLayout(widgets)}
              className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-black font-black text-[9px] rounded transition-all"
            >
              Save Layout
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 border border-zinc-700/50 text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        <div className="flex h-[calc(100%-80px)]">
          {/* Layout Options */}
          <div className="w-80 border-r border-zinc-800/40 p-4">
            <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-3">
              Layout Options
            </div>
            
            <div className="space-y-3">
              <div className="bg-black/40 border border-zinc-800/30 rounded p-3">
                <div className="text-[8px] font-mono text-zinc-400 mb-2">
                  Default Layout
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="flex-1 p-2 border border-zinc-700/50 text-[7px] font-mono hover:border-amber-500/30 hover:text-amber-500 transition-all"
                  >
                    <LayoutGrid size={12} className="mx-auto mb-1" />
                    Grid
                  </button>
                  <button
                    type="button"
                    className="flex-1 p-2 border border-zinc-700/50 text-[7px] font-mono hover:border-amber-500/30 hover:text-amber-500 transition-all"
                  >
                    <Maximize2 size={12} className="mx-auto mb-1" />
                    Focus
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={addNewWidget}
                className="w-full p-2 bg-amber-500/10 border border-amber-500/30 text-amber-500 font-black text-[8px] rounded flex items-center justify-center gap-2 hover:bg-amber-500/20 transition-all"
              >
                <Plus size={10} />
                Add Widget
              </button>
            </div>
          </div>

          {/* Widget Management */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-3">
              Widget Management
            </div>
            
            <div className="space-y-2">
              {widgets.map((widget) => (
                <div
                  key={widget.id}
                  className="bg-black/40 border border-zinc-800/30 rounded p-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <GripVertical size={12} className="text-zinc-600" />
                      <div>
                        <div className="text-[8px] font-mono text-zinc-300">
                          {widget.title}
                        </div>
                        <div className="text-[7px] text-zinc-500 uppercase">
                          {widget.type} • {widget.size}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleWidgetVisibility(widget.id)}
                        className="p-1 text-zinc-500 hover:text-zinc-300 transition-colors"
                      >
                        {widget.visible !== false ? <Eye size={10} /> : <EyeOff size={10} />}
                      </button>
                      {widget.customizable && (
                        <button
                          type="button"
                          onClick={() => removeWidget(widget.id)}
                          className="p-1 text-zinc-500 hover:text-red-400 transition-colors"
                        >
                          <X size={10} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}