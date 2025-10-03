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
 * Creates a URL for a section using its ID and title
 * @param id The section ID
 * @param title The section title
 * @returns A URL-friendly string in the format "id-title-slug"
 */
export function createSectionUrl(id: string, title: string): string {
  return `${id}-${slugify(title)}`;
}