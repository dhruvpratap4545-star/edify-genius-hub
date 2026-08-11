import React from "react";
import { Shield, TrendingUp, CheckCircle2, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Dashboard() {
  return (
    <div className="w-full max-w-4xl space-y-6 text-left">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Parent Growth & Privacy Center</h2>
        <Badge variant="outline" className="gap-1 border-green-500 text-green-600">
          <Shield className="w-3.5 h-3.5" /> 100% Student Privacy Guard Active
        </Badge>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <TrendingUp className="w-5 h-5" /> Positive Growth Report
            </CardTitle>
            <CardDescription>Learning velocity and concept mastery tracking.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center text-sm border-b pb-2">
              <span>Socratic Problem Solving</span>
              <span className="font-semibold text-green-600">92% Mastery</span>
            </div>
            <div className="flex justify-between items-center text-sm border-b pb-2">
              <span>Interactive Quiz Consistency</span>
              <span className="font-semibold text-green-600">5 Days Streak</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-indigo-600">
              <Lock className="w-5 h-5" /> Child Privacy Shield
            </CardTitle>
            <CardDescription>Encrypted and secure student interaction environment.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
              Chat logs strictly isolated & protected by zero-retention rules.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
