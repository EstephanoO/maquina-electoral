"use client";

import React from "react";
import { Languages } from "lucide-react";
import { useTranslation } from "../contexts/TranslationContext";

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useTranslation();

  return (
    <div className="flex items-center gap-2">
      <Languages size={16} className="text-zinc-500" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as "en" | "es")}
        className="bg-transparent border border-zinc-700/50 text-zinc-400 text-[9px] font-mono px-2 py-0.5 rounded hover:border-zinc-600 transition-colors cursor-pointer focus:outline-none focus:border-amber-500"
      >
        <option value="en">{t("lang.english")}</option>
        <option value="es">{t("lang.spanish")}</option>
      </select>
    </div>
  );
}