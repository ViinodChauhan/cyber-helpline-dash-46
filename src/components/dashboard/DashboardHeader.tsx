import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Shield, Calendar, Filter, Download } from "lucide-react";

export const DashboardHeader = () => {
  return (
    <header className="government-header shadow-lg">
      <div className="container mx-auto px-6 py-4">
        {/* Top Row - Branding */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <Shield className="h-10 w-10 text-primary-foreground" />
              <div>
                <h1 className="text-2xl font-bold text-primary-foreground">
                  1930 Cyber Crime Helpline
                </h1>
                <p className="text-primary-foreground/80 text-sm">
                  Command & Control Dashboard
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-primary-lighter text-primary-foreground">
              Live Session
            </Badge>
            <div className="text-primary-foreground/80 text-sm">
              Last Updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-primary-foreground/80" />
              <Select defaultValue="today">
                <SelectTrigger className="w-40 bg-primary-lighter text-primary">
                  <SelectValue placeholder="Select Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Select defaultValue="all-agents">
              <SelectTrigger className="w-40 bg-primary-lighter text-primary">
                <SelectValue placeholder="Select Agent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-agents">All Agents</SelectItem>
                <SelectItem value="agent-1">Agent Kumar</SelectItem>
                <SelectItem value="agent-2">Agent Sharma</SelectItem>
                <SelectItem value="agent-3">Agent Patel</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all-types">
              <SelectTrigger className="w-40 bg-primary-lighter text-primary">
                <SelectValue placeholder="Call Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-types">All Types</SelectItem>
                <SelectItem value="fraud">Fraud Reports</SelectItem>
                <SelectItem value="phishing">Phishing</SelectItem>
                <SelectItem value="banking">Banking Fraud</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="secondary" size="sm" className="bg-primary-lighter text-primary">
              <Filter className="h-4 w-4 mr-2" />
              Apply Filters
            </Button>
            <Button variant="secondary" size="sm" className="bg-accent text-accent-foreground">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};