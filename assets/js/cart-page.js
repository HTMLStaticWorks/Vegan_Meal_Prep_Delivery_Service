/**
 * Veganova - Cart Page Logic
 * Handles multi-step checkout: Cart → Delivery → Payment → Confirmation
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ─── DOM References ───────────────────────────── */
    const nextBtn      = document.getElementById('next-step-btn');
    const prevBtn      = document.getElementById('prev-step-btn');
    const summaryList  = document.getElementById('summary-items');
    const cartList     = document.getElementById('cart-items-list');
    const continueShopping = document.getElementById('continue-shopping');

    let currentStep     = 1;
    let appliedDiscount = 0;

    /* ─── Render Cart Items ─────────────────────────── */
    function renderCart() {
        const items = Cart.getCartItems();

        if (items.length === 0) {
            cartList.innerHTML = `
                <div class="text-center py-20 bg-white dark:bg-slate-800 rounded-[40px] border border-dashed border-slate-300 dark:border-slate-700">
                    <i data-lucide="shopping-bag" class="w-16 h-16 text-slate-300 mx-auto mb-6"></i>
                    <h3 class="text-xl font-bold dark:text-white mb-2">Your cart is empty</h3>
                    <p class="text-slate-500 mb-8 px-8">Add some delicious plant-based meals to get started!</p>
                    <a href="meals.html" class="btn-primary inline-flex px-10 py-4 mx-auto">Browse Meals</a>
                </div>
            `;
            summaryList.innerHTML = `
                <div class="text-center py-4 bg-slate-50 dark:bg-slate-900 rounded-2xl">
                    <p class="text-slate-400 text-xs">No items added yet</p>
                </div>
            `;
            disableCheckout(true);
            updateSummary(0);
        } else {
            disableCheckout(false);

            // ── Cart item cards
            cartList.innerHTML = '';
            items.forEach(item => {
                const el = document.createElement('div');
                el.className = 'flex flex-col md:flex-row items-center gap-6 p-6 bg-white dark:bg-slate-800 rounded-[30px] shadow-sm border border-slate-100 dark:border-slate-700 group transition-all hover:shadow-xl hover:-translate-y-1';
                el.innerHTML = `
                    <div class="w-full md:w-32 h-32 rounded-2xl overflow-hidden shrink-0">
                        <img src="${item.image}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="${item.name}">
                    </div>
                    <div class="flex-1 w-full">
                        <div class="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-4">
                            <div>
                                <h4 class="text-xl font-black font-heading dark:text-white mb-1">${item.name}</h4>
                                <div class="flex items-center gap-3">
                                    <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">${item.kcal || 0} KCAL</span>
                                    <span class="w-1 h-1 rounded-full bg-slate-300"></span>
                                    <span class="text-[10px] font-bold text-secondary uppercase tracking-widest">$${item.price.toFixed(2)} / each</span>
                                </div>
                            </div>
                            <div class="text-left md:text-right shrink-0">
                                <span class="text-[10px] font-bold text-slate-400 block uppercase mb-1">Item Total</span>
                                <span class="text-xl font-black text-secondary">$${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        </div>

                        <div class="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-700/50">
                            <div class="flex items-center bg-slate-50 dark:bg-slate-900 rounded-xl px-2 py-1 gap-5 border border-slate-100 dark:border-slate-800">
                                <button class="qty-btn p-2 text-slate-400 hover:text-primary dark:hover:text-white transition-all active:scale-90"
                                    data-id="${item.id}" data-action="minus" aria-label="Decrease quantity">
                                    <i data-lucide="minus" class="w-4 h-4"></i>
                                </button>
                                <span class="font-black text-sm dark:text-white min-w-[1rem] text-center">${item.quantity}</span>
                                <button class="qty-btn p-2 text-slate-400 hover:text-primary dark:hover:text-white transition-all active:scale-90"
                                    data-id="${item.id}" data-action="plus" aria-label="Increase quantity">
                                    <i data-lucide="plus" class="w-4 h-4"></i>
                                </button>
                            </div>
                            <button class="remove-btn flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-red-500 transition-all"
                                data-id="${item.id}" aria-label="Remove ${item.name} from cart">
                                <i data-lucide="trash-2" class="w-4 h-4"></i>
                                <span class="hidden sm:inline">Remove</span>
                            </button>
                        </div>
                    </div>
                `;
                cartList.appendChild(el);
            });

            // ── Summary sidebar rows
            summaryList.innerHTML = '';
            items.forEach(item => {
                const row = document.createElement('div');
                row.className = 'flex justify-between items-center text-sm gap-2';
                row.innerHTML = `
                    <div class="flex flex-col min-w-0">
                        <span class="font-bold dark:text-white truncate">${item.name}</span>
                        <span class="text-slate-400 text-[10px]">x${item.quantity}</span>
                    </div>
                    <span class="font-black dark:text-gray-300 shrink-0">$${(item.price * item.quantity).toFixed(2)}</span>
                `;
                summaryList.appendChild(row);
            });

            updateSummary(Cart.getCartTotal());
        }

        lucide.createIcons();
        attachEventListeners();
    }

    /* ─── Summary Totals ────────────────────────────── */
    function updateSummary(subTotal) {
        const discountAmt     = subTotal * appliedDiscount;
        const discountedTotal = subTotal - discountAmt;
        const tax             = discountedTotal * 0.05;
        const total           = discountedTotal + tax;

        document.getElementById('summary-subtotal').textContent  = `$${subTotal.toFixed(2)}`;
        document.getElementById('summary-discount').textContent  = `-$${discountAmt.toFixed(2)}`;
        document.getElementById('summary-tax').textContent       = `$${tax.toFixed(2)}`;
        document.getElementById('summary-total').textContent     = `$${total.toFixed(2)}`;
    }

    /* ─── Coupon Logic ──────────────────────────────── */
    const COUPONS = { 'VEGAN20': 0.20, 'GREEN10': 0.10, 'PLANT15': 0.15 };

    function handleCoupon() {
        const code = document.getElementById('coupon-code').value.trim().toUpperCase();
        const msg  = document.getElementById('coupon-message');

        if (COUPONS[code]) {
            appliedDiscount = COUPONS[code];
            const pct = (appliedDiscount * 100).toFixed(0);
            msg.textContent  = `✓ "${code}" applied — ${pct}% discount unlocked!`;
            msg.className    = 'text-[10px] mt-2 block font-bold text-secondary';
            updateSummary(Cart.getCartTotal());
        } else if (code === '') {
            appliedDiscount = 0;
            msg.className   = 'text-[10px] mt-2 hidden font-bold';
            updateSummary(Cart.getCartTotal());
        } else {
            appliedDiscount = 0;
            msg.textContent = `✗ "${code}" is invalid. Try VEGAN20, GREEN10, or PLANT15.`;
            msg.className   = 'text-[10px] mt-2 block font-bold text-red-500';
            updateSummary(Cart.getCartTotal());
        }
    }

    /* ─── Quantity & Remove Listeners ──────────────── */
    function attachEventListeners() {
        document.querySelectorAll('.qty-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id     = parseInt(btn.dataset.id);
                const delta  = btn.dataset.action === 'plus' ? 1 : -1;
                Cart.updateQuantity(id, delta);
                renderCart();
            });
        });

        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                Cart.removeFromCart(id);
                renderCart();
            });
        });
    }

    /* ─── Checkout Step Logic ───────────────────────── */
    function disableCheckout(state) {
        nextBtn.disabled = state;
        nextBtn.classList.toggle('opacity-50', state);
        nextBtn.classList.toggle('pointer-events-none', state);
        if (continueShopping) continueShopping.classList.toggle('hidden', !state && currentStep > 1);
    }

    function handleNextStep() {
        if (currentStep === 1) {
            if (Cart.getCartItems().length === 0) return;
            goToStep(2);
        } else if (currentStep === 2) {
            const name    = document.getElementById('cust-name')?.value.trim();
            const phone   = document.getElementById('cust-phone')?.value.trim();
            const address = document.getElementById('cust-address')?.value.trim();
            if (!name || !phone || !address) {
                showValidationShake();
                return;
            }
            goToStep(3);
        } else if (currentStep === 3) {
            placeOrder();
        }
    }

    function showValidationShake() {
        const form = document.getElementById('delivery-form');
        if (!form) return;
        form.classList.add('animate-pulse');
        // Highlight empty fields
        ['cust-name','cust-phone','cust-address'].forEach(id => {
            const el = document.getElementById(id);
            if (el && !el.value.trim()) {
                el.classList.add('border-red-400');
                el.classList.remove('border-slate-100', 'dark:border-slate-700');
                el.focus();
                el.addEventListener('input', () => {
                    el.classList.remove('border-red-400');
                    el.classList.add('border-slate-100', 'dark:border-slate-700');
                }, { once: true });
            }
        });
        setTimeout(() => form.classList.remove('animate-pulse'), 600);
    }

    function goToStep(step) {
        // Hide all step content panels
        document.querySelectorAll('.step-content').forEach(el => el.classList.add('hidden'));
        document.getElementById(`step-content-${step}`)?.classList.remove('hidden');

        // Update step indicator circles
        document.querySelectorAll('.step-item').forEach(el => {
            const stepNum  = parseInt(el.dataset.step);
            const numEl    = el.querySelector('.w-10');
            const labelEl  = el.querySelector('span');
            const isPast   = stepNum < step;
            const isActive = stepNum === step;

            numEl?.classList.remove('bg-primary','bg-secondary','text-white','text-primary','bg-white','text-slate-400','border-2','border-slate-100','dark:bg-slate-800','dark:border-slate-800');
            labelEl?.classList.remove('text-slate-400','dark:text-white','text-secondary');

            if (isActive) {
                numEl?.classList.add('bg-primary','text-white');
                labelEl?.classList.add('dark:text-white');
            } else if (isPast) {
                numEl?.classList.add('bg-secondary','text-primary');
                labelEl?.classList.add('text-secondary');
            } else {
                numEl?.classList.add('bg-white','text-slate-400','border-2','border-slate-100','dark:bg-slate-800','dark:border-slate-800');
                labelEl?.classList.add('text-slate-400');
            }
        });

        currentStep = step;

        // Back button
        prevBtn.classList.toggle('hidden', currentStep === 1);

        // Continue shopping only on step 1 with empty cart
        if (continueShopping) {
            continueShopping.classList.toggle('hidden', currentStep !== 1);
        }

        // Next button label
        const labels = { 1: ['Proceed to Checkout', 'chevron-right'], 2: ['Continue to Payment', 'chevron-right'], 3: ['Place Order', 'package-check'] };
        const [label, icon] = labels[step];
        nextBtn.querySelector('span').textContent = label;
        nextBtn.querySelector('i')?.setAttribute('data-lucide', icon);
        lucide.createIcons();

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /* ─── Place Order ───────────────────────────────── */
    async function placeOrder() {
        // Show loading state
        nextBtn.disabled = true;
        nextBtn.innerHTML = `
            <div class="flex items-center gap-3">
                <div class="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                <span class="font-bold">Placing Order…</span>
            </div>
        `;

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2200));

        // Generate order info
        const orderId = `VN-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
        const deliveryDate = getEstimatedDelivery();
        const itemCount = Cart.getCartItems().reduce((s, i) => s + i.quantity, 0);

        // Populate overlay
        document.getElementById('final-order-id').textContent = orderId;
        const deliveryEl = document.getElementById('final-delivery-date');
        if (deliveryEl) deliveryEl.textContent = deliveryDate;
        const itemCountEl = document.getElementById('final-item-count');
        if (itemCountEl) itemCountEl.textContent = `${itemCount} item${itemCount > 1 ? 's' : ''}`;

        // Show overlay
        const overlay = document.getElementById('order-success-overlay');
        overlay.classList.remove('hidden');
        requestAnimationFrame(() => {
            requestAnimationFrame(() => overlay.classList.remove('opacity-0'));
        });

        // Animate check icon
        setTimeout(() => {
            const check = document.getElementById('success-check');
            check?.classList.remove('scale-0');
            check?.classList.add('scale-100');
        }, 700);

        // Clear cart
        Cart.clearCart();
    }

    function getEstimatedDelivery() {
        const now = new Date();
        const hour = now.getHours();
        let deliveryHour, suffix;

        if (hour < 11) {
            deliveryHour = 13; suffix = 'Today, 1:00 PM';
        } else if (hour < 15) {
            deliveryHour = 18; suffix = 'Today, 6:30 PM';
        } else if (hour < 19) {
            deliveryHour = 21; suffix = 'Today, 9:00 PM';
        } else {
            // Next morning
            const tomorrow = new Date(now);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const dayName = tomorrow.toLocaleDateString('en-US', { weekday: 'long' });
            suffix = `${dayName}, 10:00 AM`;
        }
        return suffix;
    }

    /* ─── Init ──────────────────────────────────────── */
    nextBtn.addEventListener('click', handleNextStep);
    prevBtn.addEventListener('click', () => goToStep(currentStep - 1));

    const couponBtn = document.getElementById('apply-coupon');
    if (couponBtn) couponBtn.addEventListener('click', handleCoupon);

    const couponInput = document.getElementById('coupon-code');
    if (couponInput) {
        couponInput.addEventListener('keydown', e => {
            if (e.key === 'Enter') handleCoupon();
        });
    }

    renderCart();

    window.addEventListener('cartUpdated', renderCart);
});
