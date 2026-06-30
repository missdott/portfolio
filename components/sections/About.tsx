import { getAboutContent } from '@/lib/supabase';
import styles from './About.module.css';

// Static fallback — shown if Supabase isn't configured, the row is missing,
// or the fetch fails for any reason. The page never looks broken.
const FALLBACK = {
  heading: 'I build software that prioritizes simplicity, clear purpose, and the small details that make user experiences effortless.',
  body: 'I am seeking a role where I can immediately contribute clean code, accelerate my technical growth, and develop the practical engineering judgment that only comes from shipping real-world software within a team.',
}

export default async function About() {
  const data = await getAboutContent();
  const content = data ?? FALLBACK;

  return (
    <section className="section section-pad" id="about">
      <div className={styles.aboutSection}>
        <div className={styles.codeWindow}>
          <div className={styles.fileTab}>portfolio/identity.ts</div>
          <div className={styles.dots}>
            <div className={styles.dot} />
            <div className={styles.dot} />
            <div className={styles.dot} />
          </div>
          <div className={styles.line}>
            <span className={styles.n}>01</span>
            <span className={styles.pale}>class</span>&nbsp;Developer {'{'}
          </div>
          <div className={styles.line}>
            <span className={styles.n}>02</span>&nbsp;&nbsp;<span className={styles.pale}>final</span> String focus = <span className={styles.codeAccent}>&quot;systems&quot;</span>;
          </div>
          <div className={styles.line}>
            <span className={styles.n}>03</span>&nbsp;&nbsp;<span className={styles.pale}>final</span> List&lt;String&gt; tools = [<span className={styles.codeAccent}>&quot;Next.js&quot;</span>, <span className={styles.codeAccent}>&quot;React&quot;</span>];
          </div>
          <div className={styles.line}>
            <span className={styles.n}>04</span>&nbsp;&nbsp;<span className={styles.pale}>final</span> <span className={styles.pale}>bool</span> ships = <span className={styles.pale}>true</span>;
          </div>
          <div className={styles.line}>
            <span className={styles.n}>05</span>
            {'}'}
          </div>
        </div>

        <div className={styles.aboutCopy}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowNum}>02</span> / ABOUT
          </div>

          <h2 className="t-h1" dangerouslySetInnerHTML={{ __html: content.heading }} />

          <p className={`t-body ${styles.bodyCopy}`}>{content.body}</p>

        </div>
      </div>
    </section>
  );
}