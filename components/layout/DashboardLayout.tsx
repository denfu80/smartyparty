/**
 * DashboardLayout Component
 * Simpler layout without sidebar for dashboard/lobby screens
 */

'use client';

import { ReactNode } from 'react';
import { Navbar } from './Navbar';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container py-6">
        {children}
      </main>
    </div>
  );
}
