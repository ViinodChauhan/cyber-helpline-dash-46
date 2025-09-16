import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, X, Eye, EyeOff } from "lucide-react";
import { Agent } from "@/pages/agents/AgentManagement";

interface AgentFormProps {
  agent: Agent | null;
  isEditing: boolean;
  onSave: (agent: Partial<Agent>) => void;
  onCancel: () => void;
}

interface FormData {
  name: string;
  role: "Agent" | "Supervisor" | "Admin";
  loginId: string;
  password: string;
  callerId: string;
  group: string;
  enabled: boolean;
}

const initialFormData: FormData = {
  name: "",
  role: "Agent",
  loginId: "",
  password: "",
  callerId: "",
  group: "",
  enabled: true
};

const roles = ["Agent", "Supervisor", "Admin"] as const;
const groups = ["Fraud Team", "Phishing Team", "Identity Team", "Management"];

export const AgentForm = ({ agent, isEditing, onSave, onCancel }: AgentFormProps) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  useEffect(() => {
    if (agent && isEditing) {
      setFormData({
        name: agent.name,
        role: agent.role,
        loginId: agent.loginId,
        password: "", // Never pre-fill password
        callerId: agent.callerId,
        group: agent.group,
        enabled: agent.enabled
      });
    } else {
      setFormData(initialFormData);
    }
  }, [agent, isEditing]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.loginId.trim()) {
      newErrors.loginId = "Login ID is required";
    } else if (!/^[a-zA-Z0-9._-]+$/.test(formData.loginId)) {
      newErrors.loginId = "Login ID can only contain letters, numbers, dots, underscores, and hyphens";
    }

    if (!isEditing && !formData.password) {
      newErrors.password = "Password is required for new agents";
    }

    if (formData.password && formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (formData.password && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }

    if (!formData.callerId.trim()) {
      newErrors.callerId = "Caller ID is required";
    } else if (!/^\d{4}$/.test(formData.callerId)) {
      newErrors.callerId = "Caller ID must be exactly 4 digits";
    }

    if (!formData.group) {
      newErrors.group = "Group is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive"
      });
      return;
    }

    onSave(formData);
    toast({
      title: isEditing ? "Agent Updated" : "Agent Created",
      description: isEditing 
        ? `${formData.name}'s details have been updated successfully`
        : `${formData.name} has been added as a new agent`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={onCancel} className="p-2">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold">
            {isEditing ? "Edit Agent" : "Add New Agent"}
          </h2>
          <p className="text-muted-foreground">
            {isEditing 
              ? `Update ${agent?.name}'s information and permissions`
              : "Create a new agent account with role and group assignment"
            }
          </p>
        </div>
      </div>

      {/* Form */}
      <Card className="chart-container">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Agent Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter full name"
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name}</p>
                )}
              </div>

              {/* Role */}
              <div className="space-y-2">
                <Label>Role *</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value: "Agent" | "Supervisor" | "Admin") => 
                    setFormData({ ...formData, role: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map(role => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Login ID */}
              <div className="space-y-2">
                <Label htmlFor="loginId">CRM Login ID *</Label>
                <Input
                  id="loginId"
                  value={formData.loginId}
                  onChange={(e) => setFormData({ ...formData, loginId: e.target.value })}
                  placeholder="e.g., john.doe"
                  className={errors.loginId ? "border-destructive" : ""}
                />
                {errors.loginId && (
                  <p className="text-sm text-destructive">{errors.loginId}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Must be unique. Only letters, numbers, dots, underscores, and hyphens allowed.
                </p>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">
                  Password {!isEditing && "*"}
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder={isEditing ? "Leave blank to keep current password" : "Enter secure password"}
                    className={errors.password ? "border-destructive pr-10" : "pr-10"}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Minimum 8 characters with uppercase, lowercase, and number.
                </p>
              </div>

              {/* Caller ID */}
              <div className="space-y-2">
                <Label htmlFor="callerId">Caller ID (Extension) *</Label>
                <Input
                  id="callerId"
                  value={formData.callerId}
                  onChange={(e) => setFormData({ ...formData, callerId: e.target.value })}
                  placeholder="e.g., 1001"
                  maxLength={4}
                  className={errors.callerId ? "border-destructive" : ""}
                />
                {errors.callerId && (
                  <p className="text-sm text-destructive">{errors.callerId}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  4-digit extension number for phone system.
                </p>
              </div>

              {/* Group */}
              <div className="space-y-2">
                <Label>Group *</Label>
                <Select
                  value={formData.group}
                  onValueChange={(value) => setFormData({ ...formData, group: value })}
                >
                  <SelectTrigger className={errors.group ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select group" />
                  </SelectTrigger>
                  <SelectContent>
                    {groups.map(group => (
                      <SelectItem key={group} value={group}>{group}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.group && (
                  <p className="text-sm text-destructive">{errors.group}</p>
                )}
              </div>
            </div>

            {/* Enable/Disable Toggle */}
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="space-y-1">
                <Label className="text-base font-medium">Account Status</Label>
                <p className="text-sm text-muted-foreground">
                  {formData.enabled 
                    ? "Agent can log in and receive calls" 
                    : "Agent account is disabled and cannot log in"
                  }
                </p>
              </div>
              <Switch
                checked={formData.enabled}
                onCheckedChange={(checked) => setFormData({ ...formData, enabled: checked })}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4 pt-6 border-t">
              <Button type="submit" className="bg-primary text-primary-foreground">
                <Save className="h-4 w-4 mr-2" />
                {isEditing ? "Update Agent" : "Create Agent"}
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};