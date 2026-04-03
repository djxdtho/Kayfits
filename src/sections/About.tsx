import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Sparkles, Truck, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: Heart,
    title: 'Quality First',
    description: 'Every piece is crafted with attention to detail, using premium materials that last.',
    delay: 0,
  },
  {
    icon: Sparkles,
    title: 'Trendy Designs',
    description: 'Stay ahead of the curve with our constantly updated streetwear collection.',
    delay: 0.1,
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Quick nationwide delivery so you can rock your new fit ASAP.',
    delay: 0.2,
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Join thousands of satisfied customers who trust Kay-fits for their style.',
    delay: 0.3,
  },
];

const stats = [
  { number: '10K+', label: 'Happy Customers', suffix: '+' },
  { number: '500+', label: 'Products Sold', suffix: '+' },
  { number: '4.9', label: 'Average Rating', suffix: '/5' },
  { number: '24/7', label: 'Customer Support', suffix: '' },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-badge',
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.1 }
      );

      gsap.fromTo(
        '.about-title',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.2 }
      );

      gsap.fromTo(
        '.about-desc',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.35 }
      );

      gsap.fromTo(
        '.about-card',
        { y: 50, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.2)',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.about-card',
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        '.about-text-block',
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-text-block',
            start: 'top 80%',
          },
        }
      );

      statRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { y: 40, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'back.out(1.4)',
            delay: i * 0.1,
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
            },
          }
        );
      });

      gsap.fromTo(
        '.about-value-card',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-values-grid',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    
    document.querySelectorAll('.about-value-card').forEach((el) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-in');
            }
          });
        },
        { threshold: 0.2 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-16 sm:py-24 lg:py-32 bg-[#1a1a1a] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#ff6b35]/5 via-transparent to-transparent" />
      
      <div className="section-padding relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <span className="about-badge text-[#ff6b35] font-semibold uppercase tracking-widest text-xs sm:text-sm inline-block">
              Our Story
            </span>
            <h2 className="about-title font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4 mb-4 sm:mb-6">
              About Kay-fits
            </h2>
            <p className="about-desc text-white/60 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Finding the perfect streetwear piece shouldn't be a mission. At Kay-fits, we've simplified the game. 
              We're your #1 plug for minimalist essentials that don't compromise on quality or comfort.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center mb-12 sm:mb-16 lg:mb-20">
            <div className="about-card relative order-2 lg:order-1">
              <div className="aspect-square sm:aspect-[4/3] lg:aspect-square bg-gradient-to-br from-[#ff6b35]/20 to-[#ff6b35]/5 rounded-2xl sm:rounded-3xl overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center transform scale-75 sm:scale-100">
                    <span className="font-display text-7xl sm:text-8xl lg:text-9xl font-bold text-[#ff6b35]">KF</span>
                    <p className="text-white/40 text-xs sm:text-sm mt-2">Est. 2025</p>
                  </div>
                </div>
                <div className="absolute top-4 left-4 w-16 sm:w-20 h-16 sm:h-20 bg-[#ff6b35]/10 rounded-full blur-2xl animate-pulse" />
                <div className="absolute bottom-4 right-4 w-24 sm:w-32 h-24 sm:h-32 bg-[#ff6b35]/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-[#ff6b35]/10 rounded-full" />
              </div>
            </div>
            
            <div className="about-text-block space-y-4 sm:space-y-6 order-1 lg:order-2">
              <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                Streetwear for the Modern You
              </h3>
              <p className="text-white/60 leading-relaxed text-sm sm:text-base">
                Whether you're layering up or keeping it low-key, we've got you covered with the cleanest basics in the game. 
                From track pants to dragon jerseys, every piece in our collection is designed to make you look and feel confident.
              </p>
              <p className="text-white/60 leading-relaxed text-sm sm:text-base">
                Based in Lagos, Nigeria, we understand the Nigerian market and deliver nationwide. Our commitment to quality, 
                style, and customer satisfaction sets us apart as your trusted streetwear plug.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4">
                <div className="bg-white/5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg border border-white/10 flex items-center gap-2">
                  <span className="text-[#ff6b35] font-bold text-sm sm:text-base">100%</span>
                  <span className="text-white/50 text-xs sm:text-sm">Quality Guaranteed</span>
                </div>
                <div className="bg-white/5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg border border-white/10 flex items-center gap-2">
                  <span className="text-[#ff6b35] font-bold text-sm sm:text-base">Nigeria</span>
                  <span className="text-white/50 text-xs sm:text-sm">Wide Delivery</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-12 sm:mb-16 lg:mb-20">
            {stats.map((stat, index) => (
              <div
                key={index}
                ref={(el) => { statRefs.current[index] = el; }}
                className="text-center bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-[#ff6b35]/30 transition-all duration-300 hover:scale-105"
              >
                <div className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#ff6b35] mb-1 sm:mb-2">{stat.number}</div>
                <div className="text-white/50 text-xs sm:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-white text-center mb-8 sm:mb-12">
              Why Choose Kay-fits?
            </h3>
            <div className="about-values-grid grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="about-value-card bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 text-center hover:border-[#ff6b35]/30 hover:bg-white/[0.08] transition-all duration-300 group"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#ff6b35]/10 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="w-5 h-5 sm:w-7 sm:h-7 text-[#ff6b35]" />
                  </div>
                  <h4 className="text-white font-semibold mb-1.5 sm:mb-2 text-sm sm:text-base">{value.title}</h4>
                  <p className="text-white/50 text-xs sm:text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
