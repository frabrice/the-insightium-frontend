import { supabase } from './supabase';

export interface Article {
  id: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  category_id?: string;
  category_name: string;
  author: string;
  author_bio?: string;
  author_id?: string;
  publish_date: string;
  read_time?: string;
  tags?: string;
  featured_image: string;
  featured_image_alt?: string;
  status: string;
  featured: boolean;
  trending: boolean;
  view_count?: number;
  views?: string;
  gallery_images?: any[];
  slug?: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  views?: string;
  thumbnail: string;
  youtube_url: string;
  status: string;
  category: string;
  section: string;
  rating?: number;
  is_new?: boolean;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  guest: string;
  duration: string;
  plays?: string;
  downloads?: string;
  publish_date: string;
  status: string;
  youtube_url: string;
  audio_url?: string;
  description: string;
  image?: string;
  cover_image?: string;
  episode_number?: number;
}

export interface TVShow {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  status: string;
  total_seasons?: number;
  total_episodes?: number;
  rating?: number;
  genre?: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export const publicApi = {
  articles: {
    getAll: () =>
      supabase
        .from('articles')
        .select('id, title, subtitle, excerpt, category_name, author, publish_date, read_time, featured_image, featured_image_alt, status, featured, trending, views, tags')
        .eq('status', 'published')
        .order('publish_date', { ascending: false }),

    getById: (id: string) =>
      supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .maybeSingle(),

    getFeatured: () =>
      supabase
        .from('articles')
        .select('id, title, subtitle, excerpt, category_name, author, publish_date, read_time, featured_image, views, trending')
        .eq('status', 'published')
        .eq('featured', true)
        .order('publish_date', { ascending: false })
        .limit(6),

    getTrending: () =>
      supabase
        .from('articles')
        .select('id, title, subtitle, excerpt, category_name, author, publish_date, read_time, featured_image, views')
        .eq('status', 'published')
        .eq('trending', true)
        .order('publish_date', { ascending: false })
        .limit(8),

    getMainArticles: () =>
      supabase
        .from('main_articles')
        .select('position, article_id, articles(id, title, subtitle, excerpt, category_name, author, publish_date, read_time, featured_image, views, content)')
        .limit(2),

    getEditorsPick: () =>
      supabase
        .from('editors_pick')
        .select('display_order, article_id, articles(id, title, subtitle, excerpt, category_name, author, publish_date, read_time, featured_image)')
        .order('display_order')
        .limit(5),

    getFeaturedCurated: () =>
      supabase
        .from('featured_articles')
        .select('display_order, article_id, articles(id, title, subtitle, excerpt, category_name, author, publish_date, read_time, featured_image)')
        .order('display_order')
        .limit(3),

    search: (query: string) =>
      supabase
        .from('articles')
        .select('id, title, excerpt, category_name, author, publish_date, featured_image')
        .eq('status', 'published')
        .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,category_name.ilike.%${query}%`)
        .limit(20),

    getRelated: (categoryName: string, excludeId: string) =>
      supabase
        .from('articles')
        .select('id, title, excerpt, category_name, author, publish_date, featured_image, read_time')
        .eq('status', 'published')
        .eq('category_name', categoryName)
        .neq('id', excludeId)
        .limit(4),

    incrementView: (id: string) =>
      supabase.rpc('increment_article_views', { article_id: id }),
  },

  videos: {
    getAll: () =>
      supabase
        .from('videos')
        .select('*')
        .eq('status', 'published')
        .order('upload_date', { ascending: false }),

    getBySection: (section: string) =>
      supabase
        .from('videos')
        .select('*')
        .eq('status', 'published')
        .eq('section', section)
        .order('upload_date', { ascending: false }),

    getById: (id: string) =>
      supabase.from('videos').select('*').eq('id', id).maybeSingle(),
  },

  podcasts: {
    getAll: () =>
      supabase
        .from('podcast_episodes')
        .select('*')
        .eq('status', 'published')
        .order('publish_date', { ascending: false }),

    getById: (id: string) =>
      supabase.from('podcast_episodes').select('*').eq('id', id).maybeSingle(),
  },

  tvShows: {
    getAll: () =>
      supabase
        .from('tv_shows')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false }),

    getById: (id: string) =>
      supabase.from('tv_shows').select('*').eq('id', id).maybeSingle(),

    getSeasons: (tvShowId: string) =>
      supabase
        .from('tv_show_seasons')
        .select('*, tv_show_episodes(*)')
        .eq('tv_show_id', tvShowId)
        .order('season_number'),

    getEpisodes: (seasonId: string) =>
      supabase
        .from('tv_show_episodes')
        .select('*')
        .eq('season_id', seasonId)
        .eq('status', 'published')
        .order('episode_number'),
  },

  categories: {
    getAll: () =>
      supabase.from('categories').select('id, name, description').order('name'),
  },

  comments: {
    getByArticle: (articleId: string) =>
      supabase
        .from('article_comments')
        .select('*')
        .eq('article_id', articleId)
        .eq('status', 'approved')
        .order('created_at', { ascending: true }),

    create: (comment: {
      article_id: string;
      author_name: string;
      author_email: string;
      content: string;
      parent_comment_id?: string;
      reader_auth_id?: string;
    }) => supabase.from('article_comments').insert(comment).select().single(),
  },

  newsletter: {
    subscribe: (email: string, fullName?: string) =>
      supabase.from('newsletter_subscribers').insert({
        email,
        full_name: fullName || null,
        status: 'active',
        subscription_source: 'website',
      }),
  },

  bookmarks: {
    getForUser: (authId: string) =>
      supabase
        .from('bookmarks')
        .select('article_id, created_at, articles(id, title, excerpt, featured_image, category_name, publish_date, read_time, author)')
        .eq('reader_auth_id', authId),

    add: (authId: string, articleId: string) =>
      supabase.from('bookmarks').insert({ reader_auth_id: authId, article_id: articleId }),

    remove: (authId: string, articleId: string) =>
      supabase.from('bookmarks').delete().eq('reader_auth_id', authId).eq('article_id', articleId),

    check: (authId: string, articleId: string) =>
      supabase
        .from('bookmarks')
        .select('id')
        .eq('reader_auth_id', authId)
        .eq('article_id', articleId)
        .maybeSingle(),
  },
};
