import { MOCK_AMAS } from '@/lib/api/mock-data';
import { Card } from '@/ui/card';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Mic, Calendar, MessageCircle, Plus } from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

export const metadata = {
  title: 'Ask Me Anything - TechyBlogs',
  description: 'Connect with industry experts and get answers to your questions',
};

export default function AMAPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-300';
      case 'live':
        return 'bg-green-500/10 text-green-700 dark:text-green-300';
      case 'completed':
        return 'bg-gray-500/10 text-gray-700 dark:text-gray-300';
      default:
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-300';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-12 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Ask Me Anything</h1>
          <p className="text-white/90 max-w-2xl mx-auto text-lg">
            Get insights from industry experts on AI, SaaS, UX, Cybersecurity, and more
          </p>
        </div>
      </section>

      {/* Filter & Create */}
      <section className="py-6 border-b border-border">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">All</button>
            <button className="px-4 py-2 rounded-lg bg-background border border-border hover:bg-muted">Live</button>
            <button className="px-4 py-2 rounded-lg bg-background border border-border hover:bg-muted">Upcoming</button>
            <button className="px-4 py-2 rounded-lg bg-background border border-border hover:bg-muted">Past</button>
          </div>
          <Link href="/contact?type=host-ama">
            <Button>
              <Plus size={18} className="mr-2" />
              Host AMA
            </Button>
          </Link>
        </div>
      </section>

      {/* AMAs Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_AMAS.map((ama: any) => (
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
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mic className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{ama.expert}</p>
                      <p className="text-xs text-muted-foreground">{ama.expertise}</p>
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-purple-600 transition-colors mb-2">
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
                      <MessageCircle size={16} className="text-purple-500" />
                      <span className="text-sm font-semibold">{ama.totalQuestions} questions answered</span>
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
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
