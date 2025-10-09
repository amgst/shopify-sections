/**
 * Converts a string to a URL-friendly slug
 * @param text The text to convert to a slug
 * @returns A URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/&/g, '-and-')   // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-');  // Replace multiple - with single -
}

/**
 * Creates a URL for a section from id and title
 * @param id section id (unused for SEO-only slug but kept for backwards compatibility)
 * @param title section title
 * @returns slugified title
 */
export function createSectionUrl(id: string, title: string): string {
  // For SEO-friendly URLs we return only the slugified title (no id)
  return slugify(title);
}