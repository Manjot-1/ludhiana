import React from 'react';
import SectionLabel from '../ui/SectionLabel';
import GoldDivider from '../ui/GoldDivider';
import { CRYSTAL_PRODUCTS } from '../../data';
import { useCartStore } from '../../stores/cartStore';
import { Eye, ShoppingCart, Gem } from 'lucide-react';

interface CrystalStorePreviewProps {
  setPath: (path: string) => void;
}

export default function CrystalStorePreview({ setPath }: CrystalStorePreviewProps) {
  const { addToCart } = useCartStore();

  // Get first 4 products for preview
  const featuredProducts = CRYSTAL_PRODUCTS.slice(0, 4);

  const handleProductClick = (id: string) => {
    setPath(`#store/product/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="store-preview" className="py-20 px-4 md:px-8 bg-bg-secondary/30 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        
        <SectionLabel label="Sacred Crystal Treasures" />
        <h2 className="font-display text-3xl sm:text-5xl font-bold text-center text-text-heading mt-2">
          Blessings & Crystals Charged for You
        </h2>
        <p className="font-sans text-center text-text-muted text-sm sm:text-base max-w-xl mx-auto mt-3">
          Every crystal cluster, bracelet, and tool is cleansed under the full moon and infused with intentions of peace, alignment, and shield.
        </p>

        <GoldDivider />

        {/* 4 Featured Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-bg-card rounded-2xl border border-gold/15 overflow-hidden group flex flex-col justify-between transition-all duration-300 hover:shadow-lg"
            >
              {/* Product Image Panel with hover actions */}
              <div className="relative aspect-square overflow-hidden bg-bg-secondary/10">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Category pill */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 text-[9px] font-bold tracking-widest uppercase bg-bg-dark text-white rounded-full">
                    {product.category}
                  </span>
                </div>

                {/* Quick actions hover curtain */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
                  <button
                    onClick={() => handleProductClick(product.id)}
                    className="p-3 rounded-full bg-white text-text-heading hover:bg-gold hover:text-bg-dark transition-colors cursor-pointer shadow"
                    title="View Product"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => addToCart(product)}
                    className="p-3 rounded-full bg-white text-text-heading hover:bg-gold hover:text-bg-dark transition-colors cursor-pointer shadow"
                    title="Add to Cart"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Product Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Name */}
                  <h3
                    onClick={() => handleProductClick(product.id)}
                    className="font-display font-bold text-text-heading text-lg leading-tight hover:text-gold transition-colors cursor-pointer line-clamp-1"
                  >
                    {product.name}
                  </h3>

                  {/* Chakra Indicator */}
                  <div className="flex items-center space-x-1 mt-1 text-[10px] text-gold font-medium uppercase tracking-wider">
                    <Gem className="w-3 h-3 shrink-0" />
                    <span>{product.chakra} Chakra</span>
                  </div>

                  {/* Benefits snapshot */}
                  <p className="font-sans text-[11px] text-text-body mt-2 leading-relaxed line-clamp-2">
                    {product.benefits}
                  </p>
                </div>

                {/* Price and Add button */}
                <div className="mt-4 pt-3 border-t border-gold/10 flex items-center justify-between">
                  <div className="flex items-baseline space-x-1.5">
                    <span className="font-display font-bold text-text-heading text-lg">
                      ₹{product.price}
                    </span>
                    <span className="text-xs text-text-muted line-through">
                      ₹{product.originalPrice}
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    className="p-2 rounded-full border border-gold/30 hover:border-gold hover:bg-gold hover:text-bg-dark transition-all duration-300 text-text-heading cursor-pointer"
                    aria-label="Add to Cart"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Explore Store Button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => {
              setPath('#store');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-8 py-3.5 rounded-full bg-text-heading text-bg-primary text-sm font-semibold tracking-wider hover:bg-cta-hover hover:scale-102 transition-all duration-300 border border-gold/15 cursor-pointer shadow"
          >
            Browse Full Sacred Collection →
          </button>
        </div>

      </div>
    </section>
  );
}
