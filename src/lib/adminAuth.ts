import { supabase } from './supabase';

export interface AdminUser {
  id: string;
  auth_id: string | null;
  email: string;
  full_name: string;
  role: 'super_admin' | 'admin' | 'editor' | 'author';
  bio: string | null;
  avatar_url: string | null;
  specialty: string | null;
  twitter: string | null;
  linkedin: string | null;
  is_active: boolean;
}

export const adminAuth = {
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { user: null, adminUser: null, error: error.message };

    const { data: adminUser, error: adminError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('is_active', true)
      .maybeSingle();

    if (adminError || !adminUser) {
      await supabase.auth.signOut();
      return { user: null, adminUser: null, error: 'You do not have admin access.' };
    }

    if (!['super_admin', 'admin', 'editor', 'author'].includes(adminUser.role)) {
      await supabase.auth.signOut();
      return { user: null, adminUser: null, error: 'Insufficient permissions.' };
    }

    return { user: data.user, adminUser, error: null };
  },

  signOut: async () => {
    await supabase.auth.signOut();
  },

  getCurrentAdmin: async (): Promise<AdminUser | null> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('email', user.email)
      .eq('is_active', true)
      .maybeSingle();

    return data as AdminUser | null;
  },
};

export const adminApi = {
  articles: {
    getAll: () =>
      supabase
        .from('articles')
        .select('id, title, category_name, status, author, author_id, publish_date, view_count, views, featured_image, created_at')
        .order('created_at', { ascending: false }),

    getByAuthor: (authorId: string) =>
      supabase
        .from('articles')
        .select('*')
        .eq('author_id', authorId)
        .order('created_at', { ascending: false }),

    getById: (id: string) =>
      supabase.from('articles').select('*').eq('id', id).maybeSingle(),

    create: (article: any) =>
      supabase.from('articles').insert(article).select().single(),

    update: (id: string, updates: any) =>
      supabase.from('articles').update(updates).eq('id', id).select().single(),

    delete: (id: string) =>
      supabase.from('articles').delete().eq('id', id),
  },

  categories: {
    getAll: () => supabase.from('categories').select('*').order('name'),
  },

  tags: {
    getAll: () => supabase.from('tags').select('*').order('name'),
    create: (name: string, slug: string) =>
      supabase.from('tags').insert({ name, slug }).select().single(),
  },

  videos: {
    getAll: () =>
      supabase.from('videos').select('*').order('created_at', { ascending: false }),

    getByAdmin: (adminId: string) =>
      supabase.from('videos').select('*').eq('admin_id', adminId).order('created_at', { ascending: false }),

    getById: (id: string) =>
      supabase.from('videos').select('*').eq('id', id).maybeSingle(),

    create: (video: any) =>
      supabase.from('videos').insert(video).select().single(),

    update: (id: string, updates: any) =>
      supabase.from('videos').update(updates).eq('id', id).select().single(),

    delete: (id: string) =>
      supabase.from('videos').delete().eq('id', id),
  },

  podcasts: {
    getAll: () =>
      supabase.from('podcast_episodes').select('*').order('created_at', { ascending: false }),

    getByAdmin: (adminId: string) =>
      supabase.from('podcast_episodes').select('*').eq('admin_id', adminId).order('created_at', { ascending: false }),

    getById: (id: string) =>
      supabase.from('podcast_episodes').select('*').eq('id', id).maybeSingle(),

    create: (episode: any) =>
      supabase.from('podcast_episodes').insert(episode).select().single(),

    update: (id: string, updates: any) =>
      supabase.from('podcast_episodes').update(updates).eq('id', id).select().single(),

    delete: (id: string) =>
      supabase.from('podcast_episodes').delete().eq('id', id),
  },

  tvShows: {
    getAll: () =>
      supabase.from('tv_shows').select('*').order('created_at', { ascending: false }),

    getByAdmin: (adminId: string) =>
      supabase.from('tv_shows').select('*').eq('admin_id', adminId).order('created_at', { ascending: false }),

    getById: (id: string) =>
      supabase.from('tv_shows').select('*').eq('id', id).maybeSingle(),

    create: (show: any) =>
      supabase.from('tv_shows').insert(show).select().single(),

    update: (id: string, updates: any) =>
      supabase.from('tv_shows').update(updates).eq('id', id).select().single(),

    delete: (id: string) =>
      supabase.from('tv_shows').delete().eq('id', id),
  },

  analytics: {
    getArticleViews: (articleId: string) =>
      supabase.from('article_views').select('*', { count: 'exact' }).eq('article_id', articleId),

    getComments: (status?: string) => {
      let query = supabase.from('article_comments').select('*, articles(title)').order('created_at', { ascending: false });
      if (status) query = query.eq('status', status);
      return query;
    },

    updateCommentStatus: (id: string, status: string) =>
      supabase.from('article_comments').update({ status }).eq('id', id),
  },

  superAdmin: {
    getAllUsers: () =>
      supabase.from('users').select('*').order('created_at', { ascending: false }),

    createUser: (user: any) =>
      supabase.from('users').insert(user).select().single(),

    updateUser: (id: string, updates: any) =>
      supabase.from('users').update(updates).eq('id', id),

    getAllArticles: () =>
      supabase
        .from('articles')
        .select('id, title, category_name, status, author, author_id, publish_date, view_count, views, created_at, users(full_name)')
        .order('created_at', { ascending: false }),

    getMainArticles: () =>
      supabase.from('main_articles').select('*, articles(*)'),

    setMainArticle: async (articleId: string, position: 'main' | 'second') => {
      await supabase.from('main_articles').delete().eq('position', position);
      return supabase.from('main_articles').insert({ article_id: articleId, position }).select().single();
    },

    getFeaturedArticles: () =>
      supabase.from('featured_articles').select('*, articles(*)').order('display_order'),

    setFeaturedArticle: async (articleId: string, order: number) => {
      await supabase.from('featured_articles').delete().eq('display_order', order);
      return supabase.from('featured_articles').insert({ article_id: articleId, display_order: order }).select().single();
    },

    getEditorsPick: () =>
      supabase.from('editors_pick').select('*, articles(*)').order('display_order'),

    setEditorsPick: async (articleId: string, order: number) => {
      await supabase.from('editors_pick').delete().eq('display_order', order);
      return supabase.from('editors_pick').insert({ article_id: articleId, display_order: order }).select().single();
    },

    getTrending: () =>
      supabase.from('trending_articles').select('*, articles(*)').order('display_order'),

    setTrending: async (articleId: string, order: number) => {
      await supabase.from('trending_articles').delete().eq('display_order', order);
      return supabase.from('trending_articles').insert({ article_id: articleId, display_order: order }).select().single();
    },

    getSubscribers: () =>
      supabase.from('newsletter_subscribers').select('*').order('subscribed_at', { ascending: false }),

    getSettings: () =>
      supabase.from('site_settings').select('*').order('setting_key'),

    updateSetting: (key: string, value: any) =>
      supabase.from('site_settings').upsert({ setting_key: key, setting_value: value }).eq('setting_key', key),
  },
};
