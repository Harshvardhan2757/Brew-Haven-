import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send } from 'lucide-react';

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [customText, setCustomText] = useState('');

  const quickTopics = [
    { label: 'Laptop workspace availability', text: 'Hi Brew Haven, is there a laptop workspace with power outlets free right now?' },
    { label: 'Booking a team meeting', text: 'Hey there! I want to book a table for a quick team meeting of 4 people on FC Road.' },
    { label: 'Specialty coffee roasting query', text: 'Hello! I wanted to check what single-origin coffee beans are available on your pour-over bar today.' },
  ];

  const handleSendWhatsApp = () => {
  alert("Button clicked!");

  const finalMsg =
    customText || selectedTopic || "Hello Brew Haven! I have a general inquiry.";

  const encoded = encodeURIComponent(finalMsg);

  const whatsappUrl = `https://wa.me/918855055155?text=${encoded}`;

  window.open(whatsappUrl, "_blank");

  setIsOpen(false);
};

  const selectTopic = (text: string) => {
    setSelectedTopic(text);
    setCustomText(text);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-16 right-0 bg-white rounded-3xl border border-cream-200/60 shadow-2xl p-6 w-[320px] sm:w-[350px] space-y-4 text-left"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-cream-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="bg-emerald-500 text-white p-1.5 rounded-lg">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-coffee-950 leading-tight">Brew Haven WhatsApp</h4>
                  <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" /> Online & Responsive
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                id="wa_widget_close"
                className="text-coffee-400 hover:text-coffee-700 p-1 rounded-full hover:bg-cream-100"
                aria-label="Close assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Vibe intro */}
            <p className="text-[11px] text-coffee-700 leading-relaxed font-sans">
              Hey there! Choose a quick topic below or draft your own message to chat directly with our barista coordinator.
            </p>

            {/* Quick choices */}
            <div className="space-y-1.5 pt-1">
              {quickTopics.map((topic, idx) => (
                <button
                  key={idx}
                  onClick={() => selectTopic(topic.text)}
                  id={`wa_topic_btn_${idx}`}
                  className={`w-full text-left p-2.5 rounded-xl text-xs border transition-all duration-200 cursor-pointer ${
                    customText === topic.text
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold'
                      : 'bg-cream-50 hover:bg-cream-100 border-cream-200/50 text-coffee-800'
                  }`}
                >
                  {topic.label}
                </button>
              ))}
            </div>

            {/* Textarea */}
            <div className="space-y-1">
              <textarea
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Draft custom query..."
                rows={2}
                className="w-full bg-cream-50 border border-cream-200 rounded-xl py-2 px-3 text-xs font-sans focus:ring-1 focus:ring-emerald-500 focus:outline-none text-coffee-950 resize-none placeholder-coffee-400"
              />
            </div>

            {/* Submit */}
            <button
              onClick={handleSendWhatsApp}
              id="wa_widget_submit_btn"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md transition-colors"
            >
              <span>Launch WhatsApp Chat</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating launcher trigger */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        id="wa_floating_trigger_btn"
        className="bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer relative group"
        aria-label="Contact via WhatsApp"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="absolute -top-1.5 -right-1 bg-red-500 text-white font-bold text-[9px] px-1.5 py-0.5 rounded-full border border-white flex items-center justify-center animate-bounce">
          Live
        </span>
      </motion.button>
    </div>
  );
}
