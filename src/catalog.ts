import { serviceCategories } from './salonData';

export type CatalogService = {
  id: string;
  name: string;
  duration: string;
  price: string;
  category: string;
  categoryId: string;
};

export const catalog: CatalogService[] = serviceCategories.flatMap(category =>
  category.services.map((service, index) => ({
    ...service,
    id: category.id + '-' + index,
    category: category.title,
    categoryId: category.id
  }))
);

export const getSelected = (ids: string[]) => catalog.filter(item => ids.includes(item.id));

export function getEstimate(ids: string[]) {
  let min = 0;
  let max = 0;
  let from = false;
  let unknown = false;
  let range = false;
  for (const service of getSelected(ids)) {
    const matched = service.price.match(/([\d,]+)\s*[–-]\s*([\d,]+)\s*AED/i);
    if (matched) {
      min += Number(matched[1].replace(/,/g, ''));
      max += Number(matched[2].replace(/,/g, ''));
      range = true;
      continue;
    }
    const price = service.price.match(/([\d,]+)\s*AED/i);
    if (!price) { unknown = true; continue; }
    const amount = Number(price[1].replace(/,/g, ''));
    min += amount;
    max += amount;
    if (service.price.toLowerCase().includes('from')) from = true;
  }
  const fmt = (amount: number) => amount.toLocaleString('en-AE');
  let label = 'Price on request';
  if (unknown) label = min ? 'From AED ' + fmt(min) + ' + pricing on request' : 'Price on request';
  else if (from) label = 'From AED ' + fmt(min);
  else if (range) label = 'AED ' + fmt(min) + '–' + fmt(max);
  else if (ids.length) label = 'AED ' + fmt(min);
  return { label, min, max, variable: from || range || unknown };
}

export const dubaiToday = () => new Intl.DateTimeFormat('sv-SE', {
  timeZone: 'Asia/Dubai', year: 'numeric', month: '2-digit', day: '2-digit'
}).format(new Date());

export function dubaiNowMinutes() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Dubai', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
  }).formatToParts(new Date());
  const read = (type: string) => Number(parts.find(part => part.type === type)?.value || 0);
  return read('hour') * 60 + read('minute');
}

export function formatDateForMessage(value: string) {
  if (!value) return '';
  return new Date(value + 'T12:00:00Z').toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Dubai'
  });
}

export function formatTimeForMessage(value: string) {
  const parts = value.split(':').map(Number);
  const h = parts[0] || 0, m = parts[1] || 0;
  return String(h % 12 || 12) + ':' + String(m).padStart(2, '0') + (h >= 12 ? ' PM' : ' AM');
}

export const appointmentSlots = Array.from({ length: 24 }, (_, i) => {
  const minutes = 600 + i * 30;
  return String(Math.floor(minutes / 60)).padStart(2, '0') + ':' + String(minutes % 60).padStart(2, '0');
});
