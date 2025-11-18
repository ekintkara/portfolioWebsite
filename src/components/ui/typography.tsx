import React from 'react';
import { cn } from "@/lib/utils";

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

export const TypographyH1: React.FC<TypographyProps> = ({ children, className }) => {
  return (
    <h1 className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl", className)}>
      {children}
    </h1>
  );
};

export const TypographyH2: React.FC<TypographyProps> = ({ children, className }) => {
  return (
    <h2 className={cn("scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0", className)}>
      {children}
    </h2>
  );
};

export const TypographyH3: React.FC<TypographyProps> = ({ children, className }) => {
  return (
    <h3 className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)}>
      {children}
    </h3>
  );
};

export const TypographyH4: React.FC<TypographyProps> = ({ children, className }) => {
  return (
    <h4 className={cn("scroll-m-20 text-xl font-semibold tracking-tight", className)}>
      {children}
    </h4>
  );
};

export const TypographyP: React.FC<TypographyProps> = ({ children, className }) => {
  return (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}>
      {children}
    </p>
  );
};

export const TypographyBlockquote: React.FC<TypographyProps> = ({ children, className }) => {
  return (
    <blockquote className={cn("mt-6 border-l-2 pl-6 italic", className)}>
      {children}
    </blockquote>
  );
};

export const TypographyList: React.FC<TypographyProps> = ({ children, className }) => {
  return (
    <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}>
      {children}
    </ul>
  );
};

export const TypographyInlineCode: React.FC<TypographyProps> = ({ children, className }) => {
  return (
    <code className={cn("relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold", className)}>
      {children}
    </code>
  );
};

export const TypographyLead: React.FC<TypographyProps> = ({ children, className }) => {
  return (
    <p className={cn("text-xl text-muted-foreground", className)}>
      {children}
    </p>
  );
};

export const TypographyLarge: React.FC<TypographyProps> = ({ children, className }) => {
  return (
    <div className={cn("text-lg font-semibold", className)}>
      {children}
    </div>
  );
};

export const TypographySmall: React.FC<TypographyProps> = ({ children, className }) => {
  return (
    <small className={cn("text-sm font-medium leading-none", className)}>
      {children}
    </small>
  );
};

export const TypographyMuted: React.FC<TypographyProps> = ({ children, className }) => {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>
      {children}
    </p>
  );
};