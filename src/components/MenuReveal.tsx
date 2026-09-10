import React, { useRef, useState, useEffect } from 'react';
import { preload } from 'react-dom';

const LEFT_COVER = 'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/menu%20left.png';
const RIGHT_COVER = 'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/menu%20right.png';

// Context7 / React 19 browser resource hints for instant image caching
preload(LEFT_COVER, { as: 'image' });
preload(RIGHT_COVER, { as: 'image' });

interface MenuRevealProps {
  onOpenMenu?: () => void;
}

export const MenuReveal: React.FC<MenuRevealProps> = ({ onOpenMenu }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Immediate in-memory image preloading on component mount
    const img1 = new Image();
    img1.src = LEFT_COVER;
    const img2 = new Image();
    img2.src = RIGHT_COVER;

    const onScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const maxScroll = rect.height - window.innerHeight;
      if (maxScroll <= 0) return;
      // Calculate progress strictly from 0 to 1 as track moves past viewport
      const currentProgress = Math.max(0, Math.min(1, -rect.top / maxScroll));
      setProgress(currentProgress);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Cap opening animation at exactly 33.33% translate so curtain image edges frame the center card precisely
  const leftX = -progress * 33.33;
  const rightX = progress * 33.33;

  // Staggered slide-up from bottom animation as curtains open
  const textProgress = Math.min(1, Math.max(0, progress / 0.65));
  const titleY = (1 - textProgress) * 90;
  const titleOpacity = Math.min(1, textProgress * 1.8);

  const descProgress = Math.min(1, Math.max(0, (progress - 0.06) / 0.6));
  const descY = (1 - descProgress) * 65;
  const descOpacity = descProgress;

  const btnProgress = Math.min(1, Math.max(0, (progress - 0.12) / 0.55));
  const btnY = (1 - btnProgress) * 45;
  const btnOpacity = btnProgress;

  return (
    <section
      ref={trackRef}
      id="speakeasy"
      className="speakeasy-track relative w-full bg-[#0d0d0d] min-[810px]:h-[160vh] max-[809px]:h-auto max-[809px]:py-20"
    >
      {/* 1. Mobile-Only Background Image Fallback (<810px) */}
      <div className="min-[810px]:hidden absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/7.jpg"
          alt="Royal Dream Dining Atmosphere"
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover scale-110 filter brightness-[0.35]"
        />
        <div className="absolute inset-0 bg-[#0d0d0d]/80" />
      </div>

      {/* 2. Pinned Viewport Stage (100vh) */}
      <div className="speakeasy-stage min-[810px]:sticky min-[810px]:top-0 w-full min-[810px]:h-screen max-[809px]:h-auto overflow-hidden flex items-center justify-center">
        {/* Layer 1: Background Content revealed behind the curtains (z-index: 1) */}
        <div className="speakeasy-content relative z-10 w-full max-w-[680px] px-6 flex flex-col items-center text-center space-y-6 max-[809px]:bg-[#0d0d0d]/90 max-[809px]:py-10 max-[809px]:px-6 max-[809px]:rounded-xl max-[809px]:border max-[809px]:border-[#faebd7]/20">
          <div
            style={{
              transform: `translateY(${titleY}px)`,
              opacity: titleOpacity,
              transition: 'transform 0.08s ease-out, opacity 0.08s ease-out',
            }}
            className="speakeasy-title-box w-full border-y border-[#faebd7] py-2 sm:py-3 flex items-center justify-center overflow-hidden will-change-transform max-[809px]:!transform-none max-[809px]:!opacity-100"
          >
            <h2 className="speakeasy-title font-condensed text-[clamp(56px,10.5vw,132px)] leading-[0.88] text-[#faebd7] uppercase font-normal select-none whitespace-nowrap tracking-[0.01em]">
              OUR MENU
            </h2>
          </div>
          <p
            style={{
              transform: `translateY(${descY}px)`,
              opacity: descOpacity,
              transition: 'transform 0.08s ease-out, opacity 0.08s ease-out',
            }}
            className="speakeasy-desc font-sans text-[14px] sm:text-[15px] leading-[1.65] text-[#faebd7]/90 font-normal tracking-wide max-w-[480px] will-change-transform max-[809px]:!transform-none max-[809px]:!opacity-100"
          >
            Explore an exquisite selection of Arabic cuisine, where authentic flavors meet contemporary elegance.
          </p>
          <a
            href="#menu"
            onClick={(e) => {
              if (onOpenMenu) {
                e.preventDefault();
                onOpenMenu();
              }
            }}
            style={{
              transform: `translateY(${btnY}px)`,
              opacity: btnOpacity,
              transition: 'transform 0.08s ease-out, opacity 0.08s ease-out',
            }}
            className="group speakeasy-btn inline-flex items-center justify-center gap-1.5 px-7 py-3 rounded-full border border-[#faebd7] text-[#faebd7] font-sans text-[12px] sm:text-[13px] font-bold uppercase tracking-wider transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#faebd7] hover:text-[#0d0d0d] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(250,235,215,0.2)] active:scale-95 focus:outline-none will-change-transform max-[809px]:!transform-none max-[809px]:!opacity-100 cursor-pointer"
          >
            <span>CHECK THE MENU</span>
            <span className="inline-block max-w-0 opacity-0 overflow-hidden whitespace-nowrap transition-all duration-300 ease-out group-hover:max-w-[40px] group-hover:opacity-100 group-hover:ml-1 group-active:max-w-[40px] group-active:opacity-100 text-sm">
              𓌉◯𓇋
            </span>
          </a>
        </div>

        {/* Layer 2: The Two Curtains (z-index: 2, sit ON TOP of center content) */}
        {/* Curtain Left */}
        <div
          style={{ transform: `translateX(${leftX}%)` }}
          className="speakeasy-curtain curtain-left hidden min-[810px]:block absolute top-0 left-0 w-1/2 h-screen overflow-hidden z-20 will-change-transform border-r border-[#0d0d0d]/40 shadow-2xl transition-transform duration-75 ease-out bg-[#faebd7]"
        >
          <div className="curtain-image-wrapper w-full h-full overflow-hidden flex items-center justify-end bg-[#faebd7]">
            <img
              src={LEFT_COVER}
              alt="Royal Dream Menu Left Cover"
              loading="eager"
              decoding="async"
              className="w-full h-full object-contain object-right filter brightness-[0.95]"
            />
          </div>
        </div>

        {/* Curtain Right */}
        <div
          style={{ transform: `translateX(${rightX}%)` }}
          className="speakeasy-curtain curtain-right hidden min-[810px]:block absolute top-0 left-1/2 w-1/2 h-screen overflow-hidden z-20 will-change-transform border-l border-[#0d0d0d]/40 shadow-2xl transition-transform duration-75 ease-out bg-[#faebd7]"
        >
          <div className="curtain-image-wrapper w-full h-full overflow-hidden flex items-center justify-start bg-[#faebd7]">
            <img
              src={RIGHT_COVER}
              alt="Royal Dream Menu Right Cover"
              loading="eager"
              decoding="async"
              className="w-full h-full object-contain object-left filter brightness-[0.95]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
