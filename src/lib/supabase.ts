import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Please connect to Supabase using the "Connect to Supabase" button in the top right corner.');
}

export const supabase = createClient<Database>(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

// Database helper functions
export const db = {
  // Articles
  articles: {
    getAll: () => supabase.from('articles').select('*').eq('status', 'published'),
    getById: (id: string) => supabase.from('articles').select('*').eq('id', id).single(),
    create: async (article: any) => {
      try {
        // Remove any fields that don't exist in the database schema
        const { additionalImages, ...validFields } = article;
        
        // Ensure we have a session for authenticated operations
        const { data: session } = await supabase.auth.getSession();
        if (!session?.session) {
          // Try to create an anonymous session
          const { error: authError } = await supabase.auth.signInAnonymously();
          if (authError) {
            console.warn('Could not create anonymous session:', authError);
          }
        }
        
        const result = await supabase.from('articles').insert(validFields).select();
        return result;
      } catch (error) {
        console.error('Error in articles.create:', error);
        throw error;
      }
    },
    update: (id: string, updates: any) => {
      // Remove any fields that don't exist in the database schema
      const { additionalImages, ...validFields } = updates;
      return supabase.from('articles').update(validFields).eq('id', id).select();
    },
    delete: (id: string) => supabase.from('articles').delete().eq('id', id),
    getFeatured: () => supabase.from('articles').select('*').eq('featured', true).eq('status', 'published'),
    getTrending: () => supabase.from('articles').select('*').eq('trending', true).eq('status', 'published'),
    getByCategory: (category: string) => supabase.from('articles').select('*').eq('category_name', category).eq('status', 'published'),
    incrementViews: (id: string) => supabase.rpc('increment_article_views', { article_uuid: id }),
    getAllForAdmin: () => supabase.from('articles').select('*').order('created_at', { ascending: false })
  },

  // Article Images
  articleImages: {
    getByArticleId: (articleId: string) => supabase.from('article_images').select('*').eq('article_id', articleId).order('display_order'),
    create: (image: any) => supabase.from('article_images').insert(image),
    delete: (id: string) => supabase.from('article_images').delete().eq('id', id)
  },

  // Videos
  videos: {
    getAll: () => supabase.from('videos').select('*').eq('status', 'published'),
    getById: (id: string) => supabase.from('videos').select('*').eq('id', id).single(),
    getBySection: (section: string) => supabase.from('videos').select('*').eq('section', section).eq('status', 'published'),
    getWithSeasons: () => supabase.rpc('get_tv_episodes_with_season'),
    getBySeason: (seasonNumber: number) => supabase.rpc('get_tv_episodes_with_season', { season_filter: seasonNumber }),
    create: (video: any) => supabase.from('videos').insert(video),
    update: (id: string, updates: any) => supabase.from('videos').update(updates).eq('id', id),
    delete: (id: string) => supabase.from('videos').delete().eq('id', id),
    getAllForAdmin: () => supabase.from('videos').select(`
      *,
      tv_show_seasons(season_number, title)
    `).order('created_at', { ascending: false })
  },

  // Podcast Episodes
  podcasts: {
    getAll: () => supabase.from('podcast_episodes').select('*').eq('status', 'published'),
    getById: (id: string) => supabase.from('podcast_episodes').select('*').eq('id', id).single(),
    getWithGuests: () => supabase.rpc('get_podcast_episodes_with_guests'),
    getBySeries: (seriesId: string) => supabase.rpc('get_podcast_episodes_with_guests', { series_filter: seriesId }),
    create: (episode: any) => supabase.from('podcast_episodes').insert(episode),
    update: (id: string, updates: any) => supabase.from('podcast_episodes').update(updates).eq('id', id),
    delete: (id: string) => supabase.from('podcast_episodes').delete().eq('id', id),
    getAllForAdmin: () => supabase.from('podcast_episodes').select(`
      *,
      guest_profiles(full_name, title, bio, avatar_url),
      podcast_series(title)
    `).order('created_at', { ascending: false })
  },

  // TV Show Seasons
  tvSeasons: {
    getAll: async () => {
      try {
        const result = await supabase.from('tv_show_seasons').select('*').order('season_number');
        if (result.error && result.error.code === '42P01') {
          console.warn('tv_show_seasons table does not exist yet, returning empty data');
          return { data: [], error: null };
        }
        return result;
      } catch (error) {
        console.warn('Error fetching tv_show_seasons:', error);
        return { data: [], error: null };
      }
    },
    getById: async (id: string) => {
      try {
        const result = await supabase.from('tv_show_seasons').select('*').eq('id', id).single();
        if (result.error && result.error.code === '42P01') {
          console.warn('tv_show_seasons table does not exist yet');
          return { data: null, error: null };
        }
        return result;
      } catch (error) {
        console.warn('Error fetching tv_show_season:', error);
        return { data: null, error: null };
      }
    },
    create: (season: any) => supabase.from('tv_show_seasons').insert(season),
    update: (id: string, updates: any) => supabase.from('tv_show_seasons').update(updates).eq('id', id),
    delete: (id: string) => supabase.from('tv_show_seasons').delete().eq('id', id)
  },

  // Guest Profiles
  guests: {
    getAll: async () => {
      try {
        const result = await supabase.from('guest_profiles').select('*').eq('is_active', true).order('full_name');
        if (result.error && result.error.code === '42P01') {
          console.warn('guest_profiles table does not exist yet, returning empty data');
          return { data: [], error: null };
        }
        return result;
      } catch (error) {
        console.warn('Error fetching guest_profiles:', error);
        return { data: [], error: null };
      }
    },
    getById: async (id: string) => {
      try {
        const result = await supabase.from('guest_profiles').select('*').eq('id', id).single();
        if (result.error && result.error.code === '42P01') {
          console.warn('guest_profiles table does not exist yet');
          return { data: null, error: null };
        }
        return result;
      } catch (error) {
        console.warn('Error fetching guest_profile:', error);
        return { data: null, error: null };
      }
    },
    create: (guest: any) => supabase.from('guest_profiles').insert(guest),
    update: (id: string, updates: any) => supabase.from('guest_profiles').update(updates).eq('id', id),
    delete: (id: string) => supabase.from('guest_profiles').delete().eq('id', id),
    getAllForAdmin: async () => {
      try {
        const result = await supabase.from('guest_profiles').select('*').order('created_at', { ascending: false });
        if (result.error && result.error.code === '42P01') {
          console.warn('guest_profiles table does not exist yet, returning empty data');
          return { data: [], error: null };
        }
        return result;
      } catch (error) {
        console.warn('Error fetching guest_profiles for admin:', error);
        return { data: [], error: null };
      }
    }
  },

  // Podcast Series
  podcastSeries: {
    getAll: async () => {
      try {
        const result = await supabase.from('podcast_series').select('*').eq('is_active', true).order('title');
        if (result.error && result.error.code === '42P01') {
          console.warn('podcast_series table does not exist yet, returning empty data');
          return { data: [], error: null };
        }
        return result;
      } catch (error) {
        console.warn('Error fetching podcast_series:', error);
        return { data: [], error: null };
      }
    },
    getById: async (id: string) => {
      try {
        const result = await supabase.from('podcast_series').select('*').eq('id', id).single();
        if (result.error && result.error.code === '42P01') {
          console.warn('podcast_series table does not exist yet');
          return { data: null, error: null };
        }
        return result;
      } catch (error) {
        console.warn('Error fetching podcast_series:', error);
        return { data: null, error: null };
      }
    },
    create: (series: any) => supabase.from('podcast_series').insert(series),
    update: (id: string, updates: any) => supabase.from('podcast_series').update(updates).eq('id', id),
    delete: (id: string) => supabase.from('podcast_series').delete().eq('id', id)
  },

  // Users
  users: {
    getAll: () => supabase.from('users').select('*'),
    getById: (id: string) => supabase.from('users').select('*').eq('id', id).single(),
    getAuthors: () => supabase.from('users').select('*').eq('is_active', true).in('role', ['author', 'editor']),
    create: (user: any) => supabase.from('users').insert(user),
    update: (id: string, updates: any) => supabase.from('users').update(updates).eq('id', id),
    delete: (id: string) => supabase.from('users').delete().eq('id', id)
  },

  // Analytics
  analytics: {
    recordArticleView: (data: any) => supabase.from('article_views').insert(data),
    recordVideoView: (data: any) => supabase.from('video_analytics').insert(data),
    recordPodcastListen: (data: any) => supabase.from('podcast_analytics').insert(data),
    getDailyStats: (date: string) => supabase.from('analytics_data').select('*').eq('metric_date', date),
    getTrendingArticles: (days: number = 7) => supabase.rpc('get_trending_articles', { days_back: days }),
    getPopularContent: (type: string, days: number = 30) => supabase.rpc('get_popular_content', { content_type: type, days_back: days })
  },

  // Comments
  comments: {
    getByArticleId: (articleId: string) => supabase.from('article_comments').select('*').eq('article_id', articleId).eq('status', 'approved').order('created_at'),
    create: (comment: any) => supabase.from('article_comments').insert(comment),
    updateStatus: (id: string, status: string) => supabase.from('article_comments').update({ status }).eq('id', id),
    delete: (id: string) => supabase.from('article_comments').delete().eq('id', id)
  },

  // Newsletter
  newsletter: {
    subscribe: (email: string, name?: string) => supabase.from('newsletter_subscribers').insert({ email, full_name: name }),
    unsubscribe: (email: string) => supabase.from('newsletter_subscribers').update({ status: 'unsubscribed', unsubscribed_at: new Date().toISOString() }).eq('email', email),
    getSubscribers: () => supabase.from('newsletter_subscribers').select('*').eq('status', 'active')
  },

  // Site Settings
  settings: {
    getAll: () => supabase.from('site_settings').select('*'),
    getPublic: () => supabase.from('site_settings').select('*').eq('is_public', true),
    getBySetting: (key: string) => supabase.from('site_settings').select('*').eq('setting_key', key).single(),
    update: (key: string, value: any) => supabase.from('site_settings').update({ setting_value: value }).eq('setting_key', key)
  },

  // Content Management
  content: {
    getMainArticles: () => supabase.from('main_articles').select('*, articles(*)').order('position'),
    getFeaturedArticles: () => supabase.from('featured_articles').select('*, articles(*)').order('display_order'),
    getEditorsPickArticles: () => supabase.from('editors_pick').select('*, articles(*)').order('display_order'),
    getTrendingArticles: () => supabase.from('trending_articles').select('*, articles(*)').order('display_order'),
    setMainArticle: (articleId: string, position: string) => {
      if (!articleId) {
        // Remove main article
        return supabase.from('main_articles').delete().eq('position', position);
      }
      // Set or update main article
      return supabase.from('main_articles').upsert({ article_id: articleId, position }, { onConflict: 'position' });
    },
    removeMainArticle: (position: string) => supabase.from('main_articles').delete().eq('position', position),
    addToFeatured: (articleId: string, order: number) => supabase.from('featured_articles').upsert({ article_id: articleId, display_order: order }),
    addToEditorsPick: (articleId: string, order: number) => supabase.from('editors_pick').upsert({ article_id: articleId, display_order: order }),
    addToTrending: (articleId: string, order: number) => supabase.from('trending_articles').upsert({ article_id: articleId, display_order: order })
  }
};