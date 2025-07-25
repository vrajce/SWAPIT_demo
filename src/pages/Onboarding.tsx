import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Check, Plus, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    canTeach: [] as string[],
    wantToLearn: [] as string[],
    experience: '',
    availability: '',
    timezone: '',
    learningStyle: '',
    goals: '',
    location: '',
    bio: '',
    profilePic: null as File | null
  });

  const navigate = useNavigate();
  const { user } = useAuth();

  // Fetch skills from database
  React.useEffect(() => {
    const fetchSkills = async () => {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('name');
      
      if (error) {
        console.error('Error fetching skills:', error);
        toast.error('Failed to load skills');
      } else {
        setSkills(data || []);
      }
    };

    fetchSkills();
  }, []);

  const steps = [
    {
      title: 'What can you teach?',
      subtitle: 'Select skills you\'d love to share with others',
      field: 'canTeach',
      type: 'multi-select',
      options: skills.map(skill => ({ id: skill.id, name: skill.name }))
    },
    {
      title: 'What do you want to learn?',
      subtitle: 'Choose skills you\'re excited to develop',
      field: 'wantToLearn',
      type: 'multi-select',
      options: skills.map(skill => ({ id: skill.id, name: skill.name }))
    },
    {
      title: 'Your experience level',
      subtitle: 'How would you describe yourself?',
      field: 'experience',
      type: 'single-select',
      options: ['Beginner', 'Intermediate', 'Advanced', 'Expert']
    },
    {
      title: 'When are you available?',
      subtitle: 'When do you prefer to have skill sessions?',
      field: 'availability',
      type: 'single-select',
      options: ['Weekday mornings', 'Weekday evenings', 'Weekends', 'Flexible']
    },
    {
      title: 'Your timezone',
      subtitle: 'Help us match you with compatible schedules',
      field: 'timezone',
      type: 'single-select',
      options: ['EST', 'CST', 'MST', 'PST', 'GMT', 'CET', 'JST', 'Other']
    },
    {
      title: 'Learning style',
      subtitle: 'How do you learn best?',
      field: 'learningStyle',
      type: 'single-select',
      options: ['Visual', 'Auditory', 'Hands-on', 'Reading/Writing']
    },
    {
      title: 'Your goals',
      subtitle: 'What do you hope to achieve?',
      field: 'goals',
      type: 'textarea',
      placeholder: 'Tell us about your learning and teaching goals...'
    },
    {
      title: 'Where are you located?',
      subtitle: 'This helps us suggest local meetups',
      field: 'location',
      type: 'input',
      placeholder: 'City, Country'
    },
    {
      title: 'About you',
      subtitle: 'Write a short bio for your profile',
      field: 'bio',
      type: 'textarea',
      placeholder: 'Tell other users about yourself, your interests, and what makes you unique...'
    }
  ];

  const currentStepData = steps[currentStep];

  const handleMultiSelect = (value: string | { id: string; name: string }) => {
    const skillId = typeof value === 'string' ? value : value.id;
    const field = currentStepData.field as 'canTeach' | 'wantToLearn';
    const current = formData[field];
    
    if (current.includes(skillId)) {
      setFormData(prev => ({
        ...prev,
        [field]: current.filter(item => item !== skillId)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: [...current, skillId]
      }));
    }
  };

  const handleSingleSelect = (value: string) => {
    setFormData(prev => ({
      ...prev,
      [currentStepData.field]: value
    }));
  };

  const handleInputChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      [currentStepData.field]: value
    }));
  };

  const isStepValid = () => {
    const currentValue = formData[currentStepData.field as keyof typeof formData];
    
    if (currentStepData.type === 'multi-select') {
      return Array.isArray(currentValue) && currentValue.length > 0;
    }
    
    return currentValue && String(currentValue).trim().length > 0;
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error('User not authenticated');
      return;
    }

    setLoading(true);
    try {
      // Save user profile data
      const { error: profileError } = await supabase
        .from('users')
        .upsert({
          id: user.id,
          fullname: user.user_metadata?.fullname || '',
          email: user.email || '',
          location: formData.location,
          description: formData.bio,
          public_profile: true
        });

      if (profileError) throw profileError;

      // Save skills user can teach
      if (formData.canTeach.length > 0) {
        const teachSkills = formData.canTeach.map(skillId => ({
          user_id: user.id,
          skill_id: skillId,
          proficiency_level: formData.experience.toLowerCase()
        }));

        const { error: teachError } = await supabase
          .from('user_skill_offer')
          .insert(teachSkills);

        if (teachError) throw teachError;
      }

      // Save skills user wants to learn
      if (formData.wantToLearn.length > 0) {
        const learnSkills = formData.wantToLearn.map(skillId => ({
          user_id: user.id,
          skill_id: skillId,
          priority_level: 'medium'
        }));

        const { error: learnError } = await supabase
          .from('user_skill_want')
          .insert(learnSkills);

        if (learnError) throw learnError;
      }

      // Award first badge
      const { data: firstBadge } = await supabase
        .from('badges')
        .select('id')
        .eq('name', 'First Match')
        .single();

      if (firstBadge) {
        await supabase
          .from('user_badge')
          .insert({
            user_id: user.id,
            badge_id: firstBadge.id
          });
      }
      
      toast.success('Profile setup complete!');
      navigate('/discover');
    } catch (error) {
      console.error('Onboarding error:', error);
      toast.error('Failed to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStepData.type) {
      case 'multi-select':
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {currentStepData.options?.map((option: any) => {
              const optionId = typeof option === 'string' ? option : option.id;
              const optionName = typeof option === 'string' ? option : option.name;
              const isSelected = (formData[currentStepData.field as 'canTeach' | 'wantToLearn'] || []).includes(optionId);
              return (
                <motion.button
                  key={optionId}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleMultiSelect(option)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{optionName}</span>
                    {isSelected && <Check className="w-5 h-5" />}
                  </div>
                </motion.button>
              );
            })}
          </div>
        );

      case 'single-select':
        return (
          <div className="space-y-3">
            {currentStepData.options?.map((option) => {
              const isSelected = formData[currentStepData.field as keyof typeof formData] === option;
              return (
                <motion.button
                  key={option}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleSingleSelect(option)}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                    isSelected
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    {isSelected && <Check className="w-5 h-5" />}
                  </div>
                </motion.button>
              );
            })}
          </div>
        );

      case 'textarea':
        return (
          <textarea
            value={formData[currentStepData.field as keyof typeof formData] as string || ''}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={currentStepData.placeholder}
            rows={6}
            className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none resize-none"
          />
        );

      case 'input':
        return (
          <input
            type="text"
            value={formData[currentStepData.field as keyof typeof formData] as string || ''}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={currentStepData.placeholder}
            className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {currentStepData.title}
              </h1>
              <p className="text-xl text-gray-600">
                {currentStepData.subtitle}
              </p>
            </div>

            <div className="mb-8">
              {renderStepContent()}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  currentStep === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Previous</span>
              </motion.button>

              <div className="flex space-x-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                      index === currentStep
                        ? 'bg-orange-500'
                        : index < currentStep
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                disabled={!isStepValid() || loading}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  isStepValid() && !loading
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                <span>
                  {loading ? 'Saving...' : currentStep === steps.length - 1 ? 'Complete' : 'Next'}
                </span>
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}