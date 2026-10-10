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
          src="https://image.qwenlm.ai/generated-images/4680c584-44a7-47eb-a5ae-bde65cb14c85/_result.png"
          alt="Dukes of Beauty Salon Interior"
          className={`absolute inset-0 w-full h-full object-cover ${loaded ? 'animate-ken-burns' : 'opacity-0'}`}
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        <div className="absolute inset-0 hero-overlay"></div>
      </div>

      <div className="relative z-10 w-full container-luxury pb-20 sm:pb-32 pt-32">
        <div className="max-w-3xl">
          {/* Location tag */}
          <div className={`transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center gap-3 mb-8">
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
          <p className={`mt-8 sm:mt-10 text-ivory/70 text-base sm:text-lg font-sans font-light leading-relaxed max-w-lg transition-all duration-1000 delay-900 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            A sanctuary of luxury where precision meets artistry. Premium hair, nails, aesthetics & wellness in the heart of Dubai.
          </p>

          {/* CTAs */}
          <div className={`mt-10 sm:mt-12 flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <button onClick={onBookClick} className="btn-luxury px-8 py-4 rounded-full">
              Reserve Your Visit
            </button>
            <a href="#services" className="btn-outline px-8 py-4 rounded-full text-center">
              View Services
            </a>
          </div>

          {/* Small trust indicator */}
          <div className={`mt-16 transition-all duration-1000 delay-[1200ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-12 h-px bg-champagne"></span>
            <span className="text-champagne text-[11px] tracking-[0.3em] uppercase font-sans">About</span>
            <span className="w-12 h-px bg-champagne"></span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-ivory leading-tight">
            Where Luxury<br />Meets <span className="italic text-champagne">Expertise</span>
          </h2>
          <div className="mt-8 max-w-3xl mx-auto">
            <p className="text-ivory/70 text-base sm:text-lg font-sans leading-relaxed mb-6">
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
          {/* Category Navigation - Larger and more prominent */}
          <div className="mb-16 sm:mb-20">
            <div className="flex overflow-x-auto gap-3 sm:gap-4 pb-4 scrollbar-hide">
              {serviceCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`flex-shrink-0 px-7 sm:px-10 py-4 sm:py-5 rounded-full text-sm sm:text-base font-sans tracking-wider uppercase transition-all whitespace-nowrap ${
                    activeTab === cat.id
                      ? 'bg-champagne text-obsidian font-semibold shadow-lg shadow-champagne/20'
                      : 'bg-charcoal/50 text-ivory/60 border border-champagne/20 hover:border-champagne/40 hover:text-ivory/80'
                  }`}
                >
                  <span className="mr-2">{cat.icon}</span>
                  {cat.title}
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

            {/* Service list with checkbox on right */}
            <div className="space-y-1">
              {activeCategory.services.map((service, i) => {
                const isSelected = selectedServices.includes(service.name);
                return (
                  <div
                    key={i}
                    onClick={() => toggleService(service.name)}
                    className={`group cursor-pointer rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-champagne/5 border-champagne/30'
                        : 'bg-charcoal/20 border-champagne/5 hover:border-champagne/20 hover:bg-charcoal/30'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 p-6 sm:p-8">
                      {/* Left: Service info */}
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-serif text-xl sm:text-2xl transition-colors mb-2 ${
                          isSelected ? 'text-champagne' : 'text-ivory/90 group-hover:text-ivory'
                        }`}>
                          {service.name}
                        </h4>
                        <p className="text-ivory/50 text-sm font-sans">
                          {service.duration}
                        </p>
                      </div>

                      {/* Right: Price + Checkbox */}
                      <div className="flex items-center gap-5 flex-shrink-0">
                        <p className={`font-sans text-lg sm:text-xl font-medium ${
                          isSelected ? 'text-champagne' : 'text-ivory/80'
                        }`}>
                          {service.price}
                        </p>
                        <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          isSelected ? 'border-champagne bg-champagne' : 'border-ivory/30 group-hover:border-ivory/50'
                        }`}>
                          {isSelected && (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0B0B0D" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          )}
                        </div>
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
          <div className="sticky bottom-4 mt-8 bg-charcoal/95 backdrop-blur-xl border border-champagne/20 rounded-2xl p-5 sm:p-6 shadow-2xl shadow-black/50 z-40">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-ivory text-base font-sans font-medium">{selectedServices.length} service{selectedServices.length > 1 ? 's' : ''} selected</p>
                <p className="text-champagne text-sm font-sans mt-1">Estimated total: {calculateTotal()} AED</p>
              </div>
              <button onClick={onBookClick} className="btn-luxury px-8 py-3 rounded-full text-xs">
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
const InstagramSection = () => (
  <section id="instagram" className="section-spacing relative">
    <div className="container-luxury">
      <Reveal>
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-12 h-px bg-champagne"></span>
            <span className="text-champagne text-[11px] tracking-[0.3em] uppercase font-sans">Instagram</span>
            <span className="w-12 h-px bg-champagne"></span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-ivory leading-tight">
            Follow Our <span className="italic text-champagne">Beauty Journey</span>
          </h2>
          <p className="mt-8 text-ivory/60 text-base sm:text-lg font-sans max-w-2xl mx-auto leading-relaxed">
            Daily inspiration, transformations, and behind-the-scenes moments from our salon.
          </p>
        </div>
      </Reveal>

      <Reveal delay={200}>
        <div className="mt-16 text-center">
          <i className="fab fa-instagram text-champagne text-6xl sm:text-7xl mb-8 block"></i>
          <h3 className="font-serif text-2xl sm:text-3xl text-ivory mb-6">@dukes_of_beauty.ae</h3>
          <a
            href="https://www.instagram.com/dukes_of_beauty.ae/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-luxury inline-flex items-center gap-3 px-10 py-5 rounded-full text-sm"
          >
            <i className="fab fa-instagram text-lg"></i>
            Follow on Instagram
          </a>
        </div>
      </Reveal>
    </div>
  </section>
);

// ==================== GALLERY ====================
const GallerySection = () => (
  <section id="gallery" className="section-spacing relative">
    <div className="container-luxury">
      <Reveal>
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-12 h-px bg-champagne"></span>
            <span className="text-champagne text-[11px] tracking-[0.3em] uppercase font-sans">Gallery</span>
            <span className="w-12 h-px bg-champagne"></span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-ivory leading-tight">
            Our <span className="italic text-champagne">Salon</span>
          </h2>
        </div>
      </Reveal>

      <Reveal delay={200}>
        <div className="mt-16 text-center">
          <i className="fas fa-camera text-champagne text-6xl sm:text-7xl mb-8 block"></i>
          <h3 className="font-serif text-2xl sm:text-3xl text-ivory mb-6">Salon Photography</h3>
          <p className="text-ivory/60 text-base sm:text-lg font-sans leading-relaxed mb-10 max-w-2xl mx-auto">
            View authentic photographs of our salon interior, treatment rooms, and beauty services.
          </p>
          <a
            href="https://www.google.com/maps/place/?q=place_id:ChIJQw1xKtxpXz4R5ZcIoAWMGdE"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-luxury inline-flex items-center gap-3 px-10 py-5 rounded-full text-sm"
          >
            <i className="fas fa-images text-lg"></i>
            View Gallery on Google Maps
          </a>
          <p className="mt-8 text-ivory/40 text-xs font-sans tracking-wide">
            Interior • Treatments • Beauty Services • Amenities
          </p>
        </div>
      </Reveal>
    </div>
  </section>
);

// ==================== REVIEWS ====================
const ReviewsSection = () => (
  <section id="reviews" className="section-spacing relative">
    <div className="container-luxury">
      <Reveal>
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-12 h-px bg-champagne"></span>
            <span className="text-champagne text-[11px] tracking-[0.3em] uppercase font-sans">Testimonials</span>
            <span className="w-12 h-px bg-champagne"></span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-ivory leading-tight">
            Client <span className="italic text-champagne">Reviews</span>
          </h2>
          <p className="mt-8 text-ivory/60 text-base sm:text-lg font-sans max-w-2xl mx-auto leading-relaxed">
            Read authentic reviews from our valued clients on Google.
          </p>
        </div>
      </Reveal>

      <Reveal delay={200}>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Rating Display */}
          <div className="text-center md:text-right">
            <div className="flex justify-center md:justify-end gap-1.5 mb-5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-7 h-7 text-champagne fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
              ))}
            </div>
            <p className="font-serif text-7xl sm:text-8xl text-champagne font-light leading-none">4.9</p>
            <p className="text-ivory/70 text-base font-sans mt-4 tracking-wide">Google Rating</p>
          </div>

          {/* CTA */}
          <div className="text-center md:text-left">
            <h3 className="font-serif text-3xl sm:text-4xl text-ivory mb-6">
              What Our Clients Say
            </h3>
            <p className="text-ivory/60 text-base sm:text-lg font-sans leading-relaxed mb-10">
              Discover why our clients trust Dukes of Beauty for their premium beauty needs. Read verified reviews on Google Maps.
            </p>
            <a
              href="https://www.google.com/maps/place/?q=place_id:ChIJQw1xKtxpXz4R5ZcIoAWMGdE"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury inline-flex items-center gap-3 px-10 py-5 rounded-full text-sm"
            >
              <i className="fab fa-google text-lg"></i>
              Read Reviews on Google
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

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
