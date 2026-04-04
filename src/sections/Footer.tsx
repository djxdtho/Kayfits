import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Instagram, 
  ArrowUp,
  CreditCard,
  Truck,
  Shield,
  RotateCcw,
  MessageCircle,
  X,
  Send,
  Phone,
  ChevronRight,
  MapPin,
  Mail
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  shop: [
    { name: 'Track Pants', href: '#products' },
    { name: 'Cargo Pants', href: '#products' },
    { name: 'Polo Shirts', href: '#products' },
    { name: 'Dragon Jerseys', href: '#products' },
    { name: 'Hoodies', href: '#products' },
  ],
  company: [
    { name: 'About Us', href: '#about' },
    { name: 'Contact Us', href: '#contact' },
    { name: 'Return Policy', href: '#returns' },
  ],
  support: [
    { name: 'FAQ', href: '#contact' },
    { name: 'Size Guide', href: '#contact' },
    { name: 'Track Order', href: '#contact' },
    { name: 'Shipping Info', href: '#contact' },
  ],
};

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/kayfits', color: 'hover:bg-pink-500' },
  { name: 'TikTok', icon: MessageCircle, href: 'https://tiktok.com/@kayfits', color: 'hover:bg-black' },
];

const features = [
  { icon: Truck, title: 'Fast Delivery', desc: 'Nationwide shipping' },
  { icon: Shield, title: 'Secure Payment', desc: '100% secure checkout' },
  { icon: RotateCcw, title: 'Easy Returns', desc: '7-day return policy' },
  { icon: CreditCard, title: 'Multiple Payment', desc: 'Transfer & COD' },
];

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.footer-column',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '2347025451230';

  const whatsappOptions = [
    { label: 'I want to place an order', icon: Send, action: () => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%20want%20to%20place%20an%20order`) },
    { label: 'I have a question', icon: MessageCircle, action: () => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%20have%20a%20question`) },
    { label: 'Track my order', icon: Truck, action: () => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%20want%20to%20track%20my%20order`) },
  ];

  return (
    <>
      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {isWhatsAppOpen && (
          <div className="bg-white rounded-2xl shadow-2xl p-4 w-72 animate-in slide-in-from-bottom-5 fade-in duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-900 font-semibold text-sm">Kay-fits Support</p>
                  <p className="text-gray-500 text-xs">Typically replies instantly</p>
                </div>
              </div>
              <button onClick={() => setIsWhatsAppOpen(false)} className="p-1 hover:bg-gray-100 rounded-full">
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            <p className="text-gray-600 text-sm mb-4">Hi there! 👋<br />How can we help you today?</p>
            <div className="space-y-2">
              {whatsappOptions.map((option, i) => (
                <button
                  key={i}
                  onClick={option.action}
                  className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-left"
                >
                  <option.icon className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-700 text-sm flex-1">{option.label}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        )}
        
        <button
          onClick={() => setIsWhatsAppOpen(!isWhatsAppOpen)}
          className={`w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110 ${isWhatsAppOpen ? 'rotate-90' : ''}`}
        >
          {isWhatsAppOpen ? (
            <X className="w-7 h-7 text-white" />
          ) : (
            <MessageCircle className="w-7 h-7 text-white" />
          )}
        </button>
      </div>

      <footer ref={footerRef} className="bg-[#1a1a1a]">
        {/* Features bar */}
        <div className="border-b border-white/10">
          <div className="section-padding py-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#ff6b35]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-[#ff6b35]" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{feature.title}</div>
                    <div className="text-white/50 text-xs">{feature.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main footer */}
        <div ref={contentRef} className="section-padding py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
            {/* Brand column */}
            <div className="footer-column lg:col-span-2">
              <a href="#" className="font-display text-3xl font-bold text-white mb-6 block">
                Kay-fits
              </a>
              <p className="text-white/60 mb-6 max-w-sm">
                Premium streetwear that speaks confidence. Curated fits for the modern you. Based in Nigeria, shipping nationwide.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-white/50 text-sm">
                  <MapPin className="w-4 h-4 text-[#ff6b35]" />
                  <span>Lagos, Nigeria</span>
                </div>
                <div className="flex items-center gap-3 text-white/50 text-sm">
                  <Phone className="w-4 h-4 text-[#ff6b35]" />
                  <span>07025451230</span>
                </div>
                <div className="flex items-center gap-3 text-white/50 text-sm">
                  <Mail className="w-4 h-4 text-[#ff6b35]" />
                  <span>darkjesterxd2009@gmail.com</span>
                </div>
              </div>
              
              {/* Social links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white/60 ${social.color} hover:text-white transition-all duration-300 hover:scale-110`}
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Shop links */}
            <div className="footer-column">
              <h4 className="text-white font-semibold mb-6">Shop</h4>
              <ul className="space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-white/60 hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company links */}
            <div className="footer-column">
              <h4 className="text-white font-semibold mb-6">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-white/60 hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support links */}
            <div className="footer-column">
              <h4 className="text-white font-semibold mb-6">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-white/60 hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="section-padding py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-white/50 text-sm">
                © 2026 Kay-fits. All rights reserved.
              </div>
              
              <div className="flex items-center gap-6">
                <button
                  onClick={() => scrollToSection('#returns')}
                  className="text-white/50 hover:text-white text-sm transition-colors duration-300"
                >
                  Return Policy
                </button>
                <button
                  onClick={() => scrollToSection('#contact')}
                  className="text-white/50 hover:text-white text-sm transition-colors duration-300"
                >
                  Contact
                </button>
                <button
                  onClick={scrollToTop}
                  className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white/60 hover:bg-[#ff6b35] hover:text-white transition-all duration-300 hover:-translate-y-1"
                  aria-label="Back to top"
                >
                  <ArrowUp className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
