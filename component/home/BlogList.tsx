'use client';

import { useState, useEffect } from 'react';
import BlogCard from './BlogCard';
import { MOCK_BLOGS } from '@/lib/api/mock-data';

export default function BlogList() {
  const [blogs, setBlogs] = useState(MOCK_BLOGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Combine mock data with user-created blogs from localStorage
    try {
      const savedBlogs = localStorage.getItem('techy_blogs');
      if (savedBlogs) {
        const parsedBlogs = JSON.parse(savedBlogs);
        // Combine and remove duplicates
        const allBlogs = [...MOCK_BLOGS];
        parsedBlogs.forEach((blog: any) => {
          if (!allBlogs.find((b) => b.id === blog.id)) {
            allBlogs.push(blog);
          }
        });
        setBlogs(allBlogs);
      }
    } catch (error) {
      console.error('Failed to load blogs:', error);
    }
    setLoading(false);
  }, []);

  const publishedBlogs = blogs.filter((blog) => blog.published);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-64 bg-muted rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-2 mb-8">
        <h2 className="text-3xl font-bold text-foreground">Latest Blog Posts</h2>
        <p className="text-muted-foreground">
          Discover insightful articles about technology, programming, and web development
        </p>
      </div>

      {publishedBlogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedBlogs.map((blog) => (
            <BlogCard key={blog.id} {...blog} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No blog posts available yet.</p>
        </div>
      )}
    </div>
  );
}
