import emailjs from "@emailjs/browser";
import { EMAILJS } from "../lib/emailjs";
import { persistBooking } from "../lib/bookings";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Users, Clock, MapPin, User, Mail, Phone, ChevronRight, ChevronLeft, Check, Sparkles, X, Info } from 'lucide-react';
import { Booking, SeatingPreference } from '../types';

interface BookingFormProps {
  initialGuestsPrefilled?: number;
  onBookingSuccess: (booking: Booking) => void;
  onClose?: () => void;
}

export default function BookingForm({
  initialGuestsPrefilled = 2,
  onBookingSuccess,
  onClose,
}: BookingFormProps) {
  const [step, setStep] = useState(1);
  const [guests, setGuests] = useState(initialGuestsPrefilled);
  const [seating, setSeating] = useState<SeatingPreference>('standard');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sync prefilled guests when props change
  useEffect(() => {
    if (initialGuestsPrefilled) {
      setGuests(initialGuestsPrefilled);
    }
  }, [initialGuestsPrefilled]);

  const seatingOptions: { id: SeatingPreference; label: string; description: string; highlights: string[] }[] = [
    {
      id: '☕Standard',
      label: '☕Standard Seating',
      description: 'Comfortable standard table in our main dining hall. Great for dining and quick discussions.',
      highlights: ['Cozy Atmosphere', 'Quick Service', 'Accessible'],
    },
    {
      id: '🪟Window Workspace',
      label: '🪟Window Workspace',
      description: 'Solo desk spaces looking out over FC Road. Outlets built directly into the teakwood table.',
      highlights: ['Gigabit Wi-Fi Anchor', 'Dedicated USB & AC Ports', 'Ergonomic Task Stools'],
    },
    {
      id: '🌿Garden Patio',
      label: '🌿Sunlit Garden Patio',
      description: 'Lush open-air seating area surrounded by jasmine creepers. Dog-friendly and wonderfully breezy.',
      highlights: ['Fresh Air & Natural Light', 'Pet Friendly', 'Terracotta Planters'],
    },
    {
      id: '🛋️Couch Corner',
      label: '🛋️Couch Cozy Corner',
      description: 'Plush velvet sofas with a low coffee table. Excellent for reading, long conversations, and brainstorming.',
      highlights: ['Deep Sofas', 'Warm Lighting', 'Quiet Acoustic Zone'],
    },
  ];

  const timeSlots = [
    { value: '08:30 AM', status: 'available' },
    { value: '10:00 AM', status: 'available' },
    { value: '11:30 AM', status: 'popular' },
    { value: '01:00 PM', status: 'available' },
    { value: '02:30 PM', status: 'popular' },
    { value: '04:00 PM', status: 'available' },
    { value: '05:30 PM', status: 'popular' },
    { value: '07:00 PM', status: 'popular' },
    { value: '08:30 PM', status: 'available' },
    { value: '09:30 PM', status: 'available' },
  ];

  // Simple validation
  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!guests) errs.guests = 'Please specify number of guests';
    if (!seating) errs.seating = 'Please choose a seating preference';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!date) errs.date = 'Please pick a date';
    if (!time) errs.time = 'Please pick a time slot';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Full name is required';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) errs.email = 'Valid email is required';
    if (!phone.trim() || phone.length < 10) errs.phone = 'Valid phone number is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    if (step === 2 && validateStep2()) setStep(3);
  };

  const handleBack = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) {
      return;
    }

    const newBooking: Booking = {
      id: `BH-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      email,
      phone,
      date,
      time,
      guests,
      seating,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      notes: notes.trim() || undefined,
    };

    const saved = await persistBooking(newBooking);

    if (!saved) {
      alert("Failed to save booking.");
      return;
    }

    onBookingSuccess(newBooking);
    emailjs.send(
      EMAILJS.SERVICE_ID,
      EMAILJS.BOOKING_TEMPLATE,
      {
        to_email: email,
        name,
        email,
        booking_id: newBooking.id,
        date,
        time,
        guests,
        seating,
      },
      EMAILJS.PUBLIC_KEY
    )
      .then(() => {
        console.log("Confirmation email sent.");
      })
      .catch((err) => {
        console.error("EmailJS:", err);
      });

    // Reset form fields
    setStep(1);
    setName('');
    setEmail('');
    setPhone('');
    setNotes('');
    setDate('');
    setTime('');
  };

  // Get tomorrow's date for min attribute
  const getMinDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="bg-[#FDFBF7] rounded-[2.5rem] border border-[#E5DACE] p-6 sm:p-10 shadow-sm relative overflow-hidden" id="booking_form_wrapper">
      
      {/* Decorative Warm Back-glow */}
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#A67C52]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Progress Bar Indicator */}
      <div className="flex items-center justify-between gap-4 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex-1 flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                step >= s
                  ? 'bg-[#4A3728] text-cream-50 font-display'
                  : 'bg-[#F5F1EB] text-coffee-400 border border-[#E5DACE]/40'
              }`}
            >
              {s}
            </div>
            <div className="hidden sm:block text-[10px] font-mono text-coffee-500 uppercase tracking-wider font-bold">
              {s === 1 ? 'Vibe & Party' : s === 2 ? 'Date & Time' : 'Reserve Info'}
            </div>
            {s < 3 && <div className="h-0.5 flex-1 bg-[#F5F1EB]" />}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: Seating & Guests */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="space-y-2 text-center sm:text-left">
                <h3 className="text-2xl font-display font-bold text-coffee-950 flex items-center gap-2 justify-center sm:justify-start">
                  <Users className="w-5 h-5 text-[#A67C52]" />
                  Party Size & Atmosphere
                </h3>
                <p className="text-xs text-coffee-600 font-sans">
                  Choose your vibe and tell us how many people will be joining you.
                </p>
              </div>

              {/* Guest Count Selection */}
              <div className="space-y-3">
                <label className="block text-xs font-mono text-coffee-500 uppercase tracking-wider font-bold">
                  How many people?
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {[1, 2, 3, 4, 6, 8].map((g) => (
                    <button
                      type="button"
                      key={g}
                      onClick={() => setGuests(g)}
                      id={`guest_count_btn_${g}`}
                      className={`py-3 px-1 rounded-full font-bold font-display text-xs border cursor-pointer transition-all duration-200 ${
                        guests === g
                          ? 'bg-[#4A3728] text-white border-transparent shadow-sm'
                          : 'bg-white border-[#E5DACE] text-[#4A3728] hover:bg-[#F5F1EB]'
                      }`}
                    >
                      {g === 1 ? '1 Solo' : g === 8 ? '8+ Group' : `${g} Pax`}
                    </button>
                  ))}
                </div>
                {errors.guests && <p className="text-red-500 text-[10px]">{errors.guests}</p>}
              </div>

              {/* Seating Zone Preference */}
              <div className="space-y-3">
                <label className="block text-xs font-mono text-coffee-500 uppercase tracking-wider font-bold">
                  Select Seating Vibe
                </label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {seatingOptions.map((opt) => (
                    <button
                      type="button"
                      key={opt.id}
                      onClick={() => setSeating(opt.id)}
                      id={`seating_pref_btn_${opt.id}`}
                      className={`text-left p-4 rounded-[1.8rem] border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                        seating === opt.id
                          ? 'bg-[#4A3728] border-transparent text-white shadow-md'
                          : 'bg-white hover:bg-[#F5F1EB] border-[#E5DACE] text-coffee-950'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between w-full">
                          <span className="font-display font-bold text-sm tracking-tight">{opt.label}</span>
                          {seating === opt.id && <Check className="w-4 h-4 text-cream-200" />}
                        </div>
                        <p className={`text-[10px] leading-relaxed mt-1 font-sans ${seating === opt.id ? 'text-cream-200/85' : 'text-coffee-600'}`}>
                          {opt.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-3">
                        {opt.highlights.map((hl, i) => (
                          <span
                            key={i}
                            className={`text-[8px] font-semibold px-2 py-0.5 rounded-md ${
                              seating === opt.id
                                ? 'bg-[#5D4636] text-cream-100'
                                : 'bg-[#F5F1EB] text-coffee-700'
                            }`}
                          >
                            {hl}
                          </span>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
                {errors.seating && <p className="text-red-500 text-[10px]">{errors.seating}</p>}
              </div>

              {/* Navigation button */}
              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={handleNext}
                  id="booking_step1_next"
                  className="bg-[#4A3728] hover:bg-[#5D4636] text-white font-bold uppercase tracking-widest py-3.5 px-6 rounded-full text-xs flex items-center gap-2 cursor-pointer transition-colors"
                >
                  Choose Date & Time <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Date & Time Picker */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="space-y-2 text-center sm:text-left">
                <h3 className="text-2xl font-display font-bold text-coffee-950 flex items-center gap-2 justify-center sm:justify-start">
                  <Calendar className="w-5 h-5 text-[#A67C52]" />
                  Select Date & Session
                </h3>
                <p className="text-xs text-coffee-600 font-sans">
                  Pick your date and choose an available booking time.
                </p>
              </div>

              {/* Date Input */}
              <div className="space-y-3">
                <label htmlFor="booking_date" className="block text-xs font-mono text-coffee-500 uppercase tracking-wider font-bold">
                  Select Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="booking_date"
                    value={date}
                    min={getMinDateString()}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-white border border-[#E5DACE] rounded-full py-3 px-5 text-xs font-display focus:ring-1 focus:ring-coffee-500 focus:outline-none text-coffee-900"
                  />
                </div>
                {errors.date && <p className="text-red-500 text-[10px]">{errors.date}</p>}
              </div>

              {/* Time Slots Grid */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-mono text-coffee-500 uppercase tracking-wider font-bold">
                    Select Available Session
                  </label>
                  <span className="text-[10px] font-semibold text-amber-600 flex items-center gap-1">
                    <Info className="w-3 h-3" /> Peak times fill quickly
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      type="button"
                      key={slot.value}
                      onClick={() => setTime(slot.value)}
                      id={`time_slot_btn_${slot.value.replace(' ', '_')}`}
                      className={`py-3 px-1.5 rounded-full border font-bold text-xs cursor-pointer flex flex-col items-center justify-center transition-all duration-200 relative ${
                        time === slot.value
                          ? 'bg-[#4A3728] text-white border-transparent shadow-sm'
                          : 'bg-white border-[#E5DACE] text-[#4A3728] hover:bg-[#F5F1EB]'
                      }`}
                    >
                      <span className="font-display">{slot.value}</span>
                      {slot.status === 'popular' && (
                        <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-md mt-1 ${
                          time === slot.value ? 'bg-[#5D4636] text-amber-300' : 'bg-amber-100 text-amber-800'
                        }`}>
                          Popular
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                {errors.time && <p className="text-red-500 text-[10px]">{errors.time}</p>}
              </div>

              {/* Step Navigation */}
              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={handleBack}
                  id="booking_step2_back"
                  className="border border-[#E5DACE] bg-white hover:bg-[#F5F1EB] text-coffee-800 font-bold uppercase tracking-widest py-3.5 px-6 rounded-full text-xs flex items-center gap-2 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  id="booking_step2_next"
                  className="bg-[#4A3728] hover:bg-[#5D4636] text-white font-bold uppercase tracking-widest py-3.5 px-6 rounded-full text-xs flex items-center gap-2 cursor-pointer transition-colors"
                >
                  Enter Contact Details <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Customer Details Form */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="space-y-2 text-center sm:text-left">
                <h3 className="text-2xl font-display font-bold text-coffee-950 flex items-center gap-2 justify-center sm:justify-start">
                  <User className="w-5 h-5 text-[#A67C52]" />
                  Your Information
                </h3>
                <p className="text-xs text-coffee-600 font-sans">
                  Secure your table with your contact details. No charges or prepayment required.
                </p>
              </div>

              {/* Info summary */}
              <div className="bg-[#F5F1EB] p-4 rounded-[1.5rem] border border-[#E5DACE]/60 flex flex-wrap gap-4 items-center justify-between text-xs text-coffee-800">
                <div className="flex items-center gap-1.5 font-medium">
                  <Users className="w-4 h-4 text-[#A67C52]" />
                  <span>{guests} Pax</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <MapPin className="w-4 h-4 text-[#A67C52]" />
                  <span className="capitalize">{seating.replace('-', ' ')}</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-4 h-4 text-[#A67C52]" />
                  <span>{date} • {time}</span>
                </div>
              </div>

              {/* Name field */}
              <div className="space-y-2">
                <label htmlFor="customer_name" className="block text-xs font-mono text-coffee-500 uppercase tracking-wider font-bold">
                  Your Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-coffee-400" />
                  <input
                    type="text"
                    id="customer_name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.g., Harsh Vardhan"
                    className="w-full bg-white border border-[#E5DACE] rounded-full py-3.5 pl-11 pr-4 text-xs font-display focus:ring-1 focus:ring-[#A67C52] focus:outline-none text-coffee-900 placeholder-coffee-400"
                  />
                </div>
                {errors.name && <p className="text-red-500 text-[10px]">{errors.name}</p>}
              </div>

              {/* Email and Phone Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="customer_email" className="block text-xs font-mono text-coffee-500 uppercase tracking-wider font-bold">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-coffee-400" />
                    <input
                      type="email"
                      id="customer_email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="harsh@example.com"
                      className="w-full bg-white border border-[#E5DACE] rounded-full py-3.5 pl-11 pr-4 text-xs font-display focus:ring-1 focus:ring-[#A67C52] focus:outline-none text-coffee-900 placeholder-coffee-400"
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-[10px]">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="customer_phone" className="block text-xs font-mono text-coffee-500 uppercase tracking-wider font-bold">
                    WhatsApp Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-coffee-400" />
                    <input
                      type="tel"
                      id="customer_phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="E.g., +91 98765 43210"
                      className="w-full bg-white border border-[#E5DACE] rounded-full py-3.5 pl-11 pr-4 text-xs font-display focus:ring-1 focus:ring-[#A67C52] focus:outline-none text-coffee-900 placeholder-coffee-400"
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-[10px]">{errors.phone}</p>}
                </div>
              </div>

              {/* Custom notes (laptop / meeting details etc) */}
              <div className="space-y-2">
                <label htmlFor="customer_notes" className="block text-xs font-mono text-coffee-500 uppercase tracking-wider font-bold">
                  Any Special Requirements? (Optional)
                </label>
                <textarea
                  id="customer_notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="E.g., Need power sockets for two laptops, holding a portfolio discussion..."
                  rows={2}
                  className="w-full bg-white border border-[#E5DACE] rounded-[1.2rem] py-3 px-4 text-xs font-sans focus:ring-1 focus:ring-[#A67C52] focus:outline-none text-coffee-900 placeholder-coffee-400 resize-none"
                />
              </div>

              {/* Consent alert */}
              <p className="text-[10px] text-coffee-400 leading-relaxed font-sans text-center">
                By reserving, a booking confirmation ticket will be saved locally. We will also shoot a mock confirmation over to your WhatsApp.
              </p>

              {/* Step Navigation */}
              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={handleBack}
                  id="booking_step3_back"
                  className="border border-[#E5DACE] bg-white hover:bg-[#F5F1EB] text-coffee-800 font-bold uppercase tracking-widest py-3.5 px-6 rounded-full text-xs flex items-center gap-2 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                
                <button
                  type="submit"
                  id="booking_submit_btn"
                  className="bg-[#4A3728] hover:bg-[#5D4636] text-white font-bold uppercase tracking-widest py-3.5 px-8 rounded-full text-xs flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  Confirm Table Booking <Check className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </form>

    </div>
  );
}
