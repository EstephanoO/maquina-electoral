import React from "react";
import {
  Activity,
  MessageSquare,
  Map as MapIcon,
  Users,
  Fingerprint,
  Globe,
  TrendingUp,
  Layers,
  Settings,
} from "lucide-react";
import type { NavigationItem, Scene } from "../types";
import { useTranslation } from "../contexts/TranslationContext";

interface SidebarProps {
  currentScene: Scene;
  onSceneChange: (scene: Scene) => void;
  isCustomizable?: boolean;
  onToggleCustomization?: () => void;
}

const getNavigationItems = (t: (key: string) => string): NavigationItem[] => [
  // Primary Campaign Scenes
  { 
    id: "competitors", 
    icon: Users, 
    label: t("nav.competitors.label"),
    category: 'primary'
  },
  
  // Secondary Analysis Scenes
  { 
    id: "geohub", 
    icon: Globe, 
    label: t("nav.geohub.label"),
    category: 'secondary',
    badge: t("nav.badge.live")
  },
  { 
    id: "social", 
    icon: TrendingUp, 
    label: t("nav.social.label"),
    category: 'secondary',
    badge: "2.0"
  },
  
  // Narrative Control - Last
  { 
    id: "narrative", 
    icon: MessageSquare, 
    label: t("nav.narrative.label"),
    category: 'primary',
    badge: t("nav.badge.ai")
  },
];

export function Sidebar({ 
  currentScene, 
  onSceneChange, 
  isCustomizable = false,
  onToggleCustomization 
}: SidebarProps) {
  const { t } = useTranslation();
  const navigationItems = getNavigationItems(t);

  return (
    <aside className="w-20 bg-[#080808] border-r border-zinc-800/40 flex flex-col py-6">
      {/* Logo/Brand */}
      <div className="flex items-center justify-center mb-8">
        <Fingerprint className="text-amber-500 animate-pulse" size={24} />
      </div>

      {/* Navigation Items */}
      <div className="flex-1 flex flex-col gap-4 px-4">
        {navigationItems.map((item: NavigationItem) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSceneChange(item.id)}
            className={`relative group transition-all duration-200 p-3 rounded-lg
              ${
                currentScene === item.id
                  ? "text-amber-500 bg-amber-500/10 border border-amber-500/20"
                  : "text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800/40 border border-transparent"
              }`}
          >
            {/* Active indicator */}
            {currentScene === item.id && (
              <span className="absolute left-0 top-1/2 h-6 w-[3px] bg-amber-500 -translate-y-1/2 rounded-r" />
            )}
            
            {/* Icon */}
            <div className="relative flex items-center justify-center">
              <item.icon size={20} />
              
              {/* Badge */}
              {item.badge && (
                <span className="absolute -top-1 -right-1 text-[6px] font-black px-1 py-0.5 rounded bg-amber-500 text-black leading-none">
                  {item.badge}
                </span>
              )}
            </div>
            
            {/* Tooltip */}
            <div className="absolute left-full ml-3 px-3 py-2 bg-black/90 text-[9px] font-mono text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-zinc-700/50">
              <div className="flex items-center gap-2">
                <span>{item.label}</span>
                {item.category === 'secondary' && (
                  <span className="text-amber-500">●</span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Customization Toggle */}
      <div className="px-4 mt-6">
        <button
          type="button"
          onClick={onToggleCustomization}
          className={`w-full p-3 rounded-lg transition-all duration-200 border
            ${
              isCustomizable
                ? "text-amber-500 bg-amber-500/10 border-amber-500/20"
                : "text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800/40 border-transparent"
            }`}
        >
          <Settings size={18} className="mx-auto" />
        </button>
      </div>
    </aside>
  );
}