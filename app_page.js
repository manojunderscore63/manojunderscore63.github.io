/* ============================================================
   app_page.js — Daily Planner Product Page
   - Sticky navbar blur on scroll
   - Scroll-reveal via IntersectionObserver
   - Screenshot carousel drag-to-scroll
   ============================================================ */

// ── Navbar scroll effect ──────────────────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function () {
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, { passive: true });

// ── Scroll-reveal (Intersection Observer) ────────────────
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(function (el) {
    revealObserver.observe(el);
});

// ── Screenshot carousel: drag-to-scroll ──────────────────
const screenshotsEl = document.querySelector('.screenshots-scroll');

if (screenshotsEl) {
    let isDown = false;
    let startX;
    let scrollLeft;

    screenshotsEl.addEventListener('mousedown', function (e) {
        isDown = true;
        screenshotsEl.style.cursor = 'grabbing';
        startX = e.pageX - screenshotsEl.offsetLeft;
        scrollLeft = screenshotsEl.scrollLeft;
    });

    screenshotsEl.addEventListener('mouseleave', function () {
        isDown = false;
        screenshotsEl.style.cursor = 'grab';
    });

    screenshotsEl.addEventListener('mouseup', function () {
        isDown = false;
        screenshotsEl.style.cursor = 'grab';
    });

    screenshotsEl.addEventListener('mousemove', function (e) {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - screenshotsEl.offsetLeft;
        const walk = (x - startX) * 1.4;
        screenshotsEl.scrollLeft = scrollLeft - walk;
    });

    // Set initial cursor
    screenshotsEl.style.cursor = 'grab';
}

// ── Smooth scroll to connect ─────────────────────────────
const connectNavLink = document.querySelector('a[href="#connect"]');
if (connectNavLink) {
    connectNavLink.addEventListener('click', function (e) {
        e.preventDefault();
        const footer = document.getElementById('connect');
        if (footer) footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}
