// ============================================================
// PRINTFUL API INTEGRATION
// Auto-sync approved designs to Printful stores
// ============================================================

const PRINTFUL_API_KEY = 'GOrfWurY6n62Lptr07USfIAjBYVU8ZBhouKOmXDX';
const PRINTFUL_API_BASE = 'https://api.printful.com';

// Store mapping - will be populated from API
let STORE_MAP = {};

// Initialize store mapping from Printful
async function initializeStores() {
  try {
    const response = await fetch(`${PRINTFUL_API_BASE}/stores`, {
      headers: {
        'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    
    if (data.code === 200) {
      data.result.forEach(store => {
        // Map store names to brand keys
        const nameLower = store.name.toLowerCase();
        if (nameLower.includes('tarosyn')) STORE_MAP.tarosyn = store.id;
        else if (nameLower.includes('calitoy')) STORE_MAP.calitoy = store.id;
        else if (nameLower.includes('kurced')) STORE_MAP.kurced = store.id;
        else if (nameLower.includes('endof8')) STORE_MAP.endof8 = store.id;
        else if (nameLower.includes('wicked')) STORE_MAP.wickedyouth = store.id;
      });
    }
    return STORE_MAP;
  } catch (error) {
    console.error('Failed to initialize stores:', error);
    return {};
  }
}

// Get available Printful products
async function getPrintfulProducts() {
  try {
    const response = await fetch(`${PRINTFUL_API_BASE}/products`, {
      headers: {
        'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data.code === 200 ? data.result : [];
  } catch (error) {
    console.error('Failed to get products:', error);
    return [];
  }
}

// Get product variants (sizes/colors)
async function getProductVariants(productId) {
  try {
    const response = await fetch(`${PRINTFUL_API_BASE}/products/${productId}`, {
      headers: {
        'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data.code === 200 ? data.result.variants : [];
  } catch (error) {
    console.error('Failed to get variants:', error);
    return [];
  }
}

// Create product in Printful store
async function createPrintfulProduct(storeId, productData) {
  try {
    const response = await fetch(`${PRINTFUL_API_BASE}/store/products`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sync_product: {
          name: productData.name,
          thumbnail: productData.thumbnail_url
        },
        sync_variants: productData.variants.map(variant => ({
          variant_id: variant.printful_variant_id,
          retail_price: variant.retail_price,
          files: [{
            url: variant.design_url,
            type: 'default',
            position: variant.placement || 'front'
          }]
        }))
      })
    });
    
    const data = await response.json();
    return {
      success: data.code === 200,
      productId: data.result?.sync_product?.id,
      data: data
    };
  } catch (error) {
    console.error('Failed to create product:', error);
    return { success: false, error: error.message };
  }
}

// Generate mockup for product
async function generateMockup(productId, variantId, designUrl) {
  try {
    const response = await fetch(`${PRINTFUL_API_BASE}/mockup-generator/create`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        variant_ids: [variantId],
        format: 'jpg',
        width: 1000,
        product_template_id: productId,
        placement: 'front',
        files: [{
          url: designUrl,
          position: 'front',
          type: 'default'
        }]
      })
    });
    
    const data = await response.json();
    return data.code === 200 ? data.result : null;
  } catch (error) {
    console.error('Failed to generate mockup:', error);
    return null;
  }
}

// Check mockup generation status
async function checkMockupStatus(taskId) {
  try {
    const response = await fetch(`${PRINTFUL_API_BASE}/mockup-generator/task?task_id=${taskId}`, {
      headers: {
        'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data.code === 200 ? data.result : null;
  } catch (error) {
    console.error('Failed to check mockup status:', error);
    return null;
  }
}

// Sync approved design to Printful
async function syncDesignToPrintful(design, brandKey, productConfig) {
  const storeId = STORE_MAP[brandKey];
  if (!storeId) {
    return { success: false, error: `No Printful store mapped for ${brandKey}` };
  }
  
  // Build variants for each size/color combination
  const variants = [];
  for (const color of productConfig.colors) {
    for (const size of productConfig.sizes) {
      variants.push({
        printful_variant_id: await getVariantId(productConfig.printfulId, color, size),
        retail_price: calculateRetailPrice(productConfig.basePrice),
        design_url: design.design_url,
        placement: design.placement
      });
    }
  }
  
  const productData = {
    name: `${design.name} - ${productConfig.name}`,
    thumbnail_url: design.thumbnail_url,
    variants: variants
  };
  
  return await createPrintfulProduct(storeId, productData);
}

// Helper: Calculate retail price (2.5x markup)
function calculateRetailPrice(basePrice) {
  return Math.ceil(basePrice * 2.5 * 100) / 100;
}

// Helper: Get variant ID from Printful product
async function getVariantId(productId, color, size) {
  const variants = await getProductVariants(productId);
  const variant = variants.find(v => 
    v.color?.toLowerCase() === color.toLowerCase() && 
    v.size?.toLowerCase() === size.toLowerCase()
  );
  return variant?.id || variants[0]?.id; // Fallback to first variant
}

// Export for admin use
const PrintfulAPI = {
  initializeStores,
  getPrintfulProducts,
  getProductVariants,
  createPrintfulProduct,
  generateMockup,
  checkMockupStatus,
  syncDesignToPrintful,
  calculateRetailPrice,
  get STORE_MAP() { return STORE_MAP; }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PrintfulAPI;
}
