'use client'

import { Block, Theme } from '@/types/portfolio'
import { HeroBlock } from './blocks/HeroBlock'
import { AboutBlock } from './blocks/AboutBlock'
import { SkillsBlock } from './blocks/SkillsBlock'
import { WorkBlock } from './blocks/WorkBlock'
import { ContactBlock } from './blocks/ContactBlock'
import { PricingBlock } from './blocks/PricingBlock'
import { AvailabilityBlock } from './blocks/AvailabilityBlock'
import { FAQBlock } from './blocks/FAQBlock'
import { LinksBlock } from './blocks/LinksBlock'
import { ExperienceBlock } from './blocks/ExperienceBlock'
import { EducationBlock } from './blocks/EducationBlock'
import { AchievementsBlock } from './blocks/AchievementsBlock'
import { HobbiesBlock } from './blocks/HobbiesBlock'
import { ProductsBlock } from './blocks/ProductsBlock'
import { DocumentBlock } from './blocks/DocumentBlock'
import { VideoBlock } from './blocks/VideoBlock'
import { GalleryBlock } from './blocks/GalleryBlock'
import { TestimonialsBlock } from './blocks/TestimonialsBlock'
import { MusicBlock } from './blocks/MusicBlock'
import { BooksBlock } from './blocks/BooksBlock'
import { TravelBlock } from './blocks/TravelBlock'
import { PortfolioBlock } from './blocks/PortfolioBlock'
import { MoviesBlock } from './blocks/MoviesBlock'
import { MyWallBadge } from './MyWallBadge'

export function PortfolioRenderer({ blocks, theme, funSettings }: { blocks: Block[], theme: Theme, funSettings?: any }) {


  // Sort blocks by sort_order for Professional layout
  const sortedBlocks = [...blocks].sort((a, b) => a.sort_order - b.sort_order)

  const renderBlock = (block: Block) => {
    switch (block.type) {
      case 'hero':
        return <HeroBlock key={block.id} data={block.content as any} />
      case 'links':
        return <LinksBlock key={block.id} data={block.content as any} />
      case 'about':
        return <AboutBlock key={block.id} data={block.content as any} />
      case 'timeline':
        return <ExperienceBlock key={block.id} data={block.content as any} />
      case 'education':
        return <EducationBlock key={block.id} data={block.content as any} />
      case 'skills':
        return <SkillsBlock key={block.id} data={block.content as any} />
      case 'hobbies':
        return <HobbiesBlock key={block.id} data={block.content as any} />
      case 'work':
        return <WorkBlock key={block.id} data={block.content as any} />
      case 'products':
        return <ProductsBlock key={block.id} data={block.content as any} />
      case 'achievements':
        return <AchievementsBlock key={block.id} data={block.content as any} />
      case 'document':
        return <DocumentBlock key={block.id} data={block.content as any} />
      case 'contact':
        return <ContactBlock key={block.id} data={block.content as any} />
      case 'pricing':
        return <PricingBlock key={block.id} data={block.content as any} />
      case 'availability':
        return <AvailabilityBlock key={block.id} data={block.content as any} />
      case 'faq':
        return <FAQBlock key={block.id} data={block.content as any} />
      case 'video':
        return <VideoBlock key={block.id} data={block.content as any} />
      case 'gallery':
        return <GalleryBlock key={block.id} data={block.content as any} />
      case 'testimonials':
        return <TestimonialsBlock key={block.id} data={block.content as any} />
      case 'music':
        return <MusicBlock key={block.id} data={block.content as any} />
      case 'books':
        return <BooksBlock key={block.id} data={block.content as any} />
      case 'travel':
        return <TravelBlock key={block.id} data={block.content as any} />
      case 'portfolio':
        return <PortfolioBlock key={block.id} data={block.content as any} />
      case 'movies':
        return <MoviesBlock key={block.id} data={block.content as any} />
      default:
        return null
    }
  }

  const backgroundUrl = funSettings?.backgroundUrl;
  const backgroundType = funSettings?.backgroundType;
  const backgroundOpacity = funSettings?.backgroundOpacity !== undefined ? funSettings.backgroundOpacity / 100 : 1;

  return (
    <div data-theme={theme} className="portfolio-renderer" style={{ minHeight: '100vh', paddingBottom: '4rem', position: 'relative', zIndex: 0 }}>
      {backgroundUrl && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none' }}>
          {backgroundType === 'video' ? (
            <video src={backgroundUrl} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: backgroundOpacity }} />
          ) : (
            <img src={backgroundUrl} alt="Background" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: backgroundOpacity }} />
          )}
        </div>
      )}
      
      {/* Content wrapper with relative positioning to sit on top of background */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {sortedBlocks.map((block) => {
          if (!block.enabled && block.type !== 'hero') return null
          const design = block.content?.design || {}
          return (
            <div 
              key={block.id} 
              className="portfolio-block-wrapper"
              style={{
                backgroundColor: design.backgroundColor,
                textAlign: design.textAlign,
              }}
            >
              {renderBlock(block)}
            </div>
          )
        })}
      </div>
      <MyWallBadge />
    </div>
  )
}
