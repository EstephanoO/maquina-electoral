"use client";

import React from "react";
import { useCurrentTime, useScene, useCustomization } from "./hooks";
import { CAMPAIGN_CONTEXT } from "./constants";
import { TranslationProvider } from "./contexts/TranslationContext";
import { Sidebar } from "./ui/Sidebar";
import { Header } from "./ui/Header";
import { CompetitorsScene } from "./scenes/CompetitorsScene";
import { GeoHubScene } from "./scenes/GeoHubScene";
import { SocialScene } from "./scenes/SocialScene";
import NarrativeScene from "./scenes/NarrativeScene";

export default function WarRoomAliaga() {
  const { scene, setScene } = useScene();
  const { isCustomizable, toggleCustomization } = useCustomization();
  const time = useCurrentTime();

  return (
    <TranslationProvider>
      <div className="flex h-screen bg-[#020202] text-zinc-400 font-sans overflow-hidden">
        <Sidebar
          currentScene={scene}
          onSceneChange={setScene}
          isCustomizable={isCustomizable}
          onToggleCustomization={toggleCustomization}
        />

        <main className="flex-1 flex flex-col bg-[radial-gradient(circle_at_50%_50%,#0a0a0a,#020202)]">
          <Header campaignContext={CAMPAIGN_CONTEXT} time={time} />

          <div className="flex-1 p-3 overflow-hidden">
            {scene === "narrative" && <NarrativeScene />}
            {scene === "competitors" && <CompetitorsScene />}
            {scene === "geohub" && <GeoHubScene />}
            {scene === "social" && <SocialScene />}
          </div>
        </main>
      </div>
    </TranslationProvider>
  );
}
