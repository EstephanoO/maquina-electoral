import React from "react";
import { Clock } from "lucide-react";
import type { CampaignContext } from "../types";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from "../contexts/TranslationContext";

interface HeaderProps {
  campaignContext: CampaignContext;
  time: string;
}

export function Header({ campaignContext, time }: HeaderProps) {
  const { t } = useTranslation();

  return (
    <header className="h-10 px-4 flex items-center justify-between border-b border-zinc-800/30 bg-black/60 backdrop-blur">
      <div>
        <div className="text-[10px] font-mono text-amber-500 font-bold uppercase">
          {campaignContext.candidate}
        </div>
        <div className="text-[8px] font-mono text-zinc-600 tracking-widest uppercase">
          {campaignContext.party} · {campaignContext.electionYear}
        </div>
      </div>

      <div className="flex items-center gap-6 text-[10px] font-mono">
        <LanguageSwitcher />
        <div className="text-zinc-600 flex items-center gap-1">
          <Clock size={12} /> {time} {t("header.timezone")}
        </div>
        <div className="px-2 py-0.5 border border-amber-500/30 text-amber-500">
          {t("header.listNumber")}
        </div>
      </div>
    </header>
  );
}