"use client";

import { useEffect, useState } from "react";

import WeeklyProgress from "./components/WeeklyProgress";

import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";
import TrackToday from "./components/TrackToday";
import UpdateProfile from "./components/Profile";
import TomorrowPlan from "./components/TomorrowPlan";

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
		return (
			<div className="flex items-center justify-center space-x-3 mb-4">
				<div className="w-4 h-4 rounded-full animate-bounce" style={{ backgroundColor: '#BFFF00' }}></div>
				<div className="w-4 h-4 rounded-full animate-bounce" style={{ backgroundColor: '#BFFF00', animationDelay: '0.1s' }}></div>
				<div className="w-4 h-4 rounded-full animate-bounce" style={{ backgroundColor: '#BFFF00', animationDelay: '0.2s' }}></div>
			</div>
		);
	}

	if (!user) {
		return <p>Please login to view your dashboard.</p>;
	}

	return (
		<div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
			<div className="col-span-1 lg:col-span-3 items-center">
				<UpdateProfile />
				<WeeklyProgress userId={user.id} />
			</div>

			<div className="col-span-1 lg:col-span-2 items-center">
				<TrackToday userId={user.id} />
				<TomorrowPlan userId={user.id}/>
			</div>
		</div>
	);
}

