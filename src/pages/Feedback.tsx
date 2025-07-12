import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Star, Send, Award, Heart, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface FeedbackForm {
  rating: number;
  comment: string;
  skillEvaluation: number;
  communicationRating: number;
  wouldRecommend: boolean;
  badges?: string[];
}

export default function Feedback() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Feedback>();

  // Mock session data
  const sessionData = {
    partnerName: 'Sarah Chen',
    partnerAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    skill: 'React Development',
    date: '2025-01-15',
    duration: 60,
    type: 'learning' as const
  };

  const availableBadges = [
    { id: 'patient', name: 'Patient Teacher', icon: '🧘', description: 'Very patient and understanding' },
    { id: 'knowledgeable', name: 'Expert Knowledge', icon: '🧠', description: 'Deep understanding of the subject' },
    { id: 'clear', name: 'Clear Communicator', icon: '💬', description: 'Explains concepts clearly' },
    { id: 'prepared', name: 'Well Prepared', icon: '📚', description: 'Came prepared with materials' },
    { id: 'encouraging', name: 'Encouraging', icon: '💪', description: 'Motivating and supportive' },
    { id: 'creative', name: 'Creative Teacher', icon: '🎨', description: 'Uses creative teaching methods' }
  ];

  const handleBadgeToggle = (badgeId: string) => {
    setSelectedBadges(prev => 
      prev.includes(badgeId) 
        ? prev.filter(id => id !== badgeId)
        : [...prev, badgeId]
    );
  };

  const onSubmit = async (data: FeedbackForm) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const feedbackData = {
        ...data,
        rating: selectedRating,
        badges: selectedBadges,
        sessionId: 1, // Mock session ID
        partnerId: 1 // Mock partner ID
      };

      console.log('Feedback submitted:', feedbackData);
      
      setIsSubmitted(true);
      toast.success('Feedback submitted successfully!');
      reset();
    } catch (error) {
      toast.error('Failed to submit feedback. Please try again.');
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-16 bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Thank You!</h1>
          <p className="text-xl text-gray-600 mb-8">
            Your feedback helps make SwapIT better for everyone. 
            {sessionData.partnerName} will receive your review.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.history.back()}
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-200"
          >
            Back to Dashboard
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Rate Your <span className="bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">Experience</span>
          </h1>
          <p className="text-xl text-gray-600">
            Help us improve by sharing your feedback about this session
          </p>
        </motion.div>

        {/* Session Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8"
        >
          <div className="flex items-center space-x-4">
            <img
              src={sessionData.partnerAvatar}
              alt={sessionData.partnerName}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900">{sessionData.skill}</h3>
              <p className="text-gray-600">
                {sessionData.type === 'learning' ? 'Learned from' : 'Taught to'} {sessionData.partnerName}
              </p>
              <p className="text-sm text-gray-500">
                {sessionData.date} • {sessionData.duration} minutes
              </p>
            </div>
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${
              sessionData.type === 'learning' 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-green-100 text-green-700'
            }`}>
              {sessionData.type === 'learning' ? 'Learning Session' : 'Teaching Session'}
            </div>
          </div>
        </motion.div>

        {/* Feedback Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            
            {/* Overall Rating */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Overall Rating</h3>
              <p className="text-gray-600 mb-6">How would you rate this session?</p>
              
              <div className="flex justify-center space-x-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    type="button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setSelectedRating(star)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-12 h-12 transition-colors ${
                        star <= (hoveredRating || selectedRating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  </motion.button>
                ))}
              </div>
              
              <p className="text-lg font-medium text-gray-700">
                {selectedRating === 0 && 'Select a rating'}
                {selectedRating === 1 && 'Poor'}
                {selectedRating === 2 && 'Fair'}
                {selectedRating === 3 && 'Good'}
                {selectedRating === 4 && 'Very Good'}
                {selectedRating === 5 && 'Excellent'}
              </p>
            </div>

            {/* Detailed Ratings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-lg font-medium text-gray-900 mb-4">
                  Skill Knowledge
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-8 h-8 text-gray-300 cursor-pointer hover:text-yellow-400 transition-colors"
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-lg font-medium text-gray-900 mb-4">
                  Communication
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-8 h-8 text-gray-300 cursor-pointer hover:text-yellow-400 transition-colors"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Badges */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Award className="w-6 h-6 mr-2 text-orange-600" />
                Award Badges
              </h3>
              <p className="text-gray-600 mb-6">
                Select badges that best describe {sessionData.partnerName}'s performance
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {availableBadges.map((badge) => (
                  <motion.button
                    key={badge.id}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleBadgeToggle(badge.id)}
                    className={`p-4 border-2 rounded-lg text-left transition-all ${
                      selectedBadges.includes(badge.id)
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                    }`}
                  >
                    <div className="text-2xl mb-2">{badge.icon}</div>
                    <h4 className="font-medium text-gray-900 mb-1">{badge.name}</h4>
                    <p className="text-sm text-gray-600">{badge.description}</p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Written Feedback */}
            <div>
              <label htmlFor="comment" className="block text-lg font-medium text-gray-900 mb-4">
                Additional Comments
              </label>
              <textarea
                id="comment"
                {...register('comment')}
                rows={6}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none resize-none"
                placeholder="Share your thoughts about this session. What went well? What could be improved?"
              />
            </div>

            {/* Recommendation */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="recommend"
                {...register('wouldRecommend')}
                className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
              />
              <label htmlFor="recommend" className="text-lg text-gray-900">
                I would recommend {sessionData.partnerName} to other learners
              </label>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-6">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={selectedRating === 0}
                className={`px-8 py-4 font-semibold rounded-full transition-all duration-200 flex items-center space-x-2 mx-auto ${
                  selectedRating > 0
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Send className="w-5 h-5" />
                <span>Submit Feedback</span>
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}