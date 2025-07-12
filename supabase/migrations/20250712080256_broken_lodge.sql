/*
  # SwapIT Database Schema

  1. New Tables
    - `skills` - Available skills in the system
    - `user_skill_offer` - Skills users can teach
    - `user_skill_want` - Skills users want to learn
    - `swap_requests` - Swipe interactions and matches
    - `swap_sessions` - Scheduled skill swap sessions
    - `notifications` - User notifications
    - `badges` - Available achievement badges
    - `user_badge` - User earned badges

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Ensure users can only access their own data
*/

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  category text,
  created_at timestamptz DEFAULT now()
);

-- User skill offerings
CREATE TABLE IF NOT EXISTS user_skill_offer (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  skill_id uuid REFERENCES skills(id) ON DELETE CASCADE,
  proficiency_level text DEFAULT 'intermediate',
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, skill_id)
);

-- User skill wants
CREATE TABLE IF NOT EXISTS user_skill_want (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  skill_id uuid REFERENCES skills(id) ON DELETE CASCADE,
  priority_level text DEFAULT 'medium',
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, skill_id)
);

-- Swap requests (swipes and matches)
CREATE TABLE IF NOT EXISTS swap_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  from_user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  to_user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'matched', 'rejected')),
  swipe_type text DEFAULT 'normal' CHECK (swipe_type IN ('normal', 'super', 'save')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(from_user_id, to_user_id)
);

-- Swap sessions
CREATE TABLE IF NOT EXISTS swap_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  swap_request_id uuid REFERENCES swap_requests(id) ON DELETE CASCADE,
  scheduled_time timestamptz NOT NULL,
  duration integer DEFAULT 60,
  status text DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  feedback_given boolean DEFAULT false,
  meet_link text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('match', 'message', 'session', 'badge')),
  title text NOT NULL,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Badges
CREATE TABLE IF NOT EXISTS badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  icon text,
  criteria jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- User badges
CREATE TABLE IF NOT EXISTS user_badge (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id uuid REFERENCES badges(id) ON DELETE CASCADE,
  awarded_at timestamptz DEFAULT now(),
  UNIQUE(user_id, badge_id)
);

-- Update messages table to match requirements
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'messages' AND column_name = 'sender_id'
  ) THEN
    ALTER TABLE messages RENAME COLUMN sender_id TO sender_id;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'messages' AND column_name = 'receiver_id'
  ) THEN
    ALTER TABLE messages RENAME COLUMN receiver_id TO receiver_id;
  END IF;
END $$;

-- Enable RLS
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_skill_offer ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_skill_want ENABLE ROW LEVEL SECURITY;
ALTER TABLE swap_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE swap_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badge ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Skills (public read)
CREATE POLICY "Skills are viewable by everyone"
  ON skills FOR SELECT
  TO authenticated
  USING (true);

-- User skill offers
CREATE POLICY "Users can manage their own skill offers"
  ON user_skill_offer FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view others' skill offers"
  ON user_skill_offer FOR SELECT
  TO authenticated
  USING (true);

-- User skill wants
CREATE POLICY "Users can manage their own skill wants"
  ON user_skill_want FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view others' skill wants"
  ON user_skill_want FOR SELECT
  TO authenticated
  USING (true);

-- Swap requests
CREATE POLICY "Users can create swap requests"
  ON swap_requests FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = from_user_id);

CREATE POLICY "Users can view their swap requests"
  ON swap_requests FOR SELECT
  TO authenticated
  USING (auth.uid() = from_user_id OR auth.uid() = to_user_id);

CREATE POLICY "Users can update swap requests they're involved in"
  ON swap_requests FOR UPDATE
  TO authenticated
  USING (auth.uid() = from_user_id OR auth.uid() = to_user_id);

-- Swap sessions
CREATE POLICY "Users can manage sessions they're involved in"
  ON swap_sessions FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM swap_requests sr
      WHERE sr.id = swap_request_id
      AND (sr.from_user_id = auth.uid() OR sr.to_user_id = auth.uid())
    )
  );

-- Notifications
CREATE POLICY "Users can read their own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Badges (public read)
CREATE POLICY "Badges are viewable by everyone"
  ON badges FOR SELECT
  TO authenticated
  USING (true);

-- User badges
CREATE POLICY "Users can view their own badges"
  ON user_badge FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view others' badges"
  ON user_badge FOR SELECT
  TO authenticated
  USING (true);

-- Insert initial skills
INSERT INTO skills (name, description, category) VALUES
  ('JavaScript', 'Programming language for web development', 'Programming'),
  ('Python', 'Versatile programming language', 'Programming'),
  ('React', 'JavaScript library for building user interfaces', 'Programming'),
  ('Node.js', 'JavaScript runtime for server-side development', 'Programming'),
  ('UI/UX Design', 'User interface and experience design', 'Design'),
  ('Photography', 'Art and technique of taking photographs', 'Creative'),
  ('Guitar', 'String musical instrument', 'Music'),
  ('Piano', 'Keyboard musical instrument', 'Music'),
  ('Spanish', 'Spanish language learning', 'Language'),
  ('French', 'French language learning', 'Language'),
  ('Cooking', 'Culinary arts and food preparation', 'Lifestyle'),
  ('Yoga', 'Physical and mental wellness practice', 'Fitness'),
  ('Digital Marketing', 'Online marketing strategies', 'Business'),
  ('Writing', 'Creative and technical writing', 'Creative'),
  ('Data Science', 'Data analysis and machine learning', 'Programming')
ON CONFLICT (name) DO NOTHING;

-- Insert initial badges
INSERT INTO badges (name, description, icon, criteria) VALUES
  ('First Match', 'Got your first skill swap match', '🎯', '{"matches": 1}'),
  ('Social Butterfly', 'Matched with 10 different users', '🦋', '{"matches": 10}'),
  ('Teaching Master', 'Completed 5 teaching sessions', '👨‍🏫', '{"teaching_sessions": 5}'),
  ('Quick Learner', 'Completed 5 learning sessions', '⚡', '{"learning_sessions": 5}'),
  ('Streak Champion', 'Maintained a 7-day activity streak', '🔥', '{"streak_days": 7}'),
  ('Skill Collector', 'Added 10 skills to your profile', '🎓', '{"skills_count": 10}'),
  ('Super Swiper', 'Used 10 super swipes', '💫', '{"super_swipes": 10}'),
  ('Community Helper', 'Received 50 positive ratings', '🤝', '{"positive_ratings": 50}')
ON CONFLICT (name) DO NOTHING;