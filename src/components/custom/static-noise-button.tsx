"use client"

import { useState } from "react"

function StaticNoiseButton() {

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <button
                className="relative overflow-hidden px-8 py-4 text-white font-semibold text-lg rounded-full bg-gradient-to-r from-blue-800 to-blue-900 border border-blue-600 shadow-lg transition-all duration-300 hover:shadow-blue-500/25 hover:shadow-xl group"
            >
                {/* Animated noise particles */}
                <div className="absolute inset-0 opacity-60">
                    {[...Array(50)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                        />
                    ))}
                </div>

                {/* Additional twinkling effect */}
                <div className="absolute inset-0">
                    {[...Array(30)].map((_, i) => (
                        <div
                            key={`twinkle-${i}`}
                            className="absolute w-0.5 h-0.5 bg-blue-200 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 4}s`,
                                animationDuration: `${1.5 + Math.random() * 1.5}s`,
                            }}
                        />
                    ))}
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-400/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300" />

                {/* Button text */}
                <span className="relative z-10">Create a provider</span>

                {/* Border glow */}
                <div className="absolute inset-0 rounded-full border border-blue-400/30 group-hover:border-blue-300/50 transition-all duration-300" />
            </button>
        </div>
    )
}

export default StaticNoiseButton;