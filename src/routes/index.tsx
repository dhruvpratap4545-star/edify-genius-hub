import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { Avatar3D } from "@/components/avatar-3d";
import { Dashboard } from "@/components/dashboard";
import { WhatsAppAuth } from "@/components/whatsapp-auth";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dhruv Academy – Your Personal AI Guide for Learning" },
      { name: "description", content: "Adaptive courses, Socratic AI tutor, and progress analytics." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-center space-y-10 max-w-6xl mx-auto">
        <div className="space-y-4">
          <Badge variant="outline" className="px-4 py-1 text-sm border-primary/50">
            <Sparkles className="w-4 h-4 mr-2 inline text-yellow-500" />
            Dhruv Academy AI v2.0 Complete Suite
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            Welcome to <span className="text-primary">Dhruv Academy</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full justify-items-center">
          <Avatar3D />
          <WhatsAppAuth />
        </div>

        <Dashboard />
      </div>
    </SiteLayout>
  );
}
