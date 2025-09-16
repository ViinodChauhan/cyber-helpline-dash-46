import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  Edit, 
  Shield, 
  Key, 
  UserX, 
  Users,
  Phone,
  Activity,
  Calendar,
  Clock,
  Star,
  TrendingUp,
  TrendingDown,
  AlertTriangle
} from "lucide-react";
import { Agent } from "@/pages/agents/AgentManagement";

interface AgentDetailProps {
  agent: Agent;
  onEdit: () => void;
  onBack: () => void;
}

const activityLog = [
  { time: "09:15 AM", action: "Logged in", type: "info" },
  { time: "09:20 AM", action: "Answered call - Banking Fraud Case #1247", type: "success" },
  { time: "09:45 AM", action: "Call completed - 25 minutes", type: "success" },
  { time: "10:10 AM", action: "Status changed to Available", type: "info" },
  { time: "10:15 AM", action: "Answered call - Phishing Report #1248", type: "success" },
  { time: "10:32 AM", action: "Call transferred to Supervisor", type: "warning" },
  { time: "11:00 AM", action: "Break started", type: "info" },
  { time: "11:15 AM", action: "Break ended - Back to Available", type: "info" },
];

const callStats = {
  today: { calls: 12, duration: "3h 45m", avgHandle: "4:32" },
  week: { calls: 67, duration: "22h 15m", avgHandle: "4:18" },
  month: { calls: 285, duration: "95h 30m", avgHandle: "4:25" }
};

export const AgentDetail = ({ agent, onEdit, onBack }: AgentDetailProps) => {
  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin": return "destructive";
      case "Supervisor": return "outline";
      case "Agent": return "default";
      default: return "secondary";
    }
  };

  const getStatusColor = (availability: string) => {
    switch (availability) {
      case "Available": return "default";
      case "Busy": return "outline";  
      case "Away": return "secondary";
      case "Offline": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                {agent.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{agent.name}</h2>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant={getRoleColor(agent.role)}>
                  {agent.role}
                </Badge>
                <Badge variant="outline">{agent.group}</Badge>
                <Badge variant={getStatusColor(agent.availability)}>
                  {agent.availability}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button onClick={onEdit} className="bg-primary text-primary-foreground">
            <Edit className="h-4 w-4 mr-2" />
            Edit Agent
          </Button>
          <Button variant="outline">
            <Key className="h-4 w-4 mr-2" />
            Reset Password
          </Button>
          <Button variant="outline" className="text-destructive hover:text-destructive">
            <UserX className="h-4 w-4 mr-2" />
            Disable Account
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="kpi-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="text-muted-foreground">Agent ID</label>
                  <div className="font-medium">{agent.id}</div>
                </div>
                <div>
                  <label className="text-muted-foreground">Login ID</label>
                  <div className="font-mono text-sm bg-muted px-2 py-1 rounded">
                    {agent.loginId}
                  </div>
                </div>
                <div>
                  <label className="text-muted-foreground">Caller ID</label>
                  <div className="flex items-center space-x-1">
                    <Phone className="h-3 w-3" />
                    <span className="font-mono">{agent.callerId}</span>
                  </div>
                </div>
                <div>
                  <label className="text-muted-foreground">Join Date</label>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(agent.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <div>
                  <label className="text-muted-foreground">Status</label>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      agent.enabled ? "bg-success" : "bg-destructive"
                    }`} />
                    <span>{agent.enabled ? "Enabled" : "Disabled"}</span>
                  </div>
                </div>
                <div>
                  <label className="text-muted-foreground">Last Active</label>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{agent.lastActive}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Summary */}
          <Card className="kpi-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <Star className="h-5 w-5 mr-2" />
                Performance Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">{agent.callsHandled}</div>
                  <div className="text-sm text-muted-foreground">Total Calls Handled</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-accent">{agent.avgHandleTime}</div>
                  <div className="text-sm text-muted-foreground">Avg. Handle Time</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-center space-x-1">
                    <Star className="h-5 w-5 text-warning fill-warning" />
                    <div className="text-2xl font-bold text-warning">{agent.csat}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">CSAT Rating</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity and Stats */}
        <div className="lg:col-span-2 space-y-6">
          {/* Call Statistics */}
          <Card className="chart-container">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Call Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground mb-2">Today</div>
                  <div className="space-y-1">
                    <div className="text-xl font-bold">{callStats.today.calls}</div>
                    <div className="text-xs text-muted-foreground">Calls</div>
                    <div className="text-sm">{callStats.today.duration}</div>
                    <div className="text-xs text-muted-foreground">Duration</div>
                  </div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground mb-2">This Week</div>
                  <div className="space-y-1">
                    <div className="text-xl font-bold">{callStats.week.calls}</div>
                    <div className="text-xs text-muted-foreground">Calls</div>
                    <div className="text-sm">{callStats.week.duration}</div>
                    <div className="text-xs text-muted-foreground">Duration</div>
                  </div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground mb-2">This Month</div>
                  <div className="space-y-1">
                    <div className="text-xl font-bold">{callStats.month.calls}</div>
                    <div className="text-xs text-muted-foreground">Calls</div>
                    <div className="text-sm">{callStats.month.duration}</div>
                    <div className="text-xs text-muted-foreground">Duration</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Log */}
          <Card className="chart-container">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {activityLog.map((log, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      log.type === "success" ? "bg-success" :
                      log.type === "warning" ? "bg-warning" :
                      log.type === "error" ? "bg-destructive" : "bg-primary"
                    }`} />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{log.action}</div>
                    </div>
                    <div className="text-xs text-muted-foreground">{log.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="chart-container">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <Key className="h-5 w-5" />
                  <span className="text-xs">Reset Password</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <Users className="h-5 w-5" />
                  <span className="text-xs">Change Group</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <Shield className="h-5 w-5" />
                  <span className="text-xs">Update Role</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2 text-destructive hover:text-destructive">
                  <UserX className="h-5 w-5" />
                  <span className="text-xs">Disable Account</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};