import styles from './blocks.module.css'

interface EducationBlockProps {
  data: {
    title?: string
    entries: {
      degree: string
      school: string
      year: string
      description?: string
  }[]
  }
}

export function EducationBlock({ data }: EducationBlockProps) {
  const entries = data.entries || []
  if (entries.length === 0) return null

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{data.title || 'Education'}</h2>
      <div className={styles.timelineList}>
        {entries.map((entry, i) => (
          <div key={i} className={styles.timelineItem}>
            <div className={styles.timelineDot} />
            <div className={styles.timelineContent}>
              <h3 className={styles.timelineTitle}>{entry.degree}</h3>
              <div className={styles.timelineMeta}>
                <span className={styles.timelineCompany}>{entry.school}</span>
                {entry.year && (
                  <span className={styles.timelineDate}>{entry.year}</span>
                )}
              </div>
              {entry.description && (
                <p className={styles.timelineDesc}>{entry.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
