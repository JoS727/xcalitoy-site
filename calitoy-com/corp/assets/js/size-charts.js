// ============================================================
// SIZE CHARTS & PRODUCT MODALS
// Interactive size guides for all products
// ============================================================

const SIZE_CHARTS = {
  unisex_tshirt: {
    name: 'Unisex Heavy Cotton Tee',
    sizes: [
      { size: 'XS', chest: '30-32"', length: '27"', sleeve: '8"' },
      { size: 'S', chest: '34-36"', length: '28"', sleeve: '8.5"' },
      { size: 'M', chest: '38-40"', length: '29"', sleeve: '9"' },
      { size: 'L', chest: '42-44"', length: '30"', sleeve: '9.5"' },
      { size: 'XL', chest: '46-48"', length: '31"', sleeve: '10"' },
      { size: '2XL', chest: '50-52"', length: '32"', sleeve: '10.5"' },
      { size: '3XL', chest: '54-56"', length: '33"', sleeve: '11"' }
    ],
    fit: 'Classic unisex fit. Size down for fitted, size up for oversized.',
    material: '100% cotton, 6.1 oz heavyweight'
  },
  premium_hoodie: {
    name: 'Premium Pullover Hoodie',
    sizes: [
      { size: 'S', chest: '36-38"', length: '26"', sleeve: '33"' },
      { size: 'M', chest: '40-42"', length: '27"', sleeve: '34"' },
      { size: 'L', chest: '44-46"', length: '28"', sleeve: '35"' },
      { size: 'XL', chest: '48-50"', length: '29"', sleeve: '36"' },
      { size: '2XL', chest: '52-54"', length: '30"', sleeve: '37"' }
    ],
    fit: 'Relaxed fit with dropped shoulders. Size down for standard fit.',
    material: '80% cotton, 20% polyester, 9 oz heavyweight'
  },
  crewneck: {
    name: 'Classic Crewneck Sweatshirt',
    sizes: [
      { size: 'S', chest: '34-36"', length: '26"', sleeve: '33"' },
      { size: 'M', chest: '38-40"', length: '27"', sleeve: '34"' },
      { size: 'L', chest: '42-44"', length: '28"', sleeve: '35"' },
      { size: 'XL', chest: '46-48"', length: '29"', sleeve: '36"' }
    ],
    fit: 'Classic fit. True to size.',
    material: '50% cotton, 50% polyester, 8 oz'
  },
  longsleeve: {
    name: 'Long Sleeve Tee',
    sizes: [
      { size: 'S', chest: '34-36"', length: '28"', sleeve: '25"' },
      { size: 'M', chest: '38-40"', length: '29"', sleeve: '26"' },
      { size: 'L', chest: '42-44"', length: '30"', sleeve: '27"' },
      { size: 'XL', chest: '46-48"', length: '31"', sleeve: '28"' }
    ],
    fit: 'Slim fit. Size up for relaxed fit.',
    material: '100% cotton, 5.3 oz'
  },
  dad_hat: {
    name: 'Dad Hat / Baseball Cap',
    sizes: [
      { size: 'One Size', head: '21.5-24"', depth: '6.5"', brim: '2.75"' }
    ],
    fit: 'Adjustable strapback. One size fits most.',
    material: '100% cotton twill'
  },
  beanie: {
    name: 'Cuffed Beanie',
    sizes: [
      { size: 'One Size', head: '20-24"', height: '8.5"' }
    ],
    fit: 'Stretch rib knit. One size fits most.',
    material: '100% acrylic, ribbed'
  },
  snapback: {
    name: 'Snapback Cap',
    sizes: [
      { size: 'One Size', head: '21.5-24"', depth: '7"', brim: '2.75"' }
    ],
    fit: 'Flat brim, structured. Adjustable snap closure.',
    material: '80% acrylic, 20% wool'
  },
  tote: {
    name: 'Canvas Tote Bag',
    sizes: [
      { size: 'One Size', width: '15"', height: '16"', depth: '4.5"', handles: '21"' }
    ],
    fit: 'Roomy interior with bottom gusset.',
    material: '12 oz cotton canvas'
  },
  mug: {
    name: 'Ceramic Mug 11oz',
    sizes: [
      { size: '11oz', diameter: '3.25"', height: '3.75"', capacity: '11oz' }
    ],
    fit: 'Standard coffee mug. Dishwasher safe.',
    material: 'White ceramic, ORCA coating'
  }
};

// Show size chart modal
function showSizeChart(productType) {
  const chart = SIZE_CHARTS[productType];
  if (!chart) return;
  
  const modal = document.createElement('div');
  modal.className = 'size-chart-modal';
  modal.innerHTML = `
    <div class="size-chart-overlay" onclick="closeSizeChart()"></div>
    <div class="size-chart-content">
      <div class="size-chart-header">
        <h2>${chart.name}</h2>
        <button class="close-btn" onclick="closeSizeChart()">×</button>
      </div>
      
      <div class="size-chart-body">
        <table class="size-table">
          <thead>
            <tr>
              <th>Size</th>
              ${chart.sizes[0].chest ? '<th>Chest</th>' : ''}
              ${chart.sizes[0].head ? '<th>Head Circ.</th>' : ''}
              ${chart.sizes[0].width ? '<th>Width</th>' : ''}
              ${chart.sizes[0].diameter ? '<th>Diameter</th>' : ''}
              <th>Length/Height</th>
              ${chart.sizes[0].sleeve ? '<th>Sleeve</th>' : ''}
            </tr>
          </thead>
          <tbody>
            ${chart.sizes.map(s => `
              <tr>
                <td><strong>${s.size}</strong></td>
                ${s.chest ? `<td>${s.chest}</td>` : ''}
                ${s.head ? `<td>${s.head}</td>` : ''}
                ${s.width ? `<td>${s.width}</td>` : ''}
                ${s.diameter ? `<td>${s.diameter}</td>` : ''}
                <td>${s.length || s.height}</td>
                ${s.sleeve ? `<td>${s.sleeve}</td>` : ''}
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <div class="size-chart-info">
          <div class="info-block">
            <h4>Fit Guide</h4>
            <p>${chart.fit}</p>
          </div>
          <div class="info-block">
            <h4>Material</h4>
            <p>${chart.material}</p>
          </div>
        </div>
        
        <div class="size-chart-tips">
          <h4>📏 How to Measure</h4>
          <ul>
            <li><strong>Chest:</strong> Measure under arms around fullest part of chest</li>
            <li><strong>Length:</strong> Measure from shoulder to hem</li>
            <li><strong>Sleeve:</strong> Measure from shoulder seam to cuff</li>
            <li><strong>Head:</strong> Measure around widest part of head</li>
          </ul>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Animate in
  setTimeout(() => {
    modal.querySelector('.size-chart-content').style.transform = 'translateY(0)';
    modal.querySelector('.size-chart-content').style.opacity = '1';
  }, 10);
}

function closeSizeChart() {
  const modal = document.querySelector('.size-chart-modal');
  if (modal) {
    modal.querySelector('.size-chart-content').style.transform = 'translateY(20px)';
    modal.querySelector('.size-chart-content').style.opacity = '0';
    setTimeout(() => modal.remove(), 300);
  }
}

// Product detail modal with size selector
function showProductDetail(product, brandKey) {
  const modal = document.createElement('div');
  modal.className = 'product-detail-modal';
  
  const primaryProduct = product.products[0];
  const chart = SIZE_CHARTS[primaryProduct];
  
  modal.innerHTML = `
    <div class="detail-overlay" onclick="closeProductDetail()"></div>
    <div class="detail-content">
      <button class="detail-close" onclick="closeProductDetail()">×</button>
      
      <div class="detail-grid">
        <div class="detail-image">
          <div class="product-mockup large">
            <div class="mockup-${getMockupType(product.products)}">
              <div class="design-overlay large">
                <svg viewBox="0 0 100 100" width="120" height="120">
                  <text x="50" y="60" text-anchor="middle" fill="var(--accent)" font-size="50">
                    ${getBrandIcon(brandKey)}
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div class="detail-info">
          <div class="detail-brand">${BRANDS[brandKey].name}</div>
          <h2 class="detail-name">${product.name}</h2>
          <p class="detail-description">${product.design}</p>
          
          <div class="detail-price">$${product.price.toFixed(2)}</div>
          
          <div class="detail-section">
            <label>Color</label>
            <div class="color-selector">
              ${product.colors.map(c => `
                <button class="color-btn ${c.toLowerCase()}" data-color="${c}" onclick="selectColor(this)">
                  ${c}
                </button>
              `).join('')}
            </div>
          </div>
          
          <div class="detail-section">
            <label>Size</label>
            <div class="size-selector">
              ${getSizeOptions(primaryProduct)}
            </div>
            <button class="size-chart-link" onclick="showSizeChart('${primaryProduct}')">
              📏 Size Chart
            </button>
          </div>
          
          <div class="detail-section">
            <label>Also Available As</label>
            <div class="product-types">
              ${product.products.map(p => `
                <span class="type-tag">${formatProductType(p)}</span>
              `).join('')}
            </div>
          </div>
          
          <div class="detail-actions">
            <div class="quantity-selector">
              <button onclick="adjustQty(-1)">-</button>
              <input type="number" value="1" min="1" max="10" id="qty">
              <button onclick="adjustQty(1)">+</button>
            </div>
            <button class="add-to-cart-btn" onclick="addToCartWithOptions('${product.id}')">
              Add to Cart - $${product.price.toFixed(2)}
            </button>
          </div>
          
          <div class="detail-shipping">
            <p>✓ Free shipping on orders over $75</p>
            <p>✓ Printful fulfillment (2-7 days)</p>
            <p>✓ 30-day returns</p>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
}

function closeProductDetail() {
  const modal = document.querySelector('.product-detail-modal');
  if (modal) {
    modal.style.opacity = '0';
    setTimeout(() => modal.remove(), 300);
  }
}

function getMockupType(products) {
  if (products.includes('unisex_tshirt')) return 'tshirt';
  if (products.includes('premium_hoodie')) return 'hoodie';
  if (products.includes('dad_hat')) return 'hat';
  if (products.includes('beanie')) return 'beanie';
  if (products.includes('tote')) return 'tote';
  if (products.includes('mug')) return 'mug';
  return 'tshirt';
}

function getBrandIcon(brand) {
  const icons = {
    lovelouder: '🌹',
    kurced: '🥀',
    tarosyn: '🌙',
    wickedyouth: '👑',
    endof8: '🌊'
  };
  return icons[brand] || '⭐';
}

function getSizeOptions(productType) {
  const chart = SIZE_CHARTS[productType];
  if (!chart) return '';
  
  return chart.sizes.map(s => `
    <button class="size-btn" data-size="${s.size}" onclick="selectSize(this)">
      ${s.size}
    </button>
  `).join('');
}

function formatProductType(type) {
  const names = {
    'unisex_tshirt': 'T-Shirt',
    'premium_hoodie': 'Hoodie',
    'crewneck': 'Crewneck',
    'longsleeve': 'Long Sleeve',
    'dad_hat': 'Dad Hat',
    'beanie': 'Beanie',
    'snapback': 'Snapback',
    'tote': 'Tote',
    'mug': 'Mug'
  };
  return names[type] || type;
}

function selectColor(btn) {
  document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}

function selectSize(btn) {
  document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}

function adjustQty(change) {
  const input = document.getElementById('qty');
  const newVal = parseInt(input.value) + change;
  if (newVal >= 1 && newVal <= 10) {
    input.value = newVal;
  }
}

function addToCartWithOptions(productId) {
  const color = document.querySelector('.color-btn.selected')?.dataset.color;
  const size = document.querySelector('.size-btn.selected')?.dataset.size;
  const qty = parseInt(document.getElementById('qty')?.value || 1);
  
  if (!color || !size) {
    alert('Please select color and size');
    return;
  }
  
  // Add to cart with options
  addToCart(productId, { color, size, qty });
  closeProductDetail();
  showNotification(`Added ${qty}x to cart (${color}, ${size})`);
}

// Export
window.SIZE_CHARTS = SIZE_CHARTS;
window.showSizeChart = showSizeChart;
window.closeSizeChart = closeSizeChart;
window.showProductDetail = showProductDetail;
window.closeProductDetail = closeProductDetail;
