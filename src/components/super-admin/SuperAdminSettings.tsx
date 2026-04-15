import React, { useEffect, useState } from 'react';
import { Save, RefreshCw } from 'lucide-react';
import { adminApi } from '../../lib/adminAuth';

interface Setting {
  setting_key: string;
  setting_value: any;
}

const DEFAULT_SETTINGS = [
  { key: 'site_name', label: 'Site Name', type: 'text', placeholder: 'The Insightium' },
  { key: 'site_tagline', label: 'Site Tagline', type: 'text', placeholder: 'Africa\'s Leading Digital Media Platform' },
  { key: 'contact_email', label: 'Contact Email', type: 'email', placeholder: 'hello@theinsightium.com' },
  { key: 'twitter_url', label: 'Twitter / X URL', type: 'url', placeholder: 'https://x.com/theinsightium' },
  { key: 'facebook_url', label: 'Facebook URL', type: 'url', placeholder: 'https://facebook.com/theinsightium' },
  { key: 'instagram_url', label: 'Instagram URL', type: 'url', placeholder: 'https://instagram.com/theinsightium' },
  { key: 'youtube_url', label: 'YouTube URL', type: 'url', placeholder: 'https://youtube.com/@theinsightium' },
  { key: 'linkedin_url', label: 'LinkedIn URL', type: 'url', placeholder: 'https://linkedin.com/company/theinsightium' },
  { key: 'about_text', label: 'About Text (Homepage Footer)', type: 'textarea', placeholder: 'Brief description of The Insightium...' },
];

export default function SuperAdminSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [saveMsg, setSaveMsg] = useState<Record<string, string>>({});

  useEffect(() => {
    adminApi.superAdmin.getSettings().then(({ data }) => {
      const map: Record<string, string> = {};
      (data || []).forEach((s: Setting) => {
        map[s.setting_key] = typeof s.setting_value === 'string' ? s.setting_value : JSON.stringify(s.setting_value);
      });
      setSettings(map);
      setIsLoading(false);
    });
  }, []);

  async function saveSetting(key: string) {
    setSaving(key);
    const { error } = await adminApi.superAdmin.updateSetting(key, settings[key] || '');
    setSaving(null);
    setSaveMsg(prev => ({ ...prev, [key]: error ? 'Failed' : 'Saved!' }));
    setTimeout(() => setSaveMsg(prev => { const n = { ...prev }; delete n[key]; return n; }), 2000);
  }

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[...Array(6)].map((_, i) => <div key={i} className="h-16 bg-neutral-800 rounded-sm" />)}
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6 max-w-2xl">
      <div>
        <h1 className="font-display font-bold text-white text-2xl">Site Settings</h1>
        <p className="text-neutral-500 text-sm mt-1">Configure global site settings and social links</p>
      </div>

      <div className="space-y-4">
        {DEFAULT_SETTINGS.map(setting => (
          <div key={setting.key} className="bg-neutral-900 border border-neutral-800 rounded-sm p-4">
            <label className="text-xs font-medium text-neutral-400 block mb-2">{setting.label}</label>
            <div className="flex gap-2">
              {setting.type === 'textarea' ? (
                <textarea
                  value={settings[setting.key] || ''}
                  onChange={e => setSettings(prev => ({ ...prev, [setting.key]: e.target.value }))}
                  placeholder={setting.placeholder}
                  rows={3}
                  className="flex-1 bg-neutral-800 border border-neutral-700 text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red text-white placeholder:text-neutral-600 resize-none"
                />
              ) : (
                <input
                  type={setting.type}
                  value={settings[setting.key] || ''}
                  onChange={e => setSettings(prev => ({ ...prev, [setting.key]: e.target.value }))}
                  placeholder={setting.placeholder}
                  className="flex-1 bg-neutral-800 border border-neutral-700 text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red text-white placeholder:text-neutral-600"
                />
              )}
              <button
                onClick={() => saveSetting(setting.key)}
                disabled={saving === setting.key}
                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 bg-brand-red text-white text-xs font-medium rounded-sm hover:bg-brand-red-dark transition-colors disabled:opacity-50 self-start"
              >
                {saving === setting.key
                  ? <RefreshCw size={12} className="animate-spin" />
                  : <Save size={12} />
                }
                {saveMsg[setting.key] || 'Save'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
