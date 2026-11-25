// ============================================================
// STRIPE CHECKOUT INTEGRATION
// Payment processing for all brand storefronts
// ============================================================

const STRIPE_PUBLIC_KEY = 'pk_live_51Svpn87bqUIvce1RUiUM6v2XgnXLWQwd1HsfE1RXyPn032tZuX8AChcLDiZq0wyVDjqWzsM2SQ1r2fGr9Ywd8v0600F8dAz2bf';

// Initialize Stripe
let stripe = null;

document.addEventListener('DOMContentLoaded', () => {
  // Load Stripe.js
  const script = document.createElement('script');
  script.src = 'https://js.stripe.com/v3/';
  script.onload = () => {
    stripe = Stripe(STRIPE_PUBLIC_KEY);
    console.log('Stripe loaded');
  };
  document.head.appendChild(script);
});

// Cart management
const CART = {
  items: [],
  
  add(item) {
    this.items.push({
      ...item,
      cartId: Date.now().toString(36)
    });
    this.save();
    this.updateUI();
  },
  
  remove(cartId) {
    this.items = this.items.filter(i => i.cartId !== cartId);
    this.save();
    this.updateUI();
  },
  
  clear() {
    this.items = [];
    this.save();
    this.updateUI();
  },
  
  getTotal() {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  },
  
  save() {
    localStorage.setItem('calitoyCart', JSON.stringify(this.items));
  },
  
  load() {
    const saved = localStorage.getItem('calitoyCart');
    if (saved) {
      this.items = JSON.parse(saved);
      this.updateUI();
    }
  },
  
  updateUI() {
    // Update cart count in header
    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
      cartBtn.textContent = `Cart (${this.items.length})`;
    }
  }
};

// Checkout function
async function checkout() {
  if (!stripe) {
    alert('Payment system loading... Please try again in a moment.');
    return;
  }
  
  if (CART.items.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  
  // Prepare line items for Stripe
  const lineItems = CART.items.map(item => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name,
        description: `${item.brand} - ${item.design}`,
        images: [item.image]
      },
      unit_amount: Math.round(item.price * 100) // Convert to cents
    },
    quantity: 1
  }));
  
  try {
    // Create checkout session
    const response = await fetch('https://api.calitoycorp.com/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: lineItems,
        success_url: window.location.origin + '/checkout/success',
        cancel_url: window.location.origin + '/checkout/cancel'
      })
    });
    
    const session = await response.json();
    
    // Redirect to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.id
    });
    
    if (result.error) {
      alert(result.error.message);
    }
  } catch (error) {
    console.error('Checkout error:', error);
    alert('Checkout failed. Please try again.');
  }
}

// Add to cart wrapper
function addToCart(productId) {
  // Find product in database
  let product = null;
  let brandKey = '';
  
  for (const [key, products] of Object.entries(BRAND_PRODUCT_LINES)) {
    const found = products.find(p => p.id === productId);
    if (found) {
      product = found;
      brandKey = key;
      break;
    }
  }
  
  if (!product) {
    alert('Product not found!');
    return;
  }
  
  const cartItem = {
    id: product.id,
    name: product.name,
    brand: BRANDS[brandKey].name,
    design: product.design,
    price: product.price,
    image: `https://calitoycorp.com/assets/thumbnails/${brandKey}/${product.id}.jpg`
  };
  
  CART.add(cartItem);
  
  // Show confirmation
  showNotification(`${product.name} added to cart!`);
}

// Notification system
function showNotification(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: var(--accent, #C9A227);
    color: #000;
    padding: 1rem 2rem;
    border-radius: 8px;
    font-weight: 600;
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Cart modal
function openCart() {
  const modal = document.createElement('div');
  modal.className = 'cart-modal';
  modal.innerHTML = `
    <div class="cart-overlay" onclick="closeCart()"></div>
    <div class="cart-content">
      <div class="cart-header">
        <h2>Your Cart</h2>
        <button onclick="closeCart()">×</button>
      </div>
      <div class="cart-items">
        ${CART.items.length === 0 ? '<p>Your cart is empty</p>' : ''}
        ${CART.items.map(item => `
          <div class="cart-item">
            <div class="cart-item-info">
              <h4>${item.name}</h4>
              <p>${item.brand}</p>
            </div>
            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            <button onclick="CART.remove('${item.cartId}'); openCart()">×</button>
          </div>
        `).join('')}
      </div>
      <div class="cart-footer">
        <div class="cart-total">
          <span>Total:</span>
          <span>$${CART.getTotal().toFixed(2)}</span>
        </div>
        <button class="checkout-btn" onclick="checkout()">Checkout with Stripe</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
}

function closeCart() {
  const modal = document.querySelector('.cart-modal');
  if (modal) modal.remove();
}

// Initialize cart on load
document.addEventListener('DOMContentLoaded', () => {
  CART.load();
});

// Export
window.CART = CART;
window.checkout = checkout;
window.addToCart = addToCart;
window.openCart = openCart;
window.closeCart = closeCart;
