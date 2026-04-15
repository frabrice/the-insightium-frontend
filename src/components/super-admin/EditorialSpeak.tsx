import React, { useEffect, useState } from 'react';
import { Search, CheckCircle, X, RefreshCw } from 'lucide-react';
import { adminApi } from '../../lib/adminAuth';

interface Article {
  id: string;
  title: string;
  author: string;
  category_name: string;
  featured_image: string | null;
  status: string;
}

interface CurationSlot {
  label: string;
  key: string;
  description: string;
  count: number;
}

const SLOTS: CurationSlot[] = [
  { label: 'Main Article', key: 'main', description: 'The primary hero article on the homepage', count: 1 },
  { label: 'Second Main', key: 'second', description: 'Featured alongside the main hero', count: 1 },
  { label: "Editor's Pick", key: 'editors_pick', description: 'Hand-selected by editors — 4 articles', count: 4 },
  { label: 'Trending', key: 'trending', description: 'Trending articles section — 6 articles', count: 6 },
  { label: 'Featured', key: 'featured', description: 'Featured articles grid — 5 articles', count: 5 },
];

export default function EditorialSpeak() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [search, setSearch] = useState('');
  const [activeSlot, setActiveSlot] = useState<string>('main');
  const [curations, setCurations] = useState<Record<string, any[]>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [saveMsg, setSaveMsg] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [articlesRes, mainRes, editorsRes, trendingRes, featuredRes] = await Promise.all([
        adminApi.superAdmin.getAllArticles(),
        adminApi.superAdmin.getMainArticles(),
        adminApi.superAdmin.getEditorsPick(),
        adminApi.superAdmin.getTrending(),
        adminApi.superAdmin.getFeaturedArticles(),
      ]);

      setArticles((articlesRes.data || []).filter((a: any) => a.status === 'published'));
      setCurations({
        main: mainRes.data || [],
        second: mainRes.data || [],
        editors_pick: editorsRes.data || [],
        trending: trendingRes.data || [],
        featured: featuredRes.data || [],
      });
      setIsLoading(false);
    }
    loadData();
  }, []);

  const filtered = articles.filter(a =>
    !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.author?.toLowerCase().includes(search.toLowerCase())
  );

  const currentSlot = SLOTS.find(s => s.key === activeSlot)!;

  async function handleAssign(article: Article, position: number) {
    setSaving(`${activeSlot}-${position}`);

    try {
      if (activeSlot === 'main' || activeSlot === 'second') {
        await adminApi.superAdmin.setMainArticle(article.id, activeSlot as 'main' | 'second');
      } else if (activeSlot === 'editors_pick') {
        await adminApi.superAdmin.setEditorsPick(article.id, position);
      } else if (activeSlot === 'trending') {
        await adminApi.superAdmin.setTrending(article.id, position);
      } else if (activeSlot === 'featured') {
        await adminApi.superAdmin.setFeaturedArticle(article.id, position);
      }
      setSaveMsg('Updated!');
      setTimeout(() => setSaveMsg(''), 2000);
    } catch {
      setSaveMsg('Failed to update.');
    }

    setSaving(null);
  }

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[...Array(4)].map((_, i) => <div key={i} className="h-16 bg-neutral-800 rounded-sm" />)}
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display font-bold text-white text-2xl">Editorial Speak</h1>
          <p className="text-neutral-500 text-sm mt-1">Curate which articles appear in featured sections on the homepage</p>
        </div>
        {saveMsg && (
          <span className={`text-xs font-medium px-3 py-1.5 rounded-sm ${saveMsg.includes('Failed') ? 'text-red-400 bg-red-900/20' : 'text-green-400 bg-green-900/20'}`}>
            {saveMsg}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">
        <div className="space-y-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-sm overflow-hidden">
            <div className="flex overflow-x-auto border-b border-neutral-800">
              {SLOTS.map(slot => (
                <button
                  key={slot.key}
                  onClick={() => setActiveSlot(slot.key)}
                  className={`flex-shrink-0 px-4 py-3 text-sm font-medium transition-colors ${
                    activeSlot === slot.key
                      ? 'text-brand-red border-b-2 border-brand-red -mb-px bg-neutral-900'
                      : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  {slot.label}
                </button>
              ))}
            </div>

            <div className="p-4">
              <p className="text-xs text-neutral-500 mb-4">{currentSlot.description}</p>
              <div className="grid gap-2">
                {Array.from({ length: currentSlot.count }, (_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 border border-dashed border-neutral-700 rounded-sm bg-neutral-800/30 min-h-[56px]"
                  >
                    <span className="text-[10px] font-bold text-neutral-600 w-5 text-center">{i + 1}</span>
                    <div className="flex-1 text-xs text-neutral-600 italic">
                      Click an article on the right to assign it to position {i + 1}
                    </div>
                    {saving === `${activeSlot}-${i + 1}` && (
                      <RefreshCw size={12} className="text-brand-red animate-spin" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-sm overflow-hidden flex flex-col max-h-[600px]">
          <div className="p-3 border-b border-neutral-800">
            <div className="relative">
              <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search published articles..."
                className="w-full bg-neutral-800 border border-neutral-700 text-sm pl-8 pr-3 py-2 rounded-sm focus:outline-none focus:border-brand-red text-white placeholder:text-neutral-600"
              />
            </div>
          </div>

          <div className="overflow-y-auto flex-1 divide-y divide-neutral-800">
            {filtered.length === 0 ? (
              <div className="text-center py-10 text-neutral-600 text-sm">No published articles found</div>
            ) : (
              filtered.map((article, idx) => (
                <button
                  key={article.id}
                  onClick={() => handleAssign(article, 1)}
                  className="w-full flex items-start gap-3 p-3 text-left hover:bg-neutral-800 transition-colors group"
                >
                  {article.featured_image ? (
                    <div className="w-12 h-12 rounded flex-shrink-0 overflow-hidden bg-neutral-800">
                      <img src={article.featured_image} alt={article.title} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded flex-shrink-0 bg-neutral-800 flex items-center justify-center text-neutral-600 text-lg font-bold">
                      {idx + 1}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-neutral-300 group-hover:text-white transition-colors line-clamp-2 leading-snug">{article.title}</p>
                    <p className="text-[10px] text-neutral-600 mt-1">{article.author} · {article.category_name}</p>
                  </div>
                  <CheckCircle size={14} className="text-neutral-700 group-hover:text-brand-red transition-colors flex-shrink-0 mt-1" />
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
