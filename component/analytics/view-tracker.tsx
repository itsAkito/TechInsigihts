'use client';

import { useEffect } from 'react';
import { trackPostView } from '@/lib/api/posts';
import { useAuth } from '@/lib/auth/auth-context';

type ViewTrackerProps = {
  postId: string;
};

export function ViewTracker({ postId }: ViewTrackerProps) {
  const { user } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      trackPostView(postId, user?.id);
    }, 3000);

    return () => clearTimeout(timer);
  }, [postId, user]);

  return null;
}
