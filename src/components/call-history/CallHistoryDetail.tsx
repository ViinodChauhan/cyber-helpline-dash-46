import { useState } from "react";
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Download, 
  Star, 
  Phone, 
  Clock, 
  User, 
  MapPin, 
  Mail,
  Ticket,
  Volume2,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { CallRecord } from "@/pages/call-history/CallHistoryManagement";

interface CallHistoryDetailProps {
  call: CallRecord;
  onBack: () => void;
  onCreateTicket: () => void;
}

export const CallHistoryDetail = ({ call, onBack, onCreateTicket }: CallHistoryDetailProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0);

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
            className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
          />
        ))}
        <span className="text-sm ml-2">({rating}/5)</span>
      </div>
    );
  };

  const timelineSteps = [
    { label: "Call Started", time: call.timeline.callStart, status: "completed" },
    ...(call.timeline.ivrStart ? [
      { label: "IVR Started", time: call.timeline.ivrStart, status: "completed" },
      { label: "IVR Ended", time: call.timeline.ivrEnd!, status: "completed" }
    ] : []),
    ...(call.timeline.waitStart ? [
      { label: "Wait Started", time: call.timeline.waitStart, status: "completed" },
      { label: "Wait Ended", time: call.timeline.waitEnd!, status: "completed" }
    ] : []),
    { label: "Agent Started", time: call.timeline.agentStart!, status: "completed" },
    { label: "Agent Ended", time: call.timeline.agentEnd!, status: "completed" },
    { label: "Call Ended", time: call.timeline.callEnd, status: "completed" }
  ];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // Simulate playback progress
    if (!isPlaying) {
      const interval = setInterval(() => {
        setPlaybackProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            return 0;
          }
          return prev + 2;
        });
      }, 100);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Call History
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Call Details</h1>
            <p className="text-muted-foreground">Call ID: {call.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onCreateTicket}>
            <Ticket className="h-4 w-4 mr-2" />
            Create Ticket
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Call Metadata */}
        <div className="lg:col-span-2 space-y-6">
          {/* Call Information */}
          <Card>
            <CardHeader>
              <CardTitle>Call Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Date & Time</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{call.dateTime}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Call Type</p>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    {getCallTypeBadge(call.callType)}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Duration</p>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{call.duration}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Agent Talk Time</p>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{call.agentTalkTime}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Wait Time</p>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{call.waitTime}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Assigned Agent</p>
                  <p className="font-medium">{call.agentName}</p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <p className="text-sm text-muted-foreground mb-2">IVR Category</p>
                <Badge variant="outline">{call.ivrCategory}</Badge>
              </div>
              
              {call.ivrPath.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">IVR Path</p>
                  <div className="flex flex-wrap gap-2">
                    {call.ivrPath.map((step, index) => (
                      <div key={index} className="flex items-center">
                        <Badge variant="secondary">{step}</Badge>
                        {index < call.ivrPath.length - 1 && (
                          <span className="mx-2 text-muted-foreground">→</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <p className="text-sm text-muted-foreground mb-2">Disconnection Reason</p>
                <p className="text-sm">{call.disconnectionReason}</p>
              </div>
            </CardContent>
          </Card>

          {/* Call Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Call Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timelineSteps.map((step, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-primary rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{step.label}</p>
                        <p className="text-sm text-muted-foreground">{step.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Call Recording */}
          {call.recordingUrl && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Call Recording</CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handlePlayPause}
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4 mr-2" />
                    ) : (
                      <Play className="h-4 w-4 mr-2" />
                    )}
                    {isPlaying ? "Pause" : "Play"}
                  </Button>
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <Progress value={playbackProgress} className="h-2" />
                  </div>
                  <span className="text-sm text-muted-foreground">{call.duration}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Recording URL: {call.recordingUrl}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Caller Info & Rating */}
        <div className="space-y-6">
          {/* Caller Details */}
          <Card>
            <CardHeader>
              <CardTitle>Caller Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{call.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{call.phoneNumber}</p>
              </div>
              {call.callerInfo.email && (
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{call.callerInfo.email}</p>
                  </div>
                </div>
              )}
              {call.callerInfo.location && (
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{call.callerInfo.location}</p>
                  </div>
                </div>
              )}
              {call.callerInfo.previousCalls !== undefined && (
                <div>
                  <p className="text-sm text-muted-foreground">Previous Calls</p>
                  <p className="font-medium">{call.callerInfo.previousCalls}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* CSAT Rating */}
          {call.csatRating && (
            <Card>
              <CardHeader>
                <CardTitle>Customer Satisfaction</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Rating</p>
                  {getRatingStars(call.csatRating.score)}
                </div>
                {call.csatRating.feedback && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Feedback</p>
                    <p className="text-sm bg-muted p-3 rounded-lg">
                      "{call.csatRating.feedback}"
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" onClick={onCreateTicket}>
                <Ticket className="h-4 w-4 mr-2" />
                Create Ticket from Call
              </Button>
              <Button variant="outline" className="w-full">
                <Phone className="h-4 w-4 mr-2" />
                Call Back Customer
              </Button>
              {call.recordingUrl && (
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Recording
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};