'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/ui/card';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { ArrowRight, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { MOCK_POLLS } from '@/lib/api/mock-data';

export default function PollsSection() {
  const [polls, setPolls] = useState(MOCK_POLLS);

  useEffect(() => {
    try {
      const savedPolls = localStorage.getItem('techy_polls');
      if (savedPolls) {
        setPolls(JSON.parse(savedPolls));
      }
    } catch (error) {
      console.error('Failed to load polls:', error);
    }
  }, []);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="space-y-2 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Live Polls</h2>
          <p className="text-muted-foreground text-lg">
            Vote on trending tech topics and see what the community thinks
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {polls.slice(0, 4).map((poll: any) => {
            const topOption = poll.options.reduce((max: any, opt: any) => 
              opt.votes > max.votes ? opt : max
            );
            const topPercentage = (topOption.votes / poll.totalVotes * 100).toFixed(1);

            return (
              <Card key={poll.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  {/* Header */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{poll.title}</h3>
                    <Badge variant="outline">{poll.domain}</Badge>
                  </div>

                  {/* Options */}
                  <div className="space-y-3">
                    {poll.options.slice(0, 3).map((option: any) => {
                      const percentage = (option.votes / poll.totalVotes * 100).toFixed(1);
                      const isTop = option.id === topOption.id;

                      return (
                        <div key={option.id}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">{option.text}</span>
                            <span className="text-xs text-muted-foreground">{percentage}%</span>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all ${isTop ? 'bg-blue-500' : 'bg-muted-foreground'}`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{option.votes} votes</p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-2 py-3 border-t border-border text-xs text-muted-foreground">
                    <BarChart3 size={16} />
                    <span>{poll.totalVotes.toLocaleString()} total votes</span>
                  </div>

                  {/* CTA */}
                  <Link href={`/polls/${poll.id}`}>
                    <Button className="w-full" variant="outline" size="sm">
                      Vote Now
                      <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="mt-8 text-center">
          <Link href="/polls">
            <Button variant="outline" size="lg">
              View All Polls ({polls.length})
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
