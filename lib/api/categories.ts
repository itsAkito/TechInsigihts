import { MOCK_CATEGORIES } from './mock-data';

export async function getAllCategories() {
  try {
    // Using mock data for testing - replace with Supabase call when ready
    return MOCK_CATEGORIES;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return MOCK_CATEGORIES; // Fallback to mock data
  }
}

export async function getCategoryBySlug(slug: string) {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) throw error;
  return data as Category | null;
}

export async function createCategory(category: {
  name: string;
  slug: string;
  description?: string;
}) {
  const { data, error } = await supabase
    .from('categories')
    .insert(category)
    .select()
    .single();

  if (error) throw error;
  return data as Category;
}
