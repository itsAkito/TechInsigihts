import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategoryBySlug } from '@/lib/api/categories';
import { getPostsByCategory } from '@/lib/api/posts';
import { generateCategoryMetadata } from '@/lib/seo/metadata';
import { Card, CardContent, CardFooter, CardHeader } from '@/ui/card';
import { Badge } from '@/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { Calendar, User } from 'lucide-react';

type Props = {
  params: { category: string };
};

export async function generateMetadata({ params }: Props) {
  const category = await getCategoryBySlug(params.category);
  if (!category) return {};
  return generateCategoryMetadata(category.name, category.description || undefined);
}

export const revalidate = 60;

export default async function CategoryPage({ params }: Props) {
  const category = await getCategoryBySlug(params.category);

  if (!category) {
    notFound();
  }

  const posts = await getPostsByCategory(params.category);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Badge variant="secondary" className="text-sm">
          Category
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          {category.name}
        </h1>
        {category.description && (
          <p className="text-xl text-muted-foreground max-w-2xl">
            {category.description}
          </p>
        )}
        <p className="text-sm text-muted-foreground">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'}
        </p>
      </div>

      {posts.length === 0 ? (
        <Card>
          <CardContent className="py-20 text-center">
            <p className="text-muted-foreground text-lg">
              No posts in this category yet.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                {post.cover_image && (
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardHeader>
                  <h2 className="text-2xl font-bold line-clamp-2 hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3">
                    {post.excerpt || post.content.substring(0, 150)}
                  </p>
                </CardContent>
                <CardFooter className="text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{post.author?.username}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {formatDistanceToNow(new Date(post.published_at!), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
