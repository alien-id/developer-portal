import { useEffect } from "react";
import { useAuth } from "@alien_org/sso-sdk-react";

export const AuthVerifier = () => {
  const { verifyAuth } = useAuth();

  useEffect(() => {
    verifyAuth();
  }, [verifyAuth]);

  return null;
}
