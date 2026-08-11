import React, { useState } from "react";
import { MessageSquare, Copy, Check, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function WhatsAppAuth() {
  const [childName, setChildName] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  const generateLink = () => {
    if (!childName.trim()) return;
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const link = `${origin}/login?child=${encodeURIComponent(childName)}&auth=voice-auth`;
    setGeneratedLink(link);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sendViaWhatsApp = () => {
    const text = `Hi! Use this magic link to access Dhruv Academy as ${childName.trim()}: ${generatedLink}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-emerald-500" /> WhatsApp Magic Link
        </CardTitle>
        <CardDescription>Generate sub-profile authentication links for children.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input 
            placeholder="Enter Child's Name" 
            value={childName} 
            onChange={(e) => setChildName(e.target.value)}
          />
          <Button onClick={generateLink} className="w-full bg-emerald-600 hover:bg-emerald-700">
            Generate Magic Link
          </Button>
        </div>
        {generatedLink && (
          <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg space-y-2 text-xs break-all">
            <p className="font-mono text-muted-foreground">{generatedLink}</p>
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={copyToClipboard} size="sm" variant="outline" className="w-full gap-2">
                {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy Link"}
              </Button>
              <Button onClick={sendViaWhatsApp} size="sm" className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700">
                <Send className="w-3.5 h-3.5" />
                Send via WhatsApp
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
