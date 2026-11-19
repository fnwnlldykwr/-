import {
  COMPANY_INFO,
  PortfolioCategoryId,
  SERVICES_DATA,
  WORKING_HOURS_SCHEDULE,
  WORK_STEPS,
} from '../data/companyData';
import { getAdenWorkStatus } from './workingHours';

export interface AssistantAction {
  label: string;
  type: 'scroll' | 'external' | 'filter-portfolio' | 'open-service';
  target: string;
  portfolioCategory?: PortfolioCategoryId;
  serviceId?: string;
}

export interface AssistantResponse {
  intentId: string;
  answer: string;
  actions: AssistantAction[];
  suggestedFollowUps: string[];
}

/**
 * Normalizes Arabic text for resilient local intent and keyword matching:
 * - Removes diacritics (tashkeel) and tatweel
 * - Normalizes Alef variants (أ, إ, آ, ٱ -> ا)
 * - Normalizes Teh Marbuta (ة -> ه)
 * - Normalizes Alef Maksura (ى -> ي)
 * - Normalizes Hamza forms (ؤ, ئ -> ء)
 * - Collapses repeated characters (e.g. "رخااام" -> "رخام")
 * - Normalizes punctuation and extra whitespace
 */
export function normalizeArabic(input: string): string {
  return input
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670\u0640]/g, '') // strip tashkeel & tatweel
    .replace(/[؟،؛«»"']/g, ' ') // strip Arabic punctuation
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/[ؤئ]/g, 'ء')
    .replace(/(.)\1{2,}/g, '$1') // collapse 3+ repeated letters
    .replace(/[^\u0600-\u06FFa-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Levenshtein edit distance for typo tolerance in Arabic words.
 */
export function levenshteinDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j] + 1 // deletion
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

/**
 * Checks if normalized query matches a keyword or phrase with typo resilience.
 */
function scorePhraseMatch(normalizedQuery: string, queryWords: string[], rawPhrase: string): number {
  const phrase = normalizeArabic(rawPhrase);
  if (!phrase) return 0;

  // Exact substring match
  if (normalizedQuery === phrase) return 25;
  if (normalizedQuery.includes(phrase)) {
    return phrase.includes(' ') ? 18 : 12;
  }

  // Word-by-word & fuzzy matching
  const phraseWords = phrase.split(' ').filter(Boolean);
  let matchedWords = 0;

  for (const pw of phraseWords) {
    // Strip Arabic definite article "ال" for stem comparison
    const pwStem = pw.startsWith('ال') && pw.length > 4 ? pw.slice(2) : pw;

    let wordMatched = false;
    for (const qw of queryWords) {
      const qwStem = qw.startsWith('ال') && qw.length > 4 ? qw.slice(2) : qw;
      if (qw === pw || qwStem === pwStem) {
        wordMatched = true;
        break;
      }
      if (qwStem.length >= 4 && pwStem.length >= 4) {
        if (qwStem.includes(pwStem) || pwStem.includes(qwStem)) {
          wordMatched = true;
          break;
        }
        const dist = levenshteinDistance(qwStem, pwStem);
        const maxDist = pwStem.length >= 6 ? 2 : 1;
        if (dist <= maxDist) {
          wordMatched = true;
          break;
        }
      }
    }

    if (wordMatched) {
      matchedWords++;
    }
  }

  if (matchedWords === phraseWords.length && phraseWords.length > 0) {
    return phraseWords.length > 1 ? 14 : 9;
  }
  if (phraseWords.length > 1 && matchedWords >= Math.ceil(phraseWords.length * 0.65)) {
    return 6;
  }
  return 0;
}

interface SpecificServiceRule {
  serviceId: string;
  keywords: string[];
}

const SPECIFIC_SERVICE_RULES: SpecificServiceRule[] = [
  {
    serviceId: 'home-decor',
    keywords: [
      'ديكور منازل',
      'ديكور منزل',
      'ديكورات منازل',
      'ديكور بيوت',
      'ديكور فلل',
      'ديكور شقق',
      'تصميم منزل',
      'تصميم بيت',
      'المنازل',
      'البيوت',
      'الفلل',
      'الشقق',
    ],
  },
  {
    serviceId: 'commercial-decor',
    keywords: [
      'ديكور محلات',
      'محلات تجاريه',
      'محل تجاري',
      'ديكور محل',
      'ديكور كافيه',
      'ديكور مطعم',
      'ديكور معرض',
      'معارض تجاريه',
      'المحلات التجاريه',
      'كافيهات',
    ],
  },
  {
    serviceId: 'marble-alternative',
    keywords: [
      'بديل الرخام',
      'بديل رخام',
      'الواح رخام',
      'شبيه الرخام',
      'الرخام البديل',
      'رخام جدران',
    ],
  },
  {
    serviceId: 'wood-alternative',
    keywords: [
      'بديل الخشب',
      'بديل خشب',
      'شرائح خشب',
      'تكسيات خشب',
      'تكسيات خشبيه',
      'الخشب البديل',
      'wpc',
    ],
  },
  {
    serviceId: 'tv-wall-units',
    keywords: [
      'شاشات جداريه',
      'شاشه جداريه',
      'شاشات تلفزيون',
      'شاشه تلفزيون',
      'مكتبه تلفزيون',
      'مكتبات شاشات',
      'خلفيه شاشه',
      'طاوله تلفزيون',
      'ديكور شاشه',
    ],
  },
  {
    serviceId: 'gypsum-ceilings',
    keywords: [
      'اسقف جبسيه',
      'سقف جبس',
      'جبس بورد',
      'جبسبورد',
      'اسقف مستعاره',
      'الاسقف الجبسيه',
      'سقف مجلس',
    ],
  },
  {
    serviceId: 'gypsum-works',
    keywords: ['الجبسيات', 'جبسيات', 'اعمال جبس', 'ديكورات جبس', 'جبس جداري'],
  },
  {
    serviceId: 'paints',
    keywords: [
      'الدهانات',
      'دهانات',
      'دهان',
      'بويه',
      'طلاء',
      'صباغه',
      'رنق',
      'الوان جدران',
      'تشطيب دهان',
    ],
  },
  {
    serviceId: 'wallpaper',
    keywords: ['ورق الحائط', 'ورق حائط', 'ورق جدران', 'جداريات ورق'],
  },
  {
    serviceId: 'chipboard-alternative',
    keywords: ['بديل الشيبورد', 'شيبورد', 'بديل شيبورد', 'الواح شيبورد'],
  },
  {
    serviceId: 'spc-parquet',
    keywords: [
      'باركيه spc',
      'باركيه',
      'ارضيات باركيه',
      'ارضيات خشبيه',
      'باركية',
      'spc',
    ],
  },
  {
    serviceId: 'illuminated-skirting',
    keywords: [
      'نعلات مضيئه',
      'نعله مضيئه',
      'نعلات ليد',
      'نعلات مخفيه',
      'نعلات جداريه',
      'نعلات',
    ],
  },
  {
    serviceId: 'foam-frames',
    keywords: [
      'براويز فوم',
      'فوم جداري',
      'بانوهات فوم',
      'براويز جداريه',
      'فيوتك',
      'فوم كلاسيك',
    ],
  },
  {
    serviceId: '3d-clocks',
    keywords: ['ساعات 3d', 'ساعه 3d', 'ساعات جداريه', 'ساعات ثلاثيه الابعاد'],
  },
  {
    serviceId: 'epoxy-flooring',
    keywords: [
      'ارضيات الايبوكسي',
      'ايبوكسي',
      'إيبوكسي',
      'ارضيات ايبوكسي',
      'epoxy',
    ],
  },
  {
    serviceId: 'wood-carpentry',
    keywords: [
      'النجاره الخشبيه',
      'نجاره خشبيه',
      'اعمال نجاره',
      'تفصيل خشب',
      'خزائن خشب',
      'كونسول خشب',
    ],
  },
  {
    serviceId: 'engineering-designs',
    keywords: ['تصاميم هندسيه', 'تصميم هندسي', 'مخططات هندسيه', 'مخطط ديكور'],
  },
  {
    serviceId: 'engineering-service',
    keywords: [
      'خدمه هندسيه',
      'خدمات هندسيه',
      'استشارات هندسيه',
      'اشراف هندسي',
      'مهندس ديكور',
    ],
  },
  {
    serviceId: 'general-contracting',
    keywords: [
      'المقاولات العامه',
      'مقاولات عامه',
      'مقاولات',
      'بناء ومقاولات',
      'شركه مقاولات',
    ],
  },
  {
    serviceId: 'finishing-works',
    keywords: ['اعمال التشطيب', 'تشطيبات', 'تشطيب شقق', 'تشطيب كامل', 'تسليم مفتاح'],
  },
  {
    serviceId: 'interior-execution',
    keywords: ['تنفيذ الاعمال الداخليه', 'تنفيذ داخلي', 'تنفيذ ديكورات'],
  },
  {
    serviceId: 'interior-decor',
    keywords: ['ديكورات داخليه', 'ديكور داخلي', 'تصميم داخلي'],
  },
  {
    serviceId: 'decor-design-execution',
    keywords: ['تصميم وتنفيذ الديكورات', 'تصميم وتنفيذ'],
  },
];

export const WELCOME_SUGGESTIONS = [
  'أريد التعرف على خدماتكم.',
  'أين موقعكم؟',
  'أريد مشاهدة أعمالكم.',
  'ما أوقات الدوام؟',
  'كيف أتواصل معكم؟',
  'هل لديكم بديل رخام وبديل خشب؟',
];

/**
 * Generates an accurate local response based on user query without any external API.
 */
export function getAssistantResponse(rawQuery: string, now: Date = new Date()): AssistantResponse {
  const normalized = normalizeArabic(rawQuery);
  const queryWords = normalized.split(' ').filter(Boolean);

  if (!normalized) {
    return {
      intentId: 'welcome',
      answer:
        'مرحباً بك في فنون للديكور (FUNUN DECOR). أنا مساعد فنون الذكي المحلي، يسعدني إجابتك حول خدماتنا، موقعنا في عدن، أوقات الدوام، ومعرض أعمالنا.',
      actions: [
        { label: 'استعرض خدماتنا', type: 'scroll', target: '#services' },
        { label: 'معرض أعمالنا', type: 'scroll', target: '#portfolio' },
      ],
      suggestedFollowUps: WELCOME_SUGGESTIONS.slice(0, 4),
    };
  }

  // 1. Check Greeting Intent (only if short greeting without specific question)
  const greetingKeywords = ['مرحبا', 'اهلا', 'السلام عليكم', 'سلام', 'صباح الخير', 'مساء الخير', 'هلا', 'حياكم'];
  if (
    queryWords.length <= 3 &&
    greetingKeywords.some((g) => scorePhraseMatch(normalized, queryWords, g) >= 9)
  ) {
    return {
      intentId: 'greeting',
      answer:
        'أهلاً وسهلاً بك في شركة فنون للديكور (FUNUN DECOR) بمدينة عدن! كيف يمكنني مساعدتك اليوم؟ يمكنك سؤالي عن أي خدمة من خدمات التصميم والديكور والتشطيب والمقاولات، أو عن موقعنا وأوقات دوامنا.',
      actions: [
        { label: 'استكشف خدماتنا (23 خدمة)', type: 'scroll', target: '#services' },
        { label: 'شاهد معرض الأعمال', type: 'scroll', target: '#portfolio' },
      ],
      suggestedFollowUps: [
        'ما الخدمات التي تقدمها فنون؟',
        'أين يقع مقر فنون للديكور؟',
        'ما أوقات الدوام؟',
      ],
    };
  }

  // 2. Check Specific Services (e.g., بديل الرخام، بديل الخشب، ديكور منازل، ديكور محلات، شاشات جدارية، أسقف جبسية، دهانات، خدمات هندسية، مقاولات...)
  const matchedServices: { serviceId: string; score: number }[] = [];
  for (const rule of SPECIFIC_SERVICE_RULES) {
    let bestRuleScore = 0;
    for (const kw of rule.keywords) {
      const s = scorePhraseMatch(normalized, queryWords, kw);
      if (s > bestRuleScore) bestRuleScore = s;
    }
    if (bestRuleScore >= 9) {
      matchedServices.push({ serviceId: rule.serviceId, score: bestRuleScore });
    }
  }

  matchedServices.sort((a, b) => b.score - a.score);

  // Special case: user asks about general services list ("ما الخدمات التي تقدمها فنون؟" / "أريد التعرف على خدماتكم")
  const generalServicesKeywords = [
    'ما الخدمات',
    'ما هي الخدمات',
    'الخدمات التي تقدمها',
    'التعرف علي خدماتكم',
    'خدماتكم',
    'ايش خدماتكم',
    'شو خدماتكم',
    'ماذا تقدمون',
    'قائمه الخدمات',
    'كل الخدمات',
    'جميع الخدمات',
  ];
  const generalServicesScore = Math.max(
    ...generalServicesKeywords.map((kw) => scorePhraseMatch(normalized, queryWords, kw))
  );

  if (
    matchedServices.length > 0 &&
    (matchedServices[0].score >= 12 || generalServicesScore < 12)
  ) {
    const primaryService = SERVICES_DATA.find((s) => s.id === matchedServices[0].serviceId);
    if (primaryService) {
      // Check if user asked about 2 materials together (e.g. "بديل رخام وخشب")
      const secondService =
        matchedServices.length > 1
          ? SERVICES_DATA.find((s) => s.id === matchedServices[1].serviceId)
          : undefined;

      if (secondService && matchedServices[1].score >= 9 && secondService.id !== primaryService.id) {
        return {
          intentId: `service-${primaryService.id}-${secondService.id}`,
          answer: `نعم، نقدم في فنون للديكور كلاً من خدمة «${primaryService.title}» وخدمة «${secondService.title}»:\n• ${primaryService.title}: ${primaryService.shortDescription}\n• ${secondService.title}: ${secondService.shortDescription}`,
          actions: [
            {
              label: `تفاصيل ${primaryService.title}`,
              type: 'open-service',
              target: '#services',
              serviceId: primaryService.id,
            },
            {
              label: 'مشاهدة الأعمال المنفذة',
              type: 'filter-portfolio',
              target: '#portfolio',
              portfolioCategory: primaryService.relatedPortfolioCategory,
            },
            {
              label: 'تواصل عبر واتساب',
              type: 'external',
              target: COMPANY_INFO.contact.whatsappUrl,
            },
          ],
          suggestedFollowUps: [
            'أين يمكن مشاهدة الأعمال؟',
            'ما أوقات الدوام؟',
            'أين موقعكم؟',
          ],
        };
      }

      return {
        intentId: `service-${primaryService.id}`,
        answer: `نعم، نقدم خدمة «${primaryService.title}» ضمن قسم (${primaryService.categoryLabel}).\n\n${primaryService.fullDescription}\n\nأبرز ما يميز الخدمة:\n• ${primaryService.features.join('\n• ')}`,
        actions: [
          {
            label: `عرض تفاصيل ${primaryService.title}`,
            type: 'open-service',
            target: '#services',
            serviceId: primaryService.id,
          },
          {
            label: 'مشاهدة أعمال مرتبطة بالخدمة',
            type: 'filter-portfolio',
            target: '#portfolio',
            portfolioCategory: primaryService.relatedPortfolioCategory,
          },
          {
            label: 'استفسر عبر واتساب',
            type: 'external',
            target: COMPANY_INFO.contact.whatsappUrl,
          },
        ],
        suggestedFollowUps: [
          'ما الخدمات التي تقدمها فنون؟',
          'أريد مشاهدة أعمالكم.',
          'كيف أتواصل معكم؟',
        ],
      };
    }
  }

  // 3. Evaluate Core Intents: Location, Contact/Phone/WhatsApp, Working Hours, Portfolio, All Services, About/Why Funun, Work Process, Pricing
  const intentScores: Record<string, number> = {
    location: Math.max(
      ...[
        'اين موقعكم',
        'ما موقع الشركه',
        'اين يقع مقر فنون',
        'اين تقع',
        'موقعكم',
        'عنوانكم',
        'العنوان',
        'الموقع',
        'وين مكانكم',
        'فين موقعكم',
        'شارع الخمسين',
        'البيرق مول',
        'عدن',
        'خريطه',
        'خرائط جوجل',
        'لوكيشن',
        'المقر',
      ].map((kw) => scorePhraseMatch(normalized, queryWords, kw))
    ),
    contact: Math.max(
      ...[
        'ما رقم الهاتف',
        'كيف اتواصل معكم',
        'واتساب',
        'الواتساب',
        'رقم الواتس',
        'رقم التلفون',
        'رقم الجوال',
        'اتصال',
        'تواصل',
        'فيسبوك',
        'صفحه الفيسبوك',
        'ارقام التواصل',
        'رقمكم',
      ].map((kw) => scorePhraseMatch(normalized, queryWords, kw))
    ),
    hours: Math.max(
      ...[
        'ما اوقات الدوام',
        'اوقات الدوام',
        'مواعيد العمل',
        'ساعات العمل',
        'متي تفتحون',
        'متي الدوام',
        'هل انتم فاتحين',
        'مفتوح الان',
        'دوام الجمعه',
        'وقت الدوام',
        'الدوام',
      ].map((kw) => scorePhraseMatch(normalized, queryWords, kw))
    ),
    portfolio: Math.max(
      ...[
        'اين يمكن مشاهده الاعمال',
        'اريد مشاهده اعمالكم',
        'معرض الاعمال',
        'معرض اعمالنا',
        'صور اعمالكم',
        'شغلكم',
        'مشاريعكم',
        'اعمالكم',
        'نماذج اعمال',
        'صور ديكورات',
      ].map((kw) => scorePhraseMatch(normalized, queryWords, kw))
    ),
    services: generalServicesScore,
    process: Math.max(
      ...[
        'خطوات العمل',
        'كيف يتم التنفيذ',
        'طريقه العمل',
        'مراحل المشروع',
        'كيف نبدا',
      ].map((kw) => scorePhraseMatch(normalized, queryWords, kw))
    ),
    about: Math.max(
      ...[
        'من نحن',
        'عن الشركه',
        'ما هي شركه فنون',
        'لماذا فنون',
        'مميزات فنون',
        'عرفني عن فنون',
      ].map((kw) => scorePhraseMatch(normalized, queryWords, kw))
    ),
    pricing: Math.max(
      ...[
        'كم السعر',
        'الاسعار',
        'بكم المتر',
        'كم التكلفه',
        'سعر المتر',
        'عروض الاسعار',
        'تكلفه',
      ].map((kw) => scorePhraseMatch(normalized, queryWords, kw))
    ),
  };

  const bestIntent = Object.entries(intentScores).sort((a, b) => b[1] - a[1])[0];

  if (bestIntent && bestIntent[1] >= 8) {
    const intentKey = bestIntent[0];

    if (intentKey === 'location') {
      return {
        intentId: 'location',
        answer: `يقع مقر شركة فنون للديكور (FUNUN DECOR) في:\n📍 ${COMPANY_INFO.contact.address}\n\nيمكنك زيارتنا مباشرة أو فتح الموقع عبر خرائط Google Maps للوصول إلينا بسهولة.`,
        actions: [
          {
            label: 'فتح الموقع في خرائط Google',
            type: 'external',
            target: COMPANY_INFO.contact.googleMapsUrl,
          },
          { label: 'الانتقال لقسم الموقع والتواصل', type: 'scroll', target: '#contact' },
          {
            label: 'تواصل عبر واتساب',
            type: 'external',
            target: COMPANY_INFO.contact.whatsappUrl,
          },
        ],
        suggestedFollowUps: ['ما أوقات الدوام؟', 'ما رقم الهاتف؟', 'ما الخدمات التي تقدمها فنون؟'],
      };
    }

    if (intentKey === 'contact') {
      return {
        intentId: 'contact',
        answer: `يسعدنا تواصلك المباشر مع فنون للديكور عبر القنوات الرسمية التالية:\n• رقم الهاتف والواتساب: ${COMPANY_INFO.contact.phone}\n• العنوان: ${COMPANY_INFO.contact.address}\n\nاضغط على أحد الأزرار أدناه للاتصال الفوري أو بدء محادثة واتساب مباشرة:`,
        actions: [
          {
            label: 'محادثة واتساب مباشرة',
            type: 'external',
            target: COMPANY_INFO.contact.whatsappUrl,
          },
          {
            label: `اتصال هاتفي (${COMPANY_INFO.contact.phone})`,
            type: 'external',
            target: COMPANY_INFO.contact.telUrl,
          },
          {
            label: 'صفحتنا على فيسبوك',
            type: 'external',
            target: COMPANY_INFO.contact.facebookUrl,
          },
        ],
        suggestedFollowUps: ['أين موقعكم؟', 'ما أوقات الدوام؟', 'أريد مشاهدة أعمالكم.'],
      };
    }

    if (intentKey === 'hours') {
      const status = getAdenWorkStatus(now);
      const scheduleLines = WORKING_HOURS_SCHEDULE.map(
        (d) => `• ${d.dayNameAr}: ${d.hoursText}`
      ).join('\n');
      return {
        intentId: 'hours',
        answer: `أوقات الدوام الرسمي لشركة فنون للديكور في عدن:\n${scheduleLines}\n\nحالة الدوام الآن بتوقيت عدن (${status.adenTimeFormatted}): ${status.statusDetail}.`,
        actions: [
          { label: 'عرض جدول أوقات الدوام', type: 'scroll', target: '#hours' },
          {
            label: 'تواصل عبر واتساب',
            type: 'external',
            target: COMPANY_INFO.contact.whatsappUrl,
          },
        ],
        suggestedFollowUps: ['أين موقعكم؟', 'كيف أتواصل معكم؟', 'أريد التعرف على خدماتكم.'],
      };
    }

    if (intentKey === 'portfolio') {
      return {
        intentId: 'portfolio',
        answer:
          'يمكنك مشاهدة أعمالنا الحقيقية في قسم «معرض أعمالنا» داخل الموقع، والذي يضم صوراً مصنفة لأعمالنا في: المجالس والصالات، الشاشات الجدارية، ديكورات الجدران، المداخل والممرات، الأسقف الجبسية، بديل الرخام والخشب، وديكور المحلات التجارية.',
        actions: [
          { label: 'تصفح معرض الأعمال الآن', type: 'scroll', target: '#portfolio' },
          {
            label: 'عرض أعمال الشاشات الجدارية',
            type: 'filter-portfolio',
            target: '#portfolio',
            portfolioCategory: 'tv-units',
          },
          {
            label: 'عرض أعمال المجالس والصالات',
            type: 'filter-portfolio',
            target: '#portfolio',
            portfolioCategory: 'majlis',
          },
        ],
        suggestedFollowUps: [
          'هل لديكم بديل رخام؟',
          'هل تنفذون ديكور المحلات التجارية؟',
          'كيف أتواصل معكم؟',
        ],
      };
    }

    if (intentKey === 'services') {
      return {
        intentId: 'services',
        answer:
          'تقدم شركة فنون للديكور (23 خدمة متكاملة) موزعة على ثلاثة أقسام رئيسية:\n\n1️⃣ الديكورات والتصميم: ديكور منازل، ديكور محلات تجارية، ديكورات داخلية، تصاميم هندسية، خدمة هندسية، تصميم وتنفيذ الديكورات، شاشات جدارية، وأسقف جبسية.\n\n2️⃣ الديكورات الداخلية والتشطيبات: بديل الرخام، بديل الخشب، الجبسيات، ورق الحائط، بديل الشيبورد، باركيه SPC، نعلات مضيئة، براويز فوم، ساعات 3D، أرضيات الإيبوكسي، الدهانات، والنجارة الخشبية.\n\n3️⃣ المقاولات: المقاولات العامة، أعمال التشطيب، وتنفيذ الأعمال الداخلية.',
        actions: [
          { label: 'تصفح بطاقات الخدمات', type: 'scroll', target: '#services' },
          { label: 'شاهد معرض الأعمال', type: 'scroll', target: '#portfolio' },
          {
            label: 'استشارة عبر واتساب',
            type: 'external',
            target: COMPANY_INFO.contact.whatsappUrl,
          },
        ],
        suggestedFollowUps: [
          'هل تقدمون ديكور المنازل؟',
          'هل تنفذون ديكور المحلات التجارية؟',
          'هل تنفذون المقاولات العامة؟',
        ],
      };
    }

    if (intentKey === 'process') {
      const stepsSummary = WORK_STEPS.map((s) => `${s.step}. ${s.title}`).join('\n');
      return {
        intentId: 'process',
        answer: `تتم رحلة تنفيذ مشروعك في فنون للديكور عبر 6 خطوات منظمة:\n${stepsSummary}`,
        actions: [
          { label: 'عرض قسم خطوات العمل', type: 'scroll', target: '#process' },
          {
            label: 'ابدأ مشروعك عبر واتساب',
            type: 'external',
            target: COMPANY_INFO.contact.whatsappUrl,
          },
        ],
        suggestedFollowUps: ['ما الخدمات التي تقدمها فنون؟', 'أين موقعكم؟'],
      };
    }

    if (intentKey === 'about') {
      return {
        intentId: 'about',
        answer: `${COMPANY_INFO.aboutTitle}\n\n${COMPANY_INFO.aboutParagraphs.join(' ')}`,
        actions: [
          { label: 'قسم من نحن', type: 'scroll', target: '#about' },
          { label: 'لماذا فنون للديكور؟', type: 'scroll', target: '#why-funun' },
        ],
        suggestedFollowUps: ['ما الخدمات التي تقدمها فنون؟', 'أريد مشاهدة أعمالكم.'],
      };
    }

    if (intentKey === 'pricing') {
      return {
        intentId: 'pricing',
        answer:
          'لا تتوفر لديّ أسعار ثابتة في قاعدة المعرفة المحلية لأن تكلفة التصميم والتنفيذ تعتمد على مساحة الموقع، الخامات المختارة (مثل بديل الرخام، بديل الخشب، الجبسيات، أو التشطيب الكامل)، وتفاصيل التصميم المطلوب.\n\nيرجى التواصل معنا مباشرة عبر الهاتف أو واتساب لتزويدك بالتقدير الدقيق لمشروعك.',
        actions: [
          {
            label: 'اطلب تسعيرة عبر واتساب',
            type: 'external',
            target: COMPANY_INFO.contact.whatsappUrl,
          },
          {
            label: `اتصل بنا (${COMPANY_INFO.contact.phone})`,
            type: 'external',
            target: COMPANY_INFO.contact.telUrl,
          },
        ],
        suggestedFollowUps: ['ما الخدمات التي تقدمها فنون؟', 'أين موقعكم؟'],
      };
    }
  }

  // Fallback when no confirmed answer exists in the knowledge base (Rule 13: never invent information!)
  return {
    intentId: 'fallback',
    answer:
      'عذراً، لا أمتلك إجابة مؤكدة حول هذا الاستفسار في قاعدة المعرفة المحلية الخاصة بالموقع. حرصاً على تزويدك بمعلومة دقيقة وموثوقة، يرجى التواصل المباشر مع فريق فنون للديكور عبر الهاتف أو واتساب.',
    actions: [
      {
        label: 'تواصل معنا عبر واتساب',
        type: 'external',
        target: COMPANY_INFO.contact.whatsappUrl,
      },
      {
        label: `اتصال مباشر (${COMPANY_INFO.contact.phone})`,
        type: 'external',
        target: COMPANY_INFO.contact.telUrl,
      },
      { label: 'استكشف خدماتنا', type: 'scroll', target: '#services' },
    ],
    suggestedFollowUps: WELCOME_SUGGESTIONS.slice(0, 4),
  };
}
