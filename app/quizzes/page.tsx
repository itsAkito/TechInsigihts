import { MOCK_QUIZZES } from '@/lib/api/mock-data';
import QuizCard from '@/component/quiz/QuizCard';
import { Button } from '@/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export const metadata = {
  title: 'Quizzes - TechyBlogs',
  description: 'Take quizzes on AI, SaaS, UX, Cybersecurity, and Emerging Tech',
};

export default function QuizzesPage() {
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
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">All</button>
            <button className="px-4 py-2 rounded-lg bg-background border border-border hover:bg-muted">Beginner</button>
            <button className="px-4 py-2 rounded-lg bg-background border border-border hover:bg-muted">Intermediate</button>
            <button className="px-4 py-2 rounded-lg bg-background border border-border hover:bg-muted">Advanced</button>
          </div>
          <Link href="/admin/quizzes/new">
            <Button>
              <Plus size={18} className="mr-2" />
              Create Quiz
            </Button>
          </Link>
        </div>
      </section>

      {/* Quizzes Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_QUIZZES.map((quiz: any) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
