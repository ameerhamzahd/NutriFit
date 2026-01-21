"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// Features data
const featuresData = [
  {
    id: "01",
    title: "AI-Powered Meals",
    description:
      "AI-generated meal plans tailored to your dietary preferences, goals, and nutritional needs.",
    image: "/images/Features/AI Powered Meals.jpg",
  },
  {
    id: "02",
    title: "Smart Workouts",
    description:
      "Personalized workout plans designed by AI based on your fitness level and available equipment.",
    image: "/images/Features/Smart Workouts.jpg",
  },
  {
    id: "03",
    title: "AI Coach Assistant",
    description:
      "A 24/7 AI health coach offering guidance, motivation, and personalized support anytime.",
    image: "/images/Features/AI Coach Assistant.jpg",
  },
  {
    id: "04",
    title: "Activity Tracking",
    description:
      "Track workouts, meals, hydration, and recovery to stay consistent and improve daily.",
    image: "/images/Features/Activity Tracking.jpg",
  },
  {
    id: "05",
    title: "Progress Analytics",
    description:
      "Clear performance insights and progress analytics based on your consistency and results.",
    image: "/images/Features/Progress Analytics.jpg",
  },
];


const Features = () => {
  return (
    <section id="features" className="pt-12 lg:px-0 px-6 md:w-11/12 mx-auto">
      <div className="mx-auto">
        {/* Top Badge */}
        <motion.div
          className="flex justify-center mb-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block bg-[#1A232D] text-xs md:text-sm text-[#EEEEEE] font-medium px-4 py-1.5 rounded-[8px] mb-4">
            Features
          </span>
        </motion.div>

        {/* Heading */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-semibold leading-tight mb-4">
            <div className="text-[#FF6600]">Smart Features</div>
            <div className="text-[#0A0A0A]">Smarter Results</div>
          </h2>
          <p className="text-[#707070] md:text-2xl mx-auto">
            NutriFit blends AI-planning, tracking, and analytics to help you{" "}
            <br className="hidden md:block" />
            stay consistent and progress faster.
          </p>
        </motion.div>

        {/* Feature Cards with Swiper */}
        <div className=" mt-8">
          <Swiper
            spaceBetween={24}
            breakpoints={{
              0: { slidesPerView: 1.30 }, // Mobile
              640: { slidesPerView: 2.1 }, // Small tablet
              1024: { slidesPerView: 3.35 }, // Laptop
            }}
          >
            {featuresData.map((feature, index) => (
              <SwiperSlide key={feature.id} className="h-full">
                <motion.div
                  className="relative h-80 md:h-96 rounded-[50px] overflow-hidden group cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 * index }}
                >
                  {/* Background Image */}
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/75 transition-colors duration-300"></div>

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-between p-8 text-white">
                    {/* Number */}
                    <div className="flex items-start justify-between">
                      <div className="text-[30px] md:text-[45px] font-bold text-white/90">
                        {feature.id}
                      </div>
                    </div>

                    {/* Bottom Content */}
                    <div>
                      <h3 className="font-semibold text-2xl md:text-[30px] mb-3">
                        {feature.title}
                      </h3>
                      <p className="md:text-lg text-sm leading-relaxed opacity-90">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Features;