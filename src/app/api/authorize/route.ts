import { AlienSsoSdkServer } from 'alien-sso-sdk-server-js';
import { NextRequest, NextResponse } from 'next/server'

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

export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json();

        const {
            code_challenge,
        } = requestBody;

        const authResponse = await alienSsoSdkServer.authorize(code_challenge);

        return NextResponse.json(authResponse);
    } catch (error) {
        console.log('Authorize handler error: ', error);

        return new NextResponse(`Authorize error`, {
            status: 500,
        })
    }
}