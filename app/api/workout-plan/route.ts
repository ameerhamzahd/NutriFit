// app/api/workout-plan/route.ts

import { NextRequest, NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabaseAdminClient";
import { generateWorkoutPlan } from "@/lib/workout/generateWorkoutPlan";


export async function GET(req: NextRequest) {
	try {
		const rawUserId = req.nextUrl.searchParams.get("userId");
		const userId = rawUserId ? rawUserId.trim() : null;

		if (!userId) {
			return NextResponse.json(
				{ error: "Missing userId in query" },
				{ status: 400 }
			);
		}

		// 2. Fetch user profile using the ADMIN client (bypasses RLS)
		// Note: The client is named 'supabaseAdmin' here

		const { data: profile, error } = await supabaseAdmin
			.from("profiles")
			.select("fitness_goal")

			.eq("id", userId)
			.single();

		

		if (error) {
			if (error.code === "PGRST116" || !profile) {
				return NextResponse.json({ error: "User not found" }, { status: 404 });
			}

			console.error("Supabase error fetching profile:", error);
			return NextResponse.json({ error: "Database error" }, { status: 500 });
		}

		const workoutPlan = generateWorkoutPlan(profile.fitness_goal);

		return NextResponse.json({ workoutPlan });
	} catch (err) {
		console.error("Workout Plan API error:", err);
		return NextResponse.json({ error: "Server error" }, { status: 500 });
	}
}
