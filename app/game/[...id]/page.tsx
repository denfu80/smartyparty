import GameClient from './GameClient';

// Generate static params - returns dummy param to satisfy Next.js
// Actual game IDs are handled client-side via Firebase rewrites
export async function generateStaticParams() {
  // Return at least one path to satisfy output: export requirements
  return [{ id: ['placeholder'] }];
}

export default function GamePage() {
  return <GameClient />;
}
