"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CVDownload } from "@/components/cv-download";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  Copy,
  Check,
  Twitter,
  Instagram,
  Download,
  Sparkles
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { SnakeGame } from "@/components/snake-game";
const skills = [".NET Core", "Node.js", "React", "Next.js", "Angular"];
export function Hero() {
  const { toast, showToast, hideToast } = useToast();
  const [skillIndex, setSkillIndex] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);
  useEffect(() => {
    const interval = setInterval(() => {
      setSkillIndex((current) => (current + 1) % skills.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  const copyToClipboard = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    if (toast) {
      showToast(`${type} has been copied to your clipboard`);
    }
    setTimeout(() => setCopied(null), 2000);
  };
  return (
    <div className="relative isolate pt-16 sm:pt-20 lg:pt-24 bg-black min-h-screen">
      {/* Background gradient */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#1E40AF] to-[#60A5FA] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] animate-pulse"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="py-12 sm:py-16 lg:py-20 lg:pb-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
              Full-Stack Software Developer
            </h1>
            {/* Specialization with rotating skills */}
            <p className="text-lg sm:text-xl lg:text-2xl leading-8 text-muted-foreground mb-4">
              Specializing in{" "}
              <span className="text-primary font-semibold transition-all duration-500 inline-block transform hover:scale-105 cursor-pointer">
                {skills[skillIndex]}
              </span>
            </p>
            {/* Witty subtitle */}
            <p className="text-sm sm:text-base text-muted-foreground/80 mb-8 italic">
              Turning coffee into code since 2020 ☕ → 💻
            </p>
            {/* Social Links */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8">
              <Button asChild variant="outline" size="lg" className="group hover:border-blue-500 transition-all duration-300 w-full sm:w-auto">
                <a
                  href="https://github.com/ekintkara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Github className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  GitHub
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="group hover:border-blue-600 transition-all duration-300 w-full sm:w-auto">
                <a
                  href="https://linkedin.com/in/taylanekin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Linkedin className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  LinkedIn
                </a>
              </Button>
            </div>
            {/* Contact Information */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Button
                variant="ghost"
                onClick={() =>
                  copyToClipboard("taylanekin01@gmail.com", "email")
                }
                className="group hover:bg-accent/50 transition-all duration-300 text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3"
              >
                <Mail className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                <span className="truncate">taylanekin01@gmail.com</span>
                {copied === "email" ? (
                  <Check className="ml-2 h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                )}
              </Button>
            </div>

            {/* Snake Game */}
            <div className="flex justify-center mb-8">
              <SnakeGame />
            </div>

            {/* Enhanced CV Download */}
            <div className="flex justify-center">
              <CVDownload variant="inline" />
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
}
