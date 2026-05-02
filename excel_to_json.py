import pandas as pd
import json

# Read the Excel file
excel_file = 'techbyte-products-2026-05-02.xlsx'
df = pd.read_excel(excel_file)

# Filter data
# - Brand: apple or samsung (case-insensitive)
# - Category: mobile & smart phones
# - Stock: greater than 0
filtered_df = df[
    (df['Brand'].str.lower().isin(['apple', 'samsung'])) &
    (df['Category'].str.lower() == 'mobile & smart phones') &
    (df['Stock'] > 0)
]

# Select only the columns you want
selected_df = filtered_df[['Title', 'Image URL', 'Brand', 'Category', 'Stock']].copy()

# Rename columns to more JSON-friendly names
selected_df.columns = ['product_name', 'image', 'brand', 'category', 'stock']

# Convert to list of dictionaries
products_list = selected_df.to_dict('records')

# Write to JSON file
output_file = 'products.json'
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(products_list, f, indent=2, ensure_ascii=False)

print(f"Converted {len(products_list)} products to {output_file}")
print("\nSample output:")
print(json.dumps(products_list[:2], indent=2, ensure_ascii=False))
