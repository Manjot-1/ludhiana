import React, { useState, useEffect } from 'react';
import { MoonIcon } from '../ui/IllustrationIcons';
import { useCartStore } from '../../stores/cartStore';
import { ShoppingCart, Menu, X, ShieldAlert } from 'lucide-react';
import { db } from '../../lib/db';

interface NavbarProps {
  currentPath: string;
  setPath: (path: string) => void;
}

export default function Navbar({ currentPath, setPath }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { items, toggleCart } = useCartStore();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update admin status dynamically
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAdmin(db.isAdminLoggedIn());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { name: 'Home', path: '#home' },
    { name: 'Services', path: '#services' },
    { name: 'Crystal Store', path: '#store' },
    { name: 'About', path: '#about' },
    { name: 'Blog', path: '#blog' },
    { name: 'Testimonials', path: '#testimonials' },
    { name: 'Contact', path: '#contact' },
  ];

  const handleNavClick = (path: string) => {
    setPath(path);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled || isOpen || currentPath !== '#home'
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-gold/10'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => handleNavClick('#home')}
          className="flex items-center space-x-2 cursor-pointer group"
        >
          <MoonIcon className="w-8 h-8 text-gold transition-transform duration-300 group-hover:rotate-12" />
          <div className="flex flex-col">
            <span className="font-display text-lg md:text-xl font-bold tracking-wide text-white leading-tight">
              Ludhiana's Tarot Oracle
            </span>
            <span className="font-script text-gold text-xs leading-none tracking-widest mt-0.5">
              Guiding Souls Toward Clarity & Peace
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path || (link.path === '#store' && currentPath.startsWith('#store'));
            return (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.path)}
                className={`font-sans text-sm font-medium tracking-wide transition-colors relative py-1 cursor-pointer ${
                  isActive
                    ? 'text-gold'
                    : 'text-text-body hover:text-gold'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gold" />
                )}
              </button>
            );
          })}
          {isAdmin && (
            <button
              onClick={() => handleNavClick('#admin')}
              className={`font-sans text-xs font-bold tracking-widest transition-colors py-1 px-2.5 rounded border border-rose/30 bg-rose/5 text-rose flex items-center gap-1 cursor-pointer hover:bg-rose/10`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              ADMIN
            </button>
          )}
        </div>

        {/* Action Elements */}
        <div className="flex items-center space-x-4">
          {/* Cart Button */}
          <button
            onClick={() => toggleCart(true)}
            className="p-2 text-text-body hover:text-gold relative transition-colors cursor-pointer"
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Booking CTA button */}
          <button
            onClick={() => handleNavClick('#book')}
            className="hidden sm:inline-block px-5 py-2 rounded-full bg-text-heading text-bg-primary text-sm font-semibold tracking-wider hover:bg-cta-hover transition-all duration-300 shadow hover:shadow-md border border-gold/15 hover:border-gold/30 cursor-pointer"
          >
            Book a Reading
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-text-body hover:text-gold transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gold/15 py-6 px-6 shadow-xl flex flex-col space-y-4 animate-fadeIn">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.path)}
                className={`text-left font-display text-xl font-medium tracking-wide py-1.5 border-b border-gold/5 ${
                  isActive ? 'text-gold pl-2 border-l-2 border-l-gold' : 'text-text-body'
                }`}
              >
                {link.name}
              </button>
            );
          })}
          {isAdmin && (
            <button
              onClick={() => handleNavClick('#admin')}
              className="text-left font-display text-xl font-bold tracking-wide py-1.5 border-b border-gold/5 text-rose flex items-center gap-1.5"
            >
              <ShieldAlert className="w-5 h-5" />
              Admin Dashboard
            </button>
          )}
          <button
            onClick={() => handleNavClick('#book')}
            className="w-full text-center py-3 rounded-full bg-text-heading text-bg-primary font-semibold tracking-wider hover:bg-cta-hover transition-all mt-4 border border-gold/20"
          >
            Book a Reading
          </button>
        </div>
      )}
    </nav>
  );
}
