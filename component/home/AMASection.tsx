'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/ui/card';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { ArrowRight, Mic, Calendar, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { MOCK_AMAS } from '@/lib/api/mock-data';
import { formatDistanceToNow } from 'date-fns';

export default function AMASection() {
  const [amas, setAMAs] = useState(MOCK_AMAS);

  useEffect(() => {
    try {
      const savedAMAs = localStorage.getItem('techy_amas');
      if (savedAMAs) {
        setAMAs(JSON.parse(savedAMAs));
      }
    } catch (error) {
      console.error('Failed to load AMAs:', error);
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-300';
      case 'live':
        return 'bg-green-500/10 text-green-700 dark:text-green-300 animate-pulse';
      case 'completed':
        return 'bg-gray-500/10 text-gray-700 dark:text-gray-300';
      default:
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-300';
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="space-y-2 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Ask Me Anything (AMAs)</h2>
          <p className="text-muted-foreground text-lg">
            Connect with industry experts and get answers to your burning questions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {amas.slice(0, 4).map((ama: any) => (
            <Card key={ama.id} className="p-6 hover:shadow-lg transition-shadow overflow-hidden group">
              {/* Live Badge */}
              {ama.status === 'live' && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-500 text-white animate-pulse">LIVE</Badge>
                </div>
              )}

              <div className="space-y-4">
                {/* Expert Card */}
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mic className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{ama.expert}</p>
                    <p className="text-xs text-muted-foreground">{ama.expertise}</p>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-blue-600 transition-colors mb-2">
                    {ama.title}
                  </h3>
                  <Badge variant="outline">{ama.domain}</Badge>
                </div>

                {/* Schedule */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar size={16} />
                  <span>
                    {ama.status === 'live'
                      ? 'Live now'
                      : formatDistanceToNow(new Date(ama.scheduledDate), { addSuffix: true })}
                  </span>
                </div>

                {/* Questions */}
                <div className="py-3 border-y border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageCircle size={16} className="text-blue-500" />
                    <span className="text-sm font-semibold">{ama.totalQuestions} questions answered</span>
                  </div>
                  <div className="space-y-2">
                    {ama.questions.slice(0, 2).map((q: any) => (
                      <p key={q.id} className="text-xs text-muted-foreground line-clamp-1">
                        • {q.question}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Status Badge */}
                <Badge className={getStatusColor(ama.status)}>
                  {ama.status.charAt(0).toUpperCase() + ama.status.slice(1)}
                </Badge>

                {/* CTA */}
                <Link href={`/amas/${ama.slug}`}>
                  <Button className="w-full" variant={ama.status === 'live' ? 'default' : 'outline'}>
                    {ama.status === 'live' ? 'Join Live' : 'View Questions'}
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* View All */}
        <div className="mt-8 text-center space-y-4">
          <Link href="/amas">
            <Button variant="outline" size="lg">
              View All AMAs ({amas.length})
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground">
            Want to host an AMA? <Link href="/contact" className="text-blue-600 hover:underline font-medium">Contact us</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
