import styles from './blocks.module.css'
import { WorkContent } from '@/types/portfolio'
import { ExternalLink } from 'lucide-react'

export function WorkBlock({ data }: { data: WorkContent }) {
  if (!data.projects || data.projects.length === 0) return null
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{data.title || 'Selected Work'}</h2>
      <div className={styles.workGrid}>
        {data.projects.map((project, i) => (
          <div key={i} className={styles.workCard}>
            <h3 className={styles.workTitle}>{project.title}</h3>
            <p className={styles.workImpact}>{project.impact}</p>
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.workLink}>
                View Project <ExternalLink size={14} />
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
