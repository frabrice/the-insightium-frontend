import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, User } from 'lucide-react';
import { publicApi } from '../../lib/publicApi';
import { useReaderAuth } from '../../contexts/ReaderAuthContext';

interface Comment {
  id: string;
  author_name: string;
  content: string;
  created_at: string;
  parent_comment_id: string | null;
}

interface CommentsSectionProps {
  articleId: string;
}

export default function CommentsSection({ articleId }: CommentsSectionProps) {
  const { user, profile, setShowAuthModal, setAuthModalTab } = useReaderAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    loadComments();
  }, [articleId]);

  useEffect(() => {
    if (user && profile) {
      setName(profile.display_name || '');
    }
  }, [user, profile]);

  async function loadComments() {
    const { data } = await publicApi.comments.getByArticle(articleId);
    setComments(data || []);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    setIsSubmitting(true);

    const commentData = {
      article_id: articleId,
      author_name: user ? (profile?.display_name || user.email || 'Reader') : name,
      author_email: user ? user.email! : email,
      content: content.trim(),
      ...(replyTo ? { parent_comment_id: replyTo } : {}),
      ...(user ? { reader_auth_id: user.id } : {}),
    };

    const { error } = await publicApi.comments.create(commentData);
    setIsSubmitting(false);

    if (!error) {
      setContent('');
      setName('');
      setEmail('');
      setReplyTo(null);
      setSubmitted(true);
      if (user) {
        await loadComments();
      }
    }
  }

  const topLevelComments = comments.filter(c => !c.parent_comment_id);
  const getReplies = (parentId: string) => comments.filter(c => c.parent_comment_id === parentId);

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle size={18} className="text-brand-red" />
        <h3 className="font-display font-bold text-brand-black dark:text-white text-xl">
          Comments ({comments.length})
        </h3>
      </div>

      <div className="space-y-4 mb-8">
        {topLevelComments.map(comment => (
          <div key={comment.id} className="animate-fade-up">
            <div className="flex gap-3 p-4 bg-white dark:bg-neutral-900 rounded-sm">
              <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center flex-shrink-0">
                <User size={14} className="text-neutral-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-brand-black dark:text-white">{comment.author_name}</p>
                  <span className="text-xs text-neutral-400">
                    {new Date(comment.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 font-serif leading-relaxed">{comment.content}</p>
                <button
                  onClick={() => setReplyTo(comment.id)}
                  className="text-xs text-neutral-400 hover:text-brand-red transition-colors mt-2"
                >
                  Reply
                </button>
              </div>
            </div>
            {getReplies(comment.id).map(reply => (
              <div key={reply.id} className="ml-10 mt-2 flex gap-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-sm border-l-2 border-neutral-200 dark:border-neutral-700">
                <div className="w-7 h-7 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center flex-shrink-0">
                  <User size={12} className="text-neutral-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-xs font-medium text-brand-black dark:text-white">{reply.author_name}</p>
                    <span className="text-xs text-neutral-400">
                      {new Date(reply.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 font-serif leading-relaxed">{reply.content}</p>
                </div>
              </div>
            ))}
          </div>
        ))}

        {comments.length === 0 && (
          <div className="text-center py-8 text-neutral-400">
            <MessageCircle size={32} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm">No comments yet. Be the first!</p>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-sm p-5 border border-neutral-200 dark:border-neutral-700">
        <h4 className="font-display font-semibold text-brand-black dark:text-white text-base mb-4">
          {replyTo ? 'Write a Reply' : 'Leave a Comment'}
          {replyTo && (
            <button onClick={() => setReplyTo(null)} className="ml-3 text-xs text-neutral-400 hover:text-brand-red">
              Cancel
            </button>
          )}
        </h4>

        {submitted && !user ? (
          <div className="text-center py-4">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 font-serif">
              Your comment has been submitted and is awaiting moderation. Thank you!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            {!user && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your name *"
                  required
                  className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-brand-black dark:text-white text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red transition-colors"
                />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email *"
                  required
                  className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-brand-black dark:text-white text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red transition-colors"
                />
              </div>
            )}
            {user && (
              <p className="text-xs text-neutral-500">
                Commenting as <span className="font-medium text-brand-black dark:text-white">{profile?.display_name || user.email}</span>
              </p>
            )}
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Write your comment..."
              required
              rows={4}
              className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-brand-black dark:text-white text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red transition-colors resize-none font-serif leading-relaxed"
            />
            <div className="flex items-center justify-between">
              {!user && (
                <p className="text-xs text-neutral-400">
                  Your comment will be reviewed before publishing.
                </p>
              )}
              <button
                type="submit"
                disabled={isSubmitting || !content.trim()}
                className="ml-auto flex items-center gap-2 bg-brand-red text-white text-sm font-medium px-4 py-2 rounded-sm hover:bg-brand-red-dark transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <><Send size={14} /> Post Comment</>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
