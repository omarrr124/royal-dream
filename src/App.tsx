import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { Introduction } from './components/Introduction';
import { MenuReveal } from './components/MenuReveal';
import { SignatureBites } from './components/SignatureBites';
import { MarqueeBar, MENU_MARQUEE_ITEMS } from './components/MarqueeBar';
import { ReservationSection } from './components/ReservationSection';
import { Footer } from './components/Footer';
import { MenuPage } from './components/MenuPage';
import { AboutUsPage } from './components/AboutUsPage';

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookTable = () => {
    navigateTo('/');
    setTimeout(() => {
      const resSection = document.getElementById('reservation');
      if (resSection) {
        resSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleNavigateSection = (sectionId: string) => {
    navigateTo('/');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  if (currentPath === '/menu') {
    return (
      <MenuPage
        onBackToHome={() => navigateTo('/')}
        onBookTable={handleBookTable}
        onOpenAbout={() => navigateTo('/about')}
        onNavigateSection={handleNavigateSection}
      />
    );
  }

  if (currentPath === '/about') {
    return (
      <AboutUsPage
        onBackToHome={() => navigateTo('/')}
        onBookTable={handleBookTable}
        onOpenMenu={() => navigateTo('/menu')}
        onNavigateSection={handleNavigateSection}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#faebd7] antialiased selection:bg-[#c5a059]/30 selection:text-[#faebd7]">
      <main>
        {/* 1. Unified Hero (Includes Integrated Top Navigation) */}
        <Hero
          onOpenMenu={() => navigateTo('/menu')}
          onOpenAbout={() => navigateTo('/about')}
          onNavigateSection={handleNavigateSection}
        />

        {/* 2. Introduction Section ("BORN TO BE ROYAL") */}
        <Introduction onOpenAbout={() => navigateTo('/about')} />

        {/* 3. Signature Bites Section ("OUR SIGNATURE BITES") */}
        <SignatureBites />

        {/* Dark Menu Marquee Ticker Bar (Matches Screenshot) */}
        <MarqueeBar theme="dark" items={MENU_MARQUEE_ITEMS} />

        {/* 4. Theater Split Curtain Menu Reveal ("OUR MENU") */}
        <MenuReveal onOpenMenu={() => navigateTo('/menu')} />

        {/* Cream Horizontal Reservation Marquee Ticker Bar */}
        <MarqueeBar theme="cream" />

        {/* 5. Reservation Section ("BOOK YOUR TABLE") */}
        <ReservationSection />

        {/* 6. Site Footer ("GET IN TOUCH") */}
        <Footer />
      </main>

      {/* Persistent Mobile Floating Reserve & VIP WhatsApp Bar */}
      <div className="fixed bottom-0 inset-x-0 z-50 lg:hidden bg-[#0d0d0d]/95 backdrop-blur-md border-t border-[#faebd7]/20 p-2.5 px-4 flex items-center justify-between gap-3 shadow-2xl">
        <button
          onClick={handleBookTable}
          className="flex-1 py-3 px-4 rounded-full bg-[#faebd7] text-[#0d0d0d] font-sans text-xs font-black uppercase tracking-wider text-center shadow-lg active:scale-95 transition-transform cursor-pointer"
        >
          BOOK A TABLE
        </button>
        <a
          href="https://wa.me/60123456789?text=Hello%20Royal%20Dream,%20I%20would%20like%20to%20reserve%20a%20VIP%20table"
          target="_blank"
          rel="noopener noreferrer"
          className="py-3 px-4 rounded-full border border-[#25D366] text-[#25D366] bg-[#25D366]/10 font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 active:scale-95 transition-transform cursor-pointer"
        >
          <span>WHATSAPP VIP</span>
        </a>
      </div>
    </div>
  );
};

export default App;
