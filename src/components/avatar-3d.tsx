import React, { useState } from "react";
import { Volume2, VolumeX, Sparkles, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Avatar3D() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [text] = useState("Hello! I am your AI Guide at Dhruv Academy. What would you like to learn today?");

  const handleSpeech = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = () => setIsSpeaking(false);
        setIsSpeaking(true);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  return (
    <Card className="w-full max-w-md bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 border-2 border-primary/20">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-500 animate-pulse" />
          Interactive 3D AI Tutor
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className={`relative w-32 h-32 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg transition-transform duration-300 ${isSpeaking ? 'scale-105 ring-4 ring-indigo-400/50' : ''}`}>
          <div className="w-28 h-28 rounded-full bg-slate-950 flex items-center justify-center text-white">
            <MessageSquare className={`w-12 h-12 text-indigo-400 ${isSpeaking ? 'animate-bounce' : ''}`} />
          </div>
        </div>
        <p className="text-sm text-center text-muted-foreground italic bg-background/80 p-3 rounded-lg border">
          "{text}"
        </p>
        <Button onClick={handleSpeech} variant={isSpeaking ? "destructive" : "default"} className="gap-2 rounded-full">
          {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          {isSpeaking ? "Stop Speaking" : "Listen to AI Guide"}
        </Button>
      </CardContent>
    </Card>
  );
}
