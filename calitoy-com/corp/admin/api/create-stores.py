#!/usr/bin/env python3
"""
Create Printful stores for all brands
"""

import requests
import json

API_KEY = 'GOrfWurY6n62Lptr07USfIAjBYVU8ZBhouKOmXDX'
BASE_URL = 'https://api.printful.com'

stores = [
    {"name": "Love Louder Official", "brand": "lovelouder"},
    {"name": "Kurced Official", "brand": "kurced"},
    {"name": "Wicked Youth Official", "brand": "wickedyouth"},
    {"name": "Endof8 Official", "brand": "endof8"}
]

headers = {
    'Authorization': f'Bearer {API_KEY}',
    'Content-Type': 'application/json'
}

print("Creating Printful stores...\n")

for store in stores:
    try:
        response = requests.post(
            f'{BASE_URL}/stores',
            headers=headers,
            json={"name": store["name"], "platform": "custom"}
        )
        data = response.json()
        
        if data.get('code') == 200:
            store_id = data['result']['id']
            print(f"✅ Created: {store['name']} (ID: {store_id})")
            print(f"   Add this to STORE_IDS: '{store['brand']}': {store_id}")
        else:
            print(f"❌ Failed: {store['name']} - {data.get('error', {}).get('message', 'Unknown error')}")
    except Exception as e:
        print(f"❌ Error: {store['name']} - {str(e)}")

print("\n✅ Store creation complete!")
