import { useEffect } from 'react';
import { Toaster } from 'sonner';
import Navigation from '@/components/Navigation';
import Cart from '@/components/Cart';
import Hero from '@/sections/Hero';
import FeaturedProducts from '@/sections/FeaturedProducts';
import AllProducts from '@/sections/AllProducts';
import Categories from '@/sections/Categories';
import NewArrivals from '@/sections/NewArrivals';
import Testimonials from '@/sections/Testimonials';
import Newsletter from '@/sections/Newsletter';
import About from '@/sections/About';
import ReturnPolicy from '@/sections/ReturnPolicy';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';

function App() {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a1a] grain-overlay">
      {/* Toast notifications */}
      <Toaster 
        position="top-right" 
        richColors 
        theme="dark"
        toastOptions={{
          style: {
            background: '#2a2a2a',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff',
          },
        }}
      />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Cart Sidebar */}
      <Cart />

      {/* Main Content */}
      <main>
        <Hero />
        <FeaturedProducts />
        <AllProducts />
        <Categories />
        <NewArrivals />
        <Testimonials />
        <Newsletter />
        <About />
        <ReturnPolicy />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
