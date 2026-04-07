/* ============================================================
   CVscript.js — Kapisa Landing Page v2
   - Sticky navbar blur on scroll
   - Scroll-reveal via IntersectionObserver
   - Smooth scroll anchors
   - Cursor glow tracking
   - Scroll indicator hide
   ============================================================ */

// ── Cursor glow ───────────────────────────────────────────
const cursorGlow = document.getElementById('cursorGlow');

if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, { passive: true });

    function animateGlow() {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top  = glowY + 'px';
        requestAnimationFrame(animateGlow);
    }
    animateGlow();
}

// ── Navbar scroll effect ──────────────────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function () {
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Hide scroll indicator after user scrolls
    const indicator = document.getElementById('scrollIndicator');
    if (indicator) {
        if (window.scrollY > 60) {
            indicator.classList.add('hidden');
        } else {
            indicator.classList.remove('hidden');
        }
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
    threshold: 0.1,
    rootMargin: '0px 0px -48px 0px'
});

revealElements.forEach(function (el) {
    revealObserver.observe(el);
});

// ── Smooth scroll anchors ─────────────────────────────────
const appsLink = document.querySelector('#apps');

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

// ── Nav brand scroll to top ───────────────────────────────
const navBrand = document.querySelector('.nav-brand');
if (navBrand) {
    navBrand.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ── Scroll indicator click ────────────────────────────────
const scrollIndicator = document.getElementById('scrollIndicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function () {
        const target = document.querySelector('#applist');
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    scrollIndicator.style.cursor = 'pointer';
}

console.log('Kapisa loaded');
