# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
## Rules

Ensure tracking of version control. Establish a version control log and ensure that every change and feature implementation utilizes version control. Use best judgement for major vs minor vs patch versions. On major version changes, create a tarballed backup of the previous version. 

## Project Overview

Static cybersecurity portfolio website with a cyber/hacker aesthetic featuring Matrix rain background, scanline overlays, glitch effects, and terminal-style UI elements. No build system or package manager - pure HTML, CSS, and vanilla JavaScript.

## Development

**Local Development:** Open `index.html` directly in a browser or use any local server:
```bash
python -m http.server 8000
# or
npx serve .
```

No build step, compilation, or dependencies required.

## Architecture

### File Structure
- `index.html` - Homepage with section card grid
- `pages/` - Content pages (about, skills, contact, projects, blog, etc.)
- `pages/blog/` - Individual blog post writeups
- `css/main.css` - Core styles, CSS variables, layout, navigation, cards
- `css/effects.css` - Visual effects (glitch, scanlines, neon glow, animations)
- `css/pages.css` - Page-specific styles (forms, grids, timelines, skill bars)
- `js/main.js` - Navigation, scroll reveal, typing effect, skill bar animations
- `js/matrix.js` - Canvas-based Matrix rain background animation
- `templates/` - HTML templates for new blog posts and project cards

### CSS Custom Properties (defined in main.css :root)
- Colors: `--accent-blue`, `--accent-red`, `--accent-green`, `--accent-yellow`
- Backgrounds: `--bg-primary`, `--bg-secondary`, `--bg-tertiary`, `--bg-card`
- Typography: `--font-display` (Orbitron), `--font-mono` (Share Tech Mono), `--font-body` (Rajdhani)
- Effects: `--glow-blue`, `--glow-red`, `--border-color`, `--border-hover`

### Adding Content

**New blog post:** Copy `templates/blog-post-template.html` to `pages/blog/`, update paths (../../) and content.

**New project card:** Copy markup from `templates/project-card-template.html` into the appropriate page's `.projects-grid` div.

### Key Classes
- `.section-card`, `.project-card`, `.info-card` - Card components with hover effects
- `.glitch-text` - Text with glitch animation (requires `data-text` attribute)
- `.cyber-btn` - Styled button with clip-path corners
- `.reveal` - Elements that animate on scroll
- `.featured` - Highlighted card variant
