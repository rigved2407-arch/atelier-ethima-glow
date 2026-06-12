-- Storage bucket for reference images
INSERT INTO storage.buckets (id, name, public)
VALUES ('reference-images', 'reference-images', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "anyone can upload reference images"
ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'reference-images');

CREATE POLICY "users view own reference images"
ON storage.objects FOR SELECT
USING (bucket_id = 'reference-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "admins view all reference images"
ON storage.objects FOR SELECT
USING (bucket_id = 'reference-images' AND public.has_role(auth.uid(), 'admin'));

-- Security: revoke public execute on sensitive functions
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
