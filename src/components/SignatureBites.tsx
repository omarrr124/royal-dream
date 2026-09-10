import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Container } from './common/Container';
import { useDownwardEntrance } from '../hooks/useDownwardEntrance';

interface SignatureCard {
  id: number;
  title: string;
  arabicTitle: string;
  watermark: string;
  price: string;
  category: string;
  description: string;
  ingredients: string[];
  image: string;
  theme: 'dark' | 'cream';
  rotationDeg: number;
  flipHorizontal?: boolean;
}

const SIGNATURE_CARDS: SignatureCard[] = [
  {
    id: 1,
    title: 'LAMB CHOPS',
    arabicTitle: 'ريش لحم',
    watermark: 'LAMB CHOPS',
    price: 'RM 52',
    category: 'GRILL SELECTION',
    description: 'Grilled lamb ribs served with golden fries and garlic sauce.',
    ingredients: ['Lamb Ribs', 'Golden Fries', 'Garlic Sauce', 'House Seasoning'],
    image: '/cards/lamb_chops.png',
    theme: 'dark',
    rotationDeg: -2,
  },
  {
    id: 2,
    title: 'MIX GRILL',
    arabicTitle: 'مشكل مشاوي',
    watermark: 'MIX GRILL',
    price: 'RM 68',
    category: 'ROYAL SPECIAL',
    description:
      'Lamb Kebab, Shish Tawooq, Lamb Cube, and Chicken Kebab. Served with bread, fries, and garlic sauce.',
    ingredients: ['Lamb Kebab', 'Shish Tawooq', 'Lamb Cube', 'Chicken Kebab'],
    image: '/cards/grill_mix.png',
    theme: 'cream',
    rotationDeg: 3,
    flipHorizontal: true,
  },
  {
    id: 3,
    title: 'MIX GRILL SEAFOOD',
    arabicTitle: 'مشكل بحريات مشوي',
    watermark: 'SEAFOOD GRILL',
    price: 'RM 110',
    category: 'SEAFOOD PLATTER',
    description:
      'Expertly grilled sea bass fish, prawn, calamari seasoned with herbs, Served with fries, and garlic sauce.',
    ingredients: ['Sea Bass', 'Grilled Prawns', 'Calamari', 'Herbal Garlic Dip'],
    image: '/cards/grill_mix_seafood.png',
    theme: 'dark',
    rotationDeg: -2,
  },
  {
    id: 4,
    title: 'ROYAL CHICKEN / LAMB',
    arabicTitle: 'دجاج ملكي / لحم ملكي',
    watermark: 'ROYAL CLAY POT',
    price: 'RM 38 | 54',
    category: 'ROYAL CLAY POT',
    description:
      'Special half chicken (RM 38) or tender lamb (RM 54) baked with spices, nuts, and caramelized onions in a clay pot. Served with vegetable curry and chili sauce.',
    ingredients: ['Clay Pot Rice', 'Saffron & Nuts', 'Caramelized Onions', 'Vegetable Curry'],
    image: '/cards/royal_chicken_lamb.png',
    theme: 'cream',
    rotationDeg: 3,
  },
];

interface BurgerCardItemProps {
  card: SignatureCard;
  index: number;
  totalCards: number;
}

const BurgerCardItem: React.FC<BurgerCardItemProps> = ({ card, index, totalCards }) => {
  const isDark = card.theme === 'dark';
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll-driven scale animation: 0.9 (on entry) -> 1.0 (pinned) -> 0.8 (receding under next card)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const isLast = index === totalCards - 1;

  const cardScale = useTransform(
    scrollYProgress,
    [0, 0.35, 1],
    isLast ? [0.9, 1, 1] : [0.9, 1, 0.8]
  );

  return (
    <div
      ref={containerRef}
      style={{ zIndex: index + 1 }}
      className={`sticky top-0 min-[1200px]:top-[80px] max-[1199px]:relative max-[1199px]:top-auto w-full max-w-[920px] mx-auto burger-card-wrapper ${
        isLast ? 'mb-8 min-[1200px]:mb-12' : 'mb-8 min-[1200px]:mb-[22vh]'
      }`}
    >
      <motion.div
        style={{
          scale: cardScale,
          rotate: `${card.rotationDeg}deg`,
        }}
        className={`burger-card group relative w-full rounded-none overflow-hidden flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.15),0_25px_60px_rgba(0,0,0,0.2)] transition-colors duration-300 ${
          isDark
            ? 'bg-[#0d0d0d] text-[#faebd7] border border-[#faebd7]/20'
            : 'bg-[#faebd7] text-[#0d0d0d] border border-[#0d0d0d]'
        }
        max-[809px]:w-full max-[809px]:max-w-[320px] max-[809px]:mx-auto max-[809px]:h-auto max-[809px]:py-[45px] max-[809px]:px-[18px]
        min-[810px]:max-[1199px]:w-full min-[810px]:max-[1199px]:h-auto min-[810px]:max-[1199px]:py-[65px] min-[810px]:max-[1199px]:px-[32px]
        min-[1200px]:w-[920px] min-[1200px]:max-w-[960px] min-[1200px]:h-[510px] min-[1200px]:min-h-[480px] min-[1200px]:py-[26px] min-[1200px]:px-[32px]
        `}
      >
        {/* Layer 2: Background Watermark Ticker (200px Six Caps, 160px Height, 0.09 Opacity) */}
        <div className="card-watermark-container absolute top-2 left-0 right-0 h-[160px] overflow-hidden pointer-events-none select-none py-2 z-0">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
            className="flex whitespace-nowrap opacity-[0.09]"
          >
            <span className="font-condensed text-[200px] leading-[160px] uppercase pr-10 select-none">
              {card.watermark} / {card.watermark} / {card.watermark} / {card.watermark} /
            </span>
            <span className="font-condensed text-[200px] leading-[160px] uppercase pr-10 select-none">
              {card.watermark} / {card.watermark} / {card.watermark} / {card.watermark} /
            </span>
          </motion.div>
        </div>

        {/* Card Main Grid (Row on Desktop >=1200px, Column on Mobile/Tablet <1200px) */}
        <div className="flex flex-col min-[1200px]:flex-row max-[809px]:gap-[20px] min-[810px]:max-[1199px]:gap-[24px] min-[1200px]:gap-[32px] items-center justify-between relative z-10 h-full">
          {/* Mobile/Tablet Cutout Image Frame (Fixed dimensions, shifted left) */}
          <div className="min-[1200px]:hidden flex items-center justify-center card-image-col max-[809px]:w-[240px] max-[809px]:h-[180px] min-[810px]:w-[320px] min-[810px]:h-[250px] flex-shrink-0 -translate-x-2 min-[810px]:-translate-x-4">
            <img
              src={card.image}
              alt={card.title}
              loading="eager"
              className={`max-h-full max-w-full object-contain transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.45)] ${
                card.flipHorizontal ? 'scale-x-[-1]' : ''
              } ${
                index < 3
                  ? 'scale-[1.2] group-hover:scale-[1.28] group-hover:rotate-[1.5deg]'
                  : 'group-hover:scale-[1.06] group-hover:rotate-[1.5deg]'
              }`}
            />
          </div>

          {/* Left Text Content Column (Max Width 380px) */}
          <div className="w-full min-[1200px]:max-w-[380px] flex flex-col justify-between space-y-4 sm:space-y-5">
            {/* Price Bubble Circle / Pill (48px height, Font Size 14px/15px Bold 700) */}
            <div>
              <div
                className={`h-[48px] min-w-[48px] w-fit px-3.5 rounded-full flex items-center justify-center font-sans text-[14px] min-[1200px]:text-[15px] font-bold tracking-tight shadow-md select-none whitespace-nowrap ${
                  isDark ? 'bg-[#faebd7] text-[#0d0d0d]' : 'bg-[#212121] text-[#faebd7]'
                }`}
              >
                {card.price}
              </div>
            </div>

            {/* Title & Arabic Title (Six Caps: 72px Desktop -> 58px Tablet -> 42px Mobile) */}
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3 flex-wrap">
                <h3 className="font-condensed text-[42px] min-[810px]:text-[58px] min-[1200px]:text-[72px] uppercase tracking-normal leading-[90%] font-normal whitespace-nowrap">
                  {card.title}
                </h3>
                <span className="font-arabic text-lg sm:text-xl min-[1200px]:text-2xl text-[#c5a059] font-medium dir-rtl">
                  {card.arabicTitle}
                </span>
              </div>

              {/* Description (Max Width: 350px, Mobile: 240px | Font Size: 15px Desktop -> 13px Mobile) */}
              <p
                className={`font-sans text-[13px] min-[1200px]:text-[15px] font-normal max-w-[240px] min-[810px]:max-w-[350px] leading-relaxed ${
                  isDark ? 'text-[#faebd7]/85' : 'text-[#0d0d0d]/85'
                }`}
              >
                {card.description}
              </p>
            </div>

            {/* Layer 3: "Book Now" Pill Button Inversion */}
            <div className="pt-1">
              <a
                href="#reservation"
                className={`inline-flex items-center justify-center font-sans text-[11px] font-bold uppercase tracking-[0.15em] border rounded-full px-6 py-2.5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isDark
                    ? 'border-[#faebd7] bg-transparent text-[#faebd7] hover:bg-[#faebd7] hover:text-[#0d0d0d] hover:-translate-y-0.5'
                    : 'border-[#212121] bg-transparent text-[#212121] hover:bg-[#212121] hover:text-[#faebd7] hover:-translate-y-0.5'
                }`}
              >
                BOOK NOW
              </a>
            </div>
          </div>

          {/* Desktop Cutout Image Frame (Fixed dimensions, shifted left) */}
          <div className="hidden min-[1200px]:flex items-center justify-center relative card-image-col min-[1200px]:w-[380px] min-[1200px]:h-[380px] min-[1200px]:max-w-[420px] flex-shrink-0 min-[1200px]:-translate-x-6">
            <img
              src={card.image}
              alt={card.title}
              loading="eager"
              className={`max-h-full max-w-full object-contain transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.55)] ${
                card.flipHorizontal ? 'scale-x-[-1]' : ''
              } ${
                index < 3
                  ? 'scale-[1.25] min-[1200px]:scale-[1.3] group-hover:scale-[1.38] group-hover:rotate-[1.5deg]'
                  : 'group-hover:scale-[1.06] group-hover:rotate-[1.5deg]'
              }`}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const SignatureBites: React.FC = () => {
  const marqueeText = 'THE CHEF SELECTION  /  OUR SIGNATURE DISHES  /  ROYAL FLAVORS  /  BUKIT BINTANG  /  ';
  const { ref: headlineRef, shouldAnimate } = useDownwardEntrance(0.15);

  // Preload all dish cutout PNG images on mount to eliminate image render lag
  useEffect(() => {
    SIGNATURE_CARDS.forEach((card) => {
      const img = new Image();
      img.src = card.image;
    });
  }, []);

  return (
    <section id="chef-selection" className="relative w-full bg-[#faebd7] text-[#0d0d0d] pb-16 md:pb-24">
      {/* Seamless Geometric Pattern Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-10 bg-repeat bg-[length:320px_auto]"
        style={{ backgroundImage: "url('/menu_pattern.jpg')" }}
      />

      <div className="relative z-10">
      {/* A. Top Black Text Marquee Ribbon */}
      <div className="w-full overflow-hidden py-3 bg-[#0d0d0d] text-[#faebd7] border-y border-[#0d0d0d]">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
          className="flex whitespace-nowrap font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.25em]"
        >
          <span>{marqueeText.repeat(4)}</span>
          <span>{marqueeText.repeat(4)}</span>
        </motion.div>
      </div>

      <Container size="xl" className="pt-12 md:pt-16">
        {/* B. Headline Entrance ("OUR SIGNATURE BITES") */}
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto space-y-4 mb-12 md:mb-20">
          <div ref={headlineRef} className="w-full">
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
              <h2 className="font-condensed text-5xl sm:text-7xl md:text-[8.5rem] lg:text-[11.5rem] uppercase font-normal leading-none tracking-tight text-[#0d0d0d] select-none whitespace-nowrap">
                OUR SIGNATURE BITES
              </h2>
            </motion.div>
          </div>

          <p className="font-sans text-xs sm:text-sm md:text-base text-[#0d0d0d]/85 font-normal max-w-md mx-auto leading-relaxed tracking-wide">
            Every dish starts with handpicked, premium-quality meats, perfectly seasoned and wood-fired to juicy perfection. We don’t just settle for the ordinary; our recipes are crafted in-house for that perfect, bold flavor.
          </p>
        </div>

        {/* C. 3-Layer Composite Animation System: Shared Container for Sticky Deck Stacking */}
        <div className="relative w-full max-w-[920px] mx-auto pb-12 min-[810px]:pb-16">
          {SIGNATURE_CARDS.map((card, index) => (
            <BurgerCardItem
              key={card.id}
              card={card}
              index={index}
              totalCards={SIGNATURE_CARDS.length}
            />
          ))}
        </div>
      </Container>
      </div>
    </section>
  );
};
