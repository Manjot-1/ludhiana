export interface Service {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  deliveryType: 'async' | 'live';
  delivery: string;
  price: number;
  duration: number | null;
  icon: string;
  benefits: string[];
  idealFor: string[];
  badge: string | null;
}

export interface CrystalProduct {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  category: string;
  chakra: string;
  zodiac: string[];
  benefits: string;
  description: string;
  stock: number;
  image?: string;
}

export interface CartItem {
  product: CrystalProduct;
  quantity: number;
}

export interface Booking {
  id: string;
  bookingRef: string;
  serviceId: string;
  serviceName: string;
  deliveryType: 'async' | 'live';
  scheduledDate?: string;
  scheduledTime?: string;
  clientName: string;
  clientWhatsapp: string;
  clientEmail: string;
  clientDob?: string;
  clientQuestion: string;
  heardFrom: string;
  amount: number;
  paymentStatus: 'unpaid' | 'paid' | 'refunded';
  bookingStatus: 'new' | 'confirmed' | 'delivered' | 'completed' | 'cancelled';
  adminNotes?: string;
  createdAt: string;
}

export interface CrystalOrder {
  id: string;
  orderRef: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  shippingAddress: string;
  shippingCity: string;
  shippingPincode: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  subtotal: number;
  shippingFee: number;
  total: number;
  paymentStatus: 'unpaid' | 'paid';
  orderStatus: 'processing' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber?: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientCity: string;
  serviceType: string;
  rating: number;
  quote: string;
  isApproved: boolean;
  isFeatured: boolean;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'tarot' | 'crystals' | 'astrology' | 'healing' | 'ludhiana';
  coverImage: string;
  isPublished: boolean;
  publishedAt: string;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
}
