# James Weng — Personal Website

Personal site built with [Astro](https://astro.build). Static, deployed to GitHub Pages at <https://JamesWeng0428.github.io>.

## Development

| Command           | Action                                     |
| :---------------- | :----------------------------------------- |
| `npm install`     | Install dependencies                       |
| `npm run dev`     | Start local dev server at `localhost:4321` |
| `npm run build`   | Build production site to `./dist/`         |
| `npm run preview` | Preview production build locally           |

Pushes to `main` auto-deploy via `.github/workflows/deploy.yml`.

## Where to edit what

| You want to change…           | Open                                           |
| :---------------------------- | :--------------------------------------------- |
| A blog post                   | `src/content/blog/<slug>.md`                   |
| Project list (homepage)       | `src/data/projects.ts`                         |
| Hobby media + stats           | `src/data/hobbies.ts`                          |
| Hobby paragraph copy          | `src/components/Hobbies.astro` (inline)        |
| A homepage section's layout   | `src/components/<Section>.astro`               |
| Resume page                   | `src/pages/resume.astro` + `public/resume.pdf` |
| Site title / meta description | `src/consts.ts`                                |
| Colors, fonts, spacing tokens | `src/styles/global.css`                        |
| Header nav links              | `src/components/Header.astro`                  |

Homepage sections are composed in order from `src/pages/index.astro`: `Hero`, `About`, `Hobbies`, `Experience`, `Projects`, `Writing`, `Contact`. Each one is a component in `src/components/` named after what it is on the page.

## Project structure

```
src/
├── components/      Section components + chrome (Header, Footer, BaseHead…)
├── content/blog/    Blog posts as Markdown — schema in src/content.config.ts
├── data/            Section content as typed data (projects, hobbies)
├── layouts/         BaseLayout (page shell), BlogPost
├── pages/           File-based routes: /, /blog, /resume, /404
├── styles/          global.css with CSS custom properties for theming
└── consts.ts        SITE_TITLE, SITE_DESCRIPTION
public/              Static assets served as-is (images, videos, fonts, PDF)
```

## Conventions

- **Don't rewrite prose copy.** Hand-written sections (hero, about, hobbies, projects, blog) are in James's voice — only change words when given the new wording explicitly. Layout, markup, and styling are fair game. See `CLAUDE.md` for the full content rule.
- **Section anchors** used by the header nav: `#about`, `#work` (Experience), `#projects`, `#writing`, `#contact`. Keep these in sync if you rename a section.
- **Scoped styles** live inside `<style>` blocks in `.astro` files; shared tokens and prose rules live in `src/styles/global.css`.
