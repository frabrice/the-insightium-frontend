import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

interface FooterProps {
  isDarkMode: boolean;
}

export default function Footer({ isDarkMode }: FooterProps) {
  const categories = [
    'Research World',
    'Spirit of Africa', 
    'Tech Trends',
    'Need to Know',
    'Echoes of Home',
    'Career Campus',
    'Mind and Body Quest',
    'E! Corner'
  ];

  return (
    <footer className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-800 border-gray-700'} border-t transition-colors`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-bold">
                <span className="text-blue-600">The </span>
                <span className="text-red-600" style={{ color: '#F21717' }}>Insightium</span>
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-gray-300">
                Empowering education through innovative content, inspiring stories, and transformative insights that shape the future of learning across Africa and beyond.
              </p>
            </div>
            
            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 sm:mb-6 text-white">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              {['About Us', 'Our Team', 'Contact Us', 'Privacy Policy', 'Terms of Service', 'Advertise With Us'].map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors hover:underline">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Content Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4 sm:mb-6 text-white">Content</h4>
            <ul className="space-y-2 sm:space-y-3">
              {categories.slice(0, 6).map((category, index) => (
                <li key={index}>
                  <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors hover:underline">
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4 sm:mb-6 text-white">Stay Connected</h4>
            
            {/* Contact Info */}
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="text-sm text-gray-300">hello@theinsightium.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="text-sm text-gray-300">+254 700 123 456</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="text-sm text-gray-300">Nairobi, Kenya</span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div>
              <p className="text-sm mb-3 text-gray-300">
                Subscribe to our newsletter for the latest updates
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-sm border bg-gray-700 border-gray-600 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                />
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm rounded-lg transition-colors whitespace-nowrap" style={{ backgroundColor: '#F21717' }}>
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-gray-400 text-center md:text-left">
            © 2024 The Insightium. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center space-x-4 sm:space-x-6">
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}