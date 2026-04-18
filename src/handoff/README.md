# Astro handoff — James Weng personal site

Drop-in folder matching your existing Astro repo structure. Copy the contents of `src/` over your repo's `src/`, then commit.

## Files

```
src/
├── pages/
│   └── index.astro               # NEW landing page (replaces whatever's there)
├── components/
│   ├── Header.astro              # REPLACES existing Header.astro
│   ├── Hero.astro                # new
│   ├── About.astro               # new
│   ├── Hobbies.astro             # new
│   ├── Experience.astro          # new
│   ├── Projects.astro            # new
│   ├── Writing.astro             # new — reads from `blog` content collection
│   ├── Contact.astro             # new
│   ├── SectionHead.astro         # shared helper
│   └── Tweaks.astro              # optional in-design controls (delete if unwanted)
└── styles/
    └── global.css                # REPLACES existing global.css
```

Your existing `BaseHead.astro`, `Footer.astro`, `FormattedDate.astro`, `HeaderLink.astro`, content collection, and blog post layout are untouched — the new `index.astro` imports `BaseHead` and `FormattedDate` the same way your current code does.

## Install steps

1. From your local clone of `JamesWeng0428.github.io`:
   ```bash
   # back up the files you're about to overwrite, just in case
   mv src/pages/index.astro src/pages/index.astro.bak
   mv src/components/Header.astro src/components/Header.astro.bak
   mv src/styles/global.css src/styles/global.css.bak
   ```
2. Copy the `src/` folder from this handoff over your repo's `src/`.
3. Preview: `npm run dev` (localhost:4321).
4. If it looks right, commit and push — your GitHub Actions workflow deploys on push to main.

## Things to replace with real content

- `Hero.astro` — your one-liner, meta rows (location, focus, status)
- `About.astro` — side panel (Now / Reading / Languages) and the three body paragraphs
- `Experience.astro` — the `experience` array: roles, years, stacks
- `Projects.astro` — the `projects` array; drop real images by replacing `<div class="project-placeholder">` with `<img>` tags
- `Hobbies.astro` — swap `hobby-media` divs for real photos/MP4s from `/public/`
- `Contact.astro` — email, LinkedIn, resume PDF link

## Notes

- `Writing.astro` automatically pulls from your `blog` content collection and sorts by `pubDate`. No manual updates needed when you publish a new post.
- All colors use `oklch()`. If you need to support very old browsers, run the CSS through a fallback postcss plugin.
- The Tweaks panel is development-only flavor — delete `Tweaks.astro` and the `<Tweaks />` line in `index.astro` if you don't want it in production. Or keep it; it's fun. Press `T` to toggle.
- The `<link rel="preconnect">` for Google Fonts is now handled via `@import` in `global.css`. If `BaseHead.astro` already has font preconnects, you can move the `@import` rule out and preload the fonts there instead for slightly better performance.
- Keep your existing `public/fonts/atkinson-*.woff` files; they're no longer referenced but harmless. Feel free to delete.

## Rollback

```bash
git checkout -- src/
```

Or restore the `.bak` files you made in step 1.
