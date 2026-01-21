"use client";
import { useEffect, useState } from "react";
import { FaTimesCircle, FaFireAlt, FaUtensils } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";

type MealDetail = { name: string; calories: number };
type Macro = { protein_g: number; carbs_g: number; fat_g: number };
type MealPlanData = { calories: number; macros: Macro; meals: MealDetail[] };

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
				if (!res.ok)
					throw new Error(data.error || "Failed to fetch meal plan.");
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
			<div className="bg-white p-8 rounded-3xl shadow-2xl border-2 border-gray-200 flex flex-col items-center">
				<div className="flex space-x-2">
					<div className="w-3 h-3 rounded-full animate-bounce bg-[#BFFF00]" />
					<div className="w-3 h-3 rounded-full animate-bounce bg-[#BFFF00] [animation-delay:0.1s]" />
					<div className="w-3 h-3 rounded-full animate-bounce bg-[#BFFF00] [animation-delay:0.2s]" />
				</div>
				<p className="text-gray-600 mt-4 font-medium">Loading plan...</p>
			</div>
		);

	if (error)
		return (
			<div className="bg-red-50 p-6 rounded-3xl border-2 border-red-300 flex items-center gap-3 text-red-700">
				<FaTimesCircle size={24} />
				<p className="font-bold">{error}</p>
			</div>
		);

	// 🟢 UPDATED SAFETY CHECK (Line 81 Fix)
	if (!mealPlanData || !mealPlanData.meals || mealPlanData.meals.length === 0) {
		return (
			<div className="bg-white p-8 rounded-3xl shadow-xl border-2 border-gray-200 text-center">
				<FaUtensils size={48} className="mx-auto mb-4 text-gray-400" />
				<p className="text-gray-600 font-medium">
					No meal plan found. Try tracking your data first.
				</p>
			</div>
		);
	}

	// 🟢 SAFE MACRO CALCULATION
	const protein = mealPlanData.macros?.protein_g || 0;
	const carbs = mealPlanData.macros?.carbs_g || 0;
	const fat = mealPlanData.macros?.fat_g || 0;
	const totalMacros = protein + carbs + fat || 1;

	return (
		<div className="bg-white p-8 shadow-2xl border-2 border-gray-100 relative overflow-hidden">
			{/* Glow */}
			<div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 bg-[#BFFF00]" />
			<div className="relative z-10 mb-6 flex items-center gap-3">
				<div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br from-[#BFFF00] to-[#9FDF00]">
					<FaUtensils size={26} color="#1A232D" />
				</div>
				<h2 className="text-3xl font-black text-[#1A232D]">
					Today's Nutrition
				</h2>
			</div>

			<div className="relative z-10 mb-8 bg-gray-50 p-6 rounded-2xl border-2 border-gray-200 shadow-xl">
				<div className="flex items-center justify-between mb-6">
					<div className="flex items-center gap-4">
						<FaFireAlt size={32} className="text-[#FF6600]" />
						<div>
							<p className="text-gray-500 text-xs font-bold uppercase">
								Daily Target
							</p>
							<p className="text-4xl font-black text-[#1A232D]">
								{Math.round(mealPlanData.calories)}
							</p>
						</div>
					</div>
					<span className="text-gray-500 font-bold">kcal</span>
				</div>

				<div className="space-y-4">
					{[
						{ label: "Protein", value: protein, color: "#BFFF00" },
						{ label: "Carbs", value: carbs, color: "#FF6600" },
						{ label: "Healthy Fats", value: fat, color: "#8B8B9A" },
					].map((m) => (
						<div key={m.label} className="flex justify-between font-bold">
							<span className="flex items-center gap-2">
								<span
									className="w-3 h-3 rounded-full"
									style={{ backgroundColor: m.color }}
								/>
								{m.label}
							</span>
							<span>{m.value}g</span>
						</div>
					))}
				</div>
			</div>

			<div className="space-y-4">
				{mealPlanData.meals.map((meal, index) => (
					<div
						key={index}
						className="flex justify-between items-center p-5 bg-gray-50 rounded-2xl border-2 border-gray-200"
					>
						<h4 className="font-black text-[#1A232D]">{meal.name}</h4>
						<span className="text-2xl font-black text-[#FF6600]">
							{Math.round(meal.calories)}{" "}
							<span className="text-xs text-gray-400">kcal</span>
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
