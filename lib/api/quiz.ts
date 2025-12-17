import { supabase, Quiz, QuizQuestion, QuizAttempt, QuizComment } from '@/lib/supabase/client';

// Get quiz with questions
export async function getQuizWithQuestions(quizId: string) {
  const { data, error } = await supabase
    .from('quizzes')
    .select('*, quiz_questions(*)')
    .eq('id', quizId)
    .single();

  if (error) throw new Error(error.message);
  return data as Quiz & { quiz_questions: QuizQuestion[] };
}

// Create a new quiz
export async function createQuiz(quiz: { post_id: string; title: string; created_by: string }) {
  const { data, error } = await supabase
    .from('quizzes')
    .insert([quiz])
    .select('*')
    .single();

  if (error) throw new Error(error.message);
  return data as Quiz;
}

// Add a question to a quiz
export async function addQuestion(question: {
  quiz_id: string;
  question_text: string;
  options: string[];
  correct_option: string;
}) {
  const { data, error } = await supabase
    .from('quiz_questions')
    .insert([question])
    .select('*')
    .single();

  if (error) throw new Error(error.message);
  return data as QuizQuestion;
}

// Submit a quiz attempt
export async function submitAttempt(attempt: { quiz_id: string; user_id: string; score: number }) {
  const { data, error } = await supabase
    .from('quiz_attempts')
    .insert([attempt])
    .select('*')
    .single();

  if (error) throw new Error(error.message);
  return data as QuizAttempt;
}

// Add a comment to a quiz
export async function addQuizComment(comment: { quiz_id: string; user_id: string; content: string }) {
  const { data, error } = await supabase
    .from('quiz_comments')
    .insert([comment])
    .select('*, user:profiles(*)')
    .single();

  if (error) throw new Error(error.message);
  return data as QuizComment;
}

// Get comments for a quiz
export async function getQuizComments(quizId: string) {
  const { data, error } = await supabase
    .from('quiz_comments')
    .select('*, user:profiles(*)')
    .eq('quiz_id', quizId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data as QuizComment[];
}