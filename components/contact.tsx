"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Coffee,
  MessageCircle,
  Linkedin,
  Github,
  Twitter,
  Instagram,
  Copy,
  Check,
  Heart,
  Zap
} from "lucide-react";

const contactMethods = [
  {
    icon: Mail,
    title: "Email Me",
    description: "For professional inquiries",
    value: "taylanekin01@gmail.com",
    action: "mailto:taylanekin01@gmail.com",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Linkedin,
    title: "LinkedIn",
    description: "Let's connect professionally",
    value: "linkedin.com/in/taylanekin",
    action: "https://linkedin.com/in/taylanekin",
    color: "from-blue-600 to-blue-700"
  },
  {
    icon: Github,
    title: "GitHub",
    description: "Check out my code",
    value: "github.com/ekintkara",
    action: "https://github.com/ekintkara",
    color: "from-gray-700 to-gray-900"
  }
];

const quickMessages = [
  "👋 Hi! I'd love to discuss a project",
  "💼 Let's talk about job opportunities",
  "🤝 Interested in collaboration",
  "☕ Want to grab a virtual coffee?",
  "🚀 I have an exciting project idea"
];

export function Contact() {
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState("");
  const { toast, showToast } = useToast();

  const copyToClipboard = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    if (toast) {
      showToast(`${type} copied to clipboard!`);
    }
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-accent/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Let's Build Something Amazing
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Got a project in mind? Let's turn your ideas into reality!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Methods */}
          <div className="space-y-6">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Get In Touch
                </CardTitle>
                <CardDescription>
                  Choose your preferred way to reach out
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactMethods.map((method, index) => (
                  <div 
                    key={index}
                    className="group p-4 rounded-lg border hover:bg-accent/50 transition-all duration-200 cursor-pointer"
                    onClick={() => method.title === "Email Me" ? copyToClipboard(method.value, "Email") : window.open(method.action, '_blank')}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-full bg-gradient-to-r ${method.color} text-white group-hover:scale-110 transition-transform duration-200`}>
                        <method.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold group-hover:text-primary transition-colors duration-200">
                          {method.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {method.description}
                        </p>
                        <p className="text-sm font-mono text-primary">
                          {method.value}
                        </p>
                      </div>
                      {method.title === "Email Me" && (
                        <div className="text-muted-foreground group-hover:text-primary transition-colors duration-200">
                          {copied === "Email" ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Fun Contact Card */}
            <Card className="hover-lift bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-none">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Coffee className="h-5 w-5 text-orange-500" />
                  <span className="font-semibold">Coffee Chat?</span>
                  <Coffee className="h-5 w-5 text-orange-500" />
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  I'm always up for a virtual coffee chat about tech, projects, or just life in general!
                </p>
                <Button variant="outline" size="sm" className="group">
                  <span>Schedule a chat</span>
                  <Heart className="ml-2 h-3 w-3 group-hover:scale-110 transition-transform duration-200 text-red-500" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Message Form */}
          <div className="space-y-6">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5 text-primary" />
                  Quick Message
                </CardTitle>
                <CardDescription>
                  Send me a message directly from here
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Quick Message Templates */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Quick Templates:</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {quickMessages.map((message, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedMessage(message)}
                        className="justify-start text-left h-auto py-2 px-3 hover:bg-accent/50 transition-colors duration-200"
                      >
                        {message}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Message Form */}
                <div className="space-y-4 pt-4 border-t border-border">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input 
                      id="name" 
                      placeholder="John Doe" 
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Your Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="john@example.com"
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <textarea
                      id="message"
                      rows={4}
                      value={selectedMessage}
                      onChange={(e) => setSelectedMessage(e.target.value)}
                      placeholder="Tell me about your project or just say hi!"
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all duration-200 resize-none"
                    />
                  </div>
                  
                  <Button className="w-full group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Send className="mr-2 h-4 w-4 relative z-10 group-hover:scale-110 transition-transform duration-200" />
                    <span className="relative z-10">Send Message</span>
                    <Zap className="ml-2 h-3 w-3 relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Response Time Card */}
            <Card className="hover-lift bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-none">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Zap className="h-4 w-4 text-green-500" />
                  <span className="font-semibold text-sm">Quick Response</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  I typically respond within 24 hours. For urgent matters, feel free to reach out on LinkedIn!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Card className="inline-block hover-lift bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-none">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-2">Ready to start your project?</h3>
              <p className="text-muted-foreground mb-6">
                Let's discuss how we can bring your vision to life
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group">
                  <Mail className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                  Get Started
                </Button>
                <Button variant="outline" size="lg" className="group">
                  <Coffee className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                  Schedule Call
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
