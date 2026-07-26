'use client'

import { useState, useCallback, useEffect } from 'react'
import styles from './dashboard.module.css'
import { Block, Theme, Widget, BLOCK_CATEGORIES } from '@/types/portfolio'
import { PortfolioRenderer } from '@/components/PortfolioRenderer'
import { logout } from '../login/actions'
import Link from 'next/link'
import { updateBlockContent, toggleBlockEnabled, togglePublish, updateBlockOrder, createWidget, updateWidgetContent, deleteWidget, updateWidgetLayout } from './actions'
import BlockEditor from './BlockEditor'
import SectionsList from './SectionsList'
import SidebarNav from './SidebarNav'
import { Palette, Share2, Upload, GripVertical, Smartphone, Monitor, Search, Sparkles, LogOut, ExternalLink, Layout, FileText, BarChart2, Settings } from 'lucide-react'
import FunSettingsPanel from './FunSettingsPanel'
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard'
import AccountSettings from '@/components/settings/AccountSettings'

export default function DashboardClient({ user, page, initialBlocks, initialWidgets }: { user: any, page: any, initialBlocks: Block[], initialWidgets: Widget[] }) {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks)
  const [widgets, setWidgets] = useState<Widget[]>(initialWidgets)
  const [isPublishing, setIsPublishing] = useState(false)
  const [isPublished, setIsPublished] = useState(page?.published || false)
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor')
  const [previewMode, setPreviewMode] = useState<'mobile' | 'desktop'>('mobile')
  const [savingStatus, setSavingStatus] = useState<string>('')
  
  // New architecture state
  const [activeNavTab, setActiveNavTab] = useState('sections')
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(
    initialBlocks.find(b => b.type === 'hero')?.id || null
  )

  // Debounced save
  const handleContentChange = useCallback((blockId: string, newContent: any) => {
    setBlocks(prev => prev.map(b => b.id === blockId ? { ...b, content: newContent } : b))
    
    setSavingStatus('Saving...')
    const timeoutId = setTimeout(async () => {
      const { error } = await updateBlockContent(blockId, newContent)
      if (error) {
        setSavingStatus('Error saving')
      } else {
        setSavingStatus('Saved')
        setTimeout(() => setSavingStatus(''), 2000)
      }
    }, 1000)
  }, [])

  const handleToggleBlock = async (blockId: string, enabled: boolean) => {
    setBlocks(prev => prev.map(b => b.id === blockId ? { ...b, enabled } : b))
    await toggleBlockEnabled(blockId, enabled)
  }

  const CATEGORY_MAP = [
    { id: 'professional', types: ['hero', 'about', 'timeline', 'education', 'skills', 'work', 'achievements'] },
    { id: 'business', types: ['products', 'pricing', 'testimonials', 'faq', 'contact', 'availability'] },
    { id: 'creator', types: ['gallery', 'video', 'hobbies', 'links', 'document', 'badge'] }
  ]

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const { source, destination } = result

    // We only allow dragging within the same category
    if (source.droppableId !== destination.droppableId) return
    if (source.index === destination.index) return

    const categoryId = source.droppableId
    const category = CATEGORY_MAP.find(c => c.id === categoryId)
    if (!category) return

    const sortedBlocks = [...blocks].sort((a, b) => a.sort_order - b.sort_order)
    const categoryBlocks = sortedBlocks.filter(b => category.types.includes(b.type))
    
    if (categoryBlocks[source.index].type === 'hero' || categoryBlocks[destination.index].type === 'hero') return

    const [removed] = categoryBlocks.splice(source.index, 1)
    categoryBlocks.splice(destination.index, 0, removed)

    let finalBlocks: any[] = []
    CATEGORY_MAP.forEach(cat => {
      if (cat.id === categoryId) {
        finalBlocks = [...finalBlocks, ...categoryBlocks]
      } else {
        const catBlocks = sortedBlocks.filter(b => cat.types.includes(b.type))
        finalBlocks = [...finalBlocks, ...catBlocks]
      }
    })

    const updatedBlocks = finalBlocks.map((b, i) => ({ ...b, sort_order: i }))

    setBlocks(updatedBlocks)
    const updates = updatedBlocks.map(b => ({ id: b.id, sort_order: b.sort_order }))
    updateBlockOrder(updates)
  }

  const handlePublishToggle = async () => {
    setIsPublishing(true)
    const res = await togglePublish(page.id, !isPublished)
    if (res.error) {
      alert(res.error)
    } else {
      setIsPublished(!isPublished)
    }
    setIsPublishing(false)
  }

  // Widget handlers
  const handleAddWidget = async (type: string, content: any, x: number, y: number, w: number, h: number) => {
    setSavingStatus('Saving...')
    const res = await createWidget(page.id, type, content, x, y, w, h)
    if (res.success && res.widget) {
      setWidgets(prev => [...prev, res.widget])
      setSavingStatus('Saved')
      setTimeout(() => setSavingStatus(''), 2000)
    } else {
      setSavingStatus('Error saving')
    }
  }

  const handleUpdateWidget = async (widgetId: string, content: any) => {
    setWidgets(prev => prev.map(w => w.id === widgetId ? { ...w, content } : w))
    setSavingStatus('Saving...')
    const { error } = await updateWidgetContent(widgetId, content)
    if (error) {
      setSavingStatus('Error saving')
    } else {
      setSavingStatus('Saved')
      setTimeout(() => setSavingStatus(''), 2000)
    }
  }

  const handleDeleteWidget = async (widgetId: string) => {
    setWidgets(prev => prev.filter(w => w.id !== widgetId))
    await deleteWidget(widgetId)
  }

  const handleLayoutChange = async (layout: any) => {
    const updates = (layout || []).map((l: any) => ({
      id: l.i,
      x: l.x,
      y: l.y,
      w: l.w,
      h: l.h
    }))
    
    setWidgets(prev => prev.map(w => {
      const update = updates.find((u: any) => u.id === w.id)
      return update ? { ...w, grid_x: update.x, grid_y: update.y, grid_w: update.w, grid_h: update.h } : w
    }))

    setSavingStatus('Saving layout...')
    await updateWidgetLayout(updates)
    setSavingStatus('Saved')
    setTimeout(() => setSavingStatus(''), 2000)
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
            <Layout size={24} />
            <h1 className={styles.logo} style={{ margin: 0 }}>Mywall</h1>
          </div>
          <span className={styles.saveStatus}>{savingStatus}</span>
        </div>
        <div className={styles.headerRight}>

          <button 
            className={`${styles.publishBtn} ${isPublished ? styles.published : ''}`}
            onClick={handlePublishToggle}
            disabled={isPublishing}
            suppressHydrationWarning
          >
            {isPublishing ? 'Updating...' : isPublished ? 'Unpublish' : 'Publish'}
          </button>
          
          {isPublished && (
            <Link href={`/${user.handle}`} target="_blank" className={styles.viewLink}>
              View <ExternalLink size={16} />
            </Link>
          )}



          <form action={logout}>
            <button className={styles.logoutBtn} type="submit" title="Log out" suppressHydrationWarning>
              <LogOut size={20} />
            </button>
          </form>
        </div>
      </header>

      {/* Mobile Tabs */}
      <div className={styles.mobileTabs}>
        <button 
          className={activeTab === 'editor' ? styles.activeTab : ''} 
          onClick={() => setActiveTab('editor')}
        >
          Editor
        </button>
        <button 
          className={activeTab === 'preview' ? styles.activeTab : ''} 
          onClick={() => setActiveTab('preview')}
        >
          Preview
        </button>
      </div>

      <main className={styles.main}>
        <SidebarNav activeTab={activeNavTab} setActiveTab={setActiveNavTab} className={activeTab === 'preview' ? styles.hiddenOnMobile : ''} />
        
        <>
          {activeNavTab === 'theme' ? (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc' }}>
              <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <Palette size={48} color="#94a3b8" style={{ margin: '0 auto 1rem' }} />
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.5rem' }}>Theme Customization</h2>
                <p style={{ color: '#64748b', marginBottom: '1.5rem', maxWidth: '300px' }}>Customize colors, fonts, and background styles.</p>
                <div style={{ backgroundColor: '#f1f5f9', padding: '0.75rem', borderRadius: '8px', fontSize: '0.875rem', color: '#475569', fontWeight: 500 }}>
                  Theme settings coming soon 🎨
                </div>
              </div>
            </div>
          ) : activeNavTab === 'pages' ? (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc' }}>
              <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <FileText size={48} color="#94a3b8" style={{ margin: '0 auto 1rem' }} />
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.5rem' }}>Manage Pages</h2>
                <p style={{ color: '#64748b', marginBottom: '1.5rem', maxWidth: '300px' }}>Create and manage multiple portfolio pages under one account.</p>
                <div style={{ backgroundColor: '#f1f5f9', padding: '0.75rem', borderRadius: '8px', fontSize: '0.875rem', color: '#475569', fontWeight: 500 }}>
                  Pro Feature ✨ Coming Soon
                </div>
              </div>
            </div>
          ) : activeNavTab === 'analytics' ? (
            <AnalyticsDashboard pageId={page.id} />
          ) : activeNavTab === 'settings' ? (
            <AccountSettings initialHandle={user.handle} initialEmail={user.email} />
          ) : activeNavTab === 'help' || activeNavTab === 'whatsnew' ? (
             <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc' }}>
              <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <Sparkles size={48} color="#f59e0b" style={{ margin: '0 auto 1rem' }} />
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.5rem' }}>Updates & Support</h2>
                <p style={{ color: '#64748b', marginBottom: '1.5rem', maxWidth: '300px' }}>We're constantly adding new features to make your portfolio better.</p>
                <div style={{ backgroundColor: '#f1f5f9', padding: '0.75rem', borderRadius: '8px', fontSize: '0.875rem', color: '#475569', fontWeight: 500 }}>
                  Stay tuned for updates! ✨
                </div>
              </div>
            </div>
          ) : (
            <>
              {activeNavTab === 'sections' && (
                <div className={activeTab === 'preview' ? styles.hiddenOnMobile : ''}>
                  <SectionsList 
                    blocks={[...blocks].sort((a, b) => a.sort_order - b.sort_order)}
                    selectedBlockId={selectedBlockId}
                    setSelectedBlockId={setSelectedBlockId}
                    onToggleBlock={handleToggleBlock}
                    onDragEnd={handleDragEnd}
                  />
                </div>
              )}
              
              <div className={`${styles.previewPane} ${activeTab === 'editor' ? styles.hiddenOnMobile : ''}`}>
                <div className={styles.previewHeader}>
                  <button 
                    className={`${styles.previewToggleBtn} ${previewMode === 'mobile' ? styles.active : ''}`}
                    onClick={() => setPreviewMode('mobile')}
                    title="Mobile Preview"
                  >
                    <Smartphone size={20} />
                  </button>
                  <button 
                    className={`${styles.previewToggleBtn} ${previewMode === 'desktop' ? styles.active : ''}`}
                    onClick={() => setPreviewMode('desktop')}
                    title="Desktop Preview"
                  >
                    <Monitor size={20} />
                  </button>
                </div>
                <div className={previewMode === 'mobile' ? styles.previewDevice : styles.previewDesktop}>
                  <PortfolioRenderer blocks={blocks} theme={user.theme as Theme} funSettings={page.fun_settings} />
                </div>
              </div>

              <div className={`${styles.editPane} ${activeTab === 'preview' ? styles.hiddenOnMobile : ''}`}>
                {selectedBlockId && activeNavTab === 'sections' ? (
                  <>
                    <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, background: 'white', zIndex: 10 }}>
                      <h2 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600 }}>Edit Section</h2>
                    </div>
                    <BlockEditor 
                      block={blocks.find(b => b.id === selectedBlockId) || null} 
                      onContentChange={handleContentChange} 
                      theme={user.theme} 
                    />
                  </>
                ) : (
                  <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
                    Select a section to edit
                  </div>
                )}
              </div>
            </>
          )}
        </>
      </main>
    </div>
  )
}
