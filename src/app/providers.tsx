'use client';

import { AlienSsoProvider } from '@alien_org/sso-sdk-react';
import { Toaster } from '@/components/ui/sonner';
import { AuthVerifier } from '@/components/AuthVerifier';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const alienSsoSdkClientConfig = {
  ssoBaseUrl: process.env.NEXT_PUBLIC_ALIEN_SSO_ROUTER_URL!,
  serverSdkBaseUrl: '/api',
};

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AlienSsoProvider config={alienSsoSdkClientConfig}>
        <AuthVerifier />
        {children}
        <Toaster />
      </AlienSsoProvider>
    </QueryClientProvider>
  );
}
