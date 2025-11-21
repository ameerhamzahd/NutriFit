"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import GoogleIcon from "@/components/icons/GoogleIcon";
import { BiDumbbell } from "react-icons/bi";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabaseClient";

const data = [
  {
    id: 1,
    title: "AI-Powered Meal Plans",
    description:
      "Get personalized nutrition plans tailored to your fitness goals, dietary preferences, and lifestyle.",
    btnText: "Start Your Journey →",
    thumbnail: "/images/Auth/image-01.jpg",
  },
  {
    id: 2,
    title: "Track Your Progress",
    description:
      "Monitor workouts, water intake, and calories with real-time analytics and insights.",
    btnText: "See Your Stats →",
    thumbnail: "/images/Auth/image-02.jpg",
  },
  {
    id: 3,
    title: "24/7 AI Health Coach",
    description:
      "Get instant answers to nutrition questions, workout tips, and motivation whenever you need it.",
    btnText: "Chat Now →",
    thumbnail: "/images/Auth/image-03.jpg",
  },
];

export default function Page() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const { email, password } = formData;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
      return;
    }

    // redirect to dashboard
    window.location.href = "/dashboard";
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(""); // Clear error when user types
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 lg:px-8 bg-linear-to-br from-orange-50 via-white to-slate-50">
      <div className="w-full max-w-[1100px] grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        {/* LEFT: Swiper + Info */}
        <div className="hidden md:flex flex-col items-center md:items-start">
          {/* Swiper */}
          <Swiper
            modules={[Pagination, Autoplay]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet !bg-gray-400 !opacity-100 !w-2 !h-2",
              bulletActiveClass:
                "!bg-[#FF6600] !w-4 !h-2 !rounded-full transition-all duration-300",
            }}
            className="w-full max-w-md"
          >
            {data.map((item) => (
              <SwiperSlide key={item.id} className="pb-10">
                {/* Image Container */}
                <div className="w-full h-[300px] bg-linear-to-br from-[#FF6600]/20 to-[#FF6600]/10 rounded-[10px] flex items-center justify-center">
                  <div className="w-11/12 h-full overflow-hidden rounded-t-[10px] relative">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-cover shadow-lg mt-5 rounded-t-[10px]"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  </div>
                </div>

                {/* Text Card */}
                <div className="bg-white p-6 rounded-xl text-center border mt-6 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-lg text-slate-900">{item.title}</h3>
                  <p className="text-sm text-gray-600 my-2 max-w-xs mx-auto">
                    {item.description}
                  </p>
                  <button className="text-sm font-bold cursor-pointer hover:underline text-[#FF6600] transition-colors">
                    {item.btnText}
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex justify-center max-w-sm mx-auto">
            {/* Terms */}
            <p className="mt-4 text-xs text-center text-gray-600">
              By signing in, you agree to NutriFit{"'"}s{" "}
              <Link href="/terms-of-service" className="font-bold cursor-pointer hover:text-[#FF6600] transition-colors">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy-policy" className="font-bold cursor-pointer hover:text-[#FF6600] transition-colors">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>

        {/* RIGHT: Login Form */}
        <div className="p-6 bg-white rounded-2xl shadow-xl">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-center gap-3 mb-5 group">
            <h1 className={cn(
              "text-xl md:text-3xl font-mono-trust-display flex items-center justify-center bg-linear-to-r bg-clip-text text-transparent transition-all duration-300 from-[#1A232D] to-[#FF6600]"
            )}>
              Nutri
              <BiDumbbell className={cn(
                "transition-colors duration-300 text-[#1A232D]"
              )} />
              Fit
            </h1>
          </Link>

          {/* Back to Home Button */}
          <div className="flex justify-center mb-6">
            <Link href="/">
              <button className="px-5 py-2 rounded-full border border-gray-300 bg-white text-gray-700 font-medium hover:bg-[#FF6600] hover:text-white transition-all cursor-pointer">
                ← Back to Home
              </button>
            </Link>
          </div>

          <p className="text-sm text-gray-600 text-center mb-6">Continue your fitness journey</p>

          {/* Error Message */}
          {error && (
            <div className="max-w-sm mx-auto mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 text-center">{error}</p>
            </div>
          )}

          {/* Login Fields */}
          <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                disabled={isLoading}
                className="h-[55px] placeholder:text-gray-400 bg-white border-gray-300 focus:border-[#FF6600] focus:ring-[#FF6600]"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-sm font-medium text-slate-700">
                  Password
                </Label>
                <Link 
                  href="/forgot-password" 
                  className="text-xs text-[#FF6600] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                disabled={isLoading}
                className="h-[55px] placeholder:text-gray-400 bg-white border-gray-300 focus:border-[#FF6600] focus:ring-[#FF6600]"
                required
              />
            </div>

            <div className="flex justify-center pt-2">
              {/* Submit */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-[52px] bg-linear-to-r from-[#1A232D] to-[#FF6600] text-white font-medium cursor-pointer transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Continue"
                )}
              </Button>
            </div>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-2 my-6 max-w-xs mx-auto">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-sm text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Google Login */}
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              variant="outline"
              className="flex items-center justify-center gap-2 w-full max-w-sm cursor-pointer h-[55px] border-gray-300 hover:bg-gray-50 hover:border-[#FF6600] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <GoogleIcon className="w-5 h-5" />
              Continue with Google
            </Button>
          </div>

          {/* Register Link */}
          <p className="text-sm text-center mt-6 text-gray-600">
            New to NutriFit?{" "}
            <Link
              href="/auth/register"
              className="text-[#FF6600] font-bold hover:underline transition-colors"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
