"use client";

import { AlienSsoProvider } from "@alien_org/sso-sdk-react";
import { SWRConfig } from "swr";
import { Toaster } from "@/components/ui/sonner";
import { alienSsoSdkClientConfig } from "@/config/alienSsoSdkClient";
import {AuthVerifier} from "@/components/AuthVerifier";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AlienSsoProvider config={alienSsoSdkClientConfig}>
      <AuthVerifier />
      <SWRConfig value={{ revalidateOnFocus: false, revalidateIfStale: false, revalidateOnReconnect: false }}>
        {children}
      </SWRConfig>
      <Toaster />
    </AlienSsoProvider>
  );
}
