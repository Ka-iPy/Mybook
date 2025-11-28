document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.main-nav');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            nav.classList.toggle('nav-open');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu if open
            if (nav.classList.contains('nav-open')) {
                nav.classList.remove('nav-open');
            }

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Expand/Collapse Side Stories
    const readMoreBtns = document.querySelectorAll('.read-more-btn');

    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const isHidden = content.classList.contains('hidden');

            if (isHidden) {
                content.classList.remove('hidden');
                btn.textContent = 'Read Less';
            } else {
                content.classList.add('hidden');
                btn.textContent = 'Read Full Teaser';
            }
        });
    });

    // Intersection Observer for Mist Reveal Animation
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Apply animation classes and delays
    const loreCards = document.querySelectorAll('.lore-card');
    loreCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 200}ms`; // Staggered delay
        observer.observe(card);
    });

    // Also observe other animated elements if needed, or just the lore cards as requested
    // For consistency, let's observe story previews too but without the heavy mist effect (unless added to CSS)
    // The user specifically asked for Lore section mist reveal.
    // We can reuse the observer for other elements if we want them to fade in simply.
    const otherAnimatedElements = document.querySelectorAll('.story-preview');
    otherAnimatedElements.forEach(el => {
        // Ensure they have a base style for fading in if not already handled by CSS
        // For now, we'll just observe them and let CSS handle .in-view if defined, 
        // or we can add a generic fade-in class.
        // Given the specific request, let's focus on Lore Cards.
        // But the previous code animated them, so let's keep basic fade-in for them.
        el.classList.add('fade-in-scroll'); // We might need to add this class to CSS if we want generic fade
        observer.observe(el);
    });
});
