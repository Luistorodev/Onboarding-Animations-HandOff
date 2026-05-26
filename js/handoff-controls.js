/* js/handoff-controls.js
   ============================================================
   Tiny utility that injects "Back to Handoff" + "Replay"
   floating pills on every animation demo page, and parses
   ?demo=<name> to auto-trigger the page-specific animation.
   ============================================================ */

(function () {
    function inject() {
        if (document.querySelector('.hf-back-pill')) return;

        // Back pill
        const back = document.createElement('a');
        back.className = 'hf-back-pill';
        back.href = 'index.html';
        back.setAttribute('aria-label', 'Back to handoff');
        back.innerHTML = '<i class="ph ph-arrow-left"></i><span>Back to Handoff</span>';
        document.body.appendChild(back);

        // Replay pill
        const replay = document.createElement('button');
        replay.className = 'hf-replay-pill';
        replay.setAttribute('type', 'button');
        replay.setAttribute('aria-label', 'Replay animation');
        replay.innerHTML = '<i class="ph ph-arrow-clockwise"></i><span>Replay</span>';
        replay.addEventListener('click', () => {
            // If the page exposes a custom replay handler, use it; else hard reload.
            if (typeof window.__hfReplay === 'function') {
                window.__hfReplay();
            } else {
                window.location.reload();
            }
        });
        document.body.appendChild(replay);

        // Make sure the handoff stylesheet is loaded
        const hasHandoffCss = Array.from(document.styleSheets).some(s =>
            (s.href || '').includes('handoff.css')
        );
        if (!hasHandoffCss) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'css/handoff.css';
            document.head.appendChild(link);
        }
    }

    function autoTrigger() {
        const params = new URLSearchParams(window.location.search);
        const demo = params.get('demo');
        if (!demo) return;
        // Expose to page scripts
        window.__hfDemo = demo;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => { inject(); autoTrigger(); });
    } else {
        inject();
        autoTrigger();
    }
})();
