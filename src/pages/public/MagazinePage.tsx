import React, { useEffect, useState } from 'react';
import { publicApi } from '../../lib/publicApi';
import type { Article, Video } from '../../lib/publicApi';
import HeroSection from '../../components/magazine/HeroSection';
import FeaturedGrid from '../../components/magazine/FeaturedGrid';
import EditorsPickSection from '../../components/magazine/EditorsPickSection';
import TrendingSection from '../../components/magazine/TrendingSection';
import LatestArticles from '../../components/magazine/LatestArticles';
import MagazineVideos from '../../components/magazine/MagazineVideos';
import NewsletterBanner from '../../components/shared/NewsletterBanner';
import Footer from '../../components/shared/Footer';

export default function MagazinePage() {
  const [mainArticles, setMainArticles] = useState<Record<string, Article>>({});
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
  const [editorsPick, setEditorsPick] = useState<Article[]>([]);
  const [trendingArticles, setTrendingArticles] = useState<Article[]>([]);
  const [latestArticles, setLatestArticles] = useState<Article[]>([]);
  const [magazineVideos, setMagazineVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [mainRes, featRes, editRes, trendRes, latestRes, videoRes] = await Promise.all([
        publicApi.articles.getMainArticles(),
        publicApi.articles.getFeaturedCurated(),
        publicApi.articles.getEditorsPick(),
        publicApi.articles.getTrending(),
        publicApi.articles.getAll(),
        publicApi.videos.getBySection('Magazine'),
      ]);

      if (mainRes.data) {
        const map: Record<string, Article> = {};
        mainRes.data.forEach((row: any) => {
          if (row.articles) map[row.position] = row.articles as Article;
        });
        setMainArticles(map);
      }

      if (featRes.data) {
        const articles = featRes.data
          .map((row: any) => row.articles)
          .filter(Boolean) as Article[];
        setFeaturedArticles(articles.length > 0 ? articles : (await publicApi.articles.getFeatured()).data as Article[] || []);
      } else {
        const { data } = await publicApi.articles.getFeatured();
        setFeaturedArticles(data as Article[] || []);
      }

      if (editRes.data) {
        const articles = editRes.data.map((row: any) => row.articles).filter(Boolean) as Article[];
        setEditorsPick(articles);
      }

      setTrendingArticles(trendRes.data as Article[] || []);

      const allArticles = latestRes.data as Article[] || [];
      setLatestArticles(allArticles.slice(0, 12));

      setMagazineVideos(videoRes.data as Video[] || []);
      setIsLoading(false);
    }
    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-cream dark:bg-brand-black">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse ${i === 0 ? 'lg:col-span-2 h-96' : 'h-48'}`} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-cream dark:bg-brand-black page-enter">
      <HeroSection mainArticle={mainArticles['main']} secondArticle={mainArticles['second']} allArticles={latestArticles} />
      <FeaturedGrid articles={featuredArticles.length > 0 ? featuredArticles : latestArticles.slice(0, 3)} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <EditorsPickSection articles={editorsPick.length > 0 ? editorsPick : latestArticles.slice(3, 8)} />
          </div>
          <div>
            <TrendingSection articles={trendingArticles.length > 0 ? trendingArticles : latestArticles.slice(0, 6)} />
          </div>
        </div>
      </div>
      <NewsletterBanner />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <LatestArticles articles={latestArticles} />
      </div>
      {magazineVideos.length > 0 && (
        <div className="bg-neutral-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MagazineVideos videos={magazineVideos} />
          </div>
        </div>
      )}
    </div>
  );
}
