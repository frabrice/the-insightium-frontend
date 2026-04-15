import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const FALLBACK_CATEGORIES = [
  { name: 'Education', href: '/magazine' },
  { name: 'Technology', href: '/magazine' },
  { name: 'Innovation', href: '/magazine' },
  { name: 'Africa', href: '/magazine' },
  { name: 'Leadership', href: '/magazine' },
  { name: 'Business', href: '/magazine' },
  { name: 'Culture', href: '/magazine' },
  { name: 'Science', href: '/magazine' },
  { name: 'TV Shows', href: '/tv-show' },
  { name: 'Podcasts', href: '/podcast' },
  { name: 'Health', href: '/magazine' },
  { name: 'Environment', href: '/magazine' },
];

interface Category {
  name: string;
  href: string;
}

export default function CategoryTicker() {
  const [categories, setCategories] = useState<Category[]>(FALLBACK_CATEGORIES);

  useEffect(() => {
    async function loadCategories() {
      const { data } = await supabase.from('categories').select('id, name').limit(20);
      if (data && data.length > 0) {
        const mapped = data.map(c => ({ name: c.name, href: `/magazine` }));
        const extra = [
          { name: 'TV Shows', href: '/tv-show' },
          { name: 'Podcasts', href: '/podcast' },
        ];
        setCategories([...mapped, ...extra]);
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
              to={cat.href}
              className="text-label text-neutral-600 dark:text-neutral-400 hover:text-brand-red dark:hover:text-brand-red transition-colors whitespace-nowrap px-4 py-1 text-[10px]"
            >
              {cat.name}
            </Link>
            <span className="w-1 h-1 rounded-full bg-brand-red flex-shrink-0" />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
