'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/hooks/useAuth';
import { signOut } from '@/lib/firebase/auth';

export function Navbar() {
  const { user, isAuthenticated } = useAuth();

  async function handleLogout() {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <Link href="/" className="text-2xl font-bold">
          Sternenhaus
        </Link>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <div className="flex items-center gap-3">
                {user?.photoURL && (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <span className="text-sm font-medium">{user?.displayName}</span>
              </div>
              <Button onClick={handleLogout} variant="outline">
                Logout
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
