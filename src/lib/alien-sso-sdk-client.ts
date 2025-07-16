'use client';

import { AlienSsoSdkClient } from "alien-sso-sdk-client-js";

const alienSsoSdkClient = new AlienSsoSdkClient({
    providerAddress: '00000001000000000000000300000000',
    providerPrivateKey: 'ac5f5a3e6b32e21589333c87b50ce66819de6fca101757e26129721319328db79d88a4f7128be19aa384cc7b071962a0064f1178fc3b2bca99572f7109e80a53',
    ssoBaseUrl: 'https://sso.alien-api.com',
    serverSdkBaseUrl: 'http://localhost:3000/api',
});

export default alienSsoSdkClient;