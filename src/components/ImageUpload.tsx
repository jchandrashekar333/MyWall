'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import imageCompression from 'browser-image-compression'

interface ImageUploadProps {
  onUploadSuccess: (url: string) => void
  currentImageUrl?: string
  label?: string
}

export function ImageUpload({ onUploadSuccess, currentImageUrl, label = "Upload Image" }: ImageUploadProps) {
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
      if (!user) throw new Error("Must be logged in to upload")

      // Compress image
      const options = {
        maxSizeMB: 5,
        maxWidthOrHeight: 1920,
        useWebWorker: true
      }
      
      const compressedFile = await imageCompression(file, options)
      
      // Upload to Supabase Storage
      const fileExt = compressedFile.name.split('.').pop()
      const fileName = `${user.id}/${Math.random().toString(36).substring(2)}.${fileExt}`
      
      const { error: uploadError, data } = await supabase.storage
        .from('portfolio-assets')
        .upload(fileName, compressedFile)
        
      if (uploadError) throw uploadError
      
      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('portfolio-assets')
        .getPublicUrl(data.path)
        
      onUploadSuccess(publicUrlData.publicUrl)
      
    } catch (err: any) {
      console.error('Upload error:', err)
      setError(err.message || 'Error uploading image')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {label && <label style={{ fontSize: '0.875rem', fontWeight: 500, color: '#4b5563' }}>{label}</label>}
      
      {currentImageUrl && (
        <div style={{ position: 'relative', width: 'fit-content' }}>
          <img 
            src={currentImageUrl} 
            alt="Current" 
            style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} 
          />
          <button
            type="button"
            onClick={() => {
              if (confirm('Are you sure you want to remove this image?')) {
                onUploadSuccess('')
              }
            }}
            style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
            title="Remove image"
          >
            ×
          </button>
        </div>
      )}
      
      <input 
        type="file" 
        accept="image/jpeg, image/png, image/webp"
        onChange={handleFileChange}
        disabled={uploading}
        style={{ fontSize: '0.875rem' }}
      />
      
      {uploading && <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Uploading...</span>}
      {error && <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>{error}</span>}
    </div>
  )
}
