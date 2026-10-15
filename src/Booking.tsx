import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { ArrowRight, CalendarDays, Check, Clock3, MessageCircle, Minus, Plus, Search, X } from 'lucide-react';
import { serviceCategories } from './salonData';
import { brand } from './brand';
import { appointmentSlots, catalog, dubaiNowMinutes, dubaiToday, formatDateForMessage, formatTimeForMessage, getEstimate, getSelected } from './catalog';

type BookingProps = {
  open: boolean;
  close: () => void;
  selected: string[];
  setSelected: (updater: (ids: string[]) => string[]) => void;
};

export default function Booking({ open, close, selected, setSelected }: BookingProps) {
  const [category, setCategory] = useState('hair');
  const [query, setQuery] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [showServices, setShowServices] = useState(false);
  const chosen = getSelected(selected);
  const estimate = getEstimate(selected);
  const today = dubaiToday();
  const options = useMemo(() => {
    const clean = query.trim().toLowerCase();
    return catalog.filter(item => clean
      ? (item.name + ' ' + item.category).toLowerCase().includes(clean)
      : item.categoryId === category);
  }, [category, query]);
  const timeOptions = appointmentSlots.filter(slot => {
    if (date !== today) return true;
    const [h, m] = slot.split(':').map(Number);
    return h * 60 + m > dubaiNowMinutes();
  });

  useEffect(() => {
    if (!open) return;
    setError('');
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') close(); };
    document.addEventListener('keydown', escape);
    return () => { document.body.style.overflow = previous; document.removeEventListener('keydown', escape); };
  }, [open, close]);

  if (!open) return null;

  const toggle = (id: string) => setSelected(previous =>
    previous.includes(id) ? previous.filter(item => item !== id) : [...previous, id]
  );

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!chosen.length) { setError('Choose at least one treatment.'); setShowServices(true); return; }
    if (!date || !time) { setError('Choose a preferred date and time.'); return; }
    const [h, m] = time.split(':').map(Number);
    if (date < dubaiToday() || (date === dubaiToday() && h * 60 + m <= dubaiNowMinutes())) {
      setError('Please choose a future date and time in Dubai.'); return;
    }
    if (!name.trim() || !phone.trim()) { setError('Enter your name and a contact number.'); return; }
    const lines = [
      '✨ *DUKES OF BEAUTY*',
      '*NEW APPOINTMENT REQUEST*',
      '',
      '👤 *Name:* ' + name.trim(),
      '📱 *Phone:* ' + phone.trim(),
      '📅 *Preferred date:* ' + formatDateForMessage(date),
      '🕒 *Preferred time (Dubai):* ' + formatTimeForMessage(time),
      '',
      '💎 *SELECTED TREATMENTS*',
      ...chosen.map(service => '• ' + service.name + ' — ' + service.price),
      '',
      '💰 *Estimated price:* ' + estimate.label,
      '',
      'Please confirm the appointment availability and final price.',
      '*Status: Request only — awaiting salon confirmation.*'
    ];
    const url = 'https://wa.me/' + brand.wa + '?text=' + encodeURIComponent(lines.join('\n'));
    window.open(url, '_blank', 'noopener,noreferrer');
    // Deliberately don't show a "confirmed" message or mark a slot as booked.
  };

  return (
    <div className="booking-overlay" onMouseDown={event => { if (event.target === event.currentTarget) close(); }}>
      <section className="booking-dialog" role="dialog" aria-modal="true" aria-labelledby="booking-title">
        <header className="booking-top">
          <div><span className="overline">DUKES OF BEAUTY • PRIVATE APPOINTMENT REQUEST</span><h2 id="booking-title">Your time, <em>your ritual.</em></h2></div>
          <button className="icon-btn icon-btn-dark" onClick={close} aria-label="Close booking"><X size={22} /></button>
        </header>
        <form onSubmit={submit} className="booking-layout">
          <div className="booking-main">
            <div className="booking-intro"><span className="step-no">01</span><div><h3>Choose your treatments</h3><p>Select one or more from the actual salon menu.</p></div></div>
            <button type="button" className="selected-toggle" onClick={() => setShowServices(!showServices)} aria-expanded={showServices}>
              <span><Plus size={18} /> {chosen.length ? chosen.length + ' selected • Add or remove treatments' : 'Browse all treatments'}</span><span>{showServices ? 'Hide −' : 'Explore +'}</span>
            </button>
            {chosen.length > 0 && <div className="booking-chips">{chosen.map(item =>
              <button type="button" className="booking-chip" key={item.id} onClick={() => toggle(item.id)} title={'Remove ' + item.name}>
                {item.name}<X size={13} />
              </button>
            )}</div>}
            {showServices && <div className="booking-browser">
              <div className="booking-search"><Search size={17} /><input aria-label="Search treatments" placeholder="Search 111 treatments..." value={query} onChange={event => setQuery(event.target.value)} /></div>
              <div className="booking-cat-tabs">{serviceCategories.map(group =>
                <button type="button" key={group.id} className={category === group.id && !query ? 'is-active' : ''} onClick={() => { setCategory(group.id); setQuery(''); }}>{group.title}</button>
              )}</div>
              <div className="booking-service-results">{options.length ? options.map(item =>
                <button type="button" className={'booking-service-choice ' + (selected.includes(item.id) ? 'is-selected' : '')} key={item.id} onClick={() => toggle(item.id)}>
                  <span><strong>{item.name}</strong><small>{item.duration}</small></span><span className="booking-choice-right"><b>{item.price}</b><i>{selected.includes(item.id) ? <Check size={17} /> : <Plus size={17} />}</i></span>
                </button>
              ) : <p className="empty-search">No treatments match your search.</p>}</div>
            </div>}
            <div className="booking-intro booking-intro-second"><span className="step-no">02</span><div><h3>Preferred visit</h3><p>Choose a preference. The salon confirms availability on WhatsApp.</p></div></div>
            <div className="booking-fields-two">
              <label className="field"><span><CalendarDays size={16} /> Preferred date</span><input type="date" value={date} min={today} onChange={event => { setDate(event.target.value); setTime(''); }} required /></label>
              <label className="field"><span><Clock3 size={16} /> Preferred time · UAE</span><select value={time} onChange={event => setTime(event.target.value)} disabled={!date} required>
                <option value="">{date ? 'Select a time' : 'Select date first'}</option>
                {timeOptions.map(slot => <option key={slot} value={slot}>{formatTimeForMessage(slot)}</option>)}
              </select></label>
            </div>
            <p className="field-hint">These times are request options, not real-time booked or available slots.</p>
            <div className="booking-intro booking-intro-second"><span className="step-no">03</span><div><h3>Contact details</h3><p>So the salon can reply to your appointment request.</p></div></div>
            <div className="booking-fields-two">
              <label className="field"><span>Your name</span><input autoComplete="name" placeholder="Full name" value={name} onChange={event => setName(event.target.value)} required /></label>
              <label className="field"><span>Mobile / WhatsApp</span><input type="tel" autoComplete="tel" placeholder="+971..." value={phone} onChange={event => setPhone(event.target.value)} required /></label>
            </div>
            {error && <p className="form-error" role="alert">{error}</p>}
          </div>
          <aside className="booking-aside">
            <div className="booking-aside-head"><span className="overline">YOUR VISIT</span><span className="booking-aside-icon"><MessageCircle size={20}/></span></div>
            <h3>A beautiful moment<br/>starts here.</h3>
            <div className="booking-summary-items">
              {chosen.length ? chosen.map(item => <div key={item.id}><span>{item.name}</span><b>{item.price}</b></div>) : <p>No treatments selected yet. Choose from the menu to get started.</p>}
            </div>
            <div className="booking-total"><span>Estimated total</span><strong>{estimate.label}</strong></div>
            <p className="booking-caveat">{estimate.variable ? 'Pricing may vary depending on treatments and consultation. ' : ''}Final price and availability are confirmed by the salon.</p>
            <button className="primary-cta booking-submit" type="submit"><MessageCircle size={18}/> Continue on WhatsApp <ArrowRight size={18}/></button>
            <small className="booking-disclaimer">This opens WhatsApp with your details. No appointment is confirmed or paid on this website.</small>
          </aside>
        </form>
      </section>
    </div>
  );
}
