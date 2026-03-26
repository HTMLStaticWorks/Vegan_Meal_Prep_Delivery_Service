import os
import re

# Map file path to the label that should be active
files_map = {
    r'd:\vegan\dashboard\index.html': 'Overview',
    r'd:\vegan\dashboard\weekly-plan.html': 'Weekly Plan',
    r'd:\vegan\dashboard\deliveries.html': 'Deliveries',
    r'd:\vegan\dashboard\favorites.html': 'Saved Meals',
    r'd:\vegan\dashboard\preferences.html': 'Account Settings'
}

for f_path, active_label in files_map.items():
    if not os.path.exists(f_path): continue
    with open(f_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Fix Overview link across dashboard sub-pages to target index.html properly
    content = content.replace('href="../index.html" class="nav-link', 'href="index.html" class="nav-link')
    
    # 2. Reset and set active class based on the current page's label
    content = content.replace('nav-link active', 'nav-link')
    
    # Pattern to find a link containing the specific label and add 'active'
    # This assumes the label is directly or indirectly inside the <a> tag
    pattern = re.compile(rf'(<a\s+[^>]*class="nav-link)([^"]*">.*?{re.escape(active_label)}.*?</a>)', re.DOTALL | re.IGNORECASE)
    content = pattern.sub(r'\1 active\2', content)

    with open(f_path, 'w', encoding='utf-8') as f:
        f.write(content)
