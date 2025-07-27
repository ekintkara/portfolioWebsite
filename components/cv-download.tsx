"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  FileText, 
  Eye, 
  Star,
  Calendar,
  Users,
  TrendingUp,
  Sparkles,
  CheckCircle,
  Clock
} from "lucide-react";

interface CVStats {
  downloads: number;
  lastUpdated: string;
  size: string;
  pages: number;
}

const cvStats: CVStats = {
  downloads: 1247,
  lastUpdated: "December 2024",
  size: "2.1 MB",
  pages: 2
};

const highlights = [
  "4+ years of full-stack development",
  "20+ successful projects delivered",
  "Expert in .NET Core & React ecosystem",
  "Cloud deployment & DevOps experience"
];

export function CVDownload({ variant = "card" }: { variant?: "card" | "floating" | "inline" }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadCount, setDownloadCount] = useState(cvStats.downloads);

  // Interactive states for inline variant
  const [isTeleported, setIsTeleported] = useState(false);
  const [teleportPosition, setTeleportPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate safe teleport position
  const calculateTeleportPosition = () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Button approximate dimensions
    const buttonWidth = 200; // Approximate button width
    const buttonHeight = 50;  // Approximate button height

    // Safe boundaries with padding
    const padding = 20;
    const minX = padding;
    const maxX = viewportWidth - buttonWidth - padding;
    const minY = padding + 100; // Extra top padding to avoid header
    const maxY = viewportHeight - buttonHeight - padding;

    // Generate random position within safe boundaries
    const newX = Math.random() * (maxX - minX) + minX;
    const newY = Math.random() * (maxY - minY) + minY;

    return { x: newX, y: newY };
  };

  const handleDownload = async () => {
    // For inline variant, prevent download and teleport instead
    if (variant === "inline") {
      handleTeleport();
      return;
    }

    // Normal download behavior for other variants
    setIsDownloading(true);

    // Simulate download delay for better UX
    setTimeout(() => {
      window.open("https://ekintkara.sirv.com/TaylanEkinKara_CV.pdf", "_blank");
      setDownloadCount(prev => prev + 1);
      setIsDownloading(false);
    }, 1000);
  };

  const handleTeleport = () => {
    const newPosition = calculateTeleportPosition();
    setTeleportPosition(newPosition);
    setIsTeleported(true);
  };

  const handlePreview = () => {
    window.open("https://ekintkara.sirv.com/TaylanEkinKara_CV.pdf", "_blank");
  };



  if (variant === "floating") {
    return (
      <div className="fixed bottom-6 right-6 z-40 animate-bounce-subtle">
        <Button
          onClick={handleDownload}
          disabled={isDownloading}
          className="group relative overflow-hidden rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          {isDownloading ? (
            <div className="relative z-10 animate-spin">
              <Clock className="h-5 w-5" />
            </div>
          ) : (
            <Download className="relative z-10 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
          )}
        </Button>
        <div className="absolute -top-12 right-0 bg-background border rounded-lg px-3 py-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Download CV
        </div>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <Button
        onClick={handleDownload}
        disabled={isDownloading}
        className="group relative overflow-hidden transition-all duration-500 ease-in-out hover:scale-110"
        style={{
          position: isTeleported ? 'fixed' : 'relative',
          left: isTeleported ? teleportPosition.x : 'auto',
          top: isTeleported ? teleportPosition.y : 'auto',
          zIndex: isTeleported ? 50 : 'auto',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        {isDownloading ? (
          <Clock className="mr-2 h-4 w-4 relative z-10 animate-spin" />
        ) : (
          <Download className="mr-2 h-4 w-4 relative z-10 transition-transform duration-200 group-hover:scale-110" />
        )}
        <span className="relative z-10 whitespace-nowrap">
          {isDownloading
            ? "Preparing..."
            : isTeleported
              ? "If you're a recruiter, please send me an email :)"
              : "Download CV"
          }
        </span>
        <Sparkles className="ml-2 h-3 w-3 relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300" />
      </Button>
    );
  }

  // Default card variant
  return (
    <Card className="hover-lift bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          My Resume
          <Badge variant="secondary" className="ml-auto">
            Updated {cvStats.lastUpdated}
          </Badge>
        </CardTitle>
        <CardDescription>
          Get to know my professional journey and technical expertise
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* CV Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center gap-1">
              <TrendingUp className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Downloads</span>
            </div>
            <p className="text-lg font-bold text-primary">{downloadCount.toLocaleString()}</p>
          </div>
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center gap-1">
              <FileText className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Pages</span>
            </div>
            <p className="text-lg font-bold">{cvStats.pages}</p>
          </div>
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center gap-1">
              <Calendar className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Updated</span>
            </div>
            <p className="text-sm font-semibold">Dec 2024</p>
          </div>
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center gap-1">
              <Star className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Size</span>
            </div>
            <p className="text-sm font-semibold">{cvStats.size}</p>
          </div>
        </div>

        {/* Highlights */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            What's Inside
          </h4>
          <div className="space-y-2">
            {highlights.map((highlight, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                <span className="text-muted-foreground">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex-1 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {isDownloading ? (
              <Clock className="mr-2 h-4 w-4 relative z-10 animate-spin" />
            ) : (
              <Download className="mr-2 h-4 w-4 relative z-10 transition-transform duration-200 group-hover:scale-110" />
            )}
            <span className="relative z-10">
              {isDownloading ? "Preparing..." : "Download"}
            </span>
          </Button>
          
          <Button
            variant="outline"
            onClick={handlePreview}
            className="group hover:border-primary transition-colors duration-200"
          >
            <Eye className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
            Preview
          </Button>
        </div>

        {/* Fun fact */}
        <div className="text-center pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            💡 Fun fact: This CV has been downloaded more times than I've had coffee today!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
