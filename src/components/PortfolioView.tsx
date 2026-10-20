'use client';

import React from 'react';
import Header from '../sections/Header';
import Hero from '../sections/Hero';
import Projects from '../sections/Projects';
import About from '../sections/About';
import Contact from '../sections/Contact';
import Footer from '../sections/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { LanguageProvider } from '../context/LanguageContext';
import { Language } from '../data/translations';

interface PortfolioViewProps {
  initialLang: Language;
}

export default function PortfolioView({ initialLang }: PortfolioViewProps) {
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const win = window as unknown as { __hasLoggedEasterEgg?: boolean };
    if (!win.__hasLoggedEasterEgg) {
      win.__hasLoggedEasterEgg = true;
      console.log(
        '%c👋 Привіт! Дякую, що заглянув у консоль =)',
        'color: #9bff00; font-family: monospace; font-size: 14px; font-weight: bold; background: #111111; padding: 6px 12px; border-radius: 6px; border: 1px solid rgba(155, 255, 0, 0.4);',
      );
      console.log(
        '%c👋 Hi! Thanks for checking out the console =)',
        'color: #9bff00; font-family: monospace; font-size: 14px; font-weight: bold; background: #111111; padding: 6px 12px; border-radius: 6px; border: 1px solid rgba(155, 255, 0, 0.4);',
      );
    }
  }, []);

  return (
    <LanguageProvider initialLang={initialLang}>
      <Header />
      <Hero />
      <main className="container">
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </LanguageProvider>
  );
}
