'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // <-- O brabo do Next.js
import { useQuizStore } from '@/lib/store/useQuizStore';
import { generateRunTeam } from '@/lib/engine/generateTeam';
import { getRandomChallenge, RunRule } from '@/lib/engine/rulesEngine';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import kantoDex from '@/data/kanto_dex.json';
type Pokemon = typeof kantoDex[0];

export default function ResultPage() {
  const router = useRouter();
  const { difficulty, playStyle, starterId, resetQuiz } = useQuizStore();
  
  // O truque pra evitar erro de hidratação (Server vs Client)
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (!starterId || !playStyle) {
      router.push('/');
    }
  }, [starterId, playStyle, router]);

  const { team, rule } = useMemo(() => {
    if (!isMounted || !starterId || !playStyle) return { team: [], rule: null };
    return {
      team: generateRunTeam(starterId, playStyle),
      rule: getRandomChallenge(difficulty)
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  const handleRestart = () => {
    resetQuiz();
    router.push('/');
  };

  if (!isMounted || !rule || team.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center text-zinc-50">
        <p className="text-xl animate-pulse text-zinc-400">Calculando o seu sofrimento...</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center text-zinc-50 p-6 pb-20">
      <div className="w-full max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 mt-10">
        
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Sua Run foi Forjada</h1>
          <p className="text-zinc-400">Sobreviva se for capaz.</p>
        </div>

        <Card className="border-red-900 bg-red-950/20 shadow-lg shadow-red-900/10">
          <CardHeader>
            <CardTitle className="text-2xl text-red-500 flex items-center gap-2">
              ⚠️ {rule.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-300 leading-relaxed text-lg">
              {rule.description}
            </p>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-zinc-100 px-1 border-b border-zinc-800 pb-2">
            Seu Esquadrão
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {team.map((pokemon) => (
              <Card key={pokemon.id} className="bg-zinc-900 border-zinc-800 overflow-hidden group">
                <CardContent className="p-4 flex flex-col items-center text-center space-y-3">
                  <div className="relative w-24 h-24 bg-zinc-800 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Image 
                      src={pokemon.sprite} 
                      alt={pokemon.name} 
                      width={80}
                      height={80}
                      unoptimized
                      className="object-contain drop-shadow-md"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg text-zinc-100 capitalize">
                      {pokemon.name}
                    </h3>
                    <div className="flex gap-2 justify-center">
                      {pokemon.types.map((type) => (
                        <span 
                          key={type} 
                          className="text-xs font-semibold px-2 py-1 bg-zinc-800 text-zinc-400 rounded-md capitalize border border-zinc-700"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex justify-center pt-8">
          <Button 
            onClick={handleRestart}
            variant="outline"
            className="border-zinc-700 text-black hover:bg-zinc-800 hover:text-white px-8 py-6 rounded-none font-bold"
          >
            Tentar Outra Sorte
          </Button>
        </div>

      </div>
    </main>
  );
}