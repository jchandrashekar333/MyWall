'use client'

import React from 'react'
import styles from './dashboard.module.css'
import { Layout, Palette, FileText, BarChart2, Settings, HelpCircle, Bell, Sparkles } from 'lucide-react'

interface SidebarNavProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  className?: string
}

export default function SidebarNav({ activeTab, setActiveTab, className = '' }: SidebarNavProps) {
  const tabs = [
    { id: 'sections', label: 'Sections', icon: Layout },
    { id: 'theme', label: 'Theme', icon: Palette },
    { id: 'pages', label: 'Pages', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  const bottomTabs = [
    { id: 'help', label: 'Help', icon: HelpCircle },
    { id: 'whatsnew', label: "What's New", icon: Bell },
  ]

  return (
    <div className={`${styles.sidebarNav} ${className}`}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
        {tabs.map(tab => {
          const Icon = tab.icon
          return (
            <button 
              key={tab.id}
              className={`${styles.navItem} ${activeTab === tab.id ? styles.active : ''}`}
              onClick={() => setActiveTab(tab.id)}
              suppressHydrationWarning
            >
              <Icon size={20} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
        {bottomTabs.map(tab => {
          const Icon = tab.icon
          return (
            <button 
              key={tab.id}
              className={`${styles.navItem} ${activeTab === tab.id ? styles.active : ''}`}
              onClick={() => setActiveTab(tab.id)}
              suppressHydrationWarning
            >
              <Icon size={20} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
