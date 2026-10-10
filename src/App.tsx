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

// ==================== LOGO COMPONENT ====================
const Logo = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizes = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-14',
  };

  return (
    <div className="flex items-center gap-3">
      <img
        src="https://qxwmavrgfarmxbexeoxf.supabase.co/storage/v1/render/image/public/images/submissions/logos/1775122019698-77aysv5f01i.png?width=224&quality=80&resize=contain"
        alt="Dukes of Beauty"
        className={`${sizes[size]} w-auto object-contain`}
      />
    </div>
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
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass shadow-2xl shadow-black/30 border-b border-white/5' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a href="#" className="flex-shrink-0">
              <Logo size="sm" />
            </a>

            <div className="hidden md:flex items-center gap-8">
              <a href="#services" className="text-[13px] text-white/60 hover:text-gold transition-colors font-inter tracking-wide uppercase">Services</a>
              <a href="#experience" className="text-[13px] text-white/60 hover:text-gold transition-colors font-inter tracking-wide uppercase">Experience</a>
              <a href="#reviews" className="text-[13px] text-white/60 hover:text-gold transition-colors font-inter tracking-wide uppercase">Reviews</a>
              <a href="#gallery" className="text-[13px] text-white/60 hover:text-gold transition-colors font-inter tracking-wide uppercase">Gallery</a>
              <button
                onClick={onBookClick}
                className="btn-primary px-6 py-2.5 text-warm-dark font-semibold text-[13px] rounded-full tracking-wide uppercase"
              >
                Book Now
              </button>
            </div>

            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden text-white/80 p-2 -mr-2"
              aria-label="Open menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 bg-warm-dark/95 backdrop-blur-xl" onClick={() => setMobileOpen(false)}></div>
          <div className="relative h-full flex flex-col animate-fade-in">
            <div className="flex items-center justify-between p-4 border-b border-white/5">
              <Logo size="sm" />
              <button onClick={() => setMobileOpen(false)} className="text-white/60 p-2" aria-label="Close menu">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-8 px-8">
              <a href="#services" onClick={() => setMobileOpen(false)} className="text-2xl font-playfair text-white/80 hover:text-gold transition-colors">Services</a>
              <a href="#experience" onClick={() => setMobileOpen(false)} className="text-2xl font-playfair text-white/80 hover:text-gold transition-colors">Experience</a>
              <a href="#reviews" onClick={() => setMobileOpen(false)} className="text-2xl font-playfair text-white/80 hover:text-gold transition-colors">Reviews</a>
              <a href="#gallery" onClick={() => setMobileOpen(false)} className="text-2xl font-playfair text-white/80 hover:text-gold transition-colors">Gallery</a>
              <div className="mt-4 w-full">
                <button
                  onClick={() => { setMobileOpen(false); onBookClick(); }}
                  className="btn-primary w-full py-4 text-warm-dark font-bold text-sm rounded-full tracking-wider uppercase"
                >
                  Reserve Appointment
                </button>
              </div>
              <div className="flex gap-6 mt-4">
                <a href="https://www.instagram.com/dukes_of_beauty.ae/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-gold transition-colors">
                  <i className="fab fa-instagram text-xl"></i>
                </a>
                <a href="https://wa.me/971000000000" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-green-400 transition-colors">
                  <i className="fab fa-whatsapp text-xl"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// ==================== HERO SECTION ====================
const HeroSection = ({ onBookClick }: { onBookClick: () => void }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative min-h-[100svh] flex items-end md:items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://image.qwenlm.ai/generated-images/87034863-3839-440b-b247-f98923d1cdfd/_result.png"
          alt="Dukes of Beauty luxury salon interior"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-[2s] ${loaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}
        />
        <div className="absolute inset-0 hero-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-warm-dark/60 via-transparent to-warm-dark/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pb-16 md:pb-0 pt-32 md:pt-0">
        <div className="max-w-2xl">
          {/* Overheadline */}
          <div className={`transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <span className="inline-flex items-center gap-2.5 text-gold text-[11px] sm:text-xs font-inter tracking-[0.2em] uppercase">
              <span className="w-8 h-px bg-gold"></span>
              Business Bay, Dubai
            </span>
          </div>

          {/* Main headline */}
          <h1 className={`hero-title mt-5 font-playfair text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.05] tracking-tight transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-white">Where Beauty</span>
            <br />
            <span className="text-white">Becomes </span>
            <span className="animate-shimmer italic">Art</span>
          </h1>

          {/* Subheadline */}
          <p className={`mt-5 sm:mt-6 text-white/50 text-base sm:text-lg font-inter leading-relaxed max-w-lg transition-all duration-1000 delay-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Premium hair transformations, synchronized nail care & advanced aesthetics — curated for those who accept nothing less than perfection.
          </p>

          {/* CTA */}
          <div className={`mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 transition-all duration-1000 delay-900 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <button
              onClick={onBookClick}
              className="btn-primary animate-pulse-glow px-7 py-4 text-warm-dark font-bold text-sm rounded-full tracking-wider uppercase"
            >
              Reserve Your Visit
            </button>
            <a
              href="#services"
              className="px-7 py-4 border border-white/15 text-white/70 font-medium text-sm rounded-full hover:border-gold/40 hover:text-gold transition-all text-center"
            >
              Explore Services
            </a>
          </div>

          {/* Trust */}
          <div className={`mt-10 flex items-center gap-4 transition-all duration-1000 delay-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-3.5 h-3.5 text-gold fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                </svg>
              ))}
            </div>
            <span className="text-white/40 text-xs font-inter">
              <span className="text-gold font-medium">4.6</span> · 100+ Google Reviews
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==================== MARQUEE BANNER ====================
const MarqueeBanner = () => {
  const items = ['HAIR', '•', 'NAILS', '•', 'FACIALS', '•', 'LASHES', '•', 'BROWS', '•', 'MAKEUP', '•', 'MASSAGE', '•', 'K18', '•', 'AIRTOUCH', '•'];
  
  return (
    <div className="py-4 border-y border-white/5 overflow-hidden bg-warm-dark/50">
      <div className="animate-marquee whitespace-nowrap flex">
        {[...items, ...items].map((item, i) => (
          <span key={i} className={`mx-4 sm:mx-6 text-[11px] font-inter tracking-[0.3em] uppercase ${item === '•' ? 'text-gold/40' : 'text-white/30'}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

// ==================== FIRST TIME OFFER ====================
const FirstTimeOffer = () => {
  return (
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
            Your First Visit Deserves<br />
            <span className="text-gold italic">Something Special</span>
          </h2>
          
          <p className="mt-5 text-white/50 text-sm sm:text-base font-inter max-w-xl mx-auto leading-relaxed">
            Enjoy <span className="text-gold font-medium">20% OFF</span> your first 3 visits plus a complimentary 
            <span className="text-gold font-medium"> Kevin Murphy</span> treatment — because first impressions should be unforgettable.
          </p>
          
          <a
            href="https://n1359631.alteg.io/company/1297862/about"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-7 btn-primary px-7 py-3.5 text-warm-dark font-bold text-sm rounded-full tracking-wide uppercase"
          >
            Claim Offer
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </Reveal>
    </section>
  );
};

// ==================== SERVICES SECTION ====================
const services = [
  {
    icon: '✂️',
    title: 'Hair Artistry',
    subtitle: 'Cut · Color · Restore',
    description: 'Precision cuts, Airtouch coloring, custom toning & blonde transitions. Restorative treatments with K18, Tokio Inkarami, Nashi & Kevin Murphy.',
    image: 'https://image.qwenlm.ai/generated-images/878af96e-9f4a-4550-9dde-8a10a30c953c/_result.png',
  },
  {
    icon: '💅',
    title: 'Nail Therapies',
    subtitle: '4-Hand · 6-Hand · Luxury',
    description: 'Signature synchronized manicures & pedicures. Maximum luxury, minimum time — flawless results without sacrificing relaxation.',
    image: 'https://image.qwenlm.ai/generated-images/b9606f38-0e69-4456-93e9-29554389a9d7/_result.png',
  },
  {
    icon: '✨',
    title: 'Aesthetic Facials',
    subtitle: 'HydraFacial · Dermadrop · Oxygen',
    description: 'Medical-grade skin transformations: HydraFacial Syndeo, Dermadrop, oxygen infusion, anti-aging protocols & radiant tone restoration.',
    image: 'https://image.qwenlm.ai/generated-images/963d3943-a719-4b76-9135-d70348a65d01/_result.png',
  },
  {
    icon: '👁️',
    title: 'Brows, Lashes & Makeup',
    subtitle: 'Define · Frame · Transform',
    description: 'Bespoke brow architecture, premium volume lash extensions & flawless makeup — from natural elegance to full glam.',
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=400&fit=crop',
  },
  {
    icon: '🤲',
    title: 'Body Relaxation',
    subtitle: 'Massage · Therapy · Restore',
    description: 'Exclusive manual full-body relaxation therapies designed to melt away stress and restore your inner balance completely.',
    image: 'https://image.qwenlm.ai/generated-images/a3fc7be1-c8f0-4619-b94e-97ae14026c1c/_result.png',
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-gold text-[11px] font-inter tracking-[0.2em] uppercase">What We Do</span>
            <h2 className="section-title mt-3 font-playfair text-2xl sm:text-3xl md:text-5xl font-medium text-white">
              Our Services
            </h2>
          </div>
        </Reveal>

        {/* Mobile: stacked cards with images */}
        <div className="space-y-4 md:space-y-6">
          {services.map((service, index) => (
            <Reveal key={index} delay={index * 100}>
              <div className="card-hover group relative rounded-2xl overflow-hidden bg-warm-light/30 border border-white/5">
                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="sm:w-48 md:w-56 h-40 sm:h-auto flex-shrink-0 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover img-hover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 p-5 sm:p-6 md:p-8">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{service.icon}</span>
                      <div>
                        <h3 className="font-playfair text-lg sm:text-xl font-medium text-white group-hover:text-gold transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-gold/60 text-xs font-inter tracking-wide mt-0.5">{service.subtitle}</p>
                      </div>
                    </div>
                    <p className="mt-3 text-white/50 text-sm font-inter leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==================== EXPERIENCE / AMENITIES ====================
const amenities = [
  {
    icon: '🚗',
    title: 'Complimentary Valet',
    description: 'Premium valet parking directly at our entrance. Arrive effortlessly.',
  },
  {
    icon: '🛋️',
    title: 'Executive Recliners',
    description: 'Ultra-premium chairs for extended multi-hand procedures. Pure comfort.',
  },
  {
    icon: '☕',
    title: 'VIP Lounge Bar',
    description: 'Complimentary artisan coffee, matcha & luxury teas. Served fresh.',
  },
  {
    icon: '📶',
    title: 'High-Speed Wi-Fi',
    description: 'Stay connected throughout your visit with premium connectivity.',
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-warm-dark via-warm to-warm-dark"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-gold text-[11px] font-inter tracking-[0.2em] uppercase">The Experience</span>
            <h2 className="section-title mt-3 font-playfair text-2xl sm:text-3xl md:text-5xl font-medium text-white">
              More Than A Salon
            </h2>
            <p className="mt-4 text-white/40 text-sm sm:text-base font-inter max-w-lg mx-auto">
              Every detail curated. Every moment designed for your absolute comfort.
            </p>
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
};

// ==================== TESTIMONIALS ====================
const testimonials = [
  {
    name: 'Daria M.',
    text: 'Had a truly great experience at this beauty salon. I had a manicure, pedicure, and massage, and everything was absolutely amazing. The quality of work, service, and precise attention to detail are top-notch!',
    rating: 5,
  },
  {
    name: 'Elena R.',
    text: 'The best salon in Business Bay! Their Airtouch coloring and K18 treatment completely transformed my hair. Plus, having the 4-hand nail service saves so much time.',
    rating: 5,
  },
  {
    name: 'Anastasia K.',
    text: 'Absolutely love this place! The HydraFacial was incredible — my skin has never looked better. The staff is so professional and the atmosphere is pure luxury.',
    rating: 5,
  },
  {
    name: 'Maria S.',
    text: 'I came for a haircut and left feeling like a completely new person. The colorist understood exactly what I wanted. The valet service and complimentary coffee were the perfect touch.',
    rating: 5,
  },
  {
    name: 'Olga V.',
    text: 'Best lash extensions I have ever had! So natural and lightweight. The salon is immaculate and the team makes you feel like royalty from start to finish.',
    rating: 5,
  },
  {
    name: 'Natalia P.',
    text: 'The 6-hand manicure + pedicure experience is unreal. In under an hour I had a full set done perfectly. The attention to detail and luxury products used are worth every dirham.',
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="reviews" className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-gold text-[11px] font-inter tracking-[0.2em] uppercase">Testimonials</span>
            <h2 className="section-title mt-3 font-playfair text-2xl sm:text-3xl md:text-5xl font-medium text-white">
              What Our Guests Say
            </h2>
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-gold fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                ))}
              </div>
              <span className="text-white/40 text-xs font-inter">4.6 on Google · 100+ reviews</span>
            </div>
          </div>
        </Reveal>

        {/* Featured testimonial */}
        <Reveal>
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative p-6 sm:p-10 rounded-3xl bg-warm-light/20 border border-white/5">
              <div className="absolute top-5 left-6 text-gold/15 text-5xl sm:text-7xl font-playfair leading-none">"</div>
              <div className="relative pt-6 sm:pt-8">
                <p className="text-white/70 text-base sm:text-lg font-inter leading-relaxed italic min-h-[80px] sm:min-h-[60px]">
                  {testimonials[active].text}
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium text-sm font-inter">{testimonials[active].name}</p>
                    <p className="text-gold/50 text-xs font-inter">Verified Google Review</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(testimonials[active].rating)].map((_, i) => (
                      <svg key={i} className="w-3.5 h-3.5 text-gold fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              {/* Progress dots */}
              <div className="flex justify-center gap-1.5 mt-6">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === active ? 'bg-gold w-8' : 'bg-white/15 w-1.5 hover:bg-white/30'
                    }`}
                    aria-label={`View review ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Review cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {testimonials.slice(0, 3).map((review, index) => (
            <Reveal key={index} delay={index * 100}>
              <div className="card-hover p-5 sm:p-6 rounded-2xl bg-warm-light/20 border border-white/5">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 text-gold fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-white/50 text-xs sm:text-sm font-inter leading-relaxed line-clamp-3">
                  "{review.text}"
                </p>
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

// ==================== GALLERY ====================
const galleryImages = [
  { url: 'https://image.qwenlm.ai/generated-images/87034863-3839-440b-b247-f98923d1cdfd/_result.png', alt: 'Salon interior', tall: true },
  { url: 'https://image.qwenlm.ai/generated-images/878af96e-9f4a-4550-9dde-8a10a30c953c/_result.png', alt: 'Hair transformation', tall: false },
  { url: 'https://image.qwenlm.ai/generated-images/b9606f38-0e69-4456-93e9-29554389a9d7/_result.png', alt: 'Nail art', tall: true },
  { url: 'https://image.qwenlm.ai/generated-images/963d3943-a719-4b76-9135-d70348a65d01/_result.png', alt: 'Facial treatment', tall: false },
  { url: 'https://image.qwenlm.ai/generated-images/a3fc7be1-c8f0-4619-b94e-97ae14026c1c/_result.png', alt: 'Nail station', tall: true },
  { url: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=500&fit=crop', alt: 'Salon ambiance', tall: false },
  { url: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=500&fit=crop', alt: 'Hair coloring', tall: true },
  { url: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=400&fit=crop', alt: 'Spa room', tall: false },
];

const GallerySection = () => {
  return (
    <section id="gallery" className="py-16 sm:py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-warm-dark via-warm to-warm-dark"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-gold text-[11px] font-inter tracking-[0.2em] uppercase">Portfolio</span>
            <h2 className="section-title mt-3 font-playfair text-2xl sm:text-3xl md:text-5xl font-medium text-white">
              Our Work
            </h2>
            <a
              href="https://www.instagram.com/dukes_of_beauty.ae/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-gold/70 hover:text-gold transition-colors font-inter text-xs sm:text-sm"
            >
              <i className="fab fa-instagram"></i>
              @dukes_of_beauty.ae
            </a>
          </div>
        </Reveal>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
          {galleryImages.map((img, index) => (
            <Reveal key={index} delay={index * 50}>
              <div className="break-inside-avoid rounded-xl overflow-hidden relative group cursor-pointer">
                <img
                  src={img.url}
                  alt={img.alt}
                  className={`w-full object-cover img-hover ${img.tall ? 'h-56 sm:h-72 md:h-80' : 'h-40 sm:h-52 md:h-60'}`}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-3 sm:p-4">
                  <div className="flex items-center gap-1.5">
                    <i className="fab fa-instagram text-white/80 text-xs"></i>
                    <span className="text-white/80 text-[10px] sm:text-xs font-inter">@dukes_of_beauty.ae</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==================== FINAL CTA ====================
const FinalCta = ({ onBookClick }: { onBookClick: () => void }) => {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-warm-dark"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl animate-breathe"></div>
      </div>
      
      <Reveal>
        <div className="relative max-w-2xl mx-auto px-5 text-center">
          <h2 className="font-playfair text-2xl sm:text-3xl md:text-5xl font-medium text-white leading-tight">
            Ready to Experience<br />
            <span className="animate-shimmer italic">True Luxury?</span>
          </h2>
          <p className="mt-5 text-white/40 text-sm sm:text-base font-inter max-w-md mx-auto">
            Join our community of clients who refuse to settle for anything less than exceptional.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onBookClick}
              className="btn-primary animate-pulse-glow w-full sm:w-auto px-8 py-4 text-warm-dark font-bold text-sm rounded-full tracking-wider uppercase"
            >
              Book Your Appointment
            </button>
            <a
              href="https://wa.me/971000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 border border-green-500/20 text-green-400/80 font-medium text-sm rounded-full hover:bg-green-500/5 transition-all flex items-center justify-center gap-2"
            >
              <i className="fab fa-whatsapp"></i>
              WhatsApp Us
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

// ==================== FOOTER ====================
const Footer = () => {
  return (
    <footer className="border-t border-white/5 py-10 sm:py-14 bg-warm-dark">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-10">
          <div>
            <Logo size="md" />
            <p className="mt-4 text-white/30 text-xs font-inter leading-relaxed max-w-xs">
              Premium beauty salon in Business Bay, Dubai. Where artistry meets excellence.
            </p>
          </div>

          <div>
            <h4 className="text-white/60 text-[11px] font-inter tracking-[0.15em] uppercase mb-4">Navigate</h4>
            <div className="space-y-2.5">
              <a href="#services" className="block text-white/30 hover:text-gold text-xs font-inter transition-colors">Services</a>
              <a href="#experience" className="block text-white/30 hover:text-gold text-xs font-inter transition-colors">Experience</a>
              <a href="#reviews" className="block text-white/30 hover:text-gold text-xs font-inter transition-colors">Reviews</a>
              <a href="#gallery" className="block text-white/30 hover:text-gold text-xs font-inter transition-colors">Gallery</a>
            </div>
          </div>

          <div>
            <h4 className="text-white/60 text-[11px] font-inter tracking-[0.15em] uppercase mb-4">Visit</h4>
            <div className="space-y-2.5 text-white/30 text-xs font-inter">
              <p>Business Bay, Dubai, UAE</p>
              <p>Daily: 10:00 AM – 10:00 PM</p>
              <div className="flex gap-3 mt-3">
                <a href="https://www.instagram.com/dukes_of_beauty.ae/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold/10 hover:text-gold transition-all text-white/30 text-sm">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://wa.me/971000000000" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-green-500/10 hover:text-green-400 transition-all text-white/30 text-sm">
                  <i className="fab fa-whatsapp"></i>
                </a>
                <a href="https://n1359631.alteg.io/company/1297862/about" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold/10 hover:text-gold transition-all text-white/30 text-sm">
                  <i className="fas fa-calendar"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/20 text-[10px] font-inter">
            © 2024 Dukes of Beauty. All rights reserved.
          </p>
          <p className="text-white/15 text-[10px] font-inter">
            Business Bay, Dubai, UAE
          </p>
        </div>
      </div>
    </footer>
  );
};

// ==================== WHATSAPP FLOATING BADGE ====================
const WhatsAppBadge = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <a
      href="https://wa.me/971000000000"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/20 hover:bg-green-600 hover:scale-110 transition-all animate-scale-in"
      title="Chat with us on WhatsApp"
    >
      <i className="fab fa-whatsapp text-white text-xl sm:text-2xl"></i>
    </a>
  );
};

// ==================== BOOKING MODAL ====================
const BookingModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"></div>
      <div
        className="relative w-full sm:max-w-md bg-warm border border-white/10 rounded-t-3xl sm:rounded-3xl p-7 sm:p-8 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors p-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        </button>
        
        <div className="text-center">
          <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20 flex items-center justify-center mb-5">
            <span className="text-gold text-xl">✦</span>
          </div>
          <h3 className="font-playfair text-xl sm:text-2xl font-medium text-white mb-2">
            Reserve Your Visit
          </h3>
          <p className="text-white/40 text-sm font-inter mb-7">
            Select your preferred treatment, date & time on our secure booking platform.
          </p>
          <a
            href="https://n1359631.alteg.io/company/1297862/about"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary block w-full py-4 text-warm-dark font-bold text-sm rounded-full tracking-wider uppercase"
          >
            Open Booking System
          </a>
          <p className="mt-4 text-white/20 text-[10px] font-inter">
            Powered by Altegio · Instant Confirmation
          </p>
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
