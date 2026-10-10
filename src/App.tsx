import { useState, useEffect, useRef, type ReactNode } from 'react';

// ==================== SCROLL REVEAL HOOK ====================
function useScrollReveal() {
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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

const RevealSection = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  );
};

// ==================== ICONS ====================
const StarIcon = () => (
  <svg className="w-4 h-4 text-gold fill-current" viewBox="0 0 20 20">
    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
  </svg>
);

const StarRating = ({ rating = 5 }: { rating?: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: rating }).map((_, i) => (
      <StarIcon key={i} />
    ))}
  </div>
);

// ==================== BOOKING MODAL ====================
const BookingModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
      <div
        className="relative w-full max-w-lg bg-charcoal-light border border-gold/20 rounded-3xl p-8 sm:p-10 animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors">
          <i className="fas fa-times text-xl"></i>
        </button>
        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center mb-6">
            <span className="font-playfair text-charcoal font-bold text-2xl">D</span>
          </div>
          <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-white mb-3">
            Reserve Your Visit
          </h3>
          <p className="text-white/50 font-inter text-sm mb-8">
            You'll be redirected to our secure scheduling platform to select your preferred date, time, and treatment.
          </p>
          <a
            href="https://n1359631.alteg.io/company/1297862/about"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full px-8 py-4 bg-gradient-to-r from-gold to-gold-light text-charcoal font-bold text-base rounded-full hover:scale-105 transition-transform shadow-xl shadow-gold/20"
          >
            Open Booking System
            <i className="fas fa-external-link-alt ml-2 text-sm"></i>
          </a>
          <p className="mt-4 text-white/30 text-xs font-inter">
            Powered by Altegio • Secure & Instant Confirmation
          </p>
        </div>
      </div>
    </div>
  );
};

// ==================== NAVIGATION ====================
const Navigation = ({ onBookClick }: { onBookClick: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass shadow-lg shadow-black/20' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
              <span className="font-playfair text-charcoal font-bold text-lg">D</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-playfair text-lg md:text-xl font-semibold text-white tracking-wide">
                Dukes of Beauty
              </span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm text-white/70 hover:text-gold transition-colors font-inter">Services</a>
            <a href="#amenities" className="text-sm text-white/70 hover:text-gold transition-colors font-inter">Experience</a>
            <a href="#reviews" className="text-sm text-white/70 hover:text-gold transition-colors font-inter">Reviews</a>
            <a href="#gallery" className="text-sm text-white/70 hover:text-gold transition-colors font-inter">Gallery</a>
            <button
              onClick={onBookClick}
              className="px-5 py-2.5 bg-gradient-to-r from-gold to-gold-light text-charcoal font-semibold text-sm rounded-full hover:shadow-lg hover:shadow-gold/20 transition-all"
            >
              Book Now
            </button>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2"
          >
            <i className={`fas ${mobileOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden glass border-t border-gold/20 animate-fade-in">
          <div className="px-4 py-6 space-y-4">
            <a href="#services" onClick={() => setMobileOpen(false)} className="block text-white/80 hover:text-gold transition-colors font-inter py-2">Services</a>
            <a href="#amenities" onClick={() => setMobileOpen(false)} className="block text-white/80 hover:text-gold transition-colors font-inter py-2">Experience</a>
            <a href="#reviews" onClick={() => setMobileOpen(false)} className="block text-white/80 hover:text-gold transition-colors font-inter py-2">Reviews</a>
            <a href="#gallery" onClick={() => setMobileOpen(false)} className="block text-white/80 hover:text-gold transition-colors font-inter py-2">Gallery</a>
            <button
              onClick={() => { setMobileOpen(false); onBookClick(); }}
              className="block w-full text-center px-5 py-3 bg-gradient-to-r from-gold to-gold-light text-charcoal font-semibold rounded-full"
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

// ==================== HERO SECTION ====================
const HeroSection = ({ onBookClick }: { onBookClick: () => void }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://image.qwenlm.ai/generated-images/695d0d16-88b8-4634-81ca-c0b8514cc446/_result.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gold/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/10 rounded-full blur-3xl"></div>
        </div>
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(201,169,110,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20">
        <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/5 text-gold text-xs sm:text-sm font-inter tracking-widest uppercase">
            <span className="w-2 h-2 bg-gold rounded-full animate-pulse"></span>
            Dubai's Premier Luxury Salon Lounge
          </span>
        </div>

        <h1 className="mt-8 font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
          <span className="text-white">Redefining Beauty.</span>
          <br />
          <span className="animate-shimmer">Reimagining Luxury.</span>
        </h1>

        <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto font-inter leading-relaxed animate-fade-in-up opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
          Experience premium hair transformations, synchronized 4/6-hand nail care, and advanced aesthetic facial protocols in the heart of Business Bay, Dubai. Curated for those who demand absolute perfection.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
          <button
            onClick={onBookClick}
            className="cta-glow px-8 py-4 bg-gradient-to-r from-gold to-gold-light text-charcoal font-bold text-sm sm:text-base rounded-full hover:scale-105 transition-transform shadow-xl shadow-gold/20"
          >
            RESERVE AN APPOINTMENT
          </button>
          <a
            href="#services"
            className="px-8 py-4 border border-white/20 text-white font-medium text-sm sm:text-base rounded-full hover:border-gold/50 hover:text-gold transition-all"
          >
            EXPLORE PROCEDURES
          </a>
        </div>

        <div className="mt-12 animate-fade-in-up opacity-0" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/5 border border-white/10">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-gold fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                </svg>
              ))}
            </div>
            <span className="text-white/70 text-sm font-inter">
              <span className="text-gold font-semibold">4.6/5</span> Rated on Google Business Profile
            </span>
            <span className="text-white/40 text-sm hidden sm:inline">(100+ Reviews)</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-gold/30 flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-gold rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

// ==================== FIRST TIME OFFER ====================
const FirstTimeOffer = () => {
  return (
    <section className="relative py-16 sm:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-gold/10 to-gold/5"></div>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>
      </div>
      <RevealSection>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-inter tracking-widest uppercase mb-6">
            ✦ Exclusive Welcome ✦
          </span>
          <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            An Exclusive Welcome To The Club
          </h2>
          <p className="text-white/60 text-base sm:text-lg font-inter max-w-2xl mx-auto mb-8">
            Unlock <span className="text-gold font-semibold">20% OFF</span> your first 3 visits and receive a complimentary premium <span className="text-gold font-semibold">Kevin Murphy</span> hair treatment on us.
          </p>
          <a
            href="https://n1359631.alteg.io/company/1297862/about"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold to-gold-light text-charcoal font-bold text-sm rounded-full hover:scale-105 transition-transform"
          >
            Claim Your Welcome Offer Now
            <i className="fas fa-arrow-right text-xs"></i>
          </a>
        </div>
      </RevealSection>
    </section>
  );
};

// ==================== SERVICES SECTION ====================
const services = [
  {
    icon: 'fa-scissors',
    title: 'Hair Artistry & Restoration',
    description: 'Precision haircuts, custom single-process coloring, and advanced color correction techniques including Airtouch. Supported by ultra-premium restorative treatments by K18, Tokio Inkarami, Nashi, and Kevin Murphy.',
    tags: ['Airtouch', 'K18', 'Tokio Inkarami', 'Kevin Murphy', 'Nashi'],
  },
  {
    icon: 'fa-hand-sparkles',
    title: 'Synchronized Nail Therapies',
    description: 'Maximize luxury and respect your schedule. Our signature 4-hand and 6-hand simultaneous manicures and pedicures deliver flawless, high-speed execution without sacrificing relaxation.',
    tags: ['4-Hand', '6-Hand', 'Simultaneous', 'Luxury'],
  },
  {
    icon: 'fa-spa',
    title: 'Advanced Aesthetic Facials',
    description: 'Medical-grade, non-invasive skin transformations featuring HydraFacial Syndeo, Dermadrop, advanced oxygen infusion, anti-aging protocols, and radiant tone restoration.',
    tags: ['HydraFacial', 'Dermadrop', 'Oxygen', 'Anti-Aging'],
  },
  {
    icon: 'fa-eye',
    title: 'Brows, Lashes & Makeup',
    description: 'Bespoke brow framing, premium volume lash extensions, and flawless high-glam or minimalist professional makeup applications tailored to your facial architecture.',
    tags: ['Brow Design', 'Lash Extensions', 'Full Makeup', 'HD Brows'],
  },
  {
    icon: 'fa-heart',
    title: 'Manual Body Relaxation',
    description: 'Unwind deeply with our exclusive, specialized manual full-body relaxation therapies designed uniquely to melt away stress and restore your inner balance.',
    tags: ['Deep Tissue', 'Relaxation', 'Aromatherapy', 'Hot Stone'],
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealSection>
          <div className="text-center mb-16">
            <span className="text-gold text-xs font-inter tracking-widest uppercase">Our Expertise</span>
            <h2 className="mt-4 font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Core Service Clusters
            </h2>
            <p className="mt-4 text-white/50 font-inter max-w-2xl mx-auto">
              Each treatment is meticulously crafted using world-class products and techniques, delivered by Dubai's most sought-after beauty specialists.
            </p>
          </div>
        </RevealSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <RevealSection key={index}>
              <div
                className={`service-card group relative p-8 rounded-2xl bg-charcoal-light/50 border border-white/5 hover:border-gold/30 h-full ${
                  index === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="w-14 h-14 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                  <i className={`fas ${service.icon} text-gold text-xl`}></i>
                </div>

                <h3 className="font-playfair text-xl font-semibold text-white mb-3 group-hover:text-gold transition-colors">
                  {service.title}
                </h3>
                <p className="text-white/50 text-sm font-inter leading-relaxed mb-5">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/40 text-xs font-inter">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-gold/30 rounded-tr-lg"></div>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==================== AMENITIES SECTION ====================
const amenities = [
  {
    icon: 'fa-car',
    title: 'Complimentary Valet Parking',
    description: 'Hassle-free, premium valet parking directly outside our Business Bay venue. Arrive in style, depart with ease.',
  },
  {
    icon: 'fa-couch',
    title: 'The Executive Recliner Experience',
    description: 'Lie back in ultra-premium luxury chairs during extended multi-hand procedures. Every moment is designed for your comfort.',
  },
  {
    icon: 'fa-mug-hot',
    title: 'VIP Beverage & Lounge Menu',
    description: 'Sip complimentary artisan coffee, premium matcha, or luxury teas prepared freshly at our internal lounge bar.',
  },
];

const AmenitiesSection = () => {
  return (
    <section id="amenities" className="py-20 sm:py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.02] to-transparent"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealSection>
          <div className="text-center mb-16">
            <span className="text-gold text-xs font-inter tracking-widest uppercase">The Experience</span>
            <h2 className="mt-4 font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Luxury Beyond The Treatment
            </h2>
            <p className="mt-4 text-white/50 font-inter max-w-2xl mx-auto">
              Every detail of your visit has been curated to exceed expectations. From the moment you arrive to the final reveal.
            </p>
          </div>
        </RevealSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {amenities.map((item, index) => (
            <RevealSection key={index}>
              <div className="text-center group">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <i className={`fas ${item.icon} text-gold text-2xl`}></i>
                </div>
                <h3 className="font-playfair text-xl font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-white/50 text-sm font-inter leading-relaxed max-w-xs mx-auto">
                  {item.description}
                </p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==================== TESTIMONIALS SECTION ====================
const testimonials = [
  {
    name: 'Daria M.',
    text: 'Had a truly great experience at this beauty salon. I had a manicure, pedicure, and massage, and everything was absolutely amazing. The quality of work, service, and precise attention to detail are top-notch!',
    rating: 5,
    source: 'Google Review',
  },
  {
    name: 'Elena R.',
    text: 'The best salon in Business Bay! Their Airtouch coloring and K18 treatment completely transformed my hair. Plus, having the 4-hand nail service saves so much time.',
    rating: 5,
    source: 'Google Review',
  },
  {
    name: 'Anastasia K.',
    text: 'Absolutely love this place! The HydraFacial was incredible — my skin has never looked better. The staff is so professional and the atmosphere is pure luxury.',
    rating: 5,
    source: 'Google Review',
  },
  {
    name: 'Maria S.',
    text: 'I came for a haircut and left feeling like a completely new person. The colorist understood exactly what I wanted. The valet service and complimentary coffee were the perfect touch.',
    rating: 5,
    source: 'Google Review',
  },
  {
    name: 'Olga V.',
    text: 'Best lash extensions I have ever had! So natural and lightweight. The salon is immaculate and the team makes you feel like royalty from start to finish.',
    rating: 5,
    source: 'Google Review',
  },
  {
    name: 'Natalia P.',
    text: 'The 6-hand manicure + pedicure experience is unreal. In under an hour I had a full set done perfectly. The attention to detail and luxury products used are worth every dirham.',
    rating: 5,
    source: 'Google Review',
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section id="reviews" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealSection>
          <div className="text-center mb-16">
            <span className="text-gold text-xs font-inter tracking-widest uppercase">Testimonials</span>
            <h2 className="mt-4 font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              What Our Guests Say About Us
            </h2>
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-gold fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                ))}
              </div>
              <span className="text-white/60 text-sm font-inter">4.6/5 on Google (100+ Reviews)</span>
            </div>
          </div>
        </RevealSection>

        {/* Featured testimonial carousel */}
        <RevealSection>
          <div className="max-w-3xl mx-auto mb-16">
            <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-charcoal-light to-charcoal-medium border border-gold/10">
              <div className="absolute top-6 left-8 text-gold/20 text-6xl font-playfair">"</div>
              <div className="relative">
                <p className="text-white/80 text-lg sm:text-xl font-inter leading-relaxed italic mb-8 pt-4">
                  {testimonials[currentIndex].text}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-semibold font-inter">{testimonials[currentIndex].name}</p>
                    <p className="text-gold/60 text-sm font-inter">Verified {testimonials[currentIndex].source}</p>
                  </div>
                  <StarRating rating={testimonials[currentIndex].rating} />
                </div>
              </div>
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentIndex ? 'bg-gold w-6' : 'bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </RevealSection>

        {/* Review cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((review, index) => (
            <RevealSection key={index}>
              <div className="review-card p-6 rounded-2xl bg-charcoal-light/50 border border-white/5 h-full">
                <StarRating rating={review.rating} />
                <p className="mt-4 text-white/60 text-sm font-inter leading-relaxed" style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  "{review.text}"
                </p>
                <div className="mt-4 pt-4 border-t border-white/5">
                  <p className="text-white text-sm font-semibold font-inter">{review.name}</p>
                  <p className="text-white/40 text-xs font-inter">{review.source}</p>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==================== GALLERY SECTION ====================
const galleryImages = [
  { url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=500&fit=crop', alt: 'Luxury salon interior' },
  { url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a375?w=400&h=400&fit=crop', alt: 'Hair styling result' },
  { url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=500&fit=crop', alt: 'Nail art result' },
  { url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=400&fit=crop', alt: 'Facial treatment' },
  { url: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=500&fit=crop', alt: 'Makeup application' },
  { url: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=400&fit=crop', alt: 'Salon ambiance' },
  { url: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=500&fit=crop', alt: 'Spa treatment room' },
  { url: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=400&fit=crop', alt: 'Hair coloring result' },
];

const GallerySection = () => {
  return (
    <section id="gallery" className="py-20 sm:py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.02] to-transparent"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealSection>
          <div className="text-center mb-16">
            <span className="text-gold text-xs font-inter tracking-widest uppercase">Portfolio</span>
            <h2 className="mt-4 font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Our Work Speaks For Itself
            </h2>
            <p className="mt-4 text-white/50 font-inter max-w-2xl mx-auto">
              Real transformations. Real results. Follow us on Instagram for daily inspiration.
            </p>
            <a
              href="https://www.instagram.com/dukes_of_beauty.ae/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-gold hover:text-gold-light transition-colors font-inter text-sm"
            >
              <i className="fab fa-instagram text-lg"></i>
              @dukes_of_beauty.ae
            </a>
          </div>
        </RevealSection>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {galleryImages.map((img, index) => (
            <div key={index} className="gallery-item break-inside-avoid rounded-xl overflow-hidden relative group cursor-pointer">
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <div className="flex items-center gap-2">
                  <i className="fab fa-instagram text-white text-sm"></i>
                  <span className="text-white text-xs font-inter">@dukes_of_beauty.ae</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==================== CTA FOOTER ====================
const CtaFooter = ({ onBookClick }: { onBookClick: () => void }) => {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal-light via-charcoal to-charcoal-light"></div>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
      </div>

      <RevealSection>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Elevate Your<br />
            <span className="animate-shimmer">Beauty Experience?</span>
          </h2>
          <p className="text-white/50 font-inter text-base sm:text-lg max-w-xl mx-auto mb-10">
            Join hundreds of satisfied clients who trust Dukes of Beauty for their premium beauty transformations in Dubai.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onBookClick}
              className="cta-glow px-10 py-4 bg-gradient-to-r from-gold to-gold-light text-charcoal font-bold text-base rounded-full hover:scale-105 transition-transform shadow-xl shadow-gold/20"
            >
              Book Now via Altegio
            </button>
            <a
              href="https://wa.me/971000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-green-500/30 text-green-400 font-medium rounded-full hover:bg-green-500/10 transition-all flex items-center gap-2"
            >
              <i className="fab fa-whatsapp text-lg"></i>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </RevealSection>
    </section>
  );
};

// ==================== FOOTER ====================
const Footer = () => {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
                <span className="font-playfair text-charcoal font-bold text-lg">D</span>
              </div>
              <span className="font-playfair text-xl font-semibold text-white">Dukes of Beauty</span>
            </div>
            <p className="text-white/40 text-sm font-inter leading-relaxed">
              Dubai's premier luxury beauty salon in Business Bay. Where artistry meets excellence.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold font-inter mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="#services" className="block text-white/40 hover:text-gold text-sm font-inter transition-colors">Our Services</a>
              <a href="#amenities" className="block text-white/40 hover:text-gold text-sm font-inter transition-colors">The Experience</a>
              <a href="#reviews" className="block text-white/40 hover:text-gold text-sm font-inter transition-colors">Client Reviews</a>
              <a href="#gallery" className="block text-white/40 hover:text-gold text-sm font-inter transition-colors">Gallery</a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold font-inter mb-4">Visit Us</h4>
            <div className="space-y-2 text-white/40 text-sm font-inter">
              <p className="flex items-center gap-2">
                <i className="fas fa-map-marker-alt text-gold/60"></i>
                Business Bay, Dubai, UAE
              </p>
              <p className="flex items-center gap-2">
                <i className="fas fa-clock text-gold/60"></i>
                Open Daily: 10:00 AM – 10:00 PM
              </p>
              <div className="flex gap-4 mt-4">
                <a href="https://www.instagram.com/dukes_of_beauty.ae/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-gold/30 hover:text-gold transition-all text-white/40">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://wa.me/971000000000" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-gold/30 hover:text-gold transition-all text-white/40">
                  <i className="fab fa-whatsapp"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-gold/30 hover:text-gold transition-all text-white/40">
                  <i className="fab fa-google"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs font-inter">
            © 2024 Dukes of Beauty. All rights reserved.
          </p>
          <p className="text-white/20 text-xs font-inter">
            Business Bay, Dubai, UAE
          </p>
        </div>
      </div>
    </footer>
  );
};

// ==================== WHATSAPP BADGE ====================
const WhatsAppBadge = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {showTooltip && (
        <div className="absolute bottom-16 right-0 bg-charcoal-light border border-white/10 rounded-xl p-3 shadow-xl whitespace-nowrap animate-fade-in">
          <p className="text-white text-sm font-inter">Chat with an Expert</p>
          <p className="text-white/40 text-xs font-inter">WhatsApp • Instant Reply</p>
          <div className="absolute -bottom-1 right-6 w-2 h-2 bg-charcoal-light border-r border-b border-white/10 rotate-45"></div>
        </div>
      )}
      <a
        href="https://wa.me/971000000000"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-badge w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30 hover:bg-green-600 transition-all"
        title="Chat with an Expert Strategist"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <i className="fab fa-whatsapp text-white text-2xl"></i>
      </a>
    </div>
  );
};

// ==================== MAIN APP ====================
export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-charcoal text-white font-inter">
      <Navigation onBookClick={() => setBookingOpen(true)} />
      <HeroSection onBookClick={() => setBookingOpen(true)} />
      <div className="section-divider"></div>
      <FirstTimeOffer />
      <div className="section-divider"></div>
      <ServicesSection />
      <div className="section-divider"></div>
      <AmenitiesSection />
      <div className="section-divider"></div>
      <TestimonialsSection />
      <div className="section-divider"></div>
      <GallerySection />
      <div className="section-divider"></div>
      <CtaFooter onBookClick={() => setBookingOpen(true)} />
      <Footer />
      <WhatsAppBadge />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
