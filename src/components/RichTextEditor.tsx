'use client'

import React, { useMemo, useId, useRef } from 'react'
import dynamic from 'next/dynamic'
import 'react-quill-new/dist/quill.snow.css'

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const FORMATS = [
  'bold', 'italic', 'underline', 'strike',
  'color', 'background',
  'align',
  'link'
]

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const quillRef = useRef<any>(null)
  const baseId = useId().replace(/:/g, '')
  const toolbarId = `toolbar-${baseId}`

  // Define modules for the toolbar using the standard array to preserve default behaviors
  const modules = useMemo(() => ({
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      [{ 'color': [] }, { 'background': [] }],   // dropdown with defaults from theme
      [{ 'align': [] }],
      ['link'],
      ['clean']                                  // remove formatting button
    ],
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true
    }
  }), [])

  const handleUndo = () => {
    if (quillRef.current) {
      quillRef.current.getEditor().history.undo()
    }
  }

  const handleRedo = () => {
    if (quillRef.current) {
      quillRef.current.getEditor().history.redo()
    }
  }

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', border: '1px solid #d1d5db', display: 'flex', flexDirection: 'column' }}>
      
      {/* External Undo/Redo Controls */}
      <div style={{ padding: '8px', borderBottom: '1px solid #d1d5db', display: 'flex', gap: '8px', backgroundColor: '#f8fafc' }}>
        <button 
          onClick={handleUndo}
          style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.875rem' }}
          title="Undo"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>
          Undo
        </button>
        <button 
          onClick={handleRedo}
          style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.875rem' }}
          title="Redo"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"/></svg>
          Redo
        </button>
      </div>

      <ReactQuill
        // @ts-ignore
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={FORMATS}
        placeholder={placeholder || 'Write something amazing...'}
        style={{ minHeight: '100px' }}
      />
    </div>
  )
}
