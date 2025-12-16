import { Button } from '@/ui/button';
import { Card } from '@/ui/card';
import { Badge } from '@/ui/badge';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { MOCK_TRENDS, MOCK_CASE_STUDIES, MOCK_PREDICTIONS } from '@/lib/api/mock-data';

export default function AdminInsightsPage() {
  const allInsights = [
    ...MOCK_TRENDS.map(t => ({ ...t, type: 'Trend' })),
    ...MOCK_CASE_STUDIES.map(c => ({ ...c, type: 'Case Study' })),
    ...MOCK_PREDICTIONS.map(p => ({ ...p, type: 'Prediction' })),
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manage Insights</h1>
          <p className="text-muted-foreground">Manage trends, case studies, and predictions</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/insights/new?type=trend">
            <Button variant="outline">+ Trend</Button>
          </Link>
          <Link href="/admin/insights/new?type=case">
            <Button variant="outline">+ Case Study</Button>
          </Link>
          <Link href="/admin/insights/new?type=prediction">
            <Button variant="outline">+ Prediction</Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Total Insights</p>
          <p className="text-3xl font-bold">{allInsights.length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Trends</p>
          <p className="text-3xl font-bold">{MOCK_TRENDS.length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Case Studies</p>
          <p className="text-3xl font-bold">{MOCK_CASE_STUDIES.length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Predictions</p>
          <p className="text-3xl font-bold">{MOCK_PREDICTIONS.length}</p>
        </Card>
      </div>

      {/* Insights Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Title</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Domain</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Author</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Views</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {allInsights.map((insight: any) => (
                <tr key={`${insight.type}-${insight.id}`} className="hover:bg-muted transition-colors">
                  <td className="px-6 py-4 text-sm max-w-xs truncate">{insight.title}</td>
                  <td className="px-6 py-4 text-sm">
                    <Badge variant="outline">{insight.type}</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <Badge variant="outline">{insight.domain}</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm">{insight.author}</td>
                  <td className="px-6 py-4 text-sm font-semibold">{insight.views}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <Link href={`/admin/insights/${insight.id}/edit`}>
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
