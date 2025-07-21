import { Authenticator } from "@/features/auth";
import Logo2xGraySvg from '@/icons/logo-2x-gray.svg';

const SignInPage = () => {
    return (
        <main className="h-full w-full">
            <div className="h-full w-full px-3 pb-3">

                <div className="max-w-[696px] w-full h-full rounded-[40px] mx-auto border border-stroke-default p-4 grid grid-rows-[auto_1fr] place-items-center">
                    <Logo2xGraySvg className="mb-6 shrink-0" />

                    <Authenticator />
                </div>
            </div>
        </main>
    )
}

export default SignInPage;
