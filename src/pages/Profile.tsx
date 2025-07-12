import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Edit, Camera, Star, Award, TrendingUp, Calendar, 
  MessageCircle, Heart, Target, Book, Clock 
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import BadgeSystem from '../components/BadgeSystem';
import toast from 'react-hot-toast';

interface UserProfile {
  id: string;
  fullname: string;
  email: string;
  location: string | null;
  description: string | null;
  public_profile: boolean;
  trust_percentage: number;
  created_at: string;
}

interface UserSkill {
  id: string;
  skill_id: string;
  skill: {
    name: string;
    description: string | null;
  };
  proficiency_level?: string;
  priority_level?: string;
}

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [skillsOffered, setSkillsOffered] = useState<UserSkill[]>([]);
  const [skillsLearning, setSkillsLearning] = useState<UserSkill[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchUserProfile();
      fetchUserSkills();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      setUserProfile(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      toast.error('Failed to load profile');
    }
  };

  const fetchUserSkills = async () => {
    try {
      // Fetch skills user can teach
      const { data: offeredSkills, error: offeredError } = await supabase
        .from('user_skill_offer')
        .select(`
          id,
          skill_id,
          proficiency_level,
          skill:skills(
            name,
            description
          )
        `)
        .eq('user_id', user?.id);

      if (offeredError) throw offeredError;

      // Fetch skills user wants to learn
      const { data: learningSkills, error: learningError } = await supabase
        .from('user_skill_want')
        .select(`
          id,
          skill_id,
          priority_level,
          skill:skills(
            name,
            description
          )
        `)
        .eq('user_id', user?.id);

      if (learningError) throw learningError;

      setSkillsOffered(offeredSkills || []);
      setSkillsLearning(learningSkills || []);
    } catch (error) {
      console.error('Error fetching user skills:', error);
      toast.error('Failed to load skills');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'skills', label: 'Skills', icon: Target },
    { id: 'sessions', label: 'Sessions', icon: Calendar },
    { id: 'achievements', label: 'Achievements', icon: Award }
  ];

  if (loading) {
    return (
      <div className="min-h-screen pt-16 bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen pt-16 bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Profile not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            
            {/* Avatar */}
            <div className="relative">
              <img
                src={userProfile.profile_pic || `https://images.pexels.com/photos/${Math.floor(Math.random() * 1000000)}/pexels-photo-${Math.floor(Math.random() * 1000000)}.jpeg?auto=compress&cs=tinysrgb&w=200`}
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
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{userProfile.fullname}</h1>
                  <p className="text-gray-600 mb-4">
                    {userProfile.location && `${userProfile.location} • `}
                    Member since {new Date(userProfile.created_at).toLocaleDateString()}
                  </p>
                  
                  {/* Trust Score */}
                  <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="font-semibold text-gray-900">{userProfile.trust_percentage}%</span>
                    </div>
                    <span className="text-gray-500">Trust Score</span>
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
                {userProfile.description || 'No description available. Add a bio to tell others about yourself!'}
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{skillsOffered.length}</div>
              <div className="text-gray-600 text-sm">Skills Teaching</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{skillsLearning.length}</div>
              <div className="text-gray-600 text-sm">Skills Learning</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{userProfile.trust_percentage}%</div>
              <div className="text-gray-600 text-sm">Trust Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {new Date(userProfile.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </div>
              <div className="text-gray-600 text-sm">Member Since</div>
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
              {/* Skills Summary */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-orange-600" />
                  Skills Summary
                </h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">Teaching ({skillsOffered.length})</h4>
                    <div className="flex flex-wrap gap-2">
                      {skillsOffered.map((skill) => (
                        <span
                          key={skill.id}
                          className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full"
                        >
                          {skill.skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">Learning ({skillsLearning.length})</h4>
                    <div className="flex flex-wrap gap-2">
                      {skillsLearning.map((skill) => (
                        <span
                          key={skill.id}
                          className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                        >
                          {skill.skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Status */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <User className="w-5 h-5 mr-2 text-orange-600" />
                  Profile Status
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Profile Visibility</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      userProfile.public_profile 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {userProfile.public_profile ? 'Public' : 'Private'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Trust Score</span>
                    <span className="text-lg font-bold text-orange-600">{userProfile.trust_percentage}%</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Member Since</span>
                    <span className="text-gray-900">{new Date(userProfile.created_at).toLocaleDateString()}</span>
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
                
                {skillsOffered.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Book className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No teaching skills added yet</p>
                    <p className="text-sm">Add skills you can teach in your profile</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {skillsOffered.map((skill) => (
                      <div key={skill.id} className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{skill.skill.name}</h4>
                          {skill.proficiency_level && (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              skill.proficiency_level === 'expert' ? 'bg-red-100 text-red-700' :
                              skill.proficiency_level === 'advanced' ? 'bg-orange-100 text-orange-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>
                              {skill.proficiency_level.charAt(0).toUpperCase() + skill.proficiency_level.slice(1)}
                            </span>
                          )}
                        </div>
                        {skill.skill.description && (
                          <p className="text-sm text-gray-600">{skill.skill.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Skills I'm Learning */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-blue-600" />
                  Skills I'm Learning
                </h3>
                
                {skillsLearning.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Target className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No learning skills added yet</p>
                    <p className="text-sm">Add skills you want to learn in your profile</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {skillsLearning.map((skill) => (
                      <div key={skill.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{skill.skill.name}</h4>
                          {skill.priority_level && (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              skill.priority_level === 'high' ? 'bg-red-100 text-red-700' :
                              skill.priority_level === 'medium' ? 'bg-orange-100 text-orange-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>
                              {skill.priority_level.charAt(0).toUpperCase() + skill.priority_level.slice(1)} Priority
                            </span>
                          )}
                        </div>
                        {skill.skill.description && (
                          <p className="text-sm text-gray-600">{skill.skill.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'sessions' && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-orange-600" />
                Session History
              </h3>
              
              <div className="text-center py-8 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No sessions completed yet</p>
                <p className="text-sm">Start scheduling sessions with your matches!</p>
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <BadgeSystem />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}