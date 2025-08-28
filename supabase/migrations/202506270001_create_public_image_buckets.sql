insert into storage.buckets (id, name, public)
values ('webpage-images', 'webpage-images', true)
on conflict (id) do update set public = excluded.public;

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = excluded.public;

DROP POLICY IF EXISTS "Public read access - webpage-images" ON storage.objects;
CREATE POLICY "Public read access - webpage-images"
ON storage.objects FOR SELECT
USING (bucket_id = 'webpage-images');

DROP POLICY IF EXISTS "Public read access - product-images" ON storage.objects;
CREATE POLICY "Public read access - product-images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');
