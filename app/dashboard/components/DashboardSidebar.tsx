"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Dumbbell,
  HeartPulse,
  Activity,
  BarChart3,
  User
} from "lucide-react";

const links = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/meals", label: "Meals", icon: UtensilsCrossed },
  { href: "/dashboard/workouts", label: "Workouts", icon: Dumbbell },
  { href: "/dashboard/chat", label: "Coach", icon: HeartPulse },
  { href: "/dashboard/activity", label: "Activity", icon: Activity },
  { href: "/dashboard/progress", label: "Progress", icon: BarChart3 },
  { href: "/dashboard/profile/update", label: "Profile", icon: User },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside
        className="hidden md:flex fixed left-0 top-0 h-screen w-[250px] flex-col z-50 shadow-[2px_0_10px_rgba(0,0,0,0.08)]"
        style={{ backgroundColor: "#EEEEEE" }}
      >

        {/* Brand */}
        <Link href="/" >
          <div
            className="h-[60px] flex items-center px-6 font-bold text-lg border-b cursor-pointer"
            style={{ borderColor: "rgba(0,0,0,0.05)", color: "#FF6600" }}
          >
            NutriFit
          </div>
        </Link>

        {/* Menu */}
        <nav className="flex-1 py-4">
          <ul className="space-y-1 px-3">
            {links.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex gap-3 items-center rounded-md px-4 py-2 transition",
                      active
                        ? "bg-[#FF6600] text-[#1A232D]"
                        : "hover:bg-[#ff66001a] text-[#1A232D]"
                    )}
                  >
                    <Icon size={18} />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div
          className="p-4 text-xs"
          style={{ color: "#1A232D" }}
        >
          Fuel your body. Train your mind.
        </div>

      </aside>

      {/* MOBILE BOTTOM NAV */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 h-[65px] flex z-50 shadow-[0_-2px_8px_rgba(0,0,0,0.25)]"
        style={{
          backgroundColor: "#1A232D",
          borderTop: "1px solid rgba(238,238,238,0.08)",
        }}
      >
        <ul className="flex justify-around w-full items-center">
          {links.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex flex-col items-center text-[10px] transition"
                  style={{ color: active ? "#FF6600" : "#EEEEEE" }}
                >
                  <Icon size={20} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
