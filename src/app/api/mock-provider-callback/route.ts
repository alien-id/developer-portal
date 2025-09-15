import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();

    const { deep_link } = requestBody;

    const deepLinkURL = new URL(deep_link);

    const callbackURL = deepLinkURL.searchParams.get('callback_url');

    if (!callbackURL)
      return new NextResponse(`Error`, {
        status: 500,
      });

    const callbackUrlDecoded = decodeURIComponent(callbackURL);

    const id = callbackUrlDecoded.split('/').at(-1);

    if (!id)
      return new NextResponse(`Error`, {
        status: 500,
      });

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/app_callback/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        provider_address: '00000001040000000000000100000000',
        provider_private_key: 'c366d7b8eb1396a486d6a8f8ed1ae5a94b9923264e827e9e33aa6d4b702cf177',
      }),
    });

    if (!res.ok) {
      throw new Error(
        `SSO Router Authorization failed: ${res.status} ${res.statusText} ${await res.text()}`,
      );
    }

    return NextResponse.json({
      status: 200,
    });
  } catch (error) {
    console.log('Authorize handler error: ', error);

    return new NextResponse(`Authorize error`, {
      status: 500,
    });
  }
}
