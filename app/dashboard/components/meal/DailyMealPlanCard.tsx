"use client";
import { useEffect, useState } from "react";
import { FaTimesCircle, FaFireAlt, FaUtensils, FaTimes } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { getBangladeshDate } from "@/lib/dateUtils"; // 🛑 Ensure this import exists

type MealDetail = { name: string; calories: number };
type Macro = { protein_g: number; carbs_g: number; fat_g: number };
type MealPlanData = { calories: number; macros: Macro; meals: MealDetail[] };

function getMealImage(name: string): string {
	const nameLower = name.toLowerCase();
	if (nameLower.includes("breakfast"))
		return "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&h=300&fit=crop";
	if (nameLower.includes("lunch"))
		return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop";
	if (nameLower.includes("dinner"))
		return "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop";
	return "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&h=300&fit=crop";
}

export default function DailyMealPlanCard({ userId }: { userId: string }) {
	const [mealPlanData, setMealPlanData] = useState<MealPlanData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedMeal, setSelectedMeal] = useState<MealDetail | null>(null);

	useEffect(() => {
		async function fetchMealPlan() {
			try {
				const todayStr = getBangladeshDate(0); // 🛑 Fix: Get current date string

				const res = await fetch("/api/meal-plan", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						userId,
						date: todayStr, // 🛑 Fix: Pass date to API
					}),
				});

				const data = await res.json();
				if (!res.ok)
					throw new Error(data.error || "Failed to fetch meal plan.");

				setMealPlanData(data.mealPlan);
			} catch (err: any) {
				console.error("Fetch Error:", err);
				setError(err.message || "An unknown error occurred.");
			} finally {
				setLoading(false);
			}
		}
		if (userId) fetchMealPlan();
	}, [userId]);

	// ... (Keep your existing loading and error UI blocks)

	if (loading)
		return (
			<div className="p-8 text-center animate-pulse">Loading Nutrition...</div>
		);
	if (error)
		return (
			<div className="p-6 text-red-600 border border-red-200 rounded-xl">
				{error}
			</div>
		);
	if (!mealPlanData) return null;

	const protein = mealPlanData.macros?.protein_g || 0;
	const carbs = mealPlanData.macros?.carbs_g || 0;
	const fat = mealPlanData.macros?.fat_g || 0;
	const totalCalories = Math.round(mealPlanData.calories);

	return (
		<section className="pt-12 lg:px-0 px-6 md:w-11/12 mx-auto">
			{/* ... (Your existing JSX for Heading and Swiper) */}
			<div className="text-center mb-6">
				<h2 className="text-4xl font-black text-[#FF6600]">
					Today's Nutrition
				</h2>
				<p className="text-gray-500">Target: {totalCalories} kcal</p>
			</div>

			<Swiper
				spaceBetween={24}
				breakpoints={{
					0: { slidesPerView: 1.2 },
					1024: { slidesPerView: 3.35 },
				}}
			>
				{mealPlanData.meals.map((meal, index) => (
					<SwiperSlide key={index}>
						<div
							className="relative h-80 rounded-[25px] overflow-hidden group cursor-pointer"
							onClick={() => setSelectedMeal(meal)}
						>
							<img
								src={getMealImage(meal.name)}
								className="absolute inset-0 w-full h-full object-cover"
							/>
							<div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all" />
							<div className="relative p-6 text-white">
								<h3 className="text-2xl font-bold">{meal.name}</h3>
								<p>{meal.calories} kcal</p>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>

			{/* Modal Logic Remains the Same */}
		</section>
	);
}
