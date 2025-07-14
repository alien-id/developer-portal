import { AlienSsoSdkServer } from 'alien-sso-sdk-server-js';
import { NextRequest, NextResponse } from 'next/server'

const alienSsoSdkServer = new AlienSsoSdkServer({
    providerAddress: '00000001000000000000000300000000',
    providerPrivateKey: 'ac5f5a3e6b32e21589333c87b50ce66819de6fca101757e26129721319328db79d88a4f7128be19aa384cc7b071962a0064f1178fc3b2bca99572f7109e80a53',
    ssoBaseUrl: 'https://sso.alien-api.com',
});

export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json();

        const {
            code_challenge,
        } = requestBody;

        console.log('code_challenge', code_challenge);

        const authResponse = await alienSsoSdkServer.authorize(code_challenge);

        return NextResponse.json(authResponse);
    } catch (error) {
        console.log('POST', error);

        return new NextResponse(`Authorize error`, {
            status: 400,
        })
    }
}