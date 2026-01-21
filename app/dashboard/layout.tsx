import DashboardSidebar from "@/app/dashboard/components/DashboardSidebar";
import DashboardTopBar from "@/app/dashboard/components/DashboardTopBar";
import TrackToday from "./components/TrackToday";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ backgroundColor: "#EEEEEE", color: "#1A232D" }} className="min-h-screen">
      <DashboardTopBar /> 
      <DashboardSidebar />
      
      <main className="md:ml-[250px] pt-[60px] pb-[70px] p-6">
        {children}
      </main>
    </div>
  );
}