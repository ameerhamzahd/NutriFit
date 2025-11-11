"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export interface IdeaProps {
    onGetStarted?: () => void;
    autoplayInterval?: number;
}

interface IdeaDataItem {
    id: number;
    mainImage: string;
    smallImage: string;
    pillText: string;
    bg?: string;
    captionTop?: string;
    captionBottom?: string;
}

const DEFAULT_DATA: IdeaDataItem[] = [
    {
        id: 0,
        mainImage: "/images/Idea/image-01.jpg",
        smallImage: "/images/Idea/image-02.jpg",
        pillText: "Think Less\nLift More",
        bg: "#E7FF7A",
        captionTop: "A Brighter Future Starts",
        captionBottom: "With The Healthy Life",
    },
    {
        id: 1,
        mainImage: "/images/Idea/image-03.jpg",
        smallImage: "/images/Idea/image-04.jpg",
        pillText: "Train Smart\nRecover Well",
        bg: "#FFD7A8",
        captionTop: "Consistency Builds",
        captionBottom: "A Stronger You",
    },
    {
        id: 2,
        mainImage: "/images/Idea/image-05 (2).jpg",
        smallImage: "/images/Idea/image-06.jpg",
        pillText: "Move Daily\nFeel Alive",
        bg: "#A8E6FF",
        captionTop: "Small Steps Daily",
        captionBottom: "Lead To Big Wins",
    },
];

export const Idea: React.FC<IdeaProps> = ({
    autoplayInterval = 4000,
}) => {
    const [data] = useState<IdeaDataItem[]>(DEFAULT_DATA);

    const [activeIndex, setActiveIndex] = useState<number>(0);
    const autoplayRef = useRef<number | null>(null);

    useEffect(() => {
        if (!autoplayInterval || autoplayInterval <= 0) return;
        autoplayRef.current = window.setInterval(() => {
            setActiveIndex((s) => (s + 1) % data.length);
        }, autoplayInterval);

        return () => {
            if (autoplayRef.current) {
                window.clearInterval(autoplayRef.current);
            }
        };
    }, [autoplayInterval, data.length]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") {
                setActiveIndex((s) => (s + 1) % data.length);
            } else if (e.key === "ArrowLeft") {
                setActiveIndex((s) => (s - 1 + data.length) % data.length);
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [data.length]);

    const current = data[Math.max(0, Math.min(activeIndex, data.length - 1))];

    return (
        <section
            aria-label="Hero: Move to maintain your health"
            className="w-full px-6 py-12 md:py-20"
        >
            <div className="md:max-w-[92%] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* LEFT - Text block (rendered first so on mobile it appears on top) */}
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight text-slate-900">
                            Move to
                            Maintain your
                            <br />
                            <span className="block">Health</span>
                        </h1>

                        <p className="mt-10 text-base lg:text-2xl text-slate-500 font-satoshi">
                            Energize your lifestyle, embrace movement for a healthier you. Get motivated, stay active, and reap the benefits of a vibrant, well-nurtured body. Discover the joy of physical activity as it transforms your daily routine into opportunities for growth and vitality. Feel the positive energy flow through you with each step, building resilience and enhancing your overall wellbeing.
                        </p>
                    </div>

                    {/* progress segments below text */}
                    <div className="mt-8 lg:mt-0">
                        <div className="flex items-center justify-end space-x-3 max-w-xl">
                            {data.map((_, idx) => (
                                <button
                                    key={idx}
                                    aria-label={`Go to item ${idx + 1}`}
                                    onClick={() => setActiveIndex(idx)}
                                    className={`h-2 flex-1 rounded-full transition-colors duration-300 ${activeIndex === idx ? "bg-slate-900" : "bg-slate-200"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT - Composite cards */}
                <div className="col-span-2">
                    <div className="flex flex-col lg:flex-row gap-5 items-stretch lg:h-[900px]">
                        {/* Large main card */}
                        <div className="relative lg:flex-3 flex-1 rounded-2xl overflow-hidden shadow-lg min-h-[500px] h-full bg-white">
                            <Image
                                src={current.mainImage}
                                alt={current.captionTop || "Main hero image"}
                                fill
                                className="object-cover object-top"
                                priority
                            />
                            <div className="absolute left-6 bottom-6 right-6 bg-linear-to-t from-black/45 via-black/20 to-transparent rounded-xl p-4">
                                <p className="text-white text-2xl sm:text-3xl font-semibold leading-tight">
                                    {current.captionTop}
                                    <br />
                                    {current.captionBottom}
                                </p>
                            </div>
                        </div>

                        {/* Right stacked column */}
                        <div className="lg:flex-1 w-full flex flex-col gap-5 h-full">
                            <div
                                role="button"
                                onClick={() => setActiveIndex((i) => (i + 1) % data.length)}
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") setActiveIndex((i) => (i + 1) % data.length);
                                }}
                                className="rounded-2xl p-4 flex items-center justify-center min-h-[110px] lg:h-1/4 cursor-pointer select-none transition-all duration-300"
                                style={{ background: current.bg || "#E7FF7A" }}
                            >
                                <div className="text-slate-900 font-bold text-lg leading-tight whitespace-pre-line text-center">
                                    {current.pillText}
                                </div>
                            </div>

                            <div
                                onClick={() => setActiveIndex((i) => (i + 1) % data.length)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") setActiveIndex((i) => (i + 1) % data.length);
                                }}
                                className="relative rounded-2xl overflow-hidden bg-white shadow-md cursor-pointer transition-all duration-300 lg:h-3/4 min-h-[500px]"
                            >
                                <Image
                                    src={current.smallImage}
                                    alt="Supporting small image"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Invisible anchor used by default Get Started */}
                    <div id="hero-next" className="hidden" />
                </div>
            </div>
        </section>
    );
};

export default Idea;