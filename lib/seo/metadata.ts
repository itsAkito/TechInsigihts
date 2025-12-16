import { Metadata } from 'next';
import { Post } from '@/lib/supabase/client';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export function generatePostMetadata(post: Post): Metadata {
  const title = post.title;
  const description = post.excerpt || post.content.substring(0, 160);
  const url = `${siteUrl}/blog/${post.slug}`;
  const images = post.cover_image ? [{ url: post.cover_image }] : [];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      publishedTime: post.published_at || undefined,
      authors: post.author ? [post.author.full_name || post.author.username] : undefined,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images,
    },
  };
}

export function generateCategoryMetadata(categoryName: string, description?: string): Metadata {
  const title = `${categoryName} - Blog`;
  const desc = description || `Browse all posts in ${categoryName}`;

  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      type: 'website',
    },
  };
}
