import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Contact from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />

      <footer className="section" style={{ padding: '48px 32px 64px', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-divider)', marginTop: 40 }}>
        <div className="t-mono">© 2026 — IZZY KASANDRA DONQUE</div>
        <div className="t-mono">BUILT WITH REACT • SUPABASE</div>
      </footer>
    </>
  );
}
