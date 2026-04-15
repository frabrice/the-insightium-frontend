import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import CharacterCount from '@tiptap/extension-character-count';
import {
  Bold, Italic, UnderlineIcon, Strikethrough, Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, Minus, AlignLeft, AlignCenter, AlignRight,
  Link2, ImageIcon, Undo, Redo, X, Plus, Save, Eye, Calendar, ChevronDown
} from 'lucide-react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { adminApi } from '../../lib/adminAuth';

interface Category {
  id: string;
  name: string;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
}

function ToolbarButton({
  onClick, active, title, children
}: { onClick: () => void; active?: boolean; title: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-1.5 rounded text-sm transition-colors ${
        active
          ? 'bg-brand-black dark:bg-white text-white dark:text-brand-black'
          : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-brand-black dark:hover:text-white'
      }`}
    >
      {children}
    </button>
  );
}

function EditorToolbar({ editor }: { editor: any }) {
  const [linkUrl, setLinkUrl] = useState('');
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const [showImgInput, setShowImgInput] = useState(false);

  if (!editor) return null;

  function addLink() {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl('');
      setShowLinkInput(false);
    }
  }

  function addImage() {
    if (imgUrl) {
      editor.chain().focus().setImage({ src: imgUrl }).run();
      setImgUrl('');
      setShowImgInput(false);
    }
  }

  return (
    <div className="border-b border-neutral-200 dark:border-neutral-700 p-2 flex flex-wrap gap-0.5 bg-neutral-50 dark:bg-neutral-800/50 rounded-t">
      <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold">
        <Bold size={14} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic">
        <Italic size={14} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Underline">
        <UnderlineIcon size={14} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Strikethrough">
        <Strikethrough size={14} />
      </ToolbarButton>

      <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-700 mx-1 self-center" />

      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })} title="Heading 1">
        <Heading1 size={14} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Heading 2">
        <Heading2 size={14} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="Heading 3">
        <Heading3 size={14} />
      </ToolbarButton>

      <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-700 mx-1 self-center" />

      <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet List">
        <List size={14} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Numbered List">
        <ListOrdered size={14} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Blockquote">
        <Quote size={14} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} active={false} title="Divider">
        <Minus size={14} />
      </ToolbarButton>

      <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-700 mx-1 self-center" />

      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} title="Align Left">
        <AlignLeft size={14} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title="Align Center">
        <AlignCenter size={14} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} title="Align Right">
        <AlignRight size={14} />
      </ToolbarButton>

      <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-700 mx-1 self-center" />

      <div className="relative">
        <ToolbarButton onClick={() => { setShowLinkInput(!showLinkInput); setShowImgInput(false); }} active={editor.isActive('link')} title="Insert Link">
          <Link2 size={14} />
        </ToolbarButton>
        {showLinkInput && (
          <div className="absolute left-0 top-full mt-1 z-10 flex gap-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded shadow-lg p-2">
            <input
              type="url"
              value={linkUrl}
              onChange={e => setLinkUrl(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addLink()}
              placeholder="https://..."
              className="text-xs border border-neutral-200 dark:border-neutral-700 bg-transparent text-brand-black dark:text-white px-2 py-1 rounded w-52 focus:outline-none focus:border-brand-red"
              autoFocus
            />
            <button type="button" onClick={addLink} className="text-xs bg-brand-red text-white px-2 py-1 rounded hover:bg-brand-red-dark">Add</button>
            <button type="button" onClick={() => setShowLinkInput(false)} className="text-neutral-400 hover:text-neutral-600 p-1"><X size={12} /></button>
          </div>
        )}
      </div>

      <div className="relative">
        <ToolbarButton onClick={() => { setShowImgInput(!showImgInput); setShowLinkInput(false); }} active={false} title="Insert Image">
          <ImageIcon size={14} />
        </ToolbarButton>
        {showImgInput && (
          <div className="absolute left-0 top-full mt-1 z-10 flex gap-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded shadow-lg p-2">
            <input
              type="url"
              value={imgUrl}
              onChange={e => setImgUrl(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addImage()}
              placeholder="Image URL..."
              className="text-xs border border-neutral-200 dark:border-neutral-700 bg-transparent text-brand-black dark:text-white px-2 py-1 rounded w-52 focus:outline-none focus:border-brand-red"
              autoFocus
            />
            <button type="button" onClick={addImage} className="text-xs bg-brand-red text-white px-2 py-1 rounded hover:bg-brand-red-dark">Add</button>
            <button type="button" onClick={() => setShowImgInput(false)} className="text-neutral-400 hover:text-neutral-600 p-1"><X size={12} /></button>
          </div>
        )}
      </div>

      <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-700 mx-1 self-center" />

      <ToolbarButton onClick={() => editor.chain().focus().undo().run()} active={false} title="Undo">
        <Undo size={14} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().redo().run()} active={false} title="Redo">
        <Redo size={14} />
      </ToolbarButton>
    </div>
  );
}

export default function AdminArticleEditor() {
  const { id } = useParams<{ id: string }>();
  const { adminUser } = useAdminAuth();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [status, setStatus] = useState<'draft' | 'review' | 'published' | 'scheduled'>('draft');
  const [scheduledAt, setScheduledAt] = useState('');
  const [readTime, setReadTime] = useState('');
  const [author, setAuthor] = useState('');

  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(isEdit);
  const [saveMsg, setSaveMsg] = useState('');
  const [showTagDropdown, setShowTagDropdown] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ HTMLAttributes: { class: 'rounded-sm max-w-full' } }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: 'text-brand-red underline' } }),
      Placeholder.configure({ placeholder: 'Start writing your article...' }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      CharacterCount,
    ],
    editorProps: {
      attributes: {
        class: 'article-content prose-sm min-h-[400px] p-5 focus:outline-none',
      },
    },
  });

  useEffect(() => {
    adminApi.categories.getAll().then(({ data }) => setCategories(data || []));
    adminApi.tags.getAll().then(({ data }) => setTags(data || []));
    if (adminUser) {
      setAuthor(adminUser.full_name || adminUser.email);
    }
  }, [adminUser]);

  useEffect(() => {
    if (isEdit && id && editor) {
      adminApi.articles.getById(id).then(({ data }) => {
        if (data) {
          setTitle(data.title || '');
          setExcerpt(data.excerpt || '');
          setFeaturedImage(data.featured_image || '');
          setGalleryImages(data.gallery_images || []);
          setCategoryId(data.category_id || '');
          setCategoryName(data.category_name || '');
          setStatus(data.status || 'draft');
          setScheduledAt(data.scheduled_at ? data.scheduled_at.slice(0, 16) : '');
          setReadTime(data.read_time || '');
          setAuthor(data.author || '');
          editor.commands.setContent(data.content || '');
        }
        setIsLoading(false);
      });
    }
  }, [isEdit, id, editor]);

  function handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const cat = categories.find(c => c.id === e.target.value);
    setCategoryId(e.target.value);
    setCategoryName(cat?.name || '');
  }

  function toggleTag(tagId: string) {
    setSelectedTags(prev =>
      prev.includes(tagId) ? prev.filter(t => t !== tagId) : [...prev, tagId]
    );
  }

  function addGalleryImage() {
    if (newGalleryUrl.trim()) {
      setGalleryImages(prev => [...prev, newGalleryUrl.trim()]);
      setNewGalleryUrl('');
    }
  }

  function removeGalleryImage(idx: number) {
    setGalleryImages(prev => prev.filter((_, i) => i !== idx));
  }

  async function handleSave(publishStatus?: typeof status) {
    if (!title.trim() || !editor) return;
    setIsSaving(true);

    const finalStatus = publishStatus || status;
    const content = editor.getHTML();
    const wordCount = editor.storage.characterCount?.words() || 0;
    const autoReadTime = readTime || `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

    const payload: any = {
      title: title.trim(),
      excerpt: excerpt.trim() || null,
      content,
      featured_image: featuredImage.trim() || null,
      gallery_images: galleryImages.length ? galleryImages : null,
      category_id: categoryId || null,
      category_name: categoryName || null,
      status: finalStatus,
      author: author || adminUser?.full_name || '',
      author_id: adminUser?.id || null,
      read_time: autoReadTime,
      scheduled_at: finalStatus === 'scheduled' && scheduledAt ? scheduledAt : null,
      publish_date: finalStatus === 'published' ? new Date().toISOString() : null,
    };

    let error = null;
    if (isEdit && id) {
      const res = await adminApi.articles.update(id, payload);
      error = res.error;
    } else {
      const res = await adminApi.articles.create(payload);
      error = res.error;
      if (!error && res.data) {
        navigate(`/admin/articles/${res.data.id}/edit`, { replace: true });
      }
    }

    setIsSaving(false);
    if (error) {
      setSaveMsg('Failed to save. Try again.');
    } else {
      setSaveMsg('Saved!');
      setStatus(finalStatus);
    }
    setTimeout(() => setSaveMsg(''), 3000);
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-brand-red border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const wordCount = editor?.storage.characterCount?.words() || 0;
  const selectedTagNames = tags.filter(t => selectedTags.includes(t.id)).map(t => t.name);

  return (
    <div className="animate-fade-in max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-brand-black dark:text-white text-2xl">
            {isEdit ? 'Edit Article' : 'New Article'}
          </h1>
          {wordCount > 0 && (
            <p className="text-neutral-500 text-sm mt-0.5">{wordCount} words</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {saveMsg && (
            <span className={`text-xs font-medium ${saveMsg.includes('Failed') ? 'text-red-500' : 'text-green-600 dark:text-green-400'}`}>
              {saveMsg}
            </span>
          )}
          <button
            type="button"
            onClick={() => handleSave('draft')}
            disabled={isSaving || !title}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-sm hover:border-neutral-400 transition-colors disabled:opacity-50"
          >
            <Save size={13} /> Save Draft
          </button>
          <button
            type="button"
            onClick={() => handleSave('review')}
            disabled={isSaving || !title}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium bg-brand-red text-white rounded-sm hover:bg-brand-red-dark transition-colors disabled:opacity-50"
          >
            {isSaving
              ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              : <Eye size={13} />
            }
            Submit for Review
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-6">
        <div className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Article title..."
            className="w-full font-display text-2xl font-bold bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-brand-black dark:text-white px-4 py-3 rounded-sm focus:outline-none focus:border-brand-red transition-colors placeholder:text-neutral-300 dark:placeholder:text-neutral-600"
          />

          <textarea
            value={excerpt}
            onChange={e => setExcerpt(e.target.value)}
            placeholder="Short excerpt or summary (appears in article cards)..."
            rows={2}
            className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-brand-black dark:text-white text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-brand-red transition-colors resize-none placeholder:text-neutral-400"
          />

          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-sm overflow-hidden">
            <EditorToolbar editor={editor} />
            <EditorContent editor={editor} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-sm p-4 space-y-4">
            <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Publish</h3>

            <div>
              <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1.5">Status</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as typeof status)}
                className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm px-3 py-2 rounded-sm focus:outline-none focus:border-brand-red text-brand-black dark:text-white"
              >
                <option value="draft">Draft</option>
                <option value="review">In Review</option>
                <option value="published">Published</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>

            {status === 'scheduled' && (
              <div>
                <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1.5">
                  <Calendar size={10} className="inline mr-1" />Schedule Date
                </label>
                <input
                  type="datetime-local"
                  value={scheduledAt}
                  onChange={e => setScheduledAt(e.target.value)}
                  className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm px-3 py-2 rounded-sm focus:outline-none focus:border-brand-red text-brand-black dark:text-white"
                />
              </div>
            )}

            <div>
              <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1.5">Author</label>
              <input
                type="text"
                value={author}
                onChange={e => setAuthor(e.target.value)}
                className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm px-3 py-2 rounded-sm focus:outline-none focus:border-brand-red text-brand-black dark:text-white"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1.5">Read Time</label>
              <input
                type="text"
                value={readTime}
                onChange={e => setReadTime(e.target.value)}
                placeholder="Auto-calculated if empty"
                className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm px-3 py-2 rounded-sm focus:outline-none focus:border-brand-red text-brand-black dark:text-white placeholder:text-neutral-400"
              />
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => handleSave('published')}
                disabled={isSaving || !title || !categoryId}
                className="flex-1 py-2.5 bg-brand-red text-white text-sm font-medium rounded-sm hover:bg-brand-red-dark transition-colors disabled:opacity-50"
              >
                {status === 'published' ? 'Update' : 'Publish'}
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-sm p-4 space-y-3">
            <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Category</h3>
            <select
              value={categoryId}
              onChange={handleCategoryChange}
              className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm px-3 py-2 rounded-sm focus:outline-none focus:border-brand-red text-brand-black dark:text-white"
            >
              <option value="">Select category...</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-sm p-4 space-y-3">
            <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Tags</h3>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowTagDropdown(!showTagDropdown)}
                className="w-full flex items-center justify-between bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm px-3 py-2 rounded-sm text-neutral-500 hover:border-neutral-400 transition-colors"
              >
                <span>{selectedTags.length ? `${selectedTags.length} selected` : 'Add tags...'}</span>
                <ChevronDown size={12} />
              </button>
              {showTagDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-sm shadow-lg z-10 max-h-48 overflow-y-auto">
                  {tags.map(tag => (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => toggleTag(tag.id)}
                      className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                        selectedTags.includes(tag.id)
                          ? 'bg-brand-red/10 text-brand-red'
                          : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                      }`}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {selectedTagNames.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {selectedTagNames.map((name, i) => (
                  <span
                    key={i}
                    className="text-[10px] bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 px-2 py-0.5 rounded-sm flex items-center gap-1"
                  >
                    {name}
                    <button type="button" onClick={() => toggleTag(selectedTags[i])} className="hover:text-brand-red">
                      <X size={9} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-sm p-4 space-y-3">
            <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Featured Image</h3>
            <input
              type="url"
              value={featuredImage}
              onChange={e => setFeaturedImage(e.target.value)}
              placeholder="https://..."
              className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm px-3 py-2 rounded-sm focus:outline-none focus:border-brand-red text-brand-black dark:text-white placeholder:text-neutral-400"
            />
            {featuredImage && (
              <div className="aspect-video rounded-sm overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                <img src={featuredImage} alt="Featured" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-sm p-4 space-y-3">
            <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Gallery Images</h3>
            <div className="flex gap-2">
              <input
                type="url"
                value={newGalleryUrl}
                onChange={e => setNewGalleryUrl(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addGalleryImage())}
                placeholder="Image URL..."
                className="flex-1 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm px-3 py-2 rounded-sm focus:outline-none focus:border-brand-red text-brand-black dark:text-white placeholder:text-neutral-400"
              />
              <button
                type="button"
                onClick={addGalleryImage}
                className="p-2 bg-brand-red text-white rounded-sm hover:bg-brand-red-dark transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>
            {galleryImages.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {galleryImages.map((img, i) => (
                  <div key={i} className="relative aspect-square group">
                    <img src={img} alt="" className="w-full h-full object-cover rounded-sm" />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(i)}
                      className="absolute top-0.5 right-0.5 p-0.5 bg-black/60 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
