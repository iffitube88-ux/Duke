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
              <button onClick={onBookClick} className="btn-luxury btn-luxury-sm">Book Now</button>
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
              <button onClick={() => { setMobileOpen(false); onBookClick(); }} className="btn-luxury w-full mt-4">Book Appointment</button>
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
    <section className="relative h-[70vh] sm:h-[75vh] md:h-[85vh] lg:h-[90vh] flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://i.imgur.com/pFDeBJV_d.webp?maxwidth=760&fidelity=grand"
          alt="Dukes of Beauty - Luxury Salon Interior"
          className={`absolute inset-0 w-full h-full object-cover object-center ${loaded ? 'animate-ken-burns' : 'opacity-0'}`}
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        <div className="absolute inset-0 hero-overlay"></div>
      </div>

      <div className="relative z-10 w-full container-luxury pb-16 sm:pb-20 md:pb-24 lg:pb-32 pt-24 sm:pt-28 md:pt-32">
        <div className="max-w-3xl">
          {/* Location tag */}
          <div className={`transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <span className="w-12 h-px bg-champagne"></span>
              <span className="text-champagne text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-sans">Business Bay · Dubai</span>
            </div>
          </div>

          {/* Main headline */}
          <h1 className={`hero-title font-serif text-[2.5rem] sm:text-6xl md:text-7xl lg:text-8xl font-light text-ivory leading-[0.95] tracking-tight transition-all duration-1000 delay-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            The Art of<br />
            <span className="animate-shimmer italic">Beauty</span>
          </h1>

          {/* Subtitle */}
          <p className={`mt-6 sm:mt-8 md:mt-10 text-ivory/70 text-base sm:text-lg font-sans font-light leading-relaxed max-w-lg transition-all duration-1000 delay-900 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            A sanctuary of luxury where precision meets artistry. Premium hair, nails, aesthetics & wellness in the heart of Dubai.
          </p>

          {/* CTAs */}
          <div className={`mt-8 sm:mt-10 md:mt-12 flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <button onClick={onBookClick} className="btn-luxury">
              Reserve Your Visit
            </button>
            <a href="#services" className="btn-outline">
              View Services
            </a>
          </div>

          {/* Small trust indicator */}
          <div className={`mt-12 sm:mt-14 md:mt-16 transition-all duration-1000 delay-[1200ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3 h-3 text-champagne fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                ))}
              </div>
              <span className="text-ivory/50 text-[11px] font-sans tracking-wide">4.9 · Google</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==================== ABOUT SECTION ====================
const AboutSection = () => (
  <section className="section-spacing relative">
    <div className="container-luxury">
      <Reveal>
        <div className="text-center max-w-[820px] mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="w-12 h-px bg-champagne"></span>
            <span className="text-champagne text-[11px] tracking-[0.3em] uppercase font-sans">About</span>
            <span className="w-12 h-px bg-champagne"></span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-ivory leading-tight mb-10">
            Where Luxury<br />Meets <span className="italic text-champagne">Expertise</span>
          </h2>
          <div className="space-y-6">
            <p className="text-ivory/70 text-base sm:text-lg font-sans leading-relaxed">
              Dukes of Beauty is more than a salon — it is a destination for those who appreciate the finest things. Located in the prestigious Business Bay, our atelier combines world-class techniques with premium products from K18, Tokio Inkarami, Nashi, and Kevin Murphy.
            </p>
            <p className="text-ivory/70 text-base sm:text-lg font-sans leading-relaxed">
              From synchronized 4-hand and 6-hand treatments to advanced HydraFacial Syndeo protocols, every service is designed to deliver an unparalleled experience.
            </p>
          </div>
        </div>
      </Reveal>
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
    <section id="services" className="section-spacing relative">
      <div className="container-luxury">
        <Reveal>
          <div className="text-center mb-16 sm:mb-20">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-12 h-px bg-champagne"></span>
              <span className="text-champagne text-[11px] tracking-[0.3em] uppercase font-sans">Treatment Menu</span>
              <span className="w-12 h-px bg-champagne"></span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-ivory leading-tight">
              Our <span className="italic text-champagne">Services</span>
            </h2>
            <p className="mt-6 text-ivory/60 text-base sm:text-lg font-sans max-w-2xl mx-auto leading-relaxed">
              Discover our comprehensive range of premium beauty treatments. All prices in AED.
            </p>
          </div>
        </Reveal>

        <Reveal>
          {/* Category Navigation - Liquid Glass */}
          <div className="mb-12 sm:mb-16">
            <div className="flex overflow-x-auto gap-3 pb-3 scrollbar-hide">
              {serviceCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`category-tab flex-shrink-0 rounded-xl font-sans transition-all whitespace-nowrap ${
                    activeTab === cat.id
                      ? 'category-tab-active text-champagne font-medium'
                      : 'text-ivory/70 hover:text-ivory/90'
                  }`}
                >
                  <span className="mr-2 text-lg">{cat.icon}</span>
                  <span className="text-[15px]">{cat.title}</span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Services Catalog */}
        <Reveal>
          <div className="mb-8">
            <div className="mb-10 pb-6 border-b border-champagne/10">
              <h3 className="font-serif text-3xl sm:text-4xl text-ivory flex items-center gap-3">
                <span className="text-3xl sm:text-4xl">{activeCategory.icon}</span>
                {activeCategory.title}
              </h3>
              <p className="text-ivory/50 text-sm font-sans mt-3">{activeCategory.services.length} treatments available</p>
            </div>

            {/* Service list with glass effect */}
            <div className="space-y-3">
              {activeCategory.services.map((service, i) => {
                const isSelected = selectedServices.includes(service.name);
                return (
                  <div
                    key={i}
                    onClick={() => toggleService(service.name)}
                    className={`service-row rounded-xl cursor-pointer flex items-center gap-4 ${
                      isSelected ? 'service-row-selected' : ''
                    }`}
                  >
                    {/* Left: Service info */}
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-serif text-lg sm:text-xl transition-colors leading-snug ${
                        isSelected ? 'text-champagne' : 'text-ivory/90 group-hover:text-ivory'
                      }`}>
                        {service.name}
                      </h4>
                      <p className="text-ivory/50 text-sm font-sans mt-1">
                        {service.duration}
                      </p>
                    </div>

                    {/* Right: Price + Checkbox */}
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <p className={`font-sans text-base sm:text-lg font-semibold whitespace-nowrap ${
                        isSelected ? 'text-champagne' : 'text-ivory/80'
                      }`}>
                        {service.price}
                      </p>
                      <div className={`custom-checkbox ${isSelected ? 'custom-checkbox-checked' : ''}`}>
                        {isSelected && (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C8AD83" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Floating Booking Bar */}
        {selectedServices.length > 0 && (
          <div className="sticky bottom-6 mt-8 booking-modal rounded-2xl p-6 z-40">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-ivory text-lg font-sans font-medium">{selectedServices.length} service{selectedServices.length > 1 ? 's' : ''} selected</p>
                <p className="text-champagne text-base font-sans font-semibold mt-1">Estimated total: {calculateTotal()} AED</p>
              </div>
              <button onClick={onBookClick} className="btn-luxury">
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Real Instagram post IDs from @dukes_of_beauty.ae
  const instagramPosts = [
    { id: 'DTuWqL9Cmvt', type: 'image' as const },
    { id: 'DQ8di2OER4W', type: 'image' as const },
    { id: 'DcLNnpbq-pt', type: 'image' as const },
    { id: 'Db7onQ8qser', type: 'video' as const },
    { id: 'DQhFNROig67', type: 'image' as const },
    { id: 'DO5dCuQivVf', type: 'video' as const },
  ];

  const totalSlides = instagramPosts.length;
  const minSlide = 0;
  const maxSlide = totalSlides - 1;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= maxSlide ? minSlide : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev <= minSlide ? maxSlide : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide();
    }
    if (touchStart - touchEnd < -75) {
      prevSlide();
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  };

  // Calculate visible slides based on screen size
  const getVisibleSlides = () => {
    if (typeof window === 'undefined') return 1;
    if (window.innerWidth >= 1024) return 3; // Desktop
    if (window.innerWidth >= 640) return 2; // Tablet
    return 1; // Mobile
  };

  const visibleSlides = getVisibleSlides();
  const slideWidth = 100 / visibleSlides;

  return (
    <section id="instagram" className="section-spacing relative overflow-hidden">
      <div className="container-luxury">
        <Reveal>
          <div className="text-center mb-12 sm:mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-12 h-px bg-champagne"></span>
              <span className="text-champagne text-[11px] tracking-[0.3em] uppercase font-sans">Instagram</span>
              <span className="w-12 h-px bg-champagne"></span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-ivory leading-tight">
              Follow Our <span className="italic text-champagne">Beauty Journey</span>
            </h2>
            <p className="mt-6 text-ivory/60 text-base sm:text-lg font-sans max-w-2xl mx-auto leading-relaxed">
              Real transformations and daily inspiration from @dukes_of_beauty.ae
            </p>
          </div>
        </Reveal>

        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-charcoal/80 border border-champagne/20 flex items-center justify-center hover:bg-charcoal hover:border-champagne/40 transition-all group"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6 text-champagne group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-charcoal/80 border border-champagne/20 flex items-center justify-center hover:bg-charcoal hover:border-champagne/40 transition-all group"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6 text-champagne group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Carousel Track */}
          <div
            className="overflow-hidden rounded-xl"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * slideWidth}%)` }}
            >
              {instagramPosts.map((post, index) => (
                <div
                  key={post.id}
                  className="flex-shrink-0 px-2 sm:px-3"
                  style={{ width: `${slideWidth}%` }}
                >
                  <div className="aspect-square bg-charcoal/30 border border-champagne/10 rounded-lg overflow-hidden group hover:border-champagne/30 transition-all">
                    <a
                      href={`https://www.instagram.com/p/${post.id}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative w-full h-full block"
                    >
                      <iframe
                        src={`https://www.instagram.com/p/${post.id}/embed`}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        scrolling="no"
                        allowFullScreen
                        title={`Instagram post ${post.id}`}
                        className="w-full h-full"
                        style={{ border: 'none', overflow: 'hidden' }}
                        loading="lazy"
                      />
                      
                      {/* Overlay with Instagram icon */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <div className="flex items-center gap-2 text-white">
                          <i className="fab fa-instagram text-xl"></i>
                          <span className="text-sm font-sans">View on Instagram</span>
                        </div>
                      </div>

                      {/* Video indicator */}
                      {post.type === 'video' && (
                        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      )}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: Math.ceil(totalSlides / visibleSlides) }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index * visibleSlides)}
                className={`transition-all ${
                  Math.floor(currentSlide / visibleSlides) === index
                    ? 'w-8 h-2 bg-champagne'
                    : 'w-2 h-2 bg-champagne/30 hover:bg-champagne/50'
                } rounded-full`}
                aria-label={`Go to slide group ${index + 1}`}
              />
            ))}
          </div>

          {/* Slide Counter */}
          <div className="text-center mt-4">
            <span className="text-ivory/40 text-sm font-sans">
              {String(currentSlide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
            </span>
          </div>
        </div>

        <Reveal>
          <div className="text-center mt-12">
            <a
              href="https://www.instagram.com/dukes_of_beauty.ae/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury inline-flex items-center gap-3"
            >
              <i className="fab fa-instagram text-lg"></i>
              Follow @dukes_of_beauty.ae
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// ==================== GALLERY ====================
const GallerySection = () => {
  // Real photos from Google Maps / Customer reviews
  const galleryPhotos = [
    {
      url: 'https://lh3.googleusercontent.com/grass-cs/AABkmLepqXC8WfGKqv2OiIwBa47A1_Vutpvq6CpuhI1YmJelex6kFpD-2_BQze6jf_vCNQ37J12SRUBsPKFCSq1zJH49Gbs-NiMLekysbDvj7-jD1yKY2RonGYrB5V60U2YZ5eo10BV7ms9cyX2v=w408-h272-k-no',
      alt: 'Dukes of Beauty Salon Interior',
      tall: true,
    },
    {
      url: 'https://lh3.googleusercontent.com/grass-cs/AABkmLe1lghQhDEox6l1AiBB6bQCE5edZLx74Y-uYMjvRLdQlXLZDy78GAjENWWNGjHXomqRFacbee8Gq7SfIi6FceJuEG0ka417s3QawyhHy5EqVknbU8qqjgVzyT_FlrB6fdXc-ZZibMkgvA4=w300-h225-p-k-no',
      alt: 'Classic nude gel manicure',
      tall: false,
    },
    {
      url: 'https://lh3.googleusercontent.com/grass-cs/AABkmLdxn7fDMixNP4QwrmWHMxY7pucYYxcNwpN1fWUD5GCLpdGtDNS1FoDt1-AdGCBYzqVPd1vWLXcU_NR8_Rw2cg02384HU2az_qcqhP7yUWuZiILVgebdqykC3BxfXPKKJvEbOY9dEc9Pkjp0=w300-h225-p-k-no',
      alt: 'Dark polish pedicure',
      tall: true,
    },
    {
      url: 'https://lh3.googleusercontent.com/grass-cs/AABkmLdbamwjCV8eFXHQUaF3JZ9LqRjniGMocwNkgkJjJ8ZLWmoKn0Z-aDyHmXBZ9mWPfDp_SXODTdzm4SWOCGbhDBikXnoZw-huMXwjJO9SE9qevoU8yJiQiWbEa15JLTyAWh4QmvBLAESPzogV=w300-h225-p-k-no',
      alt: 'Pedicure polish palette',
      tall: false,
    },
    {
      url: 'https://lh3.googleusercontent.com/grass-cs/AABkmLdUHFf6d-RfR9HUylEsHuad15y4HImeHgRiheo5YJsnwXWdl5FQ3eeBuj-a9u6OyGS-_Z9xK-t4OTYswDwYRDB7VdC7Y48ClKnfqWGqbaIUQNquBLLWEwNskAMZHWXgLFsRB_y-9IYfa68=w300-h225-p-k-no',
      alt: 'Salon treatment area',
      tall: true,
    },
    {
      url: 'https://lh3.googleusercontent.com/grass-cs/AABkmLd0HqNDBhLoZ2BuWfMIuLeWhL-0c7rAwjioX3aT6uoaY9Fy63IVhWvsEL63PVnfK5jTWh3f1bFBeFXQsahPcH5XIuc-dWFYJu4pwx-huHr-e2UwhjCDosS_wMmbK1MISrgaJ8u35NyK6k81=w300-h450-p-k-no',
      alt: 'Customer treatment result',
      tall: false,
    },
    {
      url: 'https://lh3.googleusercontent.com/grass-cs/AABkmLeu9Q5yXY6W7k5P3Eqff3oin_YEfMAKnVHvDYyTRb_112WIUHTDPKUrR59Zzx1rEVaUjsmZNwnBPzb1GBRkUlJEDLcBz6UbZ8KTA2IghxBPy0Nz35NiarqcAK_Au8I1HOt2cvYxWWOu7dc=w300-h225-p-k-no',
      alt: 'Salon service',
      tall: true,
    },
    {
      url: 'https://lh3.googleusercontent.com/grass-cs/AABkmLdZsjCK9S94u33uIbgN_6WOjIurnAiuVtKQEMKtUSBHttOGaXTTdGtGSO2M-eJRLYDZH1PFbwKjncF4LAiyY3vIJGNO5l-feWUyN6I8pb7tNVl2-ogmxM8kTuuSBFKW0YFz5WB5TmTkglvO=w300-h225-p-k-no',
      alt: 'Beauty treatment',
      tall: false,
    },
  ];

  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="section-spacing relative">
      <div className="container-luxury">
        <Reveal>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-12 h-px bg-champagne"></span>
              <span className="text-champagne text-[11px] tracking-[0.3em] uppercase font-sans">Gallery</span>
              <span className="w-12 h-px bg-champagne"></span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-ivory leading-tight">
              Our <span className="italic text-champagne">Salon</span>
            </h2>
            <p className="mt-6 text-ivory/60 text-base sm:text-lg font-sans max-w-2xl mx-auto">
              Real photographs from our salon and client experiences.
            </p>
          </div>
        </Reveal>

        {/* Photo Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
          {galleryPhotos.map((photo, index) => (
            <Reveal key={index} delay={index * 60}>
              <button
                onClick={() => setLightboxImage(photo.url)}
                className="break-inside-avoid rounded-xl overflow-hidden relative group cursor-pointer block w-full"
              >
                <img
                  src={photo.url}
                  alt={photo.alt}
                  className={`w-full object-cover img-luxury ${photo.tall ? 'h-64 sm:h-80 md:h-96' : 'h-48 sm:h-56 md:h-64'}`}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <i className="fas fa-expand text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity"></i>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        {/* View More on Google Maps */}
        <Reveal>
          <div className="text-center mt-12">
            <a
              href="https://www.google.com/maps/place/?q=place_id:ChIJQw1xKtxpXz4R5ZcIoAWMGdE"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm"
            >
              <i className="fab fa-google"></i>
              View All 244 Photos on Google Maps
            </a>
          </div>
        </Reveal>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/60 hover:text-white p-2"
            onClick={() => setLightboxImage(null)}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
          <img
            src={lightboxImage.replace(/=w\d+-h\d+/, '=w1200-h900')}
            alt="Salon photo"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

// ==================== REVIEWS ====================
// ==================== REVIEWS ====================
const ReviewsSection = () => {
  // Real reviews from Google Maps
  const reviews = [
    {
      name: 'Анастасия Ушакова',
      avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjXF4DKa4LbbSBvYAX9GWxmopsXfRRQpiShVJ5AkjMRXClcwix0=w36-h36-p-rp-mo-br100',
      rating: 5,
      time: '3 months ago',
      text: 'I visited Dukes of Beauty and everything was absolutely amazing. The staff, service, and overall experience were beyond excellent.',
      reviewCount: '7 reviews · 7 photos',
    },
    {
      name: 'Milena Klykova',
      avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjXO0UYtLoE7KW7rUXbASf8-WFNVoePBeTbk4inw21f3vyDiRP0I=w36-h36-p-rp-mo-ba12-br100',
      rating: 5,
      time: '4 months ago',
      text: 'Absolutely loved my experience at Dukes of Beauty 🤍 I came for a manicure and RSL massage, and everything was amazing from the start.',
      reviewCount: 'Local Guide · 23 reviews · 26 photos',
      ownerResponse: 'Thank you so much for your kind review 🤍✨ We\'re really happy you enjoyed your manicure and RSL massage!',
    },
    {
      name: 'Maria Egorova',
      avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjUukgdgeJselqljRC4uRfUo-80J1rd209YC7Mcbah-W7rT2OFqj=w36-h36-p-rp-mo-ba12-br100',
      rating: 3,
      time: '2 months ago',
      text: 'The staff is friendly and polite, the general level is good, comfortable chairs. Pedicure was fine and free neck massage was lovely.',
      reviewCount: 'Local Guide · 15 reviews · 3 photos',
    },
  ];

  const [activeReview, setActiveReview] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="reviews" className="section-spacing relative">
      <div className="container-luxury">
        <Reveal>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-12 h-px bg-champagne"></span>
              <span className="text-champagne text-[11px] tracking-[0.3em] uppercase font-sans">Testimonials</span>
              <span className="w-12 h-px bg-champagne"></span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-ivory leading-tight">
              Client <span className="italic text-champagne">Reviews</span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-12 max-w-4xl mx-auto">
            {/* Rating Summary */}
            <div className="text-center mb-12">
              <div className="flex justify-center gap-1.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-champagne fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                ))}
              </div>
              <p className="font-serif text-6xl sm:text-7xl text-champagne font-light leading-none">4.6</p>
              <p className="text-ivory/60 text-sm font-sans mt-3">Based on 107 Google Reviews</p>
            </div>

            {/* Review Carousel */}
            <div className="bg-charcoal/30 border border-champagne/10 rounded-2xl p-8 sm:p-12 min-h-[300px]">
              <div className="relative">
                {/* Review Card */}
                <div className="transition-all duration-500">
                  <div className="flex items-start gap-4 mb-6">
                    <img
                      src={reviews[activeReview].avatar}
                      alt={reviews[activeReview].name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-ivory text-base font-sans font-medium">{reviews[activeReview].name}</h4>
                      <p className="text-ivory/40 text-xs font-sans mt-0.5">{reviews[activeReview].reviewCount}</p>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(reviews[activeReview].rating)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-champagne fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                      ))}
                    </div>
                  </div>

                  <p className="text-ivory/80 text-base sm:text-lg font-sans leading-relaxed mb-4">
                    "{reviews[activeReview].text}"
                  </p>

                  <p className="text-ivory/40 text-xs font-sans">{reviews[activeReview].time}</p>

                  {/* Owner Response */}
                  {reviews[activeReview].ownerResponse && (
                    <div className="mt-6 pt-6 border-t border-champagne/10">
                      <p className="text-champagne text-xs font-sans font-medium mb-2">Response from the owner</p>
                      <p className="text-ivory/60 text-sm font-sans leading-relaxed">
                        {reviews[activeReview].ownerResponse}
                      </p>
                    </div>
                  )}
                </div>

                {/* Carousel Dots */}
                <div className="flex justify-center gap-2 mt-8">
                  {reviews.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveReview(i)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === activeReview ? 'bg-champagne w-8' : 'bg-ivory/20 hover:bg-ivory/40'
                      }`}
                      aria-label={`View review ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* View All Reviews */}
            <div className="text-center mt-10">
              <a
                href="https://www.google.com/maps/place/?q=place_id:ChIJQw1xKtxpXz4R5ZcIoAWMGdE"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm"
              >
                <i className="fab fa-google"></i>
                Read All 107 Reviews on Google
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// ==================== CONTACT ====================
const ContactSection = () => (
  <section id="contact" className="section-spacing relative">
    <div className="container-luxury">
      <Reveal>
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-12 h-px bg-champagne"></span>
            <span className="text-champagne text-[11px] tracking-[0.3em] uppercase font-sans">Contact</span>
            <span className="w-12 h-px bg-champagne"></span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-ivory leading-tight">
            Visit <span className="italic text-champagne">Us</span>
          </h2>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        <Reveal>
          <div className="text-center md:text-left">
            <div className="w-14 h-14 rounded-full bg-champagne/10 border border-champagne/20 flex items-center justify-center mb-6 mx-auto md:mx-0">
              <i className="fas fa-map-marker-alt text-champagne text-lg"></i>
            </div>
            <h3 className="font-serif text-2xl text-ivory mb-4">Location</h3>
            <p className="text-ivory/60 text-base font-sans leading-relaxed">
              Shop No. 1-Retail, 15 Northside,<br />
              Marasi Dr., Business Bay,<br />
              Dubai, UAE
            </p>
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJQw1xKtxpXz4R5ZcIoAWMGdE" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-6 text-champagne text-sm font-sans tracking-wide uppercase hover:text-champagne-light transition-colors">
              Get Directions <i className="fas fa-arrow-right text-xs"></i>
            </a>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="text-center md:text-left">
            <div className="w-14 h-14 rounded-full bg-champagne/10 border border-champagne/20 flex items-center justify-center mb-6 mx-auto md:mx-0">
              <i className="fas fa-clock text-champagne text-lg"></i>
            </div>
            <h3 className="font-serif text-2xl text-ivory mb-4">Hours</h3>
            <p className="text-ivory/60 text-base font-sans leading-relaxed">
              Monday – Sunday<br />
              10:00 AM – 10:00 PM
            </p>
            <p className="text-ivory/40 text-sm font-sans mt-4">Open 7 days a week</p>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="text-center md:text-left">
            <div className="w-14 h-14 rounded-full bg-champagne/10 border border-champagne/20 flex items-center justify-center mb-6 mx-auto md:mx-0">
              <i className="fas fa-phone text-champagne text-lg"></i>
            </div>
            <h3 className="font-serif text-2xl text-ivory mb-4">Connect</h3>
            <div className="space-y-4">
              <a href="tel:+971528167306" className="flex items-center gap-3 text-ivory/60 text-base font-sans hover:text-champagne transition-colors justify-center md:justify-start">
                <i className="fas fa-phone text-sm text-champagne/60"></i>
                +971 52 816 7306
              </a>
              <a href="https://wa.me/971528167306" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-ivory/60 text-base font-sans hover:text-green-400 transition-colors justify-center md:justify-start">
                <i className="fab fa-whatsapp text-sm"></i>
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
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-champagne/10 py-12 sm:py-16">
      <div className="container-luxury">
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

          <p className="text-ivory/20 text-xs font-sans">© {currentYear} Dukes of Beauty. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// ==================== WHATSAPP BADGE ====================
const WhatsAppBadge = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 2000); return () => clearTimeout(t); }, []);
  if (!visible) return null;
  return (
    <a 
      href="https://wa.me/971528167306" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/20 hover:bg-green-600 hover:scale-110 transition-all animate-scale-in" 
      title="Chat on WhatsApp"
    >
      <i className="fab fa-whatsapp text-white text-2xl"></i>
    </a>
  );
};

// ==================== CUSTOM CALENDAR COMPONENT ====================
const Calendar = ({ selectedDate, onDateSelect, minDate }: { selectedDate: string; onDateSelect: (date: string) => void; minDate: string }) => {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const date = selectedDate ? new Date(selectedDate) : new Date();
    return { year: date.getFullYear(), month: date.getMonth() };
  });

  const minDateObj = new Date(minDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysInMonth = new Date(currentMonth.year, currentMonth.month + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.year, currentMonth.month, 1).getDay();
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const prevMonth = () => {
    setCurrentMonth(prev => {
      const newMonth = prev.month - 1;
      if (newMonth < 0) return { year: prev.year - 1, month: 11 };
      return { year: prev.year, month: newMonth };
    });
  };

  const nextMonth = () => {
    setCurrentMonth(prev => {
      const newMonth = prev.month + 1;
      if (newMonth > 11) return { year: prev.year + 1, month: 0 };
      return { year: prev.year, month: newMonth };
    });
  };

  const isDateDisabled = (day: number) => {
    const date = new Date(currentMonth.year, currentMonth.month, day);
    date.setHours(0, 0, 0, 0);
    return date < minDateObj;
  };

  const isDateSelected = (day: number) => {
    if (!selectedDate) return false;
    const date = new Date(currentMonth.year, currentMonth.month, day);
    const selected = new Date(selectedDate);
    return date.toDateString() === selected.toDateString();
  };

  const handleDateClick = (day: number) => {
    if (isDateDisabled(day)) return;
    const date = new Date(currentMonth.year, currentMonth.month, day);
    const dateStr = date.toISOString().split('T')[0];
    onDateSelect(dateStr);
  };

  const canGoPrev = () => {
    const prevMonthDate = new Date(currentMonth.year, currentMonth.month - 1, 1);
    return prevMonthDate >= new Date(minDateObj.getFullYear(), minDateObj.getMonth(), 1);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + 'T00:00:00'); // Prevent UTC shift
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      timeZone: 'Asia/Dubai'
    };
    return date.toLocaleDateString('en-US', options);
  };

  const formatDisplayTime = (timeStr: string): string => {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  return (
    <div className="bg-obsidian border border-champagne/20 rounded-xl p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          disabled={!canGoPrev()}
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-champagne/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous month"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <h3 className="text-lg sm:text-xl font-serif text-ivory">
          {monthNames[currentMonth.month]} {currentMonth.year}
        </h3>
        <button
          onClick={nextMonth}
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-champagne/10 transition-colors"
          aria-label="Next month"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(day => (
          <div key={day} className="text-center text-[11px] sm:text-xs font-sans text-ivory/40 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for days before first day of month */}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square"></div>
        ))}
        
        {/* Days */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const disabled = isDateDisabled(day);
          const selected = isDateSelected(day);
          
          return (
            <button
              key={day}
              onClick={() => handleDateClick(day)}
              disabled={disabled}
              className={`aspect-square flex items-center justify-center rounded-lg text-sm sm:text-base font-sans transition-all min-w-[44px] min-h-[44px] ${
                disabled
                  ? 'text-ivory/20 cursor-not-allowed'
                  : selected
                  ? 'bg-champagne text-obsidian font-semibold'
                  : 'text-ivory/80 hover:bg-champagne/10'
              }`}
              aria-label={`${day} ${monthNames[currentMonth.month]} ${currentMonth.year}`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Selected date display */}
      {selectedDate && (
        <div className="mt-6 pt-4 border-t border-champagne/10">
          <p className="text-center text-sm font-sans text-champagne">
            {formatDate(selectedDate)}
          </p>
        </div>
      )}
    </div>
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
  const [showCalendar, setShowCalendar] = useState(false);
  const [activeCategory, setActiveCategory] = useState('hair');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setBooking({ step: 1, selectedServices: [], selectedDate: '', selectedTime: '', customerName: '', customerPhone: '' });
      setShowCalendar(false);
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
    let minTotal = 0;
    let maxTotal = 0;
    let hasVariable = false;
    
    booking.selectedServices.forEach(serviceName => {
      const service = allServices.find(s => s.name === serviceName);
      if (service) {
        // Check if price has a range (e.g., "900–1,500 AED")
        const rangeMatch = service.price.match(/([\d,]+)[–-]([\d,]+)\s*AED/i);
        if (rangeMatch) {
          hasVariable = true;
          const min = parseInt(rangeMatch[1].replace(/,/g, ''));
          const max = parseInt(rangeMatch[2].replace(/,/g, ''));
          minTotal += min;
          maxTotal += max;
        } else {
          // Single price or "from X AED"
          const priceMatch = service.price.match(/([\d,]+)\s*AED/i);
          if (priceMatch) {
            const price = parseInt(priceMatch[1].replace(/,/g, ''));
            if (service.price.toLowerCase().includes('from')) {
              hasVariable = true;
              minTotal += price;
              maxTotal += price * 1.5; // Estimate max as 1.5x for "from" prices
            } else {
              minTotal += price;
              maxTotal += price;
            }
          }
        }
      }
    });
    
    return { min: minTotal, max: maxTotal, hasVariable };
  };

  const formatWhatsAppDate = (dateStr: string): string => {
    if (!dateStr) return '';
    const date = new Date(dateStr + 'T00:00:00'); // Prevent UTC shift
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      timeZone: 'Asia/Dubai'
    };
    return date.toLocaleDateString('en-US', options);
  };

  const formatWhatsAppTime = (timeStr: string): string => {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const getServiceEmoji = (category: string): string => {
    const emojiMap: Record<string, string> = {
      'Hair': '✂️',
      'Nails': '💅',
      'Lashes & Brows': '👁️',
      'HydraFacial & Facials': '✨',
      'Cosmetology': '🔬',
      'Massage': '💆',
      'Body Treatments': '🧴'
    };
    return emojiMap[category] || '💎';
  };

  const handleWhatsAppBooking = () => {
    // Validation
    if (!booking.customerName.trim()) {
      alert('Please enter your name');
      return;
    }
    if (!booking.customerPhone.trim()) {
      alert('Please enter your phone number');
      return;
    }
    if (booking.selectedServices.length === 0) {
      alert('Please select at least one service');
      return;
    }

    // Format date and time
    const formattedDate = formatWhatsAppDate(booking.selectedDate);
    const formattedTime = formatWhatsAppTime(booking.selectedTime);
    const totalDuration = calculateTotalDuration();
    const priceInfo = calculateTotalPrice();
    const totalPriceText = priceInfo.min === priceInfo.max 
      ? `${priceInfo.min} AED`
      : `${priceInfo.min}–${priceInfo.max} AED`;

    // Check if any service has variable pricing
    const hasVariablePricing = priceInfo.hasVariable;

    // Build service breakdown
    const serviceLines = booking.selectedServices.map(serviceName => {
      const service = allServices.find(s => s.name === serviceName);
      if (!service) return '';
      const emoji = getServiceEmoji(service.category);
      const priceText = service.price.toLowerCase().includes('from') 
        ? `From ${service.price}` 
        : service.price;
      return `${emoji} ${service.name} — ${priceText}`;
    }).filter(line => line).join('\n');

    // Build message
    const message = `✨ *DUKES OF BEAUTY* ✨
💎 *NEW APPOINTMENT REQUEST*
━━━━━━━━━━━━━━━━━━

👤 *CUSTOMER DETAILS*
🧑 Name: ${booking.customerName}
📱 Mobile: ${booking.customerPhone}

📅 *APPOINTMENT DETAILS*
🗓️ Date: ${formattedDate}
🕙 Time: ${formattedTime}
⏳ Duration: ${totalDuration}

💇‍♀️ *SELECTED SERVICES*
${serviceLines}

━━━━━━━━━━━━━━━━━━
💰 *ESTIMATED TOTAL: AED ${totalPriceText}*
${hasVariablePricing ? '\n⚠️ _Final price subject to salon confirmation_' : ''}

📍 Dukes of Beauty
Business Bay, Dubai

📝 Kindly confirm the appointment availability.

⏳ Status: Pending Confirmation`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/971528167306?text=${encodedMessage}`;
    saveBookedSlot({ date: booking.selectedDate, time: booking.selectedTime, customerName: booking.customerName, timestamp: Date.now() });
    window.open(whatsappURL, '_blank');
    onClose();
  };

  const canProceed = () => {
    if (booking.step === 1) return booking.selectedServices.length > 0;
    if (booking.step === 2) return booking.selectedDate && booking.selectedTime;
    if (booking.step === 3) return booking.customerName.trim().length > 0 && booking.customerPhone.trim().length > 0;
    return false;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + 'T00:00:00'); // Prevent UTC shift
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      timeZone: 'Asia/Dubai'
    };
    return date.toLocaleDateString('en-US', options);
  };

  const formatDisplayTime = (timeStr: string): string => {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
  };



  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-obsidian/80 backdrop-blur-sm"></div>
      <div 
        className="booking-modal relative w-full sm:max-w-[760px] rounded-t-3xl sm:rounded-2xl max-h-[95dvh] sm:max-h-[88dvh] overflow-hidden flex flex-col" 
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
      >
        {/* Header */}
        <div className="booking-modal-content border-b border-champagne/10 flex-shrink-0 pb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl text-ivory">Reserve Your Visit</h3>
              <p className="text-ivory/50 text-sm font-sans mt-2">Step {booking.step} of 3</p>
            </div>
            <button 
              onClick={onClose} 
              className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-champagne/10 transition-colors text-ivory/50 hover:text-ivory"
              aria-label="Close booking modal"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3].map(step => (
              <div key={step} className={`flex-1 h-1.5 rounded-full transition-all ${step <= booking.step ? 'bg-champagne' : 'bg-champagne/10'}`}></div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto booking-modal-content">
          {booking.step === 1 && (
            <div>
              <p className="text-ivory/70 text-base font-sans mb-6">Select your treatments:</p>
              
              {/* Search Field */}
              <div className="mb-6">
                <div className="relative">
                  <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-ivory/40 text-lg"></i>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search services..."
                    className="search-field w-full pl-14 pr-5 rounded-xl text-ivory font-sans placeholder:text-ivory/30 transition-colors"
                  />
                </div>
              </div>

              {/* Category Tabs */}
              <div className="mb-6 overflow-x-auto scrollbar-hide">
                <div className="flex gap-3 pb-2">
                  {serviceCategories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`category-tab flex-shrink-0 rounded-xl font-sans transition-all whitespace-nowrap ${
                        activeCategory === cat.id
                          ? 'category-tab-active text-champagne font-medium'
                          : 'text-ivory/70 hover:text-ivory/90'
                      }`}
                    >
                      <span className="mr-2 text-lg">{cat.icon}</span>
                      <span>{cat.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Service List */}
              <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2">
                {serviceCategories
                  .find(cat => cat.id === activeCategory)
                  ?.services.filter(service => 
                    !searchQuery || 
                    service.name.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map(service => (
                    <div 
                      key={service.name} 
                      className={`service-row rounded-xl cursor-pointer flex items-center gap-4 ${
                        booking.selectedServices.includes(service.name)
                          ? 'service-row-selected'
                          : ''
                      }`}
                      onClick={() => toggleService(service.name)}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-ivory/90 text-base font-sans font-medium leading-snug">{service.name}</p>
                        <p className="text-ivory/50 text-sm font-sans mt-1">{service.duration}</p>
                      </div>
                      <div className="flex items-center gap-4 flex-shrink-0">
                        <p className="text-champagne text-base font-sans font-semibold whitespace-nowrap">{service.price}</p>
                        <div className={`custom-checkbox ${
                          booking.selectedServices.includes(service.name) ? 'custom-checkbox-checked' : ''
                        }`}>
                          {booking.selectedServices.includes(service.name) && (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C8AD83" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Selected Services Summary */}
              {booking.selectedServices.length > 0 && (
                <div className="mt-6 p-5 rounded-xl bg-champagne/5 border border-champagne/20">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-champagne text-base font-sans font-medium">
                      {booking.selectedServices.length} service{booking.selectedServices.length > 1 ? 's' : ''} selected
                    </p>
                    <p className="text-champagne text-lg font-sans font-bold">
                      {calculateTotalPrice().min} AED{calculateTotalPrice().hasVariable ? '+' : ''}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {booking.selectedServices.map(serviceName => (
                      <span key={serviceName} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-champagne/10 text-champagne text-sm font-sans">
                        {serviceName}
                        <button 
                          onClick={() => toggleService(serviceName)}
                          className="hover:text-ivory transition-colors text-lg leading-none"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {booking.step === 2 && (
            <div>
              <p className="text-ivory/70 text-base font-sans mb-6">Choose your preferred date & time:</p>
              
              {/* Date Selection */}
              <div className="mb-8">
                <label className="text-champagne text-sm font-sans tracking-wide uppercase mb-3 block">Date</label>
                <button
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="search-field w-full rounded-xl text-left flex items-center justify-between"
                >
                  {booking.selectedDate ? (
                    <span className="text-ivory text-base font-sans font-medium">{formatDate(booking.selectedDate)}</span>
                  ) : (
                    <span className="text-ivory/40 text-base font-sans">Select a date</span>
                  )}
                  <i className="fas fa-calendar text-champagne text-xl"></i>
                </button>
                
                {showCalendar && (
                  <div className="mt-4">
                    <Calendar
                      selectedDate={booking.selectedDate}
                      onDateSelect={(date) => {
                        setBooking(prev => ({ ...prev, selectedDate: date, selectedTime: '' }));
                        setShowCalendar(false);
                      }}
                      minDate={getMinDate()}
                    />
                  </div>
                )}
              </div>

              {/* Time Selection */}
              {booking.selectedDate && (
                <div>
                  <label className="text-champagne text-sm font-sans tracking-wide uppercase mb-4 block">Time</label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {generateTimeSlots().map(time => {
                      const booked = isSlotBooked(booking.selectedDate, time);
                      const displayTime = formatDisplayTime(time);
                      return (
                        <button
                          key={time}
                          disabled={booked}
                          onClick={() => setBooking(prev => ({ ...prev, selectedTime: time }))}
                          className={`px-4 py-4 rounded-xl text-base font-sans transition-all min-h-[56px] ${
                            booked
                              ? 'bg-red-500/10 border border-red-500/20 text-red-400/50 cursor-not-allowed line-through'
                              : booking.selectedTime === time
                              ? 'bg-champagne text-obsidian font-semibold shadow-lg shadow-champagne/20'
                              : 'bg-obsidian/60 border border-champagne/10 text-ivory/80 hover:border-champagne/30 hover:bg-obsidian/80'
                          }`}
                        >
                          {displayTime}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-ivory/40 text-sm font-sans mt-5 flex items-center gap-2">
                    <span className="inline-block w-3 h-3 bg-red-500/20 border border-red-500/30 rounded"></span>
                    Unavailable time slots
                  </p>
                </div>
              )}
            </div>
          )}

          {booking.step === 3 && (
            <div>
              <p className="text-ivory/70 text-base font-sans mb-6">Your details:</p>
              <div className="space-y-6">
                <div>
                  <label className="text-champagne text-sm font-sans tracking-wide uppercase mb-3 block">Name</label>
                  <input
                    type="text"
                    value={booking.customerName}
                    onChange={(e) => setBooking(prev => ({ ...prev, customerName: e.target.value }))}
                    placeholder="Your full name"
                    className="search-field w-full rounded-xl text-ivory font-sans placeholder:text-ivory/30"
                  />
                </div>
                <div>
                  <label className="text-champagne text-sm font-sans tracking-wide uppercase mb-3 block">Phone</label>
                  <input
                    type="tel"
                    value={booking.customerPhone}
                    onChange={(e) => setBooking(prev => ({ ...prev, customerPhone: e.target.value }))}
                    placeholder="+971 XX XXX XXXX"
                    className="search-field w-full rounded-xl text-ivory font-sans placeholder:text-ivory/30"
                  />
                </div>
              </div>

              {/* Booking Summary */}
              <div className="mt-8 p-6 rounded-xl service-row-selected">
                <h4 className="text-champagne text-sm font-sans tracking-wide uppercase mb-5 font-medium">Booking Summary</h4>
                <div className="space-y-4 text-base font-sans">
                  <div className="flex justify-between">
                    <span className="text-ivory/60">Services:</span>
                    <span className="text-ivory/90 font-medium">{booking.selectedServices.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ivory/60">Date:</span>
                    <span className="text-ivory/90 font-medium">{formatDate(booking.selectedDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ivory/60">Time:</span>
                    <span className="text-ivory/90 font-medium">{formatDisplayTime(booking.selectedTime)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ivory/60">Duration:</span>
                    <span className="text-ivory/90 font-medium">{calculateTotalDuration()}</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-champagne/20">
                    <span className="text-champagne font-semibold">Estimated Total:</span>
                    <span className="text-champagne font-bold text-lg">
                      {calculateTotalPrice().min === calculateTotalPrice().max 
                        ? `${calculateTotalPrice().min} AED`
                        : `${calculateTotalPrice().min}–${calculateTotalPrice().max} AED`}
                    </span>
                  </div>
                  {calculateTotalPrice().hasVariable && (
                    <p className="text-ivory/50 text-sm font-sans mt-3 italic">
                      * Final price subject to salon confirmation
                    </p>
                  )}
                </div>
              </div>

              <p className="text-ivory/50 text-sm font-sans mt-6 text-center">
                Your booking request will be sent via WhatsApp for confirmation
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="booking-modal-content border-t border-champagne/10 flex-shrink-0 pt-6">
          <div className="flex gap-4">
            {booking.step > 1 && (
              <button
                onClick={() => setBooking(prev => ({ ...prev, step: prev.step - 1 }))}
                className="btn-outline min-w-[120px]"
              >
                Back
              </button>
            )}
            <button
              disabled={!canProceed()}
              onClick={() => {
                if (booking.step < 3) {
                  setBooking(prev => ({ ...prev, step: prev.step + 1 }));
                } else {
                  handleWhatsAppBooking();
                }
              }}
              className="btn-luxury flex-1"
            >
              {booking.step === 3 ? 'Confirm & Send via WhatsApp' : 'Continue'}
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
