import React, { useState } from 'react';
import { BookOpen, Clock, User, ArrowRight, Play, Video, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube, X, ArrowLeft, Search, Heart, Share2, MessageCircle, Send, ThumbsUp, ThumbsDown, Bookmark, Eye, Calendar } from 'lucide-react';
import MainArticlesSection from './Magazine/MainArticlesSection';
import { usePublicData } from '../contexts/PublicDataContext';
import { useNavigate } from 'react-router-dom';

interface MagazineProps {
  isDarkMode: boolean;
}

export default function Magazine({ isDarkMode }: MagazineProps) {
  const navigate = useNavigate();
  const { regularArticles, trendingArticles } = usePublicData();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleArticles, setVisibleArticles] = useState(8);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Dr. Sarah Kimani",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      content: "This is an excellent analysis of the current state of educational technology in Africa. The insights about mobile learning platforms are particularly valuable.",
      date: "2 hours ago",
      likes: 12,
      replies: 3,
      isLiked: false
    },
    {
      id: 2,
      author: "Prof. Michael Osei",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      content: "I've been working in this field for over 15 years, and I can confirm that the trends mentioned here are indeed shaping the future of education across the continent.",
      date: "5 hours ago",
      likes: 8,
      replies: 1,
      isLiked: true
    },
    {
      id: 3,
      author: "Grace Wanjiku",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      content: "As an educator implementing these technologies in rural schools, I appreciate the practical examples provided. Would love to see more case studies from different regions.",
      date: "1 day ago",
      likes: 15,
      replies: 2,
      isLiked: false
    },
    {
      id: 4,
      author: "James Mwangi",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      content: "The section on AI-powered learning analytics is fascinating. Are there any specific platforms you'd recommend for small institutions just starting their digital transformation?",
      date: "2 days ago",
      likes: 6,
      replies: 0,
      isLiked: false
    }
  ]);

  const categories = [
    'Research World',
    'Spirit of Africa', 
    'Tech Trends',
    'Need to Know',
    'Echoes of Home',
    'Career Campus',
    'Mind and Body Quest',
    'E! Corner'
  ];

  const mainFeaturedArticle = {
    title: "The Future of African Education Technology",
    excerpt: "Exploring how innovative educational technologies are transforming learning experiences across the African continent, from rural classrooms to urban universities. This comprehensive study reveals groundbreaking insights into digital transformation.",
    author: "Dr. Amara Okafor",
    category: "Tech Trends",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  };

  const secondaryFeaturedArticle = {
    title: "Women Leading Educational Innovation Across Africa",
    excerpt: "Celebrating the remarkable female leaders who are reshaping education through groundbreaking initiatives and visionary leadership.",
    author: "Sarah Mwangi",
    category: "Career Campus",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  };

  const smallFeaturedArticles = [
    {
      title: "Mental Health Support in Universities",
      category: "Mind and Body Quest",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Traditional Wisdom Meets Modern Learning",
      category: "Spirit of Africa",
      image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Celebrity Educators Making Headlines",
      category: "E! Corner",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

  const editorsPickArticles = [
    {
      title: "Revolutionary Teaching Methods Transforming African Classrooms",
      author: "Prof. Kwame Asante",
      category: "Research World",
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "The Digital Divide: Bridging Educational Gaps Through Innovation",
      author: "Dr. Fatima Al-Rashid",
      category: "Tech Trends",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Preserving Indigenous Knowledge in Modern Curricula",
      author: "Chief Amina Hassan",
      category: "Spirit of Africa",
      image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ];

  const featuredVideos = [
    {
      title: "The Future of Education in Africa",
      description: "A comprehensive look at educational transformation across the continent",
      videoId: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
    },
    {
      title: "Digital Learning Revolution",
      description: "How technology is reshaping classrooms worldwide",
      videoId: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
    },
    {
      title: "Women in STEM Education",
      description: "Inspiring stories of female leaders in science and technology education",
      videoId: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
    },
    {
      title: "Innovation in Rural Schools",
      description: "Creative solutions for educational challenges in remote areas",
      videoId: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
    }
  ];

  // Sample full article data
  const sampleArticle = {
    id: 1,
    title: "The Future of African Education Technology: Transforming Learning Through Innovation",
    subtitle: "How cutting-edge technology is revolutionizing educational experiences across the continent",
    author: {
      name: "Dr. Amara Okafor",
      bio: "Dr. Amara Okafor is a leading expert in educational technology with over 15 years of experience in digital transformation across African institutions.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      credentials: "PhD in Educational Technology, University of Cape Town"
    },
    category: "Tech Trends",
    publishDate: "March 15, 2024",
    readTime: "12 min read",
    views: "18.5K",
    likes: 234,
    shares: 89,
    isBookmarked: false,
    isLiked: false,
    featuredImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    content: {
      introduction: "The landscape of education across Africa is undergoing a remarkable transformation, driven by innovative technologies that are breaking down traditional barriers and creating unprecedented opportunities for learners. From the bustling classrooms of Lagos to the remote villages of rural Kenya, educational technology is reshaping how knowledge is delivered, consumed, and applied.",
      sections: [
        {
          heading: "The Digital Revolution in African Classrooms",
          content: "Educational institutions across the continent are embracing digital transformation at an unprecedented pace. Universities in South Africa are implementing AI-powered learning management systems, while primary schools in Ghana are introducing tablet-based learning programs that adapt to individual student needs.",
          image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          heading: "Mobile Learning: Bridging the Connectivity Gap",
          content: "With mobile phone penetration reaching over 80% across many African countries, mobile learning platforms have emerged as a game-changer. These platforms are designed to work efficiently even with limited internet connectivity, ensuring that students in remote areas can access quality educational content. Companies like Eneza Education in Kenya and Snapplify in South Africa are leading this mobile-first approach to education.",
          image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          heading: "Artificial Intelligence and Personalized Learning",
          content: "AI-powered educational platforms are beginning to make their mark across African institutions. These systems analyze student performance data to create personalized learning paths, identify knowledge gaps, and provide targeted interventions. The University of the Witwatersrand in South Africa has successfully implemented an AI tutoring system that has improved student pass rates by 23%.",
          image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          heading: "Virtual Reality and Immersive Learning Experiences",
          content: "Virtual and augmented reality technologies are creating immersive learning experiences that were previously impossible. Medical students at the University of Cape Town can now practice complex surgical procedures in virtual environments, while history students can take virtual tours of ancient African civilizations. These technologies are making abstract concepts tangible and engaging.",
          image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          heading: "Challenges and Opportunities Ahead",
          content: "While the progress is encouraging, significant challenges remain. Infrastructure limitations, digital literacy gaps, and funding constraints continue to hinder widespread adoption. However, innovative partnerships between governments, private sector, and international organizations are creating sustainable solutions. The African Development Bank's recent $300 million investment in educational technology infrastructure signals a commitment to overcoming these challenges."
        }
      ],
      conclusion: "The future of African education technology is bright, with innovations that are not just adapting global solutions but creating uniquely African approaches to learning. As we move forward, the focus must remain on ensuring that these technological advances serve to reduce rather than increase educational inequalities, creating opportunities for all learners across the continent."
    },
    tags: ["Education Technology", "Africa", "Digital Learning", "AI in Education", "Mobile Learning", "EdTech Innovation"]
  };

  // Related articles data
  const relatedArticles = [
    {
      title: "AI-Powered Learning Platforms Transform Education",
      excerpt: "Discover how artificial intelligence is revolutionizing personalized learning experiences across African universities.",
      author: "Dr. Kevin Ochieng",
      category: "Tech Trends",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      date: "March 12, 2024"
    },
    {
      title: "Mobile Learning Revolution in Rural Africa",
      excerpt: "How mobile technology is bringing quality education to remote communities across the continent.",
      author: "Prof. Sarah Kimani",
      category: "Tech Trends",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      date: "March 10, 2024"
    },
    {
      title: "Virtual Reality in Medical Education",
      excerpt: "Medical schools are adopting VR technology to provide immersive learning experiences for future doctors.",
      author: "Dr. Michael Chen",
      category: "Tech Trends",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      date: "March 8, 2024"
    },
    {
      title: "Blockchain Technology in Academic Credentials",
      excerpt: "How blockchain is creating tamper-proof academic records and certificates across African institutions.",
      author: "Prof. Grace Wanjiku",
      category: "Tech Trends",
      readTime: "9 min read",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      date: "March 5, 2024"
    }
  ];

  // Other articles data (horizontal layout)
  const otherArticles = [
    {
      title: "Women Leading Educational Innovation Across Africa",
      excerpt: "Celebrating the remarkable female leaders who are reshaping education through groundbreaking initiatives.",
      author: "Sarah Mwangi",
      category: "Career Campus",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      date: "March 12, 2024"
    },
    {
      title: "Mental Health Support in Universities",
      excerpt: "Universities are implementing comprehensive mental health support systems for student success and wellbeing.",
      author: "Dr. Sarah Ochieng",
      category: "Mind and Body Quest",
      readTime: "11 min read",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      date: "March 10, 2024"
    },
    {
      title: "Traditional Wisdom Meets Modern Learning",
      excerpt: "How African educational institutions are integrating ancestral knowledge with contemporary curricula.",
      author: "Chief Amina Hassan",
      category: "Spirit of Africa",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      date: "March 8, 2024"
    }
  ];

  // Articles for the two-column section
  const leftColumnArticles = [
    {
      title: "AI-Powered Learning Platforms Transform Education",
      excerpt: "Discover how artificial intelligence is revolutionizing personalized learning experiences across African universities.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      category: "Tech Trends"
    },
    {
      title: "Community Schools Bridge Rural Education Gap",
      excerpt: "Local communities are taking charge of education, creating innovative solutions for remote learning challenges.",
      image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      category: "Spirit of Africa"
    },
    {
      title: "Female Scientists Lead STEM Education Reform",
      excerpt: "Pioneering women in science are reshaping how we teach and inspire the next generation of innovators.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      category: "Career Campus"
    },
    {
      title: "Mental Wellness Programs in Higher Education",
      excerpt: "Universities are implementing comprehensive mental health support systems for student success.",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      category: "Mind and Body Quest"
    },
    {
      title: "Sustainable Campus Initiatives Gain Momentum",
      excerpt: "Educational institutions are leading the way in environmental sustainability and green technology adoption.",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      category: "Research World"
    },
    {
      title: "Digital Literacy Programs Empower Communities",
      excerpt: "Grassroots initiatives are bringing essential digital skills to underserved populations across the continent.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      category: "Need to Know"
    },
    {
      title: "Cultural Heritage Preservation Through Education",
      excerpt: "Schools are integrating traditional knowledge systems with modern curricula to preserve cultural identity.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      category: "Echoes of Home"
    },
    {
      title: "Celebrity Educators Make Learning Fun",
      excerpt: "High-profile personalities are using their platforms to promote education and inspire young learners.",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      category: "E! Corner"
    }
  ];

  const rightColumnArticles = [
    "Blockchain Technology Revolutionizes Academic Credentials",
    "Virtual Reality Transforms Medical Education Training",
    "Microlearning Platforms Boost Student Engagement",
    "Indigenous Languages Find New Life in Digital Classrooms",
    "Entrepreneurship Education Creates Job Opportunities",
    "Climate Change Education Shapes Future Leaders",
    "Inclusive Design Makes Learning Accessible for All",
    "Social Media Literacy Becomes Essential Life Skill"
  ];

  // All articles for category pages
  const allCategoryArticles = {
    'Research World': [
      {
        title: "Revolutionary Teaching Methods Transforming African Classrooms",
        excerpt: "Exploring innovative pedagogical approaches that are reshaping educational experiences across the continent.",
        author: "Prof. Kwame Asante",
        date: "March 15, 2024",
        readTime: "8 min read",
        views: "12.5K",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: true
      },
      {
        title: "AI-Powered Learning Analytics in Higher Education",
        excerpt: "How artificial intelligence is providing unprecedented insights into student learning patterns and outcomes.",
        author: "Dr. Sarah Ochieng",
        date: "March 12, 2024",
        readTime: "6 min read",
        views: "9.8K",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Neuroscience Breakthroughs in Learning Science",
        excerpt: "Latest research reveals how the brain learns and retains information, revolutionizing educational approaches.",
        author: "Dr. Michael Chen",
        date: "March 10, 2024",
        readTime: "10 min read",
        views: "15.2K",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Collaborative Research Networks Across African Universities",
        excerpt: "Building bridges between institutions to accelerate educational research and innovation.",
        author: "Prof. Amina Hassan",
        date: "March 8, 2024",
        readTime: "7 min read",
        views: "8.7K",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Evidence-Based Teaching Strategies for STEM",
        excerpt: "Research-backed methods that significantly improve student outcomes in science and mathematics.",
        author: "Dr. James Mwangi",
        date: "March 5, 2024",
        readTime: "9 min read",
        views: "11.3K",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Longitudinal Studies on Educational Impact",
        excerpt: "Tracking student progress over decades reveals surprising insights about effective education.",
        author: "Prof. Grace Mbeki",
        date: "March 3, 2024",
        readTime: "12 min read",
        views: "7.9K",
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Interdisciplinary Research in Educational Technology",
        excerpt: "How collaboration between different fields is driving innovation in learning technologies.",
        author: "Dr. Fatima Al-Rashid",
        date: "March 1, 2024",
        readTime: "8 min read",
        views: "10.1K",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Open Science Initiatives in African Research",
        excerpt: "Promoting transparency and collaboration in educational research across the continent.",
        author: "Prof. David Kimani",
        date: "February 28, 2024",
        readTime: "6 min read",
        views: "6.8K",
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Meta-Analysis of Learning Effectiveness Studies",
        excerpt: "Comprehensive review of research reveals the most effective educational interventions.",
        author: "Dr. Elizabeth Muthoni",
        date: "February 25, 2024",
        readTime: "11 min read",
        views: "9.5K",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Research Ethics in Educational Studies",
        excerpt: "Ensuring responsible research practices while studying vulnerable student populations.",
        author: "Prof. Robert Nyong'o",
        date: "February 22, 2024",
        readTime: "7 min read",
        views: "5.4K",
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Funding Opportunities for Educational Research",
        excerpt: "Guide to securing grants and support for innovative educational research projects.",
        author: "Dr. Mary Wanjiru",
        date: "February 20, 2024",
        readTime: "5 min read",
        views: "8.2K",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Peer Review Process in Educational Journals",
        excerpt: "Understanding how research gets published and validated in the academic community.",
        author: "Prof. Ahmed Hassan",
        date: "February 18, 2024",
        readTime: "6 min read",
        views: "7.1K",
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Research Impact Measurement in Education",
        excerpt: "New metrics for evaluating how educational research translates into real-world improvements.",
        author: "Dr. Chinwe Okoro",
        date: "February 15, 2024",
        readTime: "9 min read",
        views: "6.9K",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Emerging Methodologies in Educational Research",
        excerpt: "Innovative approaches to studying learning that are changing the field.",
        author: "Prof. John Kiprotich",
        date: "February 12, 2024",
        readTime: "8 min read",
        views: "10.7K",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Global Trends in Educational Research",
        excerpt: "How international collaboration is shaping the future of learning science.",
        author: "Dr. Aisha Patel",
        date: "February 10, 2024",
        readTime: "7 min read",
        views: "9.3K",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      }
    ],
    'Tech Trends': [
      {
        title: "The Future of African Education Technology",
        excerpt: "Exploring how innovative educational technologies are transforming learning experiences across the African continent.",
        author: "Dr. Amara Okafor",
        date: "March 15, 2024",
        readTime: "10 min read",
        views: "18.5K",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: true
      },
      {
        title: "AI-Powered Learning Platforms Transform Education",
        excerpt: "Discover how artificial intelligence is revolutionizing personalized learning experiences across African universities.",
        author: "Dr. Kevin Ochieng",
        date: "March 12, 2024",
        readTime: "8 min read",
        views: "14.2K",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Virtual Reality Transforms Medical Education Training",
        excerpt: "Medical schools are adopting VR technology to provide immersive learning experiences for future doctors.",
        author: "Prof. Sarah Kimani",
        date: "March 10, 2024",
        readTime: "7 min read",
        views: "12.8K",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Blockchain Technology Revolutionizes Academic Credentials",
        excerpt: "How blockchain is creating tamper-proof academic records and certificates.",
        author: "Dr. Michael Osei",
        date: "March 8, 2024",
        readTime: "6 min read",
        views: "11.5K",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "5G Networks Enable Remote Learning Revolution",
        excerpt: "High-speed connectivity is breaking down barriers to quality education in rural areas.",
        author: "Dr. Fatima Diallo",
        date: "March 5, 2024",
        readTime: "9 min read",
        views: "16.3K",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Internet of Things in Smart Classrooms",
        excerpt: "Connected devices are creating intelligent learning environments that adapt to student needs.",
        author: "Prof. James Kiprotich",
        date: "March 3, 2024",
        readTime: "8 min read",
        views: "9.7K",
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Machine Learning Personalizes Student Assessment",
        excerpt: "Adaptive testing systems that adjust to individual learning patterns and abilities.",
        author: "Dr. Grace Wanjiku",
        date: "March 1, 2024",
        readTime: "7 min read",
        views: "13.1K",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Cloud Computing Democratizes Educational Resources",
        excerpt: "How cloud technology is making high-quality educational content accessible to all.",
        author: "Prof. David Mutiso",
        date: "February 28, 2024",
        readTime: "6 min read",
        views: "10.9K",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Augmented Reality Brings History to Life",
        excerpt: "AR applications are making historical events and ancient civilizations interactive and engaging.",
        author: "Dr. Elizabeth Nyong'o",
        date: "February 25, 2024",
        readTime: "8 min read",
        views: "8.6K",
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Quantum Computing's Future in Education",
        excerpt: "Exploring how quantum technology might revolutionize complex problem-solving in education.",
        author: "Prof. Ahmed Al-Rashid",
        date: "February 22, 2024",
        readTime: "11 min read",
        views: "7.4K",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Cybersecurity in Educational Technology",
        excerpt: "Protecting student data and privacy in an increasingly connected educational landscape.",
        author: "Dr. Mary Muthoni",
        date: "February 20, 2024",
        readTime: "9 min read",
        views: "12.2K",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Edge Computing Enhances Real-Time Learning",
        excerpt: "How processing data closer to students improves response times and learning experiences.",
        author: "Prof. Robert Hassan",
        date: "February 18, 2024",
        readTime: "7 min read",
        views: "9.8K",
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Digital Twins in Educational Infrastructure",
        excerpt: "Virtual replicas of schools and universities are optimizing learning environments.",
        author: "Dr. Chinwe Okoro",
        date: "February 15, 2024",
        readTime: "8 min read",
        views: "6.7K",
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Natural Language Processing in Education",
        excerpt: "How AI understands and responds to student questions in their native languages.",
        author: "Prof. John Mwangi",
        date: "February 12, 2024",
        readTime: "10 min read",
        views: "11.7K",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Robotics in STEM Education",
        excerpt: "How educational robots are making science and engineering concepts tangible for students.",
        author: "Dr. Aisha Patel",
        date: "February 10, 2024",
        readTime: "9 min read",
        views: "15.4K",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      }
    ],
    'Spirit of Africa': [
      {
        title: "Traditional Wisdom Meets Modern Learning",
        excerpt: "How African educational institutions are integrating ancestral knowledge with contemporary curricula.",
        author: "Chief Amina Hassan",
        date: "March 15, 2024",
        readTime: "12 min read",
        views: "16.8K",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: true
      },
      {
        title: "Ubuntu Philosophy in Educational Leadership",
        excerpt: "Exploring how the African concept of Ubuntu is shaping collaborative learning environments.",
        author: "Prof. Kwame Asante",
        date: "March 12, 2024",
        readTime: "8 min read",
        views: "13.5K",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Oral Traditions in Digital Age Learning",
        excerpt: "Preserving and transmitting African storytelling traditions through modern technology.",
        author: "Dr. Fatou Diallo",
        date: "March 10, 2024",
        readTime: "10 min read",
        views: "11.2K",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Indigenous Languages in Higher Education",
        excerpt: "Universities are embracing local languages as mediums of instruction and research.",
        author: "Prof. Grace Mbeki",
        date: "March 8, 2024",
        readTime: "9 min read",
        views: "14.7K",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Community Elders as Educational Resources",
        excerpt: "How traditional knowledge keepers are being integrated into formal education systems.",
        author: "Elder Samuel Mutua",
        date: "March 5, 2024",
        readTime: "7 min read",
        views: "9.8K",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "African Art and Creative Expression in Schools",
        excerpt: "Celebrating and teaching traditional African arts as part of holistic education.",
        author: "Dr. Maria Santos",
        date: "March 3, 2024",
        readTime: "8 min read",
        views: "12.4K",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Traditional Medicine Knowledge in Science Education",
        excerpt: "Bridging indigenous healing practices with modern scientific understanding.",
        author: "Dr. Kemi Adebayo",
        date: "March 1, 2024",
        readTime: "11 min read",
        views: "8.9K",
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Ancestral Environmental Wisdom in Climate Education",
        excerpt: "Learning from traditional ecological knowledge to address modern environmental challenges.",
        author: "Prof. David Kimani",
        date: "February 28, 2024",
        readTime: "9 min read",
        views: "15.6K",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Rites of Passage and Educational Milestones",
        excerpt: "How traditional coming-of-age ceremonies inform modern educational transitions.",
        author: "Dr. Elizabeth Muthoni",
        date: "February 25, 2024",
        readTime: "6 min read",
        views: "7.3K",
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "African Music and Mathematics Education",
        excerpt: "Discovering mathematical patterns and concepts through traditional African music.",
        author: "Prof. Robert Nyong'o",
        date: "February 22, 2024",
        readTime: "8 min read",
        views: "10.1K",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Traditional Governance Systems and Civic Education",
        excerpt: "Learning democratic principles from African traditional leadership structures.",
        author: "Chief Mary Wanjiru",
        date: "February 20, 2024",
        readTime: "10 min read",
        views: "6.8K",
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Proverbs and Wisdom Literature in Language Arts",
        excerpt: "Using African proverbs to teach critical thinking and cultural values.",
        author: "Dr. Ahmed Hassan",
        date: "February 18, 2024",
        readTime: "7 min read",
        views: "9.4K",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Traditional Architecture in Engineering Education",
        excerpt: "Learning sustainable building techniques from African architectural heritage.",
        author: "Prof. Chinwe Okoro",
        date: "February 15, 2024",
        readTime: "9 min read",
        views: "11.7K",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Seasonal Calendars and Agricultural Education",
        excerpt: "Traditional farming wisdom informing modern agricultural science curricula.",
        author: "Dr. John Kiprotich",
        date: "February 12, 2024",
        readTime: "8 min read",
        views: "8.5K",
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "African Philosophy in Ethics Education",
        excerpt: "Teaching moral reasoning through traditional African philosophical frameworks.",
        author: "Prof. Aisha Patel",
        date: "February 10, 2024",
        readTime: "11 min read",
        views: "12.9K",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      }
    ],
    'Need to Know': [
      {
        title: "Digital Literacy Programs Empower Communities",
        excerpt: "Grassroots initiatives are bringing essential digital skills to underserved populations across the continent.",
        author: "Dr. Sarah Mwangi",
        date: "March 15, 2024",
        readTime: "8 min read",
        views: "14.3K",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: true
      },
      {
        title: "Financial Literacy Education for Students",
        excerpt: "Essential money management skills that every student needs to learn before graduation.",
        author: "Prof. Michael Osei",
        date: "March 12, 2024",
        readTime: "6 min read",
        views: "12.8K",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Climate Change Education: Urgent Curriculum Updates",
        excerpt: "Why environmental education needs to be integrated into every subject area.",
        author: "Dr. Fatima Al-Rashid",
        date: "March 10, 2024",
        readTime: "9 min read",
        views: "16.5K",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Critical Media Literacy in the Digital Age",
        excerpt: "Teaching students to navigate misinformation and evaluate online sources critically.",
        author: "Prof. Grace Wanjiku",
        date: "March 8, 2024",
        readTime: "7 min read",
        views: "11.2K",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Mental Health First Aid for Educators",
        excerpt: "Essential skills teachers need to support student mental health and wellbeing.",
        author: "Dr. James Mwangi",
        date: "March 5, 2024",
        readTime: "10 min read",
        views: "18.7K",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Data Privacy Rights for Students",
        excerpt: "Understanding and protecting personal information in educational technology platforms.",
        author: "Dr. Kemi Adebayo",
        date: "March 3, 2024",
        readTime: "8 min read",
        views: "9.4K",
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Emergency Preparedness in Schools",
        excerpt: "Critical safety protocols and disaster response planning for educational institutions.",
        author: "Captain David Kimani",
        date: "March 1, 2024",
        readTime: "11 min read",
        views: "7.8K",
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Inclusive Education Practices for All Learners",
        excerpt: "Creating learning environments that accommodate diverse abilities and learning styles.",
        author: "Prof. Elizabeth Muthoni",
        date: "February 28, 2024",
        readTime: "9 min read",
        views: "13.6K",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Cyberbullying Prevention and Response",
        excerpt: "Strategies for addressing online harassment and creating safer digital spaces for students.",
        author: "Dr. Robert Nyong'o",
        date: "February 25, 2024",
        readTime: "7 min read",
        views: "15.1K",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Nutrition Education for Academic Performance",
        excerpt: "The critical link between proper nutrition and student learning outcomes.",
        author: "Dr. Mary Wanjiru",
        date: "February 22, 2024",
        readTime: "6 min read",
        views: "10.9K",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Legal Rights of Students and Parents",
        excerpt: "Understanding educational rights and how to advocate for quality education.",
        author: "Advocate Ahmed Hassan",
        date: "February 20, 2024",
        readTime: "12 min read",
        views: "8.7K",
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Study Skills and Learning Strategies",
        excerpt: "Evidence-based techniques for effective studying and academic success.",
        author: "Prof. Chinwe Okoro",
        date: "February 18, 2024",
        readTime: "8 min read",
        views: "17.2K",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Career Guidance in the Modern Economy",
        excerpt: "Preparing students for jobs of the future and emerging career opportunities.",
        author: "Dr. John Kiprotich",
        date: "February 15, 2024",
        readTime: "10 min read",
        views: "14.8K",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Parent-School Communication Best Practices",
        excerpt: "Building effective partnerships between families and educational institutions.",
        author: "Dr. Aisha Patel",
        date: "February 12, 2024",
        readTime: "7 min read",
        views: "11.5K",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Assessment Literacy for Students and Parents",
        excerpt: "Understanding different types of assessments and what test scores really mean.",
        author: "Prof. Grace Mbeki",
        date: "February 10, 2024",
        readTime: "9 min read",
        views: "9.6K",
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      }
    ],
    'Echoes of Home': [
      {
        title: "Cultural Heritage Preservation Through Education",
        excerpt: "Schools are integrating traditional knowledge systems with modern curricula to preserve cultural identity.",
        author: "Prof. Kwame Asante",
        date: "March 15, 2024",
        readTime: "10 min read",
        views: "15.7K",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: true
      },
      {
        title: "Diaspora Students Connecting with African Roots",
        excerpt: "Educational programs helping African diaspora youth reconnect with their cultural heritage.",
        author: "Dr. Grace Mbeki",
        date: "March 12, 2024",
        readTime: "8 min read",
        views: "12.4K",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Mother Tongue Education Benefits",
        excerpt: "Research shows improved learning outcomes when children are taught in their native languages.",
        author: "Dr. Fatou Diallo",
        date: "March 10, 2024",
        readTime: "9 min read",
        views: "14.1K",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Traditional Festivals in School Calendars",
        excerpt: "How educational institutions are incorporating cultural celebrations into academic programming.",
        author: "Chief Amina Hassan",
        date: "March 8, 2024",
        readTime: "7 min read",
        views: "10.8K",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Intergenerational Learning Programs",
        excerpt: "Bridging the gap between elders and youth through structured educational exchanges.",
        author: "Prof. David Kimani",
        date: "March 5, 2024",
        readTime: "11 min read",
        views: "9.3K",
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Cultural Exchange Programs in African Schools",
        excerpt: "Students learning about different African cultures through immersive exchange experiences.",
        author: "Dr. Elizabeth Muthoni",
        date: "March 3, 2024",
        readTime: "8 min read",
        views: "13.6K",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Digital Archives of African Heritage",
        excerpt: "Technology preserving cultural artifacts and stories for future generations.",
        author: "Dr. Robert Nyong'o",
        date: "March 1, 2024",
        readTime: "9 min read",
        views: "11.7K",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Traditional Crafts in Modern Curricula",
        excerpt: "Teaching traditional artisan skills alongside contemporary subjects in schools.",
        author: "Master Craftsman Samuel Mutua",
        date: "February 28, 2024",
        readTime: "7 min read",
        views: "8.9K",
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Oral History Projects in Universities",
        excerpt: "Students documenting and preserving community stories through academic research.",
        author: "Prof. Mary Wanjiru",
        date: "February 25, 2024",
        readTime: "10 min read",
        views: "7.5K",
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Cultural Identity and Academic Achievement",
        excerpt: "How strong cultural connections improve student engagement and success.",
        author: "Dr. Ahmed Hassan",
        date: "February 22, 2024",
        readTime: "8 min read",
        views: "12.8K",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Traditional Games in Physical Education",
        excerpt: "Incorporating indigenous sports and games into modern PE curricula.",
        author: "Coach Chinwe Okoro",
        date: "February 20, 2024",
        readTime: "6 min read",
        views: "9.7K",
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Community Elders as Guest Lecturers",
        excerpt: "Universities inviting traditional knowledge keepers to share wisdom with students.",
        author: "Prof. John Kiprotich",
        date: "February 18, 2024",
        readTime: "9 min read",
        views: "6.8K",
        rating: 4.1,
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Cultural Competency Training for Educators",
        excerpt: "Preparing teachers to work effectively in diverse cultural contexts.",
        author: "Dr. Aisha Patel",
        date: "February 15, 2024",
        readTime: "11 min read",
        views: "14.2K",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Heritage Sites as Learning Laboratories",
        excerpt: "Using historical and cultural sites as outdoor classrooms for immersive learning.",
        author: "Dr. Kemi Adebayo",
        date: "February 12, 2024",
        readTime: "8 min read",
        views: "11.4K",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Multilingual Education Policies",
        excerpt: "Government initiatives supporting education in multiple African languages.",
        author: "Policy Analyst James Mwangi",
        date: "February 10, 2024",
        readTime: "12 min read",
        views: "8.1K",
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      }
    ],
    'Career Campus': [
      {
        title: "Women Leading Educational Innovation Across Africa",
        excerpt: "Celebrating the remarkable female leaders who are reshaping education through groundbreaking initiatives and visionary leadership.",
        author: "Sarah Mwangi",
        date: "March 15, 2024",
        readTime: "12 min read",
        views: "19.8K",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: true
      },
      {
        title: "Entrepreneurship Education in African Universities",
        excerpt: "How business incubators and startup programs are fostering the next generation of African entrepreneurs.",
        author: "Prof. Michael Osei",
        date: "March 12, 2024",
        readTime: "9 min read",
        views: "16.4K",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "STEM Career Pathways for African Youth",
        excerpt: "Exploring diverse opportunities in science, technology, engineering, and mathematics fields.",
        author: "Dr. Fatima Al-Rashid",
        date: "March 10, 2024",
        readTime: "10 min read",
        views: "14.7K",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Professional Development for Educators",
        excerpt: "Continuous learning opportunities that help teachers advance their careers and improve student outcomes.",
        author: "Prof. Grace Wanjiku",
        date: "March 8, 2024",
        readTime: "8 min read",
        views: "13.2K",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Industry-Academia Partnerships",
        excerpt: "Building bridges between universities and employers to create relevant career preparation programs.",
        author: "Dr. James Mwangi",
        date: "March 5, 2024",
        readTime: "11 min read",
        views: "12.8K",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Digital Skills for the Modern Workforce",
        excerpt: "Essential technology competencies that students need for 21st-century careers.",
        author: "Dr. Kemi Adebayo",
        date: "March 3, 2024",
        readTime: "7 min read",
        views: "18.1K",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Mentorship Programs in Higher Education",
        excerpt: "How experienced professionals are guiding the next generation of African leaders.",
        author: "Prof. David Kimani",
        date: "March 1, 2024",
        readTime: "9 min read",
        views: "11.5K",
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Green Jobs and Sustainability Careers",
        excerpt: "Emerging career opportunities in environmental conservation and renewable energy sectors.",
        author: "Dr. Elizabeth Muthoni",
        date: "February 28, 2024",
        readTime: "10 min read",
        views: "15.9K",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Leadership Development in African Context",
        excerpt: "Cultivating leadership skills that honor African values while meeting global standards.",
        author: "Chief Robert Nyong'o",
        date: "February 25, 2024",
        readTime: "12 min read",
        views: "9.7K",
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Creative Industries Career Opportunities",
        excerpt: "Exploring careers in film, music, design, and other creative fields across Africa.",
        author: "Dr. Mary Wanjiru",
        date: "February 22, 2024",
        readTime: "8 min read",
        views: "13.6K",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "International Career Mobility for Africans",
        excerpt: "Navigating global career opportunities while maintaining connections to the continent.",
        author: "Prof. Ahmed Hassan",
        date: "February 20, 2024",
        readTime: "11 min read",
        views: "17.3K",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Soft Skills Development for Career Success",
        excerpt: "Communication, teamwork, and emotional intelligence skills that employers value most.",
        author: "Dr. Chinwe Okoro",
        date: "February 18, 2024",
        readTime: "7 min read",
        views: "14.8K",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Career Transition Strategies for Mid-Career Professionals",
        excerpt: "How experienced professionals can successfully pivot to new career paths.",
        author: "Prof. John Kiprotich",
        date: "February 15, 2024",
        readTime: "10 min read",
        views: "10.4K",
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Networking Strategies for African Professionals",
        excerpt: "Building meaningful professional relationships across the continent and globally.",
        author: "Dr. Aisha Patel",
        date: "February 12, 2024",
        readTime: "8 min read",
        views: "12.1K",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Work-Life Balance in African Professional Culture",
        excerpt: "Balancing career ambitions with family and community responsibilities.",
        author: "Prof. Grace Mbeki",
        date: "February 10, 2024",
        readTime: "9 min read",
        views: "16.7K",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      }
    ],
    'Mind and Body Quest': [
      {
        title: "Mental Health Support in Universities",
        excerpt: "Universities are implementing comprehensive mental health support systems for student success and wellbeing.",
        author: "Dr. Sarah Ochieng",
        date: "March 15, 2024",
        readTime: "11 min read",
        views: "22.4K",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: true
      },
      {
        title: "Physical Activity and Academic Performance",
        excerpt: "Research reveals the strong connection between regular exercise and improved learning outcomes.",
        author: "Prof. Michael Chen",
        date: "March 12, 2024",
        readTime: "8 min read",
        views: "18.7K",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Mindfulness and Meditation in Schools",
        excerpt: "How contemplative practices are helping students manage stress and improve focus.",
        author: "Dr. Zen Nakamura",
        date: "March 10, 2024",
        readTime: "9 min read",
        views: "16.3K",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Nutrition Education for Better Learning",
        excerpt: "The critical role of proper nutrition in cognitive development and academic achievement.",
        author: "Dr. Grace Wanjiku",
        date: "March 8, 2024",
        readTime: "7 min read",
        views: "14.9K",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Sleep Hygiene for Students",
        excerpt: "Understanding how adequate sleep impacts memory consolidation and academic performance.",
        author: "Dr. James Mwangi",
        date: "March 5, 2024",
        readTime: "10 min read",
        views: "19.2K",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Stress Management Techniques for Educators",
        excerpt: "Helping teachers cope with workplace stress and prevent burnout.",
        author: "Prof. Elizabeth Muthoni",
        date: "March 3, 2024",
        readTime: "9 min read",
        views: "13.8K",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Building Resilience in Young Learners",
        excerpt: "Strategies for developing emotional strength and adaptability in students.",
        author: "Dr. Robert Nyong'o",
        date: "March 1, 2024",
        readTime: "8 min read",
        views: "17.1K",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Social-Emotional Learning Programs",
        excerpt: "Integrating emotional intelligence education into academic curricula.",
        author: "Dr. Mary Wanjiru",
        date: "February 28, 2024",
        readTime: "11 min read",
        views: "15.6K",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Digital Wellness and Screen Time Management",
        excerpt: "Balancing technology use with physical and mental health in educational settings.",
        author: "Dr. Ahmed Hassan",
        date: "February 25, 2024",
        readTime: "7 min read",
        views: "20.3K",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Peer Support Networks in Schools",
        excerpt: "How student-led support groups are improving mental health outcomes.",
        author: "Prof. Chinwe Okoro",
        date: "February 22, 2024",
        readTime: "9 min read",
        views: "12.7K",
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Outdoor Education and Nature Therapy",
        excerpt: "The healing power of nature-based learning experiences for student wellbeing.",
        author: "Dr. John Kiprotich",
        date: "February 20, 2024",
        readTime: "10 min read",
        views: "14.5K",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Art Therapy in Educational Settings",
        excerpt: "Using creative expression as a tool for emotional healing and self-discovery.",
        author: "Dr. Aisha Patel",
        date: "February 18, 2024",
        readTime: "8 min read",
        views: "11.9K",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Creating Inclusive Wellness Programs",
        excerpt: "Designing health and wellness initiatives that serve diverse student populations.",
        author: "Prof. Grace Mbeki",
        date: "February 15, 2024",
        readTime: "12 min read",
        views: "16.8K",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Mental Health First Aid Training",
        excerpt: "Preparing educators and students to recognize and respond to mental health crises.",
        author: "Dr. Kemi Adebayo",
        date: "February 12, 2024",
        readTime: "9 min read",
        views: "18.4K",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Holistic Approaches to Student Development",
        excerpt: "Integrating physical, mental, and spiritual wellness in educational philosophy.",
        author: "Prof. David Kimani",
        date: "February 10, 2024",
        readTime: "11 min read",
        views: "13.2K",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      }
    ],
    'E! Corner': [
      {
        title: "Celebrity Educators Making Headlines",
        excerpt: "High-profile personalities are using their platforms to promote education and inspire young learners across Africa.",
        author: "Grace Mbeki",
        date: "March 15, 2024",
        readTime: "8 min read",
        views: "25.7K",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: true
      },
      {
        title: "Social Media Influencers Promoting STEM",
        excerpt: "How popular content creators are making science and technology cool for young audiences.",
        author: "Kevin Ochieng",
        date: "March 12, 2024",
        readTime: "6 min read",
        views: "31.2K",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Musicians Teaching Through Their Art",
        excerpt: "African artists incorporating educational messages into their music and performances.",
        author: "DJ Sarah Kimani",
        date: "March 10, 2024",
        readTime: "7 min read",
        views: "28.9K",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Athletes as Educational Role Models",
        excerpt: "Sports stars who are championing education and youth development initiatives.",
        author: "Coach Michael Osei",
        date: "March 8, 2024",
        readTime: "9 min read",
        views: "22.4K",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Film Stars Supporting Literacy Campaigns",
        excerpt: "Nollywood and other African film industry celebrities promoting reading and literacy.",
        author: "Entertainment Reporter Fatima Diallo",
        date: "March 5, 2024",
        readTime: "8 min read",
        views: "19.8K",
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "YouTube Educators Going Viral",
        excerpt: "Educational content creators who are reaching millions with their innovative teaching methods.",
        author: "Digital Media Analyst James Mwangi",
        date: "March 3, 2024",
        readTime: "10 min read",
        views: "35.1K",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Fashion Icons Promoting Girl Child Education",
        excerpt: "How fashion industry leaders are using their influence to support girls' education.",
        author: "Style Editor Grace Wanjiku",
        date: "March 1, 2024",
        readTime: "7 min read",
        views: "17.6K",
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Tech Billionaires Funding African Schools",
        excerpt: "Wealthy entrepreneurs investing in educational infrastructure across the continent.",
        author: "Business Reporter David Kimani",
        date: "February 28, 2024",
        readTime: "11 min read",
        views: "26.3K",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Reality TV Stars Turned Education Advocates",
        excerpt: "Former reality show contestants using their fame to promote educational causes.",
        author: "TV Critic Elizabeth Muthoni",
        date: "February 25, 2024",
        readTime: "6 min read",
        views: "14.7K",
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Comedians Making Learning Fun",
        excerpt: "Stand-up comedians and content creators who are making education entertaining.",
        author: "Comedy Writer Robert Nyong'o",
        date: "February 22, 2024",
        readTime: "8 min read",
        views: "21.5K",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Celebrity Chef Teaching Nutrition",
        excerpt: "Famous chefs educating young people about healthy eating and food science.",
        author: "Food Writer Mary Wanjiru",
        date: "February 20, 2024",
        readTime: "7 min read",
        views: "18.9K",
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Gaming Streamers Promoting Digital Literacy",
        excerpt: "Popular gamers teaching technology skills and digital citizenship to their audiences.",
        author: "Gaming Journalist Ahmed Hassan",
        date: "February 18, 2024",
        readTime: "9 min read",
        views: "29.7K",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Beauty Influencers Teaching Self-Confidence",
        excerpt: "How beauty content creators are promoting self-esteem and personal development.",
        author: "Beauty Editor Chinwe Okoro",
        date: "February 15, 2024",
        readTime: "6 min read",
        views: "23.1K",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Podcast Hosts Discussing Education Policy",
        excerpt: "Popular podcasters bringing educational issues to mainstream conversations.",
        author: "Podcast Producer John Kiprotich",
        date: "February 12, 2024",
        readTime: "10 min read",
        views: "16.4K",
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      },
      {
        title: "Celebrity Book Clubs Promoting Reading",
        excerpt: "Famous personalities starting book clubs and reading initiatives for young people.",
        author: "Literary Critic Aisha Patel",
        date: "February 10, 2024",
        readTime: "8 min read",
        views: "20.8K",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        isFeatured: false
      }
    ]
  };

  const openCategoryView = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setSearchQuery('');
    setVisibleArticles(8);
  };

  const closeCategoryView = () => {
    setSelectedCategory(null);
    setSearchQuery('');
    setVisibleArticles(8);
  };

  const openArticleView = (article?: any) => {
    setSelectedArticle(article || sampleArticle);
  };

  const closeArticleView = () => {
    setSelectedArticle(null);
  };

  const getSelectedCategoryArticles = () => {
    if (!selectedCategory) return [];
    return allCategoryArticles[selectedCategory as keyof typeof allCategoryArticles] || [];
  };

  const getFilteredArticles = () => {
    const categoryArticles = getSelectedCategoryArticles();
    if (!searchQuery) return categoryArticles;

    return categoryArticles.filter(article => 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredArticles = getFilteredArticles();
  const displayedArticles = filteredArticles.slice(0, visibleArticles);
  const hasMoreArticles = visibleArticles < filteredArticles.length;

  const loadMoreArticles = () => {
    setVisibleArticles(prev => Math.min(prev + 5, filteredArticles.length));
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: "You",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        content: newComment,
        date: "Just now",
        likes: 0,
        replies: 0,
        isLiked: false
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  const toggleCommentLike = (commentId: number) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { 
            ...comment, 
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
          }
        : comment
    ));
  };

  const articles = [
    {
      title: "Digital Literacy in Rural Communities",
      excerpt: "How mobile technology is bridging the digital divide in remote areas.",
      author: "Sarah Mwangi",
      category: "Tech Trends",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "The Rise of Online Learning Platforms",
      excerpt: "Analyzing the growth and impact of e-learning solutions across Africa.",
      author: "Michael Osei",
      category: "Research World",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Women in STEM Education",
      excerpt: "Celebrating female leaders who are shaping the future of science education.",
      author: "Fatima Al-Rashid",
      category: "Career Campus",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Traditional African Wisdom in Modern Education",
      excerpt: "How ancestral knowledge systems are being integrated into contemporary learning.",
      author: "Kwame Asante",
      category: "Spirit of Africa",
      image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Mental Health in Academic Settings",
      excerpt: "Understanding how students adapt to digital learning environments and maintain wellbeing.",
      author: "Dr. Aisha Patel",
      category: "Mind and Body Quest",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Celebrity Educators Making Impact",
      excerpt: "High-profile personalities who are championing educational causes across the continent.",
      author: "Grace Mbeki",
      category: "E! Corner",
      image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
  ];

  const filteredMainArticles = selectedCategory 
    ? articles.filter(article => article.category === selectedCategory)
    : articles;

  const handleVideoClick = (videoId: string) => {
    setSelectedVideo(videoId);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  // If an article is selected, show the article page
  if (selectedArticle) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors`}>
        {/* Article Header */}
        <section className={`py-8 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} transition-colors`}>
          <div className="max-w-4xl mx-auto px-6">
            {/* Back Button */}
            <button
              onClick={closeArticleView}
              className={`flex items-center space-x-2 mb-6 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors group`}
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Magazine</span>
            </button>

            {/* Article Meta */}
            <div className="flex items-center space-x-4 mb-4">
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: 'rgba(242, 23, 23, 0.1)', color: '#F21717' }}>
                {selectedArticle.category}
              </span>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>{selectedArticle.publishDate}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{selectedArticle.readTime}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Eye className="w-4 h-4" />
                <span>{selectedArticle.views} views</span>
              </div>
            </div>

            {/* Article Title */}
            <h1 className={`text-4xl lg:text-5xl font-bold mb-4 leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {selectedArticle.title}
            </h1>

            {/* Article Subtitle */}
            <p className={`text-xl mb-6 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {selectedArticle.subtitle}
            </p>

            {/* Author Info */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <img 
                  src={selectedArticle.author.avatar}
                  alt={selectedArticle.author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedArticle.author.name}
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {selectedArticle.author.credentials}
                  </p>
                </div>
              </div>

              {/* Article Actions */}
              <div className="flex items-center space-x-4">
                <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${selectedArticle.isLiked ? 'bg-red-100 text-red-600' : `${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}`}>
                  <Heart className={`w-5 h-5 ${selectedArticle.isLiked ? 'fill-current' : ''}`} />
                  <span>{selectedArticle.likes}</span>
                </button>
                <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  <Share2 className="w-5 h-5" />
                  <span>{selectedArticle.shares}</span>
                </button>
                <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${selectedArticle.isBookmarked ? 'bg-blue-100 text-blue-600' : `${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}`}>
                  <Bookmark className={`w-5 h-5 ${selectedArticle.isBookmarked ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className={`py-12 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors`}>
          <div className="max-w-4xl mx-auto px-6">
            {/* Featured Image */}
            <img 
              src={selectedArticle.featuredImage}
              alt={selectedArticle.title}
              className="w-full h-96 object-cover rounded-2xl mb-12"
            />

            {/* Article Body */}
            <div className="prose prose-lg max-w-none">
              {/* Introduction */}
              <p className={`text-lg leading-relaxed mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {selectedArticle.content.introduction}
              </p>

              {/* Content Sections */}
              {selectedArticle.content.sections.map((section: any, index: number) => (
                <div key={index} className="mb-12">
                  <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {section.heading}
                  </h2>
                  <p className={`text-lg leading-relaxed mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {section.content}
                  </p>
                  {section.image && (
                    <img 
                      src={section.image}
                      alt={section.heading}
                      className="w-full h-64 object-cover rounded-xl mb-6"
                    />
                  )}
                </div>
              ))}

              {/* Conclusion */}
              <div className="mb-12">
                <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Looking Forward
                </h2>
                <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {selectedArticle.content.conclusion}
                </p>
              </div>

              {/* Tags */}
              <div className="mb-12">
                <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedArticle.tags.map((tag: string, index: number) => (
                    <span 
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
                    >
                      #{tag.replace(/\s+/g, '')}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author Bio */}
              <div className={`p-6 rounded-xl mb-12 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border`}>
                <div className="flex items-start space-x-4">
                  <img 
                    src={selectedArticle.author.avatar}
                    alt={selectedArticle.author.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      About {selectedArticle.author.name}
                    </h3>
                    <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {selectedArticle.author.bio}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comments Section */}
        <section className={`py-12 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} transition-colors`}>
          <div className="max-w-4xl mx-auto px-6">
            <h2 className={`text-2xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Comments ({comments.length})
            </h2>

            {/* Add Comment */}
            <div className={`p-6 rounded-xl mb-8 ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Add a comment
              </h3>
              <div className="flex space-x-4">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                  alt="Your avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts..."
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors ${
                      isDarkMode 
                        ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    rows={3}
                  />
                  <div className="flex justify-end mt-3">
                    <button
                      onClick={handleAddComment}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2"
                      style={{ backgroundColor: '#F21717' }}
                    >
                      <Send className="w-4 h-4" />
                      <span>Post Comment</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border`}>
                  <div className="flex items-start space-x-4">
                    <img 
                      src={comment.avatar}
                      alt={comment.author}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {comment.author}
                        </h4>
                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {comment.date}
                        </span>
                      </div>
                      <p className={`mb-3 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {comment.content}
                      </p>
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => toggleCommentLike(comment.id)}
                          className={`flex items-center space-x-2 text-sm transition-colors ${
                            comment.isLiked 
                              ? 'text-red-600' 
                              : `${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
                          }`}
                        >
                          <ThumbsUp className={`w-4 h-4 ${comment.isLiked ? 'fill-current' : ''}`} />
                          <span>{comment.likes}</span>
                        </button>
                        <button className={`flex items-center space-x-2 text-sm transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}>
                          <MessageCircle className="w-4 h-4" />
                          <span>Reply ({comment.replies})</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Articles Section */}
        <section className={`py-12 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors`}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Related Articles - Vertical (3/4 width) */}
              <div className="lg:col-span-3">
                <h2 className={`text-2xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Related Articles
                </h2>
                <div className="space-y-6">
                  {relatedArticles.map((article, index) => (
                    <div 
                      key={index} 
                      className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl overflow-hidden shadow-lg border hover:shadow-xl transition-shadow duration-300 group cursor-pointer`}
                      onClick={() => openArticleView()}
                    >
                      <div className="flex">
                        <img 
                          src={article.image}
                          alt={article.title}
                          className="w-48 h-32 object-cover flex-shrink-0"
                        />
                        <div className="flex-1 p-6">
                          <div className="flex items-center justify-between mb-2">
                            <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'rgba(242, 23, 23, 0.1)', color: '#F21717' }}>
                              {article.category}
                            </span>
                            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {article.readTime}
                            </span>
                          </div>
                          <h3 className={`text-lg font-bold mb-2 leading-tight group-hover:text-red-600 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {article.title}
                          </h3>
                          <p className={`text-sm leading-relaxed mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {article.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <User className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                              <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{article.author}</span>
                            </div>
                            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {article.date}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Other Articles - Sidebar (1/4 width) */}
              <div className="lg:col-span-1">
                <h2 className={`text-2xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Other Articles
                </h2>
                <div className="space-y-6">
                  {otherArticles.map((article, index) => (
                    <div 
                      key={index} 
                      className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl overflow-hidden shadow-lg border hover:shadow-xl transition-shadow duration-300 group cursor-pointer`}
                      onClick={() => openArticleView()}
                    >
                      <img 
                        src={article.image}
                        alt={article.title}
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'rgba(242, 23, 23, 0.1)', color: '#F21717' }}>
                            {article.category}
                          </span>
                        </div>
                        <h3 className={`text-sm font-bold mb-2 leading-tight group-hover:text-red-600 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {article.title}
                        </h3>
                        <div className="flex items-center justify-between text-xs">
                          <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {article.readTime}
                          </span>
                          <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {article.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-800 border-gray-700'} border-t transition-colors`}>
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid lg:grid-cols-4 gap-12">
              {/* Brand Section */}
              <div className="lg:col-span-1">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold">
                    <span className="text-blue-600">The </span>
                    <span className="text-red-600" style={{ color: '#F21717' }}>Insightium</span>
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-gray-300">
                    Empowering education through innovative content, inspiring stories, and transformative insights that shape the future of learning across Africa and beyond.
                  </p>
                </div>
                
                {/* Social Media Links */}
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
                <ul className="space-y-3">
                  {['About Us', 'Our Team', 'Contact Us', 'Privacy Policy', 'Terms of Service', 'Advertise With Us'].map((link, index) => (
                    <li key={index}>
                      <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors hover:underline">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Content Categories */}
              <div>
                <h4 className="text-lg font-semibold mb-6 text-white">Content</h4>
                <ul className="space-y-3">
                  {categories.slice(0, 6).map((category, index) => (
                    <li key={index}>
                      <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors hover:underline">
                        {category}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact & Newsletter */}
              <div>
                <h4 className="text-lg font-semibold mb-6 text-white">Stay Connected</h4>
                
                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-300">hello@theinsightium.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-300">+254 700 123 456</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-300">Nairobi, Kenya</span>
                  </div>
                </div>

                {/* Newsletter Signup */}
                <div>
                  <p className="text-sm mb-3 text-gray-300">
                    Subscribe to our newsletter for the latest updates
                  </p>
                  <div className="flex">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="flex-1 px-3 py-2 text-sm border bg-gray-700 border-gray-600 text-white placeholder-gray-400 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                    />
                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm rounded-r-lg transition-colors" style={{ backgroundColor: '#F21717' }}>
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-400">
                © 2024 The Insightium. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // If a category is selected, show the category page
  if (selectedCategory) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors`}>
        {/* Category Page Header */}
        <section className={`py-12 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} transition-colors`}>
          <div className="max-w-7xl mx-auto px-6">
            {/* Back Button and Category Title */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-6">
                <button
                  onClick={closeCategoryView}
                  className={`flex items-center space-x-2 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors group`}
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <span className="font-medium">Back to Magazine</span>
                </button>
                <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {selectedCategory}
                </h1>
              </div>
              
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-10 pr-4 py-3 w-80 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
            </div>

            {/* Results Count */}
            <div className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Showing {displayedArticles.length} of {filteredArticles.length} articles
              {searchQuery && ` for "${searchQuery}"`}
            </div>
          </div>
        </section>

        {/* Articles List Section */}
        <section className={`py-12 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors`}>
          <div className="max-w-7xl mx-auto px-6">
            {displayedArticles.length > 0 ? (
              <>
                <div className="space-y-6">
                  {displayedArticles.map((article, index) => (
                    <div 
                      key={index} 
                      className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl overflow-hidden shadow-lg border hover:shadow-xl transition-shadow duration-300 group cursor-pointer`}
                      onClick={() => openArticleView()}
                    >
                      <div className="flex">
                        <img 
                          src={article.image}
                          alt={article.title}
                          className="w-48 h-32 object-cover flex-shrink-0"
                        />
                        <div className="flex-1 p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              {article.isFeatured && (
                                <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium mb-2 inline-block" style={{ backgroundColor: 'rgba(242, 23, 23, 0.1)', color: '#F21717' }}>
                                  FEATURED
                                </span>
                              )}
                              <h3 className={`text-xl font-bold mb-2 leading-tight group-hover:text-red-600 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {article.title}
                              </h3>
                              <p className={`text-sm leading-relaxed mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                {article.excerpt}
                              </p>
                            </div>
                            <div className={`text-right text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} ml-6`}>
                              <div className="flex items-center space-x-4">
                                <span>{article.readTime}</span>
                                <span>{article.views} views</span>
                                <div className="flex items-center space-x-1">
                                  <span>⭐</span>
                                  <span>{article.rating}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm">
                              <div className="flex items-center space-x-2">
                                <User className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                                <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{article.author}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Clock className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{article.date}</span>
                              </div>
                            </div>
                            <button className="text-red-600 hover:text-red-700 transition-colors text-sm font-semibold flex items-center space-x-1" style={{ color: '#F21717' }}>
                              <span>Read More</span>
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Load More Section */}
                <div className="text-center mt-12">
                  {hasMoreArticles && (
                    <button 
                      onClick={loadMoreArticles}
                      className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors mb-4" 
                      style={{ backgroundColor: '#F21717' }}
                    >
                      Load More Articles
                    </button>
                  )}
                  
                  {/* Article Counter */}
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-4`}>
                    Showing {displayedArticles.length} out of {filteredArticles.length} articles
                  </div>
                </div>
              </>
            ) : (
              /* No Results Message */
              <div className="text-center py-20">
                <div className={`text-8xl mb-6 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`}>📰</div>
                <h3 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  No articles found
                </h3>
                <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Try adjusting your search criteria
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-800 border-gray-700'} border-t transition-colors`}>
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid lg:grid-cols-4 gap-12">
              {/* Brand Section */}
              <div className="lg:col-span-1">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold">
                    <span className="text-blue-600">The </span>
                    <span className="text-red-600" style={{ color: '#F21717' }}>Insightium</span>
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-gray-300">
                    Empowering education through innovative content, inspiring stories, and transformative insights that shape the future of learning across Africa and beyond.
                  </p>
                </div>
                
                {/* Social Media Links */}
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
                <ul className="space-y-3">
                  {['About Us', 'Our Team', 'Contact Us', 'Privacy Policy', 'Terms of Service', 'Advertise With Us'].map((link, index) => (
                    <li key={index}>
                      <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors hover:underline">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Content Categories */}
              <div>
                <h4 className="text-lg font-semibold mb-6 text-white">Content</h4>
                <ul className="space-y-3">
                  {categories.slice(0, 6).map((category, index) => (
                    <li key={index}>
                      <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors hover:underline">
                        {category}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact & Newsletter */}
              <div>
                <h4 className="text-lg font-semibold mb-6 text-white">Stay Connected</h4>
                
                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-300">hello@theinsightium.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-300">+254 700 123 456</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-300">Nairobi, Kenya</span>
                  </div>
                </div>

                {/* Newsletter Signup */}
                <div>
                  <p className="text-sm mb-3 text-gray-300">
                    Subscribe to our newsletter for the latest updates
                  </p>
                  <div className="flex">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="flex-1 px-3 py-2 text-sm border bg-gray-700 border-gray-600 text-white placeholder-gray-400 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                    />
                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm rounded-r-lg transition-colors" style={{ backgroundColor: '#F21717' }}>
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-400">
                © 2024 The Insightium. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors`}>
      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative bg-black rounded-lg overflow-hidden max-w-4xl w-full max-h-[80vh]">
            {/* Close Button */}
            <button
              onClick={closeVideoModal}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Video Player */}
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0&modestbranding=1&showinfo=0`}
                title="Video Player"
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Categories Moving Section */}
      <section className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border-b py-4 overflow-hidden transition-colors`}>
        <div className="relative">
          <div className="flex animate-scroll hover:pause-animation">
            {/* First set of categories */}
            {categories.map((category, index) => (
              <div key={`first-${index}`} className="flex items-center flex-shrink-0">
                <button
                  onClick={() => openCategoryView(category)}
                  className={`px-6 py-2 mx-2 font-medium transition-all duration-300 relative group ${
                    selectedCategory === category
                      ? `${isDarkMode ? 'text-white' : 'text-gray-900'} font-semibold`
                      : `${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`
                  }`}
                >
                  {category}
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 transform origin-left transition-all duration-300 ${
                    selectedCategory === category ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} style={{ backgroundColor: '#F21717', filter: 'drop-shadow(0 2px 4px rgba(242, 23, 23, 0.3))' }}></div>
                </button>
                {index < categories.length - 1 && (
                  <div className={`w-px h-6 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'} mx-2`}></div>
                )}
              </div>
            ))}
            {/* Second set of categories for seamless loop */}
            {categories.map((category, index) => (
              <div key={`second-${index}`} className="flex items-center flex-shrink-0">
                <button
                  onClick={() => openCategoryView(category)}
                  className={`px-6 py-2 mx-2 font-medium transition-all duration-300 relative group ${
                    selectedCategory === category
                      ? `${isDarkMode ? 'text-white' : 'text-gray-900'} font-semibold`
                      : `${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`
                  }`}
                >
                  {category}
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 transform origin-left transition-all duration-300 ${
                    selectedCategory === category ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} style={{ backgroundColor: '#F21717', filter: 'drop-shadow(0 2px 4px rgba(242, 23, 23, 0.3))' }}></div>
                </button>
                {index < categories.length - 1 && (
                  <div className={`w-px h-6 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'} mx-2`}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Articles Section - Above Editor's Pick */}
      <MainArticlesSection isDarkMode={isDarkMode} />

      {/* Editor's Pick Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} transition-colors`}>
        <div className="max-w-7xl mx-auto px-6">
          {/* Title with full-width underline */}
          <div className="relative mb-12">
            <h2 className={`text-4xl font-normal text-left ${isDarkMode ? 'text-white' : 'text-gray-900'} relative inline-block`}>
              Editor's Pick
            </h2>
            {/* Full-width blue underline */}
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {editorsPickArticles.map((article, index) => (
              <div 
                key={index} 
                className="group cursor-pointer"
                onClick={() => openArticleView()}
              >
                <div className="relative overflow-hidden rounded-xl mb-4">
                  <img 
                    src={article.image}
                    alt={article.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: '#F21717' }}>
                      {article.category}
                    </span>
                  </div>
                </div>
                
                <h3 className={`text-xl font-bold mb-3 leading-tight relative group-hover:after:scale-x-100 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-600 after:transform after:scale-x-0 after:origin-left after:transition-transform after:duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ '--after-bg': '#F21717' } as React.CSSProperties}>
                  {article.title}
                </h3>
                
                <div className="flex items-center space-x-2">
                  <User className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {article.author}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Videos Section - Reduced Spacing */}
      <section className="py-12 bg-gray-700">
        <div className="max-w-7xl mx-auto px-6">
          {/* Simple Videos Title - Left Aligned */}
          <div className="mb-8">
            <h2 className="text-4xl font-normal text-left text-white">
              Videos
            </h2>
          </div>

          {/* Featured Videos Grid - 4 videos in one line */}
          <div className="grid lg:grid-cols-4 gap-6">
            {featuredVideos.map((video, index) => (
              <div key={index} className="bg-gray-800 border-gray-600 rounded-xl overflow-hidden shadow-lg border hover:shadow-xl transition-all duration-300 group cursor-pointer">
                <div className="relative">
                  {/* Video Thumbnail */}
                  <div 
                    className="relative w-full h-48 bg-black rounded-t-xl overflow-hidden cursor-pointer"
                    onClick={() => handleVideoClick(video.videoId)}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Video overlay with smaller play button */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="bg-red-600 rounded-full p-3 transform group-hover:scale-110 transition-transform duration-300 shadow-xl" style={{ backgroundColor: '#F21717' }}>
                        <Play className="w-6 h-6 text-white fill-current" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2 leading-tight relative group-hover:after:scale-x-100 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 after:transform after:scale-x-0 after:origin-left after:transition-transform after:duration-300 text-white">
                    {video.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-3 text-gray-300">
                    {video.description}
                  </p>
                  
                  {/* Action button - Blue */}
                  <button 
                    className="flex items-center space-x-2 text-blue-500 hover:text-blue-400 font-semibold transition-colors group/btn"
                    onClick={() => handleVideoClick(video.videoId)}
                  >
                    <Play className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                    <span>Watch Now</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two-Column Articles Section - Regular Articles Left, Trending Right */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Regular Articles (not featured, trending, or editor's pick) */}
            <div className="lg:col-span-2">
              <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Latest Articles ({regularArticles.length} articles with no status)
              </h2>
              <div className="space-y-6">
                {regularArticles.slice(0, 5).map((article) => (
                  <div 
                    key={article._id || article.id} 
                    className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl overflow-hidden shadow-lg border hover:shadow-xl transition-shadow duration-300 group cursor-pointer`}
                    onClick={() => navigate(`/article/${article._id || article.id}`)}
                  >
                    <div className="flex">
                      <img 
                        src={article.featured_image || article.featuredImage || 'https://images.unsplash.com/photo-1497493292307-31c376b6e479?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'}
                        alt={article.title}
                        className="w-32 h-32 object-cover flex-shrink-0"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1497493292307-31c376b6e479?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
                        }}
                      />
                      <div className="flex-1 p-6">
                        <div className="flex items-center justify-between mb-2">
                          {(article.categoryName || article.category) && (
                            <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'rgba(242, 23, 23, 0.1)', color: '#F21717' }}>
                              {article.categoryName || article.category}
                            </span>
                          )}
                        </div>
                        <h3 className={`text-xl font-bold mb-3 leading-tight relative group-hover:after:scale-x-100 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-600 after:transform after:scale-x-0 after:origin-left after:transition-transform after:duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ '--after-bg': '#F21717' } as React.CSSProperties}>
                          {article.title}
                        </h3>
                        <p className={`text-sm leading-relaxed line-clamp-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {article.excerpt || article.subtitle}
                        </p>
                        {article.author && (
                          <div className="flex items-center space-x-2 mt-3">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {article.author}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {regularArticles.length === 0 && (
                  <div className={`text-center py-12 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-xl`}>
                    <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      No additional articles available at the moment.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Trending Articles */}
            <div className="lg:col-span-1">
              <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl p-6 shadow-lg border sticky top-24`}>
                <h3 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Trending Articles
                </h3>
                <div className="space-y-6">
                  {trendingArticles.slice(0, 8).map((article, index) => (
                    <div 
                      key={article._id || article.id} 
                      className="group cursor-pointer" 
                      onClick={() => navigate(`/article/${article._id || article.id}`)}
                    >
                      <div className="flex items-start space-x-3">
                        <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                          {index + 1}
                        </span>
                        <h4 className={`text-sm font-medium leading-tight group-hover:text-red-600 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ '--hover-color': '#F21717' } as React.CSSProperties}>
                          {article.title}
                        </h4>
                      </div>
                      {/* Thin black line between articles */}
                      {index < Math.min(trendingArticles.length, 8) - 1 && (
                        <div className={`mt-6 h-px ${isDarkMode ? 'bg-gray-600' : 'bg-black'} opacity-20`}></div>
                      )}
                    </div>
                  ))}
                  {trendingArticles.length === 0 && (
                    <p className={`text-sm text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      No trending articles at the moment.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Category Indicator */}
      {selectedCategory && (
        <section className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} py-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} transition-colors`}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Showing articles from:
                </span>
                <span className="text-red-600 text-lg font-bold" style={{ color: '#F21717' }}>
                  {selectedCategory}
                </span>
              </div>
              <button
                onClick={() => setSelectedCategory(null)}
                className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'} transition-colors`}
              >
                Clear filter
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Beautiful Footer */}
      <footer className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-800 border-gray-700'} border-t transition-colors`}>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <h3 className="text-2xl font-bold">
                  <span className="text-blue-600">The </span>
                  <span className="text-red-600" style={{ color: '#F21717' }}>Insightium</span>
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-gray-300">
                  Empowering education through innovative content, inspiring stories, and transformative insights that shape the future of learning across Africa and beyond.
                </p>
              </div>
              
              {/* Social Media Links */}
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3">
                {['About Us', 'Our Team', 'Contact Us', 'Privacy Policy', 'Terms of Service', 'Advertise With Us'].map((link, index) => (
                  <li key={index}>
                    <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors hover:underline">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Content Categories */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Content</h4>
              <ul className="space-y-3">
                {categories.slice(0, 6).map((category, index) => (
                  <li key={index}>
                    <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors hover:underline">
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Newsletter */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Stay Connected</h4>
              
              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">hello@theinsightium.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">+254 700 123 456</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">Nairobi, Kenya</span>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div>
                <p className="text-sm mb-3 text-gray-300">
                  Subscribe to our newsletter for the latest updates
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 text-sm border bg-gray-700 border-gray-600 text-white placeholder-gray-400 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                  />
                  <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm rounded-r-lg transition-colors" style={{ backgroundColor: '#F21717' }}>
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2024 The Insightium. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}