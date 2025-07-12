import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Edit, Camera, Star, Award, TrendingUp, Calendar, 
  MessageCircle, Heart, Target, Book, Clock 
} from 'lucide-react';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const userStats = {
    totalSessions: 47,
    hoursTeaching: 85,
    hoursLearning: 62,
    rating: 4.8,
    streak: 12,
    badges: 8
  };

  const recentSessions = [
    {
      id: 1,
      partner: 'Sarah Chen',
      skill: 'React Development',
      type: 'taught',
      date: '2025-01-15',
      rating: 5
    },
    {
      id: 2,
      partner: 'Marcus Johnson',
      skill: 'Guitar Basics',
      type: 'learned',
      date: '2025-01-12',
      rating: 5
    },
    {
      id: 3,
      partner: 'Elena Rodriguez',
      skill: 'Spanish Conversation',
      type: 'learned',
      date: '2025-01-10',
      rating: 4
    }
  ];

  const achievements = [
    { name: 'First Match', icon: '🎯', unlocked: true },
    { name: 'Teaching Master', icon: '👨‍🏫', unlocked: true },
    { name: 'Quick Learner', icon: '⚡', unlocked: true },
    { name: 'Social Butterfly', icon: '🦋', unlocked: true },
    { name: 'Streak Champion', icon: '🔥', unlocked: false },
    { name: 'Skill Collector', icon: '🎓', unlocked: false }
  ];

  const skillsOffered = [
    { name: 'JavaScript', level: 'Expert', sessions: 23 },
    { name: 'React', level: 'Advanced', sessions: 18 },
    { name: 'Web Design', level: 'Intermediate', sessions: 6 }
  ];

  const skillsLearning = [
    { name: 'Guitar', progress: 75, sessions: 8 },
    { name: 'Spanish', progress: 60, sessions: 12 },
    { name: 'Photography', progress: 40, sessions: 4 }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'skills', label: 'Skills', icon: Target },
    { id: 'sessions', label: 'Sessions', icon: Calendar },
    { id: 'achievements', label: 'Achievements', icon: Award }
  ];

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            
            {/* Avatar */}
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200"
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute bottom-2 right-2 w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-orange-600 transition-colors"
              >
                <Camera className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Alex Thompson</h1>
                  <p className="text-gray-600 mb-4">Full-stack Developer | San Francisco, CA</p>
                  
                  {/* Rating */}
                  <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(userStats.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-gray-900">{userStats.rating}</span>
                    <span className="text-gray-500">({userStats.totalSessions} sessions)</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center space-x-2"
                >
                  <Edit className="w-5 h-5" />
                  <span>Edit Profile</span>
                </motion.button>
              </div>

              <p className="text-gray-600 max-w-2xl">
                Passionate developer with 5+ years experience. Love teaching React and JavaScript 
                while learning new creative skills like music and languages. Always excited to 
                connect with fellow learners!
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-8 pt-8 border-t border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{userStats.totalSessions}</div>
              <div className="text-gray-600 text-sm">Sessions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{userStats.hoursTeaching}h</div>
              <div className="text-gray-600 text-sm">Teaching</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{userStats.hoursLearning}h</div>
              <div className="text-gray-600 text-sm">Learning</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{userStats.rating}</div>
              <div className="text-gray-600 text-sm">Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{userStats.streak}</div>
              <div className="text-gray-600 text-sm">Day Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{userStats.badges}</div>
              <div className="text-gray-600 text-sm">Badges</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white rounded-lg border border-gray-200 p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-md transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Activity */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-orange-600" />
                  Recent Activity
                </h3>
                
                <div className="space-y-4">
                  {recentSessions.map((session) => (
                    <div key={session.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        session.type === 'taught' ? 'bg-green-100' : 'bg-blue-100'
                      }`}>
                        {session.type === 'taught' ? (
                          <Book className={`w-5 h-5 text-green-600`} />
                        ) : (
                          <Target className={`w-5 h-5 text-blue-600`} />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{session.skill}</h4>
                        <p className="text-sm text-gray-600">
                          {session.type === 'taught' ? 'Taught to' : 'Learned from'} {session.partner}
                        </p>
                        <p className="text-xs text-gray-500">{session.date}</p>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        {[...Array(session.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-orange-600" />
                  This Month
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Sessions Completed</span>
                    <span className="text-2xl font-bold text-gray-900">12</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Hours Taught</span>
                    <span className="text-2xl font-bold text-green-600">18</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Hours Learned</span>
                    <span className="text-2xl font-bold text-blue-600">14</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">New Connections</span>
                    <span className="text-2xl font-bold text-purple-600">8</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Skills I Teach */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Book className="w-5 h-5 mr-2 text-green-600" />
                  Skills I Teach
                </h3>
                
                <div className="space-y-4">
                  {skillsOffered.map((skill) => (
                    <div key={skill.name} className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{skill.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          skill.level === 'Expert' ? 'bg-red-100 text-red-700' :
                          skill.level === 'Advanced' ? 'bg-orange-100 text-orange-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{skill.sessions} sessions taught</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills I'm Learning */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-blue-600" />
                  Skills I'm Learning
                </h3>
                
                <div className="space-y-4">
                  {skillsLearning.map((skill) => (
                    <div key={skill.name} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{skill.name}</h4>
                        <span className="text-sm font-medium text-blue-600">{skill.progress}%</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.progress}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                        />
                      </div>
                      
                      <p className="text-sm text-gray-600">{skill.sessions} sessions completed</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sessions' && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-orange-600" />
                Session History
              </h3>
              
              <div className="space-y-4">
                {recentSessions.map((session) => (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          session.type === 'taught' ? 'bg-green-100' : 'bg-blue-100'
                        }`}>
                          {session.type === 'taught' ? (
                            <Book className="w-6 h-6 text-green-600" />
                          ) : (
                            <Target className="w-6 h-6 text-blue-600" />
                          )}
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900">{session.skill}</h4>
                          <p className="text-gray-600">
                            {session.type === 'taught' ? 'Taught to' : 'Learned from'} {session.partner}
                          </p>
                          <p className="text-sm text-gray-500">{session.date}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        {[...Array(session.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Award className="w-5 h-5 mr-2 text-orange-600" />
                Achievements & Badges
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {achievements.map((achievement) => (
                  <motion.div
                    key={achievement.name}
                    whileHover={{ scale: 1.05 }}
                    className={`p-6 border-2 rounded-lg text-center transition-all ${
                      achievement.unlocked
                        ? 'border-orange-300 bg-orange-50'
                        : 'border-gray-200 bg-gray-50 opacity-50'
                    }`}
                  >
                    <div className="text-4xl mb-3">{achievement.icon}</div>
                    <h4 className="font-medium text-gray-900 mb-2">{achievement.name}</h4>
                    <div className={`text-xs font-medium ${
                      achievement.unlocked ? 'text-orange-600' : 'text-gray-500'
                    }`}>
                      {achievement.unlocked ? 'Unlocked' : 'Locked'}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}