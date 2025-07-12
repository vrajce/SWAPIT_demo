import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Flag, BarChart3, Settings, Shield, AlertTriangle, 
  CheckCircle, XCircle, Eye, Ban, MessageSquare, TrendingUp
} from 'lucide-react';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = {
    totalUsers: 12548,
    activeUsers: 3642,
    totalSessions: 8947,
    flaggedProfiles: 23,
    averageRating: 4.7,
    revenue: 42350
  };

  const recentUsers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      joinDate: '2025-01-15',
      status: 'active',
      sessions: 5
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      joinDate: '2025-01-14',
      status: 'pending',
      sessions: 0
    }
  ];

  const flaggedContent = [
    {
      id: 1,
      type: 'profile',
      user: 'BadUser123',
      reason: 'Inappropriate content',
      reportDate: '2025-01-15',
      status: 'pending'
    },
    {
      id: 2,
      type: 'message',
      user: 'SpamUser456',
      reason: 'Spam messages',
      reportDate: '2025-01-14',
      status: 'reviewed'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'moderation', label: 'Moderation', icon: Flag },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center">
              <Shield className="w-8 h-8 mr-3 text-orange-600" />
              Admin Dashboard
            </h1>
            <p className="text-xl text-gray-600">Manage SwapIT platform and users</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg">
              <span className="font-medium">System Status: Healthy</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[
            { label: 'Total Users', value: stats.totalUsers.toLocaleString(), icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
            { label: 'Active Users', value: stats.activeUsers.toLocaleString(), icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100' },
            { label: 'Total Sessions', value: stats.totalSessions.toLocaleString(), icon: MessageSquare, color: 'text-purple-600', bg: 'bg-purple-100' },
            { label: 'Flagged Profiles', value: stats.flaggedProfiles, icon: Flag, color: 'text-red-600', bg: 'bg-red-100' },
            { label: 'Average Rating', value: stats.averageRating.toString(), icon: CheckCircle, color: 'text-yellow-600', bg: 'bg-yellow-100' },
            { label: 'Monthly Revenue', value: `$${stats.revenue.toLocaleString()}`, icon: BarChart3, color: 'text-orange-600', bg: 'bg-orange-100' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
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
                <h3 className="text-xl font-bold text-gray-900 mb-6">Recent User Activity</h3>
                <div className="space-y-4">
                  {[
                    { action: 'New user registration', user: 'john@example.com', time: '2 minutes ago' },
                    { action: 'Session completed', user: 'sarah@example.com', time: '15 minutes ago' },
                    { action: 'Profile updated', user: 'marcus@example.com', time: '1 hour ago' },
                    { action: 'Feedback submitted', user: 'elena@example.com', time: '2 hours ago' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.user}</p>
                      </div>
                      <span className="text-sm text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'View Flagged Content', icon: Flag, color: 'bg-red-100 text-red-600' },
                    { label: 'User Analytics', icon: BarChart3, color: 'bg-blue-100 text-blue-600' },
                    { label: 'System Settings', icon: Settings, color: 'bg-gray-100 text-gray-600' },
                    { label: 'Export Data', icon: Eye, color: 'bg-green-100 text-green-600' }
                  ].map((action) => {
                    const Icon = action.icon;
                    return (
                      <motion.button
                        key={action.label}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-4 rounded-lg ${action.color} hover:opacity-80 transition-opacity`}
                      >
                        <Icon className="w-6 h-6 mx-auto mb-2" />
                        <p className="text-sm font-medium">{action.label}</p>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">User Management</h3>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Export
                  </motion.button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">User</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Join Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Sessions</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user) => (
                      <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-600">{user.email}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-900">{user.joinDate}</td>
                        <td className="py-4 px-4 text-gray-900">{user.sessions}</td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                            >
                              <Ban className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'moderation' && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <AlertTriangle className="w-6 h-6 mr-2 text-red-600" />
                  Content Moderation
                </h3>
                <div className="flex space-x-2">
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                    {flaggedContent.filter(item => item.status === 'pending').length} Pending
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {flaggedContent.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-6 hover:border-red-300 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          item.status === 'pending' ? 'bg-red-500' : 'bg-green-500'
                        }`}></div>
                        <h4 className="font-medium text-gray-900">{item.type === 'profile' ? 'Profile Report' : 'Message Report'}</h4>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">{item.user}</span>
                      </div>
                      <span className="text-sm text-gray-500">{item.reportDate}</span>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{item.reason}</p>
                    
                    <div className="flex space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Approve</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Remove</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </motion.button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Platform Settings */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Platform Settings</h3>
                <div className="space-y-6">
                  {[
                    { label: 'Allow new registrations', description: 'Enable new users to sign up', enabled: true },
                    { label: 'Require email verification', description: 'Users must verify email before accessing platform', enabled: true },
                    { label: 'Enable auto-moderation', description: 'Automatically flag suspicious content', enabled: false },
                    { label: 'Maintenance mode', description: 'Temporarily disable platform access', enabled: false }
                  ].map((setting, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{setting.label}</h4>
                        <p className="text-sm text-gray-600">{setting.description}</p>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          setting.enabled ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        <motion.div
                          className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md"
                          animate={{ x: setting.enabled ? 24 : 4 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      </motion.button>
                    </div>
                  ))}
                </div>
              </div>

              {/* API Settings */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">API & Integrations</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Stripe Payment Processing', status: 'Connected', color: 'text-green-600' },
                    { name: 'SendGrid Email Service', status: 'Connected', color: 'text-green-600' },
                    { name: 'Google Analytics', status: 'Disconnected', color: 'text-red-600' },
                    { name: 'Slack Notifications', status: 'Connected', color: 'text-green-600' }
                  ].map((integration, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{integration.name}</h4>
                        <p className={`text-sm ${integration.color}`}>{integration.status}</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Configure
                      </motion.button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}