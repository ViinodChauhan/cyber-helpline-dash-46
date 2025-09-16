import { useState } from "react";
import { Plus, Search, Eye, Edit, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Ticket } from "@/pages/tickets/TicketManagement";

interface TicketListProps {
  onCreateTicket: () => void;
  onEditTicket: (ticket: Ticket) => void;
  onViewTicket: (ticket: Ticket) => void;
}

// Mock data
const mockTickets: Ticket[] = [
  {
    id: "TKT001",
    name: "Rajesh Kumar",
    phoneNumber: "+91 9876543210",
    createdOn: "2024-01-15",
    closedOn: "2024-01-20",
    category: "Online Fraud",
    agentName: "Agent Smith",
    status: "Closed",
    subject: "UPI Fraud Report",
    description: "Fraudulent transaction through UPI",
    email: "rajesh@email.com",
    gender: "Male",
    state: "Delhi",
    district: "Central Delhi"
  },
  {
    id: "TKT002",
    name: "Priya Sharma",
    phoneNumber: "+91 9876543211",
    createdOn: "2024-01-16",
    category: "Cyber Bullying",
    agentName: "Agent Jones",
    status: "In Progress",
    subject: "Social Media Harassment",
    description: "Harassment on social media platform",
    email: "priya@email.com",
    gender: "Female",
    state: "Maharashtra",
    district: "Mumbai"
  },
  {
    id: "TKT003",
    name: "Mohammed Ali",
    phoneNumber: "+91 9876543212",
    createdOn: "2024-01-17",
    category: "Identity Theft",
    agentName: "Agent Brown",
    status: "Open",
    subject: "Aadhaar Misuse",
    description: "Unauthorized use of Aadhaar details",
    email: "mohammed@email.com",
    gender: "Male",
    state: "Karnataka",
    district: "Bangalore"
  }
];

export const TicketList = ({ onCreateTicket, onEditTicket, onViewTicket }: TicketListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [agentFilter, setAgentFilter] = useState("");

  const getStatusBadge = (status: string) => {
    const variants = {
      "Open": "default",
      "In Progress": "secondary", 
      "Resolved": "outline",
      "Closed": "destructive"
    } as const;
    return <Badge variant={variants[status as keyof typeof variants] || "default"}>{status}</Badge>;
  };

  const filteredTickets = mockTickets.filter(ticket => {
    return (
      ticket.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.phoneNumber.includes(searchTerm) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
    ) &&
    (categoryFilter === "all" || categoryFilter === "" || ticket.category === categoryFilter) &&
    (statusFilter === "all" || statusFilter === "" || ticket.status === statusFilter) &&
    (agentFilter === "all" || agentFilter === "" || ticket.agentName === agentFilter);
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Ticket Management</h1>
          <p className="text-muted-foreground">Manage and track all support tickets</p>
        </div>
        <Button onClick={onCreateTicket} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Ticket
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tickets</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, phone, or ticket ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Online Fraud">Online Fraud</SelectItem>
                <SelectItem value="Cyber Bullying">Cyber Bullying</SelectItem>
                <SelectItem value="Identity Theft">Identity Theft</SelectItem>
                <SelectItem value="Data Breach">Data Breach</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={agentFilter} onValueChange={setAgentFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Agent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agents</SelectItem>
                <SelectItem value="Agent Smith">Agent Smith</SelectItem>
                <SelectItem value="Agent Jones">Agent Jones</SelectItem>
                <SelectItem value="Agent Brown">Agent Brown</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tickets Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead>Created On</TableHead>
                  <TableHead>Closed On</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Agent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-medium">{ticket.id}</TableCell>
                    <TableCell>{ticket.name}</TableCell>
                    <TableCell>{ticket.phoneNumber}</TableCell>
                    <TableCell>{ticket.createdOn}</TableCell>
                    <TableCell>{ticket.closedOn || "-"}</TableCell>
                    <TableCell>{ticket.category}</TableCell>
                    <TableCell>{ticket.agentName}</TableCell>
                    <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{ticket.subject}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onViewTicket(ticket)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onEditTicket(ticket)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Ticket
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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