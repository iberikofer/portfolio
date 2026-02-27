import { useState } from "react";
import Header from "./sections/Header";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Footer from "./sections/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Contact from "./sections/Contact";
import About from "./sections/About";

function App() {
  return (
    <>
      <Header />
      <main className="container">
        <Hero />
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
