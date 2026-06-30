import {
  SiFigma,
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiGit,
  SiNodedotjs,
  SiSupabase,
} from 'react-icons/si';
import { getStackItems, getCapabilities } from '@/lib/supabase';
import TechBadge from '@/components/ui/TechBadge';
import type { StackItem, Capability } from '@/types/content';
import styles from './Skills.module.css';

const ICONS = [
  { Icon: SiFigma, label: 'Figma' },
  { Icon: SiReact, label: 'React' },
  { Icon: SiTypescript, label: 'TypeScript' },
  { Icon: SiNextdotjs, label: 'Next.js' },
  { Icon: SiTailwindcss, label: 'Tailwind CSS' },
  { Icon: SiGit, label: 'Git' },
  { Icon: SiNodedotjs, label: 'Node.js' },
  { Icon: SiSupabase, label: 'Supabase' },
];

const STACK_FALLBACK: StackItem[] = [
  { id: 'fallback-1', label: 'React' },
  { id: 'fallback-2', label: 'Next.js' },
  { id: 'fallback-3', label: 'TypeScript' },
  { id: 'fallback-4', label: 'JavaScript' },
  { id: 'fallback-5', label: 'Node.js' },
  { id: 'fallback-6', label: 'Tailwind CSS' },
  { id: 'fallback-7', label: 'PostgreSQL' },
  { id: 'fallback-8', label: 'Git' },
  { id: 'fallback-9', label: 'Figma' },
  { id: 'fallback-10', label: 'Supabase' },
];

const CAPABILITIES_FALLBACK: Capability[] = [
  {
    id: 'fallback-1',
    index_label: '01',
    title: 'Interface Architecture',
    description:
      'Designing component-driven layouts with reusable logic, responsive breakpoints, and accessible interactions that scale across devices and platforms.',
  },
  {
    id: 'fallback-2',
    index_label: '02',
    title: 'State & Data Handling',
    description:
      'Managing application flows seamlessly, validating user inputs defensively, and integrating clean REST API connections.',
  },
  {
    id: 'fallback-3',
    index_label: '03',
    title: 'System & Database Logic',
    description:
      'Designing efficient data models, implementing robust database queries, and ensuring seamless integration between backend services and frontend applications.',
  },
  {
    id: 'fallback-4',
    index_label: '04',
    title: 'Collaborative Workflows',
    description:
      'Maintaining version control discipline through intentional Git branching, clear PR documentation, and readable code structure.',
  },
];

export default async function Skills() {
  const stackData = await getStackItems();
  const capabilitiesData = await getCapabilities();

  const stack = stackData === null ? STACK_FALLBACK : stackData;
  const capabilities = capabilitiesData === null ? CAPABILITIES_FALLBACK : capabilitiesData;

  return (
    <section className="section section-pad" id="skills">
      <div className={styles.sectionHead}>
        <div>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowNum}>04</span> / SKILLS
          </div>
          <h2 className="t-h1" style={{ marginTop: 12 }}>
            Tools I work with daily.
          </h2>
          <p className={`t-body ${styles.sectionDesc}`}>
            A core technical stack selected for building resilient layouts, maintaining clean design system logic, and scaling team repositories.
          </p>
        </div>
      </div>

      <div className={styles.marqueeWrap}>
        <div className={styles.marqueeTrack}>
          {[...ICONS, ...ICONS].map(({ Icon, label }, i) => (
            <div key={`${label}-${i}`} className={styles.logoItem}>
              <Icon className={styles.logoIcon} />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.splitRow}>
        <div className={styles.stackPanel}>
          <div className={styles.stackLabel}>STACK OVERVIEW</div>
          {stack.length === 0 ? (
            <div className={styles.empty}>// no stack items published yet</div>
          ) : (
            <div className={styles.stackGrid}>
              {stack.map((item) => (
                <TechBadge key={item.id} label={item.label} />
              ))}
            </div>
          )}
        </div>

        {capabilities.length === 0 ? (
          <div className={styles.empty}>// no capabilities published yet</div>
        ) : (
          <div className={styles.capabilityGrid}>
            {capabilities.map((cap) => (
              <div key={cap.id} className={styles.capabilityCard}>
                <div className={styles.capabilityIndex}>{cap.index_label}</div>
                <div className={styles.capabilityTitle}>{cap.title}</div>
                <div className={styles.capabilityDesc}>{cap.description}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}