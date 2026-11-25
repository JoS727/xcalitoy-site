#!/usr/bin/env python3
"""
AI Image API Integration
Generate real product photos using AI APIs
"""

import os
import json
import base64
from pathlib import Path

# Configuration
API_CONFIG = {
    "openai": {
        "name": "DALL-E 3",
        "endpoint": "https://api.openai.com/v1/images/generations",
        "model": "dall-e-3",
        "size": "1024x1024",
        "quality": "standard",
        "price_per_image": 0.04
    },
    "stability": {
        "name": "Stable Diffusion XL",
        "endpoint": "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",
        "width": 1024,
        "height": 1024,
        "price_per_image": 0.008
    },
    "leonardo": {
        "name": "Leonardo AI",
        "endpoint": "https://cloud.leonardo.ai/api/rest/v1/generations",
        "model": " Leonardo Creative",
        "width": 1024,
        "height": 1024,
        "price_per_image": 0.00  # Free tier available
    }
}

# Product image prompts - optimized for AI generation
AI_PROMPTS = {
    "lovelouder": {
        "style": "Professional product photography, gold foil print on black heavyweight cotton, soft studio lighting, white background, 4K, photorealistic, e-commerce style",
        "products": [
            {"id": "ll-001", "name": "Love Louder Crest Tee", "prompt": "Black heavyweight cotton t-shirt on invisible mannequin, gold foil Love Louder crest with rose and Calitoy signature centered on chest, soft studio lighting, white background"},
            {"id": "ll-002", "name": "Rose Signature Tee", "prompt": "Black premium cotton t-shirt, gold foil rose with Calitoy script on left chest, soft shadows, white background"},
            {"id": "ll-003", "name": "Love Louder Wordmark", "prompt": "White heavyweight t-shirt, gold foil LOVE LOUDER stacked text on center chest, premium quality, soft studio lighting"},
            {"id": "ll-006", "name": "Feel Louder Long Sleeve", "prompt": "Black long sleeve shirt, gold foil FEEL LOUDER text running down left sleeve with small heart, soft lighting"},
            {"id": "ll-008", "name": "Create Louder Hoodie", "prompt": "Black premium pullover hoodie, large gold foil CREATE LOUDER text on back, front view showing hood and kangaroo pocket"},
            {"id": "ll-009", "name": "Love Louder Tote", "prompt": "Natural canvas tote bag, gold foil Love Louder crest, lifestyle photography, clean background"},
            {"id": "ll-010", "name": "Rose Gold Mug", "prompt": "White ceramic mug 11oz, gold foil rose print, steam rising, coffee, morning light"},
            {"id": "ll-011", "name": "Live Louder Crewneck", "prompt": "Black crewneck sweatshirt, gold foil LIVE LOUDER with heart accents, center chest"},
            {"id": "ll-012", "name": "Love Louder Beanie", "prompt": "Black cuffed beanie, embroidered Love Louder crest in gold thread, front view"},
            {"id": "ll-014", "name": "Calitoy Script Tee", "prompt": "Black t-shirt, gold foil Calitoy signature script, center chest, elegant"}
        ]
    },
    "kurced": {
        "style": "Dark gothic streetwear photography, neon purple glow, black heavyweight cotton, moody lighting, cyber aesthetic",
        "products": [
            {"id": "kur-001", "name": "Kurced Crest Tee", "prompt": "Black heavyweight t-shirt, Kurced crest with purple neon ring effect, gothic rose with cross, center chest, dark moody lighting"},
            {"id": "kur-002", "name": "Kurced Rose Signature", "prompt": "Black premium t-shirt, gothic rose with Kurced wordmark below, purple neon glow effect"},
            {"id": "kur-006", "name": "Fall Louder Hoodie", "prompt": "Black oversized hoodie, FALL LOUDER text with thorn vines on back, purple neon glow, front view"},
            {"id": "kur-009", "name": "Love Deeper Tee", "prompt": "Black t-shirt, anatomical heart with barbed wire wrapped around, neon red glow effect"},
            {"id": "kur-010", "name": "Leave A Mark Snapback", "prompt": "Black snapback cap, Kurced crest embroidered on front, purple thread, flat brim"}
        ]
    },
    "tarosyn": {
        "style": "Celestial mystical photography, purple nebula, gold foil accents, ethereal lighting, spiritual aesthetic",
        "products": [
            {"id": "tar-001", "name": "Tarosyn Cosmic Crest", "prompt": "Black premium t-shirt, Tarosyn cosmic crest with purple nebula ring, gold star compass"},
            {"id": "tar-002", "name": "Rose Compass Tee", "prompt": "Black t-shirt, rose compass with crescent moon and directional stars, gold foil print"},
            {"id": "tar-006", "name": "You're A Star Hoodie", "prompt": "Black pullover hoodie, large gold foil star with constellation pattern on back"},
            {"id": "tar-010", "name": "Sacred Geometry Poster", "prompt": "Matte art print poster, Flower of Life sacred geometry in gold lines on black background"},
            {"id": "tar-012", "name": "Crystal Cluster Crewneck", "prompt": "Black crewneck sweatshirt, amethyst and quartz crystal cluster print, magical glow"}
        ]
    },
    "wickedyouth": {
        "style": "Bold streetwear photography, graffiti brush style, crown symbol, dramatic lighting, urban aesthetic",
        "products": [
            {"id": "wy-001", "name": "Wicked Youth Wordmark Tee", "prompt": "Black heavyweight t-shirt, WICKED YOUTH brush script with paint drips, bold streetwear graphic"},
            {"id": "wy-002", "name": "WY Crown Circle", "prompt": "Black premium t-shirt, WY monogram with crown inside circle, purple accent"},
            {"id": "wy-006", "name": "Built By The Wicked Hoodie", "prompt": "Black oversized hoodie, BUILT BY THE WICKED text on back with crown graphic"},
            {"id": "wy-009", "name": "Crown Snapback", "prompt": "Black snapback cap, 5-point crown embroidered on front, purple thread"},
            {"id": "wy-012", "name": "WY Tote", "prompt": "Black canvas tote bag, WY monogram print, streetwear style"}
        ]
    },
    "endof8": {
        "style": "Coastal lifestyle photography, surf culture, OB aesthetic, natural lighting, beach backgrounds",
        "products": [
            {"id": "e8-001", "name": "Endof8 Circle Logo", "prompt": "Black t-shirt, Endof8 enso circle brush stroke with seagull silhouette, orange accent"},
            {"id": "e8-002", "name": "OB Pier Sunset", "prompt": "Black t-shirt, Ocean Beach pier silhouette at sunset with orange sun, coastal photography"},
            {"id": "e8-003", "name": "Endof8 Wordmark", "prompt": "White t-shirt, Endof8 brush script with large orange number 8, surf style"},
            {"id": "e8-006", "name": "Live Free Hoodie", "prompt": "Black pullover hoodie, LIVE FREE text with wave graphic on back, surf culture"},
            {"id": "e8-014", "name": "Coastal Tote", "prompt": "Natural canvas tote bag, OB pier silhouette print, beach lifestyle"}
        ]
    }
}

def generate_api_request(provider, prompt):
    """Generate API request for specific provider"""
    config = API_CONFIG[provider]
    
    if provider == "openai":
        return {
            "model": config["model"],
            "prompt": prompt,
            "size": config["size"],
            "quality": config["quality"],
            "n": 1
        }
    elif provider == "stability":
        return {
            "text_prompts": [{"text": prompt, "weight": 1}],
            "cfg_scale": 7,
            "width": config["width"],
            "height": config["height"],
            "samples": 1,
            "steps": 30
        }
    elif provider == "leonardo":
        return {
            "prompt": prompt,
            "modelId": config["model"],
            "width": config["width"],
            "height": config["height"],
            "num_images": 1
        }

def calculate_costs():
    """Calculate estimated costs for image generation"""
    total_images = sum(len(brand["products"]) for brand in AI_PROMPTS.values())
    
    print("\n" + "="*60)
    print("AI IMAGE GENERATION COST ESTIMATE")
    print("="*60)
    
    for provider, config in API_CONFIG.items():
        cost = total_images * config["price_per_image"]
        print(f"\n{config['name']}:")
        print(f"  Images: {total_images}")
        print(f"  Price per image: ${config['price_per_image']:.3f}")
        print(f"  Total cost: ${cost:.2f}")
    
    print(f"\n{'='*60}")
    print(f"Total images to generate: {total_images}")
    print(f"{'='*60}")

def generate_batch_script():
    """Generate shell script for batch image generation"""
    script = '''#!/bin/bash
# AI Image Generation Batch Script
# Usage: ./generate-ai-images.sh [openai|stability|leonardo]

PROVIDER=${1:-openai}
echo "Generating images with: $PROVIDER"
echo ""

# Check for API key
if [ -z "$AI_API_KEY" ]; then
    echo "Error: Set AI_API_KEY environment variable"
    echo "Example: export AI_API_KEY='your-key-here'"
    exit 1
fi

# Create output directory
mkdir -p assets/products/ai-generated

echo "Starting batch generation..."
echo "This may take several minutes..."
echo ""

# Read prompts from JSON and generate
python3 admin/scripts/generate-ai-images.py --provider $PROVIDER

echo ""
echo "Batch complete!"
echo "Images saved to: assets/products/ai-generated/"
'''
    
    with open("/home/ubuntu/CalitoyCorp/generate-ai-images.sh", "w") as f:
        f.write(script)
    os.chmod("/home/ubuntu/CalitoyCorp/generate-ai-images.sh", 0o755)
    print("✅ Batch script created: generate-ai-images.sh")

def save_prompts_json():
    """Save all prompts to JSON for API usage"""
    output = {
        "metadata": {
            "total_images": sum(len(brand["products"]) for brand in AI_PROMPTS.values()),
            "providers": list(API_CONFIG.keys()),
            "output_directory": "assets/products/ai-generated"
        },
        "prompts": AI_PROMPTS
    }
    
    with open("/home/ubuntu/CalitoyCorp/admin/data/ai-prompts-api.json", "w") as f:
        json.dump(output, f, indent=2)
    
    print("✅ API prompts saved: admin/data/ai-prompts-api.json")

def generate_python_script():
    """Generate Python script for API integration"""
    script = '''#!/usr/bin/env python3
"""
AI Image Generation via API
Supports: OpenAI DALL-E, Stability AI, Leonardo AI
"""

import os
import sys
import json
import requests
import base64
from pathlib import Path

# Load prompts
with open('admin/data/ai-prompts-api.json', 'r') as f:
    DATA = json.load(f)

PROMPTS = DATA['prompts']
OUTPUT_DIR = 'assets/products/ai-generated'

def generate_openai(prompt, output_path):
    """Generate image using OpenAI DALL-E 3"""
    api_key = os.getenv('OPENAI_API_KEY')
    if not api_key:
        print("Error: Set OPENAI_API_KEY")
        return False
    
    response = requests.post(
        'https://api.openai.com/v1/images/generations',
        headers={'Authorization': f'Bearer {api_key}'},
        json={
            'model': 'dall-e-3',
            'prompt': prompt,
            'size': '1024x1024',
            'quality': 'standard',
            'n': 1
        }
    )
    
    if response.status_code == 200:
        image_url = response.json()['data'][0]['url']
        img_response = requests.get(image_url)
        with open(output_path, 'wb') as f:
            f.write(img_response.content)
        return True
    else:
        print(f"Error: {response.text}")
        return False

def generate_stability(prompt, output_path):
    """Generate image using Stability AI"""
    api_key = os.getenv('STABILITY_API_KEY')
    if not api_key:
        print("Error: Set STABILITY_API_KEY")
        return False
    
    response = requests.post(
        'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image',
        headers={'Authorization': f'Bearer {api_key}'},
        json={
            'text_prompts': [{'text': prompt, 'weight': 1}],
            'cfg_scale': 7,
            'width': 1024,
            'height': 1024,
            'samples': 1,
            'steps': 30
        }
    )
    
    if response.status_code == 200:
        image_data = response.json()['artifacts'][0]['base64']
        with open(output_path, 'wb') as f:
            f.write(base64.b64decode(image_data))
        return True
    else:
        print(f"Error: {response.text}")
        return False

def main():
    provider = sys.argv[1] if len(sys.argv) > 1 else 'openai'
    
    Path(OUTPUT_DIR).mkdir(parents=True, exist_ok=True)
    
    total = 0
    success = 0
    
    for brand, data in PROMPTS.items():
        print(f"\\n{brand.upper()}")
        
        for product in data['products']:
            prompt = f"{product['prompt']}, {data['style']}, professional product photography, 4K"
            output_path = f"{OUTPUT_DIR}/{brand}_{product['id']}.png"
            
            print(f"  Generating: {product['name']}...", end=' ')
            
            if provider == 'openai':
                result = generate_openai(prompt, output_path)
            elif provider == 'stability':
                result = generate_stability(prompt, output_path)
            else:
                print(f"Unknown provider: {provider}")
                continue
            
            if result:
                print("✓")
                success += 1
            else:
                print("✗")
            
            total += 1
    
    print(f"\\n{'='*60}")
    print(f"Generated: {success}/{total} images")
    print(f"Location: {OUTPUT_DIR}/")

if __name__ == '__main__':
    main()
'''
    
    with open("/home/ubuntu/CalitoyCorp/admin/scripts/generate-ai-images.py", "w") as f:
        f.write(script)
    
    os.chmod("/home/ubuntu/CalitoyCorp/admin/scripts/generate-ai-images.py", 0o755)
    print("✅ Python script created: admin/scripts/generate-ai-images.py")

if __name__ == "__main__":
    print("="*60)
    print("AI IMAGE API INTEGRATION SETUP")
    print("="*60)
    
    calculate_costs()
    save_prompts_json()
    generate_python_script()
    generate_batch_script()
    
    print("\n" + "="*60)
    print("SETUP COMPLETE")
    print("="*60)
    print("\nTo generate AI images:")
    print("1. Get API key from your chosen provider:")
    print("   - OpenAI: https://platform.openai.com")
    print("   - Stability: https://platform.stability.ai")
    print("   - Leonardo: https://leonardo.ai")
    print("\n2. Set API key:")
    print("   export OPENAI_API_KEY='your-key'")
    print("\n3. Run generation:")
    print("   ./generate-ai-images.sh openai")
    print("   OR")
    print("   python3 admin/scripts/generate-ai-images.py openai")
    print("\n4. Images will be saved to: assets/products/ai-generated/")
