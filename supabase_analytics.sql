-- Analytics Events Table
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id UUID REFERENCES public.pages(id) ON DELETE CASCADE NOT NULL,
  event_type TEXT NOT NULL, -- e.g., 'page_view', 'link_click'
  event_data JSONB DEFAULT '{}'::jsonb,
  visitor_id TEXT, -- to track unique visitors (could be a hash of IP + user agent, or a session cookie)
  user_agent TEXT,
  country TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Anyone can insert analytics events" ON public.analytics_events;
DROP POLICY IF EXISTS "Users can view analytics for their own pages" ON public.analytics_events;

-- Policies
-- 1. Allow anyone (including unauthenticated visitors) to INSERT events
CREATE POLICY "Anyone can insert analytics events" ON public.analytics_events
  FOR INSERT WITH CHECK (true);

-- 2. Only allow the page owner to SELECT (view) their own analytics
CREATE POLICY "Users can view analytics for their own pages" ON public.analytics_events
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.pages 
      WHERE pages.id = analytics_events.page_id AND pages.user_id = auth.uid()
    )
  );
