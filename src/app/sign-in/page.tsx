import Logo2xGraySvg from '@/icons/logo-2x-gray.svg';
import { Authenticator } from "@/components/authenticator";
import { cn } from "@/lib/utils";
import Lock16Svg from "@/icons/lock-16.svg";
import Link from "next/link";
import ArrowRightSvg from "@/icons/arrow-right-16.svg";

const SignInPage = () => {
    return (
        <main className="max-w-[696px] mx-auto my-[18px]">
          <div className="mb-[30px] flex flex-row items-center relative">
            <Link href="/" className="absolute left-0 text-text-secondary flex flex-row gap-3 items-center">
              <div className="rotate-180">
                <ArrowRightSvg />
              </div>
              Back
            </Link>
            <div
              className={cn(
                "basis-full",
                "flex flex-row items-center gap-3 justify-center text-sm text-text-tertiary leading-tight",
                "hidden sm:flex",
              )}
            >
              <Lock16Svg />

              Secured by Alien
            </div>
          </div>


            <div className="w-full min-w-[696px] min-h-[70vh] mb-[18px] p-[35px] rounded-[40px] border border-stroke-default grid grid-rows-[auto_1fr] place-items-center">
                <Logo2xGraySvg className="mb-[23px] shrink-0" />

                <Authenticator />
            </div>
        </main>
    )
}

export default SignInPage;
