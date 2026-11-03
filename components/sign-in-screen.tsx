"use client";

import { FormEvent, useState } from "react";
import { LanguageToggle } from "@/components/language-toggle";
import { useAuth } from "@/lib/auth-context";
import { useI18n } from "@/lib/i18n";

export function SignInScreen() {
  const { signIn } = useAuth();
  const { t } = useI18n();
  const [token, setToken] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = token.trim();

    if (!value) {
      return;
    }

    signIn(value);
  }

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 font-sans dark:bg-black">
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-6 px-6 py-12">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            {t("signIn")}
          </h1>
          <LanguageToggle />
        </div>
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950"
        >
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{t("signInHelp")}</p>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="auth-token" className="text-sm font-medium">
              {t("token")}
            </label>
            <input
              id="auth-token"
              name="token"
              value={token}
              onChange={(event) => setToken(event.target.value)}
              placeholder={t("tokenPlaceholder")}
              autoComplete="off"
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-zinc-200"
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
          >
            {t("signIn")}
          </button>
        </form>
      </main>
    </div>
  );
}
