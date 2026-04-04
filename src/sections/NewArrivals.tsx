import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function NewArrivals() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(
        '.new-arrival-word',
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Subtext animation
      gsap.fromTo(
        '.new-arrival-subtext',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Image animation
      gsap.fromTo(
        imageRef.current,
        { x: 100, opacity: 0, rotateY: -30 },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Floating animation for image
      const floatingImage = imageRef.current?.querySelector('.floating-image');
      if (floatingImage) {
        gsap.to(floatingImage, {
          y: -10,
          duration: 3,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToProducts = () => {
    const element = document.querySelector('#products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="new-arrivals"
      className="py-24 lg:py-32 bg-[#f5f5f5] overflow-hidden"
    >
      <div className="section-padding">
        <div className="relative bg-[#1a1a1a] rounded-3xl overflow-hidden">
          {/* Diagonal split background */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a]"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            }}
          />
          
          {/* Accent shape */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[#ff6b35]/5" 
            style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)' }}
          />

          <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-0">
            {/* Content */}
            <div ref={contentRef} className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              {/* Badge */}
              <div className="new-arrival-subtext inline-flex items-center gap-2 px-4 py-2 bg-[#ff6b35]/20 rounded-full w-fit mb-6">
                <Sparkles className="w-4 h-4 text-[#ff6b35]" />
                <span className="text-sm font-accent text-[#ff6b35] uppercase tracking-wider">
                  Just Landed
                </span>
              </div>

              {/* Headline */}
              <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
                <span className="new-arrival-word block">NEW</span>
                <span className="new-arrival-word block gradient-text">DROPS</span>
              </h2>

              {/* Subtext */}
              <p className="new-arrival-subtext text-lg text-white/70 mb-8 max-w-md">
                Fresh styles just landed. Be the first to rock the latest. Limited quantities available.
              </p>

              {/* CTA */}
              <div className="new-arrival-subtext flex flex-wrap gap-4">
                <button
                  onClick={scrollToProducts}
                  className="btn-primary flex items-center gap-2 group"
                >
                  Shop New Arrivals
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>

              {/* Limited stock indicator */}
              <div className="new-arrival-subtext mt-8 flex items-center gap-4 text-white/50 text-sm">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff6b35] to-[#ff8f6b] border-2 border-[#1a1a1a] flex items-center justify-center text-xs font-bold text-white"
                    >
                      {i}K
                    </div>
                  ))}
                </div>
                <span>+10K already viewing</span>
              </div>
            </div>

            {/* Image */}
            <div
              ref={imageRef}
              className="relative h-[400px] lg:h-auto flex items-center justify-center p-8"
              style={{ perspective: '1000px' }}
            >
              <div className="floating-image relative">
                {/* Main product image */}
                <div className="relative w-64 md:w-80 rounded-2xl overflow-hidden shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-500">
                  <img
                    src="images/product_20.jpg"
                    alt="New Arrival"
                    className="w-full aspect-[4/5] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {/* Price tag */}
                  <div className="absolute bottom-4 left-4 right-4 glass rounded-xl p-3">
                    <div className="text-white/70 text-xs">Dragon Emblem Jersey</div>
                    <div className="text-white font-bold text-lg">₦12,000</div>
                  </div>
                </div>

                {/* Secondary floating image */}
                <div 
                  className="absolute -bottom-8 -left-8 w-40 rounded-xl overflow-hidden shadow-xl border-2 border-white/10 transform -rotate-12 hover:rotate-0 transition-transform duration-500"
                  style={{ animationDelay: '0.5s' }}
                >
                  <img
                    src="images/product_23.jpg"
                    alt="Secondary"
                    className="w-full aspect-square object-cover"
                  />
                </div>

                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#ff6b35] rounded-full flex items-center justify-center animate-pulse-glow">
                  <div className="text-center text-white">
                    <div className="text-xs font-accent">NEW</div>
                    <div className="text-lg font-bold">2026</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
