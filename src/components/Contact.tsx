import emailjs from "@emailjs/browser";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, CalendarDays } from 'lucide-react';
import { ContactMessage } from '../types';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Please provide your name';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) errs.email = 'Please provide a valid email';
    if (!subject.trim()) errs.subject = 'Please specify a subject';
    if (!message.trim()) errs.message = 'Please type a brief message';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      emailjs
  .send(
    "service_r6nhxnj",
    "template_yu8oexq",
    {
      name,
      email,
      subject,
      message,
    },
    "hBEa0EskGG3i29V_G"
  )
  .then(() => {
    console.log("Email sent!");
  })
  .catch((error) => {
    console.error("EmailJS Error:", error);
  });
      const newMessage: ContactMessage = {
        id: `MSG-${Math.floor(1000 + Math.random() * 9000)}`,
        name,
        email,
        subject,
        message,
        createdAt: new Date().toISOString(),
      };

      // Save messages in local storage for admin reference if ever needed
      try {
        const stored = localStorage.getItem('brew_haven_messages');
        const existing = stored ? JSON.parse(stored) : [];
        existing.push(newMessage);
        localStorage.setItem('brew_haven_messages', JSON.stringify(existing));
      } catch (err) {
        console.error('Error saving message to local storage', err);
      }

      setIsSubmitted(true);
      
      // Reset form fields
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }
  };

  return (
    <section id="contact" className="py-24 bg-cream-50 relative overflow-hidden">
      {/* Decorative Blur Blob */}
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-coffee-200/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-coffee-600 font-mono text-xs font-bold uppercase tracking-widest block">
            Visit & Contact
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-coffee-950">
            Come Hangout at <span className="font-serif italic text-coffee-700">Brew Haven</span>
          </h2>
          <p className="text-sm text-coffee-800/80 leading-relaxed font-sans">
            Have an event inquiry, workspace partnership request, or just want to ask about our beans? Drop us a line or walk right into our cozy Pune sanctuary.
          </p>
        </div>

        {/* Master Layout */}
        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Direct Info & Hours */}
          <div className="lg:col-span-4 space-y-6 flex flex-col justify-between">
            {/* Quick Contact Specs */}
            <div className="bg-[#FDFBF7] rounded-[2rem] border border-[#E5DACE] p-6 sm:p-8 shadow-sm space-y-6 flex-1 flex flex-col justify-center">
              <h3 className="font-display font-bold text-xl text-[#4A3728] border-b border-[#F5F1EB] pb-3">
                Contact Details
              </h3>
              
              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="bg-[#F5F1EB] p-2.5 rounded-full text-coffee-700 h-10 w-10 flex items-center justify-center border border-[#E5DACE]/60 flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#A67C52]" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-coffee-400 uppercase tracking-wider block font-bold">Our Location</span>
                    <p className="text-xs text-coffee-850 leading-relaxed font-sans">
                      1204/B, Fergusson College Road, Shivajinagar, Pune, Maharashtra 411004
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-[#F5F1EB] p-2.5 rounded-full text-coffee-700 h-10 w-10 flex items-center justify-center border border-[#E5DACE]/60 flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#A67C52]" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-coffee-400 uppercase tracking-wider block font-bold">Direct Email</span>
                    <p className="text-xs text-coffee-850 font-sans font-semibold">
                      hello@brewhaven.in
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-[#F5F1EB] p-2.5 rounded-full text-coffee-700 h-10 w-10 flex items-center justify-center border border-[#E5DACE]/60 flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#A67C52]" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-coffee-400 uppercase tracking-wider block font-bold">Call / WhatsApp</span>
                    <p className="text-xs text-coffee-850 font-sans font-semibold">
                      +91 98765 43210
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-[#4A3728] text-cream-50 rounded-[2rem] border border-transparent p-6 sm:p-8 shadow-sm space-y-6">
              <h3 className="font-display font-bold text-xl text-white border-b border-[#5D4636] pb-3 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#A67C52]" />
                Opening Hours
              </h3>

              <div className="space-y-3.5 text-xs text-cream-100/90 font-sans">
                <div className="flex justify-between items-center py-1 border-b border-[#5D4636]/60">
                  <span className="font-medium">Monday - Friday</span>
                  <span className="font-semibold text-cream-100">8:00 AM - 11:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#5D4636]/60">
                  <span className="font-medium">Saturday - Sunday</span>
                  <span className="font-semibold text-cream-100">8:00 AM - Midnight</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="font-medium">Happy Hour (Filter Brews)</span>
                  <span className="font-semibold text-cream-100">4:00 PM - 6:00 PM</span>
                </div>
              </div>

              <div className="bg-[#2D1F15] p-3 rounded-xl border border-[#5D4636]/40 text-[9px] text-cream-200/70 text-center font-mono">
                * Note: Food orders close 30 min before shut down.
              </div>
            </div>
          </div>

          {/* Middle Column: Google Maps Location */}
          <div className="lg:col-span-4 rounded-[2rem] overflow-hidden border border-[#E5DACE] shadow-sm relative min-h-[300px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d945.8131221371151!2d73.84090535214608!3d18.51748888209086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c07f4daa097f%3A0xce339b60765d5009!2sFerguson%20College%20Rd%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1784094744970!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '320px' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Location for Brew Haven Pune"
              className="absolute inset-0 w-full h-full object-cover grayscale brightness-95 contrast-105 hover:grayscale-0 transition-all duration-700"
            />
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-4 bg-[#FDFBF7] rounded-[2rem] border border-[#E5DACE] p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <h3 className="font-display font-bold text-xl text-[#4A3728] border-b border-[#F5F1EB] pb-3">
              Drop Us a Line
            </h3>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleFormSubmit}
                  className="space-y-4 mt-4"
                >
                  <div className="space-y-1">
                    <label htmlFor="contact_name" className="block text-[10px] font-mono text-coffee-500 uppercase tracking-wider font-bold">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="contact_name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="E.g., Harsh"
                      className="w-full bg-white border border-[#E5DACE] rounded-full py-2.5 px-4 text-xs font-display focus:ring-1 focus:ring-coffee-500 focus:outline-none text-coffee-900 placeholder-coffee-400"
                    />
                    {errors.name && <p className="text-red-500 text-[10px]">{errors.name}</p>}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="contact_email" className="block text-[10px] font-mono text-coffee-500 uppercase tracking-wider font-bold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="contact_email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="harsh@gmail.com"
                      className="w-full bg-white border border-[#E5DACE] rounded-full py-2.5 px-4 text-xs font-display focus:ring-1 focus:ring-coffee-500 focus:outline-none text-coffee-900 placeholder-coffee-400"
                    />
                    {errors.email && <p className="text-red-500 text-[10px]">{errors.email}</p>}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="contact_subject" className="block text-[10px] font-mono text-coffee-500 uppercase tracking-wider font-bold">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="contact_subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="E.g., Workspace Booking / Catering"
                      className="w-full bg-white border border-[#E5DACE] rounded-full py-2.5 px-4 text-xs font-display focus:ring-1 focus:ring-coffee-500 focus:outline-none text-coffee-900 placeholder-coffee-400"
                    />
                    {errors.subject && <p className="text-red-500 text-[10px]">{errors.subject}</p>}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="contact_message" className="block text-[10px] font-mono text-coffee-500 uppercase tracking-wider font-bold">
                      Message
                    </label>
                    <textarea
                      id="contact_message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your brief inquiry here..."
                      rows={3}
                      className="w-full bg-white border border-[#E5DACE] rounded-[1.2rem] py-3 px-4 text-xs font-sans focus:ring-1 focus:ring-coffee-500 focus:outline-none text-coffee-900 placeholder-coffee-400 resize-none"
                    />
                    {errors.message && <p className="text-red-500 text-[10px]">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    id="contact_submit_btn"
                    className="w-full bg-[#4A3728] hover:bg-[#5D4636] text-white font-bold uppercase tracking-widest py-3.5 px-4 rounded-full text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-colors"
                  >
                    Send Message <Send className="w-3.5 h-3.5" />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-10 space-y-4"
                >
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100 shadow-sm animate-pulse">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-coffee-950 text-base">Inquiry Dispatched!</h4>
                    <p className="text-xs text-coffee-600 max-w-xs mx-auto leading-relaxed">
                      Thank you for contacting Brew Haven. A friendly barista or team coordinator will get back to your email within 15 minutes!
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    id="contact_new_message_btn"
                    className="text-[10px] font-mono text-coffee-500 uppercase tracking-wider font-bold hover:text-coffee-700 underline cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
