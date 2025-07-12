import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: number;
          fullname: string | null;
          email: string;
          password: string;
          location: string | null;
          description: string | null;
          profile_pic: string | null;
          public_profile: boolean;
          trust_percentage: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          fullname?: string | null;
          email: string;
          password: string;
          location?: string | null;
          description?: string | null;
          profile_pic?: string | null;
          public_profile?: boolean;
          trust_percentage?: number;
        };
        Update: {
          fullname?: string | null;
          email?: string;
          password?: string;
          location?: string | null;
          description?: string | null;
          profile_pic?: string | null;
          public_profile?: boolean;
          trust_percentage?: number;
          updated_at?: string;
        };
      };
      skills: {
        Row: {
          id: number;
          name: string;
          description: string | null;
          category: string | null;
        };
        Insert: {
          name: string;
          description?: string | null;
          category?: string | null;
        };
        Update: {
          name?: string;
          description?: string | null;
          category?: string | null;
        };
      };
      messages: {
        Row: {
          id: number;
          sender_id: number;
          receiver_id: number;
          content: string;
          image_url: string | null;
          sent_at: string;
          is_read: boolean;
        };
        Insert: {
          sender_id: number;
          receiver_id: number;
          content: string;
          image_url?: string | null;
          is_read?: boolean;
        };
        Update: {
          content?: string;
          image_url?: string | null;
          is_read?: boolean;
        };
      };
    };
  };
};