'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-context';
import { useState } from 'react';
import { toast } from 'sonner';
import { 
  LayoutDashboard, 
  PenSquare,
  List,
  MessageSquare, 
  LogOut,
  Menu,
  X,
  Trophy,
  BarChart3 as Poll,
} from 'lucide-react';

const adminLinks = [
  // Core
  { section: 'Core', href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/add-blog', label: 'Write Blog', icon: PenSquare },
  { href: '/admin/blogs', label: 'All Blogs', icon: List },
  { href: '/admin/comments', label: 'Comments', icon: MessageSquare },
  
  // Knowledge
  { section: 'Knowledge', href: '/admin/quizzes', label: 'Quizzes', icon: Trophy },
  
  // Community
  { section: 'Community', href: '/admin/polls', label: 'Polls', icon: Poll },
];

export function AdminSidebar() {
  const { user, profile, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Only show for admin users
  if (!user || !profile || profile.role !== 'admin') {
    return null;
  }

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Logged out successfully');
      router.push('/');
      setIsOpen(false);
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-primary text-white p-2 rounded-md"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar - Always visible on desktop, toggleable on mobile */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-card border-r border-border z-40 overflow-y-auto transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static`}
      >
        <div className="p-6 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Admin Panel</h2>
            <p className="text-xs text-muted-foreground mt-1">{user.email?.split('@')[0]}</p>
          </div>
          
          <nav className="space-y-4">
            {adminLinks.map((link, idx) => {
              // If it's a section header, render it
              if ('section' in link) {
                const Icon = link.icon;
                const isActive = 'exact' in link ? 
                  (link.exact ? pathname === link.href : pathname.startsWith(link.href)) :
                  false;
                return (
                  <div key={idx}>
                    {idx > 0 && <div className="border-t border-border my-2" />}
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-2">{link.section}</p>
                  </div>
                );
              }
              
              const Icon = link.icon;
              const isActive = 'exact' in link ? 
                (link.exact ? pathname === link.href : pathname.startsWith(link.href)) :
                pathname.startsWith(link.href);
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
                    isActive
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-muted-foreground hover:bg-muted'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon size={18} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Divider */}
          <div className="border-t border-border pt-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
