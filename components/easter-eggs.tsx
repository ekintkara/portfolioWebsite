"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { 
  Coffee, 
  Code2, 
  Zap, 
  Heart,
  Star,
  Sparkles,
  Rocket,
  Brain
} from "lucide-react";

const konamiCode = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
];

const easterEggMessages = [
  "🎉 You found the secret! You're clearly a person of culture.",
  "🚀 Konami code detected! You must be a fellow developer.",
  "⭐ Achievement unlocked: Secret Finder!",
  "🎯 Nice! You know the classics. Respect!",
  "🔥 You've activated developer mode! (Nothing actually happens, but it sounds cool)"
];

const funInteractions = [
  {
    trigger: "coffee",
    icon: Coffee,
    message: "☕ Coffee level: Dangerously low. Productivity may suffer.",
    color: "text-amber-500"
  },
  {
    trigger: "code",
    icon: Code2,
    message: "💻 Fun fact: This website has more lines of code than my last relationship had conversations.",
    color: "text-blue-500"
  },
  {
    trigger: "rocket",
    icon: Rocket,
    message: "🚀 To infinity and beyond! (But first, let me fix this bug)",
    color: "text-purple-500"
  },
  {
    trigger: "brain",
    icon: Brain,
    message: "🧠 My brain runs on caffeine and Stack Overflow answers.",
    color: "text-green-500"
  }
];

export function EasterEggs() {
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const { toast, showToast } = useToast();

  // Konami Code detection
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setKeySequence(prev => {
        const newSequence = [...prev, event.code].slice(-konamiCode.length);
        
        if (JSON.stringify(newSequence) === JSON.stringify(konamiCode)) {
          const randomMessage = easterEggMessages[Math.floor(Math.random() * easterEggMessages.length)];
          if (toast) {
            showToast(randomMessage);
          }
          // Reset sequence
          return [];
        }
        
        return newSequence;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toast, showToast]);

  // Multi-click detection
  const handleLogoClick = () => {
    const now = Date.now();
    
    if (now - lastClickTime < 500) {
      setClickCount(prev => prev + 1);
    } else {
      setClickCount(1);
    }
    
    setLastClickTime(now);

    if (clickCount >= 4) {
      if (toast) {
        showToast("🎭 You're persistent! I like that in a person.");
      }
      setClickCount(0);
    }
  };

  const triggerFunInteraction = (interaction: typeof funInteractions[0]) => {
    if (toast) {
      showToast(interaction.message);
    }
  };

  return (
    <>
      {/* Hidden interactive elements */}
      <div className="fixed bottom-4 left-4 z-30 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="flex flex-col gap-2">
          {funInteractions.map((interaction, index) => (
            <Button
              key={interaction.trigger}
              variant="ghost"
              size="icon"
              onClick={() => triggerFunInteraction(interaction)}
              className={`w-8 h-8 ${interaction.color} hover:bg-accent/50 transition-all duration-200 hover:scale-110`}
              title={`Click for a ${interaction.trigger} fact!`}
            >
              <interaction.icon className="h-4 w-4" />
            </Button>
          ))}
        </div>
      </div>

      {/* Secret click area (invisible) */}
      <div 
        className="fixed top-0 left-0 w-16 h-16 cursor-pointer opacity-0 z-20"
        onClick={handleLogoClick}
        title="🤫 Secret area - try clicking multiple times!"
      />

      {/* Floating particles (subtle) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
        ))}
      </div>
    </>
  );
}

// Fun loading messages component
export function LoadingMessages() {
  const messages = [
    "Brewing fresh code...",
    "Debugging the matrix...",
    "Compiling awesome...",
    "Loading pixels...",
    "Initializing creativity...",
    "Caffeinating algorithms...",
    "Optimizing fun levels...",
    "Deploying magic..."
  ];

  const [currentMessage, setCurrentMessage] = useState(messages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(messages[Math.floor(Math.random() * messages.length)]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <div className="animate-spin">
        <Code2 className="h-4 w-4" />
      </div>
      <span>{currentMessage}</span>
    </div>
  );
}

// Cursor trail effect (optional, can be toggled)
export function CursorTrail() {
  const [trail, setTrail] = useState<Array<{x: number, y: number, id: number}>>([]);

  useEffect(() => {
    let id = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      setTrail(prev => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: id++ }].slice(-10);
        return newTrail;
      });
    };

    // Only add on desktop
    if (window.innerWidth > 768) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="absolute w-2 h-2 bg-primary rounded-full animate-ping"
          style={{
            left: point.x - 4,
            top: point.y - 4,
            opacity: (index + 1) / trail.length * 0.3,
            animationDuration: '0.5s'
          }}
        />
      ))}
    </div>
  );
}
