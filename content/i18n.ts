// UI copy in both languages. Arabic is the default locale and lives at "/"; English lives under "/en".
// Business facts stay in content/site.ts and the other content files; this file only holds wording.

export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ar";

/** Cookie set by the language toggle so unprefixed URLs open in the visitor's chosen language. */
export const LANG_COOKIE = "th-lang";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Public URL path for a route in a locale. Arabic has no prefix. */
export function localePath(lang: Locale, path: string): string {
  const clean = path === "" ? "/" : path;
  if (lang === "ar") return clean;
  return clean === "/" ? "/en" : `/en${clean}`;
}

/** Strip a leading /en or /ar from a browser pathname. */
export function stripLocale(pathname: string): string {
  const stripped = pathname.replace(/^\/(en|ar)(?=\/|$)/, "");
  return stripped === "" ? "/" : stripped;
}

export const dir = (lang: Locale) => (lang === "ar" ? "rtl" : "ltr");

const en = {
  meta: {
    title: "Trim Haus Gents Salon | The Filipino Barbershop, Al Ain",
    template: "%s | Trim Haus Gents Salon, Al Ain",
    description:
      "Trim Haus Gents Salon, the Filipino barbershop on Khalifa Street, Al Ain. Haircuts from AED 25, fades, shaves, facials and colour. Open every day 9 am – 10 pm. Book on WhatsApp.",
    ogLocale: "en_AE",
    ogAlt: "Trim Haus Gents Salon shopfront with gold signage",
  },
  common: {
    businessName: "Trim Haus Gents Salon",
    brand: "Trim Haus",
    tagline: "The Filipino Barbershop",
    bookChair: "Book a chair",
    book: "Book",
    whatsapp: "WhatsApp",
    whatsappUs: "WhatsApp us",
    call: "Call",
    price: (n: number) => `AED ${n}`,
    currency: "AED",
    sep: ", ",
    skip: "Skip to content",
    nav: { home: "Home", prices: "Prices", barbers: "Barbers", visit: "Visit" },
    mainNav: "Main",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    switchLabel: "العربية",
    switchLang: "ar",
    switchAria: "التبديل إلى العربية",
    demo: (agency: string) => ({ strong: "Demo preview", rest: ` prepared for Trim Haus Gents Salon by ${agency}. Bookings are simulated.` }),
    hideDemo: "Hide demo notice",
    hours: "Every day, 9 am – 10 pm",
    openUntil: (t: string) => `Open now · until ${t}`,
    closedOpens: (t: string, tomorrow: boolean) => `Closed · opens ${t}${tomorrow ? " tomorrow" : ""}`,
    rating: (v: number, c: number) => ({ value: String(v), rest: ` on Google · ${c} reviews` }),
  },
  address: {
    street: "Khalifa Street",
    district: "Central District (Hai Qesaidah)",
    city: "Al Ain, Abu Dhabi",
    plusCode: "Plus code",
  },
  home: {
    heroTitle: "Sharp fades on Khalifa Street, Al Ain.",
    heroText: "Haircuts from AED 25, shaves, facials and colour by our Filipino barbers. Open every day until 10 pm.",
    heroAlt:
      "A Trim Haus barber in black gloves and the white uniform cutting a customer's hair at night, a red Arabic neon sign behind",
    pricesTitle: "Prices on the wall, and here",
    pricesText:
      "A haircut is AED 25. Add a shampoo, facial or scalp massage as a combo and pay less than booking them separately.",
    fullPrices: "See the full price list",
    howTitle: "Book in three steps",
    steps: [
      { title: "Pick a service", text: "Haircut, shave, facial, colour or a combo. Every price is on the page." },
      { title: "Pick your barber and time", text: "Choose your barber or the first free chair, any day from 9 am to 10 pm." },
      { title: "Send it on WhatsApp", text: "Your booking arrives as a ready-made WhatsApp message. The shop replies to confirm." },
    ],
    exampleCaption: "Example: this is what the shop receives.",
    exampleName: "Ahmed",
    barbersTitle: "Your barbers",
    meetTeam: "Meet the team",
    gloves: "Gloves on, every cut.",
    glovesAlt: "Close-up of a barber in black gloves cutting with scissors and comb",
  },
  reviews: {
    title: "What customers say",
    meta: (when: string) => `Google review, ${when}`,
    note: "Quoted from Trim Haus Gents Salon's public Google reviews (checked October 2026).",
  },
  visit: {
    metaTitle: "Visit",
    metaDescription:
      "Trim Haus Gents Salon is on Khalifa Street, Central District, Al Ain. Open every day 9 am – 10 pm. Directions, map and contact.",
    title: "Find us on Khalifa Street",
    hoursTitle: "Opening hours",
    walkIn: "Walk in, or book a chair to skip the wait.",
    directions: "Get directions",
    mapTitle: "Map showing Trim Haus Gents Salon on Khalifa Street, Al Ain",
    signTitle: "Look for the gold sign",
    signAlt:
      "Trim Haus Gents Salon shopfront: black fascia with gold 'Trim Haus Gents Salon' lettering in English and Arabic, glass front",
    signNote: "Shop and building number, and parking: to be confirmed with the salon for the live site.",
  },
  offers: {
    title: "Get our offers on WhatsApp",
    text: "Promos, combo deals and shop news, sent straight to your phone. No spam, and you can leave any time.",
    label: "UAE mobile number",
    placeholder: "UAE mobile, e.g. 050 123 4567",
    error: "Enter a UAE mobile number, for example 050 123 4567.",
    join: "Join the list",
    done: "You're on the list. (Demo: nothing was sent.)",
  },
  footer: {
    logoAlt: "Trim Haus Gents Salon logo, est. 2022",
    blurb: (year: number) => `The Filipino Barbershop on Khalifa Street, Al Ain, since ${year}.`,
    visit: "Visit",
    contact: "Contact",
    facebook: "Facebook",
    privacy: "Privacy",
    terms: "Terms",
    demo: (agency: string) => `Demo preview by ${agency}. Bookings are simulated.`,
  },
  prices: {
    metaTitle: "Prices",
    metaDescription:
      "Trim Haus price list in AED: haircut 25, haircut & shave 35, facial 15, colour 40, highlights 50, and combo offers from 30.",
    title: "Prices",
    intro: "Every service and combo, in dirhams. Tap any line to book it. You pay in the shop.",
    ask: "Ask on WhatsApp",
    askMessage: "Hi Trim Haus, I have a question about your prices.",
    note: "Prices as published on the salon's price list and may change. Ask in the shop.",
    board: "Price list",
    save: (n: number) => `Save AED ${n} on booking separately`,
  },
  barbers: {
    metaTitle: "Barbers",
    metaDescription: "Meet the Filipino barbers at Trim Haus Gents Salon, Al Ain, and book a chair with your favourite.",
    title: "Your barbers",
    intro: "White tunics, black gloves, and a steady hand with clippers. Book your favourite barber, or take the first free chair.",
    bookWith: (name: string) => `Book with ${name}`,
    note: "Demo: barbers are shown as Barber A–D. The live site can add each barber's name and photo once the salon confirms the team.",
    shopTitle: "Inside the shop",
    shopText:
      "A bright, clean room on Khalifa Street, with the gold Trim Haus sign out front. Off the clock, the team plays basketball as Team Trim Haus x Primo.",
    interiorAlt: "A Trim Haus barber trimming a customer's hair in the bright white shop interior",
    windowAlt: "A barber finishing a fade by the shop window at night",
    shopfrontAlt: "Trim Haus Gents Salon shopfront with gold English and Arabic signage",
  },
  book: {
    metaTitle: "Book a chair",
    metaDescription:
      "Book a haircut, shave or facial at Trim Haus Gents Salon, Al Ain. Pick a service, barber and time, then send it on WhatsApp.",
    steps: ["Service", "Barber", "Day & time", "Your name"],
    progress: "Booking progress",
    stepOf: (i: number, n: number, label: string) => `Step ${i} of ${n}: ${label}`,
    stepAria: (i: number, label: string) => `Step ${i}: ${label}`,
    serviceTitle: "What are you in for?",
    serviceTabs: "Service type",
    about: (n: number) => `About ${n} min`,
    saveShort: (n: number) => `save AED ${n}`,
    serviceNote: "Prices from the salon's price list. Times are a guide.",
    barberTitle: "Who's cutting?",
    anyNote: "First free chair: most choice of times",
    timeTitle: "Pick a day and time",
    day: "Day",
    time: "Time",
    today: "Today",
    withBarber: (date: string, barber: string) => `${date} with ${barber}`,
    noSlots: "No chairs left on this day. Try tomorrow, or walk in: we're open until 10 pm.",
    taken: " (taken)",
    timeNote: "Times shown in Al Ain time. Crossed-out times are taken (simulated for the demo).",
    detailsTitle: "Who's the chair for?",
    nameLabel: "Your name",
    nameError: "Add your name so the barber knows who's coming.",
    noteLabel: "Anything the barber should know?",
    optional: "(optional)",
    notePlaceholder: "e.g. skin fade, keep length on top",
    detailsNote:
      "No account and no payment: your booking goes to the shop as a WhatsApp message, and you pay in the shop. We don't ask for your number because WhatsApp shares it when you send.",
    back: "Back",
    continue: "Continue",
    send: "Send booking on WhatsApp",
    asideLabel: "Your WhatsApp message",
    asideTitle: "Your message, writing itself",
    asideCaption: "You send it from your own WhatsApp. No app or account needed.",
    total: "Total, paid in the shop",
    requested: "Chair requested",
    doneTitle: (name: string) => `Tap send in WhatsApp, ${name}`,
    doneText: "Your message to Trim Haus is open in WhatsApp. Once you send it, the shop replies to confirm your chair.",
    summary: { service: "Service", barber: "Barber", when: "When", where: "Where" },
    openAgain: "Open WhatsApp again",
    addCalendar: "Add to calendar",
    callShop: "Call the shop",
    another: "Book another chair",
    doneCaption: "Demo: nothing is sent unless you tap send in WhatsApp.",
    readyToSend: "ready to send",
  },
  message: {
    greeting: "Hi Trim Haus, I'd like to book a chair.",
    service: "Service",
    barber: "Barber",
    when: "When",
    name: "Name",
    note: "Note",
  },
  legal: {
    notice: "Template for the demo. This page needs review by a UAE lawyer before the site goes live.",
    privacyTitle: "Privacy",
    termsTitle: "Terms",
  },
  notFound: {
    title: "This page took a wrong turn",
    text: "The page you were looking for isn't here.",
    home: "Go to the home page",
  },
};

export type Dictionary = typeof en;

const ar: Dictionary = {
  meta: {
    title: "صالون تريم هاوس للرجال | صالون الحلاقة الفلبيني في العين",
    template: "%s | صالون تريم هاوس للرجال، العين",
    description:
      "صالون تريم هاوس للرجال، صالون الحلاقة الفلبيني في شارع خليفة بالعين. قص الشعر من 25 درهمًا، تدريج، حلاقة ذقن، تنظيف بشرة وصبغ. مفتوح يوميًا من 9 صباحًا حتى 10 مساءً. احجز عبر واتساب.",
    ogLocale: "ar_AE",
    ogAlt: "واجهة صالون تريم هاوس للرجال باللافتة الذهبية",
  },
  common: {
    businessName: "صالون تريم هاوس للرجال",
    brand: "تريم هاوس",
    tagline: "صالون الحلاقة الفلبيني",
    bookChair: "احجز كرسيك",
    book: "احجز",
    whatsapp: "واتساب",
    whatsappUs: "راسلنا على واتساب",
    call: "اتصل",
    price: (n: number) => `${n} درهم`,
    currency: "درهم",
    sep: "، ",
    skip: "انتقل إلى المحتوى",
    nav: { home: "الرئيسية", prices: "الأسعار", barbers: "الحلاقون", visit: "موقعنا" },
    mainNav: "القائمة الرئيسية",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    switchLabel: "English",
    switchLang: "en",
    switchAria: "Switch to English",
    demo: (agency: string) => ({ strong: "نسخة تجريبية", rest: ` أُعدّت لصالون تريم هاوس للرجال بواسطة ${agency}. الحجوزات محاكاة فقط.` }),
    hideDemo: "إخفاء تنبيه النسخة التجريبية",
    hours: "يوميًا، من 9 صباحًا حتى 10 مساءً",
    openUntil: (t: string) => `مفتوح الآن · حتى ${t}`,
    closedOpens: (t: string, tomorrow: boolean) => `مغلق · يفتح ${tomorrow ? "غدًا " : ""}الساعة ${t}`,
    rating: (v: number, c: number) => ({ value: String(v), rest: ` على Google\u200f · ${c} مراجعات` }),
  },
  address: {
    street: "شارع خليفة",
    district: "المنطقة الوسطى",
    city: "العين، أبوظبي",
    plusCode: "رمز الموقع",
  },
  home: {
    heroTitle: "قصّات أنيقة وتدريج متقن في شارع خليفة بالعين.",
    heroText: "قص الشعر من 25 درهمًا، حلاقة الذقن، تنظيف البشرة والصبغ على أيدي حلاقينا الفلبينيين. مفتوح يوميًا حتى 10 مساءً.",
    heroAlt: "حلاق من تريم هاوس بزيّه الأبيض وقفازات سوداء يقص شعر زبون ليلًا، وخلفه لافتة نيون عربية حمراء",
    pricesTitle: "أسعارنا واضحة، في المحل وهنا",
    pricesText: "قص الشعر بـ 25 درهمًا. أضف غسيل الشعر أو تنظيف البشرة أو مساج فروة الرأس ضمن عرض مجمّع، وادفع أقل من حجزها منفصلة.",
    fullPrices: "عرض قائمة الأسعار كاملة",
    howTitle: "احجز في ثلاث خطوات",
    steps: [
      { title: "اختر الخدمة", text: "قص، حلاقة ذقن، تنظيف بشرة، صبغ أو عرض مجمّع. كل الأسعار أمامك." },
      { title: "اختر الحلاق والموعد", text: "اختر حلاقك المفضل أو أول كرسي متاح، أي يوم من 9 صباحًا حتى 10 مساءً." },
      { title: "أرسل الحجز عبر واتساب", text: "يصل حجزك إلى المحل كرسالة واتساب جاهزة، ويرد عليك المحل لتأكيد الموعد." },
    ],
    exampleCaption: "مثال: هذه هي الرسالة التي تصل إلى المحل.",
    exampleName: "أحمد",
    barbersTitle: "حلاقونا",
    meetTeam: "تعرّف على الفريق",
    gloves: "قفازات في كل قصّة.",
    glovesAlt: "صورة قريبة لحلاق بقفازات سوداء يقص الشعر بالمقص والمشط",
  },
  reviews: {
    title: "ماذا يقول عملاؤنا",
    meta: (when: string) => `مراجعة على Google\u200f، ${when}`,
    note: "مقتبسة كما كُتبت بالإنجليزية من مراجعات Google العامة لصالون تريم هاوس (تم التحقق في أكتوبر 2026).",
  },
  visit: {
    metaTitle: "موقعنا",
    metaDescription: "صالون تريم هاوس للرجال في شارع خليفة، المنطقة الوسطى، العين. مفتوح يوميًا من 9 صباحًا حتى 10 مساءً. الاتجاهات والخريطة ووسائل التواصل.",
    title: "تجدنا في شارع خليفة",
    hoursTitle: "ساعات العمل",
    walkIn: "تفضّل بزيارتنا مباشرة، أو احجز كرسيك لتتجنب الانتظار.",
    directions: "الاتجاهات",
    mapTitle: "خريطة توضح موقع صالون تريم هاوس للرجال في شارع خليفة، العين",
    signTitle: "ابحث عن اللافتة الذهبية",
    signAlt: "واجهة صالون تريم هاوس للرجال: لافتة سوداء بحروف ذهبية بالعربية والإنجليزية وواجهة زجاجية",
    signNote: "رقم المحل والمبنى ومعلومات المواقف: سيتم تأكيدها مع الصالون قبل إطلاق الموقع.",
  },
  offers: {
    title: "احصل على عروضنا عبر واتساب",
    text: "العروض والباقات وأخبار المحل تصلك مباشرة على هاتفك. بدون إزعاج، ويمكنك إلغاء الاشتراك في أي وقت.",
    label: "رقم الهاتف المتحرك في الإمارات",
    placeholder: "رقم إماراتي، مثل 050 123 4567",
    error: "أدخل رقم هاتف متحرك إماراتي، مثل 050 123 4567.",
    join: "اشترك",
    done: "تم اشتراكك. (نسخة تجريبية: لم يُرسل أي شيء.)",
  },
  footer: {
    logoAlt: "شعار صالون تريم هاوس للرجال، تأسس عام 2022",
    blurb: (year: number) => `صالون الحلاقة الفلبيني في شارع خليفة بالعين، منذ ${year}.`,
    visit: "زورونا",
    contact: "تواصل معنا",
    facebook: "فيسبوك",
    privacy: "الخصوصية",
    terms: "الشروط",
    demo: (agency: string) => `نسخة تجريبية من إعداد ${agency}. الحجوزات محاكاة فقط.`,
  },
  prices: {
    metaTitle: "الأسعار",
    metaDescription: "قائمة أسعار تريم هاوس بالدرهم: قص الشعر 25، قص وحلاقة ذقن 35، تنظيف بشرة 15، صبغة 40، هايلايت 50، وعروض مجمّعة من 30.",
    title: "الأسعار",
    intro: "جميع الخدمات والعروض بالدرهم. اضغط على أي سطر لحجزه، والدفع في المحل.",
    ask: "اسأل عبر واتساب",
    askMessage: "مرحبًا تريم هاوس، لدي سؤال عن الأسعار.",
    note: "الأسعار حسب قائمة الصالون المنشورة وقد تتغير. استفسر في المحل.",
    board: "قائمة الأسعار",
    save: (n: number) => `وفّر ${n} درهم مقارنة بالحجز المنفصل`,
  },
  barbers: {
    metaTitle: "الحلاقون",
    metaDescription: "تعرّف على الحلاقين الفلبينيين في صالون تريم هاوس للرجال بالعين، واحجز كرسيك مع حلاقك المفضل.",
    title: "حلاقونا",
    intro: "زي أبيض، قفازات سوداء، ويد ثابتة مع ماكينة الحلاقة. احجز مع حلاقك المفضل، أو خذ أول كرسي متاح.",
    bookWith: (name: string) => `احجز مع ${name}`,
    note: "نسخة تجريبية: يظهر الحلاقون باسم الحلاق أ إلى د. يمكن إضافة اسم وصورة كل حلاق في الموقع النهائي بعد تأكيد الفريق من الصالون.",
    shopTitle: "داخل المحل",
    shopText:
      "صالة نظيفة ومشرقة في شارع خليفة، تعلوها لافتة تريم هاوس الذهبية. وخارج أوقات العمل، يلعب الفريق كرة السلة باسم Team Trim Haus x Primo.",
    interiorAlt: "حلاق من تريم هاوس يهذّب شعر زبون داخل المحل الأبيض المشرق",
    windowAlt: "حلاق ينهي قصة تدريج بجانب نافذة المحل ليلًا",
    shopfrontAlt: "واجهة صالون تريم هاوس للرجال بلافتة ذهبية بالعربية والإنجليزية",
  },
  book: {
    metaTitle: "احجز كرسيك",
    metaDescription: "احجز قص الشعر أو حلاقة الذقن أو تنظيف البشرة في صالون تريم هاوس للرجال بالعين. اختر الخدمة والحلاق والموعد، ثم أرسل الحجز عبر واتساب.",
    steps: ["الخدمة", "الحلاق", "اليوم والوقت", "اسمك"],
    progress: "مراحل الحجز",
    stepOf: (i: number, n: number, label: string) => `الخطوة ${i} من ${n}: ${label}`,
    stepAria: (i: number, label: string) => `الخطوة ${i}: ${label}`,
    serviceTitle: "ما الخدمة التي تريدها؟",
    serviceTabs: "نوع الخدمة",
    about: (n: number) => `حوالي ${n} دقيقة`,
    saveShort: (n: number) => `وفّر ${n} درهم`,
    serviceNote: "الأسعار من قائمة أسعار الصالون، والمدة تقريبية.",
    barberTitle: "من سيقص شعرك؟",
    anyNote: "أول كرسي متاح: خيارات مواعيد أكثر",
    timeTitle: "اختر اليوم والوقت",
    day: "اليوم",
    time: "الوقت",
    today: "اليوم",
    withBarber: (date: string, barber: string) => `${date} مع ${barber}`,
    noSlots: "لا توجد مواعيد متاحة في هذا اليوم. جرّب الغد، أو تفضّل بزيارتنا مباشرة، فنحن مفتوحون حتى 10 مساءً.",
    taken: " (محجوز)",
    timeNote: "الأوقات بتوقيت العين. الأوقات المشطوبة محجوزة (محاكاة للنسخة التجريبية).",
    detailsTitle: "باسم من الحجز؟",
    nameLabel: "اسمك",
    nameError: "أضف اسمك ليعرف الحلاق من القادم.",
    noteLabel: "هل هناك ما يجب أن يعرفه الحلاق؟",
    optional: "(اختياري)",
    notePlaceholder: "مثلًا: تدريج على الجلد مع إبقاء الطول من الأعلى",
    detailsNote:
      "بدون حساب وبدون دفع مسبق: يصل حجزك إلى المحل كرسالة واتساب، والدفع في المحل. لا نطلب رقمك لأن واتساب يرسله تلقائيًا عند الإرسال.",
    back: "رجوع",
    continue: "متابعة",
    send: "أرسل الحجز عبر واتساب",
    asideLabel: "رسالتك على واتساب",
    asideTitle: "رسالتك تُكتب تلقائيًا",
    asideCaption: "ترسلها من واتساب الخاص بك، دون الحاجة إلى تطبيق أو حساب.",
    total: "الإجمالي، يُدفع في المحل",
    requested: "تم طلب الكرسي",
    doneTitle: (name: string) => `${name}، اضغط إرسال في واتساب`,
    doneText: "رسالتك إلى تريم هاوس مفتوحة في واتساب. بعد إرسالها، يرد عليك المحل لتأكيد موعدك.",
    summary: { service: "الخدمة", barber: "الحلاق", when: "الموعد", where: "المكان" },
    openAgain: "افتح واتساب مرة أخرى",
    addCalendar: "أضف إلى التقويم",
    callShop: "اتصل بالمحل",
    another: "احجز كرسيًا آخر",
    doneCaption: "نسخة تجريبية: لا يُرسل شيء ما لم تضغط إرسال في واتساب.",
    readyToSend: "جاهزة للإرسال",
  },
  message: {
    greeting: "مرحبًا تريم هاوس، أود حجز كرسي.",
    service: "الخدمة",
    barber: "الحلاق",
    when: "الموعد",
    name: "الاسم",
    note: "ملاحظة",
  },
  legal: {
    notice: "نموذج للنسخة التجريبية. تحتاج هذه الصفحة إلى مراجعة محامٍ في دولة الإمارات قبل إطلاق الموقع.",
    privacyTitle: "الخصوصية",
    termsTitle: "الشروط",
  },
  notFound: {
    title: "يبدو أن هذه الصفحة غير موجودة",
    text: "لم نجد الصفحة التي تبحث عنها.",
    home: "العودة إلى الرئيسية",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { ar, en };

export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}
