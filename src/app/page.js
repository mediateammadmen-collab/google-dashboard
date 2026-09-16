import {
  getCampaignPerformance,
  getDailyTrend,
  getAdCreatives,
  getKeywords,
  getCampaignCountries,
} from "@/lib/googleAds";
import { buildBrandTabs } from "@/lib/campaignGrouping";
import { resolveDateRange } from "@/lib/dateRange";
import DashboardApp from "./components/DashboardApp";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

function groupBy(items, keyFn) {
  const map = new Map();
  for (const item of items) {
    const key = keyFn(item);
    const list = map.get(key) ?? [];
    list.push(item);
    map.set(key, list);
  }
  return map;
}

export default async function Home({ searchParams }) {
  const sp = await searchParams;
  const dateRange = resolveDateRange(sp);
  const countryFilter = sp?.country || null;

  let campaigns = [];
  let trendRows = [];
  let ads = [];
  let keywords = [];
  let countriesByCampaign = new Map();
  let error = null;

  try {
    [campaigns, trendRows, ads, keywords, countriesByCampaign] =
      await Promise.all([
        getCampaignPerformance(dateRange),
        getDailyTrend(dateRange),
        getAdCreatives(dateRange),
        getKeywords(dateRange),
        getCampaignCountries(),
      ]);
  } catch (e) {
    error = e.message;
  }

  if (error) {
    return (
      <main className={styles.page}>
        <h1 className={styles.title}>Google Ads Dashboard</h1>
        <p className={styles.error}>Couldn&apos;t load data: {error}</p>
      </main>
    );
  }

  const adsByCampaign = groupBy(ads, (ad) => ad.campaignId);
  const keywordsByCampaign = groupBy(keywords, (kw) => kw.campaignId);

  let enrichedCampaigns = campaigns.map((c) => ({
    ...c,
    ads: adsByCampaign.get(c.id) ?? [],
    keywords: keywordsByCampaign.get(c.id) ?? [],
  }));

  let filteredTrendRows = trendRows;

  if (countryFilter) {
    enrichedCampaigns = enrichedCampaigns.filter((c) =>
      countriesByCampaign.get(c.id)?.has(countryFilter),
    );
    const allowedIds = new Set(enrichedCampaigns.map((c) => c.id));
    filteredTrendRows = trendRows.filter((r) => allowedIds.has(r.campaignId));
  }

  const tabs = buildBrandTabs(enrichedCampaigns, filteredTrendRows);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Googlee Ads Dashboard</h1>
      </header>

      <DashboardApp tabs={tabs} dateRange={dateRange} country={countryFilter} />
    </main>
  );
}
