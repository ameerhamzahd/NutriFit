"use client";

import { useEffect, useState } from "react";
import { LogOut, User } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function DashboardTopBar() {
  const [isHovered, setIsHovered] = useState(false);
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
      className="flex items-center justify-between py-6 md:py-6 lg:p-6 max-w-11/12 mx-auto gap-6"
    >
      {/* Brand */}
      <Link href="/">
        <div
          className="text-sm md:text-base lg:text-2xl font-unbounded font-bold flex items-center justify-center bg-linear-to-r from-[#1A232D] to-[#FF6600] bg-clip-text text-transparent transition-all duration-300"
        >
          NutriFit
        </div>
      </Link>

      <h1 className="relative md:-left-10 lg:-left-85 text-sm md:text-base lg:text-2xl font-medium font-unbounded">
        Welcome Back,
        <span className="text-[#FF6600]"> {name?.split(" ")[0]}</span>!
      </h1>

      {/* Log Out */}
      <div className="text-[#FF6600] cursor-pointer hover:scale-105 transition-transform gap-2">
        {/* <p><span><LogOut size={20 }/></span></p> */}
        {/* <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2">
          <div
            className="px-3 py-1.5 text-xs rounded whitespace-nowrap"
            style={{
              backgroundColor: "#F0F0F0",
              color: "#1A232D",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            }}
          >
            Log Out
          </div>
        </div> */}
      </div>
    </header>
  );
}
