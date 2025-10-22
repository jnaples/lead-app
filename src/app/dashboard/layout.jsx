"use client";

import { CreditsProvider } from "@/context/credits-context";
import { NavBar } from "@/components/layout/navbar";
import { useState } from "react";

export default function DashboardLayout({ children }) {
  const [credits, setCredits] = useState(5);

  return (
    <CreditsProvider>
      <div className="h-full w-full flex flex-col gap-6">
        <NavBar className="shrink-0" credits={credits} />
        <main className="flex-1 min-h-0 flex items-stretch">{children}</main>
      </div>
    </CreditsProvider>
  );
}
