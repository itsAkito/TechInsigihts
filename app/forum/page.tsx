import { MOCK_FORUM_THREADS } from '@/lib/api/mock-data';
import { Button } from '@/ui/button';
import Link from 'next/link';
import { MessageSquare, Plus, Search } from 'lucide-react';
import { Input } from '@/ui/input';
import ForumThreadCard from '@/component/forum/ForumThreadCard';

export const metadata = {
  title: 'Community Forum - TechyBlogs',
  description: 'Join discussions with tech professionals about AI, SaaS, UX, Cybersecurity, and more',
};

export default function ForumPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-12 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Community Forum</h1>
          <p className="text-white/90 max-w-2xl text-lg">
            Share ideas, ask questions, and learn from thousands of tech professionals
          </p>
        </div>
      </section>

      {/* Action Bar */}
      <section className="py-6 border-b border-border">
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-3 text-muted-foreground" size={18} />
            <Input 
              placeholder="Search discussions..." 
              className="pl-10"
            />
          </div>
          <Link href="/forum/new">
            <Button>
              <Plus size={18} className="mr-2" />
              Start Discussion
            </Button>
          </Link>
        </div>
      </section>

      {/* Threads List */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-4">
            {MOCK_FORUM_THREADS.map((thread: any) => (
              <ForumThreadCard key={thread.id} thread={thread} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-muted/50 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Active Members', value: '2,345' },
              { label: 'Discussions', value: '1,234' },
              { label: 'Replies', value: '8,901' },
              { label: 'Helpful Answers', value: '3,456' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
