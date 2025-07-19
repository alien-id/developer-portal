'use client';

import { Button } from "@/components/ui/button";

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    providerName: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    providerUrl: z.string().url({
        message: "Please enter a valid URL.",
    })
})


const DashboardPage = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            providerName: "",
            providerUrl: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)

        const payload = {
            provider_name: values.providerName,
            provider_url: values.providerUrl,
        }

        await fetch('http://localhost:3005/providers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
    }


    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="providerName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Provider Name</FormLabel>

                                <FormControl>
                                    <Input {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="providerUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Provider URL</FormLabel>

                                <FormControl>
                                    <Input {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div >
    )
}

export default DashboardPage
