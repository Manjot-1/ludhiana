import React, { useEffect, useState } from 'react';
import { Booking } from '../../types';
import { CheckCircle2, MessageSquare, ExternalLink, Calendar, ArrowRight, ShoppingBag } from 'lucide-react';

interface BookingConfirmProps {
  setPath: (path: string) => void;
}

export default function BookingConfirm({ setPath }: BookingConfirmProps) {
  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('lto_latest_booking');
    if (stored) {
      setBooking(JSON.parse(stored));
    }
  }, []);

  if (!booking) {
    return (
      <div className="py-32 text-center">
        <p className="text-text-muted text-xs">No active booking session found.</p>
        <button
          onClick={() => setPath('#home')}
          className="mt-4 px-6 py-2.5 rounded-full bg-text-heading text-bg-primary text-xs font-semibold"
        >
          Return Home
        </button>
      </div>
    );
  }

  // Create customized WhatsApp message content link
  const waMessage = encodeURIComponent(
    `Hello Ludhiana's Tarot Oracle! I just completed booking my reading session.\n\n*Reference Number:* ${booking.bookingRef}\n*Service Type:* ${booking.serviceName}\n*My Name:* ${booking.clientName}\n*My Question:* ${booking.clientQuestion}`
  );
  const waUrl = `https://wa.me/919876543210?text=${waMessage}`;

  return (
    <section className="py-24 px-4 md:px-8 bg-bg-primary min-h-screen flex items-center justify-center">
      <div className="max-w-xl w-full text-center">
        
        {/* Animated Checkmark Wrapper */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center shadow-lg animate-scaleUp">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 animate-pulse" />
          </div>
        </div>

        {/* Headings */}
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-text-heading leading-tight">
          Your Reading is Booked!
        </h1>
        <p className="font-sans text-gold text-xs font-semibold tracking-widest uppercase mt-1">
          ✦ Session Confirmed & Energy Aligned ✦
        </p>

        {/* Booking Card details panel */}
        <div className="bg-white border border-gold/15 rounded-3xl p-6 sm:p-8 shadow-xl mt-8 text-left space-y-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-emerald-500"></div>

          <div className="flex justify-between items-center pb-3 border-b border-gold/5 text-xs">
            <span className="text-text-muted">Booking Reference:</span>
            <span className="font-mono font-bold text-text-heading bg-bg-secondary px-2.5 py-1 rounded border border-gold/10">
              {booking.bookingRef}
            </span>
          </div>

          <div className="space-y-2 text-xs text-text-body">
            <div className="flex justify-between">
              <span className="text-text-muted">Target Service:</span>
              <span className="font-semibold text-text-heading">{booking.serviceName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Energy Exchange Paid:</span>
              <span className="font-bold text-gold">₹{booking.amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Delivery Schedule:</span>
              <span className="font-medium text-text-heading">
                {booking.deliveryType === 'async' ? 'Within 24–48 hours via Voice Note' : 'Per Live scheduled slot'}
              </span>
            </div>
          </div>
        </div>

        {/* ACTION MANDATE: WhatsApp instructions */}
        <div className="mt-8 bg-gold/5 border border-gold/25 p-6 rounded-2xl text-left space-y-4">
          <h3 className="font-display text-lg font-bold text-text-heading flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-gold shrink-0" /> NEXT STEP REQUIRED:
          </h3>
          <p className="text-xs text-text-body leading-relaxed">
            Please click below to send me a fast WhatsApp text. Sending this message links your payment to your WhatsApp inbox, so I can deliver your customized voice note or video link directly to you.
          </p>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs tracking-wider flex items-center justify-center gap-2 hover:bg-emerald-500 transition-all shadow"
          >
            Confirm booking on WhatsApp <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Secondary Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <button
            onClick={() => setPath('#store')}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-transparent border border-gold/30 text-gold text-xs font-semibold tracking-wider hover:bg-gold/5 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" /> Visit Crystal Store
          </button>
          
          <button
            onClick={() => setPath('#home')}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-text-heading text-bg-primary text-xs font-semibold tracking-wider hover:bg-cta-hover flex items-center justify-center gap-1.5 cursor-pointer shadow"
          >
            Go Back Home <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
