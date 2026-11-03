"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { CompanyStatus } from "@/lib/db";
import type { ValidationCode } from "@/lib/company-validation";

export type Locale = "en" | "nl";

const LOCALE_STORAGE_KEY = "companies.locale";

const messages = {
  en: {
    title: "Companies",
    search: "Search",
    searchPlaceholder: "Search name or domain",
    status: "Status",
    allStatuses: "All statuses",
    name: "Name",
    domain: "Domain",
    created: "Created",
    create: "Create company",
    save: "Save",
    cancel: "Cancel",
    close: "Close",
    signIn: "Sign in",
    signOut: "Sign out",
    token: "Token",
    tokenPlaceholder: "Any string",
    signInHelp: "Enter any token to continue. It is sent as a Bearer token.",
    empty: "No companies match these filters.",
    listError: "Could not load companies.",
    drawerError: "Could not load this company.",
    retry: "Retry",
    loading: "Loading",
    previous: "Previous",
    next: "Next",
    page: "Page",
    of: "of",
    editCompany: "Edit company",
    createCompany: "New company",
    conflict:
      "This company was changed by someone else. Reload the latest version to keep your edits and save again.",
    reloadLatest: "Reload latest version",
    saving: "Saving…",
    optional: "optional",
    language: "Language",
  },
  nl: {
    title: "Bedrijven",
    search: "Zoeken",
    searchPlaceholder: "Zoek op naam of domein",
    status: "Status",
    allStatuses: "Alle statussen",
    name: "Naam",
    domain: "Domein",
    created: "Aangemaakt",
    create: "Bedrijf toevoegen",
    save: "Opslaan",
    cancel: "Annuleren",
    close: "Sluiten",
    signIn: "Inloggen",
    signOut: "Uitloggen",
    token: "Token",
    tokenPlaceholder: "Elke tekenreeks",
    signInHelp:
      "Vul een willekeurige token in. Die wordt als Bearer-token meegestuurd.",
    empty: "Geen bedrijven voor deze filters.",
    listError: "Bedrijven konden niet worden geladen.",
    drawerError: "Dit bedrijf kon niet worden geladen.",
    retry: "Opnieuw",
    loading: "Laden",
    previous: "Vorige",
    next: "Volgende",
    page: "Pagina",
    of: "van",
    editCompany: "Bedrijf bewerken",
    createCompany: "Nieuw bedrijf",
    conflict:
      "Dit bedrijf is intussen gewijzigd. Laad de nieuwste versie om je tekst te behouden en opnieuw op te slaan.",
    reloadLatest: "Nieuwste versie laden",
    saving: "Opslaan…",
    optional: "optioneel",
    language: "Taal",
  },
} as const;

const statusLabels: Record<Locale, Record<CompanyStatus, string>> = {
  en: {
    new: "New",
    researching: "Researching",
    contacted: "Contacted",
    qualified: "Qualified",
    rejected: "Rejected",
  },
  nl: {
    new: "Nieuw",
    researching: "Onderzoek",
    contacted: "Contact",
    qualified: "Gekwalificeerd",
    rejected: "Afgewezen",
  },
};

const validationLabels: Record<Locale, Record<ValidationCode, string>> = {
  en: {
    name_required: "Name is required",
    name_too_long: "Name must be at most 100 characters",
    domain_invalid: "Domain must be a valid hostname without a protocol",
    status_invalid: "Status is not valid",
    version_required: "Version is required",
    version_invalid: "Version must be a positive integer",
  },
  nl: {
    name_required: "Naam is verplicht",
    name_too_long: "Naam mag maximaal 100 tekens zijn",
    domain_invalid: "Domein moet een geldige hostname zijn zonder protocol",
    status_invalid: "Status is ongeldig",
    version_required: "Versie is verplicht",
    version_invalid: "Versie moet een positief geheel getal zijn",
  },
};

type MessageKey = keyof typeof messages.en;

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: MessageKey) => string;
  statusLabel: (status: CompanyStatus) => string;
  validationLabel: (code: ValidationCode, fallback?: string) => string;
  formatDate: (iso: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const localeListeners = new Set<() => void>();

function readLocale(): Locale {
  if (typeof window === "undefined") {
    return "en";
  }

  return window.localStorage.getItem(LOCALE_STORAGE_KEY) === "nl" ? "nl" : "en";
}

function subscribeLocale(listener: () => void): () => void {
  localeListeners.add(listener);
  return () => {
    localeListeners.delete(listener);
  };
}

function getServerLocale(): Locale {
  return "en";
}

function writeLocale(next: Locale): void {
  window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
  localeListeners.forEach((listener) => listener());
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(
    subscribeLocale,
    readLocale,
    getServerLocale,
  );

  const setLocale = useCallback((next: Locale) => {
    writeLocale(next);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      t: (key) => messages[locale][key],
      statusLabel: (status) => statusLabels[locale][status],
      validationLabel: (code, fallback) =>
        validationLabels[locale][code] ?? fallback ?? code,
      formatDate: (iso) =>
        new Intl.DateTimeFormat(locale === "nl" ? "nl-NL" : "en-US", {
          dateStyle: "medium",
        }).format(new Date(iso)),
    }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }

  return context;
}
