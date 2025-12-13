// app/api/meal-plan/route.ts
import { NextRequest, NextResponse } from "next/server";
import { calculateDailyCalories } from "@/lib/nutrition/calculateNutrition";
import { calculateMacros } from "@/lib/nutrition/calculateMacros";
import { supabaseAdmin } from "@/lib/supabaseAdminClient";

export async function POST(req: NextRequest) {
	try {
		const { userId } = await req.json();

		if (!userId) {
			return NextResponse.json({ error: "Missing userId" }, { status: 400 });
		}

		const { data: profile, error } = await supabaseAdmin
			.from("profiles")
			.select("*")
			.eq("id", userId)
			.single();

		if (error || !profile) {
			return NextResponse.json({ error: "Profile not found" }, { status: 404 });
		}

		const calories = calculateDailyCalories({
			weightKg: Number(profile.weight_kg),
			heightCm: Number(profile.height_cm),
			age: Number(profile.age),
			gender: profile.gender,
			activityLevel: profile.activity_level,
			fitnessGoal: profile.fitness_goal,
		});

		const macros = calculateMacros(
			Number(profile.weight_kg),
			calories,
			profile.fitness_goal
		);

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
		return NextResponse.json(
			{ error: e instanceof Error ? e.message : "Server Error" },
			{ status: 500 }
		);
	}
}
