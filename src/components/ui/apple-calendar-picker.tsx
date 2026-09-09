"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- ICONS (Zero external packages needed, pure inline SVGs) ---
const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6"/>
  </svg>
);
const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);
const DropdownArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

// --- MONTH NAMES ---
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

// --- HELPERS ---
const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

// --- MAIN EXPORTED CALENDAR COMPONENT ---
export const Component = ({ isOpen, onClose, onDateTimeSelect, initialDate }: any) => {
  const today = initialDate ? new Date(initialDate) : new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  
  // Dropdown toggle state
  const [showDropdown, setShowDropdown] = useState(false);

  // Time states
  const [hours, setHours] = useState("07");
  const [minutes, setMinutes] = useState("30");
  const [ampm, setAmpm] = useState("PM");

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayIndex = getFirstDayOfMonth(currentYear, currentMonth);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleSelectDay = (day: number) => {
    setSelectedDay(day);
    triggerSelect(day, hours, minutes, ampm);
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 2) val = val.slice(0, 2);
    const num = parseInt(val);
    if (num > 12) val = "12";
    setHours(val);
    triggerSelect(selectedDay, val, minutes, ampm);
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 2) val = val.slice(0, 2);
    const num = parseInt(val);
    if (num > 59) val = "59";
    setMinutes(val);
    triggerSelect(selectedDay, hours, val, ampm);
  };

  const handleAmpmChange = (newAmpm: string) => {
    setAmpm(newAmpm);
    triggerSelect(selectedDay, hours, minutes, newAmpm);
  };

  const triggerSelect = (day: number, hh: string, mm: string, ampmVal: string) => {
    if (onDateTimeSelect) {
      const formattedDate = new Date(currentYear, currentMonth, day);
      onDateTimeSelect({
        date: formattedDate,
        time: `${hh.padStart(2, '0')}:${mm.padStart(2, '0')} ${ampmVal}`
      });
    }
  };

  // Render calendar grid days
  const renderDays = () => {
    const days = [];
    // Blank cells for alignment
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(<div key={`empty-${i}`} className="w-7 h-7" />);
    }
    // Month days
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = day === selectedDay;
      days.push(
        <button
          key={`day-${day}`}
          type="button"
          onClick={() => handleSelectDay(day)}
          className={`w-7 h-7 text-xs font-medium rounded-full flex items-center justify-center transition-all focus:outline-none relative cursor-pointer ${
            isSelected 
              ? 'bg-[#c5a059] text-white font-semibold shadow-md scale-105 z-10' 
              : 'text-[#faebd7] hover:bg-white/10 dark:hover:bg-white/10'
          }`}
        >
          {day}
        </button>
      );
    }
    return days;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Click outside overlay */}
          <div 
            className="fixed inset-0 z-40 bg-transparent cursor-default"
            onClick={onClose}
          />
          
          {/* Popover Card emerging UP directly touching the input rectangle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 12 }}
            transition={{
              type: 'spring',
              stiffness: 380,
              damping: 24,
              mass: 0.7,
            }}
            style={{ transformOrigin: 'bottom left' }}
            className="absolute bottom-full left-0 mb-0 z-50 w-[250px] sm:w-[265px] bg-[#1C1C1E] border border-white/20 rounded-[20px] shadow-2xl overflow-hidden p-3 text-[#faebd7] transition-colors duration-300"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-2.5">
              {/* Month/Year selector dropdown button */}
              <button 
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-1 text-xs font-semibold text-[#c5a059] hover:opacity-75 transition-opacity focus:outline-none cursor-pointer"
              >
                <span>{MONTH_NAMES[currentMonth]} {currentYear}</span>
                <div className={`transition-transform duration-200 ${showDropdown ? 'rotate-180' : 'rotate-0'}`}>
                  <DropdownArrowIcon />
                </div>
              </button>

              {/* Month Navigations */}
              <div className="flex items-center gap-1">
                <button 
                  type="button"
                  onClick={prevMonth} 
                  className="p-1 text-[#c5a059] hover:bg-white/10 rounded-full transition-colors focus:outline-none cursor-pointer"
                >
                  <ChevronLeftIcon />
                </button>
                <button 
                  type="button"
                  onClick={nextMonth} 
                  className="p-1 text-[#c5a059] hover:bg-white/10 rounded-full transition-colors focus:outline-none cursor-pointer"
                >
                  <ChevronRightIcon />
                </button>
              </div>
            </div>

            {/* Weekdays indicator headers */}
            <div className="grid grid-cols-7 gap-y-1 mb-1 text-center">
              {WEEKDAYS.map((day) => (
                <div key={day} className="text-[9px] font-bold text-gray-400 tracking-wider">
                  {day}
                </div>
              ))}
            </div>

            {/* Days Grid & Dropdown Container */}
            <div className="relative h-[160px] mb-2">
              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-y-0.5 justify-items-center absolute w-full z-10">
                {renderDays()}
              </div>

              {/* Month/Year Selection Dropdown Overlay */}
              {showDropdown && (
                <div className="absolute inset-0 z-30 flex flex-col p-2.5 rounded-[14px] bg-[#1C1C1E]/95 backdrop-blur-md transition-all duration-200 border border-white/10">
                  {/* Year Selector Header */}
                  <div className="flex items-center justify-between mb-2 border-b pb-1.5 border-white/10">
                    <button type="button" onClick={() => setCurrentYear(y => y - 1)} className="p-1 text-[#c5a059] hover:bg-white/10 rounded-full transition-colors">
                      <ChevronLeftIcon />
                    </button>
                    <span className="font-bold text-xs text-white">{currentYear}</span>
                    <button type="button" onClick={() => setCurrentYear(y => y + 1)} className="p-1 text-[#c5a059] hover:bg-white/10 rounded-full transition-colors">
                      <ChevronRightIcon />
                    </button>
                  </div>

                  {/* Month Selection Grid */}
                  <div className="grid grid-cols-3 gap-1 flex-1 overflow-y-auto">
                    {MONTH_NAMES.map((m, idx) => {
                      const isSelected = idx === currentMonth;
                      return (
                        <button
                          key={m}
                          type="button"
                          onClick={() => {
                            setCurrentMonth(idx);
                            setShowDropdown(false);
                          }}
                          className={`py-1 rounded text-[11px] font-bold transition-all ${
                            isSelected
                              ? 'bg-[#c5a059] text-white shadow-sm'
                              : 'text-white hover:bg-white/10'
                          }`}
                        >
                          {m.slice(0, 3)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Time Settings Row */}
            <div className="border-t border-white/10 pt-2.5 flex items-center justify-between">
              <span className="text-xs font-semibold text-white">Time</span>
              
              <div className="flex items-center gap-1.5">
                {/* Time Inputs Wrapper */}
                <div className="flex items-center bg-[#2C2C2E] px-2 py-0.5 rounded-[6px] text-xs font-medium text-white transition-colors duration-300 border border-white/10">
                  <input
                    type="text"
                    value={hours}
                    onChange={handleHourChange}
                    placeholder="00"
                    className="w-4 bg-transparent text-center focus:outline-none font-semibold text-[#faebd7]"
                  />
                  <span className="opacity-70 text-[#faebd7]">:</span>
                  <input
                    type="text"
                    value={minutes}
                    onChange={handleMinuteChange}
                    placeholder="00"
                    className="w-4 bg-transparent text-center focus:outline-none font-semibold text-[#faebd7]"
                  />
                </div>

                {/* AM/PM Segmented Control */}
                <div className="flex bg-[#2C2C2E] p-[2px] rounded-[6px] text-[10px] font-semibold text-white transition-colors duration-300 border border-white/10">
                  <button
                    type="button"
                    onClick={() => handleAmpmChange("AM")}
                    className={`px-1.5 py-0.5 rounded-[4px] transition-all focus:outline-none ${
                      ampm === "AM" 
                        ? 'bg-[#505054] shadow-sm text-white' 
                        : 'opacity-60 hover:opacity-100 text-[#faebd7]'
                    }`}
                  >
                    AM
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAmpmChange("PM")}
                    className={`px-1.5 py-0.5 rounded-[4px] transition-all focus:outline-none ${
                      ampm === "PM" 
                        ? 'bg-[#505054] shadow-sm text-white' 
                        : 'opacity-60 hover:opacity-100 text-[#faebd7]'
                    }`}
                  >
                    PM
                  </button>
                </div>
              </div>
            </div>

            {/* Done / Select CTA */}
            <div className="mt-2.5 pt-2 border-t border-white/10 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-1.5 bg-[#c5a059] text-white font-bold text-[10px] uppercase tracking-wider rounded-lg hover:bg-[#d6af68] transition-all shadow-md cursor-pointer"
              >
                CONFIRM DATE & TIME
              </button>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Component;

