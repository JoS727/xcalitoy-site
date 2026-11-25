#!/usr/bin/env python3
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
        print(f"\n{brand.upper()}")
        
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
    
    print(f"\n{'='*60}")
    print(f"Generated: {success}/{total} images")
    print(f"Location: {OUTPUT_DIR}/")

if __name__ == '__main__':
    main()
