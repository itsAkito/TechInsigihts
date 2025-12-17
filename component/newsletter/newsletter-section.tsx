'use client';

import { useState } from 'react';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { toast } from 'sonner';
import { Mail, CheckCircle } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error('Please enter a valid email address');
        setLoading(false);
        return;
      }

      // Store email in localStorage
      const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
      
      if (subscribers.includes(email)) {
        toast.info('You are already subscribed!');
        setLoading(false);
        return;
      }

      subscribers.push(email);
      localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));

      // Show success state
      setSubscribed(true);
      setEmail('');
      toast.success('Successfully subscribed to our newsletter!');

      // Reset form after 3 seconds
      setTimeout(() => {
        setSubscribed(false);
      }, 3000);
    } catch (error) {
      console.error('Error subscribing:', error);
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <Mail className="w-12 h-12 text-white" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated with TechyBlogs
          </h2>

          <p className="text-white/90 text-lg mb-8">
            Subscribe to our newsletter and get the latest tech insights, tutorials, and community discussions delivered directly to your inbox.
          </p>

          {subscribed ? (
            <div className="flex items-center justify-center gap-3 bg-white/20 backdrop-blur rounded-lg p-4">
              <CheckCircle className="w-6 h-6 text-white" />
              <p className="text-white font-medium">Thank you for subscribing!</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/90 border-0"
                required
              />
              <Button
                type="submit"
                disabled={loading}
                className="bg-white text-orange-600 hover:bg-gray-100 font-semibold px-8 whitespace-nowrap"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          )}

          <p className="text-white/70 text-sm mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
