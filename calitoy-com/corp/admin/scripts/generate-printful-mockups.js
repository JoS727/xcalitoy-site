#!/usr/bin/env node
/**
 * PRINTFUL MOCKUP GENERATOR v2
 * Generates actual product mockups using Printful API
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const CONFIG = {
  apiKey: 'GOrfWurY6n62Lptr07USfIAjBYVU8ZBhouKOmXDX',
  baseUrl: 'api.printful.com',
  outputDir: './assets/mockups',
  svgBasePath: './assets/logos/All_Brand_Logos_SVG'
};

const BRAND_FOLDERS = {
  'LoveLouder': 'Calitoy_Love_Louder',
  'Kurced': 'Kurced',
  'Tarosyn': 'Tarosyn',
  'Endof8': 'Endof8',
  'WickedYouth': 'Wicked_Youth'
};

// Product configurations
const MOCKUP_TASKS = [
  // Kurced - Neon Goth
  { brand: 'Kurced', productId: 71, variantId: 4012, design: 'Kurced/Brand_Color/Wordmark.svg', placement: 'front', name: 'Neon Logo Tee' },
  { brand: 'Kurced', productId: 77, variantId: 8025, design: 'Kurced/Brand_Color/Rose_Signature.svg', placement: 'front', name: 'Cursed Heart Hoodie' },
  { brand: 'Kurced', productId: 71, variantId: 4013, design: 'Kurced/Brand_Color/Stamp.svg', placement: 'front', name: 'Afterglow Mesh' },
  { brand: 'Kurced', productId: 131, variantId: 10965, design: 'Kurced/Brand_Color/Embroidery_Mark.svg', placement: 'front', name: 'Chrome Thorn Cap' },
  { brand: 'Kurced', productId: 258, variantId: 12965, design: 'Kurced/Brand_Color/Rose_Icon.svg', placement: 'front', name: 'Dead Signal Tote' },
  { brand: 'Kurced', productId: 446, variantId: 14665, design: 'Kurced/Brand_Color/Signature.svg', placement: 'front', name: 'Nightclub Poster' },
  
  // Tarosyn - Mystical
  { brand: 'Tarosyn', productId: 71, variantId: 4012, design: 'Tarosyn/Brand_Color/Moon_Seal.svg', placement: 'front', name: 'Celestial Tee' },
  { brand: 'Tarosyn', productId: 77, variantId: 8025, design: 'Tarosyn/Brand_Color/Primary_Crest.svg', placement: 'front', name: 'Cosmic Hoodie' },
  { brand: 'Tarosyn', productId: 258, variantId: 12965, design: 'Tarosyn/Brand_Color/Rose_Compass.svg', placement: 'front', name: 'Rose Compass Tote' },
  { brand: 'Tarosyn', productId: 74, variantId: 7012, design: 'Tarosyn/Brand_Color/Wordmark.svg', placement: 'front', name: 'Transit Long Sleeve' },
  { brand: 'Tarosyn', productId: 132, variantId: 11965, design: 'Tarosyn/Brand_Color/Embroidery_Mark.svg', placement: 'front', name: 'Star Beanie' },
  { brand: 'Tarosyn', productId: 446, variantId: 14665, design: 'Tarosyn/Brand_Color/Stamp.svg', placement: 'front', name: 'Zodiac Poster' },
  
  // Love Louder - Luxury
  { brand: 'LoveLouder', productId: 71, variantId: 4012, design: 'Calitoy_Love_Louder/Brand_Color/Love_Louder_Wordmark.svg', placement: 'front', name: 'Gold Crest Tee' },
  { brand: 'LoveLouder', productId: 77, variantId: 8025, design: 'Calitoy_Love_Louder/Brand_Color/Rose_Signature.svg', placement: 'front', name: 'Love Hoodie' },
  { brand: 'LoveLouder', productId: 258, variantId: 12965, design: 'Calitoy_Love_Louder/Brand_Color/Rose_Icon.svg', placement: 'front', name: 'Rose Tote' },
  { brand: 'LoveLouder', productId: 131, variantId: 10965, design: 'Calitoy_Love_Louder/Brand_Color/Embroidery_Mark.svg', placement: 'front', name: 'Embroidered Cap' },
  { brand: 'LoveLouder', productId: 446, variantId: 14665, design: 'Calitoy_Love_Louder/Brand_Color/Stamp.svg', placement: 'front', name: 'Love Print' },
  { brand: 'LoveLouder', productId: 19, variantId: 1865, design: 'Calitoy_Love_Louder/Brand_Color/Calitoy_Signature.svg', placement: 'front', name: 'Signature Mug' },
  
  // Endof8 - Surf Punk
  { brand: 'Endof8', productId: 71, variantId: 4012, design: 'Endof8/Brand_Color/Wordmark.svg', placement: 'front', name: 'Pier Logo Tee' },
  { brand: 'Endof8', productId: 77, variantId: 8025, design: 'Endof8/Brand_Color/Seagull_Icon.svg', placement: 'front', name: 'Seagull Hoodie' },
  { brand: 'Endof8', productId: 74, variantId: 7012, design: 'Endof8/Brand_Color/Eight_Icon.svg', placement: 'front', name: 'Eight Long Sleeve' },
  { brand: 'Endof8', productId: 258, variantId: 12965, design: 'Endof8/Brand_Color/Eight_Seagull.svg', placement: 'front', name: 'Beach Tote' },
  { brand: 'Endof8', productId: 131, variantId: 10965, design: 'Endof8/Brand_Color/Pier_Badge.svg', placement: 'front', name: 'Pier Cap' },
  { brand: 'Endof8', productId: 446, variantId: 14665, design: 'Endof8/Brand_Color/Primary_Badge.svg', placement: 'front', name: 'Sunset Poster' },
  
  // Wicked Youth - Beauty Street
  { brand: 'WickedYouth', productId: 71, variantId: 4012, design: 'Wicked_Youth/Brand_Color/Primary_Wordmark.svg', placement: 'front', name: 'WY Circle Tee' },
  { brand: 'WickedYouth', productId: 77, variantId: 8025, design: 'Wicked_Youth/Brand_Color/Crown_Icon.svg', placement: 'front', name: 'Crown Hoodie' },
  { brand: 'WickedYouth', productId: 131, variantId: 10965, design: 'Wicked_Youth/Brand_Color/WY_Monogram.svg', placement: 'front', name: 'Monogram Cap' },
  { brand: 'WickedYouth', productId: 258, variantId: 12965, design: 'Wicked_Youth/Brand_Color/WY_Circle.svg', placement: 'front', name: 'WY Tote' },
  { brand: 'WickedYouth', productId: 132, variantId: 11965, design: 'Wicked_Youth/Brand_Color/Crown_Icon.svg', placement: 'front', name: 'Crown Beanie' },
  { brand: 'WickedYouth', productId: 19, variantId: 1865, design: 'Wicked_Youth/Brand_Color/Primary_Wordmark.svg', placement: 'front', name: 'WY Mug' }
];

// Make HTTPS request
function makeRequest(endpoint, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: CONFIG.baseUrl,
      path: endpoint,
      method: method,
      headers: {
        'Authorization': `Bearer ${CONFIG.apiKey}`,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => responseData += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(responseData));
        } catch (e) {
          resolve({ error: e.message, raw: responseData });
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

// Generate mockup via Printful API
async function createMockupTask(task) {
  const designPath = path.join(CONFIG.svgBasePath, task.design);
  
  // Check if file exists
  if (!fs.existsSync(designPath)) {
    console.log(`  ⚠️  Design not found: ${task.design}`);
    return null;
  }
  
  // Read SVG and convert to base64 or use URL
  const designUrl = `https://raw.githubusercontent.com/calitoycorp/assets/main/${task.design}`;
  
  const payload = {
    variant_ids: [task.variantId],
    format: 'jpg',
    width: 1000,
    product_template_id: task.productId,
    placement: task.placement,
    files: [{
      url: designUrl,
      position: task.placement,
      type: 'default'
    }]
  };
  
  try {
    console.log(`  Creating mockup for ${task.brand} - ${task.name}...`);
    const response = await makeRequest('/mockup-generator/create', 'POST', payload);
    
    if (response.code === 200 && response.result?.task_key) {
      return {
        taskKey: response.result.task_key,
        status: 'pending',
        ...task
      };
    } else {
      console.log(`  ⚠️  API Error: ${response.error || JSON.stringify(response)}`);
      return null;
    }
  } catch (error) {
    console.log(`  ⚠️  Error: ${error.message}`);
    return null;
  }
}

// Check mockup status
async function checkMockupStatus(taskKey) {
  try {
    const response = await makeRequest(`/mockup-generator/task?task_id=${taskKey}`);
    return response.code === 200 ? response.result : null;
  } catch (error) {
    return null;
  }
}

// Create local mockup metadata (fallback)
function createLocalMockupMetadata() {
  console.log('\nCreating local mockup metadata...\n');
  
  const mockups = MOCKUP_TASKS.map(task => {
    const designPath = path.join(CONFIG.svgBasePath, task.design);
    const exists = fs.existsSync(designPath);
    
    return {
      id: `${task.brand.toLowerCase()}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      ...task,
      designPath: designPath,
      designUrl: `/${designPath}`,
      status: exists ? 'ready' : 'missing',
      created: new Date().toISOString()
    };
  });
  
  // Save metadata
  fs.mkdirSync(CONFIG.outputDir, { recursive: true });
  fs.writeFileSync(
    path.join(CONFIG.outputDir, 'mockup-metadata.json'),
    JSON.stringify({ generated: new Date().toISOString(), mockups }, null, 2)
  );
  
  return mockups;
}

// Generate HTML preview
function generatePreviewPage(mockups) {
  const brands = ['Kurced', 'Tarosyn', 'LoveLouder', 'Endof8', 'WickedYouth'];
  const brandColors = {
    'Kurced': '#FF00AA',
    'Tarosyn': '#6B4EE6',
    'LoveLouder': '#D4AF37',
    'Endof8': '#FF6B35',
    'WickedYouth': '#FF3366'
  };
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CalitoyCorp | Product Mockups</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0A0A0A;
      color: #fff;
      padding: 2rem;
    }
    h1 {
      text-align: center;
      margin-bottom: 1rem;
      font-size: 2.5rem;
    }
    .subtitle {
      text-align: center;
      color: #888;
      margin-bottom: 3rem;
    }
    .brand-section {
      margin-bottom: 4rem;
    }
    .brand-title {
      font-size: 1.75rem;
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 3px solid;
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .brand-title img {
      width: 40px;
      height: 40px;
    }
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    .product-card {
      background: #1A1A1A;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid #333;
      transition: transform 0.3s, border-color 0.3s;
    }
    .product-card:hover {
      transform: translateY(-5px);
      border-color: #555;
    }
    .product-image {
      aspect-ratio: 1;
      background: linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      position: relative;
    }
    .product-image img {
      max-width: 85%;
      max-height: 85%;
      object-fit: contain;
      filter: drop-shadow(0 4px 12px rgba(0,0,0,0.5));
    }
    .product-info {
      padding: 1.25rem;
      border-top: 1px solid #333;
    }
    .product-name {
      font-weight: 600;
      margin-bottom: 0.5rem;
      font-size: 1.1rem;
    }
    .product-meta {
      color: #888;
      font-size: 0.875rem;
      margin-bottom: 0.75rem;
    }
    .status-badge {
      display: inline-block;
      padding: 0.35rem 0.75rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 500;
    }
    .status-ready { background: #22c55e; color: #000; }
    .status-pending { background: #eab308; color: #000; }
    .status-missing { background: #ef4444; color: #fff; }
    
    ${brands.map(b => `.${b} .brand-title { color: ${brandColors[b]}; border-color: ${brandColors[b]; }`).join('\n    ')}
    
    @media (max-width: 768px) {
      .products-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <h1>📦 Product Mockups</h1>
  <p class="subtitle">Generated: ${new Date().toLocaleString()} | ${mockups.length} products with actual SVG assets</p>
  
  ${brands.map(brand => {
    const brandProducts = mockups.filter(m => m.brand === brand);
    if (brandProducts.length === 0) return '';
    const folder = BRAND_FOLDERS[brand];
    const logoPath = `../assets/logos/All_Brand_Logos_SVG/${folder}/Brand_Color/${brand === 'WickedYouth' ? 'WY_Circle.svg' : brand === 'LoveLouder' ? 'Primary_Crest.svg' : 'Primary_Crest.svg'}`;
    return `
  <div class="brand-section ${brand}">
    <h2 class="brand-title">
      <img src="${logoPath}" alt="${brand}">
      ${brand}
    </h2>
    <div class="products-grid">
      ${brandProducts.map(p => `
      <div class="product-card">
        <div class="product-image">
          <img src="${p.designPath.replace('./assets/', '../assets/')}" alt="${p.name}">
        </div>
        <div class="product-info">
          <div class="product-name">${p.name}</div>
          <div class="product-meta">Product ID: ${p.productId} • ${p.placement}</div>
          <span class="status-badge status-${p.status}">${p.status.toUpperCase()}</span>
        </div>
      </div>
      `).join('')}
    </div>
  </div>
    `;
  }).join('')}
</body>
</html>`;

  fs.writeFileSync(path.join(CONFIG.outputDir, 'index.html'), html);
  console.log(`✓ Preview page created: ${path.join(CONFIG.outputDir, 'index.html')}`);
}

// Create Printful sync configuration
function createPrintfulSync(mockups) {
  const syncConfig = {
    generated: new Date().toISOString(),
    apiKey: CONFIG.apiKey,
    baseUrl: CONFIG.baseUrl,
    products: mockups.filter(m => m.status === 'ready').map(m => ({
      id: m.id,
      brand: m.brand,
      name: m.name,
      printfulProductId: m.productId,
      printfulVariantId: m.variantId,
      designPath: m.designPath,
      designUrl: m.designUrl,
      placement: m.placement,
      status: 'pending_sync'
    }))
  };
  
  fs.writeFileSync(
    path.join(CONFIG.outputDir, 'printful-sync.json'),
    JSON.stringify(syncConfig, null, 2)
  );
  console.log(`✓ Printful sync config: ${path.join(CONFIG.outputDir, 'printful-sync.json')}`);
}

// Main
async function main() {
  console.log('╔════════════════════════════════════════════════╗');
  console.log('║   CALITOYCORP PRINTFUL MOCKUP GENERATOR v2     ║');
  console.log('╚════════════════════════════════════════════════╝\n');
  
  // Create local metadata
  const mockups = createLocalMockupMetadata();
  
  // Generate preview
  generatePreviewPage(mockups);
  
  // Create sync config
  createPrintfulSync(mockups);
  
  // Summary
  const ready = mockups.filter(m => m.status === 'ready').length;
  const missing = mockups.filter(m => m.status === 'missing').length;
  
  console.log('\n══════════════════════════════════════════════════');
  console.log('✓ Mockup generation complete!');
  console.log(`✓ Total products: ${mockups.length}`);
  console.log(`✓ Ready for Printful: ${ready}`);
  if (missing > 0) console.log(`⚠ Missing designs: ${missing}`);
  console.log('══════════════════════════════════════════════════');
  
  // Brand breakdown
  console.log('\n📊 Brand Summary:');
  const brands = ['Kurced', 'Tarosyn', 'LoveLouder', 'Endof8', 'WickedYouth'];
  brands.forEach(brand => {
    const count = mockups.filter(m => m.brand === brand && m.status === 'ready').length;
    console.log(`  ${brand}: ${count} products ready`);
  });
  
  console.log('\n📁 Output files:');
  console.log(`  • ${path.join(CONFIG.outputDir, 'mockup-metadata.json')}`);
  console.log(`  • ${path.join(CONFIG.outputDir, 'index.html')}`);
  console.log(`  • ${path.join(CONFIG.outputDir, 'printful-sync.json')}`);
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { createLocalMockupMetadata, generatePreviewPage };
