'use client';

import { useAuth } from '@/lib/auth/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { MOCK_BLOGS } from '@/lib/api/mock-data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui/table';
import { Badge } from '@/ui/badge';
import { Eye, Edit2, Trash2, Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { format } from 'date-fns';

export default function BlogsManagementPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [blogs, setBlogs] = useState(MOCK_BLOGS);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (user && user.email !== 'admin@techy.com') {
      router.push('/');
    }
  }, [user, router]);

  const handleDelete = (id: string) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
    toast.success('Blog deleted successfully');
  };

  const handlePublish = (id: string) => {
    setBlogs(
      blogs.map((blog) =>
        blog.id === id ? { ...blog, published: !blog.published } : blog
      )
    );
    toast.success('Blog status updated');
  };

  if (!user || user.email !== 'admin@techy.com') {
    return <div className="text-center py-12">Access Denied</div>;
  }

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.category_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Manage Blogs</h1>
          <p className="text-muted-foreground mt-2">
            Edit, delete, and manage all blog posts
          </p>
        </div>
        <Link href="/admin/add-blog">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Blog
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Blog Posts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by title or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="text-sm text-muted-foreground">
            Showing {filteredBlogs.length} of {blogs.length} posts
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBlogs.length > 0 ? (
                  filteredBlogs.map((blog) => (
                    <TableRow key={blog.id}>
                      <TableCell className="font-medium">{blog.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{blog.category_name}</Badge>
                      </TableCell>
                      <TableCell className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {blog.views}
                      </TableCell>
                      <TableCell>
                        {format(new Date(blog.created_at), 'MMM dd, yyyy')}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={blog.published ? 'default' : 'secondary'}
                        >
                          {blog.published ? 'Published' : 'Draft'}
                        </Badge>
                      </TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Link href={`/blog/${blog.slug}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/admin/edit-blog/${blog.id}`}>
                          <Button variant="ghost" size="sm">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePublish(blog.id)}
                        >
                          {blog.published ? 'Unpublish' : 'Publish'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(blog.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No blogs found matching your search
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
