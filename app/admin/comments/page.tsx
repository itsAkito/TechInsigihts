'use client';

import { useAuth } from '@/lib/auth/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { Button } from '@/ui/button';
import { Badge } from '@/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import { MOCK_COMMENTS } from '@/lib/api/mock-data';
import { Trash2, CheckCircle2, XCircle, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

export default function CommentsManagementPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [comments, setComments] = useState(MOCK_COMMENTS);

  useEffect(() => {
    if (user && user.email !== 'admin@techy.com') {
      router.push('/');
    }
  }, [user, router]);

  const handleApprove = (id: string) => {
    setComments(
      comments.map((comment) =>
        comment.id === id ? { ...comment, approved: true } : comment
      )
    );
    toast.success('Comment approved');
  };

  const handleReject = (id: string) => {
    setComments(comments.filter((comment) => comment.id !== id));
    toast.success('Comment rejected');
  };

  const handleDelete = (id: string) => {
    setComments(comments.filter((comment) => comment.id !== id));
    toast.success('Comment deleted');
  };

  if (!user || user.email !== 'admin@techy.com') {
    return <div className="text-center py-12">Access Denied</div>;
  }

  const pendingComments = comments.filter((c) => !c.approved);
  const approvedComments = comments.filter((c) => c.approved);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Comments Management</h1>
        <p className="text-muted-foreground mt-2">
          Review and approve user comments on your blog posts
        </p>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="pending" className="gap-2">
            <MessageSquare className="w-4 h-4" />
            Pending
            <Badge variant="destructive" className="ml-2">
              {pendingComments.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="approved" className="gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Approved
            <Badge variant="default" className="ml-2">
              {approvedComments.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        {/* Pending Comments Tab */}
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Comments Review</CardTitle>
            </CardHeader>
            <CardContent>
              {pendingComments.length > 0 ? (
                <div className="space-y-4">
                  {pendingComments.map((comment) => (
                    <div
                      key={comment.id}
                      className="border-l-4 border-yellow-500 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded space-y-3 hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{comment.author_name}</p>
                          <p className="text-sm text-muted-foreground">
                            On blog post: {comment.blog_id}
                          </p>
                        </div>
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                          Pending
                        </Badge>
                      </div>

                      <p className="text-foreground">{comment.content}</p>

                      <p className="text-xs text-muted-foreground">
                        {format(new Date(comment.created_at), 'MMM dd, yyyy hh:mm a')}
                      </p>

                      <div className="flex items-center gap-2 pt-2">
                        <Button
                          size="sm"
                          className="gap-2 bg-green-600 hover:bg-green-700"
                          onClick={() => handleApprove(comment.id)}
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-2 text-red-600 hover:text-red-700"
                          onClick={() => handleReject(comment.id)}
                        >
                          <XCircle className="h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No pending comments</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Approved Comments Tab */}
        <TabsContent value="approved">
          <Card>
            <CardHeader>
              <CardTitle>Approved Comments</CardTitle>
            </CardHeader>
            <CardContent>
              {approvedComments.length > 0 ? (
                <div className="space-y-4">
                  {approvedComments.map((comment) => (
                    <div
                      key={comment.id}
                      className="border-l-4 border-green-500 p-4 bg-green-50 dark:bg-green-900/20 rounded space-y-3 hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{comment.author_name}</p>
                          <p className="text-sm text-muted-foreground">
                            On blog post: {comment.blog_id}
                          </p>
                        </div>
                        <Badge className="bg-green-600">Approved</Badge>
                      </div>

                      <p className="text-foreground">{comment.content}</p>

                      <p className="text-xs text-muted-foreground">
                        {format(new Date(comment.created_at), 'MMM dd, yyyy hh:mm a')}
                      </p>

                      <div className="flex items-center gap-2 pt-2">
                        <Button
                          size="sm"
                          variant="destructive"
                          className="gap-2"
                          onClick={() => handleDelete(comment.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No approved comments</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
