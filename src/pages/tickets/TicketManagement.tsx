import { useState } from "react";
import { TicketList } from "@/components/tickets/TicketList";
import { TicketForm } from "@/components/tickets/TicketForm";
import { TicketDetail } from "@/components/tickets/TicketDetail";

export interface Ticket {
  id: string;
  name: string;
  phoneNumber: string;
  createdOn: string;
  closedOn?: string;
  category: string;
  agentName: string;
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  subject: string;
  description: string;
  email?: string;
  gender?: string;
  state?: string;
  district?: string;
  preferredMethod?: string;
}

export const TicketManagement = () => {
  const [currentView, setCurrentView] = useState<"list" | "form" | "detail">("list");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);

  const handleCreateTicket = () => {
    setEditingTicket(null);
    setCurrentView("form");
  };

  const handleEditTicket = (ticket: Ticket) => {
    setEditingTicket(ticket);
    setCurrentView("form");
  };

  const handleViewTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setCurrentView("detail");
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setSelectedTicket(null);
    setEditingTicket(null);
  };

  const handleSaveTicket = (ticketData: Partial<Ticket>) => {
    // Handle save logic here
    console.log("Saving ticket:", ticketData);
    setCurrentView("list");
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {currentView === "list" && (
        <TicketList
          onCreateTicket={handleCreateTicket}
          onEditTicket={handleEditTicket}
          onViewTicket={handleViewTicket}
        />
      )}
      
      {currentView === "form" && (
        <TicketForm
          ticket={editingTicket}
          onSave={handleSaveTicket}
          onCancel={handleBackToList}
        />
      )}
      
      {currentView === "detail" && selectedTicket && (
        <TicketDetail
          ticket={selectedTicket}
          onEdit={() => handleEditTicket(selectedTicket)}
          onBack={handleBackToList}
        />
      )}
    </div>
  );
};