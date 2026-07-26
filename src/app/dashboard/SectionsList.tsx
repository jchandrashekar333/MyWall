'use client'

import { useState, useEffect } from 'react'
import { Block } from '@/types/portfolio'
import styles from './dashboard.module.css'
import { GripVertical, Eye, EyeOff, LayoutTemplate } from 'lucide-react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'

interface SectionsListProps {
  blocks: Block[]
  selectedBlockId: string | null
  setSelectedBlockId: (id: string) => void
  onToggleBlock: (blockId: string, enabled: boolean) => void
  onDragEnd: (result: any) => void
}

const getDefaultTitle = (type: string) => {
  switch (type) {
    case 'hero': return 'Hero / Profile'
    case 'about': return 'About Me'
    case 'links': return 'Links'
    case 'timeline': return 'Experience'
    case 'education': return 'Education'
    case 'work': return 'Selected Work'
    case 'skills': return 'Skills'
    case 'hobbies': return 'Hobbies'
    case 'achievements': return 'Achievements'
    case 'products': return 'Products'
    case 'document': return 'Files'
    case 'contact': return 'Contact'
    case 'video': return 'Video'
    case 'gallery': return 'Gallery'
    case 'testimonials': return 'Testimonials'
    case 'faq': return 'FAQ'
    case 'music': return 'Currently Listening'
    case 'books': return 'Currently Reading'
    case 'travel': return 'Travel & Adventures'
    case 'portfolio': return 'Portfolio'
    case 'movies': return 'Favorite Films'
    default: return 'Section'
  }
}

const CATEGORIES = [
  {
    id: 'professional',
    label: 'Professional / Founder',
    types: ['hero', 'about', 'timeline', 'education', 'skills', 'work', 'portfolio', 'achievements']
  },
  {
    id: 'business',
    label: 'Business & Contact',
    types: ['products', 'pricing', 'testimonials', 'faq', 'contact', 'availability']
  },
  {
    id: 'creator',
    label: 'Creator & Media',
    types: ['gallery', 'video', 'music', 'books', 'travel', 'hobbies', 'links', 'document', 'badge']
  }
]

export default function SectionsList({ blocks, selectedBlockId, setSelectedBlockId, onToggleBlock, onDragEnd }: SectionsListProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    professional: true,
    business: true,
    creator: true
  })

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0)
    return () => clearTimeout(timer)
  }, [])

  if (!isMounted) return null

  const toggleCategory = (id: string) => {
    setOpenCategories(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className={styles.sectionsPane}>
      <div className={styles.sectionsHeader}>
        <h2 className={styles.sectionsTitle}>Sections</h2>
      </div>
      
      <div style={{ padding: '1rem', fontSize: '0.8rem', color: '#64748b' }}>
        Drag & drop to reorder sections within their category
      </div>

      <div style={{ padding: '0 1rem 1rem 1rem' }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {CATEGORIES.map(category => {
            const categoryBlocks = blocks.filter(b => category.types.includes(b.type))
            
            return (
              <div key={category.id} style={{ marginBottom: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                <button
                  onClick={() => toggleCategory(category.id)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#f8fafc',
                    border: 'none',
                    borderBottom: openCategories[category.id] ? '1px solid #e2e8f0' : 'none',
                    cursor: 'pointer',
                    fontWeight: 600,
                    color: '#334155',
                    textAlign: 'left'
                  }}
                >
                  {category.label}
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                    {openCategories[category.id] ? '▼' : '▶'}
                  </span>
                </button>

                {openCategories[category.id] && (
                  <Droppable droppableId={category.id}>
                    {(provided) => (
                      <div 
                        {...provided.droppableProps} 
                        ref={provided.innerRef}
                        style={{ padding: '0.75rem', backgroundColor: '#ffffff' }}
                      >
                        {categoryBlocks.map((block, index) => (
                          <Draggable key={block.id} draggableId={block.id} index={index} isDragDisabled={block.type === 'hero'}>
                            {(provided, snapshot) => (
                              <div 
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                style={{
                                  ...provided.draggableProps.style,
                                  marginBottom: '0.5rem',
                                  boxShadow: snapshot.isDragging ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none',
                                  zIndex: snapshot.isDragging ? 50 : 1
                                }}
                              >
                                <div 
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '0.75rem',
                                    backgroundColor: selectedBlockId === block.id ? '#f8fafc' : 'white',
                                    border: selectedBlockId === block.id ? '1px solid #8b5cf6' : '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                  }}
                                  onClick={() => setSelectedBlockId(block.id)}
                                >
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div 
                                      {...(block.type !== 'hero' ? provided.dragHandleProps : {})}
                                      style={{ color: '#94a3b8', cursor: block.type === 'hero' ? 'default' : 'grab' }}
                                      onClick={(e) => block.type !== 'hero' && e.stopPropagation()}
                                    >
                                      <GripVertical size={16} />
                                    </div>
                                    <LayoutTemplate size={16} color="#8b5cf6" />
                                    <span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#1e293b' }}>
                                      {getDefaultTitle(block.type)}
                                    </span>
                                  </div>
                                  
                                  <div 
                                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <button
                                      onClick={() => onToggleBlock(block.id, !block.enabled)}
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.25rem',
                                        background: 'none',
                                        border: 'none',
                                        color: block.enabled ? '#64748b' : '#94a3b8',
                                        cursor: 'pointer',
                                        fontSize: '0.75rem'
                                      }}
                                    >
                                      {block.enabled ? <Eye size={14} /> : <EyeOff size={14} />}
                                      {block.enabled ? 'Visible' : 'Hidden'}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                )}
              </div>
            )
          })}
        </DragDropContext>
      </div>
    </div>
  )
}
