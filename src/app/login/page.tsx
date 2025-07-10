'use client';

import alienSsoSdkClient from "@/lib/alien-sso-sdk-client";
import { LoaderCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";



const LoginPage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [deepLink, setDeepLink] = useState<string>('');

    useEffect(() => {
        async function initAuthorization() {
            const { deep_link, polling_code } = await alienSsoSdkClient.authorize();

            setDeepLink(deep_link);
            setIsLoading(false);

            // rework to object with autorizationCode
            const autorizationCode = await alienSsoSdkClient.pollForAuthorization(polling_code);
            if (!autorizationCode) return;

            const accessToken = await alienSsoSdkClient.exchangeCode(autorizationCode);

            if (!accessToken) return;

            const isValid = await alienSsoSdkClient.verifyToken('');

            if (!isValid) return;

            // Redirect to the home page or wherever you want after successful login
            router.push('/dashboard/sso');
        }

        initAuthorization();
    }, []);

    if (isLoading) {
        return (
            <LoaderCircleIcon size={'3rem'} className="animate-spin" />
        )
    }

    return (
        <div className="w-[32rem] flex flex-col items-center justify-center gap-5">
            <h2 className="text-2xl font-semibold text-center">
                Scan QR to continue sign in
            </h2>

            <div className="w-[20rem] h-[20rem]">
                {deepLink && (
                    <QRCode
                        title="Scan to continue sign in"
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={deepLink}
                        viewBox={`0 0 256 256`}
                    />
                )}
            </div>
        </div>
    )
}

export default LoginPage
