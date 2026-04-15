import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const FALLBACK_CATEGORIES = [
  'Education', 'Technology', 'Innovation', 'Africa', 'Leadership',
  'Business', 'Culture', 'Science', 'Health', 'Environment',
  'Spirit of Africa', 'Tech Trends', 'Need to Know', 'Career Campus',
  'Mind and Body Quest', 'E! Corner',
];

export default function CategoryTicker() {
  const [categories, setCategories] = useState<string[]>(FALLBACK_CATEGORIES);

  useEffect(() => {
    async function loadCategories() {
      const { data } = await supabase.from('categories').select('id, name').limit(20);
      if (data && data.length > 0) {
        setCategories(data.map(c => c.name));
      }
    }
    loadCategories();
  }, []);

  const doubled = [...categories, ...categories];

  return (
    <div className="border-t border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm overflow-hidden h-10 flex items-center">
      <div className="flex items-center animate-ticker" style={{ width: 'max-content' }}>
        {doubled.map((cat, i) => (
          <React.Fragment key={i}>
            <Link
              to={`/search?category=${encodeURIComponent(cat)}`}
              className="text-label text-neutral-600 dark:text-neutral-400 hover:text-brand-red dark:hover:text-brand-red transition-colors whitespace-nowrap px-4 py-1 text-[10px]"
            >
              {cat}
            </Link>
            <span className="w-1 h-1 rounded-full bg-brand-red flex-shrink-0" />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
