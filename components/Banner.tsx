"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";

export default function Banner() {
    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut" as const,
            },
        },
    };

    return (
        <section className="relative h-[90vh] flex items-center justify-center text-center py-2 overflow-hidden lg:rounded-[25px] md:max-w-[92%] mx-auto lg:my-6 -mt-1 shadow-[0_10px_50px_rgba(0,0,0,0.25)]">
            {/* Background Video */}
            <video
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                src="/videos/bannerVideo.mp4"
                autoPlay
                muted
                loop
                playsInline
                title="Background video"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-b from-[#EEEEEE]/25 to-transparent z-1" />

            {/* Animated Content */}
            <motion.div
                className="relative z-10 max-w-5xl px-6 text-white"
                initial="hidden"
                animate="visible"
                variants={{
                    visible: {
                        transition: {
                            staggerChildren: 0.2,
                        },
                    },
                }}
            >
                {/* Small Badge */}
                <motion.div variants={fadeUp} className="mb-4 font-satoshi">
                    <span className="bg-white/35 text-sm md:text-lg px-4 py-1 rounded-[8px] backdrop-blur-md shadow-[0_2px_6.6px_0_#FF6600]">
                        Your AI Fitness Companion
                    </span>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    variants={fadeUp}
                    className="text-4xl sm:text-5xl md:text-7xl font-medium leading-tight mb-4 font-neue-haas-grotesk-display-pro"
                >
                    Transform Your Health
                    <br />
                    with <span className="bg-linear-to-r from-[#EEEEEE] to-[#FF6600] bg-clip-text text-transparent">NutriFit</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    variants={fadeUp}
                    className="text-base sm:text-xl text-white/80 mb-8 font-satoshi"
                >
                    Smart Fitness & Diet Planner that helps you achieve your health goals. <br className="hidden md:block"/>
                    Get personalized workout and meal plans powered by AI.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    variants={fadeUp}
                    className="flex flex-col sm:flex-row gap-4 justify-center font-satoshi"
                >
                    <Link href="/auth/login">
                        <button className="bg-[#FF6600] hover:bg-[#FF6600]/75 text-white font-medium px-[30px] py-[15px] rounded-[12px] transition cursor-pointer">
                            Get Started
                        </button>
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
}
