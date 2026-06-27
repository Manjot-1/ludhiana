import { create } from 'zustand';
import { CrystalProduct, CartItem } from '../types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addToCart: (product: CrystalProduct, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: (open?: boolean) => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  isOpen: false,
  addToCart: (product, quantity = 1) =>
    set((state) => {
      const existingIndex = state.items.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const newItems = [...state.items];
        newItems[existingIndex].quantity += quantity;
        return { items: newItems, isOpen: true };
      }
      return { items: [...state.items, { product, quantity }], isOpen: true };
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      items: state.items.filter((item) => item.product.id !== productId),
    })),
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      items: state.items
        .map((item) =>
          item.product.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
        )
        .filter((item) => item.quantity > 0),
    })),
  clearCart: () => set({ items: [] }),
  toggleCart: (open) => set((state) => ({ isOpen: open !== undefined ? open : !state.isOpen })),
}));
