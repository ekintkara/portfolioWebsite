import { Hero } from "@/components/hero";
import { EasterEggs } from "@/components/easter-eggs";
import { ScrollToTop } from "@/components/scroll-to-top";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* ASCII Art Background */}
      <div className="ascii-background"></div>
      <Hero />

      {/* Scroll to Top Button */}
      <ScrollToTop />

      {/* Easter Eggs and Playful Elements */}
      <EasterEggs />
    </main>
  );
}
