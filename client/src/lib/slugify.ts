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
 * Creates a URL for a section using section data
 * @param section Section object with slug or id/title
 * @returns A URL-friendly string (just the slug)
 */
export function createSectionUrl(section: any): string {
  // If section has a slug, use it directly
  if (section.slug) {
    return section.slug;
  }
  // Fallback: if passed id and title separately (old format)
  if (typeof section === 'string') {
    const id = section;
    const title = arguments[1] as string;
    return `${slugify(title)}--${id}`;
  }
  // Fallback: generate from title
  return slugify(section.title);
}