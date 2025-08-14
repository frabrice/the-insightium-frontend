import React from 'react';
import { Phone, Mail, Users, Briefcase } from 'lucide-react';

interface TopMenuBarProps {
  isDarkMode: boolean;
}

export default function TopMenuBar({ isDarkMode }: TopMenuBarProps) {
  // Email handlers - open email client with pre-filled information
  const handlePartnerClick = () => {
    const subject = encodeURIComponent('Partnership Opportunity with The Insightium');
    const body = encodeURIComponent(`Hello The Insightium Team,

I am interested in exploring partnership opportunities with The Insightium.

Please provide more information about:
- Available partnership programs
- Collaboration opportunities
- Requirements and benefits

Looking forward to hearing from you.

Best regards,`);
    
    window.location.href = `mailto:admin@theinsightium.com?subject=${subject}&body=${body}`;
  };

  const handleAdvertiseClick = () => {
    const subject = encodeURIComponent('Advertising Inquiry - The Insightium');
    const body = encodeURIComponent(`Hello The Insightium Team,

I am interested in advertising opportunities with The Insightium across your platforms.

Please provide information about:
- Available advertising packages
- Audience demographics and reach
- Pricing and placement options
- Magazine, TV Show, and Podcast advertising opportunities

Looking forward to your response.

Best regards,`);
    
    window.location.href = `mailto:admin@theinsightium.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="bg-red-600 text-white py-2 sm:py-1.5 text-xs" style={{ backgroundColor: '#F21717' }}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between">
          {/* Left side - Contact Info */}
          <div className="hidden sm:flex flex-row items-center space-x-3 lg:space-x-4">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden md:inline">Phone:</span>
              <a href="tel:+250780849228" className="hover:underline">
                +250 780 849 228
              </a>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden md:inline">Email:</span>
              <a href="mailto:admin@theinsightium.com" className="hover:underline truncate max-w-[200px] sm:max-w-none">
                admin@theinsightium.com
              </a>
            </div>
          </div>

          {/* Right side - Action Buttons */}
          <div className="flex items-center justify-center sm:justify-end space-x-2 sm:space-x-2 w-full sm:w-auto">
            <button
              type="button"
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-3 sm:px-3 py-1.5 sm:py-1 rounded-md font-medium transition-all duration-200 flex items-center space-x-1 sm:space-x-1.5 text-xs cursor-pointer whitespace-nowrap"
              onClick={handlePartnerClick}
            >
              <Users className="w-3 h-3" />
              <span className="sm:hidden">Partner</span>
              <span className="hidden sm:inline">Partner with Us</span>
            </button>
            
            <button
              type="button"
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-3 sm:px-3 py-1.5 sm:py-1 rounded-md font-medium transition-all duration-200 flex items-center space-x-1 sm:space-x-1.5 text-xs cursor-pointer whitespace-nowrap"
              onClick={handleAdvertiseClick}
            >
              <Briefcase className="w-3 h-3" />
              <span className="sm:hidden">Ads</span>
              <span className="hidden sm:inline">Advertise</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}