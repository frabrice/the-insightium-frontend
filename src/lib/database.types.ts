export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      analytics_data: {
        Row: {
          additional_data: Json | null
          created_at: string | null
          id: string
          metric_date: string
          metric_name: string
          metric_value: number
        }
        Insert: {
          additional_data?: Json | null
          created_at?: string | null
          id?: string
          metric_date: string
          metric_name: string
          metric_value: number
        }
        Update: {
          additional_data?: Json | null
          created_at?: string | null
          id?: string
          metric_date?: string
          metric_name?: string
          metric_value?: number
        }
        Relationships: []
      }
      article_comments: {
        Row: {
          article_id: string | null
          author_email: string
          author_name: string
          content: string
          created_at: string | null
          id: string
          parent_comment_id: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          article_id?: string | null
          author_email: string
          author_name: string
          content: string
          created_at?: string | null
          id?: string
          parent_comment_id?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          article_id?: string | null
          author_email?: string
          author_name?: string
          content?: string
          created_at?: string | null
          id?: string
          parent_comment_id?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "article_comments_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "article_comments_parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            isOneToOne: false
            referencedRelation: "article_comments"
            referencedColumns: ["id"]
          }
        ]
      }
      article_images: {
        Row: {
          alt_text: string
          article_id: string | null
          caption: string | null
          created_at: string | null
          display_order: number | null
          id: string
          image_url: string
          updated_at: string | null
        }
        Insert: {
          alt_text: string
          article_id?: string | null
          caption?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          image_url: string
          updated_at?: string | null
        }
        Update: {
          alt_text?: string
          article_id?: string | null
          caption?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          image_url?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "article_images_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          }
        ]
      }
      article_views: {
        Row: {
          article_id: string | null
          id: string
          referrer: string | null
          user_agent: string | null
          viewed_at: string | null
          viewer_city: string | null
          viewer_country: string | null
          viewer_ip: string | null
        }
        Insert: {
          article_id?: string | null
          id?: string
          referrer?: string | null
          user_agent?: string | null
          viewed_at?: string | null
          viewer_city?: string | null
          viewer_country?: string | null
          viewer_ip?: string | null
        }
        Update: {
          article_id?: string | null
          id?: string
          referrer?: string | null
          user_agent?: string | null
          viewed_at?: string | null
          viewer_city?: string | null
          viewer_country?: string | null
          viewer_ip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "article_views_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          }
        ]
      }
      articles: {
        Row: {
          allow_comments: boolean | null
          author: string
          author_bio: string | null
          category_id: string | null
          category_name: string
          content: string
          created_at: string | null
          excerpt: string
          featured: boolean | null
          featured_image: string
          featured_image_alt: string | null
          id: string
          meta_description: string | null
          publish_date: string
          read_time: string | null
          status: string
          subtitle: string | null
          tags: string | null
          title: string
          trending: boolean | null
          updated_at: string | null
          views: string | null
        }
        Insert: {
          allow_comments?: boolean | null
          author: string
          author_bio?: string | null
          category_id?: string | null
          category_name: string
          content: string
          created_at?: string | null
          excerpt: string
          featured?: boolean | null
          featured_image: string
          featured_image_alt?: string | null
          id?: string
          meta_description?: string | null
          publish_date: string
          read_time?: string | null
          status: string
          subtitle?: string | null
          tags?: string | null
          title: string
          trending?: boolean | null
          updated_at?: string | null
          views?: string | null
        }
        Update: {
          allow_comments?: boolean | null
          author?: string
          author_bio?: string | null
          category_id?: string | null
          category_name?: string
          content?: string
          created_at?: string | null
          excerpt?: string
          featured?: boolean | null
          featured_image?: string
          featured_image_alt?: string | null
          id?: string
          meta_description?: string | null
          publish_date?: string
          read_time?: string | null
          status?: string
          subtitle?: string | null
          tags?: string | null
          title?: string
          trending?: boolean | null
          updated_at?: string | null
          views?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "articles_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          }
        ]
      }
      categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      content_schedule: {
        Row: {
          content_id: string
          content_type: string
          created_at: string | null
          created_by: string | null
          id: string
          scheduled_date: string
          status: string
          updated_at: string | null
        }
        Insert: {
          content_id: string
          content_type: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          scheduled_date: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          content_id?: string
          content_type?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          scheduled_date?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_schedule_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      editors_pick: {
        Row: {
          article_id: string
          created_at: string | null
          display_order: number
          id: string
          updated_at: string | null
        }
        Insert: {
          article_id: string
          created_at?: string | null
          display_order: number
          id?: string
          updated_at?: string | null
        }
        Update: {
          article_id?: string
          created_at?: string | null
          display_order?: number
          id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "editors_pick_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          }
        ]
      }
      featured_articles: {
        Row: {
          article_id: string
          created_at: string | null
          display_order: number
          id: string
          updated_at: string | null
        }
        Insert: {
          article_id: string
          created_at?: string | null
          display_order: number
          id?: string
          updated_at?: string | null
        }
        Update: {
          article_id?: string
          created_at?: string | null
          display_order?: number
          id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "featured_articles_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          }
        ]
      }
      main_articles: {
        Row: {
          article_id: string
          created_at: string | null
          id: string
          position: string
          updated_at: string | null
        }
        Insert: {
          article_id: string
          created_at?: string | null
          id?: string
          position: string
          updated_at?: string | null
        }
        Update: {
          article_id?: string
          created_at?: string | null
          id?: string
          position?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "main_articles_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          }
        ]
      }
      newsletter_subscribers: {
        Row: {
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          status: string
          subscribed_at: string | null
          subscription_source: string | null
          unsubscribed_at: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name?: string | null
          id?: string
          status?: string
          subscribed_at?: string | null
          subscription_source?: string | null
          unsubscribed_at?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          status?: string
          subscribed_at?: string | null
          subscription_source?: string | null
          unsubscribed_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      podcast_analytics: {
        Row: {
          completion_rate: number | null
          episode_id: string | null
          id: string
          listen_duration: number | null
          listened_at: string | null
          listener_country: string | null
          listener_ip: string | null
          platform: string | null
        }
        Insert: {
          completion_rate?: number | null
          episode_id?: string | null
          id?: string
          listen_duration?: number | null
          listened_at?: string | null
          listener_country?: string | null
          listener_ip?: string | null
          platform?: string | null
        }
        Update: {
          completion_rate?: number | null
          episode_id?: string | null
          id?: string
          listen_duration?: number | null
          listened_at?: string | null
          listener_country?: string | null
          listener_ip?: string | null
          platform?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "podcast_analytics_episode_id_fkey"
            columns: ["episode_id"]
            isOneToOne: false
            referencedRelation: "podcast_episodes"
            referencedColumns: ["id"]
          }
        ]
      }
      podcast_episodes: {
        Row: {
          created_at: string | null
          description: string
          downloads: string | null
          duration: string
          guest: string
          id: string
          image: string
          plays: string | null
          publish_date: string
          status: string
          title: string
          updated_at: string | null
          youtube_url: string
        }
        Insert: {
          created_at?: string | null
          description: string
          downloads?: string | null
          duration: string
          guest: string
          id?: string
          image: string
          plays?: string | null
          publish_date: string
          status: string
          title: string
          updated_at?: string | null
          youtube_url: string
        }
        Update: {
          created_at?: string | null
          description?: string
          downloads?: string | null
          duration?: string
          guest?: string
          id?: string
          image?: string
          plays?: string | null
          publish_date?: string
          status?: string
          title?: string
          updated_at?: string | null
          youtube_url?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_public: boolean | null
          setting_key: string
          setting_type: string
          setting_value: Json
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          setting_key: string
          setting_type: string
          setting_value: Json
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          setting_key?: string
          setting_type?: string
          setting_value?: Json
          updated_at?: string | null
        }
        Relationships: []
      }
      trending_articles: {
        Row: {
          article_id: string
          created_at: string | null
          display_order: number
          id: string
          updated_at: string | null
        }
        Insert: {
          article_id: string
          created_at?: string | null
          display_order: number
          id?: string
          updated_at?: string | null
        }
        Update: {
          article_id?: string
          created_at?: string | null
          display_order?: number
          id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trending_articles_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          email: string
          full_name: string
          id: string
          is_active: boolean | null
          last_login: string | null
          role: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          role?: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          role?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      video_analytics: {
        Row: {
          completion_rate: number | null
          id: string
          referrer: string | null
          video_id: string | null
          viewer_country: string | null
          viewer_ip: string | null
          watch_duration: number | null
          watched_at: string | null
        }
        Insert: {
          completion_rate?: number | null
          id?: string
          referrer?: string | null
          video_id?: string | null
          viewer_country?: string | null
          viewer_ip?: string | null
          watch_duration?: number | null
          watched_at?: string | null
        }
        Update: {
          completion_rate?: number | null
          id?: string
          referrer?: string | null
          video_id?: string | null
          viewer_country?: string | null
          viewer_ip?: string | null
          watch_duration?: number | null
          watched_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "video_analytics_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "videos"
            referencedColumns: ["id"]
          }
        ]
      }
      videos: {
        Row: {
          category: string
          created_at: string | null
          description: string
          duration: string
          id: string
          is_new: boolean | null
          rating: number | null
          section: string
          status: string
          thumbnail: string
          title: string
          updated_at: string | null
          upload_date: string
          views: string | null
          youtube_url: string
        }
        Insert: {
          category: string
          created_at?: string | null
          description: string
          duration: string
          id?: string
          is_new?: boolean | null
          rating?: number | null
          section: string
          status: string
          thumbnail: string
          title: string
          updated_at?: string | null
          upload_date: string
          views?: string | null
          youtube_url: string
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string
          duration?: string
          id?: string
          is_new?: boolean | null
          rating?: number | null
          section?: string
          status?: string
          thumbnail?: string
          title?: string
          updated_at?: string | null
          upload_date?: string
          views?: string | null
          youtube_url?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_popular_content: {
        Args: {
          content_type: string
          days_back?: number
          limit_count?: number
        }
        Returns: {
          content_id: string
          title: string
          views_or_plays: number
        }[]
      }
      get_trending_articles: {
        Args: {
          days_back?: number
          limit_count?: number
        }
        Returns: {
          article_id: string
          title: string
          view_count: number
        }[]
      }
      increment_article_views: {
        Args: {
          article_uuid: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}