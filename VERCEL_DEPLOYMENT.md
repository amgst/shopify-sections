# Deploying to Vercel

This guide will help you deploy your Shopify Sections showcase app to Vercel.

## Prerequisites

- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Firebase project with Firestore database
- Git repository with your code

## Environment Variables

Before deploying, you need to set up the following environment variables in Vercel:

### Firebase Configuration
```
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

You can also prefix these with `VITE_` for frontend access:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your Git repository
3. Configure the project:
   - **Framework Preset**: Other
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/public`
4. Add all environment variables (see above)
5. Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Add environment variables:
   ```bash
   vercel env add FIREBASE_API_KEY
   vercel env add FIREBASE_AUTH_DOMAIN
   # ... add all other variables
   ```

5. Redeploy with environment variables:
   ```bash
   vercel --prod
   ```

## How It Works

### Routing Configuration

The `vercel.json` file handles routing:
- API routes (`/api/sections/*`) are handled by serverless functions
- All other routes are served the SPA (`index.html`)

### API Endpoints

- `GET /api/sections` - Get all sections
- `GET /api/sections/:slug` - Get section by slug or ID
- `POST /api/sections` - Create a new section
- `DELETE /api/sections/:id` - Delete a section

### Frontend Routes

- `/` - Home page
- `/browse` - Browse all sections
- `/section/:slug` - View specific section details

## Troubleshooting

### 404 Errors on Routes

If you see 404 errors when accessing `/section/product-showcase`:
1. Ensure `vercel.json` has the correct rewrite rules
2. Check that Firebase environment variables are set
3. Verify your Firestore has data with the correct structure
4. Check Vercel deployment logs for errors

### API Not Working

1. Go to Vercel Dashboard → Your Project → Functions
2. Check if serverless functions are deployed
3. Review runtime logs for errors
4. Ensure all environment variables are set

### Build Fails

1. Check Vercel build logs
2. Ensure all dependencies are in `package.json`
3. Verify Node.js version compatibility
4. Make sure `npm run build` works locally

## Vercel Configuration File

The `vercel.json` configures:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist/public",
  "rewrites": [
    {
      "source": "/api/sections/:id",
      "destination": "/api/sections/[id].ts"
    },
    {
      "source": "/api/sections",
      "destination": "/api/sections/index.ts"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## Production Checklist

- [ ] Firebase environment variables configured in Vercel
- [ ] Firestore security rules updated for production
- [ ] Database seeded with sections data
- [ ] Custom domain configured (optional)
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] Analytics configured (optional)

## Support

For issues:
- Check [Vercel Documentation](https://vercel.com/docs)
- Review [Firebase Documentation](https://firebase.google.com/docs)
- Check deployment logs in Vercel dashboard
