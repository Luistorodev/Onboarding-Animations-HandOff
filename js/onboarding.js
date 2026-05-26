// js/onboarding.js
(function () {
    'use strict';

    const TOTAL_SLIDES = 4;
    let currentIndex = 0;

    const track = document.getElementById('ob-track');
    const continueBtn = document.getElementById('ob-continue-btn');
    const skipBtn = document.getElementById('ob-skip-btn');
    const dots = document.querySelectorAll('#ob-dots .ob-dot');

    const slideTexts = [
        {
            headline: 'The World is<br>your Stage',
            subtext: 'All your money. One place.<br>Built for people who move first.'
        },
        {
            headline: 'Bill the Globe.<br>Get Paid, Fast',
            subtext: 'Use Ontop Pay to invoice any client, anywhere. Professional billing meets instant deposits.'
        },
        {
            headline: 'Spend Without<br>Borders',
            subtext: 'Your Ontop Visa Platinum is linked to your accounts. Virtual and physical. Spend anywhere Visa is accepted.',
            accent: true
        },
        {
            headline: 'The Global<br>Standard',
            subtext: "Don't just move, move better. 10% cashback, VIP travel, and global perks. The essential layer for your global life."
        }
    ];

    // ── Navigate to a slide ──────────────────────────────────────
    function goTo(index) {
        if (index < 0 || index >= TOTAL_SLIDES) return;

        const newSlide = track.children[index];
        newSlide.classList.add('entering');
        newSlide.addEventListener('animationend', () => {
            newSlide.classList.remove('entering');
        }, { once: true });

        currentIndex = index;
        track.style.transform = `translateX(-${index * 25}%)`;

        // Update dots
        dots.forEach((d, i) => d.classList.toggle('active', i === index));

        // Update continue button text
        if (index === TOTAL_SLIDES - 1) {
            continueBtn.textContent = 'Get Started';
        } else {
            continueBtn.textContent = 'Continue';
        }
    }

    // ── Skip (go to login) ───────────────────────────────────────
    function skip() {
        window.location.href = 'login.html';
    }

    // ── Wire up continue button ──────────────────────────────────
    if (continueBtn) {
        continueBtn.addEventListener('click', () => {
            if (currentIndex < TOTAL_SLIDES - 1) {
                goTo(currentIndex + 1);
            } else {
                window.location.href = 'login.html';
            }
        });
    }

    // ── Wire up skip button ──────────────────────────────────────
    if (skipBtn) {
        skipBtn.addEventListener('click', skip);
    }

    // ── Wire up dot clicks ───────────────────────────────────────
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.dataset.slide);
            goTo(slideIndex);
        });
    });

    // ── Touch / swipe support ────────────────────────────────────
    let touchStartX = 0;
    let touchStartY = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;

        if (Math.abs(dx) < Math.abs(dy) || Math.abs(dx) < 40) return;

        if (dx < 0 && currentIndex < TOTAL_SLIDES - 1) {
            goTo(currentIndex + 1);
        } else if (dx > 0 && currentIndex > 0) {
            goTo(currentIndex - 1);
        }
    }, { passive: true });

    // ── Initial state ────────────────────────────────────────────
    goTo(0);

})();
