"use client";

import { useState } from 'react';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';
import Link from 'next/link';
import { Mail, Github, Twitter, Linkedin } from 'lucide-react';
import { toast } from 'sonner';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }
    setSubscribing(true);
    setTimeout(() => {
      toast.success('Thanks for subscribing!');
      setEmail('');
      setSubscribing(false);
    }, 1000);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-primary">TechyBlogs</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Your trusted source for tech insights, innovations, and community-driven content.
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <a href="#" className="inline-flex p-2 rounded-lg hover:bg-primary/10 transition-colors" aria-label="Twitter">
                <Twitter className="h-4 w-4 text-muted-foreground hover:text-primary" />
              </a>
              <a href="#" className="inline-flex p-2 rounded-lg hover:bg-primary/10 transition-colors" aria-label="GitHub">
                <Github className="h-4 w-4 text-muted-foreground hover:text-primary" />
              </a>
              <a href="#" className="inline-flex p-2 rounded-lg hover:bg-primary/10 transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4 text-muted-foreground hover:text-primary" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  All Blogs
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Analytics
                </Link>
              </li>
              <li>
                <Link href="/auth/user-login" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Write Article
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Guides & Tutorials
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Community Forum
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Stay Updated</h4>
            <p className="text-sm text-muted-foreground">
              Get the latest tech news and blog updates delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={subscribing}
                  className="flex-1"
                  aria-label="Email for newsletter subscription"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={subscribing}
                  className="flex-shrink-0"
                  aria-label="Subscribe to newsletter"
                >
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/50 my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div>
            <p>&copy; {currentYear} TechyBlogs. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
