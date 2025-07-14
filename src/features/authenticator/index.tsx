'use client';

import alienSsoSdkClient from "@/lib/alien-sso-sdk-client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo2xGraySvg from '@/icons/logo-2x-gray.svg';
import X16SuccessSvg from '@/icons/x-16-success.svg';
import Spinner24Svg from '@/icons/spinner-24.svg';

import QRCodeStyling from "qr-code-styling";

const defaultUrl = "alienapp://create_session/authorize?callback_url=https%3A%2F%2Fsso.alien-api.com%2Fapp_callback%2F00cdf01f-f245-4ed4-8ecc-155c605fb24e&provider_address=00000001000000000000000300000000&expired_at=1752448776&link_signature=ab72e3fbe45513abe1c138ec9d0522a5d258a6604b389ee01bbc63a170dc41f5c0792f42f9f8e187b134021bc8dee6203c037cd80aef89e970e50620be49fb00"

function Authenticator() {
    const router = useRouter();

    const ref = useRef(null);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [deepLink, setDeepLink] = useState<string>(defaultUrl);

    useEffect(() => {
        const qrCode = new QRCodeStyling({
            data: defaultUrl,
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

            // rework to object with isValid
            const isValid = await alienSsoSdkClient.verifyToken('');

            if (!isValid) return;

            router.push('/dashboard/sso');
        }

        initAuthorization();
    }, [ref]);

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
        </div>
    )
}

export default Authenticator;