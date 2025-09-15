import { useEffect } from 'react';
import { useAuth } from '@alien_org/sso-sdk-react';

export const AuthVerifier = () => {
  const { verifyAuth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const isValid = await verifyAuth(process.env.NEXT_PUBLIC_PROVIDER_ADDRESS!);
      if (!isValid) {
        logout();
      }
    })();
  }, [verifyAuth, logout]);

  return null;
};
