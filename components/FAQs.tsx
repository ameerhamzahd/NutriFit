"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What is NutriFit?",
    answer:
      "NutriFit is a web-based platform that provides AI-powered personalized meal and workout plans, progress tracking, and an AI health coach. It helps users set fitness goals, track nutrition and workouts, and review weekly/monthly analytics to stay on track.",
  },
  {
    question: "How do I create an account and sign in?",
    answer:
      "Users can create an account using email/password or supported social sign-ins. Sessions are secured using JWT tokens and all sensitive data is encrypted in transit and at rest. Admins can manage user accounts from the Admin Dashboard.",
  },
  {
    question: "Can I customize meal and workout plans?",
    answer:
      "Yes — NutriFit's AI module generates meal and workout plans tailored to your fitness level, dietary preferences, allergies, and objectives. Plans can be adjusted manually or re-generated as your goals evolve.",
  },
  {
    question: "What tracking features are available?",
    answer:
      "You can log meals, workouts, and water intake. The tracking feeds into progress analytics to show trends over time (calories, macros, workouts completed). Future integrations with wearable devices are planned for automatic activity sync.",
  },
  {
    question: "How does the AI health coach work?",
    answer:
      "The AI health coach answers user questions, provides workout modifications, nutrition tips, and motivational guidance. It uses the user's profile and recent activity to provide contextual suggestions. Responses are surfaced in a chat interface with optional follow-up prompts.",
  },
  {
    question: "What reports and analytics are provided?",
    answer:
      "NutriFit provides weekly and monthly reports that visualize calorie trends, workout frequency, hydration, and goal progress. Premium users get more advanced analytics and downloadable reports.",
  },
];

export default function NutriFitFAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) =>
    setActiveIndex(activeIndex === index ? null : index);

  return (
    <section id="faqs" className="py-4 pt-10 sm:py-5 md:py-12 w-11/12 mx-auto">
      <div className="flex flex-col lg:flex-row w-full gap-8">
        {/* Left side (heading/text) */}
        <motion.div
          className="w-full lg:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="gap-6 md:mb-10">
            <motion.div
              className="flex mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block bg-[#1A232D] text-xs md:text-sm text-[#EEEEEE] font-medium px-4 py-1.5 rounded-[8px] mb-4">
                FAQs
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-[#FF6600]">Your Questions</span>
              <br />
              <span className="text-black">Answered</span>
            </motion.h2>

            {/* Paragraph */}
            <motion.p
              className="text-2xl text-gray-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Answers about features, security, roles, <br className="hidden md:block" /> and how the AI-driven plans work.
            </motion.p>
          </div>
        </motion.div>

        {/* Right side (FAQ list) */}
        <motion.div
          className="w-full lg:w-2/3"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.div className="space-y-4 w-full">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                className="box-border bg-white border-2 border-white rounded-2xl shadow-md transition-all w-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center px-4 sm:px-6 py-3 sm:py-4 text-left text-black font-semibold text-xl sm:text-base focus:outline-none"
                >
                  {activeIndex === i ? (
                    <X className="w-6 h-6 mr-3 shrink-0 text-orange-600 font-semibold" />
                  ) : (
                    <Plus className="w-6 h-6 mr-3 shrink-0 text-orange-600 font-semibold" />
                  )}
                  <span>{faq.question}</span>
                </button>

                <AnimatePresence initial={false}>
                  {activeIndex === i && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-6 pb-4 sm:pb-5 text-black text-lg leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}