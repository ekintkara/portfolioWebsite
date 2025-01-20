import { Header } from "@/components/header";
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <h2 className="mt-8 text-center text-xl font-semibold">
        Le code est mon art, le futur est ma toile.
      </h2>
    </main>
  );
}
