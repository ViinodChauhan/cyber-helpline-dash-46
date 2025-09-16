import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { KPISection } from "@/components/dashboard/KPISection";
import { ChartsSection } from "@/components/dashboard/ChartsSection";
import { AgentsTable } from "@/components/dashboard/AgentsTable";
import { ReportsSection } from "@/components/dashboard/ReportsSection";
import { LiveMonitor } from "@/components/dashboard/LiveMonitor";

const Index = () => {
  return (
    <div className="min-h-full">
      <DashboardHeader />
      
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Live Monitor - Top Priority */}
        <LiveMonitor />
        
        {/* KPI Cards */}
        <KPISection />
        
        {/* Charts Section */}
        <ChartsSection />
        
        {/* Agent Performance */}
        <AgentsTable />
        
        {/* Reports Section */}
        <ReportsSection />
      </main>
    </div>
  );
};

export default Index;