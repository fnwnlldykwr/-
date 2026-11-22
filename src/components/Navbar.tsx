import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageCircle, MapPin } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface NavbarProps {
  activeSection: string;
}

const NAV_LINKS = [
  { href: '#home', label: 'الرئيسية', id: 'home' },
  { href: '#about', label: 'من نحن', id: 'about' },
  { href: '#services', label: 'خدماتنا', id: 'services' },
  { href: '#portfolio', label: 'معرض أعمالنا', id: 'portfolio' },
  { href: '#why-funun', label: 'لماذا فنون؟', id: 'why-funun' },
  { href: '#contact', label: 'تواصل معنا', id: 'contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-colors duration-200 ${
          isScrolled
            ? 'bg-[#080808]/95 backdrop-blur-md border-b border-[#F5A900]/20 shadow-lg'
            : 'bg-[#080808]/85 backdrop-blur-sm border-b border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 lg:h-20 flex items-center justify-between gap-4 lg:gap-8">
          {/* Zone 1: Brand Official Logo + Name */}
          <a
            href="#home"
            className="flex items-center gap-2.5 sm:gap-3 whitespace-nowrap shrink-0 group focus-visible:outline-2 focus-visible:outline-[#F5A900]"
            aria-label="فنون للديكور - الصفحة الرئيسية"
          >
            <img
              src={COMPANY_INFO.logo}
              alt="شعار فنون للديكور الرسمي - FUNUN DECOR"
              referrerPolicy="no-referrer"
              className="h-11 lg:h-13 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
            <span className="text-lg sm:text-2xl font-display font-bold text-[#F7F3EA] tracking-tight">
              فنون للديكور
            </span>
          </a>

          {/* Zone 2: Primary Desktop Navigation Links */}
          <nav
            aria-label="القائمة الرئيسية"
            className="hidden lg:flex items-center gap-7 text-base font-medium"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`relative py-2 transition-colors duration-150 whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-[#F5A900] font-bold'
                      : 'text-[#F7F3EA]/85 hover:text-[#F5A900]'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 inset-x-0 h-0.5 bg-[#F5A900] transition-transform duration-200 origin-right ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Single Primary Action + Mobile Drawer Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-lg bg-[#F5A900] hover:bg-[#C98200] text-[#080808] font-display font-bold text-sm transition-colors duration-150 whitespace-nowrap shrink-0 shadow-sm"
            >
              تواصل معنا
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'إغلاق القائمة الجانبية' : 'فتح القائمة الجانبية'}
              className="lg:hidden p-2.5 rounded-lg border border-white/15 text-[#F7F3EA] hover:text-[#F5A900] hover:border-[#F5A900]/50 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          <aside
            aria-label="القائمة الجانبية للهاتف"
            className="relative mr-auto w-full max-w-xs bg-[#111111] border-l border-[#F5A900]/25 h-full flex flex-col justify-between p-6 text-[#F7F3EA] overflow-y-auto"
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <a
                  href="#home"
                  onClick={handleNavClick}
                  className="flex items-center gap-3"
                >
                  <img
                    src={COMPANY_INFO.logo}
                    alt="شعار فنون للديكور"
                    referrerPolicy="no-referrer"
                    className="h-12 w-auto object-contain"
                  />
                  <div>
                    <p className="font-display font-bold text-lg text-[#F7F3EA]">
                      فنون للديكور
                    </p>
                    <p className="text-xs text-[#F5A900] tracking-wider">FUNUN DECOR</p>
                  </div>
                </a>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="إغلاق القائمة"
                  className="p-2 rounded-lg text-[#E9DDC9] hover:text-[#F5A900] border border-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-6 flex flex-col gap-1" aria-label="روابط التنقل للهاتف">
                {NAV_LINKS.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      onClick={handleNavClick}
                      className={`px-4 py-3 rounded-lg font-display text-base transition-colors ${
                        isActive
                          ? 'bg-[#F5A900]/15 text-[#F5A900] font-bold'
                          : 'text-[#F7F3EA] hover:bg-white/5 hover:text-[#F5A900]'
                      }`}
                    >
                      {link.label}
                    </a>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-3">
              <div className="flex items-start gap-2 text-xs text-[#E9DDC9]">
                <MapPin className="w-4 h-4 text-[#F5A900] shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.contact.address}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <a
                  href={COMPANY_INFO.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-lg bg-[#F5A900] text-[#080808] font-display font-bold text-xs hover:bg-[#C98200] transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>واتساب</span>
                </a>
                <a
                  href={COMPANY_INFO.contact.telUrl}
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-lg border border-[#F5A900]/50 text-[#F7F3EA] font-display font-bold text-xs hover:bg-[#F5A900]/10 transition-colors whitespace-nowrap"
                >
                  <Phone className="w-4 h-4 text-[#F5A900]" />
                  <span>اتصال مباشر</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};
