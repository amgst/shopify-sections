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
 * Creates a unique URL for a section using the section ID
 * @param id section id for unique identification
 * @param title section title (unused, kept for backwards compatibility)
 * @returns section ID for guaranteed unique URLs
 */
export function createSectionUrl(id: string, title: string): string {
  // Use the section ID directly to guarantee uniqueness
  // SEO is handled through meta tags, canonical URLs, and proper page titles
  return id;
}