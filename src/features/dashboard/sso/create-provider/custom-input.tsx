"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { useId } from "react";

interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
}

export default function FloatingLabelInput({
    label,
}: FloatingLabelInputProps) {
    const id = useId();

    return (
        <div className="relative">
            <input
                type="text"
                id={id}
                className={cn(
                    "w-full peer appearance-none",
                    "px-4 pb-2 pt-6 w-full",
                    "rounded-2xl",
                    "outline outline-offset-[-1px] outline-stroke-default hover:outline-blue-500 focus:outline-blue-500",
                    "text-base leading-snug text-text-primary bg-transparent",
                    "transition-all duration-200 ease-in-out"
                )}
                placeholder=" "
            />

            <label
                htmlFor={id}
                className={cn(
                    "absolute z-10 origin-[0] start-4 transform -translate-y-1/2 top-4 peer-placeholder-shown:top-1/2 peer-focus:top-4",
                    "text-xs leading-snug text-neutral-600 peer-placeholder-shown:text-base peer-focus:text-xs peer-focus:leading-none",
                    "transition-all duration-200 ease-in-out",
                    "select-none"
                )}
            >
                {label}
            </label>
        </div>
    )
}

{/* <div class="relative">
    <input type="text" id="floating_filled" class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
    <label for="floating_filled" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Floating filled</label>
</div> */}