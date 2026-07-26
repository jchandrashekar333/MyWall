'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateBlockContent(blockId: string, content: any) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('blocks')
    .update({ content })
    .eq('id', blockId)

  if (error) {
    console.error('Error updating block:', error)
    return { error: error.message }
  }
  return { success: true }
}

export async function toggleBlockEnabled(blockId: string, enabled: boolean) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('blocks')
    .update({ enabled })
    .eq('id', blockId)

  if (error) {
    console.error('Error toggling block:', error)
    return { error: error.message }
  }
  revalidatePath('/dashboard')
  return { success: true }
}

export async function togglePublish(pageId: string, published: boolean) {
  const supabase = await createClient()
  const { error, data } = await supabase
    .from('pages')
    .update({ 
      published,
      published_at: published ? new Date().toISOString() : null 
    })
    .eq('id', pageId)
    .select()

  if (error) {
    return { error: error.message }
  }
  if (!data || data.length === 0) {
    console.error('togglePublish failed: No rows updated. RLS issue or wrong pageId.')
    return { error: 'Failed to update publication status' }
  }
  revalidatePath('/dashboard')
  revalidatePath('/[handle]', 'page')
  return { success: true }
}

export async function updateTheme(userId: string, theme: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('users')
    .update({ theme })
    .eq('id', userId)

  if (error) {
    return { error: error.message }
  }
  revalidatePath('/dashboard')
  return { success: true }
}

export async function updateFunSettings(pageId: string, settings: any) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('pages')
    .update({ fun_settings: settings })
    .eq('id', pageId)

  if (error) {
    console.error('Error updating fun settings:', error)
    return { error: error.message }
  }
  revalidatePath('/dashboard')
  return { success: true }
}

// Widget Actions (Fun Mode)
export async function createWidget(pageId: string, type: string, content: any, x: number, y: number, w: number, h: number) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('widgets')
    .insert([{ page_id: pageId, type, content, grid_x: x, grid_y: y, grid_w: w, grid_h: h }])
    .select()
    .single()

  if (error) {
    console.error('Error creating widget:', error)
    return { error: error.message }
  }
  revalidatePath('/dashboard')
  return { success: true, widget: data }
}

export async function updateWidgetContent(widgetId: string, content: any) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('widgets')
    .update({ content })
    .eq('id', widgetId)

  if (error) {
    console.error('Error updating widget:', error)
    return { error: error.message }
  }
  return { success: true }
}

export async function deleteWidget(widgetId: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('widgets')
    .delete()
    .eq('id', widgetId)

  if (error) {
    console.error('Error deleting widget:', error)
    return { error: error.message }
  }
  revalidatePath('/dashboard')
  return { success: true }
}

export async function updateWidgetLayout(updates: {id: string, x: number, y: number, w: number, h: number}[]) {
  const supabase = await createClient()
  
  // Supabase JS doesn't support bulk update easily without an RPC, so we do it in a loop for MVP
  // or Promise.all since the number of widgets is small.
  const promises = updates.map(update => 
    supabase.from('widgets').update({
      grid_x: update.x,
      grid_y: update.y,
      grid_w: update.w,
      grid_h: update.h
    }).eq('id', update.id)
  )

  await Promise.all(promises)
  return { success: true }
}

// Migration: ensure all core blocks exist for existing users
export async function ensureMissingBlocks(pageId: string, missingTypes?: string[]) {
  const supabase = await createClient()
  
  const coreBlocks = [
    { type: 'hero', enabled: true, content: { name: '', role: '', tagline: '', location: '' }, sort_order: 1 },
    { type: 'links', enabled: true, content: { links: [] }, sort_order: 2 },
    { type: 'about', enabled: true, content: { text: '' }, sort_order: 3 },
    { type: 'timeline', enabled: true, content: { label: 'Experience', entries: [] }, sort_order: 4 },
    { type: 'education', enabled: true, content: { entries: [] }, sort_order: 5 },
    { type: 'work', enabled: true, content: { projects: [] }, sort_order: 6 },
    { type: 'skills', enabled: true, content: { tags: [] }, sort_order: 7 },
    { type: 'hobbies', enabled: true, content: { hobbies: [] }, sort_order: 8 },
    { type: 'achievements', enabled: true, content: { entries: [] }, sort_order: 9 },
    { type: 'products', enabled: true, content: { products: [] }, sort_order: 10 },
    { type: 'document', enabled: true, content: { files: [] }, sort_order: 11 },
    { type: 'contact', enabled: true, content: { email: '', socials: [] }, sort_order: 12 },
    { type: 'music', enabled: false, content: { song: '', artist: '', spotifyUrl: '' }, sort_order: 13 },
    { type: 'books', enabled: false, content: { currentBook: '', author: '', readingGoal: '' }, sort_order: 14 },
    { type: 'travel', enabled: false, content: { places: [], photos: [] }, sort_order: 15 },
    { type: 'portfolio', enabled: false, content: { pieces: [] }, sort_order: 16 },
    { type: 'movies', enabled: false, content: { favoriteFilms: [], letterboxdUrl: '' }, sort_order: 17 },
  ]

  let typesToAdd = missingTypes
  if (!typesToAdd) {
    // Get existing block types for this page
    const { data: existing } = await supabase
      .from('blocks')
      .select('type')
      .eq('page_id', pageId)
  
    const existingTypes = new Set((existing || []).map((b: any) => b.type))
    typesToAdd = coreBlocks.filter(b => !existingTypes.has(b.type)).map(b => b.type)
  }

  // Insert only the missing ones
  const missing = coreBlocks
    .filter(b => typesToAdd!.includes(b.type))
    .map(b => ({ page_id: pageId, ...b }))

  if (missing.length > 0) {
    const { error } = await supabase.from('blocks').upsert(missing, { onConflict: 'page_id,type', ignoreDuplicates: true })
    if (error) {
      console.error('Error inserting missing blocks:', error.message || error, JSON.stringify(error))
      return { error: error.message || 'Unknown error' }
    }
  }

  return { success: true, inserted: missing.length }
}

export async function updateBlockOrder(updates: { id: string, sort_order: number }[]) {
  const supabase = await createClient()
  for (const update of updates) {
    await supabase.from('blocks').update({ sort_order: update.sort_order }).eq('id', update.id)
  }
  return { success: true }
}
