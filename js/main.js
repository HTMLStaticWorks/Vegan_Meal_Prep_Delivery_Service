document.addEventListener('DOMContentLoaded', () => {
    /* -------------------------------------------------------------------------- */
    /*                                Theme Toggle                                */
    /* -------------------------------------------------------------------------- */
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    const htmlElement = document.documentElement;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const currentTheme = savedTheme || systemTheme;

    htmlElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            toggleTheme();
        });
    }

    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            toggleTheme();
        });
    }

    function toggleTheme() {
        const newTheme = htmlElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    }

    function updateThemeIcon(theme) {
        const toggleIcons = document.querySelectorAll('#theme-toggle i, #mobile-theme-toggle i');
        const toggles = document.querySelectorAll('#theme-toggle, #mobile-theme-toggle');
        
        toggleIcons.forEach(icon => {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        });
        
        toggles.forEach(toggle => {
            toggle.classList.toggle('active', theme === 'dark');
        });
    }

    /* -------------------------------------------------------------------------- */
    /*                                 RTL Toggle                                 */
    /* -------------------------------------------------------------------------- */
    const rtlToggle = document.getElementById('rtl-toggle');
    const mobileRtlToggle = document.getElementById('mobile-rtl-toggle'); // Future-proofing for mobile menu
    const isRTL = localStorage.getItem('rtl') === 'true';

    const setRTL = (value) => {
        htmlElement.setAttribute('dir', value ? 'rtl' : 'ltr');
        localStorage.setItem('rtl', value);
        if (rtlToggle) rtlToggle.classList.toggle('active', value);
        if (mobileRtlToggle) mobileRtlToggle.classList.toggle('active', value);
    };

    if (isRTL) {
        setRTL(true);
    }

    if (rtlToggle) {
        rtlToggle.addEventListener('click', () => {
            const currentRTL = htmlElement.getAttribute('dir') === 'rtl';
            setRTL(!currentRTL);
        });
    }
    
    if (mobileRtlToggle) {
        mobileRtlToggle.addEventListener('click', () => {
            const currentRTL = htmlElement.getAttribute('dir') === 'rtl';
            setRTL(!currentRTL);
        });
    }

    /* -------------------------------------------------------------------------- */
    /*                               Hamburger Menu                               */
    /* -------------------------------------------------------------------------- */
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const closeMenu = document.getElementById('close-menu');

    if (hamburger && mobileNav && mobileOverlay) {
        const toggleMenu = () => {
            mobileNav.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            hamburger.classList.toggle('active');
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        };

        hamburger.addEventListener('click', toggleMenu);
        mobileOverlay.addEventListener('click', toggleMenu);
        if (closeMenu) closeMenu.addEventListener('click', toggleMenu);
    }

    // Dropdown Toggle for Mobile
    const dropdowns = document.querySelectorAll('.dropdown > a');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', (e) => {
            if (window.innerWidth <= 1024) {
                e.preventDefault();
                const parent = dropdown.parentElement;
                parent.classList.toggle('active');
            }
        });
    });

    /* -------------------------------------------------------------------------- */
    /*                               Form Validation                              */
    /* -------------------------------------------------------------------------- */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            const submitBtn = contactForm.querySelector('button[type="submit"]');

            if (!name || !email || !message) {
                showToast('Please fill in all fields', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showToast('Please enter a valid email address', 'error');
                return;
            }

            // Mock success
            setLoading(submitBtn, true);
            setTimeout(() => {
                setLoading(submitBtn, false);
                showToast('Message sent successfully! We will get back to you soon.', 'success');
                contactForm.reset();
            }, 2000);
        });
    }

    /* -------------------------------------------------------------------------- */
    /*                               Auth Forms Logic                             */
    /* -------------------------------------------------------------------------- */
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            setLoading(submitBtn, true);
            setTimeout(() => {
                setLoading(submitBtn, false);
                showToast('Login Successful! Welcome back.', 'success');
                setTimeout(() => window.location.href = 'dashboard.html', 1000);
            }, 1200);
        });
    }

    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const password = document.getElementById('password').value;
            const confirm = document.getElementById('confirm-password').value;
            const submitBtn = signupForm.querySelector('button[type="submit"]');

            if (password !== confirm) {
                showToast('Passwords do not match!', 'error');
                return;
            }

            setLoading(submitBtn, true);
            setTimeout(() => {
                setLoading(submitBtn, false);
                showToast('Account created successfully!', 'success');
                setTimeout(() => window.location.href = 'dashboard.html', 1000);
            }, 1200);
        });
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function setLoading(btn, isLoading) {
        const originalText = btn.getAttribute('data-text') || btn.innerText;
        if (isLoading) {
            btn.setAttribute('data-text', originalText);
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            btn.disabled = true;
        } else {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    }

    /* -------------------------------------------------------------------------- */
    /*                               Dashboard Logic                               */
    /* -------------------------------------------------------------------------- */
    const prefForm = document.getElementById('preferences-form');
    if (prefForm) {
        prefForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = prefForm.querySelector('button[type="submit"]');
            setLoading(submitBtn, true);
            setTimeout(() => {
                setLoading(submitBtn, false);
                showToast('Preferences updated successfully!', 'success');
            }, 1500);
        });
    }

    /* -------------------------------------------------------------------------- */
    /*                                   Toast Logic                              */
    /* -------------------------------------------------------------------------- */
    window.showToast = function(message, type = 'success') {
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
        }

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        toastContainer.appendChild(toast);
        
        // Style toast dynamically
        Object.assign(toast.style, {
            backgroundColor: type === 'success' ? 'var(--success)' : type === 'warning' ? '#f59e0b' : 'var(--danger)',
            color: 'white',
            padding: '1rem var(--spacing-md)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--spacing-sm)',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-md)',
            animation: 'fadeIn 0.3s ease-out forwards',
            zIndex: '3000'
        });

        if (!toastContainer.style.position) {
            Object.assign(toastContainer.style, {
                position: 'fixed',
                bottom: 'var(--spacing-xl)',
                right: 'var(--spacing-xl)',
                zIndex: '3000'
            });
        }

        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.3s ease-in forwards';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
    /* -------------------------------------------------------------------------- */
    /*                             Back to Top Button                             */
    /* -------------------------------------------------------------------------- */
    const backToTop = document.createElement('div');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Added to style sheet dynamically for toast
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeOut {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(20px); }
}
`;
document.head.appendChild(style);
