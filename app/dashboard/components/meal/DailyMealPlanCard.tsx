//dashboard/components/meal/DailyMealPlanCard.tsx
"use client";

import { useEffect, useState } from "react";
import { XCircle } from "lucide-react"; // Import a simple icon for errors

// --- Data Types (Simplified based on final API structure) ---

// Your current API structure returns the full plan in the top level,
// so we'll slightly adjust the types to match the expected successful data structure.
type MealDetail = {
	name: string; // Breakfast, Lunch, Dinner, Snack
	calories: number; // Calories for that specific meal
};

type Macro = {
	protein_g: number;
	carbs_g: number;
	fat_g: number;
};

type MealPlanData = {
	calories: number; // Total daily calories
	macros: Macro; // Total daily macros
	meals: MealDetail[]; // Array of meal details
};

export default function DailyMealPlanCard({ userId }: { userId: string }) {
	// State to hold the entire meal plan object
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

	// --- Conditional Rendering for States ---

	if (loading) return <p className="text-gray-500">Loading meal plan...</p>;

	if (error)
		return (
			<div className="bg-red-100 p-4 rounded-xl flex items-center gap-2 text-red-700 shadow-md">
				<XCircle size={20} />
				<p className="font-medium">Error: {error}</p>
			</div>
		);

	// Ensure we have data before rendering
	if (!mealPlanData || !mealPlanData.meals.length)
		return (
			<p className="text-gray-500">
				No meal plan generated yet. Check your profile data.
			</p>
		);

	return (
		<div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
			<h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
				🍽️ Todays Nutrition Plan
			</h2>

			{/* Summary Card for Total Calories and Macros */}
			<div className="mb-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
				<h3 className="text-lg font-bold text-indigo-700 mb-2">
					Total Daily Goal: {Math.round(mealPlanData.calories)} kcal
				</h3>
				<div className="flex justify-between text-sm font-medium text-indigo-800">
					<span>Protein: {mealPlanData.macros.protein_g}g</span>
					<span>Carbs: {mealPlanData.macros.carbs_g}g</span>
					<span>Fat: {mealPlanData.macros.fat_g}g</span>
				</div>
			</div>

			{/* Meal Cards */}
			<div className="space-y-4">
				{mealPlanData.meals.map((meal, index) => (
					<div
						key={index}
						className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition duration-150"
					>
						<h4 className="text-lg font-semibold text-gray-700">{meal.name}</h4>
						<span className="text-xl font-bold text-green-600">
							{Math.round(meal.calories)} kcal
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
