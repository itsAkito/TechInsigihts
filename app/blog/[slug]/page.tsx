import { notFound } from 'next/navigation';
import { ADMIN_CREATED_BLOGS } from '@/lib/api/admin-data';
import { CommentSection } from '@/comments/comment-section';
import { Badge } from '@/ui/badge';
import { Calendar, User, Eye } from 'lucide-react';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return ADMIN_CREATED_BLOGS.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = ADMIN_CREATED_BLOGS.find((p) => p.slug === slug);

  if (!post || !post.published) {
    notFound();
  }

  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <article>
        <div className="space-y-6">
          {/* Featured Image */}
          {post.image_url && (
            <div className="relative w-full h-96 rounded-lg overflow-hidden bg-muted">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="space-y-4">
            <Badge variant="secondary" className="text-sm">
              {post.category_name}
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-xl text-muted-foreground">
                {post.excerpt}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author_name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>{post.views} views</span>
              </div>
            </div>
          </div>

          <div className="border-t border-b py-6 prose prose-neutral dark:prose-invert max-w-none">
            {post.content.split('\n').map((line: string, i: number) => {
              if (line.startsWith('# ')) {
                return <h1 key={i} className="text-3xl font-bold mt-6 mb-4">{line.substring(2)}</h1>;
              } else if (line.startsWith('## ')) {
                return <h2 key={i} className="text-2xl font-bold mt-5 mb-3">{line.substring(3)}</h2>;
              } else if (line.startsWith('### ')) {
                return <h3 key={i} className="text-xl font-bold mt-4 mb-2">{line.substring(4)}</h3>;
              } else if (line.startsWith('- ') || line.startsWith('* ')) {
                return <li key={i} className="ml-6">{line.substring(2)}</li>;
              } else if (line.trim() === '') {
                return <br key={i} />;
              } else {
                return <p key={i} className="text-foreground mb-4">{line}</p>;
              }
            })}
          </div>
        </div>
      </article>

      <CommentSection entityId={post.id} entityType="post" />
    </div>
  );
}
