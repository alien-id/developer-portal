'use client';

import { AlienSsoSdkClient } from "alien-sso-sdk-client-js";

const alienSsoSdkClient = new AlienSsoSdkClient({
    ssoBaseUrl: 'https://sso.alien-api.com',
    serverSdkBaseUrl: '/api',
});

export default alienSsoSdkClient;