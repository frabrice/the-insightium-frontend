import React, { useState } from 'react';
import { 
  Settings, 
  Save, 
  RefreshCw,
  Globe,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Bell,
  Shield,
  Database,
  Palette,
  Monitor,
  Users,
  Lock,
  Key,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';

interface SettingsManagementProps {
  isDarkMode: boolean;
}

export default function SettingsManagement({ isDarkMode }: SettingsManagementProps) {
  const [activeTab, setActiveTab] = useState('general');
  const [saveStatus, setSaveStatus] = useState('');

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'contact', label: 'Contact', icon: Mail },
    { id: 'social', label: 'Social Media', icon: Globe },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'advanced', label: 'Advanced', icon: Database }
  ];

  const [settings, setSettings] = useState({
    // General Settings
    siteName: 'The Insightium',
    siteDescription: 'Empowering education through innovative content',
    siteUrl: 'https://theinsightium.com',
    timezone: 'Africa/Nairobi',
    language: 'en',
    articlesPerPage: 10,
    enableComments: true,
    enableNewsletter: true,
    maintenanceMode: false,

    // Contact Settings
    contactEmail: 'admin@theinsightium.com',
    contactPhone: '+250 780 849 228',
    contactAddress: 'Kigali, Rwanda',
    officeHours: 'Monday - Friday: 8:00 AM - 6:00 PM (EAT)',

    // Social Media
    facebookUrl: '',
    twitterUrl: '',
    instagramUrl: '',
    linkedinUrl: '',
    youtubeUrl: '',

    // Notifications
    emailNotifications: true,
    newArticleNotifications: true,
    commentNotifications: true,
    newsletterNotifications: true,

    // Security
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginAttempts: 5,

    // Advanced
    cacheEnabled: true,
    compressionEnabled: true,
    analyticsEnabled: true,
    backupFrequency: 'daily'
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    setSaveStatus('Saving...');
    // Simulate save operation
    setTimeout(() => {
      setSaveStatus('Settings saved successfully!');
      setTimeout(() => setSaveStatus(''), 3000);
    }, 1000);
  };

  const renderGeneralSettings = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Site Name
          </label>
          <input
            type="text"
            value={settings.siteName}
            onChange={(e) => handleSettingChange('siteName', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs ${
              isDarkMode 
                ? 'bg-gray-900 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          />
        </div>
        <div>
          <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Site URL
          </label>
          <input
            type="url"
            value={settings.siteUrl}
            onChange={(e) => handleSettingChange('siteUrl', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs ${
              isDarkMode 
                ? 'bg-gray-900 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          />
        </div>
      </div>

      <div>
        <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Site Description
        </label>
        <textarea
          value={settings.siteDescription}
          onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
          rows={3}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs resize-none ${
            isDarkMode 
              ? 'bg-gray-900 border-gray-600 text-white' 
              : 'bg-white border-gray-300 text-gray-900'
          }`}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Timezone
          </label>
          <select
            value={settings.timezone}
            onChange={(e) => handleSettingChange('timezone', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs ${
              isDarkMode 
                ? 'bg-gray-900 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="Africa/Nairobi">Africa/Nairobi</option>
            <option value="Africa/Kigali">Africa/Kigali</option>
            <option value="Africa/Kampala">Africa/Kampala</option>
          </select>
        </div>
        <div>
          <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Language
          </label>
          <select
            value={settings.language}
            onChange={(e) => handleSettingChange('language', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs ${
              isDarkMode 
                ? 'bg-gray-900 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="en">English</option>
            <option value="sw">Swahili</option>
            <option value="rw">Kinyarwanda</option>
          </select>
        </div>
        <div>
          <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Articles Per Page
          </label>
          <input
            type="number"
            value={settings.articlesPerPage}
            onChange={(e) => handleSettingChange('articlesPerPage', parseInt(e.target.value))}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs ${
              isDarkMode 
                ? 'bg-gray-900 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={settings.enableComments}
            onChange={(e) => handleSettingChange('enableComments', e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Enable Comments on Articles
          </span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={settings.enableNewsletter}
            onChange={(e) => handleSettingChange('enableNewsletter', e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Enable Newsletter Signup
          </span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={settings.maintenanceMode}
            onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
            className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
          />
          <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Maintenance Mode
          </span>
        </label>
      </div>
    </div>
  );

  const renderContactSettings = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Contact Email
          </label>
          <input
            type="email"
            value={settings.contactEmail}
            onChange={(e) => handleSettingChange('contactEmail', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs ${
              isDarkMode 
                ? 'bg-gray-900 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          />
        </div>
        <div>
          <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Contact Phone
          </label>
          <input
            type="tel"
            value={settings.contactPhone}
            onChange={(e) => handleSettingChange('contactPhone', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs ${
              isDarkMode 
                ? 'bg-gray-900 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          />
        </div>
      </div>

      <div>
        <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Office Address
        </label>
        <input
          type="text"
          value={settings.contactAddress}
          onChange={(e) => handleSettingChange('contactAddress', e.target.value)}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs ${
            isDarkMode 
              ? 'bg-gray-900 border-gray-600 text-white' 
              : 'bg-white border-gray-300 text-gray-900'
          }`}
        />
      </div>

      <div>
        <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Office Hours
        </label>
        <input
          type="text"
          value={settings.officeHours}
          onChange={(e) => handleSettingChange('officeHours', e.target.value)}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs ${
            isDarkMode 
              ? 'bg-gray-900 border-gray-600 text-white' 
              : 'bg-white border-gray-300 text-gray-900'
          }`}
        />
      </div>
    </div>
  );

  const renderSocialSettings = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {[
          { key: 'facebookUrl', label: 'Facebook URL', icon: Facebook, color: 'text-blue-600' },
          { key: 'twitterUrl', label: 'Twitter URL', icon: Twitter, color: 'text-blue-400' },
          { key: 'instagramUrl', label: 'Instagram URL', icon: Instagram, color: 'text-pink-600' },
          { key: 'linkedinUrl', label: 'LinkedIn URL', icon: Linkedin, color: 'text-blue-700' },
          { key: 'youtubeUrl', label: 'YouTube URL', icon: Youtube, color: 'text-red-600' }
        ].map((social) => (
          <div key={social.key}>
            <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <div className="flex items-center space-x-2">
                <social.icon className={`w-4 h-4 ${social.color}`} />
                <span>{social.label}</span>
              </div>
            </label>
            <input
              type="url"
              value={settings[social.key as keyof typeof settings] as string}
              onChange={(e) => handleSettingChange(social.key, e.target.value)}
              placeholder={`https://${social.key.replace('Url', '')}.com/theinsightium`}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs ${
                isDarkMode 
                  ? 'bg-gray-900 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Settings
          </h1>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Configure your website settings and preferences
          </p>
        </div>
        <button 
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center space-x-1"
        >
          <Save className="w-3 h-3" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Save Status */}
      {saveStatus && (
        <div className={`${saveStatus.includes('success') ? 'bg-green-50 border-green-200 text-green-700' : 'bg-blue-50 border-blue-200 text-blue-700'} rounded-lg border p-3`}>
          <div className="flex items-center space-x-2">
            {saveStatus.includes('success') ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <Info className="w-4 h-4" />
            )}
            <span className="text-xs">{saveStatus}</span>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-3`}>
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : `${isDarkMode ? 'text-gray-400 hover:bg-gray-700 hover:text-white' : 'text-gray-600 hover:bg-gray-100'}`
              }`}
            >
              <tab.icon className="w-3 h-3" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Settings Content */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-4`}>
        {activeTab === 'general' && renderGeneralSettings()}
        {activeTab === 'contact' && renderContactSettings()}
        {activeTab === 'social' && renderSocialSettings()}
        
        {activeTab === 'notifications' && (
          <div className="space-y-4">
            <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Notification Preferences
            </h3>
            <div className="space-y-3">
              {[
                { key: 'emailNotifications', label: 'Email Notifications' },
                { key: 'newArticleNotifications', label: 'New Article Notifications' },
                { key: 'commentNotifications', label: 'Comment Notifications' },
                { key: 'newsletterNotifications', label: 'Newsletter Notifications' }
              ].map((notification) => (
                <label key={notification.key} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={settings[notification.key as keyof typeof settings] as boolean}
                    onChange={(e) => handleSettingChange(notification.key, e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {notification.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-4">
            <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Security Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Session Timeout (minutes)
                </label>
                <input
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs ${
                    isDarkMode 
                      ? 'bg-gray-900 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Max Login Attempts
                </label>
                <input
                  type="number"
                  value={settings.loginAttempts}
                  onChange={(e) => handleSettingChange('loginAttempts', parseInt(e.target.value))}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs ${
                    isDarkMode 
                      ? 'bg-gray-900 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
            </div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.twoFactorAuth}
                onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Enable Two-Factor Authentication
              </span>
            </label>
          </div>
        )}

        {activeTab === 'advanced' && (
          <div className="space-y-4">
            <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Advanced Settings
            </h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.cacheEnabled}
                  onChange={(e) => handleSettingChange('cacheEnabled', e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Enable Caching
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.compressionEnabled}
                  onChange={(e) => handleSettingChange('compressionEnabled', e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Enable Compression
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.analyticsEnabled}
                  onChange={(e) => handleSettingChange('analyticsEnabled', e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Enable Analytics
                </span>
              </label>
            </div>
            <div>
              <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Backup Frequency
              </label>
              <select
                value={settings.backupFrequency}
                onChange={(e) => handleSettingChange('backupFrequency', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs ${
                  isDarkMode 
                    ? 'bg-gray-900 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}