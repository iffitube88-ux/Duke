import { useCallback, useEffect, useMemo, useRef, useState, type Dispatch, type PointerEvent, type SetStateAction } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Clock3, Instagram, MapPin, Menu, MessageCircle, Phone, Plus, Search, X } from 'lucide-react';
import Booking from './Booking';
import { brand } from './brand';
import { catalog, getEstimate, getSelected } from './catalog';
import { serviceCategories } from './salonData';

type Book = () => void;
type Selected = Dispatch<SetStateAction<string[]>>;

const sections = [
  { label: 'The salon', href: '#atelier' },
  { label: 'Treatments', href: '#discover' },
  { label: 'Price menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Visit us', href: '#contact' },
];

function useReveals() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nodes.forEach(node => node.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: .08, rootMargin: '0px 0px -30px 0px' });
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function Logo() {
  return <a href="#top" aria-label="Dukes of Beauty home" className="logo"><img src={brand.logo} alt="Dukes of Beauty" /></a>;
}

function Header({ onBook }: { onBook: Book }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 70);
    scroll();
    window.addEventListener('scroll', scroll, { passive: true });
    return () => window.removeEventListener('scroll', scroll);
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', key);
    return () => document.removeEventListener('keydown', key);
  }, [menuOpen]);
  return <>
    <header className={'header ' + (scrolled ? 'scrolled' : '')}>
      <div className="wrap nav-layout">
        <Logo />
        <nav className="main-nav" aria-label="Main navigation">
          {sections.map(section => <a key={section.href} href={section.href}>{section.label}</a>)}
        </nav>
        <div className="nav-actions">
          <button className="outline-gold nav-appointment" onClick={onBook}>Request an appointment <ArrowUpRight size={16} /></button>
          <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>{menuOpen ? <X size={25}/> : <Menu size={25}/>}</button>
        </div>
      </div>
    </header>
    {menuOpen && <nav className="mobile-navigation" aria-label="Mobile menu">
      {sections.map(section => <a href={section.href} key={section.href} onClick={() => setMenuOpen(false)}>{section.label}<ArrowUpRight size={19}/></a>)}
      <button onClick={() => { setMenuOpen(false); onBook(); }}>Request appointment <ArrowRight size={20}/></button>
    </nav>}
  </>;
}

function Hero({ onBook }: { onBook: Book }) {
  const frame = useRef<HTMLDivElement>(null);
  const reactToPointer = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch' || !frame.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = frame.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    frame.current.style.setProperty('--rotate-x', (-y * 3.5).toFixed(2) + 'deg');
    frame.current.style.setProperty('--rotate-y', (x * 4).toFixed(2) + 'deg');
  };
  return <section id="top" className="hero">
    <div className="hero-image"><img src={brand.hero} alt="The Dukes of Beauty salon interior" fetchPriority="high"/></div>
    <div className="hero-vignette"/>
    <div className="hero-inner wrap">
      <div className="hero-copy">
        <p className="eyebrow hero-eyebrow"><span className="gold-dash"/> THE ART OF BEAUTY · DUBAI</p>
        <h1>A beautiful<br/>way to <em>feel.</em></h1>
        <p className="hero-description">A moment for your hair, your skin, your nails—and most importantly, for you. Discover Dukes of Beauty in Business Bay.</p>
        <div className="hero-buttons">
          <button className="gold-button" onClick={onBook}>Request your visit <ArrowUpRight size={19}/></button>
          <a href="#discover" className="hero-text-link">Explore treatments <ArrowRight size={18}/></a>
        </div>
        <p className="hero-footnote"><MessageCircle size={15}/> Bookings are requested on WhatsApp and confirmed by the salon.</p>
      </div>
      <div className="hero-frame" ref={frame} onPointerMove={reactToPointer} onPointerLeave={() => {
        frame.current?.style.setProperty('--rotate-x', '0deg');
        frame.current?.style.setProperty('--rotate-y', '0deg');
      }}>
        <div className="hero-frame-inner"><img src={brand.photos[0]} alt="Dukes of Beauty salon" loading="eager"/></div>
        <div className="frame-corner frame-corner-a"/><div className="frame-corner frame-corner-b"/>
        <span className="hero-photo-label"><span>DUKES</span><small>BUSINESS BAY · DUBAI</small></span>
      </div>
    </div>
    <div className="hero-bottom wrap"><a href="#atelier">SCROLL TO EXPLORE <ArrowDown size={17}/></a><span>DUKES OF BEAUTY — BUSINESS BAY, DUBAI</span></div>
  </section>;
}

function WordRibbon() {
  const words = ['HAIR', 'NAILS', 'SKIN', 'LASHES & BROWS', 'MASSAGE', 'BEAUTY'];
  return <div className="word-ribbon"><div className="word-track">{[...words, ...words].map((word, index) => <span key={index}>{word}<span aria-hidden="true">✳</span></span>)}</div></div>;
}

function SalonStory({ onBook }: { onBook: Book }) {
  return <section className="section-space salon-story" id="atelier"><div className="wrap story-layout">
    <div className="story-photos" data-reveal>
      <div className="story-image-large"><img src={brand.photos[0]} alt="Inside the Dukes of Beauty salon" loading="lazy"/></div>
      <div className="story-image-small"><img src={brand.photos[1]} alt="Dukes of Beauty nail treatment detail" loading="lazy"/></div>
      <div className="story-stamp"><span>THE SALON</span><strong>DB.</strong></div>
    </div>
    <div className="story-content" data-reveal>
      <span className="eyebrow gold-label">01 — THE DUKES EXPERIENCE</span>
      <h2>Where the little<br/><em>things matter.</em></h2>
      <div className="tiny-rule"/>
      <p>Dukes of Beauty is a salon in Business Bay offering a considered selection of hair, nail, brow, skincare and wellness treatments.</p>
      <p>A fresh colour, beautiful nails or an hour to unwind. Choose the treatments that feel right to you, and arrange your visit directly with the salon.</p>
      <button className="gold-underline-link" onClick={onBook}>Let us plan your visit <ArrowUpRight size={20}/></button>
    </div>
  </div></section>;
}

const featureCategories = [
  { id:'hair', title:'Hair & styling', subtitle:'CUT · COLOUR · TREATMENT', image:brand.hero, num:'01'},
  { id:'nails', title:'Nails & beauty', subtitle:'MANICURE · PEDICURE · ART', image:brand.photos[1], num:'02'},
  { id:'facials', title:'Skin & facials', subtitle:'HYDRAFACIAL · SKIN CARE', image:brand.photos[4], num:'03'},
  { id:'lashes', title:'Lashes & brows', subtitle:'EXTENSIONS · SHAPING', image:brand.photos[6], num:'04'},
];

function Spotlight({ onCategory }: { onCategory: (id: string) => void }) {
  const tilt = (event: PointerEvent<HTMLButtonElement>) => {
    if(event.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r=event.currentTarget.getBoundingClientRect(),x=(event.clientX-r.left)/r.width-.5,y=(event.clientY-r.top)/r.height-.5;
    event.currentTarget.style.setProperty('--tilt-x',(-y*4).toFixed(2)+'deg');
    event.currentTarget.style.setProperty('--tilt-y',(x*4).toFixed(2)+'deg');
  };
  const reset=(event:PointerEvent<HTMLButtonElement>)=>{event.currentTarget.style.setProperty('--tilt-x','0deg');event.currentTarget.style.setProperty('--tilt-y','0deg');};
  return <section className="section-space spotlight" id="discover">
    <div className="wrap">
      <div className="editorial-heading" data-reveal><div><span className="eyebrow gold-label">02 — THE TREATMENT COLLECTION</span><h2>Find your <em>ritual.</em></h2></div><p>Explore a little something for yourself. Browse the salon's treatments and choose what you'd love to experience.</p></div>
      <div className="spotlight-grid">{featureCategories.map(item => <button className="spotlight-card" type="button" key={item.id} onPointerMove={tilt} onPointerLeave={reset} onClick={() => onCategory(item.id)}>
        <span className="spotlight-image"><img src={item.image} alt={'Dukes of Beauty salon photo for ' + item.title} loading="lazy"/><span className="spotlight-arrow"><ArrowUpRight size={21}/></span><span className="spotlight-number">{item.num}/04</span></span>
        <span className="spotlight-text"><strong>{item.title}</strong><small>{item.subtitle}</small></span>
      </button>)}</div>
      <div className="spotlight-end"><span>FIND THE SERVICE THAT FEELS LIKE YOU</span><a href="#menu" className="gold-underline-link">View all treatments <ArrowUpRight size={18}/></a></div>
    </div>
  </section>;
}

function Signature() {
  return <section className="signature"><div className="signature-ornament left"/><div className="wrap signature-inner" data-reveal>
    <span className="eyebrow gold-label">BEAUTY IS PERSONAL</span>
    <h2>Take the time.<br/><em>Make it yours.</em></h2>
    <p>DUKES OF BEAUTY · BUSINESS BAY</p>
  </div><div className="signature-ornament right"/></section>;
}

function Services({ category, onCategory, selected, setSelected, onBook }: {
  category:string; onCategory:(cat:string)=>void; selected:string[]; setSelected:Selected; onBook:Book;
}) {
  const [search,setSearch]=useState('');
  const [expanded,setExpanded]=useState(false);
  const results=useMemo(()=>{
    const term=search.trim().toLowerCase();
    return catalog.filter(item=>term?(item.name+' '+item.category).toLowerCase().includes(term):item.categoryId===category);
  },[search,category]);
  const visible=expanded||search?results:results.slice(0,9);
  const chooseService=(id:string)=>setSelected(prev=>prev.includes(id)?prev.filter(i=>i!==id):[...prev,id]);
  const active=serviceCategories.find(item=>item.id===category);
  return <section id="menu" className="section-space services-section">
    <div className="wrap">
      <div className="editorial-heading" data-reveal><div><span className="eyebrow gold-label">03 — THE COMPLETE SERVICE MENU</span><h2>Created for <em>you.</em></h2></div><p>Explore all 111 treatments, listed durations and prices. Select your favourites to prepare a WhatsApp appointment request.</p></div>
      <div className="menu-panel" data-reveal>
        <div className="menu-toolbar"><span className="eyebrow">THE SERVICE MENU <small>111 TREATMENTS</small></span><label className="menu-search"><Search size={17}/><input type="search" aria-label="Search treatments" placeholder="Search treatments..." value={search} onChange={event=>{setSearch(event.target.value);setExpanded(true);}} /></label></div>
        <div className="category-tabs" role="tablist" aria-label="Treatment categories">{serviceCategories.map(item=><button type="button" role="tab" aria-selected={!search&&category===item.id} key={item.id} className={category===item.id&&!search?'active':''} onClick={()=>{onCategory(item.id);setSearch('');setExpanded(false);}}>{item.title}<small>{item.services.length}</small></button>)}</div>
        <div className="menu-content">
          <div className="menu-section-title"><h3>{search?'Search results':active?.title}</h3><span>{results.length} TREATMENTS</span></div>
          <div className="menu-list">{visible.map(item => <button className={'menu-item '+(selected.includes(item.id)?'is-selected':'')} key={item.id} onClick={()=>chooseService(item.id)} aria-pressed={selected.includes(item.id)}>
            <span className="menu-item-label"><strong>{item.name}</strong><small><Clock3 size={13}/>{item.duration}</small></span>
            <span className="menu-item-right"><b>{item.price}</b><i>{selected.includes(item.id)?<Check size={17}/>:<Plus size={17}/>}</i></span>
          </button>)}
          {!visible.length&&<p className="menu-empty">No matching treatments. Try another search.</p>}</div>
          <div className="menu-bottom">
            {!search&&results.length>9?<button className="view-more" onClick={()=>setExpanded(!expanded)}>{expanded?'Show fewer treatments':'View all '+results.length+' treatments'} <ArrowDown size={15}/></button>:<span>FINAL PRICES CONFIRMED BY THE SALON</span>}
            <button className="menu-book" onClick={onBook}>Request appointment <ArrowUpRight size={18}/></button>
          </div>
        </div>
      </div>
    </div>
  </section>;
}

function PhotoInterlude({ onBook }: { onBook:Book }) {
  return <section className="photo-interlude"><img src={brand.photos[4]} alt="Dukes of Beauty salon treatment room" loading="lazy"/><div className="photo-interlude-shade"/>
    <div className="wrap interlude-content" data-reveal><span className="eyebrow">A MOMENT JUST FOR YOU</span><h2>Your time <em>to glow.</em></h2><p>Choose your treatments and send your preferred visit details directly to the Dukes of Beauty team.</p><button className="gold-button" onClick={onBook}>Request your moment <ArrowUpRight size={18}/></button></div>
    <span className="interlude-side-label">DUKES OF BEAUTY / DUBAI</span>
  </section>;
}

function Gallery() {
  const [open,setOpen]=useState<number|null>(null);
  const navigate=useCallback((direction:number)=>setOpen(prev=>prev===null?null:(prev+direction+brand.photos.length)%brand.photos.length),[]);
  useEffect(()=>{
    if(open===null)return;
    const key=(event:KeyboardEvent)=>{if(event.key==='Escape')setOpen(null);if(event.key==='ArrowLeft')navigate(-1);if(event.key==='ArrowRight')navigate(1);};
    document.addEventListener('keydown',key);
    return()=>document.removeEventListener('keydown',key);
  },[open,navigate]);
  return <section id="gallery" className="section-space gallery-section"><div className="wrap">
    <div className="editorial-heading" data-reveal><div><span className="eyebrow gold-label">04 — INSIDE DUKES</span><h2>The beauty of <em>details.</em></h2></div><p>Discover real photographs from Dukes of Beauty and its salon treatments.</p></div>
    <div className="gallery-grid">{brand.photos.map((photo,index)=><button key={photo} className={'gallery-tile tile-'+index} onClick={()=>setOpen(index)} aria-label={'View salon photo '+(index+1)}>
      <img src={photo} alt={'Dukes of Beauty salon gallery photo '+(index+1)} loading="lazy"/><span><Plus size={20}/></span>
    </button>)}</div>
    <div className="gallery-footer"><span>DUKES OF BEAUTY · REAL SALON PHOTOGRAPHY</span><a href={brand.instagram} target="_blank" rel="noopener noreferrer">Explore our Instagram <Instagram size={17}/><ArrowUpRight size={17}/></a></div>
  </div>
  {open!==null&&<div className="lightbox" role="dialog" aria-label="Salon photo viewer" aria-modal="true" onClick={()=>setOpen(null)}>
    <button aria-label="Close image viewer" className="lightbox-close" onClick={()=>setOpen(null)}><X size={25}/></button>
    <button aria-label="Previous image" className="lightbox-prev" onClick={event=>{event.stopPropagation();navigate(-1);}}><ChevronLeft size={26}/></button>
    <img src={brand.photos[open]} alt={'Dukes of Beauty photo '+(open+1)} onClick={event=>event.stopPropagation()}/>
    <button aria-label="Next image" className="lightbox-next" onClick={event=>{event.stopPropagation();navigate(1);}}><ChevronRight size={26}/></button>
    <small>{open+1} / {brand.photos.length}</small>
  </div>}
  </section>;
}

function Reviews() {
  return <section className="review-section"><div className="wrap review-layout" data-reveal>
    <div className="review-symbol">G<span>.</span></div>
    <div><span className="eyebrow gold-label">CLIENT EXPERIENCES</span><h2>In their <em>own words.</em></h2><p>Read genuine customer reviews directly on Dukes of Beauty's Google listing.</p></div>
    <a href={brand.maps} target="_blank" rel="noopener noreferrer" className="outline-gold">Read Google reviews <ArrowUpRight size={17}/></a>
  </div></section>;
}

function Visit({ onBook }:{onBook:Book}) {
  return <section id="contact" className="section-space visit-section"><div className="wrap visit-grid">
    <div className="visit-content" data-reveal><span className="eyebrow gold-label">05 — COME FIND US</span><h2>We'd love<br/>to see <em>you.</em></h2><p>Find Dukes of Beauty in Business Bay, Dubai. Browse your treatments and request a time that works for you.</p>
      <div className="visit-details"><div><MapPin size={19}/><span><strong>Find the salon</strong><small>{brand.address}</small></span></div><div><Phone size={19}/><span><strong>Call or WhatsApp</strong><a href={'tel:'+brand.phone}>+971 52 816 7306</a></span></div></div>
      <div className="visit-actions"><button className="gold-button" onClick={onBook}>Request appointment <ArrowUpRight size={18}/></button><a href={brand.maps} className="gold-underline-link" target="_blank" rel="noopener noreferrer">Get directions <ArrowRight size={17}/></a></div>
    </div>
    <div className="visit-image" data-reveal><img src={brand.photos[0]} alt="Dukes of Beauty salon in Business Bay" loading="lazy"/><div className="visit-image-address"><MapPin size={20}/><span>15 NORTHSIDE 1 RETAIL<small>BUSINESS BAY · DUBAI</small></span></div></div>
  </div></section>;
}

function Footer({ onBook }:{onBook:Book}) {
  return <footer className="footer"><div className="wrap footer-grid">
    <div className="footer-brand"><Logo/><p>Beauty, in every little detail.<br/>Your moment starts here.</p></div>
    <div className="footer-links"><span>DISCOVER</span><a href="#atelier">The salon</a><a href="#discover">Treatments</a><a href="#menu">Price menu</a><a href="#gallery">Gallery</a></div>
    <div className="footer-links"><span>CONNECT</span><a href={brand.instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</a><a href={brand.maps} target="_blank" rel="noopener noreferrer">Google Maps ↗</a><a href={'tel:'+brand.phone}>+971 52 816 7306</a></div>
    <div className="footer-appointment"><span className="eyebrow">YOUR MOMENT AWAITS</span><button onClick={onBook}>Let's make time <ArrowUpRight size={23}/></button></div>
  </div><div className="wrap footer-base"><span>© {new Date().getFullYear()} DUKES OF BEAUTY</span><span>BUILT BY <a href="https://www.iffimedia.com" target="_blank" rel="noopener noreferrer">WWW.IFFIMEDIA.COM</a></span><a href="#top">BACK TO TOP ↑</a></div></footer>;
}

function SelectionDock({ selected, clear, onBook }:{selected:string[];clear:()=>void;onBook:Book}) {
  if(!selected.length)return null;
  return <aside className="selection-dock" aria-label="Selected treatments"><span className="selection-count">{selected.length}<small> selected</small></span><span className="selection-names">{getSelected(selected).slice(0,2).map(s=>s.name).join(' · ')}{selected.length>2?' + more':''}</span><strong>{getEstimate(selected).label}</strong><button className="selection-clear" onClick={clear} aria-label="Clear selections"><X size={18}/></button><button className="selection-continue" onClick={onBook}>Continue <ArrowRight size={18}/></button></aside>;
}

export default function App() {
  const [bookingOpen,setBookingOpen] = useState(false);
  const [selected,setSelected] = useState<string[]>([]);
  const [category,setCategory] = useState('hair');
  useReveals();
  const onBook=()=>setBookingOpen(true);
  const toCategory=(id:string)=>{setCategory(id);document.getElementById('menu')?.scrollIntoView({behavior:'smooth',block:'start'});};
  return <div className="site">
    <Header onBook={onBook}/>
    <main><Hero onBook={onBook}/><WordRibbon/><SalonStory onBook={onBook}/><Spotlight onCategory={toCategory}/><Signature/><Services category={category} onCategory={setCategory} selected={selected} setSelected={setSelected} onBook={onBook}/><PhotoInterlude onBook={onBook}/><Gallery/><Reviews/><Visit onBook={onBook}/></main>
    <Footer onBook={onBook}/>
    <SelectionDock selected={selected} clear={()=>setSelected([])} onBook={onBook}/>
    <Booking open={bookingOpen} close={()=>setBookingOpen(false)} selected={selected} setSelected={setSelected}/>
    <SpeedInsights/>
  </div>;
}
