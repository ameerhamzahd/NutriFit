"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ArrowUpRight, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { BiDumbbell } from "react-icons/bi";
import { supabase } from "@/lib/supabaseClient";
import { Bounce, toast } from "react-toastify";

const Navbar = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isPastThreshold, setIsPastThreshold] = useState(false);
  const [user, setUser] = useState<unknown>(null);

  const links = [
    { href: "/" as const, label: "Home" },
    { href: "#idea" as const, label: "Idea" },
    { href: "#features" as const, label: "Features" },
    { href: "#faq" as const, label: "FAQs" },
    ...(user ? [{ href: "/dashboard", label: "Dashboard" }] : []),
  ];

  const handleLinkClick = (index: number) => {
    setSelectedIndex(index);
  };

  // Check if user is logged in
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();

    // Optional: subscribe to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

  // Scroll listener for hide/show navbar and color change
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = window.innerHeight * 0.9; // 90vh

      if (scrollY > lastScrollY && scrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(scrollY);

      setIsPastThreshold(scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Logout handler
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout Error:", error);
      toast.error("Failed to logout. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        transition: Bounce,
        theme: "colored",
      });
      return;
    }

    // ✅ Show success toast
    toast.success("Logged out successfully", {
      position: "top-right",
      autoClose: 1500,
      transition: Bounce,
      theme: "colored",
    });
  };

  return (
    <header
      className={cn(
        "w-full sm:top-10 top-3 left-0 flex items-center justify-between px-10 lg:px-30 py-2 text-black z-50 fixed transition-transform duration-500 ease-in-out",
        isVisible ? "translate-y-0" : "-translate-y-[120px]"
      )}
    >
      {/* Logo */}
      <div>
        <div className="">
          <Link href="/">
            <h1
              className={cn(
                "text-xl md:text-3xl font-mono-trust-display flex items-center justify-center bg-linear-to-r bg-clip-text text-transparent transition-all duration-300",
                isPastThreshold
                  ? "from-[#1A232D] to-[#FF6600]"
                  : "from-[#EEEEEE] to-[#FF6600]"
              )}
            >
              Nutri
              <BiDumbbell
                className={cn(
                  "transition-colors duration-300",
                  isPastThreshold ? "text-[#1A232D]" : "text-[#EEEEEE]"
                )}
              />
              Fit
            </h1>
          </Link>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="max-lg:hidden">
        <nav className="h-[53px] bg-[#FFFFFF] flex justify-center items-center rounded-[15px] px-10 shadow-sm">
          <ul className="flex items-center gap-8">
            {links.map((link, i) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => handleLinkClick(i)}
                  className={cn(
                    "relative text-[15.63px] leading-[150%] tracking-[7%] text-black font-medium after:content-[''] after:absolute after:-bottom-2.5 after:left-1/2 after:-translate-x-1/2 after:size-1.5 after:rounded-full after:bg-transparent after:transition-all after:duration-300 after:ease-in-out font-satoshi",
                    selectedIndex === i && "after:bg-[#FF833B]"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Desktop Button */}
      <div className="max-lg:hidden">
        {user ? (
          <button
            onClick={handleLogout}
            className="px-6 py-2 rounded-full cursor-pointer border border-[#FF6600] bg-[#FF6600] text-white font-medium text-lg flex items-center gap-3 transition-all duration-300 ease-in-out hover:bg-[#ff7a1f] hover:border-[#ff7a1f]"
          >
            Logout
            <ArrowUpRight className="w-5 h-5 bg-white text-[#FF6600] rounded-full p-[2px]" />
          </button>
        ) : (
          <Link href="/auth/login">
            <button className="px-6 py-2 rounded-full cursor-pointer border border-white bg-[#0000004D] text-white font-medium text-lg flex items-center gap-3 transition-all duration-300 ease-in-out hover:bg-[#FF6600] hover:text-black">
              Get Started
              <ArrowUpRight className="w-5 h-5 bg-[#FF833B] text-black rounded-full p-[2px]" />
            </button>
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="max-lg:block hidden">
        <Sheet>
          <SheetTrigger asChild>
            <button>
              <Menu color="#FF6600" width={20} height={20} />
            </button>
          </SheetTrigger>

          <SheetContent className="bg-[#001725] text-white border-l-0">
            <SheetHeader>
              <SheetTitle></SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>

            <div>
              <ul className="flex flex-col gap-4">
                {links.map((link, i) => (
                  <li key={link.label}>
                    <SheetClose asChild>
                      <Link
                        href={link.href}
                        onClick={() => handleLinkClick(i)}
                        className={cn(
                          "relative text-base leading-[150%] tracking-[7%] font-bold pl-4 after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1.5 after:size-1.5 after:rounded-full after:bg-transparent after:transition-all after:duration-300 after:ease-in-out",
                          selectedIndex === i && "after:bg-[#FF833B]"
                        )}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile Logout Button in SheetFooter */}
            <SheetFooter>
              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full h-12 rounded-full border border-[#FF6600] bg-[#FF6600] text-white font-medium flex items-center justify-center gap-3 text-lg transition-all duration-300 ease-in-out hover:bg-[#ff7a1f] hover:border-[#ff7a1f]"
                >
                  Logout
                  <ArrowUpRight className="w-5 h-5 bg-white text-[#FF6600] rounded-full p-[2px]" />
                </button>
              ) : (
                <SheetClose asChild>
                  <Link href="/auth/login">
                    <button className="w-full h-12 rounded-full border border-white bg-[#0000004D] text-white font-medium flex items-center justify-center gap-3 text-lg transition-all duration-300 ease-in-out hover:bg-[#FF6600] hover:text-black">
                      Register
                      <ArrowUpRight className="w-5 h-5 bg-[#FF833B] text-black rounded-full p-[2px]" />
                    </button>
                  </Link>
                </SheetClose>
              )}
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
