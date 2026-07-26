import { ExternalLink } from 'lucide-react'
import styles from './blocks.module.css'

interface ProductsBlockProps {
  data: {
    title?: string
    products: {
      title: string
      description?: string
      url: string
      image: string
  }[]
  }
}

export function ProductsBlock({ data }: ProductsBlockProps) {
  const products = data.products || []
  if (products.length === 0) return null

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{data.title || 'Products'}</h2>
      <div className={styles.productsGrid}>
        {products.map((product, i) => (
          <a
            key={i}
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.productCard}
          >
            <div className={styles.productImageWrapper}>
              {product.image ? (
                <img src={product.image} alt={product.title} className={styles.productImage} />
              ) : (
                <div className={styles.productImagePlaceholder} />
              )}
            </div>
            <div className={styles.productContent}>
              <h3 className={styles.productTitle}>
                {product.title}
                <ExternalLink size={14} className={styles.productIcon} />
              </h3>
              {product.description && (
                <p className={styles.productDesc}>{product.description}</p>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
