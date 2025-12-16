import { Button } from '@/ui/button';
import { Card } from '@/ui/card';
import { Badge } from '@/ui/badge';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { MOCK_AMAS } from '@/lib/api/mock-data';

export default function AdminAMAsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manage AMAs</h1>
          <p className="text-muted-foreground">Schedule and manage Ask Me Anything sessions</p>
        </div>
        <Link href="/admin/amas/new">
          <Button>
            <Plus size={18} className="mr-2" />
            Schedule AMA
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Total AMAs</p>
          <p className="text-3xl font-bold">{MOCK_AMAS.length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Live</p>
          <p className="text-3xl font-bold">{MOCK_AMAS.filter(a => a.status === 'live').length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Upcoming</p>
          <p className="text-3xl font-bold">{MOCK_AMAS.filter(a => a.status === 'upcoming').length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Total Questions</p>
          <p className="text-3xl font-bold">{MOCK_AMAS.reduce((sum, a) => sum + a.totalQuestions, 0)}</p>
        </Card>
      </div>

      {/* AMAs Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Title</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Expert</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Domain</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Questions</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MOCK_AMAS.map((ama) => (
                <tr key={ama.id} className="hover:bg-muted transition-colors">
                  <td className="px-6 py-4 text-sm max-w-xs truncate">{ama.title}</td>
                  <td className="px-6 py-4 text-sm">{ama.expert}</td>
                  <td className="px-6 py-4 text-sm">
                    <Badge variant="outline">{ama.domain}</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <Badge className={
                      ama.status === 'live' ? 'bg-green-500' :
                      ama.status === 'upcoming' ? 'bg-blue-500' :
                      'bg-gray-500'
                    }>
                      {ama.status.charAt(0).toUpperCase() + ama.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold">{ama.totalQuestions}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <Link href={`/admin/amas/${ama.id}/edit`}>
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
