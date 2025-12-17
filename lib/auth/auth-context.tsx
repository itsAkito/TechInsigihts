'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { Profile } from '@/lib/supabase/client';

type AuthContextType = {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for testing
const MOCK_ADMIN_EMAIL = 'admin@techy.com';
const MOCK_ADMIN_PASSWORD = 'admin123';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    // Mock authentication for testing
    if (email === MOCK_ADMIN_EMAIL && password === MOCK_ADMIN_PASSWORD) {
      const mockUser: User = {
        id: 'mock-user-id',
        email: email,
        email_confirmed_at: new Date().toISOString(),
        phone: null,
        confirmation_sent_at: null,
        confirmed_at: null,
        last_sign_in_at: new Date().toISOString(),
        app_metadata: { provider: 'email' },
        user_metadata: {},
        identities: [],
        is_anonymous: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      const mockProfile: Profile = {
        id: 'mock-user-id',
        username: 'admin',
        full_name: 'Admin User',
        avatar_url: null,
        bio: null,
        created_at: new Date().toISOString(),
        role: 'admin', // Admin role
      };
      
      setUser(mockUser);
      setProfile(mockProfile);
      
      // Store in localStorage for persistence
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_user', JSON.stringify(mockUser));
        localStorage.setItem('auth_profile', JSON.stringify(mockProfile));
      }
      return;
    }
    
    // Allow any email with OTP verification (for user login with OTP)
    // In this mock, we accept any OTP that is 6 digits
    if (password.length === 6 && /^\d{6}$/.test(password)) {
      const mockUser: User = {
        id: 'mock-user-id-' + Date.now(),
        email: email,
        email_confirmed_at: new Date().toISOString(),
        phone: null,
        confirmation_sent_at: null,
        confirmed_at: null,
        last_sign_in_at: new Date().toISOString(),
        app_metadata: { provider: 'email' },
        user_metadata: {},
        identities: [],
        is_anonymous: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      const mockProfile: Profile = {
        id: mockUser.id,
        username: email.split('@')[0],
        full_name: null,
        avatar_url: null,
        bio: null,
        created_at: new Date().toISOString(),
        role: 'user', // Regular user role
      };
      
      setUser(mockUser);
      setProfile(mockProfile);
      
      // Store in localStorage for persistence
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_user', JSON.stringify(mockUser));
        localStorage.setItem('auth_profile', JSON.stringify(mockProfile));
      }
      return;
    }

    throw new Error('Invalid login credentials');
  };

  const signUp = async (email: string, password: string, username: string) => {
    const mockUser: User = {
      id: 'mock-user-id-' + Date.now(),
      email: email,
      email_confirmed_at: new Date().toISOString(),
      phone: null,
      confirmation_sent_at: null,
      confirmed_at: null,
      last_sign_in_at: new Date().toISOString(),
      app_metadata: { provider: 'email' },
      user_metadata: {},
      identities: [],
      is_anonymous: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    const mockProfile: Profile = {
      id: mockUser.id,
      username: username,
      full_name: null,
      avatar_url: null,
      bio: null,
      created_at: new Date().toISOString(),
    };
    
    setUser(mockUser);
    setProfile(mockProfile);
  };

  const signOut = async () => {
    setUser(null);
    setProfile(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_user');
      localStorage.removeItem('auth_profile');
    }
  };

  // Check for stored auth on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('auth_user');
      const storedProfile = localStorage.getItem('auth_profile');
      if (storedUser && storedProfile) {
        setUser(JSON.parse(storedUser));
        setProfile(JSON.parse(storedProfile));
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
