import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu as MenuIcon, X as XIcon } from 'lucide-react';
import { Container } from './common/Container';
import { PlaceholderImage } from './common/PlaceholderImage';
import { fadeIn, staggerContainer } from '../utils/animations';

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'HOME', href: '#home' },
  { label: 'ABOUT US', href: '/about' },
  { label: 'CHEF SELECTION', href: '#chef-selection' },
  { label: 'MENU', href: '/menu' },
];

interface HeroProps {
  onOpenMenu?: () => void;
  onOpenAbout?: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenMenu, onOpenAbout, onNavigateSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent, item: NavItem) => {
    if (item.label === 'MENU' && onOpenMenu) {
      e.preventDefault();
      onOpenMenu();
    } else if (item.label === 'ABOUT US' && onOpenAbout) {
      e.preventDefault();
      onOpenAbout();
    } else if (item.label === 'CHEF SELECTION') {
      e.preventDefault();
      const el = document.getElementById('chef-selection');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else if (onNavigateSection) {
        onNavigateSection('chef-selection');
      }
    } else if (item.label === 'HOME') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative w-full h-screen min-h-[680px] flex flex-col justify-between overflow-hidden bg-[#0d0d0d]"
    >
      {/* 1. Background Image Container with Slow Cinematic Zoom */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{
          duration: 20,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className="absolute inset-0 w-full h-full z-0"
      >
        <PlaceholderImage
          src="https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/front.jpg"
          category="dining"
          alt="Royal Dream Luxury Restaurant Front Exterior"
          className="w-full h-full rounded-none border-none"
          priority
        />
      </motion.div>

      {/* Cinematic Dark Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/50 to-[#0d0d0d]/75 pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0d0d0d]/85 via-transparent to-[#0d0d0d]/85 pointer-events-none" />

      {/* 2. Top Navigation Bar (Scaled for 80% visual baseline at 100% zoom) */}
      <header className="absolute top-0 left-0 right-0 z-30 py-2 sm:py-3 bg-transparent">
        <div className="w-full px-3 sm:px-5 lg:px-7 flex items-center justify-between">
          {/* Far Left Corner: RD Logo */}
          <a
            href="#home"
            className="flex items-center text-[#faebd7] group focus:outline-none shrink-0"
          >
            <img
              src="/logo_final.png"
              alt="Royal Dream Logo"
              className="h-10 sm:h-12 md:h-15 lg:h-16 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </a>

          {/* Far Right Corner Cluster: Navigation Links + 'BOOK A TABLE' Button */}
          <div className="hidden lg:flex items-center">
            <nav className="flex items-center gap-[20px] xl:gap-[26px]">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className="group relative inline-block font-sans text-[11px] sm:text-[12px] md:text-[12.5px] font-extrabold uppercase tracking-tight text-[#faebd7] opacity-100 transition-colors duration-300 bg-transparent py-0.5 focus:outline-none hover:text-white cursor-pointer"
                >
                  <span>{item.label}</span>
                  <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-[#faebd7] transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
                </a>
              ))}
            </nav>

            <a
              href="#reservation"
              className="ml-[22px] xl:ml-[28px] inline-flex items-center justify-center font-sans text-[11px] sm:text-[12px] font-extrabold uppercase tracking-tight text-[#faebd7] bg-transparent border-[1.5px] border-[#faebd7] rounded-[50px] px-[20px] py-[6px] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#faebd7] hover:text-[#0d0d0d] hover:-translate-y-[1px] hover:shadow-[0_4px_16px_rgba(0,0,0,0.4)] active:scale-[0.97] focus:outline-none"
            >
              BOOK A TABLE
            </a>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-[#faebd7] hover:opacity-80 p-2 transition-opacity focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <XIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#0d0d0d]/98 backdrop-blur-xl flex flex-col justify-between p-8 pt-28 lg:hidden"
          >
            <div className="flex flex-col space-y-6 text-center my-auto">
              <div className="flex justify-center mb-4">
                <img
                  src="/logo_final.png"
                  alt="Royal Dream Logo"
                  className="h-16 w-auto object-contain"
                />
              </div>

              {NAV_ITEMS.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleNavClick(e, item);
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.08, duration: 0.4 }}
                  className="font-sans text-lg font-bold uppercase tracking-tight text-[#faebd7] hover:opacity-75 transition-opacity cursor-pointer"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="w-full pt-6 border-t border-[#faebd7]/15 text-center"
            >
              <a
                href="#reservation"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center font-sans text-[12px] font-bold uppercase tracking-tight text-[#0d0d0d] bg-[#faebd7] border border-[#faebd7] rounded-[50px] px-[20px] py-[10px] transition-all"
              >
                BOOK A TABLE
              </a>
              <p className="text-xs text-[#faebd7]/60 mt-4 font-sans tracking-wider uppercase">
                Bukit Bintang • Kuala Lumpur
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Hero Center Content */}
      <Container size="xl" className="relative z-20 w-full my-auto pt-12 pb-6">
        <motion.div
          variants={staggerContainer(0.18, 0.2)}
          initial="hidden"
          animate="show"
          className="max-w-5xl mx-auto text-center flex flex-col items-center justify-center space-y-3 md:space-y-4"
        >
          {/* Brand Title Graphic - Scaled for 80% visual target at 100% zoom */}
          <motion.div
            variants={fadeIn('up')}
            className="w-full flex items-center justify-center py-1"
          >
            <img
              src="/name_exact_transparent.png"
              alt="Royal Dream Restaurant - رويال دريم"
              className="w-full max-w-[380px] sm:max-w-[460px] md:max-w-[530px] lg:max-w-[580px] h-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]"
            />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};
