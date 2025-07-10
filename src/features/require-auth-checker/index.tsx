'use client';

import alienSsoSdkClient from "@/lib/alien-sso-sdk-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useAuthStatus() {
    const [isVerified, setIsVerified] = useState<boolean>(false);
    const [status, setStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');

    useEffect(() => {
        alienSsoSdkClient.verifyToken('kek').then(isVerified => {
            console.log('Verification result:', isVerified);

            if (isVerified) {
                setIsVerified(isVerified);
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
    const router = useRouter();

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