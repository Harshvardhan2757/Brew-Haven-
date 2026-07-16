import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { Review } from '../types';

const TESTIMONIALS: Review[] = [
  {
    id: '1',
    name: 'Ananya Deshpande',
    role: 'Freelance UI/UX Designer',
    comment: 'Brew Haven is literally my primary office in Pune! The gigabit Wi-Fi is symmetric and blazing fast—perfect for uploading heavy Figma boards. Plus, having a personal universal power plug at every single seat is a game changer. I always book the Window Workspace table.',
    rating: 5,
    date: 'June 2026',
    avatar: 'https://media.licdn.com/dms/image/v2/D4D22AQFeUxJgbZmpTA/feedshare-shrink_800/feedshare-shrink_800/0/1717076446601?e=2147483647&v=beta&t=rfTS7JoL7c4iIPT99HqQ0Gr1sM5o1ytZI-FiiC-rvrI'
  },
  {
    id: '2',
    name: 'Rohan Mehta',
    role: 'Symbiosis Student & Writer',
    comment: 'The study atmosphere here is perfect. Unlike noisy generic cafes, they have soft acoustic music and great lighting. My friends and I reserve a Couch Cozy Corner during our finals weeks. The Camp Rose Latte keeps me going for hours. Truly Pune’s best hidden gem.',
    rating: 5,
    date: 'May 2026',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    id: '3',
    name: 'Karan Malhotra',
    role: 'Tech Startup Founder',
    comment: 'We held our pre-seed discussions and interviewed our first three developers right here in the Brew Haven garden patio. The ambiance is relaxed yet highly professional. The staff knows how to treat people, and the Lemongrass Cold Brew is spectacular. Highly recommend the table booking feature!',
    rating: 5,
    date: 'July 2026',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    id: '4',
    name: 'Priya Shinde',
    role: 'Specialty Coffee Purist',
    comment: 'I am extremely picky about extraction temperatures and roasting profiles. Watching their certified baristas dial in the V60 Pour Over with Araku Valley organic beans made me realize these guys are serious. The flavor notes were perfectly bright, clean, and exact.',
    rating: 5,
    date: 'April 2026',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    id: '5',
    name: 'Arthur Morgan',
    role: 'Cowboy🤠',
    comment: 'I am afriad🥺',
    rating: 5,
    date: 'November 1899',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkc_n77KUBWcWdNMyoy9GyvUFAtCx6UypJ6HtHhjk8ifJU5V-oM8HxBSc9&s=10'
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const currentReview = TESTIMONIALS[activeIndex];

  return (
    <section id="reviews" className="py-24 bg-cream-50 relative overflow-hidden">
      {/* Decorative Blur Blobs */}
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-coffee-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-coffee-600 font-mono text-xs font-bold uppercase tracking-widest block">
            Loved by Pune’s Community
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-coffee-950">
            Hear From Our <span className="font-serif italic text-coffee-700">Haveneers</span>
          </h2>
          <p className="text-sm text-coffee-800/80 leading-relaxed font-sans">
            Our cozy spaces are populated daily by incredible minds. Read about their experiences and what makes Brew Haven their absolute favorite spot in Pune.
          </p>
        </div>

        {/* Carousel Showcase */}
        <div className="max-w-4xl mx-auto relative">
          
          {/* Big Quote Icon background */}
          <div className="absolute -top-12 -left-6 text-[#E5DACE] select-none pointer-events-none opacity-40">
            <Quote className="w-32 h-32 rotate-180 fill-current" />
          </div>

          <div className="bg-[#FDFBF7] rounded-[2.5rem] border border-[#E5DACE] p-8 sm:p-14 shadow-sm relative z-10">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentReview.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Rating */}
                <div className="flex gap-1 justify-center sm:justify-start">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#A67C52] text-[#A67C52]" />
                  ))}
                </div>

                {/* Comment Text */}
                <p className="text-base sm:text-xl text-[#4A3728] leading-relaxed font-sans italic font-light">
                  "{currentReview.comment}"
                </p>

                {/* User Info Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-[#F5F1EB]">
                  <div className="flex items-center gap-4">
                    {/* User Avatar */}
                    <div className="w-14 h-14 rounded-full overflow-hidden border border-[#E5DACE]">
                      <img
                        src={currentReview.avatar}
                        alt={currentReview.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    
                    <div>
                      <h4 className="font-display font-bold text-lg text-[#4A3728] leading-snug">
                        {currentReview.name}
                      </h4>
                      <p className="text-xs text-[#A67C52] font-semibold uppercase tracking-wider">
                        {currentReview.role}
                      </p>
                    </div>
                  </div>

                  <div className="text-[10px] font-mono uppercase tracking-wider text-coffee-400 font-bold">
                    Reviewed in {currentReview.date}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center sm:justify-end gap-3 mt-6 relative z-20 pr-4">
            <button
              onClick={handlePrev}
              id="reviews_carousel_prev"
              className="p-3.5 rounded-full border border-[#E5DACE] bg-white text-[#4A3728] hover:bg-[#F5F1EB] cursor-pointer shadow-sm transition-colors duration-200"
              aria-label="Previous Review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              id="reviews_carousel_next"
              className="p-3.5 rounded-full border border-[#E5DACE] bg-white text-[#4A3728] hover:bg-[#F5F1EB] cursor-pointer shadow-sm transition-colors duration-200"
              aria-label="Next Review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Dynamic Highlight Stats as beautiful Bento cells */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-16 mt-16 border-t border-[#F5F1EB]">
          <div className="text-center p-6 bg-white border border-[#E5DACE] rounded-[2rem] shadow-sm space-y-1.5">
            <div className="text-3xl font-display font-black text-[#4A3728]">4.8 ★</div>
            <div className="text-[10px] font-mono text-coffee-400 uppercase tracking-widest font-bold">Google Rating</div>
          </div>
          <div className="text-center p-6 bg-white border border-[#E5DACE] rounded-[2rem] shadow-sm space-y-1.5">
            <div className="text-3xl font-display font-black text-[#4A3728]">1,200+</div>
            <div className="text-[10px] font-mono text-coffee-400 uppercase tracking-widest font-bold">Table Bookings</div>
          </div>
          <div className="text-center p-6 bg-white border border-[#E5DACE] rounded-[2rem] shadow-sm space-y-1.5">
            <div className="text-3xl font-display font-black text-[#4A3728]">99.9%</div>
            <div className="text-[10px] font-mono text-coffee-400 uppercase tracking-widest font-bold">Wi-Fi Uptime</div>
          </div>
          <div className="text-center p-6 bg-[#A67C52] text-white border border-[#A67C52] rounded-[2rem] shadow-sm space-y-1.5">
            <div className="text-3xl font-display font-black text-cream-50">100%</div>
            <div className="text-[10px] font-mono text-cream-100 uppercase tracking-widest font-bold">Cozy Flow</div>
          </div>
        </div>

      </div>
    </section>
  );
}
