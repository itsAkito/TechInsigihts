'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/ui/button';
import { toast } from 'sonner';
import { Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correct_answer: number;
}

export default function AddQuizPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    published: false,
  });

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      question: 'What is React?',
      options: ['A library for building UIs', 'A database', 'A server runtime', 'A CSS framework'],
      correct_answer: 0,
    },
  ]);

  const [expandedQuestion, setExpandedQuestion] = useState<string | null>('1');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePublishedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, published: e.target.checked }));
  };

  const addQuestion = () => {
    const newId = Math.max(...questions.map((q) => parseInt(q.id)), 0) + 1;
    const newQuestion: Question = {
      id: newId.toString(),
      question: '',
      options: ['', '', '', ''],
      correct_answer: 0,
    };
    setQuestions([...questions, newQuestion]);
    setExpandedQuestion(newId.toString());
  };

  const deleteQuestion = (id: string) => {
    if (questions.length === 1) {
      toast.error('Quiz must have at least one question');
      return;
    }
    setQuestions(questions.filter((q) => q.id !== id));
    if (expandedQuestion === id) {
      setExpandedQuestion(questions[0]?.id || null);
    }
  };

  const updateQuestion = (id: string, field: string, value: any) => {
    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, [field]: value } : q
      )
    );
  };

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((opt, idx) =>
                idx === optionIndex ? value : opt
              ),
            }
          : q
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      toast.error('Please enter a quiz title');
      return;
    }

    if (questions.length === 0) {
      toast.error('Quiz must have at least one question');
      return;
    }

    const allQuestionsValid = questions.every((q) => {
      if (!q.question.trim()) return false;
      if (q.options.some((opt) => !opt.trim())) return false;
      return true;
    });

    if (!allQuestionsValid) {
      toast.error('All questions and options must be filled in');
      return;
    }

    try {
      const newQuiz = {
        id: Math.random().toString(36).substr(2, 9),
        title: formData.title,
        description: formData.description,
        questions,
        published: formData.published,
        created_by: 'admin',
        created_at: new Date().toISOString(),
        author: 'Admin',
      };

      // Save to localStorage
      const savedQuizzes = localStorage.getItem('techy_quizzes');
      const quizzes = savedQuizzes ? JSON.parse(savedQuizzes) : [];
      quizzes.push(newQuiz);
      localStorage.setItem('techy_quizzes', JSON.stringify(quizzes));

      toast.success('Quiz created successfully!');
      router.push('/admin');
    } catch (error) {
      console.error('Error creating quiz:', error);
      toast.error('Failed to create quiz');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Create New Quiz</h1>
        <p className="text-muted-foreground">Add questions and options to create an engaging quiz</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Quiz Details */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Quiz Details</h2>

          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter quiz title"
              className="w-full px-4 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description (Optional)</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe what this quiz is about"
              rows={3}
              className="w-full px-4 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={handlePublishedChange}
            />
            <span className="text-sm font-medium">Publish immediately</span>
          </label>
        </div>

        {/* Questions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Questions ({questions.length})</h2>
            <Button type="button" onClick={addQuestion} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Question
            </Button>
          </div>

          <div className="space-y-3">
            {questions.map((question, qIdx) => (
              <div key={question.id} className="border rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() =>
                    setExpandedQuestion(
                      expandedQuestion === question.id ? null : question.id
                    )
                  }
                  className="w-full p-4 flex items-center justify-between bg-muted hover:bg-muted/80 transition-colors"
                >
                  <span className="font-medium text-left">
                    Question {qIdx + 1}: {question.question || 'Untitled'}
                  </span>
                  {expandedQuestion === question.id ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>

                {expandedQuestion === question.id && (
                  <div className="p-4 space-y-4 border-t">
                    <div>
                      <label className="block text-sm font-medium mb-2">Question Text</label>
                      <textarea
                        value={question.question}
                        onChange={(e) =>
                          updateQuestion(question.id, 'question', e.target.value)
                        }
                        placeholder="Enter the question"
                        rows={2}
                        className="w-full px-3 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm font-medium">Answer Options</label>
                      {question.options.map((option, optIdx) => (
                        <div key={optIdx} className="flex gap-2">
                          <input
                            type="radio"
                            name={`correct_${question.id}`}
                            checked={question.correct_answer === optIdx}
                            onChange={() =>
                              updateQuestion(question.id, 'correct_answer', optIdx)
                            }
                            className="mt-2"
                          />
                          <input
                            type="text"
                            value={option}
                            onChange={(e) =>
                              updateOption(question.id, optIdx, e.target.value)
                            }
                            placeholder={`Option ${String.fromCharCode(65 + optIdx)}`}
                            className="flex-1 px-3 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </div>
                      ))}
                    </div>

                    <Button
                      type="button"
                      onClick={() => deleteQuestion(question.id)}
                      variant="destructive"
                      size="sm"
                      className="gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete Question
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4 pt-8 border-t">
          <Button
            type="button"
            onClick={() => router.back()}
            variant="outline"
          >
            Cancel
          </Button>
          <Button type="submit" className="bg-green-600 hover:bg-green-700">
            Create Quiz
          </Button>
        </div>
      </form>
    </div>
  );
}
