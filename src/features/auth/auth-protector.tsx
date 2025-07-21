'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuth from "./use-auth";

function AuthProtector({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const { status } = useAuth();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/sign-in");
        }
    }, [status, router]);

    if (status === 'loading') return <p>Checking auth...</p>;

    if (status === 'unauthenticated') return null;

    return <>{children}</>
}

export default AuthProtector;