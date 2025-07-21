import { Authenticator } from "@/features/auth";
import Logo2xGraySvg from '@/icons/logo-2x-gray.svg';

const SignInPage = () => {
    return (
        <section className="h-full w-full">
            <div className="w-[696px] h-full rounded-[40px] mx-auto border border-stroke-default p-4 flex flex-col items-center">
                <Logo2xGraySvg className="mb-6 shrink-0" />

                <Authenticator />
            </div>
        </section>
    )
}

export default SignInPage;
