import React, { useState, useEffect } from 'react';
import { db } from '../../lib/db';
import { BlogPost } from '../../types';
import { ArrowLeft, Calendar, Tag, Sparkles } from 'lucide-react';

interface BlogSingleProps {
  slug: string;
  setPath: (path: string) => void;
}

export default function BlogSinglePage({ slug, setPath }: BlogSingleProps) {
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const list = db.getBlogs();
    const found = list.find(b => b.slug === slug);
    if (found) {
      setPost(found);
    }
  }, [slug]);

  if (!post) {
    return (
      <div className="py-32 text-center">
        <p className="text-text-muted text-xs">Altar journal log entry not found.</p>
        <button
          onClick={() => setPath('#blog')}
          className="mt-4 px-6 py-2 rounded-full bg-text-heading text-bg-primary text-xs font-semibold"
        >
          Return to Journals
        </button>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <section className="py-24 px-4 md:px-8 bg-bg-primary min-h-screen">
      <div className="max-w-3xl mx-auto">
        
        {/* Back navigation */}
        <button
          onClick={() => setPath('#blog')}
          className="mb-8 font-sans text-xs font-bold text-text-muted hover:text-gold flex items-center gap-1.5 cursor-pointer bg-transparent border-0"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Journals
        </button>

        {/* Blog Post block */}
        <article className="bg-white rounded-3xl border border-gold/15 overflow-hidden shadow-xl p-6 sm:p-12 space-y-6">
          
          {/* Header Metadata */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-xs text-text-muted font-sans uppercase tracking-widest">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-gold" /> {formatDate(post.publishedAt)}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1 bg-gold/10 text-gold font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                <Tag className="w-3.5 h-3.5" /> {post.category}
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4.5xl font-extrabold text-text-heading leading-tight">
              {post.title}
            </h1>

            <p className="font-sans text-xs sm:text-sm text-text-muted leading-relaxed border-l-2 border-gold/40 pl-4 italic">
              {post.excerpt}
            </p>
          </div>

          {/* Cover Image */}
          <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-gold/10">
            <img
              src={post.coverImage}
              alt={post.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Core Markdown-style / Rich HTML Content wrapper */}
          <div
            className="prose max-w-none text-xs sm:text-sm text-text-body leading-relaxed space-y-4 pt-4 border-t border-gold/5"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Altar closure details */}
          <div className="mt-12 pt-6 border-t border-gold/10 bg-gold/5 rounded-2xl p-6 flex items-start space-x-3.5">
            <div className="p-3 bg-white border border-gold/20 rounded-xl text-gold shrink-0">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h4 className="font-display font-semibold text-text-heading text-sm sm:text-base">Loving Guidance from Ludhiana Altar</h4>
              <p className="text-[11px] text-text-muted mt-1 leading-relaxed">
                Thank you for reading my journaling entries. All concepts are written based on my 5+ years of active tarot therapy and crystal energy testing. For personalized advice, schedule a detailed session today.
              </p>
            </div>
          </div>

        </article>

      </div>
    </section>
  );
}
