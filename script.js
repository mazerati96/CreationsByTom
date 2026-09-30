// Tom's Jewelry — minimal site JS
// Handles: mobile nav toggle, gallery filtering, lightbox, scroll reveal, footer year.

document.addEventListener('DOMContentLoaded', () => {

    // --- Footer year ---
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // --- Mobile nav toggle ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', isOpen);
        });
        // Close menu after tapping a link (mobile)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // --- Gallery filtering ---
    const filterButtons = document.querySelectorAll('#galleryFilters button');
    const galleryItems = document.querySelectorAll('#galleryGrid .gallery-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;

            galleryItems.forEach(item => {
                const matches = filter === 'all' || item.dataset.category === filter;
                item.hidden = !matches;
            });
        });
    });

    // --- Lightbox ---
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxName = document.getElementById('lightboxName');
    const lightboxTag = document.getElementById('lightboxTag');
    const lightboxPlaceholderText = document.getElementById('lightboxPlaceholderText');
    const lightboxImage = document.getElementById('lightboxImage');

    function openLightbox(item) {
        lightboxName.textContent = item.dataset.name || '';
        lightboxTag.textContent = item.dataset.tag || '';

        // If the gallery item has a real <img>, mirror it into the lightbox.
        // Otherwise keep showing the placeholder pattern with the same label.
        const sourceImg = item.querySelector('img');
        lightboxImage.querySelectorAll('img').forEach(img => img.remove());
        if (sourceImg) {
            const clone = sourceImg.cloneNode(true);
            lightboxImage.appendChild(clone);
            lightboxPlaceholderText.textContent = '';
        } else {
            lightboxPlaceholderText.textContent = '[ photo placeholder ]';
        }

        lightbox.hidden = false;
        lightboxClose.focus();
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.hidden = true;
        document.body.style.overflow = '';
    }

    galleryItems.forEach(item => {
        item.addEventListener('click', () => openLightbox(item));
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && !lightbox.hidden) closeLightbox();
    });

    // --- Scroll reveal ---
    const revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revealEls.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealEls.forEach(el => observer.observe(el));
    } else {
        // No IntersectionObserver support (or no items) — just show everything.
        revealEls.forEach(el => el.classList.add('is-visible'));
    }

});