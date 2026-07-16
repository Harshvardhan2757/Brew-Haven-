import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coffee, Menu, X, CalendarCheck, Clock, Phone } from 'lucide-react';

interface HeaderProps {
  activeBookingsCount: number;
  onOpenBookings: () => void;
  onOpenBookingForm: () => void;
  onScrollToSection: (id: string) => void;
}

export default function Header({
  activeBookingsCount,
  onOpenBookings,
  onOpenBookingForm,
  onScrollToSection,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Menu', id: 'menu' },
    { label: 'Signatures', id: 'signatures' },
    { label: 'Reviews', id: 'reviews' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Find Us', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Simple active section detection
      const scrollPosition = window.scrollY + 120;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onScrollToSection(id);
  };

  return (
    <>
      {/* Top Banner with info */}
      <div className="bg-coffee-950 text-cream-100/80 text-xs py-2 px-4 transition-all duration-300 border-b border-coffee-900/30 font-sans">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-coffee-400" />
              <span>Mon - Sun: 8:00 AM - 11:00 PM</span>
            </span>
            <span className="hidden md:flex items-center gap-1">
              <Phone className="w-3 h-3 text-coffee-400" />
              <span>+91 98765 43210</span>
            </span>
          </div>
          <div>
            <span className="text-coffee-300 font-medium">Located on FC Road, Pune</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-cream-50/90 backdrop-blur-md shadow-md border-b border-cream-200/50 py-3'
            : 'bg-cream-50 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('hero')}
              className="flex items-center gap-2.5 group cursor-pointer text-left focus:outline-none"
              id="header_logo_btn"
            >
              <div className="w-9 h-9 bg-coffee-600 text-cream-50 rounded-full flex items-center justify-center group-hover:bg-coffee-500 transition-colors duration-300">
                <div className="w-5 h-5 border-2 border-cream-50 rounded-full border-t-transparent rotate-45"></div>
              </div>
              <div>
                <span className="block font-display font-bold text-2xl tracking-tight text-coffee-650 leading-none">
                  Brew Haven
                </span>
                <span className="block font-sans text-[9px] text-coffee-400 uppercase tracking-[0.2em] mt-0.5 leading-none">
                  Pune's Sanctuary
                </span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  id={`nav_btn_${item.id}`}
                  className={`text-xs font-semibold uppercase tracking-widest transition-colors duration-200 cursor-pointer hover:text-coffee-400 relative py-1 ${
                    activeSection === item.id ? 'text-coffee-600' : 'text-coffee-600/70'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-coffee-400 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* Header Actions */}
            <div className="hidden sm:flex items-center gap-4">
              {activeBookingsCount > 0 && (
                <button
                  onClick={onOpenBookings}
                  id="header_my_bookings_btn"
                  className="flex items-center gap-2 bg-coffee-100 hover:bg-coffee-200 text-coffee-700 text-xs font-semibold py-2 px-4 rounded-full transition-all duration-200 relative group"
                >
                  <CalendarCheck className="w-4 h-4 text-coffee-700" />
                  <span>My Bookings</span>
                  <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-cream-50 animate-pulse">
                    {activeBookingsCount}
                  </span>
                </button>
              )}

              <button
                onClick={onOpenBookingForm}
                id="header_book_btn"
                className="bg-coffee-600 hover:bg-coffee-500 text-cream-50 text-xs uppercase tracking-wider font-semibold py-2.5 px-6 rounded-full shadow-sm transition-all duration-200 hover:-translate-y-0.5"
              >
                Book a Table
              </button>
            </div>

            {/* Mobile Actions Right */}
            <div className="flex items-center gap-2 lg:hidden">
              {activeBookingsCount > 0 && (
                <button
                  onClick={onOpenBookings}
                  id="header_mobile_bookings_btn"
                  className="relative p-2 text-coffee-800 hover:bg-coffee-100 rounded-xl"
                  aria-label="My Bookings"
                >
                  <CalendarCheck className="w-5 h-5" />
                  <span className="absolute top-0 right-0 bg-red-500 text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center border border-cream-50">
                    {activeBookingsCount}
                  </span>
                </button>
              )}

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                id="header_hamburger_btn"
                className="p-2 text-coffee-800 hover:bg-coffee-100 rounded-xl focus:outline-none"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-cream-200/50 bg-cream-50 overflow-hidden"
            >
              <div className="px-4 pt-3 pb-6 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    id={`mobile_nav_btn_${item.id}`}
                    className={`block w-full text-left px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                      activeSection === item.id
                        ? 'bg-coffee-100 text-coffee-900 font-semibold'
                        : 'text-coffee-800/80 hover:bg-cream-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="pt-4 border-t border-cream-200/50 flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenBookingForm();
                    }}
                    id="mobile_nav_book_btn"
                    className="w-full text-center bg-coffee-800 hover:bg-coffee-700 text-cream-50 font-semibold py-3 px-4 rounded-xl transition-colors shadow-sm"
                  >
                    Book a Table
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
