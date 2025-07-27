"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Sun,
  Moon,
  Download,
  Code2,
  Sparkles
} from "lucide-react";
import Image from "next/image";

export function Header() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-4 sm:p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 group">
            <span className="sr-only">Taylan Ekin Kara</span>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Image
                  src="https://avatars.githubusercontent.com/u/92255945?v=4"
                  alt="Taylan Ekin Kara"
                  width={40}
                  height={40}
                  className="rounded-lg transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-1">
                  <Code2 className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-sm">Taylan Ekin</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(true)}
            className="h-10 w-10 hover:bg-accent/50 transition-colors duration-200"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9 hover:bg-accent/50 transition-all duration-200 hover:scale-105"
          >
            {mounted &&
              (theme === "dark" ? (
                <Sun className="h-4 w-4 transition-transform duration-200" />
              ) : (
                <Moon className="h-4 w-4 transition-transform duration-200" />
              ))}
          </Button>
          <Button asChild className="group relative overflow-hidden">
            <a href="https://ekintkara.sirv.com/TaylanEkinKara_CV.pdf" target="_blank" rel="noopener noreferrer">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Download className="mr-2 h-4 w-4 relative z-10 transition-transform duration-200 group-hover:scale-110" />
              <span className="relative z-10">Download CV</span>
              <Sparkles className="ml-2 h-3 w-3 relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </a>
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden ${
          mobileMenuOpen ? "fixed inset-0 z-50" : "hidden"
        }`}
      >
        <div
          className={`fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300 ${
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMobileMenu}
        />
        <div className={`fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="h-5 w-5 text-primary" />
              <span className="font-semibold">Menu</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeMobileMenu}
              className="h-10 w-10 hover:bg-accent/50 transition-colors duration-200"
            >
              <span className="sr-only">Close menu</span>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="mt-8 flow-root">
            <div className="space-y-6">
              {/* Navigation Links */}
              <div className="space-y-4">
                <a
                  href="#about"
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 text-base font-medium rounded-lg hover:bg-accent/50 transition-colors duration-200"
                >
                  About
                </a>
                <a
                  href="#skills"
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 text-base font-medium rounded-lg hover:bg-accent/50 transition-colors duration-200"
                >
                  Skills
                </a>
                <a
                  href="#projects"
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 text-base font-medium rounded-lg hover:bg-accent/50 transition-colors duration-200"
                >
                  Projects
                </a>
                <a
                  href="#contact"
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 text-base font-medium rounded-lg hover:bg-accent/50 transition-colors duration-200"
                >
                  Contact
                </a>
              </div>

              {/* Actions */}
              <div className="pt-6 border-t border-border">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Theme</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleTheme}
                      className="h-9 w-9 hover:bg-accent/50 transition-all duration-200 hover:scale-105"
                    >
                      {mounted &&
                        (theme === "dark" ? (
                          <Sun className="h-4 w-4" />
                        ) : (
                          <Moon className="h-4 w-4" />
                        ))}
                    </Button>
                  </div>
                  <Button asChild className="w-full group relative overflow-hidden">
                    <a href="https://ekintkara.sirv.com/TaylanEkinKara_CV.pdf" target="_blank" rel="noopener noreferrer">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Download className="mr-2 h-4 w-4 relative z-10 transition-transform duration-200 group-hover:scale-110" />
                      <span className="relative z-10">Download CV</span>
                      <Sparkles className="ml-2 h-3 w-3 relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
