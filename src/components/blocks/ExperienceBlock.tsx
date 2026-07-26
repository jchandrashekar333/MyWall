import styles from './blocks.module.css'

interface ExperienceBlockProps {
  data: {
    title?: string
    label?: string
    entries: {
      title: string
      company: string
      startDate: string
      endDate: string
      description: string
  }[]
  }
}

export function ExperienceBlock({ data }: ExperienceBlockProps) {
  const entries = data.entries || []
  if (entries.length === 0) return null

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{data.title || data.label || 'Experience'}</h2>
      <div className={styles.timelineList}>
        {entries.map((entry, i) => (
          <div key={i} className={styles.timelineItem}>
            <div className={styles.timelineDot} />
            <div className={styles.timelineContent}>
              <h3 className={styles.timelineTitle}>{entry.title}</h3>
              <div className={styles.timelineMeta}>
                <span className={styles.timelineCompany}>{entry.company}</span>
                {(entry.startDate || entry.endDate) && (
                  <span className={styles.timelineDate}>
                    {entry.startDate}{entry.startDate && entry.endDate ? ' – ' : ''}{entry.endDate}
                  </span>
                )}
              </div>
              {entry.description && (
                <div 
                  className={styles.timelineDesc} 
                  dangerouslySetInnerHTML={{ __html: entry.description }} 
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
