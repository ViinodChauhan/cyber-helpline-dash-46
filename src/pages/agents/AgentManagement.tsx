import { useState } from "react";
import { AgentList } from "@/components/agents/AgentList";
import { AgentForm } from "@/components/agents/AgentForm";
import { AgentDetail } from "@/components/agents/AgentDetail";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, Shield } from "lucide-react";

export type Agent = {
  id: string;
  name: string;
  role: "Agent" | "Supervisor" | "Admin";
  loginId: string;
  callerId: string;
  group: string;
  enabled: boolean;
  loggedIn: boolean;
  availability: "Available" | "Busy" | "Away" | "Offline";
  lastActive: string;
  joinDate: string;
  callsHandled: number;
  avgHandleTime: string;
  csat: number;
};

// Mock data
const mockAgents: Agent[] = [
  {
    id: "AG001",
    name: "Rajesh Kumar",
    role: "Agent",
    loginId: "rajesh.kumar",
    callerId: "1001",
    group: "Fraud Team",
    enabled: true,
    loggedIn: true,
    availability: "Available",
    lastActive: "2 mins ago",
    joinDate: "2023-06-15",
    callsHandled: 1247,
    avgHandleTime: "4:32",
    csat: 4.8
  },
  {
    id: "AG002",
    name: "Priya Sharma",
    role: "Supervisor",
    loginId: "priya.sharma",
    callerId: "2001",
    group: "Fraud Team",
    enabled: true,
    loggedIn: true,
    availability: "Busy",
    lastActive: "Just now",
    joinDate: "2023-04-10",
    callsHandled: 892,
    avgHandleTime: "5:12",
    csat: 4.6
  },
  {
    id: "AG003",
    name: "Amit Patel",
    role: "Agent",
    loginId: "amit.patel",
    callerId: "1003",
    group: "Phishing Team",
    enabled: true,
    loggedIn: false,
    availability: "Offline",
    lastActive: "1 hour ago",
    joinDate: "2023-08-20",
    callsHandled: 678,
    avgHandleTime: "3:45",
    csat: 4.9
  },
  {
    id: "AG004",
    name: "Sunita Singh",
    role: "Agent",
    loginId: "sunita.singh",
    callerId: "1004",
    group: "Identity Team",
    enabled: false,
    loggedIn: false,
    availability: "Offline",
    lastActive: "3 days ago",
    joinDate: "2023-05-22",
    callsHandled: 456,
    avgHandleTime: "4:18",
    csat: 4.7
  },
  {
    id: "AG005",
    name: "Vikram Gupta",
    role: "Admin",
    loginId: "vikram.gupta",
    callerId: "3001",
    group: "Management",
    enabled: true,
    loggedIn: true,
    availability: "Away",
    lastActive: "15 mins ago",
    joinDate: "2023-01-10",
    callsHandled: 234,
    avgHandleTime: "4:56",
    csat: 4.5
  }
];

export const AgentManagement = () => {
  const [agents, setAgents] = useState<Agent[]>(mockAgents);
  const [view, setView] = useState<"list" | "form" | "detail">("list");
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddAgent = () => {
    setSelectedAgent(null);
    setIsEditing(false);
    setView("form");
  };

  const handleEditAgent = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsEditing(true);
    setView("form");
  };

  const handleViewAgent = (agent: Agent) => {
    setSelectedAgent(agent);
    setView("detail");
  };

  const handleDeleteAgent = (agentId: string) => {
    setAgents(agents.filter(a => a.id !== agentId));
  };

  const handleSaveAgent = (agentData: Partial<Agent>) => {
    if (isEditing && selectedAgent) {
      setAgents(agents.map(a => 
        a.id === selectedAgent.id 
          ? { ...a, ...agentData }
          : a
      ));
    } else {
      const newAgent: Agent = {
        id: `AG${String(agents.length + 1).padStart(3, '0')}`,
        joinDate: new Date().toISOString().split('T')[0],
        callsHandled: 0,
        avgHandleTime: "0:00",
        csat: 0,
        lastActive: "Never",
        availability: "Offline",
        loggedIn: false,
        ...agentData as Agent
      };
      setAgents([...agents, newAgent]);
    }
    setView("list");
  };

  const handleCancel = () => {
    setView("list");
    setSelectedAgent(null);
    setIsEditing(false);
  };

  const activeAgents = agents.filter(a => a.loggedIn).length;
  const totalAgents = agents.length;
  const enabledAgents = agents.filter(a => a.enabled).length;

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Agent Management</h1>
              <p className="text-muted-foreground">Manage agents, roles, and permissions</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-success-light text-success">
              <Users className="h-3 w-3 mr-1" />
              {activeAgents} Active
            </Badge>
            <Badge variant="outline">
              {enabledAgents}/{totalAgents} Enabled
            </Badge>
          </div>
          
          {view === "list" && (
            <Button onClick={handleAddAgent} className="bg-primary text-primary-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Add Agent
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      {view === "list" && (
        <AgentList
          agents={agents}
          onEdit={handleEditAgent}
          onView={handleViewAgent}
          onDelete={handleDeleteAgent}
        />
      )}

      {view === "form" && (
        <AgentForm
          agent={selectedAgent}
          isEditing={isEditing}
          onSave={handleSaveAgent}
          onCancel={handleCancel}
        />
      )}

      {view === "detail" && selectedAgent && (
        <AgentDetail
          agent={selectedAgent}
          onEdit={() => handleEditAgent(selectedAgent)}
          onBack={() => setView("list")}
        />
      )}
    </div>
  );
};