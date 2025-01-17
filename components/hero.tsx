"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  Copy,
  Check,
  Twitter,
  Instagram,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
const skills = [".NET Core", "Node.js", "React", "Next.js", "Angular"];
import Image from "next/image";

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
    <div className="relative isolate pt-14">
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#1E40AF] to-[#60A5FA] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="py-18 sm:py-20 lg:pb-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="flex justify-center">
              <Image
                src="https://avatars.githubusercontent.com/u/92255945?v=4"
                alt=""
                title=""
                width={256}
                height={256}
                className="rounded-lg"
              />{" "}
            </h1>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl pt-6">
              Full-Stack Software Developer
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Specializing in{" "}
              <span className="text-primary font-semibold">
                {skills[skillIndex]}
              </span>
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button asChild variant="outline" size="lg">
                <a
                  href="https://github.com/ekintkara"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-5 w-5" />
                  GitHub
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a
                  href="https://linkedin.com/in/taylanekin"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="mr-2 h-5 w-5" />
                  LinkedIn
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a
                  href="https://x.com/ekintkara"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="mr-2 h-5 w-5" />
                  Twitter
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a
                  href="https://x.com/ekintkara"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="mr-2 h-5 w-5" />
                  Instagram
                </a>
              </Button>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="ghost"
                onClick={() =>
                  copyToClipboard("taylanekin01@gmail.com", "email")
                }
              >
                <Mail className="mr-2 h-4 w-4" />
                taylanekin01@gmail.com
                {copied === "email" ? (
                  <Check className="ml-2 h-4 w-4" />
                ) : (
                  <Copy className="ml-2 h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                onClick={() => copyToClipboard("+90 507 186 34 26", "phone")}
              >
                <Phone className="mr-2 h-4 w-4" />
                +90 507 186 34 26
                {copied === "phone" ? (
                  <Check className="ml-2 h-4 w-4" />
                ) : (
                  <Copy className="ml-2 h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#1E40AF] to-[#60A5FA] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </div>
  );
}
