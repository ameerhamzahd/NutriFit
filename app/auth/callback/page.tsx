"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AuthCallback() {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const verifyUser = async () => {
			const {
				data: { user },
				error: userError,
			} = await supabase.auth.getUser();

			if (userError || !user) {
				setError("Unable to get user session.");
				return;
			}

			// Check if user email exists in profiles table
			const { data: profiles, error: profilesError } = await supabase
				.from("profiles")
				.select("id, email")
				.eq("email", user.email)
				.single();

			if (profilesError || !profiles) {
				// User not registered, delete from Supabase auth
				await fetch("/api/delete-user", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ userId: user.id }),
				});

				await supabase.auth.signOut();
				router.replace("/auth/login?error=not_registered");
				return;
			}

			// User is registered, redirect to dashboard
			router.replace("/dashboard");
		};

		verifyUser();
	}, [router]);

	return (
		<div className="min-h-screen flex items-center justify-center flex-col px-4">
			{error ? (
				<p className="text-red-500 text-lg font-semibold animate-pulse">
					{error}
				</p>
			) : (
				<div className="flex flex-col items-center gap-3">
					<svg
						className="animate-spin h-10 w-10 text-orange-500"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						></circle>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
					<p className="text-gray-700 text-lg font-medium animate-pulse">
						Verifying your account...
					</p>
				</div>
			)}
		</div>
	);
}
