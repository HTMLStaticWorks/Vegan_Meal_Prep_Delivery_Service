/**
 * V-Prep Vegan Meal Service - Meals Filtering JS
 */

const meals = [
    // BREAKFAST
    {
        id: 1,
        name: "Avocado Toast with Chickpea Scramble",
        category: "breakfast",
        tag: "high-protein",
        kcal: 380,
        protein: "18g",
        price: 11.50,
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&fit=crop",
        desc: "Smashed Hass avocado and turmeric-spiced chickpea scramble on toasted rustic sourdough."
    },
    {
        id: 2,
        name: "Berry Almond Smoothie Bowl",
        category: "breakfast",
        tag: "detox",
        kcal: 320,
        protein: "12g",
        price: 10.00,
        image: "https://images.unsplash.com/photo-1543362906-acfc16c67564?w=800&fit=crop",
        desc: "A thick blend of organic acai, almond butter, and mixed berries, topped with crunchy almond slivers."
    },
    {
        id: 3,
        name: "Vegan Banana Pancakes",
        category: "breakfast",
        tag: "high-protein",
        kcal: 410,
        protein: "14g",
        price: 12.00,
        image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&fit=crop",
        desc: "Fluffy whole-grain pancakes with caramelized bananas and organic maple syrup drizzle."
    },
    {
        id: 4,
        name: "Overnight Oats with Chia Seeds",
        category: "breakfast",
        tag: "gluten-free",
        kcal: 340,
        protein: "10g",
        price: 9.00,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&fit=crop",
        desc: "Creamy oats soaked in oat milk with chia seeds, flax, and a hint of vanilla bean."
    },
    {
        id: 5,
        name: "Garden Tofu Scramble",
        category: "breakfast",
        tag: "high-protein",
        kcal: 320,
        protein: "24g",
        price: 10.50,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&fit=crop",
        desc: "Turmeric-seasoned crumbled tofu with sautéed baby spinach, cherry tomatoes, and bell peppers."
    },
    {
        id: 6,
        name: "Tropical Mango Chia Jar",
        category: "breakfast",
        tag: "gluten-free",
        kcal: 290,
        protein: "8g",
        price: 8.50,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&fit=crop",
        desc: "Coconut milk chia pudding layered with fresh mango puree and toasted coconut flakes."
    },

    // LUNCH
    {
        id: 7,
        name: "Quinoa Buddha Bowl",
        category: "lunch",
        tag: "detox",
        kcal: 420,
        protein: "16g",
        price: 13.50,
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&fit=crop",
        desc: "Tri-color quinoa, roasted sweet potatoes, kale, and a creamy lemon-tahini dressing."
    },
    {
        id: 8,
        name: "Vegan Burrito Wrap",
        category: "lunch",
        tag: "high-protein",
        kcal: 510,
        protein: "22g",
        price: 12.00,
        image: "https://images.unsplash.com/photo-1540713434306-58505cf1b6fc?w=800&fit=crop",
        desc: "Black beans, seasoned rice, house-made guacamole, and fajita veggies in a large flour tortilla."
    },
    {
        id: 9,
        name: "Grilled Tofu Salad",
        category: "lunch",
        tag: "gluten-free",
        kcal: 360,
        protein: "26g",
        price: 14.00,
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&fit=crop",
        desc: "Crispy grilled organic tofu over fresh garden greens with a balsamic vinaigrette."
    },
    {
        id: 10,
        name: "Lentil & Veggie Bowl",
        category: "lunch",
        tag: "high-protein",
        kcal: 440,
        protein: "24g",
        price: 13.00,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&fit=crop",
        desc: "Slow-simmered green lentils with roasted root vegetables and herbed brown rice."
    },
    {
        id: 11,
        name: "Smokey Jackfruit Tacos",
        category: "lunch",
        tag: "high-protein",
        kcal: 440,
        protein: "22g",
        price: 11.95,
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&fit=crop",
        desc: "Slow-cooked jackfruit carnitas served with pickled red onions and a lime-crema drizzle."
    },
    {
        id: 12,
        name: "Quinoa Power Beet Bowl",
        category: "lunch",
        tag: "detox",
        kcal: 370,
        protein: "14g",
        price: 12.50,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&fit=crop",
        desc: "Tri-color quinoa with roasted beets, steamed broccoli, and toasted sunflower seeds."
    },
    {
        id: 13,
        name: "Mediterranean Chickpea Wrap",
        category: "lunch",
        tag: "gluten-free",
        kcal: 390,
        protein: "16g",
        price: 10.00,
        image: "https://images.unsplash.com/photo-1540713434306-58505cf1b6fc?w=800&fit=crop",
        desc: "Spiced chickpeas, house-made hummus, cucumber, and kalamata olives in a spinach wrap."
    },
    {
        id: 14,
        name: "Tempeh Banh Mi Bowl",
        category: "lunch",
        tag: "high-protein",
        kcal: 450,
        protein: "26g",
        price: 14.50,
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&fit=crop",
        desc: "Seared organic tempeh with pickled carrots, daikon, fresh cilantro, and spicy mayo over rice."
    },

    // DINNER
    {
        id: 15,
        name: "Vegan Chickpea Curry",
        category: "dinner",
        tag: "high-protein",
        kcal: 480,
        protein: "20g",
        price: 14.50,
        image: "https://images.pexels.com/photos/4033633/pexels-photo-4033633.jpeg",
        desc: "Aromatic coconut milk curry with ginger, turmeric, and garlic, served over fluffy basmati rice."
    },
    {
        id: 16,
        name: "Tofu Stir Fry with Veggies",
        category: "dinner",
        tag: "high-protein",
        kcal: 420,
        protein: "24g",
        price: 15.00,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&fit=crop",
        desc: "Crispy tofu blocks tossed with snap peas, bell peppers, and broccoli in a ginger-soy glaze."
    },
    {
        id: 17,
        name: "Vegan Alfredo Pasta",
        category: "dinner",
        tag: "gluten-free",
        kcal: 540,
        protein: "18g",
        price: 16.00,
        image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=800&fit=crop",
        desc: "Fettuccine noodles in a velvety cashew-based garlic cream sauce with fresh parsley."
    },
    {
        id: 18,
        name: "Sweet Potato & Black Bean Bowl",
        category: "dinner",
        tag: "detox",
        kcal: 460,
        protein: "16g",
        price: 13.50,
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&fit=crop",
        desc: "Spiced black beans, roasted sweet potato wedges, avocado, and brown rice with lime."
    },
    {
        id: 19,
        name: "Lentil Shepherd's Pie",
        category: "dinner",
        tag: "high-protein",
        kcal: 450,
        protein: "28g",
        price: 15.00,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&fit=crop",
        desc: "Rich lentil and vegetable stew topped with creamy mashed cauliflower and pumpkin."
    },
    {
        id: 20,
        name: "Miso Glazed Cauliflower",
        category: "dinner",
        tag: "detox",
        kcal: 340,
        protein: "12g",
        price: 14.50,
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&fit=crop",
        desc: "Roasted cauliflower steak with a sweet and savory miso glaze, served over fluffy quinoa."
    },
    {
        id: 21,
        name: "Wild Mushroom Truffle Pasta",
        category: "dinner",
        tag: "high-protein",
        kcal: 520,
        protein: "20g",
        price: 16.50,
        image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=800&fit=crop",
        desc: "Fettuccine with a blend of shiitake and oyster mushrooms in a creamy white truffle sauce."
    },
    {
        id: 22,
        name: "Moroccan Root Tagine",
        category: "dinner",
        tag: "detox",
        kcal: 380,
        protein: "15g",
        price: 14.00,
        image: "https://images.unsplash.com/photo-1541518763029-438622122146?w=800&fit=crop",
        desc: "Slow-cooked carrots, sweet potatoes, and parsnips with apricots and aromatic Ras el Hanout."
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const mealGrid = document.getElementById('meal-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const tagFilter = document.getElementById('tag-filter');
    const calorieFilter = document.getElementById('calorie-filter');
    const sortFilter = document.getElementById('sort-filter');
    const searchInput = document.getElementById('search-meals');

    function renderMeals(filteredMeals) {
        mealGrid.innerHTML = '';
        const activeCategory = document.querySelector('.filter-btn.active').dataset.category;
        
        if (filteredMeals.length === 0) {
            mealGrid.innerHTML = `
                <div class="col-span-full py-20 text-center">
                    <i data-lucide="search-x" class="mx-auto w-16 h-16 text-slate-300 mb-6"></i>
                    <h3 class="text-2xl font-bold dark:text-white">No meals found</h3>
                    <p class="text-slate-500">Try adjusting your filters or search terms.</p>
                </div>
            `;
            lucide.createIcons();
            return;
        }

        if (activeCategory === 'all' && !document.getElementById('search-meals').value) {
            // Group by category when showing "All" and no search is active
            const categories = ['breakfast', 'lunch', 'dinner'];
            categories.forEach(cat => {
                const catMeals = filteredMeals.filter(m => m.category === cat);
                if (catMeals.length > 0) {
                    const sectionHeading = document.createElement('div');
                    sectionHeading.className = 'col-span-full mt-12 mb-6';
                    sectionHeading.innerHTML = `
                        <div class="flex items-center gap-4">
                            <h2 class="text-3xl font-black font-heading dark:text-white capitalize">${cat}</h2>
                            <div class="h-px flex-1 bg-slate-200 dark:bg-slate-700"></div>
                            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">${catMeals.length} Items</span>
                        </div>
                    `;
                    mealGrid.appendChild(sectionHeading);
                    
                    catMeals.forEach(meal => {
                        mealGrid.appendChild(createMealCard(meal));
                    });
                }
            });
        } else {
            // Normal flat render for specific categories or search results
            filteredMeals.forEach(meal => {
                mealGrid.appendChild(createMealCard(meal));
            });
        }
        
        lucide.createIcons();
    }

    function createMealCard(meal) {
        const card = document.createElement('div');
        card.className = 'meal-card group bg-white dark:bg-slate-800 rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 reveal-on-scroll border border-slate-100 dark:border-slate-700';
        card.innerHTML = `
            <div class="relative h-64 overflow-hidden">
                <img src="${meal.image}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="${meal.name}">
                <div class="absolute top-6 right-6 flex flex-col gap-2">
                    <span class="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black uppercase text-primary dark:text-secondary shadow-lg tracking-widest">${meal.category}</span>
                </div>
                ${meal.tag === 'high-protein' ? '<div class="absolute bottom-4 left-6"><span class="bg-secondary text-white px-3 py-1 rounded-lg text-[10px] font-bold uppercase shadow-lg">Bestseller</span></div>' : ''}
            </div>
            <div class="p-8">
                <div class="flex items-center gap-2 mb-4">
                    <span class="text-[10px] font-black bg-secondary/10 text-secondary px-3 py-1 rounded-lg shadow-sm tracking-widest uppercase">${meal.tag.replace('-', ' ')}</span>
                    ${meal.kcal < 350 ? '<span class="text-[10px] font-black bg-blue-500/10 text-blue-500 px-3 py-1 rounded-lg shadow-sm tracking-widest uppercase">Low Cal</span>' : ''}
                </div>
                <h3 class="text-2xl font-black font-heading mb-3 dark:text-white group-hover:text-secondary transition-colors">${meal.name}</h3>
                <p class="text-slate-500 dark:text-slate-400 text-sm mb-8 line-clamp-2 leading-relaxed">${meal.desc}</p>
                
                <div class="flex items-center gap-6 mb-8 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl">
                    <div class="flex items-center gap-2">
                        <i data-lucide="flame" class="w-4 h-4 text-orange-500"></i>
                        <span class="text-xs font-black dark:text-gray-300">${meal.kcal} <span class="text-slate-400 font-medium">kcal</span></span>
                    </div>
                    <div class="flex items-center gap-2">
                        <i data-lucide="dumbbell" class="w-4 h-4 text-secondary"></i>
                        <span class="text-xs font-black dark:text-gray-300">${meal.protein} <span class="text-slate-400 font-medium">Protein</span></span>
                    </div>
                </div>

                <div class="flex items-center justify-between">
                    <div class="flex flex-col">
                        <span class="text-2xl font-black text-primary dark:text-secondary">$${meal.price.toFixed(2)}</span>
                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Per Serving</span>
                    </div>
                    <button class="bg-primary hover:bg-secondary text-white px-6 py-3 rounded-2xl transition-all shadow-xl shadow-primary/20 flex items-center gap-2 group/btn active:scale-95">
                        <span class="text-sm font-bold">Add to Plan</span>
                        <i data-lucide="plus" class="w-4 h-4 transition-transform group-hover/btn:rotate-90"></i>
                    </button>
                </div>
            </div>
        `;
        return card;
    }

    function filterMeals() {
        const activeCategory = document.querySelector('.filter-btn.active').dataset.category;
        const activeTag = tagFilter.value;
        const activeCalorie = calorieFilter.value;
        const searchTerm = searchInput.value.toLowerCase();
        const activeSort = sortFilter.value;

        let filtered = meals.filter(meal => {
            const matchesCategory = activeCategory === 'all' || meal.category === activeCategory;
            const matchesTag = activeTag === 'all' || meal.tag === activeTag;
            const matchesSearch = meal.name.toLowerCase().includes(searchTerm) || meal.desc.toLowerCase().includes(searchTerm);
            
            let matchesCalorie = true;
            if (activeCalorie === 'low') matchesCalorie = meal.kcal < 400;
            if (activeCalorie === 'mid') matchesCalorie = meal.kcal >= 400 && meal.kcal <= 500;
            if (activeCalorie === 'high') matchesCalorie = meal.kcal > 500;

            return matchesCategory && matchesTag && matchesSearch && matchesCalorie;
        });

        // Sorting
        if (activeSort === 'price-low') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (activeSort === 'kcal-low') {
            filtered.sort((a, b) => a.kcal - b.kcal);
        }

        renderMeals(filtered);
    }

    // Event Listeners
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('bg-primary', 'text-white', 'active', 'shadow-lg', 'shadow-primary/20'));
            filterBtns.forEach(b => b.classList.add('bg-white', 'text-slate-600', 'dark:bg-slate-700', 'dark:text-slate-300'));
            
            btn.classList.add('bg-primary', 'text-white', 'active', 'shadow-lg', 'shadow-primary/20');
            btn.classList.remove('bg-white', 'text-slate-600', 'dark:bg-slate-700', 'dark:text-slate-300');
            
            filterMeals();
        });
    });

    tagFilter.addEventListener('change', filterMeals);
    calorieFilter.addEventListener('change', filterMeals);
    sortFilter.addEventListener('change', filterMeals);
    searchInput.addEventListener('input', filterMeals);

    // Initial render
    renderMeals(meals);
});
