export type Theme = 'professional' | 'social' | 'fun' | 'dark'

export interface FunSettings {
  backgroundColor?: string
  accentColor?: string
  textColor?: string
  primaryColor?: string
  secondaryColor?: string
  iconColor?: string
  backgroundEffectColor?: string
  description?: string
  location?: string
  discordPresenceEnabled?: boolean
  profileOpacity?: number
  profileBlur?: number
  monochromeIcons?: boolean
  animatedTitle?: boolean
  swapBoxColors?: boolean
  volumeControl?: boolean
  useDiscordAvatar?: boolean
  discordAvatarDecoration?: boolean
  backgroundUrl?: string
  backgroundType?: 'image' | 'video'
  backgroundOpacity?: number
  audioUrl?: string
  avatarUrl?: string
  cursorUrl?: string
}

export type BlockType = 
  | 'hero' | 'links' | 'about' | 'skills' | 'work' | 'contact'
  | 'timeline' | 'education' | 'achievements' | 'hobbies'
  | 'badge' | 'video' | 'gallery' | 'testimonials' | 'products'
  | 'availability' | 'pricing' | 'faq' | 'document'
  | 'music' | 'books' | 'travel' | 'portfolio' | 'movies'

export const BLOCK_CATEGORIES = [
  { id: 'core', label: 'Core Profile', types: ['hero', 'about', 'links', 'contact', 'availability'] },
  { id: 'professional', label: 'Professional', types: ['timeline', 'education', 'work', 'portfolio', 'skills', 'achievements', 'document'] },
  { id: 'media', label: 'Media & Fun', types: ['gallery', 'music', 'books', 'travel', 'movies', 'video', 'testimonials', 'hobbies', 'products', 'badge', 'faq', 'pricing'] }
]

export interface BlockDesign {
  backgroundColor?: string
  textAlign?: 'left' | 'center' | 'right'
}

export interface Block {
  id: string
  page_id: string
  type: BlockType
  enabled: boolean
  content: {
    design?: BlockDesign
    [key: string]: any
  }
  sort_order: number
}

// Content Interfaces
export interface HeroContent {
  title?: string
  name: string
  nameAnimation?: 'none' | 'gradient' | 'typing' | 'pulse' | 'glitch' | 'neon' | 'shine' | 'bounce' | 'shake' | 'reverseTyping' | 'aiTyping' | 'fadeIn' | 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'zoomIn' | 'zoomOut' | 'scaleUp' | 'scaleDown' | 'bounceIn' | 'elasticBounce' | 'popIn' | 'slideIn' | 'flipIn' | 'rotateIn' | 'rotate3d' | 'stretchReveal' | 'hologram' | 'cinematic' | 'jello' | 'heartbeat' | 'floating'
  role: string
  tagline: string
  location: string
  photoUrl?: string
  bannerUrl?: string
  bannerType?: 'image' | 'video'
  contactEmail?: string
}

export interface AboutContent {
  title?: string
  text: string
}

export interface SkillsContent {
  title?: string
  layout?: string
  tags: string[]
}

export interface TestimonialsContent {
  title?: string
  layout?: string
  entries: {
    name: string
    role?: string
    text: string
  }[]
}

export interface HobbiesContent {
  title?: string
  hobbies: string[]
}

export interface ProductsContent {
  title?: string
  products: {
    title: string
    description?: string
    url: string
    image: string
  }[]
}

export interface WorkProject {
  title: string
  impact: string
  link?: string
  thumbnailUrl?: string
}

export interface WorkContent {
  title?: string
  projects: WorkProject[]
}

export interface ContactContent {
  title?: string
  email: string
  socials: { label: string; url: string }[]
}

export interface LinksContent {
  title?: string
  layout?: string
  linkStyle?: string
  linkAnimation?: string
  links: { label: string; url: string; description?: string; badge?: string }[]
}

export interface ExperienceEntry {
  title: string
  company: string
  startDate: string
  endDate: string
  description: string
}

export interface ExperienceContent {
  title?: string
  label: string
  entries: ExperienceEntry[]
}

export interface EducationEntry {
  degree: string
  school: string
  year: string
  description?: string
}

export interface EducationContent {
  title?: string
  entries: EducationEntry[]
}

export interface AchievementEntry {
  title: string
  issuer?: string
  year?: string
  description?: string
}

export interface AchievementsContent {
  title?: string
  entries: AchievementEntry[]
}

export interface DocumentFile {
  label: string
  url: string
}

export interface DocumentContent {
  title?: string
  files: DocumentFile[]
}

export interface MusicContent {
  title?: string
  layout?: string
  song: string
  artist: string
  spotifyUrl?: string
}

export interface BooksContent {
  title?: string
  currentBook: string
  author: string
  readingGoal?: string
}

export interface TravelContent {
  title?: string
  places: string[]
  photos: string[]
}

export interface PortfolioPiece {
  title: string
  description: string
  imageUrl: string
  link: string
}

export interface PortfolioContent {
  title?: string
  pieces: PortfolioPiece[]
}

export interface MoviesContent {
  title?: string
  letterboxdUrl?: string
  favoriteFilms: { title: string; imageUrl: string; year?: string }[]
}

export interface PageData {
  id: string
  user_id: string
  published: boolean
  handle: string
  theme: Theme
  published_at: string | null
  fun_settings?: FunSettings
}

export type WidgetType = 
  | 'bio' | 'gallery' | 'link' | 'project' 
  | 'pinned_favorite' | 'contact'

export interface Widget {
  id: string
  page_id: string
  type: WidgetType
  enabled: boolean
  content: any
  grid_x: number
  grid_y: number
  grid_w: number
  grid_h: number
}

export interface BioWidgetContent {
  title?: string
  name: string
  bio: string
  avatarUrl?: string
}

export interface GalleryWidgetContent {
  title?: string
  images: { url: string; caption?: string }[]
}

export interface LinkWidgetContent {
  title?: string
  label: string
  url: string
  icon?: string // e.g. 'spotify', 'github', 'instagram'
}

export interface ProjectWidgetContent {
  title: string
  impact: string
  link?: string
  thumbnailUrl?: string
}

export interface PinnedFavoriteWidgetContent {
  label: string // e.g. "Favorite Movie"
  value: string // e.g. "Interstellar"
  rating?: number // 1-5
}

export interface ContactWidgetContent {
  email: string
  socials: { label: string; url: string }[]
}
