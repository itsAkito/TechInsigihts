import { MOCK_POLLS } from '@/lib/api/mock-data';
import { Button } from '@/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import PollCard from '@/component/poll/PollCard';

export const metadata = {
  title: 'Polls - TechyBlogs',
  description: 'Vote on trending tech topics and see what the community thinks',
};

export default function PollsPage() {
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
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">All</button>
            <button className="px-4 py-2 rounded-lg bg-background border border-border hover:bg-muted">Active</button>
            <button className="px-4 py-2 rounded-lg bg-background border border-border hover:bg-muted">Closed</button>
          </div>
          <Link href="/admin/polls/new">
            <Button>
              <Plus size={18} className="mr-2" />
              Create Poll
            </Button>
          </Link>
        </div>
      </section>

      {/* Polls Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {MOCK_POLLS.map((poll: any) => (
              <PollCard key={poll.id} poll={poll} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
