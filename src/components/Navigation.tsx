import { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Search, Menu, Heart, X, ArrowRight, Trash2 } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { products } from '@/data/products';
import type { Product } from '@/types';

const navLinks = [
  { name: 'Shop', href: '#products' },
  { name: 'New Arrivals', href: '#new-arrivals' },
  { name: 'Categories', href: '#categories' },
  { name: 'About', href: '#about' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');

  const { toggleCart, getTotalItems, addItem } = useCartStore();
  const { items: wishlistItems, removeItem: removeFromWishlist } = useWishlistStore();
  const cartCount = getTotalItems();
  const wishlistCount = wishlistItems.length;
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const searchResults = searchQuery.trim().length > 0
    ? products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6)
    : [];

  const handleOpenProduct = (product: Product) => {
    setSelectedProduct(product);
    setSelectedSize(product.sizes[0] || '');
    setSelectedColor(product.colors[0] || '');
    setIsModalOpen(true);
    setIsWishlistOpen(false);
    setIsSearchOpen(false);
  };

  const handleAddToCartFromModal = () => {
    if (!selectedProduct || !selectedSize) return;
    addItem(selectedProduct, selectedSize, selectedColor);
    setIsModalOpen(false);
    toggleCart();
  };

  const handleAddWishlistToCart = (item: typeof wishlistItems[0]) => {
    const product = products.find(p => p.id === item.id);
    if (product) {
      addItem(product, product.sizes[0], product.colors[0]);
      removeFromWishlist(item.id);
      setIsWishlistOpen(false);
      toggleCart();
    }
  };

  const handleSearchSubmit = () => {
    if (searchResults.length > 0) {
      scrollToSection('#products');
      const event = new CustomEvent('kimiSearch', { detail: searchQuery });
      window.dispatchEvent(event);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
      >
        <div
          className={`transition-all duration-500 ${
            isScrolled
              ? 'bg-[#1a1a1a]/90 backdrop-blur-xl border-b border-white/10'
              : 'bg-transparent'
          }`}
        >
          <div className="section-padding">
            <div className="flex items-center justify-between h-20">
              <a
                href="#"
                className="font-display text-2xl font-bold text-white tracking-tight hover:tracking-wide transition-all duration-300 px-1"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Kay-fits
              </a>

              <div className="hidden md:flex items-center gap-10">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm font-medium text-white/80 hover:text-white animated-underline py-2 transition-colors duration-300"
                  >
                    {link.name}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-white/80 hover:text-white transition-colors duration-300"
                  aria-label="Open search"
                >
                  <Search className="w-5 h-5" />
                </button>

                <button 
                  onClick={() => setIsWishlistOpen(true)}
                  className="relative p-2 text-white/80 hover:text-[#ff6b35] transition-colors duration-300"
                  aria-label={`Wishlist${wishlistCount > 0 ? `, ${wishlistCount} items` : ''}`}
                >
                  <Heart className="w-5 h-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#ff6b35] rounded-full text-[10px] font-bold flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={toggleCart}
                  className="relative p-2 text-white/80 hover:text-white transition-colors duration-300 group"
                  aria-label={`Cart${cartCount > 0 ? `, ${cartCount} items` : ''}`}
                >
                  <ShoppingBag className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#ff6b35] rounded-full text-xs font-bold flex items-center justify-center animate-in zoom-in duration-300">
                      {cartCount}
                    </span>
                  )}
                </button>

                <Sheet>
                  <SheetTrigger asChild>
                    <button className="md:hidden p-2 text-white/80 hover:text-white transition-colors duration-300 ml-1">
                      <Menu className="w-6 h-6" />
                    </button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[85%] max-w-[320px] bg-[#1a1a1a] border-l border-white/10 p-0 [&>button]:text-white">
                    <div className="flex flex-col h-full pt-16">
                      <div className="flex-1 overflow-y-auto px-6">
                        <div className="space-y-2">
                          {navLinks.map((link, index) => (
                            <button
                              key={link.name}
                              onClick={() => scrollToSection(link.href)}
                              className="w-full flex items-center justify-between p-4 rounded-xl text-white/80 hover:text-white hover:bg-white/5 text-left transition-all duration-200 group"
                              style={{ animationDelay: `${index * 50}ms` }}
                            >
                              <span className="text-lg font-medium">{link.name}</span>
                              <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-[#ff6b35] group-hover:translate-x-1 transition-all duration-200" />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="p-6 border-t border-white/10">
                        <div className="flex items-center gap-4 text-white/40 text-sm">
                          <span>Need help?</span>
                           <a href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '2347025451230'}`} target="_blank" rel="noopener noreferrer" className="text-[#ff6b35] hover:underline">
                            Contact Us
                          </a>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Dialog */}
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="bg-[#1a1a1a] border-white/10 p-0 max-w-lg w-[95%] max-h-[80vh] overflow-hidden [&+div]:bg-black/50">
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3">
              <Search className="w-5 h-5 text-white/40 flex-shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                className="flex-1 bg-transparent text-white placeholder:text-white/30 focus:outline-none"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-white/40 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
          
          <div className="overflow-y-auto max-h-[60vh]">
            {searchQuery.trim().length === 0 ? (
              <div className="p-8 text-center">
                <Search className="w-12 h-12 text-white/20 mx-auto mb-3" />
                <p className="text-white/50">Start typing to search...</p>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-white/50">No products found for "{searchQuery}"</p>
              </div>
            ) : (
              <div className="p-2">
                <p className="text-white/40 text-sm px-3 py-2">{searchResults.length} result{searchResults.length !== 1 ? 's' : ''}</p>
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group"
                    onClick={() => handleOpenProduct(product)}
                  >
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-white/10 flex-shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium text-sm truncate group-hover:text-[#ff6b35] transition-colors">{product.name}</h4>
                      <p className="text-white/50 text-xs">{product.category.replace('-', ' ')}</p>
                      <p className="text-[#ff6b35] text-sm font-semibold">₦{product.price.toLocaleString()}</p>
                    </div>
                    <button className="p-2 bg-[#ff6b35] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ))}
                {searchResults.length > 0 && (
                  <button
                    onClick={handleSearchSubmit}
                    className="w-full flex items-center justify-center gap-2 p-4 text-[#ff6b35] hover:bg-white/5 transition-colors mt-2"
                  >
                    <span>See all results</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Product Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl bg-white border-0 p-0 max-h-[90vh] overflow-y-auto rounded-2xl">
          {selectedProduct && (
            <>
              <div className="relative aspect-[4/3] sm:aspect-square bg-gray-100 overflow-hidden">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
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
                  onClick={handleAddToCartFromModal}
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

      {/* Wishlist Panel */}
      <Dialog open={isWishlistOpen} onOpenChange={setIsWishlistOpen}>
        <DialogContent className="bg-[#1a1a1a] border-white/10 p-0 max-w-lg w-[95%] max-h-[85vh] overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#ff6b35]/10 rounded-xl flex items-center justify-center">
                <Heart className="w-5 h-5 text-[#ff6b35]" />
              </div>
              <div>
                <h2 className="font-display text-lg text-white">My Wishlist</h2>
                <p className="text-white/40 text-sm">{wishlistCount} {wishlistCount === 1 ? 'item' : 'items'}</p>
              </div>
            </div>
          </div>
          
          <div className="overflow-y-auto max-h-[60vh]">
            {wishlistItems.length === 0 ? (
              <div className="p-12 text-center">
                <Heart className="w-16 h-16 text-white/10 mx-auto mb-4" />
                <h3 className="font-display text-lg text-white mb-2">Your wishlist is empty</h3>
                <p className="text-white/40 text-sm mb-6">Save items you love for later</p>
                <button
                  onClick={() => {
                    setIsWishlistOpen(false);
                    scrollToSection('#products');
                  }}
                  className="bg-[#ff6b35] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#e55a2b] transition-colors"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              <div className="p-4 space-y-3">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="flex gap-3 p-3 bg-white/5 rounded-xl">
                    <div 
                      className="w-20 h-20 rounded-xl overflow-hidden bg-[#2a2a2a] flex-shrink-0 cursor-pointer"
                      onClick={() => {
                        const product = products.find(p => p.id === item.id);
                        if (product) handleOpenProduct(product);
                      }}
                    >
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 
                        className="text-white font-medium text-sm truncate cursor-pointer hover:text-[#ff6b35] transition-colors"
                        onClick={() => {
                          const product = products.find(p => p.id === item.id);
                          if (product) handleOpenProduct(product);
                        }}
                      >
                        {item.name}
                      </h4>
                      <p className="text-[#ff6b35] font-semibold text-sm mt-2">₦{item.price.toLocaleString()}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleAddWishlistToCart(item)}
                        className="p-2 bg-[#ff6b35] rounded-lg hover:bg-[#e55a2b] transition-colors"
                      >
                        <ShoppingBag className="w-4 h-4 text-white" />
                      </button>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="p-2 bg-white/5 rounded-lg hover:bg-red-500/20 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-white/40 hover:text-red-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
