import React from 'react';
import { motion } from 'motion/react';
import { Coffee, Laptop, Users, Heart, MapPin, Sparkles, Star } from 'lucide-react';

export default function About() {
  const pillars = [
    {
      icon: <Coffee className="w-5 h-5 text-coffee-600" />,
      title: 'Artisanal, Indian Sourced',
      description: 'We source single-origin specialty beans directly from Chikhaldara hills and Araku Valley, roasted custom and brewed to perfection by certified baristas.',
    },
    {
      icon: <Laptop className="w-5 h-5 text-coffee-600" />,
      title: 'Built for Co-Working',
      description: 'Gigabit symmetric Wi-Fi, 50+ international power outlets, acoustically dampened workspace zones, and comfortable ergonomic seating.',
    },
    {
      icon: <Users className="w-5 h-5 text-coffee-600" />,
      title: 'Vibrant Pune Community',
      description: 'A cozy melting pot for students from Symbiosis & Fergusson, tech freelancers, writers, and local startups seeking dynamic collaboration.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-cream-50 overflow-hidden relative font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Bento Grid layout for Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Box 1: Core Narrative (Col span 7) */}
          <div className="lg:col-span-7 bg-[#FDFBF7] border border-[#E5DACE] rounded-[2.5rem] p-8 sm:p-10 flex flex-col justify-between shadow-sm">
            <div className="space-y-6">
              <span className="text-[#A67C52] font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-coffee-400" /> Pune, FC Road (Flagship)
              </span>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#4A3728] leading-tight">
                Our Sanctuary for <br/>
                <span className="font-serif italic font-normal text-[#A67C52]">Creation & Co-Working</span>
              </h2>
              
              <p className="text-sm sm:text-base text-coffee-800/90 leading-relaxed font-light">
                Born out of a simple desire to create the perfect blend of a high-performance workspace and a cozy living room, Brew Haven provides Pune’s thinkers, tinkerers, and coffee lovers a sanctuary. Whether you are prepping for a campus viva, coding your next SaaS launch, or seeking a comfortable corner with a good book, we have the perfect seating and a matching artisanal beverage.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-[#F5F1EB]">
              <div className="space-y-0.5">
                <span className="block text-2xl font-display font-bold text-[#4A3728]">80+ Daily</span>
                <span className="text-[10px] text-coffee-500 uppercase tracking-wider block">Happy Minds Engaged</span>
              </div>
              <div className="space-y-0.5">
                <span className="block text-2xl font-display font-bold text-[#4A3728]">Est. 2023</span>
                <span className="text-[10px] text-coffee-500 uppercase tracking-wider block">Award-winning Hub</span>
              </div>
            </div>
          </div>

          {/* Box 2: Visual Collage Corner (Col span 5) */}
          <div className="lg:col-span-5 bg-[#E5DACE] rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden shadow-sm min-h-[380px]">
            {/* Soft decorative background details */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#4A3728 1px, transparent 1px), linear-gradient(90deg, #4A3728 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

            <div className="relative z-10 flex justify-between items-start">
              <span className="text-[10px] bg-white/40 backdrop-blur-sm text-coffee-950 font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                The Cozy Vibe
              </span>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-coffee-950">
                <Star className="w-4 h-4 text-[#4A3728] fill-current" />
              </div>
            </div>

            {/* Centered Image Frame mimicking a bento card slot */}
            <div className="my-6 relative z-10 w-full h-44 bg-white/40 p-2 rounded-2xl border border-white/30 overflow-hidden shadow-inner">
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=600&h=400"
                alt="Cozy interior"
                className="w-full h-full object-cover rounded-xl transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="relative z-10 flex justify-between items-center bg-[#FDFBF7]/90 backdrop-blur-md p-4 rounded-2xl border border-[#E5DACE]/60">
              <div className="flex items-center gap-2.5">
                <div className="bg-red-50 p-2 rounded-full text-red-500 flex-shrink-0">
                  <Heart className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-coffee-950 font-sans">Pune's Favorite Spot</div>
                  <div className="text-[9px] text-coffee-500 font-mono">FC ROAD SANCTUARY</div>
                </div>
              </div>
              <span className="text-[10px] text-[#A67C52] font-bold bg-[#F5F1EB] px-2.5 py-1 rounded-md">
                10/10
              </span>
            </div>
          </div>

          {/* Box 3: Three pillars rendered as dynamic full-width styled bento card rows (Col span 12) */}
          <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#E5DACE] rounded-[2rem] p-6 flex flex-col justify-between hover:border-coffee-300 transition-all duration-300 shadow-sm"
              >
                <div className="space-y-4">
                  <div className="bg-[#F5F1EB] text-coffee-800 p-3 rounded-full w-10 h-10 flex items-center justify-center border border-[#E5DACE]/40">
                    {pillar.icon}
                  </div>
                  
                  <div className="space-y-1.5">
                    <h3 className="font-display font-bold text-coffee-950 text-lg">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-coffee-800/80 leading-relaxed font-sans">
                      {pillar.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F5F1EB] text-[10px] uppercase font-mono tracking-wider text-coffee-400">
                  Core Pillar 0{idx + 1}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
