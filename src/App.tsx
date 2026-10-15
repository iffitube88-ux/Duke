import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Instagram, MapPin, Menu, MessageCircle, Phone, Plus, Search, X } from 'lucide-react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Booking from './Booking';
import { brand } from './brand';
import { catalog, getEstimate, getSelected } from './catalog';
import { serviceCategories } from './salonData';

function useReveals() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('[data-reveal]');
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nodes.forEach(n => n.classList.add('seen')); return;
    }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('seen'); observer.unobserve(entry.target); }
    }), { rootMargin: '0px 0px -40px 0px', threshold: .05 });
    nodes.forEach(n => observer.observe(n));
    return () => observer.disconnect();
  }, []);
}

function Logo({ light = false }: { light?: boolean }) {
  return <a className={'wordmark ' + (light ? 'light' : '')} href="#top" aria-label="Dukes of Beauty home">
    <img src={brand.logo} alt="Dukes of Beauty"/>
  </a>;
}
function Header({ onBook }: { onBook: () => void }) {
  const [open,setOpen]=useState(false);
  const links=[['Our salon','#salon'],['Experiences','#experiences'],['Services & prices','#prices'],['Gallery','#gallery'],['Visit us','#contact']];
  useEffect(()=>{
    if(!open)return;
    const key=(e:KeyboardEvent)=>{if(e.key==='Escape')setOpen(false);};
    document.addEventListener('keydown',key);
    return()=>document.removeEventListener('keydown',key);
  },[open]);
  return <>
    <header className="site-nav"><div className="container nav-layout">
      <Logo/>
      <nav className="nav-links" aria-label="Main navigation">{links.map(([title,href])=><a key={href} href={href}>{title}</a>)}</nav>
      <div className="nav-right"><button className="nav-reserve" onClick={onBook}>Book a visit <ArrowUpRight size={17}/></button><button className="nav-menu-btn" onClick={()=>setOpen(!open)} aria-expanded={open} aria-label={open?'Close menu':'Open menu'}>{open?<X size={23}/>:<Menu size={23}/>}</button></div>
    </div></header>
    {open&&<nav className="mobile-menu" aria-label="Mobile navigation">{links.map(([title,href])=><a key={href} href={href} onClick={()=>setOpen(false)}>{title}<ArrowUpRight size={19}/></a>)}<button onClick={()=>{setOpen(false);onBook();}}>Request appointment <ArrowRight size={18}/></button></nav>}
  </>;
}

function Hero({ onBook }: { onBook: () => void }) {
  const ref=useRef<HTMLDivElement>(null);
  const move=(event:PointerEvent<HTMLDivElement>)=>{
    if(!ref.current||event.pointerType==='touch'||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const b=ref.current.getBoundingClientRect(), x=(event.clientX-b.left)/b.width-.5, y=(event.clientY-b.top)/b.height-.5;
    ref.current.style.setProperty('--rx',String(-y*4)+'deg');
    ref.current.style.setProperty('--ry',String(x*5)+'deg');
  };
  return <section className="hero" id="top">
    <div className="hero-copy-panel"><div className="hero-copy">
      <p className="eyebrow"><span className="short-line"/> BUSINESS BAY · DUBAI</p>
      <h1>A little more<br/><em>beautiful.</em><br/>Every day<span>.</span></h1>
      <p className="hero-description">A place to pause, be cared for and feel like your most beautiful self. Welcome to Dukes of Beauty.</p>
      <div className="hero-actions"><button className="button-main" onClick={onBook}>Request an appointment <ArrowUpRight size={18}/></button><a className="link-underline" href="#experiences">Explore treatments <ArrowRight size={16}/></a></div>
      <p className="hero-note"><MessageCircle size={16}/> Bookings are requested on WhatsApp and confirmed by the salon.</p>
    </div><div className="hero-bottom"><span>DUKES OF BEAUTY</span><a href="#salon">SCROLL TO DISCOVER <ArrowDown size={14}/></a></div></div>
    <div className="hero-art">
      <div className="hero-photo" ref={ref} onPointerMove={move} onPointerLeave={()=>{ref.current?.style.setProperty('--rx','0deg');ref.current?.style.setProperty('--ry','0deg');}}>
        <img src={brand.hero} fetchPriority="high" alt="Dukes of Beauty salon interior"/>
      </div>
      <div className="hero-photo-index"><span>01</span><span>THE SALON EXPERIENCE</span></div>
      <div className="hero-layer-image"><img src={brand.photos[1]} alt="Nail care at Dukes of Beauty"/></div>
      <span className="hero-vertical">BEAUTY IN EVERY DETAIL</span>
    </div>
  </section>;
}
function About({ onBook }: { onBook: () => void }) {
  return <section className="about section-pad" id="salon"><div className="container about-grid">
    <div className="about-images" data-reveal><img className="about-main-image" src={brand.photos[0]} alt="Inside Dukes of Beauty salon" loading="lazy"/><img className="about-overlap-image" src={brand.photos[3]} alt="Nail shades at Dukes of Beauty" loading="lazy"/><span>THE ART OF A LITTLE TIME FOR YOURSELF</span></div>
    <div className="about-copy" data-reveal><p className="section-no">01 / THE SALON</p><h2>Beauty is<br/><em>personal.</em></h2><div className="small-rule"/><p>Sometimes the smallest details make the biggest difference. A fresh cut, a new manicure, a skin ritual, or simply an hour that's only yours.</p><p>At Dukes of Beauty in Business Bay, explore hair, nails, lashes, facial and body treatments and request the moment that suits you.</p><button className="text-action" onClick={onBook}>Plan your visit <ArrowUpRight size={19}/></button></div>
  </div></section>;
}
const featured=[
 {id:'hair',title:'Hair & styling',subtitle:'Cuts, colour & treatments',photo:brand.hero,num:'01'},
 {id:'nails',title:'Nail artistry',subtitle:'Manicure, pedicure & details',photo:brand.photos[1],num:'02'},
 {id:'facials',title:'Skin & facials',subtitle:'Facial care and rituals',photo:brand.photos[4],num:'03'},
 {id:'lashes',title:'Lashes & brows',subtitle:'Shape, colour & definition',photo:brand.photos[5],num:'04'}
];
function Experiences({ choose }: { choose:(id:string)=>void }) {
  return <section className="experiences section-pad" id="experiences"><div className="container">
    <div className="section-title" data-reveal><div><p className="section-no">02 / DISCOVER YOUR RITUAL</p><h2>Find your <em>beautiful.</em></h2></div><p>Beautiful is personal. Find the treatment that feels like you, then explore its services and prices.</p></div>
    <div className="experience-grid">{featured.map(item=><button className="experience-card" data-reveal onClick={()=>choose(item.id)} key={item.id} aria-label={'Explore '+item.title}><span className="experience-photo"><img src={item.photo} alt={'Dukes of Beauty photography for '+item.title} loading="lazy"/><span className="experience-arrow"><ArrowUpRight size={22}/></span></span><span className="experience-copy"><small>{item.num} / 04</small><strong>{item.title}</strong><span>{item.subtitle}</span></span></button>)}</div>
    <div className="experience-end"><span>HAIR · NAILS · SKIN · LASHES · MASSAGE · BODY</span><a href="#prices" className="text-action">Explore all 111 treatments <ArrowUpRight size={18}/></a></div>
  </div></section>;
}
function Statement(){
  return <section className="statement"><div className="container statement-inner"><p>THE DUKES OF BEAUTY EXPERIENCE</p><h2>Take a moment.<br/><em>Make it yours.</em></h2><span className="statement-star">✳</span></div></section>;
}

function Services({ selected, setSelected, category, setCategory, onBook }:{
 selected:string[];setSelected:(fn:(s:string[])=>string[])=>void;category:string;setCategory:(id:string)=>void;onBook:()=>void;
}){
 const [query,setQuery]=useState(''),[expanded,setExpanded]=useState(false);
 const results=useMemo(()=>{
  const term=query.trim().toLowerCase();
  return catalog.filter(s=>term?(s.name+' '+s.category).toLowerCase().includes(term):s.categoryId===category);
 },[query,category]);
 const shown=(expanded||query)?results:results.slice(0,9);
 const toggle=(id:string)=>setSelected(prev=>prev.includes(id)?prev.filter(i=>i!==id):[...prev,id]);
 return <section id="prices" className="services section-pad"><div className="container">
  <div className="section-title" data-reveal><div><p className="section-no">03 / TREATMENT & PRICE MENU</p><h2>Made for <em>you.</em></h2></div><p>Browse the complete service menu. Select your treatments and request a preferred appointment on WhatsApp.</p></div>
  <div className="service-panel" data-reveal>
   <div className="service-panel-header"><span>EXPLORE OUR SERVICES <small>111 TREATMENTS</small></span><label className="service-search"><Search size={19}/><input type="search" placeholder="Search services..." aria-label="Search services and prices" value={query} onChange={e=>{setQuery(e.target.value);setExpanded(true);}}/></label></div>
   <div className="service-tabs" role="tablist" aria-label="Treatment categories">{serviceCategories.map(c=><button key={c.id} role="tab" aria-selected={!query&&c.id===category} className={c.id===category&&!query?'active':''} onClick={()=>{setCategory(c.id);setQuery('');setExpanded(false);}}>{c.title}<small>{c.services.length}</small></button>)}</div>
   <div className="service-body">
    <div className="service-category-header"><h3>{query?'Search results':serviceCategories.find(c=>c.id===category)?.title}</h3><span>{results.length} SERVICES</span></div>
    <div className="service-rows">{shown.map(s=><button type="button" key={s.id} aria-pressed={selected.includes(s.id)} className={'service-row '+(selected.includes(s.id)?'selected':'')} onClick={()=>toggle(s.id)}><span><strong>{s.name}</strong><small>{s.duration}</small></span><span className="service-row-right"><b>{s.price}</b><i>{selected.includes(s.id)?<Check size={18}/>:<Plus size={18}/>}</i></span></button>)}{!shown.length&&<p className="service-empty">No matching services. Try another search.</p>}</div>
    <div className="service-foot">{!query&&results.length>9?<button className="show-more" onClick={()=>setExpanded(v=>!v)}>{expanded?'Show fewer services':'View all '+results.length+' services'} <ArrowDown size={16}/></button>:<span>PRICES IN AED · FINAL PRICES CONFIRMED BY THE SALON</span>}<button className="service-book" onClick={onBook}>Request booking <ArrowRight size={17}/></button></div>
   </div>
  </div>
 </div></section>;
}
function EditorialCallout({onBook}:{onBook:()=>void}){
 return <section className="editorial-callout"><img src={brand.photos[4]} alt="Dukes of Beauty treatment room" loading="lazy"/><div className="editorial-shade"/><div className="container editorial-content"><p>BEAUTY, ON YOUR TERMS</p><h2>Your time <em>to glow.</em></h2><span>Plan your next appointment with Dukes of Beauty.</span><button onClick={onBook} className="button-light">Request a visit <ArrowUpRight size={18}/></button></div><span className="editorial-side">DUKES OF BEAUTY · DUBAI</span></section>;
}
function Gallery(){
 const [active,setActive]=useState<number|null>(null);
 const move=useCallback((v:number)=>setActive(old=>old===null?null:(old+v+brand.photos.length)%brand.photos.length),[]);
 useEffect(()=>{if(active===null)return;const key=(e:KeyboardEvent)=>{if(e.key==='Escape')setActive(null);if(e.key==='ArrowRight')move(1);if(e.key==='ArrowLeft')move(-1);};document.addEventListener('keydown',key);return()=>document.removeEventListener('keydown',key);},[active,move]);
 return <section className="gallery section-pad" id="gallery"><div className="container"><div className="section-title" data-reveal><div><p className="section-no">04 / THROUGH OUR LENS</p><h2>Inside <em>Dukes.</em></h2></div><p>A glimpse inside our salon and its beauty treatments, using real photographs.</p></div>
 <div className="gallery-grid">{brand.photos.map((url,i)=><button key={url} data-reveal className={'gallery-item gallery-'+i} aria-label={'Open gallery photograph '+(i+1)} onClick={()=>setActive(i)}><img src={url} alt={'Dukes of Beauty salon gallery photo '+(i+1)} loading="lazy"/><span><Plus size={20}/></span></button>)}</div>
 <div className="gallery-end"><span>REAL SALON PHOTOGRAPHY</span><a href={brand.instagram} target="_blank" rel="noopener noreferrer">More on Instagram <Instagram size={16}/><ArrowUpRight size={16}/></a></div></div>
 {active!==null&&<div className="lightbox" role="dialog" aria-modal="true" aria-label="Salon gallery" onClick={()=>setActive(null)}><button className="lightbox-close" aria-label="Close gallery" onClick={()=>setActive(null)}><X size={25}/></button><button className="lightbox-prev" aria-label="Previous image" onClick={e=>{e.stopPropagation();move(-1);}}><ChevronLeft size={24}/></button><img src={brand.photos[active]} alt={'Enlarged salon photograph '+(active+1)} onClick={e=>e.stopPropagation()}/><button className="lightbox-next" aria-label="Next image" onClick={e=>{e.stopPropagation();move(1);}}><ChevronRight size={24}/></button><small>{active+1} / {brand.photos.length}</small></div>}
 </section>;
}
function Visit({onBook}:{onBook:()=>void}){
 return <section className="visit section-pad" id="contact"><div className="container visit-layout">
 <div className="visit-copy" data-reveal><p className="section-no">05 / FIND YOUR MOMENT</p><h2>We'll see<br/><em>you soon.</em></h2><p>Visit Dukes of Beauty in Business Bay, Dubai. Choose a treatment, or get in touch directly to request an appointment.</p>
 <div className="visit-details"><div><MapPin size={21}/><span><strong>Find the salon</strong><small>{brand.address}</small></span></div><div><Phone size={21}/><span><strong>Call or message</strong><a href={'tel:'+brand.phone}>+971 52 816 7306</a></span></div></div>
 <div className="visit-actions"><button className="button-main" onClick={onBook}>Book on WhatsApp <MessageCircle size={18}/></button><a href={brand.maps} target="_blank" rel="noopener noreferrer" className="link-underline">Get directions <ArrowUpRight size={17}/></a></div></div>
 <div className="visit-photo" data-reveal><img src={brand.photos[0]} alt="Dukes of Beauty salon in Business Bay" loading="lazy"/><div className="visit-pin"><MapPin size={19}/><span>15 NORTHSIDE 1 RETAIL <small>BUSINESS BAY · DUBAI</small></span></div></div>
 </div></section>;
}
function Reviews(){return <div className="reviews-band"><div className="container reviews-inner"><div className="reviews-intro"><span className="reviews-g">G</span><div><strong>Hear it from our visitors.</strong><small>Read genuine customer reviews on the salon's Google listing.</small></div></div><a href={brand.maps} target="_blank" rel="noopener noreferrer">Read Google reviews <ArrowUpRight size={17}/></a></div></div>}
function Footer({onBook}:{onBook:()=>void}){
 return <footer className="footer"><div className="container footer-top"><div className="footer-brand"><Logo light/><p>For every moment that feels like yours.</p></div><div className="footer-links"><span>DISCOVER</span><a href="#salon">Our salon</a><a href="#experiences">Treatments</a><a href="#prices">Services & prices</a><a href="#gallery">Gallery</a></div><div className="footer-links"><span>CONNECT</span><a href={brand.instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</a><a href={brand.maps} target="_blank" rel="noopener noreferrer">Google Maps ↗</a><a href={'tel:'+brand.phone}>+971 52 816 7306</a></div><div className="footer-invite"><span>READY FOR A LITTLE YOU-TIME?</span><button onClick={onBook}>Reserve your visit <ArrowUpRight size={22}/></button></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} DUKES OF BEAUTY</span><span>BUILT BY <a href="https://www.iffimedia.com" target="_blank" rel="noopener noreferrer">WWW.IFFIMEDIA.COM</a></span><a href="#top">BACK TO TOP ↑</a></div></footer>;
}
function SelectionBar({selected,onBook,clear}:{selected:string[];onBook:()=>void;clear:()=>void}){
 if(!selected.length)return null;
 return <aside className="selection-bar" aria-label="Selected treatments"><span className="selection-count">{selected.length} <small>selected</small></span><span className="selection-names">{getSelected(selected).slice(0,2).map(s=>s.name).join(' · ')}{selected.length>2?' + more':''}</span><strong>{getEstimate(selected).label}</strong><button onClick={clear} aria-label="Clear selection" className="selection-clear"><X size={18}/></button><button onClick={onBook} className="selection-book">Continue <ArrowRight size={18}/></button></aside>;
}
export default function App(){
 const [bookingOpen,setBookingOpen]=useState(false);
 const [selected,setSelected]=useState<string[]>([]);
 const [category,setCategory]=useState('hair');
 useReveals();
 const onBook=()=>setBookingOpen(true);
 const choose=(id:string)=>{setCategory(id);document.getElementById('prices')?.scrollIntoView({behavior:'smooth'});};
 return <div className="site"><Header onBook={onBook}/><main><Hero onBook={onBook}/><About onBook={onBook}/><Experiences choose={choose}/><Statement/><Services selected={selected} setSelected={setSelected} category={category} setCategory={setCategory} onBook={onBook}/><EditorialCallout onBook={onBook}/><Gallery/><Visit onBook={onBook}/><Reviews/></main><Footer onBook={onBook}/><SelectionBar selected={selected} onBook={onBook} clear={()=>setSelected([])}/><Booking open={bookingOpen} close={()=>setBookingOpen(false)} selected={selected} setSelected={setSelected}/><SpeedInsights/></div>;
}