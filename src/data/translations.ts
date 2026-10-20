export type Language = 'en' | 'uk';

export interface TranslationData {
  profile: {
    name: string;
    title: string;
    location: string;
    bio: string;
  };
  header: {
    navProjects: string;
    navAbout: string;
    navContact: string;
    toggleLangLabel: string;
  };
  hero: {
    status: string;
    intro: string;
    bio: string;
    metricProjects: string;
    metricEnglish: string;
    metricDegree: string;
    btnViewProjects: string;
    btnGetInTouch: string;
  };
  projects: {
    badge: string;
    title: string;
    subtitle: string;
    scopeAll: string;
    scopeSolo: string;
    scopeTeam: string;
    chipAll: string;
    showing: string;
    of: string;
    projectsWord: string;
    resetFilters: string;
    matchAny: string;
    matchAll: string;
    liveDemo: string;
    sourceCode: string;
    designMockup: string;
    statusLabel: string;
    statusOpen: string;
    statusClosed: string;
    noMatchTitle: string;
    clearFiltersBtn: string;
    githubCardTitle: string;
    githubCardDesc: string;
    activeWord: string;
    noMatchSubtitle: string;
    switchModeBtn: string;
    descriptions: Record<number, string>;
  };
  about: {
    badge: string;
    heading: string;
    subheading: string;
    skillsHeading: string;
    eduHeading: string;
    statusInProgress: string;
    statusCertified: string;
    vntuName: string;
    vntuDesc: string;
    vntuDate: string;
    goitName: string;
    goitDesc: string;
    collegeName: string;
    collegeDesc: string;
    lyceumName: string;
    lyceumDesc: string;
    greetings: string;
    bioLead: string;
    bioSub: string;
    academicArchive: string;
    archiveDesc: string;
  };
  contact: {
    pill: string;
    title: string;
    subtitle: string;
    specializationLabel: string;
    specializationRole: string;
    emailTitle: string;
    phoneTitle: string;
    locationTitle: string;
    locationDesc: string;
    cvTitle: string;
    cvDesc: string;
    cvBtn: string;
    socialsTitle: string;
    formTitle: string;
    formSubtitle: string;
    nameLabel: string;
    emailLabel: string;
    subjectLabel: string;
    messageLabel: string;
    btnIdle: string;
    btnSending: string;
    btnSuccess: string;
    btnError: string;
    btnValidation: string;
    btnCooldown: string;
    btnRateLimited: string;
    statusSuccess: string;
    statusValidationRequired: string;
    statusValidationEmail: string;
    statusTimeout: string;
    statusIssue: string;
    statusRateLimited: string;
    cooldownBadge: string;
    draftRestored: string;
    draftClear: string;
  };
  footer: {
    status: string;
    navProjects: string;
    navAbout: string;
    navContact: string;
    navBackToTop: string;
    copyright: string;
  };
  scrollToTop: {
    ariaLabel: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationData> = {
  en: {
    profile: {
      name: 'Yaroslav Sych',
      title: 'Fullstack JS Developer',
      location: 'Ukraine',
      bio: 'Passionate developer with a focus on the React/Node.js ecosystem. Currently expanding my horizons with C++, Java and Python at university.',
    },
    header: {
      navProjects: 'Projects',
      navAbout: 'About',
      navContact: 'Contact',
      toggleLangLabel: 'Switch to Ukrainian',
    },
    hero: {
      status: 'Available for new opportunities',
      intro: 'Hi, my name is',
      bio: 'Passionate engineer focused on the React and Node.js ecosystems. Building fast, resilient, and visually refined web applications, while advancing in systems programming, algorithms, and mathematics at university.',
      metricProjects: 'Projects',
      metricEnglish: 'English',
      metricDegree: 'Software Eng.',
      btnViewProjects: 'View Projects',
      btnGetInTouch: 'Get in Touch',
    },
    projects: {
      badge: 'Featured Portfolio',
      title: 'Crafted Projects & Software',
      subtitle:
        'Production apps, full-stack backends, and responsive digital products built with modern engineering standards.',
      scopeAll: 'All',
      scopeSolo: 'Solo projects',
      scopeTeam: 'Team projects',
      chipAll: 'All',
      showing: 'Showing',
      of: 'of',
      projectsWord: 'projects',
      resetFilters: 'Reset filters',
      matchAny: 'Match ANY tag',
      matchAll: 'Match ALL tags',
      liveDemo: 'Live Demo',
      sourceCode: 'Source Code',
      designMockup: 'Design Mockup',
      statusLabel: 'Status',
      statusOpen: 'Open',
      statusClosed: 'Closed',
      noMatchTitle: 'No projects match the selected criteria.',
      clearFiltersBtn: 'Clear all filters',
      githubCardTitle: 'Explore More Repositories',
      githubCardDesc:
        'Full commit history, experimentation with C++/Java/Python, and open-source contributions.',
      activeWord: 'active',
      noMatchSubtitle:
        'No projects in this scope match all selected tags together.',
      switchModeBtn: 'Switch to "Any (OR)" match',
      descriptions: {
        1: 'Full-stack car rental service with custom filter queries, responsive catalog pagination, catalog filtering, and rental modal booking.',
        2: 'A modern, responsive movie discovery platform built with React, Vite, and Tailwind CSS. Explore trending films, search thousands of titles via TMDB, and watch high-quality trailers.',
        3: 'Interactive quiz and assessment web app built with modern React. Features timed question rounds, score calculation, and performance analytics.',
        4: 'Image search engine powered by the Pixabay API, featuring infinite scroll pagination, image lightbox modals, and keyword searching.',
        5: 'React phonebook application with user authentication, Redux state management, and contact filtering.',
        6: 'RESTful API for a phonebook service built with Node.js, Express, MongoDB, JWT auth, avatar uploads, and email verification.',
        7: 'My first website - modern and fully responsive multi-page website for a digital web studio, crafted with semantic HTML5, CSS3, and JavaScript.',
        8: 'Responsive landing page built with vanilla HTML, CSS, and minimal JS. Features custom mobile layouts and interactive animations based on a Figma design.',
        9: 'Interactive feedback and statistics web app built with React, featuring state-driven rating metrics and dynamic statistics.',
        10: 'An interactive interview simulation platform crafted to prepare next-generation software engineers for technical, behavioral, and English interviews.',
        11: 'Interactive book discovery and e-reading web application built collaboratively in a team. Features book categories, shopping list pagination, and modal inspection views.',
        12: 'Modern responsive digital landing page for an ice cream brand, featuring Swiper carousels, customer review sliders, and interactive ordering popups built with a development team.',
        13: 'Comprehensive health and nutrition tracking web app with calorie budgeting, interactive Chart.js analytics, goal tracking, and persistent state management built with a team.',
        14: 'Autonomous AI agent system (TOMAS) engineered for deterministic document generation and automated workflows with token optimization and multi-model routing.',
        15: 'A fast-paced 2D action game built with C++ and SFML. Dodge, roll, and escape from chasing enemies and bosses with custom physics, gamepad support, and full localization.',
        16: 'Interactive discrete route optimization and resource gathering simulator built with C++20, SFML, and Dear ImGui. Implements A*, Dijkstra, BFS, TSP 2-Opt heuristic, Dynamic Programming knapsack solver, and procedural BSP maze generation.',
        17: 'Gamified object-oriented software system modeling fitness gym facilities, athletes, and equipment. Architected with strict OOP principles, UML state machines, and interactive Java simulation mechanics.',
      },
    },
    about: {
      badge: 'Background & Skills',
      heading: 'Engineering & Foundations',
      subheading:
        'Fullstack development backed by university Computer Science studies, disciplined code architecture, and a passion for crafting responsive software.',
      skillsHeading: 'Core Competencies & Tech Stack',
      eduHeading: 'Education & Credentials',
      statusInProgress: 'In Progress',
      statusCertified: 'Certified',
      vntuName: 'Vinnytsia National Technical University',
      vntuDesc:
        'Bachelor’s in Software Engineering — focus on data structures, algorithms, and modern computing.',
      vntuDate: '2025 — Present (Exp. 2029)',
      goitName: 'GoIT Academy',
      goitDesc:
        'Full-Stack Web Development Bootcamp (React, Node.js, TypeScript, REST APIs).',
      collegeName: 'Vinnytsia Trade and Economics College',
      collegeDesc:
        'Associate Degree in Tourism and Hospitality Management.',
      lyceumName: 'Humanities Lyceum of Vinnytsia №1',
      lyceumDesc: 'Advanced studies in English and German languages.',
      greetings: 'Greetings!',
      bioLead:
        "I'm a Fullstack Developer specializing in modern web experiences with React, TypeScript, and Node.js. My passion for engineering began with asking how software works at the deepest level, driving me to explore both systems-level and high-level technologies.",
      bioSub:
        'Currently, I am sharpening my full-stack capabilities while advancing in algorithms, mathematics, and systems programming (C++, Java, Python) at Vinnytsia National Technical University. I love turning complex logic into performant, visually impeccable digital products.',
      academicArchive: 'Academic Archive',
      archiveDesc:
        'A curated repository of university coursework, lab assignments, and computational projects across C++, Java, Python, and JavaScript — documenting my academic progression across diverse programming paradigms.',
    },
    contact: {
      pill: 'Open to opportunities',
      title: "Let's Build Something Exceptional",
      subtitle:
        'Whether you have an ambitious product idea, an engineering opportunity, or need a dedicated full-stack developer, my inbox is open.',
      specializationLabel: 'Specialization',
      specializationRole: 'FullStack-JS Developer',
      emailTitle: 'Direct Email',
      phoneTitle: 'Direct Number',
      locationTitle: 'Location',
      locationDesc: 'Ukraine • Available for remote worldwide',
      cvTitle: 'Curriculum Vitae',
      cvDesc: 'Download full professional resume in PDF format',
      cvBtn: 'Download Resume (PDF)',
      socialsTitle: 'Social Profiles',
      formTitle: 'Send a Direct Message',
      formSubtitle:
        'I respond promptly to inquiries and project propositions.',
      nameLabel: 'Your Name',
      emailLabel: 'Your Email',
      subjectLabel: 'Subject',
      messageLabel: 'Your Message...',
      btnIdle: 'Send Message',
      btnSending: 'Transmitting',
      btnSuccess: 'Message Dispatched! ✨',
      btnError: 'Delivery Failed • Tap to Retry',
      btnValidation: 'Please Complete Fields',
      btnCooldown: 'Wait {time}',
      btnRateLimited: 'Limit: 1 msg / 5 min',
      statusSuccess:
        'Message sent successfully! I will be in touch soon.',
      statusValidationRequired:
        'Please enter both your name and message.',
      statusValidationEmail:
        'Please provide a valid email format (e.g. yourname@domain.com).',
      statusTimeout:
        'Network timeout: Email service took too long to respond. Please reach me directly via email or Telegram.',
      statusIssue:
        'Delivery issue with email service. Please reach me directly via email or Telegram.',
      statusRateLimited:
        'Please wait {time} before sending another message.',
      cooldownBadge:
        'Submission limit: 1 message per 5 min (available in {time})',
      draftRestored: 'Draft restored',
      draftClear: 'clear',
    },
    footer: {
      status: 'Available for new projects',
      navProjects: 'Projects',
      navAbout: 'About',
      navContact: 'Contact',
      navBackToTop: 'Back to top',
      copyright: 'Designed & Built with passion and precision.',
    },
    scrollToTop: {
      ariaLabel: 'Scroll to top',
    },
  },
  uk: {
    profile: {
      name: 'Ярослав Сич',
      title: 'Fullstack JS розробник',
      location: 'Україна',
      bio: 'Захоплений розробник з фокусом на екосистему React та Node.js. Наразі розширюю горизонти з C++, Java та Python в університеті.',
    },
    header: {
      navProjects: 'Проєкти',
      navAbout: 'Про мене',
      navContact: 'Контакти',
      toggleLangLabel: 'Перемкнути на англійську',
    },
    hero: {
      status: 'Відкритий до нових пропозицій',
      intro: 'Привіт, мене звати',
      bio: 'Інженер-розробник з фокусом на екосистеми React та Node.js. Створюю швидкі, надійні та візуально вивірені веб-додатки, паралельно вивчаючи системне програмування, алгоритми та математику в університеті.',
      metricProjects: 'Проєктів',
      metricEnglish: 'Англійська',
      metricDegree: 'Інженерія ПЗ',
      btnViewProjects: 'Переглянути проєкти',
      btnGetInTouch: 'Звʼязатися',
    },
    projects: {
      badge: 'Портфоліо робіт',
      title: 'Створені проєкти та ПЗ',
      subtitle:
        'Продакшн-додатки, full-stack бекенди та адаптивні цифрові продукти за сучасними інженерними стандартами.',
      scopeAll: 'Усі',
      scopeSolo: 'Соло проєкти',
      scopeTeam: 'Командні проєкти',
      chipAll: 'Всі',
      showing: 'Показано',
      of: 'з',
      projectsWord: 'проєктів',
      resetFilters: 'Скинути фільтри',
      matchAny: 'Збіг за БУДЬ-ЯКИМ тегом',
      matchAll: 'Збіг за ВСІМА тегами',
      liveDemo: 'Демо онлайн',
      sourceCode: 'Вихідний код',
      designMockup: 'Макет дизайну',
      statusLabel: 'Статус',
      statusOpen: 'Активний',
      statusClosed: 'Закритий',
      noMatchTitle: 'Не знайдено проєктів за обраними критеріями.',
      clearFiltersBtn: 'Очистити всі фільтри',
      githubCardTitle: 'Переглянути більше репозиторіїв',
      githubCardDesc:
        'Повна історія комітів, експерименти з C++/Java/Python та open-source внесок.',
      activeWord: 'активних',
      noMatchSubtitle:
        'Жоден проєкт у цій категорії не відповідає всім обраним тегам одночасно.',
      switchModeBtn: 'Перемкнути на пошук "Будь-який (OR)"',
      descriptions: {
        1: 'Full-stack сервіс оренди автомобілів з фільтрацією, пагінацією каталогу та модальним бронюванням авто.',
        2: 'Сучасна адаптивна веб-платформа для пошуку фільмів на React, Vite та Tailwind CSS. Трендові кінострічки, пошук тисяч фільмів через TMDB та перегляд трейлерів.',
        3: 'Інтерактивний веб-додаток для проходження вікторин на React з таймером, підрахунком балів та аналітикою результатів.',
        4: 'Пошуковик зображень на основі Pixabay API з нескінченним скролом, модальним переглядом lightbox та пошуком за ключовими словами.',
        5: 'Додаток телефонної книги на React з аутентифікацією користувачів, Redux та фільтрацією контактів.',
        6: 'RESTful API для телефонної книги на Node.js, Express, MongoDB з JWT-аутентифікацією, завантаженням аватарів та верифікацією email.',
        7: 'Мій перший сайт — сучасний адаптивний багатосторінковий сайт веб-студії на семантичному HTML5, CSS3 та JavaScript.',
        8: 'Адаптивний лендінг на чистому HTML, CSS та JavaScript. Мобільна версія та інтерактивні анімації за дизайном Figma.',
        9: 'Інтерактивний додаток для збору відгуків та аналітики на React з динамічною статистикою оцінок.',
        10: 'Інтерактивна платформа симуляції співбесід для підготовки інженерів до технічних, поведінкових та англомовних інтервʼю.',
        11: 'Інтерактивний командний веб-додаток для пошуку та читання книг з категоріями, пагінацією списку покупок та модальними вікнами.',
        12: 'Сучасний командний лендінг бренду морозива зі Swiper-каруселями, слайдером відгуків та формою замовлення.',
        13: 'Командний веб-додаток для контролю харчування та калорій з інтерактивною аналітикою Chart.js і трекінгом цілей.',
        14: 'Автономна система AI-агентів (TOMAS) для детермінованої генерації документів та автоматизованих робочих процесів з оптимізацією токенів і маршрутизацією моделей.',
        15: 'Динамічна 2D-екшн гра на C++ та SFML. Ухиляння, перекати та втеча від переслідувачів і босів із власною фізикою, підтримкою геймпада та повною локалізацією.',
        16: 'Інтерактивний симулятор оптимізації дискретних маршрутів і збору ресурсів на C++20, SFML та Dear ImGui. Алгоритми A*, Dijkstra, BFS, евристика TSP 2-Opt, DP рюкзак та генерація лабіринтів BSP.',
        17: 'Гейміфікована обʼєктно-орієнтована система моделювання фітнес-залу, спортсменів та інвентарю на Java за принципами ООП, UML-діаграмами станів та симуляційними механіками.',
      },
    },
    about: {
      badge: 'Досвід та навички',
      heading: 'Інженерія та освіта',
      subheading:
        'Fullstack розробка на базі університетської компʼютерної освіти, системної архітектури коду та створення адаптивного ПЗ.',
      skillsHeading: 'Ключові компетенції та стек',
      eduHeading: 'Освіта та сертифікати',
      statusInProgress: 'У процесі',
      statusCertified: 'Сертифіковано',
      vntuName: 'Вінницький національний технічний університет',
      vntuDesc:
        'Бакалавр інженерії програмного забезпечення — структури даних, алгоритми та сучасні обчислення.',
      vntuDate: '2025 — Зараз (очік. 2029)',
      goitName: 'GoIT Academy',
      goitDesc:
        'Full-Stack Web Development Bootcamp (React, Node.js, TypeScript, REST APIs).',
      collegeName: 'Вінницький торговельно-економічний фаховий коледж',
      collegeDesc:
        'Молодший бакалавр з туризму та готельно-ресторанної справи.',
      lyceumName: 'Вінницький гуманітарний ліцей №1',
      lyceumDesc: 'Поглиблене вивчення англійської та німецької мов.',
      greetings: 'Вітаю!',
      bioLead:
        'Я Fullstack розробник, який спеціалізується на створенні сучасних веб-інтерфейсів за допомогою React, TypeScript та Node.js. Моє захоплення інженерією почалося з прагнення зрозуміти, як ПЗ працює на найглибшому рівні, що надихнуло мене вивчати як системні, так і високорівневі технології.',
      bioSub:
        'Зараз я вдосконалюю навички full-stack розробки та вивчаю алгоритми, вищу математику й системне програмування (C++, Java, Python) у Вінницькому національному технічному університеті. Мені подобається перетворювати складну логіку на продуктивні та візуально довершені цифрові продукти.',
      academicArchive: 'Академічний архів',
      archiveDesc:
        'Зібрання університетських курсових, лабораторних робіт та обчислювальних проєктів на C++, Java, Python та JavaScript — демонстрація академічного прогресу в різних парадигмах програмування.',
    },
    contact: {
      pill: 'Відкритий до співпраці',
      title: 'Створимо щось виняткове разом',
      subtitle:
        'Якщо у вас є амбітна ідея продукту, пропозиція роботи чи потрібен відданий full-stack розробник — я завжди на звʼязку.',
      specializationLabel: 'Спеціалізація',
      specializationRole: 'FullStack-JS Розробник',
      emailTitle: 'Прямий Email',
      phoneTitle: 'Прямий номер',
      locationTitle: 'Локація',
      locationDesc: 'Україна • Доступний для ремоуту по всьому світу',
      cvTitle: 'Резюме',
      cvDesc: 'Завантажити повне професійне резюме у форматі PDF',
      cvBtn: 'Завантажити резюме (PDF)',
      socialsTitle: 'Соціальні мережі',
      formTitle: 'Надіслати пряме повідомлення',
      formSubtitle:
        'Швидко відповідаю на запити та пропозиції щодо проєктів.',
      nameLabel: "Ваше ім'я",
      emailLabel: 'Ваш Email',
      subjectLabel: 'Тема',
      messageLabel: 'Ваше повідомлення...',
      btnIdle: 'Надіслати повідомлення',
      btnSending: 'Надсилання',
      btnSuccess: 'Повідомлення надіслано! ✨',
      btnError: 'Помилка доставки • Спробувати знову',
      btnValidation: 'Заповніть обовʼязкові поля',
      btnCooldown: 'Зачекайте {time}',
      btnRateLimited: 'Ліміт: 1 лист на 5 хв',
      statusSuccess:
        "Повідомлення успішно надіслано! Я зв'яжуся з вами найближчим часом.",
      statusValidationRequired:
        "Будь ласка, вкажіть ваше ім'я та повідомлення.",
      statusValidationEmail:
        'Будь ласка, вкажіть коректний email (наприклад yourname@domain.com).',
      statusTimeout:
        'Таймаут мережі: сервіс пошти відповідає занадто довго. Будь ласка, напишіть мені напряму на email або в Telegram.',
      statusIssue:
        'Помилка доставки поштового сервісу. Будь ласка, напишіть мені напряму на email або в Telegram.',
      statusRateLimited:
        'Будь ласка, зачекайте {time} перед наступною відправкою.',
      cooldownBadge:
        'Обмеження: 1 повідомлення на 5 хв (доступно через {time})',
      draftRestored: 'Чернетку відновлено',
      draftClear: 'очистити',
    },
    footer: {
      status: 'Доступний для нових проєктів',
      navProjects: 'Проєкти',
      navAbout: 'Про мене',
      navContact: 'Контакти',
      navBackToTop: 'Вгору',
      copyright: 'Створено з пристрастю та увагою до деталей.',
    },
    scrollToTop: {
      ariaLabel: 'Прокрутити вгору',
    },
  },
};
