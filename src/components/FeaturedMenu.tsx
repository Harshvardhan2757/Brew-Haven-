import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Sparkles, Coffee, Utensils, Zap, Filter } from 'lucide-react';
import { MenuItem } from '../types';

interface FeaturedMenuProps {
  onOpenBookingForm: () => void;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'punekari-cold-brew',
    name: 'Punekari Lemongrass Cold Brew',
    price: 210,
    description: 'Our signature slow-steeped 18-hour cold brew, delicately infused with local fresh lemongrass and capped with sweet dairy-free cream.',
    category: 'signatures',
    tags: ['Cold', 'Dairy-Free Available', 'Signature'],
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=400&h=400',
    isVeg: true,
    isHighlyRecommended: true,
    flavorProfile: 'Citrusy, Smooth, Herbaceous'
  },
  {
    id: 'camp-rose-latte',
    name: 'Camp Rose Sweet Latte',
    price: 230,
    description: 'Rich espresso pulled over thick sweet condensed milk and premium organic damask rose water, paying homage to Pune’s historic Camp bakeries.',
    category: 'signatures',
    tags: ['Hot', 'Sweet', 'Floral'],
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=400&h=400',
    isVeg: true,
    isHighlyRecommended: true,
    flavorProfile: 'Floral, Luxurious, Comforting'
  },
  {
    id: 'belgian-choc-mocha',
    name: 'Belgian Truffle Mocha',
    price: 245,
    description: 'Double shot espresso combined with warm melted Belgian dark chocolate ganache, micro-foamed milk, and dusted with organic cocoa.',
    category: 'signatures',
    tags: ['Hot', 'Chocolate', 'Rich'],
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=400&h=400',
    isVeg: true,
    flavorProfile: 'Bittersweet, Chocolaty, Decadent'
  },
  {
    id: 'classic-pour-over',
    name: 'Single-Origin Pour Over',
    price: 180,
    description: 'Ethically sourced Araku Valley organic beans (100% Arabica), hand-brewed over V60 to unlock exquisite notes of stone fruit and caramel.',
    category: 'espresso',
    tags: ['Hot', 'Black Coffee', 'Organic'],
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=400&h=400',
    isVeg: true,
    flavorProfile: 'Fruity, Caramel undertone, Clean finish'
  },
  {
    id: 'cardamom-hazelnut-flat',
    name: 'Cardamom & Hazelnut Flat White',
    price: 210,
    description: 'Silky micro-foamed milk folded over double espresso infused with home-crushed green cardamom seeds and toasted hazelnut syrup.',
    category: 'espresso',
    tags: ['Hot', 'Spiced', 'Nutty'],
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=400&h=400',
    isVeg: true,
    isHighlyRecommended: true,
    flavorProfile: 'Warmly Spiced, Earthy, Sweet'
  },
  {
    id: 'pomegranate-shakerato',
    name: 'Pomegranate Mint Shakerato',
    price: 190,
    description: 'Double espresso shaken intensely over ice with fresh organic pomegranate reduction and smashed garden mint. Served in a chilled coupe.',
    category: 'refreshers',
    tags: ['Cold', 'Fruity', 'Shaken'],
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=400&h=400',
    isVeg: true,
    flavorProfile: 'Sweet-Tart, Refreshing, Fizzy'
  },
  {
    id: 'matcha-lavender-iced',
    name: 'Matcha Lavender Velvet Latte',
    price: 240,
    description: 'Premium ceremonial Japanese Uji matcha whisked with oat milk and our house lavender infusion, served over solid crystal ice blocks.',
    category: 'refreshers',
    tags: ['Cold', 'Vegan', 'Calming'],
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=400&h=400',
    isVeg: true,
    isHighlyRecommended: true,
    flavorProfile: 'Earthy, Floral, Velvety'
  },
  {
    id: 'pune-misal-croissant',
    name: 'The Pune Misal Sourdough Croissant',
    price: 190,
    description: 'An audacious and flaky croissant filled with a rich, spiced sprouts reduction, and finished with a scattering of premium spicy farsan.',
    category: 'eats',
    tags: ['Warm', 'Fusion', 'Savory'],
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=400&h=400',
    isVeg: true,
    isHighlyRecommended: true,
    flavorProfile: 'Flaky, Mildly Spicy, Tangy Savory'
  },
  {
    id: 'avocado-feta-toast',
    name: 'Avocado & Local Pune Feta Sourdough',
    price: 260,
    description: 'Crispy local Pune sourdough toast topped with garlic-rubbed mashed avocado, crumbled Pune dairy feta, cherry tomatoes, and microgreens.',
    category: 'eats',
    tags: ['Fresh', 'Healthy', 'Sourdough'],
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=400&h=400',
    isVeg: true,
    flavorProfile: 'Creamy, Garlicky, Salty Zest'
  },
  {
    id: 'skillet-cookie-gelato',
    name: 'Warm Cast-Iron Skillet Cookie',
    price: 210,
    description: 'A decadent giant chocolate chip cookie baked fresh in a cast-iron skillet, topped with premium Pune artisanal vanilla bean gelato.',
    category: 'eats',
    tags: ['Warm Dessert', 'Sweet', 'Creamy'],
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=400&h=400',
    isVeg: true,
    isHighlyRecommended: true,
    flavorProfile: 'Gooey, Melted Chocolate, Sweet'
  }
];

export default function FeaturedMenu({ onOpenBookingForm }: FeaturedMenuProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | MenuItem['category']>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Delights', icon: <Filter className="w-4 h-4" /> },
    { id: 'signatures', label: 'Signature Brews', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'espresso', label: 'Artisan Espresso', icon: <Coffee className="w-4 h-4" /> },
    { id: 'refreshers', label: 'Craft Refreshers', icon: <Zap className="w-4 h-4" /> },
    { id: 'eats', label: 'Cozy Eats & Bakery', icon: <Utensils className="w-4 h-4" /> },
  ];

  const filteredMenuItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.flavorProfile?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="menu" className="py-24 bg-cream-50 relative">
      {/* Decorative Warm Accent */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-coffee-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-coffee-600 font-mono text-xs font-bold uppercase tracking-widest block">
            Cozy Flavors & Crafted Cups
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-coffee-950">
            Explore the Brew Haven <span className="font-serif italic text-coffee-700">Menu</span>
          </h2>
          <p className="text-sm sm:text-base text-coffee-800/80 leading-relaxed font-sans">
            Every cup is dialed-in with fresh micro-lot coffees, and our food is cooked with high-quality local produce. Taste the perfect balance of global recipes and Pune-themed favorites.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10 bg-[#F5F1EB]/60 p-4 rounded-[2rem] border border-[#E5DACE] backdrop-blur-sm">
          {/* Categories Tab Bar */}
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                id={`menu_cat_tab_${cat.id}`}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold cursor-pointer transition-all duration-200 whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-[#4A3728] text-white shadow-sm'
                    : 'bg-white hover:bg-[#F5F1EB] text-[#4A3728]/80 border border-[#E5DACE]/60'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Search Field */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-coffee-400" />
            <input
              type="text"
              id="menu_search_input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search coffee, avocado, eats..."
              className="w-full bg-white border border-[#E5DACE] rounded-full py-2.5 pl-10 pr-4 text-xs focus:ring-1 focus:ring-coffee-500 focus:outline-none placeholder-coffee-400 text-coffee-950"
            />
          </div>
        </div>

        {/* Dynamic Menu Grid */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredMenuItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                className="bg-white rounded-[2rem] border border-[#E5DACE] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col h-full"
              >
                {/* Image & Tags Overlay */}
                <div className="relative aspect-[4/3] overflow-hidden bg-cream-50">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {item.isHighlyRecommended && (
                      <span className="bg-amber-500 text-white text-[9px] font-bold px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3 h-3 fill-current" /> Must Try
                      </span>
                    )}
                    {item.isVeg && (
                      <span className="bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-md shadow-sm uppercase tracking-wider flex items-center gap-1">
                        <span className="inline-block w-2 h-2 rounded-full border border-white bg-emerald-300" /> Veg
                      </span>
                    )}
                  </div>

                  {/* Price Badge Overlay */}
                  <div className="absolute bottom-3 right-3 bg-[#4A3728]/95 text-cream-50 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs font-bold font-mono shadow-sm">
                    ₹{item.price}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-coffee-950 text-xl group-hover:text-[#A67C52] transition-colors duration-200">
                      {item.name}
                    </h3>
                    <p className="text-xs text-coffee-800/80 leading-relaxed font-sans line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Flavor Profile & Tags */}
                  <div className="space-y-3 pt-3 border-t border-[#F5F1EB]">
                    {item.flavorProfile && (
                      <div className="text-[11px] text-coffee-700/85 font-medium">
                        <span className="text-coffee-400 font-mono text-[9px] uppercase tracking-wider block">Flavor Profile</span>
                        <span className="italic">"{item.flavorProfile}"</span>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((tag, i) => (
                        <span key={i} className="text-[9px] font-semibold bg-[#F5F1EB] text-coffee-700 px-2.5 py-1 rounded-md">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty Search State */}
        {filteredMenuItems.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[2rem] border border-[#E5DACE] shadow-sm max-w-lg mx-auto">
            <Coffee className="w-12 h-12 text-coffee-300 mx-auto mb-4 animate-bounce" />
            <h3 className="text-lg font-display font-bold text-coffee-950 mb-1">Mouth-Watering Item Not Found</h3>
            <p className="text-xs text-coffee-500 max-w-xs mx-auto">
              We couldn't find matches for "{searchQuery}". Try looking up "Cold Brew", "Sourdough" or "Croissant"!
            </p>
          </div>
        )}

        {/* Section CTA */}
        <div className="mt-16 bg-[#4A3728] text-cream-50 rounded-[2.5rem] p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6 border border-coffee-950/20 shadow-sm relative overflow-hidden">
          {/* Subtle background ring */}
          <div className="absolute top-1/2 right-0 w-80 h-80 bg-[#A67C52] rounded-full blur-3xl -z-10 opacity-30" />

          <div className="space-y-2">
            <h3 className="text-2xl font-display font-bold text-white">
              Working on a laptop? Secure a quiet table.
            </h3>
            <p className="text-xs sm:text-sm text-cream-100/70 max-w-2xl font-sans">
              Our workspace corners fill up fast with local freelancers and writers. We recommend booking a dedicated table to unlock priority gigabit Wi-Fi and power socket access.
            </p>
          </div>
          
          <button
            onClick={onOpenBookingForm}
            id="menu_footer_book_btn"
            className="flex-shrink-0 bg-white hover:bg-cream-100 text-[#4A3728] text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-full shadow-sm transition-colors whitespace-nowrap cursor-pointer duration-200"
          >
            Reserve Table Now
          </button>
        </div>

      </div>
    </section>
  );
}
