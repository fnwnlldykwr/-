/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { WhyChooseAndProcess } from './components/WhyChooseAndProcess';
import { ContactAndHoursSection } from './components/ContactAndHoursSection';
import { SmartAssistant } from './components/SmartAssistant';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { PortfolioCategoryId, ServiceItem } from './data/companyData';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedServiceModal, setSelectedServiceModal] =
    useState<ServiceItem | null>(null);
  const [portfolioCategory, setPortfolioCategory] =
    useState<PortfolioCategoryId>('all');
  const [preselectedServiceForContact, setPreselectedServiceForContact] =
    useState<string>('');

  useEffect(() => {
    const sectionIds = [
      'home',
      'about',
      'services',
      'portfolio',
      'why-funun',
      'process',
      'hours',
      'contact',
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          const id = sectionIds[i];
          setActiveSection(
            id === 'process' ? 'why-funun' : id === 'hours' ? 'contact' : id
          );
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleJumpToPortfolioCategory = (category: PortfolioCategoryId) => {
    setPortfolioCategory(category);
    const portfolioEl = document.getElementById('portfolio');
    if (portfolioEl) {
      portfolioEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div dir="rtl" className="min-h-screen flex flex-col bg-[#F7F3EA] text-[#111111]">
      <Navbar activeSection={activeSection} />

      <main className="flex-1">
        <Hero />

        <AboutSection />

        <ServicesSection
          selectedServiceModal={selectedServiceModal}
          onSelectServiceModal={setSelectedServiceModal}
          onJumpToPortfolioCategory={handleJumpToPortfolioCategory}
          onSelectServiceForContact={setPreselectedServiceForContact}
        />

        <PortfolioSection
          activeCategory={portfolioCategory}
          onCategoryChange={setPortfolioCategory}
        />

        <WhyChooseAndProcess />

        <ContactAndHoursSection
          preselectedService={preselectedServiceForContact}
        />
      </main>

      <Footer onSelectServiceModal={setSelectedServiceModal} />

      <FloatingWhatsApp />

      <SmartAssistant
        onSelectServiceModal={setSelectedServiceModal}
        onJumpToPortfolioCategory={handleJumpToPortfolioCategory}
      />
    </div>
  );
}
