import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu as MenuIcon, X as XIcon } from 'lucide-react';
import { Footer } from './Footer';
import TeamShowcase, { type TeamMember } from './ui/team-showcase';

interface AboutUsPageProps {
  onBackToHome: () => void;
  onBookTable: () => void;
  onOpenMenu: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

interface Milestone {
  year: string;
  title: string;
  story: string;
  image: string;
  alt: string;
}

const SUPABASE_ABOUT_US_IMG =
  'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/aboutt%20us.jpg';

const MILESTONES: Milestone[] = [
  {
    year: '2018',
    title: 'THE DREAM BEGINS',
    story:
      'Royal Dream enters Kuala Lumpur’s dining scene, bringing a passion for Arabic cuisine, warm hospitality, and the desire to create a place where people could gather, dine, and feel at home.',
    image:
      'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/story%201.jpg',
    alt: 'Royal Dream 2018 - The Dream Begins',
  },
  {
    year: '2022',
    title: 'GROWING THE DREAM',
    story:
      'What began as a dining vision continues to grow. Royal Dream becomes part of a growing hospitality portfolio, building on its foundations while reaching new guests and new possibilities.',
    image:
      'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/story%202.jpg',
    alt: 'Royal Dream 2022 - Growing The Dream',
  },
  {
    year: '2024',
    title: 'A NEW LOOK',
    story:
      'With a renewed vision came a fresh identity and an elevated guest experience. Royal Dream evolves its spaces, presentation, and approach while staying true to the spirit that started it all.',
    image:
      'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/story%203.jpg',
    alt: 'Royal Dream 2024 - A New Look',
  },
  {
    year: '2026',
    title: 'ROYAL DREAM TODAY',
    story:
      'Today, Royal Dream stands as an Arabic dining destination in the heart of Bukit Bintang — bringing together authentic flavors, elegant surroundings, and genuine hospitality for guests from Kuala Lumpur and around the world.',
    image:
      'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/story%204.jpg',
    alt: 'Royal Dream 2026 - Royal Dream Today',
  },
];

const ROYAL_TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Youssef',
    role: 'EXECUTIVE CHEF',
    image:
      'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/staff%201%20youssef.JPG',
    social: { twitter: '#', linkedin: '#', instagram: '#' },
  },
  {
    id: '2',
    name: 'Houssem',
    role: 'HEAD MIXOLOGIST',
    image:
      'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/staff2%20houssem.JPG',
    social: { twitter: '#', linkedin: '#', instagram: '#' },
  },
  {
    id: '3',
    name: 'Sayyedi',
    role: 'MAÎTRE D & SOMMELIER',
    image:
      'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/staff3%20sayyedi.jpg',
    social: { twitter: '#', linkedin: '#' },
  },
  {
    id: '4',
    name: 'Amine',
    role: 'SENIOR BARTENDER',
    image:
      'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/staff%204%20amine.jpg',
    social: { instagram: '#', linkedin: '#' },
  },
  {
    id: '5',
    name: 'Omar',
    role: 'HEAD WAITER',
    image:
      'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/staff%205%20omar.jpg',
    social: { linkedin: '#', instagram: '#' },
  },
  {
    id: '6',
    name: 'Lablebi',
    role: 'CULINARY ARTISAN',
    image:
      'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/staff%206%20lablebi.jpg',
    social: { instagram: '#', linkedin: '#' },
  },
];

const NAV_ITEMS = [
  { label: 'HOME', href: '#home' },
  { label: 'ABOUT US', href: '/about' },
  { label: 'CHEF SELECTION', href: '#chef-selection' },
  { label: 'MENU', href: '/menu' },
];

export const AboutUsPage: React.FC<AboutUsPageProps> = ({
  onBackToHome,
  onBookTable,
  onOpenMenu,
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const handleNavClick = (href: string, label: string) => {
    setMobileMenuOpen(false);
    if (label === 'ABOUT US' || href === '/about') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (label === 'MENU' || href === '#menu') {
      onOpenMenu();
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
    <div className="relative min-h-screen w-full bg-[#0d0d0d] text-[#faebd7] font-sans antialiased overflow-x-hidden touch-pan-y selection:bg-[#faebd7]/20 selection:text-[#faebd7]">
      {/* -------------------------------------------------------------
          1. HERO SECTION WITH SUPABASE "aboutt us.jpg" PHOTO BACKGROUND
          Height: 2/3 of the page (66.66vh height)
          Title: 'ABOUT US' in 'Six Caps', uppercase (clamp(110px, 18vw, 240px))
      ------------------------------------------------------------- */}
      <section className="relative w-full h-[66.666vh] min-h-[520px] flex flex-col justify-between bg-[#0d0d0d] text-[#faebd7] overflow-x-hidden touch-pan-y border-b border-[#faebd7]/10">
        {/* Background Image "aboutt us.jpg" from Supabase */}
        <div className="absolute inset-0 z-0">
          <img
            src={SUPABASE_ABOUT_US_IMG}
            alt="Royal Dream Restaurant Interior - About Us"
            className="w-full h-full object-cover object-center"
          />
          {/* Dark Overlay for optimal text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/50 to-[#0d0d0d]/65" />
        </div>

        {/* Integrated Header / Top Navigation Bar */}
        <header className="relative z-30 w-full py-2 sm:py-3 bg-transparent">
          <div className="w-full px-3 sm:px-5 lg:px-7 flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={onBackToHome}
              className="flex items-center text-[#faebd7] group focus:outline-none shrink-0 cursor-pointer"
              aria-label="Back to Home"
            >
              <img
                src="/logo_final.png"
                alt="Royal Dream Logo"
                className="h-10 sm:h-12 md:h-15 lg:h-16 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </button>

            {/* Desktop Nav Items */}
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
                    className={`group relative inline-block font-sans text-[11px] sm:text-[12px] md:text-[12.5px] font-extrabold uppercase tracking-tight transition-colors duration-300 bg-transparent py-0.5 focus:outline-none cursor-pointer ${
                      item.label === 'ABOUT US'
                        ? 'text-white'
                        : 'text-[#faebd7] opacity-90 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span
                      className={`absolute bottom-0 left-0 h-[1.5px] bg-[#faebd7] transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        item.label === 'ABOUT US' ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-[#faebd7] hover:opacity-80 p-2 transition-opacity focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <XIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: '-100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '-100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-40 bg-[#0d0d0d]/98 backdrop-blur-xl flex flex-col justify-between p-8 pt-24 lg:hidden"
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
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + index * 0.06 }}
                    className={`font-sans text-xl font-bold uppercase tracking-tight cursor-pointer ${
                      item.label === 'ABOUT US' ? 'text-[#faebd7]' : 'text-[#faebd7]/70 hover:opacity-75'
                    }`}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>

              <div className="w-full pt-6 border-t border-[#faebd7]/15 text-center">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onBookTable();
                  }}
                  className="w-full inline-flex items-center justify-center font-sans text-sm font-extrabold uppercase tracking-tight text-[#0d0d0d] bg-[#faebd7] rounded-[50px] py-3.5"
                >
                  BOOK A TABLE
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Central Title Container - "ABOUT US" */}
        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center justify-center text-center my-auto py-8 sm:py-12 px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-['Six_Caps'] uppercase text-[#faebd7] tracking-tight select-none leading-none drop-shadow-2xl"
            style={{ fontSize: 'clamp(110px, 18vw, 240px)', lineHeight: 0.95 }}
          >
            ABOUT US
          </motion.h1>
        </div>
      </section>

      {/* -------------------------------------------------------------
          2. OUR STORY SECTION (Cream Theme)
          Background: Warm antique cream #faebd7 (text #0d0d0d)
          Subtitle: 'OUR STORY' in 'Six Caps' - AS BIG AS ABOUT US (clamp(110px, 18vw, 240px))
      ------------------------------------------------------------- */}
      <section className="relative w-full bg-[#faebd7] text-[#0d0d0d] pt-16 sm:pt-24 pb-10 sm:pb-14 px-4 sm:px-8 lg:px-12 text-center overflow-x-hidden touch-pan-y">
        {/* Seamless Geometric Pattern Overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-15 mix-blend-multiply bg-repeat bg-[length:320px_auto]"
          style={{ backgroundImage: "url('/menu_pattern.jpg')" }}
        />

        <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center">
          {/* Subtitle: OUR STORY - AS BIG AS ABOUT US */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex items-center justify-center text-center"
          >
            <h2
              className="font-['Six_Caps'] uppercase text-[#0d0d0d] tracking-tight leading-none select-none"
              style={{ fontSize: 'clamp(110px, 18vw, 240px)', lineHeight: 0.95 }}
            >
              OUR STORY
            </h2>
          </motion.div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          3. MILESTONES TIMELINE (Cream Theme)
          4 Milestones: 2018, 2022, 2024, 2026
          Photos: story 1.jpg, story 2.jpg, story 3.jpg, story 4.jpg from Supabase
          Zig-zag layout on desktop, single column fallback on mobile (<810px)
      ------------------------------------------------------------- */}
      <section className="relative w-full bg-[#faebd7] text-[#0d0d0d] pb-20 sm:pb-28 px-4 sm:px-8 lg:px-12 overflow-x-hidden touch-pan-y">
        {/* Pattern Overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-15 mix-blend-multiply bg-repeat bg-[length:320px_auto]"
          style={{ backgroundImage: "url('/menu_pattern.jpg')" }}
        />

        <div className="relative z-10 max-w-5xl mx-auto space-y-16 sm:space-y-24">
          {/* Milestone Items List */}
          <div className="timeline-container space-y-16 sm:space-y-24 pt-4">
            {MILESTONES.map((item) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="timeline-item flex flex-col min-[810px]:flex-row items-center gap-6 min-[810px]:gap-10 w-full"
              >
                {/* Photo Box (height: 330px, border-radius: 12px, overflow: hidden, scale(1.04) on hover) */}
                <div className="timeline-photo-container w-full min-[810px]:w-1/2 shrink-0 max-w-full">
                  <div
                    className="relative w-full overflow-hidden shadow-lg group cursor-pointer"
                    style={{ height: '330px', borderRadius: '12px' }}
                  >
                    <img
                      src={item.image}
                      alt={item.alt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-[#0d0d0d]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>

                {/* Content Box */}
                <div className="w-full min-[810px]:w-1/2 flex flex-col justify-center text-left">
                  {/* Year Number (Six Caps 64px) */}
                  <div
                    className="font-['Six_Caps'] leading-none text-[#0d0d0d] tracking-tight select-none mb-1"
                    style={{ fontSize: '64px', lineHeight: 1 }}
                  >
                    {item.year}
                  </div>

                  {/* Milestone Title (Six Caps 42px) */}
                  <h3
                    className="font-['Six_Caps'] uppercase text-[#0d0d0d] tracking-tight mb-3 leading-none"
                    style={{ fontSize: '42px', lineHeight: 1 }}
                  >
                    {item.title}
                  </h3>

                  {/* Story Paragraph (Plus Jakarta Sans 14.5px) */}
                  <p
                    className="font-['Plus_Jakarta_Sans'] text-[#0d0d0d]/85 leading-relaxed max-w-md"
                    style={{ fontSize: '14.5px' }}
                  >
                    {item.story}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          4. 'MEET THE TEAM' SECTION WITH TEAM SHOWCASE COMPONENT
          Background: #0d0d0d
          Title: 'MEET THE TEAM' in 'Six Caps'
          Interactive Team Showcase component with hover photo filter & social links
      ------------------------------------------------------------- */}
      <section className="relative w-full bg-[#0d0d0d] text-[#faebd7] py-16 sm:py-24 px-4 sm:px-8 lg:px-12 border-t border-[#faebd7]/10 touch-pan-y">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-10 sm:mb-14">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-['Six_Caps'] uppercase text-[#faebd7] tracking-tight select-none leading-none"
              style={{ fontSize: 'clamp(56px, 9vw, 115px)', lineHeight: 1 }}
            >
              MEET THE TEAM
            </motion.h2>
            <p className="font-['Plus_Jakarta_Sans'] text-[13px] uppercase tracking-[0.2em] text-[#faebd7]/60 font-semibold mt-2.5">
              THE CULINARY ARTISANS & VISIONARIES BEHIND ROYAL DREAM
            </p>
          </div>

          {/* Integrated Interactive TeamShowcase Component */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="w-full flex justify-center items-center"
          >
            <TeamShowcase members={ROYAL_TEAM_MEMBERS} />
          </motion.div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          FOOTER COMPONENT
      ------------------------------------------------------------- */}
      <Footer />
    </div>
  );
};

export default AboutUsPage;
