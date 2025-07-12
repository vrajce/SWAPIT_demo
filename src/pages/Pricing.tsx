import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown, Heart } from 'lucide-react';

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: 'Free',
      description: 'Perfect for getting started with skill sharing',
      price: { monthly: 0, yearly: 0 },
      popular: false,
      features: [
        '5 swipes per day',
        'Basic matching algorithm',
        'Standard chat messaging',
        'Public profile',
        'Basic skill badges',
        'Community access'
      ],
      cta: 'Get Started',
      color: 'from-gray-500 to-gray-600'
    },
    {
      name: 'Premium',
      description: 'Unlock advanced features and boost your skill sharing',
      price: { monthly: 19, yearly: 190 },
      popular: true,
      features: [
        'Unlimited swipes',
        'AI-powered smart matching',
        'Priority chat support',
        'Super swipes (5 per day)',
        'Advanced analytics',
        'Skill boost visibility',
        'Video call integration',
        'Custom profile themes',
        'Early feature access'
      ],
      cta: 'Start Premium',
      color: 'from-orange-500 to-orange-600'
    },
    {
      name: 'Pro',
      description: 'For serious learners and teachers who want it all',
      price: { monthly: 39, yearly: 390 },
      popular: false,
      features: [
        'Everything in Premium',
        'Unlimited super swipes',
        'Verified badge',
        'Advanced skill insights',
        'Personal learning coach',
        'Group skill sessions',
        'API access',
        'White-label options',
        'Priority customer support'
      ],
      cta: 'Go Pro',
      color: 'from-purple-500 to-indigo-600'
    }
  ];

  const faqs = [
    {
      question: 'Can I change my plan anytime?',
      answer: 'Yes! You can upgrade, downgrade, or cancel your subscription at any time from your account settings.'
    },
    {
      question: 'What happens to my matches if I downgrade?',
      answer: 'Your existing matches and conversations remain accessible. You\'ll just have limited new swipes based on your plan.'
    },
    {
      question: 'Is there a refund policy?',
      answer: 'We offer a 30-day money-back guarantee for all paid plans. No questions asked!'
    },
    {
      question: 'Do you offer student discounts?',
      answer: 'Yes! Students get 50% off any paid plan with a valid student email address.'
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
              Simple <span className="bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">Pricing</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Choose the plan that fits your learning journey. Start free and upgrade anytime.
            </p>

            {/* Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-12">
              <span className={`text-lg ${!isYearly ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                Monthly
              </span>
              <motion.button
                onClick={() => setIsYearly(!isYearly)}
                className={`relative w-14 h-7 rounded-full transition-colors duration-200 ${
                  isYearly ? 'bg-orange-500' : 'bg-gray-300'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md"
                  animate={{ x: isYearly ? 32 : 4 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </motion.button>
              <span className={`text-lg ${isYearly ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                Yearly
              </span>
              {isYearly && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="px-3 py-1 bg-green-100 text-green-600 text-sm rounded-full font-medium"
                >
                  Save 17%
                </motion.span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                  plan.popular ? 'border-orange-500 scale-105' : 'border-gray-200 hover:border-orange-300'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                <div className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    
                    <div className="mb-6">
                      <span className="text-5xl font-bold text-gray-900">
                        ${isYearly ? plan.price.yearly : plan.price.monthly}
                      </span>
                      {plan.price.monthly > 0 && (
                        <span className="text-gray-500 ml-2">
                          /{isYearly ? 'year' : 'month'}
                        </span>
                      )}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {plan.cta}
                    </motion.button>
                  </div>

                  <div className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center flex-shrink-0`}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
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
              Why Upgrade to <span className="bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">Premium</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Unlock advanced features that accelerate your learning journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Smart Matching',
                description: 'AI-powered algorithm finds your perfect skill partners faster',
                color: 'from-yellow-500 to-orange-500'
              },
              {
                icon: Crown,
                title: 'Priority Support',
                description: 'Get help when you need it with priority customer support',
                color: 'from-purple-500 to-indigo-500'
              },
              {
                icon: Heart,
                title: 'Super Swipes',
                description: 'Stand out to potential matches with eye-catching super swipes',
                color: 'from-red-500 to-pink-500'
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
              Frequently Asked <span className="bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-xl text-gray-600">
              Got questions? We've got answers.
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
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
              Ready to Supercharge Your Learning?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of learners who are already accelerating their skill development with SwapIT Premium.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-orange-600 text-lg font-semibold rounded-full hover:bg-gray-100 transition-all duration-200 shadow-lg"
            >
              Start Your Free Trial
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}