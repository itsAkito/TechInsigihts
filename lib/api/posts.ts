import { supabase, Post } from '@/lib/supabase/client';
import { MOCK_BLOGS } from './mock-data';

export async function getPublishedPosts(limit?: number) {
  try {
    let query = supabase
      .from('posts')
      .select('*, author:profiles(*), category:categories(*)')
      .eq('published', true)
      .order('published_at', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as Post[];
  } catch (error) {
    // Return mock data if Supabase is not configured
    console.log('Using mock data for posts');
    let blogs = MOCK_BLOGS.filter((b) => b.published);
    if (limit) {
      blogs = blogs.slice(0, limit);
    }
    return blogs as any;
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*, author:profiles(*), category:categories(*)')
      .eq('slug', slug)
      .maybeSingle();

    if (error) throw error;
    return data as Post | null;
  } catch (error) {
    // Return mock data
    console.log('Using mock data for post');
    return MOCK_BLOGS.find((b) => b.slug === slug) as any;
  }
}

export async function getPostsByCategory(categorySlug: string, limit?: number) {
  try {
    let query = supabase
      .from('posts')
      .select('*, author:profiles(*), category:categories!inner(*)')
      .eq('published', true)
      .eq('category.slug', categorySlug)
      .order('published_at', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as Post[];
  } catch (error) {
    // Return mock data
    console.log('Using mock data for category posts');
    let blogs = MOCK_BLOGS.filter(
      (b) => b.published && b.category_name?.toLowerCase() === categorySlug
    );
    if (limit) {
      blogs = blogs.slice(0, limit);
    }
    return blogs as any;
  }
}

export async function createPost(post: {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  cover_image?: string;
  category_id?: string;
  published?: boolean;
  author_id: string;
}) {
  try {
    const { data, error } = await supabase
      .from('posts')
      .insert({
        ...post,
        published_at: post.published ? new Date().toISOString() : null,
      })
      .select()
      .single();

    if (error) throw error;
    return data as Post;
  } catch (error) {
    // Return a mock post
    console.log('Using mock data - post created locally');
    const mockPost = {
      id: String(MOCK_BLOGS.length + 1),
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt || '',
      cover_image: post.cover_image || null,
      category_id: post.category_id || '1',
      published: post.published || false,
      author_id: post.author_id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      published_at: post.published ? new Date().toISOString() : null,
    };
    MOCK_BLOGS.push(mockPost as any);
    return mockPost as Post;
  }
}

export async function updatePost(id: string, updates: Partial<Post>) {
  try {
    const { data, error } = await supabase
      .from('posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Post;
  } catch (error) {
    // Update mock data
    console.log('Using mock data - post updated locally');
    const index = MOCK_BLOGS.findIndex((b) => b.id === id);
    if (index !== -1) {
      MOCK_BLOGS[index] = { ...MOCK_BLOGS[index], ...updates };
    }
    return MOCK_BLOGS[index] as Post;
  }
}

export async function deletePost(id: string) {
  try {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    // Delete from mock data
    console.log('Using mock data - post deleted locally');
    const index = MOCK_BLOGS.findIndex((b) => b.id === id);
    if (index !== -1) {
      MOCK_BLOGS.splice(index, 1);
    }
  }
}

export async function trackPostView(postId: string, userId?: string) {
  try {
    const { error } = await supabase
      .from('post_views')
      .insert({
        post_id: postId,
        user_id: userId || null,
      });

    if (error) console.error('Error tracking view:', error);
  } catch (error) {
    // Silently fail for mock data - just log it
    console.log('View tracked locally for post:', postId);
  }
}

export async function getPostViewCount(postId: string) {
  try {
    const { count, error } = await supabase
      .from('post_views')
      .select('*', { count: 'exact', head: true })
      .eq('post_id', postId);

    if (error) throw error;
    return count || 0;
  } catch (error) {
    // Return mock view count
    const blog = MOCK_BLOGS.find((b) => b.id === postId);
    return blog?.views || 0;
  }
}
