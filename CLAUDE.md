# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start the development server (Next.js with Nextra)
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

### Testing
This project does not currently have explicit test commands configured in package.json.

## Architecture

This is a Next.js 15 application serving as a developer portal built with:

### Core Framework
- **Next.js 15** with App Router (`src/app/` directory structure)
- **TypeScript** with strict mode enabled
- **React 19** as the UI library
- **Nextra** for documentation pages (configured with `nextra-theme-docs`)

### Authentication & State Management
- **Alien SSO SDK** (`@alien_org/sso-sdk-react` and `@alien_org/sso-sdk-core`) for authentication
- **React Query** for server state management
- Authentication is handled globally via `AlienSsoProvider` in `src/app/providers.tsx`

### UI & Styling
- **Tailwind CSS v4** for styling with custom CSS variables
- **shadcn/ui** components (configured in `components.json`) using:
  - Radix UI primitives for accessible components
  - Class Variance Authority (CVA) for component variants
  - Lucide React for icons
- **Custom font**: Booton font family defined in `src/fonts/fonts.ts`
- **Dark theme** as default (`data-theme="dark"` in layout)

### Project Structure
- `src/app/` - Next.js App Router pages and layouts
  - `docs/` - Documentation pages powered by Nextra
  - `dashboard/` - Protected dashboard area with SSO functionality
  - `api/` - API routes including mock authentication callbacks
- `src/components/` - Reusable React components
  - `ui/` - shadcn/ui components (Button, Dialog, etc.)
  - Authentication components (AuthForm, AuthVerifier, UserMenu)
- `src/features/` - Feature-based components organized by domain
- `src/hooks/` - Custom React hooks
- `src/lib/` - Utility functions and configurations
- `src/content/` - Static content files

### Key Configuration
- **Path aliases**: `@/*` maps to `src/*` (configured in tsconfig.json)
- **SVG handling**: Configured to use @svgr/webpack for SVG imports
- **MDX**: Custom MDX components defined in `src/mdx-components.ts` for Nextra integration
- **Content base path**: `/docs` for Nextra documentation

### Environment Variables
The application expects:
- `NEXT_PUBLIC_ALIEN_SSO_ROUTER_URL` - Base URL for Alien SSO service

### Development Notes
- React Strict Mode is disabled in next.config.ts
- Only `.ts` and `.tsx` file extensions are supported for pages
- The application uses React Query for all data fetching and server state management
- Toast notifications are handled via Sonner
- QR code functionality available via `qr-code-styling` and `react-qr-code`