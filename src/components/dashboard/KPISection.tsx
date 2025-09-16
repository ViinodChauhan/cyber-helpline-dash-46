import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  PhoneCall, 
  PhoneOff, 
  PhoneMissed, 
  TrendingUp, 
  TrendingDown,
  Users,
  Clock,
  ThumbsUp,
  ThumbsDown,
  Minus
} from "lucide-react";

const kpiData = {
  inbound: {
    total: 1247,
    answered: 1156,
    missed: 91,
    abandoned: 23,
    trend: 12.5
  },
  outbound: {
    total: 435,
    connected: 387,
    notAnswered: 48,
    busy: 15,
    trend: -3.2
  },
  agents: {
    active: 24,
    totalCalls: 1682,
    avgHandling: "4:32",
    trend: 8.1
  },
  csat: {
    positive: 78.4,
    neutral: 16.2,
    negative: 5.4,
    totalResponses: 892
  }
};

export const KPISection = () => {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Key Performance Indicators</h2>
      
      {/* Inbound Calls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="kpi-card border-l-4 border-l-primary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              <span className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-primary" />
                Inbound Calls
              </span>
              <Badge variant={kpiData.inbound.trend > 0 ? "default" : "destructive"} className="text-xs">
                {kpiData.inbound.trend > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                {Math.abs(kpiData.inbound.trend)}%
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="kpi-value text-primary">{kpiData.inbound.total.toLocaleString()}</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-success">Answered:</span>
                <span className="font-semibold text-success">{kpiData.inbound.answered}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-warning">Missed:</span>
                <span className="font-semibold text-warning">{kpiData.inbound.missed}</span>
              </div>
              <div className="flex items-center justify-between col-span-2">
                <span className="text-destructive">Abandoned:</span>
                <span className="font-semibold text-destructive">{kpiData.inbound.abandoned}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="kpi-card border-l-4 border-l-accent">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              <span className="flex items-center">
                <PhoneCall className="h-4 w-4 mr-2 text-accent" />
                Outbound Calls
              </span>
              <Badge variant={kpiData.outbound.trend > 0 ? "default" : "destructive"} className="text-xs">
                {kpiData.outbound.trend > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                {Math.abs(kpiData.outbound.trend)}%
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="kpi-value text-accent">{kpiData.outbound.total.toLocaleString()}</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-success">Connected:</span>
                <span className="font-semibold text-success">{kpiData.outbound.connected}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-warning">No Answer:</span>
                <span className="font-semibold text-warning">{kpiData.outbound.notAnswered}</span>
              </div>
              <div className="flex items-center justify-between col-span-2">
                <span className="text-destructive">Busy:</span>
                <span className="font-semibold text-destructive">{kpiData.outbound.busy}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="kpi-card border-l-4 border-l-success">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              <span className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-success" />
                Agent Performance
              </span>
              <Badge variant={kpiData.agents.trend > 0 ? "default" : "destructive"} className="text-xs">
                {kpiData.agents.trend > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                {Math.abs(kpiData.agents.trend)}%
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="kpi-value text-success">{kpiData.agents.active}</div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Active Agents</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Total Calls:</span>
                <span className="font-semibold">{kpiData.agents.totalCalls.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Avg. Handling:</span>
                <span className="font-semibold">{kpiData.agents.avgHandling}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="kpi-card border-l-4 border-l-warning">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              <span className="flex items-center">
                <ThumbsUp className="h-4 w-4 mr-2 text-warning" />
                CSAT Score
              </span>
              <Badge variant="outline" className="text-xs">
                {kpiData.csat.totalResponses} responses
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="kpi-value text-warning">{kpiData.csat.positive}%</div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="flex items-center text-success">
                  <ThumbsUp className="h-3 w-3 mr-1" />
                  Positive:
                </span>
                <span className="font-semibold text-success">{kpiData.csat.positive}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center text-muted-foreground">
                  <Minus className="h-3 w-3 mr-1" />
                  Neutral:
                </span>
                <span className="font-semibold">{kpiData.csat.neutral}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center text-destructive">
                  <ThumbsDown className="h-3 w-3 mr-1" />
                  Negative:
                </span>
                <span className="font-semibold text-destructive">{kpiData.csat.negative}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};