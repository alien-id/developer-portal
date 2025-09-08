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
import { cn, sleep } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { qrOptions } from "./config";
import { useAuth } from "@alien_org/sso-sdk-react";
import {Button} from "@/components/ui/button";
import ArrowRight16Svg from "@/icons/arrow-right-16.svg";

export const Authenticator = () => {
    const router = useRouter();
    const { getAuthDeeplink, pollAuth, exchangeToken, auth } = useAuth()
    const [isLoading, setIsLoading] = useState(false);

    const ref = useRef(null);

    const [isError, setIsError] = useState<boolean>(false);
    const [deepLink, setDeepLink] = useState<string>('');

    useEffect(() => {
        const qrCode = new QRCodeStyling(qrOptions);

        if (ref.current) {
            qrCode.append(ref.current);
        }

        (async () => {
            try {
                setIsLoading(true);
                const { deep_link, polling_code } = await getAuthDeeplink();
                setIsLoading(false);

                console.log(deep_link)

                setDeepLink(deep_link);

                qrCode.update({
                    data: deep_link,
                });

                const authorizationCode = await pollAuth(polling_code);
                if (!authorizationCode) throw new Error("Unauthorized");


                setIsLoading(true);
                const accessToken = await exchangeToken(authorizationCode);
                setIsLoading(false);
                if (!accessToken) throw new Error("Unauthorized");
            } catch (error) {
                console.log("initAuthorization error: ", error);

                setIsError(true);
            }
        })()
    }, [ref, router]);

    if (isError) {
        return (
            <div className="h-full w-full grid justify-center place-content-center place-items-center">
                <div className="mb-5 relative">
                    <Clear24Svg className="" />
                </div>

                <p className="text-center text-text-primary text-2xl leading-loose mb-4">
                    Verification failed
                </p>

                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-button-secondary-bg-active rounded-full flex justify-center items-center gap-1 cursor-pointer">
                    <Refresh16Svg />

                    <span className="justify-center text-text-primary text-base leading-snug">
                        Try again
                    </span>
                </button>
            </div>
        )
    }

    if (auth.tokenInfo) {
        return (
            <div className="h-full w-full grid justify-center place-content-center place-items-center">
                <div className="mb-5 relative after:absolute after:w-14 after:h-14 after:top-0 after:left-0 after:bg-green-700 after:rounded-full after:blur-2xl">
                    <Success24Svg />
                </div>

                <p className="text-center text-text-primary text-2xl leading-loose mb-4">
                    Your Alien ID<br />
                    authentication was successful
                </p>

                <div className="pl-2 pr-4 py-2 bg-bg-secondary rounded-[34px] inline-flex justify-start items-center gap-3">
                    <Avatar className="w-7 h-7">
                        <AvatarImage
                            src={`https://avatar.iran.liara.run/public`}
                            alt={auth.tokenInfo.app_callback_session_address}
                        />

                        <AvatarFallback>
                            {auth.tokenInfo.app_callback_session_address}
                        </AvatarFallback>
                    </Avatar>

                    <div className="justify-start text-text-primary text-sm  leading-tight">
                        {auth.tokenInfo.app_callback_session_address}
                    </div>
                </div>

                <Link href='/dashboard/sso' className="mt-[24px]">
                    <Button
                      variant={'brand'}
                      className='text-text-primary text-base leading-snug px-10 py-2'
                    >
                        Go to Dashboard

                        <ArrowRight16Svg className="text-neutral-500" />
                    </Button>
                </Link>
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
            <p className="text-text-primary text-2xl mb-[40px] text-center">
                Scan with Alien App <br />
                to sign in to Developer Portal
            </p>

            <div className="max-w-[340px] max-h-[340px] p-[24px] mb-[40px] rounded-[32px] relative border border-stroke-default">
                {isLoading && <Spinner24Svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin" />}

                <div
                    ref={ref}
                    className={cn(
                        isLoading && "blur-md",
                      "w-full h-full grid place-items-center overflow-hidden",
                        "[&>*]:w-full [&>*]:h-full [&>*]:max-w-full [&>*]:max-h-full [&>*]:object-contain"
                    )}
                />
            </div>

            <div className="max-w-[476px] p-4 bg-bg-secondary rounded-2xl">
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
