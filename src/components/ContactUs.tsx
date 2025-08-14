import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

interface ContactUsProps {
  isDarkMode: boolean;
}

export default function ContactUs({ isDarkMode }: ContactUsProps) {
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors`}>
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Simple Title */}
        <div className="text-center mb-16">
          <h1 className={`text-4xl lg:text-5xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Contact Us
          </h1>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Get in touch with The Insightium team
          </p>
        </div>

        {/* Contact Information */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Email */}
          <div className="text-center">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(242, 23, 23, 0.1)' }}>
              <Mail className="w-8 h-8 text-red-600" style={{ color: '#F21717' }} />
            </div>
            <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Email
            </h3>
            <a 
              href="mailto:admin@theinsightium.com"
              className="text-red-600 hover:text-red-700 font-medium transition-colors text-lg"
              style={{ color: '#F21717' }}
            >
              admin@theinsightium.com
            </a>
          </div>

          {/* Phone */}
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Phone
            </h3>
            <a 
              href="tel:+250780849228"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors text-lg"
            >
              +250 780 849 228
            </a>
          </div>

          {/* Location */}
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-green-600" />
            </div>
            <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Location
            </h3>
            <p className="text-green-600 font-medium text-lg">
              Kigali, Rwanda
            </p>
          </div>
        </div>

        {/* Office Hours */}
        <div className="text-center">
          <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Office Hours
          </h3>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Monday - Friday: 8:00 AM - 6:00 PM (EAT)
          </p>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Weekend: By appointment
          </p>
        </div>
      </div>
    </div>
  );
}