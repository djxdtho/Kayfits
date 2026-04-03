import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingBag, Heart, Search } from 'lucide-react';
import { products } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import type { Product } from '@/types';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'track-pants', name: 'Track Pants' },
  { id: 'cargo-pants', name: 'Cargo Pants' },
  { id: 'polos', name: 'Polo Shirts' },
  { id: 'jerseys', name: 'Dragon Jerseys' },
  { id: 'hoodies', name: 'Hoodies & Sweats' },
];

export default function AllProducts() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { addItem, setCartOpen } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
        }
      );

      const cards = gridRef.current?.querySelectorAll('.product-card-wrapper');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power2.out',
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredProducts]);

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setSelectedSize(product.sizes[0] || '');
    setSelectedColor(product.colors[0] || '');
    setIsModalOpen(true);
  };

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    
    addItem(selectedProduct, selectedSize, selectedColor);
    toast.success(`${selectedProduct.name} added to cart!`, {
      description: `Size: ${selectedSize}${selectedProduct.colors.length > 1 ? `, Color: ${selectedColor}` : ''}`,
    });
    setIsModalOpen(false);
    setCartOpen(true);
  };

  const handleQuickAdd = (product: Product) => {
    const size = product.sizes[0];
    const color = product.colors[0];
    addItem(product, size, color);
    toast.success(`${product.name} added to cart!`, {
      description: `Size: ${size}${product.colors.length > 1 ? `, Color: ${color}` : ''}`,
    });
    setCartOpen(true);
  };

  const handleWishlistToggle = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const wasInWishlist = isInWishlist(product.id);
    toggleItem(product);
    toast.success(wasInWishlist ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <section
      ref={sectionRef}
      id="all-products"
      className="py-24 lg:py-32 bg-[#1a1a1a]"
    >
      <div className="section-padding">
        {/* Header */}
        <div ref={titleRef} className="mb-12">
          <span className="text-sm font-accent uppercase tracking-widest text-[#ff6b35] mb-4 block">
            Full Collection
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8">
            All Products
          </h2>

          {/* Search and Filter */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#ff6b35] transition-colors duration-300"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    selectedCategory === cat.id
                      ? 'bg-[#ff6b35] text-white'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-card-wrapper"
            >
              <div 
                className="bg-white/5 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-500 group cursor-pointer"
                onClick={() => openProductModal(product)}
              >
                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[#2a2a2a]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 loaded"
                    loading="lazy"
                    decoding="async"
                  />
                  
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isNew && (
                      <span className="px-3 py-1 bg-[#ff6b35] text-white text-xs font-bold rounded-full">
                        NEW
                      </span>
                    )}
                    {product.isBestseller && (
                      <span className="px-3 py-1 bg-[#1a1a1a] text-white text-xs font-bold rounded-full">
                        BESTSELLER
                      </span>
                    )}
                  </div>

                  {/* Wishlist button */}
                  <button 
                    onClick={(e) => handleWishlistToggle(product, e)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-white hover:scale-110"
                  >
                    <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-[#1a1a1a]'}`} />
                  </button>

                  {/* Quick add button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuickAdd(product);
                    }}
                    className="absolute bottom-4 left-4 right-4 py-3 bg-white/90 backdrop-blur text-[#1a1a1a] font-semibold rounded-xl flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#ff6b35] hover:text-white"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Quick Add
                  </button>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-white mb-2 line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-[#ff6b35]">
                      ₦{product.price.toLocaleString()}
                    </span>
                    <span className="text-white/50 text-sm">
                      {product.sizes.length} sizes
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-white/50 text-lg mb-4">No products found</div>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="text-[#ff6b35] hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Product Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl bg-white border-0 p-0 max-h-[90vh] overflow-y-auto rounded-2xl">
          {selectedProduct && (
            <>
              <div className="relative aspect-[4/3] sm:aspect-square bg-[#2a2a2a] overflow-hidden">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {selectedProduct.isNew && (
                    <span className="px-3 py-1.5 bg-[#ff6b35] text-white text-xs font-bold rounded-full shadow-lg">
                      NEW
                    </span>
                  )}
                  {selectedProduct.isBestseller && (
                    <span className="px-3 py-1.5 bg-white/90 text-[#1a1a1a] text-xs font-bold rounded-full shadow">
                      BESTSELLER
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#ff6b35] mb-2 block">
                  {selectedProduct.category.replace('-', ' ')}
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-3">
                  {selectedProduct.name}
                </h2>
                <p className="text-gray-500 mb-5 leading-relaxed">{selectedProduct.description}</p>

                <div className="text-3xl font-bold text-[#ff6b35] mb-6">
                  ₦{selectedProduct.price.toLocaleString()}
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="text-sm font-semibold text-[#1a1a1a] mb-3 block">
                      Size <span className="text-[#ff6b35]">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-12 h-12 rounded-xl font-semibold transition-all duration-200 ${
                            selectedSize === size
                              ? 'bg-[#ff6b35] text-white shadow-lg shadow-[#ff6b35]/30'
                              : 'bg-gray-100 text-[#1a1a1a] hover:bg-gray-200 hover:shadow'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {selectedProduct.colors.length > 1 && (
                    <div>
                      <label className="text-sm font-semibold text-[#1a1a1a] mb-3 block">
                        Color
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.colors.map((color) => (
                          <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                              selectedColor === color
                                ? 'bg-[#ff6b35] text-white shadow-lg shadow-[#ff6b35]/30'
                                : 'bg-gray-100 text-[#1a1a1a] hover:bg-gray-200 hover:shadow'
                            }`}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full mt-8 bg-[#ff6b35] text-white py-4 rounded-xl font-semibold hover:bg-[#e55a2b] transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#ff6b35]/30 hover:shadow-xl hover:shadow-[#ff6b35]/40 hover:-translate-y-0.5"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
