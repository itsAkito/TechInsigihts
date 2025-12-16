'use client';

import { useAuth } from '@/lib/auth/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { MOCK_CATEGORIES } from '@/lib/api/mock-data';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export default function CategoriesManagementPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
  });

  useEffect(() => {
    if (user && user.email !== 'admin@techy.com') {
      router.push('/');
    }
  }, [user, router]);

  const handleAddNew = () => {
    setEditingId('new');
    setFormData({ name: '', slug: '', description: '' });
  };

  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description,
    });
  };

  const handleSave = () => {
    if (!formData.name || !formData.slug) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (editingId === 'new') {
      const newCategory: Category = {
        id: String(categories.length + 1),
        ...formData,
      };
      setCategories([...categories, newCategory]);
      toast.success('Category created successfully');
    } else if (editingId) {
      setCategories(
        categories.map((cat) =>
          cat.id === editingId ? { ...cat, ...formData } : cat
        )
      );
      toast.success('Category updated successfully');
    }

    setEditingId(null);
    setFormData({ name: '', slug: '', description: '' });
  };

  const handleDelete = (id: string) => {
    setCategories(categories.filter((cat) => cat.id !== id));
    toast.success('Category deleted successfully');
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ name: '', slug: '', description: '' });
  };

  if (!user || user.email !== 'admin@techy.com') {
    return <div className="text-center py-12">Access Denied</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Manage Categories</h1>
          <p className="text-muted-foreground mt-2">
            Create and manage blog post categories
          </p>
        </div>
        {editingId === null && (
          <Button onClick={handleAddNew} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Category
          </Button>
        )}
      </div>

      {/* Add/Edit Form */}
      {editingId && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingId === 'new' ? 'Add New Category' : 'Edit Category'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Category Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., React"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">URL Slug *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                placeholder="e.g., react"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Brief description of the category"
              />
            </div>

            <div className="flex items-center gap-2 pt-4">
              <Button onClick={handleSave}>Save</Button>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Categories List */}
      <Card>
        <CardHeader>
          <CardTitle>All Categories ({categories.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-lg">{category.name}</h3>
                    <p className="text-sm text-gray-600">
                      Slug: <code className="bg-gray-100 px-2 py-1 rounded">{category.slug}</code>
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-700">{category.description}</p>

                <div className="flex items-center gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(category)}
                    className="gap-2"
                  >
                    <Edit2 className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(category.id)}
                    className="gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
