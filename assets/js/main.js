/**
 * V-Prep Vegan Meal Service - Main JS
 * Author: Antigravity AI
 * Year: 2026
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileMenu();
    initStickyHeader();
    initRevealAnimations();
    initActiveLinks();
    initCartButtons();
});

/* Global Add-to-Cart Button Handler (works on all pages) */
function initCartButtons() {
    // Use event delegation so it works for both static and dynamically rendered cards
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.add-to-cart-btn');
        if (!btn) return;

        const rawData = btn.dataset.meal;
        if (!rawData) return;

        try {
            const mealData = JSON.parse(rawData);
            if (window.Cart) {
                window.Cart.addToCart(mealData.id, mealData);

                // Visual feedback: briefly animate the button
                btn.classList.add('scale-90');
                setTimeout(() => btn.classList.remove('scale-90'), 150);
            }
        } catch (err) {
            console.warn('Cart: Could not parse meal data', err);
        }
    });
}

/* Theme Management */
function initTheme() {
    const themeToggleBtns = document.querySelectorAll('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('v-prep-theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark');
        updateThemeIcons('dark');
    }

    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            body.classList.toggle('dark');
            const isDark = body.classList.contains('dark');
            localStorage.setItem('v-prep-theme', isDark ? 'dark' : 'light');
            updateThemeIcons(isDark ? 'dark' : 'light');
        });
    });
}

function updateThemeIcons(theme) {
    const sunIcons = document.querySelectorAll('.sun-icon');
    const moonIcons = document.querySelectorAll('.moon-icon');

    if (theme === 'dark') {
        sunIcons.forEach(i => i.classList.remove('hidden'));
        moonIcons.forEach(i => i.classList.add('hidden'));
    } else {
        sunIcons.forEach(i => i.classList.add('hidden'));
        moonIcons.forEach(i => i.classList.remove('hidden'));
    }
}

/* Mobile Menu */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuCloseBtn = document.getElementById('mobile-menu-close');

    if (menuBtn && mobileMenu && menuCloseBtn) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-full');
        });

        menuCloseBtn.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
        });
        
        // Close menu on link click
        const navLinks = mobileMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('translate-x-full');
            });
        });
    }
}

/* Sticky Header */
function initStickyHeader() {
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('bg-white/90', 'backdrop-blur-md', 'shadow-sm', 'py-3');
            header.classList.remove('py-5', 'bg-transparent');
            if (document.body.classList.contains('dark')) {
                header.classList.add('bg-slate-900/90');
                header.classList.remove('bg-white/90');
            }
        } else {
            header.classList.remove('bg-white/90', 'bg-slate-900/90', 'backdrop-blur-md', 'shadow-sm', 'py-3');
            header.classList.add('py-5', 'bg-transparent');
        }
    });
}

/* Intersection Observer for reveal animations */
function initRevealAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

/* Highlight Active Nav Link */
/* Highlight Active Nav Link */
function initActiveLinks() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    
    // Select all potential navigation links including mobile menu and dropdowns
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-item, #mobile-menu nav a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;

        // Reset states
        link.classList.remove('text-secondary', 'font-bold', 'active');
        
        // Match logic for Home 1 and Home 2
        let isMatch = (href === page);
        
        // Special case for root
        if (page === 'index.html' && (href === 'index.html' || href === './')) isMatch = true;
        
        // Parent indicator for dropdowns
        if (isMatch) {
            link.classList.add('text-secondary', 'font-bold', 'active');
            
            // If it's a dropdown item, also highlight the parent nav-link
            const parentDropdown = link.closest('.nav-item-dropdown');
            if (parentDropdown) {
                const parentLink = parentDropdown.querySelector('.nav-link');
                if (parentLink) parentLink.classList.add('active', 'text-secondary');
            }
        }
    });
}
