import React, { useState, useEffect } from 'react';
import SectionLabel from '../ui/SectionLabel';
import GoldDivider from '../ui/GoldDivider';
import { db } from '../../lib/db';
import { Testimonial } from '../../types';
import { Star, Quote, Plus, CheckCircle2 } from 'lucide-react';

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [ratingFilter, setRatingFilter] = useState<number>(0);

  // Form State
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [service, setService] = useState('In-Depth Tarot Reading');
  const [rating, setRating] = useState(5);
  const [quote, setQuote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const list = db.getTestimonials();
    // Only approved ones
    const approved = list.filter(t => t.isApproved);
    if (ratingFilter > 0) {
      setTestimonials(approved.filter(t => t.rating === ratingFilter));
    } else {
      setTestimonials(approved);
    }
  }, [ratingFilter, submitted]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !quote) return;

    const newReview: Testimonial = {
      id: `rev_${Date.now()}`,
      clientName: name,
      clientCity: city || 'Ludhiana',
      serviceType: service,
      rating,
      quote,
      isApproved: false, // Wait for admin validation
      isFeatured: false,
      createdAt: new Date().toISOString()
    };

    db.saveTestimonial(newReview);
    setSubmitted(true);
    setName('');
    setCity('');
    setQuote('');
    setTimeout(() => {
      setShowForm(false);
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section className="py-24 px-4 md:px-8 bg-bg-primary min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        {/* Title */}
        <SectionLabel label="Words of Healing & Clarity" />
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-center text-text-heading mt-1">
          Client Altar Testimonials
        </h1>
        <p className="font-sans text-xs sm:text-sm text-text-muted text-center max-w-lg mx-auto mt-2">
          Read genuine reviews, relief outcomes, and crystal healing feedback from my beautiful client family.
        </p>

        <GoldDivider />

        {/* Filter & Review launcher row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 bg-bg-secondary/30 p-4 rounded-2xl border border-gold/10">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-text-muted uppercase">Rating Filter:</span>
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(Number(e.target.value))}
              className="bg-white border border-gold/15 text-xs text-text-heading px-3 py-1.5 rounded-lg focus:outline-none focus:border-gold"
            >
              <option value={0}>All Star levels</option>
              <option value={5}>5 Stars only</option>
              <option value={4}>4 Stars and above</option>
            </select>
          </div>

          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="px-5 py-2.5 rounded-full bg-text-heading text-bg-primary text-xs font-semibold tracking-wider hover:bg-cta-hover transition-all flex items-center gap-1.5 cursor-pointer shadow border border-gold/15"
            >
              <Plus className="w-4 h-4" /> Share My Experience
            </button>
          ) : (
            <button
              onClick={() => setShowForm(false)}
              className="text-xs text-text-muted hover:text-text-heading underline"
            >
              Close review form
            </button>
          )}
        </div>

        {/* Form panel */}
        {showForm && (
          <div className="mb-12 bg-white rounded-3xl border border-gold/20 p-6 sm:p-10 shadow-xl max-w-xl mx-auto animate-fadeIn">
            {submitted ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
                <h3 className="font-display font-bold text-lg text-text-heading">Review Received with Gratitude!</h3>
                <p className="text-xs text-text-muted max-w-xs mx-auto">Your loving words have been submitted successfully. I will approve and list it on this board shortly. Stay blessed!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-text-body mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Priya Sharma"
                      className="w-full px-4 py-2 rounded-lg border border-gold/15 bg-bg-primary text-text-heading focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-text-body mb-1">Your City / Location</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Model Town, Ludhiana"
                      className="w-full px-4 py-2 rounded-lg border border-gold/15 bg-bg-primary text-text-heading focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-text-body mb-1">Service Booked</label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gold/15 bg-bg-primary text-text-heading focus:outline-none focus:border-gold"
                    >
                      <option value="One Card Pull">One Card Pull</option>
                      <option value="Current Energy Reading">Current Energy Reading</option>
                      <option value="In-Depth Tarot Reading">In-Depth Tarot Reading</option>
                      <option value="Live Tarot Session">Live Tarot Session</option>
                      <option value="Crystal Healing Session">Crystal Healing Session</option>
                      <option value="Tarot + Crystal Combo">Tarot + Crystal Combo</option>
                      <option value="Crystal Purchase">Crystal Purchase</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-text-body mb-1">Star Rating</label>
                    <div className="flex items-center space-x-1.5 py-1.5">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setRating(num)}
                          className="focus:outline-none"
                        >
                          <Star className={`w-4.5 h-4.5 ${num <= rating ? 'fill-gold text-gold' : 'text-text-muted/30'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-body mb-1">Review Description *</label>
                  <textarea
                    required
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    placeholder="Describe how the reading helped you gain clarity or release stress..."
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-gold/15 bg-bg-primary text-text-heading focus:outline-none focus:border-gold resize-none"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 text-text-muted hover:text-text-heading"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-full bg-gold text-bg-dark font-semibold tracking-wider hover:bg-gold-light transition-all"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Full Reviews Grid list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white border border-gold/10 p-6 rounded-2xl relative shadow-xs flex flex-col justify-between"
            >
              <Quote className="absolute top-4 right-4 w-10 h-10 text-gold/10 pointer-events-none" />
              
              <div>
                {/* Rating */}
                <div className="flex items-center space-x-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                  ))}
                </div>

                {/* Quote details */}
                <p className="font-display text-sm italic text-text-heading leading-relaxed mb-6">
                  "{t.quote}"
                </p>
              </div>

              {/* Author bar */}
              <div className="flex items-center space-x-3 pt-3 border-t border-gold/5">
                <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center font-display text-gold font-bold uppercase text-xs">
                  {t.clientName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-display font-semibold text-text-heading text-xs sm:text-sm">
                    {t.clientName}
                  </h4>
                  <p className="text-[10px] text-text-muted font-sans uppercase">
                    {t.clientCity} · <span className="text-gold">{t.serviceType}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
