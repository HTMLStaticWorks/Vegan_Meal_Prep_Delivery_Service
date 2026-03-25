
import sys

filepath = r'd:\vegan\css\style.css'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Responsive Utilities
responsive_utils = """
/* Responsive Utilities */
.d-tablet-only { display: none; }
@media (max-width: 1024px) {
    .d-tablet-only { display: block !important; }
}

[data-theme='dark'] .dashboard-header {
    background: var(--surface);
    border-color: var(--neutral-700);
}
"""

if "/* Responsive Utilities */" not in content:
    content += responsive_utils

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Responsive utilities and dark mode header fix added.")
