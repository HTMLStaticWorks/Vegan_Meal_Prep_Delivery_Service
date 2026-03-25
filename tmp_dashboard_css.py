
import sys

filepath = r'd:\vegan\css\style.css'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Responsive Dashboard Container & Center Alignment Fix
dashboard_style_upgrade = """
/* Dashboard Responsive Refactor */
@media (max-width: 992px) {
    .dashboard-container {
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
        gap: var(--spacing-xl) !important;
        max-width: 700px;
        margin: 0 auto !important;
        padding: var(--spacing-md) !important;
        text-align: center !important;
    }

    .dashboard-content {
        width: 100% !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
    }

    .dashboard-content .grid-4, 
    .dashboard-content .grid-2 {
        grid-template-columns: 1fr !important;
        width: 100% !important;
    }

    .dashboard-sidebar {
        position: fixed !important;
        top: 0;
        left: -300px;
        width: 280px;
        height: 100vh !important;
        background: var(--surface);
        z-index: 4000 !important;
        transition: all 0.4s ease;
        padding: var(--spacing-xl) !important;
        box-shadow: var(--shadow-2xl) !important;
        visibility: hidden;
        display: block !important;
        text-align: left !important;
    }

    .dashboard-sidebar.active {
        left: 0 !important;
        visibility: visible !important;
    }

    /* Keep the Hero section centered as well */
    .page-hero {
        text-align: center !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
    }
}

.dashboard-header {
    background: var(--surface);
    position: sticky;
    top: 0;
    z-index: 1000;
}

#mobile-overlay.active, 
#dashboard-overlay.active {
    display: block !important;
    z-index: 3999 !important;
}
"""

if "/* Dashboard Responsive Refactor" not in content:
    content += dashboard_style_upgrade

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Dashboard CSS refined.")
