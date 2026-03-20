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
});

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
function initActiveLinks() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('text-secondary', 'font-bold');
            link.classList.remove('text-primary');
        }
    });
}
