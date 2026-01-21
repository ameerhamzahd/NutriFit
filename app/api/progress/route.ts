// app/api/progress/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdminClient";
 
export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const userId = searchParams.get("userId");
 
		if (!userId) {
			return NextResponse.json({ error: "Missing userId" }, { status: 400 });
		}
 
		// Fetch last 7 nutrition logs to calculate trends
		const { data: history, error } = await supabaseAdmin
			.from("daily_nutrition_logs")
			.select(
				"date, calories_consumed, calories_target, protein_consumed, protein_target",
			)
			.eq("user_id", userId)
			.order("date", { ascending: true })
			.limit(7);
 
		if (error) throw error;
 
		return NextResponse.json({ history: history || [] });
	} catch (err: any) {
		console.error("Progress API Error:", err);
		return NextResponse.json({ error: "Server error" }, { status: 500 });
	}
}