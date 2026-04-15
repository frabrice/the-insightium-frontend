import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Tv, Mic, Globe } from 'lucide-react';
import NewsletterBanner from '../../components/shared/NewsletterBanner';

export default function AboutPage() {
  return (
    <div className="bg-brand-cream dark:bg-brand-black page-enter">
      <div className="bg-brand-black py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-label text-brand-red text-xs mb-4 animate-fade-up">About Us</p>
          <h1 className="font-display font-black text-white mb-6 animate-fade-up delay-100" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', lineHeight: '1.1' }}>
            Telling Africa&apos;s<br />
            <span className="text-brand-red">Most Important Stories</span>
          </h1>
          <p className="text-neutral-400 text-lg font-serif leading-relaxed max-w-2xl mx-auto animate-fade-up delay-200">
            The Insightium is Africa&apos;s premier digital media platform dedicated to education, technology, innovation, and culture. We believe that telling the right stories can transform a continent.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="animate-fade-up">
            <p className="text-label text-brand-red text-xs mb-3">Our Mission</p>
            <h2 className="font-display font-bold text-brand-black dark:text-white text-3xl mb-6" style={{ lineHeight: '1.2' }}>
              Empowering Minds,<br />Inspiring Action
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 font-serif text-base leading-relaxed mb-4">
              We exist to shine a light on the transformative work happening across Africa. From groundbreaking educational initiatives to technological breakthroughs, we cover the stories that matter most.
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 font-serif text-base leading-relaxed">
              Through our magazine, TV shows, and podcast, we create a space where ideas flow freely and Africa&apos;s best minds can be heard by the world.
            </p>
          </div>
          <div className="animate-fade-up delay-200">
            <img
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2"
              alt="Our team"
              className="w-full rounded-sm shadow-editorial-hover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            { icon: BookOpen, label: 'Magazine', desc: 'In-depth articles on education, tech, and culture' },
            { icon: Tv, label: 'TV Shows', desc: 'Original series exploring African innovation' },
            { icon: Mic, label: 'Podcast', desc: 'Conversations with Africa\'s thought leaders' },
            { icon: Globe, label: 'Community', desc: 'A global network of African change-makers' },
          ].map((item, i) => (
            <div
              key={item.label}
              className="bg-white dark:bg-neutral-900 p-6 rounded-sm border border-neutral-200 dark:border-neutral-700 animate-fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-10 h-10 bg-brand-red/10 rounded-sm flex items-center justify-center mb-4">
                <item.icon size={18} className="text-brand-red" />
              </div>
              <h3 className="font-display font-bold text-brand-black dark:text-white text-lg mb-2">{item.label}</h3>
              <p className="text-neutral-500 text-sm font-serif leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <h2 className="font-display font-bold text-brand-black dark:text-white text-3xl mb-4 animate-fade-up">
            Want to Contribute?
          </h2>
          <p className="text-neutral-500 font-serif mb-6 animate-fade-up delay-100">
            We&apos;re always looking for passionate writers, journalists, and storytellers.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-brand-red text-white px-6 py-3 text-sm font-medium rounded-sm hover:bg-brand-red-dark transition-colors animate-fade-up delay-200"
          >
            Get In Touch <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <NewsletterBanner />
    </div>
  );
}
