import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Zap, Users, Star, ArrowRight, Play } from 'lucide-react';

export default function Home() {
  const benefits = [
    {
      icon: Zap,
      title: 'AI Matching',
      description: 'Our smart algorithm connects you with perfect skill swap partners based on your interests and goals.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Users,
      title: 'Real-time Chat',
      description: 'Instant messaging with match notifications, typing indicators, and seamless communication.',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Star,
      title: 'Gamified Learning',
      description: 'Earn badges, maintain streaks, and climb leaderboards while developing new skills.',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'UX Designer',
      content: 'SwapIT helped me learn coding while teaching design. Found amazing mentors!',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5
    },
    {
      name: 'Marcus Johnson',
      role: 'Software Engineer',
      content: 'The swipe interface is genius. Matched with a guitarist and now I can play!',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5
    },
    {
      name: 'Elena Rodriguez',
      role: 'Language Teacher',
      content: 'Teaching Spanish while learning photography - perfect skill exchange platform.',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23FF6B00%22 fill-opacity=%220.03%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%223%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
                <span className="bg-gradient-to-r from-orange-500 via-red-500 to-blue-600 bg-clip-text text-transparent">
                  Swipe. Match.
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent">
                  Swap Skills.
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                The world's first skill-sharing platform that connects learners and teachers 
                through an intuitive swipe-based matching system.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/signup"
                  className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-lg font-semibold rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg flex items-center space-x-2"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/discover"
                  className="px-8 py-4 bg-white text-gray-700 text-lg font-semibold rounded-full border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 flex items-center space-x-2"
                >
                  <Play className="w-5 h-5" />
                  <span>Browse Skills</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-8 max-w-md mx-auto"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">10K+</div>
                <div className="text-gray-600">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">500+</div>
                <div className="text-gray-600">Skills Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">95%</div>
                <div className="text-gray-600">Match Success</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating Cards Animation */}
        <div className="absolute top-1/2 left-10 transform -translate-y-1/2 hidden lg:block">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-64 h-80 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6"
          >
            <div className="w-full h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl mb-4"></div>
            <h3 className="font-semibold text-lg mb-2">JavaScript Fundamentals</h3>
            <p className="text-gray-600 text-sm mb-4">Learn the basics of JavaScript programming from experienced developers.</p>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-500 rounded-full"></div>
              <span className="text-sm font-medium">Alex Chen</span>
            </div>
          </motion.div>
        </div>

        <div className="absolute top-1/3 right-10 transform -translate-y-1/2 hidden lg:block">
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            className="w-64 h-80 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6"
          >
            <div className="w-full h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl mb-4"></div>
            <h3 className="font-semibold text-lg mb-2">Digital Marketing</h3>
            <p className="text-gray-600 text-sm mb-4">Master social media marketing and grow your online presence.</p>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium">Sarah Kim</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">SwapIT</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of skill sharing with cutting-edge features designed for modern learners.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="relative group"
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 h-full">
                    <div className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How It <span className="bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started in minutes and begin your skill-sharing journey today.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Create Profile', desc: 'Tell us what you can teach and want to learn' },
              { step: '02', title: 'Swipe & Match', desc: 'Discover compatible skill partners through intuitive swiping' },
              { step: '03', title: 'Chat & Schedule', desc: 'Connect with matches and schedule skill swap sessions' },
              { step: '04', title: 'Learn & Grow', desc: 'Exchange skills, earn badges, and build your network' }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our <span className="bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">Community</span> Says
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of learners who are already transforming their skills.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Skill Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of learners and teachers who are already transforming their lives through skill sharing.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/signup"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-orange-600 text-lg font-semibold rounded-full hover:bg-gray-100 transition-all duration-200 shadow-lg"
              >
                <Heart className="w-5 h-5" />
                <span>Join SwapIT Today</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}