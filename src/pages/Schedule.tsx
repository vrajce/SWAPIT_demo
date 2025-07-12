import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Video, User, Plus, Check, X } from 'lucide-react';
import { format, addDays, startOfWeek, isSameDay, isBefore } from 'date-fns';
import toast from 'react-hot-toast';

interface Session {
  id: number;
  partnerName: string;
  partnerAvatar: string;
  skill: string;
  date: Date;
  time: string;
  duration: number;
  type: 'teaching' | 'learning';
  status: 'scheduled' | 'completed' | 'cancelled';
  meetingLink?: string;
}

const mockSessions: Session[] = [
  {
    id: 1,
    partnerName: 'Sarah Chen',
    partnerAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
    skill: 'React Development',
    date: addDays(new Date(), 2),
    time: '14:00',
    duration: 60,
    type: 'teaching',
    status: 'scheduled',
    meetingLink: 'https://meet.google.com/abc-def-ghi'
  },
  {
    id: 2,
    partnerName: 'Marcus Johnson',
    partnerAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
    skill: 'Guitar Basics',
    date: addDays(new Date(), 5),
    time: '16:30',
    duration: 90,
    type: 'learning',
    status: 'scheduled',
    meetingLink: 'https://zoom.us/j/123456789'
  },
  {
    id: 3,
    partnerName: 'Elena Rodriguez',
    partnerAvatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
    skill: 'Spanish Conversation',
    date: addDays(new Date(), -3),
    time: '10:00',
    duration: 45,
    type: 'learning',
    status: 'completed'
  }
];

export default function Schedule() {
  const [sessions, setSessions] = useState(mockSessions);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showNewSessionModal, setShowNewSessionModal] = useState(false);
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

  const weekStart = startOfWeek(selectedDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getSessionsForDate = (date: Date) => {
    return sessions.filter(session => isSameDay(session.date, date));
  };

  const handleCancelSession = (sessionId: number) => {
    setSessions(prev => prev.map(session => 
      session.id === sessionId 
        ? { ...session, status: 'cancelled' as const }
        : session
    ));
    toast.success('Session cancelled');
  };

  const handleJoinSession = (session: Session) => {
    if (session.meetingLink) {
      window.open(session.meetingLink, '_blank');
    } else {
      toast.error('Meeting link not available');
    }
  };

  const upcomingSessions = sessions
    .filter(session => 
      session.status === 'scheduled' && 
      !isBefore(session.date, new Date())
    )
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const completedSessions = sessions
    .filter(session => session.status === 'completed')
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Schedule</h1>
            <p className="text-xl text-gray-600">Manage your skill swap sessions</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex bg-white rounded-lg border border-gray-200 p-1">
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  viewMode === 'calendar'
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Calendar
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  viewMode === 'list'
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                List
              </button>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNewSessionModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Schedule Session</span>
            </motion.button>
          </div>
        </div>

        {viewMode === 'calendar' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {format(selectedDate, 'MMMM yyyy')}
                  </h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedDate(addDays(selectedDate, -7))}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => setSelectedDate(addDays(selectedDate, 7))}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      →
                    </button>
                  </div>
                </div>

                {/* Week View */}
                <div className="grid grid-cols-7 gap-4">
                  {weekDays.map((day) => {
                    const daySessions = getSessionsForDate(day);
                    const isToday = isSameDay(day, new Date());
                    
                    return (
                      <motion.div
                        key={day.toISOString()}
                        whileHover={{ scale: 1.02 }}
                        className={`min-h-32 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                          isToday
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                        }`}
                        onClick={() => setSelectedDate(day)}
                      >
                        <div className="text-center mb-2">
                          <div className="text-sm font-medium text-gray-600">
                            {format(day, 'EEE')}
                          </div>
                          <div className={`text-lg font-bold ${
                            isToday ? 'text-orange-600' : 'text-gray-900'
                          }`}>
                            {format(day, 'd')}
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          {daySession.slice(0, 2).map((session) => (
                            <div
                              key={session.id}
                              className={`text-xs p-1 rounded ${
                                session.type === 'teaching'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-blue-100 text-blue-700'
                              }`}
                            >
                              {session.time} - {session.skill}
                            </div>
                          ))}
                          {daySession.length > 2 && (
                            <div className="text-xs text-gray-500">
                              +{daySession.length - 2} more
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Upcoming Sessions */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-orange-600" />
                  Upcoming Sessions
                </h3>
                
                <div className="space-y-4">
                  {upcomingSessions.slice(0, 3).map((session) => (
                    <motion.div
                      key={session.id}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-all"
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <img
                          src={session.partnerAvatar}
                          alt={session.partnerName}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{session.partnerName}</div>
                          <div className="text-sm text-gray-600">{session.skill}</div>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          session.type === 'teaching'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {session.type === 'teaching' ? 'Teaching' : 'Learning'}
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-3">
                        {format(session.date, 'MMM d, yyyy')} at {session.time}
                      </div>
                      
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleJoinSession(session)}
                          className="flex-1 px-3 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all flex items-center justify-center space-x-1"
                        >
                          <Video className="w-4 h-4" />
                          <span>Join</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleCancelSession(session.id)}
                          className="px-3 py-2 bg-gray-100 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-200 transition-all"
                        >
                          <X className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {upcomingSessions.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No upcoming sessions</p>
                  </div>
                )}
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">This Month</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Sessions Completed</span>
                    <span className="font-bold text-green-600">{completedSessions.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Hours Taught</span>
                    <span className="font-bold text-blue-600">12.5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Hours Learned</span>
                    <span className="font-bold text-orange-600">8.0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* List View */
          <div className="space-y-8">
            {/* Upcoming */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Sessions</h2>
              
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={session.partnerAvatar}
                          alt={session.partnerName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">{session.skill}</h3>
                          <p className="text-gray-600">with {session.partnerName}</p>
                          <p className="text-sm text-gray-500">
                            {format(session.date, 'MMM d, yyyy')} at {session.time} • {session.duration} min
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                          session.type === 'teaching'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {session.type === 'teaching' ? 'Teaching' : 'Learning'}
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleJoinSession(session)}
                          className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all flex items-center space-x-2"
                        >
                          <Video className="w-4 h-4" />
                          <span>Join</span>
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleCancelSession(session.id)}
                          className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-all"
                        >
                          <X className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Completed */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Completed Sessions</h2>
              
              <div className="space-y-4">
                {completedSessions.map((session) => (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 border border-gray-200 rounded-lg bg-gray-50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={session.partnerAvatar}
                          alt={session.partnerName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">{session.skill}</h3>
                          <p className="text-gray-600">with {session.partnerName}</p>
                          <p className="text-sm text-gray-500">
                            {format(session.date, 'MMM d, yyyy')} • {session.duration} min
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1 text-green-600">
                          <Check className="w-4 h-4" />
                          <span className="text-sm font-medium">Completed</span>
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-blue-100 text-blue-600 font-medium rounded-lg hover:bg-blue-200 transition-all"
                        >
                          Leave Feedback
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}