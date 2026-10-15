# Dukes of Beauty — Immersive 3D Website

Complete rebuild of the salon's existing site, using a fresh **deep emerald + warm ivory** editorial design with real customer-facing service information.

## Live site
https://duke-seven.vercel.app/

## Project contents

- `src/App.tsx` — full React website, 3D perspective image scene and pointer-responsive treatment cards; modern navigation; full services and prices; gallery with lightbox; salon contact and directions; no fake reviews.
- `src/Booking.tsx` — polished WhatsApp-only appointment request panel. Captures real treatments, preferred Dubai date/time, name and phone and opens `wa.me/971528167306` with a formatted request. The salon manually confirms availability and price.
- `src/salonData.ts` — preserved catalog of **111 treatments** across seven categories with their listed prices and durations.
- `src/catalog.ts` — item IDs, filtering, Dubai-local date utilities and estimates without invented price ceilings.
- `src/brand.ts` — existing real salon photography, logo, Instagram link, Google Maps listing and contact details.
- `src/index.css` — wholly new responsive theme, CSS perspective-based 3D motion and reduced-motion support.

## Build
```bash
npm install
npm run typecheck
npm run build
```

## Customer integrity

- Do not show fake testimonials, fabricated ratings, fake appointments, blocked slots or live availability.
- Do not pretend a WhatsApp request is a confirmed booking.
- Never generate an arbitrary maximum for `from` prices.
- Only use genuine salon photographs and business information. Existing image URLs should be periodically checked for continued availability.
- Salon phone/WhatsApp: **+971 52 816 7306**.
- Full published menu: https://dukesofbeauty.ae/price/
- Address: Business Bay, 15 Northside 1 Retail, Dubai, UAE.
- Instagram: https://www.instagram.com/dukes_of_beauty.ae/

Built by https://www.iffimedia.com.
