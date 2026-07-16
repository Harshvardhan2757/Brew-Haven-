import { Coffee, Instagram, Facebook, Twitter, Linkedin, Heart, ExternalLink } from 'lucide-react';

interface FooterProps {
  onScrollToSection: (id: string) => void;
}

export default function Footer({ onScrollToSection }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (id: string) => {
    onScrollToSection(id);
  };

  return (
    <footer className="bg-coffee-950 text-cream-100/80 pt-16 pb-8 border-t border-coffee-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core links & About summary */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-coffee-900/60">
          
          {/* Column 1: Brand pitch */}
          <div className="md:col-span-5 space-y-4">
            <button
              onClick={() => handleNavClick('hero')}
              className="flex items-center gap-2 group cursor-pointer text-left focus:outline-none"
              id="footer_logo_btn"
            >
              <div className="bg-[#4A3728] text-[#F5F1EB] p-2.5 rounded-full border border-[#E5DACE]/40 group-hover:bg-[#5D4636] transition-colors">
                <Coffee className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-display font-bold text-lg tracking-tight text-white">
                  Brew Haven
                </span>
                <span className="block font-mono text-[9px] text-[#A67C52] uppercase tracking-[0.2em] leading-none mt-0.5">
                  Pune's Sanctuary
                </span>
              </div>
            </button>

            <p className="text-xs text-cream-100/60 leading-relaxed max-w-sm">
              An award-winning co-working cafe sanctuary located on Fergusson College Road, Pune. Engineered with gigabit Wi-Fi, abundant charging hubs, and roasted single-estate beans to feed your work and play.
            </p>

            {/* Social Grid */}
            <div className="flex gap-2.5 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                id="footer_social_insta"
                className="bg-coffee-900/60 hover:bg-[#A67C52] hover:text-white p-2.5 rounded-full border border-coffee-800/40 transition-all duration-200 text-cream-200"
                aria-label="Instagram"
              >
                <Instagram className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                id="footer_social_fb"
                className="bg-coffee-900/60 hover:bg-[#A67C52] hover:text-white p-2.5 rounded-full border border-coffee-800/40 transition-all duration-200 text-cream-200"
                aria-label="Facebook"
              >
                <Facebook className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                id="footer_social_tw"
                className="bg-coffee-900/60 hover:bg-[#A67C52] hover:text-white p-2.5 rounded-full border border-coffee-800/40 transition-all duration-200 text-cream-200"
                aria-label="Twitter"
              >
                <Twitter className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                id="footer_social_li"
                className="bg-coffee-900/60 hover:bg-[#A67C52] hover:text-white p-2.5 rounded-full border border-coffee-800/40 transition-all duration-200 text-cream-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Useful Navigation
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-2.5 text-xs">
              <button
                onClick={() => handleNavClick('hero')}
                id="footer_nav_link_hero"
                className="text-left text-cream-100/60 hover:text-white transition-colors cursor-pointer"
              >
                Home Base
              </button>
              <button
                onClick={() => handleNavClick('about')}
                id="footer_nav_link_about"
                className="text-left text-cream-100/60 hover:text-white transition-colors cursor-pointer"
              >
                Story & Vibe
              </button>
              <button
                onClick={() => handleNavClick('menu')}
                id="footer_nav_link_menu"
                className="text-left text-cream-100/60 hover:text-white transition-colors cursor-pointer"
              >
                Brews & Eats
              </button>
              <button
                onClick={() => handleNavClick('signatures')}
                id="footer_nav_link_signatures"
                className="text-left text-cream-100/60 hover:text-white transition-colors cursor-pointer"
              >
                Signature Drinks
              </button>
              <button
                onClick={() => handleNavClick('reviews')}
                id="footer_nav_link_reviews"
                className="text-left text-cream-100/60 hover:text-white transition-colors cursor-pointer"
              >
                Testimonials
              </button>
              <button
                onClick={() => handleNavClick('gallery')}
                id="footer_nav_link_gallery"
                className="text-left text-cream-100/60 hover:text-white transition-colors cursor-pointer"
              >
                Cozy Gallery
              </button>
            </div>
          </div>

          {/* Column 3: Regional Pune highlights */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Our Franchise Hubs
            </h4>
            <div className="space-y-3.5 text-xs">
              <div className="space-y-0.5">
                <span className="font-semibold text-white block">FC Road Sanctuary (Flagship)</span>
                <span className="text-cream-100/50 block">1204/B, Shivajinagar, FC Road, Pune</span>
              </div>
              <div className="space-y-0.5">
                <span className="font-semibold text-white block">Koregaon Park Workspace (Upcoming)</span>
                <span className="text-cream-100/50 block">Lane 6, Koregaon Park, Pune</span>
              </div>
              <div className="space-y-0.5">
                <span className="font-semibold text-white block">Viman Nagar Lounge (Upcoming)</span>
                <span className="text-cream-100/50 block">Near Symbiosis Campus, Viman Nagar, Pune</span>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright specs */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-cream-100/40">
          <div>
            &copy; {currentYear} Brew Haven India. All rights reserved. Registered under Maharashtra Shops Act.
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
            <span>for Pune's Coffee Lovers</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
