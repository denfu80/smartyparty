'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import HomePage from './HomePage';
import LoginPage from './login/page';
import DashboardPage from './dashboard/page';
import GameClient from './game/[...id]/GameClient';
import TradePage from './game/[...id]/TradePage';
import TerritoryPage from './game/[...id]/TerritoryPage';
import NPCsPage from './game/[...id]/NPCsPage';

export default function RouteHandler() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log('RouteHandler - Current pathname:', pathname);
  }, [pathname]);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Parse URL and render appropriate component
  if (pathname === '/' || pathname === '') {
    return <HomePage />;
  }

  if (pathname === '/login' || pathname === '/login/') {
    return <LoginPage />;
  }

  if (pathname === '/dashboard' || pathname === '/dashboard/') {
    return <DashboardPage />;
  }

  // Check for game sub-routes first (more specific matches)
  if (pathname.match(/^\/game\/[^\/]+\/trade\/?$/)) {
    console.log('RouteHandler - Detected trade route');
    return <TradePage />;
  }

  if (pathname.match(/^\/game\/[^\/]+\/territory\/?$/)) {
    console.log('RouteHandler - Detected territory route');
    return <TerritoryPage />;
  }

  if (pathname.match(/^\/game\/[^\/]+\/npcs\/?$/)) {
    console.log('RouteHandler - Detected NPCs route');
    return <NPCsPage />;
  }

  // Check for game main route: /game/xxxxx
  const gameMatch = pathname.match(/^\/game\/([^\/]+)\/?$/);
  if (gameMatch) {
    console.log('RouteHandler - Detected game overview route');
    return <GameClient />;
  }

  // Fallback to home page for unknown routes
  console.log('RouteHandler - Unknown route, showing home page');
  return <HomePage />;
}
