'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'

interface FileUploadProps {
  onUploadSuccess: (url: string) => void
  currentUrl?: string
  label?: string
  accept?: string
  type?: 'audio' | 'image' | 'file'
}

export function FileUpload({ onUploadSuccess, currentUrl, label = "Upload File", accept = "*/*", type = 'file' }: FileUploadProps) {
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

      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}/${Math.random().toString(36).substring(2)}.${fileExt}`
      
      const { error: uploadError, data } = await supabase.storage
        .from('portfolio-assets')
        .upload(fileName, file)
        
      if (uploadError) throw uploadError
      
      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('portfolio-assets')
        .getPublicUrl(data.path)
        
      onUploadSuccess(publicUrlData.publicUrl)
      
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
      
      {currentUrl && type === 'audio' && (
        <audio controls src={currentUrl} style={{ width: '100%' }} />
      )}
      
      {currentUrl && type === 'image' && (
        <img 
          src={currentUrl} 
          alt="Current" 
          style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} 
        />
      )}
      
      <input 
        type="file" 
        accept={accept}
        onChange={handleFileChange}
        disabled={uploading}
        style={{ fontSize: '0.875rem' }}
      />
      
      {uploading && <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Uploading...</span>}
      {error && <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>{error}</span>}
    </div>
  )
}
