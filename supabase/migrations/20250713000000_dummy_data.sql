-- Insert dummy user profiles for testing
-- These users will have complete profiles with skills, matches, and some interactions

-- Insert dummy users (these will be auth.users entries)
-- Note: In a real scenario, these would be created through the auth system
-- For demo purposes, we'll create them directly in the users table

-- User 1: Sarah Johnson - Web Developer
INSERT INTO users (id, fullname, email, location, description, profile_pic, public_profile, trust_percentage, created_at) VALUES
(
  '11111111-1111-1111-1111-111111111111',
  'Sarah Johnson',
  'sarah.johnson@example.com',
  'San Francisco, CA',
  'Full-stack web developer with 5+ years of experience. I love teaching React and JavaScript to beginners. Always excited to learn new technologies and share knowledge!',
  'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
  true,
  95,
  now() - interval '30 days'
);

-- User 2: Alex Chen - UI/UX Designer
INSERT INTO users (id, fullname, email, location, description, profile_pic, public_profile, trust_percentage, created_at) VALUES
(
  '22222222-2222-2222-2222-222222222222',
  'Alex Chen',
  'alex.chen@example.com',
  'New York, NY',
  'Creative UI/UX designer passionate about user-centered design. I can teach design principles, Figma, and creative thinking. Looking to learn more about frontend development!',
  'https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=400',
  true,
  92,
  now() - interval '25 days'
);

-- User 3: Maria Rodriguez - Data Scientist
INSERT INTO users (id, fullname, email, location, description, profile_pic, public_profile, trust_percentage, created_at) VALUES
(
  '33333333-3333-3333-3333-333333333333',
  'Maria Rodriguez',
  'maria.rodriguez@example.com',
  'Austin, TX',
  'Data scientist and Python enthusiast. I specialize in machine learning and data analysis. Happy to teach Python, pandas, and ML concepts. Want to improve my Spanish and learn guitar!',
  'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
  true,
  88,
  now() - interval '20 days'
);

-- Insert skill offerings for Sarah (Web Developer)
INSERT INTO user_skill_offer (user_id, skill_id, proficiency_level) VALUES
('11111111-1111-1111-1111-111111111111', (SELECT id FROM skills WHERE name = 'JavaScript'), 'expert'),
('11111111-1111-1111-1111-111111111111', (SELECT id FROM skills WHERE name = 'React'), 'expert'),
('11111111-1111-1111-1111-111111111111', (SELECT id FROM skills WHERE name = 'Node.js'), 'advanced'),
('11111111-1111-1111-1111-111111111111', (SELECT id FROM skills WHERE name = 'Python'), 'intermediate');

-- Insert skill wants for Sarah
INSERT INTO user_skill_want (user_id, skill_id, priority_level) VALUES
('11111111-1111-1111-1111-111111111111', (SELECT id FROM skills WHERE name = 'UI/UX Design'), 'high'),
('11111111-1111-1111-1111-111111111111', (SELECT id FROM skills WHERE name = 'Spanish'), 'medium'),
('11111111-1111-1111-1111-111111111111', (SELECT id FROM skills WHERE name = 'Photography'), 'low');

-- Insert skill offerings for Alex (UI/UX Designer)
INSERT INTO user_skill_offer (user_id, skill_id, proficiency_level) VALUES
('22222222-2222-2222-2222-222222222222', (SELECT id FROM skills WHERE name = 'UI/UX Design'), 'expert'),
('22222222-2222-2222-2222-222222222222', (SELECT id FROM skills WHERE name = 'Photography'), 'advanced'),
('22222222-2222-2222-2222-222222222222', (SELECT id FROM skills WHERE name = 'Writing'), 'intermediate');

-- Insert skill wants for Alex
INSERT INTO user_skill_want (user_id, skill_id, priority_level) VALUES
('22222222-2222-2222-2222-222222222222', (SELECT id FROM skills WHERE name = 'JavaScript'), 'high'),
('22222222-2222-2222-2222-222222222222', (SELECT id FROM skills WHERE name = 'React'), 'high'),
('22222222-2222-2222-2222-222222222222', (SELECT id FROM skills WHERE name = 'Digital Marketing'), 'medium');

-- Insert skill offerings for Maria (Data Scientist)
INSERT INTO user_skill_offer (user_id, skill_id, proficiency_level) VALUES
('33333333-3333-3333-3333-333333333333', (SELECT id FROM skills WHERE name = 'Python'), 'expert'),
('33333333-3333-3333-3333-333333333333', (SELECT id FROM skills WHERE name = 'Data Science'), 'expert'),
('33333333-3333-3333-3333-333333333333', (SELECT id FROM skills WHERE name = 'Spanish'), 'native');

-- Insert skill wants for Maria
INSERT INTO user_skill_want (user_id, skill_id, priority_level) VALUES
('33333333-3333-3333-3333-333333333333', (SELECT id FROM skills WHERE name = 'Guitar'), 'high'),
('33333333-3333-3333-3333-333333333333', (SELECT id FROM skills WHERE name = 'Cooking'), 'medium'),
('33333333-3333-3333-3333-333333333333', (SELECT id FROM skills WHERE name = 'Yoga'), 'low');

-- Create some matches between the dummy users
-- Sarah matches with Alex
INSERT INTO swap_requests (from_user_id, to_user_id, status, swipe_type) VALUES
('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'matched', 'normal'),
('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'matched', 'normal');

-- Sarah matches with Maria
INSERT INTO swap_requests (from_user_id, to_user_id, status, swipe_type) VALUES
('11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', 'matched', 'super'),
('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'matched', 'normal');

-- Alex matches with Maria
INSERT INTO swap_requests (from_user_id, to_user_id, status, swipe_type) VALUES
('22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', 'matched', 'normal'),
('33333333-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222222', 'matched', 'normal');

-- Create some pending requests (one-way swipes)
INSERT INTO swap_requests (from_user_id, to_user_id, status, swipe_type) VALUES
('11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444444', 'pending', 'normal'), -- Sarah swiped on a non-existent user
('22222222-2222-2222-2222-222222222222', '55555555-5555-5555-5555-555555555555', 'pending', 'super'); -- Alex super swiped on a non-existent user

-- Create some sessions
INSERT INTO swap_sessions (swap_request_id, scheduled_time, duration, status, meet_link) VALUES
(
  (SELECT id FROM swap_requests WHERE from_user_id = '11111111-1111-1111-1111-111111111111' AND to_user_id = '22222222-2222-2222-2222-222222222222' LIMIT 1),
  now() + interval '2 days',
  60,
  'scheduled',
  'https://meet.jit.si/swapit-sarah-alex-123'
),
(
  (SELECT id FROM swap_requests WHERE from_user_id = '11111111-1111-1111-1111-111111111111' AND to_user_id = '33333333-3333-3333-3333-333333333333' LIMIT 1),
  now() - interval '1 day',
  90,
  'completed',
  'https://meet.jit.si/swapit-sarah-maria-456'
);

-- Create some messages between matched users
INSERT INTO messages (sender_id, receiver_id, content, sent_at, is_read) VALUES
('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'Hey Alex! I saw you''re interested in learning React. I''d love to help you get started!', now() - interval '2 hours', true),
('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'That would be amazing Sarah! I''ve been wanting to learn React for a while now. When would be a good time?', now() - interval '1 hour', true),
('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'How about tomorrow at 3 PM? I can show you the basics and we can build a simple component together!', now() - interval '30 minutes', false),
('11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', 'Hi Maria! I noticed you''re learning guitar. I''d love to help you with that in exchange for some Python tips!', now() - interval '1 day', true),
('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'That sounds perfect! I''m a complete beginner with guitar but I can definitely help you with Python. Let''s schedule a session!', now() - interval '12 hours', false);

-- Create some notifications
INSERT INTO notifications (user_id, type, title, message, is_read) VALUES
('11111111-1111-1111-1111-111111111111', 'match', 'New Match!', 'You matched with Alex Chen!', false),
('22222222-2222-2222-2222-222222222222', 'match', 'New Match!', 'You matched with Sarah Johnson!', false),
('11111111-1111-1111-1111-111111111111', 'message', 'New Message', 'Alex Chen sent you a message', false),
('33333333-3333-3333-3333-333333333333', 'session', 'Session Reminder', 'Your session with Sarah Johnson starts in 1 hour', false);

-- Award some badges to make the profiles more interesting
INSERT INTO user_badge (user_id, badge_id) VALUES
('11111111-1111-1111-1111-111111111111', (SELECT id FROM badges WHERE name = 'First Match')),
('11111111-1111-1111-1111-111111111111', (SELECT id FROM badges WHERE name = 'Teaching Master')),
('22222222-2222-2222-2222-222222222222', (SELECT id FROM badges WHERE name = 'First Match')),
('33333333-3333-3333-3333-333333333333', (SELECT id FROM badges WHERE name = 'First Match')),
('33333333-3333-3333-3333-333333333333', (SELECT id FROM badges WHERE name = 'Skill Collector')); 