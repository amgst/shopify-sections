# Shopify Sections Showcase

A full-stack web application for showcasing and managing Shopify section templates.

## Overview

This project is a Shopify sections showcase platform where users can browse, view, and download Shopify Liquid section templates. Built with React, TypeScript, Express, and Firebase Firestore.

## Recent Changes (October 10, 2025)

- ✅ Successfully migrated project to Replit environment
- ✅ Updated Vercel configuration for proper serverless deployment
- ✅ Fixed API routing to handle both slugs and IDs
- ✅ Created comprehensive deployment documentation (VERCEL_DEPLOYMENT.md)
- ✅ Configured workflow for development server

## Project Architecture

### Frontend (`client/`)
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query (React Query)
- **Build Tool**: Vite

### Backend (`api/`)
- **Framework**: Express.js
- **Database**: Firebase Firestore
- **Storage**: In-memory fallback with Firebase integration
- **API Routes**: RESTful endpoints for sections management

### Key Features
- Browse sections by category
- View detailed section information
- Download section files
- Search and filter functionality
- Responsive design with dark/light mode support
- SEO optimization with meta tags and Open Graph

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express
- **Database**: Firebase Firestore
- **Deployment**: Vercel (configured for serverless functions)
- **Development**: Vite, TSX for TypeScript execution

## Project Structure

```
├── api/
│   ├── sections/          # Serverless API functions
│   │   ├── [id].ts       # Dynamic route for individual sections
│   │   └── index.ts      # List all sections
│   ├── server/           # Server configuration
│   │   ├── index.ts      # Express server entry
│   │   ├── routes.ts     # API route definitions
│   │   └── storage.ts    # Firebase/Memory storage
│   └── shared/
│       └── schema.ts     # Shared TypeScript types
├── client/
│   └── src/
│       ├── components/   # React components
│       ├── pages/        # Page components
│       ├── lib/          # Utilities and configs
│       └── hooks/        # Custom React hooks
├── vercel.json          # Vercel deployment config
└── VERCEL_DEPLOYMENT.md # Deployment guide
```

## Routes

### Frontend Routes
- `/` - Home page
- `/browse` - Browse all sections
- `/section/:slug` - Section detail page

### API Routes
- `GET /api/sections` - Get all sections
- `GET /api/sections/:slug` - Get section by slug or ID
- `POST /api/sections` - Create new section
- `DELETE /api/sections/:id` - Delete section

## Environment Variables

### Required for Firebase
```
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
```

Or with `VITE_` prefix for frontend access.

## Development

### Running Locally
The workflow "Start application" runs: `npm run dev`
- Backend server: Port 5000
- Frontend: Served through Vite

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - TypeScript type checking

## Deployment

See [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) for detailed deployment instructions to Vercel.

### Quick Deploy
1. Push code to Git repository
2. Import to Vercel
3. Add Firebase environment variables
4. Deploy

## User Preferences

- Prefer in-memory storage for development
- Use Firebase Firestore for production
- SEO optimization is important
- Responsive design required
- Support for both light and dark themes

## Notes

- The app uses slug-based URLs for better SEO
- API endpoints support both ID and slug lookups
- Firestore is configured with experimental long polling for Replit environment
- All components use shadcn/ui design system
