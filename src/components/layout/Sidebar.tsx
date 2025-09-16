import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Phone, 
  BarChart3, 
  Settings, 
  FileText,
  Activity,
  Shield,
  ChevronLeft,
  ChevronRight,
  Ticket
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    description: "Overview & Analytics"
  },
  {
    title: "Agent Management",
    href: "/agents",
    icon: Users,
    description: "Manage Agents"
  },
  {
    title: "Contacts",
    href: "/contacts",
    icon: Phone,
    description: "Contact Management"
  },
  {
    title: "Tickets",
    href: "/tickets",
    icon: Ticket,
    description: "Ticket Management"
  },
  {
    title: "Call History",
    href: "/call-history",
    icon: Phone,
    description: "Call Records & Logs"
  },
  {
    title: "Call Center",
    href: "/calls",
    icon: Phone,
    description: "Call Operations"
  },
  {
    title: "Reports",
    href: "/reports",
    icon: BarChart3,
    description: "Analytics & Reports"
  },
  {
    title: "Activity Logs",
    href: "/logs",
    icon: Activity,
    description: "System Logs"
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    description: "System Settings"
  }
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className={cn(
      "bg-card border-r border-border shadow-lg transition-all duration-300 flex flex-col",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <div>
                <h2 className="text-sm font-bold text-foreground">1930 Helpline</h2>
                <p className="text-xs text-muted-foreground">Admin Panel</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 p-0"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200",
                "hover:bg-muted/50 group",
                active && "bg-primary text-primary-foreground shadow-sm",
                collapsed && "justify-center"
              )}
            >
              <Icon className={cn(
                "h-5 w-5 flex-shrink-0",
                active ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
              )} />
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <div className={cn(
                    "text-sm font-medium",
                    active ? "text-primary-foreground" : "text-foreground"
                  )}>
                    {item.title}
                  </div>
                  <div className={cn(
                    "text-xs",
                    active ? "text-primary-foreground/80" : "text-muted-foreground"
                  )}>
                    {item.description}
                  </div>
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        {!collapsed ? (
          <div className="text-xs text-muted-foreground">
            <div>Version 2.1.0</div>
            <div>© 2024 Govt. of India</div>
          </div>
        ) : (
          <div className="flex justify-center">
            <Shield className="h-4 w-4 text-muted-foreground" />
          </div>
        )}
      </div>
    </aside>
  );
};