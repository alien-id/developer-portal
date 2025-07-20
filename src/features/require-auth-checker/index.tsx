'use client';

import alienSsoSdkClient from "@/lib/alien-sso-sdk-client";
import { useRouter } from "next/navigation";
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
    const [user, setUser] = useState<User | null>();

    const [status, setStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');

    useEffect(() => {
        const verifyToken = async () => {
            const token = alienSsoSdkClient.getAccessToken();

            if (!token) {
                setStatus('unauthenticated');
                return;
            }

            try {
                const isVerified = await alienSsoSdkClient.verifyToken();

                if (isVerified) {
                    const user = alienSsoSdkClient.getUser();

                    setUser(user);
                    setStatus('authenticated');
                } else {
                    setStatus('unauthenticated');
                }
            } catch (error) {
                console.log("useAuthStatus error:", error);

                setStatus('unauthenticated');
            }
        }

        verifyToken();
    }, []);

    console.log({ status, user });

    return { status, user };
}

export function AuthCheck({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const { status } = useAuthStatus();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/sign-in");
        }
    }, [status, router]);

    if (status === 'loading') return <p>Checking auth...</p>;

    if (status === 'unauthenticated') return null;

    return <>{children}</>
}
