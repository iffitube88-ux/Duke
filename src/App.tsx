import { useState, useEffect, useRef, type ReactNode } from 'react';

// ==================== SCROLL REVEAL ====================
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
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
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// ==================== LOGO ====================
const Logo = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizes = { sm: 'h-8', md: 'h-10', lg: 'h-14' };
  return (
    <img
      src="https://qxwmavrgfarmxbexeoxf.supabase.co/storage/v1/render/image/public/images/submissions/logos/1775122019698-77aysv5f01i.png?width=224&quality=80&resize=contain"
      alt="Dukes of Beauty"
      className={`${sizes[size]} w-auto object-contain brightness-0 invert`}
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
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass shadow-2xl shadow-black/30 border-b border-white/5' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a href="#" className="flex-shrink-0"><Logo size="sm" /></a>
            <div className="hidden md:flex items-center gap-8">
              <a href="#services" className="text-[13px] text-white/60 hover:text-gold transition-colors font-inter tracking-wide uppercase">Services</a>
              <a href="#experience" className="text-[13px] text-white/60 hover:text-gold transition-colors font-inter tracking-wide uppercase">Experience</a>
              <a href="#reviews" className="text-[13px] text-white/60 hover:text-gold transition-colors font-inter tracking-wide uppercase">Reviews</a>
              <a href="#gallery" className="text-[13px] text-white/60 hover:text-gold transition-colors font-inter tracking-wide uppercase">Gallery</a>
              <button onClick={onBookClick} className="btn-primary px-6 py-2.5 text-warm-dark font-semibold text-[13px] rounded-full tracking-wide uppercase">Book Now</button>
            </div>
            <button onClick={() => setMobileOpen(true)} className="md:hidden text-white/80 p-2 -mr-2" aria-label="Open menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="17" x2="21" y2="17" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 bg-warm-dark/95 backdrop-blur-xl" onClick={() => setMobileOpen(false)}></div>
          <div className="relative h-full flex flex-col animate-fade-in">
            <div className="flex items-center justify-between p-4 border-b border-white/5">
              <Logo size="sm" />
              <button onClick={() => setMobileOpen(false)} className="text-white/60 p-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-8 px-8">
              <a href="#services" onClick={() => setMobileOpen(false)} className="text-2xl font-playfair text-white/80 hover:text-gold transition-colors">Services & Prices</a>
              <a href="#experience" onClick={() => setMobileOpen(false)} className="text-2xl font-playfair text-white/80 hover:text-gold transition-colors">Experience</a>
              <a href="#reviews" onClick={() => setMobileOpen(false)} className="text-2xl font-playfair text-white/80 hover:text-gold transition-colors">Reviews</a>
              <a href="#gallery" onClick={() => setMobileOpen(false)} className="text-2xl font-playfair text-white/80 hover:text-gold transition-colors">Gallery</a>
              <button onClick={() => { setMobileOpen(false); onBookClick(); }} className="btn-primary w-full py-4 text-warm-dark font-bold text-sm rounded-full tracking-wider uppercase mt-4">Reserve Appointment</button>
              <div className="flex gap-6 mt-4">
                <a href="https://www.instagram.com/dukes_of_beauty.ae/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-gold transition-colors"><i className="fab fa-instagram text-xl"></i></a>
                <a href="https://wa.me/971528167306" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-green-400 transition-colors"><i className="fab fa-whatsapp text-xl"></i></a>
              </div>
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
    <section className="relative min-h-[100svh] flex items-end md:items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://qxwmavrgfarmxbexeoxf.supabase.co/storage/v1/object/public/images/submissions/covers/1775122063027-ut4x70ufzpg.jpeg"
          alt="Dukes of Beauty"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-[2s] ${loaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        <div className="absolute inset-0 hero-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-warm-dark/70 via-transparent to-warm-dark/40"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pb-16 md:pb-0 pt-32 md:pt-0">
        <div className="max-w-2xl">
          <div className={`transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <span className="inline-flex items-center gap-2.5 text-gold text-[11px] sm:text-xs font-inter tracking-[0.2em] uppercase">
              <span className="w-8 h-px bg-gold"></span>Business Bay, Dubai
            </span>
          </div>
          <h1 className={`hero-title mt-5 font-playfair text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.05] tracking-tight transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-white">Where Beauty</span><br />
            <span className="text-white">Becomes </span><span className="animate-shimmer italic">Art</span>
          </h1>
          <p className={`mt-5 sm:mt-6 text-white/50 text-base sm:text-lg font-inter leading-relaxed max-w-lg transition-all duration-1000 delay-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Premium hair transformations, synchronized nail care & advanced aesthetics — curated for those who accept nothing less than perfection.
          </p>
          <div className={`mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 transition-all duration-1000 delay-900 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <button onClick={onBookClick} className="btn-primary animate-pulse-glow px-7 py-4 text-warm-dark font-bold text-sm rounded-full tracking-wider uppercase">Reserve Your Visit</button>
            <a href="#services" className="px-7 py-4 border border-white/15 text-white/70 font-medium text-sm rounded-full hover:border-gold/40 hover:text-gold transition-all text-center">View Services & Prices</a>
          </div>
          <div className={`mt-10 flex items-center gap-4 transition-all duration-1000 delay-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-3.5 h-3.5 text-gold fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
              ))}
            </div>
            <span className="text-white/40 text-xs font-inter"><span className="text-gold font-medium">4.6</span> · 100+ Google Reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==================== MARQUEE ====================
const MarqueeBanner = () => {
  const items = ['HAIR', '•', 'NAILS', '•', 'FACIALS', '•', 'LASHES', '•', 'BROWS', '•', 'MAKEUP', '•', 'MASSAGE', '•', 'K18', '•', 'AIRTOUCH', '•', 'HYDRAFACIAL', '•'];
  return (
    <div className="py-4 border-y border-white/5 overflow-hidden bg-warm-dark/50">
      <div className="animate-marquee whitespace-nowrap flex">
        {[...items, ...items].map((item, i) => (
          <span key={i} className={`mx-4 sm:mx-6 text-[11px] font-inter tracking-[0.3em] uppercase ${item === '•' ? 'text-gold/40' : 'text-white/30'}`}>{item}</span>
        ))}
      </div>
    </div>
  );
};

// ==================== FIRST TIME OFFER ====================
const FirstTimeOffer = () => (
  <section className="py-16 sm:py-24 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-warm-dark via-warm to-warm-dark"></div>
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
    <Reveal>
      <div className="relative max-w-3xl mx-auto px-5 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/20 bg-gold/5 mb-6">
          <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse"></span>
          <span className="text-gold text-[11px] font-inter tracking-[0.15em] uppercase">New Guest Offer</span>
        </div>
        <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-medium text-white leading-tight">
          Your First Visit Deserves<br /><span className="text-gold italic">Something Special</span>
        </h2>
        <p className="mt-5 text-white/50 text-sm sm:text-base font-inter max-w-xl mx-auto leading-relaxed">
          Enjoy <span className="text-gold font-medium">20% OFF</span> your first 3 visits plus a complimentary <span className="text-gold font-medium">Kevin Murphy</span> treatment.
        </p>
        <a href="https://n1359631.alteg.io/company/1297862/about" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-7 btn-primary px-7 py-3.5 text-warm-dark font-bold text-sm rounded-full tracking-wide uppercase">
          Claim Offer <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    </Reveal>
  </section>
);

// ==================== SERVICES WITH PRICES ====================
type ServiceItem = { name: string; duration: string; price: string };
type ServiceCategory = { id: string; icon: string; title: string; subtitle: string; description: string; services: ServiceItem[] };

const serviceCategories: ServiceCategory[] = [
  {
    id: 'lashes',
    icon: '👁️',
    title: 'Lashes & Brows',
    subtitle: 'Define · Enhance · Transform',
    description: 'Expert lash extensions, lamination & bespoke brow architecture tailored to your features.',
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
    id: 'nails',
    icon: '💅',
    title: 'Nails',
    subtitle: 'Manicure · Pedicure · Extensions',
    description: 'From classic care to luxury SPA rituals — including our signature 4-hand & 6-hand treatments.',
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
    id: 'hair',
    icon: '✂️',
    title: 'Hair',
    subtitle: 'Cut · Color · Restore',
    description: 'Precision cuts, Airtouch coloring, balayage & premium restorative treatments with K18, Tokio Inkarami & Nashi.',
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
    id: 'hydrafacial',
    icon: '✨',
    title: 'HydraFacial Syndeo',
    subtitle: 'Advanced Skin Transformation',
    description: 'Medical-grade HydraFacial Syndeo treatments with boosters, Keravive & LED therapy for radiant, youthful skin.',
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
    id: 'cosmetology',
    icon: '🔬',
    title: 'Cosmetology',
    subtitle: 'PRX · Dermadrop · Collagen',
    description: 'Advanced dermatological treatments: PRX peeling, Dermadrop, collagen therapy, biobotox & specialized skin protocols.',
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
    id: 'body',
    icon: '🧴',
    title: 'Body & Face Treatments',
    subtitle: 'Dermadrop · Heleo · Beautylizer',
    description: 'Non-invasive body contouring & skin rejuvenation with cutting-edge technology.',
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
    id: 'massage',
    icon: '🤲',
    title: 'Massage',
    subtitle: 'Relax · Restore · Rejuvenate',
    description: 'Premium manual massage therapies — from deep tissue to hot stone, Swedish to lymphatic drainage.',
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

const ServiceCategoryCard = ({ category, index }: { category: ServiceCategory; index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const visibleServices = expanded ? category.services : category.services.slice(0, 5);
  const hasMore = category.services.length > 5;

  return (
    <Reveal delay={index * 80}>
      <div className="rounded-2xl bg-warm-light/20 border border-white/5 overflow-hidden">
        {/* Header */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full p-5 sm:p-6 flex items-center gap-4 text-left hover:bg-white/[0.02] transition-colors"
        >
          <span className="text-3xl flex-shrink-0">{category.icon}</span>
          <div className="flex-1 min-w-0">
            <h3 className="font-playfair text-lg sm:text-xl font-medium text-white">{category.title}</h3>
            <p className="text-gold/50 text-[11px] sm:text-xs font-inter tracking-wide mt-0.5">{category.subtitle}</p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="hidden sm:inline text-white/30 text-xs font-inter">{category.services.length} services</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`text-gold/60 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </div>
        </button>

        {/* Description */}
        <div className="px-5 sm:px-6 pb-4">
          <p className="text-white/40 text-xs sm:text-sm font-inter leading-relaxed">{category.description}</p>
        </div>

        {/* Services list */}
        <div className={`border-t border-white/5 transition-all duration-500 ${expanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className="p-5 sm:p-6 pt-4">
            <div className="space-y-0">
              {visibleServices.map((service, i) => (
                <div key={i} className="flex items-center justify-between py-2.5 border-b border-white/[0.03] last:border-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-white/70 text-xs sm:text-sm font-inter truncate">{service.name}</p>
                    <p className="text-white/30 text-[10px] sm:text-xs font-inter mt-0.5">{service.duration}</p>
                  </div>
                  <p className="text-gold text-xs sm:text-sm font-inter font-medium ml-4 whitespace-nowrap">{service.price}</p>
                </div>
              ))}
            </div>
            {hasMore && !expanded && (
              <button onClick={(e) => { e.stopPropagation(); setExpanded(true); }} className="mt-3 text-gold/60 hover:text-gold text-xs font-inter transition-colors">
                + Show all {category.services.length} services
              </button>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-16 sm:py-24 relative">
      <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-12">
            <span className="text-gold text-[11px] font-inter tracking-[0.2em] uppercase">Services & Prices</span>
            <h2 className="section-title mt-3 font-playfair text-2xl sm:text-3xl md:text-5xl font-medium text-white">Our Menu</h2>
            <p className="mt-4 text-white/40 text-sm sm:text-base font-inter max-w-lg mx-auto">All prices in AED. Consultation available for personalized recommendations.</p>
          </div>
        </Reveal>

        <div className="space-y-3 sm:space-y-4">
          {serviceCategories.map((cat, i) => (
            <ServiceCategoryCard key={cat.id} category={cat} index={i} />
          ))}
        </div>

        <Reveal>
          <div className="mt-10 text-center">
            <p className="text-white/30 text-xs font-inter mb-4">Prices may vary based on hair length & complexity. Book a free consultation for a personalized quote.</p>
            <a href="https://n1359631.alteg.io/company/1297862/about" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 text-warm-dark font-bold text-sm rounded-full tracking-wide uppercase">
              Book Appointment <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// ==================== EXPERIENCE ====================
const amenities = [
  { icon: '🚗', title: 'Complimentary Valet', description: 'Premium valet parking directly at our entrance.' },
  { icon: '🛋️', title: 'Executive Recliners', description: 'Ultra-premium chairs for multi-hand procedures.' },
  { icon: '☕', title: 'VIP Lounge Bar', description: 'Complimentary artisan coffee, matcha & luxury teas.' },
  { icon: '📶', title: 'High-Speed Wi-Fi', description: 'Stay connected throughout your visit.' },
];

const ExperienceSection = () => (
  <section id="experience" className="py-16 sm:py-24 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-warm-dark via-warm to-warm-dark"></div>
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
    <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
      <Reveal>
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-gold text-[11px] font-inter tracking-[0.2em] uppercase">The Experience</span>
          <h2 className="section-title mt-3 font-playfair text-2xl sm:text-3xl md:text-5xl font-medium text-white">More Than A Salon</h2>
          <p className="mt-4 text-white/40 text-sm sm:text-base font-inter max-w-lg mx-auto">Every detail curated. Every moment designed for your absolute comfort.</p>
        </div>
      </Reveal>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {amenities.map((item, index) => (
          <Reveal key={index} delay={index * 100}>
            <div className="card-hover text-center p-5 sm:p-6 md:p-8 rounded-2xl bg-warm-light/20 border border-white/5">
              <span className="text-3xl sm:text-4xl block mb-3 sm:mb-4">{item.icon}</span>
              <h3 className="font-playfair text-sm sm:text-base font-medium text-white mb-1.5 sm:mb-2">{item.title}</h3>
              <p className="text-white/40 text-[11px] sm:text-xs font-inter leading-relaxed">{item.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ==================== TESTIMONIALS ====================
const testimonials = [
  { name: 'Daria M.', text: 'Had a truly great experience at this beauty salon. I had a manicure, pedicure, and massage, and everything was absolutely amazing. The quality of work, service, and precise attention to detail are top-notch!', rating: 5 },
  { name: 'Elena R.', text: 'The best salon in Business Bay! Their Airtouch coloring and K18 treatment completely transformed my hair. Plus, having the 4-hand nail service saves so much time.', rating: 5 },
  { name: 'Anastasia K.', text: 'Absolutely love this place! The HydraFacial was incredible — my skin has never looked better. The staff is so professional and the atmosphere is pure luxury.', rating: 5 },
  { name: 'Maria S.', text: 'I came for a haircut and left feeling like a completely new person. The colorist understood exactly what I wanted. The valet service and complimentary coffee were the perfect touch.', rating: 5 },
  { name: 'Olga V.', text: 'Best lash extensions I have ever had! So natural and lightweight. The salon is immaculate and the team makes you feel like royalty from start to finish.', rating: 5 },
  { name: 'Natalia P.', text: 'The 6-hand manicure + pedicure experience is unreal. In under an hour I had a full set done perfectly. The attention to detail and luxury products used are worth every dirham.', rating: 5 },
];

const TestimonialsSection = () => {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setActive((prev) => (prev + 1) % testimonials.length), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="reviews" className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-gold text-[11px] font-inter tracking-[0.2em] uppercase">Testimonials</span>
            <h2 className="section-title mt-3 font-playfair text-2xl sm:text-3xl md:text-5xl font-medium text-white">What Our Guests Say</h2>
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (<svg key={i} className="w-4 h-4 text-gold fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>))}
              </div>
              <span className="text-white/40 text-xs font-inter">4.6 on Google · 100+ reviews</span>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative p-6 sm:p-10 rounded-3xl bg-warm-light/20 border border-white/5">
              <div className="absolute top-5 left-6 text-gold/15 text-5xl sm:text-7xl font-playfair leading-none">"</div>
              <div className="relative pt-6 sm:pt-8">
                <p className="text-white/70 text-base sm:text-lg font-inter leading-relaxed italic min-h-[80px]">{testimonials[active].text}</p>
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium text-sm font-inter">{testimonials[active].name}</p>
                    <p className="text-gold/50 text-xs font-inter">Verified Google Review</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(testimonials[active].rating)].map((_, i) => (<svg key={i} className="w-3.5 h-3.5 text-gold fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>))}
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-1.5 mt-6">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setActive(i)} className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? 'bg-gold w-8' : 'bg-white/15 w-1.5 hover:bg-white/30'}`} />
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {testimonials.slice(0, 3).map((review, index) => (
            <Reveal key={index} delay={index * 100}>
              <div className="card-hover p-5 sm:p-6 rounded-2xl bg-warm-light/20 border border-white/5">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(review.rating)].map((_, i) => (<svg key={i} className="w-3 h-3 text-gold fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>))}
                </div>
                <p className="text-white/50 text-xs sm:text-sm font-inter leading-relaxed" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>"{review.text}"</p>
                <div className="mt-4 pt-3 border-t border-white/5">
                  <p className="text-white/80 text-xs font-medium font-inter">{review.name}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==================== GALLERY (Instagram Links) ====================
const GallerySection = () => {
  const instagramPosts = [
    { id: 'DTuWqL9Cmvt', caption: 'THE AESTHETICS OF DUKES OF BEAUTY' },
    { id: 'DQ8di2OER4W', caption: 'New-generation salon in Business Bay' },
    { id: 'DcLNnpbq-pt', caption: "A place where you'll want to stay" },
    { id: 'Db7onQ8qser', caption: 'Beautiful hair & exceptional service' },
    { id: 'DQhFNROig67', caption: 'Chocolate-tone French manicure' },
    { id: 'DO5dCuQivVf', caption: 'Treatments are more than results' },
    { id: 'DLiDvepPZB8', caption: 'Luxurious evening makeup' },
    { id: 'DNTGULiJSTC', caption: 'We know everything about you' },
  ];

  return (
    <section id="gallery" className="py-16 sm:py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-warm-dark via-warm to-warm-dark"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-gold text-[11px] font-inter tracking-[0.2em] uppercase">Portfolio</span>
            <h2 className="section-title mt-3 font-playfair text-2xl sm:text-3xl md:text-5xl font-medium text-white">Follow Our Journey</h2>
            <p className="mt-4 text-white/40 text-sm sm:text-base font-inter max-w-lg mx-auto">Real transformations from our talented team. See our latest work on Instagram.</p>
            <a href="https://www.instagram.com/dukes_of_beauty.ae/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-6 px-6 py-3 border border-gold/30 rounded-full text-gold hover:bg-gold/10 transition-all font-inter text-sm">
              <i className="fab fa-instagram text-lg"></i>View Full Gallery on Instagram
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {instagramPosts.map((post, index) => (
            <Reveal key={index} delay={index * 50}>
              <a href={`https://www.instagram.com/p/${post.id}/`} target="_blank" rel="noopener noreferrer" className="card-hover group block aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-warm-light/30 to-warm-dark relative">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <i className="fab fa-instagram text-gold/40 text-3xl sm:text-4xl mb-3 group-hover:text-gold/60 transition-colors"></i>
                  <p className="text-white/40 text-[10px] sm:text-xs font-inter leading-relaxed line-clamp-2 group-hover:text-white/60 transition-colors">{post.caption}</p>
                  <div className="mt-3 flex items-center gap-1.5 text-gold/50 group-hover:text-gold transition-colors">
                    <span className="text-[9px] sm:text-[10px] font-inter tracking-wide">VIEW POST</span>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-10 sm:mt-12 text-center">
            <p className="text-white/30 text-xs font-inter">Follow <span className="text-gold">@dukes_of_beauty.ae</span> for daily inspiration & exclusive offers</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// ==================== FINAL CTA ====================
const FinalCta = ({ onBookClick }: { onBookClick: () => void }) => (
  <section className="py-20 sm:py-28 relative overflow-hidden">
    <div className="absolute inset-0 bg-warm-dark"></div>
    <div className="absolute inset-0">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl animate-breathe"></div>
    </div>
    <Reveal>
      <div className="relative max-w-2xl mx-auto px-5 text-center">
        <h2 className="font-playfair text-2xl sm:text-3xl md:text-5xl font-medium text-white leading-tight">Ready to Experience<br /><span className="animate-shimmer italic">True Luxury?</span></h2>
        <p className="mt-5 text-white/40 text-sm sm:text-base font-inter max-w-md mx-auto">Join our community of clients who refuse to settle for anything less than exceptional.</p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button onClick={onBookClick} className="btn-primary animate-pulse-glow w-full sm:w-auto px-8 py-4 text-warm-dark font-bold text-sm rounded-full tracking-wider uppercase">Book Your Appointment</button>
          <a href="https://wa.me/971528167306" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 border border-green-500/20 text-green-400/80 font-medium text-sm rounded-full hover:bg-green-500/5 transition-all flex items-center justify-center gap-2">
            <i className="fab fa-whatsapp"></i>WhatsApp Us
          </a>
        </div>
      </div>
    </Reveal>
  </section>
);

// ==================== FOOTER ====================
const Footer = () => (
  <footer className="border-t border-white/5 py-10 sm:py-14 bg-warm-dark">
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-10">
        <div>
          <Logo size="md" />
          <p className="mt-4 text-white/30 text-xs font-inter leading-relaxed max-w-xs">Premium beauty salon in Business Bay, Dubai. Where artistry meets excellence.</p>
          <div className="mt-4 text-white/30 text-xs font-inter">
            <p className="flex items-start gap-2"><i className="fas fa-map-marker-alt text-gold/60 mt-0.5"></i><span>Shop No. 1-Retail, 15 Northside,<br/>Marasi Dr., Business Bay, Dubai</span></p>
            <p className="flex items-center gap-2 mt-2"><i className="fas fa-clock text-gold/60"></i>Daily: 10:00 AM – 10:00 PM</p>
          </div>
        </div>
        <div>
          <h4 className="text-white/60 text-[11px] font-inter tracking-[0.15em] uppercase mb-4">Navigate</h4>
          <div className="space-y-2.5">
            <a href="#services" className="block text-white/30 hover:text-gold text-xs font-inter transition-colors">Services & Prices</a>
            <a href="#experience" className="block text-white/30 hover:text-gold text-xs font-inter transition-colors">Experience</a>
            <a href="#reviews" className="block text-white/30 hover:text-gold text-xs font-inter transition-colors">Reviews</a>
            <a href="#gallery" className="block text-white/30 hover:text-gold text-xs font-inter transition-colors">Gallery</a>
          </div>
        </div>
        <div>
          <h4 className="text-white/60 text-[11px] font-inter tracking-[0.15em] uppercase mb-4">Connect</h4>
          <div className="flex gap-3 mt-2">
            <a href="https://www.instagram.com/dukes_of_beauty.ae/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold/10 hover:text-gold transition-all text-white/30"><i className="fab fa-instagram"></i></a>
            <a href="https://wa.me/971528167306" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-green-500/10 hover:text-green-400 transition-all text-white/30"><i className="fab fa-whatsapp"></i></a>
            <a href="https://n1359631.alteg.io/company/1297862/about" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold/10 hover:text-gold transition-all text-white/30"><i className="fas fa-calendar"></i></a>
          </div>
        </div>
      </div>
      <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-white/20 text-[10px] font-inter">© 2024 Dukes of Beauty. All rights reserved.</p>
        <p className="text-white/15 text-[10px] font-inter">Business Bay, Dubai, UAE</p>
      </div>
    </div>
  </footer>
);

// ==================== WHATSAPP BADGE ====================
const WhatsAppBadge = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 3000); return () => clearTimeout(t); }, []);
  if (!visible) return null;
  return (
    <a href="https://wa.me/971528167306" target="_blank" rel="noopener noreferrer" className="fixed bottom-5 right-5 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/20 hover:bg-green-600 hover:scale-110 transition-all animate-scale-in" title="Chat with us">
      <i className="fab fa-whatsapp text-white text-xl sm:text-2xl"></i>
    </a>
  );
};

// ==================== BOOKING SYSTEM ====================
type BookingState = {
  step: number;
  selectedServices: string[];
  selectedDate: string;
  selectedTime: string;
  customerName: string;
  customerPhone: string;
};

type BookedSlot = {
  date: string;
  time: string;
  customerName: string;
  timestamp: number;
};

const getBookedSlots = (): BookedSlot[] => {
  try {
    const stored = localStorage.getItem('dukes_booked_slots');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
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

const BookingModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [booking, setBooking] = useState<BookingState>({
    step: 1,
    selectedServices: [],
    selectedDate: '',
    selectedTime: '',
    customerName: '',
    customerPhone: '',
  });

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setBooking({
        step: 1,
        selectedServices: [],
        selectedDate: '',
        selectedTime: '',
        customerName: '',
        customerPhone: '',
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const allServices = serviceCategories.flatMap(cat => 
    cat.services.map(s => ({ ...s, category: cat.title }))
  );

  const toggleService = (serviceName: string) => {
    setBooking(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(serviceName)
        ? prev.selectedServices.filter(s => s !== serviceName)
        : [...prev.selectedServices, serviceName]
    }));
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 10; hour < 22; hour++) {
      for (let min = 0; min < 60; min += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
        slots.push(time);
      }
    }
    return slots;
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

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
        if (priceMatch) {
          total += parseInt(priceMatch[1]);
        }
      }
    });
    return total;
  };

  const handleWhatsAppBooking = () => {
    const services = booking.selectedServices.join(', ');
    const totalDuration = calculateTotalDuration();
    const totalPrice = calculateTotalPrice();
    
    const message = `🌟 *New Booking Request* 🌟

*Customer Details:*
Name: ${booking.customerName}
Phone: ${booking.customerPhone}

*Booking Details:*
Date: ${booking.selectedDate}
Time: ${booking.selectedTime}
Duration: ${totalDuration}

*Services Selected:*
${services}

*Estimated Total:* ${totalPrice} AED

Please confirm my booking. Thank you! ✨`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/971528167306?text=${encodedMessage}`;

    saveBookedSlot({
      date: booking.selectedDate,
      time: booking.selectedTime,
      customerName: booking.customerName,
      timestamp: Date.now()
    });

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
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"></div>
      <div 
        className="relative w-full sm:max-w-2xl bg-warm border border-white/10 rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/5 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-playfair text-xl sm:text-2xl font-medium text-white">Book Your Appointment</h3>
              <p className="text-white/40 text-xs sm:text-sm font-inter mt-1">Step {booking.step} of 3</p>
            </div>
            <button onClick={onClose} className="text-white/30 hover:text-white transition-colors p-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>
          </div>
          {/* Progress bar */}
          <div className="flex gap-2">
            {[1, 2, 3].map(step => (
              <div key={step} className={`flex-1 h-1 rounded-full transition-all ${step <= booking.step ? 'bg-gold' : 'bg-white/10'}`}></div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          {/* Step 1: Select Services */}
          {booking.step === 1 && (
            <div>
              <p className="text-white/60 text-sm font-inter mb-4">Select the services you'd like to book:</p>
              <div className="space-y-4">
                {serviceCategories.map(category => (
                  <div key={category.id}>
                    <h4 className="text-gold text-xs font-inter tracking-widest uppercase mb-2">{category.title}</h4>
                    <div className="space-y-1">
                      {category.services.map(service => (
                        <label key={service.name} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/[0.02] cursor-pointer transition-colors">
                          <input
                            type="checkbox"
                            checked={booking.selectedServices.includes(service.name)}
                            onChange={() => toggleService(service.name)}
                            className="w-4 h-4 rounded border-white/20 bg-transparent text-gold focus:ring-gold focus:ring-offset-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-white/80 text-sm font-inter truncate">{service.name}</p>
                            <p className="text-white/30 text-xs font-inter">{service.duration}</p>
                          </div>
                          <p className="text-gold text-xs sm:text-sm font-inter font-medium whitespace-nowrap">{service.price}</p>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Select Date & Time */}
          {booking.step === 2 && (
            <div>
              <p className="text-white/60 text-sm font-inter mb-4">Choose your preferred date and time:</p>
              
              {/* Date Picker */}
              <div className="mb-6">
                <label className="text-white/60 text-xs font-inter tracking-wide uppercase mb-2 block">Select Date</label>
                <input
                  type="date"
                  min={getMinDate()}
                  value={booking.selectedDate}
                  onChange={(e) => setBooking(prev => ({ ...prev, selectedDate: e.target.value, selectedTime: '' }))}
                  className="w-full px-4 py-3 bg-warm-light/30 border border-white/10 rounded-lg text-white font-inter text-sm focus:outline-none focus:border-gold/50"
                />
              </div>

              {/* Time Slots */}
              {booking.selectedDate && (
                <div>
                  <label className="text-white/60 text-xs font-inter tracking-wide uppercase mb-2 block">Select Time</label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {generateTimeSlots().map(time => {
                      const booked = isSlotBooked(booking.selectedDate, time);
                      return (
                        <button
                          key={time}
                          disabled={booked}
                          onClick={() => setBooking(prev => ({ ...prev, selectedTime: time }))}
                          className={`px-3 py-2.5 rounded-lg text-sm font-inter transition-all ${
                            booked
                              ? 'bg-red-500/10 border border-red-500/20 text-red-400/50 cursor-not-allowed line-through'
                              : booking.selectedTime === time
                              ? 'bg-gold text-warm-dark font-semibold'
                              : 'bg-warm-light/30 border border-white/10 text-white/70 hover:border-gold/30'
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-white/30 text-xs font-inter mt-3">
                    <span className="inline-block w-3 h-3 bg-red-500/20 border border-red-500/30 rounded mr-1"></span>
                    Booked slots are unavailable
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Customer Details */}
          {booking.step === 3 && (
            <div>
              <p className="text-white/60 text-sm font-inter mb-4">Enter your details to complete the booking:</p>
              
              <div className="space-y-4">
                <div>
                  <label className="text-white/60 text-xs font-inter tracking-wide uppercase mb-2 block">Full Name</label>
                  <input
                    type="text"
                    value={booking.customerName}
                    onChange={(e) => setBooking(prev => ({ ...prev, customerName: e.target.value }))}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 bg-warm-light/30 border border-white/10 rounded-lg text-white font-inter text-sm placeholder:text-white/20 focus:outline-none focus:border-gold/50"
                  />
                </div>

                <div>
                  <label className="text-white/60 text-xs font-inter tracking-wide uppercase mb-2 block">Phone Number</label>
                  <input
                    type="tel"
                    value={booking.customerPhone}
                    onChange={(e) => setBooking(prev => ({ ...prev, customerPhone: e.target.value }))}
                    placeholder="+971 XX XXX XXXX"
                    className="w-full px-4 py-3 bg-warm-light/30 border border-white/10 rounded-lg text-white font-inter text-sm placeholder:text-white/20 focus:outline-none focus:border-gold/50"
                  />
                </div>
              </div>

              {/* Booking Summary */}
              <div className="mt-6 p-4 rounded-lg bg-warm-light/20 border border-gold/10">
                <h4 className="text-gold text-xs font-inter tracking-widest uppercase mb-3">Booking Summary</h4>
                <div className="space-y-2 text-sm font-inter">
                  <div className="flex justify-between">
                    <span className="text-white/50">Services:</span>
                    <span className="text-white/80 text-right">{booking.selectedServices.length} selected</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Date:</span>
                    <span className="text-white/80">{booking.selectedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Time:</span>
                    <span className="text-white/80">{booking.selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Duration:</span>
                    <span className="text-white/80">{calculateTotalDuration()}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/5">
                    <span className="text-gold font-medium">Estimated Total:</span>
                    <span className="text-gold font-semibold">{calculateTotalPrice()} AED</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 sm:p-6 border-t border-white/5 flex-shrink-0">
          <div className="flex gap-3">
            {booking.step > 1 && (
              <button
                onClick={() => setBooking(prev => ({ ...prev, step: prev.step - 1 }))}
                className="px-6 py-3 border border-white/10 text-white/70 font-medium text-sm rounded-full hover:border-gold/30 transition-all"
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
              className="btn-primary flex-1 py-3 text-warm-dark font-bold text-sm rounded-full tracking-wider uppercase disabled:opacity-50 disabled:cursor-not-allowed"
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
  return (
    <div className="min-h-screen bg-warm-dark text-white font-inter">
      <Navigation onBookClick={() => setBookingOpen(true)} />
      <HeroSection onBookClick={() => setBookingOpen(true)} />
      <MarqueeBanner />
      <FirstTimeOffer />
      <div className="divider-gold"></div>
      <ServicesSection />
      <div className="divider-gold"></div>
      <ExperienceSection />
      <div className="divider-gold"></div>
      <TestimonialsSection />
      <div className="divider-gold"></div>
      <GallerySection />
      <div className="divider-gold"></div>
      <FinalCta onBookClick={() => setBookingOpen(true)} />
      <Footer />
      <WhatsAppBadge />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
