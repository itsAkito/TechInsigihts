'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/ui/card';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { ArrowRight, Trophy, Users } from 'lucide-react';
import Link from 'next/link';
import { MOCK_QUIZZES } from '@/lib/api/mock-data';

export default function QuizzesSection() {
  const [quizzes, setQuizzes] = useState(MOCK_QUIZZES);

  useEffect(() => {
    // Load quizzes from localStorage if available
    try {
      const savedQuizzes = localStorage.getItem('techy_quizzes');
      if (savedQuizzes) {
        const parsed = JSON.parse(savedQuizzes);
        setQuizzes(parsed);
      }
    } catch (error) {
      console.error('Failed to load quizzes:', error);
    }
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-500/10 text-green-700 dark:text-green-300';
      case 'intermediate':
        return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-300';
      case 'advanced':
        return 'bg-red-500/10 text-red-700 dark:text-red-300';
      default:
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-300';
    }
  };

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="space-y-2 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Knowledge Quizzes</h2>
          <p className="text-muted-foreground text-lg">
            Test your understanding with our curated quizzes across tech domains
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.slice(0, 6).map((quiz: any) => (
            <Card key={quiz.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                {/* Header */}
                <div className="space-y-3 mb-4">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-blue-600 transition-colors">
                    {quiz.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{quiz.description}</p>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">{quiz.domain}</Badge>
                  <Badge className={getDifficultyColor(quiz.difficulty)}>
                    {quiz.difficulty}
                  </Badge>
                  <Badge variant="secondary">{quiz.questions.length} Q</Badge>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-6 py-4 border-y border-border">
                  <div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <Users size={14} />
                      Attempts
                    </div>
                    <p className="text-sm font-semibold">{quiz.totalAttempts}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <Trophy size={14} />
                      Avg Score
                    </div>
                    <p className="text-sm font-semibold">{quiz.averageScore}%</p>
                  </div>
                </div>

                {/* CTA */}
                <Link href={`/quizzes/${quiz.slug}`}>
                  <Button className="w-full group/btn" variant="default">
                    Take Quiz
                    <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-8 text-center">
          <Link href="/quizzes">
            <Button variant="outline" size="lg">
              View All Quizzes ({quizzes.length})
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
