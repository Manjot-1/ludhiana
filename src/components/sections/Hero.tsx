import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import { MoonIcon } from '../ui/IllustrationIcons';
import { motion, AnimatePresence } from 'motion/react';

interface HeroProps {
  setPath: (path: string) => void;
}

const TAROT_POOL = [
  {
    id: 'star',
    name: 'The Star (XVII)',
    theme: 'Hope & Healing',
    symbol: '🌟',
    meaning: 'Renewal, optimism, inner peace, and spiritual guidance.',
    affirmation: 'I am guided by a bright, divine light. My path is unfolding beautifully, and my heart is open to hope.'
  },
  {
    id: 'sun',
    name: 'The Sun (XIX)',
    theme: 'Joy & Vitality',
    symbol: '☀️',
    meaning: 'Success, radiation of positive energy, warmth, and absolute clarity.',
    affirmation: 'I radiate warm, positive energy. Today, I choose joy, and success flows naturally into everything I do.'
  },
  {
    id: 'empress',
    name: 'The Empress (III)',
    theme: 'Abundance & Creation',
    symbol: '🌿',
    meaning: 'Nurturing, luxury, raw creativity, and deep alignment with nature.',
    affirmation: 'I am a powerful creator of abundance. I nurture my dreams with love and watch them flourish effortlessly.'
  },
  {
    id: 'magician',
    name: 'The Magician (I)',
    theme: 'Manifestation & Power',
    symbol: '⚡',
    meaning: 'Skill, resourcefulness, willpower, and turning visions into physical reality.',
    affirmation: 'All the tools, strength, and resources I need are already within me. I create my own magic.'
  },
  {
    id: 'strength',
    name: 'Strength (VIII)',
    theme: 'Courage & Grace',
    symbol: '🦁',
    meaning: 'Inner fortitude, soft power, patience, and overcoming challenges through compassion.',
    affirmation: 'I meet every challenge with gentle courage and quiet strength. I am resilient, calm, and capable.'
  },
  {
    id: 'wheel',
    name: 'The Wheel of Fortune (X)',
    theme: 'Destiny & Alignment',
    symbol: '🌀',
    meaning: 'Good luck, positive shifts, divine timing, and karmic expansion.',
    affirmation: 'I trust the beautiful flow of the universe. Every shift in my life brings me closer to my highest destiny.'
  },
  {
    id: 'fool',
    name: 'The Fool (0)',
    theme: 'New Beginnings',
    symbol: '🎒',
    meaning: 'Fresh starts, pure potential, courage to take leaps of faith, and living in the present.',
    affirmation: 'I step into the unknown with an open heart. I trust my journey, and I am ready for beautiful new adventures.'
  },
  {
    id: 'temperance',
    name: 'Temperance (XIV)',
    theme: 'Balance & Harmony',
    symbol: '🧪',
    meaning: 'Peace, alchemy, moderation, and finding middle ground in life\'s situations.',
    affirmation: 'I am in perfect harmony with life. I blend patience and wisdom to create inner peace and radiant balance.'
  }
];

export default function Hero({ setPath }: HeroProps) {
  const [deck, setDeck] = useState<typeof TAROT_POOL>([]);
  const [selectedPile, setSelectedPile] = useState<number | null>(null);
  const [reveal, setReveal] = useState<boolean>(false);

  useEffect(() => {
    // Pick 3 random, distinct cards
    const shuffled = [...TAROT_POOL].sort(() => 0.5 - Math.random());
    setDeck(shuffled.slice(0, 3));
  }, []);

  const handlePickCard = (index: number) => {
    if (selectedPile !== null) return;
    setSelectedPile(index);
    setTimeout(() => {
      setReveal(true);
    }, 450);
  };

  const handleReset = () => {
    setReveal(false);
    setSelectedPile(null);
    const shuffled = [...TAROT_POOL].sort(() => 0.5 - Math.random());
    setDeck(shuffled.slice(0, 3));
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-bg-dark text-text-light pt-24 pb-16 px-4 md:px-8 overflow-hidden"
    >
      {/* Golden Crescent Moon centered top */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 opacity-30 select-none pointer-events-none animate-pulse">
        <MoonIcon className="w-16 h-16 text-gold" />
      </div>

      {/* Slowly rotating CSS star particle field */}
      <div className="absolute inset-0 select-none pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-1 h-1 bg-white rounded-full star opacity-40"></div>
        <div className="absolute top-1/3 left-3/4 w-1.5 h-1.5 bg-white rounded-full star opacity-60"></div>
        <div className="absolute top-2/3 left-1/5 w-1 h-1 bg-white rounded-full star opacity-30"></div>
        <div className="absolute top-3/4 left-2/3 w-2 h-2 bg-white rounded-full star opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-white rounded-full star opacity-70"></div>
        <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full star opacity-30"></div>
        <div className="absolute top-20 right-20 w-1.5 h-1.5 bg-white rounded-full star opacity-50"></div>
        <div className="absolute bottom-20 left-40 w-1 h-1 bg-white rounded-full star opacity-40"></div>
        <div className="absolute bottom-10 right-40 w-2 h-2 bg-white rounded-full star opacity-60"></div>
      </div>

      {/* Watercolor corner washes using radial gradients with blur */}
      <div className="absolute -top-12 -right-12 w-96 h-96 rounded-full bg-crystal/10 glow-orb"></div>
      <div className="absolute -bottom-16 -left-16 w-96 h-96 rounded-full bg-rose/10 glow-orb"></div>

      {/* Main Content Card Wrapper */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center space-y-6 mt-6">
        
        {/* Intention Tagline badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/5 border border-gold/20 backdrop-blur-md animate-fadeIn">
          <span className="text-gold text-xs font-semibold tracking-[0.15em] uppercase flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Guiding Souls Since 5+ Years
          </span>
        </div>

        {/* Major Elegant Display Headline */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7.5xl font-extrabold text-white leading-tight tracking-tight max-w-3xl animate-fadeIn">
          Find <span className="text-gold italic font-light">Clarity</span>.<br />
          Find <span className="text-rose font-light">Peace</span>.<br />
          Find Your <span className="font-display underline decoration-gold/40 underline-offset-8">Path</span>.
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-sm sm:text-base md:text-lg text-text-light/80 font-light max-w-2xl leading-relaxed">
          Professional Tarot Card Readings & Moonlight-Charged Crystal Healing. Sourced, blessed, and offered in Ludhiana & online to align your energy and ease your doubts.
        </p>

        {/* CTA Buttons row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full max-w-sm sm:max-w-none">
          <button
            onClick={() => setPath('#book')}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gold text-bg-dark font-semibold tracking-wider hover:bg-gold-light transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer"
          >
            Book Your Reading <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setPath('#store')}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent border border-gold text-gold font-semibold tracking-wider hover:bg-gold/10 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            Explore Crystals
          </button>
        </div>

        {/* PICK A CARD SECTION */}
        <div className="w-full max-w-2xl bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md mt-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>
          
          <div className="text-center mb-6">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white flex items-center justify-center gap-2">
              <span className="text-gold">✦</span> Pick a Card <span className="text-gold">✦</span>
            </h3>
            <p className="font-sans text-xs sm:text-sm text-text-light/75 mt-1 max-w-md mx-auto">
              {selectedPile === null 
                ? "Take a deep breath, quiet your thoughts, and choose the card deck that resonates with your energy today."
                : "The Universe has chosen a message for your path today."}
            </p>
          </div>

          <div className="flex justify-center items-center gap-4 md:gap-8 min-h-[180px] py-4">
            <AnimatePresence mode="wait">
              {selectedPile === null ? (
                // 3 Piles choice state
                <motion.div 
                  key="unselected"
                  className="grid grid-cols-3 gap-3 sm:gap-6 w-full max-w-lg mx-auto"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {[0, 1, 2].map((idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => handlePickCard(idx)}
                      className="group relative h-40 rounded-xl overflow-hidden bg-gradient-to-b from-[#16142c] to-[#0d0c1b] border border-gold/30 hover:border-gold cursor-pointer flex flex-col items-center justify-center focus:outline-none focus:ring-2 focus:ring-gold/50 shadow-lg"
                      whileHover={{ 
                        y: -8, 
                        scale: 1.03,
                        boxShadow: "0 20px 30px -8px rgba(212, 175, 55, 0.45)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      {/* Celestial Card Back Design Pattern */}
                      <div className="absolute inset-1 border border-gold/10 rounded-lg flex flex-col items-center justify-between py-4">
                        <div className="text-[10px] text-gold/40 tracking-widest font-mono">
                          PILE {idx === 0 ? "I" : idx === 1 ? "II" : "III"}
                        </div>
                        
                        <div className="relative my-auto">
                          {/* Inner glowing core */}
                          <div className="absolute -inset-2 bg-gold/10 rounded-full filter blur-md group-hover:bg-gold/20 transition-all duration-300"></div>
                          <span className="text-2xl relative z-10 text-gold/80 group-hover:scale-110 transition-transform duration-300 block">
                            ✨
                          </span>
                        </div>

                        <div className="text-[8px] text-gold/60 font-mono tracking-widest font-medium group-hover:text-gold transition-colors">
                          TAP TO DRAW
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              ) : (
                // Single Card revealed state
                <motion.div 
                  key="revealed"
                  className="w-full flex flex-col items-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {deck[selectedPile] && (
                    <div className="w-full flex flex-col md:flex-row items-center gap-6 max-w-xl bg-[#090812]/60 p-5 rounded-xl border border-white/5 backdrop-blur-md">
                      
                      {/* Revealed Card Front representation */}
                      <motion.div 
                        className="w-32 h-48 bg-gradient-to-b from-[#1b1935] to-[#100e23] border-2 border-gold rounded-xl p-2 flex flex-col items-center justify-between text-center relative overflow-hidden shadow-2xl shrink-0"
                        initial={{ rotateY: 90 }}
                        animate={{ rotateY: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        {/* Shimmer overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>
                        
                        {/* Inner card frame */}
                        <div className="absolute inset-0.5 border border-gold/20 rounded-lg flex flex-col justify-between p-1.5">
                          <span className="text-[8px] text-gold/60 font-mono tracking-widest">DIVINE CLARITY</span>
                          
                          <div className="my-auto flex flex-col items-center gap-1">
                            {/* Card symbol */}
                            <div className="relative w-12 h-12 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center shadow-inner">
                              <span className="text-2xl">{deck[selectedPile].symbol}</span>
                            </div>
                            <h4 className="font-display font-bold text-[10px] text-white tracking-tight leading-tight mt-1.5 max-w-[90px] uppercase">
                              {deck[selectedPile].name.split(' (')[0]}
                            </h4>
                          </div>

                          <span className="text-[7px] text-gold/50 font-mono tracking-wider">{deck[selectedPile].theme}</span>
                        </div>
                      </motion.div>

                      {/* Card explanation and Daily Affirmation */}
                      <div className="flex-1 text-left space-y-3">
                        <div>
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-rose/10 border border-rose/30 text-[10px] font-semibold text-rose tracking-wider uppercase">
                            {deck[selectedPile].theme}
                          </span>
                          <h4 className="font-display text-lg sm:text-xl font-bold text-white mt-1">
                            {deck[selectedPile].name}
                          </h4>
                          <p className="text-xs sm:text-sm text-text-light/80 italic mt-0.5 leading-relaxed">
                            "{deck[selectedPile].meaning}"
                          </p>
                        </div>

                        {/* Affirmation Card Block */}
                        <div className="bg-white/[0.03] border border-gold/15 rounded-lg p-3 relative">
                          <div className="absolute -top-1.5 left-3 px-1.5 bg-[#0e0c1b] text-[8px] text-gold font-mono tracking-widest uppercase">
                            DAILY AFFIRMATION
                          </div>
                          <p className="font-sans text-xs text-gold/90 font-medium leading-relaxed mt-1">
                            {deck[selectedPile].affirmation}
                          </p>
                        </div>

                        {/* Action buttons */}
                        <div className="pt-1 flex flex-wrap items-center gap-3">
                          <button
                            onClick={handleReset}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-text-light hover:text-white transition-all cursor-pointer font-sans font-medium"
                          >
                            <RotateCcw className="w-3 h-3" /> Pick Another
                          </button>
                          
                          <button
                            onClick={() => setPath('#book')}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold hover:bg-gold-light text-bg-dark text-xs font-semibold transition-all cursor-pointer font-sans"
                          >
                            Get Full In-Depth Reading <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Trust Stats bar */}
        <div className="pt-12 w-full">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 text-xs sm:text-sm text-text-light/70 tracking-wider">
            <div className="flex items-center justify-center gap-1.5 py-1">
              <span className="text-gold text-base">🔮</span>
              <span><strong>1000+</strong> Readings Done</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 py-1">
              <span className="text-gold text-base">✨</span>
              <span><strong>5+ Years</strong> Professional Experience</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 py-1">
              <span className="text-crystal text-base">💎</span>
              <span>Moonlight-Blessed Crystals</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 py-1">
              <span className="text-gold text-base">📍</span>
              <span>Ludhiana, Punjab Based</span>
            </div>
          </div>
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
        </div>

      </div>
    </section>
  );
}
