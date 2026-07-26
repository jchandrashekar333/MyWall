import { Block } from '@/types/portfolio'
import styles from './editor.module.css'
import { ImageUpload } from '@/components/ImageUpload'
import { MediaUpload } from '@/components/MediaUpload'
import { Plus, Trash2, GripVertical, Upload, X, ChevronDown, ChevronUp, ArrowUp, ArrowDown, Layers, Palette } from 'lucide-react'
import { useState } from 'react'
import RichTextEditor from '@/components/RichTextEditor'

import { BlockDesign } from '@/types/portfolio'

interface BlockEditorProps {
  block: Block | null
  onContentChange: (blockId: string, content: any) => void
  theme: string
}

function DesignSettingsForm({ block, onContentChange }: { block: Block, onContentChange: (blockId: string, content: any) => void }) {
  const design: BlockDesign = block.content.design || {}

  const handleDesignChange = (updates: Partial<BlockDesign>) => {
    onContentChange(block.id, {
      ...block.content,
      design: {
        ...design,
        ...updates
      }
    })
  }

  return (
    <div className={styles.blockEditor}>
      <div className={styles.inputGroup}>
        <label>Background Color</label>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <input
            type="color"
            value={design.backgroundColor || '#ffffff'}
            onChange={(e) => handleDesignChange({ backgroundColor: e.target.value })}
            style={{ width: '40px', height: '40px', padding: '0', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          />
          <input
            type="text"
            value={design.backgroundColor || ''}
            onChange={(e) => handleDesignChange({ backgroundColor: e.target.value })}
            placeholder="#ffffff"
            style={{ flex: 1 }}
          />
          <button 
            onClick={() => handleDesignChange({ backgroundColor: undefined })}
            style={{ padding: '0.5rem 1rem', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '4px', cursor: 'pointer' }}
          >
            Clear
          </button>
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label>Text Alignment</label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {(['left', 'center', 'right'] as const).map(align => (
            <button
              key={align}
              onClick={() => handleDesignChange({ textAlign: align })}
              style={{
                flex: 1,
                padding: '0.5rem',
                textTransform: 'capitalize',
                background: design.textAlign === align ? '#8b5cf6' : '#f8fafc',
                color: design.textAlign === align ? 'white' : '#475569',
                border: design.textAlign === align ? '1px solid #8b5cf6' : '1px solid #e2e8f0',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {align}
            </button>
          ))}
          <button
            onClick={() => handleDesignChange({ textAlign: undefined })}
            style={{
              flex: 1,
              padding: '0.5rem',
              background: !design.textAlign ? '#e2e8f0' : '#f8fafc',
              color: '#475569',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Auto
          </button>
        </div>
      </div>

      {block.type === 'hero' && (
        <div className={styles.inputGroup} style={{ marginTop: '1.5rem' }}>
          <label>Name Animation (Fun Theme)</label>
          <select 
            value={block.content.nameAnimation || 'none'}
            onChange={e => onContentChange(block.id, { ...block.content, nameAnimation: e.target.value })}
            className={styles.select}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #d1d5db' }}
          >
            <option value="none">None</option>
            <option value="typing">Typewriter</option>
            <option value="reverseTyping">Reverse Typewriter</option>
            <option value="aiTyping">AI Typing Cursor</option>
            <option value="gradient">Gradient Shift</option>
            <option value="pulse">Pulse</option>
            <option value="glitch">Glitch</option>
            <option value="neon">Neon Glow</option>
            <option value="shine">Gold Shine</option>
            <option value="bounce">Bounce</option>
            <option value="shake">Shake</option>
            <option value="fadeIn">Fade In</option>
            <option value="fadeUp">Fade Up</option>
            <option value="fadeDown">Fade Down</option>
            <option value="fadeLeft">Fade Left</option>
            <option value="fadeRight">Fade Right</option>
            <option value="zoomIn">Zoom In</option>
            <option value="zoomOut">Zoom Out</option>
            <option value="scaleUp">Scale Up</option>
            <option value="scaleDown">Scale Down</option>
            <option value="bounceIn">Bounce In</option>
            <option value="elasticBounce">Elastic Bounce</option>
            <option value="popIn">Pop In</option>
            <option value="slideIn">Slide In</option>
            <option value="flipIn">Flip In</option>
            <option value="rotateIn">Rotate In</option>
            <option value="rotate3d">3D Rotate</option>
            <option value="stretchReveal">Stretch Reveal</option>
            <option value="hologram">Hologram</option>
            <option value="cinematic">Cinematic Blur</option>
            <option value="jello">Jello Wobble</option>
            <option value="heartbeat">Heartbeat</option>
            <option value="floating">Floating</option>
          </select>
        </div>
      )}
    </div>
  )
}

export default function BlockEditor({ block, onContentChange, theme }: BlockEditorProps) {
  const [activeTab, setActiveTab] = useState('content')

  if (!block) return <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>Select a section to edit</div>;
  
  const renderBlockEditor = (block: Block) => {
    switch (block.type) {
      case 'hero':
        return (
          <div className={styles.blockEditor}>
            <MediaUpload
              label="Banner (Video or Photo)"
              currentUrl={block.content.bannerUrl}
              currentType={block.content.bannerType}
              onUploadSuccess={(url, type) => onContentChange(block.id, { ...block.content, bannerUrl: url, bannerType: type })}
            />
            <ImageUpload
              label="Profile Photo"
              currentImageUrl={block.content.photoUrl}
              onUploadSuccess={(url) => onContentChange(block.id, { ...block.content, photoUrl: url })}
            />

            <div className={styles.inputGroup}>
              <label>Name</label>
              <input
                type="text"
                value={block.content.name || ''}
                onChange={e => onContentChange(block.id, { ...block.content, name: e.target.value })}
                placeholder={theme === 'fun' ? "Hi, I'm Alex 👋" : "Alexander Smith"}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Role</label>
              <input
                type="text"
                value={block.content.role || ''}
                onChange={e => onContentChange(block.id, { ...block.content, role: e.target.value })}
                placeholder="Software Engineer"
              />
            </div>
            <div className={styles.inputGroup} style={{ marginBottom: '4rem' }}>
              <label>Bio / Tagline</label>
              <RichTextEditor
                value={block.content.tagline || ''}
                onChange={val => onContentChange(block.id, { ...block.content, tagline: val })}
                placeholder="I build things for the web."
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Location</label>
              <input
                type="text"
                value={block.content.location || ''}
                onChange={e => onContentChange(block.id, { ...block.content, location: e.target.value })}
                placeholder="New York, NY"
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Contact Email (for &quot;Send a message&quot; button)</label>
              <input
                type="email"
                value={block.content.contactEmail || ''}
                onChange={e => onContentChange(block.id, { ...block.content, contactEmail: e.target.value })}
                placeholder="hello@example.com"
              />
            </div>
          </div>
        )

      case 'about':
        return (
          <div className={styles.blockEditor}>
            <div className={styles.inputGroup} style={{ marginBottom: '4rem' }}>
              <label>About Me Text</label>
              <RichTextEditor
                value={block.content.text || ''}
                onChange={val => onContentChange(block.id, { ...block.content, text: val })}
                placeholder="Write a little about yourself, your background, and your passion..."
              />
            </div>
          </div>
        )

      case 'links': {
        const links = block.content.links || []

        const updateLink = (index: number, key: string, value: string) => {
          const updated = [...links]
          updated[index] = { ...updated[index], [key]: value }
          onContentChange(block.id, { ...block.content, links: updated })
        }

        const addLink = () => {
          const updated = [...links, { label: 'My Website', url: 'https://', description: '' }]
          onContentChange(block.id, { ...block.content, links: updated })
        }

        const removeLink = (index: number) => {
          const updated = links.filter((_: any, i: number) => i !== index)
          onContentChange(block.id, { ...block.content, links: updated })
        }

        return (
          <div className={styles.blockEditor}>
            <div className={styles.inputGroup}>
              <label>Links Layout</label>
              <select
                value={block.content.layout || 'default'}
                onChange={e => onContentChange(block.id, { ...block.content, layout: e.target.value })}
              >
                <option value="default">Standard List</option>
                <option value="spotlight">Spotlight Glow (Hover)</option>
                <option value="magnetic">Magnetic Pull</option>
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label>Link Style</label>
              <select
                value={block.content.linkStyle || 'solid'}
                onChange={e => onContentChange(block.id, { ...block.content, linkStyle: e.target.value })}
              >
                <option value="solid">Solid Color</option>
                <option value="outline">Outline</option>
                <option value="gradient">Gradient Fill</option>
                <option value="neo">Neo Brutalism</option>
                <option value="glass">Glassmorphism</option>
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label>Link Animation (Hover)</label>
              <select
                value={block.content.linkAnimation || 'lift'}
                onChange={e => onContentChange(block.id, { ...block.content, linkAnimation: e.target.value })}
              >
                <option value="none">None</option>
                <option value="lift">Lift Up</option>
                <option value="bounce">Bounce</option>
                <option value="wiggle">Wiggle</option>
                <option value="glow">Glow Pulse</option>
              </select>
            </div>
            {links.map((link: any, i: number) => (
              <div key={i} className={styles.itemCard}>
                <div className={styles.itemHeader}>
                  <span className={styles.itemTitle}>Link #{i + 1}</span>
                  <button type="button" onClick={() => removeLink(i)} className={styles.deleteBtn}>
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
                <div className={styles.inputGroup}>
                  <label>Label</label>
                  <input
                    type="text"
                    value={link.label || ''}
                    onChange={e => updateLink(i, 'label', e.target.value)}
                    placeholder="e.g. My Portfolio, Blog, GitHub"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>URL</label>
                  <input
                    type="url"
                    value={link.url || ''}
                    onChange={e => updateLink(i, 'url', e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Description (optional)</label>
                  <input
                    type="text"
                    value={link.description || ''}
                    onChange={e => updateLink(i, 'description', e.target.value)}
                    placeholder="Short description of the link"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Animated Badge (optional)</label>
                  <select
                    value={link.badge || 'none'}
                    onChange={e => updateLink(i, 'badge', e.target.value)}
                  >
                    <option value="none">None</option>
                    <option value="new">NEW tag</option>
                    <option value="dot">Pulsing Dot</option>
                    <option value="hot">🔥 Hot</option>
                    <option value="star">⭐ Star</option>
                  </select>
                </div>
              </div>
            ))}
            <button type="button" onClick={addLink} className={styles.addBtn}>
              <Plus size={16} /> Add Link
            </button>
          </div>
        )
      }

      case 'timeline': {
        const entries = block.content.entries || []

        const updateEntry = (index: number, key: string, value: string) => {
          const updated = [...entries]
          updated[index] = { ...updated[index], [key]: value }
          onContentChange(block.id, { ...block.content, entries: updated })
        }

        const addEntry = () => {
          const updated = [...entries, { title: '', company: '', startDate: '', endDate: '', description: '' }]
          onContentChange(block.id, { ...block.content, entries: updated })
        }

        const removeEntry = (index: number) => {
          const updated = entries.filter((_: any, i: number) => i !== index)
          onContentChange(block.id, { ...block.content, entries: updated })
        }

        return (
          <div className={styles.blockEditor}>
            {entries.map((entry: any, i: number) => (
              <div key={i} className={styles.itemCard}>
                <div className={styles.itemHeader}>
                  <span className={styles.itemTitle}>Experience #{i + 1}</span>
                  <button type="button" onClick={() => removeEntry(i)} className={styles.deleteBtn}>
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
                <div className={styles.inputGroup}>
                  <label>Job Title</label>
                  <input
                    type="text"
                    value={entry.title || ''}
                    onChange={e => updateEntry(i, 'title', e.target.value)}
                    placeholder="e.g. Senior Software Engineer"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Company / Organization</label>
                  <input
                    type="text"
                    value={entry.company || ''}
                    onChange={e => updateEntry(i, 'company', e.target.value)}
                    placeholder="e.g. Google"
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div className={styles.inputGroup}>
                    <label>Start Date</label>
                    <input
                      type="text"
                      value={entry.startDate || ''}
                      onChange={e => updateEntry(i, 'startDate', e.target.value)}
                      placeholder="e.g. Jan 2022"
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>End Date</label>
                    <input
                      type="text"
                      value={entry.endDate || ''}
                      onChange={e => updateEntry(i, 'endDate', e.target.value)}
                      placeholder="e.g. Present"
                    />
                  </div>
                </div>
                <div className={styles.inputGroup} style={{ marginBottom: '4rem' }}>
                  <label>Description</label>
                  <RichTextEditor
                    value={entry.description || ''}
                    onChange={val => updateEntry(i, 'description', val)}
                    placeholder="Key responsibilities and achievements..."
                  />
                </div>
              </div>
            ))}
            <button type="button" onClick={addEntry} className={styles.addBtn}>
              <Plus size={16} /> Add Experience
            </button>
          </div>
        )
      }

      case 'education': {
        const entries = block.content.entries || []

        const updateEntry = (index: number, key: string, value: string) => {
          const updated = [...entries]
          updated[index] = { ...updated[index], [key]: value }
          onContentChange(block.id, { ...block.content, entries: updated })
        }

        const addEntry = () => {
          const updated = [...entries, { degree: '', school: '', year: '', description: '' }]
          onContentChange(block.id, { ...block.content, entries: updated })
        }

        const removeEntry = (index: number) => {
          const updated = entries.filter((_: any, i: number) => i !== index)
          onContentChange(block.id, { ...block.content, entries: updated })
        }

        return (
          <div className={styles.blockEditor}>
            {entries.map((entry: any, i: number) => (
              <div key={i} className={styles.itemCard}>
                <div className={styles.itemHeader}>
                  <span className={styles.itemTitle}>Education #{i + 1}</span>
                  <button type="button" onClick={() => removeEntry(i)} className={styles.deleteBtn}>
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
                <div className={styles.inputGroup}>
                  <label>Degree / Qualification</label>
                  <input
                    type="text"
                    value={entry.degree || ''}
                    onChange={e => updateEntry(i, 'degree', e.target.value)}
                    placeholder="e.g. B.S. Computer Science"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>School / University</label>
                  <input
                    type="text"
                    value={entry.school || ''}
                    onChange={e => updateEntry(i, 'school', e.target.value)}
                    placeholder="e.g. MIT"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Year</label>
                  <input
                    type="text"
                    value={entry.year || ''}
                    onChange={e => updateEntry(i, 'year', e.target.value)}
                    placeholder="e.g. 2020 - 2024"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Description (optional)</label>
                  <textarea
                    rows={2}
                    value={entry.description || ''}
                    onChange={e => updateEntry(i, 'description', e.target.value)}
                    placeholder="GPA, honors, relevant coursework..."
                  />
                </div>
              </div>
            ))}
            <button type="button" onClick={addEntry} className={styles.addBtn}>
              <Plus size={16} /> Add Education
            </button>
          </div>
        )
      }

      case 'products': {
        const products = block.content.products || []

        const updateProduct = (index: number, key: string, value: string) => {
          const updated = [...products]
          updated[index] = { ...updated[index], [key]: value }
          onContentChange(block.id, { ...block.content, products: updated })
        }

        const addProduct = () => {
          const updated = [...products, { title: '', description: '', url: '', image: '' }]
          onContentChange(block.id, { ...block.content, products: updated })
        }

        const removeProduct = (index: number) => {
          const updated = products.filter((_: any, i: number) => i !== index)
          onContentChange(block.id, { ...block.content, products: updated })
        }

        return (
          <div className={styles.blockEditor}>
            {products.map((product: any, i: number) => (
              <div key={i} className={styles.itemCard}>
                <div className={styles.itemHeader}>
                  <span className={styles.itemTitle}>Product #{i + 1}</span>
                  <button type="button" onClick={() => removeProduct(i)} className={styles.deleteBtn}>
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
                <div className={styles.inputGroup}>
                  <label>Title</label>
                  <input
                    type="text"
                    value={product.title || ''}
                    onChange={e => updateProduct(i, 'title', e.target.value)}
                    placeholder="e.g. My E-Book"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Image URL (or upload below)</label>
                  <input
                    type="url"
                    value={product.image || ''}
                    onChange={e => updateProduct(i, 'image', e.target.value)}
                    placeholder="https://example.com/product.jpg"
                  />
                  <div style={{ marginTop: '0.5rem' }}>
                    <ImageUpload 
                      label="" 
                      onUploadSuccess={(url) => updateProduct(i, 'image', url)}
                    />
                  </div>
                </div>
                <div className={styles.inputGroup}>
                  <label>Link URL</label>
                  <input
                    type="url"
                    value={product.url || ''}
                    onChange={e => updateProduct(i, 'url', e.target.value)}
                    placeholder="https://buy.stripe.com/..."
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Description (optional)</label>
                  <textarea
                    rows={2}
                    value={product.description || ''}
                    onChange={e => updateProduct(i, 'description', e.target.value)}
                    placeholder="A short description..."
                  />
                </div>
              </div>
            ))}
            <button type="button" onClick={addProduct} className={styles.addBtn}>
              <Plus size={16} /> Add Product
            </button>
          </div>
        )
      }

      case 'achievements': {
        const entries = block.content.entries || []

        const updateEntry = (index: number, key: string, value: string) => {
          const updated = [...entries]
          updated[index] = { ...updated[index], [key]: value }
          onContentChange(block.id, { ...block.content, entries: updated })
        }

        const addEntry = () => {
          const updated = [...entries, { title: '', issuer: '', year: '', description: '' }]
          onContentChange(block.id, { ...block.content, entries: updated })
        }

        const removeEntry = (index: number) => {
          const updated = entries.filter((_: any, i: number) => i !== index)
          onContentChange(block.id, { ...block.content, entries: updated })
        }

        return (
          <div className={styles.blockEditor}>
            {entries.map((entry: any, i: number) => (
              <div key={i} className={styles.itemCard}>
                <div className={styles.itemHeader}>
                  <span className={styles.itemTitle}>Achievement #{i + 1}</span>
                  <button type="button" onClick={() => removeEntry(i)} className={styles.deleteBtn}>
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
                <div className={styles.inputGroup}>
                  <label>Title / Award</label>
                  <input
                    type="text"
                    value={entry.title || ''}
                    onChange={e => updateEntry(i, 'title', e.target.value)}
                    placeholder="e.g. AWS Certified Solutions Architect"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Issuer / Organization (optional)</label>
                  <input
                    type="text"
                    value={entry.issuer || ''}
                    onChange={e => updateEntry(i, 'issuer', e.target.value)}
                    placeholder="e.g. Amazon Web Services"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Year (optional)</label>
                  <input
                    type="text"
                    value={entry.year || ''}
                    onChange={e => updateEntry(i, 'year', e.target.value)}
                    placeholder="e.g. 2024"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Description (optional)</label>
                  <textarea
                    rows={2}
                    value={entry.description || ''}
                    onChange={e => updateEntry(i, 'description', e.target.value)}
                    placeholder="Brief description of the achievement..."
                  />
                </div>
              </div>
            ))}
            <button type="button" onClick={addEntry} className={styles.addBtn}>
              <Plus size={16} /> Add Achievement
            </button>
          </div>
        )
      }

      case 'document': {
        const files = block.content.files || []

        const updateFile = (index: number, key: string, value: string) => {
          const updated = [...files]
          updated[index] = { ...updated[index], [key]: value }
          onContentChange(block.id, { ...block.content, files: updated })
        }

        const addFile = () => {
          const updated = [...files, { label: 'My Resume', url: '' }]
          onContentChange(block.id, { ...block.content, files: updated })
        }

        const removeFile = (index: number) => {
          const updated = files.filter((_: any, i: number) => i !== index)
          onContentChange(block.id, { ...block.content, files: updated })
        }

        return (
          <div className={styles.blockEditor}>
            {files.map((file: any, i: number) => (
              <div key={i} className={styles.itemCard}>
                <div className={styles.itemHeader}>
                  <span className={styles.itemTitle}>File #{i + 1}</span>
                  <button type="button" onClick={() => removeFile(i)} className={styles.deleteBtn}>
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
                <div className={styles.inputGroup}>
                  <label>Label</label>
                  <input
                    type="text"
                    value={file.label || ''}
                    onChange={e => updateFile(i, 'label', e.target.value)}
                    placeholder="e.g. Resume, Certificate, Portfolio PDF"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>File URL (link to hosted file)</label>
                  <input
                    type="url"
                    value={file.url || ''}
                    onChange={e => updateFile(i, 'url', e.target.value)}
                    placeholder="https://drive.google.com/file/..."
                  />
                </div>
              </div>
            ))}
            <button type="button" onClick={addFile} className={styles.addBtn}>
              <Plus size={16} /> Add File
            </button>
          </div>
        )
      }
      
      case 'skills': {
        const tags = block.content.tags || []
        const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter' && e.currentTarget.value.trim()) {
            const newTag = e.currentTarget.value.trim()
            if (!tags.includes(newTag)) {
              onContentChange(block.id, { tags: [...tags, newTag] })
            }
            e.currentTarget.value = ''
          }
        }
        const removeTag = (tagToRemove: string) => {
          onContentChange(block.id, { tags: tags.filter((t: string) => t !== tagToRemove) })
        }
        return (
          <div className={styles.blockEditor}>
            <div className={styles.inputGroup}>
              <label>Skills Layout</label>
              <select
                value={block.content.layout || 'grid'}
                onChange={e => onContentChange(block.id, { ...block.content, layout: e.target.value })}
              >
                <option value="grid">Standard Grid</option>
                <option value="marquee">Infinite Marquee Ticker</option>
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label>Skills (Press Enter to add)</label>
              <input
                type="text"
                placeholder="e.g. React, Node.js, Design"
                onKeyDown={addTag}
              />
            </div>
            <div className={styles.tagsContainer}>
              {tags.map((tag: string) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)}><X size={12} /></button>
                </span>
              ))}
            </div>
          </div>
        )
      }

      case 'hobbies': {
        const hobbies = block.content.hobbies || []
        const addHobby = (e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter' && e.currentTarget.value.trim()) {
            const newHobby = e.currentTarget.value.trim()
            if (!hobbies.includes(newHobby)) {
              onContentChange(block.id, { hobbies: [...hobbies, newHobby] })
            }
            e.currentTarget.value = ''
          }
        }
        const removeHobby = (hobbyToRemove: string) => {
          onContentChange(block.id, { hobbies: hobbies.filter((h: string) => h !== hobbyToRemove) })
        }
        return (
          <div className={styles.blockEditor}>
            <div className={styles.inputGroup}>
              <label>Hobbies (Press Enter to add)</label>
              <input
                type="text"
                placeholder="e.g. Photography, Hiking"
                onKeyDown={addHobby}
              />
            </div>
            <div className={styles.tagsContainer}>
              {hobbies.map((hobby: string) => (
                <span key={hobby} className={styles.tag}>
                  {hobby}
                  <button type="button" onClick={() => removeHobby(hobby)}><X size={12} /></button>
                </span>
              ))}
            </div>
          </div>
        )
      }


      case 'work': {
        const projects = block.content.projects || []
        
        const updateProject = (index: number, key: string, value: any) => {
          const updated = [...projects]
          updated[index] = { ...updated[index], [key]: value }
          onContentChange(block.id, { ...block.content, projects: updated })
        }

        const addProject = () => {
          const updated = [...projects, { title: 'New Project', impact: 'Built a feature that increased user retention by 20%.', link: '' }]
          onContentChange(block.id, { ...block.content, projects: updated })
        }

        const removeProject = (index: number) => {
          const updated = projects.filter((_: any, i: number) => i !== index)
          onContentChange(block.id, { ...block.content, projects: updated })
        }

        return (
          <div className={styles.blockEditor}>
            {projects.map((project: any, i: number) => (
              <div key={i} className={styles.itemCard}>
                <div className={styles.itemHeader}>
                  <span className={styles.itemTitle}>Project #{i + 1}</span>
                  <button type="button" onClick={() => removeProject(i)} className={styles.deleteBtn}>
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
                <div className={styles.inputGroup}>
                  <label>Project Title</label>
                  <input
                    type="text"
                    value={project.title || ''}
                    onChange={e => updateProject(i, 'title', e.target.value)}
                    placeholder="e.g. E-Commerce Platform"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Description / Impact</label>
                  <textarea
                    rows={2}
                    value={project.impact || ''}
                    onChange={e => updateProject(i, 'impact', e.target.value)}
                    placeholder="e.g. Scaled platform to 100k active users..."
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Project Link (URL)</label>
                  <input
                    type="url"
                    value={project.link || ''}
                    onChange={e => updateProject(i, 'link', e.target.value)}
                    placeholder="https://myproject.com"
                  />
                </div>
              </div>
            ))}
            <button type="button" onClick={addProject} className={styles.addBtn}>
              <Plus size={16} /> Add Project
            </button>
          </div>
        )
      }

      case 'contact': {
        const socials = block.content.socials || []

        const updateSocial = (index: number, key: string, value: string) => {
          const updated = [...socials]
          updated[index] = { ...updated[index], [key]: value }
          onContentChange(block.id, { ...block.content, socials: updated })
        }

        const addSocial = () => {
          const updated = [...socials, { label: 'Twitter / X', url: 'https://x.com' }]
          onContentChange(block.id, { ...block.content, socials: updated })
        }

        const removeSocial = (index: number) => {
          const updated = socials.filter((_: any, i: number) => i !== index)
          onContentChange(block.id, { ...block.content, socials: updated })
        }

        return (
          <div className={styles.blockEditor}>
            <div className={styles.inputGroup}>
              <label>Contact Email</label>
              <input
                type="email"
                value={block.content.email || ''}
                onChange={e => onContentChange(block.id, { ...block.content, email: e.target.value })}
                placeholder="hello@example.com"
              />
            </div>
            
            <label style={{ fontSize: '0.875rem', fontWeight: 500, color: '#4b5563', marginTop: '0.5rem' }}>Social Links</label>
            {socials.map((social: any, i: number) => (
              <div key={i} className={styles.itemCard}>
                <div className={styles.itemHeader}>
                  <span className={styles.itemTitle}>Social #{i + 1}</span>
                  <button type="button" onClick={() => removeSocial(i)} className={styles.deleteBtn}>
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
                <div className={styles.inputGroup}>
                  <label>Platform Name</label>
                  <input
                    type="text"
                    value={social.label || ''}
                    onChange={e => updateSocial(i, 'label', e.target.value)}
                    placeholder="e.g. GitHub, LinkedIn, Twitter"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Profile URL</label>
                  <input
                    type="url"
                    value={social.url || ''}
                    onChange={e => updateSocial(i, 'url', e.target.value)}
                    placeholder="https://github.com/yourhandle"
                  />
                </div>
              </div>
            ))}
            <button type="button" onClick={addSocial} className={styles.addBtn}>
              <Plus size={16} /> Add Social Link
            </button>
          </div>
        )
      }

      case 'pricing':
        return (
          <div className={styles.blockEditor}>
            <div className={styles.inputGroup}>
              <label>Pricing Information</label>
              <input
                type="text"
                value={block.content.text || ''}
                onChange={e => onContentChange(block.id, { ...block.content, text: e.target.value })}
                placeholder="e.g. $50/hr or Starting at $500/project"
              />
            </div>
          </div>
        )

      case 'availability':
        return (
          <div className={styles.blockEditor}>
            <div className={styles.inputGroup}>
              <label>Booking Link (e.g., Calendly or SavvyCal)</label>
              <input
                type="url"
                value={block.content.url || ''}
                onChange={e => onContentChange(block.id, { ...block.content, url: e.target.value })}
                placeholder="https://calendly.com/your-link"
              />
            </div>
          </div>
        )

      case 'faq': {
        const pairs = block.content.pairs || []

        const updatePair = (index: number, key: string, value: string) => {
          const updated = [...pairs]
          updated[index] = { ...updated[index], [key]: value }
          onContentChange(block.id, { ...block.content, pairs: updated })
        }

        const addPair = () => {
          const updated = [...pairs, { question: 'What are your rates?', answer: 'My rates vary by project scope...' }]
          onContentChange(block.id, { ...block.content, pairs: updated })
        }

        const removePair = (index: number) => {
          const updated = pairs.filter((_: any, i: number) => i !== index)
          onContentChange(block.id, { ...block.content, pairs: updated })
        }

        return (
          <div className={styles.blockEditor}>
            {pairs.map((pair: any, i: number) => (
              <div key={i} className={styles.itemCard}>
                <div className={styles.itemHeader}>
                  <span className={styles.itemTitle}>Question #{i + 1}</span>
                  <button type="button" onClick={() => removePair(i)} className={styles.deleteBtn}>
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
                <div className={styles.inputGroup}>
                  <label>Question</label>
                  <input
                    type="text"
                    value={pair.question || ''}
                    onChange={e => updatePair(i, 'question', e.target.value)}
                    placeholder="What services do you offer?"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Answer</label>
                  <textarea
                    rows={2}
                    value={pair.answer || ''}
                    onChange={e => updatePair(i, 'answer', e.target.value)}
                    placeholder="I offer full-stack web development..."
                  />
                </div>
              </div>
            ))}
            <button type="button" onClick={addPair} className={styles.addBtn}>
              <Plus size={16} /> Add FAQ Question
            </button>
          </div>
        )
      }

      case 'video':
        return (
          <div className={styles.blockEditor}>
            <div className={styles.inputGroup}>
              <label>Video URL (YouTube, Vimeo, or direct link)</label>
              <input
                type="url"
                value={block.content.url || ''}
                onChange={e => onContentChange(block.id, { ...block.content, url: e.target.value })}
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Caption (optional)</label>
              <input
                type="text"
                value={block.content.caption || ''}
                onChange={e => onContentChange(block.id, { ...block.content, caption: e.target.value })}
                placeholder="About this video..."
              />
            </div>
          </div>
        )

      case 'gallery': {
        const images = block.content.images || []

        const addImage = () => {
          const updated = [...images, { url: '', caption: '' }]
          onContentChange(block.id, { ...block.content, images: updated })
        }

        const updateImage = (index: number, key: string, value: string) => {
          const updated = [...images]
          // Backwards compatibility check (if old string element)
          if (typeof updated[index] === 'string') {
            updated[index] = { url: updated[index], caption: '' }
          }
          updated[index] = { ...updated[index], [key]: value }
          onContentChange(block.id, { ...block.content, images: updated })
        }

        const removeImage = (index: number) => {
          const updated = images.filter((_: any, i: number) => i !== index)
          onContentChange(block.id, { ...block.content, images: updated })
        }

        return (
          <div className={styles.blockEditor}>
            <div className={styles.inputGroup}>
              <label>Gallery Layout</label>
              <select
                value={block.content.layout || 'grid'}
                onChange={e => onContentChange(block.id, { ...block.content, layout: e.target.value })}
              >
                <option value="grid">Standard Grid</option>
                <option value="polaroid">Polaroid Photo Stack</option>
                <option value="masonry">Pinterest Masonry</option>
                <option value="filmstrip">Scrolling Film Strip</option>
                <option value="coverflow">3D Cover Flow</option>
                <option value="bento">Bento Box Collage</option>
                <option value="carousel">Snap Carousel</option>
                <option value="scrapbook">Messy Scrapbook</option>
              </select>
            </div>
            
            <div className={styles.inputGroup}>
              <label>Image Filter</label>
              <select
                value={block.content.imageFilter || 'none'}
                onChange={e => onContentChange(block.id, { ...block.content, imageFilter: e.target.value })}
              >
                <option value="none">None (Original)</option>
                <option value="grayscale">Black & White</option>
                <option value="sepia">Vintage Sepia</option>
                <option value="high-contrast">High Contrast</option>
                <option value="cyberpunk">Cyberpunk Neon</option>
              </select>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                <input 
                  type="checkbox" 
                  checked={block.content.enableLightbox ?? true}
                  onChange={e => onContentChange(block.id, { ...block.content, enableLightbox: e.target.checked })}
                />
                Enable Lightbox
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                <input 
                  type="checkbox" 
                  checked={block.content.hoverCaptions ?? false}
                  onChange={e => onContentChange(block.id, { ...block.content, hoverCaptions: e.target.checked })}
                />
                Hover Reveal Captions
              </label>
            </div>
            {images.map((imgObj: any, i: number) => {
              // Backward compatibility for simple strings
              const url = typeof imgObj === 'string' ? imgObj : imgObj.url || ''
              const caption = typeof imgObj === 'string' ? '' : imgObj.caption || ''

              return (
                <div key={i} className={styles.itemCard}>
                  <div className={styles.itemHeader}>
                    <span className={styles.itemTitle}>Image #{i + 1}</span>
                    <button type="button" onClick={() => removeImage(i)} className={styles.deleteBtn}>
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Image URL (or upload below)</label>
                    <input
                      type="url"
                      value={url}
                      onChange={e => updateImage(i, 'url', e.target.value)}
                      placeholder="https://example.com/photo.jpg"
                    />
                    <div style={{ marginTop: '0.5rem' }}>
                      <ImageUpload 
                        label="" 
                        onUploadSuccess={(newUrl) => updateImage(i, 'url', newUrl)}
                      />
                    </div>
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Caption (optional)</label>
                    <input
                      type="text"
                      value={caption}
                      onChange={e => updateImage(i, 'caption', e.target.value)}
                      placeholder="A short caption for this photo"
                    />
                  </div>
                </div>
              )
            })}
            <button type="button" onClick={addImage} className={styles.addBtn}>
              <Plus size={16} /> Add Image
            </button>
          </div>
        )
      }

      case 'testimonials': {
        const entries = block.content.entries || []

        const updateEntry = (index: number, key: string, value: string) => {
          const updated = [...entries]
          updated[index] = { ...updated[index], [key]: value }
          onContentChange(block.id, { ...block.content, entries: updated })
        }

        const addEntry = () => {
          const updated = [...entries, { name: '', role: '', text: '' }]
          onContentChange(block.id, { ...block.content, entries: updated })
        }

        const removeEntry = (index: number) => {
          const updated = entries.filter((_: any, i: number) => i !== index)
          onContentChange(block.id, { ...block.content, entries: updated })
        }

        return (
          <div className={styles.blockEditor}>
            <div className={styles.inputGroup}>
              <label>Testimonials Layout</label>
              <select
                value={block.content.layout || 'grid'}
                onChange={e => onContentChange(block.id, { ...block.content, layout: e.target.value })}
              >
                <option value="grid">Standard Grid</option>
                <option value="tweet">Viral Tweet Cards</option>
                <option value="cards">Swipeable Deck</option>
              </select>
            </div>
            {entries.map((entry: any, i: number) => (
              <div key={i} className={styles.itemCard}>
                <div className={styles.itemHeader}>
                  <span className={styles.itemTitle}>Testimonial #{i + 1}</span>
                  <button type="button" onClick={() => removeEntry(i)} className={styles.deleteBtn}>
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
                <div className={styles.inputGroup}>
                  <label>Person&apos;s Name</label>
                  <input
                    type="text"
                    value={entry.name || ''}
                    onChange={e => updateEntry(i, 'name', e.target.value)}
                    placeholder="e.g. Jane Doe"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Role / Company</label>
                  <input
                    type="text"
                    value={entry.role || ''}
                    onChange={e => updateEntry(i, 'role', e.target.value)}
                    placeholder="e.g. CEO at Acme Inc."
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Testimonial Text</label>
                  <textarea
                    rows={3}
                    value={entry.text || ''}
                    onChange={e => updateEntry(i, 'text', e.target.value)}
                    placeholder="What they said about you..."
                  />
                </div>
              </div>
            ))}
            <button type="button" onClick={addEntry} className={styles.addBtn}>
              <Plus size={16} /> Add Testimonial
            </button>
          </div>
        )
      }

      default:
        // Personas & specific new blocks
        if (block.type === 'music') {
          return (
            <div className={styles.blockEditor}>
              <div className={styles.inputGroup}>
                <label>Music Layout</label>
                <select
                  value={block.content.layout || 'default'}
                  onChange={e => onContentChange(block.id, { ...block.content, layout: e.target.value })}
                >
                  <option value="default">Standard Card</option>
                  <option value="vinyl">Vinyl Player</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label>Song Name</label>
                <input
                  type="text"
                  value={typeof block.content.song === 'string' ? block.content.song : ''}
                  onChange={e => onContentChange(block.id, { ...block.content, song: e.target.value })}
                  placeholder="e.g. Blinding Lights"
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Artist</label>
                <input
                  type="text"
                  value={typeof block.content.artist === 'string' ? block.content.artist : ''}
                  onChange={e => onContentChange(block.id, { ...block.content, artist: e.target.value })}
                  placeholder="e.g. The Weeknd"
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Spotify Track URL (optional)</label>
                <input
                  type="url"
                  value={typeof block.content.spotifyUrl === 'string' ? block.content.spotifyUrl : ''}
                  onChange={e => onContentChange(block.id, { ...block.content, spotifyUrl: e.target.value })}
                  placeholder="https://open.spotify.com/track/..."
                />
              </div>
            </div>
          )
        }

        if (block.type === 'books') {
          return (
            <div className={styles.blockEditor}>
              <div className={styles.inputGroup}>
                <label>Current Book</label>
                <input
                  type="text"
                  value={typeof block.content.currentBook === 'string' ? block.content.currentBook : ''}
                  onChange={e => onContentChange(block.id, { ...block.content, currentBook: e.target.value })}
                  placeholder="e.g. Dune"
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Author</label>
                <input
                  type="text"
                  value={typeof block.content.author === 'string' ? block.content.author : ''}
                  onChange={e => onContentChange(block.id, { ...block.content, author: e.target.value })}
                  placeholder="e.g. Frank Herbert"
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Reading Goal (optional)</label>
                <input
                  type="text"
                  value={typeof block.content.readingGoal === 'string' ? block.content.readingGoal : ''}
                  onChange={e => onContentChange(block.id, { ...block.content, readingGoal: e.target.value })}
                  placeholder="e.g. 5 of 20 books read in 2024"
                />
              </div>
            </div>
          )
        }

        if (block.type === 'travel') {
          const places = block.content.places || []
          const photos = block.content.photos || []
          
          const addPlace = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter' && e.currentTarget.value.trim()) {
              const newPlace = e.currentTarget.value.trim()
              if (!places.includes(newPlace)) {
                onContentChange(block.id, { ...block.content, places: [...places, newPlace] })
              }
              e.currentTarget.value = ''
            }
          }
          const removePlace = (pToRemove: string) => {
            onContentChange(block.id, { ...block.content, places: places.filter((p: string) => p !== pToRemove) })
          }

          const addPhoto = () => onContentChange(block.id, { ...block.content, photos: [...photos, ''] })
          const updatePhoto = (idx: number, url: string) => {
            const up = [...photos]
            up[idx] = url
            onContentChange(block.id, { ...block.content, photos: up })
          }
          const removePhoto = (idx: number) => {
            onContentChange(block.id, { ...block.content, photos: photos.filter((_: any, i: number) => i !== idx) })
          }

          return (
            <div className={styles.blockEditor}>
              <div className={styles.inputGroup}>
                <label>Places Visited (Press Enter to add)</label>
                <input type="text" placeholder="e.g. Tokyo, Japan" onKeyDown={addPlace} />
              </div>
              <div className={styles.tagsContainer}>
                {places.map((place: string) => (
                  <span key={place} className={styles.tag}>
                    {place} <button type="button" onClick={() => removePlace(place)}><X size={12} /></button>
                  </span>
                ))}
              </div>
              
              <div style={{ marginTop: '2rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 500, color: '#4b5563', marginBottom: '0.5rem', display: 'block' }}>Travel Photos</label>
                {photos.map((url: string, i: number) => (
                  <div key={i} className={styles.itemCard}>
                    <div className={styles.itemHeader}>
                      <span className={styles.itemTitle}>Photo #{i + 1}</span>
                      <button type="button" onClick={() => removePhoto(i)} className={styles.deleteBtn}><Trash2 size={14} /> Remove</button>
                    </div>
                    <div className={styles.inputGroup}>
                      <input type="url" value={typeof url === 'string' ? url : ''} onChange={e => updatePhoto(i, e.target.value)} placeholder="https://..." />
                      <div style={{ marginTop: '0.5rem' }}>
                        <ImageUpload label="" onUploadSuccess={(newUrl) => updatePhoto(i, newUrl)} />
                      </div>
                    </div>
                  </div>
                ))}
                <button type="button" onClick={addPhoto} className={styles.addBtn}>
                  <Plus size={16} /> Add Photo
                </button>
              </div>
            </div>
          )
        }

        if (block.type === 'portfolio') {
          const pieces = block.content.pieces || []
          
          const updatePiece = (index: number, key: string, value: string) => {
            const updated = [...pieces]
            updated[index] = { ...updated[index], [key]: value }
            onContentChange(block.id, { ...block.content, pieces: updated })
          }
          const addPiece = () => {
            onContentChange(block.id, { ...block.content, pieces: [...pieces, { title: 'New Piece', description: '', imageUrl: '', link: '' }] })
          }
          const removePiece = (index: number) => {
            onContentChange(block.id, { ...block.content, pieces: pieces.filter((_: any, i: number) => i !== index) })
          }

          return (
            <div className={styles.blockEditor}>
              {pieces.map((piece: any, i: number) => (
                <div key={i} className={styles.itemCard}>
                  <div className={styles.itemHeader}>
                    <span className={styles.itemTitle}>Piece #{i + 1}</span>
                    <button type="button" onClick={() => removePiece(i)} className={styles.deleteBtn}><Trash2 size={14} /> Remove</button>
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Title</label>
                    <input type="text" value={typeof piece.title === 'string' ? piece.title : ''} onChange={e => updatePiece(i, 'title', e.target.value)} />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Description</label>
                    <textarea rows={2} value={typeof piece.description === 'string' ? piece.description : ''} onChange={e => updatePiece(i, 'description', e.target.value)} />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Image URL (or upload)</label>
                    <input type="url" value={typeof piece.imageUrl === 'string' ? piece.imageUrl : ''} onChange={e => updatePiece(i, 'imageUrl', e.target.value)} />
                    <div style={{ marginTop: '0.5rem' }}>
                      <ImageUpload label="" onUploadSuccess={(url) => updatePiece(i, 'imageUrl', url)} />
                    </div>
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Link (optional)</label>
                    <input type="url" value={typeof piece.link === 'string' ? piece.link : ''} onChange={e => updatePiece(i, 'link', e.target.value)} placeholder="https://..." />
                  </div>
                </div>
              ))}
              <button type="button" onClick={addPiece} className={styles.addBtn}>
                <Plus size={16} /> Add Piece
              </button>
            </div>
          )
        }

        if (block.type === 'movies') {
          const films = block.content.favoriteFilms || []
          
          const updateFilm = (index: number, key: string, value: string) => {
            const updated = [...films]
            updated[index] = { ...updated[index], [key]: value }
            onContentChange(block.id, { ...block.content, favoriteFilms: updated })
          }
          const addFilm = () => {
            if (films.length < 4) { // usually 4 top films on Letterboxd
              onContentChange(block.id, { ...block.content, favoriteFilms: [...films, { title: 'New Film', imageUrl: '', year: '' }] })
            } else {
              onContentChange(block.id, { ...block.content, favoriteFilms: [...films, { title: 'New Film', imageUrl: '', year: '' }] })
            }
          }
          const removeFilm = (index: number) => {
            onContentChange(block.id, { ...block.content, favoriteFilms: films.filter((_: any, i: number) => i !== index) })
          }

          return (
            <div className={styles.blockEditor}>
              <div className={styles.inputGroup}>
                <label>Letterboxd Profile URL (optional)</label>
                <input 
                  type="url" 
                  value={typeof block.content.letterboxdUrl === 'string' ? block.content.letterboxdUrl : ''} 
                  onChange={e => onContentChange(block.id, { ...block.content, letterboxdUrl: e.target.value })} 
                  placeholder="https://letterboxd.com/yourusername/" 
                />
              </div>

              <div style={{ marginTop: '2rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 500, color: '#4b5563', marginBottom: '0.5rem', display: 'block' }}>Favorite Films</label>
                {films.map((film: any, i: number) => (
                  <div key={i} className={styles.itemCard}>
                    <div className={styles.itemHeader}>
                      <span className={styles.itemTitle}>Film #{i + 1}</span>
                      <button type="button" onClick={() => removeFilm(i)} className={styles.deleteBtn}><Trash2 size={14} /> Remove</button>
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Title</label>
                      <input type="text" value={typeof film.title === 'string' ? film.title : ''} onChange={e => updateFilm(i, 'title', e.target.value)} />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Year (optional)</label>
                      <input type="text" value={typeof film.year === 'string' ? film.year : ''} onChange={e => updateFilm(i, 'year', e.target.value)} placeholder="e.g. 2024" />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Poster Image URL</label>
                      <input type="url" value={typeof film.imageUrl === 'string' ? film.imageUrl : ''} onChange={e => updateFilm(i, 'imageUrl', e.target.value)} placeholder="https://..." />
                      <div style={{ marginTop: '0.5rem' }}>
                        <ImageUpload label="" onUploadSuccess={(url) => updateFilm(i, 'imageUrl', url)} />
                      </div>
                    </div>
                  </div>
                ))}
                <button type="button" onClick={addFilm} className={styles.addBtn}>
                  <Plus size={16} /> Add Film
                </button>
              </div>
            </div>
          )
        }

        return (
          <div className={styles.blockEditor}>
            <p className={styles.helpText}>Custom content for block: {block.type}</p>
          </div>
        )

    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', padding: '0 1rem' }}>
        <button 
          onClick={() => setActiveTab('content')}
          style={{ flex: 1, padding: '1rem', background: 'none', border: 'none', borderBottom: activeTab === 'content' ? '2px solid #8b5cf6' : '2px solid transparent', color: activeTab === 'content' ? '#8b5cf6' : '#64748b', fontWeight: 600, cursor: 'pointer' }}
        >
          Content
        </button>
        <button 
          onClick={() => setActiveTab('design')}
          style={{ flex: 1, padding: '1rem', background: 'none', border: 'none', borderBottom: activeTab === 'design' ? '2px solid #8b5cf6' : '2px solid transparent', color: activeTab === 'design' ? '#8b5cf6' : '#64748b', fontWeight: 600, cursor: 'pointer' }}
        >
          Design
        </button>
        <button 
          onClick={() => setActiveTab('advanced')}
          style={{ flex: 1, padding: '1rem', background: 'none', border: 'none', borderBottom: activeTab === 'advanced' ? '2px solid #8b5cf6' : '2px solid transparent', color: activeTab === 'advanced' ? '#8b5cf6' : '#64748b', fontWeight: 600, cursor: 'pointer' }}
        >
          Advanced
        </button>
      </div>
      
      <div style={{ padding: '1.5rem', flex: 1, overflowY: 'auto' }}>
        {activeTab === 'content' && renderBlockEditor(block)}
        {activeTab === 'design' && <DesignSettingsForm block={block} onContentChange={onContentChange} />}
        {activeTab === 'advanced' && <div style={{ color: '#64748b', textAlign: 'center', padding: '2rem' }}>Advanced settings coming soon</div>}
      </div>
    </div>
  )
}
