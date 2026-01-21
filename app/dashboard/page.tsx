"use client";

import { useEffect, useState } from "react";

import WeeklyProgress from "./components/WeeklyProgress";

import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";

export default function DashboardPage() {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function getSessionUser() {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			setUser(user);
			setLoading(false);
		}
		getSessionUser();
	}, []); 

	if (loading) {
		return <p>Loading dashboard...</p>;
	}

	if (!user) {
		return <p>Please login to view your dashboard.</p>;
	}

	return (
		<div>
			<h1 className="text-2xl font-bold text-[#1A232D]">Dashboard</h1>
			<p className="text-[#1A232D]">Welcome back!! {user.email}!</p>
			<WeeklyProgress userId={user.id} />
		</div>
	);
}

