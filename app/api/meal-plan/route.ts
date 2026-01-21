import { NextRequest, NextResponse } from "next/server";
import { calculateDailyCalories } from "@/lib/nutrition/calculateNutrition";
import { calculateMacros } from "@/lib/nutrition/calculateMacros";
import { supabaseAdmin } from "@/lib/supabaseAdminClient";
import { getBangladeshDate } from "@/lib/dateUtils";

export async function POST(req: NextRequest) {
	try {
		const { userId } = await req.json();

		// FOR TESTING: Set to true to see tomorrow's adjustment now
		// FOR PRODUCTION: Set to false for 12:00 AM logic
		const TEST_MODE = true;
		const dateToFetch = TEST_MODE ? getBangladeshDate(1) : getBangladeshDate(0);

		// 1. Check for Adjusted Plan in DB
		const { data: adjustedPlan } = await supabaseAdmin
			.from("daily_nutrition_logs")
			.select("*")
			.eq("user_id", userId)
			.eq("date", dateToFetch)
			.single();

		let calories: number;
		let macros: { protein_g: number; carbs_g: number; fat_g: number };

		if (adjustedPlan) {
			calories = adjustedPlan.calories_target;
			macros = {
				protein_g: adjustedPlan.protein_target,
				carbs_g: adjustedPlan.carbs_target,
				fat_g: adjustedPlan.fat_target,
			};
		} else {
			// FALLBACK: Standard Calculation
			const { data: profile } = await supabaseAdmin
				.from("profiles")
				.select("*")
				.eq("id", userId)
				.single();

			if (!profile)
				return NextResponse.json(
					{ error: "Profile not found" },
					{ status: 404 },
				);

			calories = calculateDailyCalories({
				weightKg: Number(profile.weight_kg),
				heightCm: Number(profile.height_cm),
				age: Number(profile.age),
				gender: profile.gender,
				activityLevel: profile.activity_level,
				fitnessGoal: profile.fitness_goal,
			});

			const calculatedMacros = calculateMacros(
				Number(profile.weight_kg),
				calories,
				profile.fitness_goal,
			);
			macros = {
				protein_g: calculatedMacros.protein_g,
				carbs_g: calculatedMacros.carbs_g,
				fat_g: calculatedMacros.fat_g,
			};
		}

		// 2. Always construct the mealPlan object with the 'meals' array
		const mealPlan = {
			calories,
			macros,
			meals: [
				{ name: "Breakfast", calories: Math.round(calories * 0.25) },
				{ name: "Lunch", calories: Math.round(calories * 0.35) },
				{ name: "Dinner", calories: Math.round(calories * 0.3) },
				{ name: "Snack", calories: Math.round(calories * 0.1) },
			],
		};

		return NextResponse.json({ mealPlan });
	} catch (e) {
		console.error("Meal Plan API Error:", e);
		return NextResponse.json({ error: "Server Error" }, { status: 500 });
	}
}
