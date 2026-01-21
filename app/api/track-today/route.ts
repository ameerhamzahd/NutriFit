// app/api/track-today/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdminClient";
import { calculateDailyCalories } from "@/lib/nutrition/calculateNutrition";
import { calculateMacros } from "@/lib/nutrition/calculateMacros";
import { getBangladeshDate } from "@/lib/dateUtils";
 
export async function POST(req: Request) {
	try {
		const body = await req.json();
 
		const {
			user_id,
			date = getBangladeshDate(),
			calories_consumed,
			protein_consumed,
			carbs_consumed,
			fat_consumed,
			workout_completed,
			intensity,
			duration_minutes,
		} = body;
 
		// 1. Fetch Profile to get weight, height, goal, etc.
		const { data: profile } = await supabaseAdmin
			.from("profiles")
			.select("*")
			.eq("id", user_id)
			.single();
 
		if (!profile)
			return NextResponse.json({ error: "Profile not found" }, { status: 404 });
 
		// 2. Calculate the "Ideal" Target for Today using your lib
		const todayTargetCalories = calculateDailyCalories({
			weightKg: Number(profile.weight_kg),
			heightCm: Number(profile.height_cm),
			age: Number(profile.age),
			gender: profile.gender,
			activityLevel: profile.activity_level,
			fitnessGoal: profile.fitness_goal,
		});
 
		const todayTargetMacros = calculateMacros(
			Number(profile.weight_kg),
			todayTargetCalories,
			profile.fitness_goal,
		);
 
		// 3. Save everything: What they should have eaten VS What they did eat
		await supabaseAdmin.from("daily_nutrition_logs").upsert({
			user_id,
			date,
			calories_target: todayTargetCalories,
			protein_target: todayTargetMacros.protein_g,
			carbs_target: todayTargetMacros.carbs_g,
			fat_target: todayTargetMacros.fat_g,
			calories_consumed, // from user input
			protein_consumed, // from user input
			carbs_consumed, // from user input
			fat_consumed, // from user input
		});
 
		// 4. Save Workout logs
		await supabaseAdmin.from("daily_workout_logs").upsert({
			user_id,
			date,
			workout_completed,
			intensity,
			duration_minutes,
		});
 
		return NextResponse.json({ success: true });
	} catch (err) {
		console.error(err);
		return NextResponse.json({ error: "Server error" }, { status: 500 });
	}
}