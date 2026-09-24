# SEDGE Ventures website

Static HTML site (no build step, no framework). Every page is a standalone
`.html` file with inline `<style>` and `<script>`. Hosted on **GitHub Pages**,
which auto-publishes whatever is on `main` within a minute or two of a push —
there is no separate manual deploy step.

Local preview only (never required before pushing, but useful to sanity-check
visually): `.claude/launch.json` runs `python3 -m http.server 8001`.

## Publishing a weekly research article

The user posts a new research article roughly every week and wants this to
require no local setup on their end — they just send the article text to
Claude Code in chat, and it goes live on its own.

When the user gives you a new article (text, a headline, tags, optionally
images), do the following without asking them to touch localhost or deploy
anything themselves:

1. **Pick a slug** from the company/ticker/topic, e.g. `article-<slug>.html`
   (see `article-dt120.html`, `article-rare.html` for naming precedent).

2. **Copy `article-template.html`** to `article-<slug>.html` and fill in every
   `{{PLACEHOLDER}}`:
   - `{{HEADLINE_PLAIN}}` — plain-text headline for the `<title>` tag
   - `{{TAG_1}}` / `{{TAG_2}}` / `{{TAG_3}}` — short topic tags
   - `{{HEADLINE_HTML}}` — the H1, `<br>` allowed for a line break
   - `{{SUBHEAD}}` — italic one-line dek under the headline
   - `{{DATE}}` — e.g. `24 Sep 2026`
   - `{{READ_TIME}}` — e.g. `7 Min Read` (~200 words/min is a fair estimate)
   - `{{HERO_IMG}}` / `{{HERO_ALT}}` / `{{HERO_CAPTION}}` — hero image; if the
     user gave no image, reuse the plain-SVG approach from
     `article-rare.html`'s thumb instead of leaving a broken `<img>`
   - `{{BODY_HTML}}` — the article body. Use the component classes already
     styled in the template (`.lede`, `.dropcap`, `h2`, `.pq`, `figure`,
     `.stat-strip`, `.callout`, `.pipe-row`, `.verdict`) — see
     `article-dt120.html` for worked examples of each. Keep the `.disclosure`
     block at the end exactly as the template has it (fixed compliance text,
     don't edit it per-article).

3. **Save any provided images** into `assets/research/` with descriptive
   filenames (e.g. `assets/research/<slug>-01.png`).

4. **Update `research.html`**:
   - Bump the article count in the `<!-- COUNT BAR -->` section
     (`<span class="meta">N Articles</span>`).
   - Insert a new card for the article at the top of the `<!-- ARTICLES -->`
     section, copying the markup of the current featured card
     (`<a href="..." class="art-card rv mb-6">…</a>`), marked `Featured`.
   - Demote the previous featured card: remove its `Featured` label/badge and
     relabel it `Note 0N` (matching the style already used on the second
     card), keeping everything else about its markup as-is. Do this for each
     existing card as newer ones push it down — always keep exactly one
     `Featured` card, at the top.

5. **Sanity-check visually** using the browser pane (`preview_start` with the
   `sedge-site` config, or reload if already running) before pushing — this is
   Claude's own verification step, not something the user needs to do.

6. **Commit and push to `main`**. GitHub Pages picks it up automatically —
   there is nothing further for the user to do. Tell them the article is live
   and give them the URL once pushed.
