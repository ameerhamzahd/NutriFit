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
  User,
  LogOut
} from "lucide-react";
import { BiDumbbell } from "react-icons/bi";

const links = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/meals", label: "Meals", icon: UtensilsCrossed },
  { href: "/dashboard/workouts", label: "Workouts", icon: Dumbbell },
  { href: "/dashboard/chat", label: "Coach", icon: HeartPulse },
  { href: "/dashboard/activity", label: "Activity", icon: Activity },
  { href: "/dashboard/progress", label: "Progress", icon: BarChart3 },
  { href: "/dashboard/profile/update", label: "Profile", icon: User },
  { href: "/logout", label: "Logout", icon: LogOut },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <>
      <div className="">
        {/* DESKTOP SIDEBAR */}
        <aside
          className="hidden h-screen md:flex md:w-[80px] lg:w-[275px] flex-col z-50 md:ml-6 rounded-t-[25px] bg-[#1A232D]/50 backdrop-blur-md"
        >
          <div>
            {/* Menu */}
            <nav className="flex-1 py-6">
              {/* Brand */}
              <Link href="/">
                <div
                  className="text-sm md:text-base lg:text-2xl font-unbounded font-bold flex items-center justify-center bg-linear-to-r from-[#1A232D] to-[#FF6600] bg-clip-text text-transparent transition-all duration-300 pb-4"
                >
                  Nutri
                  <BiDumbbell
                    className={cn(
                      "transition-colors duration-300 text-[#1A232D]"
                    )}
                  />
                  Fit
                </div>
              </Link>

              <ul className="space-y-2 px-4 pt-4">
                {links.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.href;

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex gap-4 items-center rounded-lg px-5 py-3.5 transition-all duration-200",
                          active
                            ? "shadow-md bg-linear-to-r from-[#FF6600] to-[#BFFF00]/0 text-black"
                            : "hover:bg-white/5"
                        )}
                      >
                        <Icon size={20} strokeWidth={2} />
                        <span className="text-sm font-medium md:hidden lg:block">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </aside>

        {/* MOBILE BOTTOM NAV */}
        <nav
          className="md:hidden fixed bottom-0 left-0 right-0 h-[70px] flex z-50 bg-[#1A232D]/50 backdrop-blur-md shadow-[0_-2px_10px_rgba(0,0,0,0.15)]"
        >
          <ul className="flex justify-around w-full items-center">
            {links.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex flex-col items-center gap-1 text-[9px] transition-all p-1",
                      active
                        ? "shadow-md bg-linear-to-b from-[#FF6600] to-[#1A232D]/0 rounded-t-lg text-black"
                        : "hover:bg-white/5"
                    )}
                  >
                    <Icon size={22} strokeWidth={2} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}