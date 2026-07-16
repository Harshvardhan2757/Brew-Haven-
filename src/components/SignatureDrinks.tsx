import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Star, Compass, RefreshCw, Feather } from 'lucide-react';

interface SignatureDrink {
  id: string;
  name: string;
  price: number;
  origin: string;
  technique: string;
  notes: string[];
  sweetness: number; // 1-5
  strength: number; // 1-5
  description: string;
  story: string;
  image: string;
}

const SIGNATURES: SignatureDrink[] = [
  {
    id: 'lemongrass-cold-brew',
    name: 'Punekari Lemongrass Cold Brew',
    price: 210,
    origin: 'Chikhaldara Hills (100% Arabica, Single Estate)',
    technique: '18-Hour Slow cold drip, vacuum infused with local fresh organic lemongrass sticks, double-filtered.',
    notes: ['Crisp Lemongrass', 'Wild Honey', 'Citrus Peel', 'Smooth Cocoa Finish'],
    sweetness: 2,
    strength: 4,
    description: 'Slow-steeped cold brew infused with Pune’s local lemongrass and topped with sweet milk foam.',
    story: 'Designed to combat hot Pune afternoons, this brew blends the earthy, bold chocolate profile of Chikhaldara beans with the floral, citrus freshness of lemongrass grown locally in Western Maharashtra gardens.',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=600&h=800'
  },
  {
    id: 'camp-rose-sweet-latte',
    name: 'Camp Rose Sweet Latte',
    price: 230,
    origin: 'Araku Valley Honey-Processed Arabica',
    technique: 'Espresso double ristretto pulled over thick cardamom-infused condensed milk, shaken with organic rose water extraction.',
    notes: ['Damask Rose', 'Sweet Cardamom', 'Toasted Almond', 'Velvet Cream'],
    sweetness: 5,
    strength: 3,
    description: 'A cozy floral-infused espresso pulled over sweet condensed milk and organic damask rose water.',
    story: 'Inspired by the historic, warm sweet scents of Pune Camp’s iconic Persian bakeries. We pay tribute to Pune’s melting pot of cultures by blending standard high-pressure Italian espresso with the luxurious sweetness of rose and cardamom.',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=600&h=800'
  },
  {
    id: 'truffle-espresso-mocha',
    name: 'Belgian Truffle Mocha',
    price: 245,
    origin: 'Karnataka Bababudangiri Washed AAA',
    technique: 'Barbarbudan espresso whipped together with warm, slow-melted Belgian dark truffle ganache, finished with micro-foamed farm fresh milk.',
    notes: ['Gooey Truffle Chocolate', 'Dark Berry', 'Roasted Hazelnut', 'Warm Cedar'],
    sweetness: 4,
    strength: 4,
    description: 'Double espresso combined with warm melted Belgian dark chocolate ganache and cocoa.',
    story: 'Where specialty coffee meets high-end patisserie. We utilize a chocolate sauce made daily in-house using premium Callebaut 70% dark chocolate chips and organic brown sugar, resulting in a mocha that has zero artificial aftertaste.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=600&h=800'
  }
];

export default function SignatureDrinks() {
  const [selectedId, setSelectedId] = useState(SIGNATURES[0].id);

  const activeDrink = SIGNATURES.find((d) => d.id === selectedId) || SIGNATURES[0];

  return (
    <section id="signatures" className="py-24 bg-cream-100 overflow-hidden relative">
      {/* Background Decorative Rings */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-coffee-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-coffee-600 font-mono text-xs font-bold uppercase tracking-widest block">
            Crafted Masterpieces
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-coffee-950">
            Our <span className="font-serif italic text-coffee-700">Signature</span> Creations
          </h2>
          <p className="text-sm text-coffee-800/80 leading-relaxed font-sans">
            These aren't just drinks; they are artisanal narratives. Explore the deliberate techniques and local backstories behind our most celebrated beverages.
          </p>
        </div>

        {/* Interactive Layout */}
        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Drink Selection Rail */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="text-[10px] font-mono text-coffee-400 uppercase tracking-[0.2em] pl-2 font-bold">
              Select a Creation
            </span>
            {SIGNATURES.map((drink) => (
              <button
                key={drink.id}
                onClick={() => setSelectedId(drink.id)}
                id={`sig_drink_btn_${drink.id}`}
                className={`w-full text-left p-4 rounded-[1.8rem] border transition-all duration-300 relative overflow-hidden flex gap-4 items-center group cursor-pointer ${
                  selectedId === drink.id
                    ? 'bg-[#4A3728] text-white border-transparent shadow-md'
                    : 'bg-white hover:bg-[#F5F1EB] text-coffee-950 border-[#E5DACE]'
                }`}
              >
                {/* Micro Thumbnail */}
                <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 border border-[#E5DACE]/40">
                  <img
                    src={drink.image}
                    alt={drink.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-sm tracking-tight truncate">
                    {drink.name}
                  </h3>
                  <p className={`text-[10px] uppercase tracking-wider truncate mt-0.5 ${selectedId === drink.id ? 'text-cream-200' : 'text-coffee-500'}`}>
                    ₹{drink.price} • Specialty
                  </p>
                </div>

                {/* Arrow Accent */}
                <div className={`text-xs font-mono absolute right-4 top-1/2 -translate-y-1/2 transition-transform duration-300 ${
                  selectedId === drink.id ? 'text-cream-200 translate-x-0' : 'text-coffee-300/30 opacity-0 group-hover:opacity-100 group-hover:translate-x-1'
                }`}>
                  →
                </div>
              </button>
            ))}
          </div>

          {/* Right Column: Dynamic Deep-Dive Board */}
          <div className="lg:col-span-8 bg-[#FDFBF7] rounded-[2.5rem] border border-[#E5DACE] p-6 sm:p-10 shadow-sm relative min-h-[460px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDrink.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="grid md:grid-cols-12 gap-8 items-start"
              >
                {/* Picture side */}
                <div className="md:col-span-5 space-y-4">
                  <div className="rounded-[1.8rem] overflow-hidden aspect-[3/4] shadow-sm border border-[#E5DACE]">
                    <img
                      src={activeDrink.image}
                      alt={activeDrink.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="bg-[#F5F1EB] p-4 rounded-2xl border border-[#E5DACE]/60 text-center">
                    <span className="text-[9px] font-mono uppercase text-coffee-400 tracking-wider font-bold block">Artisan Sourcing</span>
                    <span className="text-xs font-bold text-coffee-950 block mt-1">{activeDrink.origin}</span>
                  </div>
                </div>

                {/* Details side */}
                <div className="md:col-span-7 space-y-6">
                  <div>
                    <h3 className="text-3xl font-display font-bold text-coffee-950 flex items-center gap-2">
                      {activeDrink.name}
                      <span className="text-amber-500 text-sm flex"><Star className="w-4 h-4 fill-current" /></span>
                    </h3>
                    <p className="text-xs text-[#A67C52] font-mono mt-1 uppercase tracking-wider font-bold">₹{activeDrink.price} • Hand-Crafted Brew</p>
                  </div>

                  <p className="text-xs sm:text-sm text-coffee-800 leading-relaxed font-sans">
                    {activeDrink.story}
                  </p>

                  {/* Brew Technique & notes */}
                  <div className="space-y-4 pt-4 border-t border-[#F5F1EB]">
                    <div className="space-y-1">
                      <span className="flex items-center gap-1 text-[9px] font-mono uppercase text-[#A67C52] tracking-widest font-bold">
                        <Compass className="w-3.5 h-3.5" /> Extraction Technique
                      </span>
                      <p className="text-xs text-coffee-800 font-sans">
                        {activeDrink.technique}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <span className="flex items-center gap-1 text-[9px] font-mono uppercase text-[#A67C52] tracking-widest font-bold">
                        <Feather className="w-3.5 h-3.5" /> Tasting Notes
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {activeDrink.notes.map((note, idx) => (
                          <span key={idx} className="bg-[#F5F1EB] text-coffee-800 text-[10px] font-semibold px-3 py-1 rounded-full">
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Slider stats */}
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[9px] font-mono text-coffee-500 uppercase font-bold">
                        <span>Sweetness</span>
                        <span>{activeDrink.sweetness}/5</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#F5F1EB] rounded-full overflow-hidden border border-[#E5DACE]/40">
                        <div
                          className="h-full bg-amber-500 rounded-full transition-all duration-500"
                          style={{ width: `${(activeDrink.sweetness / 5) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[9px] font-mono text-coffee-500 uppercase font-bold">
                        <span>Caffeine Strength</span>
                        <span>{activeDrink.strength}/5</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#F5F1EB] rounded-full overflow-hidden border border-[#E5DACE]/40">
                        <div
                          className="h-full bg-[#4A3728] rounded-full transition-all duration-500"
                          style={{ width: `${(activeDrink.strength / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
