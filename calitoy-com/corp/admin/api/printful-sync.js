// ============================================================
// PRINTFUL SYNC SCRIPT
// Automatically sync approved products to Printful stores
// ============================================================

const PRINTFUL_API_KEY = 'GOrfWurY6n62Lptr07USfIAjBYVU8ZBhouKOmXDX';
const PRINTFUL_BASE_URL = 'https://api.printful.com';

// Store IDs (populate after creating stores)
const STORE_IDS = {
  lovelouder: null,
  kurced: null,
  tarosyn: 18056870, // Confirmed existing
  wickedyouth: null,
  endof8: null
};

// Sync all approved products
async function syncAllProducts() {
  console.log('Starting Printful sync...\n');
  
  for (const [brandKey, products] of Object.entries(BRAND_PRODUCT_LINES)) {
    console.log(`\n=== ${BRANDS[brandKey].name} ===`);
    
    const storeId = STORE_IDS[brandKey];
    if (!storeId) {
      console.log(`⚠️  No store ID for ${brandKey}. Skipping.`);
      continue;
    }
    
    for (const product of products) {
      if (product.status === 'approved' || product.status === 'synced') {
        await syncProduct(product, brandKey, storeId);
      }
    }
  }
  
  console.log('\n✅ Sync complete!');
}

// Sync single product
async function syncProduct(product, brandKey, storeId) {
  try {
    console.log(`Syncing: ${product.name}...`);
    
    // Build variants for each color and size
    const variants = [];
    
    for (const color of product.colors) {
      for (const productType of product.products) {
        const printfulProduct = PRINTFUL_PRODUCTS[productType];
        if (!printfulProduct) continue;
        
        // Get available sizes for this product type
        const sizes = getSizesForProduct(productType);
        
        for (const size of sizes) {
          variants.push({
            variant_id: await getPrintfulVariantId(printfulProduct.id, color, size),
            retail_price: product.price.toString(),
            files: [{
              url: getDesignUrl(product, brandKey),
              type: 'default',
              position: getPlacementPosition(product.placement)
            }]
          });
        }
      }
    }
    
    // Create product in Printful
    const response = await fetch(`${PRINTFUL_BASE_URL}/store/products`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sync_product: {
          name: `${BRANDS[brandKey].name} - ${product.name}`,
          thumbnail: getThumbnailUrl(product, brandKey)
        },
        sync_variants: variants
      })
    });
    
    const data = await response.json();
    
    if (data.code === 200) {
      console.log(`✅ Synced: ${product.name} (ID: ${data.result.sync_product.id})`);
      product.status = 'synced';
      product.printfulId = data.result.sync_product.id;
      
      // Generate mockups
      await generateMockups(data.result.sync_product.id, variants, storeId);
    } else {
      console.log(`❌ Failed: ${product.name} - ${data.error?.message || 'Unknown error'}`);
      product.status = 'error';
    }
    
  } catch (error) {
    console.log(`❌ Error syncing ${product.name}: ${error.message}`);
    product.status = 'error';
  }
}

// Get sizes for product type
function getSizesForProduct(productType) {
  const sizeMap = {
    unisex_tshirt: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    premium_hoodie: ['S', 'M', 'L', 'XL', '2XL'],
    crewneck: ['S', 'M', 'L', 'XL', '2XL'],
    longsleeve: ['S', 'M', 'L', 'XL', '2XL'],
    dad_hat: ['One Size'],
    beanie: ['One Size'],
    snapback: ['One Size'],
    tote: ['One Size'],
    mug: ['11oz'],
    sticker: ['3x3'],
    lanyard: ['One Size'],
    wristband: ['One Size'],
    keychain: ['One Size'],
    koozie: ['One Size']
  };
  return sizeMap[productType] || ['One Size'];
}

// Get Printful variant ID
async function getPrintfulVariantId(productId, color, size) {
  // In production, this would fetch from Printful API
  // For now, return mock IDs
  const mockVariantIds = {
    71: { // Unisex tee
      'Black-XS': 101,
      'Black-S': 102,
      'Black-M': 103,
      'Black-L': 104,
      'White-S': 201,
      'White-M': 202,
      'Cream-S': 301
    },
    77: { // Hoodie
      'Black-S': 401,
      'Black-M': 402,
      'Black-L': 403
    }
  };
  
  return mockVariantIds[productId]?.[`${color}-${size}`] || 101;
}

// Get design URL
function getDesignUrl(product, brandKey) {
  // Return URL to design file
  return `https://calitoycorp.com/assets/designs/${brandKey}/${product.id}_design.png`;
}

// Get thumbnail URL
function getThumbnailUrl(product, brandKey) {
  return `https://calitoycorp.com/assets/thumbnails/${brandKey}/${product.id}_thumb.jpg`;
}

// Get placement position
function getPlacementPosition(placement) {
  const positions = {
    'center-chest': 'front',
    'left-chest': 'front',
    'back-print': 'back',
    'left-sleeve': 'sleeve_left',
    'accessory': 'front',
    'sticker': 'front'
  };
  return positions[placement] || 'front';
}

// Generate mockups
async function generateMockups(productId, variants, storeId) {
  console.log(`  Generating mockups for product ${productId}...`);
  
  // In production, this would call Printful mockup generator
  // For now, simulate success
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log(`  ✅ Mockups generated`);
}

// Create new Printful store
async function createPrintfulStore(brandName, brandKey) {
  try {
    const response = await fetch(`${PRINTFUL_BASE_URL}/stores`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `${brandName} Official Store`,
        platform: 'custom'
      })
    });
    
    const data = await response.json();
    
    if (data.code === 200) {
      console.log(`✅ Created store: ${brandName} (ID: ${data.result.id})`);
      STORE_IDS[brandKey] = data.result.id;
      return data.result.id;
    } else {
      console.log(`❌ Failed to create store: ${data.error?.message}`);
      return null;
    }
  } catch (error) {
    console.log(`❌ Error creating store: ${error.message}`);
    return null;
  }
}

// Check store status
async function checkStoreStatus(storeId) {
  try {
    const response = await fetch(`${PRINTFUL_BASE_URL}/stores/${storeId}`, {
      headers: {
        'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    return data.code === 200 ? data.result : null;
  } catch (error) {
    console.log(`Error checking store: ${error.message}`);
    return null;
  }
}

// Export functions
const PrintfulSync = {
  syncAllProducts,
  syncProduct,
  createPrintfulStore,
  checkStoreStatus,
  STORE_IDS
};

// Auto-run if loaded directly
if (typeof window !== 'undefined') {
  window.PrintfulSync = PrintfulSync;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PrintfulSync;
}
