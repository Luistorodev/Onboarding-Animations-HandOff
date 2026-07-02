---
name: project-animation-handoff
description: Qué es el proyecto Onboarding-Animations-HandOff y su arquitectura real
metadata:
  type: project
---

Proyecto de **handoff de animaciones** para el onboarding de Ontop: una herramienta de referencia para que ingeniería estudie timing/easing/transiciones de cada animación de forma aislada. Stack: **HTML + CSS + JS vanilla**, sin build ni servidor (se abre directo).

Arquitectura real (ver [[feedback-spec-vs-implementacion]]):
- `index.html` = hub: grid de cards (`css/handoff.css`), una card por animación, cada una linkea a una página standalone.
- Cada animación es su propia página HTML autocontenida (splash, open-app, value-prop, keyboard, input-errors, input-otp, login (bottomsheet via `?demo=`), success, verified, stroke, banner, highlight, activation, address, transitions).
- `js/handoff-controls.js` inyecta pills flotantes "Back to Handoff" + "Replay" en cada demo. Las páginas exponen `window.__hfReplay()` para replay custom; si no, hace reload. Respeta `?embed=1` (no inyecta pills cuando la página va embebida en un iframe de otra demo).
- CSS compartido: `css/style.css` (device-frame, app base) + `css/handoff.css` (chrome del handoff). CSS por-demo: activation, input-errors, input-otp, keyboard, login, signup-flow, success, add-funds.
- Assets: videos mp4, PNGs, SVGs y Lotties JSON (`assets/new-succes-lottie.json`, `new-assets/*.json` para splash/value-prop/verified). Lottie via `lottie-player` de unpkg. Iconos: Phosphor. Fuente: General Sans (fontshare).
- Device frame: 360×780, border-radius 40, fondo negro.

Dueño: [[user-luis-toro]]. Spec en `.kiro/specs/animation-handoff/` (requirements.md + design.md; no hay tasks.md).
