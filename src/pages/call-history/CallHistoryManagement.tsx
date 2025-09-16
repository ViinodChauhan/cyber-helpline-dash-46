import { useState } from "react";
import { CallHistoryList } from "@/components/call-history/CallHistoryList";
import { CallHistoryDetail } from "@/components/call-history/CallHistoryDetail";

export interface CallRecord {
  id: string;
  dateTime: string;
  name: string;
  phoneNumber: string;
  callType: "Inbound" | "Outbound";
  duration: string;
  ivrCategory: string;
  waitTime: string;
  agentTalkTime: string;
  disconnectionReason: string;
  agentName: string;
  recordingUrl?: string;
  rating?: number;
  callerInfo: {
    email?: string;
    location?: string;
    previousCalls?: number;
  };
  ivrPath: string[];
  timeline: {
    callStart: string;
    ivrStart?: string;
    ivrEnd?: string;
    waitStart?: string;
    waitEnd?: string;
    agentStart?: string;
    agentEnd?: string;
    callEnd: string;
  };
  csatRating?: {
    score: number;
    feedback?: string;
  };
}

export const CallHistoryManagement = () => {
  const [currentView, setCurrentView] = useState<"list" | "detail">("list");
  const [selectedCall, setSelectedCall] = useState<CallRecord | null>(null);

  const handleViewCall = (call: CallRecord) => {
    setSelectedCall(call);
    setCurrentView("detail");
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setSelectedCall(null);
  };

  const handleCreateTicket = (call: CallRecord) => {
    // Handle creating ticket from call record
    console.log("Creating ticket from call:", call.id);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {currentView === "list" && (
        <CallHistoryList onViewCall={handleViewCall} />
      )}
      
      {currentView === "detail" && selectedCall && (
        <CallHistoryDetail
          call={selectedCall}
          onBack={handleBackToList}
          onCreateTicket={() => handleCreateTicket(selectedCall)}
        />
      )}
    </div>
  );
};