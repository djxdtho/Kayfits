import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, Mail, MapPin, Clock, Instagram, Send, ChevronDown, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const contactMethods = [
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      value: '07025451230',
      link: 'https://wa.me/2347025451230',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      description: 'Fastest way to reach us',
      delay: 0,
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'darkjesterxd2009@gmail.com',
      link: 'mailto:darkjesterxd2009@gmail.com',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      description: 'For orders and inquiries',
      delay: 0.1,
    },
    {
      icon: Instagram,
      title: 'Instagram',
      value: '@kayfits',
      link: 'https://instagram.com/kayfits',
      color: 'bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-500',
      hoverColor: 'hover:opacity-90',
      description: 'Follow for updates',
      delay: 0.2,
    },
    {
      icon: Clock,
      title: 'Hours',
      value: '24/7',
      link: null,
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      description: 'Always here for you',
      delay: 0.3,
    },
  ];

  const faqs = [
    { q: 'How long does delivery take?', a: 'Delivery takes 2-5 business days within Lagos, and 5-7 days for other states across Nigeria.' },
    { q: 'What payment methods do you accept?', a: 'We accept bank transfer and cash on delivery (COD) for your convenience.' },
    { q: 'Can I return an item?', a: 'Yes! We have a 14-day return policy. Items must be unworn and in original condition with tags attached.' },
    { q: 'Do you ship nationwide?', a: 'Absolutely! We deliver to all 36 states in Nigeria plus the FCT.' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-badge',
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.1 }
      );

      gsap.fromTo(
        '.contact-title',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.2 }
      );

      gsap.fromTo(
        '.contact-desc',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.3 }
      );

      gsap.fromTo(
        '.contact-card',
        { y: 50, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.4)',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.contact-card',
            start: 'top 90%',
          },
        }
      );

      gsap.fromTo(
        '.contact-location',
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.contact-location',
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        '.contact-cta',
        { y: 30, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: '.contact-cta',
            start: 'top 90%',
          },
        }
      );

      gsap.fromTo(
        '.faq-section',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.faq-section',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-16 sm:py-24 lg:py-32 bg-[#1a1a1a] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#ff6b35]/5 via-transparent to-transparent" />
      
      <div className="section-padding relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <span className="contact-badge text-[#ff6b35] font-semibold uppercase tracking-widest text-xs sm:text-sm inline-block">
              Get In Touch
            </span>
            <h2 className="contact-title font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4 mb-4 sm:mb-6">
              Contact Us
            </h2>
            <p className="contact-desc text-white/60 text-base sm:text-lg max-w-2xl mx-auto px-4 sm:px-0">
              Have questions or need help with your order? We're here for you 24/7.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-12 sm:mb-16 lg:mb-20">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="contact-card bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 text-center hover:border-[#ff6b35]/30 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 ${method.color} ${method.hoverColor} rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  <method.icon className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-1 text-sm sm:text-base">{method.title}</h4>
                {method.link ? (
                  <a 
                    href={method.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[#ff6b35] text-xs sm:text-sm hover:underline block truncate"
                  >
                    {method.value}
                  </a>
                ) : (
                  <p className="text-[#ff6b35] text-sm sm:text-base">{method.value}</p>
                )}
                <p className="text-white/40 text-xs mt-1.5 sm:mt-2">{method.description}</p>
              </div>
            ))}
          </div>

          <div className="contact-location bg-white/5 rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-white/10 mb-12 sm:mb-16 lg:mb-20">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#ff6b35]/10 rounded-2xl flex items-center justify-center flex-shrink-0 animate-pulse">
                <MapPin className="w-7 h-7 sm:w-8 sm:h-8 text-[#ff6b35]" />
              </div>
              <div className="text-center sm:text-left flex-1">
                <h4 className="text-white font-semibold text-lg sm:text-xl mb-1">Our Location</h4>
                <p className="text-white/60 text-sm sm:text-base">Lagos, Nigeria</p>
                <p className="text-white/40 text-xs sm:text-sm mt-1">We deliver nationwide from Lagos</p>
              </div>
              <a
                href="https://maps.google.com/?q=Lagos,+Nigeria"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl text-white/60 hover:text-white text-sm transition-all duration-300 flex items-center gap-2"
              >
                View on Map
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="faq-section">
            <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-white text-center mb-8 sm:mb-12">
              Frequently Asked Questions
            </h3>
            <div className="faq-stack space-y-3 sm:space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`bg-white/5 rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 ${openFaq === index ? 'border-[#ff6b35]/30' : ''}`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className={`w-full flex items-center justify-between p-4 sm:p-6 text-left transition-colors duration-200 ${openFaq === index ? 'bg-white/5' : 'hover:bg-white/5'}`}
                  >
                    <h4 className="text-white font-semibold pr-4 text-sm sm:text-base text-left flex-1">{faq.q}</h4>
                    <span className={`flex-shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}>
                      <ChevronDown className="w-5 h-5 text-[#ff6b35]" />
                    </span>
                  </button>
                  <div 
                    className={`transition-all duration-300 ease-out ${openFaq === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                    style={{ maxHeight: openFaq === index ? '10rem' : '0', overflow: 'hidden' }}
                  >
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                      <p className="text-white/60 text-sm leading-relaxed border-t border-white/10 pt-4">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="contact-cta mt-12 sm:mt-16 text-center">
            <h3 className="text-white font-semibold text-lg sm:text-xl mb-3 sm:mb-4">Still have questions?</h3>
            <a
              href="https://wa.me/2347025451230?text=Hi%2C%20I%20have%20a%20question%20about%20Kay-fits"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 sm:gap-3 bg-[#ff6b35] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold hover:bg-[#e55a2b] transition-all duration-300 hover:scale-105 active:scale-95 text-sm sm:text-base"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              Chat with Us on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
