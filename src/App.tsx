import { useState, useEffect, useRef, type ReactNode } from 'react';

// ==================== SCROLL REVEAL ====================
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); } },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
}

const Reveal = ({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) => {
  const { ref, isVisible } = useInView();
  return (
    <div ref={ref} className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

// ==================== LOGO ====================
const Logo = ({ size = 'md', inverted = false }: { size?: 'sm' | 'md' | 'lg'; inverted?: boolean }) => {
  const sizes = { sm: 'h-8', md: 'h-10', lg: 'h-14' };
  return (
    <img
      src="https://qxwmavrgfarmxbexeoxf.supabase.co/storage/v1/render/image/public/images/submissions/logos/1775122019698-77aysv5f01i.png?width=224&quality=80&resize=contain"
      alt="Dukes of Beauty"
      className={`${sizes[size]} w-auto object-contain ${inverted ? '' : 'brightness-0 invert'}`}
    />
  );
};

// ==================== NAVIGATION ====================
const Navigation = ({ onBookClick }: { onBookClick: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass border-b border-champagne/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a href="#" className="flex-shrink-0"><Logo size="sm" /></a>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#services" className="text-[11px] text-ivory/60 hover:text-champagne transition-colors tracking-[0.2em] uppercase">Services</a>
              <a href="#gallery" className="text-[11px] text-ivory/60 hover:text-champagne transition-colors tracking-[0.2em] uppercase">Gallery</a>
              <a href="#reviews" className="text-[11px] text-ivory/60 hover:text-champagne transition-colors tracking-[0.2em] uppercase">Reviews</a>
              <a href="#contact" className="text-[11px] text-ivory/60 hover:text-champagne transition-colors tracking-[0.2em] uppercase">Contact</a>
              <a href="https://www.instagram.com/dukes_of_beauty.ae/" target="_blank" rel="noopener noreferrer" className="text-ivory/60 hover:text-champagne transition-colors">
                <i className="fab fa-instagram text-lg"></i>
              </a>
              <button onClick={onBookClick} className="btn-luxury px-6 py-2.5 rounded-full">Book Now</button>
            </div>

            <button onClick={() => setMobileOpen(true)} className="md:hidden text-ivory/70 p-2" aria-label="Menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="17" x2="21" y2="17" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 bg-obsidian/95 backdrop-blur-xl" onClick={() => setMobileOpen(false)}></div>
          <div className="relative h-full flex flex-col animate-fade-in">
            <div className="flex items-center justify-between p-5 border-b border-champagne/10">
              <Logo size="sm" />
              <button onClick={() => setMobileOpen(false)} className="text-ivory/60 p-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-8 px-8">
              <a href="#services" onClick={() => setMobileOpen(false)} className="text-2xl font-serif text-ivory/80 hover:text-champagne transition-colors">Services</a>
              <a href="#gallery" onClick={() => setMobileOpen(false)} className="text-2xl font-serif text-ivory/80 hover:text-champagne transition-colors">Gallery</a>
              <a href="#reviews" onClick={() => setMobileOpen(false)} className="text-2xl font-serif text-ivory/80 hover:text-champagne transition-colors">Reviews</a>
              <a href="#contact" onClick={() => setMobileOpen(false)} className="text-2xl font-serif text-ivory/80 hover:text-champagne transition-colors">Contact</a>
              <a href="https://www.instagram.com/dukes_of_beauty.ae/" target="_blank" rel="noopener noreferrer" className="text-ivory/60 hover:text-champagne transition-colors flex items-center gap-2">
                <i className="fab fa-instagram text-xl"></i>
                <span className="text-sm">Instagram</span>
              </a>
              <button onClick={() => { setMobileOpen(false); onBookClick(); }} className="btn-luxury w-full py-4 rounded-full mt-4">Book Appointment</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// ==================== HERO ====================
const HeroSection = ({ onBookClick }: { onBookClick: () => void }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(true); }, []);

  return (
    <section className="relative min-h-[100svh] flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://qxwmavrgfarmxbexeoxf.supabase.co/storage/v1/object/public/images/submissions/covers/1775122063027-ut4x70ufzpg.jpeg"
          alt="Dukes of Beauty Salon"
          className={`absolute inset-0 w-full h-full object-cover ${loaded ? 'animate-ken-burns' : 'opacity-0'}`}
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        <div className="absolute inset-0 hero-overlay"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 pb-16 sm:pb-24 pt-32">
        <div className="max-w-3xl">
          <div className={`transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-px bg-champagne"></span>
              <span className="text-champagne text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-sans">Business Bay · Dubai</span>
            </div>
          </div>

          <h1 className={`hero-title font-serif text-[2.5rem] sm:text-6xl md:text-7xl lg:text-8xl font-light text-ivory leading-[0.95] tracking-tight transition-all duration-1000 delay-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            The Art of<br />
            <span className="animate-shimmer italic">Beauty</span>
          </h1>

          <p className={`mt-6 sm:mt-8 text-ivory/50 text-base sm:text-lg font-sans font-light leading-relaxed max-w-lg transition-all duration-1000 delay-900 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            A sanctuary of luxury where precision meets artistry. Premium hair, nails, aesthetics & wellness in the heart of Dubai.
          </p>

          <div className={`mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <button onClick={onBookClick} className="btn-luxury px-8 py-4 rounded-full">
              Reserve Your Visit
            </button>
            <a href="#services" className="btn-outline px-8 py-4 rounded-full text-center">
              View Services
            </a>
          </div>

          <div className={`mt-12 flex items-center gap-4 transition-all duration-1000 delay-[1200ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-3.5 h-3.5 text-champagne fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
              ))}
            </div>
            <span className="text-ivory/40 text-xs font-sans tracking-wide">4.9 · Google Reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==================== ABOUT SECTION ====================
const AboutSection = () => (
  <section className="py-20 sm:py-32 relative">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        <Reveal>
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-champagne"></span>
              <span className="text-champagne text-[10px] tracking-[0.3em] uppercase font-sans">About</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-ivory leading-tight">
              Where Luxury<br />Meets <span className="italic text-champagne">Expertise</span>
            </h2>
            <p className="mt-6 text-ivory/50 text-sm sm:text-base font-sans leading-relaxed">
              Dukes of Beauty is more than a salon — it is a destination for those who appreciate the finest things. Located in the prestigious Business Bay, our atelier combines world-class techniques with premium products from K18, Tokio Inkarami, Nashi, and Kevin Murphy.
            </p>
            <p className="mt-4 text-ivory/50 text-sm sm:text-base font-sans leading-relaxed">
              From synchronized 4-hand and 6-hand treatments to advanced HydraFacial Syndeo protocols, every service is designed to deliver an unparalleled experience.
            </p>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="bg-charcoal/50 border border-champagne/10 rounded-2xl p-6 text-center">
                <p className="font-serif text-3xl sm:text-4xl text-champagne">4.9</p>
                <p className="text-ivory/40 text-xs font-sans mt-1 tracking-wide uppercase">Google Rating</p>
              </div>
              <div className="bg-charcoal/50 border border-champagne/10 rounded-2xl p-6 text-center">
                <p className="font-serif text-3xl sm:text-4xl text-champagne">111+</p>
                <p className="text-ivory/40 text-xs font-sans mt-1 tracking-wide uppercase">Services</p>
              </div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="bg-charcoal/50 border border-champagne/10 rounded-2xl p-6 text-center">
                <p className="font-serif text-3xl sm:text-4xl text-champagne">7</p>
                <p className="text-ivory/40 text-xs font-sans mt-1 tracking-wide uppercase">Categories</p>
              </div>
              <div className="bg-charcoal/50 border border-champagne/10 rounded-2xl p-6 text-center">
                <p className="font-serif text-3xl sm:text-4xl text-champagne">5★</p>
                <p className="text-ivory/40 text-xs font-sans mt-1 tracking-wide uppercase">Premium</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

// ==================== SERVICES / PRICING ====================
type ServiceItem = { name: string; duration: string; price: string };
type ServiceCategory = { id: string; icon: string; title: string; services: ServiceItem[] };

const serviceCategories: ServiceCategory[] = [
  {
    id: 'hair', icon: '✂️', title: 'Hair',
    services: [
      { name: 'Haircut', duration: '1h 30min', price: 'from 400 AED' },
      { name: 'Haircut + Styling', duration: '1h', price: 'from 500 AED' },
      { name: 'Princess Hair Cut', duration: '1h', price: '250 AED' },
      { name: 'Trimming', duration: '1h', price: '200 AED' },
      { name: 'Fringe Trim', duration: '1h', price: '120 AED' },
      { name: 'Blow-Dry Classic', duration: '1h', price: 'from 180 AED' },
      { name: 'Evening Styling', duration: '1h', price: 'from 500 AED' },
      { name: 'Express Styling', duration: '1h', price: '300–500 AED' },
      { name: 'Wave Hair', duration: '1h', price: '250–450 AED' },
      { name: 'Roots Color', duration: '1h', price: '420 AED' },
      { name: 'Full Color', duration: '2h', price: 'from 720 AED' },
      { name: 'Balayage / Sombre', duration: '2h 30min', price: '750–1,000 AED' },
      { name: 'Ombre', duration: '2h 30min', price: '900–1,500 AED' },
      { name: 'Air Touch', duration: '4h', price: '1,200–2,000 AED' },
      { name: 'Half Head Highlights', duration: '2h', price: 'from 500 AED' },
      { name: 'Full Head Highlights', duration: '2h 30min', price: '700–1,400 AED' },
      { name: 'Contouring', duration: '1h', price: '100–300 AED' },
      { name: 'Color Correction', duration: '1h', price: '210–450 AED' },
      { name: 'Tokio Inkarami Classic', duration: '1h', price: 'from 450 AED' },
      { name: 'Express Tokio', duration: '1h', price: 'from 100 AED' },
      { name: 'K18 Treatment', duration: '1h', price: 'from 180 AED' },
      { name: 'Nashi Filler Therapy', duration: '1h', price: 'from 290 AED' },
    ],
  },
  {
    id: 'nails', icon: '💅', title: 'Nails',
    services: [
      { name: 'Manicure', duration: '1h', price: '150 AED' },
      { name: 'Manicure DeLuxe', duration: '2h', price: '300 AED' },
      { name: 'Princess Manicure', duration: '40min', price: '90 AED' },
      { name: 'Gelish Manicure', duration: '2h', price: '260 AED' },
      { name: 'Japanese Manicure', duration: '1h 15min', price: '200 AED' },
      { name: 'Spa Sultan de Saba Manicure', duration: '1h 30min', price: '100 AED' },
      { name: 'Spa Manicure Candle', duration: '30min', price: '170 AED' },
      { name: 'Nail Extension', duration: '2h 30min', price: '450 AED' },
      { name: 'Nail Extension Extra Long', duration: '3h 30min', price: '620 AED' },
      { name: 'Nail Refill', duration: '2h', price: '370 AED' },
      { name: 'French / Ombre', duration: '30min', price: '60 AED' },
      { name: 'Nail Art / Special Design', duration: '20min', price: 'from 25 AED' },
      { name: 'Pedicure', duration: '1h', price: '160 AED' },
      { name: 'Pedicure DeLuxe', duration: '2h', price: '320 AED' },
      { name: 'Princess Pedicure', duration: '1h', price: '90 AED' },
      { name: 'Gelish Pedicure', duration: '2h', price: '290 AED' },
      { name: 'Express Pedicure', duration: '1h', price: '80 AED' },
      { name: 'Spa Sultan de Saba Pedicure', duration: '30min', price: '100 AED' },
      { name: 'Spa Pedicure Candle', duration: '30min', price: '180 AED' },
      { name: 'Candle SPA', duration: '15min', price: '50 AED' },
    ],
  },
  {
    id: 'lashes', icon: '👁️', title: 'Lashes & Brows',
    services: [
      { name: 'Eyelash Extension Classic', duration: '2h', price: '400 AED' },
      { name: 'Eyelash Extension 2D', duration: '2h', price: '450 AED' },
      { name: 'Eyelash Extension 3D', duration: '2h', price: '500 AED' },
      { name: 'Eyelash Extension Hollywood', duration: '2h', price: '600 AED' },
      { name: 'Lower Eyelash Extension', duration: '1h', price: '120 AED' },
      { name: 'Eyelash Removal', duration: '30min', price: '100 AED' },
      { name: 'Lash Tint', duration: '1h', price: '110 AED' },
      { name: 'Eyelash Lamination', duration: '1h', price: '250 AED' },
      { name: 'Eyelash Botox', duration: '30min', price: '150 AED' },
      { name: 'Full Lashes (tint + lamination)', duration: '1h', price: '340 AED' },
      { name: 'Brow Shape', duration: '30min', price: '100 AED' },
      { name: 'Brow Tint', duration: '1h', price: '100 AED' },
      { name: 'Brow Lamination', duration: '1h', price: '180 AED' },
      { name: 'Brow Botox', duration: '30min', price: '150 AED' },
      { name: 'Full Brows (shape + tint + lamination)', duration: '1h', price: '350 AED' },
    ],
  },
  {
    id: 'facials', icon: '✨', title: 'HydraFacial & Facials',
    services: [
      { name: 'HF Signature', duration: '30min', price: '700 AED' },
      { name: 'HF Deluxe', duration: '45min', price: '900 AED' },
      { name: 'HF Platinum 1 Booster', duration: '1h', price: '1,000 AED' },
      { name: 'HF Platinum 2 Boosters', duration: '1h', price: '1,200 AED' },
      { name: 'HF Platinum JLo Booster', duration: '1h', price: '1,300–1,500 AED' },
      { name: 'Perk Lip', duration: '15min', price: '400 AED' },
      { name: 'Perk Eye', duration: '15min', price: '400 AED' },
      { name: 'LED Light Therapy', duration: '15min', price: '300 AED' },
      { name: 'Lymphatic Drainage Face & Neck', duration: '20min', price: '400 AED' },
      { name: 'Body Back', duration: '1h', price: '800–1,000 AED' },
      { name: 'Keravive 1 Vial + Spray', duration: '45min', price: '1,500 AED' },
      { name: 'Keravive 2 Vials + Spray', duration: '45min', price: '2,000 AED' },
      { name: 'HF Package (6 sessions)', duration: '1h', price: '4,900 AED' },
      { name: 'HF Hair Keravive Package (6 sessions)', duration: '1h', price: '7,200 AED' },
    ],
  },
  {
    id: 'cosmetology', icon: '🔬', title: 'Cosmetology',
    services: [
      { name: 'Dermatological Facial Cleansing', duration: '1h', price: '900 AED' },
      { name: 'Deep Face Cleaning (Ultrasound)', duration: '1h', price: '700–800 AED' },
      { name: 'PRX Peeling', duration: '1h', price: '650 AED' },
      { name: 'PRX/Biorepeel Package (4 sessions)', duration: '1h', price: '2,080 AED' },
      { name: 'PRX/Biorepeel Package (8 sessions)', duration: '1h', price: '3,640 AED' },
      { name: 'Collagen Therapy', duration: '1h', price: '800 AED' },
      { name: 'Collagen Therapy Package (5 sessions)', duration: '1h', price: '3,200 AED' },
      { name: 'HydraFacial Biobotox', duration: '1h', price: '1,200 AED' },
      { name: 'HydraFacial Keravive Hair', duration: '1h', price: '1,500 AED' },
      { name: 'Dermadrop', duration: '1h', price: '700 AED' },
      { name: 'Dermadrop Package (6 sessions)', duration: '1h', price: '3,360 AED' },
      { name: 'Dermadrop Package (10 sessions)', duration: '1h', price: '4,900 AED' },
      { name: 'Dermapen Serum', duration: '1h', price: '650–750 AED' },
      { name: 'Lifting', duration: '1h', price: '610–700 AED' },
      { name: 'Acne Treatment', duration: '1h', price: '650–750 AED' },
      { name: 'Whitening Face (Pigmentation)', duration: '1h', price: '650–750 AED' },
    ],
  },
  {
    id: 'massage', icon: '💆', title: 'Massage',
    services: [
      { name: 'Relaxing Full Body (60min)', duration: '1h', price: 'Contact us' },
      { name: 'Relaxing Full Body (90min)', duration: '1h 30min', price: 'Contact us' },
      { name: 'Relaxing Full Body (120min)', duration: '2h', price: 'Contact us' },
      { name: 'Deep Tissue (45min)', duration: '45min', price: 'Contact us' },
      { name: 'Deep Tissue (60min)', duration: '1h', price: 'Contact us' },
      { name: 'Deep Tissue (90min)', duration: '1h 30min', price: 'Contact us' },
      { name: 'Hot Stone (60min)', duration: '1h', price: 'Contact us' },
      { name: 'Hot Stone (90min)', duration: '1h 30min', price: 'Contact us' },
      { name: 'Hot Stone (120min)', duration: '2h', price: 'Contact us' },
      { name: 'Swedish Massage (30–60min)', duration: '30–60min', price: 'Contact us' },
      { name: 'Sports Massage (30–60min)', duration: '30–60min', price: 'Contact us' },
      { name: 'Lymphatic Massage (35–60min)', duration: '35–60min', price: 'Contact us' },
      { name: 'Stretching Massage', duration: '30–60min', price: 'Contact us' },
      { name: 'Back Massage (30–60min)', duration: '30–60min', price: 'Contact us' },
      { name: 'Head Massage (30–60min)', duration: '30–60min', price: 'Contact us' },
      { name: 'Reflexology (30–60min)', duration: '30–60min', price: 'Contact us' },
      { name: 'Buccal Face Massage', duration: '30min', price: 'Contact us' },
      { name: 'Postnatal Massage', duration: '1h', price: 'Contact us' },
    ],
  },
  {
    id: 'body', icon: '🧴', title: 'Body Treatments',
    services: [
      { name: 'Neck & Shoulders', duration: '1h', price: '250 AED' },
      { name: 'Full Body Classic', duration: '1h', price: '500 AED' },
      { name: 'Relax', duration: '1h', price: '375 AED' },
      { name: 'Dermadrop', duration: '1h', price: '600–700 AED' },
      { name: 'Heleo 4', duration: '1h', price: '650–750 AED' },
      { name: 'Beautylizer', duration: '1h', price: '620–720 AED' },
    ],
  },
];

const ServicesSection = ({ onBookClick, selectedServices, setSelectedServices }: { onBookClick: () => void; selectedServices: string[]; setSelectedServices: React.Dispatch<React.SetStateAction<string[]>> }) => {
  const [activeTab, setActiveTab] = useState('hair');
  const activeCategory = serviceCategories.find(c => c.id === activeTab) || serviceCategories[0];

  const toggleService = (serviceName: string) => {
    setSelectedServices(prev => prev.includes(serviceName) ? prev.filter(s => s !== serviceName) : [...prev, serviceName]);
  };

  const calculateTotal = () => {
    let total = 0;
    selectedServices.forEach(serviceName => {
      const service = serviceCategories.flatMap(cat => cat.services).find(s => s.name === serviceName);
      if (service) {
        const priceMatch = service.price.match(/(\d+)/);
        if (priceMatch) total += parseInt(priceMatch[1]);
      }
    });
    return total;
  };

  return (
    <section id="services" className="py-20 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="text-center mb-12 sm:mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-px bg-champagne"></span>
              <span className="text-champagne text-[10px] tracking-[0.3em] uppercase font-sans">Treatment Menu</span>
              <span className="w-8 h-px bg-champagne"></span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-ivory">
              Our <span className="italic text-champagne">Services</span>
            </h2>
            <p className="mt-4 text-ivory/40 text-sm sm:text-base font-sans max-w-lg mx-auto">
              Select your treatments below. All prices in AED.
            </p>
          </div>
        </Reveal>

        <Reveal>
          {/* Category Tabs */}
          <div className="flex overflow-x-auto gap-1 sm:gap-2 mb-8 sm:mb-12 pb-2 scrollbar-hide">
            {serviceCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex-shrink-0 px-4 sm:px-6 py-2.5 rounded-full text-[11px] sm:text-xs font-sans tracking-wider uppercase transition-all whitespace-nowrap ${
                  activeTab === cat.id
                    ? 'bg-champagne text-obsidian'
                    : 'bg-charcoal/50 text-ivory/50 border border-champagne/10 hover:border-champagne/30 hover:text-ivory/80'
                }`}
              >
                <span className="mr-1.5">{cat.icon}</span>
                {cat.title}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Services List */}
        <Reveal>
          <div className="bg-charcoal/30 border border-champagne/10 rounded-2xl overflow-hidden">
            <div className="p-5 sm:p-8 border-b border-champagne/10 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl text-ivory flex items-center gap-2">
                  <span>{activeCategory.icon}</span>
                  {activeCategory.title}
                </h3>
                <p className="text-ivory/40 text-xs font-sans mt-1">{activeCategory.services.length} treatments available</p>
              </div>
              <button
                onClick={onBookClick}
                className="btn-luxury px-5 py-2.5 rounded-full text-[10px]"
              >
                Book Selected
              </button>
            </div>

            <div className="divide-y divide-champagne/5">
              {activeCategory.services.map((service, i) => (
                <label key={i} className="flex items-center gap-4 px-5 sm:px-8 py-4 hover:bg-champagne/[0.02] cursor-pointer transition-colors group">
                  <input
                    type="checkbox"
                    checked={selectedServices.includes(service.name)}
                    onChange={() => toggleService(service.name)}
                    className="w-4 h-4 rounded border-champagne/30 bg-transparent flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-ivory/80 text-sm font-sans group-hover:text-champagne transition-colors truncate">{service.name}</p>
                    <p className="text-ivory/30 text-xs font-sans mt-0.5">{service.duration}</p>
                  </div>
                  <p className="text-champagne text-sm font-sans font-medium whitespace-nowrap">{service.price}</p>
                </label>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Floating Booking Bar */}
        {selectedServices.length > 0 && (
          <div className="sticky bottom-4 mt-6 bg-charcoal border border-champagne/20 rounded-2xl p-4 sm:p-5 shadow-2xl shadow-black/50 backdrop-blur-xl z-40">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-ivory text-sm font-sans font-medium">{selectedServices.length} service{selectedServices.length > 1 ? 's' : ''} selected</p>
                <p className="text-champagne text-xs font-sans mt-0.5">Estimated: {calculateTotal()} AED</p>
              </div>
              <button onClick={onBookClick} className="btn-luxury px-6 py-3 rounded-full text-[10px]">
                Continue Booking
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// ==================== INSTAGRAM SECTION ====================
const InstagramSection = () => {
  const posts = [
    { id: 'DTuWqL9Cmvt', caption: 'The Aesthetics of Dukes of Beauty' },
    { id: 'DQ8di2OER4W', caption: 'A new-generation salon in Business Bay' },
    { id: 'DcLNnpbq-pt', caption: 'A place where you\'ll want to stay a little longer' },
    { id: 'Db7onQ8qser', caption: 'Beautiful hair & exceptional service' },
    { id: 'DQhFNROig67', caption: 'Chocolate-tone French manicure' },
    { id: 'DO5dCuQivVf', caption: 'Treatments are more than results' },
  ];

  return (
    <section id="instagram" className="py-20 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-px bg-champagne"></span>
              <span className="text-champagne text-[10px] tracking-[0.3em] uppercase font-sans">Instagram</span>
              <span className="w-8 h-px bg-champagne"></span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-ivory">
              Follow Our <span className="italic text-champagne">Beauty Journey</span>
            </h2>
            <p className="mt-4 text-ivory/40 text-sm sm:text-base font-sans max-w-lg mx-auto">
              Daily inspiration, transformations, and behind-the-scenes moments.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {posts.map((post, index) => (
            <Reveal key={index} delay={index * 80}>
              <a
                href={`https://www.instagram.com/p/${post.id}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="card-luxury group relative aspect-square rounded-xl overflow-hidden bg-charcoal/50 border border-champagne/10"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <i className="fab fa-instagram text-champagne/30 text-3xl sm:text-4xl mb-3 group-hover:text-champagne/60 transition-colors"></i>
                  <p className="text-ivory/30 text-[10px] sm:text-xs font-sans leading-relaxed line-clamp-2 group-hover:text-ivory/60 transition-colors">
                    {post.caption}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-champagne/40 group-hover:text-champagne transition-colors">
                    <span className="text-[9px] font-sans tracking-wider uppercase">View Post</span>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="text-center mt-10">
            <a
              href="https://www.instagram.com/dukes_of_beauty.ae/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex items-center gap-2 px-6 py-3 rounded-full"
            >
              <i className="fab fa-instagram"></i>
              Follow @dukes_of_beauty.ae
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// ==================== GALLERY ====================
const GallerySection = () => (
  <section id="gallery" className="py-20 sm:py-32 relative">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <Reveal>
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-champagne"></span>
            <span className="text-champagne text-[10px] tracking-[0.3em] uppercase font-sans">Gallery</span>
            <span className="w-8 h-px bg-champagne"></span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-ivory">
            Our <span className="italic text-champagne">Salon</span>
          </h2>
          <p className="mt-4 text-ivory/40 text-sm sm:text-base font-sans max-w-lg mx-auto">
            View authentic photos of our salon on Google Maps.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="text-center">
          <a
            href="https://www.google.com/maps/place/?q=place_id:ChIJQw1xKtxpXz4R5ZcIoAWMGdE"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2 px-6 py-3 rounded-full"
          >
            <i className="fas fa-images"></i>
            View Photos on Google Maps
          </a>
          <p className="mt-4 text-ivory/30 text-xs font-sans">
            Interior, treatments, beauty services & more
          </p>
        </div>
      </Reveal>
    </div>
  </section>
);

// ==================== REVIEWS ====================
const ReviewsSection = () => (
  <section id="reviews" className="py-20 sm:py-32 relative">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <Reveal>
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-champagne"></span>
            <span className="text-champagne text-[10px] tracking-[0.3em] uppercase font-sans">Testimonials</span>
            <span className="w-8 h-px bg-champagne"></span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-ivory">
            Client <span className="italic text-champagne">Reviews</span>
          </h2>
        </div>
      </Reveal>

      <Reveal>
        <div className="max-w-3xl mx-auto">
          <div className="bg-charcoal/30 border border-champagne/10 rounded-3xl p-8 sm:p-12 text-center">
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-champagne fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
              ))}
            </div>
            <p className="font-serif text-5xl sm:text-6xl md:text-7xl text-champagne font-light">4.9</p>
            <p className="text-ivory/50 text-sm font-sans mt-2">Based on Google Reviews</p>
            
            <div className="mt-8 pt-8 border-t border-champagne/10">
              <p className="text-ivory/60 text-sm sm:text-base font-sans leading-relaxed max-w-md mx-auto">
                Read authentic reviews from our valued clients. See what they say about our services, team, and salon experience.
              </p>
              <a
                href="https://www.google.com/maps/place/?q=place_id:ChIJQw1xKtxpXz4R5ZcIoAWMGdE"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-luxury inline-flex items-center gap-2 px-6 py-3 rounded-full mt-6"
              >
                <i className="fab fa-google"></i>
                View on Google
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

// ==================== CONTACT ====================
const ContactSection = () => (
  <section id="contact" className="py-20 sm:py-32 relative">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <Reveal>
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-champagne"></span>
            <span className="text-champagne text-[10px] tracking-[0.3em] uppercase font-sans">Contact</span>
            <span className="w-8 h-px bg-champagne"></span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-ivory">
            Visit <span className="italic text-champagne">Us</span>
          </h2>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <Reveal>
          <div className="bg-charcoal/30 border border-champagne/10 rounded-2xl p-6 sm:p-8 h-full">
            <div className="w-12 h-12 rounded-full bg-champagne/10 border border-champagne/20 flex items-center justify-center mb-5">
              <i className="fas fa-map-marker-alt text-champagne"></i>
            </div>
            <h3 className="font-serif text-lg text-ivory mb-3">Location</h3>
            <p className="text-ivory/50 text-sm font-sans leading-relaxed">
              Shop No. 1-Retail, 15 Northside,<br />
              Marasi Dr., Business Bay,<br />
              Dubai, UAE
            </p>
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJQw1xKtxpXz4R5ZcIoAWMGdE" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 text-champagne text-xs font-sans tracking-wide uppercase hover:text-champagne-light transition-colors">
              Get Directions <i className="fas fa-arrow-right text-[10px]"></i>
            </a>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="bg-charcoal/30 border border-champagne/10 rounded-2xl p-6 sm:p-8 h-full">
            <div className="w-12 h-12 rounded-full bg-champagne/10 border border-champagne/20 flex items-center justify-center mb-5">
              <i className="fas fa-clock text-champagne"></i>
            </div>
            <h3 className="font-serif text-lg text-ivory mb-3">Hours</h3>
            <p className="text-ivory/50 text-sm font-sans leading-relaxed">
              Monday – Sunday<br />
              10:00 AM – 10:00 PM
            </p>
            <p className="text-ivory/30 text-xs font-sans mt-3">Open 7 days a week</p>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="bg-charcoal/30 border border-champagne/10 rounded-2xl p-6 sm:p-8 h-full">
            <div className="w-12 h-12 rounded-full bg-champagne/10 border border-champagne/20 flex items-center justify-center mb-5">
              <i className="fas fa-phone text-champagne"></i>
            </div>
            <h3 className="font-serif text-lg text-ivory mb-3">Connect</h3>
            <div className="space-y-3">
              <a href="tel:+971528167306" className="flex items-center gap-3 text-ivory/50 text-sm font-sans hover:text-champagne transition-colors">
                <i className="fas fa-phone text-xs text-champagne/60"></i>
                +971 52 816 7306
              </a>
              <a href="https://wa.me/971528167306" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-ivory/50 text-sm font-sans hover:text-green-400 transition-colors">
                <i className="fab fa-whatsapp text-xs"></i>
                WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

// ==================== FOOTER ====================
const Footer = () => (
  <footer className="border-t border-champagne/10 py-10 sm:py-14">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <Logo size="md" />
        
        <div className="flex items-center gap-6">
          <a href="https://www.instagram.com/dukes_of_beauty.ae/" target="_blank" rel="noopener noreferrer" className="text-ivory/40 hover:text-champagne transition-colors">
            <i className="fab fa-instagram text-lg"></i>
          </a>
          <a href="https://wa.me/971528167306" target="_blank" rel="noopener noreferrer" className="text-ivory/40 hover:text-green-400 transition-colors">
            <i className="fab fa-whatsapp text-lg"></i>
          </a>
          <a href="tel:+971528167306" className="text-ivory/40 hover:text-champagne transition-colors">
            <i className="fas fa-phone text-lg"></i>
          </a>
        </div>

        <p className="text-ivory/20 text-xs font-sans">© 2024 Dukes of Beauty. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

// ==================== WHATSAPP BADGE ====================
const WhatsAppBadge = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 2000); return () => clearTimeout(t); }, []);
  if (!visible) return null;
  return (
    <a href="https://wa.me/971528167306" target="_blank" rel="noopener noreferrer" className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/20 hover:bg-green-600 hover:scale-110 transition-all animate-scale-in" title="Chat on WhatsApp">
      <i className="fab fa-whatsapp text-white text-2xl"></i>
    </a>
  );
};

// ==================== BOOKING SYSTEM ====================
type BookingState = { step: number; selectedServices: string[]; selectedDate: string; selectedTime: string; customerName: string; customerPhone: string; };
type BookedSlot = { date: string; time: string; customerName: string; timestamp: number; };

const getBookedSlots = (): BookedSlot[] => {
  try { const stored = localStorage.getItem('dukes_booked_slots'); return stored ? JSON.parse(stored) : []; } catch { return []; }
};

const saveBookedSlot = (slot: BookedSlot) => {
  const slots = getBookedSlots();
  slots.push(slot);
  localStorage.setItem('dukes_booked_slots', JSON.stringify(slots));
};

const isSlotBooked = (date: string, time: string): boolean => {
  const slots = getBookedSlots();
  return slots.some(slot => slot.date === date && slot.time === time);
};

const BookingModal = ({ isOpen, onClose, preSelectedServices = [] }: { isOpen: boolean; onClose: () => void; preSelectedServices?: string[] }) => {
  const [booking, setBooking] = useState<BookingState>({ step: 1, selectedServices: [], selectedDate: '', selectedTime: '', customerName: '', customerPhone: '' });

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setBooking({ step: 1, selectedServices: [], selectedDate: '', selectedTime: '', customerName: '', customerPhone: '' });
    } else if (preSelectedServices.length > 0) {
      setBooking(prev => ({ ...prev, selectedServices: preSelectedServices }));
    }
  }, [isOpen, preSelectedServices]);

  if (!isOpen) return null;

  const allServices = serviceCategories.flatMap(cat => cat.services.map(s => ({ ...s, category: cat.title })));

  const toggleService = (serviceName: string) => {
    setBooking(prev => ({ ...prev, selectedServices: prev.selectedServices.includes(serviceName) ? prev.selectedServices.filter(s => s !== serviceName) : [...prev.selectedServices, serviceName] }));
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 10; hour < 22; hour++) {
      for (let min = 0; min < 60; min += 30) {
        slots.push(`${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`);
      }
    }
    return slots;
  };

  const getMinDate = () => new Date().toISOString().split('T')[0];

  const calculateTotalDuration = () => {
    let totalMinutes = 0;
    booking.selectedServices.forEach(serviceName => {
      const service = allServices.find(s => s.name === serviceName);
      if (service) {
        const duration = service.duration;
        if (duration.includes('h')) {
          const hours = parseInt(duration.match(/(\d+)h/)?.[1] || '0');
          const mins = parseInt(duration.match(/(\d+)min/)?.[1] || '0');
          totalMinutes += (hours * 60) + mins;
        } else if (duration.includes('min')) {
          totalMinutes += parseInt(duration.match(/(\d+)min/)?.[1] || '0');
        }
      }
    });
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    return hours > 0 ? `${hours}h ${mins > 0 ? mins + 'min' : ''}` : `${mins}min`;
  };

  const calculateTotalPrice = () => {
    let total = 0;
    booking.selectedServices.forEach(serviceName => {
      const service = allServices.find(s => s.name === serviceName);
      if (service) {
        const priceMatch = service.price.match(/(\d+)/);
        if (priceMatch) total += parseInt(priceMatch[1]);
      }
    });
    return total;
  };

  const handleWhatsAppBooking = () => {
    const services = booking.selectedServices.join(', ');
    const totalDuration = calculateTotalDuration();
    const totalPrice = calculateTotalPrice();
    const message = `✨ *New Booking — Dukes of Beauty*\n\n*Customer:*\n${booking.customerName}\n${booking.customerPhone}\n\n*Appointment:*\n📅 ${booking.selectedDate}\n🕐 ${booking.selectedTime}\n⏱ ${totalDuration}\n\n*Services:*\n${services}\n\n*Est. Total:* ${totalPrice} AED\n\nPlease confirm. Thank you!`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/971528167306?text=${encodedMessage}`;
    saveBookedSlot({ date: booking.selectedDate, time: booking.selectedTime, customerName: booking.customerName, timestamp: Date.now() });
    window.open(whatsappURL, '_blank');
    onClose();
  };

  const canProceed = () => {
    if (booking.step === 1) return booking.selectedServices.length > 0;
    if (booking.step === 2) return booking.selectedDate && booking.selectedTime;
    if (booking.step === 3) return booking.customerName && booking.customerPhone;
    return false;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-obsidian/80 backdrop-blur-sm"></div>
      <div className="relative w-full sm:max-w-2xl bg-charcoal border border-champagne/10 rounded-t-3xl sm:rounded-2xl max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()} style={{ animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
        <div className="p-5 sm:p-6 border-b border-champagne/10 flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-ivory">Reserve Your Visit</h3>
              <p className="text-ivory/40 text-xs font-sans mt-0.5">Step {booking.step} of 3</p>
            </div>
            <button onClick={onClose} className="text-ivory/30 hover:text-ivory transition-colors p-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></svg>
            </button>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3].map(step => (<div key={step} className={`flex-1 h-0.5 rounded-full transition-all ${step <= booking.step ? 'bg-champagne' : 'bg-champagne/10'}`}></div>))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          {booking.step === 1 && (
            <div>
              <p className="text-ivory/50 text-sm font-sans mb-4">Select your treatments:</p>
              <div className="space-y-5">
                {serviceCategories.map(category => (
                  <div key={category.id}>
                    <h4 className="text-champagne text-[10px] font-sans tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
                      <span>{category.icon}</span> {category.title}
                    </h4>
                    <div className="space-y-0.5">
                      {category.services.map(service => (
                        <label key={service.name} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-champagne/[0.03] cursor-pointer transition-colors">
                          <input type="checkbox" checked={booking.selectedServices.includes(service.name)} onChange={() => toggleService(service.name)} className="w-4 h-4 rounded border-champagne/30 bg-transparent flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-ivory/80 text-sm font-sans truncate">{service.name}</p>
                            <p className="text-ivory/30 text-xs font-sans">{service.duration}</p>
                          </div>
                          <p className="text-champagne text-xs font-sans font-medium whitespace-nowrap">{service.price}</p>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {booking.step === 2 && (
            <div>
              <p className="text-ivory/50 text-sm font-sans mb-4">Choose your preferred date & time:</p>
              <div className="mb-6">
                <label className="text-champagne text-[10px] font-sans tracking-[0.2em] uppercase mb-2 block">Date</label>
                <input type="date" min={getMinDate()} value={booking.selectedDate} onChange={(e) => setBooking(prev => ({ ...prev, selectedDate: e.target.value, selectedTime: '' }))} className="w-full px-4 py-3 bg-obsidian border border-champagne/20 rounded-lg text-ivory font-sans text-sm focus:border-champagne/50" />
              </div>
              {booking.selectedDate && (
                <div>
                  <label className="text-champagne text-[10px] font-sans tracking-[0.2em] uppercase mb-2 block">Time</label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {generateTimeSlots().map(time => {
                      const booked = isSlotBooked(booking.selectedDate, time);
                      return (
                        <button key={time} disabled={booked} onClick={() => setBooking(prev => ({ ...prev, selectedTime: time }))} className={`px-3 py-2.5 rounded-lg text-xs font-sans transition-all ${booked ? 'bg-red-500/10 border border-red-500/20 text-red-400/50 cursor-not-allowed line-through' : booking.selectedTime === time ? 'bg-champagne text-obsidian font-medium' : 'bg-obsidian border border-champagne/10 text-ivory/60 hover:border-champagne/30'}`}>
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {booking.step === 3 && (
            <div>
              <p className="text-ivory/50 text-sm font-sans mb-4">Your details:</p>
              <div className="space-y-4">
                <div>
                  <label className="text-champagne text-[10px] font-sans tracking-[0.2em] uppercase mb-2 block">Name</label>
                  <input type="text" value={booking.customerName} onChange={(e) => setBooking(prev => ({ ...prev, customerName: e.target.value }))} placeholder="Your name" className="w-full px-4 py-3 bg-obsidian border border-champagne/20 rounded-lg text-ivory font-sans text-sm placeholder:text-ivory/20 focus:border-champagne/50" />
                </div>
                <div>
                  <label className="text-champagne text-[10px] font-sans tracking-[0.2em] uppercase mb-2 block">Phone</label>
                  <input type="tel" value={booking.customerPhone} onChange={(e) => setBooking(prev => ({ ...prev, customerPhone: e.target.value }))} placeholder="+971 XX XXX XXXX" className="w-full px-4 py-3 bg-obsidian border border-champagne/20 rounded-lg text-ivory font-sans text-sm placeholder:text-ivory/20 focus:border-champagne/50" />
                </div>
              </div>
              <div className="mt-6 p-4 rounded-lg bg-obsidian border border-champagne/10">
                <h4 className="text-champagne text-[10px] font-sans tracking-[0.2em] uppercase mb-3">Summary</h4>
                <div className="space-y-2 text-sm font-sans">
                  <div className="flex justify-between"><span className="text-ivory/40">Services:</span><span className="text-ivory/80">{booking.selectedServices.length}</span></div>
                  <div className="flex justify-between"><span className="text-ivory/40">Date:</span><span className="text-ivory/80">{booking.selectedDate}</span></div>
                  <div className="flex justify-between"><span className="text-ivory/40">Time:</span><span className="text-ivory/80">{booking.selectedTime}</span></div>
                  <div className="flex justify-between"><span className="text-ivory/40">Duration:</span><span className="text-ivory/80">{calculateTotalDuration()}</span></div>
                  <div className="flex justify-between pt-2 border-t border-champagne/10"><span className="text-champagne font-medium">Total:</span><span className="text-champagne font-medium">{calculateTotalPrice()} AED</span></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-5 sm:p-6 border-t border-champagne/10 flex-shrink-0">
          <div className="flex gap-3">
            {booking.step > 1 && (
              <button onClick={() => setBooking(prev => ({ ...prev, step: prev.step - 1 }))} className="btn-outline px-6 py-3 rounded-full">Back</button>
            )}
            <button disabled={!canProceed()} onClick={() => { if (booking.step < 3) { setBooking(prev => ({ ...prev, step: prev.step + 1 })); } else { handleWhatsAppBooking(); } }} className="btn-luxury flex-1 py-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed">
              {booking.step === 3 ? 'Confirm & Send' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== MAIN APP ====================
export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-obsidian text-ivory">
      <Navigation onBookClick={() => setBookingOpen(true)} />
      <HeroSection onBookClick={() => setBookingOpen(true)} />
      <div className="section-divider"></div>
      <AboutSection />
      <div className="section-divider"></div>
      <ServicesSection onBookClick={() => setBookingOpen(true)} selectedServices={selectedServices} setSelectedServices={setSelectedServices} />
      <div className="section-divider"></div>
      <InstagramSection />
      <div className="section-divider"></div>
      <GallerySection />
      <div className="section-divider"></div>
      <ReviewsSection />
      <div className="section-divider"></div>
      <ContactSection />
      <Footer />
      <WhatsAppBadge />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} preSelectedServices={selectedServices} />
    </div>
  );
}
