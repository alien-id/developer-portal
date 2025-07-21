import { NextRequest, NextResponse } from 'next/server'
import alienSsoSdkServer from '@/lib/alien-sso-sdk-server';

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