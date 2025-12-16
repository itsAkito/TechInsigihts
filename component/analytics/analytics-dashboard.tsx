'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { Eye, FileText, MessageSquare, TrendingUp } from 'lucide-react';

type AnalyticsData = {
  totalViews: number;
  totalPosts: number;
  totalComments: number;
  recentViews: number;
  topPosts: Array<{
    id: string;
    title: string;
    views: number;
  }>;
};

export function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const [viewsResult, postsResult, commentsResult] = await Promise.all([
        supabase.from('post_views').select('*', { count: 'exact', head: true }),
        supabase.from('posts').select('*', { count: 'exact', head: true }).eq('published', true),
        supabase.from('comments').select('*', { count: 'exact', head: true }),
      ]);

      const last7Days = new Date();
      last7Days.setDate(last7Days.getDate() - 7);

      const recentViewsResult = await supabase
        .from('post_views')
        .select('*', { count: 'exact', head: true })
        .gte('viewed_at', last7Days.toISOString());

      const topPostsQuery = await supabase
        .from('post_views')
        .select('post_id, posts!inner(id, title)')
        .limit(100);

      const postViewCounts = (topPostsQuery.data || []).reduce((acc: any, view: any) => {
        const postId = view.post_id;
        if (!acc[postId]) {
          acc[postId] = {
            id: view.posts?.id,
            title: view.posts?.title,
            views: 0
          };
        }
        acc[postId].views++;
        return acc;
      }, {});

      const topPosts = Object.values(postViewCounts)
        .filter((post: any) => post.title)
        .sort((a: any, b: any) => b.views - a.views)
        .slice(0, 5);

      setData({
        totalViews: viewsResult.count || 0,
        totalPosts: postsResult.count || 0,
        totalComments: commentsResult.count || 0,
        recentViews: recentViewsResult.count || 0,
        topPosts: topPosts as any,
      });
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading analytics...</div>;
  }

  if (!data) {
    return <div>Failed to load analytics</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Analytics Dashboard</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {data.recentViews} in the last 7 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalPosts}</div>
            <p className="text-xs text-muted-foreground">Published articles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalComments}</div>
            <p className="text-xs text-muted-foreground">User interactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.totalPosts > 0 ? (data.totalViews / data.totalPosts).toFixed(1) : 0}
            </div>
            <p className="text-xs text-muted-foreground">Avg views per post</p>
          </CardContent>
        </Card>
      </div>

      {data.topPosts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.topPosts.map((post, index) => (
                <div key={post.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-muted-foreground">
                      {index + 1}
                    </span>
                    <span className="font-medium">{post.title}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Eye className="h-4 w-4" />
                    <span>{post.views}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
