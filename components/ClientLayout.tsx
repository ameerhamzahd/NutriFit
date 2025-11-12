"use client";

import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hiddenRoutes = [
    "/welcome-to-nutrifit",
    "/terms-of-services",
    "/privacy-policy",
    "/auth/login",
    "/auth/register",
  ];
  const hideLayout = hiddenRoutes.includes(pathname);

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
