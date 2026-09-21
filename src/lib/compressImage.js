/**
 * compressImage — redimensionne et recompresse une image côté navigateur
 * avant envoi, pour éviter les envois interminables (voire bloqués) avec
 * des photos brutes de téléphone/appareil photo (plusieurs Mo).
 *
 * Renvoie un File JPEG, large de `maxWidth` px maximum (les photos plus
 * petites ne sont pas agrandies), prêt à être passé à uploadFile().
 */
export async function compressImage(file, { maxWidth = 1920, quality = 0.82 } = {}) {
  if (!file.type.startsWith('image/')) return file;

  const bitmap = await createImageBitmap(file).catch(() => null);
  if (!bitmap) return file; // format non supporté par le navigateur (ex: HEIC sur certains navigateurs) — on tente l'envoi tel quel

  const ratio = Math.min(1, maxWidth / bitmap.width);
  const targetWidth = Math.round(bitmap.width * ratio);
  const targetHeight = Math.round(bitmap.height * ratio);

  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(bitmap, 0, 0, targetWidth, targetHeight);
  bitmap.close?.();

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality));
  if (!blob) return file; // échec de la compression — on retombe sur le fichier original

  const name = file.name.replace(/\.[^.]+$/, '') + '.jpg';
  return new File([blob], name, { type: 'image/jpeg' });
}
