import { useState, useEffect, createContext, useContext } from 'react';

// Types
type Language = 'pl' | 'uk' | 'ru' | 'en';

interface Translations {
  [key: string]: {
    pl: string;
    uk: string;
    ru: string;
    en: string;
  };
}

// Translations
const translations: Translations = {
  // Language selector
  selectLanguage: {
    pl: 'Wybierz język strony',
    uk: 'Оберіть мову сайту',
    ru: 'Выберите язык сайта',
    en: 'Select website language'
  },
  // Navigation
  navHome: { pl: 'Strona główna', uk: 'Головна', ru: 'Главная', en: 'Home' },
  navAbout: { pl: 'O mnie', uk: 'Про мене', ru: 'Обо мне', en: 'About me' },
  navServices: { pl: 'Usługi', uk: 'Послуги', ru: 'Услуги', en: 'Services' },
  navContact: { pl: 'Kontakt', uk: 'Контакт', ru: 'Контакт', en: 'Contact' },
  // Hero
  heroTitle: {
    pl: 'Naucz się języka z Slovotok',
    uk: 'Вивчай мову зі Slovotok',
    ru: 'Выучи язык со Slovotok',
    en: 'Learn a language with Slovotok'
  },
  heroSubtitle: {
    pl: 'Indywidualne korepetycje języka polskiego i rosyjskiego. Profesjonalne podejście do każdego ucznia.',
    uk: 'Індивідуальні уроки польської та російської мови. Професійний підхід до кожного учня.',
    ru: 'Индивидуальные уроки польского и русского языка. Профессиональный подход к каждому ученику.',
    en: 'Individual Polish and Russian language tutoring. Professional approach to every student.'
  },
  heroButton: {
    pl: 'Zapisz się na lekcję',
    uk: 'Записатися на урок',
    ru: 'Записаться на урок',
    en: 'Book a lesson'
  },
  // Services section
  servicesTitle: {
    pl: 'Co oferuję',
    uk: 'Що я пропоную',
    ru: 'Что я предлагаю',
    en: 'What I offer'
  },
  // Service cards - Polish for Russian speakers (main)
  polishForRussians: {
    pl: 'Polski dla rosyjskojęzycznych',
    uk: 'Польська для російськомовних',
    ru: 'Польский для русскоязычных',
    en: 'Polish for Russian speakers'
  },
  polishForRussiansDesc: {
    pl: 'Kompleksowa nauka polskiego dla osób mówiących po rosyjsku. Wykorzystuję podobieństwa językowe dla szybszych efektów. Najwyższy poziom nauczania.',
    uk: 'Комплексне вивчення польської для російськомовних. Використовую мовні подібності для швидших результатів. Найвищий рівень викладання.',
    ru: 'Комплексное изучение польского для русскоязычных. Использую языковые сходства для быстрых результатов. Высший уровень преподавания.',
    en: 'Comprehensive Polish for Russian speakers. I leverage language similarities for faster results. Highest teaching level.'
  },
  // Russian for Poles (main)
  russianForPoles: {
    pl: 'Rosyjski dla Polaków',
    uk: 'Російська для поляків',
    ru: 'Русский для поляков',
    en: 'Russian for Poles'
  },
  russianForPolesDesc: {
    pl: 'Nauka rosyjskiego dla polskojęzycznych. Od podstaw do zaawansowanego. Efektywne metody bazujące na słowiańskich podobieństwach.',
    uk: 'Вивчення російської для польськомовних. Від основ до просунутого. Ефективні методи на основі слов\'янських подібностей.',
    ru: 'Изучение русского для польскоязычных. От основ до продвинутого. Эффективные методы на основе славянских сходств.',
    en: 'Russian lessons for Polish speakers. From basics to advanced. Effective methods based on Slavic similarities.'
  },
  // Polish for Ukrainians
  polishForUkrainians: {
    pl: 'Polski dla ukraińskojęzycznych',
    uk: 'Польська для україномовних',
    ru: 'Польский для украиноязычных',
    en: 'Polish for Ukrainian speakers'
  },
  polishForUkrainiansDesc: {
    pl: 'Nauka polskiego dla osób mówiących po ukraińsku. Rozumiem ukraiński, więc mogę skutecznie tłumaczyć i wyjaśniać różnice.',
    uk: 'Вивчення польської для україномовних. Я розумію українську, тому можу ефективно пояснювати відмінності.',
    ru: 'Изучение польского для украиноязычных. Я понимаю украинский, поэтому могу эффективно объяснять различия.',
    en: 'Polish lessons for Ukrainian speakers. I understand Ukrainian, so I can effectively explain differences.'
  },
  // Polish in English
  polishInEnglish: {
    pl: 'Polski po angielsku',
    uk: 'Польська англійською',
    ru: 'Польский на английском',
    en: 'Polish in English'
  },
  polishInEnglishDesc: {
    pl: 'Nauka polskiego z instrukcjami w języku angielskim. Dla uczniów z całego świata - z Azji, Afryki, Ameryki czy innych krajów.',
    uk: 'Вивчення польської з інструкціями англійською. Для учнів з усього світу — Азії, Африки, Америки чи інших країн.',
    ru: 'Изучение польского с инструкциями на английском. Для учеников со всего мира — Азии, Африки, Америки и других стран.',
    en: 'Learn Polish with English instruction. For students from around the world - Asia, Africa, Americas and beyond.'
  },
  // Russian in English
  russianInEnglish: {
    pl: 'Rosyjski po angielsku',
    uk: 'Російська англійською',
    ru: 'Русский на английском',
    en: 'Russian in English'
  },
  russianInEnglishDesc: {
    pl: 'Podstawy rosyjskiego dla osób anglojęzycznych. Idealne na początek przygody z językiem rosyjskim.',
    uk: 'Основи російської для англомовних. Ідеально для початку вивчення російської мови.',
    ru: 'Основы русского для англоязычных. Идеально для начала изучения русского языка.',
    en: 'Russian basics for English speakers. Perfect for starting your Russian language journey.'
  },
  // English basics
  englishBasics: {
    pl: 'Angielski - podstawy',
    uk: 'Англійська - основи',
    ru: 'Английский - основы',
    en: 'English - basics'
  },
  englishBasicsDesc: {
    pl: 'Podstawy języka angielskiego (do poziomu B1). Nauczanie w języku polskim lub rosyjskim.',
    uk: 'Основи англійської (до рівня B1). Навчання польською або російською.',
    ru: 'Основы английского (до уровня B1). Обучение на польском или русском.',
    en: 'English basics (up to B1 level). Teaching in Polish or Russian.'
  },
  // About section
  aboutTitle: {
    pl: 'Kilka słów o mnie',
    uk: 'Кілька слів про мене',
    ru: 'Несколько слов обо мне',
    en: 'A few words about me'
  },
  aboutText1: {
    pl: 'Jestem pasjonatem języków słowiańskich. Mój język ojczysty to polski, a rosyjski znam na poziomie zbliżonym do natywnego. Rozumiem również ukraiński.',
    uk: 'Я захоплений слов\'янськими мовами. Моя рідна мова — польська, а російську я знаю на рівні, близькому до рідного. Також розумію українську.',
    ru: 'Я увлечён славянскими языками. Мой родной язык — польский, а русский я знаю на уровне, близком к родному. Также понимаю украинский.',
    en: 'I am passionate about Slavic languages. My native language is Polish, and I speak Russian at a near-native level. I also understand Ukrainian.'
  },
  aboutText2: {
    pl: 'Specjalizuję się w nauczaniu osób rosyjskojęzycznych i ukraińskojęzycznych polskiego, oraz Polaków rosyjskiego. Wykorzystuję podobieństwa między tymi językami, aby nauka była szybsza i bardziej efektywna.',
    uk: 'Я спеціалізуюся на навчанні російсько- та україномовних польської, а також поляків — російської. Використовую подібності між цими мовами для швидшого та ефективнішого навчання.',
    ru: 'Я специализируюсь на обучении русско- и украиноязычных польскому, а также поляков — русскому. Использую сходства между языками для более быстрого и эффективного обучения.',
    en: 'I specialize in teaching Polish to Russian and Ukrainian speakers, and Russian to Poles. I leverage the similarities between these languages for faster, more effective learning.'
  },
  aboutText3: {
    pl: 'Mogę również uczyć polskiego lub rosyjskiego prowadząc lekcje po angielsku - dla osób z dowolnego miejsca na świecie.',
    uk: 'Також можу навчати польської або російської, ведучи уроки англійською — для людей з будь-якої точки світу.',
    ru: 'Также могу обучать польскому или русскому, ведя уроки на английском — для людей из любой точки мира.',
    en: 'I can also teach Polish or Russian with lessons conducted in English - for people from anywhere in the world.'
  },
  // Form
  formTitle: {
    pl: 'Zapisz się na korepetycje',
    uk: 'Запишіться на уроки',
    ru: 'Запишитесь на уроки',
    en: 'Sign up for lessons'
  },
  formSubtitle: {
    pl: 'Wypełnij formularz, a skontaktuję się z Tobą jak najszybciej.',
    uk: 'Заповніть форму, і я зв\'яжуся з вами якнайшвидше.',
    ru: 'Заполните форму, и я свяжусь с вами как можно скорее.',
    en: 'Fill out the form and I will contact you as soon as possible.'
  },
  formName: { pl: 'Imię', uk: 'Ім\'я', ru: 'Имя', en: 'Name' },
  formEmail: { pl: 'Email', uk: 'Email', ru: 'Email', en: 'Email' },
  formPhone: { pl: 'Telefon (opcjonalnie)', uk: 'Телефон (необов\'язково)', ru: 'Телефон (необязательно)', en: 'Phone (optional)' },
  formLanguage: { pl: 'Chcę się uczyć', uk: 'Хочу вивчати', ru: 'Хочу изучать', en: 'I want to learn' },
  formPolish: { pl: 'Polskiego', uk: 'Польську', ru: 'Польский', en: 'Polish' },
  formRussian: { pl: 'Rosyjskiego', uk: 'Російську', ru: 'Русский', en: 'Russian' },
  formEnglish: { pl: 'Angielskiego', uk: 'Англійську', ru: 'Английский', en: 'English' },
  formSpokenLanguages: { pl: 'Języki, w których mówię', uk: 'Мови, якими я володію', ru: 'Языки, которыми я владею', en: 'Languages I speak' },
  formLangUkrainian: { pl: 'Ukraiński', uk: 'Українська', ru: 'Украинский', en: 'Ukrainian' },
  formLangRussian: { pl: 'Rosyjski', uk: 'Російська', ru: 'Русский', en: 'Russian' },
  formLangPolish: { pl: 'Polski', uk: 'Польська', ru: 'Польский', en: 'Polish' },
  formLangEnglish: { pl: 'Angielski', uk: 'Англійська', ru: 'Английский', en: 'English' },
  formLangOther: { pl: 'Inny', uk: 'Інша', ru: 'Другой', en: 'Other' },
  formTargetLevel: { pl: 'Docelowy poziom', uk: 'Цільовий рівень', ru: 'Целевой уровень', en: 'Target level' },
  formTargetLevelDesc: { pl: 'Poziom, który chcesz osiągnąć', uk: 'Рівень, якого хочеш досягти', ru: 'Уровень, которого хочешь достичь', en: 'Level you want to achieve' },
  formHours: { pl: 'Godzin tygodniowo', uk: 'Годин на тиждень', ru: 'Часов в неделю', en: 'Hours per week' },
  formEnglishMaxB1: { pl: 'Dla angielskiego max. B1', uk: 'Для англійської макс. B1', ru: 'Для английского макс. B1', en: 'For English max. B1' },
  formMessage: { pl: 'Dodatkowe informacje', uk: 'Додаткова інформація', ru: 'Дополнительная информация', en: 'Additional information' },
  formMessagePlaceholder: { pl: 'Cokolwiek powinienem wiedzieć...', uk: 'Будь-що, що мені варто знати...', ru: 'Что угодно, что мне следует знать...', en: 'Anything I should know...' },
  formSubmit: { pl: 'Wyślij', uk: 'Надіслати', ru: 'Отправить', en: 'Submit' },
  formSending: { pl: 'Wysyłanie...', uk: 'Надсилання...', ru: 'Отправка...', en: 'Sending...' },
  formSuccess: { pl: 'Dziękuję! Skontaktuję się wkrótce.', uk: 'Дякую! Зв\'яжуся найближчим часом.', ru: 'Спасибо! Свяжусь в ближайшее время.', en: 'Thank you! I will contact you soon.' },
  selectOption: { pl: 'Wybierz...', uk: 'Обрати...', ru: 'Выбрать...', en: 'Select...' },
  // FAQ
  faqTitle: { pl: 'FAQ', uk: 'FAQ', ru: 'FAQ', en: 'FAQ' },
  faq1q: { pl: 'Ile kosztują lekcje?', uk: 'Скільки коштують уроки?', ru: 'Сколько стоят уроки?', en: 'How much do lessons cost?' },
  faq1a: { pl: 'Ceny ustalamy indywidualnie. Napisz do mnie, a prześlę szczegółową ofertę.', uk: 'Ціни встановлюємо індивідуально. Напишіть мені, і я надішлю детальну пропозицію.', ru: 'Цены устанавливаем индивидуально. Напишите мне, и я пришлю подробное предложение.', en: 'Prices are set individually. Write to me and I will send a detailed offer.' },
  faq2q: { pl: 'Jak wyglądają zajęcia?', uk: 'Як проходять заняття?', ru: 'Как проходят занятия?', en: 'How do lessons work?' },
  faq2a: { pl: 'Zajęcia odbywają się online przez Zoom lub Google Meet. Używam różnorodnych materiałów i dostosowuję program do Twoich celów.', uk: 'Заняття проходять онлайн через Zoom або Google Meet. Використовую різноманітні матеріали та адаптую програму під ваші цілі.', ru: 'Занятия проходят онлайн через Zoom или Google Meet. Использую разнообразные материалы и адаптирую программу под ваши цели.', en: 'Lessons are held online via Zoom or Google Meet. I use various materials and adapt the program to your goals.' },
  faq3q: { pl: 'Czy mogę odwołać lekcję?', uk: 'Чи можу скасувати урок?', ru: 'Могу ли я отменить урок?', en: 'Can I cancel a lesson?' },
  faq3a: { pl: 'Tak, lekcję można odwołać bezpłatnie z 24-godzinnym wyprzedzeniem.', uk: 'Так, урок можна скасувати безкоштовно за 24 години.', ru: 'Да, урок можно отменить бесплатно за 24 часа.', en: 'Yes, lessons can be cancelled for free with 24 hours notice.' },
  faq4q: { pl: 'Jak szybko nauczę się języka?', uk: 'Як швидко я вивчу мову?', ru: 'Как быстро я выучу язык?', en: 'How fast will I learn?' },
  faq4a: { pl: 'To zależy od Twojego zaangażowania. Dzięki podobieństwom między językami słowiańskimi postępy są zazwyczaj szybsze niż przy nauce zupełnie obcego języka.', uk: 'Це залежить від вашого залучення. Завдяки подібностям між слов\'янськими мовами прогрес зазвичай швидший.', ru: 'Это зависит от вашей вовлечённости. Благодаря сходствам между славянскими языками прогресс обычно быстрее.', en: 'It depends on your commitment. Due to similarities between Slavic languages, progress is usually faster.' },
  // Footer
  footerRights: { pl: 'Wszelkie prawa zastrzeżone.', uk: 'Усі права захищені.', ru: 'Все права защищены.', en: 'All rights reserved.' },
  mainService: { pl: 'Główna specjalizacja', uk: 'Основна спеціалізація', ru: 'Основная специализация', en: 'Main specialization' },
  // Testimonials
  testimonialsTitle: { pl: 'Opinie uczniów', uk: 'Відгуки учнів', ru: 'Отзывы учеников', en: 'Student reviews' },
};

// Language Context
const LanguageContext = createContext<{
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}>({
  lang: 'pl',
  setLang: () => {},
  t: () => ''
});

const useLanguage = () => useContext(LanguageContext);

// Main App Component
export function App() {
  const [lang, setLang] = useState<Language | null>(null);
  const [showLangSelector, setShowLangSelector] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('slovotok-lang') as Language | null;
    if (savedLang) {
      setLang(savedLang);
      setShowLangSelector(false);
    }
  }, []);

  const handleLangSelect = (selectedLang: Language) => {
    setFadeOut(true);
    setTimeout(() => {
      setLang(selectedLang);
      setShowLangSelector(false);
      localStorage.setItem('slovotok-lang', selectedLang);
    }, 400);
  };

  const t = (key: string): string => {
    return translations[key]?.[lang || 'pl'] || key;
  };

  if (showLangSelector) {
    return <LanguageSelector onSelect={handleLangSelect} fadeOut={fadeOut} />;
  }

  return (
    <LanguageContext.Provider value={{ lang: lang || 'pl', setLang, t }}>
      <MainSite />
    </LanguageContext.Provider>
  );
}

// Language Selector Component
function LanguageSelector({ onSelect, fadeOut }: { onSelect: (lang: Language) => void; fadeOut: boolean }) {
  const languages: { code: Language; name: string; flag: string; abbr: string }[] = [
    { code: 'uk', name: 'Українська', flag: '🇺🇦', abbr: 'UA' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱', abbr: 'PL' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺', abbr: 'RU' },
    { code: 'en', name: 'English', flag: '🇬🇧', abbr: 'EN' },
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-b from-[#0a0d1a] to-[#050812] flex items-center justify-center transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="text-center px-4 w-full max-w-lg">
        {/* Logo */}
        <div className="mb-10 animate-fade-in">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#2b41a4] to-[#6b7dff] flex items-center justify-center text-4xl shadow-2xl shadow-[rgba(43,65,164,0.5)]">
              💬
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">
            Slovotok
          </h1>
          <p className="text-[#6b7dff] text-lg tracking-wide">slovotok.com</p>
        </div>

        {/* Title */}
        <p className="text-[#8090c0] text-lg mb-8 animate-fade-in-delay">
          Оберіть мову сайту
        </p>

        {/* Language Options */}
        <div className="grid grid-cols-2 gap-4 animate-fade-in-delay-2">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => onSelect(language.code)}
              className="group p-5 bg-[#0d1020] rounded-2xl border border-[#1a2040] hover:border-[#3b51b4] transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-[rgba(43,65,164,0.15)] hover:bg-[#101528]"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  {language.flag}
                </span>
                <span className="text-[#6b9fff] font-bold text-xl">{language.abbr}</span>
              </div>
              <span className="text-white font-medium text-lg block">{language.name}</span>
            </button>
          ))}
        </div>

        {/* Hint */}
        <p className="text-[#4050708] text-sm mt-8 animate-fade-in-delay-3 text-[#5060a0]">
          Wybierz język · Выберите язык · Select language
        </p>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.6s ease forwards; }
        .animate-fade-in-delay { animation: fade-in 0.6s ease 0.15s forwards; opacity: 0; }
        .animate-fade-in-delay-2 { animation: fade-in 0.6s ease 0.3s forwards; opacity: 0; }
        .animate-fade-in-delay-3 { animation: fade-in 0.6s ease 0.5s forwards; opacity: 0; }
      `}</style>
    </div>
  );
}

// Main Site Component
function MainSite() {
  const { lang, setLang, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    targetLanguage: '',
    spokenLanguages: [] as string[],
    targetLevel: '',
    hours: '',
    message: ''
  });
  const [spokenLangsOpen, setSpokenLangsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', targetLanguage: '', spokenLanguages: [], targetLevel: '', hours: '', message: '' });
    }, 4000);
  };

  const scrollToForm = () => {
    document.getElementById('form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const changeLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('slovotok-lang', newLang);
  };

  const langFlags: Record<Language, string> = { pl: '🇵🇱', uk: '🇺🇦', ru: '🇷🇺', en: '🇬🇧' };

  return (
    <div className="min-h-screen bg-[#050812] text-white font-['Inter',sans-serif]">
      {/* Header */}
      <header className="bg-[#050812]/95 backdrop-blur-sm border-b border-[#1a2040] sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2b41a4] to-[#6b7dff] flex items-center justify-center text-lg shadow-lg">
              💬
            </div>
            <span className="font-bold text-lg tracking-tight">Slovotok</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#services" className="text-[#8090b0] hover:text-white transition-colors text-sm">{t('navServices')}</a>
            <a href="#about" className="text-[#8090b0] hover:text-white transition-colors text-sm">{t('navAbout')}</a>
            <a href="#faq" className="text-[#8090b0] hover:text-white transition-colors text-sm">FAQ</a>
            <a href="#contact" className="text-[#8090b0] hover:text-white transition-colors text-sm">{t('navContact')}</a>
          </nav>

          {/* Language Selector & Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Language Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#0a0d1a] border border-[#1a2040] hover:border-[#3b51b4] transition-all text-sm">
                <span className="text-base">{langFlags[lang]}</span>
                <svg className="w-3.5 h-3.5 text-[#6070a0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute right-0 mt-2 py-1.5 w-32 bg-[#0a0d1a] border border-[#1a2040] rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {(['uk', 'pl', 'ru', 'en'] as Language[]).map(l => (
                  <button
                    key={l}
                    onClick={() => changeLang(l)}
                    className={`w-full px-3 py-1.5 text-left hover:bg-[#151a30] transition-colors flex items-center gap-2 text-sm ${lang === l ? 'text-[#6b7dff]' : 'text-[#a0b0d0]'}`}
                  >
                    <span>{langFlags[l]}</span>
                    <span>{l === 'uk' ? 'Українська' : l === 'pl' ? 'Polski' : l === 'ru' ? 'Русский' : 'English'}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Hamburger */}
            <button className="md:hidden flex flex-col gap-1 p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-60' : 'max-h-0'}`}>
          <nav className="flex flex-col px-4 pb-4 gap-2">
            <a href="#services" className="text-[#a0b0d0] py-2 text-sm" onClick={() => setMobileMenuOpen(false)}>{t('navServices')}</a>
            <a href="#about" className="text-[#a0b0d0] py-2 text-sm" onClick={() => setMobileMenuOpen(false)}>{t('navAbout')}</a>
            <a href="#faq" className="text-[#a0b0d0] py-2 text-sm" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
            <a href="#contact" className="text-[#a0b0d0] py-2 text-sm" onClick={() => setMobileMenuOpen(false)}>{t('navContact')}</a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 text-white leading-tight">
              {t('heroTitle')}
            </h1>
            <p className="text-base md:text-lg text-[#7080a0] max-w-xl mx-auto mb-8">
              {t('heroSubtitle')}
            </p>
            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-[#2b41a4] to-[#4b61c4] text-white font-semibold text-lg rounded-xl hover:shadow-xl hover:shadow-[rgba(43,65,164,0.4)] hover:-translate-y-1 transition-all duration-300"
            >
              {t('heroButton')}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-14 bg-[#080b15]">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">{t('servicesTitle')}</h2>
            
            {/* Main services */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <ServiceCard
                icon="🇵🇱"
                flag="🇷🇺"
                title={t('polishForRussians')}
                description={t('polishForRussiansDesc')}
                primary
                badge={t('mainService')}
              />
              <ServiceCard
                icon="🇷🇺"
                flag="🇵🇱"
                title={t('russianForPoles')}
                description={t('russianForPolesDesc')}
                primary
                badge={t('mainService')}
              />
            </div>

            {/* Secondary services */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <ServiceCard
                icon="🇵🇱"
                flag="🇺🇦"
                title={t('polishForUkrainians')}
                description={t('polishForUkrainiansDesc')}
                small
              />
              <ServiceCard
                icon="🇵🇱"
                flag="🇬🇧"
                title={t('polishInEnglish')}
                description={t('polishInEnglishDesc')}
                small
              />
              <ServiceCard
                icon="🇷🇺"
                flag="🇬🇧"
                title={t('russianInEnglish')}
                description={t('russianInEnglishDesc')}
                small
              />
              <ServiceCard
                icon="🇬🇧"
                flag="🇵🇱🇷🇺"
                title={t('englishBasics')}
                description={t('englishBasicsDesc')}
                small
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-14">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">{t('aboutTitle')}</h2>
            <div className="bg-[#0a0d1a] rounded-2xl p-6 md:p-8 border border-[#1a2040] space-y-4">
              <p className="text-[#a0b0d0] leading-relaxed">{t('aboutText1')}</p>
              <p className="text-[#a0b0d0] leading-relaxed">{t('aboutText2')}</p>
              <p className="text-[#a0b0d0] leading-relaxed">{t('aboutText3')}</p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section id="form" className="py-14 bg-[#080b15]">
          <div className="max-w-xl mx-auto px-4">
            <div className="bg-[#0a0d1a] rounded-2xl p-5 md:p-8 border border-[#1a2040] relative overflow-hidden">
              {/* Top Gradient */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2b41a4] via-[#6b7dff] to-[#2b41a4]" />

              {submitted ? (
                <div className="text-center py-10 animate-fade-in">
                  <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-3xl">
                    ✓
                  </div>
                  <p className="text-lg text-[#a0b0d0]">{t('formSuccess')}</p>
                </div>
              ) : (
                <>
                  <h2 className="text-xl md:text-2xl font-bold mb-1">{t('formTitle')}</h2>
                  <p className="text-[#6070a0] mb-6 text-sm">{t('formSubtitle')}</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name & Email */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium mb-1.5 text-[#8090b0]">{t('formName')} *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2.5 bg-[#050812] border border-[#1a2040] rounded-lg focus:border-[#3b51b4] focus:outline-none transition-all text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1.5 text-[#8090b0]">{t('formEmail')} *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2.5 bg-[#050812] border border-[#1a2040] rounded-lg focus:border-[#3b51b4] focus:outline-none transition-all text-sm"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-medium mb-1.5 text-[#8090b0]">{t('formPhone')}</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-[#050812] border border-[#1a2040] rounded-lg focus:border-[#3b51b4] focus:outline-none transition-all text-sm"
                      />
                    </div>

                    {/* Target Language */}
                    <div>
                      <label className="block text-xs font-medium mb-1.5 text-[#8090b0]">{t('formLanguage')} *</label>
                      <select
                        name="targetLanguage"
                        value={formData.targetLanguage}
                        onChange={(e) => {
                          handleInputChange(e);
                          // Reset target level when language changes
                          if (e.target.value === 'english') {
                            setFormData(prev => ({ ...prev, targetLevel: '' }));
                          }
                        }}
                        required
                        className="w-full px-3 py-2.5 bg-[#050812] border border-[#1a2040] rounded-lg focus:border-[#3b51b4] focus:outline-none appearance-none cursor-pointer text-sm"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%236070a0' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center', backgroundSize: '16px' }}
                      >
                        <option value="" disabled>{t('selectOption')}</option>
                        <option value="polish">{t('formPolish')}</option>
                        <option value="russian">{t('formRussian')}</option>
                        <option value="english">{t('formEnglish')}</option>
                      </select>
                    </div>

                    {/* Spoken Languages - Multi-select */}
                    <div>
                      <label className="block text-xs font-medium mb-1.5 text-[#8090b0]">{t('formSpokenLanguages')} *</label>
                      <div className="relative">
                        <div 
                          className="w-full px-3 py-2.5 bg-[#050812] border border-[#1a2040] rounded-lg cursor-pointer min-h-[42px] flex flex-wrap gap-1.5 items-center"
                          onClick={() => setSpokenLangsOpen(!spokenLangsOpen)}
                        >
                          {formData.spokenLanguages.length === 0 ? (
                            <span className="text-[#6070a0] text-sm">{t('selectOption')}</span>
                          ) : (
                            formData.spokenLanguages.map(lang => (
                              <span key={lang} className="px-2 py-0.5 bg-[#1a2040] rounded text-xs text-[#a0b0d0] flex items-center gap-1">
                                {lang === 'russian' ? t('formLangRussian') : 
                                 lang === 'ukrainian' ? t('formLangUkrainian') : 
                                 lang === 'polish' ? t('formLangPolish') : 
                                 lang === 'english' ? t('formLangEnglish') : t('formLangOther')}
                                <button 
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setFormData(prev => ({
                                      ...prev,
                                      spokenLanguages: prev.spokenLanguages.filter(l => l !== lang)
                                    }));
                                  }}
                                  className="text-[#6070a0] hover:text-white ml-0.5"
                                >×</button>
                              </span>
                            ))
                          )}
                          <svg className={`w-4 h-4 text-[#6070a0] ml-auto transition-transform ${spokenLangsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                        {spokenLangsOpen && (
                          <div className="absolute top-full left-0 right-0 mt-1 bg-[#0a0d1a] border border-[#1a2040] rounded-lg shadow-xl z-10 py-1">
                            {['russian', 'ukrainian', 'polish', 'english', 'other'].map(lang => (
                              <label 
                                key={lang}
                                className="flex items-center gap-2 px-3 py-2 hover:bg-[#151a30] cursor-pointer text-sm"
                              >
                                <input
                                  type="checkbox"
                                  checked={formData.spokenLanguages.includes(lang)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setFormData(prev => ({
                                        ...prev,
                                        spokenLanguages: [...prev.spokenLanguages, lang]
                                      }));
                                    } else {
                                      setFormData(prev => ({
                                        ...prev,
                                        spokenLanguages: prev.spokenLanguages.filter(l => l !== lang)
                                      }));
                                    }
                                  }}
                                  className="w-4 h-4 rounded border-[#1a2040] bg-[#050812] text-[#3b51b4] focus:ring-[#3b51b4] focus:ring-offset-0"
                                />
                                <span className="text-[#a0b0d0]">
                                  {lang === 'russian' ? t('formLangRussian') : 
                                   lang === 'ukrainian' ? t('formLangUkrainian') : 
                                   lang === 'polish' ? t('formLangPolish') : 
                                   lang === 'english' ? t('formLangEnglish') : t('formLangOther')}
                                </span>
                              </label>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Target Level & Hours */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium mb-1.5 text-[#8090b0]">
                          {t('formTargetLevel')} *
                          {formData.targetLanguage === 'english' && (
                            <span className="text-[#6b7dff] ml-1 text-[10px]">({t('formEnglishMaxB1')})</span>
                          )}
                        </label>
                        <select
                          name="targetLevel"
                          value={formData.targetLevel}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2.5 bg-[#050812] border border-[#1a2040] rounded-lg focus:border-[#3b51b4] focus:outline-none appearance-none cursor-pointer text-sm"
                          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%236070a0' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center', backgroundSize: '16px' }}
                        >
                          <option value="" disabled>{t('selectOption')}</option>
                          <option value="A1">A1</option>
                          <option value="A2">A2</option>
                          <option value="B1">B1</option>
                          {formData.targetLanguage !== 'english' && (
                            <>
                              <option value="B2">B2</option>
                              <option value="C1">C1</option>
                              <option value="C2">C2</option>
                            </>
                          )}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1.5 text-[#8090b0]">{t('formHours')} *</label>
                        <select
                          name="hours"
                          value={formData.hours}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2.5 bg-[#050812] border border-[#1a2040] rounded-lg focus:border-[#3b51b4] focus:outline-none appearance-none cursor-pointer text-sm"
                          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%236070a0' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center', backgroundSize: '16px' }}
                        >
                          <option value="" disabled>{t('selectOption')}</option>
                          <option value="1">1h</option>
                          <option value="2">2h</option>
                          <option value="3">3h</option>
                          <option value="4+">4h+</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-medium mb-1.5 text-[#8090b0]">{t('formMessage')}</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder={t('formMessagePlaceholder')}
                        className="w-full px-3 py-2.5 bg-[#050812] border border-[#1a2040] rounded-lg focus:border-[#3b51b4] focus:outline-none transition-all resize-none text-sm"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-gradient-to-r from-[#2b41a4] to-[#4b61c4] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[rgba(43,65,164,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? t('formSending') : t('formSubmit')}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-14">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">{t('faqTitle')}</h2>
            <div className="space-y-2">
              <FAQItem question={t('faq1q')} answer={t('faq1a')} />
              <FAQItem question={t('faq2q')} answer={t('faq2a')} />
              <FAQItem question={t('faq3q')} answer={t('faq3a')} />
              <FAQItem question={t('faq4q')} answer={t('faq4a')} />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-14 bg-[#080b15]">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">{t('testimonialsTitle')}</h2>
            <Testimonials lang={lang} />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-[#050812] border-t border-[#1a2040] py-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-5">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2b41a4] to-[#6b7dff] flex items-center justify-center text-base">
                💬
              </div>
              <span className="font-bold text-lg">Slovotok</span>
            </div>

            {/* Contact */}
            <div className="text-center md:text-right">
              <a href="mailto:slovotok@outlook.com" className="text-[#a0b0d0] hover:text-white transition-colors text-sm flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                slovotok@outlook.com
              </a>
            </div>
          </div>

          <div className="text-center text-[#4050708] text-xs mt-6 pt-5 border-t border-[#1a2040] text-[#5060a0]">
            © 2025 Slovotok. {t('footerRights')}
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease forwards; }
      `}</style>
    </div>
  );
}

// Service Card Component
function ServiceCard({ icon, flag, title, description, primary, badge, small }: { 
  icon: string; 
  flag: string; 
  title: string; 
  description: string; 
  primary?: boolean;
  badge?: string;
  small?: boolean;
}) {
  return (
    <div className={`p-5 rounded-xl border transition-all hover:-translate-y-0.5 hover:shadow-lg ${
      primary 
        ? 'bg-gradient-to-br from-[#0d1025] to-[#0a0d1a] border-[#2a3560] hover:border-[#3b51b4]' 
        : 'bg-[#0a0d1a] border-[#1a2040] hover:border-[#2a3560]'
    }`}>
      <div className="flex items-center gap-2 mb-3">
        <span className={small ? 'text-2xl' : 'text-3xl'}>{icon}</span>
        <span className={`${small ? 'text-lg' : 'text-xl'} text-[#5060a0]`}>←</span>
        <span className={small ? 'text-2xl' : 'text-3xl'}>{flag}</span>
        {badge && <span className="ml-auto px-2 py-0.5 text-[10px] font-medium bg-[#2b41a4]/25 text-[#6b7dff] rounded-full whitespace-nowrap">★ {badge}</span>}
      </div>
      <h3 className={`${small ? 'text-base' : 'text-lg'} font-semibold mb-1.5`}>{title}</h3>
      <p className={`${small ? 'text-xs' : 'text-sm'} text-[#6070a0] leading-relaxed`}>{description}</p>
    </div>
  );
}

// FAQ Item Component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#0a0d1a] rounded-xl border border-[#1a2040] overflow-hidden">
      <button
        className="w-full px-4 py-3 flex justify-between items-center text-left font-medium hover:bg-[#0f1320] transition-colors text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <svg className={`w-4 h-4 text-[#6b7dff] transition-transform duration-300 flex-shrink-0 ml-2 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-32' : 'max-h-0'}`}>
        <p className="px-4 pb-3 text-[#6070a0] text-sm">{answer}</p>
      </div>
    </div>
  );
}

// ============================================
// OPINIE UCZNIÓW - TUTAJ DODAWAJ/USUWAJ OPINIE
// ============================================
// Aby DODAĆ opinię: skopiuj jeden obiekt {...} i wklej poniżej, zmieniając dane
// Aby USUNĄĆ opinię: usuń cały obiekt {...} tej opinii którą chcesz usunąć
// ============================================

const testimonialsList = [
  {
    id: 1,
    name: "Олена Ковальчук",
    location: { pl: "Ukraina → Polska", uk: "Україна → Польща", ru: "Украина → Польша", en: "Ukraine → Poland" },
    rating: 5,
    text: {
      pl: "Dzięki Slovotok szybko nauczyłam się polskiego na poziomie B2. Lekcje są bardzo efektywne, a nauczyciel rozumie specyfikę ukraińskiego, co bardzo pomaga w nauce. Polecam każdemu!",
      uk: "Завдяки Slovotok я швидко вивчила польську до рівня B2. Уроки дуже ефективні, а вчитель розуміє специфіку української, що дуже допомагає у навчанні. Рекомендую всім!",
      ru: "Благодаря Slovotok я быстро выучила польский до уровня B2. Уроки очень эффективные, а учитель понимает специфику украинского, что очень помогает в обучении. Рекомендую всем!",
      en: "Thanks to Slovotok I quickly learned Polish to B2 level. Lessons are very effective, and the teacher understands Ukrainian specifics which helps a lot. Highly recommend!"
    }
  },
  {
    id: 2,
    name: "Михаил Соколов",
    location: { pl: "Rosja → Polska", uk: "Росія → Польща", ru: "Россия → Польша", en: "Russia → Poland" },
    rating: 5,
    text: {
      pl: "Świetne podejście do nauki! Wykorzystanie podobieństw między rosyjskim a polskim sprawia, że postępy są bardzo szybkie. Po 3 miesiącach mogę swobodnie rozmawiać po polsku.",
      uk: "Чудовий підхід до навчання! Використання подібностей між російською та польською робить прогрес дуже швидким. Через 3 місяці я можу вільно розмовляти польською.",
      ru: "Отличный подход к обучению! Использование сходств между русским и польским делает прогресс очень быстрым. Через 3 месяца могу свободно говорить по-польски.",
      en: "Great approach to learning! Using similarities between Russian and Polish makes progress very fast. After 3 months I can speak Polish fluently."
    }
  },
  {
    id: 3,
    name: "Anna Nowak",
    location: { pl: "Polska", uk: "Польща", ru: "Польша", en: "Poland" },
    rating: 5,
    text: {
      pl: "Uczę się rosyjskiego i jestem bardzo zadowolona. Lekcje są dopasowane do mojego tempa nauki, a tłumaczenie trudnych zagadnień w moim ojczystym języku jest nieocenione.",
      uk: "Вивчаю російську і дуже задоволена. Уроки адаптовані до мого темпу навчання, а пояснення складних тем рідною мовою є безцінним.",
      ru: "Учу русский и очень довольна. Уроки адаптированы под мой темп обучения, а объяснение сложных тем на родном языке бесценно.",
      en: "I'm learning Russian and I'm very satisfied. Lessons are adapted to my learning pace, and explaining difficult topics in my native language is invaluable."
    }
  },
];
// ============================================
// KONIEC SEKCJI OPINII
// ============================================

// Testimonials Component
function Testimonials({ lang }: { lang: Language }) {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {testimonialsList.map((testimonial) => (
        <div 
          key={testimonial.id}
          className="bg-[#0a0d1a] rounded-xl border border-[#1a2040] p-5 hover:border-[#2a3560] transition-all"
        >
          {/* Rating */}
          <div className="flex gap-0.5 mb-3">
            {[...Array(testimonial.rating)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-sm">★</span>
            ))}
          </div>
          
          {/* Text */}
          <p className="text-[#a0b0d0] text-sm leading-relaxed mb-4">
            "{testimonial.text[lang]}"
          </p>
          
          {/* Author */}
          <div className="flex items-center gap-3 pt-3 border-t border-[#1a2040]">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2b41a4] to-[#6b7dff] flex items-center justify-center text-white font-bold text-sm">
              {testimonial.name.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-sm text-white">{testimonial.name}</p>
              <p className="text-xs text-[#6070a0]">{testimonial.location[lang]}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
