import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Search, 
  Filter, 
  Edit, 
  Eye, 
  Trash2, 
  Phone,
  Activity,
  Clock,
  Shield,
  UserCheck,
  Users
} from "lucide-react";
import { Agent } from "@/pages/agents/AgentManagement";

interface AgentListProps {
  agents: Agent[];
  onEdit: (agent: Agent) => void;
  onView: (agent: Agent) => void;
  onDelete: (agentId: string) => void;
}

const getStatusColor = (availability: string) => {
  switch (availability) {
    case "Available":
      return "default";
    case "Busy":
      return "outline";
    case "Away":
      return "secondary";
    case "Offline":
      return "destructive";
    default:
      return "secondary";
  }
};

const getStatusIcon = (availability: string) => {
  switch (availability) {
    case "Available":
      return <Activity className="h-3 w-3" />;
    case "Busy":
      return <Phone className="h-3 w-3" />;
    case "Away":
      return <Clock className="h-3 w-3" />;
    case "Offline":
      return <div className="h-3 w-3 rounded-full bg-muted" />;
    default:
      return <Activity className="h-3 w-3" />;
  }
};

const getRoleIcon = (role: string) => {
  switch (role) {
    case "Admin":
      return <Shield className="h-4 w-4 text-destructive" />;
    case "Supervisor":
      return <UserCheck className="h-4 w-4 text-warning" />;
    case "Agent":
      return <Users className="h-4 w-4 text-primary" />;
    default:
      return <Users className="h-4 w-4" />;
  }
};

export const AgentList = ({ agents, onEdit, onView, onDelete }: AgentListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [groupFilter, setGroupFilter] = useState<string>("all");
  const [availabilityFilter, setAvailabilityFilter] = useState<string>("all");

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.loginId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || agent.role === roleFilter;
    const matchesGroup = groupFilter === "all" || agent.group === groupFilter;
    const matchesAvailability = availabilityFilter === "all" || agent.availability === availabilityFilter;
    
    return matchesSearch && matchesRole && matchesGroup && matchesAvailability;
  });

  const groups = [...new Set(agents.map(a => a.group))];
  const roles = [...new Set(agents.map(a => a.role))];
  const availabilities = [...new Set(agents.map(a => a.availability))];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="chart-container">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or login ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Role</label>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  {roles.map(role => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Group</label>
              <Select value={groupFilter} onValueChange={setGroupFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Groups" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Groups</SelectItem>
                  {groups.map(group => (
                    <SelectItem key={group} value={group}>{group}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Availability</label>
              <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {availabilities.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Agent Table */}
      <Card className="chart-container">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center justify-between">
            <span className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Agents ({filteredAgents.length})
            </span>
            <div className="text-sm text-muted-foreground">
              {filteredAgents.filter(a => a.loggedIn).length} currently logged in
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agent</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Login ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Caller ID</TableHead>
                  <TableHead>Group</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAgents.map((agent) => (
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
                      <div className="flex items-center space-x-2">
                        {getRoleIcon(agent.role)}
                        <span className="font-medium">{agent.role}</span>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {agent.loginId}
                      </code>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch checked={agent.enabled} disabled />
                        <div className="flex items-center space-x-1">
                          <div className={`w-2 h-2 rounded-full ${
                            agent.loggedIn ? "bg-success animate-pulse" : "bg-muted"
                          }`} />
                          <span className="text-xs">
                            {agent.loggedIn ? "Online" : "Offline"}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span className="font-mono text-sm">{agent.callerId}</span>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {agent.group}
                      </Badge>
                    </TableCell>
                    
                    <TableCell>
                      <Badge variant={getStatusColor(agent.availability)} className="flex items-center space-x-1 w-fit">
                        {getStatusIcon(agent.availability)}
                        <span>{agent.availability}</span>
                      </Badge>
                    </TableCell>
                    
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {agent.lastActive}
                      </span>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onView(agent)}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit(agent)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDelete(agent.id)}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};