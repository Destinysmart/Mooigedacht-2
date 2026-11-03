import React, { useCallback, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, Users, BedDouble, Bath, 
  Waves, Wifi, Coffee, Car, PawPrint, 
  Shirt, Flame, Home as HomeIcon, Trees, 
  Star, Check, ChevronLeft, ChevronRight,
  Share2, Heart, X, Compass, Calendar, Send, 
  MapPin, Phone, Mail, ShoppingBag, Plus, Minus, Trash2,
  ExternalLink, Mountain, Tent, BookOpen, Feather,
  ShieldCheck, Clock, Sparkles
} from 'lucide-react';

// Locally Hosted High-Resolution Photography Assets (Bundled by Vite for Vercel & Production)
import HERO_IMAGE from '../assets/images/hero_mooigedacht_valley_1793660214414.jpg';
import HIKE_IMAGE from '../assets/images/feature_hike_camino_1793660233422.jpg';
import LOCAL_VIEWS_IMAGE from '../assets/images/feature_local_views_1793660234145.jpg';
import FARM_SHOP_IMAGE from '../assets/images/feature_farm_shop_1793660235172.jpg';
import MOUNTAIN_STREAM_IMAGE from '../assets/images/texture_mountain_stream_1793660234116.jpg';
import COTTAGE_BEDROOM from '../assets/images/cottage_bedroom_cozy_1793660910756.jpg';
import COTTAGE_LIVING from '../assets/images/cottage_living_fireplace_1793660912019.jpg';
import COTTAGE_DECK_POOL from '../assets/images/cottage_deck_hot_tub_1793660942562.jpg';
import COTTAGE_KITCHEN from '../assets/images/cottage_kitchen_table_1793660912798.jpg';

// Locally Hosted Pantry & Artisan Produce Photography
import PANTRY_LAMB from '../assets/images/pantry/pantry_lamb_potjie.jpg';
import PANTRY_BOBOTIE from '../assets/images/pantry/pantry_bobotie_geelrys.jpg';
import PANTRY_LENTIL from '../assets/images/pantry/pantry_lentil_bake.jpg';
import PANTRY_HONEY from '../assets/images/pantry/pantry_fynbos_honey.jpg';
import PANTRY_OLIVE_OIL from '../assets/images/pantry/pantry_olive_oil.jpg';
import PANTRY_SOURDOUGH from '../assets/images/pantry/pantry_sourdough_loaf.jpg';

// Public Directory Fallbacks (Guaranteed available statically on Vercel)
const FALLBACK_HERO = '/images/hero_mooigedacht_valley_1793660214414.jpg';

// Verified Gallery Images for Heritage Cottage
const galleryImages = [
  COTTAGE_DECK_POOL,
  COTTAGE_BEDROOM,
  COTTAGE_LIVING,
  COTTAGE_KITCHEN,
  MOUNTAIN_STREAM_IMAGE,
  HERO_IMAGE,
  HIKE_IMAGE,
  LOCAL_VIEWS_IMAGE,
  FARM_SHOP_IMAGE
];

// Farm Shop Pantry Items (LookBook Page 5: with Authentic Farm Harvest & Meal Imagery)
interface PantryItem {
  id: string;
  name: string;
  category: 'meal' | 'produce';
  price: number;
  description: string;
  image: string;
}

const PANTRY_ITEMS: PantryItem[] = [
  {
    id: 'lamb-potjie',
    name: 'Karoo Slow-Braised Lamb Shank',
    category: 'meal',
    price: 185,
    description: 'Slow-braised with valley root vegetables and rosemary red-wine jus. Oven-ready in cottage.',
    image: PANTRY_LAMB
  },
  {
    id: 'bobotie',
    name: 'Cape Malay Bobotie & Geelrys',
    category: 'meal',
    price: 145,
    description: 'Heritage spiced beef with bay leaf egg custard, golden raisins, and fragrant turmeric rice.',
    image: PANTRY_BOBOTIE
  },
  {
    id: 'lentil-pot',
    name: 'Roasted Squash & Green Lentil Bake',
    category: 'meal',
    price: 120,
    description: 'Hearty vegetarian bake made with seasonal produce picked fresh from the farm garden.',
    image: PANTRY_LENTIL
  },
  {
    id: 'honey',
    name: 'Raw Mountain Fynbos Comb Honey',
    category: 'produce',
    price: 95,
    description: '500g glass jar of raw, cold-extracted honey from our sheltered mountain apiaries.',
    image: PANTRY_HONEY
  },
  {
    id: 'olive-oil',
    name: 'First Cold-Pressed Extra Virgin Olive Oil',
    category: 'produce',
    price: 160,
    description: '750ml estate olive oil with peppery finish from our ancient valley olive grove.',
    image: PANTRY_OLIVE_OIL
  },
  {
    id: 'sourdough',
    name: 'Artisan Hearth Sourdough Loaf',
    category: 'produce',
    price: 55,
    description: 'Slow-fermented wild yeast country loaf, baked and delivered warm to your cottage doorstep.',
    image: PANTRY_SOURDOUGH
  }
];

export default function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  // Lightbox
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Direct Booking Modal
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingChannel, setBookingChannel] = useState<'direct' | 'airbnb' | 'lekkeslaap'>('direct');
  const [bookingDates, setBookingDates] = useState({ checkIn: '', checkOut: '', guests: 2, notes: '' });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Farm Shop Interactive Basket
  const [cart, setCart] = useState<{ [itemId: string]: number }>({});
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      if (current <= 1) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: current - 1 };
    });
  };

  const clearItem = (id: string) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const cartEntries = Object.entries(cart) as [string, number][];
  const cartTotalCount: number = (Object.values(cart) as number[]).reduce((sum: number, qty: number) => sum + (Number(qty) || 0), 0);
  const cartTotalPrice: number = cartEntries.reduce((total: number, [id, qty]: [string, number]) => {
    const item = PANTRY_ITEMS.find((p) => p.id === id);
    return total + (item ? item.price * Number(qty) : 0);
  }, 0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const handleImageFallback = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    if (target.src !== HERO_IMAGE) {
      target.src = HERO_IMAGE;
    }
  };

  const handleDirectBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
    setTimeout(() => {
      const text = encodeURIComponent(
        `Hi Carine! I would like to book Mooigedacht Cottage directly.\n` +
        `Check-In: ${bookingDates.checkIn || 'Flexible'}\n` +
        `Check-Out: ${bookingDates.checkOut || 'Flexible'}\n` +
        `Guests: ${bookingDates.guests}\n` +
        `Notes: ${bookingDates.notes || 'None'}`
      );
      window.open(`https://wa.me/27720000000?text=${text}`, '_blank');
      setIsBookingModalOpen(false);
      setBookingSubmitted(false);
    }, 1000);
  };

  const handleCartSubmit = () => {
    const orderLines = cartEntries
      .map(([id, qty]: [string, number]) => {
        const item = PANTRY_ITEMS.find((p) => p.id === id);
        return item ? `• ${qty}x ${item.name} (R${item.price * Number(qty)})` : '';
      })
      .filter(Boolean)
      .join('\n');

    const msg = encodeURIComponent(
      `Hi Carine! I would like to pre-order farm pantry provisions for our stay at Mooigedacht Cottage:\n\n${orderLines}\n\nTotal: R${cartTotalPrice}\n\nPlease have these ready in the cottage kitchen on our arrival date!`
    );
    window.open(`https://wa.me/27720000000?text=${msg}`, '_blank');
    setIsCartOpen(false);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navOffset = window.innerWidth >= 768 ? 96 : 78;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-olive-dark font-sans selection:bg-[#3A4028] selection:text-[#DFD8C0] overflow-x-hidden antialiased">
      
      {/* 1. HERO SECTION: High-Contrast, Architectural, Cinematic with Ambient Motion */}
      <section id="hero" className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.img 
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
            src={HERO_IMAGE} 
            alt="Mooigedacht Valley and Mountains" 
            className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.12]"
            onError={handleImageFallback}
          />
          {/* Deepened Scrim for High-Contrast Readability across all screens */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/45 to-black/85" />
        </div>
        
        {/* Top spacer for navbar */}
        <div className="relative z-10 pt-16 sm:pt-24" />

        {/* Central Hero Headline Block: Optical Center on Desktop */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 text-center text-white my-auto py-12 md:py-20 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 sm:gap-3 text-xs sm:text-sm uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[#FAF5EB] font-semibold mb-4 sm:mb-6 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
          >
            <span className="w-5 sm:w-10 h-px bg-[#FAF5EB]/60" />
            <span>Kareedouw · Eastern Cape · South Africa</span>
            <span className="w-5 sm:w-10 h-px bg-[#FAF5EB]/60" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-7xl md:text-8xl lg:text-9xl mb-4 sm:mb-6 tracking-[0.14em] sm:tracking-[0.16em] uppercase text-white font-medium drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)] select-none"
          >
            Mooigedacht
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35 }}
            className="font-serif italic text-base sm:text-2xl md:text-3xl lg:text-4xl font-medium text-white max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] px-4"
          >
            "Here at Mooigedacht the time is slow, the air is clean, and the water is cool."
          </motion.p>
          
          {/* Action Buttons: Side-by-Side on Desktop with Balanced Proportions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.55 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center w-full max-w-lg mx-auto"
          >
            <motion.button 
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollToSection('book-your-stay')}
              className="w-full sm:w-auto min-w-[210px] bg-[#242A19] hover:bg-[#343C24] text-white px-8 md:px-10 py-4 rounded-full text-xs uppercase tracking-[0.22em] font-bold transition-all shadow-xl cursor-pointer border border-white/20 active:scale-95 text-center"
              id="hero-btn-book"
            >
              Book Your Stay
            </motion.button>
            <motion.button 
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollToSection('camino')}
              className="w-full sm:w-auto min-w-[210px] bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/60 text-white px-8 md:px-10 py-4 rounded-full text-xs uppercase tracking-[0.22em] font-bold transition-all text-center cursor-pointer shadow-lg active:scale-95"
            >
              Discover Valley
            </motion.button>
          </motion.div>
        </div>

        {/* Responsive Bottom Metabar (Full Spread on Desktop, Compact on Mobile) */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 py-5 sm:py-6 border-t border-white/20 text-[#FAF5EB] font-medium tracking-wider text-xs drop-shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center justify-center gap-3 sm:gap-6 flex-wrap">
            <span>OFF-THE-GRID MOUNTAIN RETREAT</span>
            <span>·</span>
            <span>SOLAR POWER &amp; BOREHOLE SPRING WATER</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span>ESTABLISHED 4 GENERATIONS</span>
          </div>
        </div>
      </section>

      {/* 2. WELCOME & ETHOS SECTION: Refined Editorial Whitespace with In-View Animations */}
      <section 
        id="welcome"
        className="py-20 sm:py-28 md:py-36 px-6 sm:px-12 lg:px-16 max-w-6xl mx-auto scroll-mt-24"
      >
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-14 sm:mb-20"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#3E4929] font-bold block mb-3">
            XXH Studio Lookbook
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#141A0E] mb-6 sm:mb-8 leading-tight font-normal">
            Welcome to Mooigedacht Collective
          </h2>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed text-[#181E10] font-normal mb-8">
            Surrounded by the pristine beauty of the valley, our working farm offers unique accommodations with laid-back luxury, gracious hospitality, and a deep connection to nature. Since our family first settled here, we have created memories for generations of travelers. Create one for yourself with an unforgettable stay at Mooigedacht.
          </p>
          <div className="w-20 h-0.5 bg-[#282D1C]/30 mx-auto" />
        </motion.div>

        {/* 3 Storytelling Pillars: Modern Staggered In-View reveals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {[
            {
              num: "01",
              title: "The Mountains",
              desc: "Ancient folding rock ridges shelter the valley, offering quiet paths, sweeping horizon vistas, and crisp morning air that clears the mind.",
              tag: "Sanctuary & Vistas"
            },
            {
              num: "02",
              title: "Fresh Cool Water",
              desc: "Fed by crystal borehole mountain springs, the stone plunge pool, timber hot tub, and pristine natural river ravines provide restorative calm.",
              tag: "Springs & Riverways"
            },
            {
              num: "03",
              title: "Endemic Bird Life",
              desc: "Awaken to the melodic calls of Cape Sugarbirds and spot pairs of Verreaux's black eagles soaring over mountain fynbos from your porch.",
              tag: "Indigenous Biome"
            }
          ].map((pillar, idx) => (
            <motion.div
              key={pillar.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 border border-[#282D1C]/15 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:border-[#282D1C]/40 transition-all duration-300"
            >
              <div>
                <span className="font-serif text-3xl text-[#525E37] font-bold block mb-3 sm:mb-4">{pillar.num}</span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#141A0E] mb-2 sm:mb-3 font-bold">{pillar.title}</h3>
                <p className="text-xs sm:text-[15px] text-[#1F2614] font-normal leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
              <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-[#282D1C]/15 text-xs uppercase tracking-[0.2em] text-[#384326] font-bold">
                {pillar.tag}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. BOOK YOUR STAY: Rich Eucalyptus Sage Banner (Desktop Optimized & Guaranteed Header Clearance) */}
      <section 
        id="book-your-stay"
        className="scroll-mt-28 pt-24 sm:pt-32 md:pt-36 pb-20 sm:pb-28 md:pb-36 px-6 sm:px-12 lg:px-16 bg-[#586B56] text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:28px_28px]" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto mb-14 sm:mb-20"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-[#FAF5EB] font-bold block mb-3 drop-shadow-xs">
              Reservations &amp; Channels
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl text-white mb-3 tracking-wide font-normal drop-shadow-sm">
              Book Your Stay
            </h2>
            <p className="font-serif italic text-xl sm:text-2xl text-[#FAF5EB] font-medium drop-shadow-sm">
              Kick your boots off and stay awhile
            </p>
          </motion.div>

          {/* Three Modern, Mature Editorial Booking Cards with In-View Stagger */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            
            {/* CARD 1: AIRBNB */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white text-[#141A0E] rounded-2xl overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.08)] border border-[#282D1C]/20 flex flex-col justify-between group transition-all duration-300 h-full"
            >
              <div className="relative aspect-[16/11] overflow-hidden bg-macadamia/20">
                <img 
                  src={COTTAGE_DECK_POOL} 
                  alt="Cottage Deck and Pool for Airbnb" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  onError={handleImageFallback}
                />
                <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-[#141A0E] flex items-center gap-1.5 shadow-md">
                  <Star className="w-3.5 h-3.5 fill-[#E11565] text-[#E11565]" />
                  <span>4.94 Superhost</span>
                </div>
              </div>
              <div className="p-6 sm:p-7 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-serif text-2xl text-[#141A0E] font-bold">Airbnb</h3>
                    <span className="text-xs text-[#2D361F] font-bold">51 Reviews</span>
                  </div>
                  <p className="text-sm text-[#1F2614] font-normal leading-relaxed mb-6 min-h-[68px]">
                    Book through Airbnb with complete international guest protections, verified Superhost service, and multiple currency options.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#282D1C]/15 mt-auto">
                  <a
                    href="https://www.airbnb.co.uk/rooms/1048991010574715381"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full py-3.5 px-5 rounded-xl bg-[#242A19] hover:bg-[#384227] text-white text-xs font-bold uppercase tracking-[0.16em] transition-all shadow-md active:scale-95"
                  >
                    <span>Book on Airbnb</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* CARD 2: LEKKESLAAP */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white text-[#141A0E] rounded-2xl overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.08)] border border-[#282D1C]/20 flex flex-col justify-between group transition-all duration-300 h-full"
            >
              <div className="relative aspect-[16/11] overflow-hidden bg-macadamia/20">
                <img 
                  src={COTTAGE_BEDROOM} 
                  alt="Cozy Cottage Bedroom for Lekkeslaap" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  onError={handleImageFallback}
                />
                <div className="absolute top-3.5 left-3.5 bg-[#8E792C] text-white px-3.5 py-1.5 rounded-full text-xs font-bold shadow-md">
                  <span>SA Domestic Favourite</span>
                </div>
              </div>
              <div className="p-6 sm:p-7 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-serif text-2xl text-[#141A0E] font-bold">Lekkeslaap</h3>
                    <span className="text-xs text-[#384326] font-bold">ZAR Rates</span>
                  </div>
                  <p className="text-sm text-[#1F2614] font-normal leading-relaxed mb-6 min-h-[68px]">
                    South Africa's beloved domestic booking portal. Pay seamlessly via EFT or local debit/credit card with straightforward local terms.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#282D1C]/15 mt-auto">
                  <button
                    onClick={() => {
                      setBookingChannel('lekkeslaap');
                      setIsBookingModalOpen(true);
                    }}
                    className="flex items-center justify-between w-full py-3.5 px-5 rounded-xl bg-[#4A5B48] hover:bg-[#394937] text-white text-xs font-bold uppercase tracking-[0.16em] transition-all shadow-md cursor-pointer active:scale-95"
                  >
                    <span>Book on Lekkeslaap</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* CARD 3: DIRECT RESERVATION */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white text-[#141A0E] rounded-2xl overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.08)] border-2 border-[#242A19] flex flex-col justify-between group transition-all duration-300 relative h-full"
            >
              <div className="absolute top-3.5 right-3.5 z-10 bg-[#242A19] text-[#FAF5EB] px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-bold shadow-md">
                Best Rate Guarantee
              </div>
              <div className="relative aspect-[16/11] overflow-hidden bg-macadamia/20">
                <img 
                  src={COTTAGE_LIVING} 
                  alt="Heritage Cottage Living Room Direct Booking" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  onError={handleImageFallback}
                />
                <div className="absolute bottom-3.5 left-3.5 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-[#141A0E] flex items-center gap-1 shadow-md">
                  <span>R1 050 / night</span>
                </div>
              </div>
              <div className="p-6 sm:p-7 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-serif text-2xl text-[#141A0E] font-bold">Book Directly</h3>
                    <span className="text-xs text-[#242A19] font-bold">Zero Commission</span>
                  </div>
                  <p className="text-sm text-[#1F2614] font-normal leading-relaxed mb-6 min-h-[68px]">
                    Connect directly with host Carine. Flexible dates, bespoke farm pantry hampers, and personalized trail advice.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#282D1C]/15 mt-auto">
                  <button
                    onClick={() => {
                      setBookingChannel('direct');
                      setIsBookingModalOpen(true);
                    }}
                    className="flex items-center justify-between w-full py-3.5 px-5 rounded-xl bg-[#242A19] hover:bg-[#384227] text-white text-xs font-bold uppercase tracking-[0.16em] transition-all shadow-md cursor-pointer active:scale-95"
                  >
                    <span>Inquire Directly</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>

          </div>

          <div className="mt-12 text-center text-xs sm:text-sm text-white font-medium flex items-center justify-center gap-4 sm:gap-6 flex-wrap drop-shadow-xs">
            <span>· Instant check-in confirmation</span>
            <span>· High-speed uncapped Wi-Fi</span>
            <span>· Pure mountain spring water</span>
            <span>· Uninterrupted solar power</span>
          </div>
        </div>
      </section>
      {/* 4. ANCHOR FEATURE TRIAD: Modern Editorial Presentation with High Contrast & In-View Motion */}
      <section id="features" className="py-16 sm:py-24 md:py-32 px-5 sm:px-10 lg:px-16 max-w-7xl mx-auto scroll-mt-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-18"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#3E4929] font-bold block mb-2 sm:mb-3">
            The Mooigedacht Experience
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#141A0E] mb-3 sm:mb-4 font-normal">
            Live The Rhythms of the Valley
          </h2>
          <p className="text-xs sm:text-base text-[#1F2614] font-normal max-w-xl mx-auto leading-relaxed">
            From mountain ridge tracks and waterfall swims to seasonal harvests and slow cottage dinners.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          
          {/* Feature 1: Hike & The Camino */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollToSection('camino')}
            className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-[#282D1C]/20 shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full"
          >
            <div className="relative aspect-[16/11] overflow-hidden">
              <img 
                src={HIKE_IMAGE} 
                alt="Hike & The Camino at Mooigedacht" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                onError={handleImageFallback}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 text-white">
                <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#FAF5EB] font-bold block mb-1 drop-shadow-xs">
                  Trails &amp; Pilgrimage
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold drop-shadow-sm">Hike &amp; The Camino</h3>
              </div>
            </div>
            <div className="p-5 sm:p-7 md:p-8 flex-1 flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-[#1F2614] font-normal leading-relaxed mb-5 sm:mb-6 min-h-[64px]">
                Step directly onto the regional Camino pass or embark on scenic day trails to the 3km waterfall gorge right from your doorstep. Strava and AllTrails GPX routes available.
              </p>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#141A0E] group-hover:text-[#4F5736] transition-colors mt-auto pt-3 border-t border-[#282D1C]/10">
                <span className="uppercase tracking-wider">View Trail Guides &amp; Routes</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>

          {/* Feature 2: Local Visits & Views */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollToSection('attractions')}
            className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-[#282D1C]/20 shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full"
          >
            <div className="relative aspect-[16/11] overflow-hidden">
              <img 
                src={LOCAL_VIEWS_IMAGE} 
                alt="Local visits and valley views" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                onError={handleImageFallback}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 text-white">
                <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#FAF5EB] font-bold block mb-1 drop-shadow-xs">
                  Valley &amp; Coast
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold drop-shadow-sm">Local Visits &amp; Views</h3>
              </div>
            </div>
            <div className="p-5 sm:p-7 md:p-8 flex-1 flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-[#1F2614] font-normal leading-relaxed mb-5 sm:mb-6 min-h-[64px]">
                Discover historic Kareedouw village, secret Tsitsikamma mountain lookouts, scenic gravel passes, and warm encounters with our neighboring growers.
              </p>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#141A0E] group-hover:text-[#4F5736] transition-colors mt-auto pt-3 border-t border-[#282D1C]/10">
                <span className="uppercase tracking-wider">Explore Local Attractions</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>

          {/* Feature 3: Farm Shop */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollToSection('shop')}
            className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-[#282D1C]/20 shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full"
          >
            <div className="relative aspect-[16/11] overflow-hidden">
              <img 
                src={FARM_SHOP_IMAGE} 
                alt="Mooigedacht Farm Shop" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                onError={handleImageFallback}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 text-white">
                <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#FAF5EB] font-bold block mb-1 drop-shadow-xs">
                  Artisan Produce
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold drop-shadow-sm">Farm Shop &amp; Kitchen</h3>
              </div>
            </div>
            <div className="p-5 sm:p-7 md:p-8 flex-1 flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-[#1F2614] font-normal leading-relaxed mb-5 sm:mb-6 min-h-[64px]">
                Stock your cottage pantry with homemade frozen ready-meals, cold-pressed olive oil, fynbos comb honey, organic citrus, and freshly baked sourdough loaves.
              </p>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#141A0E] group-hover:text-[#4F5736] transition-colors mt-auto pt-3 border-t border-[#282D1C]/10">
                <span className="uppercase tracking-wider">Browse Farm Pantry</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 5. PRESERVED HERITAGE COTTAGE SUITE & MATURE AMENITIES (Voice Note 1 Request) */}
      <section id="cottages" className="scroll-mt-32 pt-20 sm:pt-28 md:pt-36 pb-20 sm:pb-28 md:pb-32 px-5 sm:px-10 lg:px-16 bg-white border-y border-[#282D1C]/15">
        <div className="max-w-6xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center mb-10 sm:mb-16"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-[#3E4929] font-bold block mb-2">
              Accommodation Sanctuary
            </span>
            <h2 className="font-serif text-2xl xs:text-3xl sm:text-5xl md:text-6xl text-[#141A0E] mb-3 sm:mb-4 font-normal">
              The Heritage Cottage
            </h2>
            <p className="text-xs xs:text-sm sm:text-lg text-[#1F2614] font-normal leading-relaxed">
              Cozy off-the-grid retreat with private pool, timber hot tub, and spectacular mountain views.
            </p>
          </motion.div>

          {/* Quick Stats Grid: Architectural 3-Column Strip Optimized for Mobile & Desktop */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto grid grid-cols-3 gap-2 xs:gap-3 sm:gap-6 mb-12 sm:mb-20"
          >
            <div className="flex flex-col items-center justify-center p-3 xs:p-4 sm:p-8 bg-[#FAF8F5] border border-[#282D1C]/20 rounded-xl sm:rounded-2xl shadow-xs text-center">
              <Users className="w-5 h-5 sm:w-8 sm:h-8 text-[#3A4028] mb-1.5 sm:mb-3 stroke-[2]" />
              <h4 className="font-serif text-sm xs:text-base sm:text-2xl text-[#141A0E] mb-0.5 sm:mb-1 font-bold">6 Guests</h4>
              <p className="text-[10px] xs:text-xs sm:text-sm text-[#28311B] font-medium leading-tight">Families &amp; groups</p>
            </div>
            <div className="flex flex-col items-center justify-center p-3 xs:p-4 sm:p-8 bg-[#FAF8F5] border border-[#282D1C]/20 rounded-xl sm:rounded-2xl shadow-xs text-center">
              <BedDouble className="w-5 h-5 sm:w-8 sm:h-8 text-[#3A4028] mb-1.5 sm:mb-3 stroke-[2]" />
              <h4 className="font-serif text-sm xs:text-base sm:text-2xl text-[#141A0E] mb-0.5 sm:mb-1 font-bold">2 Bedrooms</h4>
              <p className="text-[10px] xs:text-xs sm:text-sm text-[#28311B] font-medium leading-tight">6 cloud beds</p>
            </div>
            <div className="flex flex-col items-center justify-center p-3 xs:p-4 sm:p-8 bg-[#FAF8F5] border border-[#282D1C]/20 rounded-xl sm:rounded-2xl shadow-xs text-center">
              <Bath className="w-5 h-5 sm:w-8 sm:h-8 text-[#3A4028] mb-1.5 sm:mb-3 stroke-[2]" />
              <h4 className="font-serif text-sm xs:text-base sm:text-2xl text-[#141A0E] mb-0.5 sm:mb-1 font-bold">1 Bathroom</h4>
              <p className="text-[10px] xs:text-xs sm:text-sm text-[#28311B] font-medium leading-tight">Spring shower</p>
            </div>
          </motion.div>

          {/* Photo Gallery Carousel with Embla */}
          <div className="w-full mb-14 sm:mb-24 relative">
            <div className="overflow-hidden rounded-2xl sm:rounded-3xl" ref={emblaRef}>
              <div className="flex touch-pan-y -ml-3 sm:-ml-4">
                {galleryImages.map((src, index) => (
                  <div className="relative flex-[0_0_90%] xs:flex-[0_0_80%] sm:flex-[0_0_65%] lg:flex-[0_0_52%] pl-3 sm:pl-4" key={index}>
                    <div 
                      onClick={() => openLightbox(index)}
                      className="relative aspect-[16/10] overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer group shadow-sm bg-macadamia/20"
                    >
                      <img 
                        src={src} 
                        alt={`Mooigedacht Cottage ${index + 1}`} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        onError={handleImageFallback}
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                      <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-white/95 backdrop-blur-md text-[#141A0E] text-[10px] sm:text-xs px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full shadow-md font-bold">
                        View Photo
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button 
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-12 sm:h-12 bg-white/95 hover:bg-white backdrop-blur-md rounded-full flex items-center justify-center shadow-lg sm:shadow-xl text-[#141A0E] transition-all border border-[#282D1C]/20 active:scale-90 cursor-pointer"
              onClick={scrollPrev}
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            </button>
            <button 
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-12 sm:h-12 bg-white/95 hover:bg-white backdrop-blur-md rounded-full flex items-center justify-center shadow-lg sm:shadow-xl text-[#141A0E] transition-all border border-[#282D1C]/20 active:scale-90 cursor-pointer"
              onClick={scrollNext}
              aria-label="Next photo"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            </button>
          </div>

          {/* AMENITIES SECTION: Mature, Architectural Icon Cards */}
          <div className="max-w-5xl mx-auto mb-16 sm:mb-24">
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 sm:mb-16"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-[#3E4929] font-bold block mb-2">
                Every Comfort Provided
              </span>
              <h3 className="font-serif text-2xl xs:text-3xl sm:text-5xl text-[#141A0E] font-normal">
                Amenities &amp; Features
              </h3>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-6">
              {[
                { icon: Waves, label: "Private Pool", sub: "Mountain splash" },
                { icon: Waves, label: "Hot Tub", sub: "Wood-fired cedar soak" },
                { icon: Wifi, label: "Free Wi-Fi", sub: "Uncapped high-speed" },
                { icon: Coffee, label: "Full Kitchen", sub: "Gas stove & cookware" },
                { icon: Car, label: "Private Carport", sub: "Shaded on-site parking" },
                { icon: PawPrint, label: "Pet-Friendly", sub: "Fur family welcome" },
                { icon: Shirt, label: "Washing Machine", sub: "Laundry facilities" },
                { icon: Flame, label: "Fireplace & Braai", sub: "Indoor & outdoor fires" }
              ].map((amenity, idx) => (
                <motion.div
                  key={amenity.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="flex flex-col items-center justify-center p-3.5 sm:p-6 border border-[#282D1C]/15 rounded-xl sm:rounded-2xl bg-[#FAF8F5] hover:border-[#282D1C]/40 hover:bg-white transition-all text-center shadow-xs group"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#242A19]/10 text-[#242A19] flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-105 transition-transform">
                    <amenity.icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-[#141A0E]">{amenity.label}</span>
                  <span className="text-[10px] sm:text-xs text-[#28311B] mt-0.5 font-medium">{amenity.sub}</span>
                </motion.div>
              ))}
            </div>

            {/* Winter-Ready Features Strip with High-Contrast Typography & 3-Col Layout */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.6 }}
              className="mt-6 sm:mt-8 bg-[#586B56]/15 border border-[#586B56]/35 rounded-2xl p-5 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6"
            >
              <div className="text-center md:text-left">
                <h4 className="font-serif text-xl sm:text-2xl text-[#141A0E] mb-1 font-bold">Winter-Ready Comforts</h4>
                <p className="text-xs sm:text-sm text-[#1F2614] font-normal">Cozy warmth when the mountain breeze cools the night.</p>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:gap-8 justify-center w-full md:w-auto text-center">
                <div>
                  <span className="block font-bold text-xs sm:text-sm text-[#141A0E] mb-0.5">Electric Blankets</span>
                  <span className="text-[10px] sm:text-xs text-[#28311B] font-medium">Heated bedding</span>
                </div>
                <div>
                  <span className="block font-bold text-xs sm:text-sm text-[#141A0E] mb-0.5">Gas Heater</span>
                  <span className="text-[10px] sm:text-xs text-[#28311B] font-medium">Instant warmth</span>
                </div>
                <div>
                  <span className="block font-bold text-xs sm:text-sm text-[#141A0E] mb-0.5">Firewood Supply</span>
                  <span className="text-[10px] sm:text-xs text-[#28311B] font-medium">Seasoned timber</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 4 Sanctuary Pillars: Understated Luxury & Crisp Contrast with In-View Stagger */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                icon: HomeIcon,
                title: "Indoor Sanctuary",
                desc: "Curated blend of heirloom wooden furniture, elegant linens, and restful spaces for deep calm.",
                tag: "Cozy & Restful"
              },
              {
                icon: Waves,
                title: "Slow Wellness",
                desc: "Immerse yourself completely in the cedar hot tub, plunge pool, and starlit fireside deck.",
                tag: "Health & Renewal"
              },
              {
                icon: Wifi,
                title: "Modern Off-Grid",
                desc: "Sustainable solar backup, pure mountain spring water, and high-speed uncapped Wi-Fi.",
                tag: "Sustainable Stay"
              },
              {
                icon: Trees,
                title: "Wild Foothills",
                desc: "Direct access to mountain walking trails, waterfall ravines, indigenous flora, and orchard strolls.",
                tag: "Outdoor Majesty"
              }
            ].map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-5 sm:p-8 rounded-2xl bg-[#FAF8F5] border border-[#282D1C]/20 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <pillar.icon className="w-6 h-6 text-[#3A4028] stroke-[2] mb-3 sm:mb-4" />
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-[#141A0E] mb-2">{pillar.title}</h4>
                  <p className="text-xs sm:text-sm text-[#1F2614] font-normal leading-relaxed mb-4">
                    {pillar.desc}
                  </p>
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#384326] font-bold block">{pillar.tag}</span>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. THE CAMINO PILGRIMAGE TRAIL (LookBook Page 5) */}
      <section id="camino" className="scroll-mt-32 pt-20 sm:pt-28 md:pt-32 pb-16 sm:pb-24 px-4 xs:px-6 sm:px-12 lg:px-16 max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 border border-[#282D1C]/15 shadow-sm"
        >
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 items-center">
            <div className="flex-1 space-y-4 sm:space-y-5">
              <span className="text-xs uppercase tracking-[0.3em] text-[#8E792C] font-bold block">
                The Regional Pilgrimage
              </span>
              <h2 className="font-serif text-2xl xs:text-3xl sm:text-5xl text-[#141A0E] font-normal leading-tight">
                The Camino at Mooigedacht
              </h2>
              <p className="text-xs xs:text-sm sm:text-base text-[#181E10] font-normal leading-relaxed">
                The Kareedouw Camino is a multi-day walking pilgrimage traversing rugged mountain passes, fynbos reserves, and tranquil valley farming communities. Mooigedacht serves as a designated sanctuary stopover where pilgrims rest under ancient trees, bathe in cool spring waters, and recharge.
              </p>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-1 sm:pt-2">
                <div className="p-3.5 sm:p-4 rounded-xl bg-[#FAF8F5] border border-[#282D1C]/15 text-center xs:text-left">
                  <span className="block font-serif text-xl sm:text-2xl text-[#141A0E] font-bold">18.4 km</span>
                  <span className="text-[10px] sm:text-xs text-[#28311B] uppercase tracking-wider font-semibold">Pass Stage</span>
                </div>
                <div className="p-3.5 sm:p-4 rounded-xl bg-[#FAF8F5] border border-[#282D1C]/15 text-center xs:text-left">
                  <span className="block font-serif text-xl sm:text-2xl text-[#141A0E] font-bold">680 m</span>
                  <span className="text-[10px] sm:text-xs text-[#28311B] uppercase tracking-wider font-semibold">Elevation Gain</span>
                </div>
              </div>
              <div className="pt-2 flex flex-col xs:flex-row gap-3">
                <a
                  href="https://www.alltrails.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-[#242A19] text-white text-xs font-bold uppercase tracking-[0.16em] hover:bg-[#384227] transition-colors shadow-sm active:scale-95"
                >
                  <Mountain className="w-4 h-4 stroke-[2]" />
                  <span>View on AllTrails</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
                <a
                  href="https://www.strava.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl border border-[#282D1C]/35 text-[#141A0E] text-xs font-bold uppercase tracking-[0.16em] hover:bg-[#282D1C]/10 transition-colors shadow-2xs active:scale-95"
                >
                  <span>Strava Club &amp; GPX</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
            </div>
            <div className="w-full lg:w-96 rounded-xl sm:rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[4/3] shadow-md">
              <img 
                src={HIKE_IMAGE} 
                alt="Hikers on The Camino" 
                className="w-full h-full object-cover"
                onError={handleImageFallback}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* 7. FARM SHOP & PANTRY (LookBook Page 5: with Interactive Basket) */}
      <section id="shop" className="scroll-mt-32 pt-24 sm:pt-32 md:pt-36 pb-20 sm:pb-28 px-4 xs:px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#3E4929] font-bold block mb-2">
            Local Produce &amp; Farm Kitchen
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#141A0E] mb-3 sm:mb-4 font-normal">
            Mooigedacht Farm Shop
          </h2>
          <p className="text-xs sm:text-base md:text-lg text-[#1F2614] font-normal max-w-2xl mx-auto leading-relaxed">
            Pre-order ready-to-heat frozen farm meals and artisan harvest to have your cottage kitchen stocked for arrival.
          </p>
        </motion.div>

        {/* Shop Grid with High Contrast & In-View Motion */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {PANTRY_ITEMS.map((item, idx) => (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              className="group bg-white rounded-2xl overflow-hidden border border-[#282D1C]/15 shadow-[0_4px_25px_rgba(0,0,0,0.04)] flex flex-col justify-between hover:border-[#282D1C]/40 hover:shadow-xl transition-all duration-300 h-full"
            >
              <div>
                {/* Product Image Header with Tags */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#FAF5EB]">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    onError={(e) => { (e.target as HTMLImageElement).src = FARM_SHOP_IMAGE; }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />
                  <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#384326] shadow-sm border border-black/5">
                    {item.category === 'meal' ? 'Ready-to-Heat Potjie' : 'Estate Harvest'}
                  </div>
                  <div className="absolute top-3.5 right-3.5 bg-[#242A19] text-[#FAF5EB] px-3.5 py-1.5 rounded-full font-serif text-sm sm:text-base font-bold shadow-sm">
                    R{item.price}
                  </div>
                </div>

                <div className="p-5 sm:p-7 pb-2 sm:pb-3">
                  <h4 className="font-serif text-xl sm:text-2xl text-[#141A0E] font-bold mb-2 group-hover:text-[#3E4929] transition-colors min-h-[58px] flex items-center">
                    {item.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#1F2614] font-normal leading-relaxed min-h-[44px]">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-5 sm:p-7 pt-0 sm:pt-0 mt-auto">
                <div className="pt-4 border-t border-[#282D1C]/10 flex items-center justify-between">
                  {cart[item.id] ? (
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-[#282D1C]/30 flex items-center justify-center hover:bg-[#282D1C]/10 active:scale-90 text-[#141A0E] cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                      </button>
                      <span className="font-bold text-xs sm:text-sm px-1.5 sm:px-2 text-[#141A0E]">{cart[item.id]}</span>
                      <button 
                        onClick={() => addToCart(item.id)}
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#242A19] text-white flex items-center justify-center hover:bg-[#384227] active:scale-90 cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(item.id)}
                      className="flex items-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl border border-[#282D1C]/30 hover:border-[#141A0E] text-[#141A0E] text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer active:scale-95 hover:bg-[#FAF5EB]"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Add to Basket</span>
                    </button>
                  )}
                  <span className="text-[10px] sm:text-xs text-[#384326] font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#586B56]" />
                    Cottage Fridge Ready
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating / Inline Cart Callout when items are added */}
        {cartTotalCount > 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 sm:mt-10 p-5 sm:p-6 rounded-2xl bg-[#586B56] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl"
          >
            <div className="flex items-center gap-3 text-center sm:text-left">
              <ShoppingBag className="w-6 h-6 text-white stroke-[2] shrink-0" />
              <div>
                <span className="font-bold text-sm sm:text-base block">Your Cottage Pantry Basket</span>
                <span className="text-xs sm:text-sm text-[#FAF5EB] font-medium">{cartTotalCount} items selected · Total: R{cartTotalPrice}</span>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(true)}
              className="w-full sm:w-auto bg-[#242A19] hover:bg-[#1A1F12] text-white px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl text-xs font-bold uppercase tracking-[0.16em] transition-colors active:scale-95 shadow-md cursor-pointer"
            >
              Review Basket &amp; Pre-Order
            </button>
          </motion.div>
        )}
      </section>

      {/* 8. WILD FARM CAMPING SECTION (LookBook Page 5) */}
      <section id="camping" className="scroll-mt-32 pt-20 sm:pt-28 md:pt-32 pb-16 sm:pb-24 px-4 xs:px-6 sm:px-12 lg:px-16 max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7 }}
          className="bg-[#EFE9D7] rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 border border-[#282D1C]/20 shadow-xs"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
            <div className="max-w-xl space-y-3 sm:space-y-4 text-center md:text-left">
              <span className="text-xs uppercase tracking-[0.3em] text-[#3E4929] font-bold block">
                Under The Karoo Stars
              </span>
              <h3 className="font-serif text-2xl xs:text-3xl sm:text-4xl text-[#141A0E] font-normal">
                Wild Farm Camping
              </h3>
              <p className="text-xs xs:text-sm sm:text-base text-[#181E10] font-normal leading-relaxed">
                For self-sufficient nature purists and Camino walkers: camp under unpolluted dark skies beside our foothill stream. Small footprint, natural stone braai rings, and crystal clear mountain spring water.
              </p>
              <div className="flex items-center justify-center md:justify-start gap-3 sm:gap-6 pt-1 sm:pt-2 text-[11px] sm:text-sm text-[#141A0E] font-bold flex-wrap">
                <span>R250 / night per pitch</span>
                <span>· Max 2 tents per site</span>
                <span>· Eco-compost ablutions</span>
              </div>
            </div>
            <button
              onClick={() => {
                setBookingChannel('direct');
                setBookingDates({ ...bookingDates, notes: 'Wild camping inquiry' });
                setIsBookingModalOpen(true);
              }}
              className="w-full md:w-auto bg-[#242A19] hover:bg-[#384227] text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl text-xs uppercase tracking-[0.2em] font-bold transition-colors shrink-0 active:scale-95 shadow-md cursor-pointer text-center"
            >
              Inquire Camping Pitch
            </button>
          </div>
        </motion.div>
      </section>

      {/* 9. LOCAL VISITS & VIEWS (LookBook Page 5) */}
      <section id="attractions" className="scroll-mt-32 pt-20 sm:pt-28 md:pt-32 pb-16 sm:pb-24 px-4 xs:px-6 sm:px-12 lg:px-16 max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#3E4929] font-bold block mb-2">
            The Surrounding Neighborhood
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#141A0E] font-normal mb-2 sm:mb-3">
            Local Visits &amp; Views
          </h2>
          <p className="text-xs sm:text-base text-[#1F2614] font-normal leading-relaxed">
            Venture out to discover historic mountain passes, swimming ravines, and coastal forest reserves.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {[
            {
              icon: MapPin,
              title: "Waterfall Gorge (3km)",
              desc: "A gentle 45-minute river trail leading into a secluded mountain canyon with a natural deep-water plunge pool."
            },
            {
              icon: Compass,
              title: "Kareedouw Village (12km)",
              desc: "Gateway to the Langkloof with classic tea rooms, heritage butcheries, and stone architectural churches."
            },
            {
              icon: Waves,
              title: "Tsitsikamma Coast (35km)",
              desc: "Rugged Indian Ocean coastal cliffs, ancient yellowwood indigenous forests, and suspension bridge trails."
            }
          ].map((attraction, idx) => (
            <motion.div
              key={attraction.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-6 sm:p-8 rounded-2xl bg-white border border-[#282D1C]/15 shadow-xs flex flex-col justify-between h-full hover:border-[#282D1C]/40 hover:shadow-md transition-all duration-300"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#8E792C]/10 text-[#8E792C] flex items-center justify-center mb-3 sm:mb-4">
                  <attraction.icon className="w-5 h-5 stroke-[2]" />
                </div>
                <h4 className="font-serif text-xl sm:text-2xl text-[#141A0E] font-bold mb-2">{attraction.title}</h4>
                <p className="text-xs sm:text-sm text-[#1F2614] font-normal leading-relaxed">
                  {attraction.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 10. TRAILS & FLORA (LookBook Page 5) */}
      <section id="nature" className="scroll-mt-32 pt-20 sm:pt-28 md:pt-32 pb-16 sm:pb-24 px-4 xs:px-6 sm:px-12 lg:px-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          
          <motion.div 
            id="trails" 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-[#282D1C]/15 shadow-xs flex flex-col justify-between h-full hover:border-[#282D1C]/40 hover:shadow-md transition-all duration-300"
          >
            <div>
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <Mountain className="w-5 h-5 text-[#3A4028] stroke-[2]" />
                <span className="text-xs uppercase tracking-[0.25em] text-[#3A4028] font-bold">Trails &amp; Hiking</span>
              </div>
              <h3 className="font-serif text-xl sm:text-3xl text-[#141A0E] font-bold mb-3 sm:mb-4">
                Footpaths From Your Deck
              </h3>
              <p className="text-xs sm:text-sm text-[#181E10] font-normal leading-relaxed mb-5 sm:mb-6">
                Direct single-track paths lead into private mountain valleys. All routes are marked with stone cairns and color-coded posts.
              </p>
              <ul className="space-y-3 text-xs sm:text-sm text-[#181E10]">
                <li className="flex items-center gap-2.5 sm:gap-3">
                  <Check className="w-4 h-4 text-[#3A4028] stroke-[2.5] shrink-0" />
                  <span className="font-medium">Orchard Loop: 2.2 km · Gentle morning walk</span>
                </li>
                <li className="flex items-center gap-2.5 sm:gap-3">
                  <Check className="w-4 h-4 text-[#3A4028] stroke-[2.5] shrink-0" />
                  <span className="font-medium">Waterfall Ravine: 6.4 km · Moderate canyon trail</span>
                </li>
                <li className="flex items-center gap-2.5 sm:gap-3">
                  <Check className="w-4 h-4 text-[#3A4028] stroke-[2.5] shrink-0" />
                  <span className="font-medium">Ridge Peak Summit: 11.8 km · Panoramic 360° lookout</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 sm:pt-6 border-t border-[#282D1C]/15 mt-5 sm:mt-6 text-[11px] sm:text-xs text-[#28311B] font-semibold">
              GPX downloads provided upon arrival.
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-[#FAF8F5] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-[#282D1C]/15 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <Feather className="w-5 h-5 text-[#3A4028] stroke-[2]" />
                <span className="text-xs uppercase tracking-[0.25em] text-[#3A4028] font-bold">Fauna &amp; Flora</span>
              </div>
              <h3 className="font-serif text-xl sm:text-3xl text-[#141A0E] font-bold mb-3 sm:mb-4">
                Indigenous Biome
              </h3>
              <p className="text-xs sm:text-sm text-[#181E10] font-normal leading-relaxed mb-5 sm:mb-6">
                Situated at the meeting point of mountain fynbos and indigenous riverine bush. Bring binoculars to spot over 120 recorded bird species and rare blooming proteas.
              </p>
              <ul className="space-y-3 text-xs sm:text-sm text-[#181E10]">
                <li className="flex items-center gap-2.5 sm:gap-3">
                  <Check className="w-4 h-4 text-[#3A4028] stroke-[2.5] shrink-0" />
                  <span className="font-medium">Cape Sugarbirds, Sunbirds &amp; Verreaux's Eagles</span>
                </li>
                <li className="flex items-center gap-2.5 sm:gap-3">
                  <Check className="w-4 h-4 text-[#3A4028] stroke-[2.5] shrink-0" />
                  <span className="font-medium">King Protea (*Protea cynaroides*) &amp; Pink Ericas</span>
                </li>
                <li className="flex items-center gap-2.5 sm:gap-3">
                  <Check className="w-4 h-4 text-[#3A4028] stroke-[2.5] shrink-0" />
                  <span className="font-medium">Mountain reedbuck &amp; small nocturnal mammals</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 sm:pt-6 border-t border-[#282D1C]/15 mt-5 sm:mt-6 text-[11px] sm:text-xs text-[#28311B] font-semibold">
              Field guidebook available in the cottage library.
            </div>
          </motion.div>

        </div>
      </section>

      {/* 11. ABOUT US & CUSTODIANS (LookBook Page 5) */}
      <section id="about" className="py-14 sm:py-24 px-4 xs:px-6 sm:px-12 lg:px-16 max-w-5xl mx-auto scroll-mt-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 border border-[#282D1C]/15 shadow-xs text-center"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#3E4929] font-bold block mb-2">
            The Custodians
          </span>
          <h2 className="font-serif text-2xl xs:text-3xl sm:text-5xl text-[#141A0E] font-normal mb-3 sm:mb-4">
            About Mooigedacht &amp; Our Team
          </h2>
          <p className="text-xs xs:text-sm sm:text-base md:text-lg text-[#181E10] font-normal leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-8">
            Mooigedacht is a multi-generational working farm nurtured by host Carine, Pierre, and our devoted team of local farm workers. We believe in slow time, clean water, and preserving the ecological sanctity of our valley while extending gracious South African hospitality to all who step onto this earth.
          </p>
          <div className="pt-3 sm:pt-4 flex items-center justify-center gap-3 sm:gap-8 text-[11px] sm:text-sm text-[#141A0E] flex-wrap font-bold">
            <span>· Resident Hosts</span>
            <span>· Solar Energy</span>
            <span>· Land Conservation</span>
            <span>· Local Empowerment</span>
          </div>
        </motion.div>
      </section>

      {/* 12. VERIFIED REVIEWS & HOST PROFILE */}
      <section id="reviews" className="py-14 sm:py-24 px-4 xs:px-6 sm:px-12 lg:px-16 max-w-5xl mx-auto scroll-mt-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 sm:mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="w-7 h-7 sm:w-8 sm:h-8 fill-[#8E792C] text-[#8E792C]" />
            <span className="font-serif text-4xl sm:text-6xl font-bold text-[#141A0E]">4.94</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-4xl text-[#141A0E] font-normal mb-1">
            Guest Reviews &amp; Hospitality
          </h3>
          <p className="text-xs sm:text-sm text-[#28311B] font-medium">
            Loved by travelers, families, and Camino pilgrims from around the world
          </p>
        </motion.div>

        {/* Host Profile Card with High Contrast & 3-Col Stats on all screens */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm border border-[#282D1C]/15 mb-10 sm:mb-16 flex flex-col md:flex-row gap-6 sm:gap-12 items-center md:items-start text-center md:text-left"
        >
          <div className="flex flex-col items-center text-center shrink-0">
            <div className="relative mb-3">
              <img 
                src="https://a0.muscache.com/im/pictures/fe7217ff-0b24-438d-880d-b94722c75bf5.jpg"  
                alt="Carine - Host of Mooigedacht" 
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-[#FAF8F5] shadow-md"
                onError={handleImageFallback}
              />
              <div className="absolute bottom-0 right-0 bg-[#E11565] text-white p-1.5 rounded-full border-2 border-white shadow">
                <Star className="w-3.5 h-3.5 fill-white" />
              </div>
            </div>
            <h4 className="font-serif text-xl sm:text-2xl text-[#141A0E] font-bold">Carine</h4>
            <p className="text-xs text-[#28311B] font-bold mt-0.5">Superhost · 3 Years Hosting</p>
          </div>

          <div className="flex-1 grid grid-cols-3 gap-2 sm:gap-6 w-full border-t md:border-t-0 md:border-l border-[#282D1C]/15 pt-5 md:pt-0 md:pl-10 text-center">
            <div>
              <p className="text-2xl sm:text-4xl font-serif text-[#141A0E] font-bold">51</p>
              <p className="text-[10px] sm:text-xs uppercase tracking-wider text-[#28311B] font-bold mt-0.5 sm:mt-1">Reviews</p>
            </div>
            <div>
              <p className="text-2xl sm:text-4xl font-serif text-[#141A0E] font-bold">4.94</p>
              <p className="text-[10px] sm:text-xs uppercase tracking-wider text-[#28311B] font-bold mt-0.5 sm:mt-1">Rating</p>
            </div>
            <div>
              <p className="text-2xl sm:text-4xl font-serif text-[#141A0E] font-bold">100%</p>
              <p className="text-[10px] sm:text-xs uppercase tracking-wider text-[#28311B] font-bold mt-0.5 sm:mt-1">Response</p>
            </div>
            <div className="col-span-3 pt-2 text-[11px] sm:text-sm text-[#141A0E] font-semibold flex items-center justify-center md:justify-start gap-2">
              <Check className="w-4 h-4 text-[#3A4028] stroke-[2.5] shrink-0" />
              <span>Identity Verified · Resident Family Farm Host</span>
            </div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -4 }}
            className="p-6 sm:p-8 border border-[#282D1C]/15 rounded-2xl bg-white shadow-xs flex flex-col justify-between"
          >
            <p className="text-xs xs:text-sm sm:text-base text-[#181E10] font-normal italic leading-relaxed mb-5 sm:mb-6">
              "Prachtige unieke plek midden in een bergdal. Na een avontuurlijke mooie weg door de bergen kom je aan in een community. De mensen zijn heel lief en ik voelde me heel veilig. Bij het huisje heb je veel privacy en geweldig mooi uitzicht..."
            </p>
            <div className="flex items-center gap-3 pt-3.5 sm:pt-4 border-t border-[#282D1C]/10">
              <span className="w-8 h-8 rounded-full bg-[#DFD8C0] text-[#141A0E] font-serif flex items-center justify-center font-bold text-xs">E</span>
              <div>
                <span className="font-bold text-xs text-[#141A0E] block">Ellen</span>
                <span className="text-[11px] sm:text-xs text-[#384326] font-medium">April 2026</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -4 }}
            className="p-6 sm:p-8 border border-[#282D1C]/15 rounded-2xl bg-white shadow-xs flex flex-col justify-between"
          >
            <p className="text-xs xs:text-sm sm:text-base text-[#181E10] font-normal italic leading-relaxed mb-5 sm:mb-6">
              "This is a superb mountain location with very comfortable and well equipped accommodation. It is perfectly located with terrific views and great walks. The waterfall walk is special and the pool under the falls perfect for a swim. Above all Carine and Pierre are the perfect hosts."
            </p>
            <div className="flex items-center gap-3 pt-3.5 sm:pt-4 border-t border-[#282D1C]/10">
              <span className="w-8 h-8 rounded-full bg-[#B1BDDF] text-[#141A0E] font-serif flex items-center justify-center font-bold text-xs">K</span>
              <div>
                <span className="font-bold text-xs text-[#141A0E] block">Keith</span>
                <span className="text-[11px] sm:text-xs text-[#384326] font-medium">Rainham, United Kingdom</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="text-center">
          <a 
            href="https://www.airbnb.co.uk/users/profile/1468734142639621448"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-2 border-[#242A19] hover:border-[#141A0E] rounded-full px-7 sm:px-8 py-3 sm:py-3.5 text-xs uppercase tracking-[0.2em] font-bold text-[#141A0E] hover:bg-[#242A19] hover:text-white transition-all active:scale-95 cursor-pointer shadow-xs"
          >
            Read All 51 Reviews on Airbnb
          </a>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4 sm:p-8"
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 text-white/80 hover:text-white p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors active:scale-95"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative max-w-5xl max-h-[80vh] w-full flex items-center justify-center">
              <img
                src={galleryImages[lightboxIndex]}
                alt={`Photo ${lightboxIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
                onError={handleImageFallback}
              />
            </div>
            <div className="mt-4 flex items-center gap-4 text-white text-xs">
              <button
                onClick={() => setLightboxIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1))}
                className="px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 transition-colors active:scale-95"
              >
                Previous
              </button>
              <span className="font-light tracking-widest">{lightboxIndex + 1} / {galleryImages.length}</span>
              <button
                onClick={() => setLightboxIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0))}
                className="px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 transition-colors active:scale-95"
              >
                Next
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DIRECT & LEKKESLAAP BOOKING MODAL */}
      <AnimatePresence>
        {isBookingModalOpen && (
          <div className="fixed inset-0 z-[95] flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#FAF8F5] rounded-3xl max-w-lg w-full p-6 sm:p-10 shadow-2xl border border-olive-dark/15 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="text-xs uppercase tracking-[0.25em] text-[#3E4929] font-bold block mb-1">
                    {bookingChannel === 'lekkeslaap' ? 'Lekkeslaap Concierge' : 'Direct Host Reservation'}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#141A0E] font-bold">
                    {bookingChannel === 'lekkeslaap' ? 'Book via Lekkeslaap' : 'Inquire Direct with Carine'}
                  </h3>
                  <p className="text-sm text-[#28311B] font-semibold mt-1">
                    Standard Rate: R1 050 / night (Up to 6 guests)
                  </p>
                </div>
                <button
                  onClick={() => setIsBookingModalOpen(false)}
                  className="p-2 rounded-full hover:bg-[#282D1C]/10 text-[#141A0E] transition-colors active:scale-95 cursor-pointer"
                >
                  <X className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>

              {bookingSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-12 h-12 bg-[#586B56] text-white rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <h4 className="font-serif text-2xl text-[#141A0E] font-bold">Connecting to WhatsApp...</h4>
                  <p className="text-sm text-[#1F2614] font-normal">
                    Carine will confirm availability and payment particulars shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleDirectBookingSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#141A0E] font-bold mb-1 uppercase tracking-wider text-xs">
                        Check-In Date
                      </label>
                      <input
                        type="date"
                        value={bookingDates.checkIn}
                        onChange={(e) => setBookingDates({ ...bookingDates, checkIn: e.target.value })}
                        className="w-full bg-white border border-[#282D1C]/30 rounded-xl p-3 text-[#141A0E] font-medium focus:outline-none focus:border-[#141A0E] text-xs shadow-xs"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[#141A0E] font-bold mb-1 uppercase tracking-wider text-xs">
                        Check-Out Date
                      </label>
                      <input
                        type="date"
                        value={bookingDates.checkOut}
                        onChange={(e) => setBookingDates({ ...bookingDates, checkOut: e.target.value })}
                        className="w-full bg-white border border-[#282D1C]/30 rounded-xl p-3 text-[#141A0E] font-medium focus:outline-none focus:border-[#141A0E] text-xs shadow-xs"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#141A0E] font-bold mb-1 uppercase tracking-wider text-xs">
                      Guests Count
                    </label>
                    <select
                      value={bookingDates.guests}
                      onChange={(e) => setBookingDates({ ...bookingDates, guests: Number(e.target.value) })}
                      className="w-full bg-white border border-[#282D1C]/30 rounded-xl p-3 text-[#141A0E] font-medium focus:outline-none focus:border-[#141A0E] text-xs shadow-xs"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'} (Cottage accommodates up to 6)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#141A0E] font-bold mb-1 uppercase tracking-wider text-xs">
                      Special Notes or Trail Inquiries
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Camino hike stopover, pet request, or ordering farm dinner baskets..."
                      value={bookingDates.notes}
                      onChange={(e) => setBookingDates({ ...bookingDates, notes: e.target.value })}
                      className="w-full bg-white border border-[#282D1C]/30 rounded-xl p-3 text-[#141A0E] font-medium focus:outline-none focus:border-[#141A0E] text-xs resize-none shadow-xs"
                    />
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#586B56]/15 border border-[#586B56]/35 flex items-center justify-between text-xs">
                    <span className="text-[#141A0E] font-bold">Direct Booking Benefit</span>
                    <span className="text-[#242A19] font-bold">Zero Commission / Best Rate Guarantee</span>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-[#242A19] hover:bg-[#1A1F12] text-white py-4 rounded-xl font-bold uppercase tracking-[0.18em] transition-colors shadow-md flex items-center justify-center gap-2 active:scale-95 cursor-pointer text-xs"
                    >
                      <Send className="w-4 h-4 stroke-[2]" />
                      <span>Send Direct Inquiry to Host</span>
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FARM SHOP BASKET MODAL */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[96] flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#FAF8F5] rounded-3xl max-w-lg w-full p-6 sm:p-10 shadow-2xl border border-[#282D1C]/20 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="text-xs uppercase tracking-[0.25em] text-[#8E792C] font-bold block mb-1">
                    Cottage Kitchen Pre-Order
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#141A0E] font-bold">
                    Your Farm Provisions Basket
                  </h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-full hover:bg-[#282D1C]/10 text-[#141A0E] transition-colors active:scale-95 cursor-pointer"
                >
                  <X className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>

              {Object.keys(cart).length === 0 ? (
                <div className="text-center py-10 text-[#28311B]">
                  <ShoppingBag className="w-8 h-8 mx-auto mb-2 opacity-60 stroke-[2]" />
                  <p className="font-medium">Your basket is currently empty.</p>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="divide-y divide-[#282D1C]/15">
                    {cartEntries.map(([id, qty]: [string, number]) => {
                      const item = PANTRY_ITEMS.find((p) => p.id === id);
                      if (!item) return null;
                      return (
                        <div key={id} className="py-3.5 flex items-center justify-between gap-3 text-xs">
                          <div>
                            <span className="font-bold text-[#141A0E] block text-sm">{item.name}</span>
                            <span className="text-[#28311B] font-semibold">R{item.price} each</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5 border border-[#282D1C]/25 rounded-lg p-1 bg-white shadow-2xs">
                              <button onClick={() => removeFromCart(id)} className="p-0.5 hover:bg-black/5 rounded cursor-pointer">
                                <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                              </button>
                              <span className="font-bold px-1.5 text-[#141A0E]">{qty}</span>
                              <button onClick={() => addToCart(id)} className="p-0.5 hover:bg-black/5 rounded cursor-pointer">
                                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                              </button>
                            </div>
                            <span className="font-bold text-[#141A0E] min-w-[55px] text-right">R{item.price * Number(qty)}</span>
                            <button onClick={() => clearItem(id)} className="text-red-600 hover:text-red-800 p-1 cursor-pointer">
                              <Trash2 className="w-4 h-4 stroke-[2]" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-4 border-t border-[#282D1C]/20 flex items-baseline justify-between font-serif text-2xl text-[#141A0E]">
                    <span className="font-bold">Total Provision Cost:</span>
                    <span className="font-bold">R{cartTotalPrice}</span>
                  </div>

                  <p className="text-xs text-[#28311B] font-medium leading-relaxed">
                    These items will be placed in your Heritage Cottage refrigerator and pantry prior to check-in. Payment settled directly with Carine via EFT or upon arrival.
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={handleCartSubmit}
                      className="w-full bg-[#242A19] hover:bg-[#1A1F12] text-white py-4 rounded-xl font-bold uppercase tracking-[0.18em] transition-colors shadow-md flex items-center justify-center gap-2 active:scale-95 text-xs cursor-pointer"
                    >
                      <Send className="w-4 h-4 stroke-[2]" />
                      <span>Send Pre-Order on WhatsApp</span>
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
