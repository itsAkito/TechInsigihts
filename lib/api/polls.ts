import { supabase } from '@/lib/supabase/client';

export type Poll = {
  id: string;
  post_id: string;
  question: string;
  created_by: string;
  created_at: string;
};

export type PollOption = {
  id: string;
  poll_id: string;
  option_text: string;
};

export type PollVote = {
  id: string;
  poll_id: string;
  option_id: string;
  user_id: string;
  created_at: string;
};

// Get polls for a post
export async function getPollsByPost(postId: string) {
  try {
    const { data, error } = await supabase
      .from('polls')
      .select(`
        id,
        post_id,
        question,
        created_by,
        created_at,
        poll_options(id, option_text),
        poll_votes(id, option_id, user_id)
      `)
      .eq('post_id', postId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []) as any[];
  } catch (error) {
    console.error('Error fetching polls:', error);
    return [];
  }
}

// Get poll by ID
export async function getPollById(id: string) {
  try {
    const { data, error } = await supabase
      .from('polls')
      .select(`
        id,
        post_id,
        question,
        created_by,
        created_at,
        poll_options(id, option_text),
        poll_votes(id, option_id, user_id)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching poll:', error);
    return null;
  }
}

// Create poll
export async function createPoll(
  postId: string,
  question: string,
  userId: string
) {
  try {
    const { data, error } = await supabase
      .from('polls')
      .insert([
        {
          post_id: postId,
          question,
          created_by: userId,
        },
      ])
      .select();

    if (error) throw error;
    return data?.[0];
  } catch (error) {
    console.error('Error creating poll:', error);
    throw error;
  }
}

// Add poll option
export async function addPollOption(pollId: string, optionText: string) {
  try {
    const { data, error } = await supabase
      .from('poll_options')
      .insert([
        {
          poll_id: pollId,
          option_text: optionText,
        },
      ])
      .select();

    if (error) throw error;
    return data?.[0];
  } catch (error) {
    console.error('Error adding poll option:', error);
    throw error;
  }
}

// Vote on poll
export async function votePoll(
  pollId: string,
  optionId: string,
  userId: string
) {
  try {
    // Check if user already voted
    const { data: existingVote } = await supabase
      .from('poll_votes')
      .select('id')
      .eq('poll_id', pollId)
      .eq('user_id', userId)
      .single();

    if (existingVote) {
      // Update existing vote
      const { data, error } = await supabase
        .from('poll_votes')
        .update({ option_id: optionId })
        .eq('id', existingVote.id)
        .select();

      if (error) throw error;
      return data?.[0];
    } else {
      // Create new vote
      const { data, error } = await supabase
        .from('poll_votes')
        .insert([
          {
            poll_id: pollId,
            option_id: optionId,
            user_id: userId,
          },
        ])
        .select();

      if (error) throw error;
      return data?.[0];
    }
  } catch (error) {
    console.error('Error voting on poll:', error);
    throw error;
  }
}

// Get vote count for option
export async function getVoteCount(optionId: string) {
  try {
    const { count, error } = await supabase
      .from('poll_votes')
      .select('id', { count: 'exact' })
      .eq('option_id', optionId);

    if (error) throw error;
    return count || 0;
  } catch (error) {
    console.error('Error fetching vote count:', error);
    return 0;
  }
}

// Delete poll
export async function deletePoll(id: string) {
  try {
    const { error } = await supabase
      .from('polls')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting poll:', error);
    throw error;
  }
}
