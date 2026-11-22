export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  category: 'design-decor' | 'finishes-materials' | 'contracting';
  categoryLabel: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  image: string;
  relatedPortfolioCategory: PortfolioCategoryId;
}

export type PortfolioCategoryId =
  | 'all'
  | 'majlis'
  | 'tv-units'
  | 'walls'
  | 'entrances'
  | 'ceilings'
  | 'marble-wood'
  | 'commercial';

export interface PortfolioItem {
  id: string;
  title: string;
  category: Exclude<PortfolioCategoryId, 'all'>;
  secondaryCategories?: PortfolioCategoryId[];
  categoryLabel: string;
  description: string;
  materialsUsed: string[];
  image: string;
  isRealOnSiteExecution?: boolean;
}

export interface WorkingDaySchedule {
  dayIndex: number; // 0 = Sunday ... 6 = Saturday
  dayNameAr: string;
  hoursText: string;
  openHour: number; // 24-hour format
  openMinute: number;
  closeHour: number;
  closeMinute: number;
}

export const COMPANY_INFO = {
  nameAr: 'فنون للديكور',
  nameEn: 'FUNUN DECOR',
  logo: '/assets/aistudio/logo_3c67a92a.png',
  heroBadgeLocation: '📍 اليمن، عدن، شارع الخمسين.',
  heroTitle: 'نصنع من المساحات العادية عالماً من الجمال والفخامة.',
  heroSubtitle:
    'في فنون للديكور، نحول أفكارك إلى تصاميم واقعية تجمع بين الإبداع والدقة والجودة، من التصميم الهندسي إلى التنفيذ والتشطيبات النهائية.',
  heroImage: '/assets/aistudio/1795207415241_effe83c8.jpg',
  aboutTitle: 'نحن فنون... حيث يلتقي الإبداع بجمال التفاصيل.',
  aboutParagraphs: [
    'فنون للديكور شركة متخصصة في أعمال التصميم والتنفيذ والديكورات الداخلية والخدمات الهندسية والمقاولات العامة في مدينة عدن.',
    'نعمل على تحويل المساحات إلى بيئات تجمع بين الأناقة والوظيفة العملية، من خلال تقديم حلول متنوعة في التصميم والديكور والتشطيبات، مع الاهتمام بأدق التفاصيل واختيار المواد والتصاميم التي تناسب احتياجات كل مشروع.',
    'نؤمن بأن كل مساحة تستحق تصميماً يعكس شخصية أصحابها، ولذلك نحرص على تقديم أعمال تجمع بين الذوق والجودة والاهتمام بالتفاصيل.',
  ],
  aboutImages: {
    main: '/assets/aistudio/1_0dee882e.jpg',
    secondary: '/assets/aistudio/Screenshot_________________Maps_1a9e874a.jpg',
  },
  contact: {
    phone: '+967777655419',
    phoneDisplay: '777 655 419 (967+)',
    whatsapp: '+967777655419',
    whatsappUrl: 'https://wa.me/967777655419',
    whatsappReadyMessage:
      'مرحباً شركة فنون للديكور (FUNUN DECOR)، أود الاستفسار وطلب استشارة حول خدمات التصميم والتنفيذ والديكور.',
    whatsappReadyUrl: `https://wa.me/967777655419?text=${encodeURIComponent(
      'مرحباً شركة فنون للديكور (FUNUN DECOR)، أود الاستفسار وطلب استشارة حول خدمات التصميم والتنفيذ والديكور.'
    )}`,
    telUrl: 'tel:+967777655419',
    facebookUrl: 'https://www.facebook.com/share/1DyDAtZu7n/',
    googleMapsUrl: 'https://maps.app.goo.gl/k9PDkicGPWHvAUeJ9',
    address: 'اليمن، عدن، شارع الخمسين، بجانب البيرق مول بـ 300 متر.',
    city: 'عدن، اليمن',
  },
};

export const SERVICE_CATEGORIES = [
  { id: 'all', label: 'جميع الخدمات (23)' },
  { id: 'design-decor', label: 'أولاً: الديكورات والتصميم' },
  { id: 'finishes-materials', label: 'ثانياً: الديكورات الداخلية والتشطيبات' },
  { id: 'contracting', label: 'ثالثاً: المقاولات والتشطيب' },
] as const;

export const SERVICES_DATA: ServiceItem[] = [
  // أولاً: الديكورات والتصميم (8 خدمات)
  {
    id: 'home-decor',
    number: '01',
    title: 'ديكور منازل',
    category: 'design-decor',
    categoryLabel: 'الديكورات والتصميم',
    shortDescription:
      'تصميم وتنفيذ ديكورات المنازل والفلل والشقق بأسلوب عصري أو كلاسيكي يجمع بين الفخامة والراحة.',
    fullDescription:
      'نقدم في فنون للديكور حلولاً متكاملة لديكور المنازل والفلل والشقق السكنية في عدن، تشمل توزيع المساحات، تنسيق الألوان والإضاءة، واختيار الخامات الجدارية والأرضيات والأسقف التي تمنح منزلك طابعاً راقياً ومتناسقاً.',
    features: [
      'تصميم وتنفيذ المجالس والصالات وغرف المعيشة',
      'تنسيق المداخل والممرات وغرف النوم',
      'توزيع مدروس للإضاءة المخفية والحديثة',
    ],
    image: '/assets/aistudio/Screenshot_________________Maps_16f375dc.jpg',
    relatedPortfolioCategory: 'majlis',
  },
  {
    id: 'commercial-decor',
    number: '02',
    title: 'ديكور محلات تجارية',
    category: 'design-decor',
    categoryLabel: 'الديكورات والتصميم',
    shortDescription:
      'ابتكار هويات مكانية جذابة للمحلات التجارية والكافيهات والمعارض تعزز تجربة العملاء وتبرز علامتك التجارية.',
    fullDescription:
      'نحول المحلات التجارية، الكافيهات، المطاعم، والمكاتب إلى مساحات احترافية جاذبة للعملاء مع استغلال ذكي لكل متر مربع وتصميم واجهات عرض وكاونترات وإضاءة مدروسة تعكس هوية مشروعك التجاري.',
    features: [
      'تصميم وتنفيذ ديكورات المعارض والكافيهات والمحلات',
      'تصميم طاولات العرض والكاونترات والأقواس الديكورية',
      'توزيع الإضاءة التسويقية لإبراز المنتجات والخدمات',
    ],
    image: '/assets/aistudio/Screenshot_________________Maps_a3bcd1a9.jpg',
    relatedPortfolioCategory: 'commercial',
  },
  {
    id: 'interior-decor',
    number: '03',
    title: 'ديكورات داخلية',
    category: 'design-decor',
    categoryLabel: 'الديكورات والتصميم',
    shortDescription:
      'تطوير الفراغات الداخلية بلمسات فنية تجمع بين الجمال البصري والوظيفة العملية لكل ركن.',
    fullDescription:
      'نعنى بتفاصيل الديكورات الداخلية بكافة عناصرها من جدران وأسقف وأرضيات ومرايا وإضاءة، لنخلق تناغماً بصرياً يضفي اتساعاً وفخامة على المساحات الداخلية المختلفة.',
    features: [
      'دمج متناغم بين الخامات الحديثة والإضاءة الدافئة',
      'معالجة المساحات والزوايا بحلول ديكورية مبتكرة',
      'تشطيبات دقيقة تراعي الذوق الشخصي للعميل',
    ],
    image: '/assets/aistudio/Screenshot_________________Maps_8699e62d.jpg',
    relatedPortfolioCategory: 'majlis',
  },
  {
    id: 'engineering-designs',
    number: '04',
    title: 'تصاميم هندسية',
    category: 'design-decor',
    categoryLabel: 'الديكورات والتصميم',
    shortDescription:
      'إعداد التصاميم والمخططات الهندسية والمعمارية المدروسة قبل البدء بالتنفيذ لضمان دقة النتائج.',
    fullDescription:
      'نضع تصورات هندسية واضحة ومخططات دقيقة لتوزيع المساحات والديكورات ونقاط الكهرباء والإضاءة، مما يتيح للعميل رؤية واضحة للمشروع وضمان تنفيذ خالٍ من الأخطاء.',
    features: [
      'دراسة المساحات وتوزيع الأثاث والعناصر المعمارية',
      'مخططات الأسقف الجبسية وتوزيع مسارات الإضاءة',
      'مواءمة التصميم مع متطلبات التنفيذ الفعلي',
    ],
    image: '/assets/aistudio/Screenshot_________________Maps_43015b64.jpg',
    relatedPortfolioCategory: 'majlis',
  },
  {
    id: 'engineering-service',
    number: '05',
    title: 'خدمة هندسية',
    category: 'design-decor',
    categoryLabel: 'الديكورات والتصميم',
    shortDescription:
      'استشارات وإشراف هندسي متخصص لمتابعة مراحل المشروع واختيار أفضل الحلول الفنية والمواد.',
    fullDescription:
      'نوفر خدمات هندسية متكاملة تشمل المعاينة الميدانية، رفع المقاسات، تقديم الاستشارات الفنية لاختيار المواد المناسبة، والإشراف المباشر على جودة التنفيذ والتشطيب.',
    features: [
      'معاينة الموقع ورفع المقاسات الهندسية بدقة',
      'استشارات فنية لاختيار أنسب الخامات والتصاميم',
      'متابعة جودة مراحل التنفيذ خطوة بخطوة',
    ],
    image: '/assets/aistudio/Screenshot_________________Maps_1a9e874a.jpg',
    relatedPortfolioCategory: 'majlis',
  },
  {
    id: 'decor-design-execution',
    number: '06',
    title: 'تصميم وتنفيذ الديكورات',
    category: 'design-decor',
    categoryLabel: 'الديكورات والتصميم',
    shortDescription:
      'خدمة شاملة تبدأ من بلورة الفكرة والتصميم وحتى التنفيذ الميداني الكامل والتسليم النهائي.',
    fullDescription:
      'نرافقك في رحلة متكاملة من الفكرة إلى الواقع؛ حيث نتولى مسؤولية التصميم الهندسي والديكوري ثم ننفذه على أرض الواقع بأيدي فنيين مختصين وبأجود الخامات لضمان مطابقة التنفيذ للتصميم.',
    features: [
      'تكامل تام بين مرحلة التصميم ومرحلة التنفيذ',
      'التزام بالدقة في التفاصيل وجودة التشطيبات',
      'توفير الوقت والجهد عبر التعامل مع جهة واحدة مسؤولة',
    ],
    image: '/assets/aistudio/1_0dee882e.jpg',
    relatedPortfolioCategory: 'tv-units',
  },
  {
    id: 'tv-wall-units',
    number: '07',
    title: 'شاشات جدارية',
    category: 'design-decor',
    categoryLabel: 'الديكورات والتصميم',
    shortDescription:
      'تصميم وتنفيذ وحدات ومكتبات شاشات التلفزيون الجدارية الحديثة بخطوط منحنية وإضاءة مخفية.',
    fullDescription:
      'نبتكر خلفيات ووحدات شاشات تلفزيون جدارية عصرية تجمع بين التكسيات المنحنية، بديل الرخام، بديل الخشب، الأرفف الزجاجية المضاءة، والطاولات المعلقة مع إخفاء التمديدات والأسلاك بالكامل.',
    features: [
      'تصاميم عصرية منحنية وهندسية مع إضاءة LED مخفية',
      'طاولات كونسول معلقة وخزائن عرض زجاجية وخشبية',
      'تأسيس مخفي ومتقن لمآخذ الكهرباء والتلفزيون',
    ],
    image: '/assets/aistudio/Screenshot_________________Maps_7045d8a0.jpg',
    relatedPortfolioCategory: 'tv-units',
  },
  {
    id: 'gypsum-ceilings',
    number: '08',
    title: 'أسقف جبسية',
    category: 'design-decor',
    categoryLabel: 'الديكورات والتصميم',
    shortDescription:
      'تنفيذ الأسقف الجبسية الحديثة والكلاسيكية المزخرفة مع مسارات الإضاءة المغناطيسية والمخفية.',
    fullDescription:
      'ننفذ مختلف تصاميم الأسقف الجبسية (جبس بورد وأسقف زخرفية كلاسيكية ومودرن)، بما يشمل بيوت النور المخفية، مسارات الإضاءة المغناطيسية السوداء (Magnetic Track)، والقباب المزخرفة للمجالس.',
    features: [
      'أسقف جبسية فلات ومودرن مع Magnetic Track Lights',
      'أسقف مجالس كلاسيكية مزخرفة بنقوش ذهبية وإضاءة مخفية',
      'تشطيبات ناعمة ومستوية بأعلى معايير الدقة',
    ],
    image: '/assets/aistudio/Screenshot_________________Maps_8f5958ff.jpg',
    relatedPortfolioCategory: 'ceilings',
  },

  // ثانياً: خدمات الديكورات الداخلية والتشطيبات (12 خدمة)
  {
    id: 'marble-alternative',
    number: '09',
    title: 'بديل الرخام',
    category: 'finishes-materials',
    categoryLabel: 'الديكورات الداخلية والتشطيبات',
    shortDescription:
      'تركيب ألواح بديل الرخام الفاخرة للجدران والمداخل والشاشات بمظهر الرخام الطبيعي اللامع والمطفي.',
    fullDescription:
      'نوفر ونركب تشكيلة واسعة من ألواح بديل الرخام عالي الجودة بعروق طبيعية أنيقة، مثالية لخلفيات الشاشات، جدران المجالس، والمداخل، مع دمجها بشرائح الاستيل الذهبي أو الإضاءة المخفية.',
    features: [
      'مظهر رخامي فاخر مقاوم للرطوبة وسهل التنظيف',
      'تركيب احترافي بدون فواصل ظاهرة مع إضاءة خلفية',
      'تنوع في الألوان والعروق الرخامية لتناسب كل مساحة',
    ],
    image: '/assets/aistudio/Screenshot_________________Maps_43058f9b.jpg',
    relatedPortfolioCategory: 'marble-wood',
  },
  {
    id: 'wood-alternative',
    number: '10',
    title: 'بديل الخشب',
    category: 'finishes-materials',
    categoryLabel: 'الديكورات الداخلية والتشطيبات',
    shortDescription:
      'تكسيات شرائح بديل الخشب (WPC) تضفي دفئاً وفخامة عصرية على الجدران والمداخل ووحدات التلفزيون.',
    fullDescription:
      'نستخدم شرائح بديل الخشب المضلع والمسطح بدرجات خشبية طبيعية أو ألوان موحدة (أبيض، بيج، جوزي داكن) لتكسية الجدران، تأطير المرايا، وتجميل المداخل وغرف المعيشة.',
    features: [
      'مقاومة عالية للرطوبة والحشرات وتغير المناخ',
      'تناغم مثالي مع بديل الرخام والمرايا والإضاءة الخطية',
      'متوفر بدرجات لونية ومقاسات مضلعة متعددة',
    ],
    image: '/assets/aistudio/Screenshot_________________Maps_abf2b114.jpg',
    relatedPortfolioCategory: 'marble-wood',
  },
  {
    id: 'gypsum-works',
    number: '11',
    title: 'الجبسيات',
    category: 'finishes-materials',
    categoryLabel: 'الديكورات الداخلية والتشطيبات',
    shortDescription:
      'أعمال الجبسيات الجدارية، القواطع، الحفر البارز 3D، والتشكيلات المنحنية المضاءة.',
    fullDescription:
      'نبدع في تشكيل الجبسيات الديكورية للجدران والمداخل والأسقف، بما في ذلك الجداريات المنحنية المفرغة بالإضاءة، اللوحات الجدارية البارزة ثلاثية الأبعاد، والتكوينات الجبسية المعمارية.',
    features: [
      'تشكيلات جبسية جدارية منحنية مع إضاءة مخفية',
      'جداريات بارزة ونقوش ثلاثية الأبعاد متقنة',
      'قواطع وتجاويف جدارية (نيش) للعرض والإضاءة',
    ],
    image: '/assets/aistudio/Screenshot_________________Maps_27781f69.jpg',
    relatedPortfolioCategory: 'walls',
  },
  {
    id: 'wallpaper',
    number: '12',
    title: 'ورق الحائط',
    category: 'finishes-materials',
    categoryLabel: 'الديكورات الداخلية والتشطيبات',
    shortDescription:
      'توريد وتركيب ورق الحائط الفاخر والجداريات الثلاثية الأبعاد بنقوش ملمسية وكلاسيكية ومودرن.',
    fullDescription:
      'نقدم خيارات منتقاة من ورق الحائط والجداريات ذات الملمس البارز والنقوش الفنية التي تحول الجدران الصامتة إلى لوحات فنية متكاملة مع التأطير الخشبي أو الفوم.',
    features: [
      'خامات قابلة للتنظيف ومقاومة للعوامل الجوية',
      'تركيب متقن مع معالجة الجدار الأساسي لضمان الاستدامة',
      'تشكيلة واسعة من التصاميم الهادئة والجداريات البارزة',
    ],
    image: '/assets/aistudio/Screenshot_________________Maps_d3da4c45.jpg',
    relatedPortfolioCategory: 'walls',
  },
  {
    id: 'chipboard-alternative',
    number: '13',
    title: 'بديل الشيبورد',
    category: 'finishes-materials',
    categoryLabel: 'الديكورات الداخلية والتشطيبات',
    shortDescription:
      'تكسيات جدارية راقية ببديل الشيبورد تمنح الجدران والشاشات الجدارية مظهراً فندقياً عصرياً.',
    fullDescription:
      'يعد بديل الشيبورد من أحدث صيحات التكسيات الجدارية الفاخرة، حيث يوفر أسطحاً مطفية أو خشبية عريضة بحواف وزوايا منحنية وفواصل كحلية أنيقة للمجالس ووحدات التلفزيون.',
    features: [
      'تصميم فندقي أنيق بألواح عريضة وزوايا انسيابية',
      'تناسق رائع مع مسارات الإضاءة السوداء والذهبية',
      'متانة عالية ومظهر عصري هادئ للمجالس والشاشات',
    ],
    image: '/assets/aistudio/Screenshot_________________Maps_988923a4.jpg',
    relatedPortfolioCategory: 'marble-wood',
  },
  {
    id: 'spc-parquet',
    number: '14',
    title: 'باركيه SPC',
    category: 'finishes-materials',
    categoryLabel: 'الديكورات الداخلية والتشطيبات',
    shortDescription:
      'تركيب أرضيات باركيه SPC المقاومة للماء والخدش بمظهر الخشب الطبيعي الدافئ.',
    fullDescription:
      'نركب أرضيات الباركيه الحديثة (SPC) التي تجمع بين جمال وأناقة الخشب الطبيعي والقوة الفائقة المقاومة للماء والرطوبة والاحتكاك، مما يجعلها مثالية للمنازل والمكاتب والمحلات.',
    features: [
      'مقاومة تامة للماء والرطوبة وسهولة في العناية',
      'عزل صوتي وحراري وملمس خشبي طبيعي مريح',
      'تركيب سريع ودقيق بنظام القفل المتشابك مع النعلات',
    ],
    image: '/assets/aistudio/Screenshot_________________Maps_8699e62d.jpg',
    relatedPortfolioCategory: 'entrances',
  },
  {
    id: 'illuminated-skirting',
    number: '15',
    title: 'نعلات مضيئة',
    category: 'finishes-materials',
    categoryLabel: 'الديكورات الداخلية والتشطيبات',
    shortDescription:
      'نعلات جدارية حديثة مزودة بمسارات إضاءة LED مخفية تمنح الممرات والصالات فخامة استثنائية.',
    fullDescription:
      'ننفذ النعلات المضيئة (Illuminated Skirting Boards) المصنوعة من الألمنيوم أو البوليمر المقوى مع إضاءة LED دافئة تنعكس على الأرضيات وتبرز فخامة الممرات والمداخل ليلاً.',
    features: [
      'إضاءة أرضية دافئة ومريحة للعين في الممرات والصالات',
      'حماية أسفل الجدران من الرطوبة والصدمات أثناء التنظيف',
      'تشطيب انسيابي يخفي تمديدات الأسلاك بالكامل',
    ],
    image: '/assets/aistudio/Screenshot_________________Maps_64003cc1.jpg',
    relatedPortfolioCategory: 'entrances',
  },
  {
    id: 'foam-frames',
    number: '16',
    title: 'براويز فوم',
    category: 'finishes-materials',
    categoryLabel: 'الديكورات الداخلية والتشطيبات',
    shortDescription:
      'تشكيل وتركيب براويز وبانوهات الفوم الجدارية لإضفاء الطابع النيو كلاسيك الفخم على الصالات والمداخل.',
    fullDescription:
      'نصمم ونركب بانوهات وبراويز الفوم والفيوتك بمقاسات هندسية متناظرة تمنح الجدران طابع القصور والفلل النيو كلاسيك، مع إمكانية طلائها بنفس لون الجدار أو تطعيمها بالإضاءة الجدارية.',
    features: [
      'تصاميم نيو كلاسيك وكلاسيك متناظرة بدقة بالليزر',
      'مقاومة للرطوبة وقابلة للدهان بجميع الألوان',
      'مثالية للمجالس، صالات الطعام، والمداخل المرتفعة',
    ],
    image: '/assets/aistudio/Screenshot_________________Maps_3e9a25d8.jpg',
    relatedPortfolioCategory: 'majlis',
  },
  {
    id: '3d-clocks',
    number: '17',
    title: 'ساعات 3D',
    category: 'finishes-materials',
    categoryLabel: 'الديكورات الداخلية والتشطيبات',
    shortDescription:
      'تركيب الساعات الجدارية ثلاثية الأبعاد والإكسسوارات الجدارية البارزة لتكملة أناقة الجدران.',
    fullDescription:
      'نعتني باللمسات النهائية المكملة للديكور مثل الساعات الجدارية ثلاثية الأبعاد (3D) والعناصر الفنية البارزة التي تتوسط الجدران أو تكمل تصميم الشاشات والمجالس بتناسق مدروس.',
    features: [
      'تصاميم بارزة باللون الذهبي والأسود والفضي',
      'ضبط دقيق للمقاسات والمحاور في منتصف الجدار',
      'تكامل بصري مع براويز الفوم وبديل الرخام والخشب',
    ],
    image: '/assets/aistudio/Screenshot_________________Maps_8699e62d.jpg',
    relatedPortfolioCategory: 'walls',
  },
  {
    id: 'epoxy-flooring',
    number: '18',
    title: 'أرضيات الإيبوكسي',
    category: 'finishes-materials',
    categoryLabel: 'الديكورات الداخلية والتشطيبات',
    shortDescription:
      'تنفيذ أرضيات الإيبوكسي العصرية اللامعة والمطفية بدون فواصل بمظهر رخامي أو موحد فائق النعومة.',
    fullDescription:
      'نقدم خدمة تطبيق أرضيات الإيبوكسي (Epoxy Flooring) للمنازل والمعارض والمحلات التجارية، للحصول على سطح أملس لامع أو حريري بدون فواصل، يتميز بالمتانة العالية والمظهر العصري الفريد.',
    features: [
      'سطح متصل بدون فواصل سهل التنظيف ومقاوم للبقع',
      'تأثيرات رخامية وميتاليك أو ألوان موحدة هادئة',
      'تحمل عالٍ للاستخدام اليومي في المنازل والمعارض',
    ],
    image: '/assets/aistudio/Screenshot_________________Maps_f61731fc.jpg',
    relatedPortfolioCategory: 'entrances',
  },
  {
    id: 'paints',
    number: '19',
    title: 'الدهانات',
    category: 'finishes-materials',
    categoryLabel: 'الديكورات الداخلية والتشطيبات',
    shortDescription:
      'أعمال الدهانات الداخلية والخارجية والديكورية بألوان متناسقة وتشطيب مخملي ناعم.',
    fullDescription:
      'ننفذ كافة أعمال تأسيس وتشطيب الدهانات الحديثة والديكورية (تعتيق، قطيفة، تأثيرات إسمنتية ورملية، وألوان سادة فاخرة كالأبيض العاجي والبيج الدافئ) مع معالجة الجدران بأعلى جودة.',
    features: [
      'تأسيس ومعجون احترافي يضمن نعومة واستواء الجدران',
      'استخدام دهانات عالية الجودة قابلة للغسيل وثابتة اللون',
      'تنسيق لوني مدروس مع الإضاءة والأثاث والتكسيات',
    ],
    image: '/assets/aistudio/Screenshot_________________Maps_3e9a25d8.jpg',
    relatedPortfolioCategory: 'majlis',
  },
  {
    id: 'wood-carpentry',
    number: '20',
    title: 'النجارة الخشبية',
    category: 'finishes-materials',
    categoryLabel: 'الديكورات الداخلية والتشطيبات',
    shortDescription:
      'تفصيل وتنفيذ أعمال النجارة الخشبية الديكورية، المكتبات، الكونسول، الأبواب، والخزائن المدمجة.',
    fullDescription:
      'نمتلك خبرة متميزة في تنفيذ أعمال النجارة الخشبية المخصصة للديكور، مثل طاولات التلفزيون المعلقة، خزائن العرض المضاءة، طاولات الكونسول في المداخل، والتكسيات والأبواب الخشبية.',
    features: [
      'تفصيل حسب المقاس بدقة عالية وتشطيبات قشرة خشبية فاخرة',
      'دمج الإضاءة الداخلية والزجاج الأسود مع الخزائن الخشبية',
      'مفصلات وسكك سحب ناعمة وعمر افتراضي طويل',
    ],
    image: '/assets/aistudio/Screenshot_________________Maps_68331749.jpg',
    relatedPortfolioCategory: 'tv-units',
  },

  // ثالثاً: المقاولات (3 خدمات)
  {
    id: 'general-contracting',
    number: '21',
    title: 'المقاولات العامة',
    category: 'contracting',
    categoryLabel: 'المقاولات والتشطيب',
    shortDescription:
      'تنفيذ مشاريع المقاولات العامة والبناء والتعديلات المعمارية وفق أصول الهندسة والجودة.',
    fullDescription:
      'نتولى في فنون للديكور أعمال المقاولات العامة وتهيئة المباني والمنشآت السكنية والتجارية في عدن، من الأعمال الإنشائية والتقسيمات المعمارية وحتى تجهيز الموقع للتشطيبات الكاملة.',
    features: [
      'إدارة وتنفيذ المشاريع السكنية والتجارية بكفاءة',
      'تعديلات معمارية وتوسعة وإعادة تقسيم المساحات',
      'إشراف هندسي مباشر والتزام بمعايير السلامة والجودة',
    ],
    image: '/assets/aistudio/Screenshot_________________Maps_f61731fc.jpg',
    relatedPortfolioCategory: 'walls',
  },
  {
    id: 'finishing-works',
    number: '22',
    title: 'أعمال التشطيب',
    category: 'contracting',
    categoryLabel: 'المقاولات والتشطيب',
    shortDescription:
      'تشطيب متكامل للمباني والشقق والمحلات من العظم وحتى تسليم المفتاح بأعلى مستويات الإتقان.',
    fullDescription:
      'نقدم خدمات التشطيب الكامل (تأسيس كهرباء وإضاءة، سباكة، محارة، أرضيات وبورسلان، أسقف جبسية، دهانات، وأبواب) لتحويل المبنى من هيكل خرساني إلى مساحة جاهزة للسكن أو العمل.',
    features: [
      'تشطيب متكامل متناسق المراحل تحت إشراف واحد',
      'تأسيس دقيق للكهرباء ونقاط الإضاءة الذكية والمخفية',
      'تركيب الأرضيات والجبسيات والدهانات بجودة عالية',
    ],
    image: '/assets/aistudio/Screenshot_________________Maps_7f425aff.jpg',
    relatedPortfolioCategory: 'tv-units',
  },
  {
    id: 'interior-execution',
    number: '23',
    title: 'تنفيذ الأعمال الداخلية',
    category: 'contracting',
    categoryLabel: 'المقاولات والتشطيب',
    shortDescription:
      'تنفيذ ميداني دقيق لكافة البنود الداخلية والتجديدات المعمارية والديكورية في الموقع.',
    fullDescription:
      'سواء كنت ترغب في تنفيذ تصميم جديد أو تجديد مساحة قائمة، يقوم فريقنا بتنفيذ كافة الأعمال الداخلية في الموقع بدقة ونظافة عالية مع الحفاظ على تناسق جميع العناصر.',
    features: [
      'تجديد وتطوير الصالات والمجالس والمحلات القائمة',
      'تركيب كافة التكسيات الجدارية والخزائن والإضاءات',
      'تسليم المشروع نظيفاً وجاهزاً للاستخدام',
    ],
    image: '/assets/aistudio/Screenshot_________________Maps_64003cc1.jpg',
    relatedPortfolioCategory: 'tv-units',
  },
];

export const PORTFOLIO_CATEGORIES: { id: PortfolioCategoryId; label: string }[] = [
  { id: 'all', label: 'جميع الأعمال' },
  { id: 'majlis', label: 'مجالس وصالات' },
  { id: 'tv-units', label: 'شاشات تلفزيون جدارية' },
  { id: 'walls', label: 'ديكورات جدران' },
  { id: 'entrances', label: 'مداخل وممرات' },
  { id: 'marble-wood', label: 'بديل الرخام والخشب' },
  { id: 'ceilings', label: 'أسقف جبسية' },
  { id: 'commercial', label: 'ديكور محلات تجارية' },
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'work-01',
    title: 'مجلس وصالة استقبال بجدارية متموجة ثلاثية الأبعاد',
    category: 'majlis',
    secondaryCategories: ['walls'],
    categoryLabel: 'مجالس وصالات',
    description:
      'تصميم مجلس فاخر بارتفاع مزدوج يجمع بين جدارية بارزة بخطوط انسيابية، تكسيات خشبية جانبية مع وحدات إضاءة جدارية، وثريا ذهبية.',
    materialsUsed: ['جداريات 3D', 'بديل الخشب', 'إضاءة مخفية دافئة'],
    image: '/assets/aistudio/Screenshot_________________Maps_16f375dc.jpg',
  },
  {
    id: 'work-02',
    title: 'وحدة شاشة جدارية منحنية مع أرفف عرض مضاءة',
    category: 'tv-units',
    secondaryCategories: ['marble-wood'],
    categoryLabel: 'شاشات تلفزيون جدارية',
    description:
      'شاشة تلفزيون جدارية بتصميم عصري ذي زوايا دائرية ناعمة باللون البيج الدافئ، مع وحدة عرض جانبية مضاءة وتكسيات خشبية خلفية.',
    materialsUsed: ['شاشات جدارية', 'بديل الشيبورد', 'النجارة الخشبية', 'إضاءة LED'],
    image: '/assets/aistudio/Screenshot_________________Maps_7045d8a0.jpg',
  },
  {
    id: 'work-03',
    title: 'مدخل رئيسي فاخر بالمرايا وبديل الرخام والخشب',
    category: 'entrances',
    secondaryCategories: ['marble-wood', 'ceilings'],
    categoryLabel: 'مداخل وممرات',
    description:
      'تصميم مدخل استثنائي يتوسطه كونسول خشبي معلق ومرآة طولية محاطة بألواح بديل الرخام المضاءة وشرائح بديل الخشب وسقف جبسي ببيت نور.',
    materialsUsed: ['بديل الرخام', 'بديل الخشب', 'أسقف جبسية', 'كونسول خشبي'],
    image: '/assets/aistudio/Screenshot_________________Maps_1a9e874a.jpg',
  },
  {
    id: 'work-04',
    title: 'تنفيذ ميداني لوحدة شاشة جدارية بالزجاج الأسود والخشب',
    category: 'tv-units',
    secondaryCategories: ['walls'],
    categoryLabel: 'شاشات تلفزيون جدارية',
    description:
      'من أعمالنا المنفذة على أرض الواقع: وحدة شاشة جدارية تجمع بين التكسيات المنحنية باللون البيج، الزجاج الأسود اللامع مع أرفف، وأدراج خشبية معلقة.',
    materialsUsed: ['تنفيذ ميداني', 'شاشات جدارية', 'نجارة خشبية', 'مسارات إضاءة مغناطيسية'],
    image: '/assets/aistudio/1_0dee882e.jpg',
    isRealOnSiteExecution: true,
  },
  {
    id: 'work-05',
    title: 'ديكور محل تجاري وكافيه بأقواس كلاسيكية عصرية',
    category: 'commercial',
    secondaryCategories: ['ceilings'],
    categoryLabel: 'ديكور محلات تجارية',
    description:
      'تصميم وتنفيذ متكامل لمحل تجاري وكافيه يتضمن أقواساً جدارية بإضاءات كروية، سقفاً جبسياً منحني الحواف بإضاءة دافئة، وواجهات عرض زجاجية.',
    materialsUsed: ['ديكور محلات تجارية', 'أسقف جبسية', 'نجارة وكاونترات', 'إضاءة ديكورية'],
    image: '/assets/aistudio/Screenshot_________________Maps_a3bcd1a9.jpg',
  },
  {
    id: 'work-06',
    title: 'تنفيذ ميداني لمكتبة وشاشة جدارية بخزائن زجاجية مضاءة',
    category: 'tv-units',
    secondaryCategories: ['walls'],
    categoryLabel: 'شاشات تلفزيون جدارية',
    description:
      'تنفيذ واقعي لمكتبة شاشة تلفزيون ممتدة على كامل الجدار مع خزائن عرض جانبية بإطارات سوداء وإضاءة داخلية وأدراج خشبية سفلية.',
    materialsUsed: ['تنفيذ ميداني', 'النجارة الخشبية', 'شاشات جدارية', 'إضاءة مخفية'],
    image: '/assets/aistudio/Screenshot_________________Maps_64003cc1.jpg',
    isRealOnSiteExecution: true,
  },
  {
    id: 'work-07',
    title: 'تنفيذ ميداني لجدارية محفورة ثلاثية الأبعاد بإضاءة مخفية',
    category: 'walls',
    secondaryCategories: ['majlis'],
    categoryLabel: 'ديكورات جدران',
    description:
      'تنفيذ ميداني متقن لجدار صالة رئيسي يضم لوحتين عموديتين بنقوش محفورة ثلاثية الأبعاد مع إضاءة طولية دافئة وتطعيمات رخامية داكنة.',
    materialsUsed: ['تنفيذ ميداني', 'الجبسيات وجداريات 3D', 'بديل الرخام', 'الدهانات'],
    image: '/assets/aistudio/Screenshot_________________Maps_43015b64.jpg',
    isRealOnSiteExecution: true,
  },
  {
    id: 'work-08',
    title: 'سقف جبسي ملكي دائري مزخرف بالذهبي لمجلس عربي',
    category: 'ceilings',
    secondaryCategories: ['majlis'],
    categoryLabel: 'أسقف جبسية',
    description:
      'سقف جبسي فخم بتصميم قبة دائرية مزخرفة بالنقوش الذهبية البارزة وزخارف الإضاءة الليزرية المخفية مع جدار شاشة ببديل الرخام.',
    materialsUsed: ['أسقف جبسية مزخرفة', 'الجبسيات', 'بديل الرخام', 'إضاءة مخفية'],
    image: '/assets/aistudio/Screenshot_________________Maps_8f5958ff.jpg',
  },
  {
    id: 'work-09',
    title: 'صالة استقبال فاخرة بجدارية متموجة وتكسيات الرخام والخشب',
    category: 'majlis',
    secondaryCategories: ['walls', 'marble-wood'],
    categoryLabel: 'مجالس وصالات',
    description:
      'تناغم استثنائي بين جدارية فنية متموجة في صدر المجلس وألواح الرخام الطبيعي وبديل الخشب على الجانبين مع إضاءة جدارية دافئة.',
    materialsUsed: ['ديكورات جدران', 'بديل الرخام', 'بديل الخشب', 'مجالس وصالات'],
    image: '/assets/aistudio/Screenshot_________________Maps_d3da4c45.jpg',
  },
  {
    id: 'work-10',
    title: 'ديكور جدار مدخل منحني مع بديل الخشب ورف عائم',
    category: 'entrances',
    secondaryCategories: ['walls', 'marble-wood'],
    categoryLabel: 'مداخل وممرات',
    description:
      'تصميم فني لمدخل منزلي يجمع بين خط جبسي منحني مضاء من الخلف وشرائح بديل الخشب الداكن مع رف خشبي طبيعي معلق ونعلات مضيئة.',
    materialsUsed: ['الجبسيات المنحنية', 'بديل الخشب', 'النجارة الخشبية', 'نعلات مضيئة'],
    image: '/assets/aistudio/Screenshot_________________Maps_8699e62d.jpg',
  },
  {
    id: 'work-11',
    title: 'حائط مجلس بدمج ألواح بديل الرخام وبديل الخشب المضاء',
    category: 'marble-wood',
    secondaryCategories: ['majlis', 'walls'],
    categoryLabel: 'بديل الرخام والخشب',
    description:
      'تنسيق هندسي متناوب بين ألواح بديل الرخام البيج وتكسيات الخشب الدافئ مع مسارات إضاءة LED عمودية خلف كنب المجلس.',
    materialsUsed: ['بديل الرخام', 'بديل الخشب', 'إضاءة مخفية'],
    image: '/assets/aistudio/Screenshot_________________Maps_43058f9b.jpg',
  },
  {
    id: 'work-12',
    title: 'صالة جلوس عصرية بتكسيات بديل الشيبورد وبديل الخشب',
    category: 'marble-wood',
    secondaryCategories: ['majlis'],
    categoryLabel: 'بديل الرخام والخشب',
    description:
      'تصميم صالة استقبال رسمية بتكسيات جدارية كاملة من بديل الشيبورد وأعمدة شرائح بديل الخشب المضلعة مع سقف جبسي بإضاءة محيطية.',
    materialsUsed: ['بديل الشيبورد', 'بديل الخشب', 'أسقف جبسية'],
    image: '/assets/aistudio/Screenshot_________________Maps_988923a4.jpg',
  },
  {
    id: 'work-13',
    title: 'وحدة شاشة جدارية انسيابية مع أرفف جانبية ومسار مغناطيسي',
    category: 'tv-units',
    secondaryCategories: ['ceilings'],
    categoryLabel: 'شاشات تلفزيون جدارية',
    description:
      'تنفيذ شاشة تلفزيون جدارية بتصميم منحني ناعم باللون الكريمي مع مكتبة خشبية سفلية معلقة وأرفف خشبية وسقف بإضاءة مغناطيسية.',
    materialsUsed: ['شاشات جدارية', 'النجارة الخشبية', 'أسقف جبسية'],
    image: '/assets/aistudio/Screenshot_________________Maps_68331749.jpg',
    isRealOnSiteExecution: true,
  },
  {
    id: 'work-14',
    title: 'بهو استقبال نيو كلاسيك ببراويز الفوم وثريا كريستالية',
    category: 'majlis',
    secondaryCategories: ['walls', 'ceilings'],
    categoryLabel: 'مجالس وصالات',
    description:
      'تصميم بهو استقبال واسع مزين ببانوهات وبراويز الفوم الجدارية الكلاسيكية مع إضاءة سقفية خطية وثريا كريستالية فاخرة.',
    materialsUsed: ['براويز فوم', 'الدهانات', 'أسقف جبسية'],
    image: '/assets/aistudio/Screenshot_________________Maps_3e9a25d8.jpg',
  },
  {
    id: 'work-15',
    title: 'صالة طعام واستقبال نيو كلاسيك بأسقف جبسية وبراويز جدارية',
    category: 'ceilings',
    secondaryCategories: ['majlis'],
    categoryLabel: 'أسقف جبسية',
    description:
      'تكامل التصميم بين سقف جبسي حديث بمسارات إضاءة خطية وثريا متدلية مع جدران مزينة ببراويز الفوم والأبواب الزجاجية.',
    materialsUsed: ['أسقف جبسية', 'براويز فوم', 'ديكور منازل'],
    image: '/assets/aistudio/Screenshot_________________Maps_27781f69.jpg',
  },
  {
    id: 'work-16',
    title: 'جدارية فنية ثلاثية الأبعاد بنقوش الزهور مع بديل الخشب',
    category: 'walls',
    secondaryCategories: ['majlis'],
    categoryLabel: 'ديكورات جدران',
    description:
      'جدارية بارزة ثلاثية الأبعاد بتفاصيل نباتية فنية مسلطة عليها إضاءة سبوت لايت دافئة ومؤطرة بشرائح بديل الخشب على الجانبين.',
    materialsUsed: ['ديكورات جدران 3D', 'ورق الحائط والجداريات', 'بديل الخشب'],
    image: '/assets/aistudio/Screenshot_________________Maps_abf2b114.jpg',
  },
  {
    id: 'work-17',
    title: 'مدخل وممر داخلي هادئ بجدار خشبي مقوس وإضاءة خطية',
    category: 'entrances',
    secondaryCategories: ['walls'],
    categoryLabel: 'مداخل وممرات',
    description:
      'تصميم ممر داخلي minimalist يبرز جمال الخطوط المعمارية النظيفة مع زاوية خشبية مقوسة وإضاءة LED محيطية.',
    materialsUsed: ['مداخل وممرات', 'بديل الخشب', 'نعلات وإضاءة مخفية'],
    image: '/assets/aistudio/Screenshot_________________Maps_f61731fc.jpg',
  },
  {
    id: 'work-18',
    title: 'مدخل منزلي بمرايا مقسمة وشرائح بديل الخشب وأرضية باركيه',
    category: 'entrances',
    secondaryCategories: ['marble-wood'],
    categoryLabel: 'مداخل وممرات',
    description:
      'ديكور مدخل أنيق يجمع بين المرايا الطولية المقسمة هندسياً وشرائح بديل الخشب الأبيض مع كونسول معلق وأرضية باركيه SPC.',
    materialsUsed: ['بديل الخشب', 'باركيه SPC', 'مرايا وكونسول'],
    image: '/assets/aistudio/Screenshot_________________Maps_7f425aff.jpg',
  },
  {
    id: 'work-19',
    title: 'كونسول مدخل عصري بمرآة كاملة وإضاءة طولية',
    category: 'entrances',
    secondaryCategories: ['walls'],
    categoryLabel: 'مداخل وممرات',
    description:
      'مدخل مشرق بمرآة ممتدة من الأرض حتى السقف محاطة بمسارات إضاءة LED وشرائح جدارية مضلعة ورف كونسول أبيض معلق.',
    materialsUsed: ['مداخل وممرات', 'بديل الخشب', 'إضاءة LED طولية'],
    image: '/assets/aistudio/Screenshot_________________Maps_1a9e874a.jpg',
  },
];

export const WHY_CHOOSE_FUNUN = {
  title: 'لماذا فنون للديكور؟',
  subtitle:
    'لأننا نؤمن أن جمال التصميم لا يكتمل إلا بجودة التنفيذ والاهتمام بكل تفصيلة.',
  items: [
    {
      number: '01',
      title: 'تنوع خدمات التصميم والتنفيذ',
      description:
        'نوفر منظومة متكاملة تشمل التصميم الهندسي، الديكورات الداخلية والخارجية، التشطيبات الحديثة، والمقاولات العامة تحت سقف واحد.',
    },
    {
      number: '02',
      title: 'الاهتمام بالتفاصيل والجودة',
      description:
        'نولي عناية فائقة لأدق التفاصيل في الفواصل، الإضاءة المخفية، استواء الأسطح، وتناسق الألوان لضمان نتيجة نهائية فاخرة.',
    },
    {
      number: '03',
      title: 'حلول تناسب احتياجات المساحات المختلفة',
      description:
        'ندرس طبيعة كل مساحة سكنية أو تجارية لنبتكر حلولاً ذكية تستثمر المساحة بأفضل شكل ممكن وتمنحها اتساعاً وأناقة.',
    },
    {
      number: '04',
      title: 'الجمع بين الجانب الجمالي والوظيفي',
      description:
        'لا نكتفي بالمظهر الجميل فحسب، بل نحرص على أن يكون كل عنصر ديكوري عملياً ومريحاً في الاستخدام اليومي ويدوم طويلاً.',
    },
    {
      number: '05',
      title: 'تنوع الخامات والمواد المستخدمة',
      description:
        'نقدم خيارات واسعة من أحدث الخامات كبديل الرخام، بديل الخشب، بديل الشيبورد، الجبسيات، باركيه SPC، الإيبوكسي، والدهانات الفاخرة.',
    },
    {
      number: '06',
      title: 'الاهتمام برضا العميل وتطلعاته',
      description:
        'نستمع لرؤيتك بعناية ونحول تطلعاتك إلى واقع ملموس يعكس ذوقك الشخصي أو هوية مشروعك التجاري بكل احترافية.',
    },
  ],
};

export const WORK_STEPS = [
  {
    step: '01',
    title: 'التواصل معنا ومناقشة الفكرة',
    description:
      'تبدأ رحلتنا بتواصلك معنا عبر الهاتف أو واتساب أو زيارة مقرنا في عدن – شارع الخمسين لطرح فكرتك وتطلعاتك.',
  },
  {
    step: '02',
    title: 'فهم احتياجات العميل والمساحة',
    description:
      'ندرس متطلباتك الوظيفية والجمالية ونعاين المساحة وطبيعة الاستخدام لنحدد التوجه التصميمي الأمثل.',
  },
  {
    step: '03',
    title: 'إعداد التصور والتصميم المناسب',
    description:
      'نبتكر التصور التصميمي والهندسي المتناسق مع توزيع الخامات والألوان والإضاءة بما يلائم ذوقك وميزانيتك.',
  },
  {
    step: '04',
    title: 'تحديد متطلبات التنفيذ',
    description:
      'نعتمد الخامات والمواد المطلوبة (من جبسيات، بديل رخام وخشب، نجارة، دهانات، وأرضيات) ونرتب خطة العمل.',
  },
  {
    step: '05',
    title: 'تنفيذ الأعمال والتشطيبات',
    description:
      'يباشر فريقنا الفني تنفيذ الديكورات والتشطيبات على أرض الواقع بدقة عالية وإشراف مستمر على كل تفصيلة.',
  },
  {
    step: '06',
    title: 'تسليم المشروع',
    description:
      'نراجع كافة تفاصيل العمل للتأكد من جودتها ومطابقتها للتصور المتفق عليه، ثم نسلمك مساحتك جاهزة تنبض بالجمال.',
  },
];

export const WORKING_HOURS_SCHEDULE: WorkingDaySchedule[] = [
  {
    dayIndex: 4, // Thursday
    dayNameAr: 'الخميس',
    hoursText: '9:00 صباحاً – 10:00 مساءً',
    openHour: 9,
    openMinute: 0,
    closeHour: 22,
    closeMinute: 0,
  },
  {
    dayIndex: 5, // Friday
    dayNameAr: 'الجمعة',
    hoursText: '4:00 مساءً – 10:00 مساءً',
    openHour: 16,
    openMinute: 0,
    closeHour: 22,
    closeMinute: 0,
  },
  {
    dayIndex: 6, // Saturday
    dayNameAr: 'السبت',
    hoursText: '9:00 صباحاً – 10:00 مساءً',
    openHour: 9,
    openMinute: 0,
    closeHour: 22,
    closeMinute: 0,
  },
  {
    dayIndex: 0, // Sunday
    dayNameAr: 'الأحد',
    hoursText: '9:00 صباحاً – 10:00 مساءً',
    openHour: 9,
    openMinute: 0,
    closeHour: 22,
    closeMinute: 0,
  },
  {
    dayIndex: 1, // Monday
    dayNameAr: 'الاثنين',
    hoursText: '9:00 صباحاً – 10:00 مساءً',
    openHour: 9,
    openMinute: 0,
    closeHour: 22,
    closeMinute: 0,
  },
  {
    dayIndex: 2, // Tuesday
    dayNameAr: 'الثلاثاء',
    hoursText: '9:00 صباحاً – 10:00 مساءً',
    openHour: 9,
    openMinute: 0,
    closeHour: 22,
    closeMinute: 0,
  },
  {
    dayIndex: 3, // Wednesday
    dayNameAr: 'الأربعاء',
    hoursText: '9:00 صباحاً – 10:00 مساءً',
    openHour: 9,
    openMinute: 0,
    closeHour: 22,
    closeMinute: 0,
  },
];
