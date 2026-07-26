'use client'

import React, { useState, useEffect, useCallback } from 'react'
import styles from './fun-settings.module.css'
import { FolderOpen, Upload, Pen, Settings2, HelpCircle, Star, Diamond } from 'lucide-react'
import { FunSettings } from '@/types/portfolio'
import { updateFunSettings } from './actions'
import { MediaUpload } from '@/components/MediaUpload'
import { ImageUpload } from '@/components/ImageUpload'
import { FileUpload } from '@/components/FileUpload'

export default function FunSettingsPanel({ page }: { page: any }) {
  const [settings, setSettings] = useState<FunSettings>(page?.fun_settings || {})
  const [isSaving, setIsSaving] = useState(false)

  const saveSettings = useCallback(async (newSettings: FunSettings) => {
    setIsSaving(true)
    await updateFunSettings(page.id, newSettings)
    setIsSaving(false)
  }, [page.id])

  // Debounced save
  useEffect(() => {
    const timer = setTimeout(() => {
      // Only save if settings actually changed from page.fun_settings
      // In a real app we'd deep compare, but for now we just save after 1s of inactivity
      saveSettings(settings)
    }, 1000)
    return () => clearTimeout(timer)
  }, [settings, saveSettings])

  const handleChange = (updates: Partial<FunSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }))
  }

  return (
    <div className={styles.container}>
      {/* Top Cards */}
      <div className={styles.topGrid}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>Background</div>
          <div className={styles.cardContent}>
            <MediaUpload
              label="Upload Image or Video"
              currentUrl={settings.backgroundUrl}
              currentType={settings.backgroundType}
              onUploadSuccess={(url, type) => handleChange({ backgroundUrl: url, backgroundType: type })}
            />
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>Audio</div>
          <div className={styles.cardContent}>
            <FileUpload
              label="Upload Audio File"
              accept="audio/*"
              type="audio"
              currentUrl={settings.audioUrl}
              onUploadSuccess={(url) => handleChange({ audioUrl: url })}
            />
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>Profile Avatar</div>
          <div className={styles.cardContent}>
            <ImageUpload
              label="Upload Profile Avatar"
              currentImageUrl={settings.avatarUrl}
              onUploadSuccess={(url) => handleChange({ avatarUrl: url })}
            />
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>Custom Cursor</div>
          <div className={styles.cardContent}>
            <FileUpload
              label="Upload Custom Cursor"
              accept="image/png, image/jpeg, image/webp, .cur"
              type="image"
              currentUrl={settings.cursorUrl}
              onUploadSuccess={(url) => handleChange({ cursorUrl: url })}
            />
          </div>
        </div>
      </div>

      {/* Premium Banner */}
      <div className={styles.premiumBanner}>
        Want exclusive features? Unlock more with <Diamond size={16} color="#c084fc" /> Premium
      </div>

      {/* General Customization */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>General Customization</div>
        <div className={styles.settingsGrid}>
          
          <div className={styles.settingGroup}>
            <div className={styles.settingLabel}>Description</div>
            <div className={styles.inputBox}>
              <input 
                type="text" 
                value={settings.description || ''} 
                onChange={e => handleChange({ description: e.target.value })}
                placeholder="Travel & Everyday Conversation"
                style={{ background: 'transparent', border: 'none', color: 'inherit', width: '100%', outline: 'none' }}
              />
              <Pen size={14} className={styles.editIcon} />
            </div>
          </div>

          <div className={styles.settingGroup}>
            <div className={styles.settingLabel}>Discord Presence</div>
            <div className={styles.inputBox}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: settings.discordPresenceEnabled ? '#22c55e' : '#737373' }}></div>
                <select 
                  value={settings.discordPresenceEnabled ? 'enabled' : 'disabled'}
                  onChange={e => handleChange({ discordPresenceEnabled: e.target.value === 'enabled' })}
                  style={{ background: 'transparent', border: 'none', color: 'inherit', outline: 'none', cursor: 'pointer' }}
                >
                  <option value="enabled">Enabled</option>
                  <option value="disabled">Disabled</option>
                </select>
              </div>
              <Settings2 size={16} className={styles.editIcon} />
            </div>
          </div>

          <div className={styles.settingGroup} style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <div style={{ flex: 1 }}>
                <div className={styles.settingLabel}>Background Opacity <HelpCircle size={12} /></div>
                <div style={{ marginTop: '1rem' }}>
                  <input 
                    type="range" 
                    className={styles.rangeSlider} 
                    min="0" max="100" 
                    value={settings.backgroundOpacity ?? 100} 
                    onChange={e => handleChange({ backgroundOpacity: parseInt(e.target.value) })}
                  />
                  <div className={styles.rangeLabels}>
                    <span>0%</span><span>50%</span><span>100%</span>
                  </div>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div className={styles.settingLabel}>Profile Blur <HelpCircle size={12} /></div>
                <div style={{ marginTop: '1rem' }}>
                  <input 
                    type="range" 
                    className={styles.rangeSlider} 
                    min="0" max="100" 
                    value={settings.profileBlur ?? 20}
                    onChange={e => handleChange({ profileBlur: parseInt(e.target.value) })}
                  />
                  <div className={styles.rangeLabels}>
                    <span>0</span><span>20px</span><span>60px</span><span>100px</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.settingGroup}>
            <div className={styles.settingLabel}>Location</div>
            <div className={styles.inputBox}>
              📍 <input 
                type="text" 
                value={settings.location || ''} 
                onChange={e => handleChange({ location: e.target.value })}
                placeholder="My Location"
                style={{ background: 'transparent', border: 'none', color: 'inherit', width: '100%', outline: 'none', marginLeft: '0.5rem' }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Color Customization */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Color Customization</div>
        <div className={styles.settingsGrid}>
          
          <div className={styles.settingGroup}>
            <div className={styles.settingLabel}>Accent Color</div>
            <div className={styles.colorInputWrapper}>
              <input type="color" value={settings.accentColor || '#000000'} onChange={e => handleChange({ accentColor: e.target.value })} className={styles.colorSwatch} />
              <div className={styles.colorText}>{settings.accentColor || '#000000'}</div>
            </div>
          </div>

          <div className={styles.settingGroup}>
            <div className={styles.settingLabel}>Text Color</div>
            <div className={styles.colorInputWrapper}>
              <input type="color" value={settings.textColor || '#ffffff'} onChange={e => handleChange({ textColor: e.target.value })} className={styles.colorSwatch} />
              <div className={styles.colorText}>{settings.textColor || '#ffffff'}</div>
            </div>
          </div>

          <div className={styles.settingGroup} style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <div style={{ flex: 1 }} className={styles.settingGroup}>
                <div className={styles.settingLabel}>Primary Color</div>
                <div className={styles.colorInputWrapper}>
                  <input type="color" value={settings.primaryColor || '#171717'} onChange={e => handleChange({ primaryColor: e.target.value })} className={styles.colorSwatch} />
                  <div className={styles.colorText}>{settings.primaryColor || '#171717'}</div>
                </div>
              </div>
              <div style={{ flex: 1 }} className={styles.settingGroup}>
                <div className={styles.settingLabel}>Secondary Color</div>
                <div className={styles.colorInputWrapper}>
                  <input type="color" value={settings.secondaryColor || '#000000'} onChange={e => handleChange({ secondaryColor: e.target.value })} className={styles.colorSwatch} />
                  <div className={styles.colorText}>{settings.secondaryColor || '#000000'}</div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.settingGroup}>
            <div className={styles.settingLabel}>Background Color</div>
            <div className={styles.colorInputWrapper}>
              <input type="color" value={settings.backgroundColor || '#000000'} onChange={e => handleChange({ backgroundColor: e.target.value })} className={styles.colorSwatch} />
              <div className={styles.colorText}>{settings.backgroundColor || '#000000'}</div>
            </div>
          </div>

          <div className={styles.settingGroup}>
            <div className={styles.settingLabel}>Icon Color</div>
            <div className={styles.colorInputWrapper}>
              <input type="color" value={settings.iconColor || '#ffffff'} onChange={e => handleChange({ iconColor: e.target.value })} className={styles.colorSwatch} />
              <div className={styles.colorText}>{settings.iconColor || '#ffffff'}</div>
            </div>
          </div>

          <div className={styles.settingGroup}>
            <div className={styles.settingLabel}>Background Effect Color</div>
            <div className={styles.colorInputWrapper}>
              <input type="color" value={settings.backgroundEffectColor || '#ffffff'} onChange={e => handleChange({ backgroundEffectColor: e.target.value })} className={styles.colorSwatch} />
              <div className={styles.colorText}>{settings.backgroundEffectColor || '#ffffff'}</div>
            </div>
          </div>

        </div>
      </div>

      {/* Other Customization */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Other Customization {isSaving && <span style={{ fontSize: '0.8rem', color: '#a3a3a3', marginLeft: '1rem', fontWeight: 'normal' }}>(Saving...)</span>}</div>
        <div className={styles.settingsGrid} style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          
          <div className={styles.settingGroup}>
            <div className={styles.settingLabel}>Monochrome Icons <HelpCircle size={12} /></div>
            <label className={styles.switch}>
              <input type="checkbox" checked={settings.monochromeIcons ?? true} onChange={e => handleChange({ monochromeIcons: e.target.checked })} />
              <span className={styles.slider}></span>
            </label>
          </div>

          <div className={styles.settingGroup}>
            <div className={styles.settingLabel}>Animated Title</div>
            <label className={styles.switch}>
              <input type="checkbox" checked={settings.animatedTitle ?? true} onChange={e => handleChange({ animatedTitle: e.target.checked })} />
              <span className={styles.slider}></span>
            </label>
          </div>

          <div className={styles.settingGroup}>
            <div className={styles.settingLabel}>Swap Box Colors <HelpCircle size={12} /></div>
            <label className={styles.switch}>
              <input type="checkbox" checked={settings.swapBoxColors ?? true} onChange={e => handleChange({ swapBoxColors: e.target.checked })} />
              <span className={styles.slider}></span>
            </label>
          </div>
          
          <div className={styles.settingGroup}></div>

          <div className={styles.settingGroup}>
            <div className={styles.settingLabel}>Volume Control</div>
            <label className={styles.switch}>
              <input type="checkbox" checked={settings.volumeControl ?? true} onChange={e => handleChange({ volumeControl: e.target.checked })} />
              <span className={styles.slider}></span>
            </label>
          </div>

          <div className={styles.settingGroup}>
            <div className={styles.settingLabel}>Use Discord Avatar</div>
            <label className={styles.switch}>
              <input type="checkbox" checked={settings.useDiscordAvatar ?? false} onChange={e => handleChange({ useDiscordAvatar: e.target.checked })} />
              <span className={styles.slider}></span>
            </label>
          </div>

          <div className={styles.settingGroup}>
            <div className={styles.settingLabel}>Discord Avatar Decoration</div>
            <label className={styles.switch}>
              <input type="checkbox" checked={settings.discordAvatarDecoration ?? true} onChange={e => handleChange({ discordAvatarDecoration: e.target.checked })} />
              <span className={styles.slider}></span>
            </label>
          </div>

        </div>
      </div>

    </div>
  )
}
