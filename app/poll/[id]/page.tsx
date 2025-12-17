'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { CommentSection } from '@/comments/comment-section';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Calendar, User, MessageSquare } from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';import { ADMIN_CREATED_POLLS } from '@/lib/api/admin-data';
interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  post_id?: string;
  created_by: string;
  created_at: string;
  author?: string;
}

export default function PollDetailPage() {
  const params = useParams();
  const pollId = params.id as string;
  const { user } = useAuth();
  
  const [poll, setPoll] = useState<Poll | null>(null);
  const [loading, setLoading] = useState(true);
  const [userVote, setUserVote] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    // Load poll from admin data or localStorage
    const adminPoll = ADMIN_CREATED_POLLS.find((p) => p.id === pollId);
    if (adminPoll) {
      setPoll(adminPoll as any);
    } else {
      const savedPolls = localStorage.getItem('user_polls');
      if (savedPolls) {
        const polls = JSON.parse(savedPolls);
        const foundPoll = polls.find((p: Poll) => p.id === pollId);
        if (foundPoll) {
          setPoll(foundPoll);
        }
      }
    }

    // Check if user has already voted
    const userVotes = localStorage.getItem(`poll_votes_${pollId}`);
    if (userVotes && user) {
      const votes = JSON.parse(userVotes);
      if (votes[user.id]) {
        setHasVoted(true);
        setUserVote(votes[user.id]);
      }
    }

    setLoading(false);
  }, [pollId, user]);

  const handleVote = (optionId: string) => {
    if (!user) {
      alert('Please sign in to vote');
      return;
    }

    if (!hasVoted && poll) {
      // Update vote count
      const updatedPoll: Poll = { ...poll };
      updatedPoll.options = updatedPoll.options.map((opt) =>
        opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
      );
      setPoll(updatedPoll);

      // Save updated poll
      const savedPolls = localStorage.getItem('techy_polls');
      if (savedPolls) {
        const polls = JSON.parse(savedPolls);
        const index = polls.findIndex((p: Poll) => p.id === pollId);
        if (index !== -1) {
          polls[index] = updatedPoll;
          localStorage.setItem('techy_polls', JSON.stringify(polls));
        }
      }

      // Record user vote
      const userVotes = JSON.parse(localStorage.getItem(`poll_votes_${pollId}`) || '{}');
      userVotes[user.id] = optionId;
      localStorage.setItem(`poll_votes_${pollId}`, JSON.stringify(userVotes));

      setHasVoted(true);
      setUserVote(optionId);
    }
  };

  if (loading) {
    return <div className="max-w-4xl mx-auto px-4 py-12">Loading...</div>;
  }

  if (!poll) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <p className="text-muted-foreground">Poll not found</p>
      </div>
    );
  }

  const formattedDate = new Date(poll.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <article>
        <div className="space-y-6">
          <div className="space-y-4">
            <Badge variant="secondary" className="text-sm">
              Poll
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              {poll.question}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{poll.author || poll.created_by}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>Comments</span>
              </div>
            </div>
          </div>

          {/* Poll Content */}
          <div className="border-t border-b py-8 space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">
                {totalVotes} {totalVotes === 1 ? 'vote' : 'votes'} • {hasVoted ? 'You voted' : 'Cast your vote'}
              </h2>

              {poll.options.map((option) => {
                const percentage =
                  totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
                const isSelected = userVote === option.id;

                return (
                  <button
                    key={option.id}
                    onClick={() => handleVote(option.id)}
                    disabled={hasVoted}
                    className={`w-full p-4 text-left border rounded-lg transition-colors ${
                      hasVoted
                        ? 'cursor-default'
                        : 'hover:border-blue-400 cursor-pointer'
                    } ${
                      isSelected
                        ? 'bg-blue-100 border-blue-500 dark:bg-blue-950'
                        : 'bg-muted border-muted-foreground/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{option.text}</span>
                      <span className="text-sm text-muted-foreground">
                        {option.votes} vote{option.votes !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          isSelected ? 'bg-blue-600' : 'bg-muted-foreground/50'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {percentage}%
                    </div>
                  </button>
                );
              })}
            </div>

            {hasVoted && (
              <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 p-4 rounded-lg">
                <p className="text-green-700 dark:text-green-200 font-medium">
                  ✓ Thanks for voting!
                </p>
              </div>
            )}

            {!user && (
              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
                <p className="text-blue-700 dark:text-blue-200">
                  Sign in to vote on this poll
                </p>
              </div>
            )}
          </div>
        </div>
      </article>

      {/* Comments Section */}
      {user && <CommentSection entityId={pollId} entityType="poll" />}
      {!user && (
        <div className="bg-muted p-6 rounded-lg text-center">
          <p className="text-muted-foreground mb-4">Sign in to leave comments</p>
        </div>
      )}
    </div>
  );
}
