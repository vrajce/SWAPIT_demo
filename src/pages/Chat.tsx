import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Image, Calendar, MoreVertical, Search, User } from 'lucide-react';
import { format } from 'date-fns';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  image_url: string | null;
  sent_at: string;
  is_read: boolean;
}

interface ChatUser {
  id: string;
  fullname: string;
  profile_pic: string | null;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export default function Chat() {
  const [chatUsers, setChatUsers] = useState<ChatUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch chat users (matched users)
  useEffect(() => {
    if (user) {
      fetchChatUsers();
    }
  }, [user]);

  // Real-time subscription for messages
  useEffect(() => {
    if (!user) return;

    const subscription = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `sender_id=eq.${user.id} OR receiver_id=eq.${user.id}`
        },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages(prev => [...prev, newMessage]);
          
          // Update unread count for chat users
          if (newMessage.sender_id !== user.id) {
            setChatUsers(prev => prev.map(chatUser => 
              chatUser.id === newMessage.sender_id 
                ? { ...chatUser, unreadCount: chatUser.unreadCount + 1 }
                : chatUser
            ));
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  const fetchChatUsers = async () => {
    try {
      // Get matched users
      const { data: matches, error } = await supabase
        .from('swap_requests')
        .select(`
          id,
          from_user_id,
          to_user_id,
          users!swap_requests_from_user_id_fkey(
            id,
            fullname,
            profile_pic
          ),
          users!swap_requests_to_user_id_fkey(
            id,
            fullname,
            profile_pic
          )
        `)
        .eq('status', 'matched')
        .or(`from_user_id.eq.${user?.id},to_user_id.eq.${user?.id}`);

      if (error) throw error;

      // Transform matches to chat users
      const users: ChatUser[] = [];
      for (const match of matches || []) {
        const otherUser = match.from_user_id === user?.id 
          ? match['users!swap_requests_to_user_id_fkey']
          : match['users!swap_requests_from_user_id_fkey'];

        if (otherUser) {
          // Get last message
          const { data: lastMessage } = await supabase
            .from('messages')
            .select('*')
            .or(`and(sender_id.eq.${user?.id},receiver_id.eq.${otherUser.id}),and(sender_id.eq.${otherUser.id},receiver_id.eq.${user?.id})`)
            .order('sent_at', { ascending: false })
            .limit(1)
            .single();

          // Get unread count
          const { count: unreadCount } = await supabase
            .from('messages')
            .select('*', { count: 'exact', head: true })
            .eq('sender_id', otherUser.id)
            .eq('receiver_id', user?.id)
            .eq('is_read', false);

          users.push({
            id: otherUser.id,
            fullname: otherUser.fullname || 'Anonymous',
            profile_pic: otherUser.profile_pic,
            lastMessage: lastMessage?.content || 'Start a conversation!',
            lastMessageTime: lastMessage?.sent_at || new Date().toISOString(),
            unreadCount: unreadCount || 0
          });
        }
      }

      setChatUsers(users);
      if (users.length > 0 && !selectedUser) {
        setSelectedUser(users[0]);
      }
    } catch (error) {
      console.error('Error fetching chat users:', error);
      toast.error('Failed to load chat users');
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (otherUserId: string) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${user?.id},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${user?.id})`)
        .order('sent_at', { ascending: true });

      if (error) throw error;

      setMessages(data || []);

      // Mark messages as read
      await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('sender_id', otherUserId)
        .eq('receiver_id', user?.id)
        .eq('is_read', false);

      // Update unread count
      setChatUsers(prev => prev.map(chatUser => 
        chatUser.id === otherUserId 
          ? { ...chatUser, unreadCount: 0 }
          : chatUser
      ));
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
    }
  };

  const handleUserSelect = (chatUser: ChatUser) => {
    setSelectedUser(chatUser);
    fetchMessages(chatUser.id);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedUser || !user) return;

    setSending(true);
    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          sender_id: user.id,
          receiver_id: selectedUser.id,
          content: newMessage.trim(),
          is_read: false
        });

      if (error) throw error;

      setNewMessage('');
      
      // Update last message in chat users
      setChatUsers(prev => prev.map(chatUser => 
        chatUser.id === selectedUser.id 
          ? { 
              ...chatUser, 
              lastMessage: newMessage.trim(),
              lastMessageTime: new Date().toISOString()
            }
          : chatUser
      ));
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading chats...</p>
        </div>
      </div>
    );
  }

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
              {chatUsers.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <User className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No matches yet</p>
                  <p className="text-sm">Start swiping to find chat partners!</p>
                </div>
              ) : (
                chatUsers.map((chatUser) => (
                  <motion.div
                    key={chatUser.id}
                    whileHover={{ backgroundColor: '#f9fafb' }}
                    onClick={() => handleUserSelect(chatUser)}
                    className={`p-4 cursor-pointer border-b border-gray-100 ${
                      selectedUser?.id === chatUser.id ? 'bg-orange-50 border-orange-200' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={chatUser.profile_pic || `https://images.pexels.com/photos/${Math.floor(Math.random() * 1000000)}/pexels-photo-${Math.floor(Math.random() * 1000000)}.jpeg?auto=compress&cs=tinysrgb&w=100`}
                          alt={chatUser.fullname}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {chatUser.unreadCount > 0 && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center">
                            {chatUser.unreadCount}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-semibold text-gray-900 truncate">
                            {chatUser.fullname}
                          </h3>
                          <span className="text-xs text-gray-500">
                            {format(new Date(chatUser.lastMessageTime), 'HH:mm')}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{chatUser.lastMessage}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedUser ? (
              <>
                {/* Chat Header */}
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={selectedUser.profile_pic || `https://images.pexels.com/photos/${Math.floor(Math.random() * 1000000)}/pexels-photo-${Math.floor(Math.random() * 1000000)}.jpeg?auto=compress&cs=tinysrgb&w=100`}
                      alt={selectedUser.fullname}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">{selectedUser.fullname}</h2>
                      <p className="text-sm text-gray-500">Matched</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                    >
                      <Calendar className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
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
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender_id === user?.id
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender_id === user?.id ? 'text-orange-100' : 'text-gray-500'
                        }`}>
                          {format(new Date(message.sent_at), 'HH:mm')}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-6 border-t border-gray-200">
                  <div className="flex items-center space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                    >
                      <Image className="w-5 h-5" />
                    </motion.button>
                    <div className="flex-1">
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message..."
                        rows={1}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim() || sending}
                      className="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <User className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Select a conversation to start chatting</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}