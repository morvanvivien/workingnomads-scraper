import os
from apify_client import ApifyClient

client = ApifyClient(os.environ["APIFY_TOKEN"])

run = client.actor("bibian/workingnomads-jobs-scraper").call(run_input={
    "category": "Development",
    "maxItems": 50,
    "includeDescriptions": True,
})

for item in client.dataset(run.default_dataset_id).iterate_items():
    print(f"{item['title']} | {item.get('companyName')} | {item.get('category')} | {item.get('location')}")
