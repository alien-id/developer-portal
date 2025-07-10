import { AlienSsoSdkClient } from "alien-sso-sdk-client-js";

const alienSsoSdkClient = new AlienSsoSdkClient({
    providerAddress: '00000001000000000000000600000000',
    providerPrivateKey: '59ebc17cd2d7e311a937d05b7fdaeecd4e34ce5a86f165a6c6e95b4cd6074455dcec420424ece545026924887022486c6ba39a552da525a828ba15e07725a5d0',
    ssoBaseUrl: 'https://sso.alien-api.com',
    serverSdkBaseUrl: 'http://localhost:3000/api',
});

export default alienSsoSdkClient;