import React from 'react';
import { ArrowLeft, PhoneCall } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

const HERO_IMAGE = {
  image: '/assets/aistudio/1795207415241_effe83c8.jpg',
  caption:
    'مقر ومعرض شركة فنون للديكور في عدن – بديل الرخام والخشب، ساعات 3D، باركيه SPC، وأسقف جبسية حديثة',
};

export const Hero: React.FC = () => {
  return (
    <section
      id="home"
      aria-label="الواجهة الرئيسية - فنون للديكور"
      className="relative min-h-[92vh] pt-24 pb-16 flex items-center bg-[#080808] text-[#F7F3EA] overflow-hidden"
    >
      {/* Background High-Resolution Luxury Interior Photo with Balanced Multi-Layer Luxury Shading (تظليل) */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE.image}
          alt={HERO_IMAGE.caption}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-[center_42%] brightness-[0.98] contrast-[1.04] transition-all duration-500"
        />
        {/* Uniform dark luxury base tint */}
        <div
          className="absolute inset-0 bg-[#080808]/12"
          aria-hidden="true"
        />
        {/* Directional RTL gradient shading for maximum Arabic text clarity */}
        <div
          className="absolute inset-0 bg-gradient-to-l from-[#080808]/75 via-[#080808]/50 to-[#080808]/18"
          aria-hidden="true"
        />
        {/* Top and bottom cinematic vignette shading */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#080808]/85 via-transparent to-[#080808]/50 shadow-[inset_0_0_85px_rgba(8,8,8,0.65)]"
          aria-hidden="true"
        />
      </div>

      {/* Subtle Golden Architectural Frame Accent */}
      <div
        className="pointer-events-none absolute inset-x-4 sm:inset-x-8 top-24 bottom-6 border border-[#F5A900]/20 rounded-2xl z-10 hidden sm:block shadow-[inset_0_0_60px_rgba(0,0,0,0.6)]"
        aria-hidden="true"
      />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10 lg:py-16">
        <div className="max-w-3xl space-y-6">
          {/* Mandatory Literal Location Line Before Main Title */}
          <div className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-[#F5A900] border-b border-[#F5A900]/40 pb-1.5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            <span>{COMPANY_INFO.heroBadgeLocation}</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[3.5rem] text-[#F7F3EA] leading-[1.22] tracking-tight max-w-3xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
            نصنع من المساحات العادية{' '}
            <span className="text-[#F5A900]">عالماً من الجمال والفخامة.</span>
          </h1>

          {/* Subtitle */}
          <p className="font-body text-base sm:text-xl text-[#E9DDC9] leading-relaxed max-w-2xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
            {COMPANY_INFO.heroSubtitle}
          </p>

          {/* Primary & Secondary Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
            <a
              href="#portfolio"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-[#F5A900] hover:bg-[#C98200] text-[#080808] font-display font-bold text-base transition-all duration-150 shadow-[0_10px_30px_rgba(245,169,0,0.25)] hover:-translate-y-0.5 whitespace-nowrap shrink-0"
            >
              <span>استكشف أعمالنا</span>
              <ArrowLeft className="w-5 h-5" />
            </a>

            <a
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-[#080808]/60 hover:bg-[#080808]/80 text-[#F7F3EA] border border-[#F5A900]/50 hover:border-[#F5A900] font-display font-bold text-base transition-all duration-150 shadow-lg whitespace-nowrap shrink-0"
            >
              <PhoneCall className="w-5 h-5 text-[#F5A900]" />
              <span>تواصل معنا الآن</span>
            </a>
          </div>

          {/* Clean Unboxed Scope Metadata with Typographic Separators */}
          <div className="pt-6 border-t border-white/15 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs sm:text-sm text-[#E9DDC9]/90">
            <span>الديكورات الداخلية والخارجية</span>
            <span aria-hidden="true" className="text-[#F5A900]">·</span>
            <span>ديكور المنازل والمحلات التجارية</span>
            <span aria-hidden="true" className="text-[#F5A900]">·</span>
            <span>التصاميم والخدمات الهندسية</span>
            <span aria-hidden="true" className="text-[#F5A900]">·</span>
            <span>المقاولات العامة والتشطيبات الحديثة</span>
          </div>
        </div>
      </div>
    </section>
  );
};
