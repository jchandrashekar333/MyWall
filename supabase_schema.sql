-- User profiles extending auth.users
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  handle TEXT UNIQUE NOT NULL,
  theme TEXT NOT NULL DEFAULT 'professional',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Pages representing portfolios
CREATE TABLE IF NOT EXISTS public.pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  published BOOLEAN DEFAULT false NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE,
  fun_settings JSONB DEFAULT '{}'::jsonb
);

-- Blocks belonging to a page
CREATE TABLE IF NOT EXISTS public.blocks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id UUID REFERENCES public.pages(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL,
  enabled BOOLEAN DEFAULT false NOT NULL,
  content JSONB DEFAULT '{}'::jsonb NOT NULL,
  sort_order INTEGER NOT NULL,
  UNIQUE (page_id, type)
);

-- Widgets for Fun mode
CREATE TABLE IF NOT EXISTS public.widgets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id UUID REFERENCES public.pages(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL,
  enabled BOOLEAN DEFAULT true NOT NULL,
  content JSONB DEFAULT '{}'::jsonb NOT NULL,
  grid_x INTEGER NOT NULL DEFAULT 0,
  grid_y INTEGER NOT NULL DEFAULT 0,
  grid_w INTEGER NOT NULL DEFAULT 1,
  grid_h INTEGER NOT NULL DEFAULT 1
);

-- Assets belonging to a page
CREATE TABLE IF NOT EXISTS public.assets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id UUID REFERENCES public.pages(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL,
  url TEXT NOT NULL,
  alt_text TEXT
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.widgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assets ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Public pages are viewable by everyone" ON public.pages;
DROP POLICY IF EXISTS "Blocks on published pages are viewable by everyone" ON public.blocks;
DROP POLICY IF EXISTS "Assets on published pages are viewable by everyone" ON public.assets;
DROP POLICY IF EXISTS "Users can manage their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can manage their own page" ON public.pages;
DROP POLICY IF EXISTS "Users can manage blocks on their own page" ON public.blocks;
DROP POLICY IF EXISTS "Users can manage widgets on their own page" ON public.widgets;
DROP POLICY IF EXISTS "Users can manage assets on their own page" ON public.assets;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.users;
DROP POLICY IF EXISTS "Widgets on published pages are viewable by everyone" ON public.widgets;

-- Policies for public access to published pages and blocks
CREATE POLICY "Public profiles are viewable by everyone" ON public.users
  FOR SELECT USING (true);

CREATE POLICY "Public pages are viewable by everyone" ON public.pages
  FOR SELECT USING (published = true);

CREATE POLICY "Blocks on published pages are viewable by everyone" ON public.blocks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.pages 
      WHERE pages.id = blocks.page_id AND pages.published = true
    )
  );

CREATE POLICY "Widgets on published pages are viewable by everyone" ON public.widgets
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.pages 
      WHERE pages.id = widgets.page_id AND pages.published = true
    )
  );

CREATE POLICY "Assets on published pages are viewable by everyone" ON public.assets
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.pages 
      WHERE pages.id = assets.page_id AND pages.published = true
    )
  );

-- Policies for users to manage their own data
CREATE POLICY "Users can manage their own profile" ON public.users
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "Users can manage their own page" ON public.pages
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage blocks on their own page" ON public.blocks
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.pages 
      WHERE pages.id = blocks.page_id AND pages.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage widgets on their own page" ON public.widgets
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.pages 
      WHERE pages.id = widgets.page_id AND pages.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage assets on their own page" ON public.assets
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.pages 
      WHERE pages.id = assets.page_id AND pages.user_id = auth.uid()
    )
  );

-- Function to handle new user creation automatically via a trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, handle)
  VALUES (
    new.id, 
    new.email, 
    COALESCE(new.raw_user_meta_data->>'handle', split_part(new.email, '@', 1) || '_' || substr(md5(random()::text), 1, 4))
  )
  ON CONFLICT (id) DO NOTHING;
  
  -- Create a default page for the user
  INSERT INTO public.pages (user_id) VALUES (new.id)
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call handle_new_user when an auth.user is created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Trigger to insert default blocks when a page is created
CREATE OR REPLACE FUNCTION public.handle_new_page()
RETURNS trigger AS $$
  -- Core 10 blocks (always created)
  INSERT INTO public.blocks (page_id, type, enabled, content, sort_order) VALUES (new.id, 'hero', true, '{"name": "", "role": "", "tagline": "", "location": ""}', 1) ON CONFLICT (page_id, type) DO NOTHING;
  INSERT INTO public.blocks (page_id, type, enabled, content, sort_order) VALUES (new.id, 'links', true, '{"links": []}', 2) ON CONFLICT (page_id, type) DO NOTHING;
  INSERT INTO public.blocks (page_id, type, enabled, content, sort_order) VALUES (new.id, 'about', true, '{"text": ""}', 3) ON CONFLICT (page_id, type) DO NOTHING;
  INSERT INTO public.blocks (page_id, type, enabled, content, sort_order) VALUES (new.id, 'timeline', true, '{"label": "Experience", "entries": []}', 4) ON CONFLICT (page_id, type) DO NOTHING;
  INSERT INTO public.blocks (page_id, type, enabled, content, sort_order) VALUES (new.id, 'education', true, '{"entries": []}', 5) ON CONFLICT (page_id, type) DO NOTHING;
  INSERT INTO public.blocks (page_id, type, enabled, content, sort_order) VALUES (new.id, 'work', true, '{"projects": []}', 6) ON CONFLICT (page_id, type) DO NOTHING;
  INSERT INTO public.blocks (page_id, type, enabled, content, sort_order) VALUES (new.id, 'skills', true, '{"tags": []}', 7) ON CONFLICT (page_id, type) DO NOTHING;
  INSERT INTO public.blocks (page_id, type, enabled, content, sort_order) VALUES (new.id, 'hobbies', true, '{"hobbies": []}', 8) ON CONFLICT (page_id, type) DO NOTHING;
  INSERT INTO public.blocks (page_id, type, enabled, content, sort_order) VALUES (new.id, 'achievements', true, '{"entries": []}', 9) ON CONFLICT (page_id, type) DO NOTHING;
  INSERT INTO public.blocks (page_id, type, enabled, content, sort_order) VALUES (new.id, 'products', true, '{"products": []}', 10) ON CONFLICT (page_id, type) DO NOTHING;
  INSERT INTO public.blocks (page_id, type, enabled, content, sort_order) VALUES (new.id, 'document', true, '{"files": []}', 11) ON CONFLICT (page_id, type) DO NOTHING;
  INSERT INTO public.blocks (page_id, type, enabled, content, sort_order) VALUES (new.id, 'contact', true, '{"email": "", "socials": []}', 12) ON CONFLICT (page_id, type) DO NOTHING;

  -- Optional blocks (disabled by default)
  INSERT INTO public.blocks (page_id, type, enabled, content, sort_order) VALUES (new.id, 'badge', false, '{"text": "", "icon": ""}', 13) ON CONFLICT (page_id, type) DO NOTHING;
  INSERT INTO public.blocks (page_id, type, enabled, content, sort_order) VALUES (new.id, 'video', false, '{"url": ""}', 14) ON CONFLICT (page_id, type) DO NOTHING;
  INSERT INTO public.blocks (page_id, type, enabled, content, sort_order) VALUES (new.id, 'gallery', false, '{"images": []}', 15) ON CONFLICT (page_id, type) DO NOTHING;
  INSERT INTO public.blocks (page_id, type, enabled, content, sort_order) VALUES (new.id, 'testimonials', false, '{"entries": []}', 16) ON CONFLICT (page_id, type) DO NOTHING;
  INSERT INTO public.blocks (page_id, type, enabled, content, sort_order) VALUES (new.id, 'availability', false, '{"url": ""}', 17) ON CONFLICT (page_id, type) DO NOTHING;
  INSERT INTO public.blocks (page_id, type, enabled, content, sort_order) VALUES (new.id, 'pricing', false, '{"text": ""}', 18) ON CONFLICT (page_id, type) DO NOTHING;
  INSERT INTO public.blocks (page_id, type, enabled, content, sort_order) VALUES (new.id, 'faq', false, '{"pairs": []}', 19) ON CONFLICT (page_id, type) DO NOTHING;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_page_created ON public.pages;
CREATE TRIGGER on_page_created
  AFTER INSERT ON public.pages
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_page();

-- Trigger to automatically confirm new users upon signup (bypasses email confirmation)
CREATE OR REPLACE FUNCTION public.auto_confirm_user()
RETURNS trigger AS $$
BEGIN
  NEW.email_confirmed_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created_auto_confirm ON auth.users;

CREATE TRIGGER on_auth_user_created_auto_confirm
  BEFORE INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.auto_confirm_user();
