/**
 * V-Prep Vegan Meal Service - Meals Filtering JS (DOM-Driven)
 */

document.addEventListener('DOMContentLoaded', () => {
    const mealGrid = document.getElementById('meal-grid');
    const tagFilter = document.getElementById('tag-filter');
    const calorieFilter = document.getElementById('calorie-filter');
    const sortFilter = document.getElementById('sort-filter');
    const searchInput = document.getElementById('search-meals');
    
    // Build internal state from the DOM cards
    function getMealsFromDOM() {
        if (!mealGrid) return [];
        const cards = Array.from(mealGrid.querySelectorAll('.meal-card'));
        return cards.map(card => {
            const img = card.querySelector('img');
            const title = card.querySelector('h3');
            const priceEl = card.querySelector('.meal-price');
            return {
                id: card.dataset.id || Date.now(),
                name: (title ? title.textContent.trim() : card.dataset.name) || '',
                category: card.dataset.category || '',
                tag: card.dataset.tag || '',
                kcal: parseInt(card.dataset.kcal || 0),
                price: parseFloat(card.dataset.price || (priceEl ? priceEl.textContent.replace('$', '') : 0)),
                desc: (card.querySelector('p')?.textContent.trim() || ''),
                element: card // Keep reference to the actual DOM node
            };
        });
    }

    let allMeals = getMealsFromDOM();

    function filterMeals() {
        if (!allMeals.length) {
            allMeals = getMealsFromDOM();
        }
        
        const searchTerm = searchInput?.value.toLowerCase() || '';
        const tagValue = tagFilter?.value || 'all';
        const calorieValue = calorieFilter?.value || 'all';
        const sortValue = sortFilter?.value || 'default';

        // Filters based on state
        allMeals.forEach(meal => {
            const matchesSearch = meal.name.toLowerCase().includes(searchTerm) || meal.desc.toLowerCase().includes(searchTerm);
            const matchesTag = tagValue === 'all' || meal.tag === tagValue;
            
            let matchesCalories = true;
            if (calorieValue === 'low') matchesCalories = meal.kcal < 350;
            else if (calorieValue === 'medium') matchesCalories = meal.kcal >= 350 && meal.kcal < 450;
            else if (calorieValue === 'high') matchesCalories = meal.kcal >= 450;

            if (matchesSearch && matchesTag && matchesCalories) {
                meal.element.classList.remove('hidden');
            } else {
                meal.element.classList.add('hidden');
            }
        });

        // Handle Sorting (Physically reorder in the grid)
        if (sortValue !== 'default' && mealGrid) {
            const sorted = [...allMeals].filter(m => !m.element.classList.contains('hidden'));
            if (sortValue === 'price-low') sorted.sort((a, b) => a.price - b.price);
            else if (sortValue === 'price-high') sorted.sort((a, b) => b.price - a.price);
            else if (sortValue === 'kcal-low') sorted.sort((a, b) => a.kcal - b.kcal);
            else if (sortValue === 'kcal-high') sorted.sort((a, b) => b.kcal - a.kcal);

            sorted.forEach(meal => mealGrid.appendChild(meal.element));
        }
        
        // Show "No meals found" logic
        const visibleCount = allMeals.filter(m => !m.element.classList.contains('hidden')).length;
        let emptyState = document.getElementById('empty-state');
        
        if (visibleCount === 0 && allMeals.length > 0) {
            if (!emptyState) {
                emptyState = document.createElement('div');
                emptyState.id = 'empty-state';
                emptyState.className = 'col-span-full py-20 text-center';
                emptyState.innerHTML = `
                    <div class="flex flex-col items-center">
                        <i data-lucide="search-x" class="w-16 h-16 text-slate-300 mb-6"></i>
                        <h3 class="text-2xl font-bold dark:text-white">No meals found</h3>
                        <p class="text-slate-500">Try adjusting your filters or search terms.</p>
                    </div>
                `;
                mealGrid.appendChild(emptyState);
                if (window.lucide) lucide.createIcons();
            }
        } else if (emptyState) {
            emptyState.remove();
        }
    }

    // Attach listeners
    [tagFilter, calorieFilter, sortFilter].forEach(filter => {
        filter?.addEventListener('change', filterMeals);
    });
    searchInput?.addEventListener('input', filterMeals);

    // Initial check
    setTimeout(filterMeals, 100);
});
