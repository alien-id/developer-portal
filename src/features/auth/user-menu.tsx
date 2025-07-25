'use client';

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitialsFromFullName } from "@/lib/utils";
import useAuth from "./use-auth";

function UserMenu() {
    const { status, user } = useAuth();

    if (status === 'loading') return (
        <>l</>
    );

    if (status === 'unauthenticated' || !user) return (
        <Link href={'/sign-in'}>
            <div className="h-7 px-2 py-1 bg-button-secondary-bg-active rounded-4xl flex justify-center items-center gap-2 shrink-0">
                <div className="text-text-secondary text-sm leading-none">
                    Sign in
                </div>
            </div>
        </Link>
    );

    const fullnameInitials = getInitialsFromFullName(user.app_callback_payload.full_name || '');

    return (
        <Avatar>
            <AvatarImage
                src={`https://avatar.iran.liara.run/public`}
                alt="@shadcn"
            />

            <AvatarFallback>
                {fullnameInitials}
            </AvatarFallback>
        </Avatar>
    )
}

export default UserMenu;