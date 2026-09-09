import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu as MenuIcon, X as XIcon, ChevronDown } from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS, type MenuItem, type MenuCategory } from '../data/menuData';
import { cn } from '../lib/utils';
import { Footer } from './Footer';

interface MenuPageProps {
  onBackToHome: () => void;
  onBookTable: () => void;
  onOpenAbout?: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

const NAV_ITEMS = [
  { label: 'HOME', href: '#home' },
  { label: 'ABOUT US', href: '/about' },
  { label: 'CHEF SELECTION', href: '#chef-selection' },
  { label: 'MENU', href: '#menu' },
];

export const MenuPage: React.FC<MenuPageProps> = ({
  onBackToHome,
  onBookTable,
  onOpenAbout,
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [openCategoryIds, setOpenCategoryIds] = useState<string[]>([]);

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const toggleCategory = (catId: string) => {
    setOpenCategoryIds((prev) =>
      prev.includes(catId) ? prev.filter((id) => id !== catId) : [...prev, catId]
    );
  };

  const handleNavClick = (href: string, label: string) => {
    setMobileMenuOpen(false);
    if (label === 'MENU' || href === '#menu') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (label === 'ABOUT US' || href === '/about') {
      if (onOpenAbout) {
        onOpenAbout();
      } else {
        onBackToHome();
      }
    } else if (label === 'CHEF SELECTION' || href === '#chef-selection') {
      if (onNavigateSection) {
        onNavigateSection('chef-selection');
      } else {
        onBackToHome();
      }
    } else if (label === 'HOME' || href === '#home') {
      onBackToHome();
    } else if (href === '#reservation') {
      onBookTable();
    } else {
      const targetId = href.replace('#', '');
      if (onNavigateSection) {
        onNavigateSection(targetId);
      } else {
        onBackToHome();
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#faebd7] text-[#0d0d0d] font-sans selection:bg-[#0d0d0d]/10 selection:text-[#0d0d0d]">
      {/* Seamless Geometric Pattern Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-20 mix-blend-multiply bg-repeat bg-[length:320px_auto]"
        style={{ backgroundImage: "url('/menu_pattern.jpg')" }}
      />

      {/* 1. TOP NAVIGATION BAR (EXACT SAME AS HERO NAVBAR) */}
      <header className="sticky top-0 z-50 w-full py-2 sm:py-3 bg-[#0d0d0d]">
        <div className="w-full px-3 sm:px-5 lg:px-7 flex items-center justify-between">
          {/* Far Left Corner: RD Logo */}
          <button
            onClick={onBackToHome}
            className="flex items-center text-[#faebd7] group focus:outline-none shrink-0 cursor-pointer"
          >
            <img
              src="/logo_final.png"
              alt="Royal Dream Logo"
              className="h-10 sm:h-12 md:h-15 lg:h-16 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </button>

          {/* Far Right Corner Cluster: Navigation Links + 'BOOK A TABLE' Button */}
          <div className="hidden lg:flex items-center">
            <nav className="flex items-center gap-[20px] xl:gap-[26px]">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href, item.label);
                  }}
                  className={cn(
                    'group relative inline-block font-sans text-[11px] sm:text-[12px] md:text-[12.5px] font-extrabold uppercase tracking-tight text-[#faebd7] transition-colors duration-300 bg-transparent py-0.5 focus:outline-none hover:text-white cursor-pointer',
                    item.label === 'MENU' ? 'text-white' : 'opacity-90'
                  )}
                >
                  <span>{item.label}</span>
                  <span
                    className={cn(
                      'absolute bottom-0 left-0 h-[1.5px] bg-[#faebd7] transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                      item.label === 'MENU' ? 'w-full' : 'w-0 group-hover:w-full'
                    )}
                  />
                </a>
              ))}
            </nav>

            <button
              onClick={onBookTable}
              className="ml-[22px] xl:ml-[28px] inline-flex items-center justify-center font-sans text-[11px] sm:text-[12px] font-extrabold uppercase tracking-tight text-[#faebd7] bg-transparent border-[1.5px] border-[#faebd7] rounded-[50px] px-[20px] py-[6px] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#faebd7] hover:text-[#0d0d0d] hover:-translate-y-[1px] hover:shadow-[0_4px_16px_rgba(0,0,0,0.4)] active:scale-[0.97] focus:outline-none cursor-pointer"
            >
              BOOK A TABLE
            </button>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-[#faebd7] hover:opacity-80 p-2 transition-opacity focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
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
            className="fixed inset-0 z-50 bg-[#0d0d0d]/98 backdrop-blur-xl flex flex-col justify-between p-8 pt-24 lg:hidden"
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
                    e.preventDefault();
                    handleNavClick(item.href, item.label);
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
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookTable();
                }}
                className="w-full inline-flex items-center justify-center font-sans text-[12px] font-bold uppercase tracking-tight text-[#0d0d0d] bg-[#faebd7] border border-[#faebd7] rounded-[50px] px-[20px] py-[10px] transition-all cursor-pointer"
              >
                BOOK A TABLE
              </button>
              <p className="text-xs text-[#faebd7]/60 mt-4 font-sans tracking-wider uppercase">
                Bukit Bintang • Kuala Lumpur
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. VERTICAL SCROLLABLE CATEGORY SECTIONS WITH EDITORIAL LIST DROPDOWNS */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 sm:space-y-16">
        {/* Top Section Title */}
        <div className="text-center space-y-3 pt-4 pb-4 sm:pb-6 mb-6 sm:mb-8">
          <span className="font-sans text-xs sm:text-sm font-extrabold text-[#96722e] tracking-[0.25em] uppercase">
            ROYAL CULINARY SELECTION
          </span>
          <h1 className="font-condensed text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-[#0d0d0d] leading-none">
            OUR MENU
          </h1>
          <p className="font-arabic text-xl sm:text-2xl text-[#96722e] font-semibold">
            قائمة الطعام
          </p>
        </div>

        {MENU_CATEGORIES.map((category: MenuCategory) => {
          const categoryItems = MENU_ITEMS.filter(
            (item) => item.category === category.id
          );

          if (categoryItems.length === 0) return null;

          const isOpen = openCategoryIds.includes(category.id);

          return (
            <section
              key={category.id}
              id={`cat-${category.id}`}
              className="scroll-mt-44"
            >
              {/* Category Header Dropdown Trigger (Matches Image 2) */}
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-end justify-between border-b-2 sm:border-b-[2.5px] border-[#0d0d0d]/30 pb-4 mb-4 text-left group cursor-pointer focus:outline-none select-none transition-colors hover:border-[#96722e]"
                aria-expanded={isOpen}
              >
                <div>
                  <h2 className="font-condensed text-4xl sm:text-6xl uppercase tracking-tight text-[#0d0d0d] group-hover:text-[#96722e] leading-none transition-colors">
                    {category.label}
                  </h2>
                  <p className="font-arabic text-sm sm:text-base text-[#96722e] font-medium mt-1">
                    {category.arabicLabel}
                  </p>
                </div>
                <div className="flex items-center gap-3 pb-1">
                  <span className="font-sans text-xs font-bold text-[#96722e] uppercase tracking-widest">
                    {categoryItems.length} DISHES
                  </span>
                  <ChevronDown
                    className={cn(
                      'w-6 h-6 text-[#96722e] transition-transform duration-300 ease-in-out',
                      isOpen ? 'rotate-180' : 'rotate-0'
                    )}
                  />
                </div>
              </button>

              {/* DISH LIST DROPDOWN CONTENT (Matches Image 1) */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-4 pt-3 pb-6">
                      {categoryItems.map((dish: MenuItem) => (
                        <div
                          key={dish.id}
                          className="py-5 sm:py-6 px-4 sm:px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group transition-all duration-300 bg-[#fdfbf7] border border-[#c5a880]/25 rounded-2xl shadow-sm hover:border-[#96722e]/50 hover:shadow-md cursor-pointer"
                        >
                          {/* Left Column: Price + Dish Title + Arabic Name */}
                          <div className="w-full md:w-5/12 flex flex-col justify-center space-y-1">
                            <span className="font-sans text-xs sm:text-sm font-semibold tracking-wider text-[#96722e]">
                              {dish.price}
                            </span>
                            <h3 className="font-condensed text-3xl sm:text-5xl uppercase tracking-tight text-[#0d0d0d] leading-none group-hover:text-[#96722e] transition-colors">
                              {dish.name}
                            </h3>
                            <p className="font-arabic text-xs sm:text-sm text-[#0d0d0d]/70 font-medium">
                              {dish.arabicName}
                            </p>
                          </div>

                          {/* Right Column: Uppercase Description */}
                          <div className="w-full md:w-7/12 flex items-center justify-start md:justify-end py-1 md:py-0">
                            <p className="font-sans text-[11px] sm:text-xs text-[#0d0d0d]/80 tracking-wider uppercase leading-relaxed text-left md:text-right max-w-xl">
                              {dish.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          );
        })}
      </main>

      {/* SITE FOOTER */}
      <Footer />
    </div>
  );
};

export default MenuPage;
