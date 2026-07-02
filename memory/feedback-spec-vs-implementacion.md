---
name: feedback-spec-vs-implementacion
description: El kiro spec no coincide con la implementación real; guiarse por el código
metadata:
  type: feedback
---

El spec en `.kiro/specs/animation-handoff/` (requirements.md, design.md) describe una versión **anterior/planeada** que NO coincide con lo implementado:
- Spec: `handoff.html` único con arquitectura **iframe-based**, sidebar con botonera, deep links por hash, 10 animaciones, tests con Vitest/fast-check.
- Real: `index.html` como hub de **cards** que navegan a **páginas standalone** (una por animación), **15 animaciones**, pills flotantes Back/Replay, sin tests, sin routing por hash.

**Why:** El proyecto pivoteó después de escribir el spec. Seguir el spec al pie llevaría a rehacer cosas.

**How to apply:** Tratar el código actual como fuente de verdad, no el spec. Confirmar con [[user-luis-toro]] antes de asumir que algo del spec sigue vigente. Nota menor: `README.md` tiene marcadores de conflicto de merge sin resolver (`=======`, `>>>>>>> e5c20fb...`) al final.
