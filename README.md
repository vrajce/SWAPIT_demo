# SwapIT - Skill Exchange Platform

SwapIT is a modern skill exchange platform that connects people who want to teach and learn from each other. Built with React, TypeScript, and Supabase, it features a Tinder-like swipe interface for skill matching, real-time chat, session scheduling, and achievement badges.

## 🚀 Quick Start

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn
- Supabase account (free tier available)

### Setup Steps

1. **Clone and install dependencies**
   ```bash
   cd SWAPIT_demo
   npm install
   ```

2. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

3. **Set up the database**
   - Run the initial migration: `supabase/migrations/20250712080256_broken_lodge.sql`
   - Run the dummy data migration: `supabase/migrations/20250713000000_dummy_data.sql`

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:5173](http://localhost:5173)

### Dummy Data

The app comes with 3 pre-configured dummy user profiles for testing:

- **Sarah Johnson** - Web Developer (San Francisco)
- **Alex Chen** - UI/UX Designer (New York)  
- **Maria Rodriguez** - Data Scientist (Austin)

These users have complete profiles with skills, matches, chat messages, and sessions. See `DUMMY_DATA_SETUP.md` for detailed setup instructions.

## 🚀 Features Implemented

### 1. User Registration and Login Flow
- **Complete signup form** with all required fields:
  - Full name, email, password (required)
  - Location, description, profile picture, public profile (optional)
- **Profile picture upload** to Supabase storage
- **Email/password authentication** with Supabase Auth
- **Automatic user profile creation** in the database
- **Redirect to onboarding** after successful registration

### 2. Skill Offering Input Flow
- **Multi-step onboarding process** with skill selection
- **5 form questions** for skill offering and wanting
- **Skill validation** against existing skills in the database
- **Proficiency level selection** (beginner, intermediate, advanced, expert)
- **Automatic insertion** into `user_skill_offer` table

### 3. Skill Wanting Input Flow
- **Separate skill selection** for learning goals
- **Priority level assignment** (high, medium, low)
- **Database integration** with `user_skill_want` table
- **Seamless flow** from offering to wanting skills

### 4. Swipe-Based Matching Feature
- **Tinder-like interface** with smooth animations
- **Four swipe directions**:
  - **Left swipe (←)**: Discard/not interested
  - **Right swipe (→)**: Express interest (normal swipe)
  - **Up swipe (↑)**: Super swipe (premium feature)
  - **Down swipe (↓)**: Save for later
- **Real-time match detection** when both users swipe right
- **Match notifications** with confetti animation
- **Swipe type tracking** in `swap_requests` table

### 5. Dashboard: View Matches and Requests
- **Comprehensive dashboard** showing:
  - Total matches count
  - Pending requests count
  - Active chats count
  - Sessions count
- **Pending requests management** with accept/reject actions
- **Current matches display** with user details and skills
- **Real-time updates** when requests are accepted/rejected

### 6. Scheduling & Video Call Sessions
- **Session scheduling system** with calendar and time picker
- **Duration selection** (30 min, 1 hour, 1.5 hours, 2 hours)
- **Automatic meet link generation** (Jitsi integration)
- **Session status management** (scheduled, completed, cancelled)
- **Notification system** for scheduled sessions

### 7. Chat System for Matches
- **Real-time chat** using Supabase real-time subscriptions
- **Message persistence** in `messages` table
- **Unread message tracking** with badges
- **Chat user list** showing matched users
- **Message timestamps** and read status
- **Auto-scroll** to latest messages

### 8. Notifications System
- **Real-time notifications** for:
  - New matches
  - Session scheduling
  - Message received
  - Badge awards
- **Notification dropdown** in header with unread count
- **Mark as read** functionality
- **Notification types** with different icons

### 9. Badges & Achievements
- **8 predefined badges** with criteria:
  - First Match
  - Social Butterfly (10 matches)
  - Teaching Master (5 teaching sessions)
  - Quick Learner (5 learning sessions)
  - Streak Champion (7-day activity)
  - Skill Collector (10 skills)
  - Super Swiper (10 super swipes)
  - Community Helper (50 positive ratings)
- **Visual badge display** with earned/unearned states
- **Achievement progress tracking**
- **Badge system integration** in profile page

### 10. Differentiate Swipe Types
- **Swipe type classification**:
  - Normal swipe (→): Standard interest
  - Super swipe (↑): High-priority match attempt
  - Left swipe (←): Discard
  - Down swipe (↓): Save for later
- **Color-coded visual feedback** for different swipe types
- **Swipe type tracking** in database for analytics

### 11. Pop-ups and Visual Feedback
- **Toast notifications** for all user actions