import React from 'react';
import SectionLabel from '../ui/SectionLabel';
import GoldDivider from '../ui/GoldDivider';
import { Star, Eye, Sparkles, BookOpen, Clock, Heart, Award } from 'lucide-react';

interface AboutPageProps {
  setPath: (path: string) => void;
}

export default function AboutPage({ setPath }: AboutPageProps) {
  const faqs = [
    {
      q: 'Do I need to have a specific question in mind?',
      a: 'Not necessarily! We can look into general energies surrounding your love, career, or spiritual alignment. If you do have questions, feel free to write them out so the cards can focus directly on them.'
    },
    {
      q: 'How does WhatsApp voice note delivery work?',
      a: 'It is incredibly convenient! Once you book, you share your context. I layout the spread, read the energies, and record a 15–20 minute detailed, loving audio voice note with pictures of your spread. You can play, pause, and keep it forever.'
    },
    {
      q: 'How do you charge/cleanse crystals before shipment?',
      a: 'All raw gemstones are washed gently (if water-safe), clear-smoked with genuine White Sage bundles, and placed on private crystal clusters to recharge under direct full moon rays before packing.'
    },
    {
      q: 'What is your rescheduling policy for live sessions?',
      a: 'I completely understand that emergencies happen. You can reschedule any live video session once, provided you notify me at least 24 hours in advance via WhatsApp.'
    }
  ];

  return (
    <section className="py-24 px-4 md:px-8 bg-bg-primary min-h-screen">
      <div className="max-w-5xl mx-auto">
        
        {/* About Title */}
        <SectionLabel label="Meet Ludhiana's Tarot Oracle" />
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-center text-text-heading mt-1">
          Our Sanctuary & My Story
        </h1>
        <p className="font-sans text-xs sm:text-sm text-text-muted text-center max-w-lg mx-auto mt-2">
          Over 5 years of professional divination, certified energy healing, and moonlight-infused crystals.
        </p>

        <GoldDivider />

        {/* Narrative columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center mt-12 bg-white rounded-3xl border border-gold/15 p-6 sm:p-12 shadow-xl">
          
          {/* Altar Photo column */}
          <div className="md:col-span-5 relative">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-gold/25 shadow-lg relative group">
              <img
                src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80"
                alt="Mystical Altar"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute inset-4 border border-gold/15 rounded-xl pointer-events-none" />
            </div>
          </div>

          {/* Core Text details */}
          <div className="md:col-span-7 space-y-5 text-sm text-text-body">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-heading leading-tight">
              Bridging Intuition with Practical Action
            </h2>

            <p className="leading-relaxed">
              Ludhiana's Tarot Oracle was founded with a singular intention: <strong>to guide souls toward clarity, peace, and realistic healing.</strong> I noticed that Tarot reading was often portrayed as dark, mystical, or frightening. I wanted to change that completely.
            </p>

            <p className="leading-relaxed">
              My reading room in Model Town, Ludhiana, is structured to feel like a warm, candlelit cup of tea. Whether sitting one-on-one virtually, or listening to my voice notes in your bedroom, you will feel safe, aligned, and validated.
            </p>

            <p className="leading-relaxed text-xs italic">
              "We do not read tarot to predict an unchangeable doom. We read tarot to uncover current sub-conscious energy flows, so you can change or embrace them with realistic remedies and strong confidence."
            </p>

            {/* Icons indicators */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gold/5 text-xs text-text-heading">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-gold" />
                <span>Certified Diviner</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-rose" />
                <span>100% Secure Space</span>
              </div>
            </div>
          </div>

        </div>

        {/* FAQs list */}
        <div className="mt-20">
          <SectionLabel label="Frequently Asked Questions" />
          <h2 className="font-display text-2xl sm:text-4.5xl font-bold text-center text-text-heading mb-10">
            Sanctuary Clarifications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-gold/10 hover:border-gold/25 p-6 rounded-2xl transition-all shadow-xs"
              >
                <h3 className="font-display font-bold text-text-heading text-lg mb-2">
                  {faq.q}
                </h3>
                <p className="text-xs text-text-body leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
