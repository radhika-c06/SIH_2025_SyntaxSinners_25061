"use client";
import { useTranslation } from "react-i18next";
import { SupportedLanguage, supportedLanguages } from "../lib/i18n";
import { useLanguage } from "./LanguageProvider";

export default function LanguageSwitcher() {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <span className="hidden sm:block text-[11px] uppercase tracking-[0.14em] text-white/80">
        {t("nav.language")}
      </span>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
        className="rounded-md border border-white/20 bg-white/10 px-2 py-1 text-xs text-white focus:outline-none focus:ring-2 focus:ring-white/30"
      >
        {supportedLanguages.map((lng) => (
          <option key={lng.code} value={lng.code} className="text-black">
            {lng.label}
          </option>
        ))}
      </select>
    </div>
  );
}
