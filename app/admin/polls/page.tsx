import { Button } from '@/ui/button';
import { Card } from '@/ui/card';
import { Badge } from '@/ui/badge';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { MOCK_POLLS } from '@/lib/api/mock-data';

export default function AdminPollsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manage Polls</h1>
          <p className="text-muted-foreground">Create and manage community polls</p>
        </div>
        <Link href="/admin/polls/new">
          <Button>
            <Plus size={18} className="mr-2" />
            Create Poll
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Total Polls</p>
          <p className="text-3xl font-bold">{MOCK_POLLS.length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Total Votes</p>
          <p className="text-3xl font-bold">{MOCK_POLLS.reduce((sum, p) => sum + p.totalVotes, 0)}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Avg Votes per Poll</p>
          <p className="text-3xl font-bold">
            {Math.round(MOCK_POLLS.reduce((sum, p) => sum + p.totalVotes, 0) / MOCK_POLLS.length)}
          </p>
        </Card>
      </div>

      {/* Polls Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Title</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Domain</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Options</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Total Votes</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MOCK_POLLS.map((poll) => (
                <tr key={poll.id} className="hover:bg-muted transition-colors">
                  <td className="px-6 py-4 text-sm">{poll.title}</td>
                  <td className="px-6 py-4 text-sm">
                    <Badge variant="outline">{poll.domain}</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm">{poll.options.length}</td>
                  <td className="px-6 py-4 text-sm font-semibold">{poll.totalVotes}</td>
                  <td className="px-6 py-4 text-sm">
                    <Badge className="bg-green-500">Active</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <Link href={`/admin/polls/${poll.id}/edit`}>
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
