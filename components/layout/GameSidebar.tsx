/**
 * GameSidebar Component
 * Sidebar navigation for game screens
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard,
  TrendingUp,
  Map,
  Users,
  Coins,
  Zap,
} from 'lucide-react';

interface GameSidebarProps {
  gameId?: string;
  playerStats?: {
    credits: number;
    influence: number;
    reputation: number;
  };
}

export function GameSidebar({ gameId, playerStats }: GameSidebarProps) {
  const pathname = usePathname();

  const navItems = [
    {
      title: 'Übersicht',
      href: gameId ? `/game/${gameId}` : '/dashboard',
      icon: LayoutDashboard,
    },
    {
      title: 'Handel',
      href: gameId ? `/game/${gameId}/trade` : '/trade',
      icon: TrendingUp,
    },
    {
      title: 'Territorium',
      href: gameId ? `/game/${gameId}/territory` : '/territory',
      icon: Map,
    },
    {
      title: 'NPCs',
      href: gameId ? `/game/${gameId}/npcs` : '/npcs',
      icon: Users,
    },
  ];

  return (
    <div className="w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="space-y-4 py-4">
        {/* Navigation */}
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Navigation
          </h2>
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent hover:text-accent-foreground',
                    isActive
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>

        <Separator />

        {/* Player Stats Card */}
        {playerStats && (
          <div className="px-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  Deine Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Coins className="h-4 w-4" />
                    Credits
                  </div>
                  <Badge variant="outline">
                    {playerStats.credits.toLocaleString()}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Zap className="h-4 w-4" />
                    Einfluss
                  </div>
                  <Badge variant="outline">
                    {playerStats.influence}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    Reputation
                  </div>
                  <Badge variant="outline">
                    {playerStats.reputation}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
