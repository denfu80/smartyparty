import GamePageClient from './GamePageClient';

// For static export with SPA routing: generate a fallback page
// Firebase Hosting rewrites will handle all /game/* routes to this page
export function generateStaticParams() {
  // Generate at least one path so Next.js creates the route structure
  return [{ gameId: '_' }];
}

export default function GamePage() {
  return <GamePageClient />;
}
