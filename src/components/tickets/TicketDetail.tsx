import { useState } from "react";
import { ArrowLeft, Edit, Upload, MessageSquare, Phone, Mail, Clock, User, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Ticket } from "@/pages/tickets/TicketManagement";

interface TicketDetailProps {
  ticket: Ticket;
  onEdit: () => void;
  onBack: () => void;
}

interface Remark {
  id: string;
  agentName: string;
  timestamp: string;
  status: string;
  comment: string;
}

interface CommunicationRecord {
  id: string;
  type: "call" | "email" | "sms" | "whatsapp";
  timestamp: string;
  duration?: string;
  subject?: string;
  content: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadedOn: string;
}

// Mock data
const mockRemarks: Remark[] = [
  {
    id: "1",
    agentName: "Agent Smith",
    timestamp: "2024-01-15 10:30",
    status: "Open",
    comment: "Initial ticket created. Assigned to investigation team."
  },
  {
    id: "2", 
    agentName: "Agent Jones",
    timestamp: "2024-01-16 14:20",
    status: "In Progress",
    comment: "Contacted victim for additional details. Awaiting response."
  }
];

const mockCommunications: CommunicationRecord[] = [
  {
    id: "1",
    type: "call",
    timestamp: "2024-01-15 11:00",
    duration: "8:30",
    content: "Initial complaint registered. Victim reported UPI fraud of ₹25,000."
  },
  {
    id: "2",
    type: "email",
    timestamp: "2024-01-16 09:15",
    subject: "Additional Documents Required",
    content: "Sent email requesting bank statements and screenshots of fraudulent transactions."
  }
];

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "bank_statement.pdf",
    type: "PDF",
    size: "2.5 MB",
    uploadedBy: "Rajesh Kumar",
    uploadedOn: "2024-01-16"
  },
  {
    id: "2",
    name: "transaction_screenshot.jpg",
    type: "Image",
    size: "450 KB", 
    uploadedBy: "Agent Smith",
    uploadedOn: "2024-01-17"
  }
];

export const TicketDetail = ({ ticket, onEdit, onBack }: TicketDetailProps) => {
  const [newRemark, setNewRemark] = useState("");
  const [newStatus, setNewStatus] = useState<string>(ticket.status);

  const getStatusBadge = (status: string) => {
    const variants = {
      "Open": "default",
      "In Progress": "secondary",
      "Resolved": "outline", 
      "Closed": "destructive"
    } as const;
    return <Badge variant={variants[status as keyof typeof variants] || "default"}>{status}</Badge>;
  };

  const getCommunicationIcon = (type: string) => {
    switch (type) {
      case "call": return <Phone className="h-4 w-4" />;
      case "email": return <Mail className="h-4 w-4" />;
      case "sms": return <MessageSquare className="h-4 w-4" />;
      case "whatsapp": return <MessageSquare className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const handleAddRemark = () => {
    if (newRemark.trim()) {
      // Handle adding remark logic here
      console.log("Adding remark:", newRemark);
      setNewRemark("");
    }
  };

  const handleStatusChange = () => {
    // Handle status change logic here
    console.log("Changing status to:", newStatus);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tickets
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Ticket Details</h1>
            <p className="text-muted-foreground">Ticket ID: {ticket.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Ticket
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Ticket Metadata */}
          <Card>
            <CardHeader>
              <CardTitle>Ticket Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(ticket.status)}
                    <Select value={newStatus} onValueChange={setNewStatus}>
                      <SelectTrigger className="w-[120px] h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Open">Open</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Resolved">Resolved</SelectItem>
                        <SelectItem value="Closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                    {newStatus !== ticket.status && (
                      <Button size="sm" onClick={handleStatusChange}>
                        Update
                      </Button>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Assigned Agent</p>
                  <p className="font-medium">{ticket.agentName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Created On</p>
                  <p className="font-medium">{ticket.createdOn}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Closed On</p>
                  <p className="font-medium">{ticket.closedOn || "Not closed"}</p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <p className="text-sm text-muted-foreground mb-2">Category</p>
                <Badge variant="outline">{ticket.category}</Badge>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-2">Subject</p>
                <p className="font-medium">{ticket.subject}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-2">Description</p>
                <p className="text-sm">{ticket.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Document Upload */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Documents & Evidence</CardTitle>
                <Button size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Document
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockDocuments.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {doc.size} • Uploaded by {doc.uploadedBy} on {doc.uploadedOn}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Communication History */}
          <Card>
            <CardHeader>
              <CardTitle>Communication History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCommunications.map((comm) => (
                  <div key={comm.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="p-2 bg-muted rounded-full">
                      {getCommunicationIcon(comm.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium capitalize">{comm.type}</p>
                        {comm.duration && (
                          <Badge variant="outline" className="text-xs">
                            {comm.duration}
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 inline mr-1" />
                          {comm.timestamp}
                        </span>
                      </div>
                      {comm.subject && (
                        <p className="text-sm font-medium mb-1">{comm.subject}</p>
                      )}
                      <p className="text-sm text-muted-foreground">{comm.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Contact & Remarks */}
        <div className="space-y-6">
          {/* Contact Details */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{ticket.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{ticket.phoneNumber}</p>
              </div>
              {ticket.email && (
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{ticket.email}</p>
                </div>
              )}
              {ticket.gender && (
                <div>
                  <p className="text-sm text-muted-foreground">Gender</p>
                  <p className="font-medium">{ticket.gender}</p>
                </div>
              )}
              {ticket.state && (
                <div>
                  <p className="text-sm text-muted-foreground">State</p>
                  <p className="font-medium">{ticket.state}</p>
                </div>
              )}
              {ticket.district && (
                <div>
                  <p className="text-sm text-muted-foreground">District</p>
                  <p className="font-medium">{ticket.district}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Remarks Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Remarks & Status History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {mockRemarks.map((remark) => (
                  <div key={remark.id} className="border-l-2 border-primary pl-4 pb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <User className="h-3 w-3" />
                      <p className="text-sm font-medium">{remark.agentName}</p>
                      <Badge variant="outline" className="text-xs">{remark.status}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{remark.timestamp}</p>
                    <p className="text-sm">{remark.comment}</p>
                  </div>
                ))}
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <Textarea
                  placeholder="Add a remark..."
                  value={newRemark}
                  onChange={(e) => setNewRemark(e.target.value)}
                  rows={3}
                />
                <Button size="sm" onClick={handleAddRemark} disabled={!newRemark.trim()}>
                  Add Remark
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};