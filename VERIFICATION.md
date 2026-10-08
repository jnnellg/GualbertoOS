# Verification

Production build passes with Vite 7.3.7 and Node 24.19.

Automated DOM checks passed for all 11 app open/minimize/restore/expand/close cycles; dragging and resizing; dock magnification; gallery navigation and URL updates; Spotlight search and launch; Terminal commands; appearance/accent controls; stars and reduced motion; local email drafts; menu controls; sleep and shutdown overlays. No runtime errors were observed in these checks. Unique element IDs and local download/portrait destinations were checked.

These DOM checks do not render pixels. A visual browser comparison remains unverified: the remote browser could not reach the local server, and local-file navigation is blocked by browser policy. The reference interface source, styling and effects are retained, but content-specific differences are documented in REFERENCE-NOTES.md. Follow START-HERE.md to review the rendered site locally before publishing.
