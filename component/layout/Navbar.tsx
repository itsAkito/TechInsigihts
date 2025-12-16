"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/ui/button';
import { useAuth } from '@/lib/auth/auth-context';
import { LogOut, User, LogIn } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu';

export function Navbar() {
  const { user, profile, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <header className="border-b bg-background sticky top-0 z-40">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            TechyBlogs
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 flex-1 mx-8">
          <Link href="/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Blog
          </Link>
          <Link href="/categories" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Categories
          </Link>
          <Link href="/analytics" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Analytics
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground hidden sm:inline">
                {profile?.username || user.email?.split('@')[0]}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="rounded-full w-10 h-10 p-0">
                    <User size={18} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem disabled>
                    <span className="text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push('/profile')}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/admin')}>
                    Admin Panel
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push('/auth/user-login')}
                className="flex items-center gap-1"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">User Login</span>
              </Button>
              <Button
                size="sm"
                onClick={() => router.push('/auth/admin-login')}
                className="flex items-center gap-1"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Admin</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
