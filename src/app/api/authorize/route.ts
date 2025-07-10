import { AlienSsoSdkServer } from 'alien-sso-sdk-server-js';
import { NextRequest, NextResponse } from 'next/server'

const alienSsoSdkServer = new AlienSsoSdkServer({
    providerAddress: '00000001000000000000000600000000',
    providerPrivateKey: '59ebc17cd2d7e311a937d05b7fdaeecd4e34ce5a86f165a6c6e95b4cd6074455dcec420424ece545026924887022486c6ba39a552da525a828ba15e07725a5d0',
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