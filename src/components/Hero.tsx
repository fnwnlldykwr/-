import React, { useState } from 'react';
import { ArrowLeft, PhoneCall } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

const HERO_SLIDES = [
  {
    image: '/assets/aistudio/IMG-20261118-WA0022_1e5c04f1.jpg',
    caption: 'تصميم وتنفيذ مداخل عصرية ببديل الخشب والمرايا الطولية والإضاءة المخفية',
  },
  {
    image: '/src/assets/images/hero_luxury_interior_funun_1795053975616.jpg',
    caption: 'تصميم وتنفيذ المجالس والصالات الفاخرة ببديل الرخام والخشب والأسقف الجبسية',
  },
  {
    image: '/assets/aistudio/IMG-20261118-WA0032_f1d6d46a.jpg',
    caption: 'جداريات ثلاثية الأبعاد وتكسيات الرخام والخشب الفاخرة',
  },
  {
    image: '/assets/aistudio/IMG-20261118-WA0030_d75ac8cd.jpg',
    caption: 'مداخل رئيسية ببديل الرخام والخشب والمرايا والأسقف الجبسية',
  },
  {
    image: '/assets/aistudio/IMG-20261118-WA0004_bb69c056.jpg',
    caption: 'شاشات تلفزيون جدارية منحنية بإضاءة مخفية',
  },
];

export const Hero: React.FC = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const currentSlide = HERO_SLIDES[activeSlideIndex];

  return (
    <section
      id="home"
      aria-label="الواجهة الرئيسية - فنون للديكور"
      className="relative min-h-[92vh] pt-24 pb-16 flex items-center bg-[#080808] text-[#F7F3EA] overflow-hidden"
    >
      {/* Background High-Resolution Luxury Interior Photo with Balanced Multi-Layer Luxury Shading (تظليل) */}
      <div className="absolute inset-0 z-0">
        <img
          src={currentSlide.image}
          alt={currentSlide.caption}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center brightness-[0.98] contrast-[1.04] transition-all duration-500"
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Right Column (Main Hero Typography & CTAs) */}
          <div className="lg:col-span-8 space-y-6">
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

          {/* Left Column: Interactive Showcase Switcher of Real Company Works */}
          <div className="lg:col-span-4">
            <div className="bg-[#080808]/90 backdrop-blur-md border border-[#F5A900]/30 rounded-2xl p-4 sm:p-5 space-y-4 shadow-[0_24px_60px_rgba(0,0,0,0.85)]">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 shadow-inner">
                <img
                  src={currentSlide.image}
                  alt={currentSlide.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/95 via-[#080808]/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3.5">
                  <p className="text-xs text-[#F5A900] font-display font-semibold">
                    من أعمال فنون للديكور
                  </p>
                  <p className="text-sm font-display font-bold text-[#F7F3EA] mt-0.5 drop-shadow-md">
                    {currentSlide.caption}
                  </p>
                </div>
              </div>

              {/* Thumbnail Selector Buttons */}
              <div className="grid grid-cols-5 gap-2" role="tablist" aria-label="نماذج من أعمالنا في الواجهة">
                {HERO_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.image}
                    type="button"
                    role="tab"
                    aria-selected={idx === activeSlideIndex}
                    aria-label={`عرض صورة: ${slide.caption}`}
                    onClick={() => setActiveSlideIndex(idx)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      idx === activeSlideIndex
                        ? 'border-[#F5A900] scale-102'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={slide.image}
                      alt={slide.caption}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
