"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
}

export default function FloatingLabelInput({
    id,
    label,
    ...props
}: FloatingLabelInputProps) {
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
                {...props}
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
