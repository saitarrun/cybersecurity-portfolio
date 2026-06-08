# Contributing

Thank you for your interest in contributing to this portfolio project!

## Code Standards

- **TypeScript** — Strict type checking required
- **ESLint** — All code must pass linting checks
- **Prettier** — Code formatting must be consistent
- **Tests** — New features should include tests where applicable

## Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes and ensure tests pass: `npm run check`
4. Commit with clear messages: `git commit -m "feat: Add your feature"`
5. Push to your fork and open a pull request

## Commit Message Convention

- `feat:` — New feature
- `fix:` — Bug fix
- `docs:` — Documentation changes
- `style:` — Code formatting (no logic changes)
- `refactor:` — Code refactoring
- `perf:` — Performance improvements
- `test:` — Test additions/changes
- `chore:` — Build/dependency changes

## Running Locally

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`

## Quality Checks

Before submitting a PR, run the full quality suite:

```bash
npm run check
```

This runs:

- TypeScript type checking
- ESLint linting
- Prettier formatting
- Production build

## Areas for Contribution

- **3D Effects** — Add new Three.js animations
- **Performance** — Optimize bundle size and render performance
- **Accessibility** — Improve WCAG compliance
- **Mobile** — Enhance responsive design
- **Documentation** — Improve guides and code comments

## Questions?

Open an issue or discussion for questions or suggestions.

---

Thanks for making this project better!
