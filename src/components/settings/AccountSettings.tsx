'use client'

import React, { useState } from 'react'
import { Settings, Save, AtSign, Mail, Lock } from 'lucide-react'
import { updateHandle, updateAccountSecurity } from '@/app/settings/actions'

interface AccountSettingsProps {
  initialHandle: string
  initialEmail: string
}

export default function AccountSettings({ initialHandle, initialEmail }: AccountSettingsProps) {
  const [handle, setHandle] = useState(initialHandle)
  const [email, setEmail] = useState(initialEmail)
  const [password, setPassword] = useState('')
  
  const [handleStatus, setHandleStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const [securityStatus, setSecurityStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  
  const [isSavingHandle, setIsSavingHandle] = useState(false)
  const [isSavingSecurity, setIsSavingSecurity] = useState(false)

  const handleSaveProfileUrl = async () => {
    setHandleStatus(null)
    setIsSavingHandle(true)
    const res = await updateHandle(handle)
    if (res.error) {
      setHandleStatus({ type: 'error', message: res.error })
    } else {
      setHandleStatus({ type: 'success', message: 'Handle updated successfully!' })
      // Update browser URL without reload if needed, but dashboard just reads from user prop
    }
    setIsSavingHandle(false)
  }

  const handleSaveSecurity = async () => {
    setSecurityStatus(null)
    setIsSavingSecurity(true)
    const res = await updateAccountSecurity(email, password)
    if (res.error) {
      setSecurityStatus({ type: 'error', message: res.error })
    } else {
      setSecurityStatus({ type: 'success', message: res.message || 'Security updated successfully!' })
      setPassword('') // Clear password field
    }
    setIsSavingSecurity(false)
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', width: '100%', overflowY: 'auto' }}>
      
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Settings size={28} color="#0f172a" />
          <h2 style={{ fontSize: '1.875rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Account Settings</h2>
        </div>
        <p style={{ color: '#64748b', margin: 0 }}>Manage your profile URL and account security.</p>
      </div>

      {/* Profile URL Section */}
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', margin: '0 0 1.5rem 0' }}>Profile URL</h3>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#475569', marginBottom: '0.5rem' }}>Username / Handle</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0.75rem 1rem' }}>
            <AtSign size={18} color="#94a3b8" />
            <span style={{ color: '#64748b', userSelect: 'none' }}>localhost:3000/</span>
            <input 
              type="text" 
              value={handle} 
              onChange={e => setHandle(e.target.value)}
              placeholder="username"
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#0f172a', fontWeight: 500, fontSize: '1rem' }}
            />
          </div>
          <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem' }}>This is your unique link. Changing it will break old links!</p>
        </div>

        {handleStatus && (
          <div style={{ padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.875rem', fontWeight: 500, backgroundColor: handleStatus.type === 'error' ? '#fee2e2' : '#dcfce3', color: handleStatus.type === 'error' ? '#dc2626' : '#166534' }}>
            {handleStatus.message}
          </div>
        )}

        <button 
          onClick={handleSaveProfileUrl} 
          disabled={isSavingHandle || handle === initialHandle}
          style={{ 
            display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#0f172a', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 500, cursor: isSavingHandle || handle === initialHandle ? 'not-allowed' : 'pointer', opacity: isSavingHandle || handle === initialHandle ? 0.7 : 1, transition: 'all 0.2s' 
          }}
        >
          <Save size={18} />
          {isSavingHandle ? 'Saving...' : 'Save URL'}
        </button>
      </div>

      {/* Security Section */}
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', margin: '0 0 1.5rem 0' }}>Account Security</h3>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#475569', marginBottom: '0.5rem' }}>Email Address</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0.75rem 1rem' }}>
            <Mail size={18} color="#94a3b8" />
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)}
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#0f172a', fontWeight: 500, fontSize: '1rem' }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#475569', marginBottom: '0.5rem' }}>New Password</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0.75rem 1rem' }}>
            <Lock size={18} color="#94a3b8" />
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)}
              placeholder="Leave blank to keep current password"
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#0f172a', fontWeight: 500, fontSize: '1rem' }}
            />
          </div>
        </div>

        {securityStatus && (
          <div style={{ padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.875rem', fontWeight: 500, backgroundColor: securityStatus.type === 'error' ? '#fee2e2' : '#dcfce3', color: securityStatus.type === 'error' ? '#dc2626' : '#166534' }}>
            {securityStatus.message}
          </div>
        )}

        <button 
          onClick={handleSaveSecurity} 
          disabled={isSavingSecurity || (email === initialEmail && password === '')}
          style={{ 
            display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#0f172a', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 500, cursor: isSavingSecurity || (email === initialEmail && password === '') ? 'not-allowed' : 'pointer', opacity: isSavingSecurity || (email === initialEmail && password === '') ? 0.7 : 1, transition: 'all 0.2s' 
          }}
        >
          <Save size={18} />
          {isSavingSecurity ? 'Saving...' : 'Update Security'}
        </button>
      </div>

    </div>
  )
}
