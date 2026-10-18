import { ApifyClient } from 'apify-client';

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });

const run = await client.actor('bibian/workingnomads-jobs-scraper').call({
    category: 'Development',
    maxItems: 50,
    includeDescriptions: true,
});

const { items } = await client.dataset(run.defaultDatasetId).listItems();
for (const item of items) {
    console.log(`${item.title} | ${item.companyName} | ${item.category} | ${item.location}`);
}
