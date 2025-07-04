'use client';

import { Button } from "@/components/ui/button";
import { AlienSsoSdkClient } from "alien-sso-sdk-client-js";

const alienSsoSdkClient = new AlienSsoSdkClient({
    providerAddress: '00000001000000000000000000000000',
    providerPrivateKey: 'c366d7b8eb1396a486d6a8f8ed1ae5a94b9923264e827e9e33aa6d4b702cf17704f08f419f2d22cd3e03a33383f4d94dbacd73705efb22ba82766762942f79c1',
    ssoBaseUrl: 'https://sso.alien-api.com', // https://sso.alien-api.com
    serverSdkBaseUrl: 'http://localhost:3000/api',
});

function SignIn() {

    const handleSignIn = async () => {
        alienSsoSdkClient.authorize();
    }

    return (
        <>
            <Button onClick={handleSignIn} variant={'outline'}>
                Sign In
            </Button>
        </>
    )
}

export default SignIn;