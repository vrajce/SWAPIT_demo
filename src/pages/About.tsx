import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Target, Award, Lightbulb, Globe } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Heart,
      title: 'Community First',
      description: 'We believe in the power of human connection and collaborative learning.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Target,
      title: 'Goal-Oriented',
      description: 'Every feature is designed to help you achieve your learning objectives.',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Globe,
      title: 'Global Access',
      description: 'Breaking down barriers to make skill sharing accessible worldwide.',
      color: 'from-green-500 to-teal-500'
    }
  ];

  const team = [
    {
      name: 'Alex Rivera',
      role: 'CEO & Co-Founder',
      bio: 'Former Google PM with a passion for democratizing education.',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300',
      skills: ['Product Strategy', 'Team Leadership']
    },
    {
      name: 'Sarah Chen',
      role: 'CTO & Co-Founder',
      bio: 'Full-stack engineer who believes technology can transform learning.',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
      skills: ['React', 'Node.js', 'AI/ML']
    },
    {
      name: 'Marcus Johnson',
      role: 'Head of Design',
      bio: 'UX designer focused on creating intuitive, beautiful experiences.',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300',
      skills: ['UI/UX Design', 'Design Systems']
    }
  ];

  const timeline = [
    {
      year: '2023',
      title: 'The Idea',
      description: 'SwapIT was born from a simple frustration: why is it so hard to find someone to exchange skills with?'
    },
    {
      year: '2024',
      title: 'MVP Launch',
      description: 'We launched our first version with basic matching and messaging features.'
    },
    {
      year: '2024',
      title: 'Community Growth',
      description: 'Reached 10,000+ active users across 50+ countries.'
    },
    {
      year: '2025',
      title: 'Platform Evolution',
      description: 'Advanced AI matching, gamification, and real-time video sessions.'
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-white to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">Story</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              SwapIT was created to solve a simple problem: connecting people who want to learn 
              with those who want to teach, making skill sharing as easy as swiping on your phone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our <span className="bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">Mission</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We believe that everyone has something valuable to teach and something meaningful to learn. 
                Our mission is to democratize skill exchange by making it accessible, engaging, and rewarding for everyone.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Through innovative technology and thoughtful design, we're building a global community 
                where knowledge flows freely and connections are made based on mutual growth and learning.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="w-full h-80 bg-gradient-to-br from-orange-400 via-red-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <div className="text-center text-white">
                  <Lightbulb className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Democratize Learning</h3>
                  <p className="text-lg opacity-90">For Everyone, Everywhere</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our <span className="bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do and shape the SwapIT experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our <span className="bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">Journey</span>
            </h2>
            <p className="text-xl text-gray-600">
              From idea to global community - here's how SwapIT evolved.
            </p>
          </motion.div>

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex items-center space-x-8 ${index % 2 === 1 ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                <div className="flex-1">
                  <div className={`bg-white rounded-2xl p-6 shadow-lg ${index % 2 === 1 ? 'text-right' : ''}`}>
                    <div className="text-3xl font-bold text-orange-600 mb-2">{item.year}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
                <div className="w-4 h-4 bg-gradient-to-r from-orange-500 to-blue-600 rounded-full flex-shrink-0"></div>
                <div className="flex-1"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Meet Our <span className="bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate individuals working together to revolutionize skill sharing.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-6 object-cover"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-orange-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 mb-6 leading-relaxed">{member.bio}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-orange-100 text-orange-600 text-sm rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
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
            <h2 className="text-4xl font-bold text-white mb-6">
              Join Our Mission
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Be part of a global community that's transforming how we learn and share knowledge.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-orange-600 text-lg font-semibold rounded-full hover:bg-gray-100 transition-all duration-200 shadow-lg"
            >
              Get Started Today
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}