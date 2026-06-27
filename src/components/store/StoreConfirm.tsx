import React, { useEffect, useState } from 'react';
import { CrystalOrder } from '../../types';
import { CheckCircle2, ShoppingBag, ExternalLink, ArrowRight } from 'lucide-react';

interface StoreConfirmProps {
  setPath: (path: string) => void;
}

export default function StoreConfirm({ setPath }: StoreConfirmProps) {
  const [order, setOrder] = useState<CrystalOrder | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('lto_latest_order');
    if (stored) {
      setOrder(JSON.parse(stored));
    }
  }, []);

  if (!order) {
    return (
      <div className="py-32 text-center">
        <p className="text-text-muted text-xs">No active store order session found.</p>
        <button
          onClick={() => setPath('#store')}
          className="mt-4 px-6 py-2 rounded-full bg-text-heading text-bg-primary text-xs font-semibold"
        >
          Return to Apothecary
        </button>
      </div>
    );
  }

  return (
    <section className="py-24 px-4 md:px-8 bg-bg-primary min-h-screen flex items-center justify-center animate-fadeIn">
      <div className="max-w-xl w-full text-center">
        
        {/* Animated Checkmark */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center shadow-lg animate-scaleUp">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 animate-pulse" />
          </div>
        </div>

        {/* Headings */}
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-text-heading leading-tight">
          Your Order is Placed!
        </h1>
        <p className="font-sans text-gold text-xs font-semibold tracking-widest uppercase mt-1">
          ✦ Blessed Crystals are Preparing for You ✦
        </p>

        {/* Order Details Panel */}
        <div className="bg-white border border-gold/15 rounded-3xl p-6 sm:p-8 shadow-xl mt-8 text-left space-y-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-emerald-500"></div>

          <div className="flex justify-between items-center pb-3 border-b border-gold/5 text-xs">
            <span className="text-text-muted">Order Reference:</span>
            <span className="font-mono font-bold text-text-heading bg-bg-secondary px-2.5 py-1 rounded border border-gold/10">
              {order.orderRef}
            </span>
          </div>

          <div className="space-y-2 text-xs text-text-body">
            <div className="flex justify-between">
              <span className="text-text-muted">Customer Name:</span>
              <span className="font-semibold text-text-heading">{order.clientName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Total Amount Paid:</span>
              <span className="font-bold text-gold">₹{order.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Estimated Delivery:</span>
              <span className="font-medium text-emerald-700">5–7 business days</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-text-muted">Shipping Destination:</span>
              <span className="font-medium text-text-heading text-right max-w-xs">{order.shippingAddress}, {order.shippingCity} - {order.shippingPincode}</span>
            </div>
          </div>
        </div>

        {/* Sage Altar cleansing ritual note */}
        <div className="mt-8 bg-gold/5 border border-gold/25 p-6 rounded-2xl text-left space-y-2.5">
          <p className="text-xs text-text-body leading-relaxed font-sans">
            ✨ <strong>Moonlight & Sage Ritual</strong>: Every crystal ordered is laid on my private altar to cleanse and charge under the next moon cycles and blessed with standard white sage smudge sticks before leaving our sanctuary.
          </p>
          <p className="text-[11px] text-text-muted leading-relaxed">
            An email containing tracking links will arrive at your inbox as soon as our mailing partners confirm shipment.
          </p>
        </div>

        {/* Actions row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <button
            onClick={() => setPath('#store')}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-transparent border border-gold/30 text-gold text-xs font-semibold tracking-wider hover:bg-gold/5 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" /> Continue Shopping
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
