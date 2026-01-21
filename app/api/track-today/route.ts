import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdminClient";
import { calculateDailyCalories } from "@/lib/nutrition/calculateNutrition";
import { calculateMacros } from "@/lib/nutrition/calculateMacros";
import { getBangladeshDate } from "@/lib/dateUtils";
import { adjustPlan } from "@/lib/rules/adjustPlan";

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const {
			user_id,
			calories_consumed,
			protein_consumed,
			carbs_consumed,
			fat_consumed,
			workout_completed,
			intensity,
			duration_minutes,
		} = body;

		const today = getBangladeshDate(0);
		const tomorrow = getBangladeshDate(1);

		// 1. Fetch Profile for baseline calculation
		const { data: profile } = await supabaseAdmin
			.from("profiles")
			.select("*")
			.eq("id", user_id)
			.single();
		if (!profile)
			return NextResponse.json({ error: "Profile not found" }, { status: 404 });

		// 2. Calculate "Ideal" Baseline for Today
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

		// 3. Save Today's Actual Progress
		await supabaseAdmin.from("daily_nutrition_logs").upsert(
			{
				user_id,
				date: today,
				calories_target: todayTargetCalories,
				protein_target: todayTargetMacros.protein_g,
				carbs_target: todayTargetMacros.carbs_g,
				fat_target: todayTargetMacros.fat_g,
				calories_consumed: calories_consumed || 0,
				protein_consumed: protein_consumed || 0,
				carbs_consumed: carbs_consumed || 0,
				fat_consumed: fat_consumed || 0,
			},
			{ onConflict: "user_id,date" },
		);

		// 4. GENERATE TOMORROW'S ADJUSTED PLAN
		const adherence = {
			calorieAdherence:
				todayTargetCalories > 0
					? (calories_consumed / todayTargetCalories) * 100
					: 100,
			proteinAdherence:
				todayTargetMacros.protein_g > 0
					? (protein_consumed / todayTargetMacros.protein_g) * 100
					: 100,
			workoutCompleted: workout_completed,
		};

		const tomorrowAdjusted = adjustPlan(
			{
				calories: todayTargetCalories,
				protein: todayTargetMacros.protein_g,
				carbs: todayTargetMacros.carbs_g,
				fat: todayTargetMacros.fat_g,
				workoutIntensity: intensity || "Moderate",
			},
			adherence as any,
		);

		// 5. Pre-save Tomorrow's Targets (This updates the Tomorrow Card instantly)
		await supabaseAdmin.from("daily_nutrition_logs").upsert(
			{
				user_id,
				date: tomorrow,
				calories_target: tomorrowAdjusted.calories,
				protein_target: tomorrowAdjusted.protein,
				carbs_target: tomorrowAdjusted.carbs,
				fat_target: tomorrowAdjusted.fat,
				calories_consumed: 0, // Reset for the new day
				protein_consumed: 0,
			},
			{ onConflict: "user_id,date" },
		);

		// 6. Save Workout logs
		await supabaseAdmin.from("daily_workout_logs").upsert(
			{
				user_id,
				date: today,
				workout_completed,
				intensity: intensity || "Moderate",
				duration_minutes: duration_minutes || 0,
			},
			{ onConflict: "user_id,date" },
		);

		return NextResponse.json({ success: true });
	} catch (err) {
		console.error(err);
		return NextResponse.json({ error: "Server error" }, { status: 500 });
	}
}
