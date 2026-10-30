# GDG Kolkata Palette & Token Reference

## Core Palette

### Neutrals (Foundation)
| Token Name | Hex | Usage |
| :--- | :--- | :--- |
| `--bg-hero-dark` | `#0D0D0E` | Opening section background, closing footer background |
| `--surface-dark` | `#161619` | Dark cards, subtle backdrop overlays |
| `--border-dark` | `#26262B` | Hairline dividers and architectural lines in dark sections |
| `--text-dark-primary` | `#F5F5F7` | Primary typography on dark backgrounds |
| `--text-dark-secondary` | `#8E8E93` | Metadata, subtitles, captions on dark backgrounds |
| `--bg-light` | `#FBFBF9` | Warm white editorial canvas |
| `--surface-light` | `#F2F1EC` | Warm subtle inset surfaces |
| `--border-light` | `#E2E0D8` | Hairline dividers in light sections |
| `--text-light-primary` | `#111113` | Editorial body, high-contrast display text |
| `--text-light-secondary` | `#636366` | Editorial metadata, descriptions |

### Google Brand Accents (Restrained)
Use sparingly for status indicators, focused links, or subtle badges:
| Color | Hex | Role |
| :--- | :--- | :--- |
| Google Blue | `#4285F4` | Primary link hover or technical indicator |
| Google Red | `#EA4335` | Live tag or alert accent |
| Google Yellow | `#FBBC04` | Highlight or special marker |
| Google Green | `#34A853` | Success or active status indicator |

---

## Typography Hierarchy

```css
/* Typography Scale */
--font-display: 'Josefin Sans', sans-serif;
--font-body: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;

/* Scale Guidelines */
--text-hero: clamp(2.5rem, 6vw, 5.5rem);
--text-section-title: clamp(2rem, 4vw, 3.25rem);
--text-subhead: 1.25rem;
--text-body: 1rem;
--text-meta: 0.8125rem;
```
