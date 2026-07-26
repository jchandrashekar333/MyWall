import { notFound } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { PortfolioRenderer } from '@/components/PortfolioRenderer'
import { Block, Theme, Widget } from '@/types/portfolio'
import styles from './public.module.css'

export const dynamic = 'force-dynamic'

import { recordAnalyticsEvent } from '@/app/analytics/actions'

export default async function PublicPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params
  const supabase = await createClient()

  // 1. Fetch user by handle
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('id, theme')
    .eq('handle', handle)
    .single()

  if (!user) {
    notFound()
  }

  // 2. Fetch page by user_id
  const { data: page, error: pageError } = await supabase
    .from('pages')
    .select('id, published')
    .eq('user_id', user.id)
    .single()

  const fs = require('fs')
  fs.appendFileSync('debug.log', `[PublicPage] handle: ${handle}, user: ${JSON.stringify(user)}, userError: ${JSON.stringify(userError)}, page: ${JSON.stringify(page)}, pageError: ${JSON.stringify(pageError)}\n`)

  if (!page || !page.published) {
    // In a real app, you might want to allow the owner to see it even if unpublished,
    // but for MVP, we just rely on the dashboard for draft preview.
    return (
      <div className={styles.notPublished}>
        <h1>This portfolio isn&apos;t published yet.</h1>
      </div>
    )
  }

  // Fire analytics event in the background (no await)
  recordAnalyticsEvent(page.id, 'page_view')

  // 3. Fetch blocks and widgets
  const { data: blocks } = await supabase
    .from('blocks')
    .select('*')
    .eq('page_id', page.id)
    .order('sort_order')
    
  const { data: widgets } = await supabase
    .from('widgets')
    .select('*')
    .eq('page_id', page.id)



  return (
    <main>
      <PortfolioRenderer blocks={(blocks as Block[]) || []} theme={user.theme as Theme} funSettings={(page as any)?.fun_settings} />
    </main>
  )
}
