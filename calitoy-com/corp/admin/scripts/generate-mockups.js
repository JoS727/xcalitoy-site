#!/usr/bin/env node
/**
 * PRINTFUL MOCKUP GENERATOR
 * Generates product mockups using actual SVG assets via Printful API
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const CONFIG = {
  apiKey: 'GOrfWurY6n62Lptr07USfIAjBYVU8ZBhouKOmXDX',
  baseUrl: 'api.printful.com',
  outputDir: './assets/mockups',
  svgBasePath: './assets/logos/All_Brand_Logos_SVG'
};

// Brand to folder mapping
const BRAND_FOLDERS = {
  'LoveLouder': 'Calitoy_Love_Louder',
  'Kurced': 'Kurced',
  'Tarosyn': 'Tarosyn',
  'Endof8': 'Endof8',
  'WickedYouth': 'Wicked_Youth'
};

// Product configurations for mockups
const PRODUCTS = [
  // Kurced
  { brand: 'Kurced', name: 'Neon Logo Tee', design: 'Wordmark.svg', productId: 71, placement: 'front', colors: ['Black'] },
  { brand: 'Kurced', name: 'Cursed Heart Hoodie', design: 'Rose_Signature.svg', productId: 77, placement: 'front', colors: ['Black'] },
  { brand: 'Kurced', name: 'Afterglow Mesh', design: 'Stamp.svg', productId: 71, placement: 'front', colors: ['Black'] },
  { brand: 'Kurced', name: 'Chrome Thorn Choker', design: 'Embroidery_Mark.svg', productId: 303, placement: 'front', colors: ['Black'] },
  { brand: 'Kurced', name: 'Blacklight Sticker', design: 'Rose_Icon.svg', productId: 223, placement: 'front', colors: ['White'] },
  { brand: 'Kurced', name: 'Nightclub Poster', design: 'Signature.svg', productId: 446, placement: 'front', colors: ['Black'] },
  
  // Tarosyn
  { brand: 'Tarosyn', name: 'Arcana Candles', design: 'Moon_Seal.svg', productId: 19, placement: 'front', colors: ['Black'] },
  { brand: 'Tarosyn', name: 'Birth Chart Journal', design: 'Rose_Compass.svg', productId: 258, placement: 'front', colors: ['Black'] },
  { brand: 'Tarosyn', name: 'Moon Scarf', design: 'Wordmark.svg', productId: 258, placement: 'front', colors: ['Black'] },
  { brand: 'Tarosyn', name: 'Tarot Cloth', design: 'Signature.svg', productId: 258, placement: 'front', colors: ['Black'] },
  { brand: 'Tarosyn', name: 'Transit Tee', design: 'Embroidery_Mark.svg', productId: 71, placement: 'front', colors: ['Black'] },
  { brand: 'Tarosyn', name: 'Night Hoodie', design: 'Stamp.svg', productId: 77, placement: 'front', colors: ['Charcoal'] },
  
  // Love Louder
  { brand: 'LoveLouder', name: 'Gold Crest Tee', design: 'Love_Louder_Wordmark.svg', productId: 71, placement: 'front', colors: ['Black'] },
  { brand: 'LoveLouder', name: 'Love Hoodie', design: 'Rose_Signature.svg', productId: 77, placement: 'front', colors: ['Black'] },
  { brand: 'LoveLouder', name: 'Gold Journal', design: 'Calitoy_Signature.svg', productId: 19, placement: 'front', colors: ['Black'] },
  { brand: 'LoveLouder', name: 'Rose Tote', design: 'Rose_Icon.svg', productId: 258, placement: 'front', colors: ['Natural'] },
  { brand: 'LoveLouder', name: 'Love Print', design: 'Stamp.svg', productId: 446, placement: 'front', colors: ['White'] },
  { brand: 'LoveLouder', name: 'Embroidered Cap', design: 'Embroidery_Mark.svg', productId: 131, placement: 'front', colors: ['Black'] },
  
  // Endof8
  { brand: 'Endof8', name: 'Pier Tee', design: 'Wordmark.svg', productId: 71, placement: 'front', colors: ['White'] },
  { brand: 'Endof8', name: 'Seagull Hoodie', design: 'Seagull_Icon.svg', productId: 77, placement: 'front', colors: ['Navy'] },
  { brand: 'Endof8', name: 'Eight Long Sleeve', design: 'Eight_Icon.svg', productId: 74, placement: 'front', colors: ['Black'] },
  { brand: 'Endof8', name: 'Beach Tote', design: 'Eight_Seagull.svg', productId: 258, placement: 'front', colors: ['Natural'] },
  { brand: 'Endof8', name: 'Surf Stickers', design: 'Pier_Badge.svg', productId: 223, placement: 'front', colors: ['White'] },
  { brand: 'Endof8', name: 'Sunset Poster', design: 'Primary_Badge.svg', productId: 446, placement: 'front', colors: ['White'] },
  
  // Wicked Youth
  { brand: 'WickedYouth', name: 'WY Circle Tee', design: 'Primary_Wordmark.svg', productId: 71, placement: 'front', colors: ['Black'] },
  { brand: 'WickedYouth', name: 'Crown Hoodie', design: 'Crown_Icon.svg', productId: 77, placement: 'front', colors: ['Black'] },
  { brand: 'WickedYouth', name: 'WY Monogram Cap', design: 'WY_Monogram.svg', productId: 131, placement: 'front', colors: ['Black'] },
  { brand: 'WickedYouth', name: 'Beauty Pouch', design: 'WY_Circle.svg', productId: 258, placement: 'front', colors: ['Black'] },
  { brand: 'WickedYouth', name: 'Crown Pin', design: 'Crown_Icon.svg', productId: 303, placement: 'front', colors: ['Gold'] },
  { brand: 'WickedYouth', name: 'Canvas Tote', design: 'Primary_Wordmark.svg', productId: 258, placement: 'front', colors: ['Natural'] }
];

// Make HTTPS request to Printful API
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
          const parsed = JSON.parse(responseData);
          resolve(parsed);
        } catch (e) {
          resolve({ error: e.message, raw: responseData });
        }
      });
    });

    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

// Get available products from Printful
async function getPrintfulProducts() {
  console.log('Fetching Printful products...');
  const response = await makeRequest('/products');
  if (response.code === 200) {
    return response.result;
  }
  console.error('Failed to fetch products:', response);
  return [];
}

// Get product variants
async function getProductVariants(productId) {
  const response = await makeRequest(`/products/${productId}`);
  if (response.code === 200) {
    return response.result.variants || [];
  }
  return [];
}

// Generate mockup for a product
async function generateMockup(product, variantId, designPath) {
  console.log(`Generating mockup for ${product.brand} - ${product.name}...`);
  
  // For now, create a local mockup metadata file
  // In production, this would call Printful's mockup generator API
  const mockupData = {
    brand: product.brand,
    name: product.name,
    design: product.design,
    productId: product.productId,
    variantId: variantId,
    designPath: designPath,
    placement: product.placement,
    colors: product.colors,
    status: 'pending',
    created: new Date().toISOString()
  };
  
  return mockupData;
}

// Create mockup metadata files
async function createMockupMetadata() {
  console.log('Creating mockup metadata...\n');
  
  const mockups = [];
  
  for (const product of PRODUCTS) {
    const brandFolder = BRAND_FOLDERS[product.brand];
    if (!brandFolder) {
      console.log(`  ⚠️  Skipping ${product.brand} - no folder mapping`);
      continue;
    }
    
    const designPath = path.join(CONFIG.svgBasePath, brandFolder, 'Brand_Color', product.design);
    
    // Check if design file exists
    if (!fs.existsSync(designPath)) {
      console.log(`  ⚠️  Design not found: ${designPath}`);
      continue;
    }
    
    // Create mockup entry
    const mockup = {
      id: `${product.brand.toLowerCase()}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      ...product,
      designPath: designPath,
      designUrl: `https://calitoycorp.com/${designPath.replace('./', '')}`,
      status: 'ready',
      created: new Date().toISOString()
    };
    
    mockups.push(mockup);
    console.log(`  ✓  ${product.brand} - ${product.name}`);
  }
  
  // Save mockup metadata
  const outputFile = path.join(CONFIG.outputDir, 'mockup-metadata.json');
  fs.mkdirSync(CONFIG.outputDir, { recursive: true });
  fs.writeFileSync(outputFile, JSON.stringify({
    generated: new Date().toISOString(),
    total: mockups.length,
    mockups: mockups
  }, null, 2));
  
  console.log(`\n✓ Created ${mockups.length} mockup entries`);
  console.log(`✓ Saved to: ${outputFile}`);
  
  return mockups;
}

// Generate HTML preview page
function generatePreviewPage(mockups) {
  console.log('\nGenerating preview page...');
  
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
      margin-bottom: 3rem;
      font-size: 2.5rem;
    }
    .brand-section {
      margin-bottom: 4rem;
    }
    .brand-title {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid;
    }
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    .product-card {
      background: #1A1A1A;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid #333;
    }
    .product-image {
      aspect-ratio: 1;
      background: #0A0A0A;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }
    .product-image img, .product-image svg {
      max-width: 80%;
      max-height: 80%;
      object-fit: contain;
    }
    .product-info {
      padding: 1rem;
    }
    .product-name {
      font-weight: 600;
      margin-bottom: 0.25rem;
    }
    .product-meta {
      color: #888;
      font-size: 0.875rem;
    }
    .status-badge {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
      margin-top: 0.5rem;
    }
    .status-ready { background: #22c55e; color: #000; }
    .status-pending { background: #eab308; color: #000; }
    
    /* Brand colors */
    .Kurced .brand-title { color: #FF00AA; border-color: #FF00AA; }
    .Tarosyn .brand-title { color: #6B4EE6; border-color: #6B4EE6; }
    .LoveLouder .brand-title { color: #D4AF37; border-color: #D4AF37; }
    .Endof8 .brand-title { color: #FF6B35; border-color: #FF6B35; }
    .WickedYouth .brand-title { color: #FF3366; border-color: #FF3366; }
  </style>
</head>
<body>
  <h1>📦 Product Mockups</h1>
  <p style="text-align: center; color: #888; margin-bottom: 3rem;">
    Generated: ${new Date().toLocaleString()} | ${mockups.length} products
  </p>
  
  ${['Kurced', 'Tarosyn', 'LoveLouder', 'Endof8', 'WickedYouth'].map(brand => {
    const brandProducts = mockups.filter(m => m.brand === brand);
    if (brandProducts.length === 0) return '';
    return `
  <div class="brand-section ${brand}">
    <h2 class="brand-title">${brand}</h2>
    <div class="products-grid">
      ${brandProducts.map(p => `
      <div class="product-card">
        <div class="product-image">
          <img src="${p.designPath.replace('./assets/', '../assets/')}" alt="${p.name}">
        </div>
        <div class="product-info">
          <div class="product-name">${p.name}</div>
          <div class="product-meta">${p.design} • ${p.colors.join(', ')}</div>
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

  const previewPath = path.join(CONFIG.outputDir, 'index.html');
  fs.writeFileSync(previewPath, html);
  console.log(`✓ Preview page: ${previewPath}`);
}

// Create Printful-ready sync file
function createPrintfulSyncFile(mockups) {
  console.log('\nCreating Printful sync file...');
  
  const syncData = {
    generated: new Date().toISOString(),
    apiKey: CONFIG.apiKey,
    products: mockups.map(m => ({
      id: m.id,
      brand: m.brand,
      name: m.name,
      printfulProductId: m.productId,
      designUrl: m.designUrl,
      placement: m.placement,
      colors: m.colors,
      status: 'pending'
    }))
  };
  
  const syncPath = path.join(CONFIG.outputDir, 'printful-sync.json');
  fs.writeFileSync(syncPath, JSON.stringify(syncData, null, 2));
  console.log(`✓ Sync file: ${syncPath}`);
}

// Main execution
async function main() {
  console.log('╔════════════════════════════════════════╗');
  console.log('║   CALITOYCORP MOCKUP GENERATOR         ║');
  console.log('║   Printful API Integration             ║');
  console.log('╚════════════════════════════════════════╝\n');
  
  try {
    // Create mockup metadata
    const mockups = await createMockupMetadata();
    
    // Generate preview page
    generatePreviewPage(mockups);
    
    // Create Printful sync file
    createPrintfulSyncFile(mockups);
    
    console.log('\n══════════════════════════════════════════');
    console.log('✓ Mockup generation complete!');
    console.log(`✓ Total products: ${mockups.length}`);
    console.log('══════════════════════════════════════════');
    
    // Summary by brand
    console.log('\n📊 Brand Summary:');
    const brands = ['Kurced', 'Tarosyn', 'LoveLouder', 'Endof8', 'WickedYouth'];
    brands.forEach(brand => {
      const count = mockups.filter(m => m.brand === brand).length;
      console.log(`  ${brand}: ${count} products`);
    });
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { createMockupMetadata, generateMockup };
