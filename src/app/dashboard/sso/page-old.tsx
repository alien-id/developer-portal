'use client';

import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

type Provider = {
    providerAddress: string;
    providerPrivateKey: string;
}

const installCommands1 = {
    nodejs: "npm install @alien/sso-sdk-client-js",
}

const installCommands2 = {
    nodejs: "npm install @alien/sso-sdk-server-js",
}

const DashboardPage = () => {
    const [provider, setProvider] = useState<Provider | null>(null);
    const [copiedField, setCopiedField] = useState<string | null>(null)

    const handleCreateProvider = () => {
        setProvider({
            providerAddress: process.env.NEXT_PUBLIC_PROVIDER_ADDRESS || '',
            providerPrivateKey: process.env.NEXT_PUBLIC_PROVIDER_PRIVATE_KEY || ''
        })
    }

    const copyToClipboard = async (text: string, field: string) => {
        try {
            await navigator.clipboard.writeText(text)
            setCopiedField(field)
            setTimeout(() => setCopiedField(null), 3000)
        } catch (err) {
            console.error("Failed to copy text: ", err)
        }
    }

    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            {!provider ? (
                <>
                    <p className="text-xl font-semibold">
                        You don't have any providers yet. Let's create one!
                    </p>

                    <Button onClick={handleCreateProvider} className="w-fit">
                        Create Provider
                    </Button>
                </>
            ) : (
                <>
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-gray-100">
                            Copy the staging environment variables to your app
                        </h2>

                        <div className="space-y-4">
                            {Object.entries(provider).map(([key, value], index) => (
                                <div key={index} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <code className="text-sm font-mono text-gray-300">{key}</code>
                                    </div>

                                    <div className="relative">
                                        <div className="bg-gray-700 border border-gray-700 rounded-md p-3 pr-12">
                                            <code className="text-sm font-mono text-gray-200 break-all">{value}</code>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-700"
                                            onClick={() => copyToClipboard(value, key)}
                                        >
                                            {copiedField === key ? (
                                                <Check className="h-4 w-4 text-green-400" />
                                            ) : (
                                                <Copy className="h-4 w-4 text-gray-400" />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-gray-100">Install the Alien SSO SDKs to your project</h2>

                        <div className="space-y-4">
                            <div className="relative">
                                <div className="bg-gray-800 border border-gray-700 rounded-md p-3 pr-12">
                                    <code className="text-sm font-mono text-gray-200">
                                        {installCommands1['nodejs' as keyof typeof installCommands1]}
                                    </code>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-700"
                                    onClick={() =>
                                        copyToClipboard(
                                            installCommands1['nodejs' as keyof typeof installCommands1],
                                            "install-command",
                                        )
                                    }
                                >
                                    {copiedField === "install-command" ? (
                                        <Check className="h-4 w-4 text-green-400" />
                                    ) : (
                                        <Copy className="h-4 w-4 text-gray-400" />
                                    )}
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="relative">
                                <div className="bg-gray-800 border border-gray-700 rounded-md p-3 pr-12">
                                    <code className="text-sm font-mono text-gray-200">
                                        {installCommands2['nodejs' as keyof typeof installCommands2]}
                                    </code>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-700"
                                    onClick={() =>
                                        copyToClipboard(
                                            installCommands2['nodejs' as keyof typeof installCommands2],
                                            "install-command",
                                        )
                                    }
                                >
                                    {copiedField === "install-command" ? (
                                        <Check className="h-4 w-4 text-green-400" />
                                    ) : (
                                        <Copy className="h-4 w-4 text-gray-400" />
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div >
    )
}

export default DashboardPage

