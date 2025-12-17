'use client';

import { Card, CardContent } from '@/ui/card';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';
import { Mail, ArrowRight } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      // Store email in localStorage
      const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
      
      if (subscribers.includes(email)) {
        toast.info('You are already subscribed!');
        setLoading(false);
        return;
      }

      subscribers.push(email);
      localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));

      toast.success('Subscribed successfully! Check your email for confirmation.');
      setEmail('');
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-16">
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0">
        <CardContent className="p-8 md:p-12 text-center">
          <div className="space-y-4 max-w-2xl mx-auto">
            <div className="flex justify-center">
              <div className="bg-white/20 p-3 rounded-full">
                <Mail className="w-6 h-6 text-white" />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Stay Updated with Latest Tech Blogs
            </h2>

            <p className="text-white/90 text-lg">
              Subscribe to our newsletter and get the latest articles delivered directly to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md mx-auto pt-4">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="bg-white text-foreground placeholder:text-muted-foreground"
              />
              <Button
                type="submit"
                disabled={loading}
                className="bg-white text-blue-600 hover:bg-gray-100 px-6 gap-2 whitespace-nowrap"
              >
                {loading ? 'Subscribing...' : (
                  <>
                    Subscribe
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>

            <p className="text-xs text-white/70 pt-2">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
