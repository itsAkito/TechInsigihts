'use client';

import { Card } from '@/ui/card';
import { Badge } from '@/ui/badge';
import { MessageSquare, Eye, Pin, Heart } from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

interface ForumThreadCardProps {
  thread: any;
}

export default function ForumThreadCard({ thread }: ForumThreadCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow group cursor-pointer">
      <Link href={`/forum/${thread.slug}`}>
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="flex items-start gap-2 mb-2">
              {thread.pinned && (
                <Pin size={16} className="text-orange-500 flex-shrink-0 mt-1" />
              )}
              <h3 className="text-lg font-semibold text-foreground group-hover:text-blue-600 transition-colors">
                {thread.title}
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-3">
              <Badge variant="outline" className="text-xs">
                {thread.domain}
              </Badge>
              <span className="text-xs text-muted-foreground">
                by <span className="font-medium">{thread.author}</span>
              </span>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(thread.created_at), { addSuffix: true })}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {thread.tags.slice(0, 2).map((tag: string) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2">{thread.content}</p>
          </div>

          <div className="flex flex-col gap-4 min-w-[80px] text-right">
            <div>
              <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground mb-1">
                <Eye size={14} />
                Views
              </div>
              <p className="text-sm font-semibold">{thread.views}</p>
            </div>
            <div>
              <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground mb-1">
                <MessageSquare size={14} />
                Replies
              </div>
              <p className="text-sm font-semibold">{thread.replies}</p>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
}
