"use client";
import { useEffect, useState } from "react";
import { FaTimesCircle, FaFireAlt, FaUtensils } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";

// --- Data Types ---
type MealDetail = {
	name: string;
	calories: number;
};

type Macro = {
	protein_g: number;
	carbs_g: number;
	fat_g: number;
};

type MealPlanData = {
	calories: number;
	macros: Macro;
	meals: MealDetail[];
};

export default function DailyMealPlanCard({ userId }: { userId: string }) {
	const [mealPlanData, setMealPlanData] = useState<MealPlanData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchMealPlan() {
			try {
				const res = await fetch("/api/meal-plan", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ userId }),
				});

				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.error || "Failed to fetch meal plan.");
				}

				setMealPlanData(data.mealPlan);
			} catch (err: any) {
				setError(err.message || "An unknown error occurred.");
			} finally {
				setLoading(false);
			}
		}

		fetchMealPlan();
	}, [userId]);
	if (loading)
		return (
			<div className="bg-white p-8 rounded-3xl shadow-2xl border-2 border-gray-200">
				<div className="flex items-center justify-center space-x-3">
					<div className="w-3 h-3 rounded-full animate-bounce bg-[#BFFF00]" />
					<div className="w-3 h-3 rounded-full animate-bounce bg-[#BFFF00]" style={{ animationDelay: "0.1s" }} />
					<div className="w-3 h-3 rounded-full animate-bounce bg-[#BFFF00]" style={{ animationDelay: "0.2s" }} />
				</div>
				<p className="text-gray-600 text-center mt-4 font-medium">
					Loading your meal plan...
				</p>
			</div>
		);

	if (error)
		return (
			<div className="bg-red-50 p-6 rounded-3xl shadow-xl border-2 border-red-300">
				<div className="flex items-center gap-3 text-red-700">
					<FaTimesCircle size={24} />
					<div>
						<p className="font-bold text-lg">Error Loading Plan</p>
						<p className="text-sm text-red-600 mt-1">{error}</p>
					</div>
				</div>
			</div>
		);

	if (!mealPlanData || !mealPlanData.meals.length)
		return (
			<div className="bg-white p-8 rounded-3xl shadow-xl border-2 border-gray-200 text-center">
				<FaUtensils size={48} className="mx-auto mb-4 text-gray-400" />
				<p className="text-gray-600 font-medium">
					No meal plan generated yet. Check your profile data.
				</p>
			</div>
		);

	const totalMacros =
		mealPlanData.macros.protein_g +
		mealPlanData.macros.carbs_g +
		mealPlanData.macros.fat_g;

	let goalMessage = "";

	if (mealPlanData.calories <= 1800) {
		goalMessage = "Optimized for fat loss";
	} else if (mealPlanData.calories >= 2500) {
		goalMessage = "Fueling muscle gain";
	} else {
		goalMessage = "Balanced for maintenance";
	}

	return (
		<div className="bg-white p-8 shadow-2xl border-2 border-gray-100 relative overflow-hidden">
			{/* Glow */}
			<div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 bg-[#BFFF00]" />
			<div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-10 bg-[#FF6600]" />

			{/* Header */}
			<div className="relative z-10 mb-6">
				<div className="flex items-center gap-3">
					<div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br from-[#BFFF00] to-[#9FDF00]">
						<FaUtensils size={26} color="#1A232D" />
					</div>
					<div>
						<h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#1A232D]">
							Today's Nutrition
						</h2>
						<p className="text-gray-600 text-sm font-medium">Fuel your goals</p>
					</div>
				</div>
			</div>

			{/* Goal Badge */}
			<div className="mb-6 flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full bg-[#1A232D]/90 text-white w-fit">
				<FaArrowTrendUp size={14} />
				<span>{goalMessage}</span>
			</div>

			{/* Daily Goals */}
			<div className="relative z-10 mb-8 bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border-2 border-gray-200 shadow-xl">
				<div className="flex items-center justify-between mb-6">
					<div className="flex items-center gap-4">
						<div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md bg-gradient-to-br from-[#FF6600] to-[#FF8833]">
							<FaFireAlt size={22} className="text-white" />
						</div>
						<div>
							<p className="text-gray-500 text-xs font-bold uppercase">
								Daily Target
							</p>
							<p className="text-4xl md:text-5xl font-black text-[#1A232D]">
								{Math.round(mealPlanData.calories)}
							</p>
						</div>
					</div>
					<span className="text-gray-500 text-xl font-bold">kcal</span>
				</div>

				{/* Macros */}
				<div className="space-y-4">
					{[
						{ label: "Protein", value: mealPlanData.macros.protein_g, color: "#BFFF00" },
						{ label: "Carbs", value: mealPlanData.macros.carbs_g, color: "#FF6600" },
						{ label: "Healthy Fats", value: mealPlanData.macros.fat_g, color: "#8B8B9A" },
					].map((m) => (
						<div key={m.label} className="flex items-center justify-between">
							<span className="font-bold flex items-center gap-2 text-[#1A232D]">
								<span className="w-3 h-3 rounded-full" style={{ backgroundColor: m.color }} />
								{m.label}
							</span>
							<span className="font-black text-lg text-[#1A232D]">
								{m.value}g
							</span>
						</div>
					))}
				</div>

				{/* Progress */}
				<div className="mt-5 h-4 bg-gray-200 rounded-full overflow-hidden flex shadow-inner">
					<div className="h-full bg-[#BFFF00]" style={{ width: `${(mealPlanData.macros.protein_g / totalMacros) * 100}%` }} />
					<div className="h-full bg-[#FF6600]" style={{ width: `${(mealPlanData.macros.carbs_g / totalMacros) * 100}%` }} />
					<div className="h-full bg-[#8B8B9A]" style={{ width: `${(mealPlanData.macros.fat_g / totalMacros) * 100}%` }} />
				</div>
			</div>

			{/* Meals */}
			<div className="relative z-10 space-y-4">
				{mealPlanData.meals.map((meal, index) => {
					const emoji = ["🌅", "☀️", "🌙", "🍎"][index] || "🍽️";
					const label = ["Breakfast", "Lunch", "Dinner", "Snack"][index] || "Meal";

					return (
						<div
							key={index}
							className="bg-gradient-to-r from-white to-gray-50 p-5 rounded-2xl border-2 border-gray-200 hover:border-[#BFFF00] hover:shadow-xl transition-all duration-300"
						>
							<div className="flex justify-between items-center">
								<div className="flex items-center gap-4">
									<div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center shadow-md text-3xl">
										{emoji}
									</div>
									<div>
										<h4 className="text-xl font-black text-[#1A232D]">{meal.name}</h4>
										<p className="text-gray-500 text-sm font-semibold">{label}</p>
									</div>
								</div>
								<div className="text-right">
									<span className="text-3xl font-black text-[#FF6600]">
										{Math.round(meal.calories)}
									</span>
									<span className="text-gray-500 text-sm font-bold ml-1">kcal</span>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
