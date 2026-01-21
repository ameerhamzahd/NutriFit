import DashboardSidebar from "@/app/dashboard/components/DashboardSidebar";
import DashboardTopBar from "@/app/dashboard/components/DashboardTopBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DashboardTopBar />
      <main className="flex w-full">
        <div>
          <DashboardSidebar />
        </div>
        <div>{children}</div>
      </main>
    </div>
  );
}