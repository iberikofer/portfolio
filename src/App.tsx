import React, { useState } from 'react';
import Header from './sections/Header';
import Hero from './sections/Hero';
import Projects from './sections/Projects';
import Footer from './sections/Footer';
import ScrollToTop from './components/ScrollToTop';
import Contact from './sections/Contact';
import About from './sections/About';
import { Preloader } from './components/Preloader';

function App() {
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 769) {
      return false;
    }
    return true;
  });

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <Header />
      <Hero />
      <main className="container">
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default App;
