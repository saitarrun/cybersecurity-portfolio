# Software Engineer Portfolio

A modern, interactive personal portfolio website built with React, TypeScript, and Three.js. Features 3D graphics, smooth animations, and a responsive design showcasing professional experience, projects, and skills.

**[🚀 Live Demo](https://saitarrun.vercel.app)** | [Repository](https://github.com/saitarrun/SoftwareEngineer_Portfolio)

## Features

- **3D Interactive Background** — Particle effects, wireframe globe, matrix rain, and liquid blob animations powered by Three.js
- **Smooth Animations** — Scroll-based animations with Framer Motion and Lenis smooth scrolling
- **Responsive Design** — Mobile-optimized layouts using Tailwind CSS
- **Dark Mode** — Beautiful dark theme with orange accents
- **Multi-section Layout** — Hero, Experience, Projects, Skills, Education, and Contact sections
- **Contact Form** — Built-in contact form with validation
- **High Performance** — Lazy loading, code splitting, and optimized bundle size

## Tech Stack

### Frontend

- **React 18** — UI library
- **TypeScript** — Type safety
- **Vite** — Fast build tool and dev server
- **Tailwind CSS** — Utility-first styling
- **Three.js** — 3D graphics and WebGL rendering
- **React Three Fiber** — React renderer for Three.js
- **Framer Motion** — Animation library
- **Lenis** — Smooth scroll library

### Development

- **ESLint** — Code linting
- **Prettier** — Code formatting
- **TypeScript** — Static type checking
- **Husky** — Git hooks for quality checks

## Project Structure

```
├── src/
│   ├── components/          # React components
│   │   ├── Contact.tsx      # Contact section with form
│   │   ├── ContactForm.tsx  # Reusable form component
│   │   ├── Education.tsx    # Education history
│   │   ├── Experience.tsx   # Work experience section
│   │   ├── Hero.tsx         # Hero section
│   │   ├── Navbar.tsx       # Navigation bar
│   │   ├── Projects.tsx     # Project showcase
│   │   ├── Skills.tsx       # Technical skills
│   │   ├── Publications.tsx # Research publications
│   │   ├── CustomCursor.tsx # Custom cursor effect
│   │   ├── MagneticElement.tsx # Magnetic hover effect
│   │   └── ui/              # Reusable UI components
│   ├── three/               # Three.js scenes and effects
│   │   ├── BackgroundCanvas.tsx # Main 3D canvas
│   │   ├── HeroScene.tsx
│   │   ├── ParticleField.tsx
│   │   ├── FloatingGeometry.tsx
│   │   ├── LiquidBlob.tsx
│   │   ├── WireframeGlobe.tsx
│   │   ├── MatrixRain.tsx
│   │   ├── OrangeSmoke.tsx
│   │   ├── GridPlane.tsx
│   │   ├── PostEffects.tsx
│   │   └── hooks/           # Custom React hooks
│   ├── utils/               # Utility functions
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── dist/                    # Built output
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── eslint.config.js
└── prettier.rc.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/saitarrun/SoftwareEngineer_Portfolio.git
cd SoftwareEngineer_Portfolio

# Install dependencies
npm install
```

### Development

```bash
# Start dev server (runs on http://localhost:5173)
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint
npm run lint:fix

# Code formatting
npm run format
npm run format:check

# Full quality check
npm run check
```

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Key Components

### Hero Section

Main landing section with introduction and call-to-action buttons.

### Experience

Timeline view of professional work experience with company details, roles, and accomplishments.

### Projects

Showcase of key projects with descriptions, technologies, and links to GitHub/live demos.

### Skills

Technical skills organized by categories (Languages, Frameworks, Tools, etc.).

### Education

Academic background and certifications.

### Contact

Contact information and functional contact form.

## 3D Graphics

The portfolio features several interactive 3D visualizations:

- **Particle Field** — Floating particles with mouse tracking
- **Wireframe Globe** — Rotating 3D globe wireframe
- **Matrix Rain** — Falling matrix-style characters
- **Liquid Blob** — Morphing blob shape
- **Floating Geometry** — 3D geometric shapes
- **Orange Smoke** — Volumetric smoke effect
- **Grid Plane** — Perspective grid animation

## Customization

### Colors

Update Tailwind config in `tailwind.config.js` to change the theme. Primary color is orange.

### Content

Edit component files in `src/components/` to update personal information, projects, and experiences.

### 3D Effects

Modify `src/three/` files to customize animations and effects. Each file controls a specific visual element.

## Performance Optimization

- Code splitting with lazy loading for heavy components
- Optimized 3D rendering with WebGL
- Deferred loading of background canvas
- Efficient CSS with Tailwind
- Tree-shaking of unused code

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is personal work. Feel free to use it as a template for your own portfolio.
