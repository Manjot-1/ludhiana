import React from 'react';
import { Send, Calendar } from 'lucide-react';

interface BookingCTAProps {
  setPath: (path: string) => void;
}

export default function BookingCTA({ setPath }: BookingCTAProps) {
  return (
    <section className="py-24 px-4 md:px-8 bg-bg-dark text-text-light relative overflow-hidden">
      {/* Background Star fields */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full star animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-1.5 h-1.5 bg-white rounded-full star animate-pulse"></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-white rounded-full star animate-pulse"></div>
      </div>

      <div className="absolute -top-12 -left-12 w-80 h-80 rounded-full bg-gold/10 glow-orb"></div>
      <div className="absolute -bottom-16 -right-16 w-96 h-96 rounded-full bg-crystal/10 glow-orb"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center space-y-6">
        <span className="font-display italic text-gold text-lg md:text-xl tracking-wider select-none">
          ✦ Align Your Sacred Energy ✦
        </span>
        
        <h2 className="font-display text-4xl md:text-6xl font-extrabold text-white leading-tight">
          Ready to Discover Your Truth?
        </h2>
        
        <p className="font-sans text-sm sm:text-base text-text-light/80 max-w-2xl leading-relaxed">
          Unlock answers regarding your relationships, career, or internal spiritual blocks today. Book an automatic reading from Ludhiana's Tarot Oracle.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full max-w-md">
          <button
            onClick={() => {
              setPath('#book');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto flex-1 px-8 py-4 rounded-full bg-gold text-bg-dark font-semibold tracking-wider hover:bg-gold-light transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <Calendar className="w-4 h-4" /> Book Reading Now
          </button>
          
          <a
            href="https://wa.me/919876543210?text=Hello!%20I%20am%20interested%20in%20booking%20a%20tarot%20or%20crystal%20reading%20session%20with%20you."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex-1 px-8 py-4 rounded-full bg-emerald-600 text-white font-semibold tracking-wider hover:bg-emerald-500 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <Send className="w-4 h-4 transform rotate-45" /> WhatsApp Me
          </a>
        </div>

        <p className="text-[10px] text-text-light/40 tracking-widest uppercase pt-2">
          ⚡ Automated Booking · Secure UPI/Card Payments · Prompt Voice Note Delivery
        </p>
      </div>
    </section>
  );
}
