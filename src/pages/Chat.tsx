import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Image, Calendar, MoreVertical, Search } from 'lucide-react';
import { format } from 'date-fns';

interface Message {
  id: number;
  senderId: number;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

interface ChatUser {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  online: boolean;
}

const mockUsers: ChatUser[] = [
  {
    id: 1,
    name: 'Sarah Chen',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
    lastMessage: 'Great! When would you like to start our React sessions?',
    lastMessageTime: new Date(Date.now() - 5 * 60 * 1000),
    unreadCount: 2,
    online: true
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
    lastMessage: 'I can teach you guitar basics this weekend',
    lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
    unreadCount: 0,
    online: false
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
    lastMessage: '¡Hola! Ready for our Spanish lesson?',
    lastMessageTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    unreadCount: 1,
    online: true
  }
];

const mockMessages: { [key: number]: Message[] } = {
  1: [
    {
      id: 1,
      senderId: 1,
      content: 'Hi! I saw your profile and I\'d love to learn React from you!',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: true
    },
    {
      id: 2,
      senderId: 0, // Current user
      content: 'That sounds great! I\'m excited to help you learn React. What\'s your current experience level?',
      timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
      isRead: true
    },
    {
      id: 3,
      senderId: 1,
      content: 'I have some JavaScript experience but I\'m completely new to React. I\'d love to build my first component!',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      isRead: true
    },
    {
      id: 4,
      senderId: 0,
      content: 'Perfect! We can start with the basics - JSX, components, and props. I can also teach you about state management.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      isRead: true
    },
    {
      id: 5,
      senderId: 1,
      content: 'Great! When would you like to start our React sessions?',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      isRead: false
    }
  ]
};

export default function Chat() {
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(mockUsers[0]);
  const [messages, setMessages] = useState<Message[]>(mockMessages[1] || []);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleUserSelect = (user: ChatUser) => {
    setSelectedUser(user);
    setMessages(mockMessages[user.id] || []);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedUser) return;

    const message: Message = {
      id: Date.now(),
      senderId: 0, // Current user
      content: newMessage,
      timestamp: new Date(),
      isRead: true
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate typing response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const response: Message = {
        id: Date.now() + 1,
        senderId: selectedUser.id,
        content: 'Thanks for your message! I\'ll get back to you soon.',
        timestamp: new Date(),
        isRead: false
      };
      setMessages(prev => [...prev, response]);
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden h-[700px] flex">
          
          {/* Chat List */}
          <div className="w-1/3 border-r border-gray-200 flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Messages</h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto">
              {mockUsers.map((user) => (
                <motion.div
                  key={user.id}
                  whileHover={{ backgroundColor: '#f9fafb' }}
                  onClick={() => handleUserSelect(user)}
                  className={`p-4 cursor-pointer border-b border-gray-100 ${
                    selectedUser?.id === user.id ? 'bg-orange-50 border-orange-200' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {user.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gray-900 truncate">
                          {user.name}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {format(user.lastMessageTime, 'HH:mm')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{user.lastMessage}</p>
                    </div>
                    
                    {user.unreadCount > 0 && (
                      <div className="w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center">
                        {user.unreadCount}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          {selectedUser ? (
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={selectedUser.avatar}
                      alt={selectedUser.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {selectedUser.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">{selectedUser.name}</h2>
                    <p className="text-sm text-gray-500">
                      {selectedUser.online ? 'Online' : 'Last seen recently'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors"
                  >
                    <Calendar className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.senderId === 0 ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        message.senderId === 0
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.senderId === 0 ? 'text-orange-100' : 'text-gray-500'
                      }`}>
                        {format(message.timestamp, 'HH:mm')}
                      </p>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-gray-100 px-4 py-2 rounded-2xl">
                      <div className="flex space-x-1">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-6 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Image className="w-5 h-5" />
                  </motion.button>
                  
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type your message..."
                      className="w-full px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-colors"
                    />
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className={`p-3 rounded-full transition-colors ${
                      newMessage.trim()
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-600">Choose a chat to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}