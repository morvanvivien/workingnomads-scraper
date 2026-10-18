# How to Scrape Working Nomads: Remote Job Postings (Title, Company, Category, Tags)

> **Run it now, no code: [workingnomads-jobs-scraper on the Apify Store](https://apify.com/bibian/workingnomads-jobs-scraper)** &nbsp;|&nbsp; $2.00 per 1,000 job postings &nbsp;|&nbsp; no login, no browser, no proxy

Working Nomads is a curated remote-job board with no public export and no official API for third parties. This guide shows how to get its current postings as clean structured data: title, company, category, tags, location and full description, with a free Apify Actor, from the console or from code.

Searches this page answers: working nomads scraper, remote jobs scraper, remote job api, scrape remote job postings.

## What you get from the Working Nomads scraper

- Every currently listed remote job, newest first, with title, company, category and location.
- Tags as a clean array (for example `["react", "node"]`), ready to group or filter by skill.
- A stable `id` and canonical `url` per posting, useful to deduplicate across scheduled runs.
- Optional full job description as plain text.

Export the dataset as JSON, CSV or Excel, or read it through the Apify API. A real sample (five results, personal data removed, long texts truncated) is in [`sample-output.json`](sample-output.json).

## Output fields

| Field | What it is |
|---|---|
| `id`, `url` | Working Nomads posting id and public link |
| `title` | Job title as posted |
| `companyName` | Hiring company as displayed |
| `category` | Working Nomads' own category, for example `Development` or `Marketing` |
| `tags` | Array of skill or topic tags, for example `["python", "ai engineer"]` |
| `location` | Where remote workers can be based, as written by the company |
| `publishedAt` | ISO timestamp of the posting date |
| `description` | Full plain-text job description (only when `includeDescriptions` is on) |

## Use cases

- **Monitor new remote jobs by skill.** Filter `tags` or `keyword` for a technology (for example `react`) and schedule a daily run to catch new postings first.
- **Group openings by category.** Use `category` to see how many remote roles are open in Development, Marketing, Design and so on, this week.
- **Feed a remote-job aggregator or newsletter.** The clean `id`/`url` pair makes deduplication across runs simple.
- **Track which companies hire remote-first.** List `companyName` across postings to spot repeat remote employers.

## Input

| Field | What it does |
|---|---|
| `category` | Keep only this exact category, as shown on Working Nomads, for example `Development`. Empty means every category. |
| `keyword` | Keep only postings whose title, tags or company name contain this word, for example `react`. Empty means every posting. |
| `maxItems` | The run stops once this many jobs are saved (default 50). |
| `includeDescriptions` | Adds the job's full description as plain text. |

Example input:

```json
{
  "category": "Development",
  "maxItems": 50,
  "includeDescriptions": true
}
```

## Three ways to use it

### 1. Apify console, no code

1. Open [the Actor page](https://apify.com/bibian/workingnomads-jobs-scraper) and click **Try for free** (a free Apify account is enough).
2. Fill in the input form (category, keyword and the maximum number of results) and click **Start**.
3. When the run finishes, open the **Output** tab, check the table, then **Export** as CSV, Excel or JSON.
4. For a daily alert, open **Schedules**, create a daily schedule for the Actor and, optionally, add an integration that sends new results to Slack, e-mail or Google Sheets.

### 2. Apify API with JavaScript

```bash
npm install apify-client
export APIFY_TOKEN="your token from Apify console, Settings, Integrations"
node examples/run.js
```

```js
import { ApifyClient } from 'apify-client';

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });

const run = await client.actor('bibian/workingnomads-jobs-scraper').call({
    "category": "Development",
    "maxItems": 50,
    "includeDescriptions": true
});

const { items } = await client.dataset(run.defaultDatasetId).listItems();
for (const item of items) {
    console.log(`${item.title} | ${item.companyName} | ${item.category} | ${item.location}`);
}
```

The complete file is [`examples/run.js`](examples/run.js) (ES module, Node 18 or later).

### 3. Apify API with Python

```bash
pip install apify-client
export APIFY_TOKEN="your token from Apify console, Settings, Integrations"
python examples/run.py
```

```python
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
```

The complete file is [`examples/run.py`](examples/run.py). Never put your token in the code: read it from the `APIFY_TOKEN` environment variable as above.

## Pricing

Pay per result: **$2.00 per 1,000 job postings** (that is $0.002 per job posting), plus a tiny start fee of $0.00005 per run. You pay only for the results saved to the dataset. Apify's free plan includes monthly credits, enough to try it on a few hundred results. Prices are those shown on the [Store page](https://apify.com/bibian/workingnomads-jobs-scraper) when this guide was written; the Store page is the reference.

## Limits and honest notes

- Only what Working Nomads currently lists is collected; the feed returns its present set of exposed postings in a single call, with no further pagination to page through.
- The dataset contains job postings only. Recruiter contact details are never exported: every e-mail address and phone-like number found in `description` is replaced by `[removed]`.
- Postings are the public ones: anything behind a login is out of scope.
- This is an unofficial tool, not affiliated with Working Nomads. Check the site terms and the data protection rules that apply to your use.

## FAQ

**Does it need a browser or a proxy?**  
No. The Actor reads Working Nomads' own public feed directly, so runs are fast and cheap.

**Does it work without any filter?**  
Yes, for a productive default run across every currently listed posting.

**Can I filter by skill or technology?**  
Yes, set `keyword` to the skill (for example `react`) or `category` to a Working Nomads category (for example `Development`).

**Can I get the data in Excel or Google Sheets?**  
Yes. Export the dataset as CSV, Excel or JSON from the Apify console, or connect the Apify Google Sheets integration.

## Try it

**[Open workingnomads-jobs-scraper on the Apify Store](https://apify.com/bibian/workingnomads-jobs-scraper)**

The code in `examples/` is released under the MIT license (see [LICENSE](LICENSE)). The data belongs to its original publishers.
