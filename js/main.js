/**
 * SOFTEK — Main JavaScript
 * Interatividades da landing page
 */

(function() {
    'use strict';

    /* ---------- Inicializar ícones Lucide ---------- */
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    /* ---------- Theme Toggle ---------- */
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    function applyTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('softek-theme', theme);
    }

    function toggleTheme() {
        const current = html.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    /* ---------- Header scroll effect ---------- */
    const header = document.getElementById('header');
    let lastScroll = 0;

    function updateHeader() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();

    /* ---------- Mobile menu ---------- */
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            const isOpen = nav.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', isOpen);

            // Trocar ícone
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (isOpen) {
                    icon.setAttribute('data-lucide', 'x');
                } else {
                    icon.setAttribute('data-lucide', 'menu');
                }
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            }
        });

        // Fechar menu ao clicar em link
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-lucide', 'menu');
                    if (typeof lucide !== 'undefined') {
                        lucide.createIcons();
                    }
                }
            });
        });
    }

    /* ---------- Smooth scroll para âncoras ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = header ? header.offsetHeight + 20 : 80;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ---------- FAQ Accordion ---------- */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Fechar todos os outros
            faqItems.forEach(other => {
                if (other !== item) {
                    other.classList.remove('active');
                    other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle atual
            item.classList.toggle('active');
            question.setAttribute('aria-expanded', !isActive);
        });
    });

    /* ---------- Scroll animations (IntersectionObserver) ---------- */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Aplicar fade-in em cards e seções
    const fadeElements = document.querySelectorAll(
        '.service-card, .portfolio-card, .testimonial-card, .step, ' +
        '.problem-card, .solution-card, .faq-item, .stat'
    );

    fadeElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.05}s`;
        fadeObserver.observe(el);
    });

    /* ---------- Formulário ---------- */
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;

            // Loading state
            btn.textContent = 'Enviando...';
            btn.disabled = true;

            // Coletar dados
            const data = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value,
                date: new Date().toISOString()
            };

            // Simular envio (substituir por API real quando disponível)
            setTimeout(() => {
                console.log('Formulário enviado:', data);

                // Sucesso
                btn.textContent = 'Enviado com sucesso!';
                btn.style.background = 'linear-gradient(135deg, #059669, #10b981)';

                // Limpar formulário
                form.reset();

                // Reset após 3s
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                    btn.style.background = '';
                }, 3000);
            }, 1500);
        });
    }

    /* ---------- Ano atual no footer ---------- */
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    /* ---------- Efeito parallax sutil no hero glow ---------- */
    const heroGlow = document.querySelector('.hero-glow');
    if (heroGlow) {
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 30;
            const y = (e.clientY / window.innerHeight - 0.5) * 30;
            heroGlow.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        }, { passive: true });
    }

})();
