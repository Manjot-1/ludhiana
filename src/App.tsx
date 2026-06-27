import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartDrawer from './components/store/CartDrawer';

// Main sections / pages
import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import Process from './components/sections/Process';
import CrystalStore from './components/sections/CrystalStore';
import Testimonials from './components/sections/Testimonials';
import Blog from './components/sections/Blog';
import FAQ from './components/sections/FAQ';

// Full pages
import AboutPage from './components/pages/AboutPage';
import TestimonialsPage from './components/pages/TestimonialsPage';
import BlogPage from './components/pages/BlogPage';
import BlogSinglePage from './components/pages/BlogSinglePage';
import ContactPage from './components/pages/ContactPage';

// Booking & Store Flows
import BookingFlow from './components/booking/BookingFlow';
import BookingConfirm from './components/booking/BookingConfirm';
import StoreHome from './components/store/StoreHome';
import ProductDetail from './components/store/ProductDetail';
import StoreCart from './components/store/StoreCart';
import StoreConfirm from './components/store/StoreConfirm';

// Admin panel
import AdminDashboard from './components/admin/AdminDashboard';

export default function App() {
  const [path, setPathState] = useState<string>('#home');

  // Custom setPath wrapper that updates location hash as well
  const setPath = (newPath: string) => {
    window.location.hash = newPath;
    setPathState(newPath);
  };

  useEffect(() => {
    // Synchronize initial hash on reload
    const handleHashChange = () => {
      const hash = window.location.hash || '#home';
      setPathState(hash);
      // Auto-scroll to top on navigation changes
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Run once initially

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Main routing dispatcher
  const renderContent = () => {
    // Store product page regex: #store/product/p_xxxx
    if (path.startsWith('#store/product/')) {
      const id = path.substring('#store/product/'.length);
      return <ProductDetail productId={id} setPath={setPath} />;
    }

    // Blog details slug regex: #blog/slug-title
    if (path.startsWith('#blog/')) {
      const slug = path.substring('#blog/'.length);
      return <BlogSinglePage slug={slug} setPath={setPath} />;
    }

    switch (path) {
      case '#home':
      case '':
        return (
          <div className="space-y-0">
            <Hero setPath={setPath} />
            <Services setPath={setPath} />
            <Process />
            <CrystalStore setPath={setPath} />
            <Testimonials />
            <FAQ />
            <Blog setPath={setPath} />
            
            {/* CTA Altar Banner */}
            <section className="py-24 px-4 bg-bg-dark text-center text-text-light relative overflow-hidden">
              <div className="absolute inset-0 bg-radial-gradient from-gold/10 to-transparent pointer-events-none" />
              <div className="max-w-2xl mx-auto space-y-6 relative">
                <p className="font-sans text-xs font-bold uppercase tracking-widest text-gold">✦ EMBRACE TRANSFORMATION ✦</p>
                <h2 className="font-display text-3xl sm:text-5xl font-extrabold leading-tight">Ready to Unveil Your Path?</h2>
                <p className="font-sans text-xs sm:text-sm text-text-light/70 max-w-md mx-auto leading-relaxed">
                  Book a confidential, supportive reading today and experience practical, real-world clarity directly in your inbox.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <button
                    onClick={() => setPath('#book')}
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-gold text-bg-dark font-semibold text-xs tracking-wider uppercase hover:bg-gold-light transition-all shadow cursor-pointer border border-gold/10"
                  >
                    Schedule Tarot Reading
                  </button>
                  <button
                    onClick={() => setPath('#store')}
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold text-xs tracking-wider uppercase transition-all cursor-pointer"
                  >
                    Browse Altar Crystals
                  </button>
                </div>
              </div>
            </section>
          </div>
        );

      case '#services':
        return (
          <div className="space-y-0">
            <Services setPath={setPath} />
            <Process />
          </div>
        );

      case '#book':
        return <BookingFlow setPath={setPath} />;

      case '#book/confirm':
        return <BookingConfirm setPath={setPath} />;

      case '#store':
        return <StoreHome setPath={setPath} />;

      case '#store/cart':
        return <StoreCart setPath={setPath} />;

      case '#store/confirm':
        return <StoreConfirm setPath={setPath} />;

      case '#about':
        return <AboutPage setPath={setPath} />;

      case '#testimonials':
        return <TestimonialsPage />;

      case '#blog':
        return <BlogPage setPath={setPath} />;

      case '#contact':
        return <ContactPage />;

      case '#admin':
        return <AdminDashboard />;

      default:
        return (
          <div className="py-32 text-center">
            <h1 className="font-display text-4xl font-bold text-text-heading">404 - Energy Dissipated</h1>
            <p className="text-text-muted text-xs mt-2">The path you took returned to cosmic dust.</p>
            <button
              onClick={() => setPath('#home')}
              className="mt-6 px-6 py-2.5 rounded-full bg-text-heading text-bg-primary text-xs font-semibold"
            >
              Return Home
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col justify-between font-sans selection:bg-gold/20">
      <div>
        {/* Navbar is static */}
        <Navbar currentPath={path} setPath={setPath} />

        {/* Dynamic page area */}
        <main className="relative animate-fadeIn">
          {renderContent()}
        </main>
      </div>

      {/* Cart Slider Drawer overlay */}
      <CartDrawer setPath={setPath} />

      {/* Static Footer */}
      <Footer setPath={setPath} />
    </div>
  );
}
