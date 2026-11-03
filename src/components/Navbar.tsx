import { useState } from 'react';
import { Menu, X, Calendar, ArrowRight, Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';

interface NavbarProps {
  onOpenBooking?: () => void;
  cartCount?: number;
  onOpenCart?: () => void;
}

export default function Navbar({ onOpenBooking, cartCount = 0, onOpenCart }: NavbarProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'cottages', label: 'Our Cottages' },
    { id: 'camino', label: 'The Camino' },
    { id: 'shop', label: 'Farm Shop' },
    { id: 'attractions', label: 'Local Visits' },
    { id: 'camping', label: 'Camping' },
    { id: 'trails', label: 'Trails & Hiking' },
    { id: 'nature', label: 'Fauna & Flora' },
    { id: 'about', label: 'About Us' },
  ];

  const scrollToSection = (id: string) => {
    setIsDrawerOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 76;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <nav className="sticky top-0 w-full z-50 px-3.5 sm:px-6 md:px-8 lg:px-12 py-2.5 sm:py-3.5 flex items-center justify-between bg-[#F7F5F0]/98 backdrop-blur-md border-b border-[#282D1C]/15 text-[#141A0E] shadow-2xs transition-all duration-300">
        
        {/* Left: Brand Wordmark & Mobile Trigger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile-Only Menu Button - STRICTLY HIDDEN ON DESKTOP & TABLET */}
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="flex sm:hidden items-center justify-center w-10 h-10 rounded-xl border border-[#282D1C]/25 bg-white/80 hover:bg-[#282D1C]/10 text-[#141A0E] active:scale-90 transition-transform cursor-pointer shadow-2xs"
            aria-label="Open mobile navigation menu"
            id="mobile-nav-toggle"
          >
            <Menu className="w-5 h-5 text-[#141A0E]" />
          </button>

          <Link 
            to="/" 
            onClick={() => scrollToSection('hero')}
            className="group flex items-center"
          >
            <span className="font-serif text-lg xs:text-xl sm:text-2xl font-bold tracking-[0.14em] sm:tracking-[0.16em] uppercase text-[#141A0E] group-hover:opacity-85 transition-opacity select-none">
              Mooigedacht
            </span>
          </Link>
        </div>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden sm:flex items-center gap-4 md:gap-6 lg:gap-8 text-xs lg:text-sm tracking-wider uppercase font-semibold text-[#1F2614]">
          <button 
            onClick={() => scrollToSection('cottages')} 
            className="hover:text-[#4F5736] transition-colors py-1 hover:underline underline-offset-4 decoration-[#282D1C]/50 whitespace-nowrap cursor-pointer"
          >
            Our Cottages
          </button>
          <button 
            onClick={() => scrollToSection('camino')} 
            className="hover:text-[#4F5736] transition-colors py-1 hover:underline underline-offset-4 decoration-[#282D1C]/50 whitespace-nowrap cursor-pointer"
          >
            The Camino
          </button>
          <button 
            onClick={() => scrollToSection('shop')} 
            className="hover:text-[#4F5736] transition-colors py-1 hover:underline underline-offset-4 decoration-[#282D1C]/50 whitespace-nowrap cursor-pointer relative"
          >
            Farm Shop
            {cartCount > 0 && (
              <span className="ml-1.5 px-2 py-0.5 bg-[#8E792C] text-white text-[11px] font-bold rounded-full shadow-xs">
                {cartCount}
              </span>
            )}
          </button>
          <button 
            onClick={() => scrollToSection('attractions')} 
            className="hover:text-[#4F5736] transition-colors py-1 hover:underline underline-offset-4 decoration-[#282D1C]/50 whitespace-nowrap cursor-pointer"
          >
            Local Visits
          </button>
          <button 
            onClick={() => scrollToSection('about')} 
            className="hover:text-[#4F5736] transition-colors py-1 hover:underline underline-offset-4 decoration-[#282D1C]/50 whitespace-nowrap cursor-pointer"
          >
            About Us
          </button>
        </div>

        {/* Right: Actions (Mobile-Optimized Basket + Book Button) */}
        <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
          {cartCount > 0 && (
            <button
              onClick={onOpenCart}
              className="px-2.5 sm:px-3.5 py-1.5 rounded-full bg-[#B5A248]/25 border border-[#8E792C] text-[#141A0E] text-xs font-bold flex items-center gap-1 active:scale-95 cursor-pointer shadow-2xs"
            >
              <span>Basket ({cartCount})</span>
            </button>
          )}

          <a
            href="#book-your-stay"
            onClick={(e) => {
              if (onOpenBooking) {
                e.preventDefault();
                onOpenBooking();
              } else {
                e.preventDefault();
                scrollToSection('book-your-stay');
              }
            }}
            className="flex items-center gap-1.5 sm:gap-2 bg-[#242A19] hover:bg-[#384227] text-white px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-xs hover:shadow active:scale-95 cursor-pointer"
            id="nav-book-button"
          >
            <Calendar className="w-3.5 h-3.5 stroke-[2.5]" />
            <span className="whitespace-nowrap hidden sm:inline">Book Your Stay</span>
            <span className="whitespace-nowrap sm:hidden">Book</span>
          </a>
        </div>
      </nav>

      {/* Mobile Drawer (Only accessible on mobile screens) */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80] sm:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              className="fixed top-0 left-0 h-full w-[88vw] max-w-xs bg-[#F7F5F0] z-[90] shadow-2xl flex flex-col justify-between border-r border-[#282D1C]/20 sm:hidden"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-[#282D1C]/15 flex items-center justify-between bg-white/60">
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-[#3E4929] font-bold block mb-0.5">
                    Working Farm Stay
                  </span>
                  <h3 className="font-serif text-2xl text-[#141A0E] font-bold tracking-wide">Mooigedacht</h3>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#282D1C]/10 text-[#141A0E] transition-colors active:scale-90 cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
                <span className="text-xs uppercase tracking-widest text-[#282D1C]/70 font-bold block">
                  Valley Exploration
                </span>
                <div className="space-y-1">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                      onClick={() => scrollToSection(item.id)}
                      className="w-full text-left py-3 px-3 rounded-xl hover:bg-[#282D1C]/8 text-[#141A0E] flex items-center justify-between group transition-colors active:bg-[#282D1C]/15 cursor-pointer"
                    >
                      <span className="font-serif text-lg font-bold text-[#141A0E] group-hover:translate-x-1.5 transition-transform">
                        <span className="text-xs text-[#525E37] font-sans font-bold mr-2.5">0{index + 1}.</span>
                        {item.label}
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#282D1C]/50 group-hover:text-[#141A0E] group-hover:translate-x-1 transition-all" />
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-5 border-t border-[#282D1C]/15 space-y-3.5 bg-white/80">
                <div className="flex items-center justify-between text-xs text-[#141A0E] font-bold">
                  <div className="flex items-center gap-3">
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#4F5736] p-1.5">
                      <Instagram className="w-4 h-4 stroke-[2]" />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[#4F5736] p-1.5">
                      <Facebook className="w-4 h-4 stroke-[2]" />
                    </a>
                  </div>
                  <span>Kareedouw, Eastern Cape</span>
                </div>
                <button
                  onClick={() => scrollToSection('book-your-stay')}
                  className="block w-full bg-[#242A19] hover:bg-[#384227] text-white py-3.5 rounded-xl text-center text-xs font-bold uppercase tracking-widest shadow-md transition-colors active:scale-95 cursor-pointer"
                >
                  Book Your Stay Direct
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
