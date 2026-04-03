import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Check, ArrowRight, Bell, Tag, Clock } from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

export default function Newsletter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(
        '.newsletter-word',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Form animation
      gsap.fromTo(
        '.newsletter-form',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
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
      const floatingProduct = imageRef.current?.querySelector('.floating-product');
      if (floatingProduct) {
        gsap.to(floatingProduct, {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setIsSubmitted(true);
    toast.success('Welcome to the Kay-fits family!', {
      description: 'You\'ll receive exclusive drops and discounts soon.',
    });
    setEmail('');
    
    // Reset after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const benefits = [
    { icon: Bell, text: 'New arrivals alerts' },
    { icon: Tag, text: 'Member-only discounts' },
    { icon: Clock, text: 'Early access to sales' },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 bg-[#1a1a1a] overflow-hidden"
    >
      <div className="section-padding">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div ref={contentRef}>
            <span className="newsletter-word text-sm font-accent uppercase tracking-widest text-[#ff6b35] mb-4 block">
              Stay in the Loop
            </span>
            <h2 className="newsletter-word font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Join the<br />
              <span className="gradient-text">Kay-fits Family</span>
            </h2>
            <p className="newsletter-word text-lg text-white/70 mb-8 max-w-md">
              Get exclusive drops, discounts, and style tips delivered to your inbox.
            </p>

            {/* Form */}
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="newsletter-form">
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35]/20 transition-all duration-300"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-primary flex items-center justify-center gap-2 group"
                  >
                    Subscribe
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="newsletter-form flex items-center gap-4 p-6 bg-green-500/20 border border-green-500/30 rounded-xl mb-8">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">You&apos;re in!</div>
                  <div className="text-white/70 text-sm">Welcome to the family</div>
                </div>
              </div>
            )}

            {/* Benefits */}
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="newsletter-form flex items-center gap-3 text-white/70"
                >
                  <div className="w-8 h-8 bg-[#ff6b35]/20 rounded-lg flex items-center justify-center">
                    <benefit.icon className="w-4 h-4 text-[#ff6b35]" />
                  </div>
                  <span>{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div
            ref={imageRef}
            className="relative flex items-center justify-center"
            style={{ perspective: '1000px' }}
          >
            <div className="floating-product relative">
              {/* Main product image */}
              <div className="relative w-72 md:w-96 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/product_02.jpg"
                  alt="Newsletter"
                  className="w-full aspect-[4/5] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Overlay content */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="glass rounded-xl p-4">
                    <div className="text-white/70 text-sm mb-1">Featured Item</div>
                    <div className="text-white font-display text-xl font-bold">Dragon Emblem Jersey</div>
                    <div className="text-[#ff6b35] font-bold mt-1">$120.00</div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div 
                className="absolute -top-6 -right-6 glass rounded-2xl p-4 animate-float"
                style={{ animationDelay: '0.5s' }}
              >
                <div className="text-center">
                  <div className="text-3xl font-display font-bold text-[#ff6b35]">20%</div>
                  <div className="text-white/70 text-xs">Member Discount</div>
                </div>
              </div>

              <div 
                className="absolute -bottom-4 -left-4 w-24 h-24 rounded-2xl overflow-hidden shadow-xl border-2 border-white/10 animate-float"
                style={{ animationDelay: '1s' }}
              >
                <img
                  src="/images/product_04.jpg"
                  alt="Secondary"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
