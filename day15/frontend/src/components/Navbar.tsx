'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/useAuthStore';
import { Building2, LogOut, Shield, HardHat } from 'lucide-react';

export function Navbar() {
  const router = useRouter();
  const { user, isAuthenticated, logout, initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/projects" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:scale-105 transition-transform">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-100 tracking-tight text-lg">NirmanIQ</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 font-medium">
                Checkpoint #1
              </span>
            </div>
            <p className="text-xs text-slate-400">Tower Progress Tracker</p>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          {isAuthenticated && user ? (
            <>
              <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
                <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-slate-300">
                  {user.role === 'PROJECT_MANAGER' ? (
                    <Shield className="w-4 h-4 text-sky-400" />
                  ) : (
                    <HardHat className="w-4 h-4 text-emerald-400" />
                  )}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-medium text-slate-200">{user.email}</p>
                  <span
                    className={`inline-block text-[10px] font-semibold uppercase px-1.5 py-0.2 rounded ${
                      user.role === 'PROJECT_MANAGER'
                        ? 'text-sky-400 bg-sky-950/80'
                        : 'text-emerald-400 bg-emerald-950/80'
                    }`}
                  >
                    {user.role.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent hover:border-slate-800 transition"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-medium transition"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
