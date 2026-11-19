import React, { useState, useEffect, useCallback } from 'react';
import {
  Maximize2,
  X,
  ChevronRight,
  ChevronLeft,
  MessageCircle,
} from 'lucide-react';
import {
  COMPANY_INFO,
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_ITEMS,
  PortfolioCategoryId,
  PortfolioItem,
} from '../data/companyData';

interface PortfolioSectionProps {
  activeCategory: PortfolioCategoryId;
  onCategoryChange: (category: PortfolioCategoryId) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  activeCategory,
  onCategoryChange,
}) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems: PortfolioItem[] = PORTFOLIO_ITEMS.filter((item) => {
    if (activeCategory === 'all') return true;
    return (
      item.category === activeCategory ||
      item.secondaryCategories?.includes(activeCategory)
    );
  });

  const handlePrev = useCallback(() => {
    if (lightboxIndex === null || filteredItems.length === 0) return;
    setLightboxIndex(
      (lightboxIndex - 1 + filteredItems.length) % filteredItems.length
    );
  }, [lightboxIndex, filteredItems.length]);

  const handleNext = useCallback(() => {
    if (lightboxIndex === null || filteredItems.length === 0) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  }, [lightboxIndex, filteredItems.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') handlePrev();
      if (e.key === 'ArrowLeft') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, handlePrev, handleNext]);

  const activeLightboxItem =
    lightboxIndex !== null && filteredItems[lightboxIndex]
      ? filteredItems[lightboxIndex]
      : null;

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="py-20 lg:py-28 bg-[#080808] text-[#F7F3EA]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-sm font-display font-bold text-[#F5A900]">
              <span>معرض أعمالنا</span>
              <span aria-hidden="true">·</span>
              <span>نماذج حقيقية من مشاريعنا وتصاميمنا</span>
            </div>
            <h2
              id="portfolio-heading"
              className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#F7F3EA]"
            >
              أعمال تتحدث عن فنون التفاصيل.
            </h2>
            <p className="font-body text-base sm:text-lg text-[#E9DDC9]/85 leading-relaxed">
              اكتشف مجموعة من أعمالنا في التصميم والتنفيذ، وشاهد كيف تتحول الأفكار إلى مساحات تنبض بالجمال والأناقة.
            </p>
          </div>

          <div className="text-xs sm:text-sm text-[#E9DDC9]/75 font-body">
            <span>إجمالي الأعمال المعروضة في هذا القسم: </span>
            <strong className="text-[#F5A900] font-display tabular-nums">
              {filteredItems.length}
            </strong>
          </div>
        </div>

        {/* Interactive Filter Tabs */}
        <div
          className="flex flex-wrap items-center gap-2 bg-[#111111] p-2 rounded-xl border border-white/10"
          role="tablist"
          aria-label="تصفية معرض الأعمال حسب التصنيف"
        >
          {PORTFOLIO_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count =
              cat.id === 'all'
                ? PORTFOLIO_ITEMS.length
                : PORTFOLIO_ITEMS.filter(
                    (i) =>
                      i.category === cat.id ||
                      i.secondaryCategories?.includes(cat.id)
                  ).length;

            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setLightboxIndex(null);
                  onCategoryChange(cat.id);
                }}
                className={`px-4 py-2.5 rounded-lg font-display font-bold text-xs sm:text-sm transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#F5A900] text-[#080808]'
                    : 'text-[#E9DDC9] hover:text-[#F5A900] hover:bg-white/5'
                }`}
              >
                <span>{cat.label}</span>
                <span className="mr-1.5 opacity-75 tabular-nums">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <article
              key={item.id}
              className="group relative rounded-2xl overflow-hidden bg-[#111111] border border-white/10 hover:border-[#F5A900]/60 transition-all duration-200 flex flex-col justify-between"
            >
              {/* Clickable Image Trigger for Lightbox */}
              <button
                type="button"
                onClick={() => setLightboxIndex(idx)}
                aria-label={`تكبير الصورة: ${item.title}`}
                className="relative aspect-[4/3] w-full overflow-hidden bg-[#080808] text-right block focus-visible:outline-2 focus-visible:outline-[#F5A900]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-transparent to-black/20 opacity-80 group-hover:opacity-95 transition-opacity" />

                {/* Zoom affordance icon */}
                <span className="absolute top-3.5 left-3.5 p-2.5 rounded-xl bg-[#080808]/80 text-[#F5A900] border border-[#F5A900]/30 opacity-90 group-hover:bg-[#F5A900] group-hover:text-[#080808] transition-colors">
                  <Maximize2 className="w-4 h-4" />
                </span>

                {/* Bottom Overlay Title inside photo */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <div className="flex items-center gap-2 text-xs text-[#F5A900] font-display font-semibold">
                    <span>{item.categoryLabel}</span>
                    {item.isRealOnSiteExecution && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>تنفيذ ميداني</span>
                      </>
                    )}
                  </div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-[#F7F3EA] mt-1 group-hover:text-[#F5A900] transition-colors">
                    {item.title}
                  </h3>
                </div>
              </button>

              {/* Description & Clean Unboxed Materials Metadata */}
              <div className="p-4 sm:p-5 space-y-3 border-t border-white/5 bg-[#111111]">
                <p className="font-body text-xs sm:text-sm text-[#E9DDC9]/80 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
                <div className="pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs text-[#E9DDC9]/70">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {item.materialsUsed.map((mat, mIdx) => (
                      <React.Fragment key={mat}>
                        {mIdx > 0 && (
                          <span aria-hidden="true" className="text-[#F5A900]">
                            ·
                          </span>
                        )}
                        <span>{mat}</span>
                      </React.Fragment>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(idx)}
                    className="font-display font-bold text-[#F5A900] hover:underline whitespace-nowrap shrink-0"
                  >
                    عرض بالحجم الكامل
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeLightboxItem && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
        >
          {/* Top Bar */}
          <div className="max-w-7xl w-full mx-auto flex items-center justify-between gap-4 pb-3 border-b border-white/10">
            <div className="flex items-center gap-3 text-sm">
              <span className="font-display font-bold text-[#F5A900] tabular-nums">
                {lightboxIndex + 1} / {filteredItems.length}
              </span>
              <span aria-hidden="true" className="text-white/30">·</span>
              <span className="text-[#E9DDC9] font-display">
                {activeLightboxItem.categoryLabel}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              aria-label="إغلاق نافذة عرض الصورة"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-[#F5A900] text-[#F7F3EA] hover:text-[#080808] font-display font-bold text-xs sm:text-sm transition-colors"
            >
              <span>إغلاق</span>
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Center Image & Next/Prev Controls */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="الصورة السابقة"
              className="absolute right-2 sm:right-6 z-20 p-3 rounded-full bg-[#111111]/90 hover:bg-[#F5A900] text-[#F7F3EA] hover:text-[#080808] border border-white/15 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <img
              src={activeLightboxItem.image}
              alt={activeLightboxItem.title}
              referrerPolicy="no-referrer"
              className="max-h-[65vh] max-w-full object-contain rounded-xl border border-white/15 shadow-2xl"
            />

            <button
              type="button"
              onClick={handleNext}
              aria-label="الصورة التالية"
              className="absolute left-2 sm:left-6 z-20 p-3 rounded-full bg-[#111111]/90 hover:bg-[#F5A900] text-[#F7F3EA] hover:text-[#080808] border border-white/15 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Caption & Direct WhatsApp Consultation */}
          <div className="max-w-4xl w-full mx-auto bg-[#111111] border border-white/15 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3
                id="lightbox-title"
                className="font-display font-bold text-lg sm:text-xl text-[#F7F3EA]"
              >
                {activeLightboxItem.title}
              </h3>
              <p className="font-body text-xs sm:text-sm text-[#E9DDC9]/85">
                {activeLightboxItem.description}
              </p>
            </div>

            <a
              href={`${COMPANY_INFO.contact.whatsappUrl}?text=${encodeURIComponent(
                `مرحباً فنون للديكور، أعجبني هذا العمل في معرضكم (${activeLightboxItem.title}) وأرغب في الاستفسار عن تصميم وتنفيذ مشابه.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#F5A900] hover:bg-[#C98200] text-[#080808] font-display font-bold text-xs sm:text-sm transition-colors whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span>اطلب تصميماً مشابهاً</span>
            </a>
          </div>
        </div>
      )}
    </section>
  );
};
