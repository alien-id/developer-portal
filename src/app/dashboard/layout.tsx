import { Header } from "@/features"
import { geistMono } from "@/fonts"
import Link from "next/link"
import { PropsWithChildren } from "react"

const DashboardLayout = ({ children }: PropsWithChildren) => {
    return (
        <section className="w-full h-dvh flex flex-col gap-3">

            <Header />

            <section className="max-w-[1080px] w-full mx-auto px-3 grid grid-cols-[192px_1fr_192px] gap-3">
                <aside>
                    <div className={`mb-4 text-text-secondary text-xs font-medium uppercase leading-none tracking-tight ${geistMono}`}>
                        Menu
                    </div>

                    <nav className="flex flex-col gap-2">
                        <Link href={"/dashboard/sso"} className="text-text-primary text-sm leading-tight">
                            Alien SSO
                        </Link>

                        <Link href={"/dashboard"} className="text-text-primary text-sm leading-tight">
                            Mini-Apps
                        </Link>
                    </nav>
                </aside>


                {children}

                <aside />

            </section>
        </section>
    )
}

export default DashboardLayout
