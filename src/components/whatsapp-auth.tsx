import React, { useState } from "react";
import { MessageSquare, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function WhatsAppAuth() {
  const [childName, setChildName] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  const generateLink = () => {
    if (!childName.trim()) return;
    // Uses dynamic base URL pointing to main route (Fixes 404 Error)
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://edify-genius-hub.vercel.app';
    const link = ${baseUrl}/?child=${encodeURIComponent(childName)}&auth=voice-auth;
    setGeneratedLink(link);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnWhatsApp = () => {
    if (!generatedLink) return;
    const message = Hi ${childName}! Here is your access link for Dhruv Academy: ${generatedLink};
    window.open(https://api.whatsapp.com/send?text=${encodeURIComponent(message)}, '_blank');
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-emerald-500" /> WhatsApp Magic Link
        </CardTitle>
        <CardDescription>Generate working sub-profile access link for children.</CardDescription>
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
            <div className="flex gap-2">
              <Button onClick={copyToClipboard} size="sm" variant="outline" className="w-1/2 gap-1">
                {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy Link"}
              </Button>
              <Button onClick={shareOnWhatsApp} size="sm" className="w-1/2 bg-green-600 hover:bg-green-700 text-white">
                Send via WhatsApp
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
