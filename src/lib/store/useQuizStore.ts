import { create } from 'zustand';

interface QuizState {
    difficulty: number;
    playStyle: 'offense' | 'defense' | 'balanced' | null;
    starterId: number | null;
    setDifficulty: (val: number) => void;
    setPlayStyle: (style: 'offense' | 'defense' | 'balanced') => void;
    setStarterId: (id: number | null) => void;
    resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
    difficulty: 1,
    playStyle: null,
    starterId: null,
    setDifficulty: (val) => set({ difficulty: val }),
    setPlayStyle: (style) => set({ playStyle: style }),
    setStarterId: (id) => set({ starterId: id }),
    resetQuiz: () => set({ difficulty: 1, playStyle: null, starterId: null }),
}))