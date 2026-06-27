import React, { useState, useEffect } from 'react';
import { db } from '../../lib/db';
import { CrystalProduct } from '../../types';
import { useCartStore } from '../../stores/cartStore';
import { ArrowLeft, ShoppingCart, Gem, ShieldAlert, BadgeInfo, Sparkles, CheckCircle2 } from 'lucide-react';

interface ProductDetailProps {
  productId: string;
  setPath: (path: string) => void;
}

export default function ProductDetail({ productId, setPath }: ProductDetailProps) {
  const { addToCart } = useCartStore();
  const [product, setProduct] = useState<CrystalProduct | null>(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const list = db.getProducts();
    const found = list.find(p => p.id === productId);
    if (found) {
      setProduct(found);
    }
  }, [productId]);

  if (!product) {
    return (
      <div className="py-32 text-center">
        <p className="text-text-muted text-xs">Blessed crystal treasure not found.</p>
        <button
          onClick={() => setPath('#store')}
          className="mt-4 px-6 py-2 rounded-full bg-text-heading text-bg-primary text-xs font-semibold"
        >
          Return to Store
        </button>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    addToCart(product, qty);
  };

  return (
    <section className="py-24 px-4 md:px-8 bg-bg-primary min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        {/* Back Link */}
        <button
          onClick={() => setPath('#store')}
          className="mb-8 font-sans text-xs font-bold text-text-muted hover:text-gold flex items-center gap-1.5 cursor-pointer bg-transparent border-0"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Apothecary
        </button>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-3xl border border-gold/15 p-6 sm:p-12 shadow-xl">
          
          {/* Column 1: Media Panel */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-bg-secondary/10 border border-gold/10">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            
            {/* Category Ribbon */}
            <div className="absolute top-4 left-4">
              <span className="px-3.5 py-1 text-[10px] font-bold uppercase tracking-widest bg-bg-dark text-white rounded-full">
                {product.category}
              </span>
            </div>
          </div>

          {/* Column 2: Specific Parameters */}
          <div className="flex flex-col justify-between">
            <div className="space-y-4">
              
              {/* Chakra energetic details label */}
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-crystal/10 border border-crystal/15 text-[11px] font-bold text-crystal uppercase tracking-wider">
                <Gem className="w-3.5 h-3.5" />
                <span>{product.chakra} Chakra</span>
              </div>

              {/* Title */}
              <h1 className="font-display text-3xl sm:text-4.5xl font-extrabold text-text-heading leading-tight">
                {product.name}
              </h1>

              {/* Pricing block */}
              <div className="flex items-baseline space-x-3 pt-1">
                <span className="font-display font-extrabold text-text-heading text-3xl">
                  ₹{product.price}
                </span>
                <span className="text-sm text-text-muted line-through font-medium">
                  ₹{product.originalPrice}
                </span>
                <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                  Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
              </div>

              {/* Stock check status */}
              <div className="flex items-center space-x-1.5 text-xs">
                {isOutOfStock ? (
                  <span className="text-rose font-semibold flex items-center gap-1">
                    <ShieldAlert className="w-4 h-4" /> Temporarily out of stock
                  </span>
                ) : (
                  <span className="text-emerald-700 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Only {product.stock} items left in Ludhiana vault
                  </span>
                )}
              </div>

              <hr className="border-gold/10" />

              {/* Description body */}
              <div>
                <h4 className="text-xs font-bold uppercase text-text-muted tracking-wider mb-1.5">Altar Overview</h4>
                <p className="text-xs text-text-body leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Healing benefits list */}
              <div className="bg-bg-secondary/30 border border-gold/10 p-4 rounded-xl space-y-1.5">
                <h4 className="text-[11px] font-bold uppercase text-gold tracking-widest flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Healing Intentions:
                </h4>
                <p className="text-[11px] text-text-heading font-medium italic leading-relaxed">
                  "{product.benefits}"
                </p>
              </div>

              {/* Zodiac connection badge */}
              {product.zodiac && product.zodiac.length > 0 && (
                <div className="pt-2">
                  <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider mr-2">Astral Affiliation:</span>
                  <div className="inline-flex flex-wrap gap-1.5">
                    {product.zodiac.map(z => (
                      <span key={z} className="px-2.5 py-0.5 bg-bg-secondary text-[10px] font-semibold text-text-body rounded border border-gold/10 uppercase font-mono">
                        {z}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Shopping trigger */}
            <div className="mt-8 pt-6 border-t border-gold/5 flex flex-col sm:flex-row items-center gap-4">
              {!isOutOfStock && (
                <div className="flex items-center border border-gold/20 rounded-xl bg-bg-secondary/20 w-full sm:w-auto overflow-hidden">
                  <button
                    onClick={() => setQty(prev => Math.max(1, prev - 1))}
                    className="px-4 py-3 text-text-muted hover:text-text-heading font-bold"
                  >
                    -
                  </button>
                  <span className="px-6 py-3 font-semibold text-text-heading text-sm font-mono">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(prev => Math.min(product.stock, prev + 1))}
                    className="px-4 py-3 text-text-muted hover:text-text-heading font-bold"
                  >
                    +
                  </button>
                </div>
              )}

              <button
                disabled={isOutOfStock}
                onClick={handleAddToCart}
                className={`w-full sm:flex-1 py-4 rounded-full font-bold tracking-wider uppercase text-xs flex items-center justify-center gap-2 border cursor-pointer ${
                  isOutOfStock
                    ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                    : 'bg-text-heading border-gold/15 text-bg-primary hover:bg-cta-hover transition-all shadow-md'
                }`}
              >
                <ShoppingCart className="w-4 h-4" /> Add Crystal to Cart
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
