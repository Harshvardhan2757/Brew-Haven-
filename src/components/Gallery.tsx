import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn, Eye, Layers } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  vibe: string;
  amenities: string[];
  image: string;
  aspect: 'portrait' | 'landscape' | 'square';
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'The Silent Work Sanctum',
    vibe: 'Designed specifically for deep, focused work or study. Features noise-absorbing warm wood acoustic panels and soft eye-easy ambient lighting.',
    amenities: ['Ergonomic Task Chairs', 'Private Outlet Strips', 'Reading Lamps'],
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=600&h=800',
    aspect: 'portrait'
  },
  {
    id: 'g-2',
    title: 'Artisan Espresso Bar',
    vibe: 'The heart of our laboratory. Where high-end La Marzocco machinery and single-estate beans are dialed in with micro-gram precision.',
    amenities: ['Barista Counter', 'Espresso Tasting Flight', 'V60 Pour Over Drips'],
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=800&h=600',
    aspect: 'landscape'
  },
  {
    id: 'g-3',
    title: 'Couch Cozy Corner',
    vibe: 'Plush velvet armchairs under a canopy of warm hanging Edison bulbs. Perfect for a long conversation, brainstorming a novel, or reading a book.',
    amenities: ['Bookshelf Access', 'Comfortable Couches', 'Warm Atmosphere'],
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=600&h=600',
    aspect: 'square'
  },
  {
    id: 'g-4',
    title: 'Sunlit Garden Patio',
    vibe: 'An open-air retreat bordered by fresh jasmine vines, green creepers, and rustic terracotta planters. Best enjoyed during cool Pune mornings.',
    amenities: ['Outdoor Seating', 'Pet Friendly Area', 'Natural Sky Breezes'],
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800&h=600',
    aspect: 'landscape'
  },
  {
    id: 'g-5',
    title: 'Freshly Baked Pastries',
    vibe: 'Buttery, flaky viennoiseries, sourdoughs, and cookies, baked fresh in our back kitchens at 6:00 AM every morning.',
    amenities: ['Baked in-house Daily', 'Organic Butter Sourced', 'Gluten-Free Options'],
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=600&h=800',
    aspect: 'portrait'
  },
  {
    id: 'g-6',
    title: 'The Community Long Table',
    vibe: 'A massive custom-carved teakwood table designed to host group project meetings, startup standups, board games, or sketching circles.',
    amenities: ['8-Person Seating', 'Central Power Core', 'Dimmable Overhead Light'],
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=600&h=600',
    aspect: 'square'
  }
];

export default function Gallery() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const activeItem = GALLERY_ITEMS.find((item) => item.id === selectedId);

  return (
    <section id="gallery" className="py-24 bg-cream-100 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-coffee-600 font-mono text-xs font-bold uppercase tracking-widest block">
            Visual Solace
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-coffee-950">
            A Glimpse Into <span className="font-serif italic text-coffee-700">Our Sanctuary</span>
          </h2>
          <p className="text-sm text-coffee-800/80 leading-relaxed font-sans">
            We meticulously crafted every square foot of Brew Haven to be visually inspiring and ergonomically comforting. Take a digital tour of our signature zones.
          </p>
        </div>

        {/* Gallery Grid (Bento/Masonry Hybrid layout) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px]">
          {GALLERY_ITEMS.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -6 }}
              onClick={() => setSelectedId(item.id)}
              className={`rounded-[2rem] overflow-hidden relative cursor-pointer group shadow-sm border border-[#E5DACE] hover:shadow-md transition-all duration-300 ${
                item.aspect === 'portrait' ? 'row-span-2 h-full' : 'row-span-1 h-full'
              }`}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/80 via-coffee-900/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Meta indicators */}
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                <ZoomIn className="w-4 h-4" />
              </div>

              {/* Title Overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-[9px] font-mono uppercase text-[#E5DACE] font-bold tracking-widest block">
                  Click to Explore Zone
                </span>
                <h3 className="font-display font-bold text-lg sm:text-xl">
                  {item.title}
                </h3>
                <p className="text-[11px] text-cream-100/70 truncate opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.vibe}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Immersive Lightbox Modal */}
        <AnimatePresence>
          {selectedId && activeItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
              {/* Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedId(null)}
                className="absolute inset-0 bg-coffee-950/80 backdrop-blur-sm"
              />

              {/* Content Panel */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.3 }}
                className="bg-[#FDFBF7] rounded-[2.5rem] overflow-hidden shadow-xl border border-[#E5DACE] max-w-4xl w-full relative z-10 grid md:grid-cols-12 max-h-[90vh] md:max-h-none overflow-y-auto"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedId(null)}
                  id="gallery_modal_close"
                  className="absolute top-4 right-4 bg-white hover:bg-[#F5F1EB] text-coffee-950 p-2.5 rounded-full shadow-md z-20 cursor-pointer transition-colors border border-[#E5DACE]"
                  aria-label="Close details"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Left side: Premium Large Image */}
                <div className="md:col-span-6 h-[260px] md:h-[500px]">
                  <img
                    src={activeItem.image}
                    alt={activeItem.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Right side: Detailed descriptions and vibe analysis */}
                <div className="md:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <span className="text-[9px] font-mono uppercase text-[#A67C52] font-bold tracking-widest block">
                      Zone Deep Dive
                    </span>
                    <h3 className="text-2xl font-display font-bold text-[#4A3728]">
                      {activeItem.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-coffee-800 leading-relaxed font-sans">
                      {activeItem.vibe}
                    </p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-[#F5F1EB]">
                    <span className="flex items-center gap-1 text-[9px] font-mono uppercase text-[#A67C52] font-bold tracking-wider">
                      <Layers className="w-3.5 h-3.5" /> Zone Amenities
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeItem.amenities.map((amenity, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-coffee-800 font-sans">
                          <span className="w-1.5 h-1.5 bg-[#A67C52] rounded-full flex-shrink-0" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={() => {
                        setSelectedId(null);
                        const bookEl = document.getElementById('booking-section');
                        if (bookEl) {
                          bookEl.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      id="gallery_modal_reserve_btn"
                      className="w-full bg-[#4A3728] hover:bg-[#5D4636] text-white font-semibold py-4 px-6 rounded-full text-xs uppercase tracking-widest transition-colors shadow-sm"
                    >
                      Reserve a Table in this Zone
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
