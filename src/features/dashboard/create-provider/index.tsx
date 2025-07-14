import { Button } from "@/components/ui/button";
import { Dialog, DialogBody, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./custom-dialog";
import Close16Svg from '@/icons/close-16.svg';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "./custom-accordion"
import { ChangeEvent, useState } from "react";
import FloatingLabelInput from "./custom-input";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./scheme";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

const DashboardCreateProvider = () => {
    const [accordionCurrent, setAccordionCurrent] = useState("1");
    const [providerName, setProviderName] = useState("");
    const [providerDomain, setProviderDomain] = useState("");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            domainName: "",
            domaneUrl: "",
        },
    })

    const handleChangeAccordionCurrent = (value: string) => {
        console.log(value);
        setAccordionCurrent(value)
    }

    const onChangeProviderName = (e: ChangeEvent<HTMLInputElement>) => {
        setProviderName(e.target.value)
    }

    const onChangeProviderDomain = (e: ChangeEvent<HTMLInputElement>) => {
        setProviderDomain(e.target.value)
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Open Dialog</Button>
            </DialogTrigger>

            <DialogContent className="w-[476px]">
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
                                <div className={`w-5 h-5 ${accordionCurrent === "1" ? "bg-alpha-blue-24 text-blue-300" : "border border-stroke-default/25 text-neutral-400"}  text-xs leading-none rounded-full relative overflow-hidden`}>
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
                                        1
                                    </div>
                                </div>

                                <span className="text-text-primary text-base leading-snug">
                                    Enter provider name and domain
                                </span>
                            </AccordionTrigger>

                            <AccordionContent className="flex flex-col  text-balance pl-9">
                                <p className="text-text-secondary text-sm font-normals leading-tight mb-4">
                                    Name your provider and specify the domain.
                                </p>

                                <Form {...form}>
                                    <form
                                        onSubmit={form.handleSubmit(onSubmit)}
                                        className="flex flex-col gap-2"
                                    >
                                        <FormField
                                            control={form.control}
                                            name="domainName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <FloatingLabelInput
                                                            id="provider-name"
                                                            label="Provider name"
                                                            {...field}
                                                        // value={providerName}
                                                        // onChange={onChangeProviderName}
                                                        />
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="domaneUrl"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <FloatingLabelInput
                                                            id="provider-domain"
                                                            label="Domain"
                                                            {...field}

                                                        // value={providerDomain}
                                                        // onChange={onChangeProviderDomain}
                                                        />
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <button type="submit" className="px-4 py-2 bg-button-primary-bg-active rounded-[999px] inline-flex justify-center items-center gap-1">
                                            <div className="text-center justify-center text-text-primary text-baseleading-snug">
                                                Submit
                                            </div>
                                        </button>
                                    </form>
                                </Form>
                            </AccordionContent>
                        </AccordionItem>

                        <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-neutral-400/20" />

                        <AccordionItem value="2">
                            <AccordionTrigger className="flex flex-row items-center py-2">
                                <div className={`w-5 h-5 ${accordionCurrent === "2" ? "bg-alpha-blue-24 text-blue-300" : "border border-stroke-default/25 text-neutral-400"}  text-xs leading-none rounded-full relative overflow-hidden`}>
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
                                        2
                                    </div>
                                </div>

                                <span className="text-text-primary text-base leading-snug">
                                    Private key and private address
                                </span>
                            </AccordionTrigger>

                            <AccordionContent className="flex flex-col gap-4 text-balance pl-9">
                                <p>
                                    We offer worldwide shipping through trusted courier partners.
                                    Standard delivery takes 3-5 business days, while express shipping
                                    ensures delivery within 1-2 business days.
                                </p>
                                <p>
                                    All orders are carefully packaged and fully insured. Track your
                                    shipment in real-time through our dedicated tracking portal.
                                </p>
                            </AccordionContent>
                        </AccordionItem>

                        <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-neutral-400/20" />

                        <AccordionItem value="3">
                            <AccordionTrigger className="flex flex-row items-center py-2">
                                <div className={`w-5 h-5 ${accordionCurrent === "3" ? "bg-alpha-blue-24 text-blue-300" : "border border-stroke-default/25 text-neutral-400"}  text-xs leading-none rounded-full relative overflow-hidden`}>
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
                                        3
                                    </div>
                                </div>

                                <span className="text-text-primary text-base leading-snug">
                                    Install and connect the SDKs
                                </span>
                            </AccordionTrigger>

                            <AccordionContent className="flex flex-col gap-4 text-balance pl-9">
                                <p>
                                    We stand behind our products with a comprehensive 30-day return
                                    policy. If you&apos;re not completely satisfied, simply return the
                                    item in its original condition.
                                </p>
                                <p>
                                    Our hassle-free return process includes free return shipping and
                                    full refunds processed within 48 hours of receiving the returned
                                    item.
                                </p>
                            </AccordionContent>
                        </AccordionItem>

                        <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-neutral-400/20" />

                        <AccordionItem value="4">
                            <AccordionTrigger className="flex flex-row items-center py-2">
                                <div className={`w-5 h-5 ${accordionCurrent === "4" ? "bg-alpha-blue-24 text-blue-300" : "border border-stroke-default/25 text-neutral-400"}  text-xs leading-none rounded-full relative overflow-hidden`}>
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
                                        4
                                    </div>
                                </div>

                                <span className="text-text-primary text-base leading-snug">
                                    Customize Alien ID button
                                </span>
                            </AccordionTrigger>

                            <AccordionContent className="flex flex-col gap-4 text-balance pl-9">
                                <p>
                                    We stand behind our products with a comprehensive 30-day return
                                    policy. If you&apos;re not completely satisfied, simply return the
                                    item in its original condition.
                                </p>
                                <p>
                                    Our hassle-free return process includes free return shipping and
                                    full refunds processed within 48 hours of receiving the returned
                                    item.
                                </p>
                            </AccordionContent>
                        </AccordionItem>

                        <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-neutral-400/20" />

                        <AccordionItem value="5">
                            <AccordionTrigger className="flex flex-row items-center py-2">
                                <div className={`w-5 h-5 ${accordionCurrent === "5" ? "bg-alpha-blue-24 text-blue-300" : "border border-stroke-default/25 text-neutral-400"}  text-xs leading-none rounded-full relative overflow-hidden`}>
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
                                        5
                                    </div>
                                </div>

                                <span className="text-text-primary text-base leading-snug">
                                    Use the integration example
                                </span>
                            </AccordionTrigger>

                            <AccordionContent className="flex flex-col gap-4 text-balance pl-9">
                                <p>
                                    We stand behind our products with a comprehensive 30-day return
                                    policy. If you&apos;re not completely satisfied, simply return the
                                    item in its original condition.
                                </p>
                                <p>
                                    Our hassle-free return process includes free return shipping and
                                    full refunds processed within 48 hours of receiving the returned
                                    item.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </DialogBody>

            </DialogContent>
        </Dialog>
    )
}

export default DashboardCreateProvider;

