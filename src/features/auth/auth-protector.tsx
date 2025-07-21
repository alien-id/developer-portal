'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuth from "./use-auth";
import { Skeleton } from "@/components/ui/skeleton";

function AuthProtector({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const { status } = useAuth();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/sign-in");
        }
    }, [status, router]);

    if (status === 'loading') return <Skeleton className="h-full w-full rounded-xl" />;

    if (status === 'unauthenticated') return <>Not authenticated!</>;

    return <>{children}</>
}

export default AuthProtector;