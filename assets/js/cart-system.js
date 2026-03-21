/**
 * V-Prep Vegan Meal Service - Cart System JS
 * Handles cart logic, persistence, and UI synchronization.
 */

class CartSystem {
    constructor() {
        this.cart = this.loadCart();
        this.init();
    }

    init() {
        // Sync cart count on load
        this.updateCartBadge();
        
        // Listen for storage changes (for multiple tabs)
        window.addEventListener('storage', (e) => {
            if (e.key === 'veganova-cart') {
                this.cart = JSON.parse(e.newValue || '[]');
                this.updateCartBadge();
                if (typeof renderCart === 'function') renderCart();
            }
        });
    }

    loadCart() {
        const saved = localStorage.getItem('veganova-cart');
        return saved ? JSON.parse(saved) : [];
    }

    saveCart() {
        localStorage.setItem('veganova-cart', JSON.stringify(this.cart));
        this.updateCartBadge();
        // Trigger event for other components
        window.dispatchEvent(new Event('cartUpdated'));
    }

    addToCart(mealId, mealData) {
        const existingItem = this.cart.find(item => item.id === mealId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                id: mealId,
                name: mealData.name,
                price: mealData.price,
                image: mealData.image,
                quantity: 1,
                kcal: mealData.kcal
            });
        }
        
        this.saveCart();
        this.showToast(`"${mealData.name}" added to cart!`);
    }

    removeFromCart(mealId) {
        this.cart = this.cart.filter(item => item.id !== mealId);
        this.saveCart();
    }

    updateQuantity(mealId, delta) {
        const item = this.cart.find(item => item.id === mealId);
        if (item) {
            item.quantity += delta;
            if (item.quantity <= 0) {
                this.removeFromCart(mealId);
            } else {
                this.saveCart();
            }
        }
    }

    getCartCount() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }

    getCartTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getCartItems() {
        return this.cart;
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
    }

    updateCartBadge() {
        const badges = document.querySelectorAll('.cart-count-badge');
        const count = this.getCartCount();
        
        badges.forEach(badge => {
            badge.textContent = count;
            if (count > 0) {
                badge.classList.remove('hidden');
                // Pulse effect
                badge.classList.add('scale-125');
                setTimeout(() => badge.classList.remove('scale-125'), 200);
            } else {
                badge.classList.add('hidden');
            }
        });
    }

    showToast(message) {
        // Create toast if it doesn't exist
        let toast = document.getElementById('cart-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'cart-toast';
            toast.className = 'fixed bottom-10 left-1/2 -translate-x-1/2 z-[1000] bg-slate-900 border border-slate-700 text-white px-8 py-4 rounded-3xl shadow-2xl transition-all opacity-0 translate-y-10 scale-90';
            document.body.appendChild(toast);
        }
        
        toast.innerHTML = `
            <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <i data-lucide="shopping-cart" class="w-4 h-4 text-white"></i>
                </div>
                <p class="font-bold text-sm">${message}</p>
            </div>
        `;
        
        lucide.createIcons();
        
        // Show
        setTimeout(() => {
            toast.classList.remove('opacity-0', 'translate-y-10', 'scale-90');
        }, 10);
        
        // Hide after 3s
        setTimeout(() => {
            toast.classList.add('opacity-0', 'translate-y-10', 'scale-90');
        }, 3000);
    }
}

// Global instance
const Cart = new CartSystem();
