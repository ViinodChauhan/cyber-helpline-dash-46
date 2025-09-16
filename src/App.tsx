import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import { AgentManagement } from "./pages/agents/AgentManagement";
import { ContactManagement } from "./pages/contacts/ContactManagement";
import { TicketManagement } from "./pages/tickets/TicketManagement";
import { CallHistoryManagement } from "./pages/call-history/CallHistoryManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            {/* Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Protected Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="agents" element={<AgentManagement />} />
              <Route path="contacts" element={<ContactManagement />} />
              <Route path="tickets" element={<TicketManagement />} />
              <Route path="call-history" element={<CallHistoryManagement />} />
              {/* Placeholder routes for other menu items */}
              <Route path="calls" element={<div className="p-8"><h1>Call Center Module - Coming Soon</h1></div>} />
              <Route path="reports" element={<div className="p-8"><h1>Reports Module - Coming Soon</h1></div>} />
              <Route path="logs" element={<div className="p-8"><h1>Activity Logs - Coming Soon</h1></div>} />
              <Route path="settings" element={<div className="p-8"><h1>Settings - Coming Soon</h1></div>} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
