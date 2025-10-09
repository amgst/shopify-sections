import { storage } from './storage';
import fs from 'fs';
import path from 'path';

async function seed() {
  // Only seed to Firebase if SEED_FIREBASE=true is set in the environment.
  const seedToFirebase = process.env.SEED_FIREBASE === 'true';

  const usersData = [
    { username: 'admin', password: 'admin123' },
    { username: 'demo', password: 'demo123' },
  ];

  const sectionsData = [
    {
      title: 'Hero Banner',
      category: 'Hero',
      description:
        'A beautiful hero banner section with customizable background and text overlay.',
      thumbnailUrl: '/assets/Hero_banner_section_25f20588.png',
      downloads: 120,
      isPremium: false,
      filters: ['hero', 'banner', 'featured'],
    },
    {
      title: 'Product Showcase',
      category: 'Products',
      description:
        'Display your products in an elegant grid with hover effects and quick view.',
      thumbnailUrl: '/assets/Product_showcase_section_8816f20f.png',
      downloads: 85,
      isPremium: false,
      filters: ['products', 'grid', 'showcase'],
    },
    {
      title: 'Newsletter Signup',
      category: 'Forms',
      description:
        'Capture email subscribers with this stylish newsletter signup form.',
      thumbnailUrl: '/assets/Newsletter_section_b8bc082f.png',
      downloads: 64,
      isPremium: false,
      filters: ['form', 'newsletter', 'signup'],
    },
    {
      title: 'Testimonials Carousel',
      category: 'Social Proof',
      description:
        'Showcase customer testimonials in a responsive carousel slider.',
      thumbnailUrl: '/assets/Testimonials_section_8a78ef44.png',
      downloads: 92,
      isPremium: true,
      filters: ['testimonials', 'carousel', 'reviews'],
    },
    {
      title: 'Collection Grid',
      category: 'Collections',
      description:
        'Display product collections in a masonry grid layout with category filtering.',
      thumbnailUrl: '/assets/Collection_grid_section_e9154ec7.png',
      downloads: 78,
      isPremium: true,
      filters: ['collections', 'grid', 'masonry'],
    },
  ];

  if (seedToFirebase) {
    try {
      console.log('Starting Firebase database seeding...');
      console.log('Inserting users...');
      for (const user of usersData) {
        await storage.createUser(user as any);
      }

      console.log('Inserting sections...');
      for (const section of sectionsData) {
        await storage.createSection(section as any);
      }

      console.log('Seeding completed successfully!');
    } catch (error) {
      console.error('Error seeding database:', error);
    }
  } else {
    // Save seed data locally so it can be inspected or used without touching Firebase
    try {
      const outDir = path.resolve(process.cwd(), 'data');
      if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.resolve(outDir, 'seed-users.json'), JSON.stringify(usersData, null, 2));
      fs.writeFileSync(path.resolve(outDir, 'seed-sections.json'), JSON.stringify(sectionsData, null, 2));
      console.log('SEED_FIREBASE not set. Seed files written to ./data (seed-users.json, seed-sections.json).');
    } catch (err) {
      console.error('Failed to write local seed files:', err);
    }
  }
}

seed();