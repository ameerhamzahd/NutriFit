import DashboardSidebar from "@/app/dashboard/components/DashboardSidebar";
import DashboardTopBar from "@/app/dashboard/components/DashboardTopBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <main className="flex w-full">
        <div className="md:sticky md:top-6 md:self-start">
          <DashboardSidebar />
        </div>
        <div className="w-full px-6">
          <DashboardTopBar />
          <div className="max-w-11/12 mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}