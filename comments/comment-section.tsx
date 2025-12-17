'use client';

import { useState, useEffect } from 'react';
import { getCommentsByEntity, createComment, deleteComment } from '@/lib/api/comment';
import { useAuth } from '@/lib/auth/auth-context';
import { Button } from '@/ui/button';
import { Textarea } from '@/ui/textarea';
import { Card, CardContent } from '@/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

type CommentSectionProps = {
  entityId: string;
  entityType: 'post' | 'quiz' | 'poll';
};

export function CommentSection({ entityId, entityType }: CommentSectionProps) {
  const { user, profile } = useAuth();
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadComments();
  }, [entityId, entityType]);

  const loadComments = async () => {
    try {
      const data = await getCommentsByEntity(entityId, entityType);
      setComments(data || []);
    } catch (error) {
      console.error('Error loading comments:', error);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !profile || !newComment.trim()) {
      toast.error('Please login and enter a comment');
      return;
    }

    setSubmitting(true);
    try {
      await createComment(
        entityId, 
        entityType, 
        user.id, 
        profile.username || user.email?.split('@')[0] || 'User',
        newComment.trim()
      );
      setNewComment('');
      await loadComments();
      toast.success('Comment posted!');
    } catch (error) {
      console.error('Error submitting comment:', error);
      toast.error('Failed to post comment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    if (confirm('Delete this comment?')) {
      try {
        await deleteComment(commentId, entityId, entityType);
        await loadComments();
        toast.success('Comment deleted');
      } catch (error) {
        console.error('Error deleting comment:', error);
        toast.error('Failed to delete comment');
      }
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

return (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Comments ({comments.length})</h2>

    {user ? (
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="min-h-[100px]"
          required
        />
        <Button type="submit" disabled={submitting || !newComment.trim()}>
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Posting...
            </>
          ) : (
            'Post Comment'
          )}
        </Button>
      </form>
    ) : (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-muted-foreground">Please sign in to comment</p>
        </CardContent>
      </Card>
    )}

    {comments.length === 0 ? (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-muted-foreground">
            No comments yet. Be the first to comment!
          </p>
        </CardContent>
      </Card>
    ) : (
      <div className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment.id}>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src={comment.profiles?.avatar_url || undefined} />
                  <AvatarFallback>
                    {(comment.username || comment.profiles?.username || 'U').charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">
                        {comment.profiles?.full_name || comment.username || comment.profiles?.username}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                      </p>
                    </div>
                    {user?.id === comment.user_id && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(comment.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{comment.content}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )}
  </div>
);
}