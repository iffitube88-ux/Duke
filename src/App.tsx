import { useEffect, useMemo, useRef, useState, type PointerEvent } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, Check, ChevronLeft, ChevronRight, Instagram, MapPin, Menu, MessageCircle, Phone, Plus, Search, X } from 'lucide-react';
import Booking from './Booking';
import { brand } from './brand';
import { catalog, getEstimate, getSelected } from './catalog';
import { serviceCategories } from './salonData';

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { elements.forEach(item => item.classList.add('in-view')); return; }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); }
    }), { rootMargin: '0px 0px -25px 0px', threshold: 0.08 });
    elements.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function SiteLogo({ dark = false }: { dark?: boolean }) {
  return <a className={'brand-logo ' + (dark ? 'brand-logo-dark' : '')} href="#top" aria-label="Dukes of Beauty home">
    <img src={brand.logo} alt="Dukes of Beauty" />
  </a>;
}

function Header({ onBook }: { onBook: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 45);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
  const closeMenu = () => setOpen(false);
  return <>
    <header className={'site-header ' + (scrolled ? 'is-scrolled' : '')}>
      <div className="site-shell header-content">
        <SiteLogo />
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#about">The salon</a>
          <a href="#experiences">Experiences</a>
          <a href="#menu">Services & prices</a>
          <a href="#gallery">Gallery</a>
          <a href="#visit">Visit us</a>
        </nav>
        <div className="header-actions"><button className="header-book" onClick={onBook}>Book a visit <ArrowUpRight size={15}/></button>
          <button className="menu-trigger" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>{open ? <X size={24}/> : <Menu size={24}/>}</button>
        </div>
      </div>
    </header>
    {open && <nav className="mobile-nav" aria-label="Mobile navigation">
      {[['The salon','#about'],['Experiences','#experiences'],['Services & prices','#menu'],['Gallery','#gallery'],['Visit us','#visit']].map(([label,href]) =>
        <a key={href} href={href} onClick={closeMenu}>{label}<ArrowUpRight size={19}/></a>)}
      <button onClick={() => {closeMenu();onBook();}}>Request appointment <ArrowRight size={20}/></button>
    </nav>}
  </>;
}

function tilt(event: PointerEvent<HTMLElement>) {
  if (event.pointerType === 'touch') return;
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - .5;
  const y = (event.clientY - rect.top) / rect.height - .5;
  card.style.setProperty('--tilt-x', String(-y * 8) + 'deg');
  card.style.setProperty('--tilt-y', String(x * 9) + 'deg');
}
function resetTilt(event: PointerEvent<HTMLElement>) {
  event.currentTarget.style.setProperty('--tilt-x', '0deg');
  event.currentTarget.style.setProperty('--tilt-y', '0deg');
}

function Hero({ onBook }: { onBook: () => void }) {
  const stage = useRef<HTMLDivElement>(null);
  const moveScene = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch' || !stage.current) return;
    const r = stage.current.getBoundingClientRect();
    const x = (event.clientX - r.left) / r.width - .5;
    const y = (event.clientY - r.top) / r.height - .5;
    stage.current.style.setProperty('--move-x', String(x * 20) + 'px');
    stage.current.style.setProperty('--move-y', String(y * 18) + 'px');
  };
  return <section className="hero" id="top">
    <div className="hero-glow glow-one"/><div className="hero-glow glow-two"/>
    <div className="hero-grid site-shell">
      <div className="hero-copy">
        <span className="hero-kicker"><i/> DUKES OF BEAUTY · BUSINESS BAY</span>
        <h1>Beauty,<br/><em>in another</em><br/>dimension<span className="hero-period">.</span></h1>
        <p className="hero-description">A modern destination for hair, nails, skin and beauty in the heart of Dubai. Your next favourite moment starts here.</p>
        <div className="hero-buttons"><button className="primary-cta" onClick={onBook}>Reserve your moment <ArrowUpRight size={18}/></button><a className="ghost-cta" href="#experiences">Explore the salon <ArrowDown size={17}/></a></div>
        <p className="hero-note"><MessageCircle size={16}/> Appointments are requested via WhatsApp and confirmed by the salon.</p>
      </div>
      <div className="hero-visual" onPointerMove={moveScene} onPointerLeave={() => { if(stage.current){stage.current.style.setProperty('--move-x','0px');stage.current.style.setProperty('--move-y','0px');}}} ref={stage} aria-label="Layered 3D photographs of Dukes of Beauty">
        <div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/>
        <div className="hero-plinth"/>
        <div className="hero-frame hero-frame-back"><img src={brand.photos[1]} alt="Dukes of Beauty nail services" loading="eager"/></div>
        <div className="hero-frame hero-frame-main"><img src={brand.hero} alt="Inside Dukes of Beauty salon" fetchPriority="high"/><span className="hero-image-number">01 / THE SPACE</span></div>
        <div className="hero-frame hero-frame-front"><img src={brand.photos[4]} alt="Dukes of Beauty salon treatment area" loading="eager"/></div>
        <div className="hero-float hero-float-top"><span className="float-dot"/><span>BUSINESS BAY <small>DUBAI, UAE</small></span></div>
        <div className="hero-float hero-float-bottom"><span className="float-icon">✳</span><span>Beauty, your way <small>HAIR · NAILS · SKIN</small></span></div>
        <div className="hero-scene-bottom">THE ART OF LOOKING & FEELING YOUR BEST</div>
      </div>
    </div>
    <a href="#about" className="hero-scroll">SCROLL TO DISCOVER <ArrowDown size={14}/></a>
    <span className="hero-side-label">DUKES OF BEAUTY — DUBAI</span>
  </section>;
}

function Facts() {
  return <section className="facts"><div className="site-shell facts-grid">
    <div><span className="fact-icon">✳</span><span><strong>Seven ways to feel beautiful</strong><small>Explore our treatment categories</small></span></div>
    <div><span className="fact-icon"><MessageCircle size={23}/></span><span><strong>Personal booking requests</strong><small>Directly with the salon on WhatsApp</small></span></div>
    <div><span className="fact-icon"><MapPin size={23}/></span><span><strong>In the heart of Business Bay</strong><small>15 Northside 1 Retail, Dubai</small></span></div>
  </div></section>;
}

function Intro({ onBook }: { onBook: () => void }) {
  return <section id="about" className="section intro-section"><div className="site-shell intro-layout">
    <div className="intro-visual reveal">
      <div className="intro-main-photo depth-photo" onPointerMove={tilt} onPointerLeave={resetTilt}><img src={brand.photos[0]} alt="Dukes of Beauty salon interior" loading="lazy"/></div>
      <div className="intro-float-photo"><img src={brand.photos[3]} alt="Dukes of Beauty manicure colour selection" loading="lazy"/></div>
      <span className="intro-circle-stamp">D&nbsp; / &nbsp; B</span>
      <span className="intro-caption">A SPACE TO RESET · BUSINESS BAY</span>
    </div>
    <div className="intro-copy reveal">
      <span className="eyebrow eyebrow-green">01 — A LITTLE MORE ABOUT US</span>
      <h2>Not just a salon.<br/><em>A feeling.</em></h2>
      <p>Beauty is personal. So is the way you make time for it. At Dukes of Beauty, you can explore a complete menu of hair services, nail care, lashes and brows, facials, massage and body treatments.</p>
      <p>Choose what feels right, tell us when you'd like to visit and let the salon confirm your appointment directly.</p>
      <div className="intro-cta"><button className="text-cta" onClick={onBook}>Plan your visit <ArrowUpRight size={20}/></button><span>BUSINESS BAY · DUBAI</span></div>
    </div>
  </div></section>;
}

const featured = [
  { title:'Hair & styling',detail:'Cut · colour · care',cat:'hair',img:brand.hero,number:'01'},
  { title:'Nail rituals',detail:'Manicure · pedicure · nail art',cat:'nails',img:brand.photos[1],number:'02'},
  { title:'Skin & facials',detail:'HydraFacial · facial treatments',cat:'facials',img:brand.photos[4],number:'03'},
  { title:'Lashes & brows',detail:'Extensions · lamination · tint',cat:'lashes',img:brand.photos[5],number:'04'}
];
function Experiences({ onCategory }: { onCategory: (id: string) => void }) {
  return <section id="experiences" className="section experiences-section"><div className="site-shell">
    <div className="section-head reveal">
      <div><span className="eyebrow eyebrow-green">02 — THE EXPERIENCE</span><h2>Find your <em>beautiful.</em></h2></div>
      <p>Explore the treatments you love. Select any card to find its services and prices below.</p>
    </div>
    <div className="experience-grid">{featured.map(item => <button className="experience-card reveal" key={item.cat} onPointerMove={tilt} onPointerLeave={resetTilt} onClick={() => onCategory(item.cat)}>
      <span className="experience-visual"><img src={item.img} alt={'Salon gallery photograph — ' + item.title} loading="lazy"/><span className="experience-index">{item.number} / 04</span><span className="experience-launch"><ArrowUpRight size={21}/></span></span>
      <span className="experience-label"><strong>{item.title}</strong><small>{item.detail}</small></span>
    </button>)}</div>
  </div></section>;
}

function Services({ selected, setSelected, category, setCategory, onBook }: {
  selected: string[]; setSelected: (updater: (ids: string[]) => string[]) => void;
  category: string; setCategory: (id: string) => void; onBook: () => void;
}) {
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(false);
  const options = useMemo(() => catalog.filter(item => query.trim()
    ? (item.name + ' ' + item.category).toLowerCase().includes(query.trim().toLowerCase())
    : item.categoryId === category), [query, category]);
  const visible = expanded || query ? options : options.slice(0, 8);
  const toggle = (id: string) => setSelected(previous => previous.includes(id) ? previous.filter(item => item !== id) : [...previous, id]);
  return <section id="menu" className="section services-section"><div className="site-shell">
    <div className="section-head menu-heading reveal">
      <div><span className="eyebrow eyebrow-green">03 — THE COMPLETE MENU</span><h2>Curated for <em>you.</em></h2></div>
      <p>Every treatment, easy to find. Browse actual services, see listed prices and build your own visit.</p>
    </div>
    <div className="menu-shell reveal">
      <div className="menu-topbar"><span>EXPLORE THE TREATMENT MENU</span><div className="menu-search"><Search size={19}/><input type="search" value={query} onChange={event => {setQuery(event.target.value);setExpanded(true);}} placeholder="Find a service..." aria-label="Search services and prices" /></div></div>
      <div className="menu-tabs" role="tablist" aria-label="Treatment categories">{serviceCategories.map(group => <button type="button" role="tab" aria-selected={category === group.id && !query} className={category === group.id && !query ? 'active' : ''} key={group.id} onClick={() => {setCategory(group.id);setQuery('');setExpanded(false);}}>
        <span>{group.title}</span><small>{group.services.length}</small>
      </button>)}</div>
      <div className="service-list">
        <div className="service-list-header"><h3>{query ? 'Search results' : serviceCategories.find(group => group.id === category)?.title}</h3><span>{options.length} TREATMENTS</span></div>
        {visible.map(item => <button className={'service-item ' + (selected.includes(item.id) ? 'selected' : '')} key={item.id} onClick={() => toggle(item.id)} aria-pressed={selected.includes(item.id)}>
          <span className="service-item-info"><strong>{item.name}</strong><small>{item.duration}</small></span>
          <span className="service-item-action"><b>{item.price}</b><span className="add-service">{selected.includes(item.id) ? <Check size={19}/> : <Plus size={19}/>}</span></span>
        </button>)}
        {!visible.length && <div className="menu-empty">No treatments found. Try another search.</div>}
      </div>
      <div className="menu-footer">{!query && options.length > 8 ? <button type="button" className="menu-more" onClick={() => setExpanded(!expanded)}>{expanded ? 'Show fewer services' : 'View all ' + options.length + ' services'} <ArrowDown size={16}/></button> : <span>PRICES ARE IN AED · FINAL PRICING CONFIRMED BY SALON</span>}
        <button className="menu-book" onClick={onBook}>Request appointment <ArrowUpRight size={18}/></button>
      </div>
    </div>
  </div></section>;
}

function Interlude({ onBook }: { onBook: () => void }) {
  return <section className="interlude"><div className="site-shell interlude-inner">
    <div className="interlude-ring ring-a"/><div className="interlude-ring ring-b"/>
    <div className="interlude-content reveal"><span className="eyebrow">A MOMENT JUST FOR YOU</span><h2>Feel like <em>yourself.</em><br/>Only more.</h2><p>Take a little time for your next hair, skin or nail appointment.</p><button className="primary-cta" onClick={onBook}>Request a visit <ArrowUpRight size={18}/></button></div>
    <div className="interlude-photo depth-photo reveal" onPointerMove={tilt} onPointerLeave={resetTilt}><img src={brand.photos[5]} alt="Photograph from the Dukes of Beauty salon gallery" loading="lazy"/><span>DUKES / BUSINESS BAY</span></div>
  </div></section>;
}

function Gallery() {
  const [active, setActive] = useState<number|null>(null);
  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(null);
      if (event.key === 'ArrowRight') setActive(i => i === null ? null : (i + 1) % brand.photos.length);
      if (event.key === 'ArrowLeft') setActive(i => i === null ? null : (i + brand.photos.length - 1) % brand.photos.length);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [active]);
  return <section id="gallery" className="section gallery-section"><div className="site-shell">
    <div className="section-head reveal"><div><span className="eyebrow eyebrow-green">04 — THROUGH OUR LENS</span><h2>A glimpse <em>inside.</em></h2></div><p>Explore imagery from the salon and the treatments on offer.</p></div>
    <div className="gallery-grid">{brand.photos.slice(0, 8).map((photo, i) => <button className={'gallery-tile gallery-tile-' + i + ' reveal'} key={photo} onClick={() => setActive(i)} aria-label={'Open salon gallery photo ' + (i + 1)}><img src={photo} alt={'Dukes of Beauty salon gallery photo ' + (i + 1)} loading="lazy"/><span><Plus size={22}/></span></button>)}</div>
    <div className="gallery-bottom"><span>REAL SALON IMAGES · DUKES OF BEAUTY</span><a href={brand.instagram} target="_blank" rel="noopener noreferrer">Explore Instagram <Instagram size={17}/><ArrowUpRight size={17}/></a></div>
  </div>
  {active !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Salon gallery viewer" onClick={() => setActive(null)}>
    <button className="lightbox-close" aria-label="Close image" onClick={() => setActive(null)}><X size={25}/></button>
    <button className="lightbox-prev" aria-label="Previous image" onClick={event => {event.stopPropagation();setActive((active+brand.photos.length-1)%brand.photos.length);}}><ChevronLeft size={25}/></button>
    <img src={brand.photos[active]} alt={'Enlarged Dukes of Beauty gallery photo ' + (active + 1)} onClick={event => event.stopPropagation()}/>
    <button className="lightbox-next" aria-label="Next image" onClick={event => {event.stopPropagation();setActive((active+1)%brand.photos.length);}}><ChevronRight size={25}/></button>
    <small>{active+1} / {brand.photos.length}</small>
  </div>}
  </section>;
}

function HowItWorks({ onBook }: { onBook: () => void }) {
  return <section className="section how-section"><div className="site-shell how-layout">
    <div className="reveal"><span className="eyebrow eyebrow-green">05 — SIMPLE BY DESIGN</span><h2>Booking should<br/>feel <em>effortless.</em></h2><p>Find something you love and send your preferred visit details to the salon in just a few taps.</p><button className="text-cta" onClick={onBook}>Start a request <ArrowUpRight size={21}/></button></div>
    <div className="how-steps reveal">{[
      ['01','Discover','Browse services, durations and listed prices.'],
      ['02','Choose your moment','Pick your preferred date and time in Dubai.'],
      ['03','Speak to the salon','Continue to WhatsApp for availability and confirmation.']
    ].map(([number,title,detail]) => <div className="how-step" key={number}><span>{number}</span><div><h3>{title}</h3><p>{detail}</p></div><ArrowUpRight size={20}/></div>)}</div>
  </div></section>;
}

function Reviews() {
  return <section className="reviews-section"><div className="site-shell reviews-layout reveal">
    <div className="reviews-mark">G<span>.</span></div><div><span className="eyebrow eyebrow-green">SEE WHAT PEOPLE SAY</span><h2>Real words.<br/><em>Real experiences.</em></h2><p>Visit the salon's Google listing to read reviews directly from their source. No made-up testimonials, ratings or promises.</p></div>
    <a href={brand.maps} target="_blank" rel="noopener noreferrer" className="outline-cta">Read Google reviews <ArrowUpRight size={19}/></a>
  </div></section>;
}

function Visit({ onBook }: { onBook: () => void }) {
  return <section className="section visit-section" id="visit"><div className="site-shell visit-grid">
    <div className="visit-copy reveal"><span className="eyebrow eyebrow-green">06 — COME FIND US</span><h2>Your next <em>visit</em><br/>starts here.</h2><p>Visit Dukes of Beauty in Business Bay, Dubai, or request your appointment directly through WhatsApp.</p>
      <div className="visit-details"><div><MapPin size={20}/><span><strong>Find the salon</strong><small>{brand.address}</small></span></div><div><Phone size={20}/><span><strong>Call or message</strong><a href={'tel:' + brand.phone}>+971 52 816 7306</a></span></div></div>
      <div className="visit-actions"><a className="primary-cta" href={brand.maps} target="_blank" rel="noopener noreferrer">Get directions <ArrowUpRight size={18}/></a><button className="secondary-cta" onClick={onBook}>Book via WhatsApp <MessageCircle size={18}/></button></div>
    </div>
    <div className="visit-photo depth-photo reveal" onPointerMove={tilt} onPointerLeave={resetTilt}><img src={brand.photos[0]} alt="Dukes of Beauty salon in Business Bay" loading="lazy"/><div className="visit-address-bubble"><MapPin size={20}/><span>15 NORTHSIDE 1 RETAIL<br/><strong>BUSINESS BAY · DUBAI</strong></span></div></div>
  </div></section>;
}

function Footer({ onBook }: { onBook: () => void }) {
  return <footer className="footer"><div className="site-shell">
    <div className="footer-top"><div><SiteLogo/><p>More than a beauty appointment.<br/>A moment to make your own.</p></div><div className="footer-links"><a href="#about">Our salon</a><a href="#menu">Services & prices</a><a href="#gallery">Gallery</a><a href="#visit">Contact</a></div><div className="footer-cta"><span>YOUR MOMENT IS WAITING</span><button onClick={onBook}>Reserve a visit <ArrowUpRight size={22}/></button><div><a aria-label="Instagram" href={brand.instagram} target="_blank" rel="noopener noreferrer"><Instagram size={20}/></a><a aria-label="WhatsApp" href={'https://wa.me/'+brand.wa} target="_blank" rel="noopener noreferrer"><MessageCircle size={20}/></a></div></div></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} DUKES OF BEAUTY. ALL RIGHTS RESERVED.</span><span>BUILT BY <a href="https://www.iffimedia.com" target="_blank" rel="noopener noreferrer">WWW.IFFIMEDIA.COM</a></span><a href="#top">BACK TO TOP ↑</a></div>
  </div></footer>;
}

function SelectionDock({ selected, onBook, clear }: { selected: string[]; onBook: () => void; clear: () => void }) {
  if (!selected.length) return null;
  const estimate = getEstimate(selected);
  return <div className="selection-dock" role="status"><span className="dock-count">{selected.length} <small>selected</small></span><span className="dock-summary">{getSelected(selected).slice(0, 2).map(item=>item.name).join(' · ')}{selected.length>2?' + more':''}</span><span className="dock-price">{estimate.label}</span><button className="dock-clear" onClick={clear} aria-label="Clear selected services"><X size={18}/></button><button className="dock-book" onClick={onBook}>Continue <ArrowRight size={18}/></button></div>;
}

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [category, setCategory] = useState('hair');
  useReveal();
  const openBooking = () => setBookingOpen(true);
  const goToCategory = (id: string) => {
    setCategory(id);
    window.requestAnimationFrame(() => document.getElementById('menu')?.scrollIntoView({ behavior:'smooth' }));
  };
  return <div className="site-root">
    <Header onBook={openBooking}/>
    <main><Hero onBook={openBooking}/><Facts/><Intro onBook={openBooking}/><Experiences onCategory={goToCategory}/><Services selected={selected} setSelected={setSelected} category={category} setCategory={setCategory} onBook={openBooking}/><Interlude onBook={openBooking}/><Gallery/><HowItWorks onBook={openBooking}/><Reviews/><Visit onBook={openBooking}/></main>
    <Footer onBook={openBooking}/>
    <SelectionDock selected={selected} onBook={openBooking} clear={() => setSelected([])}/>
    <Booking open={bookingOpen} close={() => setBookingOpen(false)} selected={selected} setSelected={setSelected}/>
    <SpeedInsights/>
  </div>;
}
