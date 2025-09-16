import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Calendar, Filter } from "lucide-react";

const reportsData = [
  {
    title: "Daily Call Summary",
    description: "Complete breakdown of all calls, agents, and performance metrics",
    format: ["PDF", "Excel", "CSV"],
    lastGenerated: "2 hours ago",
    size: "2.4 MB"
  },
  {
    title: "Agent Performance Report",
    description: "Individual agent statistics, ratings, and efficiency metrics",
    format: ["PDF", "Excel"],
    lastGenerated: "4 hours ago", 
    size: "1.8 MB"
  },
  {
    title: "CSAT Analysis",
    description: "Customer satisfaction trends and feedback analysis",
    format: ["PDF", "Excel"],
    lastGenerated: "6 hours ago",
    size: "1.2 MB"
  },
  {
    title: "Call Types & Trends",
    description: "Crime category analysis and temporal patterns",
    format: ["PDF", "Excel", "CSV"],
    lastGenerated: "8 hours ago",
    size: "3.1 MB"
  }
];

export const ReportsSection = () => {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Reports & Analytics</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Report
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground">
            <Download className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportsData.map((report, index) => (
          <Card key={index} className="kpi-card hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold flex items-center justify-between">
                <span className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-primary" />
                  {report.title}
                </span>
                <Badge variant="outline" className="text-xs">
                  {report.size}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {report.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  Last generated: {report.lastGenerated}
                </div>
                <div className="flex items-center space-x-1">
                  {report.format.map((format, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {format}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button size="sm" variant="secondary" className="flex-1">
                  <Filter className="h-4 w-4 mr-2" />
                  Customize
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Export Section */}
      <Card className="chart-container">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center">
            ⚡ Quick Export
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Current Session Data</h4>
              <p className="text-sm text-muted-foreground">Export today's live data</p>
              <Button size="sm" variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Agent Summary</h4>
              <p className="text-sm text-muted-foreground">Current agent performance</p>
              <Button size="sm" variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Export Excel
              </Button>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Call Analytics</h4>
              <p className="text-sm text-muted-foreground">Detailed call breakdown</p>
              <Button size="sm" variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};