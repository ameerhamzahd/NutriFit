// app/api/tracking/workout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Admin client (bypasses RLS safely on server)
const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();

		const { userId, date, workoutCompleted, intensity, durationMinutes } = body;

		if (!userId || !date) {
			return NextResponse.json(
				{ error: "Missing userId or date" },
				{ status: 400 }
			);
		}

		const { error } = await supabase.from("daily_workout_logs").upsert({
			user_id: userId,
			date,
			workout_completed: workoutCompleted ?? false,
			intensity: intensity ?? null,
			duration_minutes: durationMinutes ?? null,
		});

		if (error) {
			console.error(error);
			return NextResponse.json(
				{ error: "Failed to save workout log" },
				{ status: 500 }
			);
		}

		return NextResponse.json({
			success: true,
			message: "Workout logged successfully",
		});
	} catch (err) {
		console.error("Workout tracking error:", err);
		return NextResponse.json({ error: "Server error" }, { status: 500 });
	}
}
