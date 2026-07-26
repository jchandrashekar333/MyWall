import styles from './blocks.module.css'

interface HobbiesBlockProps {
  data: {
    title?: string
    hobbies: string[]
  }
}

export function HobbiesBlock({ data }: HobbiesBlockProps) {
  const hobbies = data.hobbies || []
  if (hobbies.length === 0) return null

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{data.title || 'Hobbies'}</h2>
      <div className={styles.skillsContainer}>
        {hobbies.map((hobby, i) => (
          <span key={i} className={styles.skillChip}>
            {hobby}
          </span>
        ))}
      </div>
    </section>
  )
}
