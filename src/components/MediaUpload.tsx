'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import imageCompression from 'browser-image-compression'

interface MediaUploadProps {
  onUploadSuccess: (url: string, type: 'image' | 'video') => void
  currentUrl?: string
  currentType?: 'image' | 'video'
  label?: string
}

export function MediaUpload({ onUploadSuccess, currentUrl, currentType, label = 'Upload Media' }: MediaUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError(null)

    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Must be logged in to upload')

      const isVideo = file.type.startsWith('video/')
      let uploadFile: File | Blob = file

      if (!isVideo) {
        uploadFile = await imageCompression(file, {
          maxSizeMB: 5,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        })
      }

      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}/${Math.random().toString(36).substring(2)}.${fileExt}`

      const { error: uploadError, data } = await supabase.storage
        .from('portfolio-assets')
        .upload(fileName, uploadFile)

      if (uploadError) throw uploadError

      const { data: publicUrlData } = supabase.storage
        .from('portfolio-assets')
        .getPublicUrl(data.path)

      onUploadSuccess(publicUrlData.publicUrl, isVideo ? 'video' : 'image')
    } catch (err: any) {
      console.error('Upload error:', err)
      setError(err.message || 'Error uploading file')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label style={{ fontSize: '0.875rem', fontWeight: 500, color: '#4b5563' }}>{label}</label>

      {currentUrl && (
        <div style={{ position: 'relative', width: '100%' }}>
          {currentType === 'video' ? (
            <video
              src={currentUrl}
              muted
              style={{ width: '100%', maxHeight: '120px', objectFit: 'cover', borderRadius: '8px', background: '#000' }}
            />
          ) : (
            <img
              src={currentUrl}
              alt="Banner"
              style={{ width: '100%', maxHeight: '120px', objectFit: 'cover', borderRadius: '8px' }}
            />
          )}
          <button
            type="button"
            onClick={() => {
              if (confirm('Are you sure you want to remove this media?')) {
                onUploadSuccess('', 'image')
              }
            }}
            style={{ position: 'absolute', top: '8px', right: '8px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}
            title="Remove media"
          >
            ×
          </button>
        </div>
      )}

      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,video/mp4,video/webm,video/ogg"
        onChange={handleFileChange}
        disabled={uploading}
        style={{ fontSize: '0.875rem' }}
      />
      <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Accepts: JPG, PNG, WebP, MP4, WebM</span>

      {uploading && <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Uploading...</span>}
      {error && <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>{error}</span>}
    </div>
  )
}
