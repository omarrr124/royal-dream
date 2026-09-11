import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';
import { useDownwardEntrance } from '../hooks/useDownwardEntrance';
import AppleCalendarPicker from './ui/apple-calendar-picker';

const BASE_GALLERY_IMAGES = [
  'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/12.jpg',
  'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/13.jpg',
  'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/14.jpg',
  'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/15.jpg',
  'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/16.jpg',
  'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/17.jpg',
  'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/18.jpg',
  'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/19.jpg',
];

// Quadruple images for seamless infinite loop dragging
const INFINITE_GALLERY = [
  ...BASE_GALLERY_IMAGES,
  ...BASE_GALLERY_IMAGES,
  ...BASE_GALLERY_IMAGES,
  ...BASE_GALLERY_IMAGES,
];

export const ReservationSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { ref: headlineRef, shouldAnimate } = useDownwardEntrance(0.15);

  // Mouse Follower Cursor State
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const carouselRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const singleSetWidthRef = useRef<number>(0);

  // Framer motion x position for infinite drag loop
  const x = useMotionValue(0);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    time: '07:30 PM',
    guests: '',
  });

  const handleDateTimeSelect = ({ date, time }: { date: Date; time: string }) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${yyyy}-${mm}-${dd}`;
    setFormData((prev) => ({
      ...prev,
      date: formattedDate,
      time: time,
    }));
  };

  // Calculate single set width for seamless infinite loop wrapping
  const updateSingleSetWidth = useCallback(() => {
    if (innerRef.current) {
      const totalWidth = innerRef.current.scrollWidth;
      singleSetWidthRef.current = totalWidth / 4;
      // Initialize starting position in center loop block to allow bidirectional drag
      if (x.get() === 0 && singleSetWidthRef.current > 0) {
        x.set(-singleSetWidthRef.current);
      }
    }
  }, [x]);

  useEffect(() => {
    updateSingleSetWidth();
    window.addEventListener('resize', updateSingleSetWidth);
    return () => window.removeEventListener('resize', updateSingleSetWidth);
  }, [updateSingleSetWidth]);

  // Step-by-step infinite auto-scroll ("scroll 1 image, stop a bit, scroll next image" infinitely)
  const stepIndexRef = useRef(0);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let animControls: any = null;

    const stepScroll = () => {
      if (!isDragging && singleSetWidthRef.current > 0) {
        const singleWidth = singleSetWidthRef.current;
        const totalImages = BASE_GALLERY_IMAGES.length;
        const stepDistance = singleWidth / totalImages;

        stepIndexRef.current += 1;
        const nextStepIndex = stepIndexRef.current;
        const targetX = -singleWidth - (nextStepIndex * stepDistance);

        animControls = animate(x, targetX, {
          duration: 0.65, // Crisp, smooth, elegant slide (0.65s)
          ease: [0.16, 1, 0.3, 1], // Luxury cubic-bezier curve
          onComplete: () => {
            // Seamless infinite wrap when set completes
            if (nextStepIndex >= totalImages) {
              stepIndexRef.current = 0;
              x.set(-singleWidth);
            }
            // Stop & pause completely for 2.2 seconds on each image
            timeoutId = setTimeout(stepScroll, 2200);
          },
        });
      } else {
        // Retry shortly if user is dragging or measuring
        timeoutId = setTimeout(stepScroll, 1000);
      }
    };

    // Initial pause before first slide
    timeoutId = setTimeout(stepScroll, 2000);

    return () => {
      clearTimeout(timeoutId);
      if (animControls) {
        animControls.stop();
      }
    };
  }, [isDragging, x]);

  // Handle Drag Wrapping during active drag
  const handleDrag = () => {
    const currentX = x.get();
    const singleWidth = singleSetWidthRef.current;
    if (singleWidth > 0) {
      if (currentX < -singleWidth * 2.5) {
        x.set(currentX + singleWidth);
      } else if (currentX > -singleWidth * 0.2) {
        x.set(currentX - singleWidth);
      }
    }
  };

  // Mouse Follower Handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (carouselRef.current) {
      const rect = carouselRef.current.getBoundingClientRect();
      setCursorPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsDragging(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: new Date().toISOString().split('T')[0],
        time: '07:30 PM',
        guests: '',
      });
    }, 300);
  };

  return (
    <section id="reservation" className="relative w-full bg-[#0d0d0d] text-[#faebd7] overflow-hidden">
      {/* 1. Main Hero Banner */}
      <div className="relative w-full min-h-[400px] sm:min-h-[450px] md:min-h-[490px] lg:h-[62vh] lg:max-h-[500px] flex flex-col items-center justify-center overflow-hidden">
        {/* Background Food & Dining Atmosphere Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/4.jpg"
            alt="Book Your Table Ambiance"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover filter brightness-[0.25] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d]/80 via-[#0d0d0d]/60 to-[#0d0d0d]" />
        </div>

        {/* Banner Content Container */}
        <div className="relative z-10 w-full max-w-5xl px-6 py-8 sm:py-10 lg:py-12 flex flex-col items-center text-center space-y-4 sm:space-y-5 perspective-[1000px] my-auto">
          {/* Title Box without border lines with 3D Spring Pop Animation */}
          <div ref={headlineRef} className="w-full flex items-center justify-center overflow-hidden">
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
              <h2 className="font-condensed text-6xl sm:text-8xl md:text-[9.5rem] lg:text-[11.5rem] xl:text-[13rem] uppercase font-normal leading-none tracking-tight text-[#faebd7] select-none whitespace-nowrap">
                BOOK YOUR TABLE
              </h2>
            </motion.div>
          </div>

          {/* Subtitle Description formatted matching media_1788815987601.png */}
          <p className="font-sans text-[13px] sm:text-[14px] md:text-[15px] leading-[1.55] text-[#faebd7]/95 font-normal tracking-tight max-w-[480px] mx-auto text-center">
            Reserve your table now and let us save you a<br className="hidden sm:inline" />{' '}
            spot. Whether it’s a casual hangout or a special<br className="hidden sm:inline" />{' '}
            celebration, we’ve got the perfect table waiting<br className="hidden sm:inline" />{' '}
            for you.
          </p>

          {/* Action Buttons: Web Reservation + WhatsApp VIP */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="group inline-flex items-center justify-center gap-1.5 px-7 py-3 rounded-full border border-[#faebd7] text-[#faebd7] font-sans text-[11px] sm:text-[12px] font-bold uppercase tracking-wider transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#faebd7] hover:text-[#0d0d0d] hover:scale-105 active:scale-95 shadow-xl focus:outline-none cursor-pointer"
            >
              <span>MAKE THE RESERVATION</span>
              <span className="inline-block max-w-0 opacity-0 overflow-hidden whitespace-nowrap transition-all duration-300 ease-out group-hover:max-w-[35px] group-hover:opacity-100 group-hover:ml-1 text-sm">
                ⏲
              </span>
            </button>

            <a
              href="https://wa.me/60123456789?text=Hello%20Royal%20Dream,%20I%20would%20like%20to%20reserve%20a%20VIP%20table"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#25D366] text-[#25D366] bg-[#25D366]/10 hover:bg-[#25D366] hover:text-[#0d0d0d] font-sans text-[11px] sm:text-[12px] font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
            >
              <span>INSTANT WHATSAPP VIP</span>
            </a>
          </div>

          {/* Upfront Guest Information & Logistics Bar */}
          <div className="w-full max-w-3xl pt-6 border-t border-[#faebd7]/15 mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            <div className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#faebd7]/5 border border-[#faebd7]/10">
              <span className="text-base sm:text-lg mb-1">🚗</span>
              <span className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#faebd7]">VALET PARKING</span>
              <span className="font-sans text-[9px] text-[#faebd7]/70 uppercase">AT ENTRANCE</span>
            </div>

            <div className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#faebd7]/5 border border-[#faebd7]/10">
              <span className="text-base sm:text-lg mb-1">🥩</span>
              <span className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#faebd7]">100% HALAL</span>
              <span className="font-sans text-[9px] text-[#faebd7]/70 uppercase">WOOD-FIRED GRILL</span>
            </div>

            <div className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#faebd7]/5 border border-[#faebd7]/10">
              <span className="text-base sm:text-lg mb-1">👔</span>
              <span className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#faebd7]">DRESS CODE</span>
              <span className="font-sans text-[9px] text-[#faebd7]/70 uppercase">SMART CASUAL</span>
            </div>

            <div className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#faebd7]/5 border border-[#faebd7]/10">
              <span className="text-base sm:text-lg mb-1">📍</span>
              <span className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#faebd7]">BUKIT BINTANG</span>
              <span className="font-sans text-[9px] text-[#faebd7]/70 uppercase">KUALA LUMPUR</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Top Border Divider Line above Gallery Row */}
      <div className="w-full h-[2px] bg-[#faebd7]" />

      {/* 3. Draggable Infinite Gallery Carousel with Custom Follower "DRAG" Circle */}
      <div
        ref={carouselRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-full overflow-hidden bg-[#faebd7] py-[4px] sm:py-[6px] cursor-none select-none"
      >
        {/* Custom Follower DRAG Circle Cursor */}
        <motion.div
          animate={{
            x: cursorPos.x - 38,
            y: cursorPos.y - 38,
            scale: isHovered ? (isDragging ? 0.9 : 1) : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{
            type: 'spring',
            damping: 26,
            stiffness: 380,
            mass: 0.25,
          }}
          className="absolute top-0 left-0 z-30 pointer-events-none w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#faebd7] text-[#0d0d0d] shadow-2xl flex items-center justify-center border border-[#0d0d0d]/15 will-change-transform"
        >
          {isDragging ? (
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7 text-[#0d0d0d]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m17 9 4 3-4 3" />
              <path d="M21 12H3" />
              <path d="m7 9-4 3 4 3" />
            </svg>
          ) : (
            <span className="font-condensed text-2xl sm:text-3xl font-bold uppercase tracking-widest select-none text-[#0d0d0d]">
              DRAG
            </span>
          )}
        </motion.div>

        {/* Draggable Motion Track (Infinite Loop) */}
        <motion.div
          ref={innerRef}
          style={{ x }}
          drag="x"
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          onDrag={handleDrag}
          className="flex gap-[4px] sm:gap-[6px] px-[4px] sm:px-[6px] select-none w-max touch-pan-y"
        >
          {INFINITE_GALLERY.map((url, idx) => (
            <div
              key={idx}
              className="relative flex-shrink-0 w-[180px] sm:w-[220px] md:w-[250px] aspect-square overflow-hidden group bg-[#faebd7]"
            >
              <img
                src={url}
                alt={`Royal Dream Gallery ${idx + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover pointer-events-none transition-transform duration-500 group-hover:scale-105 filter brightness-95"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Border Line */}
      <div className="w-full h-[2px] bg-[#faebd7]" />

      {/* 4. Interactive Reservation Modal matching media_1788798915444.png */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetModal}
              className="fixed inset-0 bg-[#0d0d0d] bg-opacity-95 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Stage Container */}
            <motion.div
              initial={{ opacity: 0, y: '100vh' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100vh' }}
              transition={{
                type: 'spring',
                damping: 30,
                stiffness: 240,
                mass: 0.9,
              }}
              className="relative w-full max-w-xl sm:max-w-2xl text-[#faebd7] z-10 my-auto flex flex-col items-center text-center px-4 py-8 sm:py-10"
            >
              {/* Top Centered Close X Button */}
              <button
                onClick={resetModal}
                className="w-10 h-10 rounded-full border border-[#faebd7]/40 text-[#faebd7] flex items-center justify-center hover:border-[#faebd7] hover:bg-[#faebd7]/10 transition-all mb-6 cursor-pointer focus:outline-none"
                aria-label="Close reservation modal"
              >
                <X className="w-4 h-4 text-[#faebd7]" />
              </button>

              {!isSubmitted ? (
                /* Form View */
                <div className="w-full flex flex-col items-center space-y-6">
                  {/* Headline & Subtitle */}
                  <div className="space-y-2 text-center">
                    <h3 className="font-condensed text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase leading-none tracking-normal text-[#faebd7] select-none">
                      BOOK YOUR TABLE
                    </h3>
                    <p className="font-sans text-xs sm:text-sm md:text-base text-[#faebd7]/90 font-normal max-w-md mx-auto">
                      Fill out the form below, and we’ll have your table waiting!
                    </p>
                  </div>

                  {/* Form Grid */}
                  <form onSubmit={handleSubmit} className="w-full space-y-4 pt-2 font-sans">
                    {/* Row 1: Name, Email, Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                      {/* Name */}
                      <div className="text-left">
                        <label className="block text-xs font-normal text-[#faebd7] mb-1.5">
                          Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Jane Smith"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-[#faebd7] text-gray-500 placeholder-gray-400 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-[#faebd7]/50"
                        />
                      </div>

                      {/* Email */}
                      <div className="text-left">
                        <label className="block text-xs font-normal text-[#faebd7] mb-1.5">
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="username@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-[#faebd7] text-gray-500 placeholder-gray-400 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-[#faebd7]/50"
                        />
                      </div>

                      {/* Phone */}
                      <div className="text-left">
                        <label className="block text-xs font-normal text-[#faebd7] mb-1.5">
                          Phone
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="Phone Number"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-[#faebd7] text-gray-500 placeholder-gray-400 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-[#faebd7]/50"
                        />
                      </div>
                    </div>

                    {/* Row 2: Date & Time, People */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {/* Date & Time Combined Input */}
                      <div className="text-left">
                        <label className="block text-xs font-normal text-[#faebd7] mb-1.5">
                          Date & Time
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            readOnly
                            required
                            onClick={() => setIsCalendarOpen((prev) => !prev)}
                            placeholder="Select Date & Time"
                            value={formData.date && formData.time ? `${formData.date}, ${formData.time}` : ''}
                            className="w-full bg-[#faebd7] text-gray-500 placeholder-gray-400 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm font-sans cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#faebd7]/50"
                          />

                          {/* Apple Calendar Picker Modal/Popover appearing directly touching the cream input box */}
                          <AppleCalendarPicker
                            isOpen={isCalendarOpen}
                            onClose={() => setIsCalendarOpen(false)}
                            onDateTimeSelect={handleDateTimeSelect}
                          />
                        </div>
                      </div>

                      {/* People */}
                      <div className="text-left">
                        <label className="block text-xs font-normal text-[#faebd7] mb-1.5">
                          People
                        </label>
                        <select
                          required
                          value={formData.guests}
                          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                          className="w-full bg-[#faebd7] text-gray-500 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-[#faebd7]/50 appearance-none cursor-pointer"
                        >
                          <option value="" className="text-gray-400">Select..</option>
                          <option value="1 Person" className="text-gray-700">1 Person</option>
                          <option value="2 People" className="text-gray-700">2 People</option>
                          <option value="3-4 People" className="text-gray-700">3 - 4 People</option>
                          <option value="5-8 People" className="text-gray-700">5 - 8 People</option>
                          <option value="VIP Table" className="text-gray-700">VIP Table</option>
                        </select>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full mt-6 py-3.5 rounded-full border border-[#faebd7] text-[#faebd7] bg-transparent hover:bg-[#faebd7] hover:text-[#0d0d0d] text-xs sm:text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-lg cursor-pointer"
                    >
                      SUBMIT
                    </button>
                  </form>
                </div>
              ) : (
                /* Success View */
                <div className="py-6 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#faebd7]/20 border border-[#faebd7] text-[#faebd7] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-condensed text-5xl uppercase text-[#faebd7]">
                    RESERVATION CONFIRMED!
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#faebd7]/90 leading-relaxed max-w-xs mx-auto">
                    Thank you, <strong className="text-[#faebd7]">{formData.name || 'Guest'}</strong>. Your table for{' '}
                    <strong className="text-[#faebd7]">{formData.guests || '2 People'}</strong> on{' '}
                    <strong className="text-[#faebd7]">{formData.date}</strong> at{' '}
                    <strong className="text-[#faebd7]">{formData.time || '07:30 PM'}</strong> is reserved.
                  </p>
                  <button
                    onClick={resetModal}
                    className="mt-4 px-8 py-3 rounded-full border border-[#faebd7] text-[#faebd7] font-bold text-xs uppercase tracking-wider hover:bg-[#faebd7] hover:text-[#0d0d0d] transition-all cursor-pointer"
                  >
                    CLOSE WINDOW
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ReservationSection;

