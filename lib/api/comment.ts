import { supabase, Comment } from '@/lib/supabase/client';

export async function getCommentsByPost(postId: string) {
  const { data, error } = await supabase
    .from('comments')
    .select('id, content, created_at, user:profiles(id, username, full_name, avatar_url)')
    .eq('post_id', postId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data as Comment[];
}

export async function createComment(comment: {
  post_id: string;
  user_id: string;
  content: string;
}) {
  const { data, error } = await supabase
    .from('comments')
    .insert([comment]) // ✅ array
    .select('id, content, created_at, user:profiles(id, username, full_name, avatar_url)')
    .single();

  if (error) throw new Error(error.message);
  return data as Comment;
}

export async function deleteComment(id: string) {
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
}