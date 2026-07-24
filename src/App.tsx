import { supabase } from "./lib/supabase";
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Sparkles, Calendar, Check, AlertCircle, Bookmark } from 'lucide-react';
import { Booking } from './types';
import { loadStoredBookings, saveStoredBookings } from './lib/bookings';

// Import components
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import FeaturedMenu from './components/FeaturedMenu';
import SignatureDrinks from './components/SignatureDrinks';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import BookingForm from './components/BookingForm';
import MyBookings from './components/MyBookings';
import Contact from './components/Contact';
import WhatsAppButton from './components/WhatsAppButton';
import Footer from './components/Footer';

export default function App() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [prefilledGuests, setPrefilledGuests] = useState(2);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'info'; text: string } | null>(null);

  // Initialize and load bookings from local storage
  useEffect(() => {
    const storedBookings = loadStoredBookings();
    setBookings(storedBookings);
  }, []);

  // Save bookings to local storage when state changes
  const saveBookingsToStorage = (updatedList: Booking[]) => {
    saveStoredBookings(updatedList);
  };

  const handleBookingSuccess = (newBooking: Booking) => {
    const updated = [newBooking, ...bookings];
    setBookings(updated);
    saveBookingsToStorage(updated);

    // Show a beautiful success toast
    setToastMessage({
      type: 'success',
      text: `Seat secured! Ticket ${newBooking.id} has been issued successfully.`,
    });

    // Auto open "My Bookings" manager after 1.2s to showcase their ticket & QR
    setTimeout(() => {
      setIsMyBookingsOpen(true);
    }, 1200);
  };

  const handleCancelBooking = (bookingId: string) => {
    const updated = bookings.filter((b) => b.id !== bookingId);
    setBookings(updated);
    saveBookingsToStorage(updated);

    // Show cancellation confirmation toast
    setToastMessage({
      type: 'info',
      text: `Reservation ${bookingId} has been successfully cancelled.`,
    });
  };

  // Smooth scroll handler
  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 90; // account for sticky header
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Callback when booking is clicked from header or hero
  const handleOpenBookingForm = (guestsCount = 2) => {
    setPrefilledGuests(guestsCount);
    handleScrollToSection('booking-section');

    // Show brief guidance toast
    setToastMessage({
      type: 'info',
      text: `Let's reserve a space for ${guestsCount} ${guestsCount === 1 ? 'person' : 'people'}!`,
    });
  };

  // Auto-clear toast message after 4.5 seconds
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  return (
    <div className="min-h-screen bg-cream-50 text-coffee-950 flex flex-col justify-between selection:bg-coffee-200 selection:text-coffee-900 overflow-x-hidden antialiased">
      {/* Dynamic Toast Notifications */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm"
          >
            <div className="bg-coffee-950/95 backdrop-blur-md text-cream-50 px-5 py-4 rounded-2xl shadow-2xl border border-coffee-800 flex items-start gap-3">
              {toastMessage.type === 'success' ? (
                <div className="bg-emerald-500 text-white p-1 rounded-lg flex-shrink-0">
                  <Check className="w-4 h-4" />
                </div>
              ) : (
                <div className="bg-amber-500 text-coffee-950 p-1 rounded-lg flex-shrink-0">
                  <AlertCircle className="w-4 h-4" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <span className="block text-xs font-mono text-coffee-400 font-bold uppercase tracking-wider leading-none">
                  Notification
                </span>
                <p className="text-xs text-cream-100 font-sans mt-1 leading-relaxed">
                  {toastMessage.text}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Header */}
      <Header
        activeBookingsCount={bookings.length}
        onOpenBookings={() => setIsMyBookingsOpen(true)}
        onOpenBookingForm={() => handleOpenBookingForm(2)}
        onScrollToSection={handleScrollToSection}
      />

      {/* Main Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onOpenBookingForm={handleOpenBookingForm}
          onScrollToSection={handleScrollToSection}
        />

        {/* 2. About Section */}
        <About />

        {/* 3. Featured Menu */}
        <FeaturedMenu onOpenBookingForm={() => handleOpenBookingForm(2)} />

        {/* 4. Signature Drinks */}
        <SignatureDrinks />

        {/* 5. Testimonials */}
        <Testimonials />

        {/* 6. Image Gallery */}
        <Gallery />

        {/* 7. Dedicated Booking Section (Primary goal: increase bookings) */}
        <section id="booking-section" className="py-24 bg-cream-100 relative border-t border-b border-cream-200/50">
          {/* Decorative design details */}
          <div className="absolute top-10 left-10 text-coffee-300 opacity-20 select-none pointer-events-none">
            <Bookmark className="w-20 h-20 rotate-12" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              
              {/* Copy Promo Column */}
              <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
                <span className="text-coffee-600 font-mono text-xs font-bold uppercase tracking-widest block">
                  Secure Your Seating
                </span>
                
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-coffee-950">
                  Book a Table & <br className="hidden sm:inline" />
                  <span className="font-serif italic text-coffee-700">Unlock Premium Perks</span>
                </h2>
                
                <p className="text-sm sm:text-base text-coffee-800/80 leading-relaxed font-sans">
                  Unlike conventional coffee shops where you hunt for power sockets, reserving with Brew Haven ensures a dedicated ergonomic station equipped with international adapter ports and high-speed Wi-Fi, completely free.
                </p>

                {/* Bullets highlighting why they should book */}
                <div className="space-y-3 pt-4 text-left max-w-sm mx-auto lg:mx-0">
                  <div className="flex gap-2.5 items-start">
                    <div className="bg-coffee-200 text-coffee-800 p-1 rounded-md flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs text-coffee-950 font-medium font-sans">Priority gigabit Wi-Fi vouchers on arrival</span>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <div className="bg-coffee-200 text-coffee-800 p-1 rounded-md flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs text-coffee-950 font-medium font-sans">Charging points at every seat (universal adapters)</span>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <div className="bg-coffee-200 text-coffee-800 p-1 rounded-md flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs text-coffee-950 font-medium font-sans">Free cancellations up to 30 minutes in advance</span>
                  </div>
                </div>
              </div>

              {/* Interactive Booking Wizard Column */}
              <div className="lg:col-span-7">
                <BookingForm
                  initialGuestsPrefilled={prefilledGuests}
                  onBookingSuccess={handleBookingSuccess}
                />
              </div>

            </div>
          </div>
        </section>

        {/* 8. Contact Form, Hours & Map */}
        <Contact />
      </main>

      {/* Floating WhatsApp Chatbot Button */}
      <WhatsAppButton />

      {/* Footer Details */}
      <Footer onScrollToSection={handleScrollToSection} />

      {/* Bookings Modal Overlay */}
      <AnimatePresence>
        {isMyBookingsOpen && (
          <MyBookings
            bookings={bookings}
            onClose={() => setIsMyBookingsOpen(false)}
            onCancelBooking={handleCancelBooking}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
