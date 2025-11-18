import GamePageClient from './GamePageClient';

// For static export: generate empty params (pages will be client-rendered)
export function generateStaticParams() {
  return [];
}

export default function GamePage() {
  return <GamePageClient />;
}
