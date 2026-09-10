import { useState } from 'react';
import { FaLinkedinIn, FaTwitter, FaBehance, FaInstagram } from 'react-icons/fa';
import { cn } from '../../lib/utils';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    behance?: string;
  };
}

const DEFAULT_MEMBERS: TeamMember[] = [
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

interface TeamShowcaseProps {
  members?: TeamMember[];
}

export default function TeamShowcase({ members = DEFAULT_MEMBERS }: TeamShowcaseProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const col1 = members.filter((_, i) => i % 3 === 0);
  const col2 = members.filter((_, i) => i % 3 === 1);
  const col3 = members.filter((_, i) => i % 3 === 2);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16 select-none w-full max-w-4xl mx-auto py-8 px-4 md:px-6 font-sans">
      {/* ── Left: photo grid (Centered unit) ── */}
      <div className="flex gap-2 md:gap-3 flex-shrink-0 overflow-x-auto pb-1 md:pb-0 mx-auto md:mx-0 justify-center items-center">
        {/* Column 1 */}
        <div className="flex flex-col gap-2 md:gap-3">
          {col1.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[110px] h-[120px] sm:w-[130px] sm:h-[140px] md:w-[155px] md:h-[165px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-2 md:gap-3 mt-[48px] sm:mt-[56px] md:mt-[68px]">
          {col2.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[122px] h-[132px] sm:w-[145px] sm:h-[155px] md:w-[172px] md:h-[182px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-2 md:gap-3 mt-[22px] sm:mt-[26px] md:mt-[32px]">
          {col3.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[115px] h-[125px] sm:w-[136px] sm:h-[146px] md:w-[162px] md:h-[172px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>
      </div>

      {/* ── Right: member name list (Centered flex block alongside grid) ── */}
      <div className="flex flex-col sm:grid sm:grid-cols-2 md:flex md:flex-col gap-4 md:gap-5 pt-0 md:pt-2 w-full md:w-auto shrink-0 justify-center">
        {members.map((member) => (
          <MemberRow
            key={member.id}
            member={member}
            hoveredId={hoveredId}
            onHover={setHoveredId}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Photo card 
───────────────────────────────────────── */

function PhotoCard({
  member,
  className,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  className: string;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl cursor-pointer flex-shrink-0 transition-opacity duration-400 border border-[#faebd7]/10 hover:border-[#faebd7]/40 shadow-md',
        className,
        isDimmed ? 'opacity-50' : 'opacity-100',
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover transition-[filter] duration-500"
        style={{
          filter: isActive ? 'grayscale(0) brightness(1)' : 'grayscale(1) brightness(0.77)',
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────
   Member name section
───────────────────────────────────────── */

function MemberRow({
  member,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;
  const hasSocial =
    member.social?.twitter ??
    member.social?.linkedin ??
    member.social?.instagram ??
    member.social?.behance;

  return (
    <div
      className={cn(
        'cursor-pointer transition-opacity duration-300',
        isDimmed ? 'opacity-40' : 'opacity-100',
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Name + social*/}
      <div className="flex items-center gap-2.5">
        <span
          className={cn(
            'w-4 h-3 rounded-[5px] flex-shrink-0 transition-all duration-300',
            isActive ? 'bg-[#faebd7] w-5' : 'bg-[#faebd7]/30',
          )}
        />
        <span
          className={cn(
            'text-lg md:text-[20px] font-semibold leading-none tracking-tight transition-colors duration-300 font-sans',
            isActive ? 'text-[#faebd7]' : 'text-[#faebd7]/80',
          )}
        >
          {member.name}
        </span>

        {/* Social icons */}
        {hasSocial && (
          <div
            className={cn(
              'flex items-center gap-1.5 ml-0.5 transition-all duration-200',
              isActive
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-2 pointer-events-none',
            )}
          >
            {member.social?.twitter && (
              <a
                href={member.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded text-[#faebd7]/60 hover:text-[#faebd7] hover:bg-[#faebd7]/10 transition-all duration-150 hover:scale-110"
                title="X / Twitter"
              >
                <FaTwitter size={12} />
              </a>
            )}
            {member.social?.linkedin && (
              <a
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded text-[#faebd7]/60 hover:text-[#faebd7] hover:bg-[#faebd7]/10 transition-all duration-150 hover:scale-110"
                title="LinkedIn"
              >
                <FaLinkedinIn size={12} />
              </a>
            )}
            {member.social?.instagram && (
              <a
                href={member.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded text-[#faebd7]/60 hover:text-[#faebd7] hover:bg-[#faebd7]/10 transition-all duration-150 hover:scale-110"
                title="Instagram"
              >
                <FaInstagram size={12} />
              </a>
            )}
            {member.social?.behance && (
              <a
                href={member.social.behance}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded text-[#faebd7]/60 hover:text-[#faebd7] hover:bg-[#faebd7]/10 transition-all duration-150 hover:scale-110"
                title="Behance"
              >
                <FaBehance size={12} />
              </a>
            )}
          </div>
        )}
      </div>

      {/* Role */}
      <p className="mt-1.5 pl-[27px] text-[8px] md:text-[10.5px] font-medium uppercase tracking-[0.2em] text-[#faebd7]/60">
        {member.role}
      </p>
    </div>
  );
}
