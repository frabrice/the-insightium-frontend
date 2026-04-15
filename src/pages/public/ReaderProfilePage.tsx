import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { User, Bookmark, Settings, Save, AlertCircle } from 'lucide-react';
import { useReaderAuth } from '../../contexts/ReaderAuthContext';
import { publicApi } from '../../lib/publicApi';
import type { Article } from '../../lib/publicApi';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';

const TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark },
];

export default function ReaderProfilePage() {
  const { user, profile, updateProfile, setShowAuthModal, isLoading } = useReaderAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'profile');
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [loadingBookmarks, setLoadingBookmarks] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      setShowAuthModal(true);
      navigate('/');
    }
  }, [user, isLoading]);

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name || '');
      setBio(profile.bio || '');
      setAvatarUrl(profile.avatar_url || '');
    }
  }, [profile]);

  useEffect(() => {
    if (user && activeTab === 'bookmarks') {
      setLoadingBookmarks(true);
      publicApi.bookmarks.getForUser(user.id).then(({ data }) => {
        setBookmarks(data || []);
        setLoadingBookmarks(false);
      });
    }
  }, [user, activeTab]);

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    const { error } = await updateProfile({ display_name: displayName, bio: bio || null, avatar_url: avatarUrl || null });
    setIsSaving(false);
    setSaveMsg(error ? 'Failed to save. Try again.' : 'Profile saved!');
    setTimeout(() => setSaveMsg(''), 3000);
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-cream dark:bg-brand-black flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-brand-red border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-brand-cream dark:bg-brand-black page-enter">
      <div className="bg-brand-black py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 animate-fade-up">
            <div className="w-16 h-16 rounded-full bg-brand-red flex items-center justify-center text-white font-bold text-2xl">
              {(profile?.display_name || user.email || 'R')[0].toUpperCase()}
            </div>
            <div>
              <h1 className="font-display font-bold text-white text-2xl">{profile?.display_name || 'My Profile'}</h1>
              <p className="text-neutral-400 text-sm">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-1 border-b border-neutral-200 dark:border-neutral-700 mb-8">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-brand-red border-b-2 border-brand-red -mb-px'
                  : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'profile' && (
          <div className="max-w-lg animate-fade-up">
            <h2 className="font-display font-bold text-brand-black dark:text-white text-xl mb-6">Edit Profile</h2>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1.5">Display Name *</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={e => setDisplayName(e.target.value)}
                  required
                  className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-brand-black dark:text-white text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1.5">Avatar URL</label>
                <input
                  type="url"
                  value={avatarUrl}
                  onChange={e => setAvatarUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-brand-black dark:text-white text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1.5">Bio</label>
                <textarea
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  rows={3}
                  placeholder="Tell us about yourself..."
                  className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-brand-black dark:text-white text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red transition-colors resize-none"
                />
              </div>
              {saveMsg && (
                <p className={`text-xs font-medium ${saveMsg.includes('Failed') ? 'text-red-500' : 'text-green-600 dark:text-green-400'}`}>
                  {saveMsg}
                </p>
              )}
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center gap-2 bg-brand-red text-white px-5 py-2.5 text-sm font-medium rounded-sm hover:bg-brand-red-dark transition-colors disabled:opacity-60"
              >
                {isSaving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={14} />}
                Save Profile
              </button>
            </form>
          </div>
        )}

        {activeTab === 'bookmarks' && (
          <div className="animate-fade-up">
            <h2 className="font-display font-bold text-brand-black dark:text-white text-xl mb-6">
              Saved Articles ({bookmarks.length})
            </h2>
            {loadingBookmarks ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-24 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
                ))}
              </div>
            ) : bookmarks.length === 0 ? (
              <div className="text-center py-16">
                <Bookmark size={40} className="mx-auto mb-4 text-neutral-300 dark:text-neutral-600" />
                <p className="font-display font-bold text-brand-black dark:text-white mb-2">No saved articles yet</p>
                <p className="text-neutral-500 text-sm mb-4">Bookmark articles you want to read later.</p>
                <Link to="/magazine" className="text-brand-red text-sm hover:underline">Browse Magazine</Link>
              </div>
            ) : (
              <div className="space-y-3">
                {bookmarks.map((bm: any) => {
                  const article = bm.articles as Article;
                  if (!article) return null;
                  return (
                    <Link
                      key={bm.article_id}
                      to={`/article/${article.id}`}
                      className="group flex gap-4 bg-white dark:bg-neutral-900 p-4 rounded-sm border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700 transition-all"
                    >
                      {article.featured_image && (
                        <div className="w-20 h-20 flex-shrink-0 rounded-sm overflow-hidden img-zoom">
                          <img src={article.featured_image} alt={article.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <span className="text-label text-brand-red text-[9px]">{article.category_name}</span>
                        <h4 className="font-display font-semibold text-brand-black dark:text-white text-sm leading-snug mt-0.5 line-clamp-2 group-hover:text-brand-red transition-colors">
                          {article.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1.5 text-xs text-neutral-500">
                          <span>{article.author}</span>
                          <span className="flex items-center gap-1"><Clock size={10} /> {article.read_time}</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
