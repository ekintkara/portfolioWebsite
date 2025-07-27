"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ExternalLink, 
  Github, 
  Code2, 
  Zap,
  Star,
  Eye,
  Calendar,
  Users,
  TrendingUp
} from "lucide-react";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard.",
    longDescription: "Built with Next.js and .NET Core, this platform handles thousands of transactions daily. Features include real-time inventory updates, Stripe payment integration, and a comprehensive admin panel.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
    technologies: ["Next.js", "TypeScript", ".NET Core", "SQL Server", "Stripe"],
    category: "Full-Stack",
    status: "Live",
    metrics: {
      users: "10K+",
      uptime: "99.9%",
      performance: "95/100"
    },
    links: {
      demo: "#",
      github: "#"
    },
    featured: true
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative project management tool with real-time updates, team collaboration features, and advanced analytics.",
    longDescription: "This React-based application helps teams stay organized with kanban boards, time tracking, and detailed project analytics. Built with modern web technologies for optimal performance.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop",
    technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Tailwind"],
    category: "Web App",
    status: "In Development",
    metrics: {
      users: "2K+",
      uptime: "98.5%",
      performance: "92/100"
    },
    links: {
      demo: "#",
      github: "#"
    },
    featured: false
  },
  {
    id: 3,
    title: "AI-Powered Analytics Dashboard",
    description: "An intelligent dashboard that provides insights and predictions using machine learning algorithms.",
    longDescription: "Combines data visualization with AI-powered insights to help businesses make data-driven decisions. Features predictive analytics and automated reporting.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
    technologies: ["Angular", "Python", "TensorFlow", "PostgreSQL", "Docker"],
    category: "AI/ML",
    status: "Live",
    metrics: {
      users: "5K+",
      uptime: "99.7%",
      performance: "88/100"
    },
    links: {
      demo: "#",
      github: "#"
    },
    featured: true
  }
];

const categories = ["All", "Full-Stack", "Web App", "AI/ML", "Mobile"];

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <section id="projects" className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Featured Projects
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            A showcase of my recent work - where creativity meets functionality
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              size="sm"
              className="transition-all duration-200 hover:scale-105"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project, index) => (
            <Card 
              key={project.id} 
              className={`group hover-lift cursor-pointer transition-all duration-300 ${
                project.featured ? 'ring-2 ring-primary/20' : ''
              }`}
              onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Status Badge */}
                <Badge 
                  className={`absolute top-3 right-3 ${
                    project.status === 'Live' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}
                >
                  {project.status}
                </Badge>

                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-3 left-3 flex items-center gap-1 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs">
                    <Star className="h-3 w-3" />
                    Featured
                  </div>
                )}
              </div>

              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{project.title}</span>
                  <Badge variant="secondary">{project.category}</Badge>
                </CardTitle>
                <CardDescription>
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.technologies.length - 3} more
                    </Badge>
                  )}
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="space-y-1">
                    <div className="flex items-center justify-center gap-1">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Users</span>
                    </div>
                    <p className="text-sm font-semibold">{project.metrics.users}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-center gap-1">
                      <Zap className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Uptime</span>
                    </div>
                    <p className="text-sm font-semibold">{project.metrics.uptime}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-center gap-1">
                      <TrendingUp className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Score</span>
                    </div>
                    <p className="text-sm font-semibold">{project.metrics.performance}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1 group">
                    <Eye className="mr-2 h-3 w-3 group-hover:scale-110 transition-transform duration-200" />
                    Demo
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 group">
                    <Github className="mr-2 h-3 w-3 group-hover:scale-110 transition-transform duration-200" />
                    Code
                  </Button>
                </div>

                {/* Expanded Details */}
                {selectedProject === project.id && (
                  <div className="mt-4 pt-4 border-t border-border animate-fade-in">
                    <p className="text-sm text-muted-foreground mb-3">
                      {project.longDescription}
                    </p>
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">All Technologies:</h4>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="inline-block hover-lift bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-none">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Want to see more?</h3>
              <p className="text-muted-foreground mb-4">
                Check out my GitHub for more projects and contributions
              </p>
              <Button asChild className="group">
                <a href="https://github.com/ekintkara" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                  View All Projects
                  <ExternalLink className="ml-2 h-3 w-3 group-hover:scale-110 transition-transform duration-200" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
