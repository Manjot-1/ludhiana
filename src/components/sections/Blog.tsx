import React from 'react';
import SectionLabel from '../ui/SectionLabel';
import GoldDivider from '../ui/GoldDivider';
import { INITIAL_BLOGS } from '../../data';
import { Calendar, Tag, ArrowRight } from 'lucide-react';

interface BlogSectionProps {
  setPath: (path: string) => void;
}

export default function BlogSection({ setPath }: BlogSectionProps) {
  const latestBlogs = INITIAL_BLOGS.slice(0, 3);

  const handlePostClick = (slug: string) => {
    setPath(`#blog/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <section id="blog-preview-section" className="py-20 px-4 md:px-8 bg-bg-secondary/20 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        
        <SectionLabel label="Spiritual Journals" />
        <h2 className="font-display text-3xl sm:text-5xl font-bold text-center text-text-heading mt-2">
          Readings from the Altar
        </h2>
        <p className="font-sans text-center text-text-muted text-sm sm:text-base max-w-xl mx-auto mt-3">
          Daily card pulls, moon rituals, chakra healing correlations, and crystal wisdom shared straight from Ludhiana.
        </p>

        <GoldDivider />

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {latestBlogs.map((post) => (
            <article
              key={post.id}
              className="bg-bg-card rounded-2xl border border-gold/15 overflow-hidden group flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:border-gold/30 cursor-pointer"
              onClick={() => handlePostClick(post.slug)}
            >
              <div>
                {/* Cover Image Wrapper */}
                <div className="relative aspect-[16/10] overflow-hidden bg-bg-secondary/10">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 text-[9px] font-bold tracking-widest uppercase bg-gold text-bg-dark rounded-full shadow-sm flex items-center gap-1">
                      <Tag className="w-2.5 h-2.5" /> {post.category}
                    </span>
                  </div>
                </div>

                {/* Article Header & Excerpt */}
                <div className="p-6">
                  {/* Date and Author row */}
                  <div className="flex items-center space-x-3 text-[11px] text-text-muted mb-3 font-sans">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {formatDate(post.publishedAt)}
                    </span>
                    <span>·</span>
                    <span className="font-medium">Ludhiana's Oracle</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-text-heading text-xl group-hover:text-gold transition-colors leading-snug">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="font-sans text-xs text-text-body mt-3 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Read More footer */}
              <div className="px-6 pb-6 pt-3 border-t border-gold/5 flex items-center justify-between text-xs font-semibold tracking-wider text-gold hover:text-text-heading transition-colors">
                <span>READ RITUAL</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </article>
          ))}
        </div>

        {/* View All blogs CTA */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => {
              setPath('#blog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3 rounded-full border border-gold/30 text-gold hover:bg-gold hover:text-bg-dark font-semibold text-xs tracking-wider cursor-pointer"
          >
            Explore All Altar Entries →
          </button>
        </div>

      </div>
    </section>
  );
}
