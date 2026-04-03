import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.hero-word',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.12 },
        0.3
      );

      tl.fromTo(
        subheadRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.6
      );

      tl.fromTo(
        '.hero-cta',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
        0.8
      );

      tl.fromTo(
        imageRef.current,
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8 },
        0.4
      );

      tl.fromTo(
        scrollIndicatorRef.current,
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4 },
        1.1
      );

      gsap.to(imageRef.current, {
        y: -10,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }, heroRef);

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
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#1a1a1a]"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a]" />
      
      {/* Animated accent shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ff6b35]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-[#ff6b35]/3 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 w-full section-padding py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="space-y-8">
            <h1
              ref={headlineRef}
              className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.2] px-2 py-6 overflow-visible"
              style={{ overflow: 'visible', paddingBottom: '0.5em' }}
            >
              <span className="hero-word inline">Elevate</span>{' '}
              <span className="hero-word inline">Your</span>{' '}
              <span className="hero-word inline gradient-text" style={{ display: 'inline', paddingBottom: '0.05em' }}>Style</span>
            </h1>

            <p
              ref={subheadRef}
              className="text-lg sm:text-xl text-white/70 max-w-lg leading-relaxed"
            >
              Discover premium streetwear that speaks confidence. Curated fits for the modern you.
            </p>

            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <button
                onClick={scrollToProducts}
                className="hero-cta btn-primary flex items-center gap-2 group"
              >
                Shop Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button
                onClick={scrollToProducts}
                className="hero-cta btn-secondary"
              >
                View Collection
              </button>
            </div>

            {/* Stats */}
            <div className="hero-cta flex gap-12 pt-8 border-t border-white/10">
              <div>
                <div className="text-3xl font-display font-bold text-white">10K+</div>
                <div className="text-sm text-white/50">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-display font-bold text-white">500+</div>
                <div className="text-sm text-white/50">Products</div>
              </div>
              <div>
                <div className="text-3xl font-display font-bold text-white">4.9</div>
                <div className="text-sm text-white/50">Rating</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div
            ref={imageRef}
            className="relative lg:h-[600px] flex items-center justify-center"
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
          >
            <div className="relative">
              {/* Main image */}
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl bg-[#2a2a2a]">
                <img
                  src="/images/hero_model_1.jpg"
                  alt="Kay-fits Fashion"
                  className="w-full max-w-md lg:max-w-lg object-cover"
                  loading="eager"
                  decoding="async"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/50 to-transparent" />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-6 z-20 glass rounded-2xl p-4 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#ff6b35] rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">New</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">Spring Collection</div>
                    <div className="text-white/50 text-sm">Just Dropped</div>
                  </div>
                </div>
              </div>

              {/* Secondary floating image */}
              <div 
                className="absolute -top-8 -right-8 z-20 w-32 h-40 rounded-2xl overflow-hidden shadow-xl border-2 border-white/10 animate-float bg-[#2a2a2a]"
                style={{ animationDelay: '1s' }}
              >
                <img
                  src="/images/hero_model_2.jpg"
                  alt="Secondary"
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
      >
        <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
        <ChevronDown className="w-5 h-5 animate-bounce-down" />
      </div>
    </section>
  );
}
