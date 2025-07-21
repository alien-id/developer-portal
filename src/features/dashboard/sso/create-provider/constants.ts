export const codeForServer = (provider_address: string, provider_private_key: string) =>
    `import { AlienSsoSdkServer } from 'alien-sso-sdk-server-js'
import { NextRequest, NextResponse } from 'next/server'

const alienSsoSdkServer = new AlienSsoSdkServer({
    providerAddress: "${provider_address}",
    providerPrivateKey: "${provider_private_key}",
    ssoBaseUrl: 'https://sso.alien-api.com',
});

export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json();

        const {
            code_challenge,
        } = requestBody;

        const authResponse = await alienSsoSdkServer.authorize(code_challenge);

        return NextResponse.json(authResponse);
    } catch (error) {
        console.log('POST', error);

        return new NextResponse('Authorize error', {
            status: 400,
        })
    }
}`

export const codeForClient = (provider_address: string, provider_private_key: string) =>
    `import { AlienSsoSdkClient } from 'alien-sso-sdk-client-js'

...

const alienSsoSdkClient = new AlienSsoSdkClient({
  ssoBaseUrl: 'https://sso.alien-api.com',
  serverSdkBaseUrl: '/api',
});

...

const handleLogin = async () => {
    try {
        const { deep_link, polling_code } = await alienSsoSdkClient.authorize();
        console.log({ deep_link, polling_code });

        setDeepLink(deep_link);

        const autorizationCode = await alienSsoSdkClient.pollForAuthorization(polling_code);

        console.log({ autorizationCode });

        if (!autorizationCode) return;

        const accessToken = await alienSsoSdkClient.exchangeCode(autorizationCode);
        console.log({ accessToken });

        if (!accessToken) return;

        const isValid = await alienSsoSdkClient.verifyToken();
        console.log({ isValid });

        setIsAuthorized(isValid);
    } catch (error) {
        console.log('handleLogin', error);
    }
}`