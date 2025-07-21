import { AlienSsoSdkServer } from 'alien-sso-sdk-server-js';


const PROVIDER_ADDRESS = process.env.PROVIDER_ADDRESS;

if (!PROVIDER_ADDRESS) throw new Error("No PROVIDER_ADDRESS env provided!");

const PROVIDER_PRIVATE_KEY = process.env.PROVIDER_PRIVATE_KEY;

if (!PROVIDER_PRIVATE_KEY) throw new Error("No PROVIDER_PRIVATE_KEY env provided!");

const ALIEN_SSO_ROUTER_URL = process.env.ALIEN_SSO_ROUTER_URL;

if (!ALIEN_SSO_ROUTER_URL) throw new Error("No ALIEN_SSO_ROUTER_URL env provided!");

const alienSsoSdkServer = new AlienSsoSdkServer({
    providerAddress: PROVIDER_ADDRESS,
    providerPrivateKey: PROVIDER_PRIVATE_KEY,
    ssoBaseUrl: ALIEN_SSO_ROUTER_URL,
});

export default alienSsoSdkServer;