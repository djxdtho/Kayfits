import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Truck, RotateCcw, Shield, HeadphonesIcon, MessageCircle, CheckCircle, Package, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const policies = [
  {
    icon: RotateCcw,
    title: '14-Day Returns',
    description: 'We accept returns within 14 days of delivery. Items must be unworn, unwashed, and with all original tags attached.',
    color: 'from-orange-500 to-red-500',
    delay: 0,
  },
  {
    icon: Truck,
    title: 'Return Shipping',
    description: 'Return shipping costs are the responsibility of the customer unless the item received was damaged or defective.',
    color: 'from-blue-500 to-cyan-500',
    delay: 0.1,
  },
  {
    icon: Shield,
    title: 'Condition Requirements',
    description: 'Items must be in their original condition with no signs of wear, washing, or alteration.',
    color: 'from-green-500 to-emerald-500',
    delay: 0.2,
  },
  {
    icon: HeadphonesIcon,
    title: 'Exchange Options',
    description: 'We offer exchanges for different sizes subject to availability. Contact us to arrange an exchange.',
    color: 'from-purple-500 to-pink-500',
    delay: 0.3,
  },
];

const steps = [
  { 
    step: '01', 
    title: 'Contact Us', 
    description: 'Reach out via WhatsApp or email within 14 days of receiving your order.',
    icon: MessageCircle,
  },
  { 
    step: '02', 
    title: 'Submit Request', 
    description: 'Provide order details and reason for return. We\'ll review within 24 hours.',
    icon: Package,
  },
  { 
    step: '03', 
    title: 'Ship Back', 
    description: 'Once approved, ship the item back to our address in Lagos.',
    icon: Truck,
  },
  { 
    step: '04', 
    title: 'Refund/Exchange', 
    description: 'Upon inspection, we\'ll process your refund or send your exchange.',
    icon: CheckCircle,
  },
];

export default function ReturnPolicy() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.return-badge',
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.1 }
      );

      gsap.fromTo(
        '.return-title',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.2 }
      );

      gsap.fromTo(
        '.return-desc',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.3 }
      );

      gsap.fromTo(
        '.return-step',
        { y: 50, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.4)',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.return-steps',
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        '.return-policy-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.return-policies',
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        '.return-cta',
        { y: 30, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: '.return-cta',
            start: 'top 90%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="returns" ref={sectionRef} className="py-16 sm:py-24 lg:py-32 bg-[#1a1a1a] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#ff6b35]/5 via-transparent to-transparent" />
      
      <div className="section-padding relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <span className="return-badge text-[#ff6b35] font-semibold uppercase tracking-widest text-xs sm:text-sm inline-block">
              Our Policy
            </span>
            <h2 className="return-title font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4 mb-4 sm:mb-6">
              Return & Exchange Policy
            </h2>
            <p className="return-desc text-white/60 text-base sm:text-lg max-w-2xl mx-auto px-4 sm:px-0">
              We want you to be 100% satisfied with your purchase. If something isn't right, we're here to help.
            </p>
          </div>

          <div className="mb-12 sm:mb-16 lg:mb-20">
            <h3 className="text-white font-semibold text-lg sm:text-xl mb-6 sm:mb-8 text-center">How to Return</h3>
            <div className="return-steps grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {steps.map((item, index) => (
                <div 
                  key={index} 
                  className="return-step relative bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 group hover:border-[#ff6b35]/30 transition-all duration-300"
                >
                  <div className="absolute -top-2 -left-2 w-8 h-8 sm:w-10 sm:h-10 bg-[#ff6b35] rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-lg">
                    {index + 1}
                  </div>
                  <div className="pt-4 sm:pt-6">
                    <div className="text-[#ff6b35] font-display text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 opacity-50">
                      {item.step}
                    </div>
                    <h4 className="text-white font-semibold mb-1.5 sm:mb-2 text-sm sm:text-base">{item.title}</h4>
                    <p className="text-white/50 text-xs sm:text-sm leading-relaxed">{item.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-[#ff6b35]/30" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="return-policies grid sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-12 sm:mb-16">
            {policies.map((policy, index) => (
              <div
                key={index}
                className="return-policy-card bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:bg-white/[0.08] transition-all duration-300 group"
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${policy.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <policy.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-2 text-sm sm:text-base">{policy.title}</h4>
                <p className="text-white/50 text-xs sm:text-sm leading-relaxed">{policy.description}</p>
              </div>
            ))}
          </div>

          <div className="return-cta bg-gradient-to-r from-[#ff6b35]/10 via-[#ff6b35]/5 to-transparent rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#ff6b35]/20">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#ff6b35]/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <HeadphonesIcon className="w-7 h-7 sm:w-8 sm:h-8 text-[#ff6b35]" />
              </div>
              <div className="text-center sm:text-left flex-1">
                <h3 className="text-white font-semibold text-lg sm:text-xl mb-1">Need Help with a Return?</h3>
                <p className="text-white/50 text-sm mb-3 sm:mb-0">Contact us on WhatsApp for quick assistance</p>
              </div>
              <a
                href="https://wa.me/2347025451230?text=Hi%2C%20I%20want%20to%20request%20a%20return"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#ff6b35] text-white px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl font-semibold hover:bg-[#e55a2b] transition-all duration-300 hover:scale-105 active:scale-95 text-sm sm:text-base whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                Contact Support
              </a>
            </div>
          </div>

          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/40 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Response within 24 hours</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Free returns for defective items</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
