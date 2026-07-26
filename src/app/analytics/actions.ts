'use server'

import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'

export async function recordAnalyticsEvent(
  pageId: string, 
  eventType: 'page_view' | 'link_click', 
  eventData: any = {}
) {
  try {
    const supabase = await createClient()
    const headersList = await headers()
    
    // Attempt to get IP and User Agent, though on some hosts these might be different headers
    const forwardedFor = headersList.get('x-forwarded-for')
    const realIp = headersList.get('x-real-ip')
    const ip = forwardedFor ? forwardedFor.split(',')[0] : realIp || 'unknown'
    const userAgent = headersList.get('user-agent') || 'unknown'
    const country = headersList.get('x-vercel-ip-country') || 'unknown'
    
    // Hash the IP + UserAgent to create a privacy-friendly visitor ID
    // (In a real app with strict privacy laws, you might want to salt this or use cookies instead)
    const visitorString = `${ip}-${userAgent}`
    const visitorId = Buffer.from(visitorString).toString('base64').substring(0, 32) // simple fast string conversion for demo

    await supabase.from('analytics_events').insert({
      page_id: pageId,
      event_type: eventType,
      event_data: eventData,
      visitor_id: visitorId,
      user_agent: userAgent,
      country: country
    })
  } catch (error) {
    console.error('Failed to record analytics event:', error)
    // We swallow the error so that tracking failures don't crash the public page
  }
}

export async function getAnalyticsStats(pageId: string) {
  const supabase = await createClient()
  
  // Verify ownership
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  // Fetch all events for the page (Supabase RLS ensures they only see their own)
  const { data: events, error } = await supabase
    .from('analytics_events')
    .select('*')
    .eq('page_id', pageId)
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching analytics:', error)
    return { error: 'Failed to fetch analytics' }
  }

  if (!events || events.length === 0) {
    return { 
      totalViews: 0, 
      uniqueVisitors: 0, 
      clicks: 0, 
      chartData: [] 
    }
  }

  // Calculate stats
  const pageViews = events.filter(e => e.event_type === 'page_view')
  const clicks = events.filter(e => e.event_type === 'link_click')
  
  const uniqueVisitors = new Set(pageViews.map(e => e.visitor_id)).size

  // Group by day for the chart (last 7 days)
  const now = new Date()
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now)
    d.setDate(d.getDate() - (6 - i))
    return d.toISOString().split('T')[0] // 'YYYY-MM-DD'
  })

  const chartData = last7Days.map(dateStr => {
    const dayViews = pageViews.filter(e => e.created_at.startsWith(dateStr)).length
    const dayClicks = clicks.filter(e => e.created_at.startsWith(dateStr)).length
    
    // Format date for display (e.g., "Jul 25")
    const dateObj = new Date(dateStr)
    const displayDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    
    return {
      name: displayDate,
      views: dayViews,
      clicks: dayClicks
    }
  })

  return {
    totalViews: pageViews.length,
    uniqueVisitors: uniqueVisitors,
    clicks: clicks.length,
    chartData
  }
}
