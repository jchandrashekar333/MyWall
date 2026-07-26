import styles from './blocks.module.css'
import { AboutContent } from '@/types/portfolio'

export function AboutBlock({ data }: { data: AboutContent }) {
  if (!data.text) return null
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{data.title || 'About'}</h2>
      <div 
        className={styles.aboutText} 
        dangerouslySetInnerHTML={{ __html: data.text }} 
      />
    </section>
  )
}
