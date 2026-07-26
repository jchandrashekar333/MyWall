import styles from './blocks.module.css'

interface VideoBlockProps {
  data: {
    title?: string
    url: string
    caption?: string
  }
}

function getEmbedUrl(url: string): string | null {
  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/)
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`

  return null
}

export function VideoBlock({ data }: VideoBlockProps) {
  if (!data.url) return null

  const embedUrl = getEmbedUrl(data.url)

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{data.title || 'Video'}</h2>
      {embedUrl ? (
        <div className={styles.videoWrapper}>
          <iframe
            src={embedUrl}
            title={data.caption || 'Video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={styles.videoIframe}
          />
        </div>
      ) : (
        <div className={styles.videoWrapper}>
          <video controls className={styles.videoNative} src={data.url}>
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      {data.caption && <p className={styles.videoCaption}>{data.caption}</p>}
    </section>
  )
}
