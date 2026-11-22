import React from 'react';
import { Phone, MessageCircle, MapPin, ExternalLink } from 'lucide-react';
import { COMPANY_INFO, SERVICES_DATA, ServiceItem } from '../data/companyData';

interface FooterProps {
  onSelectServiceModal: (service: ServiceItem) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectServiceModal }) => {
  const featuredServices = SERVICES_DATA.slice(0, 10);

  return (
    <footer
      aria-label="تذييل الموقع - فنون للديكور"
      className="bg-[#080808] text-[#F7F3EA] border-t border-[#F5A900]/25 pt-16 pb-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Official Logo, Brand Name, Description */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#home" className="inline-flex items-center gap-3.5">
              <img
                src={COMPANY_INFO.logo}
                alt="الشعار الرسمي لشركة فنون للديكور - FUNUN DECOR"
                referrerPolicy="no-referrer"
                className="h-16 w-auto object-contain"
              />
              <div>
                <p className="font-display font-extrabold text-2xl text-[#F7F3EA]">
                  {COMPANY_INFO.nameAr}
                </p>
                <p className="font-display font-bold text-xs text-[#F5A900] tracking-widest">
                  {COMPANY_INFO.nameEn}
                </p>
              </div>
            </a>

            <p className="font-body text-sm sm:text-base text-[#E9DDC9]/80 leading-relaxed">
              شركة متخصصة في التصميم الداخلي والخارجي، تنفيذ الديكورات الحديثة، ديكور المنازل والمحلات التجارية، الخدمات الهندسية، والمقاولات العامة والتشطيبات في مدينة عدن.
            </p>

            <div className="flex items-start gap-2.5 text-sm text-[#E9DDC9]">
              <MapPin className="w-4 h-4 text-[#F5A900] shrink-0 mt-1" />
              <span>{COMPANY_INFO.contact.address}</span>
            </div>
          </div>

          {/* Col 2: Quick Site Navigation Links */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-display font-bold text-base text-[#F5A900]">
              أقسام الموقع
            </h3>
            <ul className="space-y-2.5 text-sm text-[#E9DDC9]/85">
              <li>
                <a href="#home" className="hover:text-[#F5A900] transition-colors">
                  الرئيسية
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#F5A900] transition-colors">
                  من نحن
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#F5A900] transition-colors">
                  خدماتنا (23 خدمة)
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-[#F5A900] transition-colors">
                  معرض أعمالنا
                </a>
              </li>
              <li>
                <a href="#why-funun" className="hover:text-[#F5A900] transition-colors">
                  لماذا فنون؟
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-[#F5A900] transition-colors">
                  خطوات العمل
                </a>
              </li>
              <li>
                <a href="#hours" className="hover:text-[#F5A900] transition-colors">
                  أوقات الدوام
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#F5A900] transition-colors">
                  تواصل معنا
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Service Links */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-display font-bold text-base text-[#F5A900]">
              أبرز خدماتنا
            </h3>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-2.5 text-sm text-[#E9DDC9]/85">
              {featuredServices.map((service) => (
                <li key={service.id}>
                  <button
                    type="button"
                    onClick={() => onSelectServiceModal(service)}
                    className="hover:text-[#F5A900] transition-colors text-right"
                  >
                    {service.title}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="#services"
                  className="text-[#F5A900] font-display font-bold hover:underline"
                >
                  جميع الخدمات ←
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Contact Channels */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-display font-bold text-base text-[#F5A900]">
              قنوات التواصل الرسمية
            </h3>
            <div className="space-y-3 text-sm">
              <a
                href={COMPANY_INFO.contact.telUrl}
                className="flex items-center gap-2.5 text-[#F7F3EA] hover:text-[#F5A900] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#F5A900] shrink-0" />
                <span dir="ltr" className="tabular-nums font-display font-bold">
                  {COMPANY_INFO.contact.phone}
                </span>
              </a>

              <a
                href={COMPANY_INFO.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-[#F7F3EA] hover:text-[#F5A900] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#F5A900] shrink-0" />
                <span>محادثة واتساب مباشرة</span>
              </a>

              <a
                href={COMPANY_INFO.contact.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-[#F7F3EA] hover:text-[#F5A900] transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-[#F5A900] shrink-0" />
                <span>صفحة فنون للديكور على فيسبوك</span>
              </a>

              <a
                href={COMPANY_INFO.contact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-[#F7F3EA] hover:text-[#F5A900] transition-colors"
              >
                <MapPin className="w-4 h-4 text-[#F5A900] shrink-0" />
                <span>موقعنا على خرائط Google Maps</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Line */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#E9DDC9]/75 font-display">
          <p>© 2026 فنون للديكور – جميع الحقوق محفوظة.</p>
          <p className="text-[#E9DDC9]/60">
            FUNUN DECOR · اليمن، عدن، شارع الخمسين، بجانب البيرق مول بـ 300 متر
          </p>
        </div>
      </div>
    </footer>
  );
};
