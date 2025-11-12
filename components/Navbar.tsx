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

const Navbar = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isPastThreshold, setIsPastThreshold] = useState(false);

  const links = [
    { href: "/" as const, label: "Home" },
    { href: "#idea" as const, label: "Idea" },
    { href: "#features" as const, label: "Features" },
    { href: "#faq" as const, label: "FAQs" },
    // { href: "/dashboard" as const, label: "Dashboard" },
  ];

  const handleLinkClick = (index: number) => {
    setSelectedIndex(index);
  };

  // Scroll listener for hide/show navbar and color change
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = window.innerHeight * 0.9; // 90vh

      // Hide/show navbar
      if (scrollY > lastScrollY && scrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(scrollY);

      // Check if past 90vh threshold
      setIsPastThreshold(scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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
            <h1 className={cn(
              "text-xl md:text-3xl font-mono-trust-display flex items-center justify-center bg-linear-to-r bg-clip-text text-transparent transition-all duration-300",
              isPastThreshold 
                ? "from-[#1A232D] to-[#FF6600]" 
                : "from-[#EEEEEE] to-[#FF6600]"
            )}>
              Nutri
              <BiDumbbell className={cn(
                "transition-colors duration-300",
                isPastThreshold ? "text-[#1A232D]" : "text-[#EEEEEE]"
              )}/>
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
        <Link href="/find-me">
          <button className="pl-4 pr-1.5 py-[5px] rounded-full cursor-pointer border border-white text-white bg-[#0000004D] transition-all duration-300 ease-in-out">
            <span className="text-lg leading-[150%] tracking-[7%] text-white font-medium flex items-center justify-center gap-3">
              Register
              <ArrowUpRight className="w-6 h-6 bg-[#FF833B] text-black rounded-full p-1" />
            </span>
          </button>
        </Link>
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

            <SheetFooter>
              <SheetClose asChild>
                <Link href={""}>
                <button className="w-full h-11 rounded-[15px] border border-white mt-10">
                  <span className="text-[15.63px] leading-[150%] tracking-[7%] text-white font-medium flex items-center justify-center gap-3">
                    Register
                    <ArrowUpRight className="w-6 h-6 rounded-full" />
                  </span>
                </button></Link>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;