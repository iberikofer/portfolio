import webStudioImg from '../assets/webStudio.png';
import nodePhonebookImg from '../assets/nodePhonebook.jpg';
import imageFinder from '../assets/imageFinder.png';
import feedbackPage from '../assets/feedbackPage.png';
import movieFinder from '../assets/movieFinder.png';
import carRent from '../assets/carRent.png';
import glyanecImg from '../assets/glyanec.png';
import quizImg from '../assets/quiz.png';
import reactPhonebookImg from '../assets/reactPhonebook.png';
import iceCreamImg from '../assets/iceCream.png';
import bookshelfImg from '../assets/bookshelf.png';
import fizzRushImg from '../assets/fizzRush.png';
import agentTomImg from '../assets/agentTOM.png';
import lethalLabyrinthsImg from '../assets/lethalLabyrinths.png';
import tornadoGymImg from '../assets/tornadoGYM.png';
import healthHubImg from '../assets/healthHub.png';
import type { StaticImageData } from 'next/image';

export type ImageSource = string | StaticImageData;

export interface Project {
  id: number;
  title: string;
  photo?: ImageSource;
  description: string;
  tags: string[];
  link: string;
  mockup?: string;
  pages?: string;
  status: 'Open' | 'Closed';
  objectPosition?: string;
  objectFit?: 'cover' | 'contain' | 'fill';
  containerBg?: string;
}

export interface Profile {
  name: string;
  title: string;
  location: string;
  bio: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
}

export interface Skills {
  [category: string]: string[];
}

export interface AppData {
  profile: Profile;
  skills: Skills;
  projects: Project[];
}

export const DATA: AppData = {
  profile: {
    name: 'Yaroslav Sych',
    title: 'Fullstack JS Developer',
    location: 'Ukraine',
    bio: 'Passionate developer with a focus on the React/Node.js ecosystem. Currently expanding my horizons with C++, Java and Python at university.',
    email: 'sych521@gmail.com',
    phone: '+38 (068) 712-79-75',
    github: 'https://github.com/iberikofer',
    linkedin: 'https://www.linkedin.com/in/yaroslav-sych/',
  },
  skills: {
    frontend: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Tailwind',
      'SCSS',
      'Vite',
    ],
    backend: [
      'Node.js',
      'Express',
      'PostgreSQL',
      'MongoDB',
      'SQLite',
      'Prisma',
      'REST API',
    ],
    other: ['Git', 'Docker', 'VScode', 'WebStorm'],
    languages: [
      'English (B2)',
      'Ukrainian (Native)',
      'Russian (Fluent)',
      'Spanish (A1)',
    ],
  },
  projects: [
    {
      id: 1,
      title: 'Quiz builder',
      photo: quizImg,
      description:
        'My first full-stack app - Quiz Builder that allows users to create custom quizzes with various question types, interactive dashboard, and question inspection.',
      tags: [
        'FULLSTACK',
        'REACT',
        'NODE.JS',
        'TS',
        'EXPRESS',
        'SQLITE',
        'PRISMA',
        'REST API',
        'AXIOS',
        'TAILWIND',
      ],
      link: 'https://github.com/iberikofer/quiz-builder',
      pages: 'https://iberikofer.github.io/quiz-builder',
      status: 'Closed',
    },
    {
      id: 2,
      title: 'Movie finder',
      photo: movieFinder,
      description:
        'A dynamic React web application for discovering movies, searching titles, and viewing detailed cast and reviews via TMDB API.',
      tags: ['REACT', 'JS', 'FETCH'],
      link: 'https://github.com/iberikofer/react-movie-finder',
      pages: 'https://iberikofer.github.io/react-movie-finder',
      status: 'Open',
    },
    {
      id: 3,
      title: 'Image finder',
      photo: imageFinder,
      description:
        'React-based image search application powered by Pixabay API featuring state management, infinite scroll/pagination, and modal views.',
      tags: ['REACT', 'JS', 'AXIOS'],
      link: 'https://github.com/iberikofer/react-image-finder',
      pages: 'https://iberikofer.github.io/react-image-finder',
      status: 'Open',
    },
    {
      id: 4,
      title: 'Car rental service',
      photo: carRent,
      description:
        'Interactive car rental platform built with React and modern frontend tools.',
      tags: ['REACT', 'JS', 'AXIOS'],
      link: 'https://github.com/iberikofer/car-rent-react-node',
      pages: 'https://iberikofer.github.io/car-rent-react-node',
      status: 'Open',
    },
    {
      id: 5,
      title: 'Phonebook',
      photo: reactPhonebookImg,
      description:
        'React phonebook application with user authentication, Redux state management, and contact filtering.',
      tags: ['FULLSTACK', 'BACKEND', 'REACT', 'REDUX', 'JS'],
      link: 'https://github.com/iberikofer/react-phonebook',
      pages: 'https://iberikofer.github.io/react-phonebook/',
      status: 'Open',
    },
    {
      id: 6,
      title: 'Node.js phonebook',
      photo: nodePhonebookImg,
      description:
        'RESTful API for a phonebook service built with Node.js, Express, MongoDB, JWT auth, avatar uploads, and email verification.',
      tags: ['BACKEND', 'NODE.JS', 'EXPRESS', 'MONGODB', 'JWT', 'REST API'],
      link: 'https://github.com/iberikofer/node-phonebook',
      status: 'Open',
      objectPosition: 'center',
      objectFit: 'fill',
    },
    {
      id: 7,
      title: 'Web Studio',
      photo: webStudioImg,
      description:
        'My first website - modern and fully responsive multi-page website for a digital web studio, crafted with semantic HTML5, CSS3, and JavaScript.',
      tags: ['HTML', 'CSS', 'JS'],
      link: 'https://github.com/iberikofer/Web-Studio',
      mockup:
        'https://www.figma.com/file/B1m2uk25m1eAgroESAuM2g/Web-Studio-(Version-3.0)?type=design&node-id=297046-1554&mode=design&t=0qnasU7mLt3RfBg9-0',
      pages: 'https://iberikofer.github.io/Web-Studio',
      status: 'Open',
    },
    {
      id: 8,
      title: 'Glyanec',
      photo: glyanecImg,
      description:
        'Responsive landing page built with vanilla HTML, CSS, and minimal JS. Features custom mobile layouts and interactive animations based on a Figma design.',
      tags: ['HTML', 'CSS', 'JS'],
      link: 'https://github.com/iberikofer/Glyanec',
      mockup: 'https://www.figma.com/file/UBkIfuekqFDAJBdq44UzVS',
      pages: 'https://iberikofer.github.io/Glyanec',
      status: 'Open',
    },
    {
      id: 9,
      title: 'Feedback calculator',
      photo: feedbackPage,
      description:
        'Interactive feedback and statistics web app built with React, featuring state-driven rating metrics and dynamic statistics.',
      tags: ['REACT', 'HOOKS', 'JS'],
      link: 'https://github.com/iberikofer/react-feedback-page',
      pages: 'https://iberikofer.github.io/react-feedback-page',
      status: 'Open',
    },
    {
      id: 10,
      title: 'Dev Dialogue',
      description:
        'An interactive interview simulation platform crafted to prepare next-generation software engineers for technical, behavioral, and English interviews.',
      tags: [
        'TEAM',
        'FULLSTACK',
        'NEXT.JS',
        'TYPESCRIPT',
        '.NET',
        'POSTGRESQL',
      ],
      link: 'https://github.com/iberikofer/dev-dialogue',
      pages: 'https://dev-dialogue-web.onrender.com/',
      status: 'Open',
    },
    {
      id: 11,
      title: 'Bookshelf',
      photo: bookshelfImg,
      description:
        'Interactive book discovery and e-reading web application built collaboratively in a team. Features book categories, shopping list pagination, and modal inspection views.',
      tags: ['TEAM', 'JAVASCRIPT', 'HTML', 'SCSS', 'REST API'],
      link: 'https://github.com/lezver/project-new_skill',
      pages: 'https://iberikofer.github.io/bookshelf-page',
      status: 'Open',
    },
    {
      id: 12,
      title: 'Ice Cream',
      photo: iceCreamImg,
      description:
        'Modern responsive digital landing page for an ice cream brand, featuring Swiper carousels, customer review sliders, and interactive ordering popups built with a development team.',
      tags: ['TEAM', 'HTML', 'SCSS', 'JS', 'SWIPER'],
      link: 'https://github.com/lezver/team-13-ice-cream',
      pages: 'https://lezver.github.io/team-13-ice-cream/',
      status: 'Open',
    },
    {
      id: 13,
      title: 'HealthyHub',
      photo: healthHubImg,
      description:
        'Comprehensive health and nutrition tracking web app with calorie budgeting, interactive Chart.js analytics, goal tracking, and persistent state management built with a team.',
      tags: ['TEAM', 'REACT', 'REDUX', 'CHART.JS', 'AXIOS'],
      link: 'https://github.com/AndriiZlt/healthyHub-frontend',
      pages: 'https://andriizlt.github.io/healthyHub-frontend/',
      status: 'Open',
      objectFit: 'cover',
      objectPosition: 'center',
    },
    {
      id: 14,
      title: 'Agent For TOM',
      photo: agentTomImg,
      description:
        'Autonomous AI agent system (TOMAS) engineered for deterministic document generation and automated workflows with token optimization and multi-model routing.',
      tags: ['TEAM', 'AI', 'AUTOMATION', 'PYTHON', 'AI AGENT', 'CLI', 'LLM'],
      link: 'https://github.com/oleksandkov/Agent-For-TOM',
      pages: 'https://github.com/oleksandkov/Agent-For-TOM#readme',
      status: 'Open',
      objectFit: 'cover',
      objectPosition: 'center',
    },
    {
      id: 15,
      title: 'Fizz Rush',
      photo: fizzRushImg,
      description:
        'A fast-paced 2D action game built with C++ and SFML. Dodge, roll, and escape from chasing enemies and bosses with custom physics, gamepad support, and full localization.',
      tags: ['GAME', 'C++', 'SFML', '2D GAME', 'DESKTOP'],
      link: 'https://github.com/iberikofer/fizz-rush',
      pages: 'https://github.com/iberikofer/fizz-rush#readme',
      status: 'Open',
    },
    {
      id: 16,
      title: 'Lethal Labyrinths',
      photo: lethalLabyrinthsImg,
      description:
        'Interactive discrete route optimization and resource gathering simulator built with C++20, SFML, and Dear ImGui. Implements A*, Dijkstra, BFS, TSP 2-Opt heuristic, Dynamic Programming knapsack solver, and procedural BSP maze generation.',
      tags: [
        'SIMULATOR',
        'GAME',
        'C++',
        'SFML',
        'IMGUI',
        'ALGORITHMS',
        'COURSEWORK',
      ],
      link: 'https://github.com/iberikofer/academic-archive/tree/main/course-projects/DSA-cpp#readme',
      pages:
        'https://github.com/iberikofer/academic-archive/tree/main/course-projects/DSA-cpp/docs#readme',
      status: 'Open',
      objectPosition: 'center',
    },
    {
      id: 17,
      title: 'Tornado GYM Simulator',
      photo: tornadoGymImg,
      description:
        'Gamified object-oriented software system modeling fitness gym facilities, athletes, and equipment. Architected with strict OOP principles, UML state machines, and interactive Java simulation mechanics.',
      tags: ['SIMULATOR', 'GAME', 'JAVA', 'OOP', 'UML', 'COURSEWORK'],
      link: 'https://github.com/iberikofer/academic-archive/tree/main/course-projects/OOP-java',
      pages:
        'https://github.com/iberikofer/academic-archive/tree/main/course-projects/OOP-java/docs#readme',
      status: 'Open',
      objectPosition: 'center 25%',
    },
  ],
};
