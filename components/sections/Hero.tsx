import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={`section section-pad`}>
      <div className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} /> CEBU-BASED COMPUTER ENGINEERING
          </div>

          <h1 className="t-display">
            Izzy Kasandra
            <br />
            <span className={styles.accent}>Donque</span>
          </h1>

          <p className={`t-body ${styles.subCopy}`}>
            Creating a clean, responsive web solutions with structured design systems and robust backend integrations.
          </p>

          <div className={styles.ctaRow}>
            <a
              href="#contact"
              className={styles.btnPrimary}
            >
              Let&apos;s Talk
            </a>
            <a
              href="/Resume_Izzy_Kasandra_Donque.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnSecondary}
            >
              View Resume
            </a>
          </div>

          <div className={styles.statsRow}>
            <div className={styles.stat}>
              <div className={styles.statNum}>3</div>
              <div className={styles.statLabel}>PROJECTS BUILT</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>2023</div>
              <div className={styles.statLabel}>STARTED AT CIT-U</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>&lt;24h</div>
              <div className={styles.statLabel}>USUAL RESPONSE TIME</div>
            </div>
          </div>
        </div>

        <div className={styles.heroRight}>
          <div className={styles.orbitFrame}>
            <div className={styles.orbitRing} />
            <div className={`${styles.orbitRing} ${styles.r2}`} />
            <div className={`${styles.orbitRing} ${styles.r3}`} />
            <div className={styles.avatarCard}>
              <span className={styles.glyph}>⟡</span>
            </div>

            <div className={styles.orbitingTag} style={{ animationDelay: '0s' }}>
              <div className={styles.tagCounter} style={{ animationDelay: '0s' }}>
                <div className={styles.hotspot}>
                  <span className={styles.ring} />
                  Adaptability
                </div>
              </div>
            </div>

            <div className={styles.orbitingTag} style={{ animationDelay: '-10s' }}>
              <div className={styles.tagCounter} style={{ animationDelay: '-10s' }}>
                <div className={styles.hotspot}>
                  <span className={styles.ring} />
                  Communication
                </div>
              </div>
            </div>

            <div className={styles.orbitingTag} style={{ animationDelay: '-20s' }}>
              <div className={styles.tagCounter} style={{ animationDelay: '-20s' }}>
                <div className={styles.hotspot}>
                  <span className={styles.ring} />
                  Problem Solving
                </div>
              </div>
            </div>

            <div className={styles.orbitingTag} style={{ animationDelay: '-30s' }}>
              <div className={styles.tagCounter} style={{ animationDelay: '-30s' }}>
                <div className={styles.hotspot}>
                  <span className={styles.ring} />
                  Team Collaboration
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}