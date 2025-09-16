import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Phone, 
  Users, 
  Clock, 
  AlertTriangle, 
  Activity,
  PhoneCall,
  UserCheck,
  Timer
} from "lucide-react";

const liveData = {
  queueStatus: {
    waiting: 12,
    averageWait: "2:34",
    longestWait: "8:45",
    abandonedRate: 3.2
  },
  activeCalls: {
    inProgress: 18,
    onHold: 3,
    transferred: 2,
    escalated: 1
  },
  systemStatus: {
    uptime: "99.8%",
    responseTime: "0.8s",
    errorRate: "0.1%",
    lastUpdate: new Date().toLocaleTimeString()
  }
};

export const LiveMonitor = () => {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground flex items-center">
          <Activity className="h-6 w-6 mr-2 text-primary animate-pulse" />
          Live Operations Monitor
        </h2>
        <Badge variant="outline" className="bg-success-light text-success border-success">
          <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse"></div>
          System Operational
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Queue Status */}
        <Card className="kpi-card border-l-4 border-l-warning">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <Timer className="h-4 w-4 mr-2 text-warning" />
              Queue Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-warning">{liveData.queueStatus.waiting}</span>
              <span className="text-xs text-muted-foreground">Waiting</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span>Avg. Wait:</span>
                <span className="font-semibold">{liveData.queueStatus.averageWait}</span>
              </div>
              <div className="flex justify-between">
                <span>Longest:</span>
                <span className="font-semibold text-destructive">{liveData.queueStatus.longestWait}</span>
              </div>
              <div className="flex justify-between">
                <span>Abandon Rate:</span>
                <span className="font-semibold">{liveData.queueStatus.abandonedRate}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Calls */}
        <Card className="kpi-card border-l-4 border-l-accent">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <PhoneCall className="h-4 w-4 mr-2 text-accent" />
              Active Calls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-accent">{liveData.activeCalls.inProgress}</span>
              <span className="text-xs text-muted-foreground">In Progress</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span>On Hold:</span>
                <span className="font-semibold">{liveData.activeCalls.onHold}</span>
              </div>
              <div className="flex justify-between">
                <span>Transferred:</span>
                <span className="font-semibold">{liveData.activeCalls.transferred}</span>
              </div>
              <div className="flex justify-between">
                <span>Escalated:</span>
                <span className="font-semibold text-warning">{liveData.activeCalls.escalated}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Agents Online */}
        <Card className="kpi-card border-l-4 border-l-success">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <UserCheck className="h-4 w-4 mr-2 text-success" />
              Agents Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-success">24</span>
              <span className="text-xs text-muted-foreground">Online</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span>Available:</span>
                <span className="font-semibold text-success">6</span>
              </div>
              <div className="flex justify-between">
                <span>Busy:</span>
                <span className="font-semibold text-warning">18</span>
              </div>
              <div className="flex justify-between">
                <span>Break:</span>
                <span className="font-semibold text-muted-foreground">2</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card className="kpi-card border-l-4 border-l-primary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <Activity className="h-4 w-4 mr-2 text-primary" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-success">{liveData.systemStatus.uptime}</span>
              <span className="text-xs text-muted-foreground">Uptime</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span>Response:</span>
                <span className="font-semibold text-success">{liveData.systemStatus.responseTime}</span>
              </div>
              <div className="flex justify-between">
                <span>Error Rate:</span>
                <span className="font-semibold text-success">{liveData.systemStatus.errorRate}</span>
              </div>
              <div className="flex justify-between">
                <span>Updated:</span>
                <span className="font-semibold">{liveData.systemStatus.lastUpdate}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Activity Feed */}
      <Card className="chart-container">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center">
            🔄 Live Activity Feed
          </CardTitle>
          <Button variant="outline" size="sm">
            <Activity className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            <div className="flex items-center space-x-3 p-2 bg-muted rounded-lg">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <Phone className="h-4 w-4 text-success" />
              <span className="text-sm">Agent Kumar answered incoming call - Banking Fraud</span>
              <span className="text-xs text-muted-foreground ml-auto">Just now</span>
            </div>
            
            <div className="flex items-center space-x-3 p-2 bg-muted rounded-lg">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <AlertTriangle className="h-4 w-4 text-warning" />
              <span className="text-sm">Queue wait time exceeded 5 minutes</span>
              <span className="text-xs text-muted-foreground ml-auto">2 min ago</span>
            </div>
            
            <div className="flex items-center space-x-3 p-2 bg-muted rounded-lg">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <PhoneCall className="h-4 w-4 text-accent" />
              <span className="text-sm">Call transferred from Agent Sharma to Supervisor</span>
              <span className="text-xs text-muted-foreground ml-auto">3 min ago</span>
            </div>
            
            <div className="flex items-center space-x-3 p-2 bg-muted rounded-lg">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <Users className="h-4 w-4 text-success" />
              <span className="text-sm">Agent Patel logged in - Shift started</span>
              <span className="text-xs text-muted-foreground ml-auto">5 min ago</span>
            </div>
            
            <div className="flex items-center space-x-3 p-2 bg-muted rounded-lg">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <Phone className="h-4 w-4 text-primary" />
              <span className="text-sm">New call queued - Phishing Report</span>
              <span className="text-xs text-muted-foreground ml-auto">7 min ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};