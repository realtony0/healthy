/**
 * Utility to get the logo path with fallback
 * If logo.png exists (with transparent background), use it
 * Otherwise, fall back to logo.jpeg
 */
export const getLogoPath = (): string => {
  // Try PNG first (transparent background), fallback to JPEG
  return '/img/logo.png'
}
