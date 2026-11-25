#!/bin/bash
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
