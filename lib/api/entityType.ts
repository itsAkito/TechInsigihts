export async function getComments(entityId: string, entityType: 'post' | 'quiz' | 'poll') {
  const { data, error } = await supabase
    .from('comments')
    .select('id, content, created_at, user:profiles(id, username, full_name, avatar_url)')
    .eq('entity_id', entityId)
    .eq('entity_type', entityType)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data as Comment[];
}

export async function createComment(comment: {
  entity_id: string;
  entity_type: 'post' | 'quiz' | 'poll';
  user_id: string;
  content: string;
}) {
  const { data, error } = await supabase
    .from('comments')
    .insert([comment])
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