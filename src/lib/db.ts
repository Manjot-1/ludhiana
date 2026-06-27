import { Booking, CrystalOrder, CrystalProduct, Testimonial, BlogPost } from '../types';
import { SERVICES, CRYSTAL_PRODUCTS, INITIAL_TESTIMONIALS, INITIAL_BLOGS } from '../data';

// Key names
const KEYS = {
  BOOKINGS: 'lto_bookings',
  ORDERS: 'lto_orders',
  PRODUCTS: 'lto_products',
  TESTIMONIALS: 'lto_testimonials',
  BLOGS: 'lto_blogs',
  ADMIN_LOGGED_IN: 'lto_admin_logged_in'
};

export const db = {
  // Initialize default data if not present
  init() {
    if (!localStorage.getItem(KEYS.PRODUCTS)) {
      localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(CRYSTAL_PRODUCTS));
    }
    if (!localStorage.getItem(KEYS.TESTIMONIALS)) {
      localStorage.setItem(KEYS.TESTIMONIALS, JSON.stringify(INITIAL_TESTIMONIALS));
    }
    if (!localStorage.getItem(KEYS.BLOGS)) {
      localStorage.setItem(KEYS.BLOGS, JSON.stringify(INITIAL_BLOGS));
    }
    if (!localStorage.getItem(KEYS.BOOKINGS)) {
      localStorage.setItem(KEYS.BOOKINGS, JSON.stringify([]));
    }
    if (!localStorage.getItem(KEYS.ORDERS)) {
      localStorage.setItem(KEYS.ORDERS, JSON.stringify([]));
    }
  },

  // Bookings
  getBookings(): Booking[] {
    this.init();
    const data = localStorage.getItem(KEYS.BOOKINGS);
    return data ? JSON.parse(data) : [];
  },

  saveBooking(booking: Booking) {
    const list = this.getBookings();
    list.unshift(booking);
    localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(list));
    return booking;
  },

  updateBookingStatus(id: string, status: Booking['bookingStatus'], adminNotes?: string) {
    const list = this.getBookings();
    const updated = list.map(item => {
      if (item.id === id) {
        return {
          ...item,
          bookingStatus: status,
          ...(adminNotes !== undefined ? { adminNotes } : {})
        };
      }
      return item;
    });
    localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(updated));
    return updated.find(item => item.id === id);
  },

  // Orders
  getOrders(): CrystalOrder[] {
    this.init();
    const data = localStorage.getItem(KEYS.ORDERS);
    return data ? JSON.parse(data) : [];
  },

  saveOrder(order: CrystalOrder) {
    const list = this.getOrders();
    list.unshift(order);
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(list));
    
    // Reduce product stocks
    const products = this.getProducts();
    order.items.forEach(item => {
      const pIndex = products.findIndex(p => p.id === item.productId);
      if (pIndex > -1) {
        products[pIndex].stock = Math.max(0, products[pIndex].stock - item.quantity);
      }
    });
    this.saveProducts(products);

    return order;
  },

  updateOrderStatus(id: string, status: CrystalOrder['orderStatus'], trackingNumber?: string) {
    const list = this.getOrders();
    const updated = list.map(item => {
      if (item.id === id) {
        return {
          ...item,
          orderStatus: status,
          ...(trackingNumber !== undefined ? { trackingNumber } : {})
        };
      }
      return item;
    });
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(updated));
    return updated.find(item => item.id === id);
  },

  // Products
  getProducts(): CrystalProduct[] {
    this.init();
    const data = localStorage.getItem(KEYS.PRODUCTS);
    return data ? JSON.parse(data) : [];
  },

  saveProducts(products: CrystalProduct[]) {
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
  },

  saveProduct(product: CrystalProduct) {
    const list = this.getProducts();
    const index = list.findIndex(p => p.id === product.id);
    if (index > -1) {
      list[index] = product;
    } else {
      list.push(product);
    }
    this.saveProducts(list);
    return product;
  },

  deleteProduct(id: string) {
    const list = this.getProducts();
    const filtered = list.filter(p => p.id !== id);
    this.saveProducts(filtered);
  },

  // Testimonials
  getTestimonials(): Testimonial[] {
    this.init();
    const data = localStorage.getItem(KEYS.TESTIMONIALS);
    return data ? JSON.parse(data) : [];
  },

  saveTestimonial(testimonial: Testimonial) {
    const list = this.getTestimonials();
    list.unshift(testimonial);
    localStorage.setItem(KEYS.TESTIMONIALS, JSON.stringify(list));
    return testimonial;
  },

  approveTestimonial(id: string, approve: boolean) {
    const list = this.getTestimonials();
    const updated = list.map(item => {
      if (item.id === id) {
        return { ...item, isApproved: approve };
      }
      return item;
    });
    localStorage.setItem(KEYS.TESTIMONIALS, JSON.stringify(updated));
  },

  // Blogs
  getBlogs(): BlogPost[] {
    this.init();
    const data = localStorage.getItem(KEYS.BLOGS);
    return data ? JSON.parse(data) : [];
  },

  saveBlog(blog: BlogPost) {
    const list = this.getBlogs();
    const index = list.findIndex(b => b.id === blog.id || b.slug === blog.slug);
    if (index > -1) {
      list[index] = blog;
    } else {
      list.unshift(blog);
    }
    localStorage.setItem(KEYS.BLOGS, JSON.stringify(list));
    return blog;
  },

  deleteBlog(id: string) {
    const list = this.getBlogs();
    const filtered = list.filter(b => b.id !== id);
    localStorage.setItem(KEYS.BLOGS, JSON.stringify(filtered));
  },

  // Admin login status
  isAdminLoggedIn(): boolean {
    return localStorage.getItem(KEYS.ADMIN_LOGGED_IN) === 'true';
  },

  setAdminLoggedIn(loggedIn: boolean) {
    localStorage.setItem(KEYS.ADMIN_LOGGED_IN, loggedIn ? 'true' : 'false');
  }
};
