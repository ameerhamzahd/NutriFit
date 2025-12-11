"use client";

import { useEffect, useState } from "react";
import { User } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

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
      className="fixed top-0 left-0 right-0 z-50 h-[60px] flex items-center justify-end px-6 shadow-[0_2px_6px_rgba(0,0,0,0.1)]"
      style={{ backgroundColor: "#EEEEEE", color: "#1A232D" }}
    >
      <div
        className="relative w-8 h-8"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Avatar */}
        <div
          className="w-full h-full flex items-center justify-center rounded-full bg-gradient-to-br from-[#FF6600] to-[#FF9933] cursor-default"
          style={{ color: "#1A232D" }}
        >
          <User size={18} />
        </div>

        {/* Tooltip */}
        {isHovered && name && (
          <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2">
            <div
              className="px-3 py-1.5 text-xs rounded whitespace-nowrap"
              style={{
                backgroundColor: "#F0F0F0",
                color: "#1A232D",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              }}
            >
              {name}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
