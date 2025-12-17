import { supabase, Poll, PollOption, PollVote, PollComment } from '@/lib/supabase/client';

// Get poll with options
export async function getPollWithOptions(pollId: string) {
  const { data, error } = await supabase
    .from('polls')
    .select('*, poll_options(*), poll_votes(*)')
    .eq('id', pollId)
    .single();

  if (error) throw new Error(error.message);
  return data as Poll & { poll_options: PollOption[]; poll_votes: PollVote[] };
}

// Create a new poll
export async function createPoll(poll: { post_id: string; question: string; created_by: string }) {
  const { data, error } = await supabase
    .from('polls')
    .insert([poll])
    .select('*')
    .single();

  if (error) throw new Error(error.message);
  return data as Poll;
}

// Add poll options
export async function addPollOptions(options: { poll_id: string; option_text: string }[]) {
  const { data, error } = await supabase
    .from('poll_options')
    .insert(options)
    .select('*');

  if (error) throw new Error(error.message);
  return data as PollOption[];
}

// Cast a vote
export async function votePoll(vote: { poll_id: string; option_id: string; user_id: string }) {
  const { data, error } = await supabase
    .from('poll_votes')
    .insert([vote])
    .select('*')
    .single();

  if (error) throw new Error(error.message);
  return data as PollVote;
}

// Add a comment to a poll
export async function addPollComment(comment: { poll_id: string; user_id: string; content: string }) {
  const { data, error } = await supabase
    .from('poll_comments')
    .insert([comment])
    .select('*, user:profiles(*)')
    .single();

  if (error) throw new Error(error.message);
  return data as PollComment;
}

// Get comments for a poll
export async function getPollComments(pollId: string) {
  const { data, error } = await supabase
    .from('poll_comments')
    .select('*, user:profiles(*)')
    .eq('poll_id', pollId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data as PollComment[];
}