import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, TrendingUp, Award, Crown, Medal, Target } from 'lucide-react';

interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  points: number;
  sessionsCompleted: number;
  hoursContributed: number;
  rating: number;
  badges: number;
  streak: number;
}

const mockLeaderboard: LeaderboardUser[] = [
  {
    rank: 1,
    name: 'Sarah Chen',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
    points: 2847,
    sessionsCompleted: 89,
    hoursContributed: 156,
    rating: 4.9,
    badges: 15,
    streak: 28
  },
  {
    rank: 2,
    name: 'Marcus Johnson',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
    points: 2634,
    sessionsCompleted: 76,
    hoursContributed: 142,
    rating: 4.8,
    badges: 12,
    streak: 21
  },
  {
    rank: 3,
    name: 'Elena Rodriguez',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
    points: 2489,
    sessionsCompleted: 68,
    hoursContributed: 128,
    rating: 4.7,
    badges: 11,
    streak: 19
  },
  {
    rank: 4,
    name: 'David Kim',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    points: 2156,
    sessionsCompleted: 54,
    hoursContributed: 98,
    rating: 4.6,
    badges: 9,
    streak: 15
  },
  {
    rank: 5,
    name: 'Alex Thompson',
    avatar: 'https://images.pexels.com/photos/1466844/pexels-photo-1466844.jpeg?auto=compress&cs=tinysrgb&w=100',
    points: 1943,
    sessionsCompleted: 47,
    hoursContributed: 85,
    rating: 4.8,
    badges: 8,
    streak: 12
  }
];

export default function Leaderboard() {
  const [timeFrame, setTimeFrame] = useState<'weekly' | 'monthly' | 'allTime'>('monthly');
  const [category, setCategory] = useState<'points' | 'sessions' | 'hours'>('points');

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-400 to-yellow-600';
      case 2:
        return 'from-gray-300 to-gray-500';
      case 3:
        return 'from-amber-400 to-amber-600';
      default:
        return 'from-orange-400 to-orange-600';
    }
  };

  const topThree = mockLeaderboard.slice(0, 3);
  const restOfList = mockLeaderboard.slice(3);

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
                Leaderboard
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Celebrate our most active skill sharers and learning champions
            </p>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-12">
          {/* Time Frame */}
          <div className="flex bg-white rounded-lg border border-gray-200 p-1">
            {[
              { key: 'weekly', label: 'This Week' },
              { key: 'monthly', label: 'This Month' },
              { key: 'allTime', label: 'All Time' }
            ].map((option) => (
              <button
                key={option.key}
                onClick={() => setTimeFrame(option.key as any)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  timeFrame === option.key
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Category */}
          <div className="flex bg-white rounded-lg border border-gray-200 p-1">
            {[
              { key: 'points', label: 'Points' },
              { key: 'sessions', label: 'Sessions' },
              { key: 'hours', label: 'Hours' }
            ].map((option) => (
              <button
                key={option.key}
                onClick={() => setCategory(option.key as any)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  category === option.key
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="mb-12">
          <div className="flex items-end justify-center space-x-8">
            {/* 2nd Place */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <div className="relative mb-4">
                <img
                  src={topThree[1]?.avatar}
                  alt={topThree[1]?.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-gray-300 mx-auto"
                />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-gray-300 to-gray-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-lg border-2 border-gray-300 h-32 flex flex-col justify-center">
                <h3 className="font-bold text-gray-900 mb-1">{topThree[1]?.name}</h3>
                <p className="text-2xl font-bold text-gray-600 mb-1">{topThree[1]?.points}</p>
                <p className="text-sm text-gray-500">points</p>
              </div>
            </motion.div>

            {/* 1st Place */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-center relative z-10"
            >
              <div className="relative mb-4">
                <img
                  src={topThree[0]?.avatar}
                  alt={topThree[0]?.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-yellow-400 mx-auto"
                />
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                  <Crown className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-xl border-2 border-yellow-400 h-40 flex flex-col justify-center relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Champion
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{topThree[0]?.name}</h3>
                <p className="text-3xl font-bold text-yellow-600 mb-1">{topThree[0]?.points}</p>
                <p className="text-sm text-gray-500">points</p>
              </div>
            </motion.div>

            {/* 3rd Place */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center"
            >
              <div className="relative mb-4">
                <img
                  src={topThree[2]?.avatar}
                  alt={topThree[2]?.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-amber-400 mx-auto"
                />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-lg border-2 border-amber-400 h-32 flex flex-col justify-center">
                <h3 className="font-bold text-gray-900 mb-1">{topThree[2]?.name}</h3>
                <p className="text-2xl font-bold text-amber-600 mb-1">{topThree[2]?.points}</p>
                <p className="text-sm text-gray-500">points</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Full Leaderboard */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Trophy className="w-6 h-6 mr-2 text-orange-600" />
              Top Contributors
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {mockLeaderboard.map((user, index) => (
              <motion.div
                key={user.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-6 hover:bg-gray-50 transition-colors ${
                  user.rank <= 3 ? 'bg-gradient-to-r from-orange-50 to-transparent' : ''
                }`}
              >
                <div className="flex items-center space-x-6">
                  {/* Rank */}
                  <div className="flex items-center justify-center w-12 h-12">
                    {getRankIcon(user.rank)}
                  </div>

                  {/* Avatar and Name */}
                  <div className="flex items-center space-x-4 flex-1">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className={`w-12 h-12 rounded-full object-cover border-2 ${
                        user.rank <= 3 ? 'border-orange-300' : 'border-gray-200'
                      }`}
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{user.name}</h3>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{user.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="hidden md:flex items-center space-x-8 text-center">
                    <div>
                      <div className="text-lg font-bold text-orange-600">{user.points}</div>
                      <div className="text-xs text-gray-500">Points</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-blue-600">{user.sessionsCompleted}</div>
                      <div className="text-xs text-gray-500">Sessions</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-600">{user.hoursContributed}h</div>
                      <div className="text-xs text-gray-500">Hours</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-purple-600">{user.badges}</div>
                      <div className="text-xs text-gray-500">Badges</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-red-600">{user.streak}</div>
                      <div className="text-xs text-gray-500">Streak</div>
                    </div>
                  </div>

                  {/* Mobile Stats */}
                  <div className="md:hidden text-right">
                    <div className="text-xl font-bold text-orange-600">{user.points}</div>
                    <div className="text-sm text-gray-500">points</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Your Rank Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 bg-gradient-to-r from-orange-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <TrendingUp className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Your Current Rank</h3>
                <p className="text-white/80">Keep learning and teaching to climb higher!</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold">#5</div>
              <div className="text-white/80">1,943 points</div>
            </div>
          </div>
        </motion.div>

        {/* Achievements Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Top Teacher', icon: Target, color: 'from-green-500 to-green-600', value: 'Sarah Chen' },
            { title: 'Learning Streak', icon: Trophy, color: 'from-red-500 to-red-600', value: '28 days' },
            { title: 'Most Popular Skill', icon: Star, color: 'from-blue-500 to-blue-600', value: 'JavaScript' }
          ].map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                className={`bg-gradient-to-r ${achievement.color} rounded-xl p-6 text-white`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Icon className="w-6 h-6" />
                  <h3 className="font-semibold">{achievement.title}</h3>
                </div>
                <p className="text-2xl font-bold">{achievement.value}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}