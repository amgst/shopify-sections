/**
 * Converts a string to a URL-friendly slug
 * @param text The text to convert to a slug
 * @returns A URL-friendly slug
 */
export function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w\-]+/g, '') // Remove all non-word characters
        .replace(/\-\-+/g, '-'); // Replace multiple - with single -
}
/**
 * Creates a URL for a section using its ID and title
 * @param id The section ID
 * @param title The section title
 * @returns A URL-friendly string in the format "title-slug--id"
 */
export function createSectionUrl(id, title) {
    return `${slugify(title)}--${id}`;
}

/**
 * Extracts the section ID from a URL slug
 * @param slug The URL slug in format "title-slug--id"
 * @returns The section ID
 */
export function extractIdFromSlug(slug) {
    // Split by -- to separate slug from ID
    const parts = slug.split('--');
    if (parts.length >= 2) {
        return parts[parts.length - 1]; // Get the last part which is the ID
    }
    // Fallback for old format: id-title-slug (try to extract ID before first dash)
    return slug.split('-')[0];
}
