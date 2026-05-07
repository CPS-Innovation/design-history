# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **design history site** for the Crown Prosecution Service (CPS) innovations, built with [Eleventy (11ty)](https://www.11ty.dev) and the [GOV.UK Design System](https://design-system.service.gov.uk). It generates a static site documenting the evolution of digital service designs.

- Live site: <https://cps-innovation.github.io/design-history/>
- Input directory: `app/` → Output directory: `public/`
- Deployed to GitHub Pages with path prefix `/design-history`

## Commands

```bash
npm start          # Build and serve with live reload (dev server)
npm run build      # Build static site to public/
npm test           # Run StandardJS linter
```

Helper scripts for content creation:
```bash
node scripts/generate.js <directory-name>    # Generate post MD from numbered images in app/images/
node scripts/screenshot.js <directory-name>  # Capture screenshots and create post (requires local server running)
```

## Architecture

### Content Structure

Design posts live in `app/posts/<project>/`. Each project contains:
- `<project>.json` — Eleventy collection metadata and navigation config
- `<project>.md` — Collection page listing all versions
- `<YYYY-MM-DD>-<project>-v<N>.md` — Individual version posts with YAML front matter
- Images stored in `app/images/<project>/`

### Template Hierarchy

- `app/_layouts/base.njk` — Root layout extending GOV.UK template
- `app/_layouts/collection.njk` — Paginated post listings
- `app/_layouts/post.njk` — Individual design post with screenshots
- `app/_layouts/page.njk` — Generic page
- `app/_components/` — Reusable Nunjucks macros (screenshots, pagination, gallery, etc.)

### Custom Extensions

- `lib/filters/` — Nunjucks filters: date formatting (Luxon), markdown rendering, URL prettification, widont
- `lib/libraries/markdown.js` — markdown-it with plugins: abbreviations, anchors, definition lists, footnotes, figures, table of contents
- `lib/libraries/nunjucks.js` — Nunjucks environment loading GOV.UK Frontend components
- `.eleventy.js` — Main Eleventy config: plugins, passthrough copy, path prefix

### Styling & JS

- `app/_stylesheets/application.scss` — Main SCSS entry point (compiled via `.11ty.js` companion file)
- `app/_javascripts/application.js` — Client-side JS bundled via Rollup
- GOV.UK Frontend assets are passthroughed from `node_modules`
