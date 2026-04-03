export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
}

export interface CartItem {
  cartId: string; // Unique ID for cart item (productId + size + color)
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
}

export interface Testimonial {
  id: number;
  name: string;
  handle: string;
  avatar: string;
  quote: string;
  rating: number;
}

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
}
