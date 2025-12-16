import { Button } from '@/ui/button';
import { Card } from '@/ui/card';
import { Badge } from '@/ui/badge';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';
import { MOCK_QUIZZES } from '@/lib/api/mock-data';

export default function AdminQuizzesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manage Quizzes</h1>
          <p className="text-muted-foreground">Create and manage knowledge quizzes</p>
        </div>
        <Link href="/admin/quizzes/new">
          <Button>
            <Plus size={18} className="mr-2" />
            Create Quiz
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Total Quizzes</p>
          <p className="text-3xl font-bold">{MOCK_QUIZZES.length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Total Attempts</p>
          <p className="text-3xl font-bold">{MOCK_QUIZZES.reduce((sum, q) => sum + q.totalAttempts, 0)}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Avg Score</p>
          <p className="text-3xl font-bold">
            {Math.round(MOCK_QUIZZES.reduce((sum, q) => sum + q.averageScore, 0) / MOCK_QUIZZES.length)}%
          </p>
        </Card>
      </div>

      {/* Quizzes Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Title</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Domain</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Difficulty</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Questions</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Attempts</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Avg Score</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MOCK_QUIZZES.map((quiz) => (
                <tr key={quiz.id} className="hover:bg-muted transition-colors">
                  <td className="px-6 py-4 text-sm">{quiz.title}</td>
                  <td className="px-6 py-4 text-sm">
                    <Badge variant="outline">{quiz.domain}</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <Badge variant="secondary">{quiz.difficulty}</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm">{quiz.questions.length}</td>
                  <td className="px-6 py-4 text-sm">{quiz.totalAttempts}</td>
                  <td className="px-6 py-4 text-sm font-semibold">{quiz.averageScore}%</td>
                  <td className="px-6 py-4 text-sm">
                    <Badge className={quiz.published ? 'bg-green-500' : 'bg-yellow-500'}>
                      {quiz.published ? 'Published' : 'Draft'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <Link href={`/admin/quizzes/${quiz.id}/edit`}>
                        <Button size="sm" variant="ghost">
                          <Edit size={16} />
                        </Button>
                      </Link>
                      <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
