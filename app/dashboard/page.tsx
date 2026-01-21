"use client";

import { useEffect, useState } from "react";
import DailyMealPlanCard from "./components/meal/DailyMealPlanCard";
import DailyWorkoutCard from "./components/workout/DailyWorkoutCard";
import TrackToday from "./components/TrackToday";
import TomorrowPlan from "./components/TomorrowPlan";
import WeeklyProgress from "./components/WeeklyProgress";
import { HeartHandshake } from "lucide-react";
import ConsistencyHeatmap from "./components/ConsistencyHeatap";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";

export default function DashboardPage() {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	
	useEffect(() => {
		// Function to fetch the current user's session once
		async function getSessionUser() {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			setUser(user);
			setLoading(false);
		}
		getSessionUser();
	}, []); // Only runs once on component mount

	// --- Conditional Rendering ---
	if (loading) {
		return <p>Loading dashboard...</p>;
	}

	if (!user) {
		return <p>Please login to view your dashboard.</p>;
	}

	// --- Render Logged-In State ---
	return (
		<div>
			{/* <DailyMealPlanCard userId={user.id} />
			<DailyWorkoutCard userId={user.id} /> */}

			<TrackToday  userId={user.id} />

			<TomorrowPlan userId={user.id} />
			<WeeklyProgress userId={user.id} />

		

			<h1 className="text-2xl font-bold text-[#1A232D]">Dashboard</h1>
			<p className="text-[#1A232D]">Welcome back!! {user.email}!</p>
		</div>
	);
}

const DashboardContent: React.FC = () => {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUser({ id: user.id, email: user.email ?? "" });
      }
    };
    fetchUser();
  }, []);

  if (!user) return null; 

  return (
    <div className="">
      <DailyMealPlanCard userId={user.id} />
      <DailyWorkoutCard userId={user.id} />
    </div>
  );
};
