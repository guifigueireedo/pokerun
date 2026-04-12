import kantoDex from '@/data/kanto_dex.json';

type Pokemon = typeof kantoDex[0];

const BANNED_IDS = [144, 145, 146, 150, 151];

function getStyleScore(pokemon: Pokemon, style: 'offense' | 'defense' | 'balanced'): number {
  const { hp, attack, defense, speed } = pokemon.stats;
  
  if (style === 'offense') return attack + speed;
  if (style === 'defense') return hp + defense;
  return hp + attack + defense + speed; 
}

function shuffle<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}

export function generateRunTeam(
  starterId: number, 
  playStyle: 'offense' | 'defense' | 'balanced'
): Pokemon[] {
  const team: Pokemon[] = [];
  const usedTypes = new Set<string>();

  const starter = kantoDex.find((p) => p.id === starterId);
  if (!starter) throw new Error("Starter não encontrado!");
  
  team.push(starter);
  starter.types.forEach((t: string) => usedTypes.add(t));

  const eligiblePool = kantoDex.filter(p => 
    p.id !== starterId && 
    !BANNED_IDS.includes(p.id)
  );

  eligiblePool.sort((a, b) => getStyleScore(b, playStyle) - getStyleScore(a, playStyle));

  const draftPool = shuffle(eligiblePool.slice(0, 40));

  for (const p of draftPool) {
    if (team.length >= 6) break;

    const hasConflict = p.types.some((t: string) => usedTypes.has(t));
    
    if (!hasConflict) {
      team.push(p);
      p.types.forEach((t: string) => usedTypes.add(t));
    }
  }

  if (team.length < 6) {
    const remaining = kantoDex.filter(p => !team.includes(p) && !BANNED_IDS.includes(p.id));
    const shuffledRemaining = shuffle(remaining);
    
    for (const p of shuffledRemaining) {
      if (team.length >= 6) break;
      team.push(p);
    }
  }

  return team;
}