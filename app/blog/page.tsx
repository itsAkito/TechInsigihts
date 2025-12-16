'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import { getPublishedPosts } from '@/lib/api/posts';
import { Card, CardContent, CardFooter, CardHeader } from '@/ui/card';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { formatDistanceToNow } from 'date-fns';

type Post = {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  cover_image: string | null;
  category?: { name: string };
  author?: { username: string };
  created_at: string;
};

export default function BlogPage() {
  const { user, loading: authLoading } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadPosts();
    }
  }, [user]);

  const loadPosts = async () => {
    try {
      const data = await getPublishedPosts();
      setPosts(data as Post[]);
    } catch (error) {
      console.error('Failed to load posts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return <div className="flex justify-center items-center min-h-[400px]">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Sign in to view blogs</h2>
          <p className="text-muted-foreground">Please log in to access our blog content</p>
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

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Blog Posts</h1>
            <p className="text-muted-foreground mt-2">Discover amazing content from our community</p>
          </div>

          {posts.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground mb-4">No blog posts yet. Check back soon!</p>
                <Link href="/new">
                  <Button>Create First Post</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h2 className="text-2xl font-bold">{post.title}</h2>
                          {post.category && (
                            <Badge className="mt-2">{post.category.name}</Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
                    </CardContent>
                    <CardFooter className="text-sm text-muted-foreground">
                      {post.author && <span>{post.author.username}</span>}
                      <span className="ml-auto">
                        {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                      </span>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
