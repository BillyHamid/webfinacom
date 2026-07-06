import { supabase, MEDIA_BUCKET } from './supabaseClient';

/** Upload un fichier vers le bucket Storage public et renvoie son URL publique. */
export async function uploadFile(file, folder = '') {
  const ext = file.name.split('.').pop();
  const path = `${folder ? `${folder}/` : ''}${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from(MEDIA_BUCKET)
    .upload(path, file, { cacheControl: '3600', upsert: false });
  if (error) throw error;

  const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
