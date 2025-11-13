# DocsConvert

A modern, subscription-based document conversion platform that transforms documents (PDF, Word, OpenDocument) into HTML, HTL, and XML formats with advanced customization options.

## Key Features

- **Multi-Format Support**: Upload and convert `.docx`, `.doc`, `.pdf`, and `.odt` files
- **Flexible Output Formats**: Convert to HTML, HTL, or XML with preserved formatting
- **Advanced Conversion Rules**: Configure tag conversions, attribute rules, ignore/delete tags with conditional logic (AND/OR)
- **Table of Contents Splitting**: Automatically split documents by TOC into separate sections
- **Preset Management**: Save, load, export, and import conversion settings
- **User Authentication**: Secure login and sign-up with JWT-based authentication
- **Subscription Tiers**: Free tier (10 pages) and paid options for additional conversions
- **Real-time Preview**: Syntax-highlighted preview of converted content
- **Drag-and-Drop Interface**: Intuitive file upload with drag-and-drop support
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

## Architecture & Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives
- **State Management**: TanStack Query (React Query) for server state
- **Form Handling**: React Hook Form with Zod validation
- **Drag & Drop**: react-beautiful-dnd
- **Code Highlighting**: react-syntax-highlighter with Prettier formatting
- **Icons**: Lucide React, React Icons

### Backend Integration
- **API Client**: Custom fetch wrappers for client and server-side requests
- **Authentication**: Cookie-based JWT authentication
- **Middleware**: Next.js middleware for route protection

### Development Tools
- **Type Safety**: TypeScript with strict mode
- **Code Quality**: ESLint, Prettier
- **Package Manager**: npm

## Technical Challenges

### 1. Complex Rule-Based Conversion System
The application implements a sophisticated conversion engine that supports:
- Conditional tag transformations with property-based rules
- Multiple operators (contains, startsWith, endsWith, equals, matches, parent/child relationships)
- Complex logic operators (AND/OR) for combining conditions
- Nested rule validation and error handling

This required building a flexible state management system that maintains conversion settings, validates rules in real-time, and provides a user-friendly interface for configuring complex transformations.

### 2. React Strict Mode Compatibility with Drag-and-Drop
The application uses `react-beautiful-dnd` for reordering conversion rules, which has known compatibility issues with React's Strict Mode. This was solved by implementing a custom `StrictModeDroppable` wrapper that uses `requestAnimationFrame` to defer component mounting until after the initial render cycle, ensuring proper initialization of the drag-and-drop context.

## Setup & Installation

### Prerequisites
- Node.js 18+ and npm
- Access to the backend API (backend code not included in this repository)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/DocsConvert.git
   cd DocsConvert
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=your_backend_api_url
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

### Additional Commands

- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
DocsConvert/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── convert/           # Document conversion feature
│   │   ├── components/    # Conversion-specific components
│   │   ├── hooks/         # Custom React hooks
│   │   └── types/         # TypeScript type definitions
│   ├── legal/             # Legal pages (ToS, Privacy, etc.)
│   └── resources/         # Support and blog pages
├── components/            # Shared React components
│   └── ui/               # Reusable UI components (Radix UI)
├── lib/                   # Utility functions and API clients
├── types/                 # Global TypeScript types
└── public/               # Static assets
```

## Usage

### Converting Documents

1. **Upload a file**: Navigate to `/convert` and drag-and-drop or select a document
2. **Select output format**: Choose HTML, XML, or HTL
3. **Configure conversion rules** (optional):
   - Add tag conversions (e.g., `<p>` → `<div>`)
   - Set attribute rules for specific tags
   - Configure tags to ignore or delete
   - Use conditional logic for complex transformations
4. **Convert**: Click "Convert File" to process the document
5. **Download or copy**: Use the download button or copy to clipboard

### Table of Contents Mode

1. Select "Split by Table of Contents" view mode
2. Upload and convert your document
3. Browse sections in the sidebar
4. Download individual sections or all sections as a ZIP file

### Presets

Save frequently used conversion settings as presets for quick reuse:
1. Configure your conversion rules
2. Enter a preset name
3. Click "Save Preset"
4. Load saved presets from the dropdown menu

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Radix UI](https://www.radix-ui.com/) - Unstyled UI primitives
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TanStack Query](https://tanstack.com/query) - Data fetching and state management
- [Vercel](https://vercel.com/) - Deployment platform
