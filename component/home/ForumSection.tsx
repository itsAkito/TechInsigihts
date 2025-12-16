'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/ui/card';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { ArrowRight, MessageSquare, Eye, Pin } from 'lucide-react';
import Link from 'next/link';
import { MOCK_FORUM_THREADS } from '@/lib/api/mock-data';
import { formatDistanceToNow } from 'date-fns';

export default function ForumSection() {
  const [threads, setThreads] = useState(MOCK_FORUM_THREADS);

  useEffect(() => {
    try {
      const savedThreads = localStorage.getItem('techy_forum_threads');
      if (savedThreads) {
        setThreads(JSON.parse(savedThreads));
      }
    } catch (error) {
      console.error('Failed to load forum threads:', error);
    }
  }, []);

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="space-y-2 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Community Forum</h2>
          <p className="text-muted-foreground text-lg">
            Join discussions and share knowledge with tech professionals
          </p>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {threads.slice(0, 5).map((thread: any) => (
            <Card key={thread.id} className="p-6 hover:shadow-lg transition-shadow group cursor-pointer">
              <Link href={`/forum/${thread.slug}`}>
                <div className="flex gap-4">
                  {/* Left: Content */}
                  <div className="flex-1">
                    <div className="flex items-start gap-2 mb-2">
                      {thread.pinned && (
                        <Pin size={16} className="text-orange-500 flex-shrink-0 mt-1" />
                      )}
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-blue-600 transition-colors">
                        {thread.title}
                      </h3>
                    </div>

                    {/* Metadata */}
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

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {thread.tags.slice(0, 2).map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Preview */}
                    <p className="text-sm text-muted-foreground line-clamp-2">{thread.content}</p>
                  </div>

                  {/* Right: Stats */}
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
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center space-y-4">
          <Link href="/forum">
            <Button variant="outline" size="lg">
              View All Discussions
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground">
            Have a question? <Link href="/forum/new" className="text-blue-600 hover:underline font-medium">Start a discussion</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
