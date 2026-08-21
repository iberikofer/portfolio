import webStudioImg from "../assets/WebStudio.png";
import NodePhonebookImg from "../assets/NodePhonebook.jpg";
import ImageFinder from "../assets/ImageFinder.png";
import FeedbackPage from "../assets/FeedbackPage.png";
import MovieFinder from "../assets/MovieFinder.png";
import CarRent from "../assets/CarRent.png";

export interface Project {
  id: number;
  title: string;
  photo?: string;
  description: string;
  tags: string[];
  link: string;
  mockup?: string;
  pages?: string;
  status: "Open" | "Closed";
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
    name: "Yaroslav Sych",
    title: "Fullstack JS Developer",
    location: "Ukraine",
    bio: "Passionate developer with a focus on the React/Node.js ecosystem. Currently expanding my horizons with C++, Java and Python at university.",
    email: "sych521@gmail.com",
    phone: "+38 (068) 712-79-75",
    github: "https://github.com/iberikofer",
    linkedin: "https://www.linkedin.com/in/yaroslav-sych/",
  },
  skills: {
    frontend: ["React", "JavaScript (ES6+)", "HTML5/CSS3", "SCSS", "Vite"],
    backend: ["Node.js", "MongoDB", "REST API", "Express"],
    other: ["C++", "Java", "Python", "Git", "VScode"],
    languages: ["English (B2)", "Ukrainian (Native)", "Russian (Fluent)"],
  },
  projects: [
    {
      id: 1,
      title: "Movie finder",
      photo: MovieFinder,
      description:
        "A dynamic React web application for discovering movies, searching titles, and viewing detailed cast and reviews via TMDB API.",
      tags: ["HTML", "CSS", "JS", "REACT"],
      link: "https://github.com/iberikofer/react-movie-finder",
      pages: "https://iberikofer.github.io/react-movie-finder",
      status: "Open",
    },
    {
      id: 2,
      title: "Image finder",
      photo: ImageFinder,
      description:
        "React-based image search application powered by Pixabay API featuring state management, infinite scroll/pagination, and modal views.",
      tags: ["HTML", "CSS", "JS", "REACT"],
      link: "https://github.com/iberikofer/react-image-finder",
      pages: "https://iberikofer.github.io/react-image-finder",
      status: "Open",
    },
    {
      id: 3,
      title: "Web Studio",
      photo: webStudioImg,
      description:
        "Modern and fully responsive multi-page website for a digital web studio, crafted with semantic HTML5, CSS3, and JavaScript.",
      tags: ["HTML", "CSS", "JS"],
      link: "https://github.com/iberikofer/Web-Studio",
      mockup:
        "https://www.figma.com/file/B1m2uk25m1eAgroESAuM2g/Web-Studio-(Version-3.0)?type=design&node-id=297046-1554&mode=design&t=0qnasU7mLt3RfBg9-0",
      pages: "https://iberikofer.github.io/Web-Studio",
      status: "Open",
    },
    {
      id: 4,
      title: "Car rental service",
      photo: CarRent,
      description:
        "Interactive car rental platform built with React and modern frontend tools.",
      tags: ["HTML", "CSS", "JS", "REACT"],
      link: "https://github.com/iberikofer/car-rent-react-node",
      pages: "https://iberikofer.github.io/car-rent-react-node",
      status: "Open",
    },
    {
      id: 5,
      title: "Feedback calculator",
      photo: FeedbackPage,
      description:
        "Interactive feedback and statistics web app built with React, featuring state-driven rating metrics and dynamic statistics.",
      tags: ["HTML", "CSS", "JS", "REACT", "HOOKS"],
      link: "https://github.com/iberikofer/react-feedback-page",
      pages: "https://iberikofer.github.io/react-feedback-page",
      status: "Open",
    },
    {
      id: 6,
      title: "Node.js phonebook",
      photo: NodePhonebookImg,
      description:
        "RESTful API for a phonebook service built with Node.js, Express, MongoDB, JWT auth, avatar uploads, and email verification.",
      tags: ["NODE", "MONGODB"],
      link: "https://github.com/iberikofer/node-phonebook",
      status: "Open",
    },
    {
      id: 7,
      title: "Glyanec landing",
      description:
        "Responsive landing page built with vanilla HTML, CSS, and minimal JS. Features custom mobile layouts and interactive animations based on a Figma design.",
      tags: ["HTML", "CSS", "JS"],
      link: "https://github.com/iberikofer/Glyanec",
      mockup: "https://www.figma.com/file/UBkIfuekqFDAJBdq44UzVS",
      pages: "https://iberikofer.github.io/Glyanec",
      status: "Open",
    },
    {
      id: 8,
      title: "Quiz builder",
      description:
        "A modern full-stack Quiz Builder application to create custom quizzes with various question types, interactive dashboard, and question inspection.",
      tags: ["TS", "REACT", "NODE", "TAILWIND"],
      link: "https://github.com/iberikofer/quiz-builder",
      pages: "https://iberikofer.github.io/quiz-builder",
      status: "Closed",
    },
  ],
};
