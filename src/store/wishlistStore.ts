import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, WishlistItem } from '@/types';

interface WishlistState {
  items: WishlistItem[];
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  toggleItem: (product: Product) => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product) => {
        const items = get().items;
        const exists = items.find(item => item.id === product.id);
        if (!exists) {
          set({
            items: [...items, {
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image
            }]
          });
        }
      },
      
      removeItem: (id) => {
        set({ items: get().items.filter(item => item.id !== id) });
      },
      
      isInWishlist: (id) => {
        return get().items.some(item => item.id === id);
      },
      
      toggleItem: (product) => {
        const isInWishlist = get().isInWishlist(product.id);
        if (isInWishlist) {
          get().removeItem(product.id);
        } else {
          get().addItem(product);
        }
      },
      
      clearWishlist: () => set({ items: [] })
    }),
    {
      name: 'kay-fits-wishlist',
      partialize: (state) => ({ items: state.items })
    }
  )
);
