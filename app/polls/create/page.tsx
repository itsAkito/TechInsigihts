'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-context';
import { Button } from '@/ui/button';
import { toast } from 'sonner';
import { Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export default function UserCreatePollPage() {
  const router = useRouter();
  const { user, profile } = useAuth();
  const [formData, setFormData] = useState({
    question: '',
    published: false,
  });

  const [options, setOptions] = useState<PollOption[]>([
    { id: '1', text: '', votes: 0 },
    { id: '2', text: '', votes: 0 },
  ]);

  // Redirect if not logged in
  if (!user || profile?.role !== 'user') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Access Denied</h1>
          <p className="text-muted-foreground">Only logged-in users can create polls</p>
          <div className="flex gap-4 justify-center pt-4">
            <Link href="/auth/user-login">
              <Button>Login</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePublishedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, published: e.target.checked }));
  };

  const addOption = () => {
    const newId = Math.max(...options.map((o) => parseInt(o.id)), 0) + 1;
    const newOption: PollOption = {
      id: newId.toString(),
      text: '',
      votes: 0,
    };
    setOptions([...options, newOption]);
  };

  const deleteOption = (id: string) => {
    if (options.length === 2) {
      toast.error('Poll must have at least 2 options');
      return;
    }
    setOptions(options.filter((o) => o.id !== id));
  };

  const updateOption = (id: string, text: string) => {
    setOptions(
      options.map((o) =>
        o.id === id ? { ...o, text } : o
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.question.trim()) {
      toast.error('Please enter a poll question');
      return;
    }

    if (options.length < 2) {
      toast.error('Poll must have at least 2 options');
      return;
    }

    const allOptionsValid = options.every((o) => o.text.trim());
    if (!allOptionsValid) {
      toast.error('All options must be filled in');
      return;
    }

    try {
      const newPoll = {
        id: `poll-user-${Date.now()}`,
        question: formData.question,
        options,
        published: formData.published,
        created_by: user.id,
        author: profile?.username || user.email?.split('@')[0] || 'User',
        created_at: new Date().toISOString(),
      };

      // Save to localStorage
      const savedPolls = localStorage.getItem('user_polls');
      const polls = savedPolls ? JSON.parse(savedPolls) : [];
      polls.push(newPoll);
      localStorage.setItem('user_polls', JSON.stringify(polls));

      toast.success('Poll created successfully!');
      router.push('/polls');
    } catch (error) {
      console.error('Error creating poll:', error);
      toast.error('Failed to create poll');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Create a Trending Poll</h1>
        <p className="text-muted-foreground">Ask the community what they think about your trending topic</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Poll Details */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Question</h2>

          <div>
            <label className="block text-sm font-medium mb-2">Poll Question</label>
            <textarea
              name="question"
              value={formData.question}
              onChange={handleInputChange}
              placeholder="What's your trending topic question?"
              rows={2}
              className="w-full px-4 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={handlePublishedChange}
            />
            <span className="text-sm font-medium">Publish immediately</span>
          </label>
        </div>

        {/* Options */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Options ({options.length})</h2>
            <Button type="button" onClick={addOption} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Option
            </Button>
          </div>

          <div className="space-y-3">
            {options.map((option, idx) => (
              <div key={option.id} className="flex gap-2 items-center">
                <span className="font-medium text-muted-foreground w-8">
                  {String.fromCharCode(65 + idx)}.
                </span>
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) => updateOption(option.id, e.target.value)}
                  placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                  className="flex-1 px-4 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-blue-500 outline-none"
                />
                {options.length > 2 && (
                  <Button
                    type="button"
                    onClick={() => deleteOption(option.id)}
                    variant="destructive"
                    size="sm"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4 pt-8 border-t">
          <Button
            type="button"
            onClick={() => router.back()}
            variant="outline"
          >
            Cancel
          </Button>
          <Button type="submit" className="bg-green-600 hover:bg-green-700">
            Create Poll
          </Button>
        </div>
      </form>
    </div>
  );
}
