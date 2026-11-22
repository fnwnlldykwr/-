import test from 'node:test';
import assert from 'node:assert/strict';
import { getAssistantResponse, normalizeArabic } from './assistantEngine';
import { getAdenWorkStatus } from './workingHours';
import {
  COMPANY_INFO,
  PORTFOLIO_ITEMS,
  SERVICES_DATA,
  WORKING_HOURS_SCHEDULE,
} from '../data/companyData';

test('companyData includes all 23 required services, 19 portfolio items, and pre-filled WhatsApp URL', () => {
  assert.equal(SERVICES_DATA.length, 23);
  const designCount = SERVICES_DATA.filter((s) => s.category === 'design-decor').length;
  const finishesCount = SERVICES_DATA.filter((s) => s.category === 'finishes-materials').length;
  const contractingCount = SERVICES_DATA.filter((s) => s.category === 'contracting').length;

  assert.equal(designCount, 8);
  assert.equal(finishesCount, 12);
  assert.equal(contractingCount, 3);
  assert.equal(PORTFOLIO_ITEMS.length, 19);
  assert.equal(WORKING_HOURS_SCHEDULE.length, 7);
  assert.ok(COMPANY_INFO.contact.whatsappReadyUrl.startsWith('https://wa.me/967777655419?text='));
  assert.ok(decodeURIComponent(COMPANY_INFO.contact.whatsappReadyUrl).includes('فنون للديكور'));
  assert.equal(COMPANY_INFO.contact.googleMapsUrl, 'https://maps.app.goo.gl/k9PDkicGPWHvAUeJ9');
});

test('normalizeArabic unifies Arabic characters, tashkeel, and repeated letters', () => {
  assert.equal(normalizeArabic('أَيْنَ مَوْقِعُكُمْ فِي عَدَن؟'), 'اين موقعكم في عدن');
  assert.equal(normalizeArabic('بَدِيلُ الرُّخَاااامِ وَالْخَشَبة'), 'بديل الرخام والخشبه');
});

test('assistantEngine answers all 15 required user questions accurately', () => {
  const requiredQuestions: { q: string; expectedIntentPrefix: string }[] = [
    { q: 'ما الخدمات التي تقدمها فنون؟', expectedIntentPrefix: 'services' },
    { q: 'هل تقدمون ديكور المنازل؟', expectedIntentPrefix: 'service-home-decor' },
    { q: 'هل تنفذون ديكور المحلات التجارية؟', expectedIntentPrefix: 'service-commercial-decor' },
    { q: 'هل لديكم بديل رخام؟', expectedIntentPrefix: 'service-marble-alternative' },
    { q: 'هل تقدمون بديل الخشب؟', expectedIntentPrefix: 'service-wood-alternative' },
    { q: 'هل تنفذون الأسقف الجبسية؟', expectedIntentPrefix: 'service-gypsum-ceilings' },
    { q: 'هل تقدمون أعمال الدهانات؟', expectedIntentPrefix: 'service-paints' },
    { q: 'ما موقع الشركة؟', expectedIntentPrefix: 'location' },
    { q: 'أين يقع مقر فنون للديكور؟', expectedIntentPrefix: 'location' },
    { q: 'ما رقم الهاتف؟', expectedIntentPrefix: 'contact' },
    { q: 'كيف أتواصل معكم عبر واتساب؟', expectedIntentPrefix: 'contact' },
    { q: 'ما أوقات الدوام؟', expectedIntentPrefix: 'hours' },
    { q: 'أين يمكن مشاهدة الأعمال؟', expectedIntentPrefix: 'portfolio' },
    { q: 'هل تقدمون خدمات هندسية؟', expectedIntentPrefix: 'service-engineering-service' },
    { q: 'هل تنفذون المقاولات العامة؟', expectedIntentPrefix: 'service-general-contracting' },
  ];

  for (const item of requiredQuestions) {
    const res = getAssistantResponse(item.q);
    assert.ok(
      res.intentId.startsWith(item.expectedIntentPrefix),
      `Expected question "${item.q}" to match "${item.expectedIntentPrefix}", got "${res.intentId}"`
    );
    assert.ok(res.answer.length > 20);
    assert.ok(res.actions.length > 0);
  }
});

test('assistantEngine handles typos and unconfirmed queries safely without hallucinating', () => {
  const typoRes = getAssistantResponse('هل عندكم شااشه جداريه؟');
  assert.equal(typoRes.intentId, 'service-tv-wall-units');

  const unknownRes = getAssistantResponse('هل تبيعون سيارات كهربائية في طوكيو؟');
  assert.equal(unknownRes.intentId, 'fallback');
  assert.ok(unknownRes.answer.includes('لا أمتلك إجابة مؤكدة'));
});

test('getAdenWorkStatus calculates Friday 4pm-10pm and weekday 9am-10pm in UTC+3 correctly', () => {
  // Friday 2026-11-20 at 10:00 UTC is 13:00 (1:00 PM) in Aden -> should be CLOSED (opens 4:00 PM)
  const fridayMorningUtc = new Date('2026-11-20T10:00:00Z');
  const statusFriMorning = getAdenWorkStatus(fridayMorningUtc);
  assert.equal(statusFriMorning.dayNameAr, 'الجمعة');
  assert.equal(statusFriMorning.isOpen, false);

  // Friday 2026-11-20 at 14:00 UTC is 17:00 (5:00 PM) in Aden -> should be OPEN
  const fridayAfternoonUtc = new Date('2026-11-20T14:00:00Z');
  const statusFriAfternoon = getAdenWorkStatus(fridayAfternoonUtc);
  assert.equal(statusFriAfternoon.dayNameAr, 'الجمعة');
  assert.equal(statusFriAfternoon.isOpen, true);

  // Saturday 2026-11-21 at 07:00 UTC is 10:00 (10:00 AM) in Aden -> should be OPEN
  const saturdayMorningUtc = new Date('2026-11-21T07:00:00Z');
  const statusSatMorning = getAdenWorkStatus(saturdayMorningUtc);
  assert.equal(statusSatMorning.dayNameAr, 'السبت');
  assert.equal(statusSatMorning.isOpen, true);
});
