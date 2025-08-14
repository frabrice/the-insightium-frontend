import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
export interface Article {
  id: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorBio?: string;
  publishDate: string;
  readTime?: string;
  tags?: string;
  featuredImage: string;
  featuredImageAlt?: string;
  metaDescription?: string;
  status: 'draft' | 'review' | 'published';
  allowComments: boolean;
  featured: boolean;
  trending: boolean;
  views: string;
  createdAt: string;
  updatedAt: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  views: string;
  uploadDate: string;
  thumbnail: string;
  youtubeUrl: string;
  status: 'draft' | 'published';
  category: string;
  section: string;
  rating?: number;
  isNew?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  guest: string;
  duration: string;
  plays: string;
  downloads: string;
  publishDate: string;
  status: 'draft' | 'published' | 'scheduled';
  youtubeUrl: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface DataContextType {
  // Articles
  articles: Article[];
  mainArticle: Article | null;
  secondMainArticle: Article | null;
  featuredArticles: Article[];
  editorsPickArticles: Article[];
  trendingArticles: Article[];
  otherArticles: Article[];
  
  // Videos
  videos: Video[];
  magazineVideos: Video[];
  tvShowVideos: Video[];
  tvSeasons: any[];
  
  // Podcasts
  podcastEpisodes: PodcastEpisode[];
  podcastGuests: any[];
  podcastSeries: any[];
  
  // Article methods
  getArticleById: (id: string) => Article | undefined;
  
  // Video methods
  getVideosByCategory: (category: string) => Video[];
  getVideosBySection: (section: string) => Video[];
  
  // Podcast methods
  getPodcastEpisodeById: (id: string) => PodcastEpisode | undefined;
  
  // TV Show methods
  getTVEpisodesBySeason: (seasonNumber: number) => Video[];
  
  // Podcast methods
  getPodcastEpisodesBySeries: (seriesId: string) => PodcastEpisode[];
  
  // Loading state
  isLoading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

// Dummy data
const dummyArticles: Article[] = [
  {
    id: '1',
    title: "The Future of African Education Technology",
    subtitle: "How AI and digital innovation are reshaping learning across the continent",
    excerpt: "Explore the groundbreaking technologies and innovative approaches that are transforming education in Africa, from AI-powered learning platforms to mobile-first solutions reaching remote communities.",
    content: "The landscape of education in Africa is undergoing a revolutionary transformation, driven by cutting-edge technology and innovative approaches that are reshaping how students learn and teachers teach across the continent...",
    category: "Tech Trends",
    author: "Dr. Amara Okafor",
    authorBio: "Education Technology Researcher at University of Cape Town",
    publishDate: "2024-03-15",
    readTime: "12 min read",
    tags: "AI, Education, Technology, Africa",
    featuredImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    featuredImageAlt: "Students using technology in classroom",
    metaDescription: "Discover how AI and digital innovation are transforming education across Africa",
    status: 'published',
    allowComments: true,
    featured: false,
    trending: false,
    views: "45.2K",
    createdAt: "2024-03-15T10:00:00Z",
    updatedAt: "2024-03-15T10:00:00Z"
  },
  {
    id: '2',
    title: "Women Leading Educational Innovation Across Africa",
    subtitle: "Celebrating the female pioneers transforming learning landscapes",
    excerpt: "Meet the remarkable women who are breaking barriers and creating new pathways in education, from grassroots initiatives to cutting-edge research that's changing lives across the continent.",
    content: "Across the African continent, women are at the forefront of educational innovation, leading transformative initiatives that are reshaping how we think about learning and teaching...",
    category: "Career Campus",
    author: "Sarah Mwangi",
    authorBio: "Gender & Education Policy Analyst",
    publishDate: "2024-03-12",
    readTime: "10 min read",
    tags: "Women, Leadership, Education, Innovation",
    featuredImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    featuredImageAlt: "African women in education leadership",
    metaDescription: "Celebrating female pioneers transforming education across Africa",
    status: 'published',
    allowComments: true,
    featured: false,
    trending: false,
    views: "38.7K",
    createdAt: "2024-03-12T10:00:00Z",
    updatedAt: "2024-03-12T10:00:00Z"
  },
  {
    id: '3',
    title: "Mental Health Support in Universities",
    excerpt: "Addressing the growing mental health challenges among students with innovative support systems and campus-wide initiatives.",
    content: "Universities across Africa are implementing comprehensive mental health support systems to address the growing challenges faced by students...",
    category: "Mind and Body Quest",
    author: "Dr. Sarah Ochieng",
    publishDate: "2024-03-10",
    readTime: "8 min read",
    featuredImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    status: 'published',
    allowComments: true,
    featured: true,
    trending: false,
    views: "32.1K",
    createdAt: "2024-03-10T10:00:00Z",
    updatedAt: "2024-03-10T10:00:00Z"
  },
  {
    id: '4',
    title: "Traditional Wisdom Meets Modern Learning",
    excerpt: "How indigenous knowledge systems are being integrated into contemporary educational frameworks across Africa.",
    content: "The integration of traditional wisdom with modern educational approaches is creating powerful learning experiences...",
    category: "Spirit of Africa",
    author: "Chief Amina Hassan",
    publishDate: "2024-03-08",
    readTime: "6 min read",
    featuredImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    status: 'published',
    allowComments: true,
    featured: true,
    trending: false,
    views: "28.9K",
    createdAt: "2024-03-08T10:00:00Z",
    updatedAt: "2024-03-08T10:00:00Z"
  },
  {
    id: '5',
    title: "The Rise of EdTech Startups in Africa",
    excerpt: "Young entrepreneurs are revolutionizing education through innovative technology solutions tailored for African contexts.",
    content: "A new generation of African entrepreneurs is creating innovative educational technology solutions...",
    category: "Tech Trends",
    author: "James Mwangi",
    publishDate: "2024-03-05",
    readTime: "7 min read",
    featuredImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    status: 'published',
    allowComments: true,
    featured: true,
    trending: false,
    views: "41.3K",
    createdAt: "2024-03-05T10:00:00Z",
    updatedAt: "2024-03-05T10:00:00Z"
  },
  {
    id: '6',
    title: "Revolutionary Teaching Methods Transforming African Classrooms",
    excerpt: "Innovative pedagogical approaches that are changing how students learn and engage with educational content.",
    content: "Across African classrooms, revolutionary teaching methods are transforming the educational experience...",
    category: "Research World",
    author: "Prof. Kwame Asante",
    publishDate: "2024-03-03",
    readTime: "9 min read",
    featuredImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    status: 'published',
    allowComments: true,
    featured: false,
    trending: true,
    views: "35.7K",
    createdAt: "2024-03-03T10:00:00Z",
    updatedAt: "2024-03-03T10:00:00Z"
  },
  {
    id: '7',
    title: "Digital Literacy for Rural Communities",
    excerpt: "Bridging the digital divide through innovative educational programs in remote areas.",
    content: "Rural communities across Africa are gaining access to digital literacy programs...",
    category: "Tech Trends",
    author: "Dr. Kemi Adebayo",
    publishDate: "2024-03-01",
    readTime: "6 min read",
    featuredImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    status: 'published',
    allowComments: true,
    featured: false,
    trending: true,
    views: "18.3K",
    createdAt: "2024-03-01T10:00:00Z",
    updatedAt: "2024-03-01T10:00:00Z"
  }
];

const dummyVideos: Video[] = [
  {
    id: 'v1',
    title: "The Future of Education in Africa",
    description: "A comprehensive look at educational transformation across the continent",
    duration: "25:30",
    views: "125K",
    uploadDate: "2024-03-15",
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://youtube.com/watch?v=example1",
    status: 'published',
    category: "Tech Trends",
    section: "Magazine",
    rating: 4.8,
    isNew: true,
    createdAt: "2024-03-15T10:00:00Z",
    updatedAt: "2024-03-15T10:00:00Z"
  },
  {
    id: 'v2',
    title: "Digital Learning Revolution",
    description: "How technology is reshaping classrooms worldwide",
    duration: "18:45",
    views: "98K",
    uploadDate: "2024-03-12",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://youtube.com/watch?v=example2",
    status: 'published',
    category: "Tech Trends",
    section: "Magazine",
    rating: 4.6,
    isNew: false,
    createdAt: "2024-03-12T10:00:00Z",
    updatedAt: "2024-03-12T10:00:00Z"
  },
  {
    id: 'v3',
    title: "Women in STEM Education",
    description: "Inspiring stories of female leaders in science and technology education",
    duration: "22:15",
    views: "87K",
    uploadDate: "2024-03-10",
    thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://youtube.com/watch?v=example3",
    status: 'published',
    category: "Career Campus",
    section: "Magazine",
    rating: 4.9,
    isNew: false,
    createdAt: "2024-03-10T10:00:00Z",
    updatedAt: "2024-03-10T10:00:00Z"
  },
  {
    id: 'v4',
    title: "Innovation in Rural Schools",
    description: "Creative solutions for educational challenges in remote areas",
    duration: "20:30",
    views: "76K",
    uploadDate: "2024-03-08",
    thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://youtube.com/watch?v=example4",
    status: 'published',
    category: "Spirit of Africa",
    section: "Magazine",
    rating: 4.7,
    isNew: false,
    createdAt: "2024-03-08T10:00:00Z",
    updatedAt: "2024-03-08T10:00:00Z"
  },
  {
    id: 'v5',
    title: "Innovation Challenge: Episode 12",
    description: "Young innovators present groundbreaking solutions to Africa's educational challenges",
    duration: "58:42",
    views: "125K",
    uploadDate: "2024-03-15",
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://youtube.com/watch?v=example5",
    status: 'published',
    category: "Tech Trends",
    section: "FullEpisodes",
    rating: 4.9,
    isNew: true,
    createdAt: "2024-03-15T10:00:00Z",
    updatedAt: "2024-03-15T10:00:00Z"
  },
  {
    id: 'v6',
    title: "Mathematics Showdown",
    description: "Intense mathematical problem-solving under pressure",
    duration: "15:22",
    views: "245K",
    uploadDate: "2024-03-12",
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://youtube.com/watch?v=example6",
    status: 'published',
    category: "Mind and Body Quest",
    section: "MindBattles",
    rating: 4.9,
    isNew: true,
    createdAt: "2024-03-12T10:00:00Z",
    updatedAt: "2024-03-12T10:00:00Z"
  }
];

const dummyPodcastEpisodes: PodcastEpisode[] = [
  {
    id: 'p1',
    title: "The Future of Learning: AI in Education",
    guest: "Dr. Kwame Asante",
    duration: "58 min",
    plays: "12.5K",
    downloads: "5.2K",
    publishDate: "2024-03-15",
    status: 'published',
    youtubeUrl: "https://youtube.com/watch?v=podcast1",
    description: "Join us for an in-depth conversation with leading AI researchers and educators as we explore how artificial intelligence is reshaping the educational landscape.",
    image: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    createdAt: "2024-03-15T10:00:00Z",
    updatedAt: "2024-03-15T10:00:00Z"
  },
  {
    id: 'p2',
    title: "Building Inclusive Learning Environments",
    guest: "Prof. Amina Hassan",
    duration: "45 min",
    plays: "8.2K",
    downloads: "3.7K",
    publishDate: "2024-03-08",
    status: 'published',
    youtubeUrl: "https://youtube.com/watch?v=podcast2",
    description: "Exploring strategies for creating educational spaces that welcome and support all learners.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    createdAt: "2024-03-08T10:00:00Z",
    updatedAt: "2024-03-08T10:00:00Z"
  },
  {
    id: 'p3',
    title: "The Power of Storytelling in Education",
    guest: "Marcus Johnson",
    duration: "52 min",
    plays: "9.7K",
    downloads: "4.3K",
    publishDate: "2024-03-01",
    status: 'published',
    youtubeUrl: "https://youtube.com/watch?v=podcast3",
    description: "How narrative techniques can transform the way we teach and learn complex subjects.",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    createdAt: "2024-03-01T10:00:00Z",
    updatedAt: "2024-03-01T10:00:00Z"
  }
];

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  // State
  const [articles, setArticles] = useState<Article[]>([]);
  const [mainArticle, setMainArticleState] = useState<Article | null>(null);
  const [secondMainArticle, setSecondMainArticleState] = useState<Article | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [tvSeasons] = useState<any[]>([]);
  
  // Podcasts
  const [podcastEpisodes, setPodcastEpisodes] = useState<PodcastEpisode[]>([]);
  const [podcastGuests] = useState<any[]>([]);
  const [podcastSeries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize with dummy data only
  const fetchData = async () => {
    // Use only dummy data - no backend calls
    setArticles(dummyArticles);
    setMainArticleState(dummyArticles[0]);
    setSecondMainArticleState(dummyArticles[1]);
    setVideos(dummyVideos);
    setPodcastEpisodes(dummyPodcastEpisodes);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Computed values for article categories
  const featuredArticles = articles.filter(article => article.featured && article.status === 'published').slice(0, 3);
  const editorsPickArticles = articles.filter(article => article.status === 'published').slice(0, 3);
  const trendingArticles = articles.filter(article => article.trending === true && article.status === 'published');
  const otherArticles = articles.filter(article => 
    !article.featured && 
    !article.trending && 
    article.status === 'published' &&
    article.id !== mainArticle?.id &&
    article.id !== secondMainArticle?.id
  );

  // Magazine videos (videos with section = "Magazine")
  const magazineVideos = videos.filter(video => video.section === 'Magazine' && video.status === 'published');
  
  // TV Show videos (videos with section != "Magazine")
  const tvShowVideos = videos.filter(video => video.section !== 'Magazine' && video.status === 'published');

  // Helper methods
  const getArticleById = (id: string): Article | undefined => {
    // First try to find in current articles
    const article = articles.find(article => article.id === id);
    return article;
  };

  const getVideosByCategory = (category: string): Video[] => {
    return videos.filter(video => video.category === category && video.status === 'published');
  };

  const getVideosBySection = (section: string): Video[] => {
    return videos.filter(video => video.section === section && video.status === 'published');
  };

  const getPodcastEpisodeById = (id: string): PodcastEpisode | undefined => {
    return podcastEpisodes.find(episode => episode.id === id);
  };

  const getTVEpisodesBySeason = (seasonNumber: number): Video[] => {
    return tvShowVideos.filter(video => 
      video.season_number === seasonNumber
    );
  };

  const getPodcastEpisodesBySeries = (seriesId: string): PodcastEpisode[] => {
    return podcastEpisodes.filter(episode => 
      episode.series_id === seriesId
    );
  };

  const value: DataContextType = {
    // Articles
    articles,
    mainArticle,
    secondMainArticle,
    featuredArticles,
    editorsPickArticles,
    trendingArticles,
    otherArticles,
    
    // Videos
    videos,
    magazineVideos,
    tvShowVideos,
    tvSeasons,
    
    // Podcasts
    podcastEpisodes,
    podcastGuests,
    podcastSeries,
    
    // Article methods
    getArticleById,
    
    // Video methods
    getVideosByCategory,
    getVideosBySection,
    
    // Podcast methods
    getPodcastEpisodeById,
    
    // TV Show methods
    getTVEpisodesBySeason,
    
    // Podcast methods
    getPodcastEpisodesBySeries,
    
    // Loading state
    isLoading
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};