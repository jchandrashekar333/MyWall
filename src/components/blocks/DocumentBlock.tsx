import { FileDown } from 'lucide-react'
import styles from './blocks.module.css'

interface DocumentBlockProps {
  data: {
    title?: string
    files?: { label: string; url: string
  }[]
    // Legacy single-file format
    url?: string
    label?: string
  }
}

export function DocumentBlock({ data }: DocumentBlockProps) {
  // Support both new multi-file format and legacy single-file format
  let files = data.files || []
  if (files.length === 0 && data.url) {
    files = [{ label: data.label || 'View Document', url: data.url }]
  }
  if (files.length === 0) return null

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{data.title || 'Files'}</h2>
      <div className={styles.filesGrid}>
        {files.map((file, i) => (
          <a
            key={i}
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.fileCard}
          >
            <FileDown size={20} />
            <span className={styles.fileLabel}>{file.label}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
