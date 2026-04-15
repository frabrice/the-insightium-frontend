import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Youtube, Instagram, Mail } from 'lucide-react';

const sections = [
  { label: 'Magazine', href: '/magazine' },
  { label: 'TV Show', href: '/tv-show' },
  { label: 'Podcast', href: '/podcast' },
];

const company = [
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Write for Us', href: '/contact' },
];

const socials = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Instagram, href: '#', label: 'Instagram' },
];

export default function Footer() {
  return (
    <footer className="bg-brand-black dark:bg-neutral-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-baseline gap-1 mb-4">
              <span className="font-display font-bold text-white text-xl">The</span>
              <span className="font-display font-black text-brand-red text-xl">Insightium</span>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed mb-5 font-serif">
              Africa&apos;s premier platform for education, technology, and innovation stories that matter.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(social => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-8 h-8 flex items-center justify-center text-neutral-500 hover:text-white transition-colors hover:bg-neutral-800 rounded-sm"
                >
                  <social.icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-label text-neutral-400 text-xs mb-4">Sections</h4>
            <ul className="space-y-2.5">
              {sections.map(item => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-neutral-400 hover:text-white transition-colors font-sans"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-label text-neutral-400 text-xs mb-4">Company</h4>
            <ul className="space-y-2.5">
              {company.map(item => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-neutral-400 hover:text-white transition-colors font-sans"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-label text-neutral-400 text-xs mb-4">Stay Connected</h4>
            <p className="text-sm text-neutral-500 mb-3 font-serif">Get our best stories in your inbox.</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-sm text-brand-red hover:text-brand-red-light transition-colors font-medium"
            >
              <Mail size={13} /> Subscribe to Newsletter
            </Link>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-neutral-600">
            &copy; {new Date().getFullYear()} The Insightium. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-neutral-600">
            <a href="#" className="hover:text-neutral-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-neutral-400 transition-colors">Terms of Use</a>
            <Link to="/admin/login" className="hover:text-neutral-400 transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
