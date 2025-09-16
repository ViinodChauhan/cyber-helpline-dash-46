import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

// Sample data for charts
const callTrendsData = [
  { time: "00:00", inbound: 45, outbound: 12 },
  { time: "02:00", inbound: 32, outbound: 8 },
  { time: "04:00", inbound: 28, outbound: 6 },
  { time: "06:00", inbound: 67, outbound: 15 },
  { time: "08:00", inbound: 123, outbound: 34 },
  { time: "10:00", inbound: 156, outbound: 45 },
  { time: "12:00", inbound: 187, outbound: 52 },
  { time: "14:00", inbound: 165, outbound: 48 },
  { time: "16:00", inbound: 142, outbound: 38 },
  { time: "18:00", inbound: 98, outbound: 25 },
  { time: "20:00", inbound: 76, outbound: 18 },
  { time: "22:00", inbound: 54, outbound: 12 },
];

const agentPerformanceData = [
  { agent: "Kumar", calls: 156, avgTime: 285 },
  { agent: "Sharma", calls: 142, avgTime: 312 },
  { agent: "Patel", calls: 134, avgTime: 298 },
  { agent: "Singh", calls: 128, avgTime: 276 },
  { agent: "Gupta", calls: 118, avgTime: 334 },
  { agent: "Verma", calls: 109, avgTime: 289 },
];

const csatData = [
  { name: "Positive", value: 78.4, color: "hsl(var(--success))" },
  { name: "Neutral", value: 16.2, color: "hsl(var(--warning))" },
  { name: "Negative", value: 5.4, color: "hsl(var(--destructive))" },
];

export const ChartsSection = () => {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Analytics Dashboard</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Call Trends Chart */}
        <Card className="chart-container">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              📈 Hourly Call Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={callTrendsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="time" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px"
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="inbound" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  name="Inbound Calls"
                />
                <Line 
                  type="monotone" 
                  dataKey="outbound" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={3}
                  name="Outbound Calls"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Agent Performance Chart */}
        <Card className="chart-container">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              📊 Agent Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={agentPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="agent" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px"
                  }}
                />
                <Bar 
                  dataKey="calls" 
                  fill="hsl(var(--success))"
                  radius={[4, 4, 0, 0]}
                  name="Total Calls"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* CSAT Distribution */}
        <Card className="chart-container">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              🎯 CSAT Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={csatData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {csatData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px"
                  }}
                  formatter={(value) => [`${value}%`, "Percentage"]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-6 mt-4">
              {csatData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {item.name}: {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Call Types Breakdown */}
        <Card className="chart-container">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              📋 Call Types Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="font-medium">Banking Fraud</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-background rounded-full h-2">
                    <div className="bg-destructive h-2 rounded-full" style={{ width: "45%" }}></div>
                  </div>
                  <span className="text-sm font-bold">567</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="font-medium">Phishing Attempts</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-background rounded-full h-2">
                    <div className="bg-warning h-2 rounded-full" style={{ width: "32%" }}></div>
                  </div>
                  <span className="text-sm font-bold">398</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="font-medium">Identity Theft</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-background rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "18%" }}></div>
                  </div>
                  <span className="text-sm font-bold">234</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="font-medium">Other</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-background rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full" style={{ width: "5%" }}></div>
                  </div>
                  <span className="text-sm font-bold">48</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};