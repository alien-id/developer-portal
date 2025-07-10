import { PropsWithChildren } from "react"

const LoginLayout = ({ children }: PropsWithChildren) => {
    return (
        <section className="w-full h-dvh p-10 flex items-center justify-center">
            {children}
        </section>
    )
}

export default LoginLayout
