import React from 'react';
import { motion } from 'framer-motion';

export interface MarqueeBarProps {
  items?: string[];
  theme?: 'dark' | 'cream';
  speed?: number;
}

const DEFAULT_RESERVATION_ITEMS = [
  'BOOK YOUR TABLE',
  'RESERVE A SPOT',
  'SPECIAL CELEBRATIONS',
  'VIP PRIVATE DINING',
  'BUKIT BINTANG CONCIERGE',
  'ROYAL DINING EXPERIENCE',
];

export const MENU_MARQUEE_ITEMS = [
  'OUR SIGNATURE DISHES',
  'ROYAL FLAVORS',
  'BUKIT BINTANG',
  'THE CHEF SELECTION',
  'AUTHENTIC MIDDLE EASTERN CUISINE',
  'LUXURY SEAFOOD & GRILL',
];

export const MarqueeBar: React.FC<MarqueeBarProps> = ({
  items = DEFAULT_RESERVATION_ITEMS,
  theme = 'cream',
  speed = 25,
}) => {
  const marqueeItems = [...items, ...items, ...items, ...items];
  const isDark = theme === 'dark';

  return (
    <div
      className={`relative w-full py-2.5 sm:py-3 overflow-hidden border-y select-none ${
        isDark
          ? 'bg-[#0d0d0d] text-[#faebd7] border-[#faebd7]/15'
          : 'bg-[#faebd7] text-[#0d0d0d] border-[#0d0d0d]/10'
      }`}
    >
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: speed,
          ease: 'linear',
          repeat: Infinity,
        }}
        className="flex items-center whitespace-nowrap gap-5 sm:gap-7 w-max"
      >
        {marqueeItems.map((text, idx) => (
          <React.Fragment key={idx}>
            <span
              className={`font-sans text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.2em] ${
                isDark ? 'text-[#faebd7]' : 'text-[#0d0d0d]'
              }`}
            >
              {text}
            </span>
            <span
              className={`font-sans text-[11px] sm:text-xs font-light select-none ${
                isDark ? 'text-[#faebd7]' : 'text-[#0d0d0d]/60'
              }`}
            >
              /
            </span>
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeBar;
