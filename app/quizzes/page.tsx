import { ADMIN_CREATED_QUIZZES } from '@/lib/api/admin-data';
import { Button } from '@/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Card, CardContent } from '@/ui/card';

export const metadata = {
  title: 'Quizzes - TechyBlogs',
  description: 'Take quizzes on AI, SaaS, UX, Cybersecurity, and Emerging Tech',
};

export default function QuizzesPage() {
  // Get all quizzes (admin + user-created)
  const userQuizzes = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('techy_quizzes') || '[]') : [];
  const allQuizzes = [...ADMIN_CREATED_QUIZZES, ...userQuizzes];
  const publishedQuizzes = allQuizzes.filter((q: any) => q.published !== false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Knowledge Quizzes</h1>
          <p className="text-white/90 max-w-2xl mx-auto text-lg">
            Test your understanding across tech domains. Compete with others and track your progress.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-6 border-b border-border">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            {publishedQuizzes.length} quizzes available
          </div>
          <div className="flex gap-2">
            <Link href="/quizzes/create">
              <Button size="sm">
                <Plus size={18} className="mr-2" />
                Create Quiz
              </Button>
            </Link>
            <Link href="/admin/quizzes/new">
              <Button variant="outline" size="sm">
                Admin Quiz
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quizzes Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {publishedQuizzes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No quizzes yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publishedQuizzes.map((quiz: any) => (
                <Link key={quiz.id} href={`/quiz/${quiz.id}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <CardContent className="p-6 space-y-4">
                      <h3 className="text-lg font-semibold line-clamp-2">{quiz.title}</h3>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Questions: {quiz.questions?.length || 0}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Category: {quiz.category || 'General'}
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        by {quiz.author || 'Admin'}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
