import { supabase } from '@/lib/supabase/client';
import { MOCK_BLOGS } from './mock-data';

export type Post = {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  image_url?: string;
  created_by: string;
  created_at: string;
  profiles?: {
    username: string;
    full_name: string | null;
    avatar_url: string | null;
  };
};

// Create a post
export async function createPost(
  title: string,
  content: string,
  userId: string,
  excerpt?: string,
  imageUrl?: string
) {
  try {
    const { data, error } = await supabase
      .from('posts')
      .insert([
        {
          title,
          content,
          excerpt: excerpt || content.substring(0, 200),
          image_url: imageUrl,
          created_by: userId,
        },
      ])
      .select();

    if (error) throw error;
    return data?.[0];
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

// Get all posts with author info
export async function getPosts(limit?: number) {
  try {
    let query = supabase
      .from('posts')
      .select(`
        id,
        title,
        content,
        created_by,
        created_at,
        profiles:created_by(username, full_name, avatar_url)
      `)
      .order('created_at', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as Post[];
  } catch (error) {
    // Return mock data if Supabase is not configured
    console.log('Using mock data for posts');
    let blogs = MOCK_BLOGS;
    if (limit) {
      blogs = blogs.slice(0, limit);
    }
    return blogs as any;
  }
}

export async function getPostById(id: string) {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        id,
        title,
        content,
        created_by,
        created_at,
        profiles:created_by(username, full_name, avatar_url)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Post | null;
  } catch (error) {
    // Return mock data
    console.log('Using mock data for post');
    return MOCK_BLOGS.find((b) => b.id === id) as any;
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('id, title, content, created_by, created_at')
      .eq('id', slug)
      .maybeSingle();

    if (error) throw error;
    return data as Post | null;
  } catch (error) {
    console.log('Using mock data for post');
    return MOCK_BLOGS.find((b) => b.id === slug) as any;
  }
}

// Update post
export async function updatePost(
  id: string,
  title: string,
  content: string
) {
  try {
    const { data, error } = await supabase
      .from('posts')
      .update({ title, content })
      .eq('id', id)
      .select();

    if (error) throw error;
    return data?.[0];
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
}

// Delete post
export async function deletePost(id: string) {
  try {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
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
