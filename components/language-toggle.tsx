"use client";

import { useI18n, type Locale } from "@/lib/i18n";

const options: Locale[] = ["en", "nl"];

export function LanguageToggle() {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      className="inline-flex rounded-lg border border-zinc-200 p-0.5 dark:border-zinc-800"
      role="group"
      aria-label={t("language")}
    >
      {options.map((option) => {
        const selected = locale === option;

        return (
          <button
            key={option}
            type="button"
            aria-pressed={selected}
            className={`rounded-md px-2.5 py-1 text-xs font-medium uppercase ${
              selected
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            }`}
            onClick={() => setLocale(option)}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
