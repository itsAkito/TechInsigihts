'use client';

import { Button } from '@/ui/button';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/auth-context';
import { Zap, ArrowRight } from 'lucide-react';

export default function Header() {
  const { user } = useAuth();

  return (
    <div className="relative overflow-hidden pt-12 pb-20">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-950 dark:to-slate-900" />
      <div className="absolute inset-0 -z-10 h-full w-full">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      </div>

      <div className="container mx-auto px-4">
        <div className="space-y-8 text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">
            <Zap className="w-4 h-4" />
            Welcome to TechyBlogs
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
            Discover Cutting-Edge
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {' '}
              Tech Insights
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Explore in-depth articles about web development, mobile apps, cloud computing,
            and the latest trends in technology. Stay ahead with expert insights and practical tutorials.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="#blogs">
              <Button size="lg" className="gap-2 bg-blue-600 hover:bg-blue-700">
                Explore Blogs
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            {!user ? (
              <Link href="#auth-dialog">
                <Button size="lg" variant="outline">
                  Start Reading
                </Button>
              </Link>
            ) : (
              <Link href="/admin">
                <Button size="lg" variant="outline">
                  Admin Panel
                </Button>
              </Link>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-12">
            <div className="space-y-2">
              <p className="text-3xl font-bold text-foreground">2+</p>
              <p className="text-sm text-muted-foreground">Blog Posts</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-foreground">5</p>
              <p className="text-sm text-muted-foreground">Categories</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-foreground">5K+</p>
              <p className="text-sm text-muted-foreground">Views</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
