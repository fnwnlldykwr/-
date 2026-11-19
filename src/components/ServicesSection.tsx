import React, { useState } from 'react';
import {
  Search,
  ArrowUpLeft,
  MessageCircle,
  Phone,
  X,
  Check,
  Sparkles,
  Eye,
} from 'lucide-react';
import {
  COMPANY_INFO,
  PORTFOLIO_ITEMS,
  PortfolioCategoryId,
  SERVICE_CATEGORIES,
  SERVICES_DATA,
  ServiceItem,
} from '../data/companyData';

interface ServicesSectionProps {
  selectedServiceModal: ServiceItem | null;
  onSelectServiceModal: (service: ServiceItem | null) => void;
  onJumpToPortfolioCategory: (category: PortfolioCategoryId) => void;
  onSelectServiceForContact: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  selectedServiceModal,
  onSelectServiceModal,
  onJumpToPortfolioCategory,
  onSelectServiceForContact,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredServices = SERVICES_DATA.filter((service) => {
    const matchesCategory =
      activeCategory === 'all' || service.category === activeCategory;
    const q = searchQuery.trim();
    const matchesSearch =
      !q ||
      service.title.includes(q) ||
      service.shortDescription.includes(q) ||
      service.categoryLabel.includes(q);
    return matchesCategory && matchesSearch;
  });

  // Group services by category when viewing 'all' without search filter
  const showGroupedHeaders = activeCategory === 'all' && !searchQuery.trim();

  const categoryGroups = [
    {
      id: 'design-decor',
      heading: 'أولاً: الديكورات والتصميم',
      subtitle:
        'خدمات التصميم الهندسي والديكور الداخلي للمنازل والمحلات التجارية والأسقف والشاشات الجدارية',
      items: filteredServices.filter((s) => s.category === 'design-decor'),
    },
    {
      id: 'finishes-materials',
      heading: 'ثانياً: خدمات الديكورات الداخلية والتشطيبات',
      subtitle:
        'تشكيلة متكاملة من أرقى الخامات والتكسيات الجدارية والأرضيات والنجارة والدهانات الحديثة',
      items: filteredServices.filter((s) => s.category === 'finishes-materials'),
    },
    {
      id: 'contracting',
      heading: 'ثالثاً: المقاولات',
      subtitle:
        'المقاولات العامة وأعمال التشطيب المتكامل وتنفيذ الأعمال الداخلية بإشراف هندسي',
      items: filteredServices.filter((s) => s.category === 'contracting'),
    },
  ];

  const renderServiceCard = (service: ServiceItem) => {
    const whatsappServiceUrl = `${COMPANY_INFO.contact.whatsappUrl}?text=${encodeURIComponent(
      `مرحباً فنون للديكور، أود الاستفسار عن خدمة: ${service.title}`
    )}`;

    return (
      <article
        key={service.id}
        className="group bg-white rounded-2xl border border-[#E9DDC9] hover:border-[#C98200] overflow-hidden flex flex-col justify-between transition-all duration-200"
      >
        <div>
          {/* Real Service Photo */}
          <div className="relative aspect-[16/10] bg-[#111111] overflow-hidden">
            <img
              src={service.image}
              alt={`${service.title} - فنون للديكور عدن`}
              referrerPolicy="no-referrer"
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/75 via-transparent to-transparent" />
            <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-xs text-[#F7F3EA]">
              <span className="font-display font-bold text-[#F5A900]">
                {service.number}. {service.categoryLabel}
              </span>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-5 sm:p-6 space-y-2.5">
            <h3 className="font-display font-bold text-xl text-[#111111] group-hover:text-[#C98200] transition-colors">
              {service.title}
            </h3>
            <p className="font-body text-sm sm:text-base text-[#77736C] leading-relaxed">
              {service.shortDescription}
            </p>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-3 border-t border-[#F7F3EA] flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onSelectServiceModal(service)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#111111] hover:bg-[#080808] text-[#F7F3EA] font-display font-bold text-xs sm:text-sm transition-colors whitespace-nowrap shrink-0"
          >
            <Eye className="w-4 h-4 text-[#F5A900]" />
            <span>تفاصيل الخدمة</span>
          </button>

          <a
            href={whatsappServiceUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onSelectServiceForContact(service.title)}
            className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#F5A900] hover:bg-[#C98200] text-[#080808] font-display font-bold text-xs sm:text-sm transition-colors whitespace-nowrap shrink-0"
          >
            <span>تواصل معنا</span>
            <ArrowUpLeft className="w-4 h-4" />
          </a>
        </div>
      </article>
    );
  };

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-20 lg:py-28 bg-[#F7F3EA] text-[#111111]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E9DDC9]">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-sm font-display font-bold text-[#C98200]">
              <span>خدماتنا المتكاملة</span>
              <span aria-hidden="true">·</span>
              <span>23 خدمة تخصصية</span>
            </div>
            <h2
              id="services-heading"
              className="font-display font-extrabold text-3xl sm:text-4xl text-[#111111]"
            >
              حلول متكاملة في التصميم والديكور والتشطيبات والمقاولات
            </h2>
            <p className="font-body text-base sm:text-lg text-[#77736C]">
              نقدم مجموعة شاملة من خدمات الديكور الداخلي والخارجي والخدمات الهندسية والمقاولات العامة لتلبية كافة متطلبات مشروعك السكني أو التجاري.
            </p>
          </div>

          {/* Search Input for Services */}
          <div className="w-full lg:w-80">
            <label htmlFor="service-search" className="sr-only">
              ابحث عن خدمة
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-[#77736C] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="service-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن خدمة (مثل: بديل الرخام، جبس...)"
                className="w-full pr-10 pl-4 py-3 rounded-xl bg-white border border-[#E9DDC9] focus:border-[#C98200] focus:outline-none text-sm text-[#111111] placeholder:text-[#77736C]"
              />
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div
          className="flex flex-wrap items-center gap-2 bg-[#E9DDC9]/60 p-1.5 rounded-xl w-fit"
          role="tablist"
          aria-label="تصنيفات الخدمات"
        >
          {SERVICE_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-lg font-display font-bold text-xs sm:text-sm transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#111111] text-[#F5A900] shadow-xs'
                    : 'text-[#111111]/80 hover:text-[#111111] hover:bg-white/50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Services Display */}
        {filteredServices.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E9DDC9] p-12 text-center space-y-4">
            <p className="font-display font-bold text-lg text-[#111111]">
              لا توجد خدمة تطابق عبارة البحث «{searchQuery}»
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="px-5 py-2.5 rounded-xl bg-[#F5A900] text-[#080808] font-display font-bold text-sm"
            >
              عرض جميع الخدمات (23)
            </button>
          </div>
        ) : showGroupedHeaders ? (
          <div className="space-y-16">
            {categoryGroups.map((group) => (
              <div key={group.id} className="space-y-6">
                <div className="pb-3 border-b border-[#E9DDC9] space-y-1">
                  <h3 className="font-display font-extrabold text-2xl text-[#111111]">
                    {group.heading}
                  </h3>
                  <p className="font-body text-sm sm:text-base text-[#77736C]">
                    {group.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {group.items.map(renderServiceCard)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredServices.map(renderServiceCard)}
          </div>
        )}
      </div>

      {/* Service Detail Modal */}
      {selectedServiceModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-service-title"
        >
          <div className="relative w-full max-w-2xl bg-[#F7F3EA] text-[#111111] rounded-2xl border border-[#F5A900]/40 overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
            {/* Modal Image Header */}
            <div className="relative h-56 sm:h-64 bg-[#111111] shrink-0">
              <img
                src={selectedServiceModal.image}
                alt={selectedServiceModal.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />
              <button
                type="button"
                onClick={() => onSelectServiceModal(null)}
                aria-label="إغلاق نافذة تفاصيل الخدمة"
                className="absolute top-4 left-4 p-2.5 rounded-full bg-[#080808]/80 text-[#F7F3EA] hover:text-[#F5A900] border border-white/15 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 right-6 left-6 text-[#F7F3EA]">
                <p className="text-xs font-display font-bold text-[#F5A900]">
                  {selectedServiceModal.number} · {selectedServiceModal.categoryLabel}
                </p>
                <h3
                  id="modal-service-title"
                  className="font-display font-extrabold text-2xl sm:text-3xl mt-1"
                >
                  {selectedServiceModal.title}
                </h3>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              <p className="font-body text-base sm:text-lg text-[#111111] leading-relaxed">
                {selectedServiceModal.fullDescription}
              </p>

              <div className="bg-white rounded-xl p-5 border border-[#E9DDC9] space-y-3">
                <h4 className="font-display font-bold text-base text-[#111111] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C98200]" />
                  <span>ما تشمله الخدمة في فنون للديكور:</span>
                </h4>
                <ul className="space-y-2.5">
                  {selectedServiceModal.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm sm:text-base text-[#111111]/85">
                      <Check className="w-4 h-4 text-[#C98200] shrink-0 mt-1" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Related Portfolio Preview */}
              {(() => {
                const relatedWorks = PORTFOLIO_ITEMS.filter(
                  (p) =>
                    p.category === selectedServiceModal.relatedPortfolioCategory ||
                    p.secondaryCategories?.includes(selectedServiceModal.relatedPortfolioCategory)
                ).slice(0, 3);

                if (relatedWorks.length === 0) return null;
                return (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-display font-bold text-sm text-[#77736C]">
                        من أعمالنا المرتبطة بهذه الخدمة:
                      </h4>
                      <button
                        type="button"
                        onClick={() => {
                          const cat = selectedServiceModal.relatedPortfolioCategory;
                          onSelectServiceModal(null);
                          onJumpToPortfolioCategory(cat);
                        }}
                        className="text-xs font-display font-bold text-[#C98200] hover:underline"
                      >
                        عرض المزيد في المعرض ←
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {relatedWorks.map((work) => (
                        <div
                          key={work.id}
                          className="aspect-[4/3] rounded-lg overflow-hidden border border-[#E9DDC9] bg-[#111111]"
                        >
                          <img
                            src={work.image}
                            alt={work.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Modal Footer CTAs */}
            <div className="p-4 sm:p-5 bg-white border-t border-[#E9DDC9] flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2.5 flex-1">
                <a
                  href={`${COMPANY_INFO.contact.whatsappUrl}?text=${encodeURIComponent(
                    `مرحباً فنون للديكور، أرغب في طلب استشارة أو تنفيذ خدمة: ${selectedServiceModal.title}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#F5A900] hover:bg-[#C98200] text-[#080808] font-display font-bold text-sm transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>اطلب الخدمة عبر واتساب</span>
                </a>
                <a
                  href={COMPANY_INFO.contact.telUrl}
                  className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#111111] hover:bg-[#080808] text-[#F7F3EA] font-display font-bold text-sm transition-colors whitespace-nowrap"
                >
                  <Phone className="w-4 h-4 text-[#F5A900]" />
                  <span>اتصال مباشر</span>
                </a>
              </div>
              <button
                type="button"
                onClick={() => onSelectServiceModal(null)}
                className="py-3 px-4 rounded-xl border border-[#E9DDC9] text-[#77736C] hover:text-[#111111] font-display font-semibold text-sm"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
