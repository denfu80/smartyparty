/**
 * NpcDialogModal Component - Story #2 (US-001, US-002)
 * Modal for NPC dialog with AI-powered responses
 */

'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Loader2, MessageCircle } from 'lucide-react';
import { NPC } from '@/lib/types/game';
import { generateNpcDialog } from '@/lib/services/aiService';

interface NpcDialogModalProps {
  npc: NPC | null;
  gameId: string;
  playerId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function NpcDialogModal({
  npc,
  gameId,
  playerId,
  isOpen,
  onClose,
}: NpcDialogModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [dialogText, setDialogText] = useState<string | null>(null);
  const [isCached, setIsCached] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset state when modal closes
  const handleClose = () => {
    setDialogText(null);
    setError(null);
    setIsCached(false);
    onClose();
  };

  // Generate dialog when "Sprechen" is clicked
  const handleSpeak = async () => {
    if (!npc) return;

    setIsLoading(true);
    setError(null);

    try {
      // Context for AI (Quick & Dirty: simple context)
      const context = `Du triffst ${npc.name}. Er ist ${npc.personality.join(', ')}. Was sagst du?`;

      // Call AI service
      const response = await generateNpcDialog(gameId, npc.id, playerId, context);

      setDialogText(response.dialog);
      setIsCached(response.cached);
    } catch (err) {
      console.error('Error generating NPC dialog:', err);
      setError('Fehler beim Laden des Dialogs.');

      // Fallback to greeting
      setDialogText(npc.greeting);
    } finally {
      setIsLoading(false);
    }
  };

  if (!npc) return null;

  // Get initials for avatar
  const initials = npc.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              {npc.avatar && <AvatarImage src={npc.avatar} alt={npc.name} />}
              <AvatarFallback className="bg-blue-500 text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <DialogTitle>{npc.name}</DialogTitle>
              <DialogDescription className="flex flex-wrap gap-1 mt-1">
                {npc.personality.map((trait) => (
                  <Badge key={trait} variant="secondary" className="text-xs">
                    {trait}
                  </Badge>
                ))}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Dialog Content */}
        <div className="py-4">
          {!dialogText && !error && (
            <div className="text-center text-muted-foreground py-8">
              <MessageCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Klicke auf "Sprechen" um ein Gespräch zu beginnen</p>
            </div>
          )}

          {dialogText && (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm">{dialogText}</p>
              </div>
              {isCached && (
                <Badge variant="outline" className="text-xs">
                  Aus Cache geladen
                </Badge>
              )}
            </div>
          )}

          {error && (
            <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
              <p className="text-sm">{error}</p>
            </div>
          )}
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={handleClose}>
            Schließen
          </Button>
          <Button onClick={handleSpeak} disabled={isLoading}>
            {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Sprechen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
