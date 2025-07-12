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
          public_profile?: boolean;
          trust_percentage?: number;
        };
        Update: {
          fullname?: string | null;
          email?: string;
          password?: string;
          location?: string | null;
          description?: string | null;
          public_profile?: boolean;
          trust_percentage?: number;
          updated_at?: string;
        };
      };
      skills: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          category: string | null;
          created_at: string;
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
      user_skill_offer: {
        Row: {
          id: string;
          user_id: string;
          skill_id: string;
          proficiency_level: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          skill_id: string;
          proficiency_level?: string;
        };
        Update: {
          proficiency_level?: string;
        };
      };
      user_skill_want: {
        Row: {
          id: string;
          user_id: string;
          skill_id: string;
          priority_level: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          skill_id: string;
          priority_level?: string;
        };
        Update: {
          priority_level?: string;
        };
      };
      swap_requests: {
        Row: {
          id: string;
          from_user_id: string;
          to_user_id: string;
          status: 'pending' | 'matched' | 'rejected';
          swipe_type: 'normal' | 'super' | 'save';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          from_user_id: string;
          to_user_id: string;
          status?: 'pending' | 'matched' | 'rejected';
          swipe_type?: 'normal' | 'super' | 'save';
        };
        Update: {
          status?: 'pending' | 'matched' | 'rejected';
          updated_at?: string;
        };
      };
      swap_sessions: {
        Row: {
          id: string;
          swap_request_id: string;
          scheduled_time: string;
          duration: number;
          status: 'scheduled' | 'completed' | 'cancelled';
          feedback_given: boolean;
          meet_link: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          swap_request_id: string;
          scheduled_time: string;
          duration?: number;
          status?: 'scheduled' | 'completed' | 'cancelled';
          feedback_given?: boolean;
          meet_link?: string | null;
        };
        Update: {
          scheduled_time?: string;
          duration?: number;
          status?: 'scheduled' | 'completed' | 'cancelled';
          feedback_given?: boolean;
          meet_link?: string | null;
          updated_at?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: 'match' | 'message' | 'session' | 'badge';
          title: string;
          message: string;
          is_read: boolean;
          metadata: any;
          created_at: string;
        };
        Insert: {
          user_id: string;
          type: 'match' | 'message' | 'session' | 'badge';
          title: string;
          message: string;
          is_read?: boolean;
          metadata?: any;
        };
        Update: {
          is_read?: boolean;
        };
      };
      badges: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          icon: string | null;
          criteria: any;
          created_at: string;
        };
        Insert: {
          name: string;
          description?: string | null;
          icon?: string | null;
          criteria?: any;
        };
        Update: {
          name?: string;
          description?: string | null;
          icon?: string | null;
          criteria?: any;
        };
      };
      user_badge: {
        Row: {
          id: string;
          user_id: string;
          badge_id: string;
          awarded_at: string;
        };
        Insert: {
          user_id: string;
          badge_id: string;
        };
        Update: {
          awarded_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
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