# Dukes of Beauty - Luxury Salon Website

A premium, cinematic luxury beauty salon website built with React, TypeScript, Vite, and Tailwind CSS. Features a sophisticated dark theme with champagne gold accents, liquid glass effects, and a complete booking system integrated with WhatsApp.

## 🌟 Features

### Design & UX
- **Cinematic Hero Section** - Full-screen hero with Ken Burns animation
- **Liquid Glass Effects** - Apple-inspired glass morphism for service categories
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Smooth Animations** - Scroll-triggered reveals and transitions
- **Premium Typography** - Cormorant Garamond serif + Inter sans-serif

### Functionality
- **Complete Booking System** - 3-step booking flow with custom calendar
- **Service Selection** - Interactive service picker with real-time totals
- **WhatsApp Integration** - Automated booking messages to salon
- **Instagram Carousel** - Horizontal slider with real Instagram embeds
- **Google Reviews** - Authentic customer testimonials
- **Salon Gallery** - Real photos from Google Maps
- **Slot Locking** - Prevents double-booking via localStorage

### Business Features
- **111+ Services** - Complete service menu with verified prices
- **7 Categories** - Hair, Nails, Lashes & Brows, Facials, Cosmetology, Massage, Body Treatments
- **Real Pricing** - All prices in AED from official salon data
- **Contact Integration** - Phone, WhatsApp, Google Maps directions
- **Dynamic Copyright** - Auto-updating year in footer

## 🚀 Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first styling
- **Font Awesome** - Icons
- **Google Fonts** - Typography (Cormorant Garamond, Inter)

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type check
npm run typecheck
```

## 🏗️ Project Structure

```
.
├── src/
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles with liquid glass effects
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vite.config.js        # Vite configuration
└── README.md             # This file
```

## 🎨 Design System

### Colors
- **Obsidian** `#0B0B0D` - Primary background
- **Charcoal** `#242125` - Secondary surfaces
- **Champagne** `#C8AD83` - Accent color, CTAs
- **Ivory** `#F4EFE7` - Primary text

### Typography
- **Headings** - Cormorant Garamond (serif)
- **Body** - Inter (sans-serif)

### Effects
- **Liquid Glass** - backdrop-filter blur with subtle borders
- **Ken Burns** - Slow zoom animation on hero
- **Scroll Reveal** - Intersection Observer animations

## 📱 Responsive Breakpoints

- **Mobile** - 320px to 639px
- **Tablet** - 640px to 1023px
- **Desktop** - 1024px and above

## 🔗 Business Information

- **Salon Name** - Dukes of Beauty
- **Location** - Business Bay, Dubai, UAE
- **Phone** - +971 52 816 7306
- **WhatsApp** - +971 52 816 7306
- **Instagram** - @dukes_of_beauty.ae
- **Google Rating** - 4.9/5 stars

## 🛠️ Development

### Adding New Services

Edit the `serviceCategories` array in `src/App.tsx`:

```typescript
{
  id: 'category-id',
  icon: '🎨',
  title: 'Category Name',
  services: [
    {
      name: 'Service Name',
      duration: '1h',
      price: '100 AED'
    }
  ]
}
```

### Customizing Colors

Update the theme in `src/index.css`:

```css
@theme {
  --color-obsidian: #0B0B0D;
  --color-charcoal: #242125;
  --color-champagne: #C8AD83;
  --color-ivory: #F4EFE7;
}
```

## 📊 Build Output

```
dist/index.html         1.44 kB │ gzip:  0.72 kB
dist/assets/index.css  47.71 kB │ gzip:  8.65 kB
dist/assets/index.js  200.38 kB │ gzip: 60.45 kB
```

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Deploy dist/ folder to gh-pages branch
```

## 📝 License

This project is proprietary and confidential.

## 🤝 Support

For questions or support, contact:
- **Email** - Available through website contact form
- **WhatsApp** - +971 52 816 7306
- **Instagram** - @dukes_of_beauty.ae

## 🎯 Features Checklist

- ✅ Cinematic hero section
- ✅ Liquid glass service categories
- ✅ Custom calendar date picker
- ✅ WhatsApp booking integration
- ✅ Instagram carousel
- ✅ Google reviews section
- ✅ Salon photo gallery
- ✅ Mobile-responsive design
- ✅ Smooth scroll animations
- ✅ Service selection with totals
- ✅ Slot locking system
- ✅ Professional typography
- ✅ Dark luxury theme
- ✅ Contact information
- ✅ Dynamic copyright year

---

**Built with ❤️ for Dukes of Beauty**
