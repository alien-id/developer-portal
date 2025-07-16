'use client';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import DashboardCreateProvider from "../create-provider";
import { Provider } from "../types";

const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
]

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
                        <TableHead className="w-[100px] text-text-secondary text-xs font-medium uppercase leading-none tracking-tight">
                            Provider name
                        </TableHead>
                        <TableHead className="w-[100px] text-text-secondary text-xs font-medium uppercase leading-none tracking-tight">
                            Domain
                        </TableHead>
                        <TableHead className="w-[100px] text-text-secondary text-xs font-medium uppercase leading-none tracking-tight">
                            Private key
                        </TableHead>
                        <TableHead className="text-text-secondary text-xs font-medium uppercase leading-none tracking-tight">
                            Address
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.map((provider) => (
                        <TableRow key={provider.id}>
                            <TableCell className="font-medium">
                                {provider.provider_name}
                            </TableCell>
                            <TableCell className="w-[100px]">
                                {provider.provider_url}
                            </TableCell>
                            <TableCell className="w-[100px]">
                                {provider.provider_private_key}
                            </TableCell>
                            <TableCell className="text-right">
                                {provider.provider_address}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">$2,500.00</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>

        </div >
    )
}


export default DashboardSsoProvidersList;