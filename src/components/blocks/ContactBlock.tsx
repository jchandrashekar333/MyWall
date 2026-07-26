import styles from './blocks.module.css'
import { ContactContent } from '@/types/portfolio'
import { ExternalLink } from 'lucide-react'
import { 
  FaXTwitter, 
  FaGithub, 
  FaLinkedinIn, 
  FaInstagram, 
  FaYoutube, 
  FaFacebookF, 
  FaTiktok, 
  FaTwitch,
  FaSnapchat,
  FaPinterestP,
  FaSpotify,
  FaDiscord,
  FaMedium,
  FaDribbble,
  FaBehance
} from 'react-icons/fa6'

export function ContactBlock({ data }: { data: ContactContent }) {
  const getIconForUrl = (url: string) => {
    try {
      if (!url) return ExternalLink
      const lowerUrl = url.toLowerCase()
      if (lowerUrl.includes('twitter.com') || lowerUrl.includes('x.com')) return FaXTwitter
      if (lowerUrl.includes('github.com')) return FaGithub
      if (lowerUrl.includes('linkedin.com')) return FaLinkedinIn
      if (lowerUrl.includes('instagram.com')) return FaInstagram
      if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be')) return FaYoutube
      if (lowerUrl.includes('facebook.com')) return FaFacebookF
      if (lowerUrl.includes('tiktok.com')) return FaTiktok
      if (lowerUrl.includes('twitch.tv')) return FaTwitch
      if (lowerUrl.includes('snapchat.com')) return FaSnapchat
      if (lowerUrl.includes('pinterest.com')) return FaPinterestP
      if (lowerUrl.includes('spotify.com')) return FaSpotify
      if (lowerUrl.includes('discord.com') || lowerUrl.includes('discord.gg')) return FaDiscord
      if (lowerUrl.includes('medium.com')) return FaMedium
      if (lowerUrl.includes('dribbble.com')) return FaDribbble
      if (lowerUrl.includes('behance.net')) return FaBehance
    } catch (e) {
      // ignore
    }
    return ExternalLink
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle} style={{ textAlign: 'center' }}>{data.title || 'Get in Touch'}</h2>
      <div className={styles.contactGrid}>
        {data.email && (
          <a href={`mailto:${data.email}`} className={styles.contactEmail}>
            Email Me
          </a>
        )}
        {data.socials && data.socials.length > 0 && (
          <div className={styles.socials} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {data.socials.map((social, i) => {
              const Icon = getIconForUrl(social.url)
              return (
                <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" title={social.label} className={styles.socialLink} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.75rem' }}>
                  <Icon size={24} />
                </a>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
