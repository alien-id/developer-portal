import { AlienSsoSdkServer } from '@alien_org/sso-sdk-core/server';

export const alienSsoSdkServer = new AlienSsoSdkServer({
  providerAddress: process.env.NEXT_PUBLIC_PROVIDER_ADDRESS!,
  providerPrivateKey: process.env.PROVIDER_PRIVATE_KEY!,
  ssoBaseUrl: process.env.ALIEN_SSO_ROUTER_URL!,
});
