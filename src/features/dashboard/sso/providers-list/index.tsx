'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import DashboardCreateProvider from "../create-provider";
import { Provider } from "../types";
import CopyField from "@/components/custom/copy-field";
import { cn, formatSecret } from "@/lib/utils";
import { robotoMono } from "@/fonts/fonts";
import { Button } from "@/components/ui/button";
import ArrowRight16Svg from '@/icons/arrow-right-16.svg';

interface DashboardSsoProvidersListProps {
    data: Provider[];
}
const DashboardSsoProvidersList = ({ data }: DashboardSsoProvidersListProps) => {
    return (
        <div className="w-full h-full rounded-[40px] border border-stroke-default px-[110px] py-[36px]">
            <h2 className="text-text-primary text-xl mb-2">
                List of providers
            </h2>

            <p className="text-text-secondary text-sm font-normal mb-4">
                Manage your SSO providers — view keys, domains, and integration details in one place.
            </p>

            <div className="mb-6">
                <DashboardCreateProvider />
            </div>


            <Table className="overflow-hidden">
                <TableHeader>
                    <TableRow>
                        <TableHead
                            className={cn(
                                `max-w-[100px] text-text-secondary text-xs font-medium uppercase leading-none tracking-tight`,
                                robotoMono.className
                            )}
                        >
                            Provider name
                        </TableHead>

                        <TableHead
                            className={cn("max-w-[80px] text-text-secondary text-xs font-medium uppercase leading-none tracking-tight",
                                robotoMono.className
                            )}
                        >
                            Domain
                        </TableHead>

                        <TableHead
                            className={cn("max-w-[100px] text-text-secondary text-xs font-medium uppercase leading-none tracking-tight",
                                robotoMono.className
                            )}
                        >
                            Private key
                        </TableHead>

                        <TableHead
                            className={cn("max-w-[100px] text-text-secondary text-xs font-medium uppercase leading-none tracking-tight",
                                robotoMono.className
                            )}
                        >

                            Address
                        </TableHead>

                        <TableHead
                            className={cn("min-w-[10px] text-text-secondary text-xs font-medium uppercase leading-none tracking-tight",
                                robotoMono.className
                            )}
                        >
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.map((provider) => (
                        <TableRow key={provider.id} className="group relative hover:bg-neutral-900">
                            <TableCell className="font-medium">
                                {provider.provider_name}
                            </TableCell>

                            <TableCell className="max-w-[80px] overflow-hidden text-ellipsis">
                                {provider.provider_url}
                            </TableCell>

                            <TableCell className="max-w-[100px] relative z-10">
                                <CopyField
                                    valueToCopy={provider.provider_private_key}
                                    valueToShow={formatSecret(provider.provider_private_key, 3, 3)}
                                    outerWrapperClassName="max-w-[100px] overflow-hidden text-ellipsis"
                                    innerWrapperClassName="blur-xs group-hover:blur-none transition-all duration-200 ease-in-out"
                                />
                            </TableCell>

                            <TableCell className="max-w-[100px] relative z-10">
                                <CopyField
                                    valueToCopy={provider.provider_address}
                                    valueToShow={formatSecret(provider.provider_address, 3, 3)}
                                    outerWrapperClassName="max-w-[100px] overflow-hidden text-ellipsis z-1"
                                    innerWrapperClassName="blur-xs group-hover:blur-none transition-all duration-200 ease-in-out"
                                />
                            </TableCell>

                            <TableCell
                                className={cn(
                                    "min-w-[10px] max-w-[80px]",
                                    "absolute right-0 z-11 group-hover:-z-9",
                                    "h-full flex items-center",
                                    "bg-gradient-to-l from-black/100 via-black/100 to-transparent"
                                )}
                            >
                                <Button variant={'ghost'} className="gap-0.5 text-blue-300 text-sm leading-tight">
                                    Details
                                    <ArrowRight16Svg />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div >
    )
}


export default DashboardSsoProvidersList;