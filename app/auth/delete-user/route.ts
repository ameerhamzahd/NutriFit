import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
	const body = await req.json();
	const { userId } = body;

	if (!userId)
		return NextResponse.json({ message: "Missing userId" }, { status: 400 });

	try {
		const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);
		if (error) throw error;

		return NextResponse.json({ message: "User deleted successfully" });
	} catch (err: unknown) {
		const errorMessage = err instanceof Error ? err.message : "Unknown error";
		return NextResponse.json(
			{ message: "Failed to delete user", error: errorMessage },
			{ status: 500 }
		);
	}
}
