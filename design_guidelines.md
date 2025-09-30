# Shopify Sections Marketplace - Design Guidelines

## Design Approach
**Reference-Based Approach** inspired by ThemeForest and Shopify Theme Store's organized product galleries, clear categorization, and professional marketplace aesthetics. The design prioritizes visual appeal for browsing design assets while maintaining excellent usability for filtering and downloading.

## Color System

### Core Palette
- **Primary**: #96BF47 (Shopify green) - CTAs, active states, download buttons
- **Secondary**: #7C2D12 (deep brown) - headings, hover states, premium indicators
- **Background**: #FAFAFA (light grey) - page background
- **Surface**: #FFFFFF (white) - cards, modals, elevated elements
- **Text Primary**: #1F2937 (dark grey) - body text, descriptions
- **Text Secondary**: #6B7280 (medium grey) - metadata, labels
- **Accent**: #F59E0B (amber) - badges, featured indicators, notifications
- **Border**: #E5E7EB (light grey) - card borders, dividers

### Dark Mode
Not required for this marketplace application.

## Typography

### Font Stack
```
Primary: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Inter', sans-serif
Body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif
```

### Type Scale
- **Hero Heading**: 3.5rem (56px) / Bold / -0.02em tracking
- **Page Heading (H1)**: 2.5rem (40px) / Bold / -0.01em tracking
- **Section Heading (H2)**: 2rem (32px) / Semibold / -0.01em tracking
- **Card Title (H3)**: 1.25rem (20px) / Semibold / normal tracking
- **Body Large**: 1.125rem (18px) / Regular / 1.6 line-height
- **Body**: 1rem (16px) / Regular / 1.5 line-height
- **Caption**: 0.875rem (14px) / Medium / 1.4 line-height
- **Label**: 0.75rem (12px) / Medium / uppercase / 0.05em tracking

## Layout System

### Spacing Primitives
Primary units: **4, 6, 8, 12, 16, 24** (Tailwind: p-4, p-6, p-8, m-12, m-16, py-24)

### Grid System
- **Container**: max-w-7xl (1280px) with px-6 on mobile, px-8 on desktop
- **Section Cards**: Grid with gap-6 on mobile, gap-8 on desktop
  - Mobile: grid-cols-1
  - Tablet: grid-cols-2
  - Desktop: grid-cols-3
  - Large: grid-cols-4

### Responsive Breakpoints
- Mobile: 640px
- Tablet: 768px
- Desktop: 1024px
- Large: 1280px

## Component Library

### Navigation
- **Header**: Sticky, white background with subtle shadow on scroll
- Logo (left), Search bar (center), Download count badge and CTA (right)
- Height: 72px with py-4 internal spacing
- Mobile: Hamburger menu with slide-out navigation

### Hero Section
- **Layout**: Full-width with gradient overlay (from #96BF47/10 to transparent)
- Background image: Blurred Shopify section previews mosaic
- Content centered: Max-width prose with hero heading + subtitle + primary CTA
- Height: 60vh on desktop, 50vh on mobile
- CTA Button: Primary green (#96BF47) with white text, px-8 py-4

### Filter Sidebar
- **Desktop**: Sticky sidebar, w-64, bg-white with rounded-lg border
- Collapsible category groups with expand/collapse icons
- Checkbox filters with count badges (text-gray-500)
- "Clear all" link at top in accent color
- **Mobile**: Bottom sheet modal triggered by "Filters" button

### Section Cards
- **Container**: bg-white, rounded-xl, border border-gray-200
- Hover: shadow-lg, transform scale-[1.02], transition-all duration-200
- **Thumbnail**: aspect-video, rounded-t-xl, object-cover
- **Content**: p-6 spacing
  - Category badge: bg-gray-100, text-gray-700, rounded-full, px-3 py-1
  - Title: text-xl font-semibold, text-gray-900, mb-2
  - Description: text-gray-600, line-clamp-2
  - Footer: flex justify-between items-center, pt-4, border-t
    - Downloads count with icon
    - Preview button (text-primary, hover:underline)

### Detail Pages
- **Breadcrumbs**: mb-8, text-sm, text-gray-500 with chevron separators
- **Two-column layout**: 
  - Left (60%): Preview carousel with thumbnails
  - Right (40%): Sticky info panel
- **Info Panel**: 
  - Section title (H1)
  - Category + Download count row
  - Large download button (w-full, primary green, mb-6)
  - Description with rich formatting
  - Technical details accordion (Requirements, Features, Changelog)
  - Related sections carousel at bottom

### Buttons
- **Primary**: bg-[#96BF47], text-white, px-6 py-3, rounded-lg, font-medium
- **Secondary**: border-2 border-gray-300, text-gray-700, px-6 py-3, rounded-lg
- **Icon buttons**: w-10 h-10, flex items-center justify-center, rounded-lg
- All buttons: transition-all duration-200, hover:shadow-md

### Search Bar
- **Style**: bg-gray-50, border border-gray-200, rounded-xl, px-4 py-3
- Search icon (left), clear button (right when active)
- Focus: border-primary, ring-2 ring-primary/20

## Images

### Hero Background
- Mosaic of blurred Shopify section screenshots (3-4 sections visible)
- Gradient overlay: linear-gradient(135deg, #96BF47/20, transparent)
- Dimensions: Full viewport width, 60vh height
- Treatment: blur(20px), opacity-40

### Section Thumbnails
- Aspect ratio: 16:9 (landscape)
- High-quality screenshots of sections in context
- Hover: slight zoom effect (scale-105)
- Dimensions: Minimum 800x450px, optimized for web

### Detail Page Preview
- Large preview carousel with 3-5 images per section
- Include: Desktop view, mobile view, hover states, variations
- Thumbnail strip below main image
- Dimensions: Main 1200x675px, thumbnails 200x113px

### Category Icons
- Simple, outlined icons representing each category
- Colors: Inherit from parent (gray-400 default, primary on hover)
- Size: 24x24px, stroke-width: 2

## Key Interactions

### Hover States
- Cards: Lift (translateY(-4px)) + shadow-lg
- Buttons: Slight darken + shadow-md
- Links: Underline with primary color

### Loading States
- Skeleton screens for card grids (pulse animation)
- Spinner for download actions
- Shimmer effect on images while loading

### Transitions
- All interactions: transition-all duration-200 ease-in-out
- Page transitions: Fade in content (opacity 0 to 1, 300ms)
- Filter application: Smooth re-flow with stagger animation

### Download Flow
1. Click download button → Loading spinner (2s)
2. Success: Green checkmark + "Downloaded!" toast notification (top-right)
3. Auto-increment download counter with smooth number animation