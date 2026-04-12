'use client';

import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/lib/store/useQuizStore';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function QuizPage() {
  const router = useRouter();
  const { difficulty, setDifficulty } = useQuizStore();

  const handleNext = () => {
    console.log("Dificuldade escolhida:", difficulty);
    router.push('/result'); 
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-zinc-50 p-6">
      <div className="w-full max-w-xl space-y-8">
        
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Select the Difficulty Level</h2>
          <p className="text-zinc-400">This defines the rules for your run.</p>
        </div>

        <div className="grid gap-4">
          {[1, 2, 3, 4, 5].map((level) => (
            <Card 
              key={level}
              className={`cursor-pointer transition-colors border-zinc-800 hover:border-zinc-500 ${difficulty === level ? 'bg-zinc-900 border-red-500' : 'bg-transparent'}`}
              onClick={() => setDifficulty(level)}
            >
              <CardHeader className="p-4">
                <CardTitle className="text-lg flex justify-between items-center text-zinc-100">
                  Level {level}
                  <span className="text-red-500">
                    {'★'.repeat(level)}
                  </span>
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="flex justify-end pt-6">
          <Button 
            onClick={handleNext}
            className="bg-white text-black hover:bg-zinc-200 font-bold px-8 rounded-none"
          >
            Next
          </Button>
        </div>

      </div>
    </main>
  );
}