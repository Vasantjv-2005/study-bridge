import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const USE_DUMMY = (import.meta as any).env?.VITE_USE_DUMMY_AUTH === 'true';

  useEffect(() => {
    if (USE_DUMMY) {
      try {
        const stored = localStorage.getItem('dummy_session');
        if (stored) {
          const parsed = JSON.parse(stored);
          setUser(parsed.user as User);
          setSession(null);
        }
      } catch {}
      setLoading(false);
      return;
    }

    // Supabase auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [USE_DUMMY]);

  const signUp = async (email: string, password: string, name: string) => {
    if (USE_DUMMY) {
      const usersRaw = localStorage.getItem('dummy_users');
      const users: Record<string, { password: string; name: string; id: string }> = usersRaw ? JSON.parse(usersRaw) : {};
      if (users[email]) {
        return { error: new Error('User already registered') };
      }
      const id = crypto?.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
      users[email] = { password, name, id };
      localStorage.setItem('dummy_users', JSON.stringify(users));
      const dummyUser = { id, email, user_metadata: { name } } as unknown as User;
      localStorage.setItem('dummy_session', JSON.stringify({ user: dummyUser }));
      setUser(dummyUser);
      setSession(null);
      return { error: null };
    }

    const redirectUrl = `${window.location.origin}/`;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: { name }
      }
    });

    if (!error && data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({ user_id: data.user.id, name });
      if (profileError) {
        console.error('Error creating profile:', profileError);
      }
    }
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    if (USE_DUMMY) {
      const usersRaw = localStorage.getItem('dummy_users');
      const users: Record<string, { password: string; name: string; id: string }> = usersRaw ? JSON.parse(usersRaw) : {};
      const u = users[email];
      if (!u || u.password !== password) {
        return { error: new Error('Invalid login credentials') };
      }
      const dummyUser = { id: u.id, email, user_metadata: { name: u.name } } as unknown as User;
      localStorage.setItem('dummy_session', JSON.stringify({ user: dummyUser }));
      setUser(dummyUser);
      setSession(null);
      return { error: null };
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signOut = async () => {
    if (USE_DUMMY) {
      localStorage.removeItem('dummy_session');
      setUser(null);
      setSession(null);
      return;
    }
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
