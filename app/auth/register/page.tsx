"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import GoogleIcon from "@/components/icons/GoogleIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import EyeOffIcon from "@/components/icons/EyeOffIcon";
import EyeIcon from "@/components/icons/EyeIcon";
import { BiDumbbell } from "react-icons/bi";
import { cn } from "@/lib/utils";

const data = [
  {
    id: 1,
    title: "AI-Powered Meal Plans",
    description:
      "Get personalized nutrition plans tailored to your fitness goals, dietary preferences, and lifestyle.",
    btnText: "Start Your Journey →",
    thumbnail: "/images/Auth/image-05.jpg",
  },
  {
    id: 2,
    title: "Track Your Progress",
    description:
      "Monitor workouts, water intake, and calories with real-time analytics and insights.",
    btnText: "See Your Stats →",
    thumbnail: "/images/Auth/image-04.jpg",
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


import { supabase } from "@/lib/supabaseClient";

export async function signUpUser(formData:any) {
	const {
		full_name,
		email,
		phone,
		password,
		gender,
		age,
		height_cm,
		weight_kg,
		fitness_goal,
		activity_level,
	} = formData;

	// 1️⃣ Create user with REAL email
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
	});

	if (error) return { error };

	const user = data.user;

	// 2️⃣ Insert profile row
	const { error: profileError } = await supabase.from("profiles").insert({
		id: user?.id,
		full_name,
		email,
		phone,
		gender,
		age,
		height_cm: parseFloat(height_cm) || null,
		weight_kg: parseFloat(weight_kg) || null,
		fitness_goal: fitness_goal,
		activity_level: activity_level,
	});

	if (profileError) return { error: profileError };

	return { user };
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    gender: "",
    age: "",
    height_cm: "",
    weight_kg: "",
    fitness_goal: "",
    activity_level: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const validateStep1 = () => {
    if (!formData.full_name || !formData.email || !formData.phone) {
      setError("Please fill in all required fields");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      setError("Please enter a valid phone number");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.password || !formData.confirmPassword) {
      setError("Please fill in all password fields");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (!formData.gender || !formData.age || !formData.height_cm || !formData.weight_kg || !formData.fitness_goal || !formData.activity_level) {
      setError("Please fill in all fitness profile fields");
      return false;
    }
    if (parseInt(formData.age) < 13 || parseInt(formData.age) > 120) {
      setError("Please enter a valid age");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    setError("");
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setError("");
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!validateStep3()) return;
    
    setIsLoading(true);
    
    try {
      const response = await signUpUser(formData);

			if (response.error) {
				setError(response.error.message || "Registration failed");
				return;
			}

			alert("Account created successfully!");
			window.location.href = "/auth/login";

      
      // Redirect to login or dashboard
      // window.location.href = '/login';
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error("Registration error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Google signup initiated");
      alert("Google signup would start here (This is a demo)");
    } catch (err) {
      setError("Google signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
							bulletClass:
								"swiper-pagination-bullet !bg-gray-400 !opacity-100 !w-2 !h-2",
							bulletActiveClass:
								"!bg-[#FF6600] !w-4 !h-2 !rounded-full transition-all duration-300",
						}}
						className="w-full max-w-md"
					>
						{data.map((item) => (
							<SwiperSlide key={item.id} className="pb-10">
								{/* Image Container */}
								<div className="w-full h-[300px] bg-linear-to-br from-[#FF6600]/20 to-[#FF6600]/10 rounded-[10px] flex items-center justify-center">
									<div className="w-11/12 h-full overflow-hidden mt-8 relative">
										<Image
											src={item.thumbnail}
											alt={item.title}
											fill
											className="object-cover rounded-t-[10px] shadow-lg"
											sizes="(max-width: 768px) 100vw, 400px"
										/>
									</div>
								</div>

								{/* Text Card */}
								<div className="bg-white p-6 rounded-xl text-center border mt-6 shadow-sm hover:shadow-md transition-shadow">
									<h3 className="font-bold text-lg text-slate-900">
										{item.title}
									</h3>
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

					{/* Terms */}
					<div className="flex justify-center max-w-sm mx-auto">
						<p className="mt-4 text-xs text-center text-gray-600">
							By signing up, you agree to NutriFit{"'"}s{" "}
							<Link
								href="/terms-of-service"
								className="font-bold cursor-pointer hover:text-[#FF6600] transition-colors"
							>
								Terms of Service
							</Link>{" "}
							and{" "}
							<Link
								href="/privacy-policy"
								className="font-bold cursor-pointer hover:text-[#FF6600] transition-colors"
							>
								Privacy Policy
							</Link>
							.
						</p>
					</div>
				</div>

				{/* RIGHT: Register Multi-step Form */}
				<div className="bg-white p-6 rounded-2xl shadow-xl">
					{/* Logo for mobile */}
					<Link
						href="/"
						className="flex items-center justify-center gap-3 mb-5 group"
					>
						<h1
							className={cn(
								"text-xl md:text-3xl font-mono-trust-display flex items-center justify-center bg-linear-to-r bg-clip-text text-transparent transition-all duration-300 from-[#1A232D] to-[#FF6600]"
							)}
						>
							Nutri
							<BiDumbbell
								className={cn("transition-colors duration-300 text-[#1A232D]")}
							/>
							Fit
						</h1>
					</Link>

					{/* Progress Indicator */}
					<div className="flex items-center justify-center gap-2 mb-6">
						{[1, 2, 3].map((num) => (
							<div
								key={num}
								className={`h-2 rounded-full transition-all ${
									num === step ? "w-8 bg-[#FF6600]" : "w-2 bg-gray-300"
								}`}
							/>
						))}
					</div>

					{/* Error Message */}
					{error && (
						<div className="max-w-sm mx-auto mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
							<p className="text-sm text-red-600 text-center">{error}</p>
						</div>
					)}

					<form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
						{/* Step 1: Basic Info */}
						{step === 1 && (
							<>
								<div className="text-center mb-6">
									<h3 className="text-xl font-semibold text-slate-900">
										Create your account
									</h3>
									<p className="text-sm text-gray-600">
										Start your fitness journey today!
									</p>
								</div>
								<div className="space-y-2">
									<Label
										htmlFor="name"
										className="text-sm font-medium text-slate-700"
									>
										Full Name *
									</Label>
									<Input
										id="name"
										type="text"
										placeholder="Enter your name"
										value={formData.full_name}
										onChange={(e) =>
											handleInputChange("full_name", e.target.value)
										}
										disabled={isLoading}
										className="h-[55px] placeholder:text-gray-400 bg-white border-gray-300 focus:border-[#FF6600] focus:ring-[#FF6600]"
									/>
								</div>
								<div className="space-y-2">
									<Label
										htmlFor="email"
										className="text-sm font-medium text-slate-700"
									>
										Email *
									</Label>
									<Input
										id="email"
										type="email"
										placeholder="Enter your email"
										value={formData.email}
										onChange={(e) => handleInputChange("email", e.target.value)}
										disabled={isLoading}
										className="h-[55px] placeholder:text-gray-400 bg-white border-gray-300 focus:border-[#FF6600] focus:ring-[#FF6600]"
									/>
								</div>
								<div className="space-y-2">
									<Label
										htmlFor="phone"
										className="text-sm font-medium text-slate-700"
									>
										Phone Number *
									</Label>
									<Input
										id="phone"
										type="tel"
										placeholder="+880 123 456 7890"
										value={formData.phone}
										onChange={(e) => handleInputChange("phone", e.target.value)}
										disabled={isLoading}
										className="h-[55px] placeholder:text-gray-400 bg-white border-gray-300 focus:border-[#FF6600] focus:ring-[#FF6600]"
									/>
								</div>

								{/* Divider */}
								<div className="flex items-center gap-2 my-6">
									<div className="flex-1 h-px bg-gray-300"></div>
									<span className="text-sm text-gray-500">OR</span>
									<div className="flex-1 h-px bg-gray-300"></div>
								</div>

								{/* Google Signup */}
								<Button
									type="button"
									onClick={handleGoogleSignup}
									disabled={isLoading}
									variant="outline"
									className="flex items-center justify-center gap-2 w-full h-[55px] border-gray-300 hover:bg-gray-50 hover:border-[#FF6600] transition-all"
								>
									<GoogleIcon className="w-5 h-5" />
									Continue with Google
								</Button>
							</>
						)}

						{/* Step 2: Password */}
						{step === 2 && (
							<>
								<div className="text-center mb-6">
									<h3 className="text-xl font-semibold text-slate-900">
										Create Password
									</h3>
									<p className="text-sm text-gray-600">
										Set a strong password to secure your account
									</p>
								</div>
								<div className="space-y-2">
									<Label
										htmlFor="password"
										className="text-sm font-medium text-slate-700"
									>
										Password *
									</Label>
									<div className="relative">
										<Input
											id="password"
											type={showPassword ? "text" : "password"}
											placeholder="Enter password (min. 6 characters)"
											value={formData.password}
											onChange={(e) =>
												handleInputChange("password", e.target.value)
											}
											disabled={isLoading}
											className="h-[55px] placeholder:text-gray-400 bg-white border-gray-300 focus:border-[#FF6600] focus:ring-[#FF6600] pr-12"
										/>
										<button
											type="button"
											onClick={() => setShowPassword(!showPassword)}
											className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
										>
											{showPassword ? <EyeIcon /> : <EyeOffIcon />}
										</button>
									</div>
								</div>
								<div className="space-y-2">
									<Label
										htmlFor="confirmPassword"
										className="text-sm font-medium text-slate-700"
									>
										Confirm Password *
									</Label>
									<div className="relative">
										<Input
											id="confirmPassword"
											type={showConfirmPassword ? "text" : "password"}
											placeholder="Confirm your password"
											value={formData.confirmPassword}
											onChange={(e) =>
												handleInputChange("confirmPassword", e.target.value)
											}
											disabled={isLoading}
											className="h-[55px] placeholder:text-gray-400 bg-white border-gray-300 focus:border-[#FF6600] focus:ring-[#FF6600] pr-12"
										/>
										<button
											type="button"
											onClick={() =>
												setShowConfirmPassword(!showConfirmPassword)
											}
											className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
										>
											{showConfirmPassword ? <EyeIcon /> : <EyeOffIcon />}
										</button>
									</div>
								</div>
							</>
						)}

						{/* Step 3: Fitness Profile */}
						{step === 3 && (
							<>
								<div className="text-center mb-6">
									<h3 className="text-xl font-semibold text-slate-900">
										Complete Your Profile
									</h3>
									<p className="text-sm text-gray-600">
										Help us personalize your fitness journey
									</p>
								</div>

								<div className="space-y-2">
									<Label
										htmlFor="gender"
										className="text-sm font-medium text-slate-700"
									>
										Gender *
									</Label>
									<Select
										value={formData.gender}
										onValueChange={(value) =>
											handleInputChange("gender", value)
										}
										disabled={isLoading}
									>
										<SelectTrigger className="h-[55px] bg-white border-gray-300 focus:border-[#FF6600] focus:ring-[#FF6600]">
											<SelectValue placeholder="Select your gender" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="Male">Male</SelectItem>
											<SelectItem value="Female">Female</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<Label
										htmlFor="age"
										className="text-sm font-medium text-slate-700"
									>
										Age *
									</Label>
									<Input
										id="age"
										type="text"
										placeholder="Enter your age"
										value={formData.age}
										onChange={(e) => handleInputChange("age", e.target.value)}
										disabled={isLoading}
										min="13"
										max="120"
										className="h-[55px] placeholder:text-gray-400 bg-white border-gray-300 focus:border-[#FF6600] focus:ring-[#FF6600]"
									/>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label
											htmlFor="height"
											className="text-sm font-medium text-slate-700"
										>
											Height (cm) *
										</Label>
										<Input
											id="height"
											type="text"
											placeholder="e.g., 170"
											value={formData.height_cm}
											onChange={(e) =>
												handleInputChange("height_cm", e.target.value)
											}
											disabled={isLoading}
											className="h-[55px] placeholder:text-gray-400 bg-white border-gray-300 focus:border-[#FF6600] focus:ring-[#FF6600]"
										/>
									</div>
									<div className="space-y-2">
										<Label
											htmlFor="weight"
											className="text-sm font-medium text-slate-700"
										>
											Weight (kg) *
										</Label>
										<Input
											id="weight"
											type="text"
											placeholder="e.g., 70"
											value={formData.weight_kg}
											onChange={(e) =>
												handleInputChange("weight_kg", e.target.value)
											}
											disabled={isLoading}
											className="h-[55px] placeholder:text-gray-400 bg-white border-gray-300 focus:border-[#FF6600] focus:ring-[#FF6600]"
										/>
									</div>
								</div>

								<div className="space-y-2">
									<Label
										htmlFor="fitnessGoal"
										className="text-sm font-medium text-slate-700"
									>
										Fitness Goal *
									</Label>
									<Select
										value={formData.fitness_goal}
										onValueChange={(value) =>
											handleInputChange("fitness_goal", value)
										}
										disabled={isLoading}
									>
										<SelectTrigger className="h-[55px] bg-white border-gray-300 focus:border-[#FF6600] focus:ring-[#FF6600]">
											<SelectValue placeholder="Select your fitness goal" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="Lose Weight">Lose Weight</SelectItem>
											<SelectItem value="Gain Muscle">Gain Muscle</SelectItem>
											<SelectItem value="Maintain Weight">
												Maintain Weight
											</SelectItem>
											<SelectItem value="Improve Endurance">
												Improve Endurance
											</SelectItem>
											<SelectItem value="General Fitness">
												General Fitness
											</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<Label
										htmlFor="activityLevel"
										className="text-sm font-medium text-slate-700"
									>
										Activity Level *
									</Label>
									<Select
										value={formData.activity_level}
										onValueChange={(value) =>
											handleInputChange("activity_level", value)
										}
										disabled={isLoading}
									>
										<SelectTrigger className="h-[55px] bg-white border-gray-300 focus:border-[#FF6600] focus:ring-[#FF6600]">
											<SelectValue placeholder="Select your activity level" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="Sedentary">Sedentary </SelectItem>
											<SelectItem value="Lightly Active">
												Lightly Active{" "}
											</SelectItem>
											<SelectItem value="Moderately Active">
												Moderately Active{" "}
											</SelectItem>
											<SelectItem value="Very Active">Very Active</SelectItem>
											<SelectItem value="Extremely Active">
												Extremely Active{" "}
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</>
						)}

						{/* Navigation */}
						<div className="flex justify-center gap-3 mt-6 pt-4">
							{step > 1 && (
								<Button
									type="button"
									variant="outline"
									onClick={handleBack}
									disabled={isLoading}
									className="px-8 cursor-pointer border-gray-300 hover:bg-gray-50"
								>
									Back
								</Button>
							)}

							{step < 3 ? (
								<Button
									type="button"
									onClick={handleNext}
									disabled={isLoading}
									className="px-8 bg-linear-to-r from-[#1A232D] to-[#FF6600] text-white cursor-pointer transition-all shadow-md hover:shadow-lg"
								>
									Next
								</Button>
							) : (
								<Button
									type="submit"
									disabled={isLoading}
									className="px-8 bg-linear-to-r from-[#1A232D] to-[#FF6600] text-white cursor-pointer transition-all shadow-md hover:shadow-lg disabled:opacity-50"
								>
									{isLoading ? (
										<span className="flex items-center gap-2">
											<svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
												<circle
													className="opacity-25"
													cx="12"
													cy="12"
													r="10"
													stroke="currentColor"
													strokeWidth="4"
													fill="none"
												/>
												<path
													className="opacity-75"
													fill="currentColor"
													d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
												/>
											</svg>
											Creating...
										</span>
									) : (
										"Create Account"
									)}
								</Button>
							)}
						</div>
					</form>

					{/* Login Link */}
					<p className="text-sm text-center mt-6 text-gray-600">
						Already have an account?{" "}
						<Link
							href="/auth/login"
							className="text-[#FF6600] font-bold hover:underline transition-colors"
						>
							Login
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}