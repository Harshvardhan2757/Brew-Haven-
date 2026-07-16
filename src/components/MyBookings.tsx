import { motion } from 'motion/react';
import { X, Calendar, MapPin, Users, Ticket, Trash2, ShieldAlert, Sparkles } from 'lucide-react';
import { Booking } from '../types';

interface MyBookingsProps {
  bookings: Booking[];
  onClose: () => void;
  onCancelBooking: (id: string) => void;
}

export default function MyBookings({ bookings, onClose, onCancelBooking }: MyBookingsProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Overlay Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-coffee-950/80 backdrop-blur-sm"
      />

      {/* Bookings Modal Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.3 }}
        className="bg-[#FDFBF7] rounded-[2.5rem] overflow-hidden shadow-2xl border border-[#E5DACE] max-w-2xl w-full relative z-10 max-h-[85vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-6 bg-[#4A3728] text-cream-50 border-b border-[#2D1F15] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-[#A67C52]" />
            <div>
              <h3 className="font-display font-bold text-xl leading-tight text-white">My Reserved Stations</h3>
              <p className="text-[9px] text-cream-200/60 font-mono tracking-widest uppercase">Brew Haven Pune</p>
            </div>
          </div>
          <button
            onClick={onClose}
            id="my_bookings_close_btn"
            className="text-cream-200 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {bookings.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 bg-[#F5F1EB] rounded-[1.5rem] flex items-center justify-center text-coffee-300 mx-auto border border-[#E5DACE]/60 shadow-inner">
                <Ticket className="w-8 h-8 text-[#A67C52]" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display font-bold text-coffee-950 text-base">No Bookings Found</h4>
                <p className="text-xs text-coffee-500 max-w-xs mx-auto leading-relaxed">
                  You haven't reserved any workstations or tables yet. Book a space to unlock exclusive perks!
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-[2rem] border border-[#E5DACE] overflow-hidden shadow-sm flex flex-col md:grid md:grid-cols-12 relative group"
                >
                  
                  {/* Left Ticket Stub */}
                  <div className="md:col-span-8 p-6 space-y-4 flex flex-col justify-between">
                    {/* Header stub */}
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          Active Reservation
                        </span>
                        <h4 className="font-display font-bold text-lg text-coffee-950 mt-2">
                          {booking.name}
                        </h4>
                        <p className="text-[10px] font-mono text-coffee-500 mt-0.5">Booking Ref: {booking.id}</p>
                      </div>

                      {/* Ticket Cutout decorative */}
                      <div className="hidden md:block absolute top-1/2 -translate-y-1/2 right-[33.33%] w-6 h-6 bg-[#FDFBF7] border-l border-[#E5DACE] rounded-full -mr-3" />
                    </div>

                    {/* Details grid */}
                    <div className="grid grid-cols-3 gap-2.5 text-xs text-coffee-800 pt-3 border-t border-[#F5F1EB]">
                      <div className="space-y-1">
                        <span className="text-[9px] uppercase font-mono text-coffee-400 font-bold block">Party Size</span>
                        <div className="flex items-center gap-1 font-semibold text-coffee-950">
                          <Users className="w-3.5 h-3.5 text-[#A67C52]" />
                          <span>{booking.guests} Pax</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[9px] uppercase font-mono text-coffee-400 font-bold block">Seating</span>
                        <div className="flex items-center gap-1 font-semibold text-coffee-950 capitalize truncate">
                          <MapPin className="w-3.5 h-3.5 text-[#A67C52]" />
                          <span>{booking.seating.replace('-', ' ')}</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[9px] uppercase font-mono text-coffee-400 font-bold block">Date & Time</span>
                        <div className="flex items-center gap-1 font-semibold text-coffee-950">
                          <Calendar className="w-3.5 h-3.5 text-[#A67C52]" />
                          <span className="truncate">{booking.time}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-[10px] text-coffee-500 font-mono leading-relaxed bg-[#F5F1EB] p-2.5 rounded-xl border border-[#E5DACE]/40">
                      <span className="font-bold">Scheduled on:</span> {new Date(booking.date).toLocaleDateString('en-IN', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                      {booking.notes && (
                        <p className="mt-1 text-coffee-750 italic font-sans">"{booking.notes}"</p>
                      )}
                    </div>
                  </div>

                  {/* Divider line for print-like ticket */}
                  <div className="hidden md:block col-span-1 border-r border-dashed border-[#E5DACE] relative">
                    <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#FDFBF7] rounded-full border-b border-[#E5DACE]" />
                    <div className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#FDFBF7] rounded-full border-t border-[#E5DACE]" />
                  </div>

                  {/* Right QR Stub */}
                  <div className="md:col-span-3 bg-[#FDFBF7] p-6 flex flex-col items-center justify-between border-t md:border-t-0 border-[#E5DACE]/50">
                    <div className="text-center space-y-1">
                      <span className="text-[9px] uppercase font-mono text-coffee-400 font-bold block">Seat Ticket</span>
                      <span className="font-display font-bold text-coffee-800 text-sm">{booking.id}</span>
                    </div>

                    {/* Styled Mock QR Code */}
                    <div className="w-24 h-24 bg-white p-2 rounded-2xl border border-[#E5DACE] shadow-inner flex flex-col justify-between my-4 relative group-hover:scale-105 transition-transform duration-300">
                      {/* Grid QR representation */}
                      <div className="grid grid-cols-4 gap-1 w-full h-full opacity-90">
                        {[...Array(16)].map((_, idx) => {
                          const fill = (idx * 7) % 5 === 0 || (idx + 3) % 4 === 0 || idx === 0 || idx === 3 || idx === 12 || idx === 15;
                          return (
                            <div
                              key={idx}
                              className={`rounded-sm transition-colors duration-500 ${
                                fill ? 'bg-[#4A3728]' : 'bg-transparent'
                              }`}
                            />
                          );
                        })}
                      </div>
                    </div>

                    {/* Cancel Action */}
                    <button
                      onClick={() => onCancelBooking(booking.id)}
                      id={`cancel_booking_btn_${booking.id}`}
                      className="text-[10px] text-red-600 font-bold flex items-center gap-1.5 hover:text-white hover:bg-red-600 py-2 px-3 rounded-full border border-red-100 hover:border-transparent transition-all duration-200 cursor-pointer w-full justify-center"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Cancel Booking</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer info banner */}
        {bookings.length > 0 && (
          <div className="p-4 bg-white border-t border-[#E5DACE] flex items-center gap-2.5 text-xs text-coffee-700/80 justify-center">
            <ShieldAlert className="w-4 h-4 text-amber-500" />
            <span>Need to change plans? Cancel above and re-book. Cancellations are free.</span>
          </div>
        )}
      </motion.div>
    </div>
  );
}
