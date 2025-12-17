'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { CommentSection } from '@/comments/comment-section';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Calendar, User, MessageSquare } from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';
import { ADMIN_CREATED_QUIZZES } from '@/lib/api/admin-data';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct_answer: number;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  created_by: string;
  created_at: string;
  author?: string;
}

export default function QuizDetailPage() {
  const params = useParams();
  const quizId = params.id as string;
  const { user } = useAuth();
  
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    // Load quiz from admin data or localStorage
    const adminQuiz = ADMIN_CREATED_QUIZZES.find((q) => q.id === quizId);
    if (adminQuiz) {
      setQuiz(adminQuiz as any);
      setSelectedAnswers(new Array(adminQuiz.questions?.length || 0).fill(null));
    } else {
      // Load from localStorage
      const savedQuizzes = localStorage.getItem('techy_quizzes');
      if (savedQuizzes) {
        const quizzes = JSON.parse(savedQuizzes);
        const foundQuiz = quizzes.find((q: Quiz) => q.id === quizId);
        if (foundQuiz) {
          setQuiz(foundQuiz);
          setSelectedAnswers(new Array(foundQuiz.questions?.length || 0).fill(null));
        }
      }
    }
    setLoading(false);
  }, [quizId]);

  if (loading) {
    return <div className="max-w-4xl mx-auto px-4 py-12">Loading...</div>;
  }

  if (!quiz) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <p className="text-muted-foreground">Quiz not found</p>
      </div>
    );
  }

  const formattedDate = new Date(quiz.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleAnswerSelect = (optionIndex: number) => {
    if (!showResults) {
      const newAnswers = [...selectedAnswers];
      newAnswers[currentQuestion] = optionIndex;
      setSelectedAnswers(newAnswers);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct_answer) {
        correct++;
      }
    });
    return correct;
  };

  const score = calculateScore();
  const percentage = Math.round((score / quiz.questions.length) * 100);
  const question = quiz.questions[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <article>
        <div className="space-y-6">
          <div className="space-y-4">
            <Badge variant="secondary" className="text-sm">
              Quiz
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              {quiz.title}
            </h1>

            {quiz.description && (
              <p className="text-xl text-muted-foreground">
                {quiz.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{quiz.author || quiz.created_by}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>Comments</span>
              </div>
            </div>
          </div>

          {/* Quiz Content */}
          <div className="border-t border-b py-8 space-y-6">
            {!showResults ? (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">
                    Question {currentQuestion + 1} of {quiz.questions.length}
                  </h2>
                  <div className="w-48 bg-muted rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{
                        width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-foreground">
                  {question.question}
                </h3>

                <div className="space-y-3">
                  {question.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSelect(idx)}
                      className={`w-full p-4 text-left border rounded-lg transition-colors ${
                        selectedAnswers[currentQuestion] === idx
                          ? 'bg-blue-100 border-blue-500 dark:bg-blue-950'
                          : 'bg-muted hover:bg-muted/80 border-muted-foreground/20'
                      }`}
                    >
                      <span className="font-medium">{String.fromCharCode(65 + idx)}.</span> {option}
                    </button>
                  ))}
                </div>

                <div className="flex justify-between pt-6">
                  <Button
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestion === 0}
                    variant="outline"
                  >
                    Previous
                  </Button>

                  {currentQuestion === quiz.questions.length - 1 ? (
                    <Button
                      onClick={handleSubmitQuiz}
                      disabled={selectedAnswers.includes(null)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Submit Quiz
                    </Button>
                  ) : (
                    <Button onClick={handleNextQuestion}>
                      Next
                    </Button>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="text-center space-y-4 py-8">
                  <h2 className="text-3xl font-bold">Quiz Completed!</h2>
                  <div className="text-6xl font-bold text-blue-600">
                    {score}/{quiz.questions.length}
                  </div>
                  <p className="text-2xl text-muted-foreground">
                    You scored {percentage}%
                  </p>
                  <p className={`text-lg font-semibold ${
                    percentage >= 70 ? 'text-green-600' : percentage >= 50 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {percentage >= 70 ? 'Great Job! 🎉' : percentage >= 50 ? 'Good Try! 👍' : 'Keep Learning! 📚'}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Review Answers:</h3>
                  {quiz.questions.map((q, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-lg border ${
                        selectedAnswers[idx] === q.correct_answer
                          ? 'bg-green-50 border-green-200 dark:bg-green-950'
                          : 'bg-red-50 border-red-200 dark:bg-red-950'
                      }`}
                    >
                      <p className="font-semibold text-foreground mb-2">
                        Q{idx + 1}: {q.question}
                      </p>
                      <p className="text-sm">
                        Your answer: <span className="font-medium">{q.options[selectedAnswers[idx] ?? 0] || 'Not answered'}</span>
                      </p>
                      {selectedAnswers[idx] !== q.correct_answer && (
                        <p className="text-sm text-green-600 dark:text-green-400">
                          Correct answer: <span className="font-medium">{q.options[q.correct_answer]}</span>
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => {
                    setShowResults(false);
                    setCurrentQuestion(0);
                    setSelectedAnswers(new Array(quiz.questions.length).fill(null));
                  }}
                  className="w-full mt-4"
                >
                  Retake Quiz
                </Button>
              </>
            )}
          </div>
        </div>
      </article>

      {/* Comments Section */}
      {user && <CommentSection postId={quizId} />}
      {!user && (
        <div className="bg-muted p-6 rounded-lg text-center">
          <p className="text-muted-foreground mb-4">Sign in to leave comments</p>
        </div>
      )}
    </div>
  );
}
