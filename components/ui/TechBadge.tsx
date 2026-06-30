import styles from './TechBadge.module.css';

interface TechBadgeProps {
  label: string;
}

export default function TechBadge({ label }: TechBadgeProps) {
  return (
    <div className={styles.badge}>
      <span className={styles.dot} />
      {label}
    </div>
  );
}
