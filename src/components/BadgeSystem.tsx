import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Flame, Target, Zap, BookOpen, Heart, Award } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: any;
  created_at: string;
}

interface UserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  awarded_at: string;
  badge: Badge;
}

export default function BadgeSystem() {
  const [userBadges, setUserBadges] = useState<UserBadge[]>([]);
  const [allBadges, setAllBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchUserBadges();
      fetchAllBadges();
    }
  }, [user]);

  const fetchUserBadges = async () => {
    try {
      const { data, error } = await supabase
        .from('user_badge')
        .select(`
          *,
          badge:badges(*)
        `)
        .eq('user_id', user?.id)
        .order('awarded_at', { ascending: false });

      if (error) throw error;
      setUserBadges(data || []);
    } catch (error) {
      console.error('Error fetching user badges:', error);
      toast.error('Failed to load badges');
    }
  };

  const fetchAllBadges = async () => {
    try {
      const { data, error } = await supabase
        .from('badges')
        .select('*')
        .order('name');

      if (error) throw error;
      setAllBadges(data || []);
    } catch (error) {
      console.error('Error fetching all badges:', error);
    } finally {
      setLoading(false);
    }
  };

  const getBadgeIcon = (icon: string) => {
    switch (icon) {
      case '🎯':
        return <Target className="w-6 h-6 text-orange-500" />;
      case '🦋':
        return <Heart className="w-6 h-6 text-purple-500" />;
      case '👨‍🏫':
        return <BookOpen className="w-6 h-6 text-blue-500" />;
      case '⚡':
        return <Zap className="w-6 h-6 text-yellow-500" />;
      case '🔥':
        return <Flame className="w-6 h-6 text-red-500" />;
      case '🎓':
        return <Award className="w-6 h-6 text-green-500" />;
      case '💫':
        return <Star className="w-6 h-6 text-pink-500" />;
      case '🤝':
        return <Heart className="w-6 h-6 text-indigo-500" />;
      default:
        return <Trophy className="w-6 h-6 text-gray-500" />;
    }
  };

  const isBadgeEarned = (badgeId: string) => {
    return userBadges.some(userBadge => userBadge.badge_id === badgeId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Achievements</h2>
        <p className="text-gray-600">
          You've earned {userBadges.length} out of {allBadges.length} badges
        </p>
        <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(userBadges.length / allBadges.length) * 100}%` }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allBadges.map((badge) => {
          const isEarned = isBadgeEarned(badge.id);
          const userBadge = userBadges.find(ub => ub.badge_id === badge.id);
          
          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                isEarned
                  ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-orange-100 shadow-lg'
                  : 'border-gray-200 bg-gray-50 opacity-60'
              }`}
            >
              {/* Badge Icon */}
              <div className="flex items-center justify-center mb-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  isEarned ? 'bg-orange-500' : 'bg-gray-300'
                }`}>
                  {getBadgeIcon(badge.icon)}
                </div>
              </div>

              {/* Badge Info */}
              <div className="text-center">
                <h3 className={`text-lg font-bold mb-2 ${
                  isEarned ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {badge.name}
                </h3>
                <p className={`text-sm mb-3 ${
                  isEarned ? 'text-gray-700' : 'text-gray-400'
                }`}>
                  {badge.description}
                </p>

                {/* Earned Date */}
                {isEarned && userBadge && (
                  <div className="text-xs text-orange-600 font-medium">
                    Earned {new Date(userBadge.awarded_at).toLocaleDateString()}
                  </div>
                )}

                {/* Lock Icon for Unearned */}
                {!isEarned && (
                  <div className="text-xs text-gray-400">
                    Not earned yet
                  </div>
                )}
              </div>

              {/* Achievement Glow Effect */}
              {isEarned && (
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400/20 to-orange-600/20"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Recent Achievements */}
      {userBadges.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Achievements</h3>
          <div className="space-y-3">
            {userBadges.slice(0, 5).map((userBadge) => (
              <motion.div
                key={userBadge.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
              >
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  {getBadgeIcon(userBadge.badge.icon)}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{userBadge.badge.name}</h4>
                  <p className="text-sm text-gray-600">{userBadge.badge.description}</p>
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(userBadge.awarded_at).toLocaleDateString()}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 