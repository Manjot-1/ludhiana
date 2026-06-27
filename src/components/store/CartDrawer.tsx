import React from 'react';
import { useCartStore } from '../../stores/cartStore';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  setPath: (path: string) => void;
}

export default function CartDrawer({ setPath }: CartDrawerProps) {
  const { items, isOpen, toggleCart, updateQuantity, removeFromCart } = useCartStore();

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 999;
  const shippingLeft = freeShippingThreshold - subtotal;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleCheckout = () => {
    toggleCart(false);
    setPath('#store/cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="cart-drawer-overlay" className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => toggleCart(false)}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-bg-primary shadow-2xl flex flex-col border-l border-gold/10">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gold/10 flex items-center justify-between bg-bg-secondary/30">
            <h2 className="font-display text-xl font-bold text-text-heading flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-gold" /> Your Sacred Cart
            </h2>
            <button
              onClick={() => toggleCart(false)}
              className="p-1 rounded-full hover:bg-gold/10 text-text-muted hover:text-text-heading transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Shipping Progress Bar */}
          <div className="px-6 py-4 bg-bg-secondary/40 border-b border-gold/10 text-xs text-text-body">
            {subtotal === 0 ? (
              <p>Add moon-charged crystals to unlock free shipping above ₹999!</p>
            ) : shippingLeft > 0 ? (
              <p>
                Add <span className="font-bold text-gold">₹{shippingLeft}</span> more for{' '}
                <span className="font-bold text-text-heading">FREE shipping</span>!
              </p>
            ) : (
              <p className="text-emerald-700 font-semibold">
                🎉 Congratulations! You have unlocked FREE shipping!
              </p>
            )}
            <div className="w-full bg-black/10 h-2 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-gold h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 py-4 overflow-y-auto px-6 space-y-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center space-y-3">
                <ShoppingBag className="w-16 h-16 text-gold/30 stroke-1" />
                <p className="font-display text-lg text-text-heading font-medium">
                  Your cart is empty
                </p>
                <p className="text-xs text-text-muted max-w-xs">
                  Browse our handpicked raw crystals, enchanted bracelets, and cleansing kits to raise your room's vibration.
                </p>
                <button
                  onClick={() => {
                    toggleCart(false);
                    setPath('#store');
                  }}
                  className="mt-2 text-xs font-semibold tracking-wider uppercase text-gold hover:text-text-heading underline underline-offset-4 cursor-pointer"
                >
                  Start Exploring →
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center space-x-4 py-3 border-b border-gold/5 last:border-0"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 object-cover rounded-lg border border-gold/10"
                  />
                  <div className="flex-1">
                    <h3 className="font-display font-semibold text-text-heading text-sm">
                      {item.product.name}
                    </h3>
                    <p className="text-[11px] text-gold font-medium mt-0.5">
                      {item.product.chakra} Chakra
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <div className="flex items-center border border-gold/20 rounded-md bg-white">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 text-text-muted hover:text-text-heading cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-text-heading">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 text-text-muted hover:text-text-heading cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-text-muted hover:text-rose p-1 cursor-pointer transition-colors"
                        title="Remove product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-text-heading text-sm">
                      ₹{item.product.price * item.quantity}
                    </p>
                    {item.quantity > 1 && (
                      <p className="text-[10px] text-text-muted mt-0.5">
                        ₹{item.product.price} each
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="px-6 py-6 border-t border-gold/10 bg-bg-secondary/20">
              <div className="flex items-center justify-between text-base font-semibold text-text-heading mb-4">
                <span>Subtotal Investment</span>
                <span className="font-display text-xl text-gold">₹{subtotal}</span>
              </div>
              <p className="text-[10px] text-text-muted mb-4">
                * Shipping, GST, and ritual blessing cards calculated at checkout.
              </p>
              <button
                onClick={handleCheckout}
                className="w-full py-3.5 rounded-full bg-text-heading text-bg-primary font-semibold tracking-wider hover:bg-cta-hover transition-all duration-300 flex items-center justify-center gap-2 border border-gold/15 cursor-pointer shadow-md hover:shadow-lg"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
