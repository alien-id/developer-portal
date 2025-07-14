import { Header } from "@/features"
import { PropsWithChildren } from "react"

const LoginLayout = ({ children }: PropsWithChildren) => {
    return (
        <section className="w-full h-dvh flex flex-col gap-3">
            <Header />

            {children}
        </section>
    )
}

export default LoginLayout
