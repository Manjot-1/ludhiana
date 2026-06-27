import React from 'react';
import SectionLabel from '../ui/SectionLabel';
import { CalendarRange, SendHorizontal, Sparkles } from 'lucide-react';

export default function Process() {
  const steps = [
    {
      step: '01',
      title: 'Book Your Sanctuary',
      description: 'Select your desired tarot or crystal reading option, fill in your questions, and finalize the energy exchange securely via Razorpay.',
      icon: <CalendarRange className="w-8 h-8 text-gold" />
    },
    {
      step: '02',
      title: 'Share Your Context',
      description: 'Receive an instant automatic receipt. Follow the link to message me on WhatsApp with your birth details, names, or general questions.',
      icon: <SendHorizontal className="w-8 h-8 text-rose" />
    },
    {
      step: '03',
      title: 'Receive Divine Clarity',
      description: 'Receive your custom voice note reading (or join the live Google Meet link) filled with deep, compassionate truths and remedies.',
      icon: <Sparkles className="w-8 h-8 text-crystal" />
    }
  ];

  return (
    <section id="process-section" className="py-20 px-4 md:px-8 bg-bg-primary relative overflow-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/3 right-10 w-64 h-64 rounded-full bg-blush/10 glow-orb"></div>
      <div className="absolute bottom-1/4 left-10 w-72 h-72 rounded-full bg-gold/5 glow-orb"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionLabel label="Simple 3-Step Process" />
        <h2 className="font-display text-3xl sm:text-5xl font-bold text-center text-text-heading mt-2">
          Your Path to Wisdom is Simple
        </h2>
        <p className="font-sans text-center text-text-muted text-sm max-w-md mx-auto mt-3">
          I've removed all DM noise. Here's how you can automatically book and receive your reading in minutes.
        </p>

        {/* Steps Cards list */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16 relative">
          
          {/* Horizontal connecting line for desktop only */}
          <div className="hidden md:block absolute top-[28%] left-1/6 right-1/6 h-[1px] border-t border-dashed border-gold/30 z-0" />

          {steps.map((item, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center text-center p-8 bg-bg-secondary/40 rounded-3xl border border-gold/10 hover:border-gold/25 transition-all duration-300 z-10 hover:bg-white group"
            >
              {/* Step counter */}
              <span className="font-display italic text-6xl font-light text-gold/20 group-hover:text-gold/40 transition-colors absolute top-4 left-6">
                {item.step}
              </span>

              {/* Icon Container */}
              <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center mb-6 group-hover:scale-115 transition-transform duration-300 border border-gold/10">
                {item.icon}
              </div>

              {/* Step Title */}
              <h3 className="font-display text-xl font-bold text-text-heading mt-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="font-sans text-xs text-text-body mt-4 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
