import { supabase } from '@/lib/supabase/client';

export type Profile = {
  id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  role?: 'user' | 'admin';
};

// Get profile by user ID
export async function getProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data as Profile | null;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
}

// Get profile by username
export async function getProfileByUsername(username: string) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .single();

    if (error) throw error;
    return data as Profile | null;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
}

// Create or update profile
export async function upsertProfile(
  userId: string,
  profile: {
    username?: string;
    full_name?: string | null;
    avatar_url?: string | null;
  }
) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .upsert([
        {
          id: userId,
          ...profile,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) throw error;
    return data?.[0] as Profile | null;
  } catch (error) {
    console.error('Error upserting profile:', error);
    throw error;
  }
}

// Update profile
export async function updateProfile(
  userId: string,
  updates: {
    username?: string;
    full_name?: string | null;
    avatar_url?: string | null;
  }
) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select();

    if (error) throw error;
    return data?.[0] as Profile | null;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
}

// Get all profiles
export async function getAllProfiles() {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []) as Profile[];
  } catch (error) {
    console.error('Error fetching profiles:', error);
    return [];
  }
}

// Search profiles
export async function searchProfiles(query: string) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .or(`username.ilike.%${query}%,full_name.ilike.%${query}%`)
      .limit(10);

    if (error) throw error;
    return (data || []) as Profile[];
  } catch (error) {
    console.error('Error searching profiles:', error);
    return [];
  }
}
