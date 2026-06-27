import React, { useState, useEffect } from 'react';
import SectionLabel from '../ui/SectionLabel';
import GoldDivider from '../ui/GoldDivider';
import { db } from '../../lib/db';
import { CrystalProduct } from '../../types';
import { useCartStore } from '../../stores/cartStore';
import { ShoppingCart, Heart, SlidersHorizontal, Gem, Grid, List, CheckCircle2, ChevronRight, Search, X, Sparkles } from 'lucide-react';

const ZODIAC_SYMBOLS: Record<string, string> = {
  all: '🌌',
  Aries: '♈',
  Taurus: '♉',
  Gemini: '♊',
  Cancer: '♋',
  Leo: '♌',
  Virgo: '♍',
  Libra: '♎',
  Scorpio: '♏',
  Sagittarius: '♐',
  Capricorn: '♑',
  Aquarius: '♒',
  Pisces: '♓'
};

const zodiacs = ['all', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

interface StoreHomeProps {
  setPath: (path: string) => void;
}

export default function StoreHome({ setPath }: StoreHomeProps) {
  const { addToCart } = useCartStore();
  const [products, setProducts] = useState<CrystalProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<CrystalProduct[]>([]);
  
  // Filter States
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedChakra, setSelectedChakra] = useState('all');
  const [selectedZodiac, setSelectedZodiac] = useState('all');
  const [maxPrice, setMaxPrice] = useState(2500);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Wishlist state saved locally
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    // Read from localStorage-backed mock DB
    const list = db.getProducts();
    setProducts(list);
    setFilteredProducts(list);

    // Read wishlist
    const storedWish = localStorage.getItem('lto_wishlist');
    if (storedWish) {
      setWishlist(JSON.parse(storedWish));
    }
  }, []);

  // Filter application trigger
  useEffect(() => {
    let result = products;

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (selectedChakra !== 'all') {
      result = result.filter(p => p.chakra.toLowerCase() === selectedChakra.toLowerCase() || p.chakra === 'All');
    }

    if (selectedZodiac !== 'all') {
      result = result.filter(p => p.zodiac && p.zodiac.some(z => z.toLowerCase() === selectedZodiac.toLowerCase() || z.toLowerCase() === 'all'));
    }

    if (maxPrice) {
      result = result.filter(p => p.price <= maxPrice);
    }

    if (onlyInStock) {
      result = result.filter(p => p.stock > 0);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        (p.name || '').toLowerCase().includes(query) || 
        (p.description || '').toLowerCase().includes(query) ||
        (p.benefits || '').toLowerCase().includes(query) ||
        (p.chakra || '').toLowerCase().includes(query) ||
        (p.zodiac && p.zodiac.some(z => z.toLowerCase().includes(query)))
      );
    }

    setFilteredProducts(result);
  }, [selectedCategory, selectedChakra, selectedZodiac, maxPrice, onlyInStock, searchQuery, products]);

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    let updated;
    if (wishlist.includes(id)) {
      updated = wishlist.filter(item => item !== id);
    } else {
      updated = [...wishlist, id];
    }
    setWishlist(updated);
    localStorage.setItem('lto_wishlist', JSON.stringify(updated));
  };

  const categories = ['all', 'crystals', 'jewelry', 'kits', 'tools'];
  const chakras = ['all', 'Root', 'Sacral', 'Solar Plexus', 'Heart', 'Throat', 'Third Eye', 'Crown'];

  return (
    <section className="py-24 px-4 md:px-8 bg-bg-primary min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Store Title */}
        <SectionLabel label="Sacred Alchemy Apothecary" />
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-center text-text-heading mt-1">
          High-Vibration Blessed Crystals
        </h1>
        <p className="font-sans text-xs sm:text-sm text-text-muted text-center max-w-lg mx-auto mt-2">
          Each treasure is handpicked, moon-bathed, cleansed with white sage, and packed with love. Shipped safely across India.
        </p>

        <GoldDivider />

        {/* Search bar and Filters drawer toggle */}
        <div className="flex flex-col gap-4 mb-8 bg-bg-secondary/40 p-5 rounded-2xl border border-gold/15 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gold">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search by crystal name, zodiac sign, chakra, or healing properties (e.g., love, anxiety, protection)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3 rounded-xl bg-white text-xs border border-gold/10 text-text-heading placeholder-text-muted/60 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-gold transition-colors cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <div className="flex items-center justify-between lg:justify-end gap-4 text-xs shrink-0">
              <div className="flex items-center space-x-2.5 bg-white px-4 py-2.5 rounded-xl border border-gold/10 text-text-muted shadow-sm">
                <SlidersHorizontal className="w-4 h-4 text-gold" />
                <span>Found <strong className="text-text-heading font-bold">{filteredProducts.length}</strong> Sacred Items</span>
              </div>
            </div>
          </div>

          {/* Quick Filter Healing Intentions */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
            <span className="text-[10px] uppercase tracking-wider font-bold text-text-muted mr-1.5 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              Healing Intentions:
            </span>
            {['Anxiety', 'Love', 'Protection', 'Grounding', 'Clarity', 'Abundance', 'Sleep', 'Chakra'].map((tag) => {
              const isSelected = searchQuery.toLowerCase() === tag.toLowerCase();
              return (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(isSelected ? '' : tag)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-gold text-bg-dark border-gold font-bold shadow-sm'
                      : 'bg-white border-gold/10 text-text-body hover:border-gold/30 hover:text-gold hover:bg-gold/5'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="px-2.5 py-1 text-[10px] font-bold text-rose hover:text-rose-dark uppercase tracking-wider cursor-pointer underline decoration-dotted underline-offset-2 ml-auto"
              >
                Clear Search
              </button>
            )}
          </div>
        </div>

        {/* Main Workspace: Sidebar Filters on left + Grid on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Filters Column */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gold/15">
              <h3 className="font-display font-bold text-text-heading text-lg mb-4 flex items-center gap-2 pb-2 border-b border-gold/5">
                <SlidersHorizontal className="w-4.5 h-4.5 text-gold" /> Filter Blessings
              </h3>

              {/* Categories Filter */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-text-body uppercase tracking-wider mb-2">
                  Category
                </label>
                <div className="flex flex-wrap gap-1.5 lg:flex-col lg:items-start">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-colors text-left uppercase cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-gold/15 text-gold font-bold'
                          : 'text-text-body hover:text-gold'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chakra Filter */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-text-body uppercase tracking-wider mb-2">
                  Chakra Energetics
                </label>
                <div className="flex flex-wrap gap-1.5 lg:flex-col lg:items-start">
                  {chakras.map((chk) => (
                    <button
                      key={chk}
                      onClick={() => setSelectedChakra(chk)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-colors text-left cursor-pointer ${
                        selectedChakra === chk
                          ? 'bg-crystal/15 text-crystal font-bold border border-crystal/10'
                          : 'text-text-body hover:text-crystal'
                      }`}
                    >
                      {chk === 'all' ? 'ALL CHAKRAS' : `${chk} Chakra`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Zodiac Filter */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-text-body uppercase tracking-wider mb-2">
                  Shop by Zodiac
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {zodiacs.map((zod) => (
                    <button
                      key={zod}
                      onClick={() => setSelectedZodiac(zod)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all text-left flex items-center gap-1.5 cursor-pointer border ${
                        selectedZodiac === zod
                          ? 'bg-gold/10 border-gold/30 text-gold font-bold shadow-sm'
                          : 'bg-transparent border-transparent text-text-body hover:border-gold/10 hover:text-gold'
                      }`}
                    >
                      <span className="text-sm shrink-0">{ZODIAC_SYMBOLS[zod]}</span>
                      <span className="truncate">{zod === 'all' ? 'All Signs' : zod}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <div className="flex justify-between text-xs font-bold text-text-body uppercase tracking-wider mb-2">
                  <span>Price Range</span>
                  <span className="text-gold">Up to ₹{maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2500"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-gold h-1.5 bg-gold/10 rounded-lg cursor-pointer"
                />
              </div>

              {/* Stock Filter Toggle */}
              <div className="flex items-center space-x-2 pt-2 border-t border-gold/5">
                <input
                  type="checkbox"
                  id="stockToggle"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="accent-gold cursor-pointer"
                />
                <label htmlFor="stockToggle" className="text-xs text-text-body select-none cursor-pointer">
                  In Stock Only
                </label>
              </div>

            </div>
          </div>

          {/* Grid Products Column */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="h-96 border border-dashed border-gold/15 rounded-3xl flex flex-col items-center justify-center text-center p-8 bg-white/50">
                <Gem className="w-12 h-12 text-gold/30 mb-2 animate-bounce" />
                <p className="font-display font-semibold text-text-heading text-lg">No matching crystal found</p>
                <p className="text-xs text-text-muted max-w-xs mt-1">Try resetting your filters or adjusting your price parameters to reveal other blessed treasures.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedChakra('all');
                    setSelectedZodiac('all');
                    setMaxPrice(2500);
                    setOnlyInStock(false);
                    setSearchQuery('');
                  }}
                  className="mt-4 px-5 py-2 rounded-full border border-gold/25 text-gold text-xs font-bold tracking-wider"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const isWished = wishlist.includes(product.id);
                  const isOutOfStock = product.stock <= 0;

                  return (
                    <div
                      key={product.id}
                      onClick={() => {
                        setPath(`#store/product/${product.id}`);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="bg-white rounded-2xl border border-gold/15 overflow-hidden group flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-gold/30 hover:-translate-y-1 hover:scale-[1.02] cursor-pointer"
                    >
                      {/* Product Media block */}
                      <div className="relative aspect-square overflow-hidden bg-bg-secondary/10">
                        <img
                          src={product.image}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        
                        {/* Category & Out-Of-Stock pills */}
                        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                          <span className="px-2.5 py-0.5 text-[9px] font-bold tracking-widest uppercase bg-bg-dark text-white rounded-full shadow-sm">
                            {product.category}
                          </span>
                          {isOutOfStock && (
                            <span className="px-2.5 py-0.5 text-[9px] font-bold tracking-widest uppercase bg-rose text-white rounded-full shadow-sm">
                              Out of stock
                            </span>
                          )}
                        </div>

                        {/* Wishlist toggle */}
                        <button
                          onClick={(e) => toggleWishlist(product.id, e)}
                          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors shadow-sm cursor-pointer ${
                            isWished ? 'bg-rose text-white' : 'bg-white/70 text-text-muted hover:text-rose hover:bg-white'
                          }`}
                          aria-label="Add to wishlist"
                        >
                          <Heart className="w-3.5 h-3.5 fill-current" />
                        </button>
                      </div>

                      {/* Product Info details */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-display font-bold text-text-heading text-lg leading-tight hover:text-gold transition-colors line-clamp-1">
                            {product.name}
                          </h3>

                          {/* Chakra & Zodiac Energetic details */}
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5">
                            <div className="flex items-center space-x-1 text-[10px] text-crystal font-medium uppercase tracking-wider">
                              <Gem className="w-3.5 h-3.5 shrink-0" />
                              <span>{product.chakra} Chakra</span>
                            </div>
                            
                            {product.zodiac && product.zodiac.length > 0 && (
                              <div className="flex items-center space-x-1 text-[10px] text-amber-600 font-semibold uppercase tracking-wider font-mono">
                                <span className="text-xs">{product.zodiac.includes('All') ? '🌌' : ZODIAC_SYMBOLS[product.zodiac[0]] || '✨'}</span>
                                <span className="truncate max-w-[100px]">
                                  {product.zodiac.join(', ')}
                                </span>
                              </div>
                            )}
                          </div>

                          <p className="font-sans text-[11px] text-text-body mt-2.5 leading-relaxed line-clamp-2">
                            {product.benefits}
                          </p>
                        </div>

                        {/* Pricing & Add block */}
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
                            type="button"
                            disabled={isOutOfStock}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!isOutOfStock) addToCart(product);
                            }}
                            className={`p-2 rounded-full border transition-all duration-300 ${
                              isOutOfStock
                                ? 'border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed'
                                : 'border-gold/30 text-text-heading hover:border-gold hover:bg-gold hover:text-bg-dark cursor-pointer shadow-sm'
                            }`}
                            aria-label="Add to cart"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
