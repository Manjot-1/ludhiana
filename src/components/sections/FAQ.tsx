import React, { useState } from 'react';
import SectionLabel from '../ui/SectionLabel';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, Sparkles, BookOpen, Heart, MessageCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: 'tarot' | 'booking' | 'crystals';
}

const FAQ_DATA: FAQItem[] = [
  // Tarot Readings
  {
    category: 'tarot',
    question: 'How should I prepare for a tarot reading?',
    answer: 'Before your reading, find a quiet space, take a few deep breaths, and clarify your core questions or intentions. Try to frame questions starting with "How" or "What" (e.g., "How can I align with my career path?") rather than binary yes/no queries, allowing the tarot cards to offer richer context, deep spiritual lessons, and actionable advice.'
  },
  {
    category: 'tarot',
    question: 'Can tarot predict the absolute, unchangeable future?',
    answer: 'No. Tarot is a powerful tool that captures a snapshot of current energetic currents and the most likely trajectory based on your present path. It represents guidance, warning signs, and hidden wisdom. Your free will is the ultimate steering force—the cards empower you with knowledge so you can confidently reshape your path.'
  },
  {
    category: 'tarot',
    question: 'Are my questions and reading strictly confidential?',
    answer: 'Absolutely. All questions, birth details, shared situations, and final readings are held with the highest spiritual, ethical, and personal discretion. Your reading is a sacred, confidential container designed solely for your growth, alignment, and healing.'
  },
  
  // Booking Procedures
  {
    category: 'booking',
    question: 'How do I receive my reading after booking?',
    answer: 'Once you select your reading and finalize the payment, you will receive an automatic confirmation receipt. The confirmation page will provide a custom link to message me on WhatsApp. Simply share your name, birth details, and any context or questions. I will deliver your deep, highly personalized audio reading (or host our live session) within the promised timeframe.'
  },
  {
    category: 'booking',
    question: 'What is your cancellation and rescheduling policy?',
    answer: 'I understand that energy shifts and emergencies happen. You can reschedule your live reading up to 24 hours prior to our scheduled time. Because of the deep energetic preparation and limited available slots, cancellations made under 24 hours or missed appointments are non-refundable, but we will gladly support you in rescheduling once for a future date.'
  },
  {
    category: 'booking',
    question: 'Which secure payment methods are supported?',
    answer: 'Our altar checkout handles transactions securely. We support all major credit cards, debit cards, UPI, and net banking platforms to ensure a seamless, friction-free energy exchange for your digital spiritual consultation.'
  },

  // Crystal Care
  {
    category: 'crystals',
    question: 'How do I cleanse and charge my newly received crystals?',
    answer: 'Crystals absorb surrounding vibes during transit. Cleanse them regularly under the light of a Full Moon, by bathing them in sage or incense smoke, or placing them on a Selenite charging bed. Note: always research your crystal before exposing it to water, as soluble minerals like Selenite or Malachite can dissolve or lose their luster.'
  },
  {
    category: 'crystals',
    question: 'How do I program my crystal with a specific intention?',
    answer: 'Hold your cleansed crystal in your dominant hand, take three deep centering breaths, and focus single-mindedly on your goal or affirmation. Visualize a warm, luminous stream of light transferring your intention from your third eye into the crystal. Affirm your intention out loud to lock in the energetic program.'
  },
  {
    category: 'crystals',
    question: 'Which crystals are best recommended for beginners?',
    answer: 'Clear Quartz (for amplification and absolute clarity), Amethyst (for calm, spiritual protection, and sweet dreams), and Rose Quartz (for nurturing self-love and deep emotional healing) are the ideal foundational stones. They carry gentle, comforting energies that are simple to connect with.'
  }
];

export default function FAQ() {
  const [activeTab, setActiveTab] = useState<'all' | 'tarot' | 'booking' | 'crystals'>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFAQs = FAQ_DATA.filter(
    (item) => activeTab === 'all' || item.category === activeTab
  );

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'tarot':
        return <Sparkles className="w-3 h-3 text-gold" />;
      case 'booking':
        return <BookOpen className="w-3 h-3 text-rose" />;
      case 'crystals':
        return <Heart className="w-3 h-3 text-crystal" />;
      default:
        return null;
    }
  };

  return (
    <section id="faq-section" className="py-24 px-4 md:px-8 bg-bg-secondary/30 relative overflow-hidden border-t border-b border-gold/10">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-blush/5 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <SectionLabel label="Divine Wisdom" />
        <h2 className="font-display text-3xl sm:text-5xl font-bold text-center text-text-heading mt-2">
          Frequently Asked Inquiries
        </h2>
        <p className="font-sans text-center text-text-muted text-sm max-w-lg mx-auto mt-3 leading-relaxed">
          Unveil answers regarding our sacred tarot readings, energetic crystal care guidelines, and scheduling procedures.
        </p>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-10 mb-12">
          {[
            { id: 'all', label: 'All Questions', icon: <HelpCircle className="w-3.5 h-3.5" /> },
            { id: 'tarot', label: 'Tarot Readings', icon: <Sparkles className="w-3.5 h-3.5 text-gold" /> },
            { id: 'booking', label: 'Booking & Policies', icon: <BookOpen className="w-3.5 h-3.5 text-rose" /> },
            { id: 'crystals', label: 'Crystal Care', icon: <Heart className="w-3.5 h-3.5 text-crystal" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setOpenIndex(null); // Reset open states on tab change
              }}
              className={`px-4 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-2 border cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-gold text-bg-dark border-gold shadow-md shadow-gold/20'
                  : 'bg-white border-gold/15 text-text-body hover:bg-gold/5 hover:border-gold/30'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Accordion Questions List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredFAQs.map((item, idx) => {
              const isOpened = openIndex === idx;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  key={item.question}
                  className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpened
                      ? 'border-gold shadow-md shadow-gold/5'
                      : 'border-gold/15 hover:border-gold/40 hover:shadow-sm'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full text-left py-5 px-6 sm:px-8 flex items-center justify-between gap-4 cursor-pointer focus:outline-none group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="hidden sm:inline-flex w-5 h-5 rounded-md bg-bg-secondary items-center justify-center shrink-0 border border-gold/10">
                        {getCategoryIcon(item.category)}
                      </span>
                      <span className="font-display text-sm sm:text-base font-bold text-text-heading group-hover:text-gold transition-colors leading-snug">
                        {item.question}
                      </span>
                    </div>
                    <span
                      className={`w-8 h-8 rounded-full bg-bg-secondary/60 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpened ? 'rotate-180 bg-gold/10 text-gold' : 'text-text-muted group-hover:text-text-heading'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpened && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-6 sm:px-8 pb-6 text-xs sm:text-sm text-text-body/90 leading-relaxed border-t border-gold/5 bg-bg-secondary/10">
                          <p className="pt-4">{item.answer}</p>
                          <div className="mt-4 flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider text-text-muted">
                            <span>Topic:</span>
                            <span className="text-gold flex items-center gap-1 font-mono">
                              {getCategoryIcon(item.category)}
                              {item.category === 'tarot' && 'Tarot Readings'}
                              {item.category === 'booking' && 'Booking & Process'}
                              {item.category === 'crystals' && 'Crystal Care'}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Contact/Support CTA block */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gold/5 border border-gold/15 text-xs text-text-body">
            <MessageCircle className="w-3.5 h-3.5 text-gold" />
            <span>Have a specific, personalized inquiry?</span>
            <a href="#contact" className="text-gold font-bold underline hover:text-gold-light">
              Connect directly
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
