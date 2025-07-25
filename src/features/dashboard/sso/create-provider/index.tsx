'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogBody, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../../../components/custom/custom-dialog";
import Close16Svg from '@/icons/close-16.svg';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/custom/custom-accordion"
import { useState } from "react";
import FloatingLabelInput from "@/components/custom/custom-input";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./scheme";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { CreatedProvider, CreateProviderRequestPayload } from "./types";
import useSWRMutation from "swr/mutation";
import axiosInstance from "@/lib/axios";
import Spinner24Svg from '@/icons/spinner-24.svg';
import Keyline16Svg from '@/icons/keyline-24.svg';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { codeForClient, codeForServer } from "./constants";
import CopyField from "@/components/custom/copy-field";
import { cn, formatSecret } from "@/lib/utils";
import useSWR from "swr";
import { DownloadIcon } from "lucide-react";

async function createProvider(url: string, payload: CreateProviderRequestPayload) {
    return (await axiosInstance.post('/providers', payload, {
        headers: {
            'Content-Type': 'application/json',
        }
    })).data;
}

const DashboardCreateProvider = () => {
    const [isDialogOpened, setIsDialogOpened] = useState(false);
    const [accordionCurrent, setAccordionCurrent] = useState("1");

    const [createdProvider, setCreatedProvider] = useState<CreatedProvider | null>(null);

    const { mutate } = useSWR(`/providers`);

    const { trigger, isMutating } = useSWRMutation(`/providers/mutate`, async (
        url,
        { arg }: { arg: CreateProviderRequestPayload },
    ) => createProvider(url, arg))

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            providerName: "",
            providerDomainUrl: "",
        },
    })

    const handleChangeAccordionCurrent = (value: string) => {
        setAccordionCurrent(value)
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const payload: CreateProviderRequestPayload = {
            provider_name: values.providerName,
            provider_url: values.providerDomainUrl,
        }

        const createdProvider = await trigger(payload);

        setCreatedProvider(createdProvider);

        setAccordionCurrent('2');
    }

    const handleFinish = () => {
        setIsDialogOpened(false);
        mutate();
    }

    return (
        <Dialog
            open={isDialogOpened}
            onOpenChange={setIsDialogOpened}
        >
            <DialogTrigger asChild>
                <Button variant="brand">
                    <span className="text-text-primary text-base leading-snug">
                        Create a provider
                    </span>
                </Button>
            </DialogTrigger>

            <DialogContent className="w-[640px] max-h-[90dvh] py-3">
                <DialogHeader>
                    <DialogTitle className="text-text-primary text-xl leading-loose">Create a provider</DialogTitle>
                    <DialogDescription className="text-text-secondary text-sm font-normal leading-tight">
                        Set up your SSO integration in five simple steps.
                    </DialogDescription>

                    <DialogClose>
                        <div className="w-8 h-7 relative bg-bg-secondary rounded-[42px] border border-stroke-disabled">
                            <Close16Svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                            <span className="sr-only">Close</span>
                        </div>
                    </DialogClose>
                </DialogHeader>

                <DialogBody>
                    <Accordion
                        type="single"
                        collapsible
                        className="w-full flex flex-col gap-2"
                        value={accordionCurrent}
                        onValueChange={handleChangeAccordionCurrent}
                    >
                        <AccordionItem value="1">
                            <AccordionTrigger className="flex flex-row items-center py-2">
                                <div
                                    className={cn(
                                        `w-5 h-5 text-xs leading-none rounded-full relative overflow-hidden`,
                                        accordionCurrent === "1" ? "bg-alpha-blue-24 text-blue-300" : "border border-stroke-default text-neutral-400"
                                    )}
                                >
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
                                        1
                                    </div>
                                </div>

                                <span className="text-text-primary text-base leading-snug">
                                    Enter provider name and domain
                                </span>
                            </AccordionTrigger>

                            <AccordionContent className="flex flex-col text-balance pl-9 pr-8 pb-2 gap-4">
                                <p className="text-text-secondary text-sm font-normals leading-tight">
                                    Name your provider and specify the domain.
                                </p>

                                <Form {...form}>
                                    <form
                                        onSubmit={form.handleSubmit(onSubmit)}
                                        className="flex flex-col gap-4 "
                                    >
                                        <div className="flex flex-col gap-2">
                                            <FormField
                                                control={form.control}
                                                name="providerName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <FloatingLabelInput
                                                                id="provider-name"
                                                                label="Provider name"
                                                                disabled={isMutating}
                                                                {...field}
                                                            />
                                                        </FormControl>

                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="providerDomainUrl"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <FloatingLabelInput
                                                                id="provider-domain"
                                                                label="Domain"
                                                                disabled={isMutating}
                                                                {...field}
                                                            />
                                                        </FormControl>

                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>


                                        <button type="submit" className="px-4 py-2 bg-button-primary-bg-active rounded-full self-start">
                                            <div className="h-6 text-center justify-center text-text-primary text-base leading-snug flex flex-row gap-2 items-center">
                                                {isMutating && <Spinner24Svg className="animate-spin" />}

                                                Continue
                                            </div>
                                        </button>
                                    </form>
                                </Form>
                            </AccordionContent>
                        </AccordionItem>

                        <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-neutral-400/20" />

                        <AccordionItem value="2">
                            <AccordionTrigger className="flex flex-row items-center py-2">
                                <div
                                    className={cn(
                                        `w-5 h-5 text-xs leading-none rounded-full relative overflow-hidden`,
                                        accordionCurrent === "2" ? "bg-alpha-blue-24 text-blue-300" : "border border-stroke-default text-neutral-400"
                                    )}
                                >
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
                                        2
                                    </div>
                                </div>

                                <span className="text-text-primary text-base leading-snug">
                                    Private key and private address
                                </span>
                            </AccordionTrigger>

                            <AccordionContent className="flex flex-col text-balance pl-9 pr-8 pb-2 gap-4">
                                <p className="text-text-secondary text-sm font-normals leading-tight">
                                    We generated a unique private key and private address,
                                    <br />
                                    which are required to initialize and authenticate your integration
                                </p>

                                {createdProvider ? (
                                    <div className="flex flex-col gap-2">
                                        <div className="inline-flex items-center gap-2">
                                            <CopyField
                                                valueToCopy={createdProvider.provider_address}
                                                valueToShow={formatSecret(createdProvider.provider_address)}
                                            />

                                            <div className="text-text-secondary text-sm font-normal leading-tight">Private address</div>
                                        </div>

                                        <div className="inline-flex items-center gap-2">
                                            <CopyField
                                                valueToCopy={createdProvider.provider_private_key}
                                                valueToShow={formatSecret(createdProvider.provider_private_key)}
                                            />

                                            <div className="text-text-secondary text-sm font-normal leading-tight">Private key</div>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-text-secondary text-sm font-normal leading-tight">
                                        Generate provider on first step to see full example!
                                    </p>
                                )}


                                <button
                                    onClick={() => setAccordionCurrent('3')}
                                    className="px-4 py-2 bg-button-primary-bg-active rounded-full self-start"
                                >
                                    <div className="h-6 text-center justify-center text-text-primary text-base leading-snug flex flex-row gap-2 items-center">
                                        Continue
                                    </div>
                                </button>
                            </AccordionContent>
                        </AccordionItem>

                        <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-neutral-400/20" />

                        <AccordionItem value="3">
                            <AccordionTrigger className="flex flex-row items-center py-2">
                                <div
                                    className={cn(
                                        `w-5 h-5 text-xs leading-none rounded-full relative overflow-hidden`,
                                        accordionCurrent === "3" ? "bg-alpha-blue-24 text-blue-300" : "border border-stroke-default text-neutral-400"
                                    )}
                                >
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
                                        3
                                    </div>
                                </div>

                                <span className="text-text-primary text-base leading-snug">
                                    Install and connect the SDKs
                                </span>
                            </AccordionTrigger>

                            <AccordionContent className="flex flex-col text-balance pl-9 pr-8 pb-2 gap-4">
                                <p className="text-text-secondary text-sm font-normals leading-tight">
                                    Add our SDKs to your project:
                                </p>

                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-row gap-2 items-center">
                                        <CopyField
                                            valueToCopy={"npm install @alien/sso-sdk-client-js"}
                                            valueToShow={"npm install @alien/sso-sdk-client-js"}
                                        />
                                        <a href="/alien-sso-sdk-client-js-1.0.0.tgz" download>
                                            <DownloadIcon size={'1rem'} />
                                        </a>
                                    </div>

                                    <div className="flex flex-row gap-2 items-center">
                                        <CopyField
                                            valueToCopy={"npm install @alien/sso-sdk-server-js"}
                                            valueToShow={"npm install @alien/sso-sdk-server-js"}
                                        />

                                        <a href="/alien-sso-sdk-server-js-1.0.0.tgz" download>
                                            <DownloadIcon size={'1rem'} />
                                        </a>
                                    </div>
                                </div>

                                <p className="text-text-secondary text-sm font-normals leading-tight">
                                    They handle frontend and backend parts of the SSO flow.
                                </p>

                                <button
                                    onClick={() => setAccordionCurrent('4')}
                                    className="px-4 py-2 bg-button-primary-bg-active rounded-full self-start"
                                >
                                    <div className="h-6 text-center justify-center text-text-primary text-base leading-snug flex flex-row gap-2 items-center">
                                        Continue
                                    </div>
                                </button>

                            </AccordionContent>
                        </AccordionItem>

                        <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-neutral-400/20" />

                        <AccordionItem value="4">
                            <AccordionTrigger className="flex flex-row items-center py-2">
                                <div
                                    className={cn(
                                        `w-5 h-5 text-xs leading-none rounded-full relative overflow-hidden`,
                                        accordionCurrent === "4" ? "bg-alpha-blue-24 text-blue-300" : "border border-stroke-default text-neutral-400"
                                    )}
                                >
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
                                        4
                                    </div>
                                </div>

                                <span className="text-text-primary text-base leading-snug">
                                    Customize Alien ID button
                                </span>
                            </AccordionTrigger>

                            <AccordionContent className="flex flex-col text-balance pl-9 pr-8 pb-2 gap-4">
                                <p className="text-text-secondary text-sm font-normals leading-tight">
                                    We provide ready-made HTML and CSS, React. Using our
                                    <br />
                                    standard button helps build user trust. Custom styling is optional.
                                </p>

                                <div className="w-96 h-36 px-3 py-1 bg-linear-[90deg,_#1A1A1A_99.94%,_#313131_137.42%,_#313131_146.6%] rounded-lg shadow-[inset_0px_0px_16px_0px_#313131] outline-1 outline-offset-[-0.50px] outline-white/10 flex items-center justify-center">

                                    <div className="w-72 h-12 px-4 py-2 bg-button-primary-bg-active rounded-2xl flex justify-center items-center gap-2">
                                        <Keyline16Svg />

                                        <div className="text-center justify-center text-text-primary text-base leading-snug">
                                            Sign-in with Alien ID
                                        </div>
                                    </div>

                                </div>


                                <SyntaxHighlighter
                                    className="w-96"
                                    wrapLongLines
                                    language="tsx"
                                    style={oneDark}
                                >
                                    {/* {`import SignInButton from "@alien/sso-sdk-client-js"`} */}
                                    {`<button onClick={handleLogin} className="w-72 h-12 px-4 py-2 bg-button-primary-bg-active rounded-2xl flex justify-center items-center gap-2">
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
        <path d="M19.5 2C20.6046 2 21.5 2.89543 21.5 4V20C21.5 21.1046 20.6046 22 19.5 22H5.5C4.39543 22 3.5 21.1046 3.5 20V4C3.5 2.89543 4.39543 2 5.5 2H19.5ZM12.5 8.20312C9.29897 8.20312 6.59816 10.7903 5.75293 11.6934C5.5888 11.8687 5.5888 12.1313 5.75293 12.3066C6.59816 13.2097 9.29897 15.7969 12.5 15.7969C15.701 15.7969 18.4019 13.2096 19.2471 12.3066C19.4112 12.1313 19.4112 11.8687 19.2471 11.6934C18.4019 10.7904 15.701 8.20314 12.5 8.20312ZM10.665 10.9404C11.3406 9.77038 12.7104 9.29588 13.7236 9.88086C14.7368 10.4659 15.0105 11.8895 14.335 13.0596C13.6594 14.2296 12.2896 14.7041 11.2764 14.1191C10.2632 13.5341 9.98948 12.1105 10.665 10.9404Z" fill="white"/>
    </svg>
    
    <div className="text-center justify-center text-text-primary text-base leading-snug">
        Sign-in with Alien ID
    </div>
</button>`}

                                </SyntaxHighlighter>

                                <button
                                    onClick={() => setAccordionCurrent('5')}
                                    className="px-4 py-2 bg-button-primary-bg-active rounded-full self-start"
                                >
                                    <div className="h-6 text-center justify-center text-text-primary text-base leading-snug flex flex-row gap-2 items-center">
                                        Continue
                                    </div>
                                </button>
                            </AccordionContent>
                        </AccordionItem>

                        <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-neutral-400/20" />

                        <AccordionItem value="5">
                            <AccordionTrigger className="flex flex-row items-center py-2">
                                <div
                                    className={cn(
                                        `w-5 h-5 text-xs leading-none rounded-full relative overflow-hidden`,
                                        accordionCurrent === "5" ? "bg-alpha-blue-24 text-blue-300" : "border border-stroke-default text-neutral-400"
                                    )}
                                >
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
                                        5
                                    </div>
                                </div>

                                <span className="text-text-primary text-base leading-snug">
                                    Use the integration example
                                </span>
                            </AccordionTrigger>

                            <AccordionContent className="flex flex-col text-balance pl-9 pr-8 pb-2 gap-4">
                                <p className="text-text-secondary text-sm font-normals leading-tight">
                                    Get a working code sample with your key and address
                                    <br />
                                    already included. Use it as a starting point for your integration.
                                </p>

                                {createdProvider ? (
                                    <>
                                        <SyntaxHighlighter
                                            className="w-[440px]"
                                            wrapLongLines
                                            language="ts"
                                            style={oneDark}
                                        >
                                            {codeForServer(createdProvider.provider_address, createdProvider.provider_private_key)}
                                        </SyntaxHighlighter>


                                        <SyntaxHighlighter
                                            className="w-[440px]"
                                            wrapLongLines
                                            language="ts"
                                            style={oneDark}
                                        >
                                            {codeForClient()}
                                        </SyntaxHighlighter>
                                    </>
                                ) : (
                                    <p className="text-text-secondary text-sm font-normal leading-tight">
                                        Generate provider on first step to see full example!
                                    </p>
                                )}

                                <button
                                    onClick={handleFinish}
                                    className="px-4 py-2 bg-button-primary-bg-active rounded-full self-start"
                                >
                                    <div className="h-6 text-center justify-center text-text-primary text-base leading-snug flex flex-row gap-2 items-center">
                                        Finish
                                    </div>
                                </button>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </DialogBody>

            </DialogContent>
        </Dialog>
    )
}

export default DashboardCreateProvider;

