'use client';

import alienSsoSdkClient from "@/lib/alien-sso-sdk-client";
import { User } from "@/types";
import { useEffect, useState } from "react";

function useAuth() {
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

export default useAuth;