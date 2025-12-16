'use client';

import { Card } from '@/ui/card';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface PollCardProps {
  poll: any;
}

export default function PollCard({ poll }: PollCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const topOption = poll.options.reduce((max: any, opt: any) => 
    opt.votes > max.votes ? opt : max
  );

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">{poll.title}</h3>
          <Badge variant="outline">{poll.domain}</Badge>
        </div>

        <div className="space-y-3">
          {poll.options.map((option: any) => {
            const percentage = (option.votes / poll.totalVotes * 100).toFixed(1);
            const isTop = option.id === topOption.id;

            return (
              <div key={option.id}>
                <button
                  onClick={() => setSelectedOption(option.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all border ${
                    selectedOption === option.id
                      ? 'bg-blue-500/10 border-blue-500'
                      : 'border-border hover:bg-muted'
                  }`}
                >
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
                </button>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-2 py-3 border-t border-border text-xs text-muted-foreground">
          <BarChart3 size={16} />
          <span>{poll.totalVotes.toLocaleString()} total votes</span>
        </div>

        <Button 
          className="w-full" 
          disabled={!selectedOption}
          onClick={() => {
            // Handle vote submission
            alert(`Voted for option ${selectedOption}`);
          }}
        >
          Submit Vote
        </Button>
      </div>
    </Card>
  );
}
