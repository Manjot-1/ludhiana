import React from 'react';
import SectionLabel from '../ui/SectionLabel';
import { Star, ShieldCheck, Heart, Award } from 'lucide-react';

interface AboutProps {
  setPath: (path: string) => void;
}

export default function About({ setPath }: AboutProps) {
  return (
    <section id="about-section" className="py-20 px-4 md:px-8 bg-bg-primary relative overflow-hidden">
      {/* Decorative Blur elements */}
      <div className="absolute top-1/4 left-1/10 w-80 h-80 bg-rose/10 rounded-full glow-orb"></div>
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-crystal/5 rounded-full glow-orb"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Column 1: Elegant Portrait / Illustration placeholder */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden border border-gold/20 shadow-xl group">
              {/* Profile Image (Warm candlelit portrait or aesthetic altar photo) */}
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80"
                alt="Ludhiana's Tarot Oracle"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale-20 group-hover:grayscale-0 transition-all duration-700"
              />
              
              {/* Altar style gold frame border inside */}
              <div className="absolute inset-4 border border-gold/15 rounded-2xl pointer-events-none group-hover:inset-3 transition-all duration-300" />
              
              {/* Experience badge */}
              <div className="absolute bottom-6 right-6 px-4 py-2 bg-bg-dark/90 backdrop-blur-md border border-gold/30 rounded-xl flex flex-col items-center">
                <span className="font-display font-bold text-xl text-gold leading-none">5+</span>
                <span className="text-[9px] uppercase tracking-widest text-text-light/80 mt-1">Years Guidance</span>
              </div>
            </div>
          </div>

          {/* Column 2: Detailed Brand narrative */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            
            <SectionLabel label="Meet Your Guide" className="text-left" />
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-text-heading leading-tight">
              A Warm Heart, An Ancient Vision
            </h2>

            <p className="font-sans text-sm sm:text-base text-text-body leading-relaxed">
              Sat Sri Akal & welcome! I'm the oracle behind <strong>Ludhiana's Tarot Oracle (@ludhianastarotoracle9)</strong>. For over five years, I have opened sacred spaces in Ludhiana, Punjab, and virtually to guide clients through some of life's most challenging crossroads.
            </p>

            <p className="font-sans text-xs sm:text-sm text-text-body leading-relaxed font-light">
              My readings are structured to be clear, safe, and actionable. I do not deal in fear-mongering or absolute predictions. Instead, I use tarot cards as a beautiful intuitive blueprint to read current emotional energy, uncover blind spots, and offer practical, empowering gemstone and ritual remedies to help you flow.
            </p>

            {/* Quick credibility features list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start space-x-3">
                <div className="p-2.5 rounded-xl bg-blush/20 text-rose shrink-0">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-text-heading text-sm sm:text-base">Safe, Loving Environment</h4>
                  <p className="text-[11px] text-text-muted">No judgement, just deep understanding and warm guidance.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2.5 rounded-xl bg-gold/10 text-gold shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-text-heading text-sm sm:text-base">Certified Crystal Therapist</h4>
                  <p className="text-[11px] text-text-muted">Expertise in chakras, birth chart crystal pairings, and cleansing rituals.</p>
                </div>
              </div>
            </div>

            {/* CTA bar */}
            <div className="pt-6 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => {
                  setPath('#about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-text-heading text-bg-primary text-xs font-semibold tracking-wider hover:bg-cta-hover transition-all cursor-pointer text-center"
              >
                Read My Full Story
              </button>
              
              <button
                onClick={() => {
                  setPath('#testimonials');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-transparent text-gold hover:text-text-heading transition-colors font-semibold text-xs tracking-wider cursor-pointer text-center"
              >
                Read Client Testimonials →
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
