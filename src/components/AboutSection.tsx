import React from 'react';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

const CORE_PILLARS = [
  'الديكورات الداخلية والخارجية للمنازل والمحلات التجارية',
  'التصاميم والخدمات الهندسية المدروسة قبل التنفيذ',
  'المقاولات العامة والتشطيبات الحديثة بأجود الخامات',
  'الاهتمام بأدق التفاصيل من التأسيس وحتى التسليم النهائي',
];

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-20 lg:py-28 bg-[#F7F3EA] text-[#111111] border-b border-[#E9DDC9]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Right Column: Official About Text & Core Scope */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="flex items-center gap-2 text-sm font-display font-bold text-[#C98200]">
              <span>من نحن</span>
              <span aria-hidden="true">·</span>
              <span>FUNUN DECOR</span>
            </div>

            <h2
              id="about-heading"
              className="font-display font-extrabold text-2xl sm:text-4xl text-[#111111] leading-snug"
            >
              {COMPANY_INFO.aboutTitle}
            </h2>

            <div className="space-y-4 font-body text-base sm:text-lg text-[#111111]/85 leading-relaxed">
              {COMPANY_INFO.aboutParagraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Key Pillars List */}
            <div className="pt-4 border-t border-[#E9DDC9] grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {CORE_PILLARS.map((pillar, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#C98200] shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base font-medium text-[#111111]">
                    {pillar}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#services"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#111111] hover:bg-[#080808] text-[#F7F3EA] font-display font-bold text-sm transition-colors whitespace-nowrap shrink-0"
              >
                <span>تعرّف على خدماتنا الكاملة</span>
                <ArrowLeft className="w-4 h-4 text-[#F5A900]" />
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-[#111111]/20 hover:border-[#C98200] text-[#111111] hover:text-[#C98200] font-display font-bold text-sm transition-colors whitespace-nowrap shrink-0"
              >
                <span>مشاهدة معرض الأعمال</span>
              </a>
            </div>
          </div>

          {/* Left Column: Authentic Portfolio Visual Composition */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <div className="relative rounded-2xl overflow-hidden border border-[#E9DDC9] bg-[#111111] aspect-[4/3] lg:h-full">
              <img
                src={COMPANY_INFO.aboutImages.main}
                alt="تصميم وتنفيذ مدخل داخلي فاخر ببديل الرخام والخشب والمرايا - فنون للديكور"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#080808]/90 via-[#080808]/50 to-transparent p-5 text-[#F7F3EA]">
                <p className="text-xs text-[#F5A900] font-display font-semibold">
                  فنون للديكور · عدن، شارع الخمسين
                </p>
                <p className="text-base font-display font-bold mt-1">
                  تكامل التصميم الهندسي مع جودة التنفيذ والتشطيبات الحديثة
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
