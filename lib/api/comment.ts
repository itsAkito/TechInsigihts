'use client';

import { supabase } from '@/lib/supabase/client';

export type Comment = {
  id: string;
  entity_id: string;
  entity_type: 'post' | 'quiz' | 'poll';
  user_id: string;
  username: string;
  content: string;
  created_at: string;
  updated_at: string;
  profiles?: {
    username: string;
    full_name: string | null;
    avatar_url: string | null;
  };
};

// Get comments for an entity (post, quiz, or poll) from Supabase
export async function getCommentsByEntity(
  entityId: string,
  entityType: 'post' | 'quiz' | 'poll'
) {
  try {
    const { data, error } = await supabase
      .from('comments')
      .select(`
        id,
        entity_id,
        entity_type,
        user_id,
        content,
        created_at,
        updated_at,
        profiles(username, full_name, avatar_url)
      `)
      .eq('entity_id', entityId)
      .eq('entity_type', entityType)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching comments from Supabase:', error);
      return [];
    }

    return (data || []).map((comment: any) => ({
      id: comment.id,
      entity_id: comment.entity_id,
      entity_type: comment.entity_type,
      user_id: comment.user_id,
      username: comment.profiles?.username || 'Anonymous',
      content: comment.content,
      created_at: comment.created_at,
      updated_at: comment.updated_at,
      profiles: comment.profiles,
    }));
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
}

// Create a comment in Supabase
export async function createComment(
  entityId: string,
  entityType: 'post' | 'quiz' | 'poll',
  userId: string,
  username: string,
  content: string
) {
  try {
    const { data, error } = await supabase
      .from('comments')
      .insert([
        {
          entity_id: entityId,
          entity_type: entityType,
          user_id: userId,
          content: content,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error('Error creating comment in Supabase:', error);
      throw error;
    }

    const newComment = data?.[0];
    return {
      id: newComment.id,
      entity_id: newComment.entity_id,
      entity_type: newComment.entity_type,
      user_id: newComment.user_id,
      username: username,
      content: newComment.content,
      created_at: newComment.created_at,
      updated_at: newComment.updated_at,
    };
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
}

// Update comment in Supabase
export async function updateComment(id: string, entityId: string, entityType: 'post' | 'quiz' | 'poll', content: string) {
  try {
    const { data, error } = await supabase
      .from('comments')
      .update({
        content: content,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error updating comment in Supabase:', error);
      throw error;
    }

    const updated = data?.[0];
    return {
      id: updated.id,
      entity_id: updated.entity_id,
      entity_type: updated.entity_type,
      user_id: updated.user_id,
      username: updated.profiles?.username || 'Anonymous',
      content: updated.content,
      created_at: updated.created_at,
      updated_at: updated.updated_at,
    };
  } catch (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
}

// Delete comment from Supabase
export async function deleteComment(id: string, entityId: string, entityType: 'post' | 'quiz' | 'poll') {
  try {
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting comment in Supabase:', error);
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
}

// Get comments for a post
export async function getCommentsByPost(postId: string) {
  return getCommentsByEntity(postId, 'post');
}

// Get comments for a quiz
export async function getCommentsByQuiz(quizId: string) {
  return getCommentsByEntity(quizId, 'quiz');
}

// Get comments for a poll
export async function getCommentsByPoll(pollId: string) {
  return getCommentsByEntity(pollId, 'poll');
}