# Maintenance du site

Mis en place le 18/11/2026 (review + PR `review-impl-t_b7321755`).

## Structure

- **Sources CSS/JS** : fichiers à la racine (`style.css`, `script.js`, etc.), éditables normalement.
- **Bundles** : `assets/home.css|js`, `assets/detail.css|js`, `assets/media.css|js` — générés et minifiés (csso/terser), référencés par les 4 pages HTML. Le build réécrit automatiquement les `url()` relatifs en `../` (les bundles vivent dans `assets/`).
- **Polices** : `fonts/fonts.css` + woff2 auto-hébergés (subsets latin + latin-ext, `font-display: swap`). Plus aucun appel à Google Fonts.
- **Images héros** : `station-480/800/960/1200.webp` + `station-optimized.webp` (1944w), servies via `srcset`/`sizes`.

## Workflow de modification

1. Éditer les fichiers sources CSS/JS.
2. Régénérer les bundles : `./build-bundles.sh`
3. Bumper le cache-busting dans les HTML : `assets/home.css?v=1` → `?v=2` (idem JS).
4. Commit + push sur `main` → GitHub Pages redéploie automatiquement.

Ne jamais éditer directement `assets/*.css|js` : ils sont écrasés par le build.

## Polices

Familles hébergées : DM Sans (400–700), Manrope (400–800), Space Mono (400/700), DM Mono, Inter.
Pour ajouter une graisse/famille : récupérer le woff2 via l'API Google Fonts css2 (avec un User-Agent Chrome), déposer dans `fonts/`, ajouter le bloc `@font-face` dans `fonts/fonts.css` avec `unicode-range`.

## Images

Pour régénérer les variantes de la station depuis `station-optimized.webp` :

```python
from PIL import Image
src = Image.open('station-optimized.webp')
for w in (480, 800, 960, 1200):
    h = int(src.height * w / src.width)
    src.resize((w, h), Image.LANCZOS).save(f'station-{w}.webp', 'WEBP', quality=80, method=6)
```

## Langue

FR/EN via attributs `data-fr`/`data-en`, choix persisté dans `localStorage` (`portfolio-language`), paramètre URL `?lang=en` prioritaire. Les liens entre pages propagent `?lang=en`.

## SEO

- `robots.txt`, `sitemap.xml` : mettre à jour le sitemap à chaque ajout de page.
- Canonical + Open Graph/Twitter Card sur chaque page (image de partage : `og-image.jpg`, 1200×630).
- `404.html` : page d'erreur personnalisée servie automatiquement par GitHub Pages.

## Cache (Cloudflare)

Le site est derrière Cloudflare. Recommandé (dashboard Cloudflare → Caching → Cache Rules) :
- Règle assets statiques (`*.css`, `*.js`, `*.webp`, `*.jpg`, `*.png`, `*.woff2`, `*.pdf`, `*.ico`, `*.svg`) : Edge TTL long + **Browser TTL 1 an** (les `?v=` assurent l'invalidation).
- HTML : laisser en revalidation courte.
- Redirection 301 apex → www + HTTP → HTTPS en 301 (règles de redirection).
- GitHub Pages : « Enforce HTTPS » activé.
