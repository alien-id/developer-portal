"use client"

import type React from "react"
import { useState, useRef } from "react"
import { cn } from "@/lib/utils"

interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
    error?: string
}

export default function FloatingLabelInput({
    label,
    error,
    className,
    onFocus,
    onBlur,
    ...props
}: FloatingLabelInputProps) {
    const [isFocused, setIsFocused] = useState(false)
    const [hasValue, setHasValue] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true)
        onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false)
        setHasValue(e.target.value !== "")
        onBlur?.(e)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHasValue(e.target.value !== "")
        props.onChange?.(e)
    }

    const isFloating = isFocused || hasValue

    return (
        <div className="relative">
            <div className="relative">
                <input
                    ref={inputRef}
                    {...props}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder=""
                    className={cn(
                        "peer w-full rounded-lg border  bg-background px-3 pb-2 pt-6 text-sm transition-all duration-200 ease-in-out",
                        "focus:outline-none focus:ring-2",
                        isFocused
                            ? "border-blue-500 ring-blue-500/20"
                            : error
                                ? "border-red-500"
                                : "border-stroke-default hover:border-blue-500",
                        className,
                    )}
                />

                <label
                    className={cn(
                        "absolute left-3 text-neutral-600 text-base leading-snug transition-all duration-200 ease-in-out cursor-text",
                        isFloating ? "top-2 text-xs" : "top-1/2 -translate-y-1/2",
                    )}
                    onClick={() => inputRef.current?.focus()}
                >
                    {label}
                </label>
            </div>

            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    )
}