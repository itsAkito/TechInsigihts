import { Button } from '@/ui/button';
import { Card } from '@/ui/card';
import { Badge } from '@/ui/badge';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { MOCK_FORUM_THREADS } from '@/lib/api/mock-data';

export default function AdminForumPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manage Forum</h1>
          <p className="text-muted-foreground">Moderate discussions and manage forum content</p>
        </div>
        <Link href="/admin/forum/new">
          <Button>
            <Plus size={18} className="mr-2" />
            New Discussion
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Total Threads</p>
          <p className="text-3xl font-bold">{MOCK_FORUM_THREADS.length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Total Replies</p>
          <p className="text-3xl font-bold">{MOCK_FORUM_THREADS.reduce((sum, t) => sum + t.replies, 0)}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Total Views</p>
          <p className="text-3xl font-bold">{MOCK_FORUM_THREADS.reduce((sum, t) => sum + t.views, 0)}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Pinned</p>
          <p className="text-3xl font-bold">{MOCK_FORUM_THREADS.filter(t => t.pinned).length}</p>
        </Card>
      </div>

      {/* Threads Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Title</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Domain</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Author</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Replies</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Views</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MOCK_FORUM_THREADS.map((thread) => (
                <tr key={thread.id} className="hover:bg-muted transition-colors">
                  <td className="px-6 py-4 text-sm max-w-xs truncate">{thread.title}</td>
                  <td className="px-6 py-4 text-sm">
                    <Badge variant="outline">{thread.domain}</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm">{thread.author}</td>
                  <td className="px-6 py-4 text-sm font-semibold">{thread.replies}</td>
                  <td className="px-6 py-4 text-sm">{thread.views}</td>
                  <td className="px-6 py-4 text-sm">
                    <Badge className={thread.pinned ? 'bg-orange-500' : 'bg-blue-500'}>
                      {thread.pinned ? 'Pinned' : 'Active'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <Link href={`/admin/forum/${thread.id}/edit`}>
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
