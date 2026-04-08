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

// ── Lightbox ──────────────────────────────────────────────
(function () {
    // Build overlay DOM
    var overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Image preview');

    var lbFrame = document.createElement('div');
    lbFrame.className = 'lightbox-frame';

    var lbImg = document.createElement('img');
    lbImg.className = 'lightbox-img';

    var lbClose = document.createElement('button');
    lbClose.className = 'lightbox-close';
    lbClose.setAttribute('aria-label', 'Close preview');
    lbClose.textContent = '✕';

    lbFrame.appendChild(lbImg);
    overlay.appendChild(lbFrame);
    overlay.appendChild(lbClose);
    document.body.appendChild(overlay);

    function openLightbox(src, alt) {
        lbImg.src = src;
        lbImg.alt = alt || '';
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        overlay.classList.remove('active');
        // Wait for exit transition before clearing src
        setTimeout(function () {
            if (!overlay.classList.contains('active')) lbImg.src = '';
        }, 350);
        document.body.style.overflow = '';
    }

    // Attach to all screenshot images on page
    document.querySelectorAll('.screenshot, .hero-screenshot-img').forEach(function (img) {
        img.addEventListener('click', function () {
            openLightbox(img.src, img.alt);
        });
    });

    // Close on overlay backdrop click
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeLightbox();
    });

    // Close button
    lbClose.addEventListener('click', function (e) {
        e.stopPropagation();
        closeLightbox();
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && overlay.classList.contains('active')) closeLightbox();
    });
}());

// ── Hamburger menu ────────────────────────────────────────
const hamburger = document.getElementById('nav-hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', function (e) {
        e.stopPropagation();
        const isOpen = navLinks.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', function (e) {
        if (navbar && !navbar.contains(e.target)) {
            navLinks.classList.remove('open');
            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });

    // Close menu on nav link click
    navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            navLinks.classList.remove('open');
            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
}
