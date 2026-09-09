import React from 'react';

export const Footer: React.FC = () => {
  const animatedLinkClass =
    "group relative inline-flex items-center gap-1 text-[#faebd7] py-0.5 transition-colors duration-300 hover:text-white cursor-pointer";
  
  const underlineSpan = (
    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#faebd7] transition-all duration-300 ease-out group-hover:w-full group-active:w-full" />
  );

  return (
    <footer id="footer" className="relative w-full min-h-screen bg-[#0d0d0d] text-[#faebd7] px-6 sm:px-12 lg:px-16 py-8 sm:py-10 lg:py-12 flex flex-col justify-between items-center border-t border-[#faebd7]/30 overflow-hidden select-none">
      {/* Background Subtle Ambiance Gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#0d0d0d] via-[#121215]/40 to-[#0d0d0d]" />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[1200px] flex flex-col items-center text-center space-y-6 sm:space-y-8 md:space-y-10 my-auto">
        {/* 1. Monumental Headline & Editorial Copy */}
        <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4 w-full">
          <h2 className="font-condensed text-4xl sm:text-6xl md:text-[7rem] lg:text-[8.5rem] xl:text-[9.5rem] uppercase font-normal leading-none tracking-[0.02em] text-[#faebd7] select-none whitespace-nowrap">
            GET IN TOUCH
          </h2>

          {/* 4-Line Intro Text Layout */}
          <p className="font-sans text-[12px] sm:text-[13.5px] md:text-[14.5px] leading-[1.65] text-[#faebd7]/90 font-normal tracking-wide max-w-[480px] mx-auto text-center">
            Got questions, feedback, or just want to say hi?<br className="hidden sm:inline" />{' '}
            We’d love to hear from you! Whether it’s about<br className="hidden sm:inline" />{' '}
            our menu, location, or anything else, don’t<br className="hidden sm:inline" />{' '}
            hesitate to reach out.
          </p>
        </div>

        {/* 2. 3-Column Editorial Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10 md:gap-12 lg:gap-20 w-full max-w-[1100px] text-center pt-2 sm:pt-4 items-start">
          {/* Column 1: Contacts */}
          <div className="flex flex-col items-center justify-start space-y-3 sm:space-y-4 h-full">
            <h3 className="font-condensed text-2xl sm:text-3xl lg:text-4xl uppercase leading-none text-[#faebd7] tracking-[0.1em] font-normal">
              CONTACTS
            </h3>
            <div className="flex flex-col items-center space-y-2 font-sans text-xs sm:text-[13px] md:text-[13.5px] leading-relaxed text-[#faebd7]/90 tracking-wide">
              <p>
                <a
                  href="https://maps.app.goo.gl/LQtxKWH1BFBsQ9e57"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={animatedLinkClass}
                >
                  <span>Kuala Lumpur, Malaysia</span>
                  <span className="text-[10px]">↗</span>
                  {underlineSpan}
                </a>
              </p>
              <p>
                <a
                  href="tel:+601111101052"
                  className={animatedLinkClass}
                >
                  <span>+60 11-1110 1052</span>
                  {underlineSpan}
                </a>
              </p>
            </div>
          </div>

          {/* Column 2: Opening Hours */}
          <div className="flex flex-col items-center justify-start space-y-3 sm:space-y-4 h-full">
            <h3 className="font-condensed text-2xl sm:text-3xl lg:text-4xl uppercase leading-none text-[#faebd7] tracking-[0.1em] font-normal">
              OPENING HOURS
            </h3>
            <div className="flex flex-col items-center space-y-2 font-sans text-xs sm:text-[13px] md:text-[13.5px] leading-relaxed text-[#faebd7]/90 tracking-wide">
              <p className="font-medium text-[#faebd7]">Monday – Sunday</p>
              <p className="text-[#faebd7]/80">11:00 AM – 5:00 AM</p>
            </div>
          </div>

          {/* Column 3: Social */}
          <div className="flex flex-col items-center justify-start space-y-3 sm:space-y-4 h-full">
            <h3 className="font-condensed text-2xl sm:text-3xl lg:text-4xl uppercase leading-none text-[#faebd7] tracking-[0.1em] font-normal">
              SOCIAL
            </h3>
            <div className="flex flex-col items-center space-y-2 font-sans text-xs sm:text-[13px] md:text-[13.5px] leading-relaxed text-[#faebd7]/90 tracking-wide">
              <p>
                <a
                  href="https://www.instagram.com/royaldream_official?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className={animatedLinkClass}
                >
                  <span>Instagram</span>
                  <span className="text-[10px]">↗</span>
                  {underlineSpan}
                </a>
              </p>
              <p>
                <a
                  href="https://www.tiktok.com/@royaldream_official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={animatedLinkClass}
                >
                  <span>TikTok</span>
                  <span className="text-[10px]">↗</span>
                  {underlineSpan}
                </a>
              </p>
              <p>
                <a
                  href="https://www.facebook.com/dreamrestaurantt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={animatedLinkClass}
                >
                  <span>Facebook</span>
                  <span className="text-[10px]">↗</span>
                  {underlineSpan}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Full-Width Edge-to-Edge Bottom Legal Bar */}
      <div className="relative z-10 w-full px-4 sm:px-12 lg:px-16 pt-5 sm:pt-6 border-t border-[#faebd7]/15 flex justify-center items-center font-sans text-[11px] sm:text-[12px] text-[#faebd7]/50 tracking-widest uppercase text-center">
        <p>® 2025 Royal Dream Restaurant. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
