import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { categories } from '@/data/products';

gsap.registerPlugin(ScrollTrigger);

export default function Categories() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Carousel animation
      gsap.fromTo(
        carouselRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: carouselRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % categories.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + categories.length) % categories.length);
  };

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;
    const normalizedDiff = ((diff + categories.length) % categories.length);
    const adjustedDiff = normalizedDiff > categories.length / 2 ? normalizedDiff - categories.length : normalizedDiff;
    
    const isActive = index === activeIndex;
    const translateX = adjustedDiff * 320;
    const translateZ = isActive ? 0 : -100;
    const rotateY = adjustedDiff * -15;
    const scale = isActive ? 1 : 0.85;
    const opacity = Math.abs(adjustedDiff) > 2 ? 0 : isActive ? 1 : 0.6;
    const blur = isActive ? 0 : 2;

    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      filter: `blur(${blur}px)`,
      zIndex: isActive ? 10 : 5 - Math.abs(adjustedDiff),
      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
    };
  };

  return (
    <section
      ref={sectionRef}
      id="categories"
      className="py-24 lg:py-32 bg-[#1a1a1a] overflow-hidden"
    >
      <div className="section-padding">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="text-sm font-accent uppercase tracking-widest text-[#ff6b35] mb-4 block">
            Browse Collection
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
            Shop by Category
          </h2>
        </div>

        {/* 3D Carousel */}
        <div
          ref={carouselRef}
          className="relative h-[500px] md:h-[600px]"
          style={{ perspective: '1200px' }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="absolute w-[280px] md:w-[320px] cursor-pointer"
                style={getCardStyle(index)}
                onClick={() => setActiveIndex(index)}
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                  {/* Image */}
                  <div className="aspect-[3/4] relative">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                      {category.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70 text-sm">
                        {category.productCount} Products
                      </span>
                      <button className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300 hover:bg-[#ff6b35]">
                        <ArrowRight className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-[#ff6b35] transition-colors duration-300 z-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-[#ff6b35] transition-colors duration-300 z-20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-3 mt-8">
          {categories.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'bg-[#ff6b35] w-8'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
