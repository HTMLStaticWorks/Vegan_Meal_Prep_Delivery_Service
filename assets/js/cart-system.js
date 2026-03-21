/**
 * V-Prep Vegan Meal Service - Cart System JS
 * Handles cart logic, persistence, and UI synchronization.
 */

class CartSystem {
    constructor() {
        this.cart = this.loadCart();
        this._toastTimer = null;
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
        try {
            const saved = localStorage.getItem('veganova-cart');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    }

    saveCart() {
        localStorage.setItem('veganova-cart', JSON.stringify(this.cart));
        this.updateCartBadge();
        // Trigger event for other components
        window.dispatchEvent(new Event('cartUpdated'));
    }

    addToCart(mealId, mealData) {
        const id = Number(mealId);
        const existingItem = this.cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                id: id,
                name: mealData.name,
                price: parseFloat(mealData.price) || 0,
                image: mealData.image || '',
                quantity: 1,
                kcal: mealData.kcal || 0
            });
        }

        this.saveCart();
        this.showToast(`"${mealData.name}" added to cart!`);
    }

    removeFromCart(mealId) {
        const id = Number(mealId);
        this.cart = this.cart.filter(item => item.id !== id);
        this.saveCart();
    }

    updateQuantity(mealId, delta) {
        const id = Number(mealId);
        const item = this.cart.find(item => item.id === id);
        if (item) {
            item.quantity += delta;
            if (item.quantity <= 0) {
                this.removeFromCart(id);
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
                badge.style.transform = 'scale(1.3)';
                setTimeout(() => { badge.style.transform = ''; }, 200);
            } else {
                badge.classList.add('hidden');
            }
        });
    }

    showToast(message) {
        // Clear any existing hide timer
        if (this._toastTimer) {
            clearTimeout(this._toastTimer);
            this._toastTimer = null;
        }

        // Get or create the toast element
        let toast = document.getElementById('cart-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'cart-toast';
            document.body.appendChild(toast);
        }

        // Set content
        toast.innerHTML = `
            <span class="cart-toast-icon">🛒</span>
            <span class="cart-toast-msg">${message}</span>
        `;

        // Show: remove hidden, trigger visible state
        toast.classList.remove('cart-toast--hidden');
        toast.classList.add('cart-toast--visible');

        // Auto-hide after 3s
        this._toastTimer = setTimeout(() => {
            toast.classList.remove('cart-toast--visible');
            toast.classList.add('cart-toast--hidden');
            this._toastTimer = null;
        }, 3000);
    }
}

// Global instance
const Cart = new CartSystem();
