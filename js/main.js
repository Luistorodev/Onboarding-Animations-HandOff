// js/main.js
document.addEventListener("DOMContentLoaded", () => {
    // Complex navigation interaction for the mockup with view routing
    const navItems = document.querySelectorAll(".nav-item");
    const viewHome = document.getElementById("view-home");
    const viewCard = document.getElementById("view-card");
    const appContainer = document.querySelector(".app-container");
    
    // Map of nav indexes to views (0 = Home, 1 = Card)
    const viewMap = [viewHome, viewCard, null, null, null];
    let currentIndex = 0;       // visually highlighted nav item
    let lastRealViewIndex = 0;  // index of the last view actually shown on screen

    navItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            if (item.classList.contains("active")) return;

            navItems.forEach(nav => nav.classList.remove("active"));
            item.classList.add("active");
            currentIndex = index;

            const nextView = viewMap[index];

            // Unimplemented tab: only update the nav highlight, leave views untouched
            if (nextView === null) return;

            const currentView = viewMap[lastRealViewIndex];

            if (nextView === currentView) return; // same real view, nothing to do

            // Scroll to top
            appContainer.scrollTop = 0;

            // Reset animation classes
            currentView.className = "app-content view-pane";
            nextView.className = "app-content view-pane";

            // Prevent double-animation of the card by removing the class before it becomes visible
            if (nextView.id === 'view-card') {
                const firstSlide = nextView.querySelector('#cardsTrack .card-slide');
                if (firstSlide) firstSlide.classList.remove('play-anim');
            }

            // Direction: use lastRealViewIndex for correct left/right slide
            if (index > lastRealViewIndex) {
                currentView.classList.add("slide-out-left");
                nextView.classList.add("slide-in-right");
            } else {
                currentView.classList.add("slide-out-right");
                nextView.classList.add("slide-in-left");
            }

            lastRealViewIndex = index;

            // Reset reddish theme when leaving Card view
            const bgTint = document.getElementById('appBgTint');
            if (bgTint) {
                if (nextView.id !== 'view-card') {
                    bgTint.classList.remove('physical-theme');
                } else if (currentCardIndex === 1) {
                    bgTint.classList.add('physical-theme');
                }
            }

            // Fire card entry animation much earlier (during the slide-in transition)
            if (nextView.id === 'view-card') {
                setTimeout(() => {
                    if (lastRealViewIndex === index) {
                        const firstSlide = nextView.querySelector('#cardsTrack .card-slide');
                        if (firstSlide) {
                            firstSlide.classList.remove('play-anim');
                            void firstSlide.offsetWidth;
                            firstSlide.classList.add('play-anim');
                        }
                    }
                }, 100);
            }

            setTimeout(() => {
                if (lastRealViewIndex === index) {
                    currentView.className = "app-content view-pane";
                    nextView.className = "app-content view-pane active";
                }
            }, 400);
        });
    });

    // Allow clicking the card itself to replay the animation manually
    // (removed – flare now only fires on section entry, not on card click)

    // Sub-interaction: animate account cards on click
    const accountCards = document.querySelectorAll('.account-card');
    accountCards.forEach(card => {
        card.addEventListener('click', () => {
            card.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest', 
                inline: 'center' 
            });
        });
    });

    // --- Card Slider (Virtual ↔ Physical) ---
    const cardsTrack  = document.getElementById('cardsTrack');
    const cardToggle  = document.getElementById('cardToggle');
    const toggleOpts  = document.querySelectorAll('.toggle-option');
    const cardSlides  = document.querySelectorAll('#cardsTrack .card-slide');

    let currentCardIndex = 0; // 0 = Virtual, 1 = Physical
    const appBgTint = document.getElementById('appBgTint');

    function switchToCard(index) {
        if (index === currentCardIndex) return;
        currentCardIndex = index;

        // Slide the track
        if (index === 1) {
            cardsTrack.classList.add('show-physical');
        } else {
            cardsTrack.classList.remove('show-physical');
        }

        // Update toggle pill & labels
        toggleOpts.forEach((btn, i) => {
            btn.classList.toggle('active', i === index);
        });
        if (index === 1) {
            cardToggle.classList.add('physical-active');
        } else {
            cardToggle.classList.remove('physical-active');
        }

        // Subtle background color shift
        if (appBgTint) {
            if (index === 1) {
                appBgTint.classList.add('physical-theme');
            } else {
                appBgTint.classList.remove('physical-theme');
            }
        }
    }

    // Clicking the card slides to the other one
    cardSlides.forEach((slide, i) => {
        slide.addEventListener('click', () => {
            switchToCard(currentCardIndex === 0 ? 1 : 0);
        });
    });

    // Toggle buttons also work as a shortcut
    toggleOpts.forEach((btn, i) => {
        btn.addEventListener('click', () => switchToCard(i));
    });

    // --- Add Funds Overlay (Digital USD Onboarding) ---
    const addBtn       = document.querySelector('.action-btn.secondary');
    const addOverlay   = document.getElementById('addFundsOverlay');
    const addBackBtn   = document.getElementById('addFundsBack');
    const addCtaBtn    = document.getElementById('addFundsCta');

    function openAddFunds() {
        if (!addOverlay) return;
        addOverlay.classList.remove('closing');
        addOverlay.classList.add('open');
    }

    function closeAddFunds() {
        if (!addOverlay) return;
        addOverlay.classList.add('closing');
        addOverlay.classList.remove('open');
        // Wait for exit animation to finish, then reset
        setTimeout(() => {
            addOverlay.classList.remove('closing');
        }, 500);
    }

    if (addBtn)     addBtn.addEventListener('click', openAddFunds);
    if (addBackBtn) addBackBtn.addEventListener('click', closeAddFunds);
    // CTA just closes for now (prototype)
    if (addCtaBtn)  addCtaBtn.addEventListener('click', closeAddFunds);
});
