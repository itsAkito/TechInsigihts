'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-context';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Textarea } from '@/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { Badge } from '@/ui/badge';
import { toast } from 'sonner';
import { Plus, Trash2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export default function CreateQuizPage() {
  const router = useRouter();
  const { user, profile } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('General');
  const [published, setPublished] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      text: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
    },
  ]);
  const [loading, setLoading] = useState(false);

  // Check if user is authenticated
  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              You need to be logged in to create a quiz.
            </p>
            <Link href="/auth">
              <Button className="w-full">Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: `${questions.length + 1}`,
      text: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleRemoveQuestion = (id: string) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((q) => q.id !== id));
    } else {
      toast.error('Quiz must have at least 1 question');
    }
  };

  const handleUpdateQuestion = (id: string, field: string, value: any) => {
    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, [field]: value } : q
      )
    );
  };

  const handleUpdateOption = (questionId: string, index: number, value: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? { ...q, options: q.options.map((o, i) => (i === index ? value : o)) }
          : q
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validation
      if (!title.trim()) {
        toast.error('Please enter a quiz title');
        return;
      }

      if (questions.length === 0) {
        toast.error('Quiz must have at least 1 question');
        return;
      }

      for (const question of questions) {
        if (!question.text.trim()) {
          toast.error('All questions must have text');
          return;
        }
        if (question.options.some((o) => !o.trim())) {
          toast.error('All options must be filled in');
          return;
        }
      }

      // Create quiz object
      const newQuiz = {
        id: `quiz_${Date.now()}`,
        title,
        description,
        category,
        questions,
        author: profile.username || 'User',
        created_by: user.id,
        created_at: new Date().toISOString(),
        published,
      };

      // Save to localStorage
      const existingQuizzes = localStorage.getItem('techy_quizzes');
      const quizzes = existingQuizzes ? JSON.parse(existingQuizzes) : [];
      quizzes.push(newQuiz);
      localStorage.setItem('techy_quizzes', JSON.stringify(quizzes));

      toast.success('Quiz created successfully!');
      setTimeout(() => {
        router.push(`/quiz/${newQuiz.id}`);
      }, 1000);
    } catch (error) {
      console.error('Error creating quiz:', error);
      toast.error('Failed to create quiz');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/quizzes">
              <Button variant="ghost" size="sm">
                <ArrowLeft size={18} className="mr-2" />
                Back to Quizzes
              </Button>
            </Link>
          </div>
          <h1 className="text-4xl font-bold">Create a New Quiz</h1>
          <p className="text-muted-foreground mt-2">
            Design an engaging quiz for the community
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Quiz Details */}
            <Card>
              <CardHeader>
                <CardTitle>Quiz Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Title *</label>
                  <Input
                    placeholder="e.g., React Advanced Patterns Quiz"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea
                    placeholder="Brief description of your quiz"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <Input
                      placeholder="e.g., React, JavaScript, TypeScript"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </div>

                  <div className="flex items-end">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={published}
                        onChange={(e) => setPublished(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm font-medium">Publish Now</span>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Questions */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Questions ({questions.length})</h2>
                <Button
                  type="button"
                  onClick={handleAddQuestion}
                  variant="outline"
                >
                  <Plus size={18} className="mr-2" />
                  Add Question
                </Button>
              </div>

              {questions.map((question, qIdx) => (
                <Card key={question.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Badge variant="secondary">Question {qIdx + 1}</Badge>
                      </div>
                      {questions.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveQuestion(question.id)}
                        >
                          <Trash2 size={18} className="text-red-500" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Question Text */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Question Text *
                      </label>
                      <Textarea
                        placeholder="Enter the question"
                        value={question.text}
                        onChange={(e) =>
                          handleUpdateQuestion(question.id, 'text', e.target.value)
                        }
                        rows={2}
                      />
                    </div>

                    {/* Options */}
                    <div>
                      <label className="block text-sm font-medium mb-3">Options *</label>
                      <div className="space-y-2">
                        {question.options.map((option, oIdx) => (
                          <div key={oIdx} className="flex items-center gap-3">
                            <input
                              type="radio"
                              name={`correct_${question.id}`}
                              checked={question.correctAnswer === oIdx}
                              onChange={() =>
                                handleUpdateQuestion(
                                  question.id,
                                  'correctAnswer',
                                  oIdx
                                )
                              }
                              className="w-4 h-4"
                            />
                            <Input
                              placeholder={`Option ${oIdx + 1}`}
                              value={option}
                              onChange={(e) =>
                                handleUpdateOption(question.id, oIdx, e.target.value)
                              }
                              className="flex-1"
                            />
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Select the radio button for the correct answer
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1"
                size="lg"
              >
                {loading ? 'Creating...' : 'Create Quiz'}
              </Button>
              <Link href="/quizzes" className="flex-1">
                <Button type="button" variant="outline" className="w-full" size="lg">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
