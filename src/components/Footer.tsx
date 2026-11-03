import { Instagram, Facebook, Mail, Phone, MapPin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#3A4028] text-[#DFD8C0] py-20 px-6 sm:px-12 lg:px-16 border-t border-white/10 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        {/* Brand & Ethos */}
        <div className="lg:col-span-2 flex flex-col space-y-5">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#B5A248] font-medium block mb-1">
              Working Farm Stays
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl tracking-[0.15em] uppercase text-white font-normal">
              Mooigedacht
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#DFD8C0]/80 leading-relaxed max-w-sm font-light">
            "Here at Mooigedacht the time is slow, the air is clean, and the water is cool." 
            A multi-generational farm sanctuary cradled by the mountains in Kareedouw, Eastern Cape.
          </p>
          
          <div className="pt-2 flex items-center gap-3">
            <a 
              href="https://instagram.com" 
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full border border-[#DFD8C0]/30 flex items-center justify-center hover:bg-[#DFD8C0] hover:text-[#3A4028] transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full border border-[#DFD8C0]/30 flex items-center justify-center hover:bg-[#DFD8C0] hover:text-[#3A4028] transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Written Menu: Stay & Trails */}
        <div>
          <h4 className="font-serif text-sm text-white mb-5 tracking-widest uppercase font-semibold">
            Stay &amp; Trails
          </h4>
          <ul className="space-y-3 text-xs font-light text-[#DFD8C0]/80">
            <li>
              <a href="#cottages" className="hover:text-white transition-colors block py-0.5">
                Heritage Cottage
              </a>
            </li>
            <li>
              <a href="#book-your-stay" className="hover:text-white transition-colors block py-0.5">
                Book on Airbnb
              </a>
            </li>
            <li>
              <a href="#book-your-stay" className="hover:text-white transition-colors block py-0.5">
                Book on Lekkeslaap
              </a>
            </li>
            <li>
              <a href="#book-your-stay" className="hover:text-white transition-colors block py-0.5">
                Direct Host Inquiry
              </a>
            </li>
            <li>
              <a href="#cottages" className="hover:text-white transition-colors block py-0.5">
                The Camino Trail
              </a>
            </li>
          </ul>
        </div>

        {/* Written Menu: Valley Guide */}
        <div>
          <h4 className="font-serif text-sm text-white mb-5 tracking-widest uppercase font-semibold">
            Valley Guide
          </h4>
          <ul className="space-y-3 text-xs font-light text-[#DFD8C0]/80">
            <li>
              <span className="block py-0.5 hover:text-white transition-colors cursor-default">
                Farm Shop &amp; Kitchen
              </span>
            </li>
            <li>
              <span className="block py-0.5 hover:text-white transition-colors cursor-default">
                Local Visits &amp; Views
              </span>
            </li>
            <li>
              <span className="block py-0.5 hover:text-white transition-colors cursor-default">
                Stories of the Valley
              </span>
            </li>
            <li>
              <span className="block py-0.5 hover:text-white transition-colors cursor-default">
                Hand-Illustrated Maps
              </span>
            </li>
            <li>
              <span className="block py-0.5 hover:text-white transition-colors cursor-default">
                Fauna &amp; Flora Guide
              </span>
            </li>
          </ul>
        </div>

        {/* Contact Details */}
        <div>
          <h4 className="font-serif text-sm text-white mb-5 tracking-widest uppercase font-semibold">
            Contact Host
          </h4>
          <ul className="space-y-3 text-xs font-light text-[#DFD8C0]/80">
            <li className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#B5A248] shrink-0 mt-0.5" />
              <span>Mooigedacht Farm, Kareedouw 6400, Eastern Cape</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#B5A248] shrink-0" />
              <a href="https://wa.me/27720000000" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                +27 (0) 72 000 0000
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#B5A248] shrink-0" />
              <a href="mailto:carine@mooigedachtcollective.co.za" className="hover:text-white transition-colors">
                carine@mooigedacht.co.za
              </a>
            </li>
            <li className="pt-2 text-[11px] text-[#B5A248]">
              Hosted by Carine &amp; Pierre
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 text-[11px] text-[#DFD8C0]/50 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} Mooigedacht Collective · All rights reserved.</p>
        <p className="flex items-center gap-1">
          Crafted with care for Mother of Jakes · XXH Studio Lookbook
        </p>
      </div>
    </footer>
  );
}
