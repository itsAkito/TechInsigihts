import { ADMIN_CREATED_POLLS } from '@/lib/api/admin-data';
import { Button } from '@/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Card, CardContent } from '@/ui/card';

export const metadata = {
  title: 'Polls - TechyBlogs',
  description: 'Vote on trending tech topics and see what the community thinks',
};

export default function PollsPage() {
  // Get all polls (admin + user-created)
  const userPolls = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user_polls') || '[]') : [];
  const allPolls = [...ADMIN_CREATED_POLLS, ...userPolls];
  const publishedPolls = allPolls.filter((p: any) => p.published !== false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-12 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Community Polls</h1>
          <p className="text-white/90 max-w-2xl mx-auto text-lg">
            Share your opinions and see what the tech community thinks about trending topics
          </p>
        </div>
      </section>

      {/* Filter & Create */}
      <section className="py-6 border-b border-border">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            {publishedPolls.length} polls available
          </div>
          <Link href="/polls/create">
            <Button>
              <Plus size={18} className="mr-2" />
              Create Your Poll
            </Button>
          </Link>
        </div>
      </section>

      {/* Polls Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {publishedPolls.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No polls yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publishedPolls.map((poll: any) => (
                <Link key={poll.id} href={`/poll/${poll.id}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <CardContent className="p-6 space-y-4">
                      <h3 className="text-lg font-semibold line-clamp-2">{poll.question}</h3>
                      <div className="space-y-2">
                        {poll.options.slice(0, 2).map((opt: any) => (
                          <div key={opt.id} className="flex justify-between text-sm">
                            <span>{opt.text}</span>
                            <span className="text-muted-foreground">{opt.votes} votes</span>
                          </div>
                        ))}
                        {poll.options.length > 2 && (
                          <p className="text-xs text-muted-foreground pt-2">
                            +{poll.options.length - 2} more options
                          </p>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        by {poll.author || 'Admin'}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
      </section>
    </div>
  );
}
