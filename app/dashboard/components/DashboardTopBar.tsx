"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function DashboardTopBar() {
  const [name, setName] = useState<string>("");

  useEffect(() => {
    let isMounted = true;

    const fetchUserName = async (userId: string | undefined) => {
      if (!userId) return;

      try {
        const { data: profiles, error } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", userId)
          .single();

        if (error) {
          console.warn("Error fetching profiles:", error.message);
          return;
        }

        if (isMounted && profiles?.full_name) {
          setName(profiles.full_name);
        }
      } catch (err) {
        console.error("Failed to fetch profiles:", err);
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      fetchUserName(session?.user?.id);
    });

    const { data: subscriptionData } = supabase.auth.onAuthStateChange(
      (_, session) => {
        fetchUserName(session?.user?.id);
      }
    );

    return () => {
      isMounted = false;
      subscriptionData?.subscription?.unsubscribe();
    };
  }, []);

  return (
    <header
      className="flex items-center justify-between py-6 md:pt-11 max-w-11/12 mx-auto gap-6"
    >
      <h1 className="relative lg:text-2xl font-medium font-unbounded">
        Welcome Back,  
        <span className="text-[#FF6600]">
          
          {(() => {
            const parts = name?.trim().split(/\s+/) || [];
            const firstWord = parts[0] || "";
            const secondInitial = parts[1]?.[0] || "";
            return ` ${firstWord}${secondInitial ? " " + secondInitial : ""}`;
          })()}.
        </span>!
      </h1>

    </header>
  );
}
