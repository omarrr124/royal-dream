import React from 'react';
import { motion } from 'framer-motion';
import { useDownwardEntrance } from '../hooks/useDownwardEntrance';

const MARQUEE_IMAGES = [
  'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/10.jpg',
  'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/11.jpg',
  'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/12.jpg',
  'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/13.jpg',
  'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/14.jpg',
  'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/15.jpg',
  'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/16.jpg',
  'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/17.jpg',
  'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/18.jpg',
  'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/19.jpg',
  'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/20.jpg',
  'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/21.jpg',
  'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/22.jpg',
  'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/23.jpg',
  'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/24.jpg',
  'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/25.jpg',
  'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/26.jpg',
  'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/27.jpg',
  'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/4.jpg',
  'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/6.jpg',
  'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/7.jpg',
  'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/9.jpg',
];

interface IntroductionProps {
  onOpenAbout?: () => void;
}

export const Introduction: React.FC<IntroductionProps> = ({ onOpenAbout }) => {
  const marqueeList = [...MARQUEE_IMAGES, ...MARQUEE_IMAGES];
  const { ref: headlineRef, shouldAnimate } = useDownwardEntrance(0.15);

  // Preload marquee images in parallel on mount
  React.useEffect(() => {
    MARQUEE_IMAGES.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  return (
    <section
      id="about"
      className="relative w-full min-h-screen flex flex-col justify-center bg-[#faebd7] text-[#0d0d0d] py-6 sm:py-10 lg:py-8 overflow-hidden perspective-[1000px]"
    >
      {/* Seamless Geometric Pattern Background Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-20 mix-blend-multiply bg-repeat bg-[length:320px_auto]"
        style={{ backgroundImage: "url('/menu_pattern.jpg')" }}
      />

      <div className="relative z-10 w-full flex flex-col items-center text-center space-y-4 sm:space-y-5 my-auto">
        {/* 1. 3D Perspective Spring Entrance Headline (Animates ONLY on downward scroll, ZERO animation on upward scroll) */}
        <div ref={headlineRef} className="w-full px-2">
          <motion.div
            initial={false}
            animate={shouldAnimate ? { y: 0, scale: 1, rotateX: 0, opacity: 1 } : { y: 120, scale: 0.8, rotateX: 20, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 65,
              damping: 18,
              mass: 1.4,
            }}
          >
            <h2 className="font-condensed text-5xl sm:text-7xl md:text-[8.5rem] lg:text-[11rem] xl:text-[13rem] uppercase font-normal leading-none tracking-tight text-[#0d0d0d] select-none whitespace-nowrap">
              BORN TO BE ROYAL
            </h2>
          </motion.div>
        </div>

        {/* 2. Continuous "Ticket" Photo Marquee */}
        <div className="w-full overflow-hidden py-2 border-y border-[#0d0d0d]/10 bg-[#0d0d0d]/5">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 65,
              ease: 'linear',
              repeat: Infinity,
            }}
            className="flex items-center gap-3 sm:gap-4 w-max"
          >
            {marqueeList.map((imgUrl, index) => (
              <div
                key={index}
                className="relative flex-shrink-0 w-28 sm:w-36 md:w-40 lg:w-44 aspect-[3/4] overflow-hidden rounded-md bg-[#0d0d0d]/10 border border-[#0d0d0d]/15 shadow-md group"
              >
                <img
                  src={imgUrl}
                  alt={`Royal Dream Marquee ${index + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-[#0d0d0d]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* 3. Centered Story Paragraph & CTA */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl mx-auto px-6 text-center space-y-4 pt-1"
        >
          <p className="font-sans text-xs sm:text-sm md:text-base text-[#0d0d0d]/85 font-normal leading-relaxed tracking-wide">
            We started with a passion for royal heritage and a dream: to bring authentic, elevated Arabic dining to Kuala Lumpur. No shortcuts, no compromises—just good food, great vibes, and even better company.
          </p>

          <div className="pt-1">
            <a
              href="/about"
              onClick={(e) => {
                if (onOpenAbout) {
                  e.preventDefault();
                  onOpenAbout();
                }
              }}
              className="inline-flex items-center justify-center font-sans text-xs font-bold uppercase tracking-[0.1em] text-[#0d0d0d] bg-transparent border border-[#0d0d0d] rounded-[50px] px-7 py-3 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#0d0d0d] hover:text-[#faebd7] hover:-translate-y-0.5 active:scale-95 focus:outline-none cursor-pointer"
            >
              READ OUR STORY
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
