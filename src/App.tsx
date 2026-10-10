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
    <div ref={ref} className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

// ==================== LOGO ====================
const Logo = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizes = { sm: 'h-8', md: 'h-10', lg: 'h-14' };
  return (
    <img src="https://qxwmavrgfarmxbexeoxf.supabase.co/storage/v1/render/image/public/images/submissions/logos/1775122019698-77aysv5f01i.png?width=224&quality=80&resize=contain" alt="Dukes of Beauty" className={`${sizes[size]} w-auto object-contain brightness-0 invert`} />
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
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#1a1614]/95 backdrop-blur-lg border-b border-white/5' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a href="#" className="flex-shrink-0"><Logo size="sm" /></a>
            <div className="hidden md:flex items-center gap-8">
              <a href="#services" className="text-sm text-white/70 hover:text-white transition-colors">Services</a>
              <a href="#features" className="text-sm text-white/70 hover:text-white transition-colors">Why Us</a>
              <a href="#gallery" className="text-sm text-white/70 hover:text-white transition-colors">Gallery</a>
              <a href="#reviews" className="text-sm text-white/70 hover:text-white transition-colors">Reviews</a>
              <a href="#contact" className="text-sm text-white/70 hover:text-white transition-colors">Contact</a>
              <button onClick={onBookClick} className="px-6 py-2.5 bg-white text-black font-medium text-sm rounded-full hover:bg-white/90 transition-colors">Book Now</button>
            </div>
            <button onClick={() => setMobileOpen(true)} className="md:hidden text-white p-2" aria-label="Menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="17" x2="21" y2="17" /></svg>
            </button>
          </div>
        </div>
      </nav>
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setMobileOpen(false)}></div>
          <div className="relative h-full flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <Logo size="sm" />
              <button onClick={() => setMobileOpen(false)} className="text-white/70 p-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></svg>
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-8 px-8">
              <a href="#services" onClick={() => setMobileOpen(false)} className="text-2xl text-white/90">Services</a>
              <a href="#features" onClick={() => setMobileOpen(false)} className="text-2xl text-white/90">Why Choose Us</a>
              <a href="#gallery" onClick={() => setMobileOpen(false)} className="text-2xl text-white/90">Gallery</a>
              <a href="#reviews" onClick={() => setMobileOpen(false)} className="text-2xl text-white/90">Reviews</a>
              <a href="#contact" onClick={() => setMobileOpen(false)} className="text-2xl text-white/90">Contact</a>
              <button onClick={() => { setMobileOpen(false); onBookClick(); }} className="w-full py-4 bg-white text-black font-semibold rounded-full mt-4">Book Appointment</button>
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
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src="https://qxwmavrgfarmxbexeoxf.supabase.co/storage/v1/object/public/images/submissions/covers/1775122063027-ut4x70ufzpg.jpeg" alt="Dukes of Beauty" className={`absolute inset-0 w-full h-full object-cover transition-all duration-[2s] ${loaded ? 'scale-100 opacity-100' : 'scale-105 opacity-0'}`} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80"></div>
      </div>
      <div className={`relative z-10 text-center px-5 max-w-3xl transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white leading-tight tracking-tight">
          Dukes of Beauty
        </h1>
        <p className="mt-4 text-base sm:text-lg text-white/80 font-light">
          Premium Beauty Salon in Business Bay, Dubai
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button 
            onClick={onBookClick} 
            className="px-10 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-colors shadow-lg text-base"
          >
            Book Appointment
          </button>
          <a href="https://wa.me/971528167306" target="_blank" rel="noopener noreferrer" className="px-8 py-4 border-2 border-white/50 text-white font-medium rounded-full hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
            <i className="fab fa-whatsapp text-lg"></i> WhatsApp
          </a>
        </div>
        <div className="mt-8 flex items-center justify-center gap-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            ))}
          </div>
          <span className="text-white/70 text-sm">4.9 on Google</span>
        </div>
      </div>
    </section>
  );
};



// ==================== FEATURES ====================
const features = [
  { icon: '🚗', title: 'Complimentary Valet Parking', description: 'Free valet service right at our entrance in Business Bay' },
  { icon: '☕', title: 'Complimentary Beverages', description: 'Enjoy coffee, tea, or refreshments during your visit' },
  { icon: '💆', title: '4-Hand & 6-Hand Services', description: 'Simultaneous treatments for maximum efficiency' },
  { icon: '🛋️', title: 'Luxury Reclining Chairs', description: 'Premium comfort during extended treatments' },
  { icon: '📶', title: 'High-Speed Wi-Fi', description: 'Stay connected throughout your visit' },
  { icon: '🎁', title: 'Premium Products', description: 'K18, Tokio Inkarami, Nashi, Kevin Murphy & more' },
];

const FeaturesSection = () => (
  <section id="features" className="py-16 sm:py-20 bg-white">
    <div className="max-w-6xl mx-auto px-5 sm:px-6">
      <Reveal>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-light text-gray-900">Why Choose Dukes of Beauty</h2>
          <p className="mt-3 text-gray-600">Experience luxury at its finest</p>
        </div>
      </Reveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Reveal key={index} delay={index * 100}>
            <div className="p-6 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all">
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ==================== SERVICES ====================
type ServiceItem = { name: string; duration: string; price: string };
type ServiceCategory = { id: string; icon: string; title: string; services: ServiceItem[] };

const serviceCategories: ServiceCategory[] = [
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
    id: 'hydrafacial', icon: '✨', title: 'HydraFacial Syndeo',
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
    id: 'body', icon: '🧴', title: 'Body & Face Treatments',
    services: [
      { name: 'Neck & Shoulders', duration: '1h', price: '250 AED' },
      { name: 'Full Body Classic', duration: '1h', price: '500 AED' },
      { name: 'Relax', duration: '1h', price: '375 AED' },
      { name: 'Dermadrop', duration: '1h', price: '600–700 AED' },
      { name: 'Heleo 4', duration: '1h', price: '650–750 AED' },
      { name: 'Beautylizer', duration: '1h', price: '620–720 AED' },
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
];

const ServiceCategoryCard = ({ category, selectedServices, onToggleService }: { category: ServiceCategory; selectedServices: string[]; onToggleService: (name: string) => void }) => {
  const [expanded, setExpanded] = useState(false);
  const visibleServices = expanded ? category.services : category.services.slice(0, 5);
  const hasMore = category.services.length > 5;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
      <button onClick={() => setExpanded(!expanded)} className="w-full p-5 flex items-center gap-4 text-left hover:bg-gray-50 transition-colors">
        <span className="text-2xl flex-shrink-0">{category.icon}</span>
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900">{category.title}</h3>
          <p className="text-sm text-gray-500 mt-0.5">{category.services.length} services</p>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`}><path d="M6 9l6 6 6-6"/></svg>
      </button>
      {expanded && (
        <div className="px-5 pb-5 border-t border-gray-100">
          <div className="space-y-0">
            {visibleServices.map((service, i) => (
              <label key={i} className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0 cursor-pointer hover:bg-gray-50 -mx-2 px-2 rounded transition-colors">
                <input
                  type="checkbox"
                  checked={selectedServices.includes(service.name)}
                  onChange={() => onToggleService(service.name)}
                  className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{service.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{service.duration}</p>
                </div>
                <p className="text-sm font-medium text-gray-900 ml-4 whitespace-nowrap">{service.price}</p>
              </label>
            ))}
          </div>
          {hasMore && !expanded && (
            <button onClick={(e) => { e.stopPropagation(); setExpanded(true); }} className="mt-3 text-sm text-blue-600 hover:text-blue-700">
              + Show all {category.services.length} services
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const ServicesSection = ({ onBookClick, selectedServices, setSelectedServices }: { onBookClick: () => void; selectedServices: string[]; setSelectedServices: React.Dispatch<React.SetStateAction<string[]>> }) => {
  const toggleService = (serviceName: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceName) 
        ? prev.filter(s => s !== serviceName)
        : [...prev, serviceName]
    );
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
    <section id="services" className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-5 sm:px-6">
        <Reveal>
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-light text-gray-900">Services & Prices</h2>
            <p className="mt-3 text-gray-600">Select services to book • All prices in AED</p>
          </div>
        </Reveal>
        <div className="space-y-3">
          {serviceCategories.map((cat) => (
            <ServiceCategoryCard 
              key={cat.id} 
              category={cat} 
              selectedServices={selectedServices}
              onToggleService={toggleService}
            />
          ))}
        </div>
        
        {selectedServices.length > 0 && (
          <div className="sticky bottom-0 mt-6 bg-white rounded-lg shadow-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm font-medium text-gray-900">{selectedServices.length} service{selectedServices.length > 1 ? 's' : ''} selected</p>
                <p className="text-xs text-gray-500">Estimated total: {calculateTotal()} AED</p>
              </div>
              <button 
                onClick={onBookClick}
                className="px-6 py-2.5 bg-black text-white font-medium text-sm rounded-full hover:bg-gray-800 transition-colors"
              >
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// ==================== REVIEWS ====================
const ReviewsSection = () => (
  <section id="reviews" className="py-16 sm:py-20 bg-white">
    <div className="max-w-4xl mx-auto px-5 sm:px-6">
      <Reveal>
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-light text-gray-900">Google Reviews</h2>
          <p className="mt-3 text-gray-600">Authentic reviews from our valued clients</p>
        </div>
      </Reveal>

      <Reveal>
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 sm:p-10 border border-gray-200 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            {/* Rating Display */}
            <div className="text-center sm:text-left">
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <span className="text-5xl sm:text-6xl font-light text-gray-900">4.9</span>
                <div>
                  <div className="flex gap-0.5 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">Based on Google Reviews</p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-16 bg-gray-200"></div>

            {/* CTA */}
            <div className="flex-1 text-center sm:text-left">
              <p className="text-gray-700 mb-4">
                Read authentic reviews from our clients on Google. See what they say about our services, staff, and salon experience.
              </p>
              <a 
                href="https://www.google.com/maps/place/?q=place_id:ChIJQw1xKtxpXz4R5ZcIoAWMGdE" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors font-medium"
              >
                <i className="fab fa-google"></i>
                Read Reviews on Google
              </a>
            </div>
          </div>

          {/* Note */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center sm:text-left">
              <i className="fas fa-info-circle mr-1"></i>
              Reviews are displayed on Google Maps. Click the button above to view authentic customer reviews, ratings, and photos.
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

// ==================== GALLERY ====================
const GallerySection = () => (
  <section id="gallery" className="py-16 sm:py-20 bg-gray-50">
    <div className="max-w-4xl mx-auto px-5 sm:px-6">
      <Reveal>
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-light text-gray-900">Salon Gallery</h2>
          <p className="mt-3 text-gray-600">View our salon interior and services on Google Maps</p>
        </div>
      </Reveal>

      <Reveal>
        <div className="bg-white rounded-2xl p-8 sm:p-10 border border-gray-200 shadow-sm text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <i className="fas fa-camera text-2xl text-gray-600"></i>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-3">See Our Salon</h3>
            <p className="text-gray-600 mb-6">
              View authentic photos of our salon interior, treatment rooms, and beauty services on Google Maps.
            </p>
            <a 
              href="https://www.google.com/maps/place/?q=place_id:ChIJQw1xKtxpXz4R5ZcIoAWMGdE" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors font-medium"
            >
              <i className="fas fa-images"></i>
              View Photos on Google Maps
            </a>
            <p className="mt-4 text-xs text-gray-500">
              Photos include salon interior, nail treatments, beauty services, and more
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

// ==================== CONTACT ====================
const ContactSection = () => (
  <section id="contact" className="py-16 sm:py-20 bg-white">
    <div className="max-w-4xl mx-auto px-5 sm:px-6">
      <Reveal>
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-light text-gray-900">Contact & Location</h2>
          <p className="mt-3 text-gray-600">Get in touch or visit us in Business Bay</p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Reveal>
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <i className="fas fa-map-marker-alt text-gray-600"></i>
              Location & Hours
            </h3>
            <div className="space-y-3 text-sm text-gray-600">
              <p className="flex items-start gap-3">
                <span className="text-gray-400 mt-1">📍</span>
                <span>Shop No. 1-Retail, 15 Northside,<br/>Marasi Dr., Business Bay, Dubai, UAE</span>
              </p>
              <p className="flex items-center gap-3">
                <span className="text-gray-400">🕐</span>
                <span>Daily: 10:00 AM – 10:00 PM</span>
              </p>
              <p className="flex items-center gap-3">
                <span className="text-gray-400">📞</span>
                <a href="tel:+971528167306" className="hover:text-gray-900 transition-colors">+971 52 816 7306</a>
              </p>
            </div>
            <a 
              href="https://www.google.com/maps/place/?q=place_id:ChIJQw1xKtxpXz4R5ZcIoAWMGdE" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mt-4 inline-flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors"
            >
              <i className="fas fa-directions"></i>
              Get Directions
            </a>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <i className="fas fa-share-alt text-gray-600"></i>
              Connect With Us
            </h3>
            <div className="space-y-3">
              <a 
                href="https://wa.me/971528167306" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 p-3 rounded-lg bg-white border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all"
              >
                <i className="fab fa-whatsapp text-2xl text-green-600"></i>
                <div>
                  <p className="text-sm font-medium text-gray-900">WhatsApp</p>
                  <p className="text-xs text-gray-600">+971 52 816 7306</p>
                </div>
              </a>
              <a 
                href="tel:+971528167306" 
                className="flex items-center gap-3 p-3 rounded-lg bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all"
              >
                <i className="fas fa-phone text-2xl text-blue-600"></i>
                <div>
                  <p className="text-sm font-medium text-gray-900">Call Us</p>
                  <p className="text-xs text-gray-600">+971 52 816 7306</p>
                </div>
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
  <footer className="bg-white border-t border-gray-200 py-8">
    <div className="max-w-6xl mx-auto px-5 sm:px-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <Logo size="sm" />
        <p className="text-sm text-gray-500">© 2024 Dukes of Beauty. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="https://wa.me/971528167306" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-600 transition-colors"><i className="fab fa-whatsapp text-lg"></i></a>
        </div>
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
    <a href="https://wa.me/971528167306" target="_blank" rel="noopener noreferrer" className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg hover:bg-green-600 hover:scale-110 transition-all" title="Chat on WhatsApp">
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
    const message = `🌟 *New Booking Request* 🌟\n\n*Customer Details:*\nName: ${booking.customerName}\nPhone: ${booking.customerPhone}\n\n*Booking Details:*\nDate: ${booking.selectedDate}\nTime: ${booking.selectedTime}\nDuration: ${totalDuration}\n\n*Services Selected:*\n${services}\n\n*Estimated Total:* ${totalPrice} AED\n\nPlease confirm my booking. Thank you! ✨`;
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
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div className="relative w-full sm:max-w-2xl bg-white rounded-t-3xl sm:rounded-2xl max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()} style={{ animation: 'slideUp 0.3s ease-out forwards' }}>
        <div className="p-5 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-xl font-medium text-gray-900">Book Appointment</h3>
              <p className="text-sm text-gray-500 mt-0.5">Step {booking.step} of 3</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></svg>
            </button>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3].map(step => (<div key={step} className={`flex-1 h-1 rounded-full ${step <= booking.step ? 'bg-black' : 'bg-gray-200'}`}></div>))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          {booking.step === 1 && (
            <div>
              <p className="text-sm text-gray-600 mb-4">Select services:</p>
              <div className="space-y-4">
                {serviceCategories.map(category => (
                  <div key={category.id}>
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">{category.title}</h4>
                    <div className="space-y-1">
                      {category.services.map(service => (
                        <label key={service.name} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input type="checkbox" checked={booking.selectedServices.includes(service.name)} onChange={() => toggleService(service.name)} className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black" />
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">{service.name}</p>
                            <p className="text-xs text-gray-500">{service.duration}</p>
                          </div>
                          <p className="text-sm font-medium text-gray-900 whitespace-nowrap">{service.price}</p>
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
              <p className="text-sm text-gray-600 mb-4">Choose date and time:</p>
              <div className="mb-6">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 block">Date</label>
                <input type="date" min={getMinDate()} value={booking.selectedDate} onChange={(e) => setBooking(prev => ({ ...prev, selectedDate: e.target.value, selectedTime: '' }))} className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:border-black" />
              </div>
              {booking.selectedDate && (
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 block">Time</label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {generateTimeSlots().map(time => {
                      const booked = isSlotBooked(booking.selectedDate, time);
                      return (
                        <button key={time} disabled={booked} onClick={() => setBooking(prev => ({ ...prev, selectedTime: time }))} className={`px-3 py-2.5 rounded-lg text-sm transition-all ${booked ? 'bg-red-50 border border-red-200 text-red-400 cursor-not-allowed line-through' : booking.selectedTime === time ? 'bg-black text-white font-medium' : 'bg-gray-50 border border-gray-200 text-gray-700 hover:border-gray-400'}`}>
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
              <p className="text-sm text-gray-600 mb-4">Your details:</p>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 block">Name</label>
                  <input type="text" value={booking.customerName} onChange={(e) => setBooking(prev => ({ ...prev, customerName: e.target.value }))} placeholder="Your name" className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-black" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 block">Phone</label>
                  <input type="tel" value={booking.customerPhone} onChange={(e) => setBooking(prev => ({ ...prev, customerPhone: e.target.value }))} placeholder="+971 XX XXX XXXX" className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-black" />
                </div>
              </div>
              <div className="mt-6 p-4 rounded-lg bg-gray-50">
                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-600">Services:</span><span className="text-gray-900">{booking.selectedServices.length}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Date:</span><span className="text-gray-900">{booking.selectedDate}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Time:</span><span className="text-gray-900">{booking.selectedTime}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Duration:</span><span className="text-gray-900">{calculateTotalDuration()}</span></div>
                  <div className="flex justify-between pt-2 border-t border-gray-200"><span className="font-medium text-gray-900">Total:</span><span className="font-medium text-gray-900">{calculateTotalPrice()} AED</span></div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="p-5 border-t border-gray-200 flex-shrink-0">
          <div className="flex gap-3">
            {booking.step > 1 && (
              <button onClick={() => setBooking(prev => ({ ...prev, step: prev.step - 1 }))} className="px-6 py-3 border border-gray-300 text-gray-700 font-medium text-sm rounded-full hover:bg-gray-50">Back</button>
            )}
            <button disabled={!canProceed()} onClick={() => { if (booking.step < 3) { setBooking(prev => ({ ...prev, step: prev.step + 1 })); } else { handleWhatsAppBooking(); } }} className="flex-1 py-3 bg-black text-white font-medium text-sm rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800">
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

  const handleBookClick = () => {
    setBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navigation onBookClick={handleBookClick} />
      <HeroSection onBookClick={handleBookClick} />
      <FeaturesSection />
      <ServicesSection onBookClick={handleBookClick} selectedServices={selectedServices} setSelectedServices={setSelectedServices} />
      <GallerySection />
      <ReviewsSection />
      <ContactSection />
      <Footer />
      <WhatsAppBadge />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} preSelectedServices={selectedServices} />
    </div>
  );
}
