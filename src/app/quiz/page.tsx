'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/lib/store/useQuizStore';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  
  const { 
    difficulty, setDifficulty, 
    playStyle, setPlayStyle, 
    starterId, setStarterId
  } = useQuizStore();

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      router.push('/result');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.push('/');
    }
  };

  const isNextDisabled = 
    (step === 2 && !playStyle) || 
    (step === 3 && !starterId);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-zinc-50 p-6">
      <div className="w-full max-w-xl space-y-8">
        
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-2 mb-8">
              <h2 className="text-3xl font-bold tracking-tight">Qual nível de desafio você está buscando?</h2>
              <p className="text-zinc-400">Isso define as regras para sua run.</p>
            </div>
            <div className="grid gap-4">
              {[1, 2, 3, 4, 5].map((level) => (
                <Card 
                  key={level}
                  className={`cursor-pointer transition-all border-zinc-800 hover:border-zinc-500 ${difficulty === level ? 'bg-zinc-900 border-red-500 scale-[1.02]' : 'bg-transparent'}`}
                  onClick={() => setDifficulty(level)}
                >
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg flex justify-between items-center text-zinc-100">
                      Nível {level}
                      <span className="text-red-500">{'★'.repeat(level)}</span>
                    </CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-2 mb-8">
              <h2 className="text-3xl font-bold tracking-tight">Qual teu tipo de batalha?</h2>
              <p className="text-zinc-400">Isso define as características da sua equipe.</p>
            </div>
            <div className="grid gap-4">
              {[
                { id: 'offense', label: 'Atacante Forte', desc: 'Bate forte e rápido.' },
                { id: 'defense', label: 'Tanka Tudo', desc: 'Resiste a tudo e vence por resistência.' },
                { id: 'balanced', label: 'Balanceado', desc: 'Um pouco de tudo para evitar problemas.' }
              ].map((style) => (
                <Card 
                  key={style.id}
                  className={`cursor-pointer transition-all border-zinc-800 hover:border-zinc-500 ${playStyle === style.id ? 'bg-zinc-900 border-red-500 scale-[1.02]' : 'bg-transparent'}`}
                  onClick={() => setPlayStyle(style.id as 'offense' | 'defense' | 'balanced')}
                >
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg text-zinc-100">{style.label}</CardTitle>
                    <p className="text-sm text-zinc-400 font-normal">{style.desc}</p>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-2 mb-8">
              <h2 className="text-3xl font-bold tracking-tight">Escolha seu parceiro</h2>
              <p className="text-zinc-400">O primeiro de muitos que vão sofrer com você.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { id: 1, name: 'Bulbasaur', color: 'hover:border-green-500', activeColor: 'border-green-500' },
                { id: 4, name: 'Charmander', color: 'hover:border-red-500', activeColor: 'border-red-500' },
                { id: 7, name: 'Squirtle', color: 'hover:border-blue-500', activeColor: 'border-blue-500' }
              ].map((starter) => (
                <Card 
                  key={starter.id}
                  className={`cursor-pointer transition-all border-zinc-800 ${starterId === starter.id ? `bg-zinc-900 scale-[1.05] ${starter.activeColor}` : `bg-transparent ${starter.color}`}`}
                  onClick={() => setStarterId(starter.id)}
                >
                  <CardHeader className="p-4 text-center">
                    <CardTitle className="text-lg text-zinc-100">{starter.name}</CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between pt-6 border-t border-zinc-800">
          <Button 
            onClick={handleBack}
            variant="ghost"
            className="text-zinc-400 hover:text-white"
          >
            Voltar
          </Button>
          <Button 
            onClick={handleNext}
            disabled={isNextDisabled}
            className="bg-white text-black hover:bg-zinc-200 font-bold px-8 rounded-none disabled:opacity-50"
          >
            {step === 3 ? 'Generate Run' : 'Next'}
          </Button>
        </div>

      </div>
    </main>
  );
}