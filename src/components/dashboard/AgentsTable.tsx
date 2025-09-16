import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Phone, Clock, Star, Activity } from "lucide-react";

const agentsData = [
  {
    id: "AG001",
    name: "Rajesh Kumar",
    status: "online",
    callsToday: 45,
    avgHandleTime: "4:32",
    csat: 4.8,
    currentCall: "Banking Fraud - 00:02:34",
    efficiency: 94
  },
  {
    id: "AG002", 
    name: "Priya Sharma",
    status: "on-call",
    callsToday: 38,
    avgHandleTime: "5:12",
    csat: 4.6,
    currentCall: "Identity Theft - 00:01:23",
    efficiency: 89
  },
  {
    id: "AG003",
    name: "Amit Patel",
    status: "online",
    callsToday: 52,
    avgHandleTime: "3:45",
    csat: 4.9,
    currentCall: "Available",
    efficiency: 97
  },
  {
    id: "AG004",
    name: "Sunita Singh",
    status: "break",
    callsToday: 29,
    avgHandleTime: "4:18",
    csat: 4.7,
    currentCall: "On Break - Back in 8 min",
    efficiency: 91
  },
  {
    id: "AG005",
    name: "Vikram Gupta",
    status: "on-call",
    callsToday: 41,
    avgHandleTime: "4:56",
    csat: 4.5,
    currentCall: "Phishing Report - 00:05:12",
    efficiency: 85
  },
  {
    id: "AG006",
    name: "Neha Verma",
    status: "offline",
    callsToday: 33,
    avgHandleTime: "4:02",
    csat: 4.8,
    currentCall: "Shift Ended",
    efficiency: 93
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "online":
      return "default";
    case "on-call":
      return "outline";
    case "break":
      return "secondary";
    case "offline":
      return "destructive";
    default:
      return "secondary";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "online":
      return <Activity className="h-3 w-3" />;
    case "on-call":
      return <Phone className="h-3 w-3" />;
    case "break":
      return <Clock className="h-3 w-3" />;
    case "offline":
      return <div className="h-3 w-3 rounded-full bg-muted" />;
    default:
      return <Activity className="h-3 w-3" />;
  }
};

export const AgentsTable = () => {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Agent Performance</h2>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-success"></div>
            <span>Online</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-warning"></div>
            <span>On Call</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-muted-foreground"></div>
            <span>Break</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-destructive"></div>
            <span>Offline</span>
          </div>
        </div>
      </div>

      <Card className="chart-container">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center">
            👥 Real-time Agent Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Calls Today</TableHead>
                <TableHead>Avg. Handle Time</TableHead>
                <TableHead>CSAT Rating</TableHead>
                <TableHead>Efficiency</TableHead>
                <TableHead>Current Activity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agentsData.map((agent) => (
                <TableRow key={agent.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                          {agent.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{agent.name}</div>
                        <div className="text-xs text-muted-foreground">{agent.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(agent.status)} className="flex items-center space-x-1 w-fit">
                      {getStatusIcon(agent.status)}
                      <span className="capitalize">{agent.status}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">{agent.callsToday}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{agent.avgHandleTime}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-warning fill-warning" />
                      <span className="font-semibold">{agent.csat}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-12 bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            agent.efficiency >= 95 ? "bg-success" :
                            agent.efficiency >= 90 ? "bg-warning" : "bg-destructive"
                          }`}
                          style={{ width: `${agent.efficiency}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold">{agent.efficiency}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`text-sm ${
                      agent.status === "on-call" ? "text-warning font-medium" :
                      agent.status === "online" ? "text-success" :
                      "text-muted-foreground"
                    }`}>
                      {agent.currentCall}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
};