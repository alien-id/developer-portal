import { Authenticator } from "@/features/auth";
import Logo2xGraySvg from '@/icons/logo-2x-gray.svg';

const SignInPage = () => {
    return (
        <section className="h-full w-full">
            <div className="max-w-[696px] w-full h-full rounded-t-[40px] mx-auto border border-b-0 border-stroke-default p-4 flex flex-col items-center">
                <Logo2xGraySvg className="mb-6 shrink-0" />

                <Authenticator />
            </div>
        </section>
    )
}

export default SignInPage;
