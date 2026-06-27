import React, { useState } from 'react';
import { useCartStore } from '../../stores/cartStore';
import { db } from '../../lib/db';
import { CrystalOrder } from '../../types';
import { Trash2, ShoppingBag, ArrowLeft, ArrowRight, ShieldCheck, CreditCard, ChevronRight, AlertCircle, Plus, Minus } from 'lucide-react';

interface StoreCartProps {
  setPath: (path: string) => void;
}

export default function StoreCart({ setPath }: StoreCartProps) {
  const { items, updateQuantity, removeFromCart, clearCart } = useCartStore();
  const [step, setStep] = useState(1);

  // Shipping details form
  const [shippingName, setShippingName] = useState('');
  const [shippingPhone, setShippingPhone] = useState('');
  const [shippingEmail, setShippingEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [shippingPincode, setShippingPincode] = useState('');
  const [error, setError] = useState('');
  
  // Payment processing
  const [isProcessing, setIsProcessing] = useState(false);

  // Financial Calculations
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = subtotal >= 999 || subtotal === 0 ? 0 : 99;
  const totalAmount = subtotal + shippingFee;

  const handleNextStep = () => {
    if (items.length === 0) return;
    setStep(2);
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingName || !shippingPhone || !shippingAddress || !shippingCity || !shippingPincode) {
      setError('Please fill in all required shipping fields to locate your sanctuary.');
      return;
    }
    if (shippingPincode.replace(/\D/g, '').length !== 6) {
      setError('Please enter a valid 6-digit Indian Postal Pincode.');
      return;
    }
    setError('');
    setStep(3);
  };

  const handleRazorpayPayment = () => {
    setIsProcessing(true);

    // Simulate payment transaction
    setTimeout(() => {
      const orderRef = `LTOC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

      const newOrder: CrystalOrder = {
        id: `ord_${Date.now()}`,
        orderRef,
        clientName: shippingName,
        clientPhone: shippingPhone,
        clientEmail: shippingEmail,
        shippingAddress,
        shippingCity,
        shippingPincode,
        items: items.map(item => ({
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.quantity,
          unitPrice: item.product.price,
          total: item.product.price * item.quantity
        })),
        subtotal,
        shippingFee,
        total: totalAmount,
        paymentStatus: 'paid',
        orderStatus: 'processing',
        createdAt: new Date().toISOString()
      };

      db.saveOrder(newOrder);
      clearCart();
      setIsProcessing(false);

      // Save latest order reference for confirmation screen
      localStorage.setItem('lto_latest_order', JSON.stringify(newOrder));
      
      setPath('#store/confirm');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
  };

  if (items.length === 0 && step < 3) {
    return (
      <div className="py-32 text-center max-w-md mx-auto px-4">
        <ShoppingBag className="w-16 h-16 text-gold/30 mx-auto mb-4 stroke-1" />
        <h2 className="font-display text-2xl font-bold text-text-heading">Your Cart is Empty</h2>
        <p className="text-xs text-text-muted mt-2">Browse our high-vibration collection of crystals, customized jewelry, and white sage bundles to begin filling your cart.</p>
        <button
          onClick={() => setPath('#store')}
          className="mt-6 px-6 py-3 rounded-full bg-text-heading text-bg-primary text-xs font-semibold tracking-wider hover:bg-cta-hover transition-all cursor-pointer border border-gold/15"
        >
          Return to Apothecary
        </button>
      </div>
    );
  }

  return (
    <section className="py-24 px-4 md:px-8 bg-bg-primary min-h-screen">
      <div className="max-w-5xl mx-auto">
        
        {/* Step tracker */}
        <div className="flex items-center space-x-3 text-xs font-bold text-text-muted uppercase tracking-widest mb-10 border-b border-gold/10 pb-4">
          <span className={step === 1 ? 'text-gold' : 'text-text-muted'}>01 Review Cart</span>
          <ChevronRight className="w-3.5 h-3.5 text-gold/40" />
          <span className={step === 2 ? 'text-gold' : 'text-text-muted'}>02 Shipping</span>
          <ChevronRight className="w-3.5 h-3.5 text-gold/40" />
          <span className={step === 3 ? 'text-gold' : 'text-text-muted'}>03 Secured Payment</span>
        </div>

        {error && (
          <div className="mb-6 bg-rose/5 border border-rose/30 text-text-heading p-4 rounded-xl flex items-start space-x-3 text-xs">
            <AlertCircle className="w-5 h-5 text-rose shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: Cart items or details forms */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-gold/15 p-6 sm:p-10 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-gold via-rose to-crystal"></div>

            {/* STEP 1: CART REVIEW */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl font-bold text-text-heading">Review Sacred Cart</h2>
                
                <div className="space-y-4 divide-y divide-gold/10">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center space-x-4 pt-4 first:pt-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 object-cover rounded-xl border border-gold/10"
                      />
                      <div className="flex-1">
                        <h3 className="font-display font-semibold text-text-heading text-sm">
                          {item.product.name}
                        </h3>
                        <p className="text-[10px] text-gold font-medium uppercase tracking-wider mt-0.5">
                          {item.product.chakra} Chakra
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <div className="flex items-center border border-gold/15 rounded bg-bg-primary">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="px-2 py-0.5 text-text-muted hover:text-text-heading font-bold"
                            >
                              -
                            </button>
                            <span className="px-2 text-xs font-semibold text-text-heading font-mono">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="px-2 py-0.5 text-text-muted hover:text-text-heading font-bold"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-1 text-text-muted hover:text-rose transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-text-heading text-sm">₹{item.product.price * item.quantity}</span>
                        {item.quantity > 1 && <span className="block text-[10px] text-text-muted mt-0.5">₹{item.product.price} each</span>}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gold/10">
                  <button
                    onClick={() => setPath('#store')}
                    className="text-xs font-bold text-text-muted hover:text-gold flex items-center gap-1 cursor-pointer bg-transparent border-0"
                  >
                    <ArrowLeft className="w-4 h-4" /> Add More Crystals
                  </button>
                  
                  <button
                    onClick={handleNextStep}
                    className="px-6 py-3 rounded-full bg-text-heading text-bg-primary text-xs font-semibold tracking-wider hover:bg-cta-hover transition-all flex items-center gap-1.5 cursor-pointer shadow"
                  >
                    Provide Address <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: SHIPPING FORM */}
            {step === 2 && (
              <form onSubmit={handleShippingSubmit} className="space-y-5">
                <h2 className="font-display text-2xl font-bold text-text-heading mb-4">Shipping Destination</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-text-body mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={shippingName}
                      onChange={(e) => {
                        setShippingName(e.target.value);
                        setError('');
                      }}
                      placeholder="Full Name"
                      className="w-full px-4 py-2.5 rounded-xl border border-gold/20 bg-white text-xs focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-text-body mb-1">Mobile Phone *</label>
                    <input
                      type="tel"
                      required
                      value={shippingPhone}
                      onChange={(e) => {
                        setShippingPhone(e.target.value);
                        setError('');
                      }}
                      placeholder="10-digit phone number"
                      className="w-full px-4 py-2.5 rounded-xl border border-gold/20 bg-white text-xs focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-body mb-1">Email Address (Optional)</label>
                  <input
                    type="email"
                    value={shippingEmail}
                    onChange={(e) => setShippingEmail(e.target.value)}
                    placeholder="For tracking details"
                    className="w-full px-4 py-2.5 rounded-xl border border-gold/20 bg-white text-xs focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-body mb-1">Complete Mailing Address *</label>
                  <textarea
                    required
                    value={shippingAddress}
                    onChange={(e) => {
                      setShippingAddress(e.target.value);
                      setError('');
                    }}
                    placeholder="House No, Altar Block, Street Name, Colony..."
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border border-gold/20 bg-white text-xs focus:outline-none focus:border-gold resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-text-body mb-1">City / Town *</label>
                    <input
                      type="text"
                      required
                      value={shippingCity}
                      onChange={(e) => {
                        setShippingCity(e.target.value);
                        setError('');
                      }}
                      placeholder="e.g. Ludhiana"
                      className="w-full px-4 py-2.5 rounded-xl border border-gold/20 bg-white text-xs focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-text-body mb-1">Postal Pincode *</label>
                    <input
                      type="text"
                      required
                      value={shippingPincode}
                      onChange={(e) => {
                        setShippingPincode(e.target.value);
                        setError('');
                      }}
                      placeholder="6-digit PIN"
                      className="w-full px-4 py-2.5 rounded-xl border border-gold/20 bg-white text-xs focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gold/10">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-3 rounded-full border border-gold/20 text-text-body hover:border-gold/40 text-xs font-semibold tracking-wider flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back to Cart
                  </button>
                  
                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-full bg-text-heading text-bg-primary text-xs font-semibold tracking-wider hover:bg-cta-hover transition-all flex items-center gap-1.5 cursor-pointer shadow"
                  >
                    Go to Payment <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: SECURED PAYMENT SUMMARY */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl font-bold text-text-heading">Secured Razorpay Gateway</h2>
                <p className="text-xs text-text-muted">Review shipping details and proceed to secured INR transaction exchange.</p>

                <div className="border border-gold/10 p-5 rounded-2xl bg-bg-secondary/30 space-y-2 text-xs">
                  <div className="flex justify-between border-b border-gold/5 pb-2">
                    <span className="font-bold text-text-heading">Recipient:</span>
                    <span>{shippingName} (+91 {shippingPhone})</span>
                  </div>
                  <div className="flex justify-between border-b border-gold/5 pb-2">
                    <span className="font-bold text-text-heading">Destination:</span>
                    <span className="text-right max-w-xs">{shippingAddress}, {shippingCity} - {shippingPincode}</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-gold/5 flex flex-col items-center">
                  {isProcessing ? (
                    <div className="flex flex-col items-center justify-center py-6 space-y-4">
                      <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin"></div>
                      <p className="text-xs text-text-muted animate-pulse font-medium">
                        Configuring secured checkout screen. Please hold...
                      </p>
                    </div>
                  ) : (
                    <div className="w-full space-y-4">
                      <button
                        onClick={handleRazorpayPayment}
                        className="w-full py-4 rounded-full bg-text-heading text-bg-primary font-bold tracking-wider hover:bg-cta-hover transition-all duration-300 flex items-center justify-center gap-2 border border-gold/15 cursor-pointer shadow-md"
                      >
                        <CreditCard className="w-4 h-4 text-gold" /> Pay ₹{totalAmount} Securely via Razorpay
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="w-full py-3.5 rounded-full bg-transparent border border-gold/30 text-gold text-xs font-semibold tracking-wider hover:bg-gold/5 transition-all cursor-pointer"
                      >
                        Change Address
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Right panel: Financial Bill Summary */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-gold/15 p-6 sm:p-8 shadow-md">
            <h3 className="font-display font-bold text-text-heading text-lg mb-4">Investment Summary</h3>

            <div className="space-y-3.5 text-xs text-text-body">
              <div className="flex justify-between py-1 border-b border-gold/5">
                <span className="text-text-muted">Sacred Cart Subtotal:</span>
                <span className="font-semibold text-text-heading font-mono">₹{subtotal}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gold/5">
                <span className="text-text-muted">Mailing & Blessing fee:</span>
                <span className="font-semibold text-text-heading font-mono">{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gold/10 text-sm font-bold text-text-heading">
                <span>Total Amount:</span>
                <span className="font-display text-lg text-gold font-bold">₹{totalAmount}</span>
              </div>
            </div>

            {/* Quick trust metrics */}
            <div className="mt-6 pt-6 border-t border-gold/10 space-y-3.5 text-[11px] text-text-muted leading-relaxed">
              <div className="flex items-start space-x-2">
                <ShieldCheck className="w-4.5 h-4.5 text-gold shrink-0" />
                <span>Every crystal is packaged securely with premium wraps and white sage cards inside.</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
