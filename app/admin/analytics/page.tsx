'use client';

import { useAuth } from '@/lib/auth/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { MOCK_ANALYTICS } from '@/lib/api/mock-data';
import { BarChart3, Eye, FileText, MessageSquare, FolderOpen } from 'lucide-react';

export default function AnalyticsDashboard() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && user.email !== 'admin@techy.com') {
      router.push('/');
    }
  }, [user, router]);

  if (!user || user.email !== 'admin@techy.com') {
    return <div className="text-center py-12">Access Denied</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Track your blog's performance and engagement metrics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{MOCK_ANALYTICS.totalViews}</div>
            <p className="text-xs text-muted-foreground">All time views</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <FileText className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{MOCK_ANALYTICS.totalBlogs}</div>
            <p className="text-xs text-muted-foreground">Blog posts published</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comments</CardTitle>
            <MessageSquare className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{MOCK_ANALYTICS.totalComments}</div>
            <p className="text-xs text-muted-foreground">Community engagement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <FolderOpen className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{MOCK_ANALYTICS.totalCategories}</div>
            <p className="text-xs text-muted-foreground">Content categories</p>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Weekly Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {MOCK_ANALYTICS.weeklyStats.map((stat) => (
              <div key={stat.week} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground">{stat.week}</span>
                  <span className="text-sm text-muted-foreground">
                    {stat.posts} posts • {stat.views} views • {stat.comments} comments
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${(stat.views / 700) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Category Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {MOCK_ANALYTICS.categoryStats.map((category) => (
              <div key={category.name} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors">
                <div>
                  <p className="font-semibold text-foreground">{category.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {category.count} posts • {category.views} views
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg text-foreground">{category.count}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
