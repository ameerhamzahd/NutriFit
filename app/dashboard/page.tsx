"use client";

import { useEffect, useState } from "react";
import DailyMealPlanCard from "./components/meal/DailyMealPlanCard";
import DailyWorkoutCard from "./components/workout/DailyWorkoutCard";
import PrivateRoute from "@/components/PrivateRoute";
import { supabase } from "@/lib/supabaseClient";

export default function DashboardPage() {
  return (
    <PrivateRoute>
      <DashboardContent />
    </PrivateRoute>
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
