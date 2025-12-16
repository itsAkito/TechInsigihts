'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { FileText, MessageSquare, Eye, TrendingUp, BookOpen, BarChart3, Lightbulb, Mic, MessageSquare as MessageIcon, Trophy } from 'lucide-react';
import Link from 'next/link';
import { MOCK_BLOGS, MOCK_COMMENTS, MOCK_ANALYTICS, MOCK_QUIZZES, MOCK_POLLS, MOCK_FORUM_THREADS, MOCK_AMAS, MOCK_TRENDS, MOCK_CASE_STUDIES, MOCK_PREDICTIONS } from '@/lib/api/mock-data';

export default function AdminDashboard() {
  const stats = [
    // Blog & Comments
    {
      label: 'Blog Posts',
      value: MOCK_BLOGS.length,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      href: '/admin/blogs',
    },
    {
      label: 'Comments',
      value: MOCK_COMMENTS.length,
      icon: MessageIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      href: '/admin/comments',
    },
    
    // Quizzes & Polls
    {
      label: 'Quizzes',
      value: MOCK_QUIZZES.length,
      icon: Trophy,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      href: '/admin/quizzes',
    },
    {
      label: 'Polls',
      value: MOCK_POLLS.length,
      icon: BarChart3,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      href: '/admin/polls',
    },
    
    // Forum & AMA
    {
      label: 'Forum Threads',
      value: MOCK_FORUM_THREADS.length,
      icon: MessageSquare,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      href: '/admin/forum',
    },
    {
      label: 'AMAs',
      value: MOCK_AMAS.length,
      icon: Mic,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50 dark:bg-pink-900/20',
      href: '/admin/amas',
    },
    
    // Insights
    {
      label: 'Insights',
      value: MOCK_TRENDS.length + MOCK_CASE_STUDIES.length + MOCK_PREDICTIONS.length,
      icon: Lightbulb,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      href: '/admin/insights',
    },
    
    // Analytics
    {
      label: 'Total Views',
      value: MOCK_ANALYTICS.totalViews,
      icon: Eye,
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      href: '/admin/analytics',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage all your platform content and community features</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.label} href={stat.href}>
              <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Content Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Blogs */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Blog Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {MOCK_BLOGS.slice(0, 5).map((blog) => (
                <div key={blog.id} className="flex items-center justify-between text-sm p-2 hover:bg-muted rounded transition-colors">
                  <span className="font-medium text-foreground">{blog.title.substring(0, 30)}...</span>
                  <span className="text-muted-foreground">{blog.views} views</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Latest Forum Discussions */}
        <Card>
          <CardHeader>
            <CardTitle>Latest Forum Discussions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {MOCK_FORUM_THREADS.slice(0, 5).map((thread) => (
                <div key={thread.id} className="flex items-center justify-between text-sm p-2 hover:bg-muted rounded transition-colors">
                  <span className="font-medium text-foreground">{thread.title.substring(0, 25)}...</span>
                  <span className="text-muted-foreground">{thread.replies} replies</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feature Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Knowledge Section */}
        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy size={20} />
              Knowledge Hub
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>• {MOCK_QUIZZES.length} Quizzes available</p>
            <p>• {MOCK_QUIZZES.reduce((sum, q) => sum + q.totalAttempts, 0)} total attempts</p>
            <Link href="/admin/quizzes" className="text-blue-600 hover:underline">Manage Quizzes →</Link>
          </CardContent>
        </Card>

        {/* Community Section */}
        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageIcon size={20} />
              Community
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>• {MOCK_POLLS.length} Active Polls</p>
            <p>• {MOCK_FORUM_THREADS.length} Discussion Threads</p>
            <Link href="/admin/forum" className="text-blue-600 hover:underline">Manage Forum →</Link>
          </CardContent>
        </Card>

        {/* Expert Section */}
        <Card className="border-l-4 border-l-pink-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic size={20} />
              Expert Sessions
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>• {MOCK_AMAS.length} AMAs scheduled</p>
            <p>• {MOCK_AMAS.filter(a => a.status === 'live').length} Live now</p>
            <Link href="/admin/amas" className="text-blue-600 hover:underline">Manage AMAs →</Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
//           </div>
//           <Link href="/admin/blogs" className="text-sm text-primary hover:underline">
//             View All
//           </Link>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {MOCK_BLOGS.map((blog) => (
//               <div key={blog.id} className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
//                 <div className="flex-1">
//                   <h3 className="font-semibold text-foreground">{blog.title}</h3>
//                   <p className="text-sm text-muted-foreground mt-1">{blog.excerpt}</p>
//                   <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
//                     <span>{new Date(blog.created_at).toLocaleDateString()}</span>
//                     <span className={blog.published ? 'text-green-600' : 'text-yellow-600'}>
//                       {blog.published ? 'Published' : 'Draft'}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>

//       {/* Pending Comments */}
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between">
//           <div>
//             <CardTitle>Pending Comments for Approval</CardTitle>
//           </div>
//           <Link href="/admin/comments" className="text-sm text-primary hover:underline">
//             Review All
//           </Link>
//         </CardHeader>
//         <CardContent>
//           {MOCK_COMMENTS.filter(c => !c.approved).length > 0 ? (
//             <div className="space-y-4">
//               {MOCK_COMMENTS.filter(c => !c.approved).map((comment) => (
//                 <div key={comment.id} className="p-4 border rounded-lg">
//                   <p className="text-sm text-foreground">{comment.content}</p>
//                   <p className="text-xs text-muted-foreground mt-2">
//                     Awaiting approval
//                   </p>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-sm text-muted-foreground text-center py-8">
//               No pending comments
//             </p>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
