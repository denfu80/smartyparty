/**
 * GameLayout Component
 * Main layout wrapper for game screens with sidebar
 */

'use client';

import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { GameSidebar } from './GameSidebar';

interface GameLayoutProps {
  children: ReactNode;
  gameId?: string;
  playerStats?: {
    credits: number;
    influence: number;
    reputation: number;
  };
}

export function GameLayout({ children, gameId, playerStats }: GameLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="flex">
        {/* Desktop: Always visible, Mobile: Hidden */}
        <div className="hidden md:block">
          <GameSidebar gameId={gameId} playerStats={playerStats} />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
