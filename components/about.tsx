"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Code2, 
  Coffee, 
  Lightbulb, 
  Rocket, 
  Heart,
  Zap,
  Brain,
  Target
} from "lucide-react";

const personalityTraits = [
  { icon: Coffee, text: "Fueled by coffee & curiosity", color: "bg-amber-500" },
  { icon: Lightbulb, text: "Always learning something new", color: "bg-yellow-500" },
  { icon: Rocket, text: "Turning ideas into reality", color: "bg-blue-500" },
  { icon: Heart, text: "Passionate about clean code", color: "bg-red-500" },
  { icon: Zap, text: "Fast learner, faster debugger", color: "bg-purple-500" },
  { icon: Brain, text: "Problem solver by nature", color: "bg-green-500" },
];

const funFacts = [
  "🎯 I debug code faster than I debug my life",
  "☕ My code-to-coffee ratio is perfectly balanced",
  "🌙 I'm a night owl who codes best after midnight",
  "🎮 Gaming taught me that every bug is just a puzzle",
  "📚 I collect programming books like some collect stamps",
  "🎵 I code better with lo-fi beats playing"
];

export function About() {
  const [selectedFact, setSelectedFact] = useState(0);

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            About Me
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            More than just code - I'm a storyteller who speaks in algorithms
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className="space-y-6 animate-fade-in">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-primary" />
                  The Developer Behind the Code
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Hey there! I'm Taylan, a full-stack developer who believes that great software 
                  is like a good joke - if you have to explain it, it's probably not that great. 
                  I craft digital experiences that are both functional and delightful.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  When I'm not wrestling with CSS or having philosophical debates with my IDE, 
                  you'll find me exploring the latest tech trends, contributing to open source, 
                  or trying to convince my rubber duck that my code logic makes perfect sense.
                </p>
              </CardContent>
            </Card>

            {/* Personality Traits */}
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  What Makes Me Tick
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {personalityTraits.map((trait, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors duration-200 group"
                    >
                      <div className={`p-2 rounded-full ${trait.color} text-white group-hover:scale-110 transition-transform duration-200`}>
                        <trait.icon className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium">{trait.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Fun Facts */}
          <div className="space-y-6 animate-slide-up">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle>Fun Facts & Random Thoughts</CardTitle>
                <CardDescription>
                  Because every developer needs a personality beyond semicolons
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-6 bg-accent/20 rounded-lg">
                  <p className="text-lg font-medium mb-4">
                    {funFacts[selectedFact]}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {funFacts.map((_, index) => (
                      <Button
                        key={index}
                        variant={selectedFact === index ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedFact(index)}
                        className="w-3 h-3 p-0 rounded-full"
                      />
                    ))}
                  </div>
                </div>
                
                <div className="text-center">
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedFact((prev) => (prev + 1) % funFacts.length)}
                    className="group"
                  >
                    <span>Next random fact</span>
                    <Zap className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quote */}
            <Card className="hover-lift bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-none">
              <CardContent className="p-6 text-center">
                <blockquote className="text-lg font-medium italic mb-4">
                  "Le code est mon art, le futur est ma toile."
                </blockquote>
                <p className="text-sm text-muted-foreground">
                  Code is my art, the future is my canvas.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
