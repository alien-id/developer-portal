'use client';

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from '@alien_org/sso-sdk-react'

export const UserMenu = () => {
    const { auth } = useAuth();

    if (!auth.isAuthenticated || !auth.tokenInfo) {
      return (
        <Link href={'/sign-in'}>
          <div
            className="h-7 px-2 py-1 bg-button-secondary-bg-active rounded-4xl flex justify-center items-center gap-2 shrink-0">
            <div className="text-text-secondary text-sm leading-none">
              Sign in
            </div>
          </div>
        </Link>
      );
    }

    return (
        <Avatar>
            <AvatarImage
                src={`https://avatar.iran.liara.run/public`}
                alt="@shadcn"
            />

            <AvatarFallback>
                {auth.tokenInfo.app_callback_session_address}
            </AvatarFallback>
        </Avatar>
    )
}
