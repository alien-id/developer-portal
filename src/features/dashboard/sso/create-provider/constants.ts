export const codeForServer = (provider_address: string, provider_private_key: string) =>
    `import { AlienSsoSdkServer } from '@alien/sso-sdk-server-js'
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
    `const alienSsoSdkClient = new AlienSsoSdkClient({
    providerAddress: "${provider_address}",
    providerPrivateKey: "${provider_private_key}",
    ssoBaseUrl: 'https://sso.alien-api.com',
    serverSdkBaseUrl: 'http://localhost:3001/api',
});

const { deep_link, polling_code } = await alienSsoSdkClient.authorize();

const autorizationCode = await alienSsoSdkClient.pollForAuthorization(polling_code);

const accessToken = await alienSsoSdkClient.exchangeCode(autorizationCode);

const isValid = await alienSsoSdkClient.verifyToken();`