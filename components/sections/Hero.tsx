import Button from '@/components/ui/Button';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={`section section-pad`}>
      <div className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} /> CEBU-BASED COMPUTER ENGINEERING - 2026
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
            <Button variant="primary">Explore Portfolio</Button>
            <Button variant="secondary">View Resume</Button>
          </div>

          <div className={styles.statsRow}>
            <div className={styles.stat}>
              <div className={styles.statNum}>8.5+</div>
              <div className={styles.statLabel}>YEARS IN PRACTICE</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>42</div>
              <div className={styles.statLabel}>SHIPPED PRODUCTS</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>120+</div>
              <div className={styles.statLabel}>VARIANT COMPONENTS</div>
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