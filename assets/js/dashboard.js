/**
 * V-Prep Vegan Meal Service - Dashboard Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
});

function initDashboard() {
    const skipBtn = document.getElementById('skip-week');
    const updatePrefBtn = document.getElementById('update-pref');
    
    if (skipBtn) {
        skipBtn.addEventListener('click', () => {
            const confirmed = confirm('Are you sure you want to skip your next delivery (March 23)? You will not be charged for this week.');
            if (confirmed) {
                alert('Success! Your March 23 delivery has been skipped.');
                skipBtn.innerText = 'Resume Delivery';
                skipBtn.classList.remove('bg-white/10', 'text-white');
                skipBtn.classList.add('bg-secondary', 'text-white');
            }
        });
    }

    if (updatePrefBtn) {
        updatePrefBtn.addEventListener('click', () => {
            window.location.href = 'preferences.html';
        });
    }

    // Toggle Sidebar on Mobile
    const dashMenuBtn = document.getElementById('dash-menu-btn');
    const sidebar = document.getElementById('sidebar');
    const closeSidebar = document.getElementById('close-sidebar');

    if (dashMenuBtn && sidebar && closeSidebar) {
        dashMenuBtn.addEventListener('click', () => {
            sidebar.classList.remove('-translate-x-full');
        });

        closeSidebar.addEventListener('click', () => {
            sidebar.classList.add('-translate-x-full');
        });
    }
}
