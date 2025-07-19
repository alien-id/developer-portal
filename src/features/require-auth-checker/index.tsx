'use client';

import alienSsoSdkClient from "@/lib/alien-sso-sdk-client";
import { useEffect, useState } from "react";

type User = {
    app_callback_payload: {
        full_name: string
    },
    app_callback_session_address: string,
    app_callback_session_signature: string,
    expired_at: number,
    issued_at: number,
}

export function useAuthStatus() {
    const [isVerified, setIsVerified] = useState<boolean>(false);
    const [status, setStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');
    const [, setUser] = useState<User | null>();

    useEffect(() => {
        alienSsoSdkClient.verifyToken().then(isVerified => {
            console.log('Verification result:', isVerified);

            if (isVerified) {
                const user = alienSsoSdkClient.getUser();
                console.log('user', user);

                setIsVerified(isVerified);
                setUser(user);
                setStatus('authenticated');
            } else {
                setStatus('unauthenticated');
            }
        }).catch(() => {
            setStatus('unauthenticated');
        });
    }, []);

    return { isVerified, status };
}

export default function RequireAuthChecker({ children }: { children: React.ReactNode }) {
    const { isVerified, status } = useAuthStatus();
    console.log('Verification status:', status);

    // useEffect(() => {
    //     if (status === "unauthenticated") {
    //         router.push("/login");
    //     }
    // }, [status, router]);

    if (status === "loading") return <p>Loading...</p>;

    if (!isVerified) return null;

    return <>{children}</>;
}