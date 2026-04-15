import React, { useState } from 'react';
import { Mail, MessageSquare, Send, Check } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'General', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitted(true);
  }

  return (
    <div className="bg-brand-cream dark:bg-brand-black page-enter min-h-screen">
      <div className="bg-brand-black py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-label text-brand-red text-xs mb-3 animate-fade-up">Contact</p>
          <h1 className="font-display font-black text-white mb-4 animate-fade-up delay-100" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: '1.1' }}>
            Get in <span className="text-brand-red">Touch</span>
          </h1>
          <p className="text-neutral-400 font-serif text-lg leading-relaxed animate-fade-up delay-200">
            Whether you have a story tip, partnership inquiry, or editorial question, we&apos;d love to hear from you.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 animate-fade-up">
            <h3 className="font-display font-bold text-brand-black dark:text-white text-xl mb-6">Let&apos;s Connect</h3>
            <div className="space-y-5">
              {[
                { icon: Mail, label: 'Email', value: 'hello@insightium.africa' },
                { icon: MessageSquare, label: 'Editorial', value: 'editorial@insightium.africa' },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-brand-red/10 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                    <item.icon size={14} className="text-brand-red" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-neutral-500 mb-0.5">{item.label}</p>
                    <p className="text-sm text-brand-black dark:text-white">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 animate-fade-up delay-200">
            {isSubmitted ? (
              <div className="text-center py-16 bg-white dark:bg-neutral-900 rounded-sm border border-neutral-200 dark:border-neutral-700">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={28} className="text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-display font-bold text-brand-black dark:text-white text-xl mb-2">Message Sent!</h3>
                <p className="text-neutral-500 text-sm font-serif">Thank you for reaching out. We&apos;ll get back to you within 48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white dark:bg-neutral-900 rounded-sm border border-neutral-200 dark:border-neutral-700 p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1.5">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-brand-black dark:text-white text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red transition-colors"
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-brand-black dark:text-white text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1.5">Subject</label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-brand-black dark:text-white text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red transition-colors"
                  >
                    <option>General</option>
                    <option>Editorial</option>
                    <option>Partnerships</option>
                    <option>Technical</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1.5">Message *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-brand-black dark:text-white text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red transition-colors resize-none font-serif leading-relaxed"
                    placeholder="How can we help you?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-brand-red text-white py-3 text-sm font-medium rounded-sm hover:bg-brand-red-dark transition-colors flex items-center justify-center gap-2"
                >
                  <Send size={14} /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
