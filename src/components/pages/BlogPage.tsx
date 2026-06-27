import React, { useState, useEffect } from 'react';
import SectionLabel from '../ui/SectionLabel';
import GoldDivider from '../ui/GoldDivider';
import { db } from '../../lib/db';
import { BlogPost } from '../../types';
import { Calendar, Tag, ArrowRight } from 'lucide-react';

interface BlogPageProps {
  setPath: (path: string) => void;
}

export default function BlogPage({ setPath }: BlogPageProps) {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    const list = db.getBlogs();
    const published = list.filter(b => b.isPublished);
    if (categoryFilter !== 'all') {
      setBlogs(published.filter(b => b.category.toLowerCase() === categoryFilter.toLowerCase()));
    } else {
      setBlogs(published);
    }
  }, [categoryFilter]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handlePostClick = (slug: string) => {
    setPath(`#blog/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = ['all', 'tarot', 'crystals', 'astrology', 'healing', 'ludhiana'];

  return (
    <section className="py-24 px-4 md:px-8 bg-bg-primary min-h-screen animate-fadeIn">
      <div className="max-w-6xl mx-auto">
        
        {/* Title */}
        <SectionLabel label="Mystical Journals & Wisdom" />
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-center text-text-heading mt-1">
          Altar Logs & Spiritual Lessons
        </h1>
        <p className="font-sans text-xs sm:text-sm text-text-muted text-center max-w-lg mx-auto mt-2">
          Read detailed journals regarding gemstone pairings, lunar calendars, card meanings, and Punjab-rooted wisdom.
        </p>

        <GoldDivider />

        {/* Category Navigation bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-gold text-bg-dark shadow'
                  : 'bg-white border border-gold/15 text-text-body hover:border-gold/35'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blogs Grid */}
        {blogs.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-gold/15 bg-white/50 rounded-3xl max-w-lg mx-auto">
            <p className="text-text-muted text-xs italic">No matching journal logs found in this energetic category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((post) => (
              <article
                key={post.id}
                onClick={() => handlePostClick(post.slug)}
                className="bg-white rounded-2xl border border-gold/15 overflow-hidden group flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:border-gold/30 cursor-pointer"
              >
                <div>
                  {/* Image wrapper */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-bg-secondary/10">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                    
                    {/* Category */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 text-[9px] font-bold tracking-widest uppercase bg-gold text-bg-dark rounded-full shadow-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Body text block */}
                  <div className="p-6">
                    <div className="flex items-center space-x-3 text-[10px] text-text-muted mb-3 font-mono">
                      <span>{formatDate(post.publishedAt)}</span>
                      <span>·</span>
                      <span>Ludhiana Altar</span>
                    </div>

                    <h3 className="font-display font-bold text-text-heading text-lg group-hover:text-gold transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="font-sans text-xs text-text-body mt-3 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer read button */}
                <div className="px-6 pb-6 pt-3 border-t border-gold/5 flex items-center justify-between text-xs font-semibold tracking-wider text-gold group-hover:text-text-heading transition-colors">
                  <span>READ ENTRY</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
