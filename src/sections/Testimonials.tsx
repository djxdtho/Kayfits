import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/data/products';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      // Cards stagger animation
      const cards = cardsRef.current?.querySelectorAll('.testimonial-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0, rotate: -2 },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 lg:py-32 bg-[#f5f5f5]"
    >
      <div className="section-padding">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="text-sm font-accent uppercase tracking-widest text-[#ff6b35] mb-4 block">
            Customer Love
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a1a]">
            What Our Customers Say
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div
          ref={cardsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`testimonial-card bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-500 group ${
                index % 2 === 0 ? 'lg:translate-y-4' : ''
              }`}
            >
              {/* Quote icon */}
              <div className="mb-6">
                <Quote className="w-10 h-10 text-[#ff6b35]/20 group-hover:text-[#ff6b35]/40 transition-colors duration-300" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-[#ff6b35] text-[#ff6b35]"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-[#1a1a1a] text-lg leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff6b35] to-[#ff8f6b] flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-[#1a1a1a]">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">{testimonial.handle}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 lg:gap-16">
          <div className="text-center">
            <div className="text-4xl font-display font-bold text-[#1a1a1a]">4.9</div>
            <div className="flex gap-1 justify-center mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#ff6b35] text-[#ff6b35]" />
              ))}
            </div>
            <div className="text-sm text-gray-500 mt-1">Average Rating</div>
          </div>
          <div className="w-px h-16 bg-gray-200 hidden sm:block" />
          <div className="text-center">
            <div className="text-4xl font-display font-bold text-[#1a1a1a]">10K+</div>
            <div className="text-sm text-gray-500 mt-1">Happy Customers</div>
          </div>
          <div className="w-px h-16 bg-gray-200 hidden sm:block" />
          <div className="text-center">
            <div className="text-4xl font-display font-bold text-[#1a1a1a]">50K+</div>
            <div className="text-sm text-gray-500 mt-1">Orders Delivered</div>
          </div>
        </div>
      </div>
    </section>
  );
}
