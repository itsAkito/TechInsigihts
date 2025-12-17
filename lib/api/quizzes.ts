import { supabase } from '@/lib/supabase/client';

export type Quiz = {
  id: string;
  title: string;
  description: string | null;
  created_by: string;
  created_at: string;
  profiles?: {
    username: string;
    full_name: string | null;
    avatar_url: string | null;
  };
};

// Get all quizzes
export async function getQuizzes(limit?: number) {
  try {
    let query = supabase
      .from('quizzes')
      .select(`
        id,
        title,
        description,
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
    return (data || []) as Quiz[];
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    return [];
  }
}

// Get single quiz
export async function getQuizById(id: string) {
  try {
    const { data, error } = await supabase
      .from('quizzes')
      .select(`
        id,
        title,
        description,
        created_by,
        created_at,
        profiles:created_by(username, full_name, avatar_url)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Quiz | null;
  } catch (error) {
    console.error('Error fetching quiz:', error);
    return null;
  }
}

// Create quiz
export async function createQuiz(
  title: string,
  description: string | null,
  userId: string
) {
  try {
    const { data, error } = await supabase
      .from('quizzes')
      .insert([
        {
          title,
          description,
          created_by: userId,
        },
      ])
      .select();

    if (error) throw error;
    return data?.[0];
  } catch (error) {
    console.error('Error creating quiz:', error);
    throw error;
  }
}

// Update quiz
export async function updateQuiz(
  id: string,
  title: string,
  description: string | null
) {
  try {
    const { data, error } = await supabase
      .from('quizzes')
      .update({ title, description })
      .eq('id', id)
      .select();

    if (error) throw error;
    return data?.[0];
  } catch (error) {
    console.error('Error updating quiz:', error);
    throw error;
  }
}

// Delete quiz
export async function deleteQuiz(id: string) {
  try {
    const { error } = await supabase
      .from('quizzes')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting quiz:', error);
    throw error;
  }
}
