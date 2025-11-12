"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { GoArrowDownRight } from "react-icons/go";

type FAQ = {
  id: number;
  question: string;
  short: string;
  answer: string;
  image?: string;
};

export default function FAQs() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      id: 1,
      question: "What is NutriFit?",
      short: "Overview of the Smart Fitness & Diet Planner.",
      answer:
        "NutriFit is a web-based platform that provides AI-powered personalized meal and workout plans, progress tracking, and an AI health coach. It helps users set fitness goals, track nutrition and workouts, and review weekly/monthly analytics to stay on track.",
    },
    {
      id: 2,
      question: "How do I create an account and sign in?",
      short: "Authentication and account creation details.",
      answer:
        "Users can create an account using email/password or supported social sign-ins. Sessions are secured using JWT tokens and all sensitive data is encrypted in transit and at rest. Admins can manage user accounts from the Admin Dashboard.",
    },
    {
      id: 3,
      question: "Can I customize meal and workout plans?",
      short: "Personalized plans powered by AI.",
      answer:
        "Yes — NutriFit's AI module generates meal and workout plans tailored to your fitness level, dietary preferences, allergies, and objectives. Plans can be adjusted manually or re-generated as your goals evolve.",
    },
    {
      id: 4,
      question: "What tracking features are available?",
      short: "Logging meals, workouts and water intake.",
      answer:
        "You can log meals, workouts, and water intake. The tracking feeds into progress analytics to show trends over time (calories, macros, workouts completed). Future integrations with wearable devices are planned for automatic activity sync.",
    },
    {
      id: 5,
      question: "How does the AI health coach work?",
      short: "Chatbot guidance and suggestions.",
      answer:
        "The AI health coach answers user questions, provides workout modifications, nutrition tips, and motivational guidance. It uses the user's profile and recent activity to provide contextual suggestions. Responses are surfaced in a chat interface with optional follow-up prompts.",
    },
    {
      id: 6,
      question: "What reports and analytics are provided?",
      short: "Weekly and monthly progress insights.",
      answer:
        "NutriFit provides weekly and monthly reports that visualize calorie trends, workout frequency, hydration, and goal progress. Premium users get more advanced analytics and downloadable reports.",
    },
  ];

  return (
    <section id="faq" className="max-w-[92%] mx-auto px-5 py-12 rounded-[20px] my-10">
      {/* Header */}
      <div className="flex lg:flex-row flex-col gap-6 mb-8">
        <div className="w-full flex flex-col items-center">
          <span className="inline-block bg-[#1A232D] text-xs md:text-sm text-[#EEEEEE] font-medium px-4 py-1.5 rounded-[8px] mb-4">
            FAQs
          </span>
          <h2 className="text-3xl md:text-6xl leading-[120%] font-semibold text-[#1A232D] text-center">
            Frequently Asked Questions — NutriFit
          </h2>
          <p className="mt-8 text-[#1A232D]/75 max-w-3xl text-center text-base lg:text-xl">
            Answers about features, security, roles, and how the AI-driven plans work.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto">

        {/* Right - FAQ List */}
        <div className="flex-1">
          <ul className="divide-y divide-[#1A232D]/25 border border-[#1A232D]/25 rounded-lg overflow-hidden">
            {faqs.map((faq, index) => (
              <li
                key={faq.id}
                className={`transition-all duration-300 ${index === selectedIndex && "bg-transparent"}`}
                onMouseEnter={() => setSelectedIndex(index)}
                onMouseLeave={() => setSelectedIndex(null)}
                onClick={() => setSelectedIndex(index === selectedIndex ? null : index)}
              >
                <div className="w-full flex items-center justify-between px-5 py-4 cursor-pointer">
                  <div className="flex-1 pr-4">
                    <p className="text-[#1A232D] text-lg lg:text-2xl font-medium leading-tight">{faq.question}</p>
                    <p className="text-sm lg:text-lg text-[#1A232D]/75 mt-1">{faq.short}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-md flex items-center justify-center border border-[#1A232D]/25 ${index === selectedIndex ? "border-[#FF6600]" : ""}`}>
                      <GoArrowDownRight
                        size={18}
                        className={`transition-transform duration-300 text-[#1A232D] ${index === selectedIndex ? "rotate-45 text-[#FF6600]" : ""}`}
                        aria-hidden
                      />
                    </div>
                  </div>
                </div>

                {/* Expanded Answer */}
                <AnimatePresence>
                  {index === selectedIndex && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.1 }}
                      className="px-5 pb-5 text-[#1A232D]"
                    >
                      <p className="text-sm lg:text-lg leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}