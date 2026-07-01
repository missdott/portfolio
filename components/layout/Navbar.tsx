'use client';

import { useEffect, useState } from 'react';
import styles from './Navbar.module.css';

const NAV_ITEMS = [
  { key: 'about', label: 'About' },
  { key: 'projects', label: 'Projects' },
  { key: 'skills', label: 'Skills' },
  { key: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.key)).filter(
      (el): el is HTMLElement => el !== null
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveKey(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  function handleClick(key: string) {
    const el = document.getElementById(key);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <div className={styles.navStage}>
      <nav className={styles.navbar}>
        <div className={styles.logo} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className={styles.logoMark}>✧</span>
          <span className={styles.logoMain}>izzy</span>
          <span className={styles.logoSuffix}>.dev</span>
        </div>

        <div className={styles.navLinks}>
          {NAV_ITEMS.map((item) => (
            <div
              key={item.key}
              className={`${styles.navItem} ${activeKey === item.key ? styles.active : ''}`}
              onClick={() => handleClick(item.key)}
            >
              {item.label}
              <span className={styles.activeDot} />
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
}