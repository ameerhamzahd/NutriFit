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
    "/auth/login",
    "/auth/register",
  ];
 
  const hiddenNavbar = [
    "/terms-of-service",
    "/privacy-policy",
  ];
 
  const hideLayout = hiddenRoutes.includes(pathname);
  const hideNavbar = hiddenNavbar.includes(pathname);
 
  return (
    <>
      {!hideLayout && !hideNavbar && <Navbar />}
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