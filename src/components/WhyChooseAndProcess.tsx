import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { WHY_CHOOSE_FUNUN, WORK_STEPS } from '../data/companyData';

export const WhyChooseAndProcess: React.FC = () => {
  return (
    <>
      {/* Section 9: لماذا تختار فنون للديكور؟ */}
      <section
        id="why-funun"
        aria-labelledby="why-funun-heading"
        className="py-20 lg:py-28 bg-[#E9DDC9]/45 text-[#111111] border-b border-[#E9DDC9]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-sm font-display font-bold text-[#C98200]">
              <span>مزايا العمل معنا</span>
              <span aria-hidden="true">·</span>
              <span>FUNUN DECOR</span>
            </div>
            <h2
              id="why-funun-heading"
              className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#111111]"
            >
              {WHY_CHOOSE_FUNUN.title}
            </h2>
            <p className="font-body text-base sm:text-xl text-[#111111]/80 leading-relaxed">
              {WHY_CHOOSE_FUNUN.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE_FUNUN.items.map((item) => (
              <article
                key={item.number}
                className="bg-[#F7F3EA] rounded-2xl p-6 sm:p-7 border border-[#E9DDC9] hover:border-[#C98200] transition-colors flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <span className="inline-block font-display font-extrabold text-sm text-[#C98200] tracking-wider tabular-nums">
                    {item.number}. نقطة قوة
                  </span>
                  <h3 className="font-display font-bold text-xl text-[#111111]">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm sm:text-base text-[#77736C] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 10: قسم خطوات العمل */}
      <section
        id="process"
        aria-labelledby="process-heading"
        className="py-20 lg:py-28 bg-[#111111] text-[#F7F3EA] border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/10">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2 text-sm font-display font-bold text-[#F5A900]">
                <span>رحلة تنفيذ المشروع</span>
                <span aria-hidden="true">·</span>
                <span>من الفكرة حتى التسليم</span>
              </div>
              <h2
                id="process-heading"
                className="font-display font-extrabold text-3xl sm:text-4xl text-[#F7F3EA]"
              >
                خطوات العمل في فنون للديكور
              </h2>
              <p className="font-body text-base sm:text-lg text-[#E9DDC9]/80">
                منهجية واضحة ومنظمة تضمن تحويل رؤيتك إلى واقع ملموس بأعلى درجات الدقة والاحترافية.
              </p>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#F5A900] hover:bg-[#C98200] text-[#080808] font-display font-bold text-sm transition-colors whitespace-nowrap shrink-0 w-fit"
            >
              <span>ابدأ الخطوة الأولى الآن</span>
              <ArrowLeft className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WORK_STEPS.map((stepItem) => (
              <div
                key={stepItem.step}
                className="relative bg-[#080808] rounded-2xl p-6 sm:p-7 border border-white/10 hover:border-[#F5A900]/50 transition-colors space-y-3"
              >
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="font-display font-extrabold text-2xl text-[#F5A900] tabular-nums">
                    {stepItem.step}
                  </span>
                  <span className="text-xs text-[#E9DDC9]/60 font-display">
                    المرحلة {stepItem.step} من 06
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-[#F7F3EA] pt-1">
                  {stepItem.title}
                </h3>
                <p className="font-body text-sm sm:text-base text-[#E9DDC9]/80 leading-relaxed">
                  {stepItem.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
