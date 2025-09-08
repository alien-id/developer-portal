import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json();

        const {
            deep_link,
        } = requestBody;

        const deepLinkURL = new URL(deep_link);

        const callbackURL = deepLinkURL.searchParams.get("callback_url");

        if (!callbackURL) return new NextResponse(`Error`, {
            status: 500,
        })

        const callbackUrlDecoded = decodeURIComponent(callbackURL);

        const id = callbackUrlDecoded.split('/').at(-1)

        if (!id) return new NextResponse(`Error`, {
            status: 500,
        })

        const res = await fetch(`${process.env.ALIEN_SSO_ROUTER_URL}/app_callback/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "session_signature_seed": "tcCQpxmvM7C4VnZXCuSgCa4fFIyZhkDp",
                "session_signature": "DE735FFF3CA2E29F528BA3E7B4FBBFC5B51F17F43C6B9BB14F2BC5EF0528277449ED33718C1500B14BBAB83602B6CAC35DA61100658EADFC6BC4E762F47ED60F",
                "session_address": "00000001010000000000000200000000"
            })
        })

        if (!res.ok) {
            throw new Error(
              `SSO Router Authorization failed: ${res.status} ${res.statusText} ${await res.text()}`,
            );
        }

        return NextResponse.json({
            status: 200
        });
    } catch (error) {
        console.log('Authorize handler error: ', error);

        return new NextResponse(`Authorize error`, {
            status: 500,
        })
    }
}