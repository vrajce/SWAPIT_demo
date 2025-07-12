import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      reset();
      
      // Reset success state after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Send us an email anytime',
      contact: 'hello@swapit.com',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Mon-Fri from 8am to 5pm',
      contact: '+1 (555) 123-4567',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      description: 'Come say hello at our office',
      contact: '123 Innovation St, San Francisco, CA 94107',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-16 bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Message Sent!</h1>
          <p className="text-xl text-gray-600 max-w-md">
            Thanks for reaching out. We'll get back to you within 24 hours.
          </p>
        </motion.div>
      </div>
    );
  }

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
              Get in <span className="bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions, feedback, or just want to say hello? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 text-center"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${info.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{info.title}</h3>
                  <p className="text-gray-600 mb-4">{info.description}</p>
                  <p className="text-gray-900 font-medium">{info.contact}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Send Us a <span className="bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">Message</span>
            </h2>
            <p className="text-xl text-gray-600">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name', { required: 'Name is required' })}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 focus:outline-none ${
                      errors.name
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-gray-200 focus:border-orange-500'
                    }`}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 focus:outline-none ${
                      errors.email
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-gray-200 focus:border-orange-500'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  {...register('subject', { required: 'Subject is required' })}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 focus:outline-none ${
                    errors.subject
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-200 focus:border-orange-500'
                  }`}
                  placeholder="What is this about?"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  {...register('message', { required: 'Message is required' })}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 focus:outline-none resize-none ${
                    errors.message
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-200 focus:border-orange-500'
                  }`}
                  placeholder="Tell us how we can help you..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                )}
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Visit Our <span className="bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">Office</span>
            </h2>
            <p className="text-xl text-gray-600">
              We're located in the heart of San Francisco's tech district.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center"
          >
            <div className="text-center text-gray-600">
              <MapPin className="w-16 h-16 mx-auto mb-4" />
              <p className="text-lg">Interactive map would be embedded here</p>
              <p className="text-sm">123 Innovation St, San Francisco, CA 94107</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}