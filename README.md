This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Modern Blog Platform

A full-featured blog platform built with Next.js, Supabase, and TypeScript. Features include rich text editing with Markdown, comments, analytics, and a beautiful UI powered by shadcn/ui.

## Features

### Content Creation
- **Rich Markdown Editor**: Write posts with live preview and formatting tools
- **Draft & Publish**: Save drafts or publish immediately
- **Categories**: Organize posts by topic
- **Cover Images**: Add visual appeal to your posts
- **SEO Optimization**: Built-in metadata and OpenGraph support

### Community Engagement
- **Comments System**: Allow readers to comment on posts
- **User Authentication**: Secure sign-up and sign-in with Supabase Auth
- **User Profiles**: Each author has their own profile

### Analytics
- **View Tracking**: Automatically track post views
- **Analytics Dashboard**: Monitor total views, posts, and comments
- **Top Posts**: See which posts perform best
- **Engagement Metrics**: Track average views per post

### User Experience
- **Responsive Design**: Works perfectly on all devices
- **Dark Mode Support**: Respects system preferences
- **Fast Loading**: Optimized static generation
- **Beautiful UI**: Clean, modern interface with smooth animations

## Tech Stack

- **Framework**: Next.js 13 with App Router
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Date Formatting**: date-fns

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account and project

### Setup

1. **Clone and Install**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**

   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

3. **Database Setup**

   The database schema is already applied via Supabase migrations. It includes:
   - `profiles` - User profiles
   - `categories` - Post categories
   - `posts` - Blog posts
   - `comments` - Post comments
   - `post_views` - Analytics tracking

4. **Create Initial Categories (Optional)**

   Sign in to your app and use the Supabase dashboard to add some initial categories, or do it through the app once authenticated.

5. **Run Development Server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
/app
  /blog
    [slug]/page.tsx        → Individual post pages
    /categories
      [category]/page.tsx  → Category pages
      page.tsx             → All categories
    /analytics/page.tsx    → Analytics dashboard
    /new/page.tsx          → Create new post
    layout.tsx             → Blog layout with header
    page.tsx               → Blog home page
  layout.tsx               → Root layout with auth
  page.tsx                 → Landing page

/components
  /editor
    markdown-editor.tsx    → Markdown editor with preview
  /comments
    comment-section.tsx    → Comments list and form
  /analytics
    analytics-dashboard.tsx → Analytics overview
    view-tracker.tsx       → View tracking component
  /auth
    auth-dialog.tsx        → Sign in/up modal
    user-menu.tsx          → User dropdown menu
  /ui                      → shadcn/ui components

/lib
  /api
    posts.ts               → Post CRUD operations
    comments.ts            → Comment operations
    categories.ts          → Category operations
  /auth
    auth-context.tsx       → Authentication provider
  /seo
    metadata.ts            → SEO helpers
  /supabase
    client.ts              → Supabase client & types
```

## Usage

### Creating a Post

1. Click "Write Post" in the navigation
2. Fill in the post details:
   - Title (required)
   - URL slug (auto-generated from title)
   - Excerpt (optional preview text)
   - Cover image URL (optional)
   - Category (optional)
3. Write your content in Markdown
4. Use the formatting toolbar or write Markdown directly
5. Toggle "Publish immediately" to make it public
6. Click "Publish Post" or "Save Draft"

### Managing Posts

Posts can be edited by their authors. The edit functionality can be added by creating an edit page similar to the new post page.

### Categories

Categories help organize posts by topic. Create categories through the Supabase dashboard or add a category management page.

### Analytics

Access the analytics dashboard to see:
- Total views across all posts
- Number of published posts
- Total comments
- Recent views (last 7 days)
- Top performing posts

### Comments

Authenticated users can comment on any published post. Authors can delete their own comments.

## Security

The platform implements Row Level Security (RLS) policies:

- **Profiles**: Public read, users can update their own
- **Posts**: Public can read published posts, authors can manage their own
- **Comments**: Public read, authenticated users can create, authors can delete own
- **Categories**: Public read, authenticated users can create
- **Views**: Anyone can insert, authenticated users can read aggregates

## Customization

### Styling

The app uses Tailwind CSS and shadcn/ui components. Customize:
- Colors in `tailwind.config.ts`
- Global styles in `app/globals.css`
- Component variants in `/components/ui`

### Features

Add new features by:
1. Creating new pages in `/app`
2. Adding API functions in `/lib/api`
3. Building components in `/components`

## Deployment

### Deploy to Netlify

The project includes a `netlify.toml` configuration:

```bash
npm run build
```

Then deploy to Netlify using their CLI or dashboard.

### Environment Variables

Set the same environment variables in your deployment platform:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL` (your production URL)

## Contributing

Contributions are welcome! Areas for improvement:
- Post editing functionality
- Image uploads
- Search functionality
- Email notifications
- Social sharing
- RSS feed
- Tag system

## License

MIT

