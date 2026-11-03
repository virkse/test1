"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CompaniesApp } from "@/components/companies/companies-app";
import { SignInScreen } from "@/components/sign-in-screen";
import { useAuth } from "@/lib/auth-context";
import {
  parseCompaniesUrl,
  serializeCompaniesUrl,
  type CompaniesUrlState,
} from "@/lib/companies-url";

export function CompaniesRoute() {
  const { token } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const url = parseCompaniesUrl(searchParams);

  function onUrlChange(next: CompaniesUrlState) {
    const query = serializeCompaniesUrl(next).toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  if (!token) {
    return <SignInScreen />;
  }

  return <CompaniesApp url={url} onUrlChange={onUrlChange} />;
}
