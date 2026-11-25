// ============================================================
// IMAGE OPTIMIZATION & LAZY LOADING
// WebP conversion, responsive images, gallery system
// ============================================================

// Image optimization configuration
const IMAGE_CONFIG = {
  formats: ['webp', 'jpg', 'png'],
  sizes: [320, 640, 960, 1280, 1920],
  lazyLoadThreshold: 100,
  placeholderColor: '#1a1a1a'
};

// Lazy loading observer
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      loadImage(img);
      observer.unobserve(img);
    }
  });
}, {
  rootMargin: `${IMAGE_CONFIG.lazyLoadThreshold}px`
});

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img[data-src]');
  images.forEach(img => {
    img.style.backgroundColor = IMAGE_CONFIG.placeholderColor;
    imageObserver.observe(img);
  });
});

// Load image with WebP support
function loadImage(img) {
  const src = img.dataset.src;
  const webpSrc = src.replace(/\.(jpg|png)$/, '.webp');
  
  // Check WebP support
  if (supportsWebP()) {
    img.src = webpSrc;
  } else {
    img.src = src;
  }
  
  img.onload = () => {
    img.classList.add('loaded');
    img.style.backgroundColor = 'transparent';
  };
}

// Check WebP support
function supportsWebP() {
  const canvas = document.createElement('canvas');
  if (canvas.getContext && canvas.getContext('2d')) {
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }
  return false;
}

// Responsive image srcset generator
function generateSrcset(basePath, filename) {
  const srcset = [];
  
  IMAGE_CONFIG.sizes.forEach(size => {
    srcset.push(`${basePath}/${size}/${filename} ${size}w`);
  });
  
  return srcset.join(', ');
}

// Product Gallery System
class ProductGallery {
  constructor(container, images) {
    this.container = container;
    this.images = images;
    this.currentIndex = 0;
    this.thumbnails = [];
    
    this.init();
  }
  
  init() {
    this.render();
    this.bindEvents();
  }
  
  render() {
    this.container.innerHTML = `
      <div class="gallery-main">
        <button class="gallery-nav prev" onclick="gallery.prev()">‹</button>
        <img src="${this.images[0]}" alt="Product" class="gallery-image">
        <button class="gallery-nav next" onclick="gallery.next()">›</button>
        <div class="gallery-zoom" onclick="gallery.openZoom()">🔍</div>
      </div>
      <div class="gallery-thumbnails">
        ${this.images.map((img, i) => `
          <div class="thumb ${i === 0 ? 'active' : ''}" onclick="gallery.goTo(${i})">
            <img src="${img}" alt="View ${i + 1}">
          </div>
        `).join('')}
      </div>
    `;
    
    this.thumbnails = this.container.querySelectorAll('.thumb');
  }
  
  bindEvents() {
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
      if (e.key === 'Escape') this.closeZoom();
    });
    
    // Touch/swipe support
    let touchStartX = 0;
    const main = this.container.querySelector('.gallery-main');
    
    main.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    });
    
    main.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) this.next();
        else this.prev();
      }
    });
  }
  
  goTo(index) {
    this.currentIndex = index;
    this.updateDisplay();
  }
  
  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateDisplay();
  }
  
  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateDisplay();
  }
  
  updateDisplay() {
    const mainImg = this.container.querySelector('.gallery-image');
    mainImg.src = this.images[this.currentIndex];
    
    this.thumbnails.forEach((thumb, i) => {
      thumb.classList.toggle('active', i === this.currentIndex);
    });
  }
  
  openZoom() {
    const modal = document.createElement('div');
    modal.className = 'gallery-zoom-modal';
    modal.innerHTML = `
      <div class="zoom-overlay" onclick="gallery.closeZoom()"></div>
      <img src="${this.images[this.currentIndex]}" class="zoom-image">
      <button class="zoom-close" onclick="gallery.closeZoom()">×</button>
    `;
    document.body.appendChild(modal);
  }
  
  closeZoom() {
    const modal = document.querySelector('.gallery-zoom-modal');
    if (modal) modal.remove();
  }
}

// Initialize galleries
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.product-gallery').forEach(container => {
    const images = JSON.parse(container.dataset.images);
    window.gallery = new ProductGallery(container, images);
  });
});

// Image preloader for critical images
function preloadCriticalImages() {
  const criticalImages = [
    'assets/products/lovelouder/ll-001_tee.svg',
    'assets/products/kurced/kur-001_tee.svg',
    'assets/products/tarosyn/tar-001_tee.svg',
    'assets/products/wickedyouth/wy-001_tee.svg',
    'assets/products/endof8/e8-001_tee.svg'
  ];
  
  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

// Run on load
window.addEventListener('load', preloadCriticalImages);

// Export
window.ProductGallery = ProductGallery;
window.loadImage = loadImage;
window.supportsWebP = supportsWebP;
