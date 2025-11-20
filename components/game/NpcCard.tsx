/**
 * NpcCard Component - Story #2 (US-001, US-002)
 * Displays NPC information with option to speak
 */

'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageCircle, User } from 'lucide-react';
import { NPC } from '@/lib/types/game';

interface NpcCardProps {
  npc: NPC;
  onSpeakClick?: (npcId: string) => void;
  showActions?: boolean;
}

export function NpcCard({ npc, onSpeakClick, showActions = true }: NpcCardProps) {
  // Get initials for avatar fallback
  const initials = npc.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <Avatar className="h-16 w-16">
            {npc.avatar && <AvatarImage src={npc.avatar} alt={npc.name} />}
            <AvatarFallback className="bg-blue-500 text-white text-lg">
              {initials}
            </AvatarFallback>
          </Avatar>

          {/* Name & Greeting */}
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {npc.name}
            </CardTitle>
            <CardDescription className="mt-2 italic">
              "{npc.greeting}"
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Description */}
        {npc.description && (
          <p className="text-sm text-muted-foreground">{npc.description}</p>
        )}

        {/* Personality */}
        <div className="flex flex-wrap gap-2">
          {npc.personality.map((trait) => (
            <Badge key={trait} variant="secondary">
              {trait}
            </Badge>
          ))}
        </div>
      </CardContent>

      {showActions && onSpeakClick && (
        <CardFooter>
          <Button
            variant="default"
            className="w-full"
            onClick={() => onSpeakClick(npc.id)}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Sprechen
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
