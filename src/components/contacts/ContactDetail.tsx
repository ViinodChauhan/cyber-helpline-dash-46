import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Edit, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  User,
  MessageSquare,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import { format } from "date-fns";
import type { Contact } from "@/pages/contacts/ContactManagement";

interface ContactDetailProps {
  contact: Contact;
  onBack: () => void;
  onEdit: () => void;
}

// Mock communication history
const mockHistory = [
  {
    id: "1",
    type: "call",
    direction: "inbound",
    datetime: "2024-01-20 14:30",
    duration: "5m 32s",
    status: "completed",
    notes: "Reported online fraud incident"
  },
  {
    id: "2",
    type: "email",
    direction: "outbound",
    datetime: "2024-01-19 11:15",
    subject: "Follow-up on your cyber crime report",
    status: "delivered"
  },
  {
    id: "3",
    type: "whatsapp",
    direction: "outbound",
    datetime: "2024-01-18 16:45",
    message: "Hello, this is regarding your complaint #CC2024001",
    status: "read"
  }
];

// Mock linked tickets
const mockTickets = [
  {
    id: "CC2024001",
    title: "Online Banking Fraud",
    status: "in-progress",
    priority: "high",
    createdAt: "2024-01-15",
    assignedTo: "Agent Ravi Kumar"
  },
  {
    id: "CC2024045",
    title: "Phishing Email Report",
    status: "resolved",
    priority: "medium",
    createdAt: "2024-01-10",
    assignedTo: "Agent Priya Singh"
  }
];

export const ContactDetail = ({ contact, onBack, onEdit }: ContactDetailProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
      case "delivered":
      case "read":
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-warning" />;
      case "failed":
      case "cancelled":
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      "completed": "default",
      "in-progress": "secondary",
      "resolved": "default",
      "cancelled": "destructive",
      "high": "destructive",
      "medium": "secondary",
      "low": "outline"
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || "outline"}>
        {status.replace("-", " ").toUpperCase()}
      </Badge>
    );
  };

  const getCommunicationIcon = (type: string) => {
    switch (type) {
      case "call":
        return <Phone className="h-4 w-4" />;
      case "email":
        return <Mail className="h-4 w-4" />;
      case "whatsapp":
      case "sms":
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Contacts
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{contact.name}</h1>
            <p className="text-muted-foreground">Contact Details & Communication History</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Plus className="h-4 w-4" />
            Create Ticket
          </Button>
          <Button onClick={onEdit} className="gap-2">
            <Edit className="h-4 w-4" />
            Edit Contact
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Profile */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Contact Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{contact.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{contact.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{contact.district}, {contact.state}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date of Birth</p>
                    <p className="font-medium">{format(new Date(contact.dob), "PPP")}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Gender</p>
                    <p className="font-medium">{contact.gender}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Preferred Contact</p>
                    <Badge variant="outline">{contact.preferredContact}</Badge>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm text-muted-foreground mb-2">Address</p>
                <p className="text-sm">{contact.address}</p>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Created</p>
                  <p className="font-medium">{format(new Date(contact.createdAt), "PPP")}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Last Active</p>
                  <p className="font-medium">{format(new Date(contact.lastActive), "PPP")}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Linked Tickets */}
          <Card>
            <CardHeader>
              <CardTitle>Linked Tickets ({mockTickets.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockTickets.map((ticket) => (
                  <div key={ticket.id} className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-sm">{ticket.id}</p>
                        <p className="text-xs text-muted-foreground">{ticket.title}</p>
                      </div>
                      <div className="flex gap-2">
                        {getStatusBadge(ticket.status)}
                        {getStatusBadge(ticket.priority)}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Assigned to {ticket.assignedTo}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Communication History */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Communication History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockHistory.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        {getCommunicationIcon(item.type)}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-sm capitalize">
                            {item.type} - {item.direction}
                          </h4>
                          {getStatusIcon(item.status)}
                          {getStatusBadge(item.status)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {item.datetime}
                        </p>
                      </div>
                      
                      <div className="space-y-1">
                        {item.duration && (
                          <p className="text-sm text-muted-foreground">
                            Duration: {item.duration}
                          </p>
                        )}
                        {item.subject && (
                          <p className="text-sm">
                            <span className="text-muted-foreground">Subject:</span> {item.subject}
                          </p>
                        )}
                        {item.message && (
                          <p className="text-sm">
                            <span className="text-muted-foreground">Message:</span> {item.message}
                          </p>
                        )}
                        {item.notes && (
                          <p className="text-sm">
                            <span className="text-muted-foreground">Notes:</span> {item.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};