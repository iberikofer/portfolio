export type Language = 'en' | 'uk' | 'es';

export interface TranslationData {
  meta: {
    title: string;
    description: string;
  };
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
    chips: {
      fullstack: string;
      frontend: string;
      backend: string;
      'ai-tools': string;
      games: string;
    };
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
    meta: {
      title: 'Yaroslav Sych',
      description:
        'Portfolio of Yaroslav Sych — Fullstack JavaScript/TypeScript Developer specializing in React, Node.js, and modern high-craft web applications.',
    },
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
      toggleLangLabel: 'Switch to Ukrainian (UK)',
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
      chips: {
        fullstack: 'Fullstack',
        frontend: 'Front-end',
        backend: 'Back-end',
        'ai-tools': 'Tools',
        games: 'Games/Simulators',
      },
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
        1: 'Full-stack Quiz Builder platform to create custom quizzes with various question types, interactive dashboard, and question inspection.',
        2: 'A modern, responsive movie discovery platform built with React, Vite, and Tailwind CSS. Explore trending films, search thousands of titles via TMDB, and watch high-quality trailers.',
        3: 'Image search engine powered by the Pixabay API, featuring infinite scroll pagination, image lightbox modals, and keyword searching.',
        4: 'Full-stack car rental service with custom filter queries, responsive catalog pagination, catalog filtering, and rental modal booking.',
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
        16: 'Inspired by Lethal Company — interactive route optimization and scrap-gathering simulator built with C++20, SFML, and Dear ImGui. Implements A*, Dijkstra, BFS, TSP 2-Opt heuristic, Dynamic Programming knapsack solver, and procedural BSP maze generation.',
        17: 'Gamified object-oriented software system modeling fitness gym facilities, athletes, and equipment. Architected with strict OOP principles, UML state machines, and interactive Java simulation mechanics.',
        18: 'A custom smart automation script for Windows 10/11 that dynamically manages background apps, Bluetooth, and OS visual performance based on the active power source (AC vs Battery).',
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
    meta: {
      title: 'Ярослав Сич',
      description:
        'Портфоліо Ярослава Сича — Fullstack розробника на React, Node.js та сучасних веб-технологіях.',
    },
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
      toggleLangLabel: 'Перемкнути на іспанську (ES)',
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
      chips: {
        fullstack: 'Фулстак',
        frontend: 'Фронт-енд',
        backend: 'Бек-енд',
        'ai-tools': 'Інструменти',
        games: 'Ігри/Симулятори',
      },
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
        1: 'Full-stack платформа Quiz Builder для створення кастомних квізів з різними типами запитань, інтерактивним дашбордом та режимом детального перегляду.',
        2: 'Сучасна адаптивна веб-платформа для пошуку фільмів на React, Vite та Tailwind CSS. Трендові кінострічки, пошук тисяч фільмів через TMDB та перегляд трейлерів.',
        3: 'Пошуковик зображень на основі Pixabay API з нескінченним скролом, модальним переглядом lightbox та пошуком за ключовими словами.',
        4: 'Full-stack сервіс оренди автомобілів з фільтрацією, пагінацією каталогу та модальним бронюванням авто.',
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
        16: 'Інтерактивний симулятор оптимізації маршрутів і збору луту за мотивами гри Lethal Company, створений на C++20, SFML та Dear ImGui. Алгоритми A*, Dijkstra, BFS, евристика TSP 2-Opt, DP рюкзак та процедурна BSP-генерація лабіринтів.',
        17: 'Гейміфікована обʼєктно-орієнтована система моделювання фітнес-залу, спортсменів та інвентарю на Java за принципами ООП, UML-діаграмами станів та симуляційними механіками.',
        18: 'Кастомний скрипт автоматизації для Windows 10/11, що динамічно оптимізує фонові програми, Bluetooth та візуальні ефекти системи залежно від джерела живлення (мережа чи батарея).',
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
  es: {
    meta: {
      title: 'Yaroslav Sych',
      description:
        'Portafolio de Yaroslav Sych — Desarrollador Fullstack JavaScript/TypeScript especializado en React, Node.js y aplicaciones web modernas.',
    },
    profile: {
      name: 'Yaroslav Sych',
      title: 'Desarrollador Fullstack JS',
      location: 'Ucrania',
      bio: 'Desarrollador apasionado con enfoque en el ecosistema React y Node.js. Actualmente ampliando mis horizontes con C++, Java y Python en la universidad.',
    },
    header: {
      navProjects: 'Proyectos',
      navAbout: 'Sobre mí',
      navContact: 'Contacto',
      toggleLangLabel: 'Cambiar a inglés (EN)',
    },
    hero: {
      status: 'Disponible para nuevas oportunidades',
      intro: 'Hola, mi nombre es',
      bio: 'Ingeniero de software centrado en los ecosistemas React y Node.js. Construyendo aplicaciones web rápidas, resilientes y visualmente refinadas, mientras avanzo en programación de sistemas, algoritmos y matemáticas en la universidad.',
      metricProjects: 'Proyectos',
      metricEnglish: 'Inglés',
      metricDegree: 'Ing. de Software',
      btnViewProjects: 'Ver Proyectos',
      btnGetInTouch: 'Ponerse en Contacto',
    },
    projects: {
      badge: 'Portafolio Destacado',
      title: 'Proyectos y Software Diseñado',
      subtitle:
        'Aplicaciones en producción, backends full-stack y productos digitales responsivos construidos bajo modernos estándares de ingeniería.',
      scopeAll: 'Todos',
      scopeSolo: 'Proyectos individuales',
      scopeTeam: 'Proyectos en equipo',
      chipAll: 'Todos',
      chips: {
        fullstack: 'Fullstack',
        frontend: 'Front-end',
        backend: 'Back-end',
        'ai-tools': 'Herramientas',
        games: 'Juegos/Simuladores',
      },
      showing: 'Mostrando',
      of: 'de',
      projectsWord: 'proyectos',
      resetFilters: 'Restablecer filtros',
      matchAny: 'Coincidir con CUALQUIER etiqueta',
      matchAll: 'Coincidir con TODAS las etiquetas',
      liveDemo: 'Demo en Vivo',
      sourceCode: 'Código Fuente',
      designMockup: 'Mockup de Diseño',
      statusLabel: 'Estado',
      statusOpen: 'Activo',
      statusClosed: 'Cerrado',
      noMatchTitle: 'No hay proyectos que coincidan con los criterios seleccionados.',
      clearFiltersBtn: 'Limpiar todos los filtros',
      githubCardTitle: 'Explora Más Repositorios',
      githubCardDesc:
        'Historial de commits completo, experimentación con C++/Java/Python y contribuciones de código abierto.',
      activeWord: 'activos',
      noMatchSubtitle:
        'Ningún proyecto en esta categoría coincide con todas las etiquetas seleccionadas simultáneamente.',
      switchModeBtn: 'Cambiar al modo "Cualquiera (OR)"',
      descriptions: {
        1: 'Plataforma full-stack Quiz Builder para crear cuestionarios personalizados con varios tipos de preguntas, panel interactivo y vista de inspección.',
        2: 'Moderna plataforma responsiva de descubrimiento de películas construida con React, Vite y Tailwind CSS. Explora películas en tendencia, busca miles de títulos vía TMDB y reproduce tráileres de alta calidad.',
        3: 'Buscador de imágenes impulsado por la API de Pixabay, con paginación infinita, ventanas modales lightbox y búsqueda por palabras clave.',
        4: 'Servicio full-stack de alquiler de coches con filtros personalizados, catálogo responsivo paginado y modal para reservar vehículos.',
        5: 'Aplicación de agenda telefónica en React con autenticación de usuarios, gestión de estado con Redux y filtrado de contactos.',
        6: 'API RESTful para servicio de libreta de contactos construida con Node.js, Express, MongoDB, autenticación JWT, subida de avatares y verificación de correo.',
        7: 'Mi primer sitio web: página web moderna y totalmente responsiva de varias páginas para un estudio digital, creada con HTML5 semántico, CSS3 y JavaScript.',
        8: 'Página de aterrizaje responsiva construida con HTML puro, CSS y JavaScript mínimo. Incluye layouts móviles a medida y animaciones interactivas basadas en Figma.',
        9: 'Aplicación web interactiva de feedback y estadísticas creada con React, con métricas de calificación dinámicas y estadísticas en tiempo real.',
        10: 'Plataforma de simulación interactiva de entrevistas diseñada para preparar a la próxima generación de ingenieros en entrevistas técnicas, conductuales y en inglés.',
        11: 'Aplicación colaborativa de descubrimiento de libros y lectura electrónica creada en equipo. Incluye categorías de libros, lista de compras con paginación y vista modal de detalles.',
        12: 'Moderna landing page responsiva para una marca de helados, con carruseles Swiper, sliders de reseñas de clientes y popups interactivos para pedidos creada con un equipo.',
        13: 'Aplicación web completa de control de nutrición y calorías con presupuesto energético, analíticas interactivas con Chart.js, seguimiento de metas y persistencia de datos en equipo.',
        14: 'Sistema de agentes de IA autónomos (TOMAS) diseñado para la generación determinista de documentos y flujos de trabajo automatizados con optimización de tokens y enrutamiento multimodelos.',
        15: 'Juego de acción 2D de ritmo rápido creado con C++ y SFML. Esquiva, rueda y escapa de enemigos y jefes con física personalizada, soporte para mando y localización completa.',
        16: 'Inspirado en Lethal Company: simulador interactivo de optimización de rutas y recolección de chatarra desarrollado con C++20, SFML y Dear ImGui. Implementa algoritmos A*, Dijkstra, BFS, heurística TSP 2-Opt, DP mochila y generación procedural de laberintos BSP.',
        17: 'Sistema de software orientado a objetos gamificado que modela gimnasios, atletas y equipamiento en Java bajo estrictos principios de POO, diagramas de estado UML y mecánicas interactivas de simulación.',
        18: 'Script de automatización inteligente para Windows 10/11 que gestiona dinámicamente aplicaciones en segundo plano, Bluetooth y efectos visuales según la fuente de energía (CA o batería).',
      },
    },
    about: {
      badge: 'Experiencia y Habilidades',
      heading: 'Ingeniería y Fundamentos',
      subheading:
        'Desarrollo full-stack respaldado por estudios universitarios en Ciencias de la Computación, arquitectura de código disciplinada y pasión por crear software responsivo.',
      skillsHeading: 'Competencias Clave y Tecnologías',
      eduHeading: 'Educación y Credenciales',
      statusInProgress: 'En curso',
      statusCertified: 'Certificado',
      vntuName: 'Universidad Técnica Nacional de Vinnytsia',
      vntuDesc:
        'Licenciatura en Ingeniería de Software: enfoque en estructuras de datos, algoritmos y computación moderna.',
      vntuDate: '2025 — Presente (Graduación estimada 2029)',
      goitName: 'GoIT Academy',
      goitDesc:
        'Bootcamp de Desarrollo Web Full-Stack (React, Node.js, TypeScript, REST APIs).',
      collegeName: 'Colegio de Comercio y Economía de Vinnytsia',
      collegeDesc:
        'Grado Asociado en Gestión de Turismo y Hostelería.',
      lyceumName: 'Liceo de Humanidades №1 de Vinnytsia',
      lyceumDesc: 'Estudios avanzados de idiomas inglés y alemán.',
      greetings: '¡Hola!',
      bioLead:
        'Soy un Desarrollador Fullstack especializado en experiencias web modernas con React, TypeScript y Node.js. Mi pasión por la ingeniería comenzó preguntándome cómo funciona el software en el nivel más profundo, impulsándome a explorar tanto tecnologías a nivel de sistema como de alto nivel.',
      bioSub:
        'Actualmente estoy perfeccionando mis habilidades full-stack mientras avanzo en algoritmos, matemáticas superiores y programación de sistemas (C++, Java, Python) en la Universidad Técnica Nacional de Vinnytsia. Me encanta transformar lógica compleja en productos digitales de alto rendimiento e impecable estética.',
      academicArchive: 'Archivo Académico',
      archiveDesc:
        'Un repositorio de trabajos universitarios, prácticas de laboratorio y proyectos computacionales en C++, Java, Python y JavaScript, documentando mi progreso académico a través de diversos paradigmas de programación.',
    },
    contact: {
      pill: 'Disponible para oportunidades',
      title: 'Construyamos Algo Excepcional',
      subtitle:
        'Ya sea que tengas una idea de producto ambiciosa, una oportunidad de ingeniería o necesites un desarrollador full-stack dedicado, mi bandeja de entrada está abierta.',
      specializationLabel: 'Especialización',
      specializationRole: 'Desarrollador FullStack-JS',
      emailTitle: 'Correo Electrónico',
      phoneTitle: 'Teléfono Directo',
      locationTitle: 'Ubicación',
      locationDesc: 'Ucrania • Disponible para trabajo remoto en todo el mundo',
      cvTitle: 'Curriculum Vitae',
      cvDesc: 'Descarga el currículum profesional completo en formato PDF',
      cvBtn: 'Descargar CV (PDF)',
      socialsTitle: 'Redes Sociales',
      formTitle: 'Enviar Mensaje Directo',
      formSubtitle:
        'Respondo rápidamente a consultas y propuestas de proyectos.',
      nameLabel: 'Tu Nombre',
      emailLabel: 'Tu Correo Electrónico',
      subjectLabel: 'Asunto',
      messageLabel: 'Tu Mensaje...',
      btnIdle: 'Enviar Mensaje',
      btnSending: 'Transmitiendo',
      btnSuccess: '¡Mensaje Enviado! ✨',
      btnError: 'Error al Enviar • Toca para Reintentar',
      btnValidation: 'Completa los Campos',
      btnCooldown: 'Espera {time}',
      btnRateLimited: 'Límite: 1 msj / 5 min',
      statusSuccess:
        '¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.',
      statusValidationRequired:
        'Por favor, ingresa tanto tu nombre como el mensaje.',
      statusValidationEmail:
        'Por favor, proporciona un correo válido (ej. tunombre@dominio.com).',
      statusTimeout:
        'Tiempo de espera agotado: el servicio de correo tardó demasiado en responder. Por favor, contáctame directamente por email o Telegram.',
      statusIssue:
        'Problema en el servicio de correo. Por favor, contáctame directamente por email o Telegram.',
      statusRateLimited:
        'Por favor, espera {time} antes de enviar otro mensaje.',
      cooldownBadge:
        'Límite de envío: 1 mensaje cada 5 min (disponible en {time})',
      draftRestored: 'Borrador restaurado',
      draftClear: 'limpiar',
    },
    footer: {
      status: 'Disponible para nuevos proyectos',
      navProjects: 'Proyectos',
      navAbout: 'Sobre mí',
      navContact: 'Contacto',
      navBackToTop: 'Arriba',
      copyright: 'Diseñado y construido con pasión y precisión.',
    },
    scrollToTop: {
      ariaLabel: 'Volver arriba',
    },
  },
};
