import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Users, Clock, Wifi, Sparkles, Award, ArrowRight, Coffee } from 'lucide-react';

interface HeroProps {
  onOpenBookingForm: (prefilledGuests?: number) => void;
  onScrollToSection: (id: string) => void;
}

export default function Hero({ onOpenBookingForm, onScrollToSection }: HeroProps) {
  const handleQuickBook = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const guests = Number(formData.get('quick-guests') || '2');
    onOpenBookingForm(guests);
  };

  return (
    <section id="hero" className="relative bg-cream-50 pt-4 pb-12 lg:py-16 font-sans">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[#FDFBF7] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
          
          {/* Box 1: Core Hero Section (Col span 2, Row span 2 equivalent inside grid) */}
          <div className="lg:col-span-2 lg:row-span-2 bg-[#E5DACE] rounded-[2.5rem] p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden shadow-sm border border-coffee-200/50 min-h-[480px]">
            {/* Spinning badge in the corner */}
            <div className="absolute -top-6 -right-6 sm:top-4 sm:right-4 p-4 select-none pointer-events-none opacity-40 sm:opacity-100">
              <div className="w-28 h-28 border border-[#4A3728]/30 rounded-full flex items-center justify-center animate-spin-slow">
                <span className="text-[8px] uppercase tracking-[0.22em] text-[#4A3728] font-bold text-center">
                  Fresh Roasted • Pune • Est 2023 •
                </span>
              </div>
            </div>

            <div className="space-y-4 max-w-lg mt-8 lg:mt-0">
              {/* Tagline Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F5F1EB] rounded-full border border-coffee-300/30 text-coffee-800 text-[11px] font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-coffee-600 animate-pulse" />
                <span>Pune's Work Sanctuary</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.1] text-coffee-950">
                Where Pune's <br/>
                <span className="italic font-normal text-coffee-800">Creative Minds</span> <br/>
                Flow & Connect.
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-coffee-900/90 leading-relaxed font-light font-sans">
                Nestled on FC Road, Brew Haven is Pune's premium coffee destination. From artisanal roasts to fast gigabit Wi-Fi and universal desk chargers, find your sanctuary in the heart of the city.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-8">
              <button
                onClick={() => onOpenBookingForm()}
                id="hero_cta_book_btn"
                className="bg-[#4A3728] hover:bg-[#5D4636] text-white text-xs uppercase tracking-widest font-semibold py-4 px-8 rounded-full transition-all duration-300 hover:shadow-md cursor-pointer"
              >
                Book a Workstation
              </button>
              <button
                onClick={() => onScrollToSection('menu')}
                id="hero_cta_menu_btn"
                className="border border-[#4A3728] hover:bg-[#4A3728]/5 text-[#4A3728] text-xs uppercase tracking-widest font-semibold py-4 px-8 rounded-full transition-all duration-300 cursor-pointer"
              >
                View Menu
              </button>
            </div>
          </div>

          {/* Box 2: Signature Roast / Mood Image (Col span 1) */}
          <div className="bg-[#4A3728] rounded-[2rem] p-8 text-[#FDFBF7] flex flex-col justify-between relative overflow-hidden shadow-sm border border-coffee-950/20 group">
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="flex justify-between items-start z-10">
              <span className="text-[10px] bg-white/10 text-white px-3 py-1 rounded-full uppercase tracking-widest font-bold">
                Brewing Now
              </span>
              <Coffee className="w-6 h-6 text-cream-200/60 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            
            <div className="z-10 mt-8">
              <h3 className="text-3xl font-display font-bold text-cream-50 leading-tight">
                Monsooned <br />
                Malabar
              </h3>
              <p className="text-xs uppercase tracking-widest text-cream-200/60 mt-1.5 italic font-mono">
                Award Winning Blend
              </p>
            </div>

            <div className="border-t border-white/10 pt-4 mt-4 flex items-center justify-between z-10">
              <span className="text-xs text-cream-100/80 font-light">Single estate roast</span>
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white">
                ★
              </div>
            </div>
          </div>

          {/* Box 3: Live Operating Hours (Col span 1) */}
          <div className="bg-white border border-[#E5DACE] rounded-[2rem] p-8 flex flex-col justify-between shadow-sm">
            <div>
              <div className="text-[11px] uppercase tracking-widest text-[#4A3728]/60 font-bold mb-4 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#A67C52]" />
                <span>Open Hours</span>
              </div>
              
              <div className="space-y-3.5 font-sans">
                <div className="flex justify-between items-center border-b border-[#F5F1EB] pb-2">
                  <span className="text-xs text-[#4A3728]/80">Mon - Fri</span>
                  <span className="text-xs font-semibold text-[#4A3728]">08:00 - 22:00</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#F5F1EB] pb-2">
                  <span className="text-xs text-[#4A3728]/80">Sat - Sun</span>
                  <span className="text-xs font-semibold text-[#4A3728]">08:00 - 23:00</span>
                </div>
                <div className="flex justify-between items-center pb-1">
                  <span className="text-xs text-[#4A3728]/80">Co-working Space</span>
                  <span className="text-xs font-semibold text-[#4A3728]">24/7 Priority</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] uppercase tracking-wider text-emerald-700 font-bold bg-emerald-50 border border-emerald-200/50 px-3 py-1 rounded-full">
                Open & Welcoming
              </span>
            </div>
          </div>

          {/* Box 4: Quick Booking Workspace (Col span 2) */}
          <div className="lg:col-span-2 bg-[#A67C52] text-white rounded-[2rem] p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-8 shadow-sm border border-[#A67C52]/50">
            <div className="max-w-[280px] space-y-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mx-auto sm:mx-0">
                <Wifi className="w-5 h-5 text-cream-100" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold leading-tight text-cream-50">
                Need a Workspace?
              </h3>
              <p className="text-xs text-cream-100/90 leading-relaxed font-sans">
                Gigabit Wi-Fi, silent cabins, ergonomic chairs, and infinite latte refills to trigger your flow state.
              </p>
            </div>

            {/* Micro-form panel */}
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 w-full sm:w-auto sm:min-w-[260px] space-y-4">
              <div className="text-xs uppercase tracking-wider font-bold text-cream-100 text-center">
                Reserve Your Station
              </div>
              
              <form onSubmit={handleQuickBook} className="space-y-3">
                <div>
                  <label htmlFor="quick-guests" className="sr-only">Guests</label>
                  <select
                    name="quick-guests"
                    id="quick-guests"
                    className="w-full bg-white/20 border border-white/20 text-white rounded-xl py-2.5 px-3.5 text-xs focus:bg-[#A67C52] focus:outline-none placeholder-white/80"
                  >
                    <option className="text-coffee-950" value="1">1 Spot (Solo Flex)</option>
                    <option className="text-coffee-950" value="2">2 Spots (Duo Booth)</option>
                    <option className="text-coffee-950" value="4">4 Spots (Team Pod)</option>
                    <option className="text-coffee-950" value="6">6 Spots (Meeting Deck)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  id="hero_quick_book_submit"
                  className="w-full bg-white text-[#A67C52] hover:bg-cream-100 text-xs font-bold py-3 px-5 rounded-xl uppercase tracking-widest transition-colors shadow-sm cursor-pointer"
                >
                  Confirm Desk
                </button>
              </form>
            </div>
          </div>

          {/* Box 5: Amenities highlights or Pune stats (Col span 2) */}
          <div className="lg:col-span-2 bg-[#F5F1EB] rounded-[2rem] p-8 flex flex-col justify-between border border-[#E5DACE] shadow-sm">
            <div className="grid grid-cols-3 gap-4 items-center">
              
              <div className="text-center p-3 border-r border-[#E5DACE]/60">
                <span className="block text-2xl font-display font-bold text-[#4A3728]">50+</span>
                <span className="text-[10px] uppercase tracking-widest text-[#4A3728]/60 font-medium">Power Hubs</span>
              </div>
              
              <div className="text-center p-3 border-r border-[#E5DACE]/60">
                <span className="block text-2xl font-display font-bold text-[#4A3728]">1.2 Gbps</span>
                <span className="text-[10px] uppercase tracking-widest text-[#4A3728]/60 font-medium">Fibre Speed</span>
              </div>
              
              <div className="text-center p-3">
                <span className="block text-2xl font-display font-bold text-[#4A3728]">4.8 ★</span>
                <span className="text-[10px] uppercase tracking-widest text-[#4A3728]/60 font-medium">Google Score</span>
              </div>

            </div>

            <div className="mt-6 pt-4 border-t border-coffee-200/40 flex items-center justify-between text-xs text-[#4A3728]/80 font-sans">
              <span className="font-medium">Every table is optimized for productivity.</span>
              <button
                onClick={() => onScrollToSection('booking-section')}
                className="text-[#A67C52] hover:text-coffee-700 font-bold uppercase tracking-wider flex items-center gap-1 text-[10px]"
              >
                <span>Reserve desk now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
