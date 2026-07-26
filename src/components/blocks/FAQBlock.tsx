import styles from './blocks.module.css'

export function FAQBlock({ data }: { data: any }) {
  if (!data.pairs || data.pairs.length === 0) return null
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{data.title || 'FAQ'}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {data.pairs.map((pair: any, i: number) => (
          <div key={i} style={{ backgroundColor: 'var(--card-bg)', padding: '1.5rem', borderRadius: 'var(--border-radius)', border: `1px solid var(--card-border)` }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>{pair.question}</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{pair.answer}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
