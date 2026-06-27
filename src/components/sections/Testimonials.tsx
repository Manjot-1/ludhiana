import React, { useState, useEffect } from 'react';
import SectionLabel from '../ui/SectionLabel';
import { db } from '../../lib/db';
import { Testimonial } from '../../types';
import { Star, ChevronLeft, ChevronRight, Quote, Plus } from 'lucide-react';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Form submission state
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [service, setService] = useState('In-Depth Tarot Reading');
  const [rating, setRating] = useState(5);
  const [quote, setQuote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Only fetch approved ones for the carousel
    const all = db.getTestimonials();
    const approved = all.filter(t => t.isApproved);
    setTestimonials(approved);
  }, [submitted]);

  // Auto scroll carousel every 6 seconds
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !quote) return;

    const review: Testimonial = {
      id: `review_${Date.now()}`,
      clientName: name,
      clientCity: city || 'Ludhiana',
      serviceType: service,
      rating,
      quote,
      isApproved: false, // Wait for admin approval to show up in carousel
      isFeatured: false,
      createdAt: new Date().toISOString()
    };

    db.saveTestimonial(review);
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
    <section id="testimonials-section" className="py-22 px-4 md:px-8 bg-bg-dark text-text-light relative overflow-hidden">
      {/* Background Star elements */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-1/6 left-1/10 w-1.5 h-1.5 bg-white rounded-full star animate-pulse"></div>
        <div className="absolute top-1/2 right-1/10 w-1 h-1 bg-white rounded-full star animate-pulse"></div>
        <div className="absolute bottom-1/5 left-1/3 w-1.5 h-1.5 bg-white rounded-full star animate-pulse"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        <SectionLabel label="Divine Client Love" />
        <h2 className="font-display text-3xl sm:text-5xl font-bold text-center text-white mt-2">
          What My Souls Say
        </h2>
        <p className="font-sans text-center text-text-light/60 text-sm max-w-md mx-auto mt-3">
          Deep, healing shifts described in the words of those who have sat with Ludhiana's Tarot Oracle.
        </p>

        {/* Testimonials Carousel */}
        {testimonials.length > 0 ? (
          <div className="relative mt-16 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-12 backdrop-blur-md max-w-3xl mx-auto shadow-xl">
            {/* Big quote graphic element */}
            <Quote className="absolute -top-6 left-10 w-12 h-12 text-gold/20" />

            <div className="min-h-[12rem] flex flex-col justify-between">
              {/* Stars and Rating */}
              <div>
                <div className="flex items-center space-x-1 mb-6">
                  {Array.from({ length: testimonials[currentIndex]?.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="font-display text-lg sm:text-xl italic text-white/90 leading-relaxed">
                  "{testimonials[currentIndex]?.quote}"
                </p>
              </div>

              {/* Author name & city info */}
              <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4">
                <div>
                  <h4 className="font-display font-semibold text-gold text-base sm:text-lg">
                    {testimonials[currentIndex]?.clientName}
                  </h4>
                  <p className="text-[11px] text-text-light/50 font-sans tracking-wide mt-0.5">
                    📍 {testimonials[currentIndex]?.clientCity} · <span className="text-gold-light">{testimonials[currentIndex]?.serviceType}</span>
                  </p>
                </div>
                
                {/* Avatar initial bubble */}
                <div className="w-10 h-10 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center text-gold text-xs font-bold font-sans uppercase">
                  {testimonials[currentIndex]?.clientName.charAt(0)}
                </div>
              </div>
            </div>

            {/* Carousel navigation controls */}
            {testimonials.length > 1 && (
              <div className="absolute -bottom-6 right-8 flex items-center space-x-3">
                <button
                  onClick={handlePrev}
                  className="p-3.5 rounded-full bg-bg-dark border border-white/15 text-gold hover:bg-gold hover:text-bg-dark transition-all duration-300 shadow cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-3.5 rounded-full bg-bg-dark border border-white/15 text-gold hover:bg-gold hover:text-bg-dark transition-all duration-300 shadow cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-text-light/50 mt-12 text-sm italic">No testimonials approved yet. Be the first to leave one below!</p>
        )}

        {/* Leave a review button toggler */}
        <div className="flex flex-col items-center mt-16">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 rounded-full border border-gold/30 text-gold hover:bg-gold hover:text-bg-dark transition-all duration-300 text-xs font-semibold tracking-wider flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Share Your Healing Experience
            </button>
          ) : (
            <form
              onSubmit={handleAddReview}
              className="w-full max-w-lg bg-bg-primary text-text-heading border border-gold/20 rounded-3xl p-8 shadow-2xl animate-scaleUp text-left"
            >
              <h3 className="font-display text-xl font-bold mb-1">Share Your Review</h3>
              <p className="text-[11px] text-text-muted mb-6">Your review will be submitted safely and displayed after validation.</p>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-4 text-xs font-medium text-center">
                  ✨ Thank you so much! Your review has been submitted for verification. May peace and clarity guide you!
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-text-body mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Priya Sharma"
                        className="w-full px-4 py-2.5 rounded-xl border border-gold/20 bg-white text-xs text-text-heading focus:outline-none focus:border-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-text-body mb-1">City / Location</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Model Town, Ludhiana"
                        className="w-full px-4 py-2.5 rounded-xl border border-gold/20 bg-white text-xs text-text-heading focus:outline-none focus:border-gold"
                      />
                    </div>
                  </div>

                  {/* Rating & Service */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-text-body mb-1">Service Received</label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-gold/20 bg-white text-xs text-text-heading focus:outline-none focus:border-gold"
                      >
                        <option value="One Card Pull">One Card Pull</option>
                        <option value="Current Energy Reading">Current Energy Reading</option>
                        <option value="In-Depth Tarot Reading">In-Depth Tarot Reading</option>
                        <option value="Live Tarot Session">Live Tarot Session</option>
                        <option value="Crystal Healing Session">Crystal Healing Session</option>
                        <option value="Tarot + Crystal Combo">Tarot + Crystal Combo</option>
                        <option value="Crystal Store purchase">Crystal Purchase</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-text-body mb-1">Rating</label>
                      <div className="flex items-center space-x-2 py-2">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setRating(num)}
                            className="p-1 focus:outline-none"
                          >
                            <Star
                              className={`w-5 h-5 ${
                                num <= rating ? 'fill-gold text-gold' : 'text-text-muted/30'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Quote */}
                  <div>
                    <label className="block text-xs font-semibold text-text-body mb-1">Your Story / Quote *</label>
                    <textarea
                      required
                      value={quote}
                      onChange={(e) => setQuote(e.target.value)}
                      placeholder="Share what changes you felt after the reading or crystal alignment..."
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-xl border border-gold/20 bg-white text-xs text-text-heading focus:outline-none focus:border-gold resize-none"
                    />
                  </div>

                  {/* Form Action buttons */}
                  <div className="flex justify-end space-x-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-4 py-2 text-xs font-semibold text-text-muted hover:text-text-heading cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-full bg-gold text-bg-dark text-xs font-semibold tracking-wider hover:bg-gold-light transition-all cursor-pointer"
                    >
                      Submit Review
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
