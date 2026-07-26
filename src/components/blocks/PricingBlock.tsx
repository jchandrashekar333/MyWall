import styles from './blocks.module.css'

export function PricingBlock({ data }: { data: any }) {
  if (!data.text) return null
  return (
    <section className={styles.section} style={{ textAlign: 'center' }}>
      <div style={{ display: 'inline-block', backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', padding: '1rem 2rem', borderRadius: 'var(--border-radius)' }}>
        <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Pricing</h3>
        <p style={{ fontSize: '1.5rem', fontWeight: 600 }}>{data.text}</p>
      </div>
    </section>
  )
}
