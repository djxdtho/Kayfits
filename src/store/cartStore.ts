import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, CartItem } from '@/types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, size: string, color: string) => void;
  removeItem: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      addItem: (product, size, color) => {
        const cartId = `${product.id}-${size}-${color}`;
        const items = get().items;
        const existingItem = items.find(item => item.cartId === cartId);
        
        if (existingItem) {
          set({
            items: items.map(item =>
              item.cartId === cartId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          });
        } else {
          set({
            items: [...items, {
              cartId,
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              quantity: 1,
              selectedSize: size,
              selectedColor: color
            }]
          });
        }
      },
      
      removeItem: (cartId) => {
        set({ items: get().items.filter(item => item.cartId !== cartId) });
      },
      
      updateQuantity: (cartId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(cartId);
          return;
        }
        set({
          items: get().items.map(item =>
            item.cartId === cartId ? { ...item, quantity } : item
          )
        });
      },
      
      clearCart: () => set({ items: [] }),
      
      toggleCart: () => set(state => ({ isOpen: !state.isOpen })),
      
      setCartOpen: (open) => set({ isOpen: open }),
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      }
    }),
    {
      name: 'kay-fits-cart',
      partialize: (state) => ({ items: state.items })
    }
  )
);
