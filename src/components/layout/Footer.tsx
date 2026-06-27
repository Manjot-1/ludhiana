import React from 'react';
import { MoonIcon } from '../ui/IllustrationIcons';
import { Instagram, Send, Sparkles, MapPin, Phone, Mail } from 'lucide-react';

interface FooterProps {
  setPath: (path: string) => void;
}

export default function Footer({ setPath }: FooterProps) {
  const handleNavClick = (path: string) => {
    setPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-bg-dark text-text-light border-t border-gold/15 py-16 px-4 md:px-8 relative overflow-hidden">
      {/* Subtle star elements or glowing radial effect */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-crystal/5 rounded-full glow-orb"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-rose/5 rounded-full glow-orb"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        {/* About column */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNavClick('#home')}>
            <MoonIcon className="w-8 h-8 text-gold" />
            <div className="flex flex-col">
              <span className="font-display text-lg font-bold tracking-wide text-white">
                Ludhiana's Tarot Oracle
              </span>
              <span className="font-script text-gold-light text-xs tracking-widest mt-0.5">
                Clarity & Peace
              </span>
            </div>
          </div>
          <p className="font-sans text-xs text-text-light/70 leading-relaxed max-w-sm">
            Professional Tarot Readings & Crystal Healing. Guiding souls toward their highest potential under the guidance of ancient wisdom and divine intuition.
          </p>
          <div className="flex items-center space-x-3 pt-2">
            <a
              href="https://instagram.com/ludhianastarotoracle9"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/5 border border-white/10 text-gold-light hover:bg-gold hover:text-bg-dark transition-all duration-300"
              aria-label="Instagram Link"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/5 border border-white/10 text-green-400 hover:bg-green-500 hover:text-bg-dark transition-all duration-300"
              aria-label="WhatsApp Link"
            >
              <Send className="w-4 h-4 transform rotate-45" />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h3 className="font-display text-lg font-semibold tracking-wider text-gold-light mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Quick Navigation
          </h3>
          <ul className="space-y-2.5 font-sans text-sm">
            <li>
              <button onClick={() => handleNavClick('#home')} className="hover:text-gold transition-colors text-text-light/80 text-left">
                Home Canvas
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('#services')} className="hover:text-gold transition-colors text-text-light/80 text-left">
                Tarot Services
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('#store')} className="hover:text-gold transition-colors text-text-light/80 text-left">
                Crystal Store
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('#blog')} className="hover:text-gold transition-colors text-text-light/80 text-left">
                Spiritual Blog
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('#testimonials')} className="hover:text-gold transition-colors text-text-light/80 text-left">
                Client Testimonials
              </button>
            </li>
          </ul>
        </div>

        {/* Store Categories Column */}
        <div>
          <h3 className="font-display text-lg font-semibold tracking-wider text-gold-light mb-4">
            Crystal Store
          </h3>
          <ul className="space-y-2.5 font-sans text-sm">
            <li>
              <button onClick={() => handleNavClick('#store')} className="hover:text-gold transition-colors text-text-light/80 text-left">
                Moon-Charged Crystals
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('#store')} className="hover:text-gold transition-colors text-text-light/80 text-left">
                Amulet Jewelry
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('#store')} className="hover:text-gold transition-colors text-text-light/80 text-left">
                Anxiety Relief Kits
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('#store')} className="hover:text-gold transition-colors text-text-light/80 text-left">
                Ritual Smudge Tools
              </button>
            </li>
          </ul>
        </div>

        {/* Contact/Ludhiana details Column */}
        <div>
          <h3 className="font-display text-lg font-semibold tracking-wider text-gold-light mb-4">
            Ludhiana Sanctuary
          </h3>
          <ul className="space-y-3 font-sans text-xs text-text-light/80">
            <li className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <span>Sarabha Nagar / Model Town, Ludhiana, Punjab, India</span>
            </li>
            <li className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-gold shrink-0" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-gold shrink-0" />
              <span>guidance@ludhianastarotoracle.com</span>
            </li>
            <li className="pt-2 text-[10px] text-text-light/50 tracking-wider">
              ✦ Online readings delivered globally via WhatsApp audio notes and Google Meet.
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-text-light/40 relative z-10">
        <p>© 2026 Ludhiana's Tarot Oracle. All Sacred Rights Reserved.</p>
        <p className="mt-2 md:mt-0 flex items-center gap-1.5">
          Designed with intention <span className="text-rose">♥</span> for @ludhianastarotoracle9
          <span className="text-white/20">|</span>
          <button onClick={() => handleNavClick('#admin')} className="text-gold/50 hover:text-gold transition-colors underline bg-transparent border-none cursor-pointer">
            Admin Area
          </button>
        </p>
      </div>
    </footer>
  );
}
