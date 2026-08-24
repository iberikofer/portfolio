import webStudioImg from '../assets/webStudio.png';
import nodePhonebookImg from '../assets/nodePhonebook.jpg';
import imageFinder from '../assets/imageFinder.png';
import feedbackPage from '../assets/feedbackPage.png';
import movieFinder from '../assets/movieFinder.png';
import carRent from '../assets/carRent.png';
import glyanecImg from '../assets/glyanec.png';
import quizImg from '../assets/quiz.png';
import reactPhonebookImg from '../assets/reactPhonebook.png';

export interface Project {
  id: number;
  title: string;
  photo?: string;
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
      'TypeScript',
      'JavaScript',
      'HTML5/CSS3',
      'Tailwind',
      'Vite',
    ],
    backend: ['Node.js', 'Express', 'MongoDB', 'SQLite', 'Prisma', 'REST API'],
    other: ['Git', 'VScode', 'WebStorm'],
    languages: ['English (B2)', 'Ukrainian (Native)', 'Russian (Fluent)'],
  },
  projects: [
    {
      id: 1,
      title: 'Quiz builder',
      photo: quizImg,
      description:
        'My first full-stack app - Quiz Builder that allows users to create custom quizzes with various question types, interactive dashboard, and question inspection.',
      tags: [
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
      title: 'React phonebook',
      photo: reactPhonebookImg,
      description:
        'React phonebook application with user authentication, Redux state management, and contact filtering.',
      tags: ['REACT', 'REDUX', 'JS'],
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
      tags: ['NODE.JS', 'EXPRESS', 'MONGODB', 'JWT'],
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
  ],
};
