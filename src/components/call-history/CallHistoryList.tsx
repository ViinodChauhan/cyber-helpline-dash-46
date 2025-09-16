import { useState } from "react";
import { Search, Calendar, Star, Phone, Clock, Play, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CallRecord } from "@/pages/call-history/CallHistoryManagement";

interface CallHistoryListProps {
  onViewCall: (call: CallRecord) => void;
}

// Mock data
const mockCalls: CallRecord[] = [
  {
    id: "CALL001",
    dateTime: "2024-01-15 10:30:45",
    name: "Rajesh Kumar",
    phoneNumber: "+91 9876543210",
    callType: "Inbound",
    duration: "08:30",
    ivrCategory: "Cyber Crime Report",
    waitTime: "02:15",
    agentTalkTime: "06:15",
    disconnectionReason: "Customer Hang Up",
    agentName: "Agent Smith",
    recordingUrl: "/recordings/call001.mp3",
    rating: 4,
    callerInfo: {
      email: "rajesh@email.com",
      location: "Delhi",
      previousCalls: 2
    },
    ivrPath: ["Main Menu", "Cyber Crime", "Online Fraud", "Report"],
    timeline: {
      callStart: "10:30:45",
      ivrStart: "10:30:50",
      ivrEnd: "10:32:30",
      waitStart: "10:32:30",
      waitEnd: "10:34:45",
      agentStart: "10:34:45",
      agentEnd: "10:39:15",
      callEnd: "10:39:15"
    },
    csatRating: {
      score: 4,
      feedback: "Agent was helpful and resolved my issue quickly"
    }
  },
  {
    id: "CALL002",
    dateTime: "2024-01-15 11:15:20",
    name: "Priya Sharma",
    phoneNumber: "+91 9876543211",
    callType: "Inbound",
    duration: "12:45",
    ivrCategory: "Technical Support",
    waitTime: "03:20",
    agentTalkTime: "09:25",
    disconnectionReason: "Call Completed",
    agentName: "Agent Jones",
    recordingUrl: "/recordings/call002.mp3",
    rating: 5,
    callerInfo: {
      email: "priya@email.com",
      location: "Mumbai",
      previousCalls: 0
    },
    ivrPath: ["Main Menu", "Technical Support", "Portal Issues"],
    timeline: {
      callStart: "11:15:20",
      ivrStart: "11:15:25",
      ivrEnd: "11:16:45",
      waitStart: "11:16:45",
      waitEnd: "11:20:05",
      agentStart: "11:20:05",
      agentEnd: "11:28:05",
      callEnd: "11:28:05"
    },
    csatRating: {
      score: 5,
      feedback: "Excellent service, very professional"
    }
  },
  {
    id: "CALL003",
    dateTime: "2024-01-15 14:22:10",
    name: "Mohammed Ali",
    phoneNumber: "+91 9876543212",
    callType: "Outbound",
    duration: "05:30",
    ivrCategory: "Follow-up",
    waitTime: "00:00",
    agentTalkTime: "05:30",
    disconnectionReason: "Call Completed",
    agentName: "Agent Brown",
    recordingUrl: "/recordings/call003.mp3",
    rating: 3,
    callerInfo: {
      email: "mohammed@email.com",
      location: "Bangalore",
      previousCalls: 1
    },
    ivrPath: [],
    timeline: {
      callStart: "14:22:10",
      agentStart: "14:22:10",
      agentEnd: "14:27:40",
      callEnd: "14:27:40"
    }
  }
];

export const CallHistoryList = ({ onViewCall }: CallHistoryListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [agentFilter, setAgentFilter] = useState("");
  const [callTypeFilter, setCallTypeFilter] = useState("");
  const [ivrCategoryFilter, setIvrCategoryFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");

  const getCallTypeBadge = (type: string) => {
    return type === "Inbound" ? 
      <Badge variant="default">Inbound</Badge> : 
      <Badge variant="secondary">Outbound</Badge>;
  };

  const getRatingStars = (rating?: number) => {
    if (!rating) return <span className="text-muted-foreground">No rating</span>;
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-3 w-3 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
          />
        ))}
        <span className="text-sm ml-1">({rating})</span>
      </div>
    );
  };

  const formatDuration = (duration: string) => {
    return (
      <div className="flex items-center gap-1">
        <Clock className="h-3 w-3 text-muted-foreground" />
        {duration}
      </div>
    );
  };

  const filteredCalls = mockCalls.filter(call => {
    return (
      call.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      call.phoneNumber.includes(searchTerm) ||
      call.id.toLowerCase().includes(searchTerm.toLowerCase())
    ) &&
    (agentFilter === "all" || agentFilter === "" || call.agentName === agentFilter) &&
    (callTypeFilter === "all" || callTypeFilter === "" || call.callType === callTypeFilter) &&
    (ivrCategoryFilter === "all" || ivrCategoryFilter === "" || call.ivrCategory === ivrCategoryFilter) &&
    (ratingFilter === "all" || ratingFilter === "" || 
      (ratingFilter === "5" && call.rating === 5) ||
      (ratingFilter === "4" && call.rating === 4) ||
      (ratingFilter === "3" && call.rating === 3) ||
      (ratingFilter === "2" && call.rating === 2) ||
      (ratingFilter === "1" && call.rating === 1) ||
      (ratingFilter === "0" && !call.rating)
    );
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Call History</h1>
          <p className="text-muted-foreground">View and analyze all call records</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Call Records</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, phone, or call ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[140px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Dates</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
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

            <Select value={callTypeFilter} onValueChange={setCallTypeFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Call Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Inbound">Inbound</SelectItem>
                <SelectItem value="Outbound">Outbound</SelectItem>
              </SelectContent>
            </Select>

            <Select value={ivrCategoryFilter} onValueChange={setIvrCategoryFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="IVR Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Cyber Crime Report">Cyber Crime Report</SelectItem>
                <SelectItem value="Technical Support">Technical Support</SelectItem>
                <SelectItem value="Follow-up">Follow-up</SelectItem>
              </SelectContent>
            </Select>

            <Select value={ratingFilter} onValueChange={setRatingFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
                <SelectItem value="0">No Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Calls Table */}
          <div className="border rounded-lg overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead>Call Type</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>IVR Category</TableHead>
                  <TableHead>Wait Time</TableHead>
                  <TableHead>Agent Talk Time</TableHead>
                  <TableHead>Disconnection</TableHead>
                  <TableHead>Agent</TableHead>
                  <TableHead>Recording</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCalls.map((call) => (
                  <TableRow key={call.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{call.dateTime}</TableCell>
                    <TableCell>{call.name}</TableCell>
                    <TableCell>{call.phoneNumber}</TableCell>
                    <TableCell>{getCallTypeBadge(call.callType)}</TableCell>
                    <TableCell>{formatDuration(call.duration)}</TableCell>
                    <TableCell>{call.ivrCategory}</TableCell>
                    <TableCell>{formatDuration(call.waitTime)}</TableCell>
                    <TableCell>{formatDuration(call.agentTalkTime)}</TableCell>
                    <TableCell className="max-w-[120px] truncate">{call.disconnectionReason}</TableCell>
                    <TableCell>{call.agentName}</TableCell>
                    <TableCell>
                      {call.recordingUrl && (
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm">
                            <Play className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{getRatingStars(call.rating)}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onViewCall(call)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredCalls.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No call records found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};