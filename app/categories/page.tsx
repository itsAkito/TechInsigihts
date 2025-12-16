import Link from 'next/link';
import { getAllCategories } from '@/lib/api/categories';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { Badge } from '@/ui/badge';
import { FolderOpen } from 'lucide-react';

export const revalidate = 60;

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Categories
        </h1>
        <p className="text-xl text-muted-foreground">
          Browse posts by topic
        </p>
      </div>

      {categories.length === 0 ? (
        <Card>
          <CardContent className="py-20 text-center">
            <p className="text-muted-foreground text-lg">
              No categories yet.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link key={category.id} href={`/blog/categories/${category.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 hover:border-primary">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <FolderOpen className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">{category.name}</CardTitle>
                  </div>
                </CardHeader>
                {category.description && (
                  <CardContent>
                    <p className="text-muted-foreground">
                      {category.description}
                    </p>
                  </CardContent>
                )}
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
