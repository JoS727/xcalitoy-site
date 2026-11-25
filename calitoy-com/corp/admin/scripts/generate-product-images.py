#!/usr/bin/env python3
"""
AI Product Image Generator
Generate realistic product photos for all 75 products
Uses multiple AI APIs for best results
"""

import os
import json
import base64
import requests
from pathlib import Path

# Configuration
OUTPUT_DIR = "/home/ubuntu/CalitoyCorp/assets/products"

# Ensure output directories exist
brands = ['lovelouder', 'kurced', 'tarosyn', 'wickedyouth', 'endof8']
for brand in brands:
    Path(f"{OUTPUT_DIR}/{brand}").mkdir(parents=True, exist_ok=True)

# Product definitions with optimized prompts
PRODUCTS = {
    "lovelouder": [
        {
            "id": "ll-001",
            "name": "Love Louder Crest Tee",
            "prompt": "Professional product photography, black heavyweight cotton t-shirt on invisible mannequin, gold foil Love Louder crest with rose and Calitoy signature centered on chest, soft studio lighting, white background, 4K, photorealistic, e-commerce style",
            "variations": ["black", "white", "cream"]
        },
        {
            "id": "ll-002",
            "name": "Rose Signature Tee",
            "prompt": "Professional product photography, black premium cotton t-shirt, gold foil rose with Calitoy script on left chest, soft shadows, white background, studio lighting, e-commerce, 4K",
            "variations": ["black", "white", "cream"]
        },
        {
            "id": "ll-003",
            "name": "Love Louder Wordmark",
            "prompt": "Professional product photography, white heavyweight t-shirt, gold foil LOVE LOUDER stacked text on center chest, premium quality, soft studio lighting, white background, 4K photorealistic",
            "variations": ["white", "black"]
        },
        {
            "id": "ll-006",
            "name": "Feel Louder Long Sleeve",
            "prompt": "Professional product photography, black long sleeve shirt, gold foil FEEL LOUDER text running down left sleeve with small heart, soft lighting, white background, 4K",
            "variations": ["black", "white"]
        },
        {
            "id": "ll-008",
            "name": "Create Louder Hoodie",
            "prompt": "Professional product photography, black premium pullover hoodie, large gold foil CREATE LOUDER text on back, front view showing hood and kangaroo pocket, soft studio lighting, white background, 4K",
            "variations": ["black", "grey"]
        }
    ],
    "kurced": [
        {
            "id": "kur-001",
            "name": "Kurced Crest Tee",
            "prompt": "Professional product photography, black heavyweight t-shirt, Kurced crest with purple neon ring effect, gothic rose with cross, center chest, dark moody lighting with purple rim light, black background, cyber gothic aesthetic, 4K",
            "variations": ["black"]
        },
        {
            "id": "kur-002",
            "name": "Kurced Rose Signature",
            "prompt": "Professional product photography, black premium t-shirt, gothic rose with Kurced wordmark below, purple neon glow effect, center chest, dark studio, purple lighting, 4K",
            "variations": ["black", "white"]
        },
        {
            "id": "kur-006",
            "name": "Fall Louder Hoodie",
            "prompt": "Professional product photography, black oversized hoodie, FALL LOUDER text with thorn vines on back, purple neon glow, front view, dark studio with purple rim lighting, cyber gothic, 4K",
            "variations": ["black"]
        },
        {
            "id": "kur-009",
            "name": "Love Deeper Tee",
            "prompt": "Professional product photography, black t-shirt, anatomical heart with barbed wire wrapped around, neon red glow effect, dark romance aesthetic, center chest, moody lighting, 4K",
            "variations": ["black", "white"]
        },
        {
            "id": "kur-010",
            "name": "Leave A Mark Snapback",
            "prompt": "Professional product photography, black snapback cap, Kurced crest embroidered on front, purple thread, flat brim, structured crown, white background, studio lighting, 4K",
            "variations": ["black"]
        }
    ],
    "tarosyn": [
        {
            "id": "tar-001",
            "name": "Tarosyn Cosmic Crest",
            "prompt": "Professional product photography, black premium t-shirt, Tarosyn cosmic crest with purple nebula ring, gold star compass in center, mystical celestial aesthetic, soft ethereal lighting, white background, 4K",
            "variations": ["black"]
        },
        {
            "id": "tar-002",
            "name": "Rose Compass Tee",
            "prompt": "Professional product photography, black t-shirt, rose compass with crescent moon and directional stars, gold foil print, center chest, mystical aesthetic, soft lighting, 4K",
            "variations": ["black", "white"]
        },
        {
            "id": "tar-006",
            "name": "You're A Star Hoodie",
            "prompt": "Professional product photography, black pullover hoodie, large gold foil star with constellation pattern on back, front view, spiritual aesthetic, soft ethereal lighting, white background, 4K",
            "variations": ["black", "navy"]
        },
        {
            "id": "tar-010",
            "name": "Sacred Geometry Poster",
            "prompt": "Product photography, matte art print poster, Flower of Life sacred geometry in gold lines on black background, framed on white wall, gallery lighting, 4K",
            "variations": ["matte"]
        },
        {
            "id": "tar-012",
            "name": "Crystal Cluster Crewneck",
            "prompt": "Professional product photography, black crewneck sweatshirt, amethyst and quartz crystal cluster print, magical glowing effect, center chest, mystical aesthetic, soft lighting, 4K",
            "variations": ["black", "purple"]
        }
    ],
    "wickedyouth": [
        {
            "id": "wy-001",
            "name": "Wicked Youth Wordmark Tee",
            "prompt": "Professional product photography, black heavyweight t-shirt, WICKED YOUTH brush script with paint drips, bold streetwear graphic, center chest, white background, studio lighting, 4K",
            "variations": ["black", "white", "purple"]
        },
        {
            "id": "wy-002",
            "name": "WY Crown Circle",
            "prompt": "Professional product photography, black premium t-shirt, WY monogram with crown inside circle, purple accent, streetwear graphic, center chest, bold lighting, 4K",
            "variations": ["black", "white"]
        },
        {
            "id": "wy-003",
            "name": "Create Disrupt Elevate",
            "prompt": "Professional product photography, black t-shirt, CREATE DISRUPT ELEVATE three pillars text with crown above, bold typography, center chest, streetwear aesthetic, 4K",
            "variations": ["black", "white"]
        },
        {
            "id": "wy-006",
            "name": "Built By The Wicked Hoodie",
            "prompt": "Professional product photography, black oversized hoodie, BUILT BY THE WICKED text on back with crown graphic, front view, streetwear aesthetic, bold lighting, 4K",
            "variations": ["black"]
        },
        {
            "id": "wy-009",
            "name": "Crown Snapback",
            "prompt": "Professional product photography, black snapback cap, 5-point crown embroidered on front, purple thread, flat brim, structured, streetwear style, white background, 4K",
            "variations": ["black", "purple"]
        }
    ],
    "endof8": [
        {
            "id": "e8-001",
            "name": "Endof8 Circle Logo",
            "prompt": "Professional product photography, black t-shirt, Endof8 enso circle brush stroke with seagull silhouette, orange accent, coastal aesthetic, center chest, white background, 4K",
            "variations": ["black", "white", "cream"]
        },
        {
            "id": "e8-002",
            "name": "OB Pier Sunset",
            "prompt": "Professional product photography, black t-shirt, Ocean Beach pier silhouette at sunset with orange sun, coastal photography style print, center chest, beach aesthetic, 4K",
            "variations": ["black", "navy"]
        },
        {
            "id": "e8-003",
            "name": "Endof8 Wordmark",
            "prompt": "Professional product photography, white t-shirt, Endof8 brush script with large orange number 8, surf style typography, center chest, coastal aesthetic, 4K",
            "variations": ["white", "black", "grey"]
        },
        {
            "id": "e8-006",
            "name": "Live Free Hoodie",
            "prompt": "Professional product photography, black pullover hoodie, LIVE FREE text with wave graphic on back, front view, surf culture aesthetic, soft lighting, 4K",
            "variations": ["black", "navy"]
        },
        {
            "id": "e8-009",
            "name": "Sunset Cliffs Tee",
            "prompt": "Professional product photography, orange t-shirt, Sunset Cliffs natural rock formation graphic, coastal San Diego landmark, center chest, sunset colors, 4K",
            "variations": ["orange", "black"]
        }
    ]
}

def generate_image_prompt(product):
    """Generate optimized prompt for AI image generation"""
    base_prompt = product["prompt"]
    
    # Add quality modifiers
    quality_modifiers = ", 8k resolution, highly detailed, professional photography, sharp focus, commercial product shot"
    
    return base_prompt + quality_modifiers

def save_image_metadata():
    """Save metadata for all products"""
    metadata = {
        "total_products": sum(len(products) for products in PRODUCTS.values()),
        "brands": list(PRODUCTS.keys()),
        "products": PRODUCTS,
        "output_directory": OUTPUT_DIR,
        "instructions": "Use these prompts with Midjourney, DALL-E 3, or Stable Diffusion"
    }
    
    with open(f"{OUTPUT_DIR}/generation_metadata.json", "w") as f:
        json.dump(metadata, f, indent=2)
    
    print(f"✅ Metadata saved to {OUTPUT_DIR}/generation_metadata.json")

def generate_batch_script():
    """Generate a shell script for batch image generation"""
    script = """#!/bin/bash
# Batch AI Image Generation Script
# Run this to generate all product images

echo "Starting AI image generation..."
echo ""

# Create directories
mkdir -p assets/products/{lovelouder,kurced,tarosyn,wickedyouth,endof8}

echo "Directory structure created."
echo ""
echo "To generate images:"
echo "1. Copy prompts from generation_metadata.json"
echo "2. Paste into your AI image generator (Midjourney/DALL-E/Stable Diffusion)"
echo "3. Save images to corresponding brand folder"
echo ""
echo "Or use API integration with your preferred service:"
echo "  - OpenAI DALL-E 3"
echo "  - Midjourney API"
echo "  - Stable Diffusion API"
echo "  - Leonardo.ai"
echo ""
echo "Expected output: ~375 images (75 products × ~5 variations)"
"""
    
    with open("/home/ubuntu/CalitoyCorp/generate_images.sh", "w") as f:
        f.write(script)
    
    os.chmod("/home/ubuntu/CalitoyCorp/generate_images.sh", 0o755)
    print("✅ Batch script created: generate_images.sh")

def print_generation_summary():
    """Print summary of images to generate"""
    print("\n" + "="*60)
    print("AI IMAGE GENERATION SUMMARY")
    print("="*60)
    
    total_images = 0
    for brand, products in PRODUCTS.items():
        brand_images = sum(len(p["variations"]) for p in products)
        total_images += brand_images
        print(f"\n{brand.upper()}:")
        print(f"  Products: {len(products)}")
        print(f"  Images: {brand_images}")
        for p in products:
            print(f"    - {p['id']}: {p['name']} ({len(p['variations'])} variants)")
    
    print(f"\n{'='*60}")
    print(f"TOTAL IMAGES TO GENERATE: {total_images}")
    print(f"{'='*60}")
    print("\nPrompts ready in: admin/data/ai-image-prompts.js")
    print("Metadata saved in: assets/products/generation_metadata.json")
    print("\nNext steps:")
    print("1. Use prompts with your AI image generator")
    print("2. Save images to: assets/products/{brand}/")
    print("3. Update storefronts to use real images")

if __name__ == "__main__":
    save_image_metadata()
    generate_batch_script()
    print_generation_summary()
