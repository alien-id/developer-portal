'use client';

import { geistMono } from "@/fonts";

import Link16Svg from '@/icons/link-16.svg';

const DashboardSsoPage = () => {

    return (
        <div className="w-full h-full rounded-[40px] border border-stroke-default px-[110px] py-[36px]">
            <h2 className="text-text-primary text-xl mb-2">
                Introduction
            </h2>

            <p className="text-text-secondary text-sm font-normal mb-4">
                Before creating your first integration, here’s a quick overview of the initial steps. This helps you understand what’s coming next.
            </p>

            <div className="flex flex-col gap-1">
                <div className="p-4 bg-bg-secondary rounded-2xl border border-stroke-disabled inline-flex flex-row gap-3">
                    <div className="w-5 h-5 relative rounded-full border border-stroke-default text-neutral-400 text-xs leading-none">
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                            1
                        </div>
                    </div>

                    <div className="w-96 inline-flex flex-col  items-start gap-4">
                        <div className="flex flex-col  items-start gap-1">
                            <div className="flex flex-col  items-start gap-1">
                                <div className=" text-text-primary text-sm leading-tight mb-1">
                                    Create a new provider
                                </div>

                                <div className="text-text-secondary text-sm font-normal leading-tight">
                                    To start, you’ll need to create a new provider that defines your product.
                                    <br />
                                    <br />
                                    Once created, you’ll receive a private key and a private address — both are required to securely initialize your SSO integration. Store them safely: they act as credentials for your provider.
                                </div>
                            </div>
                        </div>

                        <div className="px-4 py-2 bg-zinc-900 rounded-[36px] shadow-[inset_0px_3px_11px_0px_rgba(101,178,255,0.70)] shadow-[inset_0px_0px_16px_0px_rgba(46,130,247,1.00)] border border-offset-[-0.50px] border-white flex justify-center items-center gap-2">
                            <div className="text-center justify-center text-text-primary text-base leading-snug">
                                Create a provider
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-bg-secondary rounded-2xl border border-stroke-disabled inline-flex flex-row gap-3">
                    <div className="w-5 h-5 relative rounded-full border border-stroke-default text-neutral-400 text-xs leading-none">
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                            2
                        </div>
                    </div>

                    <div className="w-96 inline-flex flex-col  items-start gap-4">
                        <div className="flex flex-col  items-start gap-1">
                            <div className="flex flex-col  items-start gap-1">
                                <div className=" text-text-primary text-sm leading-tight mb-1">
                                    Install the SDKs
                                </div>

                                <div className="text-text-secondary text-sm font-normal leading-tight">
                                    Next, you’ll install two SDK packages — one for the client, and one for the server. These packages handle the full SSO flow between your platform and ours.
                                </div>
                            </div>
                        </div>

                        <div className="h-7 px-2.5 py-1 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-800 rounded-lg shadow-[inset_0px_3px_11px_0px_rgba(101,178,255,0.70)] shadow-[inset_0px_0px_16px_0px_rgba(49,49,49,1.00)] outline outline-1 outline-offset-[-0.50px] outline-white/10 inline-flex justify-center items-center gap-1">
                            <div className={`justify-start text-text-primary text-xs font-medium leading-tight ${geistMono.className}`}>
                                npm install @alien/sso-sdk-client-js
                            </div>

                            <div className="w-4 h-4 relative overflow-hidden">
                                <div className="w-4 h-4 left-0 top-0 absolute overflow-hidden"></div>
                            </div>
                        </div>

                        <div className="h-7 px-2.5 py-1 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-800 rounded-lg shadow-[inset_0px_3px_11px_0px_rgba(101,178,255,0.70)] shadow-[inset_0px_0px_16px_0px_rgba(49,49,49,1.00)] outline outline-1 outline-offset-[-0.50px] outline-white/10 inline-flex justify-center items-center gap-1">
                            <div className={`justify-start text-text-primary text-xs font-medium leading-tight ${geistMono.className}`}>
                                npm install @alien/sso-sdk-server-js
                            </div>

                            <div className="w-4 h-4 relative overflow-hidden">
                                <div className="w-4 h-4 left-0 top-0 absolute overflow-hidden"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-bg-secondary rounded-2xl border border-stroke-disabled inline-flex flex-row gap-3">
                    <div className="w-5 h-5 relative rounded-full border border-stroke-default text-neutral-400 text-xs leading-none">
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                            3
                        </div>
                    </div>

                    <div className="w-96 inline-flex flex-col  items-start gap-4">
                        <div className="flex flex-col  items-start gap-1">
                            <div className="flex flex-col  items-start gap-1">
                                <div className=" text-text-primary text-sm leading-tight mb-1">
                                    Finish client setup & customization
                                </div>

                                <div className="text-text-secondary text-sm font-normal leading-tight">
                                    In the final step, you’ll initialize the client and complete a few remaining settings.
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-row flex-wrap gap-2">

                            <div className="inline-flex justify-start items-center gap-[3px]">
                                <div className="border-b border-white/20 flex justify-center items-center gap-2.5">
                                    <div className="justify-start text-white text-xs leading-none">Usage example</div>
                                </div>
                                <div className="w-4 h-4 relative overflow-hidden">
                                    <Link16Svg />
                                </div>
                            </div>

                            <div className="inline-flex justify-start items-center gap-[3px]">
                                <div className="border-b border-white/20 flex justify-center items-center gap-2.5">
                                    <div className="justify-start text-white text-xs leading-none">Integrating the sign-in button</div>
                                </div>
                                <div className="w-4 h-4 relative overflow-hidden">
                                    <Link16Svg />

                                </div>
                            </div>

                            <div className="inline-flex justify-start items-center gap-[3px]">
                                <div className="border-b border-white/20 flex justify-center items-center gap-2.5">
                                    <div className="justify-start text-white text-xs leading-none">API Reference</div>
                                </div>
                                <div className="w-4 h-4 relative overflow-hidden">
                                    <Link16Svg />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DashboardSsoPage

