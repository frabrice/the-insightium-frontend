import React from 'react';
import { Users, Target, Eye, Heart, Lightbulb, Globe, BookOpen, Tv, Mic, Share2, ArrowRight, Star, Award, Zap, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

interface AboutUsProps {
  isDarkMode: boolean;
}

export default function AboutUs({ isDarkMode }: AboutUsProps) {
  const services = [
    {
      title: 'Magazines',
      description: 'Monthly editions filled with rich stories, science, culture, careers, and youth voices — delivered to schools and online.',
      icon: BookOpen,
      gradient: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-200',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      title: 'TV Shows',
      subtitle: 'Project Insight',
      description: 'Fun, competitive, and mind-sharpening — our flagship show brings school teams together to test knowledge, pitch innovations, and shine.',
      icon: Tv,
      gradient: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
      borderColor: 'border-red-200',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      title: 'Podcasts',
      subtitle: 'Library Talk',
      description: 'Real conversations, in real libraries — where students discuss ideas, share views, and grow together.',
      icon: Mic,
      gradient: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      borderColor: 'border-green-200',
      image: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      title: 'Social Media Content',
      description: 'Bite-sized wisdom, motivation, and news that keep youth inspired and informed, every day.',
      icon: Share2,
      gradient: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-200',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
  ];

  const teamValues = [
    {
      title: 'Innovation',
      description: 'We constantly push boundaries to create fresh, engaging content that resonates with young minds.',
      icon: Lightbulb,
      color: 'text-yellow-500'
    },
    {
      title: 'Collaboration',
      description: 'We partner with schools, universities, and media networks to amplify our impact across East Africa.',
      icon: Users,
      color: 'text-blue-500'
    },
    {
      title: 'Excellence',
      description: 'Every piece of content we create meets the highest standards of quality and educational value.',
      icon: Award,
      color: 'text-green-500'
    },
    {
      title: 'Impact',
      description: 'We measure success by the positive change we create in the lives of young Africans.',
      icon: Zap,
      color: 'text-red-500'
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors`}>
      {/* Hero Section - Minimal padding */}
      <section className={`relative py-6 ${isDarkMode ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-black' : 'bg-gradient-to-br from-blue-50 via-white to-red-50'} overflow-hidden transition-colors`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-6 left-6 w-12 h-12 bg-blue-500 rounded-full blur-lg"></div>
          <div className="absolute top-20 right-12 w-16 h-16 bg-red-500 rounded-full blur-lg"></div>
          <div className="absolute bottom-12 left-1/3 w-14 h-14 bg-green-500 rounded-full blur-lg"></div>
          <div className="absolute bottom-20 right-6 w-10 h-10 bg-purple-500 rounded-full blur-lg"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 relative">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full font-semibold text-xs shadow-md mb-3">
              <Heart className="w-3 h-3" />
              <span>About The Insightium</span>
            </div>

            {/* Main Title - Smaller and more compact */}
            <h1 className={`text-3xl lg:text-4xl font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Empowering Africa's
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-600">
                Next Generation
              </span>
            </h1>
          </div>
        </div>
      </section>

      {/* Our Story Section - More compact */}
      <section className={`py-8 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                </div>
                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Our Story
                </h2>
              </div>
              
              <div className="space-y-4">
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  At The Insightium, we believe in the power of young African minds. Born from the need to reshape how young people learn, think, and engage with the world, Insightium was created as a response to a generation full of potential but lacking the platforms to express it.
                </p>
                
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  We blend media, education, and innovation to create content that speaks to youth, challenges them, and lifts them. Our journey began with a dream to change how youth learn — and now we're doing it through every screen, page, mic, and idea.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-2xl p-4 shadow-lg border transition-colors`}>
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Young African students learning"
                  className="w-full h-40 object-cover rounded-xl mb-3"
                />
                <div className="text-center">
                  <h3 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Inspiring Young Minds
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Every story we tell, every show we produce, and every conversation we facilitate is designed to unlock the incredible potential within Africa's youth.
                  </p>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-2 -right-2 bg-red-600 text-white p-2 rounded-full shadow-lg animate-bounce" style={{ backgroundColor: '#F21717' }}>
                <Star className="w-4 h-4" />
              </div>
              <div className="absolute -bottom-2 -left-2 bg-blue-600 text-white p-2 rounded-full shadow-lg animate-pulse">
                <Lightbulb className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section - More compact */}
      <section className={`py-6 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} transition-colors`}>
        <div className="max-w-6xl mx-auto px-4">
          {/* Section Header - Smaller */}
          <div className="text-center mb-6">
            <h2 className={`text-2xl lg:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              What We Do
            </h2>
          </div>

          {/* Services Grid */}
          <div className="grid lg:grid-cols-2 gap-4">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`group relative overflow-hidden rounded-xl ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'} border shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
              >
                {/* Background Image */}
                <div className="relative h-32 overflow-hidden">
                  <img 
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.gradient} opacity-80`}></div>
                  
                  {/* Icon */}
                  <div className="absolute top-3 left-3">
                    <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                      <service.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="mb-3">
                    <h3 className={`text-lg font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {service.title}
                    </h3>
                    {service.subtitle && (
                      <p className={`text-xs font-medium ${service.iconColor} opacity-80`}>
                        {service.subtitle}
                      </p>
                    )}
                  </div>
                  
                  <p className={`text-sm leading-relaxed mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {service.description}
                  </p>

                  {/* Learn More Button */}
                  <button className={`inline-flex items-center space-x-1 ${service.iconColor} hover:opacity-80 font-medium transition-all duration-300 group/btn text-sm`}>
                    <span>Learn More</span>
                    <svg className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Decorative Element */}
                <div className={`absolute bottom-0 right-0 w-16 h-16 ${service.bgColor} rounded-full -translate-y-8 translate-x-8 opacity-10 transition-all duration-300 group-hover:scale-125`}></div>
              </div>
            ))}
          </div>

          {/* Bottom CTA - Smaller */}
          <div className="text-center mt-6">
            <div className={`inline-flex items-center space-x-2 ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border rounded-full px-4 py-2 shadow-md`}>
              <div className="flex -space-x-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white"></div>
                <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white"></div>
                <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                <div className="w-6 h-6 bg-purple-500 rounded-full border-2 border-white"></div>
              </div>
              <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Empowering youth across East Africa
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className={`py-8 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Mission */}
            <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl p-6 shadow-lg border transition-colors relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-16 h-16 bg-red-100 rounded-full -translate-y-8 translate-x-8 opacity-20" style={{ backgroundColor: 'rgba(242, 23, 23, 0.1)' }}></div>
              
              <div className="relative">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-red-100 p-2 rounded-full" style={{ backgroundColor: 'rgba(242, 23, 23, 0.1)' }}>
                    <Target className="w-5 h-5 text-red-600" style={{ color: '#F21717' }} />
                  </div>
                  <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Our Mission
                  </h3>
                </div>
                
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  To ignite smart thinking, confidence, and creativity in African youth through multimedia content and school engagement.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl p-6 shadow-lg border transition-colors relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-16 h-16 bg-blue-100 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
              
              <div className="relative">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Eye className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Our Vision
                  </h3>
                </div>
                
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  A generation of young Africans who are curious, confident, and equipped to lead the continent into a bright and self-driven future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className={`py-8 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} transition-colors`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className={`text-2xl lg:text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              How We Work
            </h2>
            <p className={`text-sm max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              We partner with high schools, universities, and media networks across Rwanda and East Africa. 
              We don't build from scratch — we collaborate, amplify, and deliver.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {teamValues.map((value, index) => (
              <div key={index} className={`${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'} rounded-xl p-4 text-center shadow-md border hover:shadow-lg transition-all duration-300 group`}>
                <div className="flex justify-center mb-3">
                  <div className={`p-2 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className={`w-5 h-5 ${value.color}`} />
                  </div>
                </div>
                
                <h3 className={`text-base font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {value.title}
                </h3>
                
                <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section className={`py-8 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="African youth empowerment"
                className="w-full h-64 object-cover rounded-xl shadow-lg"
              />
              
              {/* Overlay Stats */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl flex items-end">
                <div className="p-4 text-white">
                  <h4 className="text-xl font-bold mb-1">60%</h4>
                  <p className="text-sm">of Africa's population is under 25</p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className={`text-2xl lg:text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Why It Matters
              </h2>
              
              <div className="space-y-3">
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Africa's youth make up over 60% of the continent's population. Yet, most platforms still speak over them, not to them.
                </p>
                
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  We're changing that — giving youth something they can be proud of, connect with, and learn from. We don't just entertain. We educate, challenge, and uplift.
                </p>
                
                <div className="flex items-center space-x-3 pt-3">
                  <div className="bg-red-100 p-2 rounded-full" style={{ backgroundColor: 'rgba(242, 23, 23, 0.1)' }}>
                    <Globe className="w-4 h-4 text-red-600" style={{ color: '#F21717' }} />
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Continental Impact
                    </h4>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Reaching youth across East Africa and beyond
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join the Movement Section */}
      <section className={`py-8 ${isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 to-red-50'} transition-colors`}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className={`text-2xl lg:text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Join the Movement
          </h2>
          
          <p className={`text-sm mb-6 max-w-3xl mx-auto leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Are you a student, school, sponsor, or storyteller? There's space for you here. 
            Be part of something powerful — join The Insightium as we light up the minds of Africa's next generation.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {['Students', 'Schools', 'Sponsors', 'Storytellers'].map((group, index) => (
              <div key={index} className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl p-3 shadow-md border hover:shadow-lg transition-all duration-300 group cursor-pointer`}>
                <div className="bg-red-100 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: 'rgba(242, 23, 23, 0.1)' }}>
                  <Users className="w-5 h-5 text-red-600" style={{ color: '#F21717' }} />
                </div>
                <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {group}
                </h3>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105 shadow-lg" style={{ backgroundColor: '#F21717' }}>
              <span>Get Involved</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className={`border-2 ${isDarkMode ? 'border-white text-white hover:bg-white hover:text-gray-900' : 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'} px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center space-x-2`}>
              <span>Contact Us</span>
            </button>
          </div>
        </div>
      </section>

      {/* Beautiful Footer */}
      <footer className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-800 border-gray-700'} border-t transition-colors`}>
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="mb-4">
                <h3 className="text-lg font-bold">
                  <span className="text-blue-600">The </span>
                  <span className="text-red-600" style={{ color: '#F21717' }}>Insightium</span>
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-gray-300">
                  Empowering education through innovative content, inspiring stories, and transformative insights that shape the future of learning across Africa and beyond.
                </p>
              </div>
              
              {/* Social Media Links */}
              <div className="flex space-x-3">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold mb-3 text-white">Quick Links</h4>
              <ul className="space-y-2">
                {['About Us', 'Our Team', 'Contact Us', 'Privacy Policy', 'Terms of Service', 'Advertise With Us'].map((link, index) => (
                  <li key={index}>
                    <a href="#" className="text-xs text-gray-300 hover:text-white transition-colors hover:underline">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Services */}
            <div>
              <h4 className="text-sm font-semibold mb-3 text-white">Our Services</h4>
              <ul className="space-y-2">
                {['Magazines', 'TV Shows', 'Podcasts', 'Social Media', 'School Partnerships', 'Content Creation'].map((service, index) => (
                  <li key={index}>
                    <a href="#" className="text-xs text-gray-300 hover:text-white transition-colors hover:underline">
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Newsletter */}
            <div>
              <h4 className="text-sm font-semibold mb-3 text-white">Stay Connected</h4>
              
              {/* Contact Info */}
              <div className="space-y-2 mb-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-300">hello@theinsightium.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-300">+254 700 123 456</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-300">Nairobi, Kenya</span>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div>
                <p className="text-xs mb-2 text-gray-300">
                  Subscribe to our newsletter for the latest updates
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-2 py-1.5 text-xs border bg-gray-700 border-gray-600 text-white placeholder-gray-400 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                  />
                  <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 text-xs rounded-r-lg transition-colors" style={{ backgroundColor: '#F21717' }}>
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-6 pt-4 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-400">
              © 2024 The Insightium. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-2 md:mt-0">
              <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}