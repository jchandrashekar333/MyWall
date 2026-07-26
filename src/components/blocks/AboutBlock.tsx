import styles from './blocks.module.css'
import { AboutContent } from '@/types/portfolio'

export function AboutBlock({ data }: { data: AboutContent }) {
  if (!data.text) return null
  
  const fontSizeClass = data.fontSize === 'small' ? styles.fontSizeSmall : data.fontSize === 'large' ? styles.fontSizeLarge : ''

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{data.title || 'About'}</h2>
      <div 
        className={`${styles.aboutText} ${fontSizeClass}`} 
        dangerouslySetInnerHTML={{ __html: data.text }} 
      />
    </section>
  )
}
