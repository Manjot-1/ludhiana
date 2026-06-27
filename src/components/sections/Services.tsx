import React from 'react';
import SectionLabel from '../ui/SectionLabel';
import GoldDivider from '../ui/GoldDivider';
import { SERVICES } from '../../data';
import { Service } from '../../types';
import { Sparkles, Moon, Layers, Video, Gem, Crown, Check, MessageSquare, Play } from 'lucide-react';

interface ServicesProps {
  setPath: (path: string) => void;
  setSelectedServiceId?: (id: string) => void;
}

export default function Services({ setPath, setSelectedServiceId }: ServicesProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Moon':
        return <Moon className="w-6 h-6 text-gold" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-rose" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-crystal" />;
      case 'Video':
        return <Video className="w-6 h-6 text-gold" />;
      case 'Gem':
        return <Gem className="w-6 h-6 text-crystal" />;
      case 'Crown':
        return <Crown className="w-6 h-6 text-gold" />;
      default:
        return <Sparkles className="w-6 h-6 text-gold" />;
    }
  };

  const handleBookService = (serviceId: string) => {
    if (setSelectedServiceId) {
      setSelectedServiceId(serviceId);
    }
    // Store in localStorage to pass selection to the booking wizard easily
    localStorage.setItem('lto_preselected_service', serviceId);
    setPath('#book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="services-section" className="py-20 px-4 md:px-8 bg-bg-secondary/40 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Decorative Top Label */}
        <SectionLabel label="My Divination Offerings" />
        <h2 className="font-display text-3xl sm:text-5xl font-bold text-center text-text-heading mt-2">
          Readings & Remedies Crafted for You
        </h2>
        <p className="font-sans text-center text-text-muted text-sm sm:text-base max-w-xl mx-auto mt-3">
          Each session is approached with pristine energy, loving attention, and practical guidance. Choose your sanctuary below.
        </p>

        <GoldDivider />

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className={`relative bg-bg-card rounded-3xl border border-gold/15 p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-gold/30 flex flex-col justify-between overflow-hidden group`}
            >
              {/* Highlight Overlay Ribbon for Badge */}
              {service.badge && (
                <div className="absolute top-4 right-4">
                  <span className="px-3.5 py-1 text-[10px] font-bold uppercase tracking-widest bg-gold text-bg-dark rounded-full shadow">
                    {service.badge}
                  </span>
                </div>
              )}

              <div>
                {/* Icon Circle */}
                <div className="w-14 h-14 rounded-full bg-blush/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {getIcon(service.icon)}
                </div>

                {/* Service Name */}
                <h3 className="font-display text-2xl font-bold text-text-heading group-hover:text-gold transition-colors">
                  {service.name}
                </h3>

                {/* Service Tagline */}
                <p className="font-sans text-xs text-text-body mt-3 leading-relaxed min-h-[3.5rem]">
                  {service.tagline}
                </p>

                {/* Delivery details badge */}
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-bg-primary text-[11px] font-medium text-text-body border border-gold/10 mt-4">
                  {service.deliveryType === 'async' ? (
                    <>
                      <MessageSquare className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span>Voice Note · {service.delivery}</span>
                    </>
                  ) : (
                    <>
                      <Video className="w-3.5 h-3.5 text-crystal shrink-0" />
                      <span>Live Video · {service.duration} mins</span>
                    </>
                  )}
                </div>

                <hr className="border-gold/10 my-6" />

                {/* Service Benefits List */}
                <ul className="space-y-2.5 min-h-[9rem]">
                  {service.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start text-xs text-text-body">
                      <Check className="w-4 h-4 text-gold shrink-0 mt-0.5 mr-2" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price and CTA block */}
              <div className="mt-6 pt-4 border-t border-gold/10 flex items-center justify-between">
                <div>
                  <span className="text-xs text-text-muted block uppercase tracking-wider">Energy Exchange</span>
                  <div className="flex items-baseline space-x-1">
                    <span className="font-display text-3xl font-extrabold text-text-heading">₹{service.price}</span>
                    <span className="text-xs text-text-muted">one-time</span>
                  </div>
                </div>

                <button
                  onClick={() => handleBookService(service.id)}
                  className="px-5 py-2.5 rounded-full bg-text-heading text-bg-primary text-xs font-semibold tracking-wider hover:bg-gold hover:text-bg-dark transition-all duration-300 border border-gold/10 group-hover:shadow cursor-pointer"
                >
                  Book Now →
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
