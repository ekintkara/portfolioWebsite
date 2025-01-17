import { Header } from '@/components/header'
import { Hero } from '@/components/hero'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <h2 className="mt-8 text-center text-xl font-semibold">
        Siz de projelerinizde yeni nesil teknolojilerle fark yaratın!
      </h2>
    </main>
  )
}