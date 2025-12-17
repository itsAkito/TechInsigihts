'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ADMIN_CREATED_BLOGS } from '@/lib/api/admin-data';
import { Card, CardContent } from '@/ui/card';
import { Badge } from '@/ui/badge';
import { formatDistanceToNow } from 'date-fns';

type Post = {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  image_url?: string;
  category_name?: string;
  author_name?: string;
  created_at: string;
  views?: number;
  published?: boolean;
};

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      // Combine admin-created blogs with user-created blogs
      const userBlogs = localStorage.getItem('techy_blogs');
      const allBlogs = [...ADMIN_CREATED_BLOGS];
      if (userBlogs) {
        const parsed = JSON.parse(userBlogs);
        allBlogs.push(...parsed);
      }
      
      // Filter published blogs
      const published = allBlogs.filter((b: any) => b.published !== false);
      setPosts(published as Post[]);
    } catch (error) {
      console.error('Failed to load posts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-96">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Blog Posts</h1>
            <p className="text-muted-foreground mt-2">Discover amazing content from our community</p>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4 text-lg">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full overflow-hidden group">
                    {post.image_url && (
                      <div className="relative h-48 overflow-hidden bg-muted">
                        <img
                          src={post.image_url}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardContent className="p-6 space-y-4">
                      {post.category_name && (
                        <Badge variant="secondary" className="text-xs">
                          {post.category_name}
                        </Badge>
                      )}
                      <h2 className="text-xl font-bold line-clamp-2">{post.title}</h2>
                      <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                        <span>{post.author_name || 'Anonymous'}</span>
                        <span>{formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</span>
                      </div>
                    </CardContent>
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
