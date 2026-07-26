import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import DashboardClient from './DashboardClient'

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  // Fetch user details
  const { data: userData } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!userData) {
    return <div>Error loading user data</div>
  }

  // Fetch page details
  const { data: page } = await supabase
    .from('pages')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (!page) {
    return <div>Error loading page data</div>
  }

  // Fetch blocks
  const { data: blocks } = await supabase
    .from('blocks')
    .select('*')
    .eq('page_id', page.id)
    .order('sort_order')

  // Auto-migrate: ensure all 12 core blocks exist for this user
  const coreTypes = ['hero', 'links', 'about', 'timeline', 'education', 'work', 'skills', 'hobbies', 'achievements', 'products', 'document', 'contact', 'music', 'books', 'travel', 'portfolio', 'movies']
  const existingTypes = new Set((blocks || []).map((b: any) => b.type))
  const missingTypes = coreTypes.filter(t => !existingTypes.has(t))
  
  let finalBlocks = blocks || []
  if (missingTypes.length > 0) {
    const { ensureMissingBlocks } = await import('./actions')
    await ensureMissingBlocks(page.id, missingTypes)
    // Re-fetch blocks after migration
    const { data: updatedBlocks } = await supabase
      .from('blocks')
      .select('*')
      .eq('page_id', page.id)
      .order('sort_order')
    // Use updatedBlocks below
    finalBlocks = updatedBlocks || []
  }

  // Fetch widgets (for Fun mode)
  const { data: widgets } = await supabase
    .from('widgets')
    .select('*')
    .eq('page_id', page.id)

  return (
    <DashboardClient 
      user={userData} 
      page={page} 
      initialBlocks={finalBlocks} 
      initialWidgets={widgets || []}
    />
  )
}
