// app/api/tomorrow/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdminClient";
import { getBangladeshDate } from "@/lib/dateUtils";
import { calculateDailyCalories } from "@/lib/nutrition/calculateNutrition";
import { calculateMacros } from "@/lib/nutrition/calculateMacros";

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const userId = searchParams.get("userId");

		if (!userId)
			return NextResponse.json({ error: "Missing userId" }, { status: 400 });

		// 1. Get Today AND Tomorrow strings
		const todayStr = getBangladeshDate(0);
		const tomorrowStr = getBangladeshDate(1); // 🟢 This will be Jan 22

		const { data: profile } = await supabaseAdmin
			.from("profiles")
			.select("*")
			.eq("id", userId)
			.single();

		if (!profile)
			return NextResponse.json({ error: "Profile not found" }, { status: 404 });

		const baselineCalories = calculateDailyCalories({
			weightKg: Number(profile.weight_kg),
			heightCm: Number(profile.height_cm),
			age: Number(profile.age),
			gender: profile.gender,
			activityLevel: profile.activity_level,
			fitnessGoal: profile.fitness_goal,
		});

		const baselineMacros = calculateMacros(
			Number(profile.weight_kg),
			baselineCalories,
			profile.fitness_goal,
		);

		const { data: nutritionToday } = await supabaseAdmin
			.from("daily_nutrition_logs")
			.select("*")
			.eq("user_id", userId)
			.eq("date", tomorrowStr)
			.maybeSingle();

		let finalCalories = baselineCalories;
		let finalProtein = baselineMacros.protein_g;
		let workoutIntensity = "Moderate";
		let advice = "Plan based on your standard profile goals.";

		if (nutritionToday && nutritionToday.calories_consumed > 0) {
			const calDiff =
				nutritionToday.calories_target - nutritionToday.calories_consumed;
			const isGoalMet =
				Math.abs(calDiff) < nutritionToday.calories_target * 0.05;

			if (isGoalMet) {
				finalProtein += 5;
				workoutIntensity = "High Intensity";
				advice =
					"Perfect day! We've boosted tomorrow's plan to keep your momentum going.";
			} else if (calDiff > 0) {
				finalCalories += Math.min(calDiff, 300);
				workoutIntensity = "Recovery / Light";
				advice =
					"You were under your target today. Tomorrow's plan is increased for recovery.";
			} else {
				finalCalories -= 200;
				workoutIntensity = "Moderate + Cardio";
				advice =
					"You exceeded your limit. Tomorrow's plan is scaled back to balance it out.";
			}

			// 🟢 CRITICAL CHANGE: Save this to the database for TOMORROW
			// This is what your Today Card looks for.
			await supabaseAdmin.from("daily_nutrition_logs").upsert(
				{
					user_id: userId,
					date: tomorrowStr, // 🟢 Saves as Jan 22
					calories_target: Math.round(finalCalories),
					protein_target: Math.round(finalProtein),
					carbs_target: baselineMacros.carbs_g,
					fat_target: baselineMacros.fat_g,
					calories_consumed: 0,
					protein_consumed: 0,
					carbs_consumed: 0,
					fat_consumed: 0,
				},
				{ onConflict: "user_id,date" },
			);
		} else {
			advice =
				"Waiting for today's tracking to personalize your adjustment. Showing standard plan for now.";
		}

		return NextResponse.json({
			tomorrowPlan: {
				calories: Math.round(finalCalories),
				protein: Math.round(finalProtein),
				carbs: baselineMacros.carbs_g,
				fat: baselineMacros.fat_g,
				advice,
				workoutIntensity,
			},
		});
	} catch (err: any) {
		console.error("Tomorrow API Error:", err);
		return NextResponse.json({ error: "Server error" }, { status: 500 });
	}
}
