# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a 3D interactive portfolio website built with Next.js, featuring:

- **3D Interactive Keyboard**: Custom Spline 3D model that responds to scroll and user interactions
- **Smooth Animations**: GSAP and Framer Motion animations throughout
- **Real-time Features**: Socket.io integration for multi-user cursors and interactions
- **Responsive Design**: Mobile-first approach with adaptive 3D interactions
- **Contact System**: Resend API for email functionality

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Environment Variables

Create `.env.local` in the root directory:

```bash
# Required for contact form functionality
RESEND_API_KEY=your_resend_api_key_here

# Optional: For analytics
UMAMI_DOMAIN=https://your-analytics-domain.com/script.js
UMAMI_SITE_ID=your_site_id

# Optional: For real-time features
NEXT_PUBLIC_WS_URL=your_websocket_server_url
```

## Architecture & Key Components

### Core Structure
- **Next.js 14 App Router**: Uses TypeScript and strict mode
- **Layout System**: Root layout in `src/app/layout.tsx` with theme provider, particles, preloader, and global components
- **Main Page**: `src/app/page.tsx` with four main sections (Hero, Skills, Projects, Contact)

### 3D Interaction System (`src/components/animated-background.tsx`)
- **Spline Integration**: Interactive 3D keyboard loaded from `/assets/skills-keyboard.spline`
- **Section-based States**: Different keyboard positions/scales for each page section
- **GSAP Animations**: ScrollTrigger-based animations that transform the 3D model
- **Skill Interactions**: Keyboard keys represent skills with hover/click events
- **Responsive Adaptation**: Separate mobile/desktop configurations

### Animation Framework
- **GSAP**: Primary animation library with ScrollTrigger for scroll-based animations
- **Framer Motion**: Component-level animations and reveals
- **Custom Hooks**: `usePreloader` for loading state management
- **Smooth Scrolling**: Custom smooth scroll implementation with Lenis

### Real-time Features (`src/contexts/socketio.tsx`)
- **Socket.io Client**: Connects to WebSocket server for multi-user features
- **Remote Cursors**: Shows other users' cursors on the page
- **Online Users**: Display of active users and their locations
- **Message System**: Real-time messaging between users

### UI Component System
- **Shadcn/ui**: Component library with Radix UI primitives
- **Tailwind CSS**: Styling with dark/light theme support
- **Lucide React**: Icon system
- **Custom Components**: Elastic cursor, particles, reveal animations

### Contact System
- **API Route**: `src/app/api/send/route.ts` with Zod validation
- **Resend Integration**: Email sending service
- **Form Components**: Contact form with TypeScript validation
- **Email Template**: React component for email formatting

## Key Files to Understand

1. **`src/components/animated-background.tsx`**: Core 3D interaction logic
2. **`src/data/constants.ts`**: Skills configuration and 3D object mappings
3. **`src/components/sections/`**: Main page sections (Hero, Skills, Projects, Contact)
4. **`src/hooks/use-media-query.ts`**: Responsive breakpoint management
5. **`src/data/config.ts`**: Site configuration and metadata

## Development Notes

### 3D Model Considerations
- The Spline keyboard model must be present in `/public/assets/skills-keyboard.spline`
- Each skill corresponds to a key in the 3D model
- Mobile and desktop use different keycap objects (`keycap-mobile` vs `keycap-desktop`)

### Performance Optimizations
- Lazy loading for Spline component
- GSAP animations with hardware acceleration
- Debounced scroll events
- Responsive image handling

### Theme System
- Uses `next-themes` for dark/light mode switching
- 3D model visibility changes based on theme
- Smooth theme transitions with proper contrast

### Socket.io Integration
- Requires external WebSocket server (URL in env var)
- Graceful fallback when server is unavailable
- Automatic reconnection handling

## Common Development Patterns

### Adding New Skills
1. Update `src/data/constants.ts` with new skill data
2. Ensure corresponding 3D object exists in Spline model
3. The skill will automatically appear in keyboard interactions

### Creating New Sections
1. Add section component to `src/components/sections/`
2. Import and add to main page in `src/app/page.tsx`
3. Add corresponding ScrollTrigger animation to 3D keyboard states

### Styling Guidelines
- Use Tailwind classes for consistency
- Dark mode requires explicit color variants
- Maintain responsive design patterns with `useMediaQuery` hook