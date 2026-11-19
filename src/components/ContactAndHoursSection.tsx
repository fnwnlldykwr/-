import React, { useState, useEffect } from 'react';
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  ExternalLink,
  Send,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import {
  COMPANY_INFO,
  SERVICES_DATA,
  WORKING_HOURS_SCHEDULE,
} from '../data/companyData';
import { getAdenWorkStatus, AdenWorkStatus } from '../utils/workingHours';

interface ContactAndHoursSectionProps {
  preselectedService: string;
}

interface SubmittedInquiry {
  name: string;
  phone: string;
  service: string;
  location: string;
  notes: string;
  whatsappLink: string;
}

export const ContactAndHoursSection: React.FC<ContactAndHoursSectionProps> = ({
  preselectedService,
}) => {
  const [adenStatus, setAdenStatus] = useState<AdenWorkStatus>(() =>
    getAdenWorkStatus()
  );

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedService, setSelectedService] = useState(
    preselectedService || SERVICES_DATA[0].title
  );
  const [projectLocation, setProjectLocation] = useState('عدن');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState('');
  const [submittedInquiry, setSubmittedInquiry] =
    useState<SubmittedInquiry | null>(null);

  useEffect(() => {
    if (preselectedService) {
      setSelectedService(preselectedService);
    }
  }, [preselectedService]);

  useEffect(() => {
    const timer = setInterval(() => {
      setAdenStatus(getAdenWorkStatus());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanPhone = phone.trim();

    if (!cleanName) {
      setFormError('يرجى إدخال الاسم الكريم للتواصل معك.');
      return;
    }
    if (!cleanPhone || cleanPhone.length < 7) {
      setFormError('يرجى إدخال رقم هاتف أو واتساب صحيح.');
      return;
    }

    setFormError('');
    const messageLines = [
      `مرحباً شركة فنون للديكور (FUNUN DECOR)،`,
      `الاسم: ${cleanName}`,
      `رقم التواصل: ${cleanPhone}`,
      `الخدمة المطلوبة: ${selectedService}`,
      `موقع المشروع: ${projectLocation.trim() || 'عدن'}`,
      notes.trim() ? `تفاصيل إضافية: ${notes.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    const whatsappLink = `${COMPANY_INFO.contact.whatsappUrl}?text=${encodeURIComponent(
      messageLines
    )}`;

    setSubmittedInquiry({
      name: cleanName,
      phone: cleanPhone,
      service: selectedService,
      location: projectLocation.trim() || 'عدن',
      notes: notes.trim(),
      whatsappLink,
    });
  };

  return (
    <>
      {/* Section 12: أوقات الدوام */}
      <section
        id="hours"
        aria-labelledby="hours-heading"
        className="py-20 bg-[#F7F3EA] text-[#111111] border-b border-[#E9DDC9]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Right Explanation & Live Aden Time Status */}
            <div className="lg:col-span-5 space-y-5">
              <div className="flex items-center gap-2 text-sm font-display font-bold text-[#C98200]">
                <Clock className="w-4 h-4" />
                <span>أوقات الدوام الرسمي</span>
              </div>

              <h2
                id="hours-heading"
                className="font-display font-extrabold text-3xl sm:text-4xl text-[#111111]"
              >
                مواعيد العمل واستقبال العملاء في عدن
              </h2>

              <p className="font-body text-base text-[#77736C] leading-relaxed">
                نسعد باستقبالكم في مقر شركة فنون للديكور بمدينة عدن – شارع الخمسين، والرد على استفساراتكم الهاتفية وعبر واتساب طوال أيام الأسبوع وفق الجدول الموضح.
              </p>

              {/* Live Aden Status Card */}
              <div className="bg-[#111111] text-[#F7F3EA] rounded-2xl p-6 border border-[#F5A900]/30 space-y-3">
                <div className="flex items-center justify-between text-xs text-[#E9DDC9]">
                  <span>التوقيت المحلي لمدينة عدن الآن:</span>
                  <span className="font-display font-bold text-[#F5A900] tabular-nums">
                    {adenStatus.dayNameAr} · {adenStatus.adenTimeFormatted}
                  </span>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <span className="font-display font-bold text-base">
                    حالة المقر الآن:
                  </span>
                  <span
                    className={`font-display font-extrabold text-sm px-3 py-1 rounded-lg ${
                      adenStatus.isOpen
                        ? 'bg-[#F5A900] text-[#080808]'
                        : 'bg-white/10 text-[#E9DDC9]'
                    }`}
                  >
                    {adenStatus.statusLabel}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#E9DDC9]/85 font-body">
                  {adenStatus.statusDetail}
                </p>
              </div>
            </div>

            {/* Left Schedule Table */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E9DDC9] overflow-hidden">
              <div className="p-5 sm:p-6 bg-[#111111] text-[#F7F3EA] flex items-center justify-between">
                <h3 className="font-display font-bold text-lg">
                  جدول أوقات الدوام الأسبوعي
                </h3>
                <span className="text-xs text-[#F5A900] font-display">
                  بتوقيت عدن (UTC+3)
                </span>
              </div>

              <div className="divide-y divide-[#E9DDC9]">
                {WORKING_HOURS_SCHEDULE.map((day) => {
                  const isToday = day.dayIndex === adenStatus.dayIndex;
                  return (
                    <div
                      key={day.dayNameAr}
                      className={`px-5 sm:px-6 py-4 flex items-center justify-between gap-4 transition-colors ${
                        isToday ? 'bg-[#F5A900]/15 font-bold' : 'hover:bg-[#F7F3EA]/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-display text-base text-[#111111]">
                          {day.dayNameAr}
                        </span>
                        {isToday && (
                          <span className="text-xs font-display font-bold text-[#C98200]">
                            (اليوم الحالي)
                          </span>
                        )}
                      </div>
                      <span
                        className={`font-body text-sm sm:text-base tabular-nums ${
                          isToday ? 'text-[#111111] font-bold' : 'text-[#77736C]'
                        }`}
                      >
                        {day.hoursText}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 11: قسم التواصل والاتصال */}
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="py-20 lg:py-28 bg-[#080808] text-[#F7F3EA]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {/* Heading */}
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-sm font-display font-bold text-[#F5A900]">
              <span>تواصل معنا</span>
              <span aria-hidden="true">·</span>
              <span>نحن بالقرب منك في عدن</span>
            </div>
            <h2
              id="contact-heading"
              className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#F7F3EA]"
            >
              لنبدأ بتحويل مساحتك إلى تحفة معمارية
            </h2>
            <p className="font-body text-base sm:text-lg text-[#E9DDC9]/80">
              تواصل معنا مباشرة عبر الهاتف أو واتساب أو تفضل بزيارة مقرنا في عدن – شارع الخمسين لمناقشة تفاصيل مشروعك.
            </p>
          </div>

          {/* 4 Direct Official Contact Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* 1. Direct Phone Call */}
            <a
              href={COMPANY_INFO.contact.telUrl}
              className="group bg-[#111111] hover:bg-[#181818] border border-white/10 hover:border-[#F5A900] rounded-2xl p-6 flex flex-col justify-between space-y-4 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="p-3 rounded-xl bg-[#F5A900]/15 text-[#F5A900]">
                  <Phone className="w-6 h-6" />
                </span>
                <span className="text-xs font-display font-bold text-[#F5A900] group-hover:underline">
                  اتصال مباشر ←
                </span>
              </div>
              <div>
                <p className="text-xs text-[#E9DDC9]/70 font-display">رقم الهاتف الرسمي</p>
                <p
                  className="font-display font-extrabold text-lg sm:text-xl text-[#F7F3EA] mt-1 tabular-nums"
                  dir="ltr"
                >
                  {COMPANY_INFO.contact.phone}
                </p>
              </div>
            </a>

            {/* 2. Direct WhatsApp Chat */}
            <a
              href={COMPANY_INFO.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#111111] hover:bg-[#181818] border border-white/10 hover:border-[#F5A900] rounded-2xl p-6 flex flex-col justify-between space-y-4 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="p-3 rounded-xl bg-[#F5A900] text-[#080808]">
                  <MessageCircle className="w-6 h-6" />
                </span>
                <span className="text-xs font-display font-bold text-[#F5A900] group-hover:underline">
                  فتح محادثة فورية ←
                </span>
              </div>
              <div>
                <p className="text-xs text-[#E9DDC9]/70 font-display">الواتساب المباشر</p>
                <p
                  className="font-display font-extrabold text-lg sm:text-xl text-[#F7F3EA] mt-1 tabular-nums"
                  dir="ltr"
                >
                  {COMPANY_INFO.contact.whatsapp}
                </p>
              </div>
            </a>

            {/* 3. Official Facebook Page */}
            <a
              href={COMPANY_INFO.contact.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#111111] hover:bg-[#181818] border border-white/10 hover:border-[#F5A900] rounded-2xl p-6 flex flex-col justify-between space-y-4 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="p-3 rounded-xl bg-[#F5A900]/15 text-[#F5A900]">
                  <Share2 className="w-6 h-6" />
                </span>
                <span className="text-xs font-display font-bold text-[#F5A900] group-hover:underline flex items-center gap-1">
                  <span>زيارة الصفحة</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
              <div>
                <p className="text-xs text-[#E9DDC9]/70 font-display">تابعنا على فيسبوك</p>
                <p className="font-display font-bold text-lg text-[#F7F3EA] mt-1">
                  فنون للديكور - FUNUN DECOR
                </p>
              </div>
            </a>

            {/* 4. Official Google Maps Link */}
            <a
              href={COMPANY_INFO.contact.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#111111] hover:bg-[#181818] border border-white/10 hover:border-[#F5A900] rounded-2xl p-6 flex flex-col justify-between space-y-4 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="p-3 rounded-xl bg-[#F5A900]/15 text-[#F5A900]">
                  <MapPin className="w-6 h-6" />
                </span>
                <span className="text-xs font-display font-bold text-[#F5A900] group-hover:underline flex items-center gap-1">
                  <span>فتح في الخرائط</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
              <div>
                <p className="text-xs text-[#E9DDC9]/70 font-display">موقعنا على Google Maps</p>
                <p className="font-display font-bold text-sm sm:text-base text-[#F7F3EA] mt-1">
                  عدن، شارع الخمسين، بجانب البيرق مول بـ 300 متر
                </p>
              </div>
            </a>
          </div>

          {/* 2-Column Split: Consultation Form + Address & Map */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Right Column: Interactive Service & Project Inquiry Form */}
            <div className="lg:col-span-6 bg-[#111111] rounded-2xl border border-white/10 p-6 sm:p-8 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="space-y-1.5 pb-4 border-b border-white/10">
                  <h3 className="font-display font-bold text-2xl text-[#F7F3EA]">
                    اطلب استشارة أو عرض سعر لمشروعك
                  </h3>
                  <p className="font-body text-sm text-[#E9DDC9]/75">
                    اختر الخدمة المطلوبة وأدخل بياناتك لتجهيز طلبك وإرساله مباشرة لفريقنا المختص.
                  </p>
                </div>

                {submittedInquiry ? (
                  <div className="bg-[#080808] border border-[#F5A900]/50 rounded-2xl p-6 space-y-5">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-[#F5A900] shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <h4 className="font-display font-bold text-lg text-[#F7F3EA]">
                          تم تجهيز طلب الاستشارة بنجاح، أ. {submittedInquiry.name}
                        </h4>
                        <p className="font-body text-sm text-[#E9DDC9]/80">
                          الخدمة المختارة: <strong className="text-[#F5A900]">{submittedInquiry.service}</strong> · الموقع: {submittedInquiry.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <a
                        href={submittedInquiry.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-[#F5A900] hover:bg-[#C98200] text-[#080808] font-display font-bold text-sm transition-colors whitespace-nowrap"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>إرسال الطلب عبر واتساب الآن</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => setSubmittedInquiry(null)}
                        className="py-3.5 px-4 rounded-xl border border-white/15 text-[#E9DDC9] hover:text-[#F5A900] font-display font-semibold text-sm"
                      >
                        تعديل الطلب
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4" noValidate>
                    {formError && (
                      <div
                        role="alert"
                        className="p-3.5 rounded-xl bg-[#F5A900]/15 border border-[#F5A900] text-[#F5A900] text-sm font-display font-semibold"
                      >
                        {formError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="client-name"
                          className="block font-display font-semibold text-xs sm:text-sm text-[#E9DDC9] mb-1.5"
                        >
                          الاسم الكريم *
                        </label>
                        <input
                          id="client-name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="أدخل اسمك"
                          className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-white/15 focus:border-[#F5A900] focus:outline-none text-sm text-[#F7F3EA] placeholder:text-[#77736C]"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="client-phone"
                          className="block font-display font-semibold text-xs sm:text-sm text-[#E9DDC9] mb-1.5"
                        >
                          رقم الهاتف / الواتساب *
                        </label>
                        <input
                          id="client-phone"
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="مثال: 777655419"
                          className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-white/15 focus:border-[#F5A900] focus:outline-none text-sm text-[#F7F3EA] placeholder:text-[#77736C]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="client-service"
                          className="block font-display font-semibold text-xs sm:text-sm text-[#E9DDC9] mb-1.5"
                        >
                          الخدمة المطلوبة
                        </label>
                        <select
                          id="client-service"
                          value={selectedService}
                          onChange={(e) => setSelectedService(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-white/15 focus:border-[#F5A900] focus:outline-none text-sm text-[#F7F3EA]"
                        >
                          {SERVICES_DATA.map((s) => (
                            <option key={s.id} value={s.title}>
                              {s.number}. {s.title} ({s.categoryLabel})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="client-location"
                          className="block font-display font-semibold text-xs sm:text-sm text-[#E9DDC9] mb-1.5"
                        >
                          موقع المشروع / الحي
                        </label>
                        <input
                          id="client-location"
                          type="text"
                          value={projectLocation}
                          onChange={(e) => setProjectLocation(e.target.value)}
                          placeholder="مثال: عدن - شارع الخمسين / المنصورة"
                          className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-white/15 focus:border-[#F5A900] focus:outline-none text-sm text-[#F7F3EA] placeholder:text-[#77736C]"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="client-notes"
                        className="block font-display font-semibold text-xs sm:text-sm text-[#E9DDC9] mb-1.5"
                      >
                        تفاصيل المشروع أو المساحة (اختياري)
                      </label>
                      <textarea
                        id="client-notes"
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="اكتب نبذة مختصرة عن المساحة أو الديكور المطلوب..."
                        className="w-full px-4 py-3 rounded-xl bg-[#080808] border border-white/15 focus:border-[#F5A900] focus:outline-none text-sm text-[#F7F3EA] placeholder:text-[#77736C]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl bg-[#F5A900] hover:bg-[#C98200] text-[#080808] font-display font-bold text-base transition-colors"
                    >
                      <Send className="w-4 h-4" />
                      <span>تجهيز وإرسال طلب الاستشارة</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Left Column: Detailed Address & Embedded Map */}
            <div className="lg:col-span-6 bg-[#111111] rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between">
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-display font-bold text-[#F5A900]">
                      العنوان الرسمي للمقر
                    </span>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-[#F7F3EA]">
                      {COMPANY_INFO.contact.address}
                    </h3>
                  </div>
                  <span className="p-3 rounded-xl bg-[#F5A900]/15 text-[#F5A900] shrink-0">
                    <MapPin className="w-6 h-6" />
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={COMPANY_INFO.contact.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F5A900] hover:bg-[#C98200] text-[#080808] font-display font-bold text-xs sm:text-sm transition-colors whitespace-nowrap"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>فتح الموقع على خرائط Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={COMPANY_INFO.contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/15 hover:border-[#F5A900] text-[#F7F3EA] font-display font-semibold text-xs sm:text-sm transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4 text-[#F5A900]" />
                    <span>تواصل عبر واتساب</span>
                  </a>
                </div>
              </div>

              {/* Embedded Google Map (keyless standard embed for Fifty Street / Al-Bayraq Mall, Aden) */}
              <div className="relative flex-1 min-h-[270px] bg-[#080808] border-t border-white/10">
                <iframe
                  title="موقع شركة فنون للديكور - عدن شارع الخمسين بجانب البيرق مول"
                  src="https://www.google.com/maps?q=12.858,44.985&hl=ar&z=15&output=embed"
                  className="w-full h-full min-h-[270px] border-0 opacity-90"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
