#!/usr/bin/env bash
# Régénère les bundles CSS/JS à partir des sources, dans l'ordre exact des pages.
# Usage : ./build-bundles.sh  (puis bumper ?v= dans les HTML si besoin)
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p assets
cat_css(){ local out="$1"; shift; : > "$out"; for f in "$@"; do printf '/* --- %s --- */\n' "$f" >> "$out"; cat "$f" >> "$out"; printf '\n' >> "$out"; done; }
cat_js(){ local out="$1"; shift; : > "$out"; for f in "$@"; do printf '/* --- %s --- */\n' "$f" >> "$out"; cat "$f" >> "$out"; printf ';\n' >> "$out"; done; }
cat_css assets/home.css style.css motion.css transitions.css continuite.css hero-animation.css section-motion.css hero-wow.css extra-motion.css immersive-hero.css immersive-sections.css voyage.css story-wow.css flight.css immersion-plus.css experience-image.css hover-space.css cv-link.css mobile-menu.css contact-extra.css timeline-fix.css continuity-v2.css timeline-links.css timeline-tags.css touch-feedback.css personal-project.css
cat_js assets/home.js script.js motion.js section-motion.js transitions.js hero-wow.js extra-motion.js immersive-hero.js immersive-sections.js voyage.js story-wow.js flight.js immersion-plus.js hover-space.js mobile-menu.js contact-extra.js continuity-v2.js touch-feedback.js
cat_css assets/detail.css style.css story-wow.css extra-motion.css immersive-sections.css section-motion.css hover-space.css continuity-v2.css detail-pages.css
cat_js assets/detail.js detail-pages.js academic-effects.js story-wow.js extra-motion.js immersive-sections.js section-motion.js hover-space.js continuity-v2.js
cat_css assets/media.css style.css detail-pages.css media-indexer.css media-demo.css media-demo-app.css
cat_js assets/media.js detail-pages.js media-demo-app.js
echo "Bundles régénérés dans assets/."
