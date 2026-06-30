import { getProjects } from '@/lib/supabase';
import Button from '@/components/ui/Button';
import TechBadge from '@/components/ui/TechBadge';
import type { Project } from '@/types/content';
import styles from './Projects.module.css';

const FALLBACK: Project[] = [
  {
    id: 'fallback-1',
    index_label: '01',
    title: 'Orbital — Design System',
    description: 'A 200+ component variant library built in Figma, shipped as a themeable React kit.',
    badges: ['Figma', 'React'],
  },
  {
    id: 'fallback-2',
    index_label: '02',
    title: 'Lumen — Mobile Banking',
    description: 'Cross-platform fintech app built with React Native and biometric-secured flows.',
    badges: ['React Native', 'TypeScript'],
  },
  {
    id: 'fallback-3',
    index_label: '03',
    title: 'Aperture — Analytics Suite',
    description: 'Editorial dark-mode dashboard with live data viz and component-driven layout.',
    badges: ['Auto Layout', 'D3.js'],
  },
];

export default async function Projects() {
  const data = await getProjects();

  // null = fetch failed / not configured → use fallback.
  // [] = table genuinely empty → show empty state, not fallback.
  const projects = data === null ? FALLBACK : data;

  return (
    <section className="section section-pad" id="projects">
      <div className={styles.sectionHead}>
        <div>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowNum}>03</span> / PROJECTS
          </div>
          <h2 className="t-h1" style={{ marginTop: 12 }}>
            Projects I've worked on.
          </h2>
          <p className={`t-body ${styles.sectionDesc}`}>
            Practical applications and component libraries focusing on clean layout logic, structured interfaces, and smooth user flows.
          </p>
        </div>
        <Button variant="secondary">View Full Archive</Button>
      </div>

      {projects.length === 0 ? (
        <div className={styles.empty}>// no projects published yet</div>
      ) : (
        <div className={styles.grid}>
          {projects.map((project, i) => (
            <div key={project.id} className={styles.card}>
              <div className={styles.thumb}>
                <span className={styles.index}>
                  // {project.index_label ?? String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className={styles.body}>
                <div className={styles.title}>{project.title}</div>
                <div className={styles.desc}>{project.description}</div>
                <div className={styles.badgeRow}>
                  {project.badges.map((badge) => (
                    <TechBadge key={badge} label={badge} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
