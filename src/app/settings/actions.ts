'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateHandle(newHandle: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  // Basic validation
  const cleanHandle = newHandle.trim().toLowerCase()
  if (cleanHandle.length < 3) return { error: 'Handle must be at least 3 characters' }
  if (!/^[a-z0-9_-]+$/.test(cleanHandle)) return { error: 'Handle can only contain letters, numbers, underscores, and dashes' }

  // Check if handle is already taken
  const { data: existingUser } = await supabase
    .from('users')
    .select('id')
    .eq('handle', cleanHandle)
    .single()

  if (existingUser && existingUser.id !== user.id) {
    return { error: 'This handle is already taken' }
  }

  // Update handle in users table
  const { error: updateError } = await supabase
    .from('users')
    .update({ handle: cleanHandle })
    .eq('id', user.id)

  if (updateError) {
    console.error('Error updating handle:', updateError)
    return { error: 'Failed to update handle' }
  }

  revalidatePath('/dashboard')
  return { success: true, handle: cleanHandle }
}

export async function updateAccountSecurity(email?: string, password?: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const updates: any = {}
  if (email && email.trim() !== '' && email !== user.email) {
    updates.email = email.trim()
  }
  if (password && password.trim() !== '') {
    if (password.length < 6) return { error: 'Password must be at least 6 characters' }
    updates.password = password
  }

  if (Object.keys(updates).length === 0) {
    return { error: 'No changes to save' }
  }

  // Update in Auth
  const { error: authError } = await supabase.auth.updateUser(updates)

  if (authError) {
    console.error('Error updating security:', authError)
    return { error: authError.message }
  }

  // If email was updated, update it in public.users as well
  if (updates.email) {
    await supabase
      .from('users')
      .update({ email: updates.email })
      .eq('id', user.id)
  }

  return { 
    success: true, 
    message: updates.email 
      ? 'Security updated! Please check your new email for a confirmation link.' 
      : 'Password updated successfully!'
  }
}
