import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-zinc-50 p-6">
      <div className="text-center space-y-6 max-w-2xl">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
          Kanto <span className="text-red-500">Run</span> Generator
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl">
          Uma ferramenta que vai te gerar uma run aleatória pra Pokémon Fire Red/Leaf Green, baseada nas suas escolhas de estilo de jogo e desafio.
        </p>
        
        <div className="pt-8">
          <Link href="/quiz">
            <Button size="lg" className="bg-white text-black hover:bg-zinc-200 font-bold text-lg px-8 py-6 rounded-none">
              Começar
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}