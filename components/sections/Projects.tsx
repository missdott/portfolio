import { getProjects } from '@/lib/supabase';
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
    tags: ['Design Systems', 'Frontend'],
    is_featured: true,
    role: 'Frontend Engineer',
    year: '2026',
    why_it_mattered:
      'Component variant libraries in Figma rarely translate cleanly to code — most handoffs lose fidelity somewhere between design and implementation.',
    what_it_does: [
      'Token-based theming across light and dark variants',
      'Auto layout structures mapped 1:1 to flexbox/grid',
      'Full keyboard and screen-reader accessibility',
    ],
    what_i_learned:
      'The biggest wins came from naming conventions that stayed consistent between Figma and code — once that matched, handoff friction nearly disappeared.',
    project_url: null,
  },
  {
    id: 'fallback-2',
    index_label: '02',
    title: 'Lumen — Mobile Banking',
    description: 'Cross-platform fintech app built with React Native and biometric-secured flows.',
    badges: ['React Native', 'TypeScript'],
    tags: ['Fintech', 'Mobile'],
    is_featured: false,
    role: 'Mobile Developer',
    year: '2025',
    why_it_mattered:
      'Users needed a banking flow that felt trustworthy and fast on mobile, without sacrificing the security checks a financial app requires.',
    what_it_does: [
      'Biometric login and transaction confirmation',
      'Real-time balance and transfer flows',
      'Offline-friendly caching for recent activity',
    ],
    what_i_learned:
      'Security and speed are usually framed as a tradeoff — most of the friction actually came from unclear error states, not the auth itself.',
    project_url: null,
  },
  {
    id: 'fallback-3',
    index_label: '03',
    title: 'Aperture — Analytics Suite',
    description: 'Editorial dark-mode dashboard with live data viz and component-driven layout.',
    badges: ['Auto Layout', 'D3.js'],
    tags: ['Dashboard', 'Data Viz'],
    is_featured: false,
    role: 'Frontend Engineer',
    year: '2025',
    why_it_mattered:
      'Raw analytics data is hard to scan quickly — the goal was a dashboard that surfaced trends at a glance instead of burying them in tables.',
    what_it_does: [
      'Live-updating charts built on D3.js',
      'Component-driven layout for fast iteration',
      'Editorial dark theme tuned for long reading sessions',
    ],
    what_i_learned:
      'Performance mattered more than visual polish here — trimming re-renders on live data updates made the biggest perceived difference.',
    project_url: null,
  },
];

export default async function Projects() {
  const data = await getProjects();
  const projects = data === null ? FALLBACK : data;

  return (
    <section className="section section-pad" id="projects">
      <div className={styles.sectionHead}>
        <div>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowNum}>03</span> / PROJECTS
          </div>
          <h2 className="t-h1" style={{ marginTop: 12 }}>
            Selected case studies.
          </h2>
          <p className={`t-body ${styles.sectionDesc}`}>
             A closer look at a few projects I've built.
          </p>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className={styles.empty}>// no projects published yet</div>
      ) : (
        <div className={styles.grid}>
          {projects.map((project, i) => (
            <div key={project.id} className={styles.card}>
              <div className={styles.cardHead}>
                <span className={styles.index}>
                  {project.index_label ?? String(i + 1).padStart(2, '0')}
                </span>
                <div className={styles.tagRow}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                  {project.is_featured && <span className={styles.featuredBadge}>FEATURED</span>}
                </div>
              </div>

              <h3 className={styles.title}>{project.title}</h3>

              <div className={styles.metaRow}>
                {project.role && <span className={styles.role}>{project.role}</span>}
                {project.year && <span className={styles.year}>{project.year}</span>}
              </div>

              <p className={styles.intro}>{project.description}</p>

              {project.why_it_mattered && (
                <div className={styles.block}>
                  <div className={styles.blockLabel}>WHY IT MATTERED</div>
                  <p className={styles.blockText}>{project.why_it_mattered}</p>
                </div>
              )}

              {project.what_it_does.length > 0 && (
                <div className={styles.block}>
                  <div className={styles.blockLabel}>WHAT IT DOES</div>
                  <ul className={styles.checklist}>
                    {project.what_it_does.map((item) => (
                      <li key={item} className={styles.checklistItem}>
                        <span className={styles.checkIcon}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.what_i_learned && (
                <div className={styles.block}>
                  <div className={styles.blockLabel}>WHAT I LEARNED</div>
                  <p className={styles.blockText}>{project.what_i_learned}</p>
                </div>
              )}

              <div className={styles.badgeRow}>
                {project.badges.map((badge) => (
                  <TechBadge key={badge} label={badge} />
                ))}
              </div>

              {project.project_url && (
                <a
                  href={project.project_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.visitLink}
                >
                  Visit project →
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}