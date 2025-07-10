import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { RequireAuthChecker } from "@/features"
import { PropsWithChildren } from "react"

const DashboardLayout = ({ children }: PropsWithChildren) => {
    return (
        <section className="w-full h-dvh">
            <SidebarProvider>
                <AppSidebar />

                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                        <SidebarTrigger className="-ml-1" />
                    </header>

                    {children}
                </SidebarInset>
            </SidebarProvider>
        </section>
    )
}

export default DashboardLayout
