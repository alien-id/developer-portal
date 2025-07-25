import { AuthProtector, Header } from "@/features"
import { robotoMono } from "@/fonts/fonts"
import Link from "next/link"
import { PropsWithChildren } from "react"

const DashboardLayout = ({ children }: PropsWithChildren) => {
    return (
        <section className="w-full h-dvh flex flex-col gap-3">

            <Header />

            <section className="max-w-[1080px] w-full h-full mx-auto px-3 pb-3 grid grid-cols-[1fr_696px_1fr] gap-3">
                <aside>
                    <div className={`mb-4 text-text-secondary text-xs font-medium uppercase leading-none tracking-tight ${robotoMono.className}`}>
                        Menu
                    </div>

                    <nav className="flex flex-col gap-2">
                        <Link
                            href={"/dashboard/sso"}
                            className="text-text-primary text-sm leading-tight font-booton"
                        >
                            Alien SSO
                        </Link>
                    </nav>
                </aside>

                <AuthProtector>
                    {children}
                </AuthProtector>

                <aside />
            </section>
        </section>
    )
}

export default DashboardLayout;
