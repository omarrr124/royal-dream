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
    </div>
  );
};

export default App;
