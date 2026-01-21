import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdminClient";

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const userId = searchParams.get("userId");

		if (!userId) {
			return NextResponse.json({ error: "Missing userId" }, { status: 400 });
		}

		// Fetch absolute latest 10 logs (includes today and pre-generated tomorrow)
		const { data: history, error } = await supabaseAdmin
			.from("daily_nutrition_logs")
			.select(
				"date, calories_consumed, calories_target, protein_consumed, protein_target",
			)
			.eq("user_id", userId)
			.order("date", { ascending: false }) // Get newest first to ensure we hit the limit correctly
			.limit(10);

		if (error) throw error;

		// Reverse it so the chart displays oldest -> newest (Left to Right)
		const sortedHistory = (history || []).reverse();

		return NextResponse.json({ history: sortedHistory });
	} catch (err: any) {
		console.error("Progress API Error:", err);
		return NextResponse.json({ error: "Server error" }, { status: 500 });
	}
}
