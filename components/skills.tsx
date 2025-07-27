"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Skills() {
  return (
    <section id="skills" className="py-16 sm:py-20 lg:py-24 bg-accent/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Skills & Expertise
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            My technical toolkit - constantly evolving, always improving
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🌐 Frontend
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span>React</span>
                <Badge>95%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Next.js</span>
                <Badge>90%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>TypeScript</span>
                <Badge>88%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Tailwind CSS</span>
                <Badge>92%</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🗄️ Backend
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span>.NET Core</span>
                <Badge>95%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Node.js</span>
                <Badge>90%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>C#</span>
                <Badge>93%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>SQL Server</span>
                <Badge>88%</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🔧 Tools
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Git</span>
                <Badge>90%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Docker</span>
                <Badge>85%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Azure</span>
                <Badge>80%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>VS Code</span>
                <Badge>95%</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}