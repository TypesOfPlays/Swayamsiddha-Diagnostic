// ============================================================
// SWAYAMSIDDHA DIAGNOSTIC — MAIN SCRIPT (Portfolio)
// ============================================================

// ===== LOADER =====
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('expand');
            setTimeout(() => {
                loader.classList.add('show-full');
            }, 850);
            setTimeout(() => {
                loader.classList.add('hidden');
                setTimeout(() => {
                    loader.remove();
                }, 700);
            }, 3350);
        }, 180);
    }
});

// ===== DESKTOP EMAIL LINKS: OPEN GMAIL WEB =====
(function setupDesktopEmailLinks() {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    if (!emailLinks.length) return;

    const desktopQuery = window.matchMedia('(min-width: 769px) and (hover: hover)');
    const gmailCompose = 'https://mail.google.com/mail/?view=cm&fs=1&to=swayamsiddha999%40yahoo.com&su=Diagnostic%20Service%20Enquiry';

    function syncEmailLinks() {
        emailLinks.forEach(link => {
            if (!link.dataset.mailtoHref) {
                link.dataset.mailtoHref = link.getAttribute('href');
            }

            if (desktopQuery.matches) {
                link.setAttribute('href', gmailCompose);
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener');
            } else {
                link.setAttribute('href', link.dataset.mailtoHref);
                link.removeAttribute('target');
                link.removeAttribute('rel');
            }
        });
    }

    syncEmailLinks();
    desktopQuery.addEventListener?.('change', syncEmailLinks);
})();

// ===== WHATSAPP LINKS: WEB ON DESKTOP, APP-FRIENDLY ON MOBILE =====
(function setupWhatsAppLinks() {
    const links = document.querySelectorAll('.whatsapp-link');
    if (!links.length) return;

    const phone = '917847889009';
    const message = 'Hello Swayamsiddha Diagnostic, I want to know more about your services.';
    const encodedMessage = encodeURIComponent(message);
    const webUrl = `https://web.whatsapp.com/send?phone=${phone}&text=${encodedMessage}`;
    const mobileUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
    const desktopQuery = window.matchMedia('(min-width: 769px) and (hover: hover)');

    links.forEach(link => {
        link.setAttribute('href', desktopQuery.matches ? webUrl : mobileUrl);

        link.addEventListener('click', event => {
            if (!desktopQuery.matches) return;

            event.preventDefault();
            window.open(webUrl, '_blank', 'noopener');
        });
    });
})();

// ===== PARTICLES =====
(function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    const colors = ['#0e7490', '#14b8a6', '#22d3ee', '#67e8f9', '#ccfbf1'];
    const vw = window.innerWidth || 1024;
    const maxCount = vw < 480 ? 8 : (vw < 768 ? 14 : 28);
    for (let i = 0; i < maxCount; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        const size = (Math.random() * 4 + 2) + 'px';
        p.style.cssText = `
            left: ${Math.random() * 100}vw;
            width: ${size}; height: ${size};
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            animation-duration: ${Math.random() * 12 + 8}s;
            animation-delay: ${Math.random() * 10}s;
        `;
        container.appendChild(p);
    }
})();

// ===== NAVBAR: SCROLL SHRINK =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');

navToggle?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen.toString());
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close mobile nav when a link is clicked
const navLinkItems = navLinks ? navLinks.querySelectorAll('a') : [];
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle?.classList.remove('open');
        navToggle?.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    });
});

// Close mobile nav when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks?.classList.contains('open') && !navbar?.contains(e.target)) {
        navLinks.classList.remove('open');
        navToggle?.classList.remove('open');
        navToggle?.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
});

// ===== REVEAL ON SCROLL =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navAnchors.forEach(a => {
                a.style.fontWeight = a.getAttribute('href') === `#${id}` ? '800' : '600';
                if (a.getAttribute('href') === `#${id}`) {
                    a.style.color = 'var(--primary)';
                } else if (!a.classList.contains('nav-cta')) {
                    a.style.color = '';
                }
            });
        }
    });
}, { threshold: 0.45 });

sections.forEach(s => sectionObserver.observe(s));
