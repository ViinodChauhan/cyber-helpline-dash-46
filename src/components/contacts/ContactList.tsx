import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search, Plus, Filter, Calendar as CalendarIcon, Edit, Eye, Trash2, Phone, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { Contact } from "@/pages/contacts/ContactManagement";

interface ContactListProps {
  onAddContact: () => void;
  onEditContact: (contact: Contact) => void;
  onViewContact: (contact: Contact) => void;
}

// Mock data
const mockContacts: Contact[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    email: "rajesh.kumar@email.com",
    gender: "Male",
    dob: "1985-06-15",
    state: "Delhi",
    district: "New Delhi",
    preferredContact: "Phone",
    address: "123 Main Street, Connaught Place, New Delhi",
    createdAt: "2024-01-15",
    lastActive: "2024-01-20"
  },
  {
    id: "2",
    name: "Priya Sharma",
    phone: "+91 87654 32109",
    email: "priya.sharma@email.com",
    gender: "Female",
    dob: "1990-03-22",
    state: "Maharashtra",
    district: "Mumbai",
    preferredContact: "Email",
    address: "456 Park Avenue, Bandra, Mumbai",
    createdAt: "2024-01-16",
    lastActive: "2024-01-21"
  },
  {
    id: "3",
    name: "Amit Singh",
    phone: "+91 76543 21098",
    email: "amit.singh@email.com",
    gender: "Male",
    dob: "1988-11-08",
    state: "Karnataka",
    district: "Bangalore",
    preferredContact: "WhatsApp",
    address: "789 Tech Park, Electronic City, Bangalore",
    createdAt: "2024-01-17",
    lastActive: "2024-01-22"
  }
];

export const ContactList = ({ onAddContact, onEditContact, onViewContact }: ContactListProps) => {
  const [contacts] = useState<Contact[]>(mockContacts);
  const [searchTerm, setSearchTerm] = useState("");
  const [stateFilter, setStateFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesState = stateFilter === "all" || contact.state === stateFilter;
    const matchesGender = genderFilter === "all" || contact.gender === genderFilter;
    
    return matchesSearch && matchesState && matchesGender;
  });

  const getPreferredContactBadge = (method: string) => {
    const variants = {
      Phone: "default",
      Email: "secondary", 
      WhatsApp: "outline",
      SMS: "destructive"
    } as const;
    
    return (
      <Badge variant={variants[method as keyof typeof variants] || "default"}>
        {method}
      </Badge>
    );
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Contact Management</h1>
          <p className="text-muted-foreground">Manage customer contacts and communication</p>
        </div>
        <Button onClick={onAddContact} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Contact
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* State Filter */}
            <Select value={stateFilter} onValueChange={setStateFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                <SelectItem value="Delhi">Delhi</SelectItem>
                <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                <SelectItem value="Karnataka">Karnataka</SelectItem>
                <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                <SelectItem value="Gujarat">Gujarat</SelectItem>
              </SelectContent>
            </Select>

            {/* Gender Filter */}
            <Select value={genderFilter} onValueChange={setGenderFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genders</SelectItem>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>

            {/* Date Range */}
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "flex-1 justify-start text-left font-normal",
                      !dateFrom && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFrom ? format(dateFrom, "PPP") : "From"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateFrom}
                    onSelect={setDateFrom}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contacts Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Contacts ({filteredContacts.length})</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead>District</TableHead>
                  <TableHead>Preferred Contact</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell className="font-medium">{contact.name}</TableCell>
                    <TableCell>{contact.phone}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.gender}</TableCell>
                    <TableCell>{contact.state}</TableCell>
                    <TableCell>{contact.district}</TableCell>
                    <TableCell>{getPreferredContactBadge(contact.preferredContact)}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onViewContact(contact)}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEditContact(contact)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
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