'use client';

import QRCodeStyling from "qr-code-styling";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Success24Svg from '@/icons/success-24.svg';
import Clear24Svg from '@/icons/clear-24.svg';
import X16SuccessSvg from '@/icons/x-16-success.svg';
import Refresh16Svg from '@/icons/refresh-16.svg';

import Spinner24Svg from '@/icons/spinner-24.svg';
import alienSsoSdkClient from "@/lib/alien-sso-sdk-client";
import { cn, getInitialsFromFullName, sleep } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types";
import { qrOptions } from "./config";

function Authenticator() {
    const router = useRouter();

    const ref = useRef(null);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [deepLink, setDeepLink] = useState<string>('');
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const qrCode = new QRCodeStyling(qrOptions);

        if (ref.current) {
            qrCode.append(ref.current);
        }

        async function initAuthorization() {
            try {
                const { deep_link, polling_code } = await alienSsoSdkClient.authorize();

                setDeepLink(deep_link);

                qrCode.update({
                    data: deep_link,
                });

                setIsLoading(false);

                // rework to object with autorizationCode
                const autorizationCode = await alienSsoSdkClient.pollForAuthorization(polling_code);

                if (!autorizationCode) return;

                // rework to object with accessToken
                const accessToken = await alienSsoSdkClient.exchangeCode(autorizationCode);

                if (!accessToken) return;

                const user = alienSsoSdkClient.getUser();

                setUser(user);

                await sleep(3000);

                // router.push('/dashboard/sso');
            } catch (error) {
                console.log("initAuthorization error: ", error);

                setIsError(true);
            }
        }

        initAuthorization();
    }, [ref, router]);

    const handleRefresh = () => {
        window.location.reload();
    }

    if (isError) {
        return (
            <div className="h-full w-full grid justify-center place-content-center place-items-center">
                <div className="mb-5 relative after:absolute after:w-14 after:h-14 after:top-0 after:left-0 after:bg-red-700 after:rounded-full after:blur-2xl">
                    <Clear24Svg className="" />
                </div>

                <p className="text-center text-text-primary text-2xl leading-loose mb-4">
                    Verification request<br />
                    not confirmed
                </p>

                <button
                    onClick={handleRefresh}
                    className="px-4 py-2 bg-button-secondary-bg-active rounded-full flex justify-center items-center gap-1 cursor-pointer">
                    <Refresh16Svg />

                    <span className="justify-center text-text-primary text-base leading-snug">
                        Try again
                    </span>
                </button>
            </div>
        )
    }

    if (user) {
        const fullnameInitials = getInitialsFromFullName(user.app_callback_payload.full_name || '');

        return (
            <div className="h-full w-full grid justify-center place-content-center place-items-center">
                <div className="mb-5 relative after:absolute after:w-14 after:h-14 after:top-0 after:left-0 after:bg-green-700 after:rounded-full after:blur-2xl">
                    <Success24Svg className="" />
                </div>

                <p className="text-center text-text-primary text-2xl leading-loose mb-4">
                    Your Alien ID<br />
                    authentication was successful
                </p>

                <div className="pl-2 pr-4 py-2 bg-bg-secondary rounded-[34px] inline-flex justify-start items-center gap-3">
                    <Avatar className="w-7 h-7">
                        <AvatarImage
                            src={`https://avatar.iran.liara.run/public`}
                            alt={fullnameInitials || "AU"}
                        />

                        <AvatarFallback>
                            {fullnameInitials || "AU"}
                        </AvatarFallback>
                    </Avatar>

                    <div className="justify-start text-text-primary text-sm  leading-tight">
                        {user.app_callback_payload.full_name || 'Anonymous User'}
                    </div>
                </div>
            </div>
        )
    }

    const handleMockScan = () => {
        if (!deepLink) return;

        fetch('/api/mock-callback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                deep_link: deepLink,
            }),
        })
    }

    return (
        <div className="h-full w-full grid justify-center place-content-center place-items-center">
            <p className="text-text-primary text-2xl mb-10 text-center">
                Scan with Alien App <br />
                to sign in to Developer Portal
            </p>

            <div className="max-w-80 max-h-80 w-80 h-80 p-6 mb-10 rounded-[32px] relative border border-stroke-default">
                {isLoading && <Spinner24Svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin" />}

                <div
                    ref={ref}
                    className={cn(
                        isLoading && "blur-md",
                        "max-w-68 max-h-68 w-68 h-68 flex"
                    )}
                />
            </div>

            <div className="w-[476px] p-4 bg-bg-secondary rounded-2xl">
                <p className="text-text-secondary text-sm mb-4">
                    What is Alien ID?
                </p>

                <div className="flex flex-col gap-3">
                    <div className="self-stretch inline-flex justify-start items-start gap-2">
                        <div className="w-6 h-6 flex justify-center items-center gap-2.5">
                            <div className="w-4 h-4 relative overflow-hidden">
                                <X16SuccessSvg />
                            </div>
                        </div>
                        <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                            <div className="self-stretch justify-start text-text-primary text-base leading-snug">
                                Scan to authenticate
                            </div>
                            <div className="self-stretch justify-start text-text-secondary text-sm leading-tight">
                                To access the Dev-Portal, simply scan a QR code using your mobile app. No usernames, no passwords — just a quick, secure handshake between devices.
                            </div>
                        </div>
                    </div>

                    <div className="self-stretch inline-flex justify-start items-start gap-2">
                        <div className="w-6 h-6 flex justify-center items-center gap-2.5">
                            <div className="w-4 h-4 relative overflow-hidden">
                                <X16SuccessSvg />
                            </div>
                        </div>
                        <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                            <div className="self-stretch justify-start text-text-primary text-base leading-snug">
                                Stay anonymous
                            </div>
                            <div className="self-stretch justify-start text-text-secondary text-sm leading-tight">
                                Your identity is never shared. We don’t collect personal data — your unique ID exists only inside your app and is never exposed during authentication.
                            </div>
                        </div>
                    </div>

                    <div className="self-stretch inline-flex justify-start items-start gap-2">
                        <div className="w-6 h-6 flex justify-center items-center gap-2.5">
                            <div className="w-4 h-4 relative overflow-hidden">
                                <X16SuccessSvg />
                            </div>
                        </div>
                        <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                            <div className="self-stretch justify-start text-text-primary text-base leading-snug">
                                Fully private, always
                            </div>
                            <div className="self-stretch justify-start text-text-secondary text-sm leading-tight">
                                Authentication happens locally and securely. Nothing about you is disclosed — not your name, email, or any identifying information.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Link
                href={deepLink}
                className={
                    cn(
                        "text-text-secondary text-xs p-1",
                        !!deepLink ? "visible" : "invisible"
                    )
                }
            >
                Direct link
            </Link>

            <button
                className={
                    cn(
                        "text-text-secondary text-xs p-1 cursor-pointer",
                        !!deepLink ? "visible" : "invisible"
                    )
                }
                onClick={handleMockScan}
            >
                Mock scan
            </button>
        </div>
    )
}

export default Authenticator;