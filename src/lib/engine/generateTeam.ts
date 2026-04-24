import kantoDex from '@/data/kanto_dex.json';

type Pokemon = typeof kantoDex[0];

const BANNED_IDS = [144, 145, 146, 150, 151];

const STARTER_FINAL_EVO: Record<number, number> = {
  1: 3,
  4: 6,
  7: 9
};

const ALL_STARTERS_FAMILY = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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

  const finalStarterId = STARTER_FINAL_EVO[starterId] || starterId;
  
  const starter = kantoDex.find((p) => p.id === finalStarterId);
  if (!starter) throw new Error("Starter não encontrado!");
  
  team.push(starter);
  starter.types.forEach((t: string) => usedTypes.add(t));

  const starterFamily = [starterId, starterId + 1, starterId + 2];
  
  const rivalStartersToBan = ALL_STARTERS_FAMILY.filter(id => !starterFamily.includes(id));
  
  const dynamicBans = [...BANNED_IDS, ...rivalStartersToBan];

  const eligiblePool = kantoDex.filter(p => 
    !dynamicBans.includes(p.id) && 
    !starterFamily.includes(p.id)
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
    const remaining = kantoDex.filter(p => 
      !team.includes(p) && 
      !dynamicBans.includes(p.id) && 
      !starterFamily.includes(p.id)
    );
    const shuffledRemaining = shuffle(remaining);
    
    for (const p of shuffledRemaining) {
      if (team.length >= 6) break;
      team.push(p);
    }
  }

  return team;
}