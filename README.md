# Erich-Fill-Triathlon – Website

Offizielle Website des Erich-Fill-Triathlons in Taunusstein-Hahn.

| | |
|---|---|
| Online | https://erich-fill-triathlon.de |
| Hosting | Netlify – veröffentlicht automatisch aus diesem Repo (Branch `main`) |
| Domain | netcup |
| Repo | `ralfrouenhoff-pixel/erich-fill-triathlon` (öffentlich) |

## Aufbau

Reine HTML/CSS-Seite ohne Build-Schritt (`netlify.toml`: `publish = "."`).

- `index.html` – Startseite
- `ausschreibung-2027.html`, `briefing-2026.html`, `galerie.html`
- `agb.html`, `impressum.html`, `datenschutz.html`
- `assets/` – CSS, Schriften (selbst gehostet), Skripte
- `images/` – Bilder, die die Seiten tatsächlich zeigen

## Lokal ansehen

```
cd ~/Projekte/EFT/erich-fill-triathlon
npx serve .
```

Dann http://localhost:3000 öffnen. Für einen schnellen Blick reicht auch ein Doppelklick auf `index.html`.

## Veröffentlichen

Änderung sichern und zu GitHub hochladen – Netlify veröffentlicht innerhalb von ca. einer Minute.
Keine Hand-Uploads bei Netlify.
