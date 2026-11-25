// ============================================================
// 360° PRODUCT VIDEO SPIN
// Interactive product rotation with video support
// ============================================================

class Product360Viewer {
  constructor(container, options = {}) {
    this.container = container;
    this.frames = options.frames || 36; // 36 frames = 10° per frame
    this.currentFrame = 0;
    this.isDragging = false;
    this.startX = 0;
    this.autoRotate = options.autoRotate || false;
    this.rotationSpeed = options.rotationSpeed || 50; // ms per frame
    
    // Video or image sequence
    this.useVideo = options.useVideo || false;
    this.videoSrc = options.videoSrc || null;
    this.imageSequence = options.imageSequence || []; // Array of image URLs
    
    this.init();
  }
  
  init() {
    this.render();
    this.bindEvents();
    
    if (this.autoRotate) {
      this.startAutoRotate();
    }
  }
  
  render() {
    this.container.innerHTML = `
      <div class="viewer-360">
        <div class="viewer-container">
          ${this.useVideo ? this.renderVideo() : this.renderImageSequence()}
        </div>
        
        <div class="viewer-controls">
          <button class="control-btn play-pause" onclick="viewer360.toggleRotation()">
            <span class="play-icon">▶</span>
            <span class="pause-icon">⏸</span>
          </button>
          
          <div class="rotation-slider">
            <input type="range" 
                   min="0" 
                   max="${this.frames - 1}" 
                   value="0"
                   class="frame-slider"
                   oninput="viewer360.seek(this.value)">
          </div>
          
          <div class="zoom-controls">
            <button class="control-btn" onclick="viewer360.zoomIn()">+</button>
            <button class="control-btn" onclick="viewer360.zoomOut()">-</button>
          </div>
        </div>
        
        <div class="viewer-hint">
          <span>🖱️ Drag to rotate</span>
          <span>🔍 Scroll to zoom</span>
        </div>
        
        <div class="viewer-thumbnails">
          ${this.renderThumbnails()}
        </div>
      </div>
    `;
    
    this.viewer = this.container.querySelector('.viewer-container');
    this.slider = this.container.querySelector('.frame-slider');
  }
  
  renderVideo() {
    return `
      <video class="viewer-video" 
             src="${this.videoSrc}" 
             loop 
             muted 
             playsinline
             preload="auto">
      </video>
    `;
  }
  
  renderImageSequence() {
    if (this.imageSequence.length === 0) {
      // Generate placeholder frames
      this.imageSequence = this.generatePlaceholderFrames();
    }
    
    return `
      <div class="viewer-images">
        ${this.imageSequence.map((src, i) => `
          <img src="${src}" 
               class="frame ${i === 0 ? 'active' : ''}" 
               data-frame="${i}"
               alt="View ${i + 1}">
        `).join('')}
      </div>
    `;
  }
  
  generatePlaceholderFrames() {
    // In production, these would be actual 360° photos
    // For now, return placeholder SVGs
    const frames = [];
    for (let i = 0; i < this.frames; i++) {
      frames.push(`assets/360-frames/frame-${i.toString().padStart(3, '0')}.svg`);
    }
    return frames;
  }
  
  renderThumbnails() {
    const thumbIndices = [0, 9, 18, 27]; // Front, right, back, left
    return thumbIndices.map(i => `
      <div class="thumb" onclick="viewer360.seek(${i})" data-frame="${i}">
        <span>${['Front', 'Right', 'Back', 'Left'][thumbIndices.indexOf(i)]}</span>
      </div>
    `).join('');
  }
  
  bindEvents() {
    // Mouse/Touch drag
    this.viewer.addEventListener('mousedown', this.onDragStart.bind(this));
    this.viewer.addEventListener('touchstart', this.onDragStart.bind(this), { passive: false });
    
    document.addEventListener('mousemove', this.onDragMove.bind(this));
    document.addEventListener('touchmove', this.onDragMove.bind(this), { passive: false });
    
    document.addEventListener('mouseup', this.onDragEnd.bind(this));
    document.addEventListener('touchend', this.onDragEnd.bind(this));
    
    // Scroll zoom
    this.viewer.addEventListener('wheel', this.onScroll.bind(this), { passive: false });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prevFrame();
      if (e.key === 'ArrowRight') this.nextFrame();
      if (e.key === ' ') this.toggleRotation();
    });
  }
  
  onDragStart(e) {
    this.isDragging = true;
    this.startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    this.viewer.style.cursor = 'grabbing';
    this.stopAutoRotate();
  }
  
  onDragMove(e) {
    if (!this.isDragging) return;
    
    const currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const diff = currentX - this.startX;
    
    // Calculate frame based on drag distance
    const frameChange = Math.floor(diff / 10); // 10px = 1 frame
    
    if (Math.abs(frameChange) > 0) {
      this.seek((this.currentFrame + frameChange + this.frames) % this.frames);
      this.startX = currentX;
    }
    
    e.preventDefault();
  }
  
  onDragEnd() {
    this.isDragging = false;
    this.viewer.style.cursor = 'grab';
  }
  
  onScroll(e) {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    this.zoom(delta);
  }
  
  seek(frame) {
    this.currentFrame = parseInt(frame);
    
    if (this.useVideo) {
      const video = this.viewer.querySelector('video');
      if (video) {
        video.currentTime = (this.currentFrame / this.frames) * video.duration;
      }
    } else {
      // Update image frames
      const frames = this.viewer.querySelectorAll('.frame');
      frames.forEach((f, i) => {
        f.classList.toggle('active', i === this.currentFrame);
      });
    }
    
    // Update slider
    if (this.slider) {
      this.slider.value = this.currentFrame;
    }
    
    // Update thumbnails
    this.updateThumbnails();
  }
  
  nextFrame() {
    this.seek((this.currentFrame + 1) % this.frames);
  }
  
  prevFrame() {
    this.seek((this.currentFrame - 1 + this.frames) % this.frames);
  }
  
  updateThumbnails() {
    const thumbs = this.container.querySelectorAll('.viewer-thumbnails .thumb');
    const activeIndex = Math.floor(this.currentFrame / (this.frames / 4));
    thumbs.forEach((t, i) => {
      t.classList.toggle('active', i === activeIndex);
    });
  }
  
  startAutoRotate() {
    if (this.autoRotateInterval) return;
    
    this.autoRotateInterval = setInterval(() => {
      this.nextFrame();
    }, this.rotationSpeed);
    
    this.updatePlayButton(true);
  }
  
  stopAutoRotate() {
    if (this.autoRotateInterval) {
      clearInterval(this.autoRotateInterval);
      this.autoRotateInterval = null;
    }
    this.updatePlayButton(false);
  }
  
  toggleRotation() {
    if (this.autoRotateInterval) {
      this.stopAutoRotate();
    } else {
      this.startAutoRotate();
    }
  }
  
  updatePlayButton(isPlaying) {
    const btn = this.container.querySelector('.play-pause');
    if (btn) {
      btn.classList.toggle('playing', isPlaying);
    }
  }
  
  zoom(delta) {
    const images = this.viewer.querySelectorAll('.frame, video');
    images.forEach(img => {
      const currentScale = parseFloat(img.style.transform?.match(/scale\(([^)]+)\)/)?.[1] || 1);
      const newScale = Math.max(1, Math.min(3, currentScale + delta));
      img.style.transform = `scale(${newScale})`;
    });
  }
  
  zoomIn() {
    this.zoom(0.2);
  }
  
  zoomOut() {
    this.zoom(-0.2);
  }
}

// Video generation helper
class Video360Generator {
  constructor(options) {
    this.product = options.product;
    this.brand = options.brand;
    this.frames = options.frames || 36;
    this.duration = options.duration || 3; // seconds
  }
  
  generateFFmpegCommand() {
    // Generate FFmpeg command to create 360° video from images
    return `
# Generate 360° product video
ffmpeg -framerate ${this.frames / this.duration} \\
  -i ${this.brand}_${this.product}_frame_%03d.jpg \\
  -c:v libx264 \\
  -pix_fmt yuv420p \\
  -movflags faststart \\
  ${this.brand}_${this.product}_360.mp4

# Generate WebM for better web compatibility  
ffmpeg -i ${this.brand}_${this.product}_360.mp4 \\
  -c:v libvpx-vp9 \\
  -b:v 2M \\
  ${this.brand}_${this.product}_360.webm
    `.trim();
  }
  
  generateShootingGuide() {
    return {
      equipment: [
        "DSLR/Mirrorless camera",
        "Tripod with rotating head",
        "Turntable or lazy susan",
        "Studio lighting (2-3 lights)",
        "White backdrop"
      ],
      setup: {
        camera_height: "Waist level for apparel",
        distance: "3-4 feet from product",
        lighting: "Even, shadow-free lighting",
        background: "Pure white or brand color"
      },
      shooting: {
        frames: this.frames,
        rotation_per_frame: 360 / this.frames,
        total_rotation: 360,
        tips: [
          "Keep product centered",
          "Maintain consistent lighting",
          "Use manual focus",
          "Shoot in RAW for best quality",
          "Ensure product doesn't move between frames"
        ]
      },
      post_processing: {
        software: ["Adobe Photoshop", "GIMP", "FFmpeg"],
        steps: [
          "Color correct all frames",
          "Remove background if needed",
          "Export as JPG sequence",
          "Run FFmpeg command to generate video"
        ]
      }
    };
  }
}

// Initialize 360 viewers
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.product-360-viewer').forEach(container => {
    const options = JSON.parse(container.dataset.options || '{}');
    window.viewer360 = new Product360Viewer(container, options);
  });
});

// Export
window.Product360Viewer = Product360Viewer;
window.Video360Generator = Video360Generator;
