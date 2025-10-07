import { storage } from './storage';
async function seed() {
    try {
        console.log('Starting Firebase database seeding...');
        // Insert sample users
        const usersData = [
            { username: 'admin', password: 'admin123' },
            { username: 'demo', password: 'demo123' }
        ];
        console.log('Inserting users...');
        for (const user of usersData) {
            await storage.createUser(user);
        }
        // Insert sample sections
        const sectionsData = [
            {
                title: 'Hero Banner',
                category: 'Hero',
                description: 'A beautiful hero banner section with customizable background and text overlay.',
                thumbnailUrl: '/assets/hero-banner.jpg',
                downloads: 120,
                isPremium: false,
                filters: ['hero', 'banner', 'featured']
            },
            {
                title: 'Product Showcase',
                category: 'Products',
                description: 'Display your products in an elegant grid with hover effects and quick view.',
                thumbnailUrl: '/assets/product-showcase.jpg',
                downloads: 85,
                isPremium: false,
                filters: ['products', 'grid', 'showcase']
            },
            {
                title: 'Newsletter Signup',
                category: 'Forms',
                description: 'Capture email subscribers with this stylish newsletter signup form.',
                thumbnailUrl: '/assets/newsletter.jpg',
                downloads: 64,
                isPremium: false,
                filters: ['form', 'newsletter', 'signup']
            },
            {
                title: 'Testimonials Carousel',
                category: 'Social Proof',
                description: 'Showcase customer testimonials in a responsive carousel slider.',
                thumbnailUrl: '/assets/testimonials.jpg',
                downloads: 92,
                isPremium: true,
                filters: ['testimonials', 'carousel', 'reviews']
            },
            {
                title: 'Collection Grid',
                category: 'Collections',
                description: 'Display product collections in a masonry grid layout with category filtering.',
                thumbnailUrl: '/assets/collection-grid.jpg',
                downloads: 78,
                isPremium: true,
                filters: ['collections', 'grid', 'masonry']
            }
        ];
        console.log('Inserting sections...');
        for (const section of sectionsData) {
            await storage.createSection(section);
        }
        console.log('Seeding completed successfully!');
    }
    catch (error) {
        console.error('Error seeding database:', error);
    }
}
seed();
