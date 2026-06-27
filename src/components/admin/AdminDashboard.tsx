import React, { useState, useEffect } from 'react';
import { db } from '../../lib/db';
import { Booking, CrystalOrder, CrystalProduct, Testimonial, BlogPost } from '../../types';
import { SERVICES } from '../../data';
import { ShieldCheck, LogIn, LayoutDashboard, Calendar, ShoppingBag, Users, Gem, BookOpen, ExternalLink, Plus, Check, Play, MessageSquare, Trash2, Edit, Star } from 'lucide-react';

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'bookings' | 'orders' | 'reviews' | 'products' | 'blogs'>('dashboard');
  const [loginError, setLoginError] = useState('');

  // Loaded DB lists
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [orders, setOrders] = useState<CrystalOrder[]>([]);
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [products, setProducts] = useState<CrystalProduct[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  // Editing forms state
  const [editingProduct, setEditingProduct] = useState<Partial<CrystalProduct> | null>(null);
  const [editingBlog, setEditingBlog] = useState<Partial<BlogPost> | null>(null);

  // Load lists when logged in
  useEffect(() => {
    setIsLoggedIn(db.isAdminLoggedIn());
    if (db.isAdminLoggedIn()) {
      setBookings(db.getBookings());
      setOrders(db.getOrders());
      setReviews(db.getTestimonials());
      setProducts(db.getProducts());
      setBlogs(db.getBlogs());
    }
  }, [isLoggedIn, activeTab]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'ludhianatarot123') {
      db.setAdminLoggedIn(true);
      setIsLoggedIn(true);
      setPassword('');
      setLoginError('');
    } else {
      setLoginError('Invalid Altar Password. Please try again.');
    }
  };

  const handleLogout = () => {
    db.setAdminLoggedIn(false);
    setIsLoggedIn(false);
  };

  // Status updates
  const handleUpdateBookingStatus = (id: string, status: Booking['bookingStatus']) => {
    db.updateBookingStatus(id, status);
    setBookings(db.getBookings());
  };

  const handleUpdateOrderStatus = (id: string, status: CrystalOrder['orderStatus'], tracking?: string) => {
    db.updateOrderStatus(id, status, tracking);
    setOrders(db.getOrders());
  };

  const handleApproveReview = (id: string, approve: boolean) => {
    db.approveTestimonial(id, approve);
    setReviews(db.getTestimonials());
  };

  // Product actions
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.name || !editingProduct?.id) return;
    
    const prod: CrystalProduct = {
      id: editingProduct.id,
      name: editingProduct.name,
      price: Number(editingProduct.price || 0),
      originalPrice: Number(editingProduct.originalPrice || editingProduct.price || 0),
      category: editingProduct.category || 'crystals',
      chakra: editingProduct.chakra || 'Crown',
      zodiac: editingProduct.zodiac || ['All'],
      benefits: editingProduct.benefits || '',
      description: editingProduct.description || '',
      stock: Number(editingProduct.stock || 0),
      image: editingProduct.image || 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?auto=format&fit=crop&w=600&q=80'
    };

    db.saveProduct(prod);
    setEditingProduct(null);
    setProducts(db.getProducts());
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to delete this crystal item?')) {
      db.deleteProduct(id);
      setProducts(db.getProducts());
    }
  };

  // Blog actions
  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog?.title || !editingBlog?.content) return;

    const slug = editingBlog.slug || editingBlog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const b: BlogPost = {
      id: editingBlog.id || `blog_${Date.now()}`,
      title: editingBlog.title,
      slug,
      excerpt: editingBlog.excerpt || '',
      content: editingBlog.content,
      category: editingBlog.category || 'tarot',
      coverImage: editingBlog.coverImage || 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80',
      isPublished: editingBlog.isPublished !== undefined ? editingBlog.isPublished : true,
      publishedAt: editingBlog.publishedAt || new Date().toISOString(),
      createdAt: editingBlog.createdAt || new Date().toISOString()
    };

    db.saveBlog(b);
    setEditingBlog(null);
    setBlogs(db.getBlogs());
  };

  const handleDeleteBlog = (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      db.deleteBlog(id);
      setBlogs(db.getBlogs());
    }
  };

  // Authentication page UI
  if (!isLoggedIn) {
    return (
      <div className="py-24 min-h-screen bg-bg-dark text-text-light flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm bg-white/5 border border-white/15 p-8 rounded-3xl backdrop-blur-md space-y-6">
          <div className="text-center">
            <div className="w-14 h-14 bg-gold/15 rounded-full flex items-center justify-center mx-auto mb-4 border border-gold/30">
              <ShieldCheck className="w-7 h-7 text-gold animate-pulse" />
            </div>
            <h1 className="font-display text-2xl font-bold text-white">Oracle Altar Panel</h1>
            <p className="text-[10px] uppercase text-gold tracking-widest mt-1">Ludhiana Tarot Admin Area</p>
          </div>

          {loginError && (
            <div className="bg-rose/10 border border-rose/30 text-rose text-xs p-3.5 rounded-xl text-center">
              {loginError}
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-gold tracking-wider uppercase mb-1.5">Altar password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password..."
              className="w-full px-4 py-3 rounded-xl bg-white/5 text-sm focus:outline-none focus:border-gold border border-white/10 text-white"
            />
            <p className="text-[10px] text-text-light/40 mt-1.5 leading-relaxed text-center">
              * Hint: Enter <span className="text-gold font-bold">ludhianatarot123</span> to test this administration panel.
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-gold text-bg-dark font-semibold text-xs tracking-wider uppercase hover:bg-gold-light transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow"
          >
            <LogIn className="w-4 h-4" /> Authenticate Altar
          </button>
        </form>
      </div>
    );
  }

  // Statistics summaries
  const totalRevenue = bookings.reduce((sum, b) => sum + b.amount, 0) + orders.reduce((sum, o) => sum + o.total, 0);
  const pendingReadings = bookings.filter(b => b.bookingStatus === 'new' || b.bookingStatus === 'confirmed').length;
  const pendingShippings = orders.filter(o => o.orderStatus === 'processing' || o.orderStatus === 'confirmed').length;
  const pendingReviews = reviews.filter(r => !r.isApproved).length;

  return (
    <div className="py-24 min-h-screen bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Admin Navigation Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl border border-gold/15">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-gold/15 border border-gold/30 text-gold font-bold font-mono text-xs">
              AD
            </div>
            <div>
              <h1 className="font-display text-xl font-extrabold text-text-heading leading-none">Oracle Command Center</h1>
              <span className="text-[10px] uppercase text-text-muted mt-1 tracking-widest block font-sans">Ludhiana's Tarot Admin Area</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-rose/10 border border-rose/20 text-rose text-xs font-bold hover:bg-rose hover:text-white transition-all cursor-pointer"
          >
            Lock Dashboard
          </button>
        </div>

        {/* Workspace: Tabs Row */}
        <div className="flex flex-wrap gap-2 mb-8 bg-bg-secondary/40 p-1.5 rounded-xl border border-gold/10">
          {[
            { id: 'dashboard', name: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
            { id: 'bookings', name: `Bookings (${pendingReadings})`, icon: <Calendar className="w-4 h-4" /> },
            { id: 'orders', name: `Store Orders (${pendingShippings})`, icon: <ShoppingBag className="w-4 h-4" /> },
            { id: 'reviews', name: `Review Moderation (${pendingReviews})`, icon: <Users className="w-4 h-4" /> },
            { id: 'products', name: 'Altar Crystals', icon: <Gem className="w-4 h-4" /> },
            { id: 'blogs', name: 'Wisdom Logs', icon: <BookOpen className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setEditingProduct(null);
                setEditingBlog(null);
              }}
              className={`px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-text-heading text-white shadow-sm'
                  : 'text-text-body hover:bg-white'
              }`}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border border-gold/15 p-5 rounded-2xl shadow-xs">
                <span className="text-[10px] uppercase text-text-muted tracking-widest font-bold block mb-1">Combined Exchanges</span>
                <span className="font-display text-3xl font-extrabold text-gold">₹{totalRevenue}</span>
              </div>
              <div className="bg-white border border-gold/15 p-5 rounded-2xl shadow-xs">
                <span className="text-[10px] uppercase text-text-muted tracking-widest font-bold block mb-1">Pending Readings</span>
                <span className="font-display text-3xl font-extrabold text-rose">{pendingReadings} sessions</span>
              </div>
              <div className="bg-white border border-gold/15 p-5 rounded-2xl shadow-xs">
                <span className="text-[10px] uppercase text-text-muted tracking-widest font-bold block mb-1">Mailing Tasks</span>
                <span className="font-display text-3xl font-extrabold text-crystal">{pendingShippings} shippings</span>
              </div>
              <div className="bg-white border border-gold/15 p-5 rounded-2xl shadow-xs">
                <span className="text-[10px] uppercase text-text-muted tracking-widest font-bold block mb-1">Awaiting Reviews</span>
                <span className="font-display text-3xl font-extrabold text-text-heading">{pendingReviews} reviews</span>
              </div>
            </div>

            {/* Recent bookings list */}
            <div className="bg-white rounded-3xl border border-gold/15 overflow-hidden shadow-lg p-6 sm:p-8">
              <h2 className="font-display text-lg sm:text-xl font-bold text-text-heading mb-4">Latest Readings Schedule</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gold/10 text-text-muted bg-bg-secondary/30">
                      <th className="py-3 px-4 font-bold uppercase">Ref</th>
                      <th className="py-3 px-4 font-bold uppercase">Customer</th>
                      <th className="py-3 px-4 font-bold uppercase">Service focus</th>
                      <th className="py-3 px-4 font-bold uppercase">Contact</th>
                      <th className="py-3 px-4 font-bold uppercase">Scheduled for</th>
                      <th className="py-3 px-4 font-bold uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gold/5 text-text-body">
                    {bookings.slice(0, 5).map(b => (
                      <tr key={b.id} className="hover:bg-bg-primary/30">
                        <td className="py-3.5 px-4 font-bold font-mono text-text-heading">{b.bookingRef}</td>
                        <td className="py-3.5 px-4 font-semibold">{b.clientName}</td>
                        <td className="py-3.5 px-4 font-medium text-gold">{b.serviceName}</td>
                        <td className="py-3.5 px-4">
                          <a
                            href={`https://wa.me/${b.clientWhatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-700 hover:underline flex items-center gap-1 font-sans"
                          >
                            <MessageSquare className="w-3.5 h-3.5" /> +{b.clientWhatsapp}
                          </a>
                        </td>
                        <td className="py-3.5 px-4 font-sans text-[11px]">
                          {b.deliveryType === 'async' ? (
                            <span className="text-text-muted italic">Within 24-48h (Async)</span>
                          ) : (
                            <span className="font-bold text-text-heading">{b.scheduledDate} at {b.scheduledTime}</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                            b.bookingStatus === 'new' ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {b.bookingStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {bookings.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-8 text-center italic text-text-muted">No client readings scheduled yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BOOKINGS TABLE */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-3xl border border-gold/15 p-6 sm:p-8 shadow-lg space-y-6 animate-fadeIn">
            <h2 className="font-display text-xl font-bold text-text-heading">All Tarot & Healing Bookings</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gold/10 text-text-muted bg-bg-secondary/30">
                    <th className="py-3 px-4 uppercase">Reference</th>
                    <th className="py-3 px-4 uppercase">Customer</th>
                    <th className="py-3 px-4 uppercase">Target Service</th>
                    <th className="py-3 px-4 uppercase">Client Question</th>
                    <th className="py-3 px-4 uppercase">Scheduled parameters</th>
                    <th className="py-3 px-4 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold/5 text-text-body">
                  {bookings.map(b => (
                    <tr key={b.id} className="hover:bg-bg-primary/20">
                      <td className="py-4 px-4 font-bold font-mono text-text-heading">{b.bookingRef}</td>
                      <td className="py-4 px-4 font-semibold">
                        {b.clientName}
                        <span className="block font-sans text-[10px] text-text-muted">+{b.clientWhatsapp}</span>
                      </td>
                      <td className="py-4 px-4 font-medium text-gold">{b.serviceName}</td>
                      <td className="py-4 px-4 max-w-xs truncate italic" title={b.clientQuestion}>
                        "{b.clientQuestion}"
                      </td>
                      <td className="py-4 px-4 font-sans text-[11px]">
                        {b.deliveryType === 'async' ? (
                          <span className="text-text-muted italic">WhatsApp voice note</span>
                        ) : (
                          <span className="font-bold text-text-heading">{b.scheduledDate} at {b.scheduledTime}</span>
                        )}
                      </td>
                      <td className="py-4 px-4 space-x-1.5">
                        {b.bookingStatus === 'new' && (
                          <button
                            onClick={() => handleUpdateBookingStatus(b.id, 'confirmed')}
                            className="px-2.5 py-1 text-[10px] font-bold bg-amber-500 hover:bg-amber-600 text-bg-dark rounded cursor-pointer"
                          >
                            Confirm
                          </button>
                        )}
                        {b.bookingStatus === 'confirmed' && (
                          <button
                            onClick={() => handleUpdateBookingStatus(b.id, 'delivered')}
                            className="px-2.5 py-1 text-[10px] font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded cursor-pointer"
                          >
                            Mark Delivered
                          </button>
                        )}
                        <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
                          b.bookingStatus === 'delivered' ? 'bg-emerald-100 text-emerald-800' : 'text-text-muted'
                        }`}>
                          {b.bookingStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {bookings.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-text-muted italic">No readings found in vault database.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: CRYSTAL ORDERS */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl border border-gold/15 p-6 sm:p-8 shadow-lg space-y-6 animate-fadeIn">
            <h2 className="font-display text-xl font-bold text-text-heading">All Apothecary Orders</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gold/10 text-text-muted bg-bg-secondary/30">
                    <th className="py-3 px-4 uppercase">Ref</th>
                    <th className="py-3 px-4 uppercase">Recipient</th>
                    <th className="py-3 px-4 uppercase">Mailing Address</th>
                    <th className="py-3 px-4 uppercase">Ordered products</th>
                    <th className="py-3 px-4 uppercase">Investment</th>
                    <th className="py-3 px-4 uppercase">Mailing status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold/5 text-text-body">
                  {orders.map(o => (
                    <tr key={o.id} className="hover:bg-bg-primary/20">
                      <td className="py-4 px-4 font-bold font-mono text-text-heading">{o.orderRef}</td>
                      <td className="py-4 px-4 font-semibold">
                        {o.clientName}
                        <span className="block font-sans text-[10px] text-text-muted">+{o.clientPhone}</span>
                      </td>
                      <td className="py-4 px-4 text-text-muted text-[11px] max-w-xs leading-relaxed">
                        {o.shippingAddress}, {o.shippingCity} - {o.shippingPincode}
                      </td>
                      <td className="py-4 px-4">
                        <ul className="space-y-0.5 text-[11px] font-medium text-text-heading">
                          {o.items.map((it, idx) => (
                            <li key={idx}>• {it.productName} (x{it.quantity})</li>
                          ))}
                        </ul>
                      </td>
                      <td className="py-4 px-4 font-bold text-gold">₹{o.total}</td>
                      <td className="py-4 px-4 flex items-center space-x-1.5 mt-2">
                        {o.orderStatus === 'processing' && (
                          <button
                            onClick={() => handleUpdateOrderStatus(o.id, 'shipped', `AWB-${Math.floor(100000 + Math.random() * 900000)}`)}
                            className="px-2.5 py-1 text-[10px] font-bold bg-gold text-bg-dark hover:bg-gold-light rounded cursor-pointer"
                          >
                            Mark Shipped
                          </button>
                        )}
                        <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
                          o.orderStatus === 'shipped' ? 'bg-emerald-100 text-emerald-800' : 'text-text-muted'
                        }`}>
                          {o.orderStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-text-muted italic">No crystal orders registered in the system yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: REVIEW MODERATION */}
        {activeTab === 'reviews' && (
          <div className="bg-white rounded-3xl border border-gold/15 p-6 sm:p-8 shadow-lg space-y-6 animate-fadeIn">
            <h2 className="font-display text-xl font-bold text-text-heading">Moderation queue for client love reviews</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map(r => (
                <div
                  key={r.id}
                  className={`border p-5 rounded-2xl flex flex-col justify-between space-y-4 ${
                    r.isApproved ? 'border-gold/10 bg-bg-secondary/15' : 'border-rose/25 bg-rose/5'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="text-[11px] font-bold text-gold font-sans uppercase">
                        {r.serviceType}
                      </span>
                      <div className="flex items-center space-x-0.5">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-gold text-gold" />
                        ))}
                      </div>
                    </div>

                    <p className="font-display italic text-text-heading text-sm mt-3 leading-relaxed">
                      "{r.quote}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-gold/5 pt-3">
                    <div>
                      <h4 className="font-display font-semibold text-text-heading text-xs sm:text-sm">{r.clientName}</h4>
                      <p className="text-[10px] text-text-muted font-sans">{r.clientCity}</p>
                    </div>

                    <div className="space-x-1.5 flex items-center">
                      {r.isApproved ? (
                        <button
                          onClick={() => handleApproveReview(r.id, false)}
                          className="px-2 py-1 text-[10px] font-medium border border-rose/30 text-rose rounded hover:bg-rose/5"
                        >
                          Disapprove
                        </button>
                      ) : (
                        <button
                          onClick={() => handleApproveReview(r.id, true)}
                          className="px-2.5 py-1 text-[10px] font-bold bg-emerald-600 text-white rounded hover:bg-emerald-500 cursor-pointer"
                        >
                          Approve and show
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: ALTAR CRYSTALS (PRODUCTS LIST & CREATE) */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-3xl border border-gold/15 p-6 sm:p-8 shadow-lg space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-text-heading">Altar Crystals & Apothecary Stock</h2>
              <button
                onClick={() => setEditingProduct({
                  id: `p_${Date.now()}`,
                  name: '',
                  price: 0,
                  originalPrice: 0,
                  stock: 5,
                  category: 'crystals',
                  chakra: 'Crown',
                  benefits: '',
                  description: ''
                })}
                className="px-4 py-2 text-xs font-bold bg-gold text-bg-dark hover:bg-gold-light rounded-full flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Crystal
              </button>
            </div>

            {/* Editing Form Overlay */}
            {editingProduct && (
              <form onSubmit={handleSaveProduct} className="border border-gold/25 rounded-2xl p-6 bg-bg-secondary/20 text-xs text-text-heading space-y-4">
                <h3 className="font-display text-lg font-bold">Add/Edit Crystal product Parameters</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold mb-1">Product ID Code *</label>
                    <input
                      type="text"
                      required
                      value={editingProduct.id || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, id: e.target.value })}
                      className="w-full px-3 py-2 bg-white rounded border border-gold/15"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-semibold mb-1">Product Display Name *</label>
                    <input
                      type="text"
                      required
                      value={editingProduct.name || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                      className="w-full px-3 py-2 bg-white rounded border border-gold/15"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block font-semibold mb-1">Selling Price (INR) *</label>
                    <input
                      type="number"
                      required
                      value={editingProduct.price || 0}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-white rounded border border-gold/15"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Compare-At Price (INR)</label>
                    <input
                      type="number"
                      value={editingProduct.originalPrice || 0}
                      onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-white rounded border border-gold/15"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Stock count *</label>
                    <input
                      type="number"
                      required
                      value={editingProduct.stock || 0}
                      onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-white rounded border border-gold/15"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Category type</label>
                    <select
                      value={editingProduct.category || 'crystals'}
                      onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                      className="w-full px-3 py-2 bg-white rounded border border-gold/15"
                    >
                      <option value="crystals">crystals</option>
                      <option value="jewelry">jewelry</option>
                      <option value="kits">kits</option>
                      <option value="tools">tools</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1">Associated Chakra</label>
                    <input
                      type="text"
                      value={editingProduct.chakra || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, chakra: e.target.value })}
                      placeholder="e.g. Heart"
                      className="w-full px-3 py-2 bg-white rounded border border-gold/15"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Photo Cloudinary URL</label>
                    <input
                      type="text"
                      value={editingProduct.image || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                      className="w-full px-3 py-2 bg-white rounded border border-gold/15"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Intuitive benefits tagline</label>
                  <input
                    type="text"
                    value={editingProduct.benefits || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, benefits: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded border border-gold/15"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Altar description details</label>
                  <textarea
                    value={editingProduct.description || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 bg-white rounded border border-gold/15 resize-none"
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-4 py-2 border border-gold/20 text-text-muted hover:text-text-heading rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gold hover:bg-gold-light text-bg-dark font-semibold rounded"
                  >
                    Save Product
                  </button>
                </div>
              </form>
            )}

            {/* List products Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gold/10 text-text-muted bg-bg-secondary/30">
                    <th className="py-3 px-4 uppercase">Image</th>
                    <th className="py-3 px-4 uppercase">Product Details</th>
                    <th className="py-3 px-4 uppercase">Category</th>
                    <th className="py-3 px-4 uppercase">Pricing parameters</th>
                    <th className="py-3 px-4 uppercase">Stock</th>
                    <th className="py-3 px-4 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold/5 text-text-body">
                  {products.map(p => (
                    <tr key={p.id} className="hover:bg-bg-primary/20">
                      <td className="py-3.5 px-4">
                        <img
                          src={p.image}
                          alt={p.name}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 object-cover rounded-lg border border-gold/10"
                        />
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-text-heading">
                        {p.name}
                        <span className="block text-[10px] text-crystal uppercase font-sans mt-0.5">{p.chakra} Chakra</span>
                      </td>
                      <td className="py-3.5 px-4 font-mono uppercase text-[10px]">{p.category}</td>
                      <td className="py-3.5 px-4 font-bold text-gold">₹{p.price}</td>
                      <td className="py-3.5 px-4 font-bold font-sans">
                        <span className={p.stock === 0 ? 'text-rose' : 'text-text-heading'}>
                          {p.stock} units
                        </span>
                      </td>
                      <td className="py-3.5 px-4 space-x-1 flex items-center mt-3">
                        <button
                          onClick={() => setEditingProduct(p)}
                          className="p-1.5 rounded hover:bg-gold/15 text-gold"
                          title="Edit Product"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-1.5 rounded hover:bg-rose/15 text-rose"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: WISDOM BLOGS */}
        {activeTab === 'blogs' && (
          <div className="bg-white rounded-3xl border border-gold/15 p-6 sm:p-8 shadow-lg space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-text-heading">Altar logs & blogs</h2>
              <button
                onClick={() => setEditingBlog({
                  id: `blog_${Date.now()}`,
                  title: '',
                  excerpt: '',
                  content: '',
                  category: 'tarot',
                  coverImage: '',
                  isPublished: true,
                  publishedAt: new Date().toISOString()
                })}
                className="px-4 py-2 text-xs font-bold bg-gold text-bg-dark hover:bg-gold-light rounded-full flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Write Blog
              </button>
            </div>

            {/* Editing Form Overlay */}
            {editingBlog && (
              <form onSubmit={handleSaveBlog} className="border border-gold/25 rounded-2xl p-6 bg-bg-secondary/20 text-xs text-text-heading space-y-4">
                <h3 className="font-display text-lg font-bold">Write / Edit Altar Journal log</h3>
                
                <div>
                  <label className="block font-semibold mb-1">Journal Entry Title *</label>
                  <input
                    type="text"
                    required
                    value={editingBlog.title || ''}
                    onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded border border-gold/15"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold mb-1">Category area</label>
                    <select
                      value={editingBlog.category || 'tarot'}
                      onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value as any })}
                      className="w-full px-3 py-2 bg-white rounded border border-gold/15 font-bold uppercase"
                    >
                      <option value="tarot">tarot</option>
                      <option value="crystals">crystals</option>
                      <option value="astrology">astrology</option>
                      <option value="healing">healing</option>
                      <option value="ludhiana">ludhiana</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-semibold mb-1">Cover Image Link</label>
                    <input
                      type="text"
                      value={editingBlog.coverImage || ''}
                      onChange={(e) => setEditingBlog({ ...editingBlog, coverImage: e.target.value })}
                      placeholder="HTTPS link"
                      className="w-full px-3 py-2 bg-white rounded border border-gold/15"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Short excerpt *</label>
                  <input
                    type="text"
                    required
                    value={editingBlog.excerpt || ''}
                    onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                    placeholder="Short description to display on card grids..."
                    className="w-full px-3 py-2 bg-white rounded border border-gold/15"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Rich Content (HTML layout support) *</label>
                  <textarea
                    required
                    value={editingBlog.content || ''}
                    onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                    placeholder="Provide detailed content. Supports <p>, <h3>, <li> tags..."
                    rows={8}
                    className="w-full px-3 py-2 bg-white rounded border border-gold/15 resize-none font-mono text-[11px]"
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditingBlog(null)}
                    className="px-4 py-2 border border-gold/20 text-text-muted hover:text-text-heading rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gold hover:bg-gold-light text-bg-dark font-semibold rounded"
                  >
                    Publish Entry
                  </button>
                </div>
              </form>
            )}

            {/* List Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gold/10 text-text-muted bg-bg-secondary/30">
                    <th className="py-3 px-4 uppercase">Image</th>
                    <th className="py-3 px-4 uppercase">Title</th>
                    <th className="py-3 px-4 uppercase">Category</th>
                    <th className="py-3 px-4 uppercase">Slug url</th>
                    <th className="py-3 px-4 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold/5 text-text-body">
                  {blogs.map(b => (
                    <tr key={b.id} className="hover:bg-bg-primary/20">
                      <td className="py-3 px-4">
                        <img
                          src={b.coverImage}
                          alt={b.title}
                          referrerPolicy="no-referrer"
                          className="w-12 h-8 object-cover rounded border border-gold/10"
                        />
                      </td>
                      <td className="py-3 px-4 font-bold text-text-heading">{b.title}</td>
                      <td className="py-3 px-4 font-mono uppercase text-[10px]">{b.category}</td>
                      <td className="py-3 px-4 font-mono text-[10px] text-text-muted">{b.slug}</td>
                      <td className="py-3 px-4 space-x-1">
                        <button
                          onClick={() => setEditingBlog(b)}
                          className="p-1 rounded hover:bg-gold/15 text-gold inline-block"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(b.id)}
                          className="p-1 rounded hover:bg-rose/15 text-rose inline-block"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
