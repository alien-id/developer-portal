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

        const res = await fetch(`https://sso.alien-api.com/app_callback/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "payload": "{\"full_name\":\"aleksei zasulskii\"}",
                "session_signature": "9E4F852A02991B54F90F7B4163305A7FA1DC91925D721C35F858F770164BD59EE451BE518D8AC22DDC96C77E66EB5C181B75CC1E771BE30633115452C458A605",
                "session_address": "00000001010000000000000100000000"
            })
        })

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