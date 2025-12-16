'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Textarea } from '@/ui/textarea';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/select';
import { MOCK_CATEGORIES, MOCK_BLOGS } from '@/lib/api/mock-data';
import { Switch } from '@/ui/switch';

export default function AddBlogPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category_id: '',
    published: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Auto-generate slug from title
    if (name === 'title') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category_id: value }));
  };

  const handlePublishedChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, published: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.title || !formData.excerpt || !formData.content || !formData.category_id) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      // In a real app, this would save to the backend/database
      const newBlog = {
        id: `blog-${Date.now()}`,
        title: formData.title,
        slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-'),
        excerpt: formData.excerpt,
        content: formData.content,
        category_id: formData.category_id,
        category_name: MOCK_CATEGORIES.find((c) => c.id === formData.category_id)?.name || '',
        author: 'Admin',
        published: formData.published,
        views: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Save to localStorage (mock backend)
      const existingBlogs = JSON.parse(localStorage.getItem('techy_blogs') || '[]');
      existingBlogs.push(newBlog);
      localStorage.setItem('techy_blogs', JSON.stringify(existingBlogs));

      toast.success('Blog post created successfully!');
      router.push('/admin/blogs');
    } catch (error) {
      toast.error('Failed to create blog post');
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Create New Blog Post</h1>
        <p className="text-muted-foreground mt-2">Write and publish a new blog article</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Blog Post Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                Title <span className="text-red-500">*</span>
              </label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter blog post title..."
                className="text-base"
              />
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                Slug <span className="text-red-500">*</span>
              </label>
              <Input
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                placeholder="auto-generated-slug"
                className="text-base"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                Category <span className="text-red-500">*</span>
              </label>
              <Select value={formData.category_id} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_CATEGORIES.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Excerpt */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                Excerpt <span className="text-red-500">*</span>
              </label>
              <Textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                placeholder="Write a brief summary of your blog post..."
                rows={3}
              />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                Content <span className="text-red-500">*</span>
              </label>
              <Textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Write your blog post content here..."
                rows={12}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Supports Markdown formatting
              </p>
            </div>

            {/* Publish Status */}
            <div className="flex items-center gap-3">
              <label className="text-sm font-semibold text-foreground">Publish Now</label>
              <Switch
                checked={formData.published}
                onCheckedChange={handlePublishedChange}
              />
              <span className="text-sm text-muted-foreground">
                {formData.published ? 'Published' : 'Draft'}
              </span>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700"
              >
                Create Blog Post
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/admin/blogs')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
