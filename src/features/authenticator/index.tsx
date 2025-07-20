'use client';

import QRCodeStyling from "qr-code-styling";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo2xGraySvg from '@/icons/logo-2x-gray.svg';
import Success24Svg from '@/icons/success-24.svg';
import Clear24Svg from '@/icons/clear-24.svg';
import X16SuccessSvg from '@/icons/x-16-success.svg';
import Refresh16Svg from '@/icons/refresh-16.svg';

import Spinner24Svg from '@/icons/spinner-24.svg';
import alienSsoSdkClient from "@/lib/alien-sso-sdk-client";
import { getInitialsFromFullName, sleep } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const defaultDeepLink = "alienapp://create_session/authorize?callback_url=https%3A%2F%2Fsso.alien-api.com%2Fapp_callback%2F00cdf01f-f245-4ed4-8ecc-155c605fb24e&provider_address=00000001000000000000000300000000&expired_at=1752448776&link_signature=ab72e3fbe45513abe1c138ec9d0522a5d258a6604b389ee01bbc63a170dc41f5c0792f42f9f8e187b134021bc8dee6203c037cd80aef89e970e50620be49fb00"
// const defaultDeepLink = "alienapp://c_s/a?cb=https%3A%2F%2Fsso.alien-api.com%2Fapp_callback%2F00cdf01f-f245-4ed4-8ecc-155c605fb24e&pa=00000001000000000000000300000000&ea=1752448776&ls=ab72e3fbe45513abe1c138ec9d0522a5d258a6604b389ee01bbc63a170dc41f5c0792f42f9f8e187b134021bc8dee6203c037cd80aef89e970e50620be49fb00"

type User = {
    app_callback_payload: {
        full_name: string
    },
    app_callback_session_address: string,
    app_callback_session_signature: string,
    expired_at: number,
    issued_at: number,
}

function Authenticator() {
    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);

    const ref = useRef(null);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    const [deepLink, setDeepLink] = useState<string>(defaultDeepLink);

    useEffect(() => {
        const qrCode = new QRCodeStyling({
            data: defaultDeepLink,
            width: 208,
            height: 208,
            margin: 0,
            shape: 'square',
            type: 'canvas',
            backgroundOptions: {
                color: undefined,
            },
            cornersSquareOptions: {
                type: 'extra-rounded',
            },
            cornersDotOptions: {
                type: 'rounded',
            },
            dotsOptions: {
                color: "#ffffff",
                type: "extra-rounded"
            },
            image: "/logo-gradient.svg",
            imageOptions: {
                crossOrigin: "anonymous",
                margin: 10,
                hideBackgroundDots: true,
            },
        });

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

                sleep(3000);

                router.push('/dashboard/sso');
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
            <div className="w-[696px] h-full rounded-[40px] mx-auto border border-stroke-default p-9 grid grid-rows-[auto_1fr] place-items-center">
                <Logo2xGraySvg className="" />

                <div className="flex flex-col items-center justify-center">
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

            </div>
        )
    }

    if (user) {
        const fullnameInitials = getInitialsFromFullName(user.app_callback_payload.full_name || '');

        return (
            <div className="w-[696px] h-full rounded-[40px] mx-auto border border-stroke-default p-9 grid grid-rows-[auto_1fr] place-items-center">
                <Logo2xGraySvg className="" />

                <div className="flex flex-col items-center justify-center">
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

            </div>
        )
    }



    return (
        <div className="w-[696px] h-full rounded-[40px] mx-auto border border-stroke-default p-4 flex flex-col items-center">
            <Logo2xGraySvg className="mb-6" />

            <p className="text-text-primary text-2xl mb-10 text-center">
                Scan with Alien App <br />
                to sign in to Developer Portal
            </p>

            <div className="w-64 h-64 p-6 mb-10 rounded-[32px] relative border border-stroke-default">
                {isLoading && <Spinner24Svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin" />}

                <div ref={ref} className={`${isLoading && "blur-md"}`} />
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

            <Link href={deepLink} className="text-text-secondary text-xs p-1 mb-4">
                Direct link
            </Link>
        </div>
    )
}

export default Authenticator;