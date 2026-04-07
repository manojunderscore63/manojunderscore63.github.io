/* ============================================================
   CVscript.js — Kapisa Landing Page
   - Sticky navbar blur on scroll
   - Scroll-reveal via IntersectionObserver
   - Smooth scroll anchors
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
            // Unobserve after revealing so it stays visible
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

// ── Smooth scroll anchors ─────────────────────────────────
const appsLink  = document.querySelector('#apps');
const connectEl = document.querySelector('#connect_t');

if (appsLink) {
    appsLink.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector('#applist');
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

const connectNavLink = document.querySelector('a[href="#connect"]');
if (connectNavLink) {
    connectNavLink.addEventListener('click', function (e) {
        e.preventDefault();
        const footer = document.querySelector('#connect');
        if (footer) footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

// ── Hero icon click ───────────────────────────────────────
const mainIcon = document.querySelector('#main_icon');
if (mainIcon) {
    mainIcon.addEventListener('click', function () {
        // Reserved for future use
    });
}

console.log('Kapisa loaded');
