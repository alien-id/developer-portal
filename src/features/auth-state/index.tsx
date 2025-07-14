'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuthStatus } from "../require-auth-checker";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function AuthState() {
    const { status } = useAuthStatus();

    if (status === 'unauthenticated') return (
        <Button asChild variant={'outline'}>
            <Link href={'/sign-in'}>
                Sign In
            </Link>
        </Button>
    );

    return (
        <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>
                UU
            </AvatarFallback>
        </Avatar>
    )
}

export default AuthState;