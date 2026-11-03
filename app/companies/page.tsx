import { Suspense } from "react";
import { CompaniesRoute } from "@/components/companies/companies-route";

function CompaniesFallback() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50 px-6 py-12 font-sans dark:bg-black">
      <div className="mx-auto w-full max-w-5xl text-sm text-zinc-500">Loading</div>
    </div>
  );
}

export default function CompaniesPage() {
  return (
    <Suspense fallback={<CompaniesFallback />}>
      <CompaniesRoute />
    </Suspense>
  );
}
