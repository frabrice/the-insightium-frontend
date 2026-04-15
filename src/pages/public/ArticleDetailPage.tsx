import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Eye, Calendar, Twitter, Facebook, Link2, Bookmark, BookmarkCheck, ChevronRight, MessageCircle } from 'lucide-react';
import { publicApi } from '../../lib/publicApi';
import type { Article } from '../../lib/publicApi';
import { useReaderAuth } from '../../contexts/ReaderAuthContext';
import TrendingSection from '../../components/magazine/TrendingSection';
import CommentsSection from '../../components/article/CommentsSection';
import RelatedArticles from '../../components/article/RelatedArticles';
import NewsletterBanner from '../../components/shared/NewsletterBanner';

export default function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useReaderAuth();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [trendingArticles, setTrendingArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [readProgress, setReadProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const articleRef = useRef<HTMLDivElement>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    async function load() {
      setIsLoading(true);
      const { data } = await publicApi.articles.getById(id!);
      setArticle(data);
      if (data) {
        const [relRes, trendRes] = await Promise.all([
          publicApi.articles.getRelated(data.category_name, id!),
          publicApi.articles.getTrending(),
        ]);
        setRelatedArticles(relRes.data as Article[] || []);
        setTrendingArticles(trendRes.data as Article[] || []);
        publicApi.articles.incrementView(id!);
      }
      setIsLoading(false);
    }
    load();
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!user || !id) return;
    publicApi.bookmarks.check(user.id, id).then(({ data }) => {
      setIsBookmarked(!!data);
    });
  }, [user, id]);

  useEffect(() => {
    function handleScroll() {
      if (!articleRef.current) return;
      const el = articleRef.current;
      const totalHeight = el.offsetHeight;
      const scrolled = window.scrollY - el.offsetTop + window.innerHeight;
      const progress = Math.min(100, Math.max(0, (scrolled / totalHeight) * 100));
      setReadProgress(progress);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  async function handleBookmark() {
    if (!user || !id) return;
    if (isBookmarked) {
      await publicApi.bookmarks.remove(user.id, id);
      setIsBookmarked(false);
    } else {
      await publicApi.bookmarks.add(user.id, id);
      setIsBookmarked(true);
    }
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-cream dark:bg-brand-black">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="h-8 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse mb-4 w-24" />
          <div className="h-12 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse mb-3" />
          <div className="h-12 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse mb-8 w-3/4" />
          <div className="aspect-[16/9] bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse mb-8" />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-5 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse mb-3" />
          ))}
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-brand-cream dark:bg-brand-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display font-bold text-2xl text-brand-black dark:text-white mb-2">Article not found</h2>
          <Link to="/magazine" className="text-brand-red hover:underline text-sm">Back to Magazine</Link>
        </div>
      </div>
    );
  }

  const galleryImages = article.gallery_images || [];

  return (
    <>
      <div
        className="reading-progress"
        style={{ width: `${readProgress}%` }}
      />

      <div className="bg-brand-cream dark:bg-brand-black page-enter">
        <div className="relative">
          <div className="w-full aspect-[21/9] max-h-[520px] overflow-hidden">
            <img
              src={article.featured_image || 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
              alt={article.featured_image_alt || article.title}
              className="w-full h-full object-cover"
            />
            <div className="hero-gradient absolute inset-0" />
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 mb-3">
                  <Link to="/magazine" className="text-neutral-400 text-xs hover:text-white">Magazine</Link>
                  <ChevronRight size={12} className="text-neutral-500" />
                  <span className="text-label text-brand-red text-xs">{article.category_name}</span>
                </div>
                <h1 className="text-display-xl text-white mb-3 animate-fade-up" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
                  {article.title}
                </h1>
                {article.subtitle && (
                  <p className="text-neutral-300 text-lg font-serif leading-relaxed animate-fade-up delay-100">
                    {article.subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-red flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {article.author?.[0]?.toUpperCase() || 'A'}
                  </div>
                  <div>
                    <p className="font-medium text-brand-black dark:text-white text-sm">{article.author}</p>
                    {article.author_bio && (
                      <p className="text-xs text-neutral-500 line-clamp-1">{article.author_bio}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-neutral-500">
                  <span className="flex items-center gap-1">
                    <Calendar size={11} />
                    {new Date(article.publish_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  {article.read_time && (
                    <span className="flex items-center gap-1">
                      <Clock size={11} /> {article.read_time}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Eye size={11} /> {article.view_count || article.views || 0}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-8">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-brand-red dark:hover:text-brand-red transition-colors bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5 rounded-sm"
                >
                  <Twitter size={12} /> Share
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-brand-red dark:hover:text-brand-red transition-colors bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5 rounded-sm"
                >
                  <Facebook size={12} /> Share
                </a>
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-brand-red dark:hover:text-brand-red transition-colors bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5 rounded-sm"
                >
                  <Link2 size={12} /> {showCopied ? 'Copied!' : 'Copy Link'}
                </button>
                {user && (
                  <button
                    onClick={handleBookmark}
                    className={`flex items-center gap-1.5 text-xs font-medium transition-colors px-3 py-1.5 rounded-sm ${
                      isBookmarked
                        ? 'bg-brand-red text-white'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-brand-red bg-neutral-100 dark:bg-neutral-800'
                    }`}
                  >
                    {isBookmarked ? <BookmarkCheck size={12} /> : <Bookmark size={12} />}
                    {isBookmarked ? 'Saved' : 'Save'}
                  </button>
                )}
              </div>

              <div ref={articleRef}>
                <div className="article-content" dangerouslySetInnerHTML={{ __html: article.content }} />
              </div>

              {galleryImages.length > 0 && (
                <div className="mt-10">
                  <h3 className="font-display font-bold text-brand-black dark:text-white text-xl mb-4">Gallery</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {galleryImages.map((img: any, i: number) => (
                      <button
                        key={i}
                        onClick={() => setLightboxImg(typeof img === 'string' ? img : img.url)}
                        className="img-zoom aspect-square rounded-sm overflow-hidden"
                      >
                        <img
                          src={typeof img === 'string' ? img : img.url}
                          alt={typeof img === 'object' && img.alt ? img.alt : `Gallery image ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {article.tags && (
                <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                  <p className="text-label text-neutral-400 text-xs mb-3">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.split(',').map(tag => tag.trim()).filter(Boolean).map(tag => (
                      <span
                        key={tag}
                        className="text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 px-3 py-1 rounded-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-10 p-6 bg-white dark:bg-neutral-900 rounded-sm border border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-brand-red flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    {article.author?.[0]?.toUpperCase() || 'A'}
                  </div>
                  <div>
                    <p className="text-label text-neutral-400 text-xs mb-1">Written by</p>
                    <p className="font-display font-bold text-brand-black dark:text-white text-lg">{article.author}</p>
                    {article.author_bio && (
                      <p className="text-sm text-neutral-500 mt-1 font-serif leading-relaxed">{article.author_bio}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <CommentsSection articleId={article.id} />
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="sticky top-28 space-y-6">
                <TrendingSection articles={trendingArticles} />
                <div className="bg-white dark:bg-neutral-900 rounded-sm p-5 border border-neutral-200 dark:border-neutral-700">
                  <p className="text-label text-brand-red text-xs mb-2">Category</p>
                  <Link
                    to={`/magazine`}
                    className="font-display font-bold text-brand-black dark:text-white hover:text-brand-red transition-colors"
                  >
                    {article.category_name}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {relatedArticles.length > 0 && (
          <div className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <RelatedArticles articles={relatedArticles} />
            </div>
          </div>
        )}

        <NewsletterBanner />
      </div>

      {lightboxImg && (
        <div
          className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center animate-fade-in p-4"
          onClick={() => setLightboxImg(null)}
        >
          <img src={lightboxImg} alt="Gallery" className="max-w-full max-h-full object-contain rounded-sm" />
        </div>
      )}
    </>
  );
}
