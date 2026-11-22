import React from 'react';
import { COMPANY_INFO } from '../data/companyData';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <div className="fixed bottom-20 left-4 sm:bottom-24 sm:left-5 z-40">
      <a
        href={COMPANY_INFO.contact.whatsappReadyUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="تواصل معنا عبر واتساب الرسمي برسالة جاهزة"
        title="تواصل عبر واتساب الرسمي لشركة فنون للديكور"
        className="group relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white flex items-center justify-center shadow-[0_8px_28px_rgba(37,211,102,0.45)] border-2 border-white/20 transition-all duration-200 hover:scale-105 hover:-translate-y-0.5"
      >
        {/* Official Circular WhatsApp Brand Logo */}
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow-xs"
        >
          <path d="M12.031 2c-5.516 0-9.999 4.483-9.999 9.999 0 1.764.46 3.485 1.334 5.004L2 22l5.132-1.346a9.956 9.956 0 0 0 4.899 1.292h.004c5.515 0 9.998-4.483 9.998-9.999 0-2.672-1.04-5.184-2.929-7.073C17.215 3.04 14.703 2 12.031 2Zm5.847 14.277c-.248.698-1.448 1.334-2.011 1.42-.517.078-1.17.11-1.889-.118-.436-.138-.996-.324-1.714-.634-3.015-1.302-4.983-4.337-5.134-4.538-.15-.201-1.226-1.632-1.226-3.113 0-1.481.776-2.209 1.052-2.51.275-.302.6-.377.8-.377.2 0 .4.002.575.01.184.009.431-.07.675.516.248.599.847 2.07.921 2.221.075.151.125.327.025.528-.1.201-.15.327-.3.502-.15.176-.315.393-.45.528-.15.15-.306.314-.131.615.175.302.778 1.284 1.671 2.079 1.148 1.024 2.116 1.341 2.416 1.492.301.15.476.125.651-.076.176-.201.751-.878.952-1.179.2-.302.4-.252.675-.151.276.1 1.752.827 2.053.977.3.151.5.226.575.352.076.125.076.728-.171 1.426Z" />
        </svg>
      </a>
    </div>
  );
};
