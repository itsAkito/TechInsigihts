import { Card, CardContent } from '@/ui/card';
import { Badge } from '@/ui/badge';
import { Eye, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/ui/button';

interface BlogCardProps {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image_url?: string;
  category_name: string;
  author: string;
  views: number;
  created_at: string;
}

export default function BlogCard({
  id,
  title,
  slug,
  excerpt,
  image_url,
  category_name,
  author,
  views,
  created_at,
}: BlogCardProps) {
  const formattedDate = new Date(created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Card className="hover:shadow-lg transition-shadow overflow-hidden group">
      {/* Featured Image */}
      {image_url && (
        <div className="relative h-48 overflow-hidden bg-muted">
          <img
            src={image_url}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <CardContent className={`${image_url ? 'p-6' : 'p-6'} space-y-4`}>
        {/* Badge and Title */}
        <div className="space-y-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {category_name}
          </Badge>
          <h3 className="text-xl font-semibold text-foreground group-hover:text-blue-600 transition-colors line-clamp-2">
            {title}
          </h3>
        </div>

        {/* Excerpt */}
        <p className="text-muted-foreground line-clamp-2 text-sm">
          {excerpt}
        </p>

        {/* Meta Information */}
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground pt-2">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {formattedDate}
          </div>
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            {author}
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {views} views
          </div>
        </div>

        {/* Read More Button */}
        <div className="pt-4">
          <Link href={`/blog/${slug}`}>
            <Button variant="outline" className="w-full">
              Read More
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
