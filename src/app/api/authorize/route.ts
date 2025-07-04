import { AlienSsoSdkServer } from 'alien-sso-sdk-server-js';
import { NextRequest, NextResponse } from 'next/server'

const alienSsoSdkServer = new AlienSsoSdkServer({
    providerAddress: '00000001000000000000000000000000',
    providerPrivateKey: 'c366d7b8eb1396a486d6a8f8ed1ae5a94b9923264e827e9e33aa6d4b702cf17704f08f419f2d22cd3e03a33383f4d94dbacd73705efb22ba82766762942f79c1',
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