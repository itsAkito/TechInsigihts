'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth/auth-context';
import { Button } from '@/ui/button';

export function ProtectedBlogContent({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center min-h-[400px]">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Sign in to view this post</h2>
          <p className="text-muted-foreground">Please log in to access blog content</p>
          <div className="flex gap-4 justify-center pt-4">
            <Link href="/auth/user-login">
              <Button>User Login (OTP)</Button>
            </Link>
            <Link href="/auth/admin-login">
              <Button variant="outline">Admin Login</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
