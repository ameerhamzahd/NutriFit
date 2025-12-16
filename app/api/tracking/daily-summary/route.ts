// app/api/tracking/daily-summary/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
	try {
		const userId = req.nextUrl.searchParams.get("userId");
		const date =
			req.nextUrl.searchParams.get("date") ||
			new Date().toISOString().split("T")[0];

		if (!userId) {
			return NextResponse.json({ error: "Missing userId" }, { status: 400 });
		}

		const { data, error } = await supabase
			.from("daily_nutrition_logs")
			.select("*")
			.eq("user_id", userId)
			.eq("date", date)
			.single();

		if (error || !data) {
			return NextResponse.json(
				{ error: "No nutrition log found for this date" },
				{ status: 404 }
			);
		}

		// Adherence calculations
		const calorieScore = (data.calories_consumed / data.calories_target) * 100;
		const proteinScore = (data.protein_consumed / data.protein_target) * 100;
		const carbsScore = (data.carbs_consumed / data.carbs_target) * 100;
		const fatScore = (data.fat_consumed / data.fat_target) * 100;

		const adherenceScore = Math.round(
			(calorieScore + proteinScore + carbsScore + fatScore) / 4
		);

		return NextResponse.json({
			date,
			adherenceScore,
			breakdown: {
				calories: Math.round(calorieScore),
				protein: Math.round(proteinScore),
				carbs: Math.round(carbsScore),
				fat: Math.round(fatScore),
			},
			raw: data,
		});
	} catch (err) {
		console.error("Daily summary error:", err);
		return NextResponse.json({ error: "Server error" }, { status: 500 });
	}
}
