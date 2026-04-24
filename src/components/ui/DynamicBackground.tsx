'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { useQuizStore } from '@/lib/store/useQuizStore';

export function DynamicBackground() {
  const { starterId, playStyle } = useQuizStore();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  let glowColor = 'rgba(255, 255, 255, 0.03)';
  if (starterId === 1) glowColor = 'rgba(74, 222, 128, 0.12)';
  if (starterId === 4) glowColor = 'rgba(248, 113, 113, 0.12)';
  if (starterId === 7) glowColor = 'rgba(96, 165, 250, 0.12)';

  let glowSize = '600px';
  if (playStyle === 'offense') glowSize = '800px';
  if (playStyle === 'defense') glowSize = '400px';

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-50 bg-[#09090b]">
      
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          background: useMotionTemplate`radial-gradient(${glowSize} circle at ${springX}px ${springY}px, ${glowColor}, transparent 80%)`,
        }}
      />

      <div 
        className="absolute inset-0 mix-blend-overlay opacity-30" 
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#09090b_100%)] opacity-80" />
    </div>
  );
}