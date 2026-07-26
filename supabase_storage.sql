-- Setup Storage Bucket for Portfolio Assets
insert into storage.buckets (id, name, public)
values ('portfolio-assets', 'portfolio-assets', true)
on conflict (id) do nothing;

-- Storage RLS Policies
drop policy if exists "Assets are publicly accessible" on storage.objects;
create policy "Assets are publicly accessible"
  on storage.objects for select
  using ( bucket_id = 'portfolio-assets' );

drop policy if exists "Users can upload their own assets" on storage.objects;
create policy "Users can upload their own assets"
  on storage.objects for insert
  with check (
    bucket_id = 'portfolio-assets' AND
    auth.uid() = owner
  );

drop policy if exists "Users can update their own assets" on storage.objects;
create policy "Users can update their own assets"
  on storage.objects for update
  using (
    bucket_id = 'portfolio-assets' AND
    auth.uid() = owner
  );

drop policy if exists "Users can delete their own assets" on storage.objects;
create policy "Users can delete their own assets"
  on storage.objects for delete
  using (
    bucket_id = 'portfolio-assets' AND
    auth.uid() = owner
  );
