'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useAuth } from '@alien_org/sso-sdk-react';
import { Skeleton } from '@/components/ui/skeleton';

export const AuthProtector = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const { auth, logout } = useAuth();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      logout();
      router.push('/sign-in');
    }
  }, [auth.isAuthenticated, router, logout]);

  if (auth.loading) return <Skeleton className="h-full w-full rounded-xl" />;

  return <>{children}</>;
};
